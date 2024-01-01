//contains all the mutation logics

"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { userRegistrationTemplate } from "./templates";
import { formSchema } from "@/components/RegisterForm";
import zod from "zod";
import { v4 as uuidv4 } from "uuid";
import { splitFullName } from "./utils";
import { revalidatePath } from "next/cache";

// const axiosInstance = axios.create();

// const getToken = async (refresh_token: any) => {
//   try {
//     const formData = {
//       grant_type: "refresh_token",
//       refresh_token: refresh_token,
//     };
//     // Define your headers
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     // Define the URL for your POST request
//     const url = "http://127.0.0.1:5000/user/auth";

//     // Make a POST request with custom headers using Axios
//     const response = await axios.post(url, formData, { headers });
//     return response;
//   } catch (error) {
//     throw new Error("Failed to get a new token");
//   }
// };

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const access_token = cookies().get("access_token");

//     if (access_token && access_token.value !== "") {
//       config.headers.Authorization = `bearer ${access_token.value}`;
//       return config;
//     }

//     const refresh_token = cookies().get("refresh_token");

//     if (!refresh_token?.value || refresh_token?.value === "") {
//       throw new Error("token not found");
//     }

//     // Check token validity here, you might have your own validation logic
//     // For example, you could decode the token and check its expiration date
//     try {
//       const response = await getToken(refresh_token?.value);

//       cookies().set("access_token", response.data.access_token, {
//         path: "/",
//         domain: "localhost",
//         maxAge: response.data?.expires_in,
//         httpOnly: true,
//         secure: false,
//       });

//       config.headers.Authorization = `bearer ${response.data.access_token}`;
//       return config;
//     } catch (error) {
//       throw error;
//     }
//   },
//   (error) => Promise.reject(error)
// );

const axiosInstance = axios.create();

const getToken = async (refresh_token: any) => {
  //console.log("from axios instance",refresh_token)
  try {
    const formData = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    //console.log("from axios instance",formData)
    // Define your headers
    const headers = {
      "Content-Type": "application/json",
    };
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth";

    // Make a POST request with custom headers using Axios
    const response = await axios.post(url, formData, { headers });

    // cookies().set("access_token", response.data.access_token, {
    //   path: "/",
    //   domain: "localhost",
    //   maxAge: response.data?.expires_in,
    //   httpOnly: true,
    //   secure: false,
    // });
    return response;
  } catch (error) {
    throw new Error("Failed to get a new token");
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the token is valid before sending the request
    const refresh_token = cookies().get("refresh_token")?.value; // Assuming token is stored in localStorage
    const access_token = cookies().get("access_token")?.value;
    //console.log("from axios instance",refresh_token)
    let newToken = "";

    if (refresh_token) {
      // Check token validity here, you might have your own validation logic
      // For example, you could decode the token and check its expiration date
      try {
        const response = await getToken(refresh_token);

        newToken = response.data.access_token;
        //console.log("from axios instance",newToken)
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    }

    // Set the token in the request header
    config.headers.Authorization = `Bearer ${newToken}`;
    //console.log("from axios instance",config)

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

export async function followUser() {
  try {
  } catch (error) {
    console.log("Error while executing action", error);
  }
}

export async function authenticate(data: any) {
  try {
    const res = await fetch("http://127.0.0.1:5000/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    const user = await res.json();

    if (user?.access_token) {
      cookies().set("access_token", user?.access_token, {
        path: "/",
        domain: "localhost",
        maxAge: user?.expires_in,
        httpOnly: true,
        secure: false,
      });
    }

    if (user?.refresh_token) {
      cookies().set("refresh_token", user?.refresh_token, {
        path: "/",
        domain: "localhost",
        maxAge: 60 * 60 * 7,
        httpOnly: true,
        secure: false,
      });
    }

    if (res.ok && user) {
      return user;
    } else {
      console.log("login api not working");
      return null;
    }
  } catch (error: any) {
    console.log("From the authenticate function", error);
    if (error.response) {
      console.log(error.response?.data);
      return error.response?.body?.error;
    }

    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignIn";
    }
    return "authentication error";
  }
}

export async function logoutUser() {
  try {
    cookies().delete("refresh_token");
    cookies().delete("access_token");
    return null;
  } catch (error: any) {
    console.log("From the authenticate function", error);

    return "authentication error";
  }
}

export async function registerUser(
  registrationData: zod.infer<typeof formSchema>
) {
  try {
    // console.log("registration data", registrationData);
    let token = cookies().get("access_token");
    if (token?.value.length === 0) {
      const authenticatedSiteData = await authenticateSite();
      if (authenticatedSiteData?.access_token) {
        cookies().set("access_token", authenticatedSiteData?.access_token);
        // console.log("access_token", data?.access_token);
        token = authenticatedSiteData?.access_token;
      }
    }

    const userTemplate = userRegistrationTemplate;
    const { firstName, lastName } = splitFullName(registrationData?.fullName);
    const payload = {
      ...userRegistrationTemplate,
      Email: registrationData?.email || userTemplate?.Email,
      UserName: registrationData?.username || userTemplate?.UserName,
      Password: registrationData?.password || userTemplate?.Password,
      PhoneNumber: registrationData?.mobileNumber || userTemplate?.PhoneNumber,
      FirstName: firstName,
      LastName: lastName,
      ItemId: uuidv4(),
    };
    console.log("payload", payload);
    const res = await fetch(
      "http://microservices.seliselocal.com/api/uam/v23/UserAccessManagement/SecurityCommand/CreateUser",
      {
        method: "POST",
        headers: {
          Origin: "http://misterloo.seliselocal.com",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${token?.value}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    console.log("data from register user", data);
    return data;
  } catch (error) {
    console.log("Error while registering user", error);
  }
}

export async function authenticateSite() {
  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authenticate_site");

    const res = await fetch(
      "http://misterloo.seliselocal.com/api/identity/v20/identity/token",
      {
        method: "POST",
        headers: {
          Origin: "http://misterloo.seliselocal.com",
          Referer: "http://misterloo.seliselocal.com/login",
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
          Host: "misterloo.seliselocal.com",
        },
        body: formData.toString(),
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error while authenticating site user", error);
  }
}

//Logged in user data
export const fetchLoggedInUser = async () => {
  try {
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth/loggedin/user";

    // Make a POST request with custom headers using Axios
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};

// export async function fetchInstaPosts(loggedInUserId: string) {
//   try {
//     const res = await fetch("http://localhost:9100/api/insta/app/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         loggedInUserId,
//       }),
//     });

// console.log("token", token?.value);

export async function uploadToStorage(data: any) {
  try {
    const response = await axiosInstance.post(
      `http://127.0.0.1:5000/storage/upload`,
      data
    );

    return response.data;
    // return "response.data";
  } catch (error: any) {
    return null;
  }
}

export const createUserPost = async (data: any) => {
  try {
    const formData = {
      userId: data.userId,
      files: data.files,
      content: data.content,
      userName: data.userName,
      userEmail: data.userEmail,
    };

    console.log("from like post", formData);

    // Define the URL for your POST request
    const url = `http://127.0.0.1:5000/insta/user/new/post`;

    // Make a POST request with custom headers using Axios
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    revalidatePath("/dashboard");
    return response.json();
  } catch (error) {
    // Handle errors
    return error;
  }
};

//getting image string using image id from the storage micro-service
export const parseImage = async () => {
  try {
    const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0";
    const formData = {
      fileId: fileId,
    };

    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/storage/url/parser";

    // Make a POST request with custom headers using Axios
    const response = await axiosInstance.post(url, formData);

    // Handle the response data
    //console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};

//multiple image parse
export const multiImageParse = async (files: any) => {
  try {
    const formData = {
      FileIds: files,
    };

    // Define the URL for your POST request
    const url =
      "http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFiles";

    // Make a POST request with custom headers using Axios
    if (files.length > 0) {
      const response = await axiosInstance.post(url, formData);
      //console.log(response.data);
      return response.data;
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};

//liking or unliking a post
export const likePost = async (
  postId: FormDataEntryValue | null,
  userId: string
) => {
  try {
    const formData = {
      userId: userId,
    };

    //console.log("from like post",postId,formData)

    // Define the URL for your POST request
    const url = `http://127.0.0.1:5000/insta/user/like/${postId}`;

    // Make a POST request with custom headers using Axios
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });
    revalidatePath("/dashboard");
    return response.json();
  } catch (error) {
    // Handle errors
    return error;
  }
};

export const followingUser = async (
  loggedInUser: string,
  userToFollow: FormDataEntryValue | null
) => {
  try {
    const formData = {
      loggedInUser: loggedInUser,
      userToFollow: userToFollow,
    };

    // Define the URL for your POST request
    const url = `http://127.0.0.1:5000/user/follow`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    revalidatePath("/dashboard");
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

//update user post
export const updatePost = async (
  content: any,
  postId: FormDataEntryValue | null,
  userId: string
) => {
  try {
    const formData = {
      userId: userId,
      content: content,
    };
    //console.log("from like post",postId,formData)

    // Define the URL for your POST request
    const url = `http://127.0.0.1:5000/insta/user/update/${postId}`;

    // Make a POST request with custom headers using Axios
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });

    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    // Handle errors
    return error;
  }
};

//delete user post
export const deletePost = async (
  post: any,
  postId: FormDataEntryValue | null,
  userId: string
) => {
  try {
    const formData = {
      userId: userId,
    };

    //console.log("from like post",postId,formData)

    // Define the URL for your POST request
    const url = `http://127.0.0.1:5000/insta/user/delete/${postId}`;

    // Make a POST request with custom headers using Axios
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-cache",
    });

    const formData2 = {
      ItemIds: post?.files,
    };

    // Deleting image from blocks storage
    const url2 =
      "http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageCommand/DeleteAll";

    // Make a POST request with custom headers using Axios
    const response2 = await axiosInstance.post(url2, formData2);

    revalidatePath("/dashboard");
    return response.json();
  } catch (error) {
    // Handle errors
    return error;
  }
};

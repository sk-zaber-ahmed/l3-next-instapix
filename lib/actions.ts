//contains all the mutation logics
"use server";

import axios from "axios";
import { cookies } from "next/headers";

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

//     return res.json();
//   } catch (error: any) {
//     return error;
//   }
// }

export async function uploadToStorage(data: any) {
  try {
    // console.log("call for upload", cookies().get("access_token")?.value);

    if (!cookies().get("access_token")) {
      return "cookies_not_found";
    }

    const headers = {
      token: `bearer ${cookies().get("access_token")?.value}`,
    };

    // console.log(headers, data);

    const response = await axios.post(
      `http://127.0.0.1:5000/storage/upload`,
      data,
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error: any) {
    return null;
  }
}

//getting image string using image id from the storage micro-service
// export async function getImageUrl(imageId: string) {
//   try {
//     if (!cookies().get("access_token")) {
//       return "cookies_not_found";
//     }

//     const headers = {
//       accept: "application/json",
//       Authorization: `bearer ${cookies().get("access_token")?.value}`,
//     };

//     const response = await axios.get(
//       `http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${imageId}`,
//       {
//         headers: headers,
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     return error;
//   }
// }

// export async function getImageUrl(imageId: string) {
//   try {
//     //console.log("cookies",cookies().get("access_token")?.value)
//     console.log("image id", imageId);
//     const headers = {
//       // accept: "application/json",
//       Authorization: `bearer ${cookies().get("access_token")?.value}`,
//     };
//     //console.log("headers", headers);

//     const data = {
//       fileId: imageId,
//     };

//     // const res = await fetch("http://127.0.0.1:5000/storage/url/parser", {
//     //   method: "POST",
//     //   headers: headers,
//     //   body: JSON.stringify(data),
//     // });

//     // const response = await axios.post(
//     //   "http://127.0.0.1:5000/storage/url/parser",
//     //   {
//     //     fileId: imageId,
//     //   },
//     //   {
//     //     headers: headers,
//     //   }
//     // );
//     // console.log("response", response);

//     const options = {
//       url: `http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${'4f23068f-cceb-43e7-b9ae-eb129fbe66d0'}`,
//       method: 'GET',
//       headers: {
//         Authorization: `bearer ${cookies().get("access_token")?.value}`,
//       }
//     };

//     const res=await axios(options)
//       .then(response => {
//         console.log(response);
//         return response.data
//       });
//     console.log('res',res)

//     // const response = await axios.get(
//     //   `http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${imageId}`,
//     //   {
//     //     headers: {
//     //       // Accept: 'application/json',
//     //       Authorization: `bearer ${cookies().get("access_token")?.value}`,
//     //     },
//     //   }
//     // );
//     // //console.log("response",response)
//     // if (response.status === 200) {
//     //   return response.data;
//     // } else {
//     //   return "something happended";
//     // }

//     // const data_data:any={
//     //   fileId:"4f23068f-cceb-43e7-b9ae-eb129fbe66d0"
//     // }
//     // const response=await fetch('http://127.0.0.1:5000/storage/url/parser', {
//     //   method: 'POST',
//     //   headers: {
//     //     authorization: `bearer ${cookies().get("access_token")?.value}`,
//     //   },
//     //   body: JSON.stringify(data_data),
//     // });

//     // console.log('response',response.json())
//     // return response.json()
//   } catch (error: any) {
//     return error;
//   }
// }

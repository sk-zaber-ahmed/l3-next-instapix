//contains all the mutation logics
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { userRegistrationTemplate } from "./templates";
import { formSchema } from "@/components/RegisterForm";
import zod from "zod";
import { v4 as uuidv4 } from "uuid";
import { splitFullName } from "./utils";
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

//this function is used in register page and this is the first step of onboarding an user
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

    // console.log("token", token?.value);

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
    // return "response.data";
  } catch (error: any) {
    return null;
  }
}

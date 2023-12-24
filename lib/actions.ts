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

const headersData = [
  {
    key: "Origin",
    value: "http://misterloo.seliselocal.com",
    type: "text",
    enabled: true,
    description: null,
  },
  // {
  //   key: "Referer",
  //   value: "http://misterloo.seliselocal.com/login",
  //   type: "text",
  //   enabled: true,
  //   description: null,
  // },
  // {
  //   key: "Accept-Language",
  //   value: "en-US,en;q=0.9",
  //   type: "text",
  //   enabled: true,
  //   description: null,
  // },
  // {
  //   key: "Accept",
  //   value: "application/json, text/plain, */*",
  //   type: "text",
  //   enabled: true,
  //   description: null,
  // },
];

// Convert the headers data into an object
const headers: { [key: string]: string } = {};
headersData.forEach((header) => {
  if (header.enabled) {
    headers[header.key] = header.value;
  }
});

export async function registerUser(data: any) {
  try {
    const res = await fetch(
      "http://misterloo.seliselocal.com/api/identity/v20/identity/token",
      {
        method: "POST",
        headers: { Origin: "http://misterloo.seliselocal.com" },
        body: JSON.stringify({ grant_type: "authenticate_site" }),
      }
    );

    return res.json();
  } catch (error) {}
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

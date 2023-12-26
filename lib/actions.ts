//contains all the mutation logics
'use server';

import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create();

const getToken = async (refresh_token: any) => {
  try {
    const formData = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    // Define your headers
    const headers = {
      "Content-Type": "application/json",
    };
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth";

    // Make a POST request with custom headers using Axios
    const response = await axios.post(url, formData, { headers });
    return response;
  } catch (error) {
    throw new Error("Failed to get a new token");
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = cookies().get("access_token");

    if (access_token && access_token.value !== "") {
      config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    }

    const refresh_token = cookies().get("refresh_token");

    // Check token validity here, you might have your own validation logic
    // For example, you could decode the token and check its expiration date
    try {
      const response = await getToken(refresh_token);

      cookies().set("access_token", response.data.access_token, {
        path: "/",
        domain: "localhost",
        maxAge: response.data?.expires_in,
        httpOnly: true,
        secure: false,
      });

      config.headers.Authorization = `Bearer ${response.data.access_token}`;
      return config;

    } catch (error) {
      throw error;
    }
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
    };

    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignIn';
    }
    return 'authentication error';
  }
}


export async function uploadToStorage(data: any) {
  try {
    // console.log("call for upload", cookies().get("access_token")?.value);

    if (!cookies().get("access_token")) {
      return 'cookies_not_found'
    }

    // console.log(headers, data);

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

"use server"
//Contains all the data fetching logic

import axiosInstance from "./actions";
import { revalidatePath } from "next/cache";

export const createUserPost = async (data: any) => {
  try {
    const formData = {
      files: data.files,
      content: data.content,
    };

    const url = `http://127.0.0.1:5000/posts/create`;
    const response = await axiosInstance.post(url, formData);
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    // Handle errors
    return error;
  }
};

export async function fetchPostsByUsername(username: any) { // own post list
  try {
    const response = await axiosInstance.get(`http://127.0.0.1:5000/posts/own/all`);
    return response.data;
  } catch (error) {
    console.log("Error while executing function", error);
  }
};

//logged in user will see his and his following peoples post
export async function fetchInstaPosts(loggedInUserId: string) {
  try {
    const response = await axiosInstance.get(`http://127.0.0.1:5000/posts/feed/all`);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

//get single post by its id
export async function fetchPostById(postId: string) {
  try {
    const response = await axiosInstance.get(`http://127.0.0.1:5000/posts/detail/${postId}`);
    return response.data;

  } catch (error: any) {
    throw new Error("Failed to fetch");
  }
}

//liking or unliking a post
export const likePost = async (
  postId: FormDataEntryValue | null,
  userId: string
) => {
  try {
    const response = await axiosInstance.post(`http://127.0.0.1:5000/posts/like/${postId}`, {});
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    return error;
  }
};

//suggested following for loggedin user
export async function fetchSuggestedUsers(loggedInUserId: string) {
  try {
    const response = await axiosInstance.get(`http://127.0.0.1:5000/user/suggestions?loggedInUser=${loggedInUserId}`);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

//All the followed user details get by userId
export async function fetchFollowedUsers(userId: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/user/following?userId=${userId}`,
      // {
      //   cache: "no-cache",
      // }
    );
    return res.json();
  } catch (error: any) {
    return error;
  }
}


//All the followers user details get by userId
export async function fetchFollowers(userId: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/user/follower?userId=${userId}`,
      // {
      //   cache: "no-cache",
      // }
    );
    return res.json();
  } catch (error: any) {
    return error;
  }
}

//fetch user details from business table
export const fetchUserDetails = async (userName: string) => {
  try {

    // Make a POST request with custom headers using Axios
    const response = await axiosInstance.get(`http://127.0.0.1:5000/user/details/${userName}`);
    return response.data;

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

    const response = await axiosInstance.post(`http://127.0.0.1:5000/posts/update/${postId}`, formData);
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    // Handle errors
    return error;
  }
};

//delete user post
export const deletePost = async (postId: string) => {
  try {
    // const url = `http://127.0.0.1:5000/insta/user/delete/${postId}`;
    const response = await axiosInstance.post(`http://127.0.0.1:5000/posts/delete/${postId}`, {});
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    // Handle errors
    return error;
  }
};

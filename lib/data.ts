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
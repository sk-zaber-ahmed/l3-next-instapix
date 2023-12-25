"use client"
import { fetchFollowersPost, fetchInstaPosts } from "@/lib/data";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
// import { fetchInstaPosts } from "@/lib/actions";

async function Posts() {
  const [item2, setItem2] = useState<string>('')
  //const posts = await fetchFollowersPost();
  //console.log(posts)
  // let loggedInUser="fdd29cd4-bde4-4b11-9557-2a41241cf2c2"
  // const instaPosts=await fetchInstaPosts(loggedInUser);
  const instaPosts = {
    posts: [1, 2, 3]
  }

  useEffect(() => {
    // Perform localStorage action
    const item: any = localStorage.getItem('token')
    setItem2(item)
  }, [])

  useEffect(() => {
    const callFunction = async () => {
      // try {
      //   const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0"
      //   // const parsedUrl=await getImageUrl(fileId)
      //   // console.log(parsedUrl)
      //   const formData = {
      //     "fileId": fileId
      //   }
      //   // Define your headers
      //   const headers = {
      //     "token": `Bearer ${item2}`,
      //     "Content-Type": "application/json",
      //     "Content-Length": "<calculated when request is sent>",
      //     "Host": "<calculated when request is sent>",
      //   };
      //   // Define the URL for your POST request
      //   const url = 'http://127.0.0.1:5000/storage/url/parser';

      //   // Make a POST request with custom headers using Axios
      //   const response = await axios.post(url, formData, { headers });

      //   // Handle the response data
      //   console.log(response.data);
      // } catch (error) {
      //   // Handle errors
      //   console.error('Error:', error);
      // }


      try {
        // Define your headers
        const headers = {
          "Host": "misterloo.seliselocal.com",
          "Origin": "http://misterloo.seliselocal.com",
          "Referer": "http://misterloo.seliselocal.com/login",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        };
        // Define the URL for your POST request
        const url = 'http://misterloo.seliselocal.com/api/identity/v20/identity/Authentication/GetLoggedInUser';

        // Make a POST request with custom headers using Axios
        const response = await axios.get(url, { headers });

        // Handle the response data
        console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }
    if (item2) {
      callFunction()
    }
  }, [item2])

  return (
    <>
      {/* {instaPosts?.posts?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))} */}
      <h1>Test</h1>
    </>
  );
}

export default Posts;

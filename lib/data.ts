//Contains all the data fetching logic
import data from "@/lib/fake-data.json";

export async function fetchPostsByUsername(username:any) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/insta/user/own/posts/${username}`, {
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    console.log("Error while executing function", error);
  }
}

// export const fetchFollowersPost=async()=>{
//     try {
//         const res=await fetch('http://localhost:9100/api/product/all/items',{
//             cache:'no-cache',
//         })
//         return res.json()
//       } catch (err) {
//         console.log(err);
//         return err
//       }
// }

export const fetchFollowersPost = async () => {
  try {
    const res = await fetch("http://localhost:9100/api/product/all/items", {
      cache: "no-cache",
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

//--------------------------------------//

//logged in user will see his and his following peoples post
export async function fetchInstaPosts(loggedInUserId: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/insta/user/posts/${loggedInUserId}`,
      {
        cache: "no-cache",
      }
    );

    return res.json();
  } catch (error: any) {
    return error;
  }
}

//get single post by its id
export async function fetchPostById(postId: string) {
  try {
    //await new Promise((resolve) => setTimeout(resolve, 10000));  //for testing skeleton loader. this chunk of code will delay the response by 10 seconds. very useful for testing skeleton loader

    const res = await fetch(`http://127.0.0.1:5000/insta/user/post/${postId}`, {
      cache: "no-cache",
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to fetch");
  }
}

//suggested following for loggedin user
export async function fetchSuggestedUsers(loggedInUserId: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:5000/user/suggestions?loggedInUser=${loggedInUserId}`,
      {
        cache: "no-cache",
      }
    );
    return res.json();
  } catch (error: any) {
    return error;
  }
}

// export async function getImageUrl(imageId: string) {
//   try {
//     console.log("image id", imageId);
//     const headers = {
//       accept: "application/json",
//       Authorization: `bearer ${cookies().get("access_token")?.value}`,
//     };
//     console.log("headers", headers);

//     const data = {
//       fileId: "4f23068f-cceb-43e7-b9ae-eb129fbe66d0",
//     };

//     // const response = await fetch(
//     //   `http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${imageId}`,
//     //   {
//     //     method: "GET",
//     //     headers: headers,
//     //   }
//     // );

//     const response = await axios.post(
//       `http://127.0.0.1:5000/storage/url/parser`,
//       {
//         fileId: imageId,
//       },
//       {
//         headers: headers,
//       }
//     );
//     console.log("response", response.data.status);
//     //return response.json();
//   } catch (error: any) {
//     return error;
//   }
// }

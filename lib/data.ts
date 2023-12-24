
//Contains all the data fetching logic
import data from "@/lib/fake-data.json";


export async function fetchPostsByUsername(username: string = "8_sza_8") {
  try {
    const { profile } = data;
    return profile.username === username ? profile.posts : [];
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

export const fetchFollowersPost=async()=>{
  try {
      const res=await fetch('http://localhost:9100/api/product/all/items',{
          cache:'no-cache',
      })
      return res.json()
    } catch (err) {
      console.log(err);
      return err
    }
}


//--------------------------------------//
//logged in user will see his and his following peoples post
export async function fetchInstaPosts(loggedInUserId: string) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/insta/user/posts/${loggedInUserId}`, {
      cache:'no-cache',
  });

    return res.json();
  } catch (error: any) {
    return error;
  }
}


//suggested following for loggedin user
export async function fetchSuggestedUsers(loggedInUserId: string) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/user/suggestions?loggedInUser=${loggedInUserId}`, {
      cache:'no-cache',
  });
    return res.json();
  } catch (error: any) {
    return error;
  }
}


// export async function getImageUrl(imageId:string){
//   try{
//     //console.log("cookies",cookies().get("access_token")?.value)
//     console.log("image id",imageId) 
//     const headers = {
//       accept: "application/json",
//       Authorization: `bearer ${cookies().get("access_token")?.value}`,
//     };
//     console.log('headers',headers)

//     const data={
//       fileId:"4f23068f-cceb-43e7-b9ae-eb129fbe66d0"  
//     }

//     // const res = await fetch("http://127.0.0.1:5000/storage/url/parser", {
//     //   method: "POST",
//     //   headers: headers,
//     //   body: JSON.stringify(data),
//     // });

//     const response = await fetch(
//       `http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${data?.fileId}`,
//       {
//         method: "GET",
//         headers: headers,
//       }
//     );
//     console.log('response',response)
//     return response.json();
    

//   }catch (error: any) {
//     return error;
//   }
// }



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

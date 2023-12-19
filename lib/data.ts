
import data from "@/lib/fake-data.json";
export async function fetchPostsByUsername(username: string = "8_sza_8") {
  try {
    const { profile } = data;
    return profile.username === username ? profile.posts : [];
  } catch (error) {
    console.log("Error while executing function", error);
  }
}

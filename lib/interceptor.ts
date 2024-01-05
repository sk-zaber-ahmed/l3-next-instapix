import axios from "axios";
import { cookies } from "next/headers";

const local = "http://127.0.0.1:5000";
const server = "";

const baseUrl = local;

export const CustomInstance = axios.create({
    baseURL: baseUrl,
    // headers: { Authorization: "Bearer " + localStorage.tid },
    withCredentials: true
});


export async function getToken(refresh_token: any) {
    try {
        // const response = await axios.post(`${baseUrl}/user/auth`, {
        //     grant_type: "refresh_token",
        //     refresh_token: refresh_token,
        // });

        const response = await CustomInstance.post(`/user/auth`, {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        });
        return response;
    } catch (error) {
        throw new Error("Failed to get a new token");
    }
};



// CustomInstance.interceptors.response.use((res)=>{
//     return res;
// },(error)=>{
//     if(error.response.status === 401 ){
//         // history.pushState(null,'','/login');
//     }
// });


CustomInstance.interceptors.request.use(
    async (config) => {
        // Check if the token is valid before sending the request
        const refresh_token = cookies().get("refresh_token")?.value; // Assuming token is stored in localStorage
        const access_token = cookies().get("access_token")?.value;

        if (refresh_token) {
            // Check token validity here, you might have your own validation logic
            // For example, you could decode the token and check its expiration date
            try {
                if (access_token && access_token !== "") {
                    config.headers.Authorization = `bearer ${access_token}`;
                    return config;
                }
                const response = await getToken(refresh_token);
                config.headers.Authorization = `bearer ${response.data.access_token}`;
                return config;

            } catch (error) {
                throw new Error("User Unauthorized");
            }
        } else {
            throw new Error("User Unauthorized");
        }
    },
    (error) => Promise.reject(error)
);
export default CustomInstance;
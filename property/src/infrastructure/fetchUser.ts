import axios from "axios";


export async function fetchUserDetails(userId: string) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/api/user/id/${userId}`, {
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Could not fetch user details');
    }
}
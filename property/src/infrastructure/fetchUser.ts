import axios from "axios";


export async function fetchUserDetails(userId: string) {
    try {
        // const response = await axios.get(`https:/api.homeport.online/api/user/id/${userId}`);
        const response = await axios.get(`http://localhost:5001/api/user/id/${userId}`, {
            withCredentials:true
        })

        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Could not fetch user details');
    }
}
// import * as grpc from '@grpc/grpc-js';
// import { UserServiceClient } from '../proto/user_grpc_pb';
// import { GetUserRequest } from '../proto/user_pb';

import axios from "axios";

// const userClient = new UserServiceClient('localhost:50011', grpc.credentials.createInsecure());

// export async function fetchUserDetails(userId: string): Promise<any> {
//   console.log(userId,"cfdjwe")
//     return new Promise((resolve, reject) => {
//         const request = new GetUserRequest();
//         console.log(request,"requues sfs")
//         request.setId(userId);

//         userClient.getUserDetails(request, (err, response) => {
//             if (err) {
//                 console.error('Error in gRPC call:', err);
//                 return reject(err);
//             }
//             resolve(response?.toObject()); 
//         });
//     });
// }



export async function fetchUserDetails(userId: string) {
    try {
        // const response = await axios.get(`http://localhost:5001/api/user/id/${userId}`);
        const response = await axios.get(`https:/homeport.online/api/user/id/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw new Error('Could not fetch user details');
    }
}

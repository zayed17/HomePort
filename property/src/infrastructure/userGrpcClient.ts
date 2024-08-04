import * as grpc from '@grpc/grpc-js';
import { UserServiceClient } from '../proto/user_grpc_pb';
import { GetUserRequest } from '../proto/user_pb';

const userClient = new UserServiceClient('localhost:50011', grpc.credentials.createInsecure());

export async function fetchUserDetails(userId: string): Promise<any> {
  console.log(userId,"cfdjwe")
    return new Promise((resolve, reject) => {
        const request = new GetUserRequest();
        console.log(request,"requues sfs")
        request.setId(userId);

        userClient.getUserDetails(request, (err, response) => {
            if (err) {
                console.error('Error in gRPC call:', err);
                return reject(err);
            }
            resolve(response?.toObject()); 
        });
    });
}
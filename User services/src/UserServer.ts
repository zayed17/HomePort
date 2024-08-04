import * as grpc from '@grpc/grpc-js';
import { UserServiceService, IUserServiceServer } from './proto/user_grpc_pb';
import { GetUserRequest, UserResponse } from './proto/user_pb';
import UserModel from './infrastructure/database/models/UserModel';

class UserServiceImpl implements IUserServiceServer {
    [index: string]: any;

    async getUserDetails(call: grpc.ServerUnaryCall<GetUserRequest, UserResponse>, callback: grpc.sendUnaryData<UserResponse>): Promise<void> {
        const userId = call.request.getId();
        console.log(`Received request for user ID: ${userId}`);

        try {
            const userDetails = await this.fetchUserFromDB(userId);

            if (!userDetails) {
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: 'User not found',
                });
                return;
            }

            const response = new UserResponse();
            response.setId(userId);
            response.setFirstname(userDetails.firstName + " " + userDetails.lastName);
            response.setEmail(userDetails.email);
            response.setPhone(userDetails.phone);
            console.log(`Sending response: ${JSON.stringify(response.toObject())}`);
            callback(null, response);
        } catch (error) {
            console.error('Error fetching user from DB:', error);
            callback({
                code: grpc.status.INTERNAL,
                message: 'Internal server error',
            });
        }
    }

    private async fetchUserFromDB(userId: string): Promise<{ firstName: string; lastName: string ; email: string; phone: string } | null> {
        return UserModel.findOne({ _id: userId })
    }
}

export const server = new grpc.Server();
server.addService(UserServiceService, new UserServiceImpl());
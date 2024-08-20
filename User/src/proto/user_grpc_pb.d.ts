// GENERATED CODE -- DO NOT EDIT!

// package: user
// file: user.proto

import * as user_pb from "./user_pb";
import * as grpc from "@grpc/grpc-js";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUserDetails: grpc.MethodDefinition<user_pb.GetUserRequest, user_pb.UserResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  getUserDetails: grpc.handleUnaryCall<user_pb.GetUserRequest, user_pb.UserResponse>;
}

export class UserServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getUserDetails(argument: user_pb.GetUserRequest, callback: grpc.requestCallback<user_pb.UserResponse>): grpc.ClientUnaryCall;
  getUserDetails(argument: user_pb.GetUserRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserResponse>): grpc.ClientUnaryCall;
  getUserDetails(argument: user_pb.GetUserRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<user_pb.UserResponse>): grpc.ClientUnaryCall;
}

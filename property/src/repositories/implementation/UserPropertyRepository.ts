import { UserPropertyInterface } from '../interface';
import { UserData } from '../../entities/userPropertyEntity';
import UserModel from '../../infrastructure/mongodb/UserPropertyModel';
import { Model, Document, Types } from 'mongoose';

export class UserPropertyRepository implements UserPropertyInterface {

  async addUser(user: UserData): Promise<any> {
    const newProperty = new UserModel(user);
    return  newProperty.save();
  }

  async findUser(filter: any): Promise<UserData | null> {
    return UserModel.findOne(filter).lean();
  }


  async updateUser(_id: string, user: Partial<UserData>): Promise<void> {
    await UserModel.updateOne({ _id }, { $set: user })
  }

  async findUserFavorites(_id:string): Promise<any>{
  const objectId = new Types.ObjectId(_id); 

    const favorites = await UserModel.aggregate([
      { $match: { _id: objectId } }, 
      {
        $lookup: {
          from: 'properties',
          localField: 'favourites',
          foreignField: '_id', 
          as: 'favoriteProperties',
        },
      },
      { $unwind: '$favoriteProperties' }, 
      {
        $project: {
          _id: '$favoriteProperties._id', 
          propertyType: '$favoriteProperties.propertyType',
          address: '$favoriteProperties.address',
          city: '$favoriteProperties.city',
          mediaFiles: { $slice: ['$favoriteProperties.mediaFiles', 1] },
          propertyAge: '$favoriteProperties.propertyAge',
          totalArea: '$favoriteProperties.totalArea',
          bedrooms: '$favoriteProperties.bedrooms',
          bathrooms: '$favoriteProperties.bathrooms',
          rentAmount: '$favoriteProperties.rentAmount',
          sellPrice: '$favoriteProperties.sellPrice',
          description: '$favoriteProperties.description',
        },
      },
    ]).exec();
    return favorites
  }
}
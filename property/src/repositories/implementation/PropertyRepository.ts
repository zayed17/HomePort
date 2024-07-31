import { PropertyInterface } from '../interface';
import { Property } from '../../entities/propertyEntity';
import PropertyModel from '../../infrastructure/mongodb/PropertyModel';

export class PropertyRepository implements PropertyInterface {
  async addProperty(property: Property): Promise<any> {
    const newProperty = new PropertyModel(property);
    return await newProperty.save();
  }

  async findPendingProperties(status:string): Promise<Property[]> {
    return PropertyModel.find({status}).lean();
  }

  async  findById(_id: string): Promise<Property | null> {
    return await PropertyModel.findOne({_id})
  }

  async updateProperty(_id: string, property: Partial<Property>): Promise<void> {
    await PropertyModel.updateOne({ _id }, { $set: property }).lean();
  }
}
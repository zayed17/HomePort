import { PropertyInterface } from '../interface';
import { Property } from '../../entities/propertyEntity';
import PropertyModel from '../../infrastructure/mongodb/PropertyModel';

export class PropertyRepository implements PropertyInterface {

  async addProperty(property: Property): Promise<any> {
    const newProperty = new PropertyModel(property);
    return  newProperty.save();
  }

  async find(filter: Partial<Property> = {}): Promise<Property[]> {
    return PropertyModel.find(filter).lean();
  }

  async findOne(filter: any): Promise<Property | null> {
    return PropertyModel.findOne(filter).lean();
  }

  async updateProperty(_id: string, property: Partial<Property>): Promise<void> {
    await PropertyModel.updateOne({ _id }, { $set: property })
  }
}
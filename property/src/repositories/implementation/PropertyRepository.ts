import { PropertyInterface } from '../interface';
import { Property } from '../../entities/propertyEntity';
import PropertyModel from '../../infrastructure/mongodb/PropertyModel';

export class PropertyRepository implements PropertyInterface {
  async addProperty(property: Property): Promise<any> {
    const newProperty = new PropertyModel(property);
    return await newProperty.save();
  }
}
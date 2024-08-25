import { PropertyInterface } from '../interface';
import { Property } from '../../entities/propertyEntity';
import PropertyModel from '../../infrastructure/mongodb/PropertyModel';

export class PropertyRepository implements PropertyInterface {

  async addProperty(property: Property): Promise<any> {
    console.log(property)
    const newProperty = new PropertyModel(property);
    return  newProperty.save();
  }

  async find(filter: Partial<Property> = {}): Promise<Property[]> {
    return PropertyModel.find(filter).lean();
  }

  async findOne(filter: any): Promise<Property | null> {
    return PropertyModel.findOne(filter)
  }

  async findOneWithPopulation(filter: any,populate:string): Promise<any | null> {
    return PropertyModel.findOne(filter).populate(populate)
  }

  async updateProperty(_id: string, property: Partial<Property>): Promise<void> {
    await PropertyModel.updateOne({ _id }, { $set: property })
  }

  async unsetFieldFromProperty(_id: string, fieldName: string): Promise<void> {
    await PropertyModel.updateOne({ _id },{ $unset: { [fieldName]: "" } })
  }

}
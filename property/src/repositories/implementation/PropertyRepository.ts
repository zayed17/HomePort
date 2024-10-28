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
    return PropertyModel.find(filter) as any
  }

  async findOne(filter: any): Promise<Property | null> {
    return PropertyModel.findOne(filter) as any
  }

  async findOneWithPopulation(filter: any,populate:string): Promise<any | null> {
    return PropertyModel.findOne(filter).populate(populate) as any
  }

  async updateProperty(_id: string, property: Partial<Property>): Promise<void> {
    await PropertyModel.updateOne({ _id }, { $set: property })
  }

  async findWithPagination(filter:any,page:number,limit:number):Promise<any>{
    const skip = (page - 1) * limit; 
    const properties = await PropertyModel.find(filter).skip(skip).limit(limit).exec(); 
    const total = await PropertyModel.countDocuments(filter).exec();
    return {properties,total} as any
  }
}
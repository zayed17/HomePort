import { Property } from '../../entities/propertyEntity';

export interface PropertyInterface {
  addProperty(property: Property): Promise<Property>;
  find(filter?: Partial<Property>): Promise<Property[]>;
  findOne(filter: any): Promise<Property | null>;
  updateProperty(_id: string, property: Partial<Property>): Promise<void>;
  findOneWithPopulation(filter: any,populate:string): Promise<Property | null>;
}
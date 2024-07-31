import { Property } from '../../entities/propertyEntity';

export interface PropertyInterface {
  addProperty(property: Property): Promise<Property>;
  findPendingProperties(status: string): Promise<Property[]>;
  findById(id:string): Promise<Property | null>;
  updateProperty(id: string, property: Partial<Property>): Promise<void>;
}
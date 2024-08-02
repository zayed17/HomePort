// import { Property } from '../../entities/propertyEntity';

// export interface PropertyInterface {
//   addProperty(property: Property): Promise<Property>;
//   findPendingProperties(status: string): Promise<Property[]>;
//   findById(id:string): Promise<Property | null>;
//   updateProperty(id: string, property: Partial<Property>): Promise<void>;
//   findAllProperties(createdBy:string): Promise<Property[]>; 
//   findAdminProperties(): Promise<Property[]>; 
// }

import { Property } from '../../entities/propertyEntity';

export interface PropertyInterface {
  addProperty(property: Property): Promise<Property>;
  find(filter?: Partial<Property>): Promise<Property[]>;
  findOne(filter: any): Promise<Property | null>;
  updateProperty(_id: string, property: Partial<Property>): Promise<void>;
}
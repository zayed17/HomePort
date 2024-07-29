import { Property } from '../../entities/propertyEntity';

export interface PropertyInterface {
  addProperty(property: Property): Promise<any>;
}
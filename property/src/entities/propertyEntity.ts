export interface PropertyData {
    propertyType: string;
    address: string;
    city: string;
    mediaFiles: string[];
    depositAmount: number;
    facing: string;
    propertyAge: string;
    totalFloors: number;
    openings: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    balconies: number;
    totalArea: number;
    hasWell: string;
    furnisherType: string;
    electronics?: Record<string, boolean>; 
    rentAmount: number;
    isRentNegotiable: string;
    areBillsIncluded: string;
    eligibility: string;
    availableFrom: string;
    otherRooms: string[]; 
    propertyFeatures: string[]; 
    propertyAdvantages: string[]; 
    noOfCars: number;
    noOfScooters: number;
    noOfBikes: number;
    directionTips: string;
  }
  
  export class Property  {
    propertyType: string;
    address: string;
    city: string;
    mediaFiles: string[];
    depositAmount: number;
    facing: string;
    propertyAge: string;
    totalFloors: number;
    openings: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    balconies: number;
    totalArea: number;
    hasWell: string;
    furnisherType: string;
    electronics?: Record<string, boolean>;
    rentAmount: number;
    isRentNegotiable: string;
    areBillsIncluded: string;
    eligibility: string;
    availableFrom: string;
    otherRooms: string[];
    propertyFeatures: string[];
    propertyAdvantages: string[];
    noOfCars: number;
    noOfScooters: number;
    noOfBikes: number;
    directionTips: string;
  
    constructor({
      propertyType,
      address,
      city,
      mediaFiles,
      depositAmount,
      facing,
      propertyAge,
      totalFloors,
      openings,
      description,
      bedrooms,
      bathrooms,
      balconies,
      totalArea,
      hasWell,
      furnisherType,
      electronics,
      rentAmount,
      isRentNegotiable,
      areBillsIncluded,
      eligibility,
      availableFrom,
      otherRooms,
      propertyFeatures,
      propertyAdvantages,
      noOfCars,
      noOfScooters,
      noOfBikes,
      directionTips,
    }: PropertyData) {
      this.propertyType = propertyType;
      this.address = address;
      this.city = city;
      this.mediaFiles = mediaFiles;
      this.depositAmount = depositAmount;
      this.facing = facing;
      this.propertyAge = propertyAge;
      this.totalFloors = totalFloors;
      this.openings = openings;
      this.description = description;
      this.bedrooms = bedrooms;
      this.bathrooms = bathrooms;
      this.balconies = balconies;
      this.totalArea = totalArea;
      this.hasWell = hasWell;
      this.furnisherType = furnisherType;
      this.electronics = electronics;
      this.rentAmount = rentAmount;
      this.isRentNegotiable = isRentNegotiable;
      this.areBillsIncluded = areBillsIncluded;
      this.eligibility = eligibility;
      this.availableFrom = availableFrom;
      this.otherRooms = otherRooms;
      this.propertyFeatures = propertyFeatures;
      this.propertyAdvantages = propertyAdvantages;
      this.noOfCars = noOfCars;
      this.noOfScooters = noOfScooters;
      this.noOfBikes = noOfBikes;
      this.directionTips = directionTips;
    }
}
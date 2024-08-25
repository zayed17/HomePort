export interface Sponsorship {
  startDate?: Date; 
  endDate?: Date; 
  amount?: number;
}

interface BookingDetails {
  userId: string;
  userName: string;
  bookingDate: Date;
  amountPaid:number;
  _id:string;
}

export interface PropertyData {
  _id?:string;
  status: string;
  isBooked:boolean;
  reason?: string;
  propertyType: string;
  address: string;
  city: string;
  mediaFiles: string[];
  depositAmount?: number;
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
  electronics?: object; 
  rentAmount?: number;
  isNegotiable: string;
  areBillsIncluded?: string;
  eligibility: string;
  availableFrom: string;
  otherRooms: string[]; 
  propertyFeatures: string[]; 
  propertyAdvantages: string[]; 
  noOfCars: number;
  noOfScooters: number;
  noOfBikes: number;
  directionTips: string;
  noOfReports?:number;
  sellPrice?: number;
  propertyCondition?: string;
  lookingFor: string;
  createdBy: string;
  isBlock: boolean
  sponsorship?: {
    isSponsored: boolean;
    details?: Sponsorship; 
  };
  bookedDetails?: BookingDetails[]; 
  updatedAt:Date;
}


export class Property {
  _id?:string;
  status: string;
  reason?: string;
  isBooked:boolean;
  propertyType: string;
  address: string;
  city: string;
  mediaFiles: string[];
  depositAmount?: number;
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
  electronics?: object; 
  rentAmount?: number;
  isNegotiable: string;
  noOfReports?:number;
  areBillsIncluded?: string;
  eligibility: string;
  availableFrom: string;
  otherRooms: string[]; 
  propertyFeatures: string[]; 
  propertyAdvantages: string[]; 
  noOfCars: number;
  noOfScooters: number;
  noOfBikes: number;
  directionTips: string;
  sellPrice?: number;
  propertyCondition?: string;
  lookingFor: string;
  createdBy: string;
  isBlock: boolean;
  updatedAt:Date;
  sponsorship?: {
    isSponsored: boolean;
    details?: Sponsorship;
  };
  bookedDetails?: BookingDetails[]; 

  constructor({
    _id,
    status,
    reason,
    isBooked,
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
    updatedAt,
    electronics,
    rentAmount,
    isNegotiable,
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
    sellPrice,
    propertyCondition,
    noOfReports,
    lookingFor,
    createdBy,
    isBlock,
    sponsorship,
    bookedDetails
  }: PropertyData) {
    this._id = _id;
    this.status = status;
    this.reason = reason;
    this.isBooked = isBooked;
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
    this.noOfReports = noOfReports;
    this.hasWell = hasWell;
    this.updatedAt = updatedAt;
    this.furnisherType = furnisherType;
    this.electronics = electronics;
    this.rentAmount = rentAmount;
    this.isNegotiable = isNegotiable;
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
    this.sellPrice = sellPrice;
    this.propertyCondition = propertyCondition;
    this.lookingFor = lookingFor;
    this.createdBy = createdBy;
    this.isBlock = isBlock;
    this.sponsorship = sponsorship;
    this.bookedDetails = bookedDetails;
  }
}
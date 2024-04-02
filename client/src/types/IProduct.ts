export interface IProduct {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    numberOfSingleBeds: number;
    numberOfDoubleBeds: number;
    numberOfBathrooms: number;
    maxPeople: number;
    category: string;
    amenities: {
        wifi: boolean;
        petsAllowed: boolean;
        tv: boolean;
        refrigerator: boolean;
        kitchen: boolean;
        washer: boolean;
        heating: boolean;
        dryer: boolean;
    };
    photos: string[];
}

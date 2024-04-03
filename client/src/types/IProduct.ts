export interface IProduct {
    id: string;
    name: string;
    description: string;
    owner: {
        id: string;
        avatar: string;
        name: string;
        initials: string;
        email: string;
        phoneNumber: string;
    };
    pricePerNight: number;
    numberOfSingleBeds: number;
    numberOfDoubleBeds: number;
    numberOfBathrooms: number;
    maxPeople: number;
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
    category: {
        id: string;
        name: string;
        icon: string;
    };
}

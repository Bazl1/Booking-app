import { IUser } from "./IUser";

export interface IOrderProduct {
    id: string;
    advertId: string;
    title: string;
    poster: string;
    author: IUser;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    cost: number;
    numberOfPeople: number;
    status: string;
}

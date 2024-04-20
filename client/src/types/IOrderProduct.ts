import { IUser } from "./IUser";

export interface IOrderProduct {
    id: string;
    title: string;
    poster: string;
    user: IUser;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    cost: number;
    numberOfPeople: number;
    status: string;
}

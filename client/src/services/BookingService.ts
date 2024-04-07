import $Api from "@/shared/utils/axios";
import { AxiosResponse } from "axios";

interface IGetBooked {
    dates: string[];
}

export default class BookingService {
    static createBooking(data: FormData) {
        return $Api.post("/reservations", data);
    }
    static getBooked(id: string): Promise<AxiosResponse<IGetBooked>> {
        return $Api.get<IGetBooked>(`adverts/${id}/reservation-dates`);
    }
}

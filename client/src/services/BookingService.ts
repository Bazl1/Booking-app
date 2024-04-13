import $Api from "@/shared/utils/axios";
import { AxiosResponse } from "axios";

interface IGetBooked {
    dates: string[];
}

export default class BookingService {
    static createBooking(data: FormData) {
        return $Api.post("/reservations", data);
    }
    static getBooked(id: string, month: number, year: number): Promise<AxiosResponse<IGetBooked>> {
        return $Api.get<IGetBooked>(`/reservations/dates/?id=${id}&month=${month}&year=${year}`);
    }
}

import $Api from "@/shared/utils/axios";
import { BookedDateResponse } from "@/types/response/BookedDateResponse";
import { OrdersResponse } from "@/types/response/OrdersResponse";
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

    static getCalendarBooked(
        id: string,
        month: number,
        year: number,
    ): Promise<AxiosResponse<BookedDateResponse>> {
        return $Api.get<BookedDateResponse>(
            `/reservations/dates/details/?id=${id}&month=${month}&year=${year}`,
        );
    }

    static getMyOrders(): Promise<AxiosResponse<OrdersResponse>> {
        return $Api.get<OrdersResponse>(`/reservations?type=orders&status=waiting`);
    }

    static acceptOrder(id: string): Promise<void> {
        return $Api.put(`/reservations/${id}/accept  `);
    }

    static rejectOrder(id: string): Promise<void> {
        return $Api.put(`/reservations/${id}/reject `);
    }

    static getMyHistory(): Promise<AxiosResponse<OrdersResponse>> {
        return $Api.get<OrdersResponse>("/reservations?type=history");
    }
}

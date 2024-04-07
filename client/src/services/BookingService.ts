import $Api from "@/shared/utils/axios";

export default class BookingService {
    static createBooking(
        advertId: string,
        startDate: string,
        endDate: string,
        numberOfAdults: number,
        numberOfChildren: number,
        pets: boolean,
    ) {
        return $Api.post("/reservations", {
            advertId,
            startDate,
            endDate,
            numberOfAdults,
            numberOfChildren,
            pets,
        });
    }
}

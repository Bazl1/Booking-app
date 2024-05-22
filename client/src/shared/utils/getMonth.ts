import dayjs from "dayjs";
import en from "dayjs/locale/en-gb";

import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.locale(en);

export function getMonth(month: number = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).weekday();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}

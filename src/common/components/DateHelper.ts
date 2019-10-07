import moment from "moment";
import {localization} from "../localization/localization";

export class DateStringFormats {
    static simple = "D.M.YYYY"; //15.04.2018
    static commonAdvice = "D MMMM, dd"; //12 февраля, пн
    static commonAffairs = "D MMMM, dddd"; //12 февраля, понедельник
    static datePicker = "MMMM, D"; //Март, 17
    static dayAndMonth = "D MMMM"; //12 март
    static dateAndTime = "D.M в HH:mm"; //22.08 в 14:00
    static time = "H:mm"; //9:00
}

export class DateHelper {
    static fromStringOrNull(obj: string | Date | null | undefined): Date | null {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Date) {
            return obj;
        }

        return new Date(obj);
    }

    static fromString(obj: string | Date): Date {
        if (obj instanceof Date) {
            return obj;
        }

        return new Date(obj);
    }
    /**
     * Возвращает строку в заданных форматах
     * @param {Date} date - Дата
     * @param {string} format - Формат для отображения дат
     * @returns {string}
     */
    static dateFromFormat(date: Date | null | undefined | string, format: string): string {
        let result = "";

        const _date: Date | null = DateHelper.fromStringOrNull(date);
        if (_date) {
            result = moment(_date).format(format).toLowerCase();
        }

        return result;
    }

    static prettyDate(date: Date | string, format: string): string {
        const diffInDays = moment().startOf("day").diff(moment(date).startOf("day"), "days");
        switch (diffInDays) {
            case -2:
                return localization.date.DayAfterTomorrow;
            case -1:
                return localization.date.Tomorrow;
            case 0:
                return localization.date.Today;
            case 1:
                return localization.date.Yesterday;
            default:
                return DateHelper.dateFromFormat(date, format);
        }
    }
}
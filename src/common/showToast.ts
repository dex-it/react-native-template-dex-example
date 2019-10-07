import Toast from "react-native-simple-toast";
import {InteractionManager} from "react-native";
import {ExceptionType, isErrorOfType} from "../core/exceptionTypes";

export function showToast(error: Error): void {
    const str = extractKnowErrorMessage(error);

    setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
            Toast.show(str);
        });
    }, 1000);
}

export function showToastString(str: string): void {
    setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
            Toast.show(str);
        });
    }, 1000);
}

export function extractKnowErrorMessage(error: Error): string {
    if (isErrorOfType(error, ExceptionType.UserNotFound)) {
        return "User not found";
    } else if (isErrorOfType(error, ExceptionType.Connection)) {
        return "Connection error";
    } else if (isErrorOfType(error, ExceptionType.InvalidCode)) {
        return "Invalid company code";
    } else if (isErrorOfType(error, ExceptionType.EmailInUse)) {
        return "Email already used";
    } else if (isErrorOfType(error, ExceptionType.DateTooSmall)) {
        return "You has registered after this date";
    } else if ((error as any).isServerError) {
        return "An unexpected error on server";
    } else {
        return "An unexpected error occurred";
    }
}
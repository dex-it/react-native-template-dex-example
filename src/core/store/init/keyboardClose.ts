import {Keyboard} from "react-native";
import {applyMiddleware, Middleware, Dispatch} from "redux";
import {ReduxStack} from "redux-stack";
import {isType} from "typescript-fsa";
import {CoreActions} from "../coreActions";
import {isIos} from "../../theme";

function createMiddleware(): Middleware {
    let keyboardIsOpen = false;

    if (isIos) {
        Keyboard.addListener("keyboardWillShow", () => keyboardIsOpen = true);
        Keyboard.addListener("keyboardWillHide", () => keyboardIsOpen = false);
    } else {
        Keyboard.addListener("keyboardDidShow", () => keyboardIsOpen = true);
        Keyboard.addListener("keyboardDidHide", () => keyboardIsOpen = false);
    }

    return function (): (next: Dispatch) => Dispatch {
        return (next: Dispatch): Dispatch => {
            return (action: any): any => {
                if (keyboardIsOpen && isType(action, CoreActions.navigate)) {
                    Keyboard.dismiss();
                }

                return next(action);
            };
        };
    };
}

export const keyboardDismissOnNavigation: ReduxStack = {
    enhancers: [applyMiddleware(createMiddleware())]
};

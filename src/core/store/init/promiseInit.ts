import {applyMiddleware} from "redux";
import {ReduxStack} from "redux-stack";
import promise from "redux-promise";

export const promiseInit = {
    enhancers: [applyMiddleware(promise)],
} as ReduxStack;

import {applyMiddleware} from "redux";
import {ReduxStack} from "redux-stack";
import thunk from "redux-thunk";

export const thunkInit = {
    enhancers: [applyMiddleware(thunk)],
} as ReduxStack;

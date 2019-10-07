import {Reducer} from "redux";

export type Reducers<T> = {
    [P in keyof T]: Reducer<T[P]>;
};
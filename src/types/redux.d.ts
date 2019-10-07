/* tslint:disable */
import {Action, Dispatch} from "redux";

declare module "redux" {
    import {IAppState} from "../core/store/appState";

    export interface Dispatch<S = IAppState> {
        <A extends Action>(action: A): A;
    }

}
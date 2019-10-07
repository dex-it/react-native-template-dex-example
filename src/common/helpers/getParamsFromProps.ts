import {NavigationNavigatorProps} from "react-navigation";
import {assertNotNull} from "../assertNotNull";

export function getParamsFromProps<T>(props: NavigationNavigatorProps<any, any>): T {
    return assertNotNull(props.navigation).state.params as any;
}
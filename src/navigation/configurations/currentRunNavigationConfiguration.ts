import {createStackNavigator} from "react-navigation";
import {NavigationPages} from "../navigation";
import {CurrentRun} from "../../modules/currentRun/CurrentRun";

export const CurrentRunNavigator = createStackNavigator({
    [NavigationPages.currentRun]: {screen: CurrentRun},
}, {
    headerMode: "screen"
});
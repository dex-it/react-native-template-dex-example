import {createStackNavigator} from "react-navigation";
import {NavigationPages} from "../navigation";
import {PlannedRuns} from "../../modules/plannedRuns/PlannedRuns";

export const PlannedRunsNavigator = createStackNavigator({
    [NavigationPages.plannedRuns]: {screen: PlannedRuns},
}, {
    headerMode: "screen"
});
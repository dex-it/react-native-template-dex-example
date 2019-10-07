import {appSettingsProvider} from "../../core/settings";
import {mainHeaderNavigation, NoHeaderNavigation} from "../../core/theme/navigation";
import {CurrentRunNavigator} from "../configurations/currentRunNavigationConfiguration";
import {menuNavigationReducer, MenuNavigator} from "../configurations/menuNavigationConfiguration";
import {PlannedRunsNavigator} from "../configurations/plannedRunsNavigationConfiguration";
import {rootNavigationReducer, RootNavigator} from "../configurations/rootNavigationConfiguration";
import {NavigationActions} from "../navigation";
import {NavigationConfig} from "./NavigationConfig";
import {reduxHelper} from "./reduxHelper";

export function initNavigationConfig(): void {
    const isRehydrateEnabled = appSettingsProvider.settings.environment == "Development";

    NavigationConfig.instance = reduxHelper({
        root: {
            isRehydrateEnabled,
            customReducer: rootNavigationReducer,
            navigator: RootNavigator,
            navigationOptions: NoHeaderNavigation,
            backAction: NavigationActions.internal.backInRoot
        },
        menu: {
            isRehydrateEnabled,
            customReducer: menuNavigationReducer,
            navigator: MenuNavigator,
            navigationOptions: mainHeaderNavigation("menu", "none"),
        },
        currentRun: {
            isRehydrateEnabled,
            navigator: CurrentRunNavigator,
            navigationOptions: mainHeaderNavigation("menu", "none"),
        },
        plannedRuns: {
            isRehydrateEnabled,
            navigator: PlannedRunsNavigator,
            navigationOptions: mainHeaderNavigation("menu", "none"),
        },
    });
}
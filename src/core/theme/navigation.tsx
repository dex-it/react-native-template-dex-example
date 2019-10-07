import React from "react";
import {View} from "react-native";
import {NavigationStackScreenOptions, NavigationTabScreenOptions} from "react-navigation";
import {ImageResources} from "../../common/ImageResources.g";
import {HeaderButton} from "../../navigation/components/HeaderButton";
import {NavigationActions} from "../../navigation/navigation";
import {Colors} from "./colors";

export const NoHeaderNavigation: NavigationStackScreenOptions = {
    header: null,
};

export function mainHeaderNavigation(mode: "back" | "menu", right: "options" | "none"): NavigationStackScreenOptions {
    const rightImage = mode == "menu" ? ImageResources.image_menu : ImageResources.image_back;
    const rightAction = mode == "menu" ? NavigationActions.toggleDrawer : NavigationActions.navigateToBack;

    const options: NavigationStackScreenOptions = {
        header: (props: any): any => null,
        headerLeft: <HeaderButton image={rightImage} action={rightAction}/>,
        headerRight: (
            right == "options"
                ? <HeaderButton image={ImageResources.image_back} action={NavigationActions.navigateToBack}/>
                : <View/>
        ),
        headerTitle: "title",
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            backgroundColor: Colors.transparent
        }
    };

    return options;
}

export function tabNavigationOptions(label: string): NavigationTabScreenOptions {
    return {
        tabBarLabel: label
    };
}
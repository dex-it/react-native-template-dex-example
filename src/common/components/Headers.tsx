import {NavigationStackScreenOptions} from "react-navigation";
import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import React from "react";
import {HeaderButton} from "../../navigation/components/HeaderButton";
import {ImageResources} from "../ImageResources.g";
import {NavigationActions} from "../../navigation/navigation";
import {View} from "react-native";

export function NoHeader(): NavigationStackScreenOptions | null {
    return ({
        header: <React.Fragment/>
    });
}

export function PlainHeader(title: string, showLeftButton?: boolean, showDrawerIcon?: boolean):
    NavigationStackScreenOptions {
    return ({
        headerTitle: title,
        headerTitleStyle: CommonHeaderStyles.headerTitleStyle as any,
        headerLeft: showLeftButton ? (
            <HeaderButton
                image={showDrawerIcon ? ImageResources.image_menu : ImageResources.image_back}
                action={showDrawerIcon ? NavigationActions.toggleDrawer : NavigationActions.navigateToBack}
            />
        ) : undefined,
        headerRight: <View/>,
        headerBackTitle: null,
        headerStyle: CommonHeaderStyles.headerStyle as any,
        headerTitleAllowFontScaling: false,
    });
}
import React, {PureComponent} from "react";
import {Image, ImageStyle, View} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {CommonStyles, isIos, windowHeight, windowWidth} from "../../core/theme";
import {ImageResources} from "../ImageResources.g";
import {styleSheetCreate} from "../utils";

export class Splash extends PureComponent {
    render(): JSX.Element | null {
        if (isIos) {
            const useDefaultSource = appSettingsProvider.settings.environment != "Development" && __DEV__;

            return (
                <View style={CommonStyles.flexWhiteBackground}>
                    <Image
                        style={styles.image}
                        defaultSource={useDefaultSource ? ImageResources.splash : undefined}
                        source={ImageResources.splash}
                        resizeMode={"contain"}
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = styleSheetCreate({
    image: {
        alignSelf: "center",
        marginTop: windowHeight / 3.51052,
        width: windowWidth / 1.7391,
        height: windowHeight / 14.1914,
    } as ImageStyle,
});
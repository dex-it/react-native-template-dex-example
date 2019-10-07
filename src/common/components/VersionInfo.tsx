import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {Colors, Fonts, isIphoneX, windowHeight} from "../../core/theme";
import {styleSheetCreate} from "../utils";

export class VersionInfo extends PureComponent<IProps> {
    render(): JSX.Element | null {
        const settings = appSettingsProvider.settings;
        if (settings.showVersion) {
            return (
                <View style={this.props.useRelativePostion == true ? styles.containerRelative : styles.container}>
                    <Text style={styles.text} allowFontScaling={false}>{`${settings.version}(${settings.build})`}</Text>
                    <Text style={styles.text} allowFontScaling={false}>{settings.environment}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

interface IProps {
    useRelativePostion?: boolean;
}

const styles = styleSheetCreate({
    container: {
        justifyContent: "center",
        margin: 2,
        padding: 2,
        position: "absolute",
        top: isIphoneX ? windowHeight - 50 : windowHeight - 30,
        right: 0
    } as ViewStyle,
    containerRelative: {
        position: "relative",
        justifyContent: "center",
        margin: 2,
        right: 0
    } as ViewStyle,
    text: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        color: Colors.black,
        textAlign: "right",
    } as TextStyle
});
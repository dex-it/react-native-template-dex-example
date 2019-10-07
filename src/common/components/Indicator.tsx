import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {Colors, Fonts, isIos} from "../../core/theme";

interface IProps {
    value: string;
    style?: ViewStyle;
}

export class Indicator extends PureComponent<IProps> {
    render(): JSX.Element {
        const {value, style} = this.props;

        return (
            <View style={styleSheetFlatten([styles.container, style])}>
                <Text style={styles.text} numberOfLines={1}>{value}</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        paddingTop: isIos ? 4 : 2,
        paddingBottom: 4,
        paddingHorizontal: 7.5,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: Colors.greenish,
        borderRadius: 12,
    } as ViewStyle,
    text: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.white,
        letterSpacing: 0,
    } as TextStyle,
});
import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {localization} from "../localization/localization";

interface IProps {
    onPress: () => void;
    errorText?: string;
}

export class TryAgain extends PureComponent<IProps, IEmpty> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.errorText}</Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.textTryMore}>{localization.errors.tryAgain}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center"
    } as ViewStyle,
    text: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        textAlign: "center",
        fontSize: 16
    } as TextStyle,
    textTryMore: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 16
    } as TextStyle
});
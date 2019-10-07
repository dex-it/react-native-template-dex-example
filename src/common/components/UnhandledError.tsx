import React, {Component} from "react";
import {SafeAreaView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Header} from "react-navigation";
import {Colors, CommonStyles, Fonts, windowWidth} from "../../core/theme";
import {styleSheetCreate} from "../utils";

export class UnhandledError extends Component<IProps> {
    render(): JSX.Element {
        const header = this.props.hideHeader ? null : (
            <SafeAreaView style={styles.header}>
                <View style={styles.header}/>
            </SafeAreaView>
        );

        return (
            <View style={styles.container}>
                {header}
                <View style={CommonStyles.flex1}/>
                <Text style={styles.text}>An unexpected error occurred</Text>
                <Text style={styles.text}>We already work on it</Text>
                <View style={styles.separator}/>
                <TouchableOpacity onPress={this.props.onReset}>
                    <Text style={styles.continueText}>Send a report and continue</Text>
                </TouchableOpacity>
                <View style={CommonStyles.flex1}/>
            </View>
        );
    }
}

interface IProps {
    hideHeader?: boolean;
    onReset: () => void;
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white
    } as ViewStyle,
    text: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: Fonts.regular
    } as TextStyle,
    separator: {
        margin: 20
    } as ViewStyle,
    continueText: {
        fontFamily: Fonts.regular,
        fontSize: 15,
        color: Colors.black,
        margin: 10
    } as TextStyle,
    header: {
        height: Header.HEIGHT,
        backgroundColor: Colors.black,
        width: windowWidth
    } as ViewStyle
});
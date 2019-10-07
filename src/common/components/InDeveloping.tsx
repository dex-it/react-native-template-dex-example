import React, {PureComponent} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {PlainHeader} from "./Headers";

interface IProps {
    pageName: string;
    isTransparent?: boolean;
}

export class InDeveloping extends PureComponent<IProps> {
    static navigationOptions = PlainHeader("In Development");

    render(): JSX.Element {
        return (
            <View style={this.props.isTransparent ? styles.transparentContainer : styles.container}>
                <Text style={styles.text}>{"Page is under development"}</Text>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    transparentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    text: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: Colors.black
    } as TextStyle
});
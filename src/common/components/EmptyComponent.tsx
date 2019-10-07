import React, {PureComponent} from "react";
import {Image, ImageStyle, ImageURISource, Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts, windowHeight} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {ImageResources} from "../ImageResources.g";

interface IProps {
    image?: ImageURISource;
    title?: string;
    subtitle?: string;
}

export class EmptyComponent extends PureComponent<IProps> {
    static defaultProps: Partial<IProps>;

    render(): JSX.Element | null {
        const {title, subtitle, image} = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={image!}/>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        );
    }
}

EmptyComponent.defaultProps = {
    image: ImageResources.image_eye,
    title: "No title",
    subtitle: ""
};

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 17,
    } as ViewStyle,
    image: {
        width: 128,
        height: 128,
        resizeMode: "contain",
    } as ImageStyle,
    title: {
        paddingTop: windowHeight / 7.4111,
        paddingBottom: 14,
        fontFamily: Fonts.medium,
        fontSize: 20,
        letterSpacing: 0.4,
        color: Colors.black,
        textAlign: "center",
    } as TextStyle,
    subtitle: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        letterSpacing: -0.2,
        lineHeight: 20,
        color: Colors.black,
        textAlign: "center",
    } as TextStyle
});

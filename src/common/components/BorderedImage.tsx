import React, {PureComponent} from "react";
import {Image, ImageProperties, View, ViewStyle} from "react-native";
import {styleSheetFlatten} from "../utils";
import {isAndroidLollipop, isIos} from "../../core/theme/common";

interface IProps extends ImageProperties {
    borderRadius: number;
}

export class BorderedImage extends PureComponent<IProps> {
    render(): JSX.Element {
        if (isIos || !isAndroidLollipop) {
            return <Image {...this.props} resizeMode={"cover"}/>;
        } else {
            const style = styleSheetFlatten(this.props.style) as ViewStyle;
            const containerStyle = styleSheetFlatten([
                style,
                {
                    borderRadius: this.props.borderRadius,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center"
                }
            ]) as ViewStyle;

            return (
                <View style={containerStyle}>
                    <Image
                        source={this.props.source}
                        style={styleSheetFlatten({width: style.width, height: style.height})}
                    />
                </View>
            );
        }
    }
}

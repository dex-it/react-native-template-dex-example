import React from "react";
import {Image, ImageStyle, ImageURISource, TouchableOpacity, ViewStyle} from "react-native";
import {Dispatch} from "redux";
import {styleSheetCreate} from "../../common/utils";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {Colors} from "../../core/theme";

interface IProps {
    image: ImageURISource;
    action?: () => any;
    onPress?: () => void;
    noTintColor?: boolean;
}

interface IDispatchProps {
    dispatch: Dispatch;
}

@connectAdv(null, dispatch => ({dispatch}))
export class HeaderButton extends BaseReduxComponent<IEmpty, IDispatchProps, IEmpty, IProps> {
    constructor(props: IProps) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    render(): JSX.Element {
        const {noTintColor, image} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress} activeOpacity={0.7}>
                <Image style={noTintColor ? styles.image : styles.imageTintColor} source={image}/>
            </TouchableOpacity>
        );
    }

    private onPress(): void {
        this.props.action && this.dispatchProps.dispatch(this.props.action());
        this.props.onPress && this.props.onPress();
    }
}

const styles = styleSheetCreate({
    container: {
        minWidth: 50,
        minHeight: 39,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    image: {
        resizeMode: "center"
    } as ImageStyle,
    imageTintColor: {
        tintColor: Colors.white,
        resizeMode: "center"
    } as ImageStyle
});
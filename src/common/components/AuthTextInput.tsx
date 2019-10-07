import React, {PureComponent} from "react";
import {
    Animated,
    Image,
    ImageStyle,
    ImageURISource,
    TextInput,
    TextInputProperties,
    TextStyle, TouchableOpacity,
    View,
    ViewStyle,
    Insets
} from "react-native";
import {Colors, Fonts, isIos} from "../../core/theme";
import {Ref, styleSheetCreate, styleSheetFlatten} from "../utils";

interface IProps extends TextInputProperties {
    label: string;
    icon?: ImageURISource;
    iconStyle?: ImageStyle;
    onIconPress?: () => void;
    isError?: boolean;
    containerStyle?: ViewStyle;
}

interface IState {
    isFocused: boolean;
}

export class AuthTextInput extends PureComponent<IProps, IState> {
    private inputRef = new Ref<TextInput>();

    public onSetFocus(): void {
        this.inputRef.ref.focus();
    }

    private animatedValue: Animated.Value;

    constructor(props: IProps) {
        super(props);
        this.state = {isFocused: false};
    }

    componentWillMount(): void {
        this.animatedValue = new Animated.Value(this.props.value == "" ? 0 : 1);
    }

    componentDidUpdate(): void {
        Animated.timing(this.animatedValue, {
            toValue: (this.state.isFocused || this.props.value != "") ? 1 : 0,
            duration: 200,
        }).start();
    }

    handleFocus = (): void => this.setState({ isFocused: true });
    handleBlur = (): void => this.setState({ isFocused: false });

    render(): JSX.Element {
        const {label, isError, containerStyle, ...props} = this.props;
        const labelStyle: TextStyle = {
            position: "absolute",
            left: isIos ? 0 : 2,
            top: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
            }) as any,
            fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 14],
            }) as any,
            color: isError ? Colors.paleRed : Colors.warmGreyTwo,
        };
        const container = styleSheetFlatten(
            [isError && this.state.isFocused
                ? styles.errorContainer
                : styles.container, containerStyle
            ]) as ViewStyle;

        return (
            <View style={container}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    ref={this.inputRef.handler}
                    style={styles.input}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    underlineColorAndroid={Colors.transparent}
                    autoFocus={false}
                    autoCorrect={false}
                    autoCapitalize={"none"}
                    {...props}
                />
                {this.renderIcon()}
            </View>
        );
    }

    private renderIcon = (): JSX.Element | null => {
        const {icon, iconStyle, onIconPress} = this.props;

        if (icon != null) {
            return (
                <TouchableOpacity onPress={onIconPress} activeOpacity={0.6} hitSlop={hitSlopInsets}>
                    <Image source={icon} style={iconStyle}/>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }
}

const hitSlopInsets: Insets = {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
};

const commonContainer: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: isIos ? 20 : 5,
    paddingBottom: isIos ? 6 : undefined,
    borderBottomWidth: 2,
    borderBottomColor: Colors.whiteTwo,
};

const styles = styleSheetCreate({
    container: styleSheetFlatten([commonContainer]) as ViewStyle,
    errorContainer: styleSheetFlatten([commonContainer, {borderBottomColor: Colors.paleRed}]) as ViewStyle,
    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: Fonts.regular,
        color: Colors.black,
    } as TextStyle,
    icon: {
        height: 24,
        width: 15,
        resizeMode: "contain"
    } as ImageStyle,
});
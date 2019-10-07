import React, {PureComponent} from "react";
import {ActivityIndicator, Animated, StyleSheet, Text, TextStyle, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import TimingAnimationConfig = Animated.TimingAnimationConfig;

interface IProps {
    isLoading: boolean;
    transparent?: boolean;
    text?: string;
}

interface IState {
    opacity: Animated.Value;
    isAnimationInProgress: boolean;
}

export class LoadingView extends PureComponent<IProps, IState> {
    static defaultProps: Partial<IProps>;
    private style: ViewStyle;

    constructor(props: IProps) {
        super(props);

        this.state = {opacity: new Animated.Value(props.isLoading ? 1 : 0), isAnimationInProgress: false};
        this.style = StyleSheet.flatten([styles.indicatorContainer, {opacity: this.state.opacity as any}]);
        if (props.transparent) {
            this.style = styleSheetFlatten([this.style, {backgroundColor: Colors.transparent}]) as ViewStyle;
        }
    }

    componentDidUpdate(prevProps: IProps): void {
        if (this.props.isLoading != prevProps.isLoading) {
            const config: TimingAnimationConfig = {
                duration: 300,
                toValue: this.props.isLoading ? 1 : 0,
                useNativeDriver: true
            };
            this.setState({isAnimationInProgress: true});
            Animated.timing(this.state.opacity, config).start(() => this.setState({isAnimationInProgress: false}));
        }
    }

    render(): JSX.Element | null {
        const {isLoading, text} = this.props;

        if (isLoading || this.state.isAnimationInProgress) {
            return (
                <Animated.View style={this.style}>
                    <ActivityIndicator animating={isLoading} size="large" color={Colors.greenish}/>
                    {this.renderText(text)}
                </Animated.View>
            );
        } else {
            return null;
        }
    }

    private renderText = (textToShow?: string): JSX.Element | null => {
        if (textToShow != null) {
            return <Text style={styles.text}>{textToShow.toUpperCase()}</Text>;
        } else {
            return null;
        }
    }
}

LoadingView.defaultProps = {transparent: true};

const styles = styleSheetCreate({
    indicatorContainer: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white88,
        zIndex: 99
    } as ViewStyle,
    text: {
        alignSelf: "center",
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.black,
        paddingTop: 10,
    } as TextStyle,
});
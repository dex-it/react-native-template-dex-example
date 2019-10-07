import React from "react";
import {Keyboard, KeyboardAvoidingView, LayoutAnimation, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {Dispatch} from "redux";
import {AuthTextInput} from "../../common/components/AuthTextInput";
import {ErrorNotification} from "../../common/components/ErrorNotification";
import {PlainHeader} from "../../common/components/Headers";
import {MainButton} from "../../common/components/MainButton";
import {TestUsers} from "../../common/components/TestUsers";
import {ButtonType} from "../../common/enums/buttonType";
import {ImageResources} from "../../common/ImageResources.g";
import {localization} from "../../common/localization/localization";
import {Ref, styleSheetCreate} from "../../common/utils";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {CommonStyles, isIos} from "../../core/theme";
import {AuthActionsAsync} from "./authActionsAsync";
import {ErrorSource} from "./authState";

interface IStateProps {
    isAuthenticating: boolean;
    error: string | null;
    errorSource: ErrorSource | null;
}

interface IDispatchProps {
    login(email: string, password: string): void;
}

interface IState {
    email: string;
    password: string;
    isSecureTextEntryEnabled: boolean;
    isErrorContainerVisible: boolean;
}

@connectAdv(
    (state: IAppState): IStateProps => ({
        isAuthenticating: state.auth.isAuthenticating,
        error: state.auth.error,
        errorSource: state.auth.errorSource
    }),
    (dispatch: Dispatch<any>): IDispatchProps => ({
        login: (email: string, password: string): any => dispatch(AuthActionsAsync.login(email, password))
    })
)
export class AuthPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader(localization.auth.signInSplash);
    private passwordTextInput = new Ref<AuthTextInput>();

    constructor(props: IEmpty) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isSecureTextEntryEnabled: true,
            isErrorContainerVisible: false
        };
    }

    componentDidUpdate(prevProps: any): void {
        const prevStateProps: IStateProps = prevProps.stateProps;
        if (prevStateProps.error == null && this.stateProps.error != null) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({isErrorContainerVisible: true});
        }
    }

    render(): JSX.Element {
        const {email, password, isSecureTextEntryEnabled, isErrorContainerVisible} = this.state;
        const {isAuthenticating, error, errorSource} = this.stateProps;
        const isDisabled = email == "" || password == "" || isAuthenticating;
        const isErrorForBoth = errorSource == "both";

        return (
            <TouchableOpacity style={CommonStyles.flexWhiteBackground} onPress={Keyboard.dismiss} activeOpacity={1}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={"padding"}
                    keyboardVerticalOffset={isIos ? 60 : 75}
                >
                    <View style={styles.innerContainer}>
                        <AuthTextInput
                            containerStyle={styles.input}
                            label={localization.auth.email}
                            value={email}
                            keyboardType={"email-address"}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType={"next"}
                            onSubmitEditing={this.onInputForPasswordSubmit}
                            onChangeText={this.onEmailChange}
                            isError={errorSource == "email" || isErrorForBoth}
                        />
                        <AuthTextInput
                            containerStyle={styles.input}
                            ref={this.passwordTextInput.handler}
                            label={localization.auth.password}
                            value={password}
                            keyboardType={"default"}
                            spellCheck={false}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType={"done"}
                            secureTextEntry={isSecureTextEntryEnabled}
                            icon={isSecureTextEntryEnabled ? ImageResources.image_eye : ImageResources.image_eye_non}
                            onIconPress={this.onSecureTextEntryIconPress}
                            onSubmitEditing={isDisabled ? undefined : this.login}
                            onChangeText={this.onPasswordChange}
                            isError={errorSource == "password" || isErrorForBoth}
                        />
                    </View>
                    {this.renderErrorContainer(error, isErrorContainerVisible)}
                    <TestUsers onPress={this.dispatchProps.login}>
                        <Text>Test logins</Text>
                    </TestUsers>
                    <MainButton
                        title={localization.auth.signIn}
                        buttonType={isDisabled ? ButtonType.disabled : ButtonType.positive}
                        disabled={isDisabled}
                        onPress={this.login}
                    />
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }

    private renderErrorContainer = (error: string | null, isErrorContainerVisible: boolean): JSX.Element | null => {
        if (error != null && isErrorContainerVisible) {
            return <ErrorNotification errorText={error} onOkPress={this.onErrorsOkPress}/>;
        } else {
            return null;
        }
    };

    private onErrorsOkPress = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({isErrorContainerVisible: false});
    };

    private onEmailChange = (email: string): void => {
        this.setState({email});
    };

    private onPasswordChange = (password: string): void => {
        this.setState({password});
    };

    private onInputForPasswordSubmit = (): void => {
        this.passwordTextInput.ref.onSetFocus();
    };

    private onSecureTextEntryIconPress = (): void => {
        this.setState({isSecureTextEntryEnabled: !this.state.isSecureTextEntryEnabled});
    };

    private login = (): void => {
        Keyboard.dismiss();
        this.dispatchProps.login(this.state.email, this.state.password);
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    } as ViewStyle,
    innerContainer: {
        flex: 1,
        justifyContent: "flex-start"
    } as ViewStyle,
    input: {
        marginHorizontal: 16,
        marginTop: 30
    } as ViewStyle
});

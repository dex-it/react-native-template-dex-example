import React from "react";
import {ScrollView, StatusBar, View, ViewStyle} from "react-native";
import {Dispatch} from "redux";
import {MainModal} from "../../common/components/MainModal";
import {TransparentButton} from "../../common/components/TransparentButton";
import {VersionInfo} from "../../common/components/VersionInfo";
import {ButtonType} from "../../common/enums/buttonType";
import {EventNames, eventRegister} from "../../common/eventRegister";
import {localization} from "../../common/localization/localization";
import {styleSheetCreate} from "../../common/utils";
import {Profile} from "../../core/api/generated/dto/Profile.g";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {INotificationInfo} from "../../core/store/systemActions";
import {Colors, CommonStyles, isIos, isIphoneX} from "../../core/theme";
import {AuthActionsAsync} from "../../modules/auth/authActionsAsync";
import {NavigationActions} from "../navigation";
import {MenuHeader} from "./components/MenuHeader";
import {MenuItem} from "./components/MenuItem";
import {DrawerItemsProps} from "react-navigation";

interface IStateProps {
    isOpen: boolean;
    profile: Profile | null;
    numberOfRuns?: string;
    notificationInfo: INotificationInfo | null;
    token: string | null;
}

interface IDispatchProps {
    navigateToCurrentRun: () => void;
    navigateToPlannedRuns: () => void;
    logout: () => void;
    getProfile: () => void;
}

interface IState {
    isModalVisible: boolean;
}

@connectAdv(
    (state: IAppState): IStateProps => ({
        numberOfRuns: state.entities.plannedRuns.size != 0 ? state.entities.plannedRuns.size.toString() : undefined,
        isOpen: state.navigation.menu.isDrawerOpen,
        profile: state.entities.profile || null,
        notificationInfo: state.system.notificationInfo,
        token: state.system.authToken
    }),
    (dispatch: Dispatch<any>): IDispatchProps => ({
        navigateToCurrentRun: (): void => {
            dispatch(NavigationActions.navigateToCurrentRun());
            dispatch(NavigationActions.closeMenu());
        },
        navigateToPlannedRuns: (): void => {
            dispatch(NavigationActions.navigateToPlannedRuns());
            dispatch(NavigationActions.closeMenu());
        },
        logout: (): void => {
            eventRegister.emitEvent(EventNames.logout);
        },
        getProfile: (): void => {
            dispatch(AuthActionsAsync.getProfile());
        }
    })
)
export class Menu extends BaseReduxComponent<IStateProps, IDispatchProps, IState, DrawerItemsProps> {
    constructor(props: DrawerItemsProps) {
        super(props);
        this.state = {isModalVisible: false};
    }

    componentWillReceiveProps(nextProps: IReduxProps<IStateProps, IEmpty>): void {
        const nextStateProps = nextProps.stateProps!;
        if (nextStateProps.isOpen != this.stateProps.isOpen && isIos) {
            StatusBar.setHidden(nextStateProps.isOpen, "slide");
        }
    }

    componentDidMount(): void {
        this.dispatchProps.getProfile();
    }

    private logout = (): void => {
        StatusBar.setHidden(false, "slide");
        this.dispatchProps.logout();
    };

    private showModal = (): void => {
        this.setState({isModalVisible: true});
    };

    private closeModal = (): void => {
        this.setState({isModalVisible: false});
    };

    render(): JSX.Element {
        const {profile, numberOfRuns} = this.stateProps;
        const {navigateToPlannedRuns, navigateToCurrentRun} = this.dispatchProps;

        return (
            <View style={styles.container}>
                {isIphoneX ? <View style={CommonStyles.iPhoneXFooter}/> : null}
                <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
                    <View>
                        <MenuHeader profile={profile}/>
                        <MenuItem title={localization.pages.currentRun} onPress={navigateToCurrentRun}/>
                        <MenuItem
                            title={localization.pages.plannedRuns}
                            onPress={navigateToPlannedRuns}
                            indicatorValue={numberOfRuns}
                        />
                    </View>
                    <MenuItem title={localization.auth.logoutDrawer} isBottom={true} onPress={this.showModal}/>
                </ScrollView>
                <VersionInfo/>
                <MainModal
                    title={localization.auth.logoutTitle}
                    body={localization.auth.logoutConfirmation}
                    isVisible={this.state.isModalVisible}
                    closeModal={this.closeModal}
                >
                    <TransparentButton
                        title={localization.auth.stay}
                        buttonType={ButtonType.disabled}
                        onPress={this.closeModal}
                    />
                    <TransparentButton
                        title={localization.auth.logout}
                        buttonType={ButtonType.negative}
                        onPress={this.logout}
                    />
                </MainModal>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "stretch",
        justifyContent: "flex-start"
    } as ViewStyle,
    scrollContent: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "space-between"
    } as ViewStyle
});

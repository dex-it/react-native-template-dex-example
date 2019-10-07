import React, {PureComponent} from "react";
import {LayoutAnimation, Modal, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Colors, Fonts, windowHeight} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";

export class PopupMenu extends PureComponent<IMenuProps, IMenuState> {
    toggle = (): void => {
        this.setState({visible: !this.state.visible});
    };
    show = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState({visible: true});
    };
    private close = (): void => {
        this.setState({visible: false});
        this.props.onClose && this.props.onClose();
    };

    constructor(props: IMenuProps) {
        super(props);
        this.state = {visible: false};
    }

    render(): JSX.Element {
        const {actions, title} = this.props;
        const height = Math.min(title != null ? (actions.length + 1) * 48 : actions.length * 48, windowHeight * 0.7);

        return (
            <View>
                <Modal
                    animationType={"fade"}
                    visible={this.state.visible}
                    transparent={true}
                    onRequestClose={this.close}
                >
                    <TouchableOpacity style={styles.wholeContainer} activeOpacity={1} onPress={this.close}>
                        <ScrollView
                            style={styleSheetFlatten({maxHeight: height})}
                            contentContainerStyle={styles.menuContainer}
                            scrollEnabled={true}
                            bounces={false}
                        >
                            {this.renderTitle()}
                            {actions.map((action, n) => this.renderItem(action, n))}
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>
                {this.renderContent()}
            </View>
        );
    }

    private renderItem(action: IPopupMenuAction, index: number): JSX.Element | null {
        const {isPremiumAllowed, proAction} = this.props;

        if (action.visible && !action.visible()) {
            return null;
        }

        return (
            <View key={index} style={styles.stretch}>
                <TouchableOpacity
                    onPress={this.action(!isPremiumAllowed && action.onlyForPro ? proAction : action.action)}
                    style={styles.menuItemContainer}
                    activeOpacity={0.7}
                >
                    <Text style={styles.menuText} numberOfLines={1}>
                        {action.name}
                    </Text>
                </TouchableOpacity>
                {this.props.actions.length == index + 1 ? null : <View style={styles.separator}/>}
            </View>
        );
    }

    private renderContent(): JSX.Element | null {
        const children = this.props.children;

        if (!children) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this.toggle} activeOpacity={0.7}>
                {children}
            </TouchableOpacity>
        );
    }

    private renderTitle(): JSX.Element | null {
        const title = this.props.title;
        if (title) {
            return (
                <View key={"title"} style={styles.stretch}>
                    <TouchableOpacity disabled={true} style={styles.titleContainer} activeOpacity={0.7}>
                        <Text style={styles.titleText} numberOfLines={1}>
                            {title}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.separator}/>
                </View>
            );
        } else {
            return null;
        }
    }

    private action(action?: () => void): () => void {
        if (action == null) {
            return this.close;
        } else {
            return (): void => {
                this.close();
                setTimeout(action, 300);
            };
        }
    }
}

interface IMenuProps {
    onClose?: () => void;
    actions: IPopupMenuAction[];
    title?: string;
    isPremiumAllowed?: boolean;
    proAction?: () => void;
}

interface IMenuState {
    visible: boolean;
}

export interface IPopupMenuAction {
    name: string;
    action: () => void;
    visible?: () => boolean;
    onlyForPro?: boolean;
}

const styles = styleSheetCreate({
    stretch: {alignSelf: "stretch"} as ViewStyle,
    proContainer: {marginLeft: 16} as ViewStyle,
    wholeContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00000058",
        paddingBottom: 30
    } as ViewStyle,
    menuContainer: {
        borderRadius: 4,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: Colors.white,
        marginHorizontal: 30
    } as ViewStyle,
    menuItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 45
    } as ViewStyle,
    menuText: {
        color: Colors.azul,
        fontFamily: Fonts.medium,
        fontSize: 16,
        alignSelf: "center"
    } as TextStyle,
    separator: {
        backgroundColor: Colors.dark,
        height: 1
    } as ViewStyle,
    titleContainer: {
        flexDirection: "row",
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        height: 53
    } as ViewStyle,
    titleText: {
        color: Colors.dark,
        fontFamily: Fonts.medium,
        fontSize: 18,
        lineHeight: 20,
        alignSelf: "center"
    } as TextStyle
});

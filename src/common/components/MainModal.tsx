import React, {PureComponent} from "react";
import {
    Modal,
    Platform,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from "react-native";
import {Colors, Fonts, windowHeight, windowWidth} from "../../core/theme";
import {styleSheetCreate} from "../utils";

interface IProps {
    title: string;
    body: string;
    isVisible: boolean;
    closeModal: () => void;
}

export class MainModal extends PureComponent<IProps> {
    render(): JSX.Element {
        const {title, body, closeModal, isVisible, children} = this.props;

        return (
            <Modal transparent={false} animationType={"fade"} visible={isVisible} onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        <TouchableOpacity activeOpacity={1} style={styles.contentContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.body}>{body}</Text>
                            <View style={styles.buttonsContainer}>
                                {children}
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = styleSheetCreate({
    modalBackground: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.charcoalGrey93,
    } as ViewStyle,
    contentContainer: {
        paddingTop: 21,
        minHeight: windowHeight / 2.58,
        width: windowWidth / 1.28,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: Colors.white,
        borderRadius: 2,
        ...Platform.select({
            ios: {
                shadowRadius: 10,
                shadowOpacity: 0.3,
                shadowOffset: {width: 0, height: 24},
            },
            android: {
                elevation: 3,
            }
        }),
    } as ViewStyle,
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    } as ViewStyle,
    title: {
        fontSize: 20,
        fontFamily: Fonts.medium,
        lineHeight: 28,
        letterSpacing: 0,
        color: Colors.black,
        marginBottom: 14,
        paddingHorizontal: 24,
    } as TextStyle,
    body: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        lineHeight: 20,
        letterSpacing: 0,
        color: Colors.black,
        paddingHorizontal: 24,
    } as TextStyle,
});
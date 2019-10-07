import React, {PureComponent} from "react";
import {ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {Profile} from "../../../core/api/generated/dto/Profile.g";
import {Colors, Fonts, menuWidth} from "../../../core/theme";
import {styleSheetCreate} from "../../../common/utils";
import {localization} from "../../../common/localization/localization";

interface IProps {
    profile: Profile | null;
}

const emptyProfile: Profile = {
    id: 0,
    name: "",
    surname: "",
    patronymic: "",
    full_name: "",
    phone: "",
    email: "",
    role: "",
};

export class MenuHeader extends PureComponent<IProps> {

    render(): JSX.Element {
        const profile = this.props.profile != null ? this.props.profile : emptyProfile;

        return (
            <View style={styles.container}>
                <Text style={styles.role} numberOfLines={1}>{this.getRole(profile.role)}</Text>
                <Text style={styles.name} numberOfLines={2}>{profile.full_name}</Text>
                <Text style={styles.email} numberOfLines={1}>{profile.email}</Text>
            </View>
        );
    }

    private getRole = (role: string): string => {
        switch (role) {
            case "driver":
                return localization.common.driver;
            case "executor":
                return localization.common.executor;
            default:
                return role;
        }
    }
}

const styles = styleSheetCreate({
    container: {
        backgroundColor: Colors.dark,
        paddingHorizontal: 21,
        paddingTop: 16,
        paddingBottom: 25,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    } as ViewStyle,
    image: {
        width: menuWidth,
        resizeMode: "cover",
    } as ImageStyle,
    role: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        lineHeight: 20,
        color: Colors.white,
    } as TextStyle,
    name: {
        fontFamily: Fonts.medium,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
        marginBottom: 3,
        color: Colors.white,
    } as TextStyle,
    email: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        lineHeight: 20,
        color: Colors.white,
    } as TextStyle,
});
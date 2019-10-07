import React, {PureComponent} from "react";
import {ScrollView, Text, TextStyle, View, ViewStyle} from "react-native";
import {Profile} from "../../core/api/generated/dto/Profile.g";
import {Colors, CommonStyles} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {AuthTextInput} from "../components/AuthTextInput";
import {ImageResources} from "../ImageResources.g";
import {MenuItem} from "../../navigation/menu/components/MenuItem";
import {showInDevAlert} from "../helpers";
import {MenuHeader} from "../../navigation/menu/components/MenuHeader";
import {MainButton} from "../components/MainButton";
import {localization} from "../localization/localization";
import {MainModal} from "../components/MainModal";
import {TransparentButton} from "../components/TransparentButton";
import {ButtonType} from "../enums/buttonType";
import {RunItem} from "../components/RunItem";

interface IState {
    value: string;
    isSecureTextEntry: boolean;
    isModalVisible: boolean;
}

export class Playground extends PureComponent<IEmpty, IState> {
    private onIconPress = (): void => {
        this.setState({isSecureTextEntry: !this.state.isSecureTextEntry});
    };
    private handleTextChange = (newText: string): void => this.setState({value: newText});

    constructor(props: IEmpty) {
        super(props);
        this.state = {value: "", isSecureTextEntry: true, isModalVisible: false};
    }

    render(): JSX.Element {
        return (
            <ScrollView style={CommonStyles.flexWhiteBackground}>
                {this.renderContentInfo("RunItem")}
                <RunItem
                    runId={"163500"}
                    orderId={"4516"}
                    from={"Павловский район, поселок Шкурлат 3-й"}
                    to={"Новохопёрский район, поселок Терновский"}
                    cargoDescription={"Новохопёрский район, поселок Терновский"}
                    onTakePress={showInDevAlert}
                />
                {this.renderContentInfo("AuthTextInput")}
                <AuthTextInput
                    label={"Test"}
                    value={this.state.value}
                    onChangeText={this.handleTextChange}
                />
                {this.renderContentInfo("AuthTextInput with error")}
                <AuthTextInput
                    label={"Test"}
                    value={this.state.value}
                    onChangeText={this.handleTextChange}
                    isError={true}
                />
                {this.renderContentInfo("AuthTextInput (password)")}
                <AuthTextInput
                    label={"Test"}
                    value={this.state.value}
                    onChangeText={this.handleTextChange}
                    secureTextEntry={this.state.isSecureTextEntry}
                    icon={this.state.isSecureTextEntry ? ImageResources.image_eye : ImageResources.image_eye_non}
                    onIconPress={this.onIconPress}
                />
                {this.renderContentInfo("MenuItem")}
                <MenuItem title={"Текущий рейс"} onPress={showInDevAlert}/>
                {this.renderContentInfo("MenuItem (bottom)")}
                <MenuItem title={"Текущий рейс"} onPress={showInDevAlert} isBottom={true}/>
                {this.renderContentInfo("MenuItem with indicator")}
                <MenuItem title={"Текущий рейс"} onPress={showInDevAlert} indicatorValue={"14"}/>
                {this.renderContentInfo("MenuHeader")}
                <MenuHeader profile={testData.profile}/>
                {this.renderContentInfo("MainButton (Positive)")}
                <MainButton
                    title={localization.runs.makeAPhoto}
                    buttonType={ButtonType.positive}
                    onPress={showInDevAlert}
                />
                {this.renderContentInfo("MainButton (Negative)")}
                <MainButton
                    title={localization.runs.refuseARun}
                    buttonType={ButtonType.negative}
                    onPress={showInDevAlert}
                />
                {this.renderContentInfo("MainButton (Disabled)")}
                <MainButton title={localization.auth.signIn} buttonType={ButtonType.disabled} disabled={true}/>
                {this.renderContentInfo("MainButton (Additional)")}
                <MainButton
                    title={localization.runs.reshoot}
                    buttonType={ButtonType.additional}
                    onPress={showInDevAlert}
                />
                {this.renderContentInfo("MainButton (Positive with an icon)")}
                <MainButton
                    title={localization.runs.frontSide}
                    buttonType={ButtonType.positive}
                    onPress={showInDevAlert}
                    icon={ImageResources.image_photo}
                />
                {this.renderContentInfo("TransparentButton (Positive)")}
                <TransparentButton title={localization.runs.yesTakeARun} buttonType={ButtonType.positive}/>
                {this.renderContentInfo("TransparentButton (Negative)")}
                <TransparentButton title={localization.runs.refuseARun} buttonType={ButtonType.negative}/>
                {this.renderContentInfo("TransparentButton (Disabled)")}
                <TransparentButton title={localization.common.no} buttonType={ButtonType.disabled}/>
                {this.renderContentInfo("MainModal with buttons within it")}
                <MainButton title={"Open modal"} buttonType={ButtonType.positive} onPress={this.openModal}/>
                <MainModal
                    title={localization.runs.run}
                    body={localization.runs.refusalConfirmationMessage}
                    isVisible={this.state.isModalVisible}
                    closeModal={this.closeModal}
                >
                    <TransparentButton title={localization.common.no} buttonType={ButtonType.disabled}/>
                    <TransparentButton title={localization.runs.yesTakeARun} buttonType={ButtonType.positive}/>
                </MainModal>
            </ScrollView>
        );
    }

    private renderContentInfo = (title: string): JSX.Element => {
        return (
            <React.Fragment>
                <View style={styles.contentContainer}/>
                <Text style={styles.title}>{title}</Text>
            </React.Fragment>
        );
    };

    private openModal = (): void => {
        this.setState({isModalVisible: true});
    };

    private closeModal = (): void => {
        this.setState({isModalVisible: false});
    }
}

export const testData = {
    profile: {
        id: 0,
        name: "Александр",
        surname: "Нечипуренко",
        patronymic: "Николаевич",
        full_name: "Нечипуренко Александр Николаевич",
        phone: "796019080",
        email: "alexnik1976.vrn@mail.ru",
        role: "driver",
    } as Profile,
    runs: [
        {
            id: "163500",
            order: {
                id: 4516,
                sender_address: "Павловский район, поселок Шкурлат 3-й",
                recipient_address: "Новохопёрский район, поселок Терновский",
                cargo: "Песок из отсевов дробления гранитов"
            },
        },
        {
            id: "162588",
            order: {
                id: 4051,
                sender_address: "Павловский район, поселок Шкурлат 3-й",
                recipient_address: "Городской округ Красногорск, Красногорск, Волоколамское шоссе",
                cargo: "Смесь щебеночно-песчаная С-6"
            },
        },
        {
            id: "162640",
            order: {
                id: 4533,
                sender_address: "Павловский район, поселок Шкурлат 3-й",
                recipient_address: "Тамбовская обл, Тамбовский р-н, поселок Строитель, ул Промышленная, д 31",
                cargo: "Смесь щебеночно-песчаная С-6"
            },
        },
    ],
};

const styles = styleSheetCreate({
    contentContainer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "purple"
    } as ViewStyle,
    title: {
        color: Colors.black,
        textAlign: "center",
        marginVertical: 10,
    } as TextStyle
});
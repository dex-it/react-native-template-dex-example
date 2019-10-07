import {Dimensions, Platform, StatusBar} from "react-native";
import {isIphoneX as isIphoneXFunc} from "./isIphoneX";

const windowDimensions = Dimensions.get("window");
export const isIos = Platform.OS == "ios";
export const isOldDroid = !isIos && Platform.Version <= 20 /* 4.4.4 */;
export const isAndroidLollipop = Platform.Version >= 21 && Platform.Version < 23;
export const isAndroidAndLollipopOrHigher = Platform.OS == "android" && Platform.Version >= 21;
export const isIphoneX = isIphoneXFunc();
export const windowWidth = windowDimensions.width;
export const windowHeight = windowDimensions.height - (!isIos ? StatusBar.currentHeight || 0 : 0);
export const screenTabInitialLayout = {height: 0, width: windowWidth};
export const menuWidth = windowWidth - windowWidth * 0.2;
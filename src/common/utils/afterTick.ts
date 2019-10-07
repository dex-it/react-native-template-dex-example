import {InteractionManager} from "react-native";

export function afterTick(action: () => void): void {
    setTimeout(() => InteractionManager.runAfterInteractions(action), 0);
}
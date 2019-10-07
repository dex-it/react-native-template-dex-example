import {Linking} from "react-native";
import {BugsnapConfiguration} from "../../core/BugsnapConfiguration";
import {showToastString} from "../showToast";
import {ignorePromise} from "../utils";

export abstract class BaseUrlOpener {
    constructor() {
        this.tryOpen = this.tryOpen.bind(this);
    }

    tryOpen(): void {
        const url = this.generateUrl();
        if (url == null) {
            return;
        }

        ignorePromise(this.tryOpenUrl(url, true));
    }

    // noinspection JSUnusedGlobalSymbols
    async open(): Promise<void> {
        const url = this.generateUrl();
        if (url == null) {
            return;
        }

        await this.tryOpenUrl(url, false);
    }

    protected async tryOpenUrl(url: string, handleError: boolean): Promise<void> {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
            BugsnapConfiguration.handlePromise(Linking.openURL(url));
        } else {
            if (handleError) {
                showToastString("Cannnot open url. Check app is installed.");
            } else {
                throw new Error("Cannnot open url. Check app is installed.");
            }
        }
    }

    protected abstract generateUrl(): string | null;

}
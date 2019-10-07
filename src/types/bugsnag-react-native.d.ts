declare module "bugsnag-react-native" {
    class Client {
        constructor(key: string | Configuration);

        notify: (
            error: any,
            beforeSendCallback?: (report: Report) => void,
            blocking?: boolean,
            postSendCallback?: () => void
        ) => void;

        leaveBreadcrumb(name: string, metadata: any): void;

        clearUser(): void;

        setUser(id: string, name: string, email: string): void;
    }

    class Configuration {
        apiKey: string;
        appVersion: string;
        codeBundleId?: string;
        autoNotify?: boolean;
        beforeSendCallbacks?: ((report: Report) => boolean)[];
        delivery?: StandardDelivery;
        handlePromiseRejections?: boolean;
        notifyReleaseStages?: string[];
        releaseStage?: string;
    }

    class Report {
        context?: string;
        errorClass?: string;
        errorMessage?: string;
        groupingHash?: string;
        metadata?: any;
        severity?: "error" | "warning" | "info";
    }

    class StandardDelivery {
        constructor(url: string);
    }
}

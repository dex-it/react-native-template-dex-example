interface IListenerHandler {
    callback: (data: any) => void;
    id: string;
}

export const EventNames = {
    logout: "logout",
};

class EventRegister {
    private listeners = new Map<string, IListenerHandler[]>(); // eventName, listeners
    private listenersToEvent = new Map<string, string>(); // listenerId, eventName

    addEventListener(eventName: string, callback: (data: any) => void): string {
        const callbacks = this.getOrCreateListeners(eventName);
        const listenerId = eventName + callbacks.length;

        callbacks.push({
            id: listenerId,
            callback
        });
        this.listenersToEvent.set(listenerId, eventName);

        return listenerId;
    }

    removeEventListener(listenerId: string): void {
        const eventName = this.listenersToEvent.get(listenerId);
        if (eventName != null) {
            const listeners = this.getOrCreateListeners(eventName);
            this.listeners.set(eventName, listeners.filter(i => i.id != listenerId));
        }
    }

    removeAllListeners(eventName: string): void {
        this.listeners.delete(eventName);
    }

    emitEvent(eventName: string, data?: any): void {
        const listeners = this.listeners.get(eventName);
        if (listeners != null) {
            listeners.forEach(i => i.callback(data));
        }
    }

    private getOrCreateListeners(eventName: string): IListenerHandler[] {
        let listeners = this.listeners.get(eventName);
        if (listeners == null) {
            listeners = [];
            this.listeners.set(eventName, listeners);
        }

        return listeners;
    }
}

export const eventRegister = new EventRegister();

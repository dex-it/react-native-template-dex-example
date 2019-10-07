import {PureComponent} from "react";

interface IProps {
    interval?: number;
    stopTimerOperation?: () => void;
    onTick?: () => void;
}

interface IState {
}

export class Timer extends PureComponent<IProps, IState> {
    private timerId: number | null = null;
    private tick = (): void => {
        if (this.props.onTick) {
            this.props.onTick();
        }
    };
    private stopTimer = (): void => {
        if (this.timerId != null) {
            clearInterval(this.timerId);
            this.timerId = null;
            this.props.stopTimerOperation && this.props.stopTimerOperation();
        }
    };
    private startTimer = (): void => {
        this.stopTimer();
        const interval = this.props.interval;
        this.timerId = setInterval(this.tick, interval != null ? interval : 1000);
    };

    componentDidMount(): void {
        this.tick();
        this.startTimer();
    }

    componentWillUnmount(): void {
        this.stopTimer();
    }

    render(): null {
        return null;
    }
}

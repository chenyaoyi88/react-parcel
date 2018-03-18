import * as React from 'react';
const styles = require('./index.scss');

interface Toast_Props {
    show?: boolean;
    text: string;
    duration?: number;
    toastClass?: string;
}

interface Toast_States {
    show?: boolean;
}

class Toast extends React.Component<Toast_Props, Toast_States>{

    constructor(props: Toast_Props) {
        super(props);
        this.state = {
            show: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: false
            });
        }, this.props.duration || 1000);
    }

    render() {
        const { text, duration, toastClass } = this.props;
        return (
            this.state.show ? <div className={[styles.toast, toastClass ? toastClass : ''].join(' ')}>
                <div className={styles['toast-wrap']}>
                    <div
                        className={[styles['toast-content'], styles.slideInUp, styles.animated].join(' ')}
                        style={{ WebkitAnimationDuration: (duration / 1000) + 's' }}
                    >{text}</div>
                </div>
            </div> : null
        );
    }
}

export { Toast };

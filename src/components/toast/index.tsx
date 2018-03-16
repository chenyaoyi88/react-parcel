import * as React from 'react';
const styles = require('./index.scss');

interface Toast_Props {
    text: string;
    toastClass?: string;
}

class Toast extends React.Component<Toast_Props, any>{
    render() {
        const { text, toastClass } = this.props;
        console.log(styles);
        return (
            <div className={[styles.toast, toastClass ? toastClass : ''].join(' ')}>
                <div className={styles['toast-wrap']}>
                    <div className={styles['toast-content']}>{text}</div>
                </div>
            </div>
        );
    }
}

export { Toast };

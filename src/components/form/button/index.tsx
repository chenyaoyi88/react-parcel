import * as React from 'react';
const styles = require('./index.scss');

interface Button_Props {
    btnName: string;
    btnClass: string;
}

class Button extends React.Component<Button_Props, any>{
    render() {
        const { btnName, btnClass } = this.props;
        return <button className={[styles.btn, btnClass ? btnClass : ''].join(' ')}>{btnName || '按钮'}</button>;
    }
}

export { Button };

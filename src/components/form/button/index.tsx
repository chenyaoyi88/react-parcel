import * as React from 'react';
import * as classNames from 'classnames';
const styles = require('./index.scss');

interface Button_Props {
    type?: string;
    children?: any;
    btnClass?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    onClick?: (...args: any[]) => void;
}

class Button extends React.Component<Button_Props, any>{

    constructor(props: Button_Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        this.props.onClick();
    }

    render() {
        const { type, children, btnClass, disabled, ...other } = this.props;

        return <button
            disabled={disabled}
            type={type || 'button'}
            className={classNames(styles.btn, btnClass ? btnClass : '')}
            onClick={this.handleClick}
            {...other}
        >{children || '按钮'}</button>;
    }
}

export { Button };

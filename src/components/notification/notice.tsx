/**
 * Notice 是 Toast 最底层组件
 * 每个黑色的小框框其实都是一个 Notice
 * Notice 核心就是组件初始化的时候 生成一个定时器
 * 根据输入的时间 加载一个动画 然后执行输入的回调
 * Notice 的显示和隐藏收到父组件 Notification 的绝对控制
*/

import * as React from 'react';
import * as classNames from 'classnames';

interface Notice_Props {
    type?: string;
    duration?: number;
    content?: any;
    onClose?: (...args: any[]) => void;
}

class Notice extends React.Component<Notice_Props, any> {

    static defaultProps = {
        duration: 1000
    };

    private closeTimer: any = null;

    constructor(props: Notice_Props) {
        super(props);
    }

    componentDidMount() {
        const { type, duration } = this.props;
        switch (type) {
            case 'toast':
                if (duration > 0) {
                    this.closeTimer = setTimeout(() => {
                        this.close();
                    }, duration);
                }
                break;
            case 'loading':
                break;
        }
    }

    componentWillUnmount() {
        const { type, duration } = this.props;
        switch (type) {
            case 'toast':
                // 当有意外关闭的时候 清掉定时器
                this.clearCloseTimer();
                break;
            case 'loading':
                break;
        }
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }

    close() {
        // 关闭的时候 应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束 执行回调
        this.clearCloseTimer();
        this.props.onClose && this.props.onClose();
    }

    render() {
        return (
            <div data-id="cyy-notice-box">
                {this.props.content}
            </div>
        )
    }
}

export { Notice };
// Notification 是 Notice 父组件，容器
// 是动态插入和删除 DOM 节点的核心
// 同时也向上暴露给 Toast 重写改变自己的方法
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Notice } from './notice';
const styles = require('./notification.scss');

interface Notification_States {
    // 存储当前有的notices
    notices: Array<any>;
    // 是否显示蒙版
    hasMask: boolean;
}

// 统计notice总数 防止重复
let noticeNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return `notification-${new Date().getTime()}-${noticeNumber++}`;
};

class Notification extends React.Component<null, Notification_States> {

    static reWrite = function () {
        const oDivNotification: HTMLDivElement = document.createElement('div');
        document.body.appendChild(oDivNotification);

        const notification: any = ReactDOM.render(
            <Notification />, oDivNotification
        );

        return {
            addNotice(noticeProps) {
                notification.add(noticeProps);
            },
            removeNoticeByKey(key) {
                notification.removeByKey(key);
            },
            removeNoticeByType(type) {
                notification.removeByType(type);
            },
            destroy() {
                ReactDOM.unmountComponentAtNode(oDivNotification);
                document.body.removeChild(oDivNotification);
            },
            component: notification
        }
    };;

    constructor(props) {
        super(props);
        this.state = {
            notices: [], // 存储当前有的notices
            hasMask: true, // 是否显示蒙版
        }
    }

    add(notice) {
        // 添加 notice
        // 创造一个不重复的key
        const { notices } = this.state;
        const key = notice.key ? notice.key : notice.key = getUuid();
        const mask = notice.mask ? notice.mask : false;
        const temp = notices.filter((item) => item.key === key).length;

        if (!temp) {
            // 不存在重复的 添加
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }

    }

    removeByKey(key) {
        // 根据key删除对应
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key)
            };
        });
    }

    removeByType(type) {
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.type !== type)
            };
        });
    }

    getNoticeDOM() {
        const __this = this;
        const { notices } = this.state;
        let result = [];

        notices.map((notice) => {
            // 每个 Notice onClose 的时候 删除掉 notices 中对应 key 的 notice
            const closeCallback = () => {
                __this.removeByKey(notice.key);
                // 如果有用户传入的 onClose 执行
                notice.onClose && notice.onClose();
            };

            result.push(<Notice key={notice.key} {...notice} onClose={closeCallback} />);
        });

        return result;
    }

    getMaskDOM() {
        const { notices, hasMask } = this.state;
        // notices 为空的时候 不显示蒙版
        // 始终只有一个蒙版
        if (notices.length > 0 && hasMask) {
            return <div className={styles['cyy-mask']}></div>;
        }
    }

    render() {
        const maskDOM = this.getMaskDOM();
        const noticesDOM = this.getNoticeDOM();

        return (
            <div>
                {maskDOM}
                {noticesDOM}
            </div>
        )
    }
}

export { Notification };
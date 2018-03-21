import * as React from 'react';
import * as classNames from 'classnames';
import { Notification } from '../notification';
const styles = require('./toast.scss');

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast 组件核心就是通过 Notification 暴露的重写方法 动态改变Notification
let globalNotification: any = null;

// 获得一个 Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个 Notification
    if (!globalNotification) {
        globalNotification = Notification.reWrite();
    }
    return globalNotification;
};

interface Toast_Options {
    type?: string;
    content: string;
    duration?: number;
    mask?: boolean;
    onClose?: (...args: any[]) => void;
}

function toastNotice(opts: any) {
    const options: Toast_Options = opts || {};
    options.duration = options.duration || 1000;
    options.mask = options.mask || false;
    options.onClose = options.onClose || function onClose() { };

    getNewNotification().addNotice({
        type: 'toast',
        duration: options.duration,
        mask: options.mask,
        content: options.type ? (
            <div className={classNames(styles["cyy-toast-box"], (options.mask ? "" : styles["mask-hide"]), styles[options.type])}>
                <div className={classNames(styles["cyy-toast-content"], styles["slideInUp"], styles["animated"])}>
                    {/* <div>放图片的位置</div> */}
                    {options.content}
                </div>
            </div>
        ) : (
                <div className={classNames(styles["cyy-toast-box"], (options.mask ? "" : styles["mask-hide"]))}>
                    <div className={classNames(styles["cyy-toast-content"], styles["slideInUp"], styles["animated"])}>{options.content}</div>
                </div>
            ),
        onClose: () => {
            options.onClose && options.onClose();
        },
    });
};

const Toast = {
    show(opts: Toast_Options) {
        return toastNotice(opts);
    },
    // 销毁
    hide() {
        if (globalNotification) {
            globalNotification.destroy();
            globalNotification = null;
        }
    }
};

interface Loading_Options {
    content?: string;
    mask?: boolean;
    onClose?: (...args: any[]) => void;
}

function loadingShow(opts: any) {
    const options: Loading_Options = opts || {};
    options.mask = options.mask || true;
    getNewNotification().addNotice({
        type: 'loading',
        mask: options.mask,
        content: (<div>loading</div>)
    });
}

function loadingDestory() { 
    getNewNotification().removeNoticeByType('loading');
}

const Loading = {
    show(opts: any) {
        return loadingShow(opts);
    },
    hide() {
        loadingDestory();
    }
}


export { Toast, Loading };
import * as React from 'react';
import * as classNames from 'classnames';
import { Notification } from '../notification';
const styles = require('./index.scss');

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast 组件核心就是通过 Notification 暴露的重写方法 动态改变Notification
let newNotification: any = null;

// 获得一个 Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个 Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }
    return newNotification;
};

// // notice方法实际上就是集合参数 完成对Notification的改变
// const notice = (content, type, icon: string = '', duration: number = 1000, onClose?: Function, mask: boolean = true) => {
//     let notificationInstance = getNewNotification();

//     notificationInstance.notice({
//         duration,
//         mask: mask,
//         content: !!icon ? (
//             <div className={
//                 classNames(['cyy-toast-box',
//                     { 'info': type === 'info' },
//                     { 'success': type === 'success' },
//                     { 'warning': type === 'warning' },
//                     { 'error': type === 'error' }
//                 ])
//             }>
//                 <div className="cyy-toast-icon"><i className={"fa " + icon}></i></div>
//                 <div className="cyy-toast-content">{content}</div>
//             </div>
//         ) : (
//                 <div className={styles["cyy-toast-box"]}>
//                     <div className={[styles["cyy-toast-content"], styles["slideInUp"], styles["animated"]].join(' ')}>{content}</div>
//                 </div>
//             ),
//         onClose: () => {
//             onClose && onClose();
//         },
//     });
// };

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

    let notificationInstance = getNewNotification();

    notificationInstance.notice({
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
    // // 普通效果
    // show1(content, duration, icon, mask, onClose) {
    //     return notice(content, undefined, icon, duration, onClose, mask);
    // },
    // // 翻转效果
    // info(content, duration, icon?: string, mask: boolean = false, onClose?: Function) {
    //     return notice(content, 'info', icon, duration, onClose, mask);
    // },
    // // 缩放效果
    // success(content, duration, icon, mask, onClose) {
    //     return notice(content, 'success', icon, duration, onClose, mask);
    // },
    // // 从下方滑入
    // warning(content, duration, icon, mask, onClose) {
    //     return notice(content, 'warning', icon, duration, onClose, mask);
    // },
    // // 抖动
    // error(content, duration, icon, mask, onClose) {
    //     return notice(content, 'error', icon, duration, onClose, mask);
    // },
    // 销毁
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    }
};

export { Toast };
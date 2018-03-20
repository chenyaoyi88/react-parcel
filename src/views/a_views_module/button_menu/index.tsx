import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const styles = require('./index.scss');

const ButtonMenu = () => (
    <div className={styles["button-menu-box"]}>
        <ul>
            <li>
                <Link to="/">微信</Link>
            </li>
            <li>
                <Link to="/contacts">通讯录</Link>
            </li>
            <li>
                <Link to="/discover">发现</Link>
            </li>
            <li>
                <Link to="/me">我</Link>
            </li>
        </ul>
    </div>
);

export { ButtonMenu };
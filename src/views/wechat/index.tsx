import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

import { ButtonMenu } from '../index';

class Wechat extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="wechat-box">
                this is Wechat page!
                <ButtonMenu></ButtonMenu>
            </div>
        );
    }
}

export { Wechat };
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonMenu } from '../index';
import './index.scss';

class Me extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="me-box">
                this is Me page!
                <ButtonMenu></ButtonMenu>
            </div>
        );
    }
}

export { Me };
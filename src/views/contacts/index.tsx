import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonMenu } from '../index';
const styles = require('./index.scss');

class Contacts extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={styles["contacts-box"]}>
                this is Contacts page!
                <ButtonMenu></ButtonMenu>
            </div>
        );
    }
}

export { Contacts };
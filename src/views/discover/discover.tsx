import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import { ButtonMenu } from '../index';

class Discover extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    add() {
        this.props.handleAddTodo('fuck');
    }

    render() {
        return (
            <div className="discover-box">
                <p>this is Discover page!</p>
                <p>{this.props.addTodoData}</p>
                <p>
                    <button onClick={() => this.add()}>按钮</button>
                </p>
                <ButtonMenu></ButtonMenu>
            </div>
        );
    }
}

export { Discover };
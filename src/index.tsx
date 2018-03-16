import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sass/index.scss';
import { Button, Toast } from './components';

class App extends React.Component<any, any>{
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <Button btnClass="abc" btnName="按钮" />
        <Toast text="fuck" />
      </div>
    );
  }
}

ReactDOM.render(<App name="cyy" />, document.getElementById("root"));
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './sass/index.scss';
import { Button, Toast } from './components';

class App extends React.Component<any, any>{

  constructor(props: any) { 
    super(props);
    this.state = {
      showToast: false
    };
  }

  private handleClick() {
    this.setState({
      showToast: true
    });
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <Button
          btnClass="abc"
          onClick={this.handleClick}
          style={{ color: 'red' }}
        >按钮啊</Button>
        <Toast text="fuck" show={this.state.showToast} />
      </div>
    );
  }
}

ReactDOM.render(<App name="cyy" />, document.getElementById("root"));
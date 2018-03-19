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
    Toast.show({
      // type: 'info',
      content: 'Toast 提示',
      // mask: true
    });
  }

  componentWillMount() { 
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <Button onClick={this.handleClick}>toast1</Button>
        <div>{this.props.name}</div>
        <Button onClick={this.handleClick}>toast2</Button>
        {/* <Toast text="fuck" show={this.state.showToast} /> */}
      </div>
    );
  }
}

ReactDOM.render(<App name="cyy" />, document.getElementById("root"));
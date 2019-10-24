import React, {Component} from 'react';
// import createReactClass from 'create-react-class';
// import {View, Text} from 'react-native';
import {Card} from 'native-base';

interface IProps {
  onTouchEnd?: (event: any) => void;
  style?: any;
}

class OlCard extends Component<IProps> {
  public state = {
    color: $color.pure_white,
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Card
        onTouchStart={(ev: any) => {
          this.setState({color: $color.opacity_white});
        }}
        onTouchCancel={(ev: any) => {
          this.setState({color: $color.pure_white});
        }}
        onTouchEnd={(ev: any) => {
          this.setState({color: $color.pure_white});
          if (this.props.onTouchEnd) {
            this.props.onTouchEnd(ev);
          }
        }}
        style={{backgroundColor: this.state.color, ...this.props.style}}>
        {this.props.children}
      </Card>
    );
  }
}

export {OlCard};

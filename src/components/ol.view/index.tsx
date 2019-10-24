import React, {Component} from 'react';
// import createReactClass from 'create-react-class';
import {View, ViewStyle} from 'react-native';
// import {Card} from 'native-base';

interface IProps {
  onTouchEnd?: (event: any) => void;
  style?: ViewStyle;
}

class OlView extends Component<IProps> {
  public state = {
    color: $color.pure_white,
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <View
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
      </View>
    );
  }
}

export {OlView};

import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import moment from 'moment';
import {
  View,
  ViewStyle,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from 'react-native';
import {Icon, Card} from 'native-base';
import {OlView} from '../ol.view';
interface IProps {
  header: React.ReactElement<any> | (() => React.ReactElement<any>) | null;
  visable?: boolean;
  style?: ViewStyle;
  onTouchEnd?: (event: GestureResponderEvent) => void;
}
interface IState {
  visable: boolean;
}
@observer
class CollapseVItem extends Component<IProps> {
  public state: IState = {
    visable: this.props.visable ? this.props.visable : false,
  };
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{width: '100%'}}>
        <View
          onTouchEnd={(event: GestureResponderEvent) => {
            this.setState({visable: !this.state.visable});
            if (this.props.onTouchEnd) {
              this.props.onTouchEnd(event);
            }
          }}>
          {this.props.header}
        </View>
        {this.state.visable && (
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 3,
              ...this.props.style,
            }}>
            {this.props.children}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {CollapseVItem};

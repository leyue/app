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
  title: string;
  subTitle?: string | null;
  style?: ViewStyle;
  visable?: boolean;
  onTouchEnd?: (event: GestureResponderEvent) => void;
}
interface IState {
  visable: boolean;
}
@observer
class CollapseCItem extends Component<IProps> {
  public state: IState = {
    visable: this.props.visable ? this.props.visable : false,
  };
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Card>
        <OlView
          style={{
            paddingHorizontal: 7,
            height: 25,
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: $color.clounds,
          }}
          onTouchEnd={(event: GestureResponderEvent) => {
            if (this.props.subTitle) {
              return;
            }
            this.setState({visable: !this.state.visable});
            if (this.props.onTouchEnd) {
              this.props.onTouchEnd(event);
            }
          }}>
          <Text
            style={{flex: 2, color: $color.wet_asphalt, fontWeight: 'bold'}}>
            {this.props.title}
          </Text>
          <Text style={{color: $color.silver}}>{this.props.subTitle}</Text>
          {!this.props.subTitle && (
            <Icon
              style={{color: $color.asbestos, fontSize: 24}}
              name={this.state.visable ? 'ios-arrow-up' : 'ios-arrow-forward'}
            />
          )}
        </OlView>
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
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export {CollapseCItem};

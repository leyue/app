import React, {Component} from 'react';
import createReactClass from 'create-react-class';
import {
  View,
  Text,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Radio} from 'native-base';

interface IData {
  val: string;
  alias?: string;
}

interface IProps {
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  selectedIdx?: Number;
  selectedVal?: string;
  data: IData[];
  onPress?: (idx: number, val: string) => void;
}

class RadioGroup extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.props.data.map((item: IData, idx: any) => {
          let selected = false;
          if (this.props.selectedIdx != null) {
            if (idx == this.props.selectedIdx) {
              selected = true;
            }
          }
          if (this.props.selectedVal != null) {
            if (item.val == this.props.selectedVal) {
              selected = true;
            }
          }
          return (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...this.props.itemStyle,
              }}
              onTouchEnd={(ev: GestureResponderEvent) => {
                if (this.props.onPress) {
                  this.props.onPress(idx, item.val);
                }
              }}>
              <Radio
                color={$color.light_dark}
                selectedColor={$color.wet_asphalt}
                selected={selected ? true : false}
              />
              <Text style={{marginRight: 5}}>
                {item.alias ? item.alias : item.val}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export {RadioGroup};

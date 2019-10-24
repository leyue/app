import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {List, ListItem} from 'native-base';
import moment from 'moment';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {OlView} from '../ol.view';
import {string} from 'prop-types';

interface IData {
  val: string;
  alias?: string;
}
interface IProps {
  selectedIdx?: number;
  selectedVal?: string;
  data: IData[];
  onSelectChanged?(idx: number, val: string): void;
}

@observer
class SelectTabs extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  // static getDerivedStateFromProps(nextProps: any, prevState: any) {
  //   return {
  //     selectedIdx: nextProps.selectedIdx,
  //     selectedVal: nextProps.selectedVal,
  //   };
  // }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#fff0',
          borderBottomColor: $color.clounds,
        }}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item: any, idx) => {
            item.idx = idx;
            return idx.toString();
          }}
          renderItem={({item, index}: any) => {
            let selected = false;
            if (this.props.selectedIdx != null) {
              if (index == this.props.selectedIdx) {
                selected = true;
              }
            }
            if (this.props.selectedVal != null) {
              if (item.val == this.props.selectedVal) {
                selected = true;
              }
            }
            return (
              <OlView
                key={index}
                style={{
                  paddingHorizontal: 5,
                  height: 35,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 3,
                  borderBottomColor: selected
                    ? $color.wet_asphalt
                    : $color.white,
                }}
                onTouchEnd={() => {
                  if (this.props.onSelectChanged) {
                    this.props.onSelectChanged(index, item.val);
                  }
                }}>
                <Text
                  style={{
                    fontWeight: selected ? 'bold' : 'normal',
                    color: selected ? $color.wet_asphalt : $color.light_dark,
                  }}>
                  {item.alias ? item.alias : item.val}
                </Text>
              </OlView>
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {SelectTabs};

import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount} from '../../../stores';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';
import {OlCard} from '../../../components';

type IProps = {};

@observer
class Add extends Component<IProps> {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Add',
      tabBarLabel: 'Task',
    };
  };

  public state: any = {
    tasks: [],
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    try {
    } catch (e) {}
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: $color.white,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});

export default Add;

import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import moment from 'moment';
import {IAccount, ITask} from '../../../stores';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

type IProps = {};

@observer
class TaskHeader extends Component<IProps> {
  public state: any = {};

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <View>
        <Text>Add</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default TaskHeader;

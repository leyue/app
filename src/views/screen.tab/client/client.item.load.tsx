import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text, ProgressBarAndroid} from 'react-native';
import {Card, Button, Toast} from 'native-base';
import {LineChart} from 'react-native-charts-wrapper';
import DatePicker from 'react-native-datepicker';
import {OlView, CollapseVItem, DlgConfirm} from '../../../components';
import {number} from 'prop-types';

type IProps = {
  mac: string;
};

@observer
class ClientItemLoad extends Component<IProps> {
  public state: any = {
    type: 'week',
    year: moment().year(),
    week: moment().week(),
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    let mac = this.props.mac;
    await this.formatWeekData();
  }

  async formatWeekData() {
    let mac = this.props.mac;
    let {st, et} = $time.getWeekDuration(this.state.year, this.state.week);
    let where = {
      mac,
      time: {$gte: new Date(st), $lte: new Date(et)},
    };
    let data = await $ax.get(`/cli_load?where=${JSON.stringify(where)}`);
  }

  render() {
    return (
      <CollapseVItem
        style={{paddingHorizontal: 0, paddingVertical: 3}}
        onTouchEnd={async () => {}}
        header={
          <OlView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 3,
            }}>
            <Text style={{color: $color.midnight_blue}}>更多信息</Text>
          </OlView>
        }>
        <View style={{marginTop: 5}}>
          <LineChart
            style={{height: 200}}
            data={{
              dataSets: [{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]}],
            }}
          />
        </View>
      </CollapseVItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export {ClientItemLoad};

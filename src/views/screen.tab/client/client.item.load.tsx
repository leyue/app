import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text, ProgressBarAndroid} from 'react-native';
import {Card, Button, Toast} from 'native-base';
import {LineChart, BarChart} from 'react-native-charts-wrapper';
import Echarts from 'native-echarts';
import DatePicker from 'react-native-datepicker';
import {
  OlView,
  CollapseVItem,
  DlgConfirm,
  RadioGroup,
} from '../../../components';
import {number} from 'prop-types';

const DAR_TIME = 24 * 60 * 60 * 10;

type IProps = {
  mac: string;
};

@observer
class ClientItemLoad extends Component<IProps> {
  public state: any = {
    type: 'week',
    year: moment().year(),
    month: moment().month(),
    week: moment().week(),
    title: '',
    barNames: [],
    data: [],
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    await this.formatData();
  }

  async goBack() {
    let {year, month, week} = this.state;
    switch (this.state.type) {
      case 'month':
        break;
      case 'week':
        this.setState({week: week - 1});
        await $func.mSleep(100);
        await this.formatWeekData();
        break;
      case 'day':
        break;
    }
  }

  async goForward() {
    let {year, month, week} = this.state;
    switch (this.state.type) {
      case 'month':
        break;
      case 'week':
        if (week >= moment().week()) {
          Toast.show({
            text: '不能大于当前时间',
            buttonText: 'Ok',
            type: 'danger',
            position: 'top',
            duration: 3000,
          });
          return;
        }
        this.setState({week: week + 1});
        await $func.mSleep(100);
        await this.formatWeekData();
        break;
      case 'day':
        break;
    }
  }

  async formatData() {
    switch (this.state.type) {
      case 'month':
        break;
      case 'week':
        await this.formatWeekData();
        break;
      case 'day':
        break;
    }
  }

  async formatWeekData() {
    let mac = this.props.mac;
    let {year, week} = this.state;
    let {st, et, days} = $time.getWeekDuration(year, week);
    let where = {
      mac,
      time: {$gte: st, $lte: et},
    };
    let req = `/cli_load?where=${JSON.stringify(where)}`;
    let docs: any[] = await $ax.get(req);
    let titles: string[] = [];
    let data: number[] = [];
    for (let day of days) {
      let doc = docs.find((value, idx, arr) => {
        let time = value.time
          .split('T')[0]
          .replaceAll(`${year}-`, '')
          .replaceAll('-', '.');
        return time == day;
      });
      if (!doc) {
        data.push(0);
      } else {
        let loadTime = 0;
        for (let load of doc.load) {
          loadTime += load.dt;
        }
        data.push(loadTime / DAR_TIME);
      }
    }
    this.setState({title: `${year}-W${week}`, barNames: days, data});
  }

  render() {
    const option = {
      legend: {
        data: [this.state.title],
      },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['高负载', '低负载'],
        dimension: 1,
        inRange: {
          color: [$color.silver, $color.midnight_blue],
        },
      },
      color: [$color.wet_asphalt],
      xAxis: {
        type: 'category',
        data: this.state.barNames,
      },
      yAxis: {
        type: 'value',
        max: 100,
        min: 0,
      },
      series: [
        {
          name: this.state.title,
          data: this.state.data,
          type: 'bar',
        },
      ],
    };
    return (
      <View style={{padding: 0}}>
        <Echarts option={option} height={250} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 2}} />
          <Button
            style={{
              backgroundColor: $color.wet_asphalt,
              justifyContent: 'center',
              height: 25,
              paddingHorizontal: 15,
            }}
            disabled={this.state.uploading}
            onPress={this.goBack.bind(this)}>
            <Text style={{color: $color.white, fontSize: 20}}>{'<'}</Text>
          </Button>
          <RadioGroup
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: $color.clounds,
              marginHorizontal: 10,
            }}
            itemStyle={{marginRight: 5}}
            selectedVal={this.state.type}
            data={[
              {val: 'month', alias: '月'},
              {val: 'week', alias: '周'},
              {val: 'day', alias: '天'},
            ]}
            onPress={async (idx: number, val: string) => {
              this.setState({status: val});
            }}
          />
          <Button
            style={{
              backgroundColor: $color.wet_asphalt,
              justifyContent: 'center',
              height: 25,
              paddingHorizontal: 15,
            }}
            disabled={this.state.uploading}
            onPress={this.goForward.bind(this)}>
            <Text style={{color: $color.white, fontSize: 20}}>{'>'}</Text>
          </Button>
          <View style={{flex: 2}} />
        </View>
      </View>
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

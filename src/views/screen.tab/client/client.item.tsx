import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text, ProgressBarAndroid} from 'react-native';
import {Card, Button} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {OlView, CollapseVItem, DlgConfirm} from '../../../components';

type IProps = {
  data: any;
};

@observer
class ClientItem extends Component<IProps> {
  public state: any = {
    sTime: '',
    eTime: '',
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  async updateSchedule() {
    let doc = this.props.data;
    await $ax.post('/cliSchedule', {
      action: 'update',
      mac: doc.index.mac,
      sTime: this.state.sTime,
      eTime: this.state.eTime,
    });
  }

  render() {
    let doc = this.props.data;
    return (
      <Card style={{paddingHorizontal: 10, paddingVertical: 7}}>
        {this.renderBasic()}
        {this.renderStatus()}
        {this.renderAbility()}
        {this.renderSchedule()}
      </Card>
    );
  }

  renderBasic() {
    let doc = this.props.data;
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>主机</Text>
          <Text style={{width: '80%'}}>{doc.index.mac}</Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>服务器</Text>
          <Text style={{width: '80%'}}>{doc.index.hostname}</Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>管理员</Text>
          <Text style={{width: '80%'}}>{doc.index.user}</Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>系统</Text>
          <Text style={{width: '80%'}}>{doc.ability.os}</Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>SWITCH</Text>
          <Text style={{width: '80%'}}>
            {doc.ability.switch == 1 ? 'on' : 'off'}
          </Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>类型</Text>
          <Text style={{width: '80%'}}>{JSON.stringify(doc.ability.type)}</Text>
          <View style={{flex: 2}} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>仪器</Text>
          <Text style={{width: '80%'}}>
            {JSON.stringify(doc.ability.instrument)}
          </Text>
          <View style={{flex: 2}} />
        </View>
      </View>
    );
  }

  renderStatus() {
    let doc = this.props.data;
    let status = doc.status.name;
    let color = $color.nephritis;
    let progress = 0.0;
    if (status === 'busy') {
      color = $color.orange;
      if (doc.task._case.progress) {
        progress =
          +doc.task._case.progress.slice(
            0,
            doc.task._case.progress.length - 1,
          ) / 100;
      }
    }
    return (
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%', color}}>状态</Text>
          <Text style={{width: '80%', color}}>{doc.status.name}</Text>
          <View style={{flex: 2}} />
        </View>
        {status === 'busy' && (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '20%', color}}>任务</Text>
              <Text
                style={{
                  width: '80%',
                  color,
                }}>{`${doc.task.type}-${doc.task.app}`}</Text>
              <View style={{flex: 2}} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '20%', color}}>CASE</Text>
              <Text style={{width: '80%', color}}>{doc.task._case.alias}</Text>
              <View style={{flex: 2}} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '20%', color}}>进度</Text>
              <ProgressBarAndroid
                style={{width: '50%'}}
                styleAttr={'Horizontal'}
                progress={progress}
                color={$color.orange}
                animating={true}
                indeterminate={false}
              />
              <View style={{flex: 2}} />
            </View>
          </View>
        )}
      </View>
    );
  }

  renderAbility() {
    let doc = this.props.data;
    return (
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>主机</Text>
          <Text style={{width: '80%'}}>{doc.index.mac}</Text>
          <View style={{flex: 2}} />
        </View>
      </View>
    );
  }

  renderSchedule() {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{width: '20%'}}>压测时间</Text>
          <DatePicker
            style={{width: 90}}
            date={this.state.sTime}
            mode="time"
            placeholder="输入开始时间"
            format="HH:mm"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {},
              dateText: {},
              dateInput: {
                height: 30,
                color: $color.wet_asphalt,
                borderWidth: 0,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({sTime: date});
            }}
          />
          <DatePicker
            style={{width: 90}}
            date={this.state.eTime}
            mode="time"
            placeholder="输入结束时间"
            format="HH:mm"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {},
              dateText: {},
              dateInput: {
                height: 30,
                color: $color.wet_asphalt,
                borderWidth: 0,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({eTime: date});
            }}
          />
          <View style={{flex: 2}} />
          <Button
            style={{
              backgroundColor: $color.wet_asphalt,
              justifyContent: 'center',
              height: 25,
              paddingHorizontal: 5,
            }}
            disabled={this.state.uploading}
            onPress={() => {}}>
            <Text style={{color: $color.white, fontSize: 20}}>确认</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {ClientItem};

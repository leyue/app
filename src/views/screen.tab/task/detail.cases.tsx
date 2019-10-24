import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ProgressBarAndroid,
  Linking,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {Card, CardItem, Icon, Button, Picker, Item} from 'native-base';
import {
  SelectTabs,
  CollapseCItem,
  OlView,
  PopupMenu,
  RadioGroup,
} from '../../../components';
import {DetailCaseOnline} from './detail.case.online';
import {DetailCaseOffline} from './detail.case.offline';
import {any} from 'prop-types';

interface IProps {
  type: string;
}

@observer
class DetailCases extends Component<IProps> {
  public state: any = {
    cases: null,
    modules: [],
    moduleIdx: 0,
    module: '',
  };

  constructor(props: IProps) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];
    let cases =
      nextProps.type == 'online'
        ? doc.archive.cases.online
        : doc.archive.cases.offline;
    let modules = Object.keys(cases);
    let module = '';
    if (modules.length >= 0) {
      module = modules[0];
      if (modules.includes(prevState.module)) {
        module = prevState.module;
      }
    }
    let nextState = {
      cases,
      modules,
      module,
    };
    return nextState;
  }

  async componentDidMount() {}

  render() {
    let modules = this.state.modules;
    let status =
      this.props.type == 'online'
        ? $stores.task.detail.onlineStatus
        : $stores.task.detail.offlineStatus;
    return (
      <View style={{width: '100%'}}>
        <RadioGroup
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: $color.clounds,
          }}
          itemStyle={{marginRight: 5}}
          selectedVal={status}
          data={[
            {val: '*', alias: '全部'},
            {val: 'confirm', alias: '待确认'},
            {val: 'bug', alias: 'BUG'},
            {val: 'failed', alias: '失败项'},
            {val: 'ongoing', alias: '测试中'},
          ]}
          onPress={async (idx: number, val: string) => {
            if (this.props.type == 'online') {
              $stores.task.detail.setOnlineStatus(val);
            } else {
              $stores.task.detail.setOfflineStatus(val);
            }
          }}
        />
        {modules.length == 0 && (
          <View style={{padding: 10, alignItems: 'center'}}>
            <Text>无数据</Text>
          </View>
        )}
        {modules.length > 0 && this.renderData()}
      </View>
    );
  }

  renderData() {
    let type = this.props.type;
    let cases = this.state.cases;
    let modules = this.state.modules;
    let module = this.state.module;
    let moduleData: any[] = [];
    modules.map((item: string) => {
      moduleData.push({
        val: item,
        alias: type == 'online' ? item : item.replaceAll('OFFLINE_', ''),
      });
    });
    let categorys = Object.keys(cases[module]);
    return (
      <View>
        <SelectTabs
          selectedVal={module}
          data={moduleData}
          onSelectChanged={(idx: number, val: string) => {
            this.setState({moduleIdx: idx, module: val});
          }}
        />
        {categorys.map((category: string, idx: number) => {
          let categoryCases = cases[module][category];
          return (
            <CollapseCItem
              key={idx}
              title={category}
              visable={true}
              style={{paddingHorizontal: 0, paddingVertical: 0}}>
              <FlatList
                data={categoryCases}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({item, idx}: any) => {
                  if (this.props.type == 'online') {
                    return <DetailCaseOnline key={idx} item={item} />;
                  } else {
                    return <DetailCaseOffline key={idx} item={item} />;
                  }
                }}
              />
            </CollapseCItem>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailCases};

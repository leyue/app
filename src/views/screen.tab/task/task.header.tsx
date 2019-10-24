import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';
import moment from 'moment';
import {IAccount, ITask} from '../../../stores';
import {color} from '../../../glob/styles';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ActionSheet, Icon, Card, CardItem} from 'native-base';
import {PopupMenu, OlView} from '../../../components';

type IProps = {};

@observer
class TaskHeader extends Component<IProps> {
  public state: any = {
    tasks: [],
    idx: 0,
    showAction: false,
    showSort: false,
    showSearch: false,
  };
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <View
        onTouchEnd={() => {
          if (this.state.showAction) {
            this.setState({showAction: false});
          }
          if (this.state.showSort) {
            this.setState({showSort: false});
          }
          if (this.state.showSearch) {
            this.setState({showSearch: false});
          }
        }}
        style={{
          backgroundColor: $color.wet_asphalt,
          paddingLeft: 10,
          paddingRight: 10,
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {this.renderMenu()}
        {this.renderAction()}
        <View style={{flex: 2}} />
        {this.renderSort()}
        {this.renderSearch()}
      </View>
    );
  }

  renderMenu() {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginLeft: 5, marginTop: 3}}
        onPress={() => {
          $nav.openDrawer();
        }}>
        <Icon name={'md-menu'} style={{color: $color.white, fontSize: 24}} />
      </TouchableOpacity>
    );
  }

  renderAction() {
    const titles = ['已提交', '我的提交', '待处理'];
    const status: any = {
      '*': '*',
      ongoing: '测试中',
      passed: '成功',
      failed: '失败',
      owner_confirm: '待确认',
      retest: '重测的',
    };
    let title = `${titles[$stores.task.root.action]} ${
      status[$stores.task.root.status]
    } (${$stores.task.root.total})`;

    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginLeft: 30, marginTop: 3}}
        onPress={() => {
          this.setState({showAction: true});
        }}>
        <Text
          style={{
            height: '100%',
            fontSize: 15,
            fontWeight: 'bold',
            color: $color.white,
          }}>
          {title}
        </Text>
        <Icon
          style={{color: $color.white, fontSize: 24}}
          name={'arrow-dropdown'}
        />
        <PopupMenu
          visable={this.state.showAction}
          theme={1}
          top={51}
          left={7}
          width={130}
          data={[
            {icon: 'md-boat', val: '0', alias: '已提交'},
            {icon: 'md-albums', val: '1', alias: '我的提交'},
            {icon: 'md-archive', val: '2', alias: '待处理'},
          ]}
          onClose={async (val: string, alias: string) => {
            this.setState({showAction: false});
            $stores.task.root.setAction(+val);
            await $stores.task.root.getDocs();
          }}
        />
      </TouchableOpacity>
    );
  }

  renderSort() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({showSort: true});
        }}>
        <Icon
          style={{color: $color.white, fontSize: 24}}
          name={'md-trending-down'}
        />
        <PopupMenu
          visable={this.state.showSort}
          theme={1}
          top={51}
          left={$dev.screen.width - 130 - 10}
          width={130}
          data={[
            {icon: 'md-boat', val: 'cTime', alias: '提交时间'},
            {icon: 'md-albums', val: 'committer', alias: '提交者'},
            {icon: 'md-archive', val: 'status.name', alias: '状态'},
          ]}
          onClose={async (val: string, alias: string) => {
            this.setState({showSort: false});
            $stores.task.root.setSortBy(val);
            await $stores.task.root.getDocs();
          }}
        />
      </TouchableOpacity>
    );
  }

  renderSearch() {
    return (
      <TouchableOpacity
        style={{marginLeft: 30}}
        onPress={() => {
          this.setState({showSearch: true});
        }}>
        <Icon name={'ios-search'} style={{color: $color.white, fontSize: 24}} />
        <PopupMenu
          visable={this.state.showSearch}
          theme={1}
          top={51}
          left={$dev.screen.width - 130 - 10}
          width={130}
          data={[
            {icon: 'md-boat', val: '*', alias: '全部'},
            {icon: 'md-albums', val: 'ongoing', alias: '测试中'},
            {icon: 'md-archive', val: 'passed', alias: 'PASSED'},
            {icon: 'ios-alert', val: 'failed', alias: 'FAILED'},
            {icon: 'ios-basket', val: 'owner_confirm', alias: '待确认'},
            {icon: 'barcode', val: 'retest', alias: '重测的'},
            {icon: 'md-more', val: 'more', alias: '更多条件'},
          ]}
          onClose={async (val: string, alias: string) => {
            this.setState({showSearch: false});
            switch (val) {
              case 'more':
                break;
              default:
                $stores.task.root.setStatus(val);
                await $stores.task.root.getDocs();
                break;
            }
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});

export {TaskHeader};

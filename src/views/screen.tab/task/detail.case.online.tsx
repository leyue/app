import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ProgressBarAndroid,
  Linking,
  Dimensions,
} from 'react-native';
import {Card, CardItem, Icon, Button} from 'native-base';
import Modal from 'react-native-modal';
import {OlView, CollapseVItem, PopupMenu} from '../../../components';
import {DetailCaseSubmitBug} from './detail.case.submit.bug';

type IProps = {
  item: any;
};

//@ts-ignore
@observer
class DetailCaseOnline extends Component<IProps> {
  public state: any = {
    showSubmitBug: false,
    showConfirm: false,
    pageY: 56,
  };
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  getColor(key: string) {
    let color = $color.carrot;
    switch (key) {
      case 'ongoing':
        color = $color.orange;
        break;
      case 'owner_confirm':
        color = $color.carrot;
        break;
      case 'passed':
        color = $color.nephritis;
        break;
      case 'failed':
        color = $color.pomegranate;
        break;
    }
    return color;
  }

  calcProgress(val: string): number {
    val = val.slice(0, val.length - 1);
    return +val / 100;
  }

  calcCostTime(st: string, et: string) {
    let sT = new Date(st);
    let eT = new Date(et);
    return $time.formatDurationH(eT.getTime() - sT.getTime());
  }

  downloadLog(uri: string) {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];
    Linking.openURL(
      `http://nats-sh.unisoc.com:30001/nginx/download/logs/test/${doc.app}_${doc._id}/online${uri}`,
    );
  }

  getDesc() {
    let item = this.props.item;
    let info = $stores.task.detail.info;
    let ret = '...';
    if (info && info.cases && info.cases.length > item.idx) {
      ret = info.cases[item.idx].description;
    }
    return ret;
  }

  async confirm(status: string) {
    let item = this.props.item;
    await $stores.task.detail.confirmOnlineCaseStatus(item.idx, status);
  }

  async updateBugs(bugs: any[]) {
    let item = this.props.item;
    await $stores.task.detail.setCaseBugs(item.idx, 'online', bugs);
  }

  render() {
    let item = this.props.item;
    let name = item.alias;
    let nameFileds = item.name.split('_');
    let temp = nameFileds[nameFileds.length - 1];
    let id = temp.slice(0, temp.length - 3);
    return (
      <View
        onTouchEnd={() => {
          if (this.state.showConfirm) {
            this.setState({showConfirm: false});
          }
        }}>
        <CardItem
          bordered
          style={{
            flexDirection: 'column',
            padding: 0,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: '15%'}}>名称</Text>
            <Text style={{width: '80%'}}>{`${id}-${name}`}</Text>
            <View style={{flex: 2}} />
          </View>
          {this.renderStatus()}
          {this.renderBug()}
          {this.renderDetail()}
        </CardItem>
      </View>
    );
  }

  renderStatus() {
    let item = this.props.item;
    let status = item.status1.name;
    let doStatus = item.status1.doName;
    let costTime = this.calcCostTime(item.status1.sT, item.status1.eT);
    return (
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{width: '15%'}}>状态</Text>
        <ProgressBarAndroid
          style={{width: '30%'}}
          styleAttr={'Horizontal'}
          progress={this.calcProgress(item.status1.progress)}
          color={this.getColor(item.status1.name)}
          animating={true}
          indeterminate={false}
        />
        <Text style={{marginLeft: 10, fontSize: 12}}>{costTime}</Text>
        <View style={{flex: 2}} />
        {item.log.upload && (
          <Button
            light
            style={{
              marginLeft: 10,
              justifyContent: 'center',
              width: 36,
              height: 20,
            }}
            onPress={async () => {
              this.downloadLog(item.log.httpUri);
            }}>
            <Text style={{}}>日志</Text>
          </Button>
        )}
        {status == 'failed' && doStatus == 'NA' && (
          <Button
            warning
            style={{
              marginLeft: 10,
              paddingHorizontal: 5,
              paddingVertical: 3,
              flexDirection: 'row',
              alignItems: 'center',
              width: 60,
              height: 23,
            }}
            onPressIn={(ev: GestureResponderEvent) => {
              this.setState({
                showConfirm: true,
                pageY: ev.nativeEvent.pageY,
              });
            }}>
            <Text style={{color: $color.pure_white}}>{status}</Text>
            <Icon
              name={'md-arrow-dropdown'}
              style={{color: $color.pure_white, marginLeft: 5}}
            />
            <PopupMenu
              visable={this.state.showConfirm}
              theme={0}
              top={this.state.pageY + 20}
              left={$dev.screen.width - 130 - 30}
              width={130}
              data={[
                {icon: 'md-boat', val: 'passed'},
                {icon: 'md-albums', val: 'failed'},
              ]}
              onClose={async (val: string) => {
                await this.confirm(val);
              }}
            />
          </Button>
        )}
        {status != 'passed' && status != 'failed' && (
          <Text style={{width: 60, color: this.getColor(status)}}>
            {status}
          </Text>
        )}
        {doStatus != 'NA' && (
          <Text
            style={{width: 60, marginLeft: 10, color: this.getColor(doStatus)}}>
            {doStatus}
          </Text>
        )}
      </View>
    );
  }

  renderBug() {
    let item = this.props.item;
    let bugs = $stores.task.detail.bugSchema[item.name];
    return (
      <View style={{width: '100%'}}>
        {item.status1.error.length > 0 && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Text style={{width: '15%'}}>Bug</Text> */}
            <View style={{width: '15%'}}>
              <Button
                warning
                style={{width: 33, height: 20, justifyContent: 'center'}}
                onPress={() => {
                  this.setState({showSubmitBug: true});
                }}>
                <Text style={{color: $color.white}}>BUG</Text>
              </Button>
            </View>
            <Text style={{width: '80%', fontSize: 12}}>
              {item.status1.error}
            </Text>
            <View style={{flex: 2}} />
          </View>
        )}
        {bugs && (
          <View>
            {bugs.map((bug: any, idx: number) => {
              return (
                <Card
                  key={idx}
                  style={{paddingHorizontal: 3, paddingVertical: 2}}>
                  <Text
                    style={{color: $color.orange, fontSize: 12}}
                    onPress={() => {
                      Linking.openURL(
                        `https://bugzilla.unisoc.com/bugzilla/show_bug.cgi?id=${bug.id}`,
                      );
                    }}>
                    {bug.id}-{bug.summary}
                  </Text>
                </Card>
              );
            })}
          </View>
        )}
        <Modal
          avoidKeyboard={false}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          animationInTiming={200}
          animationOutTiming={200}
          isVisible={this.state.showSubmitBug}
          hasBackdrop={true}
          onBackdropPress={() => {
            this.setState({showSubmitBug: false});
          }}>
          <DetailCaseSubmitBug
            bugs={bugs}
            onConfirm={async (bugs: any[]) => {
              this.setState({showSubmitBug: false});
              await this.updateBugs(bugs);
            }}
          />
        </Modal>
      </View>
    );
  }

  renderDetail() {
    let item = this.props.item;
    let client = item.status1.assigned ? item.status1.assigned : 'NA';
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: '15%'}}>客户端</Text>
            <Text style={{}}>{client}</Text>
            <View style={{flex: 2}} />
          </View>
          <View style={{height: 10}} />
          <Text>{this.getDesc()}</Text>
        </View>
      </CollapseVItem>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailCaseOnline};

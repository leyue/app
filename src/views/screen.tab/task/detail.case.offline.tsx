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
import {Card, CardItem, Icon, Button, Input, Item, Toast} from 'native-base';
import Modal from 'react-native-modal';
import {OlView, CollapseVItem, DlgConfirm} from '../../../components';
import {DetailCaseSubmitBug} from './detail.case.submit.bug';
import {DetailCaseOfflineSubmitResult} from './detail.case.offline.submit.result';
import {DetailCaseOfflineConfirmResult} from './detail.case.offline.confirm.result';

type IProps = {
  item: any;
};

//@ts-ignore
@observer
class DetailCaseOffline extends Component<IProps> {
  public state: any = {
    showSubmitBug: false,
    showSubmitResult: false,
    showConfirmResult: false,
    showConfirmRetest: false,
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
      `http://nats-sh.unisoc.com:30001/nginx/download/logs/test/${doc.app}_${doc._id}/offline${uri}`,
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

  async onSubmitResult(remark: string, log: string, status: string) {
    this.setState({showSubmitResult: false});
    let item = this.props.item;
    await $stores.task.detail.uploadOfflineCaseResult(
      item.idx,
      remark,
      status,
      log ? {upload: true, httpUri: `/${item.name}.zip`} : {upload: false},
    );
  }

  async onConfirmResult(remark: string, status: string) {
    this.setState({showConfirmResult: false});
    let item = this.props.item;
    await $stores.task.detail.confirmOfflineCaseResult(
      item.idx,
      remark,
      status,
    );
  }

  async updateBugs(bugs: any[]) {
    let item = this.props.item;
    await $stores.task.detail.setCaseBugs(item.idx, 'offline', bugs);
  }

  async retest() {
    let item = this.props.item;
    await $stores.task.detail.retestCase(item.idx, 'offline');
  }

  render() {
    let item = this.props.item;
    let name = item.alias;
    let nameFileds = item.name.split('_');
    let temp = nameFileds[nameFileds.length - 1];
    let id = temp.slice(0, temp.length - 3);
    return (
      <View onTouchEnd={() => {}}>
        <CardItem
          bordered
          style={{
            flexDirection: 'column',
            padding: 0,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: '15%'}}>名称</Text>
            <Text style={{width: '80%'}}>{`${item.name}-${name}`}</Text>
            <View style={{flex: 2}} />
          </View>
          {this.renderTest()}
          {this.renderStatus()}
          {this.renderBug()}
          {this.renderDetail()}
          {this.renderModal()}
        </CardItem>
      </View>
    );
  }

  renderTest() {
    let item = this.props.item;
    let remark = item.status1.remark;
    let status = item.status1.name;
    if (!['passed', 'failed'].includes(status)) {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 3,
          }}>
          <Text style={{width: '15%'}}>测试</Text>
          <Button
            warning
            style={{height: 23, paddingHorizontal: 3, justifyContent: 'center'}}
            onPress={() => {
              this.setState({showSubmitResult: true});
            }}>
            <Text style={{color: $color.white}}>等待提交测试结果...</Text>
          </Button>
        </View>
      );
    }
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 3,
        }}>
        <Text style={{width: '15%'}}>测试</Text>
        <Text style={{width: '40%', paddingVertical: 0}}>{remark}</Text>
        <View style={{flex: 2}} />
        <Text
          style={{
            marginHorizontal: 3,
            paddingHorizontal: 3,
            height: 23,
            width: 50,
            color: this.getColor(status),
          }}>
          {status}
        </Text>
      </View>
    );
  }

  renderStatus() {
    let item = this.props.item;
    let remark = item.status1.remark;
    let status = item.status1.name;
    let doRemark = item.status1.doRemark;
    let doStatus = item.status1.doName;
    let logUrl = item.log.httpUri;
    let logUpload = item.log.upload;
    if (!['passed', 'failed'].includes(status)) {
      return null;
    }
    if (!['passed', 'failed'].includes(doStatus)) {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 3,
          }}>
          <Text style={{width: '15%'}}>结果</Text>
          <Button
            warning
            style={{height: 23, paddingHorizontal: 3, justifyContent: 'center'}}
            onPress={() => {
              this.setState({showConfirmResult: true});
            }}>
            <Text style={{color: $color.white}}>等待确认测试结果...</Text>
          </Button>
          <Button
            warning
            style={{
              height: 23,
              marginLeft: 3,
              paddingHorizontal: 3,
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({showConfirmRetest: true});
            }}>
            <Text style={{color: $color.white}}>重测</Text>
          </Button>
        </View>
      );
    }
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 3,
        }}>
        <Text style={{width: '15%'}}>结果</Text>
        <Text style={{width: '20%', paddingVertical: 0}}>{doRemark}</Text>
        <View style={{flex: 1}} />
        {logUpload && (
          <Button
            light
            style={{height: 23, paddingHorizontal: 3, justifyContent: 'center'}}
            onPress={() => {
              this.downloadLog(logUrl);
            }}>
            <Text style={{}}>日志</Text>
          </Button>
        )}
        <Button
          warning
          style={{
            marginLeft: 4,
            height: 23,
            paddingHorizontal: 3,
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setState({showSubmitBug: true});
          }}>
          <Text style={{color: $color.white}}>Bug</Text>
        </Button>
        <Button
          warning
          style={{
            height: 23,
            marginLeft: 3,
            paddingHorizontal: 3,
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setState({showConfirmRetest: true});
          }}>
          <Text style={{color: $color.white}}>重测</Text>
        </Button>
        <Text
          style={{
            marginHorizontal: 3,
            paddingHorizontal: 3,
            height: 23,
            width: 50,
            color: this.getColor(doStatus),
          }}>
          {doStatus}
        </Text>
      </View>
    );
  }

  renderBug() {
    let item = this.props.item;
    let bugs = $stores.task.detail.bugSchema[item.name];
    return (
      <View style={{width: '100%'}}>
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

  renderModal() {
    let item = this.props.item;
    let bugs = $stores.task.detail.bugSchema[item.name];
    return (
      <View>
        <Modal
          avoidKeyboard={false}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          animationInTiming={200}
          animationOutTiming={200}
          isVisible={this.state.showSubmitResult}
          hasBackdrop={true}
          onBackdropPress={() => {
            this.setState({showSubmitResult: false});
          }}>
          <DetailCaseOfflineSubmitResult
            idx={item.idx}
            onConfirm={this.onSubmitResult.bind(this)}
          />
        </Modal>
        <Modal
          avoidKeyboard={false}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          animationInTiming={200}
          animationOutTiming={200}
          isVisible={this.state.showConfirmResult}
          hasBackdrop={true}
          onBackdropPress={() => {
            this.setState({showConfirmResult: false});
          }}>
          <DetailCaseOfflineConfirmResult
            onConfirm={this.onConfirmResult.bind(this)}
          />
        </Modal>
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
        <Modal
          avoidKeyboard={false}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          animationInTiming={200}
          animationOutTiming={200}
          isVisible={this.state.showConfirmRetest}
          hasBackdrop={true}
          onBackdropPress={() => {
            this.setState({showConfirmRetest: false});
          }}>
          <DlgConfirm
            title={'提示'}
            content={'此操作将重新发起测试, 是否继续?'}
            onCancel={() => {
              this.setState({showConfirmRetest: false});
            }}
            onConfirm={async () => {
              this.setState({showConfirmRetest: false});
              await this.retest();
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailCaseOffline};

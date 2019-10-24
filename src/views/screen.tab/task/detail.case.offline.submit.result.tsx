import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  NativeModules,
  ProgressBarAndroid,
} from 'react-native';
import {Item, Icon, Input, Button, Card, CardItem, Toast} from 'native-base';
import {RadioGroup} from '../../../components';
import RNFileSelector from 'react-native-file-selector';

type IProps = {
  idx: number;
  onConfirm: (remark: string, log: string, status: string) => void;
};

@observer
class DetailCaseOfflineSubmitResult extends Component<IProps> {
  public state: any = {
    remark: '',
    log: '',
    status: 'passed',
    showFileSec: false,
    uploading: false,
    uploadProgress: 0,
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  async confirm() {
    let {remark, log, status} = this.state;
    if (status == 'failed' && !remark) {
      Toast.show({
        text: '请输入remark',
        buttonText: 'Ok',
        type: 'danger',
        position: 'top',
        duration: 3000,
      });
      return;
    }
    this.props.onConfirm(remark, log, status);
  }

  render() {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];
    return (
      <Card style={{paddingHorizontal: 5, paddingVertical: 3}}>
        <Item>
          <Input
            style={{fontSize: 14}}
            placeholder={'请输入remark'}
            onChangeText={(text: string) => {
              this.setState({remark: text});
            }}
          />
        </Item>
        <Item style={{paddingHorizontal: 5}}>
          <Text>请确认状态</Text>
          <View style={{flex: 1}} />
          <RadioGroup
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: $color.clounds,
            }}
            itemStyle={{marginRight: 5}}
            selectedVal={this.state.status}
            data={[
              {val: 'passed', alias: 'Passed'},
              {val: 'failed', alias: 'Failed'},
            ]}
            onPress={async (idx: number, val: string) => {
              this.setState({status: val});
            }}
          />
        </Item>
        <Item style={{paddingHorizontal: 5, paddingVertical: 5}}>
          {!this.state.uploading && (
            <Text style={{width: '80%'}}>
              {this.state.log ? this.state.log : '是否上传日志'}
            </Text>
          )}
          {this.state.uploading && (
            <ProgressBarAndroid
              style={{width: '80%'}}
              styleAttr={'Horizontal'}
              progress={this.state.uploadProgress}
              color={$color.orange}
              animating={true}
              indeterminate={false}
            />
          )}
          <View style={{flex: 2}} />
          <Button
            light
            disabled={this.state.uploading}
            style={{height: 23, paddingHorizontal: 10}}
            onPress={() => {
              RNFileSelector.Show({
                title: 'Select File',
                onDone: async (path: string) => {
                  this.setState({uploading: true, uploadProgress: 0});
                  await $ax.upload(
                    [
                      {
                        path,
                        data: {
                          _id: '/render/task/uploadCaseLog',
                          taskQueue: {_id: doc._id},
                          _case: {
                            idx: this.props.idx,
                            type: 'offline',
                          },
                        },
                      },
                    ],
                    (state: string, received: number, size: number) => {
                      switch (state) {
                        case 'uploading':
                          this.setState({uploadProgress: received / size});
                          break;
                      }
                    },
                  );
                  this.setState({uploading: false, log: path});
                },
                onCancel: () => {},
              });
            }}>
            <Text>...</Text>
          </Button>
        </Item>
        <Button
          style={{
            backgroundColor: $color.wet_asphalt,
            justifyContent: 'center',
            marginTop: 30,
            height: 30,
            paddingHorizontal: 10,
          }}
          disabled={this.state.uploading}
          onPress={() => {
            this.confirm();
          }}>
          <Text style={{color: $color.white, fontSize: 20}}>确认</Text>
        </Button>
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailCaseOfflineSubmitResult};

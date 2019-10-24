import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text, NativeModules} from 'react-native';
import {Item, Icon, Input, Button, Card, CardItem} from 'native-base';
import {RadioGroup} from '../../../components';
import RNFileSelector from 'react-native-file-selector';

type IProps = {
  onConfirm: (mark: string, status: string) => void;
};

@observer
class DetailCaseOfflineConfirmResult extends Component<IProps> {
  public state: any = {
    remark: '',
    status: 'passed',
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  async confirm() {
    this.props.onConfirm(this.state.remark, this.state.status);
  }

  render() {
    return (
      <Card style={{paddingHorizontal: 5, paddingVertical: 3}}>
        <Item>
          <Input
            style={{fontSize: 14}}
            placeholder="请输入remark"
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
        <Button
          style={{
            backgroundColor: $color.wet_asphalt,
            justifyContent: 'center',
            marginTop: 30,
            height: 30,
            paddingHorizontal: 10,
          }}
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

export {DetailCaseOfflineConfirmResult};

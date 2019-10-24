import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text} from 'react-native';
import {Item, Icon, Input, Button, Card, CardItem} from 'native-base';

type IProps = {
  bugs: any[];
  onConfirm: (bugs: any[]) => void;
};

@observer
class DetailCaseSubmitBug extends Component<IProps> {
  public state: any = {
    bugPlaceholder: '请输入BUGID',
    bugID: null,
    bugs: [],
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    this.setState({bugs: this.props.bugs});
  }

  async add(bugID: string) {
    let docs: any[] = await $ax.get(`/bug?where=${JSON.stringify([bugID])}`);
    if (docs.length == 0) {
      this.setState({bugID: null, bugPlaceholder: 'BUGID不存在,请重新输入!'});
      return;
    }
    let bug = docs[0];
    let bugs = Array.from(this.state.bugs || []);
    let existIdx = bugs.findIndex((item: any) => {
      return item.id == bug.id;
    });
    if (existIdx >= 0) {
      this.setState({bugID: null, bugPlaceholder: 'BUGID已存在,请重新输入!'});
      return;
    }
    bugs.push({id: bug.id, summary: bug.summary});
    this.setState({bugs});
  }

  del(bugID: string) {
    let bugs = Array.from(this.state.bugs || []);
    let existIdx = bugs.findIndex((item: any) => {
      return item.id == bugID;
    });
    bugs.splice(existIdx, 1);
    this.setState({bugs});
  }

  async confirm() {
    this.props.onConfirm(this.state.bugs);
  }

  render() {
    let bugs: any[] = this.state.bugs;
    return (
      <Card>
        {bugs &&
          bugs.map((item, idx) => {
            return (
              <CardItem
                key={idx}
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: $color.silver,
                }}>
                {/* <Text style={{width: '21%'}}>{item.id}</Text> */}
                <Text style={{width: '91%', fontSize: 12}}>
                  {item.id}-{item.summary}
                </Text>
                <View style={{flex: 2}} />
                <Button
                  danger
                  style={{
                    height: 22,
                    width: 22,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.del(item.id);
                  }}>
                  <Text style={{color: $color.pure_white, fontWeight: 'bold'}}>
                    X
                  </Text>
                </Button>
              </CardItem>
            );
          })}
        <CardItem style={{width: '100%'}}>
          <Item style={{width: '100%', paddingVertical: 0}}>
            <Icon
              style={{
                color: $color.midnight_blue,
                marginRight: 5,
                fontSize: 14,
              }}
              name="ios-paper-plane"
            />
            <Input
              style={{color: $color.light_dark, fontSize: 14}}
              secureTextEntry={false}
              placeholderTextColor={$color.silver}
              placeholder={this.state.bugPlaceholder}
              value={this.state.bugID}
              onChangeText={(val: string) => {
                this.setState({bugID: val});
              }}
            />
            <Button
              warning
              style={{
                paddingHorizontal: 5,
                height: 23,
                justifyContent: 'center',
              }}
              onPress={async () => {
                await this.add(this.state.bugID);
              }}>
              <Text style={{color: $color.white}}>新增</Text>
            </Button>
            <Button
              success
              style={{
                marginLeft: 10,
                paddingHorizontal: 5,
                height: 23,
                justifyContent: 'center',
              }}
              onPress={() => {
                this.confirm();
              }}>
              <Text style={{color: $color.white}}>确定</Text>
            </Button>
          </Item>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailCaseSubmitBug};

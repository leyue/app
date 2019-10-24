import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import moment from 'moment';
import {View, StyleSheet, Text, NativeModules} from 'react-native';
import {Item, Icon, Input, Button, Card, CardItem} from 'native-base';

type IProps = {
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
};

@observer
class DlgConfirm extends Component<IProps> {
  public state: any = {};

  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Card style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Text style={{fontSize: 20}}>{this.props.title}</Text>
          <View style={{flex: 2}} />
          <Icon
            style={{color: $color.asbestos, fontSize: 20}}
            name="close"
            onPress={() => {
              this.props.onCancel();
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}>
          <Icon style={{color: $color.orange, fontSize: 32}} name="warning" />
          <Text style={{marginLeft: 10, marginTop: 5}}>
            {this.props.content}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}} />
          <Button
            light
            style={{paddingHorizontal: 10, height: 30}}
            onPress={() => {
              this.props.onCancel();
            }}>
            <Text style={{color: $color.silver, fontSize: 20}}>取消</Text>
          </Button>
          <Button
            style={{
              paddingHorizontal: 10,
              marginLeft: 5,
              height: 30,
              backgroundColor: $color.midnight_blue,
            }}
            onPress={() => {
              this.props.onConfirm();
            }}>
            <Text style={{color: $color.white, fontSize: 20}}>确定</Text>
          </Button>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({});

export {DlgConfirm};

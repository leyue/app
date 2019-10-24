import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {Card} from 'native-base';

type IProps = {};

@observer
class DetailPwr extends Component<IProps> {
  public state: any = {};

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];

    return (
      <View
        style={{
          width: '100%',
        }}>
        <FlatList
          data={doc.archive.report.power}
          keyExtractor={(item, idx) => idx.toString()}
          ListHeaderComponent={null}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                marginTop: 0,
                color: $color.silver,
              }}>
              暂无数据
            </Text>
          }
          renderItem={({item}: any) => {
            return (
              <Card
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 7,
                  paddingVertical: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>名称</Text>
                  <Text style={{fontSize: 12}}>{item.item}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>值</Text>
                  <Text>{item.value}</Text>
                </View>
              </Card>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export {DetailPwr};

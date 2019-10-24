import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {Card} from 'native-base';

type IProps = {};

@observer
class DetailStability extends Component<IProps> {
  public state: any = {
    tasks: [],
  };

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
          data={doc.archive.report.stability}
          keyExtractor={(item, idx) => idx.toString()}
          ListHeaderComponent={null}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
                color: $color.silver,
              }}>
              暂无数据
            </Text>
          }
          renderItem={({item}: any) => {
            let remarks = '';
            for (let remark of item.remark) {
              remarks += `${remark.cnt}-${remark.name} \n`;
            }
            remarks = remarks.slice(0, remarks.length - 2);
            return (
              <Card
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 7,
                  paddingVertical: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>ID</Text>
                  <Text style={{}}>{item.caseName}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>名称</Text>
                  <Text>{item.alias}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>Total</Text>
                  <Text>{item.total}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>Pass</Text>
                  <Text>{item.pass}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>SN</Text>
                  <Text>{item.sn}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>仪器</Text>
                  <Text>{item.instrument}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{width: '25%'}}>Remark</Text>
                  <Text style={{width: '75%', fontSize: 12}}>{remarks}</Text>
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

export {DetailStability};

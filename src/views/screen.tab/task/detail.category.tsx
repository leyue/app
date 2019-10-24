import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {Card} from 'native-base';

type IProps = {};

@observer
class DetailCategory extends Component<IProps> {
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
          data={doc.archive.report.category}
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
                  <Text style={{width: '25%'}}>类别</Text>
                  <Text style={{fontSize: 12}}>{item.category}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>T-P-F</Text>
                  <Text>
                    {`${item.submit}-${item.pass}-${item.test - item.pass}`}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>通过-完成</Text>
                  <Text>{`${((item.pass * 100) / item.submit).toFixed(2)}%-${(
                    (item.test * 100) /
                    item.submit
                  ).toFixed(2)}%`}</Text>
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

export {DetailCategory};

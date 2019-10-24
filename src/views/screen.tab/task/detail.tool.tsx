import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {Card} from 'native-base';

type IProps = {};

@observer
class DetailTool extends Component<IProps> {
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
          data={doc.archive.report.tools}
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
            return (
              <Card
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 7,
                  paddingVertical: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>名称</Text>
                  <Text style={{fontSize: 12}}>{item.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>版本</Text>
                  <Text>{item.version}</Text>
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

export {DetailTool};

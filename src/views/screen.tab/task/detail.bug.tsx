import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {inject, observer, Provider} from 'mobx-react';
import {View, StyleSheet, Text, FlatList, Linking} from 'react-native';
import {Card} from 'native-base';

type IProps = {};

@observer
class DetailBug extends Component<IProps> {
  public state: any = {
    bugs: [],
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    let bugs = $stores.task.detail.bugs;
    return (
      <View
        style={{
          width: '100%',
        }}>
        <FlatList
          data={bugs}
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
                  <Text style={{width: '25%'}}>模块</Text>
                  <Text>{item.module}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>CaseID</Text>
                  <Text>{item.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>Case别名</Text>
                  <Text>{item.alias}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>BugID</Text>
                  <Text>{item.bugID}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: '25%'}}>Bug描述</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      width: '75%',
                      color: $color.wet_asphalt,
                    }}
                    onPress={() => {
                      Linking.openURL(
                        `https://bugzilla.unisoc.com/bugzilla/show_bug.cgi?id=${item.bugID}`,
                      );
                    }}>
                    {item.summary}
                  </Text>
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

export {DetailBug};

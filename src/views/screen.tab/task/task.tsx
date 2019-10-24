import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import moment from 'moment';
import {TaskHeader} from './task.header';
import TaskItems from './task.items';
import {IAccount, ITask} from '../../../stores';
import {View, StyleSheet, Text, NativeModules} from 'react-native';
import {Icon, Fab, Spinner} from 'native-base';
import {SelectTabs} from '../../../components';
import RNFileSelector from 'react-native-file-selector';
interface IProps {
  navigation: NavigationScreenProp<any>;
}
@observer
class Task extends Component<IProps> {
  static navigationOptions = ({navigation}: any) => {
    return {
      header: <TaskHeader />,
      tabBarLabel: 'Task',
    };
  };
  public state: any = {};

  constructor(props: IProps) {
    super(props);
    $nav = this.props.navigation;
  }

  async componentDidMount() {
    await $stores.task.root.getDocs();
  }

  componentDidUpdate(prevProps: IProps) {}

  render() {
    return (
      <View
        style={{
          backgroundColor: $color.white,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        }}>
        <View>
          <SelectTabs
            selectedVal={$stores.task.root.type}
            data={[
              {alias: '所有测试', val: '*'},
              {alias: '软件版本测试', val: 'SW'},
              {alias: 'NPI健全测试', val: 'SANITY'},
              {alias: 'WCN健全测试', val: 'WCN'},
              {alias: 'PHY自测试', val: 'PHY'},
              {alias: '工具版本测试', val: 'TOOL'},
            ]}
            onSelectChanged={async (idx: number, val: string) => {
              $stores.task.root.setType(val);
              await $stores.task.root.getDocs();
            }}
          />
        </View>
        {$stores.task.root.loading && (
          <View>
            <Spinner color={$color.carrot} style={{height: '90%'}} />
          </View>
        )}
        {!$stores.task.root.loading && (
          <View style={{marginBottom: 50}}>
            <TaskItems />
          </View>
        )}
        <Fab
          active={true}
          direction="up"
          containerStyle={{marginBottom: 30}}
          style={{backgroundColor: $color.wet_asphalt, bottom: 30}}
          position="bottomRight"
          onPress={() => {
            this.props.navigation.navigate('Add');
          }}>
          <Icon name={'add'} />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Task;

import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import moment from 'moment';
import {ICli} from '../../../stores';
import {View, StyleSheet, Text, NativeModules, FlatList} from 'react-native';
import {Icon, Fab, Spinner, Card} from 'native-base';
import {SelectTabs} from '../../../components';
import {ClientItem} from './client.item';

@observer
class Client extends Component {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Client',
      headerRight: (
        <Text
          style={{
            color: $color.white,
            marginRight: 10,
          }}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Search
        </Text>
      ),
      tabBarLabel: 'Client',
    };
  };

  constructor(props: any) {
    super(props);
    $ws.on('cli', this.onWsMessage.bind(this));
  }

  async componentDidMount() {
    $ws.send({
      ch: 'render',
      url: '/user/login',
      header: {
        who: 'root',
      },
    });
    await $func.mSleep(300);
    $ws.send({
      ch: 'render',
      url: '/cli/list',
      header: {
        who: 'root',
      },
    });
  }

  onWsMessage(data: any) {
    switch (data.url) {
      case '/cli/list':
        $stores.cli.root.setDocs(data.payload);
        break;
      case '/cli/join':
        $stores.cli.root.joinDoc(data.header.mac, data.payload);
        break;
      case '/cli/update':
        $stores.cli.root.updateDoc(data.header.mac, data.payload);
        break;
      case '/cli/close':
        $stores.cli.root.closeDoc(data.header.mac);
        break;
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: $color.white,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <FlatList
          data={$stores.cli.root.docs}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({item, idx}: any) => {
            return <ClientItem data={item} />;
          }}
        />
      </View>
    );
  }
}

export default Client;

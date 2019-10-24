import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {inject, observer, Provider} from 'mobx-react';

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
    $ws.on('cli', this.onMessage.bind(this));
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

  onMessage(data: any) {
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
      <View style={{backgroundColor: $color.white}}>
        <Text onPress={() => {}}>Tasks</Text>
      </View>
    );
  }
}

export default Client;

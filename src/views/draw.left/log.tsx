import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {inject, observer, Provider} from 'mobx-react';
import {Icon} from 'native-base';

@observer
class Log extends Component {
  static navigationOptions = ({navigation}: any) => {
    return {
      drawerLabel: 'Log',
      drawerIcon: <Icon name={'insert-drive-file'} />,
    };
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffffff'}}>
        <Text onPress={() => {}}>Log</Text>
      </View>
    );
  }
}

export default Log;

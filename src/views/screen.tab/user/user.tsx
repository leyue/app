import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {inject, observer, Provider} from 'mobx-react';

@observer
class User extends Component {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'User',
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
      tabBarLabel: 'User',
    };
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: $color.white}}>
        <Text onPress={() => {}}>Tasks</Text>
      </View>
    );
  }
}

export default User;

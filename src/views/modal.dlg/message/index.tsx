import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {View, Text, Button} from 'react-native';
import {} from 'native-base';

type IProps = {
  navigation: NavigationScreenProp<any>;
};

class Message extends Component<IProps> {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

export default Message;

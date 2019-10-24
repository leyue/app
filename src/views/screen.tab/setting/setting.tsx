import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';
import {Text, View} from 'react-native';
import {Button} from 'native-base';

interface IProps {
  navigation: NavigationScreenProp<any>;
}
@observer
class Setting extends Component<IProps> {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Setting',
      headerRight: (
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Search
        </Text>
      ),
      tabBarLabel: 'Setting',
    };
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: $color.white}}>
        <Button
          style={{
            backgroundColor: $color.wet_asphalt,
            justifyContent: 'center',
            marginHorizontal: 15,
            marginTop: 40,
          }}
          onPress={async () => {
            await $stores.account.root.setRemember(false);
            $nav.dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Account',
                  }),
                ],
              }),
            );
          }}>
          <Text style={{color: $color.white, fontSize: 20}}>Logout</Text>
        </Button>
      </View>
    );
  }
}

export default Setting;

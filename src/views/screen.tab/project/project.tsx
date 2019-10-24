import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {inject, observer, Provider} from 'mobx-react';

@observer
class Project extends Component {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Project',
      headerRight: (
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Search
        </Text>
      ),
      tabBarLabel: 'Project',
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

export default Project;

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';

import User from './user';

const userStack = createStackNavigator(
  {
    User: {
      screen: User,
    },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: ({navigation}: any) => {
      return {
        headerStyle: {
          backgroundColor: $color.wet_asphalt,
        },
        headerTintColor: $color.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (
          <Icon
            name={'md-menu'}
            style={{color: $color.white, fontSize: 24, marginLeft: 15}}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      };
    },
  },
);

export default userStack;

import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';

import TaskStack from './task';
import UserStack from './user';
import ProjectStack from './project';
import ClientStack from './client';
import SettingStack from './setting';

const TabNavigator = createBottomTabNavigator(
  {
    Tasks: {
      screen: TaskStack,
    },
    User: {
      screen: UserStack,
    },
    Project: {
      screen: ProjectStack,
    },
    Client: {
      screen: ClientStack,
    },
    Setting: {
      screen: SettingStack,
    },
  },
  {
    // animationEnabled: true,
    // swipeEnabled: true,
    lazy: true,
    defaultNavigationOptions: ({navigation}: any) => {
      return {
        tabBarIcon: ({focused, horizontal, tintColor}: any) => {
          const {routeName} = navigation.state;
          let iconName = 'md-alarm';
          switch (routeName) {
            case 'Tasks':
              iconName = 'md-alarm';
              break;
            case 'User':
              iconName = 'md-person-add';
              break;
            case 'Project':
              iconName = 'ios-color-filter';
              break;
            case 'Task':
              iconName = 'ios-magne';
              break;
            case 'Setting':
              iconName = 'settings';
              break;
          }
          return <Icon name={iconName} style={{color: tintColor}} />;
        },
      };
    },
    tabBarOptions: {
      activeTintColor: $color.nephritis,
      inactiveTintColor: $color.light_dark,
      labelStyle: {
        marginBottom: 5,
      },
    },
  },
);

export default TabNavigator;

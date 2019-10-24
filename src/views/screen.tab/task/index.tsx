import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'native-base';

import Task from './task';
import Detail from './detail';
import Add from './add';

const TaskStack = createStackNavigator(
  {
    //@ts-ignore
    Tasks: {
      screen: Task,
    },
    //@ts-ignore
    Detail: {
      screen: Detail,
    },
    Add: {
      screen: Add,
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
      };
    },
  },
);

export default TaskStack;

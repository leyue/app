import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {StyleSheet, Button, View, Text} from 'react-native';

import AccountStack from './screen.account';
import TabNavigator from './screen.tab';
import DrawView from './draw.left';
import ModalView from './modal.dlg';

const MainDraw = createDrawerNavigator(
  {
    Drawer: {
      screen: TabNavigator,
    },
    Log: {
      screen: DrawView.Log,
    },
  },
  {
    contentOptions: {
      activeTintColor: $color.midnight_blue,
      labelStyle: {},
    },
    drawerWidth: 250,
    drawerType: 'front',
    drawerLockMode: 'locked-open',
    edgeWidth: 10,
  },
);

const AppNavigator = createStackNavigator(
  {
    Account: {
      screen: AccountStack,
    },
    Main: {
      screen: MainDraw,
    },
    DlgMessage: {
      screen: ModalView.Message,
    },
  },
  {
    initialRouteName: 'Account',
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: $color.pumpkin,
      },
      headerTintColor: $color.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

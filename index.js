/**
 * @format
 */
import './src/glob';

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

import {StackActions, NavigationActions} from 'react-navigation';
(async function() {
  await $stores.account.root.loadStorage();
  if ($stores.account.root.token) {
    $nav.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Main',
          }),
        ],
      }),
    );
  }
})();

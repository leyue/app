import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import AppContainer from './views';
import {Root} from 'native-base';
import {View, Text} from 'react-native';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Provider {...$stores}>
        <Root>
          <AppContainer
            uriPrefix={'/app'}
            onNavigationStateChange={(
              prevState: any,
              newState: any,
              action: any,
            ) => {}}
          />
        </Root>
      </Provider>
    );
  }
}

export default App;

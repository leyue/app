import React, {Component} from 'react';
import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import {IAccount} from '../../../stores';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, View, Text} from 'react-native';
import {
  Content,
  Button,
  CheckBox,
  Icon,
  Form,
  Label,
  Input,
  Item,
} from 'native-base';

interface IProps {
  navigation: NavigationScreenProp<any>;
}

type IState = {
  errorMsg: any;
};

@observer
class Login extends Component<IProps, IState> {
  static navigationOptions = ({navigation}: any) => {
    return {
      headerTitle: 'Login',
      headerRight: (
        <Text
          style={{
            marginRight: 10,
            color: $color.white,
          }}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Register
        </Text>
      ),
    };
  };

  public state: IState = {
    errorMsg: {
      name: '',
      pwd: '',
    },
  };

  constructor(props: IProps) {
    super(props);
    $nav = this.props.navigation;
  }

  async componentDidMount() {
    // if ($stores.account.root.remember && $stores.account.root.token) {
    //   this.jumpMain();
    // }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: $color.midnight_blue}}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 80}}>
            <Icon
              style={{color: $color.white, fontSize: 60}}
              name="logo-polymer"
            />
            <Text style={{color: $color.white}}>NATS</Text>
          </View>
          <View style={{width: '80%'}}>
            <Form style={{marginTop: 80}}>
              <Item fixedLabel>
                <Icon
                  style={{color: $color.white, marginRight: 10}}
                  name="person"
                />
                <Input
                  placeholder={'用户名'}
                  style={{color: $color.white}}
                  value={$stores.account.root.name}
                  onChangeText={(val: string) => {
                    $stores.account.root.setName(val);
                  }}
                />
              </Item>
              <Item fixedLabel>
                <Icon
                  style={{color: $color.white, marginRight: 10}}
                  name="ios-paper-plane"
                />
                <Input
                  placeholder={'密码'}
                  secureTextEntry={true}
                  style={{color: $color.white}}
                  value={$stores.account.root.pwd}
                  onChangeText={(val: string) => {
                    $stores.account.root.setPwd(val);
                  }}
                />
              </Item>
              <Button
                style={{
                  backgroundColor: $color.wet_asphalt,
                  justifyContent: 'center',
                  marginLeft: 15,
                  marginTop: 40,
                }}
                onPress={() => this.login()}>
                <Text style={{color: $color.white, fontSize: 20}}>Login</Text>
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CheckBox
                  checked={$stores.account.root.remember}
                  color={$color.wet_asphalt}
                  onPress={() => {
                    $stores.account.root.setRemember(
                      !$stores.account.root.remember,
                    );
                  }}
                />
                <Text style={{color: $color.silver, marginLeft: 20}}>
                  记住我
                </Text>
                <View style={{flex: 2}} />
                <Text
                  style={{color: $color.silver}}
                  onPress={() => this.forget()}>
                  忘记密码?
                </Text>
              </View>
            </Form>
            <View
              style={{
                width: '100%',
                padding: 20,
              }}>
              <Text>root 123456780</Text>
              <Text>nick.xia 19890407</Text>
              <Text>justine 123456</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  async login() {
    try {
      await $stores.account.root.login();
      this.jumpMain();
    } catch (e) {
      $log.i(e);
    }
  }

  forget() {
    $log.i();
    this.props.navigation.openDrawer();
    // this.props.navigation.navigate('DlgMessage')
  }

  jumpMain() {
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
}

const styles = StyleSheet.create({});

export default Login;

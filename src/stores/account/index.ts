import AsyncStorage from '@react-native-community/async-storage';
import {
  observable,
  configure,
  action,
  runInAction,
  computed,
  autorun,
} from 'mobx';

configure({enforceActions: 'always'});

class Root {
  @observable remember: boolean = false;
  @observable token: string | null = null;
  @observable name: string = '';
  @observable pwd: string = '';
  @observable roles: string[] | null = [];

  constructor() {
    autorun(async () => {
      console.log('autorun account');
    });
  }

  @action async loadStorage() {
    let user: any = await AsyncStorage.getItem('user');
    user = JSON.parse(user) || {roles: []};
    runInAction(() => {
      this.remember = user.remember;
      this.name = user.name;
      this.pwd = user.pwd;
      this.token = user.token;
      this.roles = user.roles;
    });
  }

  @action setName(name: string) {
    this.name = name;
  }

  @action setPwd(pwd: string) {
    this.pwd = pwd;
  }

  @action async setRemember(remember: boolean) {
    if (!remember) {
      await AsyncStorage.setItem('user', '');
    }
    runInAction(() => {
      this.remember = remember;
    });
  }

  @action async login() {
    let res: any = await $ax.post('/session', {name: this.name, pwd: this.pwd});
    console.log(res, this.remember);
    if (!this.remember) {
      await AsyncStorage.setItem('user', '');
    } else {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          remember: this.remember,
          name: res.name,
          pwd: res.pwd,
          token: res.token,
          roles: res.authority,
        }),
      );
    }
    runInAction(() => {
      this.token = res.token;
      this.roles = res.roles;
    });
  }

  @action async logout() {
    await AsyncStorage.setItem('user', '');
    runInAction(() => {
      this.remember = false;
      this.name = '';
      this.pwd = '';
      this.token = null;
      this.roles = null;
    });
  }
}

let account = {
  root: new Root(),
};

export {account};

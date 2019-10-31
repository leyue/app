import Axios, {AxiosInstance} from 'axios';
import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';

import {} from 'react-native';
import {Toast} from 'native-base';

interface IProps {
  baseURL: string;
  timeout: number;
}

class AxCli extends Object {
  private props: IProps;
  constructor(props: IProps) {
    super();
    this.props = props;
    this.init();
  }

  init() {
    $ax = Axios.create({
      ...this.props,
      // @ts-ignore
      'headers.post.Content-Type': 'application/json;charset=UTF-8',
      'headers.put.Content-Type': 'application/json;charset=UTF-8',
      'headers.patch.Content-Type': 'application/json;charset=UTF-8',
    });
    this.beforeReq();
    this.afterRes();
    $ax.upload = this.upload;
  }

  beforeReq() {
    $ax.interceptors.request.use(
      (req: any): any => {
        req.headers.Authorization = `Bearer ${$stores.account.root.token}`;
        return req;
      },
      (err: any): any => {
        throw err;
      },
    );
  }

  afterRes() {
    $ax.interceptors.response.use(
      (res: any): any => {
        // console.log(res);
        return res.data;
      },
      async (err: any) => {
        console.log(err.response);
        switch (err.response.status) {
          case 401:
            await $stores.account.root.setRemember(false);
            if (
              $nav.state.routeName != 'Login' ||
              $nav.state.routeName != 'Account'
            ) {
              $nav.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Account'})],
                }),
              );
            }
            break;
          default:
            Toast.show({
              text: `${err.response.status}-${err.response.data.message}`,
              buttonText: 'Ok',
              type: 'danger',
              position: 'top',
              duration: 5000,
            });
            break;
        }
      },
    );
  }

  async upload(
    files: any[],
    cb: (state: string, received: number, size: number) => void,
  ) {
    let formData = new FormData();
    for (let item of files) {
      let arr0 = item.path.split('/');
      let arr1 = item.path.split('.');
      let file = {
        uri: `file://${item.path}`,
        type: 'multipart/form-data',
        name: escape(arr0[arr0.length - 1]),
        fileType: `.${arr1[arr1.length - 1]}`,
      };
      formData.append('file', file);
      formData.append('data', JSON.stringify(item.data));
    }
    let uuid = Math.uuid('xyxxyyxxxy');
    let intervalId = setInterval(async () => {
      let res: any = await $ax.get(
        `http://nats-sh.unisoc.com:30001/web/file/upload/progress?X-Progress-ID=${uuid}`,
      );
      res = res.trim();
      res = res.slice(1, res.length - 2);
      res = JSON.parse(res);
      cb(res.state, res.received, res.size);
    }, 700);
    let res = await $ax.post(
      `http://nats-sh.unisoc.com:30001/web/file/upload?X-Progress-ID=${uuid}`,
      formData,
    );
    clearInterval(intervalId);
    return res;
  }
}

export {AxCli};

// @ts-ignore
if (!module.parent) {
  (async function() {
    new AxCli({
      baseURL: 'http://nats-sh.unisoc.com:30001/app/',
      timeout: 5000,
    });

    // let ret: any;
    // ret = await ax.post('/session', { name: 'root', pwd: '123456780' });
    // console.log(ret, 3);
    // ret = await ax.get('/task/SWVPT20190612031356b9d8');
    // console.log(ret, 3);
  })();
}

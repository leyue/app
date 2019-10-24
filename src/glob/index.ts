import './yellow.box';
import './inject';
import {AxiosInstance} from 'axios';
import {NavigationScreenProp} from 'react-navigation';
import {color} from './styles';
import {stores} from '../stores';
import * as util from '../utils';

interface IAx extends AxiosInstance {
  upload(
    files: any[],
    cb: (state: string, received: number, size: number) => void,
  ): Promise<any>;
}

// @ts-ignore
declare global {
  // @ts-ignore
  let window: window;

  // @ts-ignore
  let global: global;

  // @ts-ignore
  let document: document;

  interface Array<T> {
    [x: string]: any;
  }

  let $color: typeof color;

  let $log: typeof util.log;

  let $func: typeof util.func;

  let $time: typeof util.time;

  let $dev: typeof util.dev;

  let $ax: IAx;

  let $ws: typeof util.wsCli;

  let $nav: NavigationScreenProp<any>;

  let $stores: typeof stores;
}

$color = color;
$log = util.log;
$func = util.func;
$time = util.time;
$dev = util.dev;
new util.AxCli({
  baseURL: 'http://nats-sh.unisoc.com:30001/app/',
  // baseURL: '10.29.71.48:3007',
  timeout: 5000,
});
$ws = util.wsCli;

// $nav
$stores = stores;

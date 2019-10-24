import {account} from './account';
import {task} from './task';
import {cli} from './cli';

type IAccount = typeof account;
type ITask = typeof task;
type ICli = typeof cli;

const stores = {
  account,
  task,
  cli,
};

export {stores, IAccount, ITask, ICli};

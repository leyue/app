import { account } from './account';
import { task } from './task';

type IAccount = typeof account;
type ITask = typeof task;

const stores = {
  account,
  task
};

export { stores, IAccount, ITask };

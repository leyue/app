import {
  observable,
  configure,
  action,
  runInAction,
  computed,
  autorun,
} from 'mobx';
import {NavigationActions, NavigationScreenProp} from 'react-navigation';

configure({enforceActions: 'always'});

enum IActionType {
  ALL = 0,
  MY_SUBMIT,
  MY_TODO_LST,
}

const types = ['*', 'SW', 'SANITY', 'WCN', 'PHY', 'TOOL'];

class Root {
  @observable type: string = '*';
  @observable action: IActionType = IActionType.MY_SUBMIT;
  @observable status: string = '*';
  @observable sortBy: string = 'cTime';
  @observable loading: boolean = true;
  @observable loadingMore: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable cnt: number = 10;
  @observable docs: any[] = [];

  constructor() {}

  @action setType(type: string) {
    this.type = type;
  }

  @action setAction(hSType: IActionType) {
    this.action = hSType;
  }

  @action setStatus(type: string) {
    this.status = type;
  }

  @action setSortBy(type: string) {
    this.sortBy = type;
  }

  @computed get where() {
    let committer = $stores.account.root.name;
    let whereType: any = this.type == '*' ? {} : {type: this.type};
    let whereStatus: any = {};
    switch (this.status) {
      case '*':
        break;
      case 'retest':
        whereStatus = {'status.retest': true};
        break;
      default:
        whereStatus = {'status.name': this.status};
        break;
    }
    let whereAction: any = {};
    switch (this.action) {
      case IActionType.MY_SUBMIT:
        whereAction.committer = committer;
        break;
      case IActionType.MY_TODO_LST:
        whereAction.$or = [
          {
            'archive.report.module': {
              $elemMatch: {
                module: /^OFFLINE_/,
                tester: committer,
                status: 'ongoing',
              },
            },
          },
          {
            'archive.report.module': {
              $elemMatch: {
                owner: committer,
                status: 'owner-confirm',
              },
            },
          },
        ];
        whereAction.$and = [
          {'status.name': {$ne: 'created'}},
          {'status.name': {$ne: 'retest'}},
          {'status.name': {$ne: 'depend_invalid'}},
          {'status.name': {$ne: 'canceled'}},
          {'status.name': {$ne: 'passed'}},
          {'status.name': {$ne: 'failed'}},
        ];
        break;
    }
    return {
      ...whereType,
      ...whereStatus,
      ...whereAction,
    };
  }

  @computed get sort() {
    let sort: any = {};
    sort[this.sortBy] = -1;
    return sort;
  }

  @action async getDocs(page: number = 1, cnt: number = 10) {
    // console.log('getDocs', this.where);
    runInAction(() => {
      this.loading = true;
    });
    let res: any = await $ax.get(
      `/task?where=${JSON.stringify({
        ...this.where,
        // app: 'SWVT20190821091448593a',
      })}&sort=${JSON.stringify(this.sort)}&page=${page}&cnt=${cnt}`,
    );
    runInAction(() => {
      this.page = page;
      this.cnt = cnt;
      this.total = res.total;
      this.docs = res.docs;
      this.loading = false;
    });
  }

  @action async getMoreDocs() {
    // console.log('getMoreDocs', this.where);
    runInAction(() => {
      this.loadingMore = true;
    });
    let page = this.page + 1;
    let res: any = await $ax.get(
      `/task?where=${JSON.stringify(this.where)}&sort=${JSON.stringify(
        this.sort,
      )}&page=${page}&cnt=${this.cnt}`,
    );
    await $func.mSleep(100);
    runInAction(() => {
      this.loadingMore = false;
      this.page = page;
      this.total = res.total;
      this.docs = [...this.docs, ...res.docs];
    });
  }
}

let root = new Root();

import {detail} from './details';

let task = {
  root,
  detail,
};

export {task};

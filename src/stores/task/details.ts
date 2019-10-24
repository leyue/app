import {
  observable,
  configure,
  action,
  runInAction,
  computed,
  autorun,
  reaction,
} from 'mobx';

configure({enforceActions: 'always'});

const types = ['*', 'SW', 'SANITY', 'WCN', 'PHY', 'TOOL'];

class Detail {
  @observable loading: boolean = true;
  @observable app: string = '';
  @observable docs: any[] = [];
  @observable info: any = {};
  @observable bugs: any[] = [];
  @observable bugSchema: any = {};
  @observable pro: string = '';
  @observable ins: string = '*';
  @observable onlineStatus = '*';
  @observable offlineStatus = '*';

  constructor() {
    reaction(
      () => {
        return {pro: this.pro, ins: this.ins};
      },
      async () => {
        let pro = this.pro;
        let ins = this.ins;
        let doc = this.doc[pro][ins];
        let info = await $ax.get(
          `/svn/?where=${JSON.stringify(doc.archive.casePath)}`,
        );
        runInAction(() => {
          this.info = info;
        });
      },
    );

    reaction(
      () => {
        return {pro: this.pro, ins: this.ins};
        // return this.docs.map(item => item);
      },
      async () => {
        let pro = this.pro;
        let ins = this.ins;
        let doc = this.doc[pro][ins];
        if (doc.archive.report.bugs.length == 0) {
          return;
        }
        let bugIds = [];
        for (let item of doc.archive.report.bugs) {
          bugIds.push(item.bugID);
        }
        let docs: any = await $ax.get(`/bug?where=${JSON.stringify(bugIds)}`);
        let bugs: any[] = [];
        let bugSchema: any = {};
        for (let item of doc.archive.report.bugs) {
          let {bugID, name} = item;
          let bug = docs.find((n: any) => {
            return n.id == bugID;
          });
          let data = {...item, id: bug.id, summary: bug.summary};
          bugs.push(data);
          if (!bugSchema[name]) {
            bugSchema[name] = [];
          }
          bugSchema[name].push(data);
        }
        runInAction(() => {
          this.bugs = bugs;
          this.bugSchema = bugSchema;
        });
      },
    );
  }

  @action async setApp(app: string) {
    runInAction(() => {
      this.loading = true;
      this.app = app;
    });
    let docs: any = await $ax.get(`/task/${app}`);
    let doc = docs[0];
    let pro = doc.element.project;
    let ins = doc.element.instrument ? doc.element.instrument : '*';
    runInAction(() => {
      this.docs = docs;
      this.pro = pro;
      this.ins = ins;
      this.loading = false;
    });
  }

  @action setPro(pro: string) {
    this.pro = pro;
    this.ins = Object.keys(this.doc[pro])[0];
  }

  @action setIns(ins: string) {
    this.ins = ins;
  }

  @action setOnlineStatus(status: string) {
    this.onlineStatus = status;
  }

  @action setOfflineStatus(status: string) {
    this.offlineStatus = status;
  }

  @computed get doc() {
    function formartCase(cases: any[], status: string): any[] {
      let data: any = {};
      function prehandle(module: string, category: string) {
        if (!data[module]) {
          data[module] = {};
        }
        if (!data[module][category]) {
          data[module][category] = [];
        }
      }
      for (let [idx, item] of cases.entries()) {
        let module = item.module;
        let category = item.category;
        switch (status) {
          case '*':
            prehandle(module, category);
            data[module][category].push({...item, idx});
            break;
          case 'confirm':
            if (item.status1.name == 'failed' && item.status1.doName == 'NA') {
              prehandle(module, category);
              data[module][category].push({...item, idx});
            }
            break;
          case 'bug':
            if (item.status1.bugs.length > 0) {
              prehandle(module, category);
              data[module][category].push({...item, idx});
            }
            break;
          case 'failed':
            if (item.status1.doName == 'failed') {
              prehandle(module, category);
              data[module][category].push({...item, idx});
            }
            break;
          case 'ongoing':
            if (
              item.status1.assigned &&
              !['passed', 'failed'].includes(item.status1.name)
            ) {
              prehandle(module, category);
              data[item.module][category].push({...item, idx});
            }
            break;
        }
      }
      return data;
    }
    let data: any = {};
    for (let [idx, item] of this.docs.entries()) {
      let pro = item.element.project;
      let ins = item.element.instrument ? item.element.instrument : '*';
      if (!data[pro]) {
        data[pro] = {};
      }
      if (!data[pro][ins]) {
        data[pro][ins] = {};
      }
      if (pro != this.pro || ins != this.ins) {
        continue;
      }
      data[pro][ins] = JSON.parse(JSON.stringify(item));
      data[pro][ins].idx = idx;
      data[pro][ins].archive.cases.online = formartCase(
        item.archive.cases.online,
        this.onlineStatus,
      );
      data[pro][ins].archive.cases.offline = formartCase(
        item.archive.cases.offline,
        this.offlineStatus,
      );
    }
    return data;
  }

  @action async setCaseBugs(idx: number, type: string, bugs: any[]) {
    let doc = this.docs[this.doc[this.pro][this.ins].idx];
    let bugLst: string[] = [];
    bugs.map((item: any) => {
      bugLst.push(`${item.id}`);
    });
    let res: any = await $ax.post('/taskAction', {
      action: 'setCaseBugs',
      _id: doc._id,
      type,
      idx,
      bugs: bugLst,
    });
    runInAction(() => {
      // this.docs[this.doc[this.pro][this.ins].idx] = res;
      let _case = doc.archive.cases[type][idx];
      _case.status1.bugs = bugLst;
      this.bugSchema[_case.name] = bugs;
    });
  }

  @action async retestCase(idx: number, type: string) {
    let doc = this.docs[this.doc[this.pro][this.ins].idx];
    let res: any = await $ax.post('/taskAction', {
      action: 'retestCase',
      _id: doc._id,
      type,
      idx,
    });
    runInAction(() => {
      this.docs[this.doc[this.pro][this.ins].idx] = res;
    });
  }

  @action async confirmOnlineCaseStatus(idx: number, status: string) {
    let doc = this.docs[this.doc[this.pro][this.ins].idx];
    let res: any = await $ax.post('/taskAction', {
      action: 'confirmOnlineCaseStatus',
      _id: doc._id,
      idx,
      status,
    });
    runInAction(() => {
      this.docs[this.doc[this.pro][this.ins].idx] = res;
    });
  }

  @action async uploadOfflineCaseResult(
    idx: number,
    remark: string,
    status: string,
    log: any,
  ) {
    let doc = this.docs[this.doc[this.pro][this.ins].idx];
    let res: any = await $ax.post('/taskAction', {
      action: 'uploadOfflineCaseResult',
      _id: doc._id,
      idx,
      remark,
      status,
      log,
    });
    runInAction(() => {
      this.docs[this.doc[this.pro][this.ins].idx] = res;
    });
  }

  @action async confirmOfflineCaseResult(
    idx: number,
    remark: string,
    status: string,
  ) {
    let doc = this.docs[this.doc[this.pro][this.ins].idx];
    let res: any = await $ax.post('/taskAction', {
      action: 'confirmOfflineCaseResult',
      _id: doc._id,
      idx,
      remark,
      status,
    });
    runInAction(() => {
      this.docs[this.doc[this.pro][this.ins].idx] = res;
    });
  }
}

let detail = new Detail();
autorun(async () => {});

export {detail};

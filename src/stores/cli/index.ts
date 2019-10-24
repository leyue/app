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
  @observable docs: any[] = [];

  constructor() {}

  @action setDocs(docs: any[]) {
    this.docs = docs;
  }

  @action updateDoc(mac: string, doc: any) {
    for (let [idx, doc] of this.docs.entries()) {
      if (doc.index.mac === mac) {
        this.docs[idx] = doc;
      }
    }
  }

  @action joinDoc(mac: string, doc: any) {
    for (let [idx, doc] of this.docs.entries()) {
      if (doc.index.mac === mac) {
        return;
      }
    }
    this.docs.push(doc);
  }

  @action closeDoc(mac: string) {
    for (let [idx, doc] of this.docs.entries()) {
      if (doc.index.mac === mac) {
        this.docs.slice(idx, 1);
      }
    }
  }
}

let cli = {
  root: new Root(),
};

export {cli};

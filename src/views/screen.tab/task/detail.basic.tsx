import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import {IAccount, ITask} from '../../../stores';
import moment from 'moment';
import {View, StyleSheet, Text} from 'react-native';
import {} from 'native-base';

type IProps = {};

@observer
class DetailBasic extends Component<IProps> {
  public state: any = {};

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];
    let titleColor = $color.carrot;
    switch (doc.status.name) {
      case 'ongoing':
        titleColor = $color.orange;
        break;
      case 'owner_confirm':
        titleColor = $color.carrot;
        break;
      case 'passed':
        titleColor = $color.nephritis;
        break;
      case 'failed':
        titleColor = $color.pomegranate;
        break;
    }
    switch (doc.type) {
      case 'TOOL':
        return (
          <View style={{width: '75%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>测试单号</Text>
              <Text>{doc.app}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>状态</Text>
              <Text style={{color: titleColor}}>{doc.status.name}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>类型</Text>
              <Text>{doc.type}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>描述</Text>
              <Text>{doc.archive.desc}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>提交者</Text>
              <Text>{doc.committer}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>项目</Text>
              <Text>{doc.element.project}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>HW</Text>
              <Text>{doc.element.hw}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>阶段</Text>
              <Text>{doc.element.casePhase}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>任务</Text>
              <Text>{doc.archive.name}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>软件版本 </Text>
              <Text>{doc.depend.pac0}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>工具路径 </Text>
              <Text>{doc.element.tool}</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={{width: '75%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>测试单号</Text>
              <Text>{doc.app}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>状态</Text>
              <Text style={{color: titleColor}}>{doc.status.name}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>类型</Text>
              <Text>{doc.type}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>描述</Text>
              <Text>{doc.archive.desc}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>提交者</Text>
              <Text>{doc.committer}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>项目</Text>
              <Text>{doc.element.project}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>HW</Text>
              <Text>{doc.element.hw}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>阶段</Text>
              <Text>{doc.element.casePhase}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>任务</Text>
              <Text>{doc.archive.name}</Text>
            </View>
            <View style={{height: 5}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: '30%'}}>软件版本 </Text>
              <Text>{doc.depend.pac0}</Text>
            </View>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({});

export {DetailBasic};

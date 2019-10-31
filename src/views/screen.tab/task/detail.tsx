import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';

import {NavigationScreenProp} from 'react-navigation';
import {DetailHeader} from './detail.header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DetailBasic} from './detail.basic';
import {DetailModule} from './detail.module';
import {DetailCategory} from './detail.category';
import {DetailPwr} from './detail.pwr';
import {DetailStability} from './detail.stability';
import {DetailTool} from './detail.tool';
import {DetailBug} from './detail.bug';
import {DetailCases} from './detail.cases';
import {Spinner, Icon} from 'native-base';
import {View, StyleSheet} from 'react-native';
import {Collapse, CollapseCItem, SelectTabs} from '../../../components';

interface IProps {
  navigation: NavigationScreenProp<any>;
}

@observer
class Detail extends Component<IProps> {
  static navigationOptions = ({navigation}: any) => {
    return {
      header: <DetailHeader />,
      tabBarLabel: 'Detail',
    };
  };

  public state: any = {};

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    await $stores.task.detail.setApp(this.props.navigation.state.params.app);
    // $stores.task.detail.setInfo();
    // $stores.task.detail.setBugs();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        ref={'taskDetail'}
        style={{backgroundColor: $color.white}}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}>
        <View
          style={{
            backgroundColor: $color.white,
            paddingLeft: 0,
            paddingRight: 0,
          }}>
          {$stores.task.detail.loading && (
            <Spinner color={$color.carrot} style={{height: 300}} />
          )}
          {!$stores.task.detail.loading && this.renderData()}
        </View>
      </KeyboardAwareScrollView>
    );
  }

  renderData() {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc: any = $stores.task.detail.doc[pro][ins];
    let inss: string[] = Object.keys($stores.task.detail.doc[pro]);
    let inssData: any[] = [];
    inss.map((item, idx) => {
      inssData.push({val: item});
    });
    return (
      <View>
        <View style={{}}>
          {inss[0] != '*' && (
            <SelectTabs
              selectedVal={ins}
              data={inssData}
              onSelectChanged={async (idx: number, val: string) => {
                $stores.task.detail.setIns(val);
              }}
            />
          )}
          <Collapse>
            <CollapseCItem title={'基本信息'} visable={true}>
              <DetailBasic />
            </CollapseCItem>
            <CollapseCItem title={'模块统计'}>
              <DetailModule />
            </CollapseCItem>
            <CollapseCItem title={'类别统计'}>
              <DetailCategory />
            </CollapseCItem>
            <CollapseCItem
              title={'结果汇总 --- 电流'}
              subTitle={
                doc.archive.report.stability.length > 0 ? null : '暂无数据'
              }>
              <DetailPwr />
            </CollapseCItem>
            <CollapseCItem
              title={'结果汇总 --- 压力测试'}
              subTitle={
                doc.archive.report.stability.length > 0 ? null : '暂无数据'
              }>
              <DetailStability />
            </CollapseCItem>
            <CollapseCItem
              title={'工具版本'}
              subTitle={
                doc.archive.report.tools.length > 0 ? null : '暂无数据'
              }>
              <DetailTool />
            </CollapseCItem>
            <CollapseCItem
              title={'BUG'}
              subTitle={doc.archive.report.bugs.length > 0 ? null : '暂无数据'}>
              <DetailBug />
            </CollapseCItem>
            <CollapseCItem title={'线上Case'} visable={true}>
              <DetailCases type={'online'} />
            </CollapseCItem>
            <CollapseCItem title={'线下Case'} visable={false}>
              <DetailCases type={'offline'} />
            </CollapseCItem>
          </Collapse>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Detail;

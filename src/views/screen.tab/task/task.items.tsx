import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {NavigationScreenProp} from 'react-navigation';
import moment from 'moment';
import {IAccount, ITask} from '../../../stores';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  ProgressBarAndroid,
  TouchableOpacity,
} from 'react-native';
import {Spinner, Icon, Card} from 'native-base';
import {OlCard, PopupMenu} from '../../../components';

let i = 0;

interface IProps {}
@observer
class TaskItems extends Component<IProps> {
  public state: any = {
    isRefreshing: false,
    enableLoadMore: true,
    showOpts: false,
  };
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <FlatList
        onTouchEnd={() => {
          if (this.state.showOpts) {
            this.setState({showOpts: false});
          }
        }}
        style={{paddingHorizontal: 7}}
        contentContainerStyle={{marginBottom: 0}}
        data={$stores.task.root.docs}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({item, idx}: any) => this.renderItem(item)}
        // 下拉刷新数据
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            colors={[$color.carrot]}
            onRefresh={async () => await this.refresh()}
          />
        }
        // 上拉加载更多数据
        // onEndReachedThreshold={10}
        // onEndReached={async () => {}}
        onContentSizeChange={(w: number, h: number) => {
          this.setState({enableLoadMore: true});
        }}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              color: $color.concrete,
            }}>
            暂无数据
          </Text>
        }
        ListFooterComponent={
          $stores.task.root.loadingMore ? (
            <View style={{height: 80}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 0,
                  color: $color.concrete,
                }}>
                上拉获取更多数据
              </Text>
              <Spinner color={$color.carrot} style={{height: 30}} />
            </View>
          ) : (
            <View style={{height: 80}} />
          )
        }
        progressViewOffset={50}
        onScroll={async event => {
          let offsetY = event.nativeEvent.contentOffset.y;
          let height = event.nativeEvent.layoutMeasurement.height;
          let contentHeight = event.nativeEvent.contentSize.height;
          // console.log(offsetY, height, contentHeight);
          if (offsetY + height >= contentHeight - 20) {
            await this.loadMore();
          }
        }}
        scrollEventThrottle={5}
      />
    );
  }

  renderItem(item: any) {
    let iconName = 'assignment';
    switch (item.type) {
      case 'SW':
        iconName = 'ios-appstore';
        break;
      case 'SANITY':
        iconName = 'ios-briefcase';
        break;
      case 'WCN':
        iconName = 'ios-bus';
        break;
      case 'PHY':
        iconName = 'ios-chatboxes';
        break;
      case 'TOOL':
        iconName = 'ios-alarm';
        break;
    }
    let color = $color.white;
    return (
      <View style={{paddingHorizontal: 0}}>
        <Card>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
            onPress={async (ev: any) => {
              await this.jumpDetail(item.app);
            }}>
            <Icon name={iconName} style={{color: $color.midnight_blue}} />
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '100%',
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: $color.midnight_blue,
                    }}>
                    {item.app}
                  </Text>
                  <View style={{flex: 3}} />
                  <Text style={{fontSize: 12}}>
                    {moment(item.cTime).format('MM.DD HH:mm')}
                  </Text>
                </View>

                <Text style={{color: $color.midnight_blue}}>
                  类型: {item.type}
                </Text>
                <Text style={{color: $color.midnight_blue}}>
                  提交者: {item.committer}
                </Text>
                <Text style={{color: $color.midnight_blue}}>
                  优先级: {item.priority}
                </Text>
              </View>
              <View>
                {item.tasks.map((task: any, subIdx: any) => {
                  let status = task.status.name;
                  let titleColor = $color.carrot;
                  let progress =
                    (task.status.pass + task.status.fail) / task.status.total;
                  switch (status) {
                    case 'depend_ready':
                      titleColor = $color.peter_river;
                      break;
                    case 'canceled':
                      titleColor = $color.light_dark;
                      break;
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
                  return (
                    <View key={subIdx}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: titleColor}}>
                          项目:{' '}
                          {`${task.element.project}${
                            task.element.instrument
                              ? `-${task.element.instrument}`
                              : ''
                          }-${task.status.name}`}
                        </Text>
                        {status == 'ongoing' && (
                          <ProgressBarAndroid
                            style={{marginLeft: 2, marginTop: 2}}
                            styleAttr={'Horizontal'}
                            progress={progress}
                            color={$color.orange}
                            animating={true}
                            indeterminate={false}
                          />
                        )}
                      </View>
                      <Text style={{color: titleColor}}>
                        硬件: {task.element.hw}
                      </Text>
                      <Text style={{color: titleColor}}>
                        软件: {task.element.sw}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
          <PopupMenu
            visable={this.state.showOpts}
            theme={0}
            top={51}
            left={7}
            width={130}
            data={[
              {icon: 'md-boat', val: '0', alias: '取消任务'},
              {icon: 'md-albums', val: '1', alias: '重测任务'},
              {icon: 'md-archive', val: '2', alias: '导出任务'},
            ]}
            onClose={async (val: string) => {
              this.setState({showOpts: false});
              $stores.task.root.setAction(+val);
              await $stores.task.root.getDocs();
            }}
          />
        </Card>
      </View>
    );
  }

  async refresh() {
    await $stores.task.root.getDocs();
  }

  async loadMore() {
    if (this.state.enableLoadMore) {
      this.setState({enableLoadMore: false});
      await $stores.task.root.getMoreDocs();
    }
  }

  async jumpDetail(app: string) {
    $nav.navigate('Detail', {app});
  }
}

export default TaskItems;

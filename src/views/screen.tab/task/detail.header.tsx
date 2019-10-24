import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {
  StackActions,
  NavigationActions,
  NavigationScreenProp,
} from 'react-navigation';
import moment from 'moment';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ActionSheet, Icon, Spinner} from 'native-base';
import {PopupMenu} from '../../../components';

interface IProps {}

@observer
class DetailHeader extends Component<IProps> {
  public state: any = {
    showProjects: false,
  };

  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <View
        onTouchEnd={() => {
          if (this.state.showProjects) {
            this.setState({showProjects: false});
          }
        }}
        style={{
          backgroundColor: $color.wet_asphalt,
          paddingHorizontal: 10,
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name={'ios-arrow-back'}
          style={{color: $color.white, fontSize: 24}}
          onPress={() => {
            // $nav.pop();
          }}
        />
        {!$stores.task.detail.loading && this.renderData()}
      </View>
    );
  }

  renderData() {
    let pro = $stores.task.detail.pro;
    let ins = $stores.task.detail.ins;
    let doc = $stores.task.detail.doc[pro][ins];
    let pros: string[] = Object.keys($stores.task.detail.doc);
    let prosData: any[] = [];
    pros.map((item, idx) => {
      prosData.push({val: item});
    });
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            if (pros.length > 1) {
              this.setState({showProjects: true});
            }
          }}>
          <Text
            style={{
              marginLeft: 20,
              height: '100%',
              fontSize: 15,
              fontWeight: 'bold',
              color: $color.white,
            }}>
            {$stores.task.detail.pro}
          </Text>
          {pros.length > 1 && (
            <Icon
              style={{color: $color.white, fontSize: 24}}
              name={'arrow-dropdown'}
            />
          )}
        </TouchableOpacity>
        <View style={{flex: 3}} />
        <PopupMenu
          visable={this.state.showProjects}
          theme={1}
          top={56}
          left={10}
          width={130}
          data={prosData}
          onClose={(val: string) => {
            $stores.task.detail.setPro(val);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export {DetailHeader};

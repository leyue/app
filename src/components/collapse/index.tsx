import React, {Component} from 'react';
import {inject, observer, Provider} from 'mobx-react';
import {View, StyleSheet} from 'react-native';

interface IProps {}

@observer
class Collapse extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          paddingLeft: 7,
          paddingRight: 5,
          paddingVertical: 0,
        }}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

import {CollapseCItem} from './card.item';
import {CollapseVItem} from './view.item';

export {Collapse, CollapseCItem, CollapseVItem};

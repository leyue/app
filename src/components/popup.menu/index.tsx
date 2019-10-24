import React, {Component, ReactInstance} from 'react';
// import createReactClass from 'create-react-class';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ART,
  GestureResponderEvent,
  UIManager,
  findNodeHandle,
} from 'react-native';
// import Modal from 'react-native-modal'
import {Card, CardItem, Icon} from 'native-base';
import {OlView} from '../ol.view';

const {width, height} = Dimensions.get('window');
enum ITheme {
  light = 0,
  dark,
}
interface IData {
  icon?: string;
  val: string;
  alias?: string;
}
interface IProps {
  visable?: boolean;
  top: number;
  left: number;
  width: number;
  theme?: ITheme;
  data: IData[];
  onClose: (val: string, alias: string) => void;
}
class PopupMenu extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {}

  onClose(val: string, alias: string) {
    this.props.onClose(val, alias);
  }

  render() {
    let top = this.props.top;
    return (
      <Modal
        transparent={true}
        visible={this.props.visable}
        animationType={'fade'}
        onShow={() => null}
        onRequestClose={() => {
          this.onClose('', '');
        }}>
        <Card
          style={{
            position: 'absolute',
            top: top,
            left: this.props.left,
            width: this.props.width,
            backgroundColor:
              this.props.theme == ITheme.light ? $color.silver : $color.silver,
          }}>
          {this.props.data.map((item, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginBottom: 1,
                  marginHorizontal: 1,
                  borderRadius: 2,
                  backgroundColor:
                    this.props.theme == ITheme.light
                      ? $color.pure_white
                      : $color.light_dark,
                }}
                onPress={(ev: GestureResponderEvent) => {
                  ev.preventDefault();
                  this.onClose(item.val, item.alias ? item.alias : item.val);
                }}>
                {item.icon && (
                  <Icon
                    name={item.icon}
                    style={{
                      color:
                        this.props.theme == ITheme.light
                          ? $color.light_dark
                          : $color.pure_white,
                      fontSize: 24,
                      marginRight: 10,
                    }}
                  />
                )}
                <Text
                  style={{
                    color:
                      this.props.theme == ITheme.light
                        ? $color.light_dark
                        : $color.pure_white,
                  }}>
                  {item.alias ? item.alias : item.val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Card>
      </Modal>
    );
  }
}

export {PopupMenu};

import Orientation, {
  orientation,
  specificOrientation,
} from 'react-native-orientation';

import {Dimensions} from 'react-native';

class Screen extends Object {
  public width: number;
  public height: number;
  public orientation: orientation;
  constructor() {
    super();
    const {width, height} = Dimensions.get('window');
    this.width = width;
    this.height = height;
    this.orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      this.width = width;
      this.height = height;
      this.orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
      console.log(width, height, this.orientation);
    });
  }
}

let screen = new Screen();

export {screen};

import * as moment from 'moment';

let time = {
  formatDuration(cnt: number) {
    let days = Math.floor(cnt / (24 * 3600 * 1000));
    let temp0 = cnt % (24 * 3600 * 1000);
    let hours = Math.floor(temp0 / (3600 * 1000));
    let temp1 = temp0 % (3600 * 1000);
    let minutes = Math.floor(temp1 / (60 * 1000));
    let temp2 = temp1 % (60 * 1000);
    let seconds = Math.round(temp2 / 1000);
    return `${days > 0 ? `${days}天` : ''}${hours > 0 ? `${hours}小时` : ''}${
      minutes > 0 ? `${minutes}分钟` : ''
    }${seconds > 0 ? `${seconds}秒` : ''}`;
  },
  formatDurationH(cnt: number) {
    let hours = (cnt / (3600 * 1000)).toFixed(2);
    return `${hours}h`;
  },
};

export {time};

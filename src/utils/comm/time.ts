import moment from 'moment';

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
  getMonthDuration(year: number, month: any) {
    let st = moment(`${year}`, 'YYYY')
      .add(month - 1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    let et = moment(`${year}`, 'YYYY')
      .add(month - 1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    return {st, et};
  },
  getWeekDuration(year: number, week: any) {
    let st = moment(`${year}`, 'YYYY')
      .add(week - 1, 'weeks')
      .startOf('week')
      .add(1, 'days')
      .format('YYYY-MM-DD HH:mm:ss');
    let et = moment(`${year}`, 'YYYY')
      .add(week - 1, 'weeks')
      .endOf('week')
      .add(1, 'days')
      .format('YYYY-MM-DD HH:mm:ss');
    let days = [];
    for (let i = 0; i < 7; i++) {
      let day = moment(`${year}`, 'YYYY')
        .add(week - 1, 'weeks')
        .startOf('week')
        .add(i + 1, 'days')
        .format('MM.DD');
      days.push(day);
    }
    return {st, et, days};
  },
  getDayDuration(date: string) {
    let st = moment(date, 'YYYY-MM-DD')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    let et = moment(date, 'YYYY-MM-DD')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    return {st, et};
  },
};

export {time};

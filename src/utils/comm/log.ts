const INFO = 'INFO';
const DEBUG = 'DEBUG';
const ERR = 'ERR';

function stackInfo() {
  // let path = require('path')
  let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
  let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
  // @ts-ignore
  let stackLst = new Error().stack.split('\n').slice(3);
  let s = stackLst[0];
  let sp = stackReg.exec(s) || stackReg2.exec(s);
  let data: any = {};
  if (sp && sp.length === 5) {
    data.method = sp[1];
    data.path = sp[2];
    data.line = sp[3];
    data.pos = sp[4];
    data.file = data.path;
  }
  return data;
}

const log = {
  i(data?: any) {
    let si: any = stackInfo();
    console.log(`${new Date().toLocaleString()}[${INFO}]-(${si.method})`, data);
  },
  d(data?: any) {
    let si: any = stackInfo();
    console.log(
      `${new Date().toLocaleString()}[${DEBUG}]-(${si.method})`,
      data,
    );
  },
  e(data?: any) {
    let si: any = stackInfo();
    console.log(`${new Date().toLocaleString()}[${ERR}]-(${si.method})`, data);
  },
};

export {log};

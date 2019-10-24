interface Math {
  equal: (a: number, b: number) => boolean;
  uuid: (format?: string) => string;
}

Math.equal = function(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
};

Math.uuid = function(format = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') {
  var d = new Date().getTime();
  var uuid = format.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

interface String {
  replaceAll: (a: string, b: string) => string;
}
String.prototype.replaceAll = function(a, b) {
  return this.replace(new RegExp(a, 'g'), b);
};

class WsCli extends Object {
  public ctx: any;
  private cbs: any;
  constructor() {
    super();
    this.cbs = {};
    this.conn();
  }

  conn() {
    //@ts-ignore
    this.ctx = new WebSocket('ws://nats-sh.unisoc.com:30001/sock');
    this.ctx.onopen = () => {
      console.log('onopen');
    };
    this.ctx.onerror = (e: any) => {
      console.log('onerror', e.message);
    };
    this.ctx.onclose = async (e: any) => {
      console.log('onclose', e.code, e.reason);
      await $func.mSleep(300);
      this.conn();
    };
    this.ctx.onmessage = (e: any) => {
      let data = JSON.parse(e.data);
      for (let key in this.cbs) {
        if (this.cbs[key]) {
          this.cbs[key](data);
        }
      }
    };
  }

  on(key: string, cb: any) {
    this.cbs[key] = cb;
  }

  send(data: any) {
    if (this.ctx.readyState == this.ctx.OPEN) {
      this.ctx.send(JSON.stringify(data));
    }
  }
}

let wsCli = new WsCli();

export {wsCli};

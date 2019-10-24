class WsCli extends Object {
  public ctx: any;
  constructor() {
    super();
  }

  conn() {
    //@ts-ignore
    this.ctx = new WebSocket('ws://nats-sh.unisoc.com:30001/sock');
    this.ctx.onopen = this.onopen.bind(this);
    // this.ctx.onmessage = this.onmessage.bind(this);
    this.ctx.onerror = this.onerror.bind(this);
    this.ctx.onclose = this.onclose.bind(this);
  }

  send(data: any) {
    if (this.ctx.readyState == this.ctx.OPEN) {
      this.ctx.send(JSON.stringify(data));
    }
  }

  onopen() {
    console.log('onerror');
  }

  onerror(e: any) {
    console.log('onerror', e.message);
  }

  async onclose(e: any) {
    console.log('onclose', e.code, e.reason);
    await $func.mSleep(300);
    this.conn();
  }
}

let wsCli = new WsCli();

export {wsCli};

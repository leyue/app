let func = {
  mSleep(ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },
};

export {func};

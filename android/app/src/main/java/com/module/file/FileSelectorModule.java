package com.module.file;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FileSelectorModule extends ReactContextBaseJavaModule {
  private Context mContext;

  public FileSelectorModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mContext = reactContext;
  }

  // 重载了getName()方法，用来暴露我们原生模块的名字
  @Override
  public String getName() {
    return "RnFileSelector";
  }

  // 通过@ReactMethod注解来暴露接口，这样以来我们就可以在js文件中通过MyNativeModule.rnCallNative()来调用我们暴露给RN的接口了
  // 不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束后只能通过回调函数或者发送消息给RN
  @ReactMethod
  public void open() {
    new FileSelector().open(mContext);
  }
}

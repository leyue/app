package com.app;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.module.demo.DemoModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RnModulePackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {

    List<NativeModule> modules = new ArrayList<>();
    // 将我们创建的类添加到原生模块中
    modules.add(new DemoModule(reactContext));
//    modules.add(new FileSelectorModule(reactContext));
    return modules;
  }

  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}

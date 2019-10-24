package com.module.demo;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Demo {
  public void getTime(Context ctx) {
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss");
    Date date = new Date(System.currentTimeMillis());
    String text = formatDate.format(date);
    Log.e("HHH", text);
    Toast.makeText(ctx, text, Toast.LENGTH_SHORT).show();
  }
}


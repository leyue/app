package com.module.file;

import android.content.Context;
import android.content.Intent;

import com.vincent.filepicker.Constant;
import com.vincent.filepicker.activity.NormalFilePickActivity;

public class FileSelector {
  public void open(Context ctx) {
    Intent intent4 = new Intent(ctx, NormalFilePickActivity.class);
    intent4.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent4.putExtra(Constant.MAX_NUMBER, 9);
    intent4.putExtra(NormalFilePickActivity.SUFFIX, new String[] {"xlsx", "xls", "doc", "docx", "ppt", "pptx", "pdf"});
//    ((Activity) ctx).startActivityForResult(intent4, Constant.REQUEST_CODE_PICK_FILE);
    ctx.startActivity(intent4);
  }
}

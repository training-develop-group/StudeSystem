package com.example.study_system;

import java.util.ArrayList;
import java.util.List;

public enum Path {
    PATH1("综合任务"), 
    PATH2("学习任务"), 
    PATH3("测试任务");
   
    private String path;
 
    Path(String path) {
        this.path = path;
    }
 
    public String getPath() {
        return path;
    }
     
    //测试方法
    public static void main(String[] args) {
    	List<String>  c = new ArrayList();
      c.add(Path.PATH1.getPath());
      c.add(Path.PATH2.getPath());
      c.add(Path.PATH3.getPath());
      
       for (int i = 0; i < args.length; i++) {
		System.out.println(c);
	}
    }
}
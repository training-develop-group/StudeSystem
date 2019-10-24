package com.example.study_system.emun;

import com.example.study_system.Path;

public enum TaskEnum {
    PATH1(1,"综合任务"), 
    PATH2(2,"学习任务"), 
    PATH3(3,"测试任务"), ;
   
    private String path;
    private int id;
    
 
    TaskEnum(int id ,String path) {
        this.path = path;
        this.id = id;
    }
 
    public String getPath() {
        return id+","+path;
       
    }
   
   
}

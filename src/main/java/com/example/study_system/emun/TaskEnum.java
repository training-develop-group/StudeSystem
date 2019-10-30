package com.example.study_system.emun;

import com.example.study_system.Path;

public enum TaskEnum {
	COMPREHENSIVE_TASK(1,"综合任务"), 
	LEARNING_TASK(2,"学习任务"), 
	TEST_TASK(3,"测试任务"), ;
   
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

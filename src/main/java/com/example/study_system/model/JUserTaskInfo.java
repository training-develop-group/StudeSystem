package com.example.study_system.model;

public class JUserTaskInfo {
	String userName ;
	Integer score ;
	Integer status;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }
    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getScore() {
        return score;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }
    
}

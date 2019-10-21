package com.example.study_system.model;

import java.util.Date;

public class StRoleInfo {
    private Integer roleId;

    private String roleName;

    private String remark;

    private String userAuthority;

    private String resAuthority;

    private String quesAuthority;

    private String paperAuthority;

    private String taskAuthority;

    private Date cTime;

    private Date mTime;

    private String cUser;

    private String mUser;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getUserAuthority() {
        return userAuthority;
    }

    public void setUserAuthority(String userAuthority) {
        this.userAuthority = userAuthority == null ? null : userAuthority.trim();
    }

    public String getResAuthority() {
        return resAuthority;
    }

    public void setResAuthority(String resAuthority) {
        this.resAuthority = resAuthority == null ? null : resAuthority.trim();
    }

    public String getQuesAuthority() {
        return quesAuthority;
    }

    public void setQuesAuthority(String quesAuthority) {
        this.quesAuthority = quesAuthority == null ? null : quesAuthority.trim();
    }

    public String getPaperAuthority() {
        return paperAuthority;
    }

    public void setPaperAuthority(String paperAuthority) {
        this.paperAuthority = paperAuthority == null ? null : paperAuthority.trim();
    }

    public String getTaskAuthority() {
        return taskAuthority;
    }

    public void setTaskAuthority(String taskAuthority) {
        this.taskAuthority = taskAuthority == null ? null : taskAuthority.trim();
    }

    public Date getcTime() {
        return cTime;
    }

    public void setcTime(Date cTime) {
        this.cTime = cTime;
    }

    public Date getmTime() {
        return mTime;
    }

    public void setmTime(Date mTime) {
        this.mTime = mTime;
    }

    public String getcUser() {
        return cUser;
    }

    public void setcUser(String cUser) {
        this.cUser = cUser == null ? null : cUser.trim();
    }

    public String getmUser() {
        return mUser;
    }

    public void setmUser(String mUser) {
        this.mUser = mUser == null ? null : mUser.trim();
    }
}
package com.example.study_system.dao;

import com.example.study_system.model.UserActionLog;

public interface UserActionLogMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(UserActionLog record);

    int insertSelective(UserActionLog record);

    UserActionLog selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(UserActionLog record);

    int updateByPrimaryKeyWithBLOBs(UserActionLog record);

    int updateByPrimaryKey(UserActionLog record);
}
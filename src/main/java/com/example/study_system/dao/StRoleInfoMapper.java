package com.example.study_system.dao;

import com.example.study_system.model.StRoleInfo;

public interface StRoleInfoMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(StRoleInfo record);

    int insertSelective(StRoleInfo record);

    StRoleInfo selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(StRoleInfo record);

    int updateByPrimaryKey(StRoleInfo record);
}
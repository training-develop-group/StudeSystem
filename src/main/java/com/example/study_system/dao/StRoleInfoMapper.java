package com.example.study_system.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.StRoleInfo;
@Mapper
public interface StRoleInfoMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(StRoleInfo record);

    int insertSelective(StRoleInfo record);

    StRoleInfo selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(StRoleInfo record);

    int updateByPrimaryKey(StRoleInfo record);
}
package com.example.study_system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.UserInfo;
@Mapper
public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);
    
    List<UserInfo> selectUserAll(); 
}
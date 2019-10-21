package com.example.study_system.dao;

import com.example.study_system.model.ResourceInfo;

public interface ResourceInfoMapper {
    int deleteByPrimaryKey(Long resId);

    int insert(ResourceInfo record);

    int insertSelective(ResourceInfo record);

    ResourceInfo selectByPrimaryKey(Long resId);

    int updateByPrimaryKeySelective(ResourceInfo record);

    int updateByPrimaryKey(ResourceInfo record);
}
package com.example.study_system.dao;

import com.example.study_system.model.TaskInfo;

public interface TaskInfoMapper {
    int deleteByPrimaryKey(Long taskId);

    int insert(TaskInfo record);

    int insertSelective(TaskInfo record);

    TaskInfo selectByPrimaryKey(Long taskId);

    int updateByPrimaryKeySelective(TaskInfo record);

    int updateByPrimaryKeyWithBLOBs(TaskInfo record);

    int updateByPrimaryKey(TaskInfo record);
}
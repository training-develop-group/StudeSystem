package com.example.study_system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.TaskInfo;
@Mapper
public interface TaskInfoMapper {
    int deleteByPrimaryKey(Long taskId);

    int insert(TaskInfo record);

    int insertSelective(TaskInfo record);

    TaskInfo selectByPrimaryKey(Long taskId);

    int updateByPrimaryKeySelective(TaskInfo record);

    int updateByPrimaryKeyWithBLOBs(TaskInfo record);

    int updateByPrimaryKey(TaskInfo record);
    
    List<TaskInfo> selectTaskAll();
   
    int updateByIdTaskName(TaskInfo record);
    
    int selectTaskCount();
}
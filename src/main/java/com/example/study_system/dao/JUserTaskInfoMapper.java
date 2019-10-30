package com.example.study_system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.study_system.model.JUserTaskInfo;
@Mapper
public interface JUserTaskInfoMapper {
	List<JUserTaskInfo> selectByTaskIdusers(@Param("taskId")Long taskId);
}

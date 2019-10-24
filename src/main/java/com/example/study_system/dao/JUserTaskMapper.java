package com.example.study_system.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.JUserTask;
@Mapper
public interface JUserTaskMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(JUserTask record);

    int insertSelective(JUserTask record);

    JUserTask selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(JUserTask record);

    int updateByPrimaryKey(JUserTask record);
    
    List<JUserTask> selectByIdTaskUser(Long TaskId);
}
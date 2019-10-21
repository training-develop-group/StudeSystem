package com.example.study_system.dao;

import com.example.study_system.model.JUserTask;

public interface JUserTaskMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(JUserTask record);

    int insertSelective(JUserTask record);

    JUserTask selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(JUserTask record);

    int updateByPrimaryKey(JUserTask record);
}
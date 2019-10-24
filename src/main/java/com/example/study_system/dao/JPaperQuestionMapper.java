package com.example.study_system.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.JPaperQuestion;
@Mapper
public interface JPaperQuestionMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(JPaperQuestion record);

    int insertSelective(JPaperQuestion record);

    JPaperQuestion selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(JPaperQuestion record);

    int updateByPrimaryKey(JPaperQuestion record);
}
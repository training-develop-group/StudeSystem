package com.example.study_system.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.JQuestionOption;
@Mapper
public interface JQuestionOptionMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(JQuestionOption record);

    int insertSelective(JQuestionOption record);

    JQuestionOption selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(JQuestionOption record);

    int updateByPrimaryKeyWithBLOBs(JQuestionOption record);

    int updateByPrimaryKey(JQuestionOption record);
}
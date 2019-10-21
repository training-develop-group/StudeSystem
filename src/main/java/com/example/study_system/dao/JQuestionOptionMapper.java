package com.example.study_system.dao;

import java.util.List;

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
	
	List<JQuestionOption> selectQuestionByQuestionId(Long questionId);

	List<JQuestionOption> selectAllQuestionOption();
	
	int deleteQuestionOptionByQuestionId(Long questionId);
}
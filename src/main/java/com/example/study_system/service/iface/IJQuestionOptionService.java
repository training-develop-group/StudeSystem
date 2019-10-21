package com.example.study_system.service.iface;

import java.util.List;

import com.example.study_system.model.JQuestionOption;

public interface IJQuestionOptionService {
	int insertSelective(JQuestionOption record);

	List<JQuestionOption> selectQuestionByQuestionId(Long questionId);

	List<JQuestionOption> selectAllQuestionOption();

	int deleteQuestionOptionByQuestionId(Long questionId);
}

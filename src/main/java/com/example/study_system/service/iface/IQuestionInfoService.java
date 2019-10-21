package com.example.study_system.service.iface;

import java.util.List;

import com.example.study_system.model.QuestionInfoWithBLOBs;
import com.github.pagehelper.PageInfo;

public interface IQuestionInfoService {
	int insertSelective(QuestionInfoWithBLOBs record, Long questionId, String optionContent, Integer isRight,
			String optionType);

	int deleteByPrimaryKey(Long questionId);

	int updateByPrimaryKeySelective(QuestionInfoWithBLOBs record);

	PageInfo<QuestionInfoWithBLOBs> selectAllQuestion(Integer pageNum, Integer pageSize);

	QuestionInfoWithBLOBs selectByPrimaryKey(Long questionId);

	int selectQuestionCount();

	String selectAnalysisById(Long questionId);
}

package com.example.study_system.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.example.study_system.dao.JQuestionOptionMapper;
import com.example.study_system.model.JQuestionOption;
import com.example.study_system.service.iface.IJQuestionOptionService;

@Service
public class JQuestionOptionServiceImpl implements IJQuestionOptionService {
	@Resource
	private JQuestionOptionMapper jQuestionOptionMapper;

	@Override
	public int insertSelective(JQuestionOption record) {
		Date date = new Date();
		record.setcTime(date);
		return jQuestionOptionMapper.insertSelective(record);
	}

	@Override
	public List<JQuestionOption> selectQuestionByQuestionId(Long questionId) {
		return jQuestionOptionMapper.selectQuestionByQuestionId(questionId);
	}

	@Override
	public List<JQuestionOption> selectAllQuestionOption() {
		return jQuestionOptionMapper.selectAllQuestionOption();
	}

	@Override
	public int deleteQuestionOptionByQuestionId(Long questionId) {
		return jQuestionOptionMapper.deleteQuestionOptionByQuestionId(questionId);
	}
}

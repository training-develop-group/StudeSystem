package com.example.study_system.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.study_system.dao.JQuestionOptionMapper;
import com.example.study_system.dao.QuestionInfoMapper;
import com.example.study_system.model.JQuestionOption;
import com.example.study_system.model.QuestionInfoWithBLOBs;
import com.example.study_system.service.iface.IQuestionInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class QuestionInfoServiceImpl implements IQuestionInfoService {
	@Resource
	private QuestionInfoMapper questionInfoMapper;
	@Resource
	private JQuestionOptionMapper jQuestionInfoMapper;

	@Override
	public int insertSelective(QuestionInfoWithBLOBs record, Long questionId, String optionContent, Integer isRight,
			String optionType) {
		Date date = new Date(); 
		record.setcTime(date);
		jQuestionInfoMapper.insertSelective(new JQuestionOption(questionId, optionContent, isRight, optionType));

		return questionInfoMapper.insertSelective(record);
	}

	@Override
	public int deleteByPrimaryKey(Long questionId) {
		return questionInfoMapper.deleteByPrimaryKey(questionId);
	}

	@Override
	public int updateByPrimaryKeySelective(QuestionInfoWithBLOBs record) {
		Date date = new Date();
		record.setmTime(date);
		return questionInfoMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public PageInfo<QuestionInfoWithBLOBs> selectAllQuestion(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<QuestionInfoWithBLOBs> questionList = questionInfoMapper.selectAllQuestion();
		PageInfo<QuestionInfoWithBLOBs> result = new PageInfo<>(questionList);
		return result;
	}

	@Override
	public QuestionInfoWithBLOBs selectByPrimaryKey(Long questionId) {
		return questionInfoMapper.selectByPrimaryKey(questionId);
	}

	@Override
	public int selectQuestionCount() {
		return questionInfoMapper.selectQuestionCount();
	}

	@Override
	public String selectAnalysisById(Long questionId) {
		return questionInfoMapper.selectAnalysisById(questionId);
	}
}

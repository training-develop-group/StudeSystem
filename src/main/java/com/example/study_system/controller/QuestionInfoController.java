package com.example.study_system.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.study_system.common.ResultDTO;
import com.example.study_system.controller.base.BaseController;
import com.example.study_system.model.QuestionInfo;
import com.example.study_system.model.QuestionInfoWithBLOBs;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("/question")
public class QuestionInfoController extends BaseController {
	@RequestMapping(value = "/question", method = RequestMethod.POST)
	public ResultDTO addQuestionInfo(@RequestBody QuestionInfoWithBLOBs record,
			@RequestParam("optionContent") String optionContent, @RequestParam("isRight") Integer isRight,
			@RequestParam("optionType") String optionType) {
		int result = serviceFacade.getQuestionInfoService().insertSelective(record, record.getQuestionId(),
				optionContent, isRight, optionType);
		return success(result);
	}

	@RequestMapping(value = "/question/{questionId}", method = RequestMethod.DELETE)
	public ResultDTO deleteQuestionInfo(@PathVariable("questionId") Long questionId) {
		return success(serviceFacade.getQuestionInfoService().deleteByPrimaryKey(questionId));
	}

	@RequestMapping(value = "/editQuestion", method = RequestMethod.POST)
	public ResultDTO editQeustionInfo(@RequestBody QuestionInfoWithBLOBs record) {
		return success(serviceFacade.getQuestionInfoService().updateByPrimaryKeySelective(record));
	}

	@RequestMapping(value = "/questions", method = RequestMethod.GET)
	public ResultDTO selectAllQuestion(@RequestParam("pageNum") Integer pageNum,
			@RequestParam("pageSize") Integer pageSize) {
		PageInfo<QuestionInfoWithBLOBs> result = serviceFacade.getQuestionInfoService().selectAllQuestion(pageNum,
				pageSize);

		return success(result);
	}

	@RequestMapping(value = "/{questionId}", method = RequestMethod.GET)
	public ResultDTO selectByPrimaryKey(@PathVariable("questionId") Long questionId) {
		return success(serviceFacade.getQuestionInfoService().selectByPrimaryKey(questionId));
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public ResultDTO selectQuestionCount() {
		return success(serviceFacade.getQuestionInfoService().selectQuestionCount());
	}

	@RequestMapping(value = "/answer", method = RequestMethod.GET)
	public ResultDTO selectAnalysisById(Long questionId) {
		return success(serviceFacade.getQuestionInfoService().selectAnalysisById(questionId));
	}

}

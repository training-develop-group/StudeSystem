package com.example.study_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.study_system.common.ResultDTO;
import com.example.study_system.controller.base.BaseController;
import com.example.study_system.model.JQuestionOption;
import com.example.study_system.model.QuestionInfoWithBLOBs;

@RestController
@RequestMapping("/jQuestionOption")
public class JQuestionOptionController extends BaseController {
	@RequestMapping(value = "/addJQuestionOption", method = RequestMethod.POST)
	public ResultDTO addQuestionOption(@RequestBody JQuestionOption record) {
		return success(serviceFacade.getJQuestionOptionService().insertSelective(record));
	}

	@RequestMapping(value = "/selectQuestionByQuestionId", method = RequestMethod.GET)
	public ResultDTO selectQuestionByQuestionId(@RequestParam("questionId") Long questionId) {
		return success(serviceFacade.getJQuestionOptionService().selectQuestionByQuestionId(questionId));
	}

	@RequestMapping(value = "/selectAllQuestionOption", method = RequestMethod.GET)
	public ResultDTO selectAllQuestionOption() {
		return success(serviceFacade.getJQuestionOptionService().selectAllQuestionOption());
	}

	@RequestMapping(value = "/deleteQuestionOptionByQuestionId/{questionId}", method = RequestMethod.DELETE)
	public ResultDTO deleteQuestionOptionByQuestionId(@PathVariable("questionId") Long questionId) {
		return success(serviceFacade.getJQuestionOptionService().deleteQuestionOptionByQuestionId(questionId));
	}

}

package com.example.study_system.service.impl.facade;

import com.example.study_system.service.iface.IJQuestionOptionService;
import com.example.study_system.service.iface.IQuestionInfoService;
import com.example.study_system.service.iface.IUserService;
import com.example.study_system.service.iface.facade.IServiceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * author lindan. date 2019/6/4.
 */
@Service
public class ServiceFacadeImpl implements IServiceFacade {
	@Autowired
	IUserService userService;
	@Autowired
	IQuestionInfoService questionInfoService;
	@Autowired
	IJQuestionOptionService jQuestionOptionService;

	@Override
	public IUserService getUserService() {
		return userService;
	}

	@Override
	public IQuestionInfoService getQuestionInfoService() {
		return questionInfoService;
	}

	@Override
	public IJQuestionOptionService getJQuestionOptionService() {
		return jQuestionOptionService;
	}

}

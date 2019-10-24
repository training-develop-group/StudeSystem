package com.example.study_system.service.impl.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.study_system.service.iface.ITaskService;
import com.example.study_system.service.iface.IUserService;
import com.example.study_system.service.iface.facade.IServiceFacade;

/**
 * author lindan. date 2019/6/4.
 */
@Service
public class ServiceFacadeImpl implements IServiceFacade {
	@Autowired
	IUserService userService;
	@Autowired
	ITaskService taskService;

	@Override
	public ITaskService getTaskService() {
		return taskService;
	}
	@Override
	public IUserService getUserService() {
		return userService;
	}

	
}

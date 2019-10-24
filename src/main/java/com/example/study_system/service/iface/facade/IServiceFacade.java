package com.example.study_system.service.iface.facade;

import com.example.study_system.service.iface.ITaskService;
import com.example.study_system.service.iface.IUserService;

/**
 * author lindan. date 2019/6/4.
 */
public interface IServiceFacade {
	IUserService getUserService();

	ITaskService getTaskService();


}
package com.example.study_system.service.iface;

import java.util.List;
import java.util.Map;

import com.example.study_system.model.JUserTaskInfo;
import com.example.study_system.model.TaskInfo;
import com.example.study_system.model.UserInfo;

public interface ITaskService {
	//查询全部任务
	List<TaskInfo> selectTaskAll();
	//查询任务总数
	int selectTaskCount();
	
	//根据id查询所有关联的用户
	List<JUserTaskInfo> selectTaskUsers(Long taskId);
	//查询所有用户
	List<UserInfo> selectAllUser();
	//查询类型枚举
	List<String> taskTypeEnum();
	//删除任务根据id
	int deleteTaskById(long taskId);
	
	//修改任务名根据id
	int updateTaskById(long taskId,String taskName);
	
	//添加任务
	int insertTask(TaskInfo taskInfo);
}

package com.example.study_system.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.study_system.common.ResultDTO;
import com.example.study_system.dao.TaskInfoMapper;
import com.example.study_system.emun.ResultEmun;
import com.example.study_system.emun.TaskEnum;
import com.example.study_system.model.JUserTaskInfo;
import com.example.study_system.model.TaskInfo;
import com.example.study_system.model.UserInfo;
import com.example.study_system.service.base.BaseService;
import com.example.study_system.service.iface.ITaskService;
@Service
public class TaskServiceImpl extends BaseService implements ITaskService{
	
	//查询from
	//查询任务全部
	@Override
	public List<TaskInfo> selectTaskAll(){
		return taskInfoMapper.selectTaskAll();
	}
	@Override
	public int selectTaskCount() {
		return taskInfoMapper.selectTaskCount();
	}
	//获取任务类型
	public List<String> taskTypeEnum(){
		List<String> taskType = new ArrayList<String>();	
		taskType.add(TaskEnum.COMPREHENSIVE_TASK.getPath());
		taskType.add(TaskEnum.LEARNING_TASK.getPath());
		taskType.add(TaskEnum.TEST_TASK.getPath());
	
		return taskType;
	}
	public List<UserInfo> selectAllUser(){
		return userInfoMapper.selectUserAll();
	}
	
	//查询查看任务对像
	public List<JUserTaskInfo> selectTaskUsers(Long taskId){
		return jUserTaskInfoMapper.selectByTaskIdusers(taskId);
	}
	//查询end
	
	
	//添加任务
	public int insertTask(TaskInfo taskInfo) {
		return taskInfoMapper.insert(taskInfo);
	}
	
	
	
	//删除from
	//删除任务根据任务id
	@Override
	public int deleteTaskById(long taskId) {
		return taskInfoMapper.deleteByPrimaryKey(taskId);
	}
	//删除end
	
	
	
	//修改from
	//根据id修改任务名
	@Override
	public int updateTaskById(long taskId,String taskName) {
		TaskInfo record= new TaskInfo();
		record.setTaskId(taskId);
		record.setTaskName(taskName);
		return taskInfoMapper.updateByIdTaskName(record);
	}
	//修改end
}

package com.example.study_system.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.study_system.common.ResultDTO;
import com.example.study_system.controller.base.BaseController;
import com.example.study_system.model.JUserTaskInfo;
import com.example.study_system.model.TaskInfo;
import com.example.study_system.model.UserInfo;
/**
 * author liubo.
 * date 2019/10/17.
 */
@RestController
@RequestMapping("/task")
public class TaskController extends BaseController { 
	//查询from
	//查询全部
		@RequestMapping(value = "/tasks", method = RequestMethod.GET)
		public ResultDTO<List<TaskInfo>> selectTaskAll(){
			List<TaskInfo> workedTasks = serviceFacade.getTaskService().selectTaskAll();
			return success(workedTasks);
		}
	//查询任务总条数
		@RequestMapping(value = "/count", method = RequestMethod.GET)
		public int selectTaskCount() {
			int taskCount =  serviceFacade.getTaskService().selectTaskCount();
			return taskCount;
		}
	//查询任务类型
		@RequestMapping(value = "/type", method = RequestMethod.GET)
		public List<String> selectTaskType() {
			List<String> taskCount =  serviceFacade.getTaskService().taskTypeEnum();
			return taskCount;
		}
	//查询所有任务对象 
		@RequestMapping(value = "/users", method = RequestMethod.GET)
		public List<UserInfo> selectAllUser(){
			List<UserInfo> allUser = serviceFacade.getUserService().selectUserAll();
			return allUser;
		}
	//查询任务完成度
		@RequestMapping(value = "/user-ok", method = RequestMethod.GET)
		public List<JUserTaskInfo> selectTaskUsers(@RequestParam("taskId")Long taskId){
			List<JUserTaskInfo> users = serviceFacade.getTaskService().selectTaskUsers(taskId);
			return users;
		}
	//查询end
		
		
	//删除from
	//点击删除用Id删除
		@RequestMapping(value = "/{taskId}", method = RequestMethod.DELETE)
		public int deleteTask(@PathVariable("taskId")Long taskId) {
			int deleteTask = serviceFacade.getTaskService().deleteTaskById(taskId);
			return deleteTask;
		}
	//删除end
		
		
	//修改from
	//根据Id修改任务名
		@RequestMapping(value = "/task/{taskId}", method = RequestMethod.POST)
		public ResultDTO<Integer> deleteTask( @PathVariable("taskId") Long taskId , @RequestParam("taskName")String taskName) {
			int updateTaskName = serviceFacade.getTaskService().updateTaskById(taskId, taskName);
			return success(updateTaskName);
		}
	//修改end
	//添加from
	//添加任务 (待完善)
		@RequestMapping(value = "/tasks" , method = RequestMethod.POST)
		public int insertTask(@RequestBody TaskInfo taskInfo) {
			int result=serviceFacade.getTaskService().insertTask(taskInfo);
			return result;
		}
}

package com.example.study_system.controller;

import com.example.study_system.common.ResultDTO;
import com.example.study_system.controller.base.BaseController;
import com.example.study_system.emun.ResultEmun;
import com.example.study_system.model.UserInfo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * author lindan.
 * date 2019/10/10.
 */
@RestController
@RequestMapping("/users")
public class UserController extends BaseController {
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResultDTO getUserInfoById(@RequestParam("userId") Integer userId) {
        if (userId == null) {
            return new ResultDTO(ResultEmun.VALIDATION_ERROR);
        }
        UserInfo userInfo = serviceFacade.getUserService().selectById(userId);
        if (userInfo == null) {
            return noData();
        }
        return success(userInfo);
    }
}

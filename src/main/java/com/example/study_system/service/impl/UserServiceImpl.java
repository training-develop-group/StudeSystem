package com.example.study_system.service.impl;

import com.example.study_system.model.UserInfo;
import com.example.study_system.service.base.BaseService;
import com.example.study_system.service.iface.IUserService;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * author lindan.
 * date 2019/6/4.
 */
@Service
public class UserServiceImpl extends BaseService implements IUserService {

    @Override
    public UserInfo selectById(Integer userId) {
        return userInfoMapper.selectByPrimaryKey(userId);
    }
    @Override
    public List<UserInfo> selectUserAll() {
    	return userInfoMapper.selectUserAll();
    }
}

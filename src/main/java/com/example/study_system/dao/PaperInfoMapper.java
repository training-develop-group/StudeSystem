package com.example.study_system.dao;

import com.example.study_system.model.PaperInfo;

public interface PaperInfoMapper {
    int deleteByPrimaryKey(Long paperId);

    int insert(PaperInfo record);

    int insertSelective(PaperInfo record);

    PaperInfo selectByPrimaryKey(Long paperId);

    int updateByPrimaryKeySelective(PaperInfo record);

    int updateByPrimaryKey(PaperInfo record);
}
package com.example.study_system.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.PaperInfo;
@Mapper
public interface PaperInfoMapper {
    int deleteByPrimaryKey(Long paperId);

    int insert(PaperInfo record);

    int insertSelective(PaperInfo record);

    PaperInfo selectByPrimaryKey(Long paperId);

    int updateByPrimaryKeySelective(PaperInfo record);

    int updateByPrimaryKey(PaperInfo record);
}
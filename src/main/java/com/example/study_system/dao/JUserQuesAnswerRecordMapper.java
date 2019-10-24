package com.example.study_system.dao;

import org.apache.ibatis.annotations.Mapper;

import com.example.study_system.model.JUserQuesAnswerRecord;
@Mapper
public interface JUserQuesAnswerRecordMapper {
    int deleteByPrimaryKey(Long ref);

    int insert(JUserQuesAnswerRecord record);

    int insertSelective(JUserQuesAnswerRecord record);

    JUserQuesAnswerRecord selectByPrimaryKey(Long ref);

    int updateByPrimaryKeySelective(JUserQuesAnswerRecord record);

    int updateByPrimaryKeyWithBLOBs(JUserQuesAnswerRecord record);

    int updateByPrimaryKey(JUserQuesAnswerRecord record);
}
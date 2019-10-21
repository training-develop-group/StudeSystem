package com.example.study_system.model;

import java.util.Date;

public class JUserQuesAnswerRecord {
    private Long ref;

    private String userId;

    private Long answerValue;

    private Long questionId;

    private Integer isRight;

    private Float scord;

    private Date cTime;

    private String answer;

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Long getAnswerValue() {
        return answerValue;
    }

    public void setAnswerValue(Long answerValue) {
        this.answerValue = answerValue;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Integer getIsRight() {
        return isRight;
    }

    public void setIsRight(Integer isRight) {
        this.isRight = isRight;
    }

    public Float getScord() {
        return scord;
    }

    public void setScord(Float scord) {
        this.scord = scord;
    }

    public Date getcTime() {
        return cTime;
    }

    public void setcTime(Date cTime) {
        this.cTime = cTime;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer == null ? null : answer.trim();
    }
}
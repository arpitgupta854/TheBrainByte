package com.exam.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

@Service
public interface Questionservice {

	public Question addquestion(Question question);
	
	public Question updatequestion(Question question);
	
	public void deletequestion(Long quesid);
	
	public Set<Question> getQuestions();
	
	public Question getQuestion(Long questionid);
	
	public Set<Question> getquestionofquiz(Quiz quiz);
	
}

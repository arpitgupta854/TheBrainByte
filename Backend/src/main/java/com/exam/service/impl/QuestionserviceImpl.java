package com.exam.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.Questionservice;

@Service
public class QuestionserviceImpl implements Questionservice{
	
	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public Question addquestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updatequestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		return new HashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionid) {
		return this.questionRepository.findById(questionid).get();
	}

	@Override
	public Set<Question> getquestionofquiz(Quiz quiz) {
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deletequestion(Long quesid) {
		Question question =new Question();
		question.setQuesid(quesid);
		this.questionRepository.delete(question);
		
	}

}

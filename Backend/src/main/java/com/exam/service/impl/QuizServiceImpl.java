package com.exam.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.service.Quizservice;

@Service
public class QuizServiceImpl implements Quizservice{
	
	@Autowired
	private QuizRepository quizRepository;

	@Override
	public Quiz addQuiz(Quiz quiz) {
		
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizs() {
		return new HashSet<>(this.quizRepository.findAll());
	}

	@Override
	public Quiz getQuiz(Long quizid) {
		return this.quizRepository.findById(quizid).get();
	}

	@Override
	public void deleteQuiz(Long quizId) {
		Quiz quiz=new Quiz();
		quiz.setqId(quizId);
		this.quizRepository.delete(quiz);
		
	}

	@Override
	public Set<Quiz> getQuizzesByCategory(Category category) {
		 return new HashSet<>(this.quizRepository.findByCategory(category));
	}

	@Override
	public List<Quiz> getActiveQuizzes() {
		
		return this.quizRepository.findByActive(true);
	}

	@Override
	public List<Quiz> getActiveQuizzesOfCategory(Category c) {
	 
		return this.quizRepository.findByCategoryAndActive(c,true);
	}
	
	//get Active Quizzes
	

}

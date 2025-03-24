package com.exam.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

@Service
public interface Quizservice {

	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuiz (Quiz quiz);
	public Set<Quiz> getQuizs();
	public Quiz getQuiz(Long quizid);
	public void deleteQuiz(Long quizId);
	Set<Quiz> getQuizzesByCategory(Category category);
	
	public List<Quiz> getActiveQuizzes();
	public List<Quiz> getActiveQuizzesOfCategory(Category c);
	
}

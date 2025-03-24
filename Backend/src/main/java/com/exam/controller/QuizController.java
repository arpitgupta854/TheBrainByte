package com.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.Quizservice;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	private Quizservice quizservice;
	
	//add quiz service
	
	@PostMapping("/")
	public ResponseEntity<Quiz>add(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizservice.addQuiz(quiz));
	}
	
	//update quiz
	@PutMapping("/{qid}")
	public ResponseEntity<Quiz> updateQuiz(@PathVariable("qid") Long qid, @RequestBody Quiz quiz) {
	    quiz.setqId(qid); // Ensure ID is set before updating
	    return ResponseEntity.ok(this.quizservice.updateQuiz(quiz));
	}

     
	
	//get the quiz
	
	@GetMapping("/")
	public ResponseEntity<?> quizzes(){
		return ResponseEntity.ok(this.quizservice.getQuizs());
	}
	
	//get single quiz
	@GetMapping("/{qid}")
	public Quiz quiz(@PathVariable("qid") Long qid) {
		return this.quizservice.getQuiz(qid);
	}
	
	//delete the quiz
	
	@DeleteMapping("/{qid}")
	public void DeleteQuiz(@PathVariable ("qid") Long qid) {
		this.quizservice.deleteQuiz(qid);
	}
	
	//get Active Quizzes
	
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		return this.quizservice.getActiveQuizzes();
	}
	@GetMapping("/category/active/{cid}")
	public List<Quiz> getActiveQuizzes(@PathVariable ("cid") long cid){
		Category category=new Category();
		category.setCid(cid);
		return this.quizservice.getActiveQuizzesOfCategory(category);
	}
}

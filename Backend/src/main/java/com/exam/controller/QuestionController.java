package com.exam.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.*;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.Questionservice;
import com.exam.service.Quizservice;

import java.util.Collections;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
	
	@Autowired
   private Questionservice questionservice;
	
	@Autowired
	private Quizservice quizservice;
	
	//add question
	@PostMapping("/")
	public ResponseEntity<Question> add(@RequestBody Question question){
		return ResponseEntity.ok(this.questionservice.addquestion(question));
	}
	
	//update question
	
	@PutMapping("/")
	public ResponseEntity<Question> updatequestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionservice.updatequestion(question));
	}
	
	//get all the question
	
	
	@GetMapping("/quiz/{qid}")
     public ResponseEntity<?> getQuestionofquiz(@PathVariable ("qid") Long qid){
			Quiz quiz=this.quizservice.getQuiz(qid);
		Set<Question> questions=quiz.getQuestions();
		List list=new ArrayList<>(questions);
		if(list.size()>Integer.parseInt(quiz.getnoofquestion())) {
			list=list.subList(0, Integer.parseInt(quiz.getnoofquestion()+1));
		}
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
		
		
	}
	
	@GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionofquizAdmin(@PathVariable ("qid") Long qid){
		Quiz quiz=new Quiz();
		quiz.setqId(qid);
		Set<Question>questionofquiz=this.questionservice.getquestionofquiz(quiz);
		return ResponseEntity.ok(questionofquiz);
		
		
	}
	
	//get single question
	@GetMapping("/{quesid}")
	public Question get(@PathVariable ("quesid") Long quesid) {
		return this.questionservice.getQuestion(quesid);
	}
	
	//delete the question
	
	@DeleteMapping("/{quesid}")
	public void DeleteQuestion(@PathVariable ("quesid") Long quesid) {
		this.questionservice.deletequestion(quesid);
	}
	
}

package com.exam.controller;

import java.util.Set;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
import com.exam.service.Categoryservice;
import com.exam.service.Quizservice;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class Categorycontroller {
	
	@Autowired
	private Categoryservice categoryservice;
	
	@Autowired
	private Quizservice quizService;
	
	//add category
	
	@PostMapping("/")
	public ResponseEntity<Category> addCategory(@RequestBody Category category){
	  Category category1=this.categoryservice.addCategory(category);
	  return ResponseEntity.ok(category1);
	}
    //get category
	
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable("categoryId") long categoryId) {
		return this.categoryservice.getCategory(categoryId);
	}
	
	
	//getall categories
	
	@GetMapping("/")
	@CrossOrigin("*")
	public ResponseEntity<?> getCategories(){
		return ResponseEntity.ok(this.categoryservice.getCategories());
	}
	
	
	//update categories
	
	@PutMapping("/")
	public Category updatecategory(@RequestBody Category category) {
		return this.categoryservice.updateCategory(category);
	}
	
	//delete category
	
	@DeleteMapping("/{categoryid}")
	public void deletecategory(@PathVariable ("categoryid") long categoryid) {
		 this.categoryservice.deleteCategory(categoryid);
		
		
	}
	
	@GetMapping("/{categoryId}/quizzes")
	public ResponseEntity<Set<Quiz>> getQuizzesByCategory(@PathVariable("categoryId") long categoryId) {
	    Category category = new Category();
	    category.setCid(categoryId); // Assuming Category has an ID field
	    Set<Quiz> quizzes = this.quizService.getQuizzesByCategory(category);
	    return ResponseEntity.ok(quizzes);
	}

}

package com.exam.repo;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long>{
	List<Quiz> findByCategory(Category category);
	
	public List<Quiz> findByActive(Boolean b);
	public List<Quiz> findByCategoryAndActive(Category c,Boolean b);
    
}

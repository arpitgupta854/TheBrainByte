package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.Categoryservice;

@Service
public class CategoryServiceImpl implements Categoryservice {

    @Autowired
    private CategoryRepository categoryrepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryrepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryrepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.categoryrepository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        Optional<Category> category = this.categoryrepository.findById(categoryId);
        return category.orElse(null); // Handle if category is not found
    }

    @Override
    public void deleteCategory(Long categoryId) {
        this.categoryrepository.deleteById(categoryId);
    }
}
 
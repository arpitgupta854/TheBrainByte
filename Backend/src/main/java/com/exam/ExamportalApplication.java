package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.Userservice;

@SpringBootApplication
public class ExamportalApplication {
	@Autowired
	private Userservice userservice;

	public static void main(String[] args) {
		SpringApplication.run(ExamportalApplication.class, args);
	}

}

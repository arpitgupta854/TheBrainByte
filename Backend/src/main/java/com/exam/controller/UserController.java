package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.Userservice;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	//creating User

	@Autowired
	private Userservice userservice;
	
	@PostMapping("/")
	public User createUser(@RequestBody User user) {
		user.setProfile("default.png");
		
		Set<UserRole> roles=new HashSet<>();
		Role role=new Role();
		role.setRoleId(48L);
		role.setRoleName("NORMAL");
		
		
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		return this.userservice.createUser(user, roles); 
	}
	
	
	@GetMapping("/{username}")
	@CrossOrigin("*")
	public User getUser(@PathVariable("username") String username) {
		return this.userservice.getUser(username);
	}
	
	//delete the user
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") long userId) {
		this.userservice.deleteUser(userId);
	}
	
	

}

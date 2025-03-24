package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.Userservice;

@Service
public class UserServiceImpl implements Userservice {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	 @Autowired
	    private BCryptPasswordEncoder passwordEncoder;
    
	@Override
	public User createUser(User user,Set <UserRole> userRoles){
		
		User local=this.userRepository.findByUsername(user.getUsername());
		if(local!=null) {
			 throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
		}
		else {
			//create the user
			
			 user.setPassword(passwordEncoder.encode(user.getPassword()));
			 
			for(UserRole ur:userRoles) {
				roleRepository.save(ur.getRole());
			}
			
			user.getUserRoles().addAll(userRoles);
			local=this.userRepository.save(user);
			
			
		}
		return local;
	}
	

	@Override
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}


	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}
}

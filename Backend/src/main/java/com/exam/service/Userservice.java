package com.exam.service;

import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface Userservice {
   public User createUser(User user,Set<UserRole> userRoles);
   public User getUser(String username);
   public void  deleteUser(Long userId);
}

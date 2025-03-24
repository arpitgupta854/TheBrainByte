package com.exam.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.exam.config.JwtUtil;
import com.exam.model.JwtRequest;
import com.exam.model.JwtResponse;
import com.exam.model.User;
import com.exam.service.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*") // Allow requests from different origins (fixes CORS issues)
public class AuthenticateController {
    
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private JwtUtil jwtUtils;

    // ✅ FIXED: Correct @PostMapping
    @PostMapping("/generate-token")
    @CrossOrigin("*")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid credentials: " + e.getMessage());
        }

        // ✅ FIXED: Correct `userDetailsServiceImpl.loadUserByUsername`
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());

        String token = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER DISABLED: " + e.getMessage());
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID CREDENTIALS: " + e.getMessage());
        }
    }
    
    
    //returns the details of current user
    @GetMapping("/current-user")
    @CrossOrigin("*")
    public User getCurrentUser(Principal principal) {
    	return ((User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName()));

    }
}

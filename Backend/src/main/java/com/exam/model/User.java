package com.exam.model;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String username;
    private String password;
    private String firstname;
    private String lastName;
    private String email;
    private String phone;
    private boolean enabled = true;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    @JsonIgnore
    private Set<UserRole> userRoles = new HashSet<>();

    @Column(name = "profile")
    private String profile;

    public User() {
    	
    }

    public User(Long id, String username, String password, String firstname, String lastName, String email,
                String phone, boolean enabled, String profile) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.enabled = enabled;
        this.profile = profile;
    }

    // ✅ Implement UserDetails methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> set = new HashSet<>();
        this.userRoles.forEach(userRole->{
        	set.add(new Authority(userRole.getRole().getRoleName()));
        });
        return set;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    // Getters and Setters
    public Long getId() { 
    	return id;
    }
    public void setId(Long id) {
    	this.id = id; 
    }
    public void setUserRoles(Set<UserRole> userRoles) {
    	this.userRoles = userRoles;
    	}
    public String getProfile() { 
    	return profile; 
    	}
    public void setProfile(String profile) {
    	this.profile = profile;
    	}
    public String getFirstname() {
    	return firstname; 
    	}
    public void setFirstname(String firstname) {
    	this.firstname = firstname;
    	}
    public String getLastName() { 
    	return lastName; 
    	}
    public void setLastName(String lastName) {
    	this.lastName = lastName; 
    	}
    public String getEmail() {
    	return email; 
    	}
    public void setEmail(String email) {
    	this.email = email; 
    	}
    public String getPhone() { 
    	return phone; 
    	}
    public void setPhone(String phone) {
    	this.phone = phone;
    	}

	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	
	  @Override
	     public String getPassword() {
		  return password; 
		  }
	  
	  @Override 
	  public String getUsername() { 
	   return username;
	   }
	 
}

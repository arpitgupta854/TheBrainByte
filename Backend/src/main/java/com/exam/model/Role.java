package com.exam.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity	
@Table(name = "roles")
	public class Role {

	    @Id
	    private Long roleId;

	    private String roleName;
	    
	    
	    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "role")
	    private Set<UserRole> userRole=new HashSet<>();
	    

	    public Set<UserRole> getUserRole() {
			return userRole;
		}

		public void setUserRole(Set<UserRole> userRole) {
			this.userRole = userRole;
		}

		public Role() {
	    }

	    public Role(Long roleId, String roleName) {
	        this.roleId = roleId;
	        this.roleName = roleName;
	    }

	    public Long getRoleId() {
	        return roleId;
	    }

	    public void setRoleId(long i) {
	        this.roleId = i;
	    }

	    public String getRoleName() {
	        return roleName;
	    }

	    public void setRoleName(String roleName) {
	        this.roleName = roleName;
	    }
	   
	}

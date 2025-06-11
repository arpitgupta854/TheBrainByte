class AuthService {
    static async login(token) {
      localStorage.setItem("token", token);
    }
  
    static isUserLoggedIn() {
      return localStorage.getItem("token") !== null;
    }
  
    static async currentUser() {
        const token = localStorage.getItem("token");
        if (!token) return null;
    
        try {
            const response = await fetch("http://localhost:8090/current-user", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) throw new Error("Failed to fetch user");
    
            return await response.json();
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    }
    
    static logout() {
      localStorage.removeItem("token");
      console.log("User logged out");
    }
}
  export default AuthService;
  
class AuthService {
    login(user, token) {
        const parsedUser = JSON.parse(user);
        localStorage.setItem("picture", JSON.stringify(parsedUser["picture"])); 
        localStorage.setItem("name", JSON.stringify(parsedUser['name']));
        localStorage.setItem("token", JSON.stringify(token));
    }
    logout() {
        localStorage.clear("picture");
        localStorage.clear("name");
        localStorage.clear("token");
    }
    getName() {
        return JSON.stringify(localStorage.getItem("name"));
    }
    getPicture() {
        return localStorage.getItem('picture');
    }
    getToken() {
        return localStorage.getItem('token');
    }
}

export default new AuthService();
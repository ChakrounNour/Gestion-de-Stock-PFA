import axios from "axios";

const API_URL = "http://localhost:4000/users/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "authenticate", {
        email,
        password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nom,prenom,tel, email, password,role) {
    return axios.post(API_URL + "register", {
      nom,
      prenom,
      tel,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

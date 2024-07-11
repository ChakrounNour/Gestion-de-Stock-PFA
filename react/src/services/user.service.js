import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getResponsableBoard() {
    return axios.get(API_URL + 'responsable', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();

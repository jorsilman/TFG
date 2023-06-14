import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  static async login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, formData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static async register(username, password, email, name) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username: username,
        password: password,
        email: email,
        name: name
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default ApiService;
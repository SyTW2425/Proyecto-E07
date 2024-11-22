import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/login`, {
          username,
          password
        });
        const { token, usuario } = response.data;
        this.token = token;
        this.user = usuario;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(usuario));
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  }
});
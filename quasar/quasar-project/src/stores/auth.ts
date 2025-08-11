import { defineStore } from 'pinia';
import { Notify, SessionStorage } from 'quasar';
import axios, { api } from 'src/boot/axios';
import { urls } from 'src/boot/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: JSON.parse(sessionStorage.getItem('token')!),
    isAuthenticated: false
  }),

  actions: {
    async login(username:string, password:string) {
      await api.post('auth/', {username: username, password: password}, {
        headers: {
          // Authorization: `token ${JSON.parse(sessionStorage.getItem('user')||'')}`,
          //     'Content-Type': 'multipart/form-data'
        },
      })
      .then((response)=>{
        this.token = response.data;
        sessionStorage.setItem('token', (JSON.stringify(this.token)))
        this.router.push('/index');
      })
      .catch(()=>{
        Notify.create({
          message:'Login error'
        })
      })
    },
    logout() {
      this.token = null;
      sessionStorage.removeItem('token');
      this.router.push('/login');
    },
    async checkAuth() {
      await api.get('checkauth')
      .then(async(response)=>{
        if(response.status===200)
        this.isAuthenticated=true
      })
      .catch(()=>{
        console.log('catsh 401')
        this.isAuthenticated=false
      })
    }
  }
});

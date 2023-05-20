import { defineStore } from 'pinia';
// import { LocalStorage, SessionStorage } from 'quasar';
import { Notify, SessionStorage } from 'quasar';
// import { Axios } from 'axios';
import axios, { api } from 'src/boot/axios';
import { urls } from 'src/boot/axios';
// import router from 'src/router';
import { useRouter } from 'vue-router';

const router = useRouter();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // counter: 0
    // token: JSON.parse(sessionStorage.getItem('token')||''),
    token: JSON.parse(sessionStorage.getItem('token')!),
    // returnUrl
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2;
  //   }
  // },

  actions: {
    async login(username:string, password:string) {
      console.log('login in auth-store')
      // const token =  await api.post('/login/', {username: username, password: password}, {
      // const token =  await api.post('/auth/', {username: username, password: password}, {
      // const token:string|null =  'null'
      await api.post('auth/', {username: username, password: password}, {
      // const token =  await api.post('google.com', {username: username, password: password}, {
      // const token =  await api.post('http://localhost:3000/auth/', {username: username, password: password}, {
      // const token =  await api.post(urls.baseURL, {username: username, password: password}, {
        headers: {
          // Authorization: `token ${JSON.parse(sessionStorage.getItem('user')||'')}`,
          //     'Content-Type': 'multipart/form-data'
        },
      })
      .then((response)=>{
        // token=response.data
        console.log('response.data: '+(response.data))
        this.token = response.data;
        sessionStorage.setItem('token', (JSON.stringify(this.token)))
        this.router.push('/index');
      })
      .catch(()=>{
        // this.router.push('/')
        Notify.create({
          message:'Login error'
        })
      })
      // this.token = token;
      // sessionStorage.setItem('token', (JSON.stringify(token)))
      

      // router().push(this.returnUrl);
      // this.router.push('/');
      // return router
    },
    logout() {
      this.token = null;
      sessionStorage.removeItem('token');
      this.router.push('/login');
    }
    // increment () {
    //   this.counter++;
    // }
  }
});

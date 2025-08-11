import { boot, route } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const ports = {
  backendPort: '3000',
}
const urls = {
  baseURL: window.location.protocol+'//'+window.location.hostname+':'+ports.backendPort,
}
const api = axios.create({ baseURL: urls.baseURL });
api.interceptors.request.use(async req =>{
    const token = JSON.parse(sessionStorage.getItem('token')!);
    const tryToken = JSON.parse(sessionStorage.getItem('token')!);
    if(token) {
      console.log('if token axios.ts: '+token)
      req.headers.Authorization = `Bearer ${token}`
    }
    return req;
  })
  api.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token')
        window.location.href = '/#/login';
      }
    });

export default boot(({ app, router }) => {
  
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, ports, urls };

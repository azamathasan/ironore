import { boot, route } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
// import  route  from 'src/router'
// const router = useRoute()
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
  // baseURL: ''
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' });
// const api = axios.create({ baseURL: urls.baseURL });
// const api = axios.create({ baseURL: 'http://google.ru' });
const api = axios.create({ baseURL: urls.baseURL });
api.interceptors.request.use(async req =>{
    const token = JSON.parse(sessionStorage.getItem('token')!);

    const tryToken = JSON.parse(sessionStorage.getItem('token')!);
    // console.log('token.data in interceptor: '+JSON.stringify(token.data))
    // console.log('tryToken in interceptor: '+JSON.stringify(tryToken.data))

    // console.log('token in request interceptor: '+token)
    
    if(token) {
      console.log('if token axios.ts: '+token)
      req.headers.Authorization = `Bearer ${token}`
    }
    // else {
    //   window.location.href = '/#/login';
    // };
    return req;
  })

  // api.interceptors.response.use(async response =>{
  //   console.log("res.status: "+response.status)
  //   if(response.status==401) router.push('/')
  //   // if(response.status==200) router.push('/')
  //   // if(req.status==200) router.push('/')
  //   // if(req.status===401) app.
  //     return response;
  // })
  api.interceptors.response.use(
    response => {
      // console.log("response: "+JSON.stringify(response))
      return response
    },
    error => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('token')
        // window.location.href = '/iron/#/login';
        window.location.href = '/#/login';
      }
    });

export default boot(({ app, router }) => {

  

  // axios.interceptors.response.use(
  //   response => {
  //     return response;
  //   },
  //   function(error) {
  //     console.log('axios.interceptor')
  //     if (error.response?.status === 401) {
  
  //       // store.dispatch("auth/logout");
  //       router.push('/');
  //     }
  //     return Promise.reject(error);
  //   }
  // )
  
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, ports, urls };

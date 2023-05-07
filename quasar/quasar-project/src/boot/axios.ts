import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

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
    
    if(token) req.headers.Authorization = `Bearer ${token.data}`;
    return req;
  })


export default boot(({ app }) => {

  
  
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, ports, urls };

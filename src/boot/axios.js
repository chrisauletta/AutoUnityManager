import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://auto-unity.kinghost.net:21012/' })
//const api = axios.create({ baseURL: 'http://localhost:21012/' })

export default boot(({ app, store, router }) => {
  app.config.globalProperties.$axios = axios

  api.interceptors.request.use(function (config) {
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, function (erro) {
    return Promise.reject(erro)
  })

  api.interceptors.response.use((response) => {
    return response;
  }, function (erro) {
    if(erro.response.data.message == 'Unauthorized'){
      store.commit("setUser", {});
      router.push("/login");
    }
    return Promise.reject(erro)
  })

  app.config.globalProperties.$api = api
})

export { api }

import { boot } from 'quasar/wrappers'
import * as tools from 'boot/tools'
import SecureLS from "secure-ls";
import createPersistedState from 'vuex-persistedstate';
const ls = new SecureLS({ isCompression: false });
import { Cookies } from 'quasar'


export default boot(({ app, router, store }) => {
  app.config.globalProperties.$url = "http://localhost:21012/";
  //app.config.globalProperties.$url = "http://auto-unity.kinghost.net:21012/";
 //app.config.globalProperties.$url = "https://aceita-frete-api.pl-tp.com.br/";

 app.config.globalProperties.$tools = tools;

 const cookies = process.env.SERVER
 ? Cookies.parseSSR(ssrContext)
 : Cookies
 createPersistedState({
  storage: {
    getItem: key => JSON.stringify(cookies.get(key)),
    setItem: (key, value) => cookies.set(key, value),
    removeItem: key => cookies.remove(key)
  }
})(store)
})


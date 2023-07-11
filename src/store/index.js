import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
// import SecureLS from "secure-ls";
// import createPersistedState from 'vuex-persistedstate';
// const ls = new SecureLS({ isCompression: false });


// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      aviso:null,
      user:{token:"", name:""},
      company:{}
    },
    getters:{
      getAviso:state =>{
        return state.aviso;
      },
      getUser:state => {
        return state.user
      },
      getCompany:state => {
        return state.company
      }
    },
    mutations:{
      setAviso(state,param){
        state.aviso = param; 
      },
      setUser(state, param){
        state.user = {token:param.token, name:param.name}
      },
      setCompany(state, param){
        state.company = param
      }
    },
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: key => ls.get(key),
    //       setItem: (key, value) => ls.set(key, value),
    //       removeItem: key => ls.remove(key)
    //     }
    //   })
    // ],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})

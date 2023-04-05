// export function someMutation (/* state */) {

//     DEFINIR_USUARIO_LOGADO = (state, { access_token, user, me}) => {
//         state.access_token = access_token
//         state.user = user
//         state.me = me
//       }

// }
const SET_USER = (state, param) => {
    state.user = {token:param.token, name:param.name}
} 
  
export {
    SET_USER
}
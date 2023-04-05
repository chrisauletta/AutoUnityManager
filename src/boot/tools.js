const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

const converteDataBr = (date) => {
   // return date.
}

const converterReal = (valor) => {
  return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

const exceptionCustom = (err, context) =>{
  if (Array.isArray(err)) {
    err.response.data.message.forEach((el) => {
      context.$q.notify({
        type: "negative",
        position: "top-right",
        message: el,
      });
    })
  } else {
    context.$q.notify({
      type: "negative",
      position: "top-right",
      message: err.response.data.message,
    });
  }
}
export {
    serialize,
    exceptionCustom,
    converterReal
}
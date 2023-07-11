export default {
	methods: {
		teste(){
			console.log(this.$store.state)
		},
		apiGet(url, query = "") {
			return new Promise((resolve, reject) => {
				this.$api.get(url + query)
					.then((response) => {
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
						
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		apiPost(url, query) {
			return new Promise((resolve, reject) => {
				this.$api.post(url, query)
					.then((response) => {
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Cadastro com sucesso",
						});
						resolve(response.data.Data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
						reject(err);
					});
			});
		},
		apiPut(url, query) {
			return new Promise((resolve, reject) => {
				this.$api.put(url, query)
					.then((response) => {
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Cadastro com sucesso",
						});
						resolve(response.data.Data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
						reject(err);
					});
			});
		},
		apiDelete(url, id) {
			return new Promise((resolve, reject) => {
				this.$api.delete(url+"/"+id)
					.then((response) => {
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Removido com sucesso",
						});
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
	}
}

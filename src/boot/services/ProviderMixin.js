export default {
	methods: {
		findProvider() {
			return new Promise((resolve, reject) => {
				this.$api.get("providers")
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		createProvider(query) {
			return new Promise((resolve, reject) => {
				this.$api.post("providers", query)
					.then((response) => {
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Cadastro com sucesso",
						});
						resolve(response.data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
						reject(false);
					});
			});
		},
	}
}

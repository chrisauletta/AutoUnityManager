export default {
	methods: {
		findService() {
			return new Promise((resolve, reject) => {
				this.$api.get("services")
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		createService(query) {
			return new Promise((resolve) => {
				this.$api.post("services", query)
					.then((response) => {
						console.log(response.data);
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Cadastro com sucesso",
						});
						resolve(response.data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
	}
}

export default {
	methods: {
		findPart() {
			return new Promise((resolve, reject) => {
				this.$api.get("parts")
					.then((response) => {
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		createPart(query) {
			return new Promise((resolve) => {
				this.$api.post("parts", query)
					.then((response) => {
						console.log(response.data.Data);
						this.$q.notify({
							type: "positive",
							position: "top-right",
							message: "Cadastro com sucesso",
						});
						resolve(response.data.Data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
	}
}

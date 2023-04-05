export default {
	methods: {
		findCustomers(query) {
			return new Promise((resolve, reject) => {
				this.$api.get("customers/find?" + query)
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						reject(err);
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		createCustomer(query) {
			return new Promise((resolve, reject) => {
				this.$api.post("customers", query)
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
						reject(err);
					});
			});
		},
	}
}

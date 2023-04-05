export default {
	methods: {

		findVehicleByCustumerId(customerId) {
			return new Promise((resolve, reject) => {
				this.$api.get("vehicles/findByCustomerId/"+customerId)
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		createVehicle(query) {
			return new Promise((resolve, reject) => {
				this.$api.post("vehicles", query)
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

export default {
	methods: {
		findBudget(query) {
			return new Promise((resolve, reject) => {
				this.$api.get("budgets/find?" + query)
					.then((response) => {
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		findBudgetById(id) {
			return new Promise((resolve, reject) => {
				this.$api.get("budget/findById/" + id)
					.then((response) => {
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async createBudget(query) {
			return await new Promise((resolve, reject) => {
				this.$api.post("budgets", query)
					.then((response) => {
						resolve(response.data.Data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		searchBudgetPart(budgetId) {
			return new Promise((resolve) => {
				this.$api.get("budgetsParts?budgetId=" + budgetId)
					.then((response) => {
						console.log(response.data.Data);
						resolve(response.data.Data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		createBudgetPart(query) {
			return new Promise((resolve) => {
				this.$api.post("budgetsParts", query)
					.then((response) => {
						console.log(response.data);
						resolve(response.data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		searchBudgetService(budgetId) {
			return new Promise((resolve) => {
				this.$api.get("budgetsServices?budgetId=" + budgetId)
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
		createBudgetService(query) {
			return new Promise((resolve) => {
				this.$api.post("budgetsServices", query)
					.then((response) => {
						resolve(response.data);
					})
					.catch((err) => {
						this.$tools.exceptionCustom(err, this);
					});
			});
		},
	}
}

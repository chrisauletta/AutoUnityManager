<template>
  <q-page class="bg-blue-8 window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Auto Unity teste</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1" style="width: 500px">
          <q-card-section>
            <q-form class="q-gutter-md" >
              <q-input
                label="Email"
                v-model="email"
                type="text"
                lazy-rules
                filled
              />

              <q-input
                label="Senha"
                v-model="password"
                type="text"
                filled
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="submitForm()"
            />
          </q-card-actions>
          <!-- <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {},

  created() {},

  methods: {
    submitForm() {
      this.$api
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          var result = response.data.Data;
          this.$store.commit("setUser", { token: result.access_token, name: result.name });
          this.$router.push("/budgets");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

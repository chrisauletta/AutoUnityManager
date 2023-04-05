<template>
  <q-page class="bg-blue-8 window-height row justify-center items-center">
    <div class="col-6">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Auto Unity teste</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1 col-12">
          <q-card-section>
            <q-form class="" >
              <div class="row q-gutter-md">
                <q-input
                  label="Email"
                  v-model="email"
                  type="text"
                  lazy-rules
                  filled
                  class="col"
                />

                <q-input
                  label="Senha"
                  v-model="password"
                  type="text"
                  filled
                  class="col"
                />
              </div>
              <div class="row q-gutter-md">
                <q-input
                  label="Email"
                  v-model="email"
                  type="text"
                  lazy-rules
                  filled
                  class="col"
                />

                <q-input
                  label="Senha"
                  v-model="password"
                  type="text"
                  filled
                  class="col"
                />
              </div>  
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md row">
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
          console.log(this.$store.state.user)
          this.$router.push("/budget");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

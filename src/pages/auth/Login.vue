<template>
  <q-page class="bg-blue-8 row" >
    <div class="col-12 q-mt-xl">
      <div class="row justify-center items-center">
        <h5 class="text-h5 text-white q-my-md">Auto Unity</h5>
      </div>
      <div class="row justify-center items-center">
        <q-card square bordered class="q-pa-lg shadow-1 col-10 col-md-5">
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
                type="password"
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
          <q-card-section class="q-py-none">
            <p class="text-grey-6">Cadastre-se</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import ApiMixin from "boot/services/ApiMixin";

export default {
  mixins: [ApiMixin],
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      idCompany:0
    };
  },

  computed: {},

  created() {
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
   // this.idCompany = this.$route.params.idCompany;
  },

  methods: {
    submitForm() {
      this.$api
        .post("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(async (response) => {
          var result = response.data.Data;
          this.$store.commit("setUser", { token: result.access_token, name: result.name });
          var company = await this.apiGet('company/'+result.companyId);
          this.$store.commit("setCompany", company);
          this.$router.push("/budgets");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

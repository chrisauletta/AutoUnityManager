<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white print-component-hide">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Auto Unity </q-toolbar-title>
        <!-- <q-btn flat round dense icon="more_vert" /> -->
        <q-btn-dropdown color="primary">
          <q-list>
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      v-model="leftDrawerOpen"
      side="left"
      class="background-drawer"
      :width="200"
    >
      <q-list>
        <q-item dark clickable to="/budgets">
          <q-item-section avatar>
            <q-icon name="o_list_alt" />
          </q-item-section>
          <q-item-section> Orçamento </q-item-section>
        </q-item>
        <q-item dark clickable to="/customers">
          <q-item-section avatar>
            <q-icon name="o_person" />
          </q-item-section>
          <q-item-section> Cliente </q-item-section>
        </q-item>
        <q-item dark clickable to="/vehicles">
          <q-item-section avatar>
            <q-icon name="o_directions_car" />
          </q-item-section>
          <q-item-section> Veiculos </q-item-section>
        </q-item>
        <q-item dark clickable to="/parts">
          <q-item-section avatar>
            <q-icon name="o_settings_suggest" />
          </q-item-section>
          <q-item-section> Peças </q-item-section>
        </q-item>
        <q-item dark clickable to="/services">
          <q-item-section avatar>
            <q-icon name="o_build" />
          </q-item-section>
          <q-item-section> Serviços </q-item-section>
        </q-item>
        <q-item dark clickable to="/providers">
          <q-item-section avatar>
            <q-icon name="o_groups" />
          </q-item-section>
          <q-item-section> Fornecedores </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  data() {
    return {
      test: "teste",
      leftDrawerOpen: false,
      miniState: false,
    };
  },

  computed: {},

  created() {
    // this.$axios
    //   .post('http://localhost:8000/clients', {
    //     filtro:"todos",
    //     valorFiltro:"Ch"
    //   })
    //   .then((response) => {
    //     if (response.data) {
    //       console.log(response.data);
    //       //this.items = response.data;
    //     } else {
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
      console.log(this.leftDrawerOpen);
    },
    logout(){
      this.$store.commit("setUser", {});
      this.$router.push("/login");
    }
  },
};
</script>

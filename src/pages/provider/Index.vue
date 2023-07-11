<template>
  <q-page padding class="">
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-px-lg q-py-md">
        <h5 style="margin: 0px">Central de Fornecedores</h5>
        <hr />
      </div>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-2">
            <q-select
              v-model="selectedFilter"
              :options="optionsFilter"
              outlined
              class="col-grow margin-flex"
            />
          </div>
          <div class="col-12 col-md-2">
            <q-input
              v-model="valueFilter"
              filled
              label="Filtro"
              class="col-grow margin-flex"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-btn
              stack
              color="primary"
              text-color="white"
              icon-right="search"
              label="Buscar"
              @click="tratarFiltro()"
            />
          </div>
          <div class="col-12 col-md-2 row justify-end">
            
            <q-btn
              padding="md"
              color="positive"
              text-color="white"
              icon-right="add"
              label="Novo Fornecedor"
              @click="$refs.modalProvider.openModal()"
            />
          </div>
        </div>
        <div class="row q-px-sm q-mt-md">
          <div class="col-12">
            <q-table
              title="Fornecedores"
              :rows="rows"
              :columns="columns"
              row-key="id"
            >
              <template v-slot:body-cell-buttons="props">
                  <q-td key="buttons" :props="props" auto-width>
                    <q-btn color="primary" icon="visibility" @click="$refs.modalProvider.openModal(props.row.id, true)"/>
                    <q-btn color="red-7" icon="delete" class="q-ml-sm" @click="destroy(props.row.id)"/>
                  </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <modalProvider ref="modalProvider"
                v-on:searchProvider="search"/>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalProvider from "pages/provider/ModalProvider";

export default {
  mixins: [ApiMixin],
  components: {ModalProvider},
  name: "Provider",
  data() {
    return {
      valueFilter: "",
      columns: [
        {
          name: "Loja",
          field: "providerName",
          label: "Loja",
          align: "left",
          required: true,
        },
        {
          name: "Vandedor",
          field: "seller",
          label: "Vendedor",
          align: "left",
          required: true,
        },
        {
          name: "Contato",
          field: "telephone",
          label: "Contato",
          align: "left",
          required: true,
        },
        {
          name: "buttons",
          field: "id",
          label: "",
          align: "left",
          required: true,
        },
      ],
      rows: [],
      initialPagination: {
        rowsPerPage: 10,
      },
      selectedFilter: "Todos",
      optionsFilter: [
        "Todos",
        "Nome"
      ],
    };
  },
  computed: {},
  created() {
    this.search();
  },
  methods: {
    async search() {
      this.rows = await this.apiGet("providers");
    },
    tratarFiltro() {
      var query = {
        search:true
      };
      switch (this.selectedFilter) {
        case "Nome":
          query.column = "name";
          query.value = this.valueFilter;
          query.table = "customer";
          break;
        case "Todos":
          query.column = "name";
          query.value = 0;
          query.table = "customer";
          query.search = false;
          break;
      }
      this.search(query);
    },
    linkCarregamento(row) {
      this.$store.commit("setCarregamento", row);
      this.$router.push("/Carregamento");
    },
    destroy(id) {
      this.apiDelete('providers', id);
    },
  },
};
</script>
<style scoped>
.my-float {
  font-size: 17px;
  margin-left: -5px;
  margin-top: 3px;
}
</style>

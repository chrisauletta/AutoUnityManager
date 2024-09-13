<template>
  <q-page padding class="">
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-px-lg q-py-md">
        <h5 style="margin: 0px">Central de Orçamentos</h5>
        <hr />
      </div>
      <q-card-section>
        <div class="row">
          <div class="col-12 flex-md">
            <q-card dark class="my-card col-grow margin-flex bg-red-7">
              <q-card-section>
                <label>teste</label>
              </q-card-section>
            </q-card>

            <q-card dark class="my-card col-grow margin-flex bg-red-7">
              <q-card-section>
                <label>teste</label>
              </q-card-section>
            </q-card>

            <q-card dark class="my-card col-grow margin-flex bg-red-7">
              <q-card-section>
                <label>teste</label>
              </q-card-section>
            </q-card>

            <q-card dark class="my-card col-grow margin-flex bg-red-7">
              <q-card-section>
                <label>teste</label>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
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
              :disable="disableFilter"
              v-model="valueFilter"
              filled
              label="Filtro"
              class="col-grow margin-flex"
            />
          </div>
          <div class="col-2 col-md-6">
            <q-btn
              stack
              color="primary"
              text-color="white"
              icon-right="search"
              label="Buscar"
              @click="tratarFiltro()"
            />
          </div>
          <div class="col-10 col-md-2 ">
            <div class="row justify-end q-mr-sm">
              <q-btn
                padding="md"
                color="positive"
                text-color="white"
                icon-right="add"
                label="Novo Orçamento"
                to="/budgets/create"
              />
            </div>
          </div>
        </div>
        <div class="row q-px-sm q-mt-md">
          <div class="col-12">
            <q-table
              title="Orçamentos"
              :rows="rows"
              :columns="columns"
              row-key="name"
            >
              <template v-slot:body-cell-buttons="props">
                  <q-td key="buttons" :props="props" auto-width>
                    <q-btn color="primary" label="Orçamento" :to="'/budgets/'+props.row.id"/>
                  </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";

export default {
  mixins: [ApiMixin],
  name: "Dashboard",
  data() {
    return {
      valueFilter: "",
      columns: [
        {
          name: "ID",
          field: (row) => (row.id ? row.id : "-"),
          label: "ID",
          align: "left",
          required: true,
        },
        {
          name: "Placa",
          field: (row) => (row.vehicle.plate ? row.vehicle.plate : "-"),
          label: "Placa",
          align: "left",
          required: true,
        },
        {
          name: "Veiculo",
          field: (row) =>
            row.vehicle.plate
              ? row.vehicle.model + " " + row.vehicle.brand
              : "-",
          label: "Veiculo",
          align: "left",
          required: true,
        },
        {
          name: "Cliente",
          field: (row) => (row.vehicle.customer.name ? row.vehicle.customer.name : "-"),
          label: "Cliente",
          align: "left",
          required: true,
        },
        {
          name: "Status",
          field: (row) => (row.StatusBudget ? row.StatusBudget.nome : "-"),
          label: "Status",
          align: "left",
          required: true,
        },
        {
          name: "Data Entrada",
          field: (row) => (row.dateInput ? new Date(row.dateInput).toLocaleString() : "-"),
          label: "Data Entrada",
          align: "left",
          required: true,
          sortable: true,
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
      selectedFilter: "Todos",
      optionsFilter: [
        "Todos",
        "Status Orçamento",
        "Placa",
        "Modelo Veiculo",
        "Nome Cliente",
      ],
      disableFilter: false,
      rightDrawerOpen: false,
      initialPagination: {
        rowsPerPage: 10,
      },
    };
  },
  computed: {},
  created() {
    //this.$tools.teste();
    this.buscarOrcamentos();
    
  },
  methods: {
    async buscarOrcamentos() {
      this.rows = await this.apiGet("budgets");
      console.log(this.rows);
      //this.rows = await this.findBudget(this.$tools.serialize(query));
    },
    async tratarFiltro() {
      var query = {
        search:true
      };
      switch (this.selectedFilter) {
        case "Todos":
          this.buscarOrcamentos();
          return;
          break;
        case "Status Orçamento":
          query.column = "status";
          query.value = "A";
          query.table = "budget";
          break;
        case "Placa":
          query.column = "plate";
          query.value = this.valueFilter;
          query.table = "vehicle";
          break;
        case "Modelo Veiculo":
          query.column = "model";
          query.value = this.valueFilter;
          query.table = "vehicle";
          break;
        case "Nome Cliente":
          query.column = "name";
          query.value = this.valueFilter;
          query.table = "vehicle->customer";
          break;
      }
      var search = await this.apiGet("budgets/find?", this.$tools.serialize(query));
      if(search.length > 0){
        this.rows = search;
      }
    },
    linkCarregamento(row) {
      this.$store.commit("setCarregamento", row);
      this.$router.push("/Carregamento");
    },
    buscarAviso() {
      console.log("FOI");
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

<template>
  <q-page padding class="">
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-px-lg q-py-md">
        <h5 style="margin: 0px">Central de Veiculos</h5>
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
              label="Novo Veiculo"
              @click="$refs.modalVehicle.openModal()"
            />
          </div>
        </div>
        <div class="row q-px-sm q-mt-md">
          <div class="col-12">
            <q-table
              title="Veiculos"
              :rows="rows"
              :columns="columns"
              row-key="id"
            >
              <template v-slot:body-cell-buttons="props">
                  <q-td key="buttons" :props="props" auto-width>
                    <q-btn color="primary" icon="visibility" @click="$refs.modalVehicle.openModal(props.row.id, true)"/>
                    <q-btn color="red-7" icon="delete" class="q-ml-sm" @click="deleteCustomer(props.row.id)"/>
                  </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
  <modalVehicle ref="modalVehicle"
                v-on:search="search"/>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalVehicle from "pages/vehicle/ModalVehicle";

export default {
  mixins: [ApiMixin],
  components: {ModalVehicle},
  name: "Vehicle",
  data() {
    return {
      valueFilter: "",
      columns: [
        {
          name: "Modelo",
          field: "model",
          label: "Modelo",
          align: "left",
          required: true,
        },
        {
          name: "Marca",
          field: "brand",
          label: "Marca",
          align: "left",
          required: true,
        },
        {
          name: "Placa",
          field: "plate",
          label: "Placa",
          align: "left",
          required: true,
        },
        {
          name: "Ano",
          field: "year",
          label: "Ano",
          align: "left",
          required: true,
        },
        {
          name: "Cor",
          field: "color",
          label: "Cor",
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
    async search(
      query = {
        column: "id",
        value: 0,
        table: "vehicle",
        search:false
      }
    ) {
      this.rows = await this.apiGet("vehicles/find?",this.$tools.serialize(query));
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
    delete(id) {
      this.apiDelete('vehicle', id);
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

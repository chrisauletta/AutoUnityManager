<template>
  <q-dialog v-model="modalVehicle">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Novo Veiculo</div>
          <q-btn label="X" color="red" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="row q-mb-xl" @submit="submitForm">
          <div class="col-12 col-md-6">
            <q-select
              hide-selected
              fill-input
              filled
              v-model="dataVehicle.customerId"
              label="Cliente"
              :options="optionsClient"
              @filter="filterSelectClient"
              :option-label="(opt) => {return opt.name + ' - [' + opt.id + ']'}"
              use-input
              class="q-mr-sm"
              :disable="viewFilds"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Não encontrou o cliente
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              filled
              label="Placa"
              v-model="dataVehicle.plate"
              type="text"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
              mask="AAA-#X##"
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              filled
              label="Marca"
              v-model="dataVehicle.brand"
              type="text"
              class="q-mr-sm q-mb-sm"
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled label="Modelo" v-model="dataVehicle.model" type="text" :disable="viewFilds"/>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              filled
              label="Cor"
              v-model="dataVehicle.color"
              type="text"
              class="q-mr-sm"
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled label="Ano" v-model="dataVehicle.year" type="text" :disable="viewFilds"/>
          </div>
          <div class="col-12 col-md-12 q-mt-md">
            <q-btn
              v-if="!viewFilds"
              label="Salvar"
              color="positive"
              type="submit"
            />
            <q-btn
              v-if="viewFilds"
              label="Alterar"
              color="primary"
              @click="enableFilds"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="left"> </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ApiMixin from 'src/boot/services/ApiMixin';
export default {
  mixins: [ApiMixin],
  name: "ModalVehicle",
  data() {
    return {
      dataVehicle: {
        plate: "",
        brand: "",
        model: "",
        year: 0,
        color: "",
        customerId: {},
      },
      optionsClient: [],
      allClients: [],
      modalVehicle: false,
     viewFilds:false,
      viewUpdate:false
    };
  },

  async created() {
    console.log(this.dataVehicle);
  },

  methods: {
    filterSelectClient(val, update) {
      update(() => {
        if (val) {
          const needle = val.toLowerCase();
          this.optionsClient = this.allClients.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.optionsClient = this.allClients;
        }
      });
    },
    async openModal(id = 0, disabledFilds = false) {
      this.allClients = await this.apiGet('customers');
      this.modalVehicle = true;
      this.viewFilds = disabledFilds;
      this.viewUpdate = disabledFilds;
      if(id){
        this.searchVehicle(id);
      }else{
        this.dataVehicle = {
          plate: "",
          brand: "",
          model: "",
          year: 0,
          color: "",
          customerId: null,
        }
      }
    },

    async searchVehicle(id){
      console.log("teste");
      var query = {
        column: "id",
        value: id,
        table: "vehicle",
        search:true
      }
      var search = await this.apiGet("vehicles/find?", this.$tools.serialize(query));
      if(search.length > 0){
        this.dataVehicle = search[0];
        var objCustomer = this.allClients.find((el) => el.id === this.dataVehicle.customerId);
        this.dataVehicle.customerId = objCustomer;
      }
    },

    async saveVehicle() {
      this.dataVehicle.customerId = this.dataVehicle.customerId.id;
      await this.apiPost('vehicles',this.dataVehicle);
      this.$emit("searchVehicle");
      this.modalVehicle = false;
    },

    async editVehicle() {
      this.dataVehicle.customerId = this.dataVehicle.customerId.id;
      await this.apiPut("vehicles",this.dataVehicle);
      this.$emit("searchVehicle");
      this.modalVehicle = false;
    },

    submitForm(e){
      e.preventDefault();
      if(this.viewUpdate){
        this.editVehicle();
      }else{
        this.saveVehicle();
      }
    },
    enableFilds(){
      this.viewFilds = false;
    },
  }
};
</script>
<style scoped>
</style>

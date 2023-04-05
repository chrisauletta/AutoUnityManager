<template>
  <q-page padding class="">
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-px-lg q-py-md">
        <h5 style="margin: 0px">Criar Ordem de Serviço</h5>
        <hr />
      </div>

      <q-card-section>
        <q-form class="row" @submit="saveBudget">
          <div class="col-lg-6 col-12">
            <div class="row">
              <div class="col-10">
                <q-select
                  filled
                  v-model="selectedClient"
                  label="Cliente"
                  :options="optionsClient"
                  @filter="filterSelectClient"
                  @popup-hide="searchVehicle"
                  :option-label="(opt) => opt.name"
                  use-input
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
              <div class="col-2 text-center">
                <q-btn
                  color="positive"
                  padding="13px"
                  text-color="white"
                  @click="$refs.modalCustomer.openModal()"
                >
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="person" />
                    <q-icon size="2em" name="add" />
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="row">
              <div class="col-10">
                <q-select
                  filled
                  v-model="selectedVehicle"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  label="Veiculo"
                  :options="optionsVehicle"
                  :option-label="(opt) => (opt ? opt.brand + ' - ' + opt.model : '')"
                  lazy-rules
                  :rules="[(val) => val || 'Campo Invalido']"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Não encontrou o veiculo - Selecione o cliente
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-2 text-center">
                <q-btn
                  color="positive"
                  text-color="white"
                  padding="13px"
                  @click="$refs.modalVehicle.openModal(selectedClient)"
                >
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="directions_car" />
                    <q-icon size="2em" name="add" />
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <q-input
              label="KM"
              v-model="dataBudget.km"
              type="text"
              class="q-mr-sm"
              lazy-rules
              filled
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
            />
          </div>
          <div class="col-12 col-md-8">
            <q-input
              label="Anotações"
              v-model="dataBudget.note"
              type="text"
              class="q-mr-sm"
              lazy-rules
              filled
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
            stack-label
            label="teste"
              placeholder="Data de Enterada"
              v-model="dataBudget.dateInput"
              type="date"
              class="q-mr-sm"
              lazy-rules
              mask=""
              filled
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
            />
          </div>
          <div class="col-12">
            <q-btn
              class="q-mt-md"
              color="positive"
              text-color="white"
              icon-right="add"
              label="Novo Orçamento"
              type="submit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <modalCustomer ref="modalCustomer"
                   v-on:searchCustomer="searchCustomer"/>

    <modalVehicle ref="modalVehicle"
                  v-on:searchVehicle="searchVehicle(false)"/>
  </q-page>

</template>

<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalCustomer from "pages/customer/ModalCustomer";
import ModalVehicle from "pages/vehicle/ModalVehicle";

export default {
  mixins: [ApiMixin],
  components: {ModalCustomer, ModalVehicle},
  name: "CreateBudget",
  data() {
    return {
      selectedClient: null,
      optionsClient: [],
      allClients: [],

      selectedVehicle: "",
      optionsVehicle: [],
      allVehicles: [],


      dataBudget: {
        km: 0,
        note: "",
        dateInput:""
      },
      modalVehicle: false,
      modalClient: false,
    };
  },
  computed: {},
  async created() {
    
    this.searchCustomer();
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

    async searchVehicle(e) {
       if(!e){
          this.optionsVehicle = await this.apiGet("vehicles/findByCustomerId/"+this.selectedClient.id);
       }
    },

    async saveBudget(e) {
      e.preventDefault();
      this.dataBudget.vehicleId = this.selectedVehicle.id;
      try {
        var budget = await this.apiPost('budgets', this.dataBudget);
        this.$q.notify({
          type: "positive",
          position: "top-right",
          message: "Cadastro com sucesso",
        });
        console.log(budget);
        this.$router.push(String(budget.id))
      } catch (err) {
        console.log(err);
        this.$q.notify({
          type: "danger",
          position: "top-right",
          message: err,
        });
      }
    },

    async searchCustomer(){
      this.allClients = await this.apiGet('customers');
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

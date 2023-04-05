<template>
  <q-page padding v-if="!dataBudget"> </q-page>
  <q-page padding v-else>
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-pa-xs">
        <h5 style="margin: 0px">Criar Ordem de Serviço</h5>
        <hr />
      </div>
<!-- HEADER -->
      <q-card-section class="q-mb-md">
        <div class="row">
          <div class="col-12 col-md-4">
            <q-input
              v-model="dataBudget.vehicle.plate"
              type="text"
              label="Placa"
              disable
              filled
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              class="q-mx-md"
              :model-value="dataBudget.vehicle.model+' '+dataBudget.vehicle.brand"
              type="text"
              label="Veiculo"
              disable
              filled
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              v-model="dataBudget.km"
              type="text"
              label="Data de Entrada"
              disable
              filled
            />
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-12 col-md-4">
            <q-input
              v-model="dataBudget.vehicle.customer.name"
              type="text"
              label="Status"
              disable
              filled
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              class="q-mx-md"
              v-model="dataBudget.createAt"
              type="text"
              label="Quilometragem"
              disable
              filled
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              v-model="dataBudget.situation"
              type="text"
              label="Cliente"
              disable
              filled
            />
          </div>
        </div>
      </q-card-section>
<!-- PEÇAS -->
      <q-card-section>
        <div class="row">
          <label class="text-h5">Peças</label>
          <div class="col-12">
            <div class="row" v-for="(part, index) in parts" :key="index">
              <div class="col-12 col-md-7">
                <q-select
                  class="q-mr-sm"
                  filled
                  v-model="parts[index].part"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  placeholder="Selecione a peça"
                  :options="optionParts"
                  @filter="filterSelectPart"
                   :option-label="(opt) => (opt.name ? opt.name : opt.namePart)"
                  lazy-rules
                  :rules="[(val) => val || 'Campo Invalido']"
                  :disable="parts[index].save"
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

              <div class="col-12 col-md-1">
                <q-input
                  v-model="parts[index].quantity"
                  type="text"
                  label="Qtd."
                  filled
                  :disable="parts[index].save"
                />
              </div>
              <div class="col-12 col-md-2">
                <q-input
                  v-model="parts[index].value"
                  class="q-mx-sm"
                  type="text"
                  label="Valor"
                  filled
                  :disable="parts[index].save"
                />
              </div>
              <div class="col-7 col-md-2 text-justify" v-if="parts[index].save">
                <q-btn color="red" class="q-mr-sm" padding="13px" text-color="white">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="delete" />
                  </div>
                </q-btn>
                <q-btn color="blue" padding="13px" text-color="white" @click="parts[index].save = false">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="edit" />
                  </div>
                </q-btn>
              </div>
              <div class="col-7 col-md-2 text-justify" v-else>
                <q-btn color="green" padding="13px" text-color="white" title="Salvar" @click="includePart(index)">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="save" />
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-btn
              class="q-mb-md q-mr-md"
              color="green"
              text-color="white"
              icon-right="add"
              label="Nova Peça"
              @click="addLinePart()"
            />
            <q-btn
              class="q-mb-md"
              color="primary"
              text-color="white"
              icon-right="add"
              label="Cadastrar Peça"
              @click="$refs.modalPart.openModal()"
            />
          </div>
        </div>
      </q-card-section>

<!-- SERVIÇOS -->
      <q-card-section>
        <div class="row">
          <label class="text-h5">Serviços</label>
          <div class="col-12">
            <div class="row" v-for="(service, index) in services" :key="index">
              <div class="col-12 col-md-8">
                <q-select
                  class="q-mr-sm"
                  filled
                  v-model="services[index].service"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  placeholder="Selecione a serviço"
                  :options="optionServices"
                  @filter="filterSelectService"
                  :option-label="(opt) => (opt.name ? opt.name : opt.nameService)"
                  lazy-rules
                  :rules="[(val) => val || 'Campo Invalido']"
                  :disable="services[index].save"
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

              <div class="col-12 col-md-2">
                <q-input
                  v-model="services[index].value"
                  class="q-mx-sm"
                  type="text"
                  label="Valor"
                  filled
                />
              </div>
              <div class="col-7 col-md-2 text-justify" v-if="services[index].save">
                <q-btn color="red" class="q-mr-sm" padding="13px" text-color="white">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="delete" />
                  </div>
                </q-btn>
                <q-btn color="blue" padding="13px" text-color="white" @click="services[index].save = false">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="edit" />
                  </div>
                </q-btn>
              </div>
              <div class="col-7 col-md-2 text-justify" v-else>
                <q-btn color="green" padding="13px" text-color="white" title="Salvar" @click="includeService(index)">
                  <div class="row items-center no-wrap">
                    <q-icon size="2em" name="save" />
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-btn
              class="q-mb-md q-mr-md"
              color="green"
              text-color="white"
              icon-right="add"
              label="Novo Serviço"
              @click="addLineService()"
            />
            <q-btn
              class="q-mb-md"
              color="primary"
              text-color="white"
              icon-right="add"
              label="Cadastrar Serviço"
              @click="$refs.modalService.openModal()"
            />
          </div>
        </div>
      </q-card-section>

<!-- FOOTER -->
      <q-card-section>
        <div class="row">
          <!-- <label class="text-h5">Observações</label> -->
          <div class="col-9">
            <q-input v-model="obs" filled  type="text" label="Observações"/>
          </div>
          <div class="col-2" style="align-self: self-end;">
            <label style="font-size:20px">Valor Total: {{totalValue}}</label>
          </div>
        </div>
        <div class="row q-mt-sm">
          <div class="col-3">
             <q-btn
              class="q-mb-md q-mr-md"
              color="green"
              text-color="white"
              label="Salvar"
              @click="saveBudget()"
            />
            <q-btn
              class="q-mb-md q-mr-md"
              color="green"
              text-color="white"
              label="Imprimir"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    
    <modalPart ref="modalPart"
               v-on:searchParts="searchParts"/>

    <modalService ref="modalService"
               v-on:searchServices="searchServices"/>

  </q-page>
</template>
<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalPart from "pages/part/ModalPart";
import ModalService from "pages/service/ModalService";

export default {
  mixins: [ApiMixin],
  components: {ModalPart, ModalService},
  name: "BudgetUpdate",
  data() {
    return {
      dataBudget: {
        situation:"",
        km:"",
        createAt:"",

        vehicle: {
          customer: {
            name: "",
            cell: "",
            create_at: "",
          },
          plate: "",
          brand: "",
          model: "",
        },
      },
      totalValue:0,

      tab: "movies",
      splitterModel: 0,
      obs:"",

      // LISTA DE PEÇAS
      parts: [],
      optionParts:[],
      allParts:[],


      // LISTA DE SERVIÇOS
      services: [],
      optionServices:[],
      allServices:[]
    };
  },
  async created() {
    var query = {
          column:'id',
          value:this.$route.params.idBudget,
          table:'Budget',
          search:true
        }
    var budget = await this.apiGet('budgets/find?',this.$tools.serialize(query));
    if(budget.length > 0){
      this.dataBudget = budget[0];
    }
    this.searchParts();
    this.searchServices();
    this.findBudgetPart();
    this.findBudgetService();
  },
  methods: {
    addLinePart() {
      if(this.parts.length > 0 && this.parts[this.parts.length - 1].save == false){
        this.$q.notify({
								type: "negative",
								position: "top-right",
								message: "Salve a ultima peça",
							});
        return;
      }
      this.parts.push({
        part:{},
        quantity:0,
        value:0,
        save:false
      });
    },
    async searchParts(){
      this.optionParts = await this.apiGet('parts');
      this.allParts = this.optionParts;
    },
    filterSelectPart(val, update) {
      update(() => {
        if (val) {
          const needle = val.toLowerCase();
          this.optionParts = this.allParts.filter(
            (v) => v.namePart.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.optionParts = this.allParts;
        }
      });
    },
    async findBudgetPart(){
      var parts = await this.apiGet("budgetsParts?budgetId=" + this.$route.params.idBudget);
      var partsAux = [];
      parts.forEach((el) => {
        partsAux.push({save : true,
                      part : el,
                      quantity:el.quantity,
                      value:el.value,
                      id: el.id});
        this.totalValue += el.value;                      
      });
      
      this.parts = partsAux;
    },
    async includePart(index){
      var partAux = this.parts[index];
      var query = {
        budgetId:this.$route.params.idBudget,
        partId:partAux.part.partId ? partAux.part.partId : partAux.part.id,
        quantity:partAux.quantity,
        value:partAux.value
      }
      var response = null;
      if(partAux.id){
        query.id = partAux.id;
        response = await this.apiPut('budgetsParts', query)
      }else{
        response = await this.apiPost('budgetsParts', query)
      }
      
      if(response){
        this.parts[this.parts.length - 1].save = true
      }
    },

    addLineService() {
      this.services.push({
        service:{},
        valueSale:0,
        save:false
      });
    },
    async searchServices(){
      this.optionServices = await this.apiGet('services');
      this.allServices = this.optionServices;
    },
    filterSelectService(val, update) {
      update(() => {
        if (val) {
          const needle = val.toLowerCase();
          this.optionServices = this.allServices.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        } else {
          this.optionServices = this.allServices;
        }
      });
    },
    async findBudgetService(){
      var service = await this.apiGet("budgetsServices?budgetId="+this.$route.params.idBudget);
      var servicesAux = [];
      service.forEach((el) => {
        servicesAux.push({save : true,
                         service : el,
                         value:el.value,
                         id:el.id});
        this.totalValue += el.value;
      });
      
      this.services = servicesAux;
    },
    async includeService(index){
      var serviceAux = this.services[index];
      var query = {
        budgetId:this.$route.params.idBudget,
        serviceId:serviceAux.service.serviceId ? serviceAux.service.serviceId : serviceAux.service.id,
        value:serviceAux.value
      }
      var response = null;
      if(serviceAux.id){
        query.id = serviceAux.id;
        response = await this.apiPut('budgetsServices', query)
      }else{
        response = await this.apiPost('budgetsServices', query)
      }
      if(response){
        this.services[index].save = true
      }
    }

  },
};
</script>
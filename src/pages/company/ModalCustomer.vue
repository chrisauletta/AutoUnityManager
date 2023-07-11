<template>
   <q-dialog v-model="modalCustomer">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Novo Cliente</div>
          <q-btn label="X" color="red" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="row q-mb-xl" @submit="submitForm">
          <div class="col-12 col-md-6">
            <q-input
              label="Nome"
              v-model="dataCustomer.name"
              type="text"
              class="q-mr-sm"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
              :disable="viewFilds"
              filled
            />
          </div>
          <div class="col-12 col-md-2">
            <q-select
              v-model="dataCustomer.documentType"
              :options="['CPF', 'RG', 'CNPJ']"
              outlined
              class="col-grow margin-flex"
              :disable="viewFilds"
              filled
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              label="Documento"
              v-model="dataCustomer.document"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <!-- CONTATO -->
          <div class="col-12 q-mt-sm"><strong>Contato</strong></div>
          <div class="col-12 col-md-4">
            <q-input
              label="Telefone"
              v-model="dataCustomer.telephone"
              type="text"
              mask="(##) ####-####"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input
              label="Celular"
              v-model="dataCustomer.cell"
              type="text"
              class="q-mx-sm"
              mask="(##) #####-####"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-4 ">
            <q-input label="E-mail" v-model="dataCustomer.email" type="text" filled :disable="viewFilds"/>
          </div>
          <!-- ENDEREÇO -->
          <div class="col-12 q-mt-sm">
            <strong>Endereço</strong>
          </div>
          <div class="col-12 col-md-4">
            <q-input label="CEP" v-model="dataCustomer.zipCode" type="text" filled :disable="viewFilds"/>
          </div>
          <div class="col-12 col-md-4 ">
            <q-input
              label="UF"
              v-model="dataCustomer.state"
              type="text"
              class="q-mx-sm"
              filled 
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-4">
            <q-input label="Cidade" v-model="dataCustomer.city" type="text" filled :disable="viewFilds"/>
          </div>
          <div class="col-12 col-md-4 q-my-sm">
            <q-input label="Bairro" v-model="dataCustomer.district" type="text" filled :disable="viewFilds"/>
          </div>
          <div class="col-12 col-md-4 q-my-sm">
            <q-input
              label="Rua"
              v-model="dataCustomer.street"
              type="text"
              class="q-mx-sm"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-4 q-my-sm">
            <q-input label="Numero" v-model="dataCustomer.number" type="text" filled :disable="viewFilds"/>
          </div>
          <div class="col-12">
            <q-input
              label="Complemento"
              v-model="dataCustomer.complement"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 q-mt-sm">
            <strong>Adicionais</strong>
          </div>
          <div class="col-12">
            <q-input label="Observação" v-model="dataCustomer.note" type="text" filled :disable="viewFilds"/>
          </div>
          <q-btn
            v-if="!viewUpdate"
            label="Salvar"
            type="submit"
            color="positive"
            class="q-mt-sm"
          />
          <q-btn
            v-if="viewUpdate"
            label="Alterar"
            color="primary"
            class="q-mt-sm"
            @click="enableFilds"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="left"> </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import CustomerMixin from 'src/boot/services/CustomerMixin';
import ApiMixin from 'src/boot/services/ApiMixin';
export default {
  mixins: [ApiMixin],
  props:{
    view:Boolean
  },
  name: "ModalCustomer",
  data() {
    return {
      dataCustomer: {
        name: "",
        documentType: "",
        document: "",
        telephone: "",
        cell: "",
        email: "",
        zipCode: "",
        state: "",
        city: "",
        district: "",
        street: "",
        number: "",
        complement: "",
        note: "",
      },
      modalCustomer: false,
      viewFilds:false,
      viewUpdate:false
    };
  },

  created() {

},

  methods: {
    openModal(idCustomer = 0, disabledFilds = false) {
      this.modalCustomer = true;
      this.viewFilds = disabledFilds;
      this.viewUpdate = disabledFilds;
      if(idCustomer){
        this.searchCustomer(idCustomer);
      }else{
        this.dataCustomer = {
          name: "",
          documentType: "",
          document: "",
          telephone: "",
          cell: "",
          email: "",
          zipCode: "",
          state: "",
          city: "",
          district: "",
          street: "",
          number: "",
          complement: "",
          note: "",
        }
      }
    },
    async searchCustomer(idCustomer){
      var query = {
        column: "id",
        value: idCustomer,
        table: "customer",
        search:true
      }
      var search = await this.apiGet("customers/find?", this.$tools.serialize(query));
      if(search.length > 0){
        this.dataCustomer = search[0];
      }
    },
    async saveCustomer() {
      await this.apiPost("customers", this.dataCustomer);
      this.$emit("searchCustomer");
      this.modalCustomer = false;
    },
    async editCustomer() {
      await this.apiPut("customers",this.dataCustomer);
      this.$emit("searchCustomer");
      this.modalCustomer = false;
    },
    enableFilds(){
      this.viewFilds = false;
      this.viewUpdate = false;
    },
    submitForm(e){
      e.preventDefault();
      if(!this.viewUpdate){
        this.editCustomer();
      }else{
        this.saveCustomer();
      }
    }
  },
};
</script>
<style scoped>
</style>

<template>
  <q-dialog v-model="modalProvider">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Cadastrar Fornecedor</div>
          <q-btn label="X" color="red" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="row q-mb-xl" @submit="submitForm">
          <div class="col-12 col-md-6">
            <q-input
              label="Nome do Fornecedor"
              v-model="dataProvider.providerName"
              type="text"
              class="q-mr-sm"
              lazy-rules
              filled
              :rules="[(val) => (val && val.length > 0) || 'Campo Invalido']"
              :disable="viewFilds"
            />
          </div>

          <div class="col-12 col-md-3">
            <q-input
              class="q-mr-sm"
              label="Vendedor"
              v-model="dataProvider.seller"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              label="Contato"
              v-model="dataProvider.telephone"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
            class="q-mr-sm"
              label="Endereço"
              v-model="dataProvider.street"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
            class="q-mr-sm"
              label="Bairro"
              v-model="dataProvider.district"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
         <div class="col-12 col-md-3">
            <q-input
              label="Cidade"
              v-model="dataProvider.city"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>

          <div class="col-12">
            <q-btn
              v-if="!viewFilds"
              label="Salvar"
              type="submit"
              color="positive"
              class="q-mt-sm"
            />
            <q-btn
              v-if="viewUpdate && viewFilds"
              label="Alterar"
              color="primary"
              class="q-mt-sm"
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
import ApiMixin from "boot/services/ApiMixin";

export default {
  mixins: [ ApiMixin],
  name: "ModalProvider",
  data() {
    return {
      // MODAL DE PEÇAS
      dataProvider: {
        providerName: "",
        seller: "",
        telephone: "",
        street: "",
        district: "",
        city:""
      },
      modalProvider: false,
      viewFilds:false,
      viewUpdate:false
    };
  },

  created() {
  },

  methods: {
    async openModal(id, disabledFilds = false) {
      this.modalProvider = true;
      this.viewFilds = disabledFilds;
      this.viewUpdate = disabledFilds;
      if(id){
        var query = {
          column: "id",
          value: id,
          table: "provider",
          search:true
        }
        var search = await this.apiGet('providers/find?', this.$tools.serialize(query));
        if(search.length > 0){
          this.dataProvider = search[0]
        }
      }else{
        this.dataProvider = {
          providerName: "",
          seller: "",
          telephone: "",
          street: "",
          district: "",
          city:""
        }
      }
    },
    enableFilds(){
      this.viewFilds = false;
      this.viewUpdate = true;
    },

    async save() {
      await this.apiPost('providers', this.dataProvider);
      this.modalProvider = false;
      this.$emit("searchProvider");
    },

    async edit(){
      await this.apiPut('providers', this.dataProvider);
      this.modalProvider = false;
      this.$emit("searchProvider");
    },

    submitForm(e){
      e.preventDefault();
      if(this.viewUpdate){
        this.edit();
      }else{
        this.save();
      }
    }

  },
};
</script>
<style scoped>
</style>

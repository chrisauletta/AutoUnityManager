<template>
  <q-dialog v-model="modalService">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Cadastrar de Service</div>
          <q-btn label="X" color="red" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="row q-mb-md" @submit="submitForm">
          <div class="col-12 col-md-6">
            <q-input
              label="Nome do Serviço"
              v-model="dataServices.name"
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
              label="Valor"
              v-model="dataServices.value"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>

          <div class="col-12 q-mb-md">
            <q-input
              class="q-mr-sm"
              label="Observações"
              v-model="dataServices.note"
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
    </q-card>
  </q-dialog>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";

export default {
  mixins: [ApiMixin],
  name: "ModalService",
  data() {
    return {
      // MODAL DE PEÇAS
      dataServices: {
        name: "",
        note: "",
        value: "",
      },
      modalService: false,
      viewFilds:false,
      viewUpdate:false
    };
  },

  methods: {
    async openModal(id, disabledFilds = false) {
      this.modalService = true;
      this.viewFilds = disabledFilds;
      this.viewUpdate = disabledFilds;
      if(id){
        var query = {
          column: "id",
          value: id,
          table: "service",
          search:true
        }
        var search = await this.apiGet('services/find?', this.$tools.serialize(query));
        if(search.length > 0){
          this.dataServices = search[0];
        }
      }else{
        this.dataServices = {
          name: "",
          note: "",
          value: "",
        }
      }
    },

    async save() {
      await this.apiPost('services', this.dataServices);
      this.modalService = false;
      this.$emit("searchServices");
    },

    async edit() {
      await this.apiPut('services', this.dataServices);
      this.modalService = false;
      this.$emit("searchServices");
    },

    enableFilds(){
      this.viewFilds = false;
      this.viewUpdate = true;
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

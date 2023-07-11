<template>
  <q-dialog v-model="modalPart">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Cadastrar Peça</div>
          <q-btn label="X" color="red" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="row q-mb-xl" @submit="submitForm">
          <div class="col-12 col-md-6">
            <q-input
              label="Nome"
              v-model="dataParts.name"
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
              label="Tipo"
              v-model="dataParts.type"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              label="Marca"
              v-model="dataParts.marker"
              type="text"
              filled
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              class="q-mr-sm"
              filled
              v-model="dataParts.providerId"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="Selecione a peça"
              :options="optionProvider"
              @filter="filterSelectProvider"
              :option-label="(opt) => opt.providerName"
              :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
              emit-value
              map-options
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
          <div class="col-1 q-mr-sm">
            <q-btn
              size="md"
              icon-right="person"
              icon="add"
              color="positive"
              @click="$refs.modalProvider.openModal()"
              :disable="viewFilds"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              label="Valor"
              v-model="dataParts.value"
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
              v-if="viewFilds"
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
    <modalProvider ref="modalProvider"
    v-on:searchProvider="searchProvider"/>
  </q-dialog>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalProvider from "pages/provider/ModalProvider";


export default {
  mixins: [ApiMixin],
  components: {ModalProvider},
  name: "ModalPart",
  data() {
    return {
      // MODAL DE PEÇAS
      dataParts: {
        name: "",
        type: "",
        marker: "",
        value: "",
        providerId: "",
      },
      modalPart: false,
      optionProvider: [],
      allProvider: [],
      viewFilds:false,
      viewUpdate:false
    };
  },

  created() {
    this.searchProvider();
  },

  methods: {
    async openModal(id, disabledFilds = false) {
      this.modalPart = true;
      this.viewFilds = disabledFilds;
      this.viewUpdate = disabledFilds;
      if(id){
        var query = {
          column: "id",
          value: 0,
          table: "parts",
          search:false
        }
        var search = await this.apiGet('parts/find?',this.$tools.serialize(query));
        if(search.length > 0){
          this.dataParts = search[0];
        }
      }else{
        this.dataParts = {
          name: "",
          type: "",
          marker: "",
          value: "",
          providerId: "",
        }
      }
    },

    async save() {
      await this.apiPost('parts', this.dataParts);
      this.modalPart = false;
      this.$emit("searchParts");
    },

    async edit() {
      await this.apiPut('parts', this.dataParts);
      this.modalPart = false;
      this.$emit("searchParts");
    },
    enableFilds(){
      this.viewFilds = false;
    },
    submitForm(e){
      e.preventDefault();
      if(this.viewUpdate){
        this.edit();
      }else{
        this.save();
      }
    },
    async searchProvider() {
      this.optionProvider = await this.apiGet('providers');
      this.allProvider = this.optionProvider;
    },
    filterSelectProvider(val, update) {
      update(() => {
        if (val) {
          const needle = val.toLowerCase();
          this.optionProvider = this.allProvider.filter(
            (v) => {
              return v.providerName.toLowerCase().indexOf(needle) > -1
              }
          );
        } else {
          this.optionProvider = this.allProvider;
        }
      });
    },
  },
};
</script>
<style scoped>
</style>

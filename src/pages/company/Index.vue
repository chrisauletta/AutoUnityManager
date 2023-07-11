<template>
  <q-page padding class="">
    <q-card class="q-mb-lg">
      <div class="col-6 text-black q-px-lg q-py-md">
        <h5 style="margin: 0px">Central de Configurações</h5>
        <hr />
      </div>
      <q-card-section>
        <div class="row">
          <div class="col-8">
            <div class="row">
              <q-input
                v-model="company.name"
                filled
                label="Nome da Empresa"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.cnpj"
                filled
                label="CNPJ"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.cell"
                filled
                label="Celular"
                class="col-12 col-md-3 q-pa-sm"
              />
              <q-input
                v-model="company.telephone"
                filled
                label="Telefone"
                class="col-12 col-md-3 q-pa-sm"
              />
              <q-input
                v-model="company.email"
                filled
                label="E-email"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.street"
                filled
                label="Rua"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.district"
                filled
                label="Bairro"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.state"
                filled
                label="Estado"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.city"
                filled
                label="Cidade"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.number"
                filled
                label="Numero"
                class="col-12 col-md-6 q-pa-sm"
              />
              <q-input
                v-model="company.zip_code"
                filled
                label="Cep"
                class="col-12 col-md-6 q-pa-sm"
              />
            </div>
          </div>
          <div class="col-12 col-md-4" 
              style="border: double;
                      border-color: steelblue;">
            <div class="column">
              <q-file
                v-model="files"
                @change="changeInput"
                label="Clique Aqui Para Incluir a Logo"
                filled
                append
              />
              <img
                class="self-center"
                v-if="arquivo.image"
                :src="arquivo.image"
                style="height: 85%; width: 70%"
              />
              <img
                class="self-center"
                v-else-if="company.logo"
                :src="$url+'company/logo/'+company.logo"
                style="height: 85%; width: 70%"
              />
            </div>
          </div>
          <div class="col-12 row justify-end q-mt-sm">
            <q-btn
              stack
              color="positive"
              text-color="white"
              label="Salvar"
              class="q-pa-sm"
              @click="recuperarArquivo()"
            />
          </div>
        </div>  
        <!-- <div class="row q-px-sm q-mt-md">
          <div class="col-12">
            <q-table title="Usuarios" :rows="rows" :columns="columns" row-key="id">
              <template v-slot:body-cell-buttons="props">
                <q-td key="buttons" :props="props" auto-width>
                  <q-btn
                    color="primary"
                    icon="visibility"
                    @click="$refs.modalCustomer.openModal(props.row.id, true)"
                  />
                  <q-btn
                    color="red-7"
                    icon="delete"
                    class="q-ml-sm"
                    @click="deleteCustomer(props.row.id)"
                  />
                </q-td>
              </template>
            </q-table>
          </div>
        </div> -->
      </q-card-section>
    </q-card>
  </q-page>
  <modalCustomer ref="modalCustomer" v-on:searchCustomer="searchCustomer" />
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";
import ModalCustomer from "pages/customer/ModalCustomer";
import axios from "axios";

export default {
  mixins: [ApiMixin],
  components: { ModalCustomer },
  name: "Customer",
  data() {
    return {
      company:{
        name:"",
        cnpj:"",
        cell:"",
        telephone:"",
        email:"",
        street:"",
        district:"",
        city:"",
        state:"",
        zip_code:"",
        number:"",
        logo:""
      },
      valueFilter: "",
      columns: [
        {
          name: "Name",
          field: "name",
          label: "Nome",
          align: "left",
          required: true,
        },
        {
          name: "Celular",
          field: "cell",
          label: "Celular",
          align: "left",
          required: true,
        },
        {
          name: "Endereço",
          field: "street",
          label: "Endereço",
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
      files:null,
      preview:null,
      rows: [],
      initialPagination: {
        rowsPerPage: 10,
      },
      arquivo:{},
      selectedFilter: "Todos",
      optionsFilter: ["Todos", "Nome"],
    };
  },
  computed: {},
  created() {
    this.searchCustomer();
  },
  methods: {
    async searchCustomer() {
      var idCompany = this.$store.state.company.id;
      console.log(this.$store.state);
      this.company = await this.apiGet("company/"+idCompany);
    },

    async tratarFiltro() {
      var query = {
        search: true,
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
          break;
      }
      var search = await this.apiGet("customers/find?", this.$tools.serialize(query));
      if (search.length > 0) {
        this.rows = search;
      }
    },
    linkCarregamento(row) {
      this.$store.commit("setCarregamento", row);
      this.$router.push("/Carregamento");
    },
    deleteCustomer(id) {
      this.apiDelete("customers", id);
    },
    changeInput(event){
      let file = event.target.files || event.dataTranfer.files;
      this.arquivo.ext = file[0].name.substring(
        file[0].name.lastIndexOf(".") + 1
      );
      let reader = new FileReader();
      reader.onloadend = (e) => {
       this.arquivo.image = e.target.result;
      };
      reader.readAsDataURL(file[0]);
    },

    recuperarArquivo() {
      var url = 'company/update';
      this.$api.post(url,{
        file:this.arquivo,
        company:this.company
      }).then((response) => {
          var company = response.data.Data;
          this.$store.commit("setCompany", company);
          this.$q.notify({
            type: "positive",
            position: "top-right",
            message: "Cadastro com sucesso",
          });
        })
        .catch((err) => {
          this.$tools.exceptionCustom(err, this);
          console.log(err);
        });
    },
    async recuperarArquivoOld() {
      // var formData = new FormData();
      // if(this.preview){
      //   formData.append("file", this.files[0]);
      // }
      // formData.append("company", JSON.stringify(this.company));
      // var url = 'company/edit';

      // const config = { headers: { "Content-Type": "multipart/form-data" } };

      // this.$apiAux.post(url, formData, config)
      // .then((response) => {
      //     var company = response.data.Data;
      //     this.$store.commit("setCompany", company);
      //     this.$q.notify({
      //       type: "positive",
      //       position: "top-right",
      //       message: "Cadastro com sucesso",
      //     });
      //   })
      //   .catch((err) => {
      //     this.$tools.exceptionCustom(err, this);
      //     console.log(err);
      //   });
      // const form = new FormData();
      // form.append("file",this.files[0]);

      // const options = {
      //   method: 'POST',
      //   url: 'http://auto-unity.kinghost.net:21012/company/edit',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //    // 'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlkIjoxLCJub21lIjoidGVzdGUiLCJjb21wYW55SWQiOjEsImlhdCI6MTY4NDc5NDk5MSwiZXhwIjoxNjg0ODAwOTkxfQ.L0Ptnikk7vDBb0I39Km5V1ECG9g-GvjVPk_a6XYR7L4'
      //   },
      //   data: form
      // };

      // axios.request(options).then(function (response) {
      //   console.log(response.data);
      // }).catch(function (error) {
      //   console.error(error);
      // });
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

<template>
  <q-page class="page sizeA4">
    <div class="row background-header">
      <q-card class="q-mb-sm q-mt-md print-component-hide" style="width:100%">
        <q-card-section>
          <div class="fit row justify-between">
            <q-btn label="voltar" color="red" :to="'/budgets/'+$route.params.idBudget" />
            <q-btn label="Imprimir" color="primary" v-close-popup @click="testePrint()" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="padding-report">
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6"></div>
      </div>

      <div class="row justify-between border-report q-mt-sm">
        <div class="row column">
          <label>Oficina: {{$store.state.company.name}}</label>
          <label>Contato: {{$store.state.company.telephone}} / {{$store.state.company.cell}}</label>
          <label>E-mail: {{$store.state.company.email}}</label>
          <label>Endereço: {{$store.state.company.street}} , {{$store.state.company.number}} - {{$store.state.company.district}} - {{$store.state.company.city}} / {{$store.state.company.state}}</label>
        </div>
        <img
          class="self-center"
          :src="$url+'company/logo/'+$store.state.company.logo"
          style="height: 100px; width: 150px"
        />
      </div>

      <div class="row column border-report q-mt-sm q-pa-sm">
        <div class="row justify-between">
          <label>Veiculo:  {{dataBudget.vehicle.model+' '+dataBudget.vehicle.brand}}</label>
          <label>Placa: {{dataBudget.vehicle.plate}}</label>
          <label>Cor: {{dataBudget.vehicle.color}}</label>
          <label>Km: {{dataBudget.km}}</label>
        </div>
        <div class="row justify-between">
          <label>Data de Entrada: {{new Date(dataBudget.usuincDt).toLocaleString()}}</label>
          <label>Cliente: {{dataBudget.vehicle.customer.name}}</label>
          <label>Contato: {{dataBudget.vehicle.customer.cell}}</label>
        </div>
      </div>

      <div class="row q-mt-sm">
        <table class="border-table border-width">
          <thead>
            <tr>
              <th class="border-table">Descrição da Peça</th>
              <th class="border-table">Qtd.</th>
              <th class="border-table">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(part, index) in rowsParts" :key="index">
              <td class="border-table">{{part.namePart}}</td>
              <td class="border-table">{{part.quantity}}</td>
              <td class="border-table">{{$tools.converterReal(part.value)}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row q-mt-sm">
        <table class="border-table border-width">
          <thead>
            <tr>
              <th class="border-table">Descrição da Serviço</th>
              <th class="border-table">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in rowsServices" :key="index">
              <td class="border-table">{{service.nameService}}</td>
              <td class="border-table">{{$tools.converterReal(service.value)}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="teste" class="full-width row justify-end q-mt-sm">
        <div class="col-2"  style="display: inline-table;">
          <table class="border-table border-width">
            <thead>
              <tr>
                <th class="border-table">Item</th>
                <th class="border-table">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-table">Peças</td>
                <td class="border-table">{{$tools.converterReal(countPart(rowsParts))}}</td>
              </tr>
              <tr>
                <td class="border-table">Serviços</td>
                <td class="border-table">{{$tools.converterReal(countService(rowsServices))}}</td>
              </tr>
              <tr>
                <td class="border-table">Total</td>
                <td class="border-table">{{(countService(rowsServices) + countPart(rowsParts)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import ApiMixin from "boot/services/ApiMixin";

export default {
  mixins: [ApiMixin],
  name: "Dashboard",
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
			rowsParts:[],
			rowsServices:[],
		};
  },
  computed: {},
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
    this.rowsParts = await this.apiGet("budgetsParts?budgetId=" + this.$route.params.idBudget);
    this.rowsServices = await this.apiGet("budgetsServices?budgetId="+this.$route.params.idBudget);
	},
  methods: {
    findBudgetPart(teste){
      console.log("teste");
    },
    countPart(list){
      if(list.length > 0){
        var soma = 0;
        list.forEach((el) => {
          soma += (el.quantity * el.value);
        });
        return soma;
      }else{
        return 0;
      }
    },
    countService(list){
      if(list.length > 0){
        var soma = 0;
        list.forEach((el) => {
          soma +=  parseInt(el.value);
        });
        return soma;
      }else{
        return 0;
      }
    },
    testePrint(){
      // console.log("rteste");
      window.print('');
      //var w = window.open("about:blank");
      //w.document.write(window.print());
      // if (navigator.appName == 'Microsoft Internet Explorer') window.print();
      // else w.print();
      //window.URL.createObjectURL(window.print())
      // var pdf = new jsPDF('p', 'pt', 'letter');
      // pdf.canvas.height = 72 * 11;
      // pdf.canvas.width = 72 * 8.5;

      // pdf.fromHTML(window.print());

      // pdf.save('test.pdf');
      //printJS('teste', 'html');
    }
	},
};
</script>
<style scoped>
.page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
}
.border-report {
  border: groove;
}
.padding-report {
  padding: 35px;
}
.background-header {
  background-color: #8f8f8f;
}
.sizeA4 {
  width: 28cm;
  height: 100%;
}
.border-table {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px 20px;
  width: 100%;
}
.border-width {
  width: 100%;
}

</style>

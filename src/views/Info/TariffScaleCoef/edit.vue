<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('TariffScaleCoef')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="2">
                <label>{{$t('ondate')}}</label>
                <date-picker
                  v-model="TariffScaleCoef.ondate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </CCol>
              <CCol sm="8">
                <label>{{$t('TariffScale')}}</label>
                <v-select
                  :options="tariffscalelist"
                  v-model="TariffScaleCoef.tariffscaleid"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="FillTableRow"
                ></v-select>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow >
          <CCol>
            <b-table
              :fields="TariffScaleCoefTables"
              :items="TariffScaleCoef.Tables"
              small
              class="bg-color-table text-center  mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:cell(rankcode)="{item}">
                <p>{{item.rankcode}}</p>               
              </template>

              <template v-slot:cell(coef)="{item}">
                <p v-if="item.Status == 0">{{item.coef}}</p>
                <custom-number-input
                  size="sm"
                  v-if="item.Status == 2 || item.Status == 1"
                  v-model="item.coef"
                ></custom-number-input>
              </template>
              <template v-slot:cell(actions)="{item}">
                <CButtonGroup class="mx-auto d-block text-center" size="sm">
                  <CButton size="sm" variant="outline" color="primary" @click="EditRow(item)">
                    <b-icon icon="pencil"></b-icon>
                  </CButton>                 
                </CButtonGroup>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow class="mb-3"> 
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'TariffScaleCoef'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import TariffScaleService from "@/services/TariffScale.service";
import TariffScaleCoefService from "@/services/TariffScaleCoef.service";

export default {
  data() {
    return {
      SaveLoading: false,
      TariffScaleCoef: {},
      selectedrowid: 0,

      tariffscalelist: [],

      TariffScaleCoefTables: [
        { key: "rankcode", label: this.$t("rankcode") },
        { key: "coef", label: this.$t("coef") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        rankcode: "",
        coef: 0,
        Status: 1
      },
      toastCount: 0,
      allSignupErrors: {}
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;

    TariffScaleService.GetAll(0).then(res => {
      self.tariffscalelist = res.data;
    });
    TariffScaleCoefService.Get(self.selectedrowid).then(res => {
      self.TariffScaleCoef = res.data;
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.TariffScaleCoef.ondate === null ||
        self.TariffScaleCoef.ondate === undefined ||
        self.TariffScaleCoef.ondate === 0 ||
        self.TariffScaleCoef.ondate === ""
      ) {
        this.makeToast(this.$t("ondateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      /*  if (
        self.TariffScaleCoef.tariffscaleid === null ||
        self.TariffScaleCoef.tariffscaleid === undefined ||
        self.TariffScaleCoef.tariffscaleid === 0
      ) {
        this.makeToast(
          this.$t("tariffscaleNotCorrected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      var tableitemscount = 0;
      tableitemscount = self.TariffScaleCoef.Tables.filter(
        item => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      TariffScaleCoefService.Update(self.TariffScaleCoef)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "TariffScaleCoef" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    FillTableRow(data) {
      var self = this;
      self.TariffScaleCoef.Tables.forEach(function (item) {
        item.Status = 3;
      });
      TariffScaleService.Get(self.TariffScaleCoef.tariffscaleid).then(res => {
        res.data.Tables.forEach(function (item) {
          if(item.stateid === 1){
          self.tabrow = {
            id: 0,
            ownerid: 0,
            rankcode: item.rankcode,
            coef: 0,
            Status: 1
          };
          self.TariffScaleCoef.Tables.push(self.tabrow);
           self.tabrow = {
            id: 0,
            ownerid: 0,
            rankcode: "",
            coef: 0,
            Status: 1
          };
          }
          
        });
      });
      
    },
    EditRow(item) {
      item.Status = 2;
    },
    
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },

    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    }
  }
};
</script>

<style>
</style>
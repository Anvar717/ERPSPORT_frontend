<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("StaffingTemplate") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'StaffingTemplate' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CCard sm="6">
              <CCardBody sm="6">
                <CRow>
                  <CCol sm="3" lg="3" class="fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="docnumber"
                      rules="required"
                    >
                      <CInput
                        disabled
                        :label="$t('docnumber')"
                        autocomplete="text"
                        v-model="StaffingTemplate.docnumber"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="3" lg="3" class="achievement-input fname-select">
                    <label>{{ $t("docdate") }}</label>
                    <date-picker
                    
                      v-model="StaffingTemplate.docdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('date')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      style="width  :100%"
                    ></date-picker>
                  </CCol>
                  <CCol sm="12" lg="3" class="achievement-input fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="organizationtype"
                      rules="required"
                    >
                      
                        <label >{{ $t("organizationtype") }}</label>
                        <v-select
                          :options="organizationtypelist"
                          v-model="StaffingTemplate.organizationtypeid"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                          </template>
                        </v-select>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="12" lg="3" class="achievement-input fname-select">
                    <ValidationProvider
                      v-slot="v"
                      name="schooltype"
                      rules="required"
                    >
                        <label >{{
                          $t("schooltype")
                        }}</label>
                        <v-select
                          :options="schooltypelist"
                          v-model="StaffingTemplate.schooltypeid"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                          </template>
                        </v-select>
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <b-row>
                  <b-col lg="6">
                    <c-input :label="$t('detailinfo')" v-model="StaffingTemplate.detailinfo"></c-input>
                  </b-col>
                </b-row>
              </CCardBody>
            </CCard>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          
          <CCol class="text-right mb-4 mr-3">
              <CButton color="primary" class="mr-2" size="sm" @click="OpenModal">
                <b-icon icon="plus"> </b-icon>{{ $t("Indicator") }}
              </CButton>
            <CButton color="primary" size="sm" @click="AddRow"
              ><b-icon icon="plus"> </b-icon>{{ $t("Add") }}</CButton
              
            >
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="StaffingTemplatePositionTables"
                :items="StaffingTemplate.Tables"
                class="bg-color-table text-center tdpadding"
                style="vertical-align: middle"
                bordered
                small
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(departmentname)="{ item }">
                  <p>{{ item.departmentname }}</p>
                </template>
                <template v-slot:cell(positionname)="{ item }">
                  <p>{{ item.positionname }}</p>
                </template>
                <template v-slot:cell(qualificationcategoryname)="{ item }">
                  <p>{{ item.qualificationcategoryname }}</p>
                </template>
                <template v-slot:cell(quantity)="{ item }">
                  <p>{{ $options.filters.currency(item.quantity, {
                          symbol: "",
                          fractionCount: 2,
                        })   }}</p>
                </template>
                <template v-slot:cell(formonths)="{ item }">
                  <p>{{ item.formonths }}</p>
                </template>
                <template v-slot:cell(tariffscaletype)="{ item }">
                  <p>{{ item.tariffscaletype }}</p>
                </template>
                <template v-slot:cell(tariffscale)="{ item }">
                  <p>{{ item.tariffscale }}</p>
                </template>
                <template v-slot:cell(rankname)="{ item }">
                  <p>{{ item.rankname }}</p>
                </template>
                <template v-slot:cell(salary)="{ item }">
                  <p>{{$options.filters.currency(item.salary, {
                          symbol: "",
                          fractionCount: 2,
                        })  }}</p>
                </template>
  
                <template v-slot:cell(corrcoef)="{ item }">
                  <p>{{ item.corrcoef }}</p>
                </template>
                <template v-slot:cell(staffingcalckindnames)="{ item }">
                  <p>{{ item.staffingcalckindnames }}</p>
                </template>
                <template v-slot:cell(fot)="{ item }">
                  <p>{{$options.filters.currency(item.fot, {
                          symbol: "",
                          fractionCount: 2,
                        })  }}</p>
                </template>
                
                <template v-slot:cell(actions)="{ item }">
                  <CButtonGroup class="mx-auto d-block text-center" size="sm">
                    <CButton
                      variant="outline"
                      color="primary"
                      @click="EditRow(item)"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </CButton>
  
                    <CButton
                      variant="outline"
                      color="danger"
                      @click="DeleteRow(item)"
                    >
                      <b-icon icon="x"></b-icon>
                    </CButton>
                  </CButtonGroup>
                </template>
              
              </b-table>
            </div>
          </CCol>
        </CRow>

     

        <b-modal id="AddModal" size="xl">
          <template v-slot:modal-title>{{
            $t("StaffingTemplateInformation")
          }}</template>
          <CCard sm="6">
            <CCardBody sm="6">
              <CRow class="mt-3">
                <CCol sm="4">
                  <label>{{ $t("tariffscaletype") }}</label>
                  <v-select
                    
                    :options="tariffscaletypelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="changeTariffScaleType"
                    v-model="tabrow.tariffscaletypeid"
                  ></v-select>
                </CCol>
                <CCol sm="4">
                  <label>{{ $t("position") }}</label>
                  <v-select
                    :options="positionlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.positionid"
                  ></v-select>
                </CCol>
                <CCol v-if="tabrow.tariffscaletypeid === 1">
                  <label>{{ $t("tariffscale") }}</label>
                  <v-select
                    :options="tariffscalelist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.tariffscaleid"
                  ></v-select>
                </CCol>
                <CCol sm="2" v-if="tabrow.tariffscaletypeid === 1">
                  <label>{{ $t("rankcode") }}</label>
                  <v-select
                    :options="tariffscaletablelist"
                    :reduce="(item) => item.rankcode"
                    :placeholder="$t('ChooseBelow')"
                    label="rankname"
                    v-model="tabrow.rankcode"
                  ></v-select>
                </CCol>
              </CRow>
              
            </CCardBody>
          </CCard>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              
              <CButton
                size="sm"
                color="danger"
                class="mr-2"
                @click="$bvModal.hide('AddModal')"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton :disabled="DisabledItem()" size="sm" color="primary" @click="AddData">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
              
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'StaffingTemplate' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal id="OpenModal" size="xl" :title="$t('Employee')" hide-footer modal-class="custom-size-modal" no-close-on-backdrop>
        <b-row>
          <b-col>
            <b-table-simple bordered hover small responsive class="text-center">
              <b-thead head-variant="light" >
                <b-tr style="border:1px solid">
                  <b-th rowspan="2" style="vertical-align:middle;border:1px solid" class="text-center">
                    {{ $t('OrderNumber') }}
                  </b-th>
                  <b-th rowspan="2" class="text-center" style="vertical-align:middle;border:1px solid">
                    {{ $t('positionname') }}
                  </b-th>
                  <b-th colspan="6"  style="border:1px solid" class="text-center">
                    {{ $t('unitofshtat') }}
                  </b-th>
                </b-tr>
                <b-tr>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberUntill6') }}
                  </b-th>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberBetween7and11') }}
                  </b-th>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberBetween11and16') }}
                  </b-th>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberBetween17and22') }}
                  </b-th>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberBetween23and29') }}
                  </b-th>
                  <b-th  style="border:1px solid" class="text-center">
                    {{ $t('ClassNumberAbove30') }}
                  </b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>1</b-td>
                  <b-td class="text-left">{{ $t('Director')}}</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                </b-tr>
                <b-tr>
                  <b-td>2</b-td>
                  <b-td class="text-left">{{$t('SecondDirector')}}</b-td>
                  <b-td>-</b-td>
                  <b-td>0,5</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1,5</b-td>
                  <b-td>1,5</b-td>
                </b-tr>
                <b-tr>
                  <b-td>3</b-td>
                  <b-td class="text-left">{{$t('EducationDirector')}}</b-td>
                  <b-td>-</b-td>
                  <b-td>0,5</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1,5</b-td>
                  <b-td>1,5</b-td>
                </b-tr>
                <b-tr>
                  <b-td>4</b-td>
                  <b-td class="text-left">{{$t('FarmDirector')}}</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                </b-tr>
                <b-tr>
                  <b-td>5</b-td>
                  <b-td class="text-left">{{$t('FarmManager')}}</b-td>
                  <b-td>0,5</b-td>
                  <b-td>0,5</b-td>
                  <b-td>1</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                </b-tr>
                 <b-tr>
                  <b-td>6</b-td>
                  <b-td class="text-left">{{$t('HrManager')}}</b-td>
                  <b-td>0,5</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                </b-tr>
                 <b-tr>
                  <b-td>7</b-td>
                  <b-td class="text-left">{{$t('YouthLeader')}}</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                </b-tr>
                 <b-tr>
                  <b-td>8</b-td>
                  <b-td class="text-left">{{$t('libraryManager')}}</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                  <b-td>1</b-td>
                </b-tr>
                 <b-tr>
                  <b-td>9</b-td>
                  <b-td class="text-left">{{$t('Librarian')}}</b-td>
                  <b-td>0,5</b-td>
                  <b-td>0,5</b-td>
                  <b-td>1</b-td>
                  <b-td>-</b-td>
                  <b-td>-</b-td>
                  <b-td>0,5</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center">
            <b-button variant="danger" @click="$bvModal.hide('OpenModal')" size="sm"> <b-icon icon="arrow-left"></b-icon> {{ $t('back') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import PositionService from "@/services/Position.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import BasicTariffRateService from "@/services/BasicTariffRate.service";
import TariffScaleService from "@/services/TariffScale.service";
import HelperService from "@/services/helper.service";
import StaffingTemplateService from "@/services/StaffingTemplate.service";

export default {
  data() {
    return {
      SaveLoading: false,
      CalcKindModal: false,
      StaffingTemplate: {},
      selectedrowid: 0,
      basictariffrate: 0,

      organizationtypelist: [],
      schooltypelist: [],

      positionlist: [],
     
      tariffscaletypelist: [],
      tariffscalelist: [],
      tariffscaletablelist: [],
     
      isdisabled:false,
      StaffingTemplatePositionTables: [
        
        {
          key: "positionname",
          label: this.$t("Position"),
          class: "text-left",
        },
        
        {
          key: "tariffscaletype",
          label: this.$t("tariffscaletype"),
          class: "text-left",
        },
        {
          key: "tariffscale",
          label: this.$t("TariffScale"),
          class: "text-left",
        },
        {
          key: "rankname",
          label: this.$t("Rank"),
        },
       
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
     
      tabrow: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankid: 0,
        rankname: "",
        rankcode: "",
        Status: 1,
      },

     
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

   SchoolTypeService.GetAll().then((res) => {
      self.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      self.organizationtypelist = res.data;
    });
    HelperService.GetTariffScaleTypeList().then((res) => {
      self.tariffscaletypelist = res.data;
    });
    StaffingTemplateService.Get(self.selectedrowid).then((res) => {
      self.StaffingTemplate = res.data;
    });
  },
  methods: {
    tariffscaletypechange() {
      var self = this;
     
        TariffScaleService.GetAll(self.tabrow.tariffscaletypeid).then(
          (res) => {
            self.tariffscalelist = res.data;
          }
        );
     
    },
    changeTariffScaleType(){
      PositionService.GetAll(0, this.tabrow.tariffscaletypeid, null, 0).then((res) => {
          this.positionlist = res.data;
        });
    },
    gettariffscaletable() {
      var self = this;
      if (self.tabrow.tariffscaleid > 0) {
        TariffScaleService.GetAllTableList(self.tabrow.tariffscaleid).then(
          (res) => {
            self.tariffscaletablelist = res.data;
          }
        );
      }
    },
   
    

    
    tariffscaletablechange() {
      var self = this;
      if(self.tariffscaletablelist.length>0){
        self.tabrow.rankcoef = self.tariffscaletablelist.filter(function (item) {
        if (item.rankcode === self.tabrow.rankcode) return item;
      })[0].coef;
      self.tabrow.rankname = self.tariffscaletablelist.filter(function (item) {
        if (item.rankcode === self.tabrow.rankcode) return item;
      })[0].rankname;
      self.tabrow.rankid = self.tariffscaletablelist.filter(function (item) {
        if (item.rankcode === self.tabrow.rankcode) return item;
      })[0].tariffscaletableid;
      
      }
      
    },
    OpenModal(){
      this.$bvModal.show("OpenModal")
    },
    DisabledItem() {
       var self = this;
      if (self.isdisabled) {
        return true;
      } else {
        return false;
      }
    },
    check() {
      var self = this;
      if (
        self.StaffingTemplate.docnumber === null ||
        self.StaffingTemplate.docnumber === undefined ||
        self.StaffingTemplate.docnumber === 0 ||
        self.StaffingTemplate.docnumber === ""
      ) {
        this.makeToast(
          this.$t("DocNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StaffingTemplate.docdate === null ||
        self.StaffingTemplate.docdate === undefined ||
        self.StaffingTemplate.docdate === 0 ||
        self.StaffingTemplate.docdate === ""
      ) {
        this.makeToast(
          this.$t("DocDateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

     

     
     
     
      var tableitemscount = 0;
      tableitemscount = self.StaffingTemplate.Tables.filter(
        (item) => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        this.makeToast(this.$t("TableNotfull"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    checktabrowdata() {
      var self = this;
      
      if (
        self.tabrow.positionid === null ||
        self.tabrow.positionid === undefined ||
        self.tabrow.positionid === 0
      ) {
        this.makeToast(
          this.$t("PositionNotSelected"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }

     
      if (
        self.tabrow.tariffscaletypeid === null ||
        self.tabrow.tariffscaletypeid === undefined ||
        self.tabrow.tariffscaletypeid === 0
      ) {
        this.makeToast(
          this.$t("TariffScaleTypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.tariffscaletypeid === 1) {
        if (
          self.tabrow.tariffscaleid === null ||
          self.tabrow.tariffscaleid === undefined ||
          self.tabrow.tariffscaleid === 0
        ) {
          this.makeToast(
            this.$t("TariffScaleNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.rankcode === null ||
          self.tabrow.rankcode === undefined ||
          self.tabrow.rankcode === 0
        ) {
          this.makeToast(
            this.$t("RankCodeNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.rankid === null ||
          self.tabrow.rankid === undefined ||
          self.tabrow.rankid === 0
        ) {
          this.makeToast(
            this.$t("rankNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.tariffscale = self.tariffscalelist.filter(function (item) {
          if (item.id === self.tabrow.tariffscaleid) return item;
        })[0].name;
      } else {
        self.tabrow.tariffscaleid = 0;
        self.tabrow.rankcode = "";
      }

      
      
      
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      StaffingTemplateService.Update(self.StaffingTemplate)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "StaffingTemplate",
          });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    
    AddRow() {
      var self = this;
      self.tabrow = {
        id: 0,
        ownerid: 0,    
        positionid: 0,
        positionname: "",               
        tariffscaletypeid: 0,
        tariffscaleid: 0,
        rankid: 0,
        rankname: "",
        rankcode: "",      
        Status: 1,
      };
      self.isdisabled = false;
      self.$bvModal.show("AddModal");
    },
    AddData() {
      var self = this;
      if (!self.checktabrowdata()) {
        return false;
      }
      
      
      self.tabrow.positionname = self.positionlist.filter(function (item) {
        if (item.id === self.tabrow.positionid) return item;
      })[0].name;
      
      
      self.tabrow.tariffscaletype = self.tariffscaletypelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.tariffscaletypeid) return item;
      })[0].name;
      
      if (self.tabrow.id === 0) {
        var addrow = true;
        self.StaffingTemplate.Tables.forEach(function (item) {
          if (
            
            item.positionid === self.tabrow.positionid &&
            item.id === 0
          ) {
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
          
            item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
            item.tariffscaleid = self.tabrow.tariffscaleid;
            item.rankid = self.tabrow.rankid;
            item.rankname = self.tabrow.rankname;
            item.rankcode = self.tabrow.rankcode;
            
            item.Status = 1;
            addrow = false;
            
          }
        });
        if (addrow) {
          
          self.StaffingTemplate.Tables.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
           
            positionid: 0,
            positionname: "",
           
            tariffscaletypeid: 0,
            tariffscaleid: 0,
            rankid: 0,
            rankname: "",
            rankcode: "",
           
            Status: 1,
          };
        }
      } else {
        self.StaffingTemplate.Tables.forEach(function (item) {
          if (item.id === self.tabrow.id) {
           
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
          
            item.tariffscaletypeid = self.tabrow.tariffscaletypeid;
            item.tariffscaleid = self.tabrow.tariffscaleid;
            item.rankid = self.tabrow.rankid;
            item.rankname = self.tabrow.rankname;
            item.rankcode = self.tabrow.rankcode;
           
            item.Status = 2;
           
          }
        });
        self.tabrow = {
          iid: 0,
          ownerid: 0,
         
          positionid: 0,
          positionname: "",
         
          tariffscaletypeid: 0,
          tariffscaleid: 0,
          rankid: 0,
          rankname: "",
          rankcode: "",
         
          Status: 1,
        };
      }
      self.$bvModal.hide("AddModal");
      self.calculatetotal();
    },
    EditRow(item) {
      var self = this;
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        
        positionid: item.positionid,
        positionname: item.positionname,
        
        tariffscaletypeid: item.tariffscaletypeid,
        tariffscaleid: item.tariffscaleid,
        rankid: item.rankid,
        rankname: item.rankname,
        rankcode: item.rankcode,
       
        Status: 2,
      };
     
      self.tariffscaletypechange();
      self.gettariffscaletable();
      this.$bvModal.show("AddModal");
    },
    DeleteRow(item) {
      var self = this;
      item.Status = 3;
     
    },
  

   
  



    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },

    roundToTwo(value, decimals) {
      value;
      decimals;

      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
  watch: {
    
    
    
    "tabrow.tariffscaletypeid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.tariffscaleid = 0;
          self.tariffscalelist = [];
        } */
        if (newValue) {
          this.tariffscaletypechange();
        }
      },
    },
    "tabrow.tariffscaleid": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.rankcode = "";
          self.tabrow.rankname = "";
          self.tariffscaletablelist = [];
        } */
        if (newValue) {
                  this.gettariffscaletable();

        }
      },
    },
    "tabrow.rankcode": {
      handler(newValue, oldValue) {
        var self = this;
        /* if (oldValue) {
          self.tabrow.salary = 0;
          self.tabrow.rankname = "";
        } */
        if (newValue) {
          /* console.log("94+9849+4894"); */
          self.tariffscaletablechange();
        }
      },
    },
  },
};
</script>

<style>
</style>
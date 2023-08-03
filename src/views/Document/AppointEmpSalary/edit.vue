<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AppointEmpSalary") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                  disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="AppointEmpSalary.docnumber"
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
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label>{{ $t("docdate") }}</label>

                  <date-picker
                    v-model="AppointEmpSalary.docdate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>

              <CCol>
                
                  <label for>{{ $t("Employee") }}</label>
                  <div class="d-flex col-sm-12">
                    <CInput
                      class="mb-0 mr-2"
                      style="width: 100%"
                      disabled
                      v-model="AppointEmpSalary.personname"
                    ></CInput>
                    <b-button  
                      :disabled="DisabledItem()"
                    
                      size="sm"
                      variant="primary"
                      @click="OpenEmployeeModal"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </div>

              </CCol>
              <CCol>
                
                  <CInput
                  disabled
                    :placeholder="$t('positionname')"
                    autocomplete="positionname"
                    :label="$t('positionname')"
                    v-model="AppointEmpSalary.positionname"
                   
                  >
                    
                  </CInput>
               
              </CCol>
              <CCol sm="1">
                
                  <CInput
                  disabled
                    :placeholder="$t('employmentrate')"
                    autocomplete="employmentrate"
                    :label="$t('employmentrate')"
                    v-model="AppointEmpSalary.employmentrate"
                   
                  >
                    
                  </CInput>
               
              </CCol>
            </CRow>
             <CRow>
             
                <CCol sm="3">
                  <label>{{$t('qualificationcategory')}}</label>
                  <!-- <c-input disabled v-model="AppointEmpSalary.qualificationcategoryname"></c-input> -->
                  <v-select
                    :options="qualificationcategorylist"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="AppointEmpSalary.qualificationcategoryid"
                  ></v-select>
                </CCol>
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <label for>{{ $t("Organizationaccount") }}</label>
                  <v-select
                    :options="organizationaccountlist"
                    v-model="AppointEmpSalary.organizationaccountid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="code"
                    :disabled="DisabledItem()"
                    
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required|max:100"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="AppointEmpSalary.detailinfo"
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
            </CRow>
            <CRow>
              <CCol>
                <div class="text-center mx-auto">
              <CButton size="sm" class="mr-2" color="info" @click="OpenFillTableModal" :disabled="DisabledItem()">
                <b-icon icon="check2"></b-icon>
                {{ $t("Fill") }}
              </CButton>
              <CButton  size="sm" class="mr-2" color="danger" @click="clearTable">
                <b-icon icon="check2"></b-icon>
                {{ $t("Clear") }}
              </CButton>
              <CButton size="sm" class="mr-2" color="info" @click="RecalcData">
                <b-icon icon="check2"></b-icon>
                {{ $t("Recalc") }}
              </CButton>
            </div>
              </CCol>
            </CRow>

            <CRow class="pt-3">
              
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="rankid" rules="required">
                  <label for>{{ $t("rankid") }}</label>
                  <CInput
                  disabled
                    :placeholder="$t('rankcode')"
                    autocomplete="rankcode"
                    v-model="AppointEmpSalary.tariffscalename"
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
              <CCol sm="3">
                <ValidationProvider
                  v-slot="v"
                  name="rankcode"
                  rules="required|max:9"
                >
                  <CInput
                  disabled
                    :placeholder="$t('rankcode')"
                    autocomplete="rankcode"
                    :label="$t('rankcode')"
                    v-model="AppointEmpSalary.rankname"
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
              <!-- <CCol sm="3">
                <ValidationProvider
                  v-slot="v"
                  name="rankcoef"
                  rules="required|max:9"
                >
                  <CInput
                  disabled
                    :placeholder="$t('rankcoef')"
                    autocomplete="rankcoef"
                    :label="$t('rankcoef')"
                    v-model="AppointEmpSalary.rankcoef"
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
              </CCol> -->
              
               <CCol sm="3">
                <ValidationProvider
                  v-slot="v"
                  name="corrcoef"
                  rules="required|max:9"
                >
                  <CInput
                  disabled
                    :placeholder="$t('corrcoef')"
                    autocomplete="corrcoef"
                    :label="$t('corrcoef')"
                    v-model="AppointEmpSalary.corrcoef"
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
            </CRow>
           
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="AppointEmpSalaryTables"
              :items="AppointEmpSalary.Tables"
              class="bg-color-table text-center tdpadding mx-3"
              style="vertical-align: middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-if="AppointEmpSalary.CanSave && DisabledItem()" v-slot:thead-top>
                <b-tr>
                  <b-th style="width: 14%">
                    <v-select
                    
                      :options="organizationaccountlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                      v-model="tabrow.organizationaccountid"
                    ></v-select>
                  </b-th>
                  <b-th style="width: 14%">
                    <v-select
                      :options="calculationkindlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.calculationkindid"
                    ></v-select>
                  </b-th>
                  <b-th style="width: 15%">
                    <custom-number-input v-model="tabrow.insum" ></custom-number-input>
                  </b-th>
                  <b-th style="width: 15%">
                    <custom-number-input v-model="tabrow.percentage" ></custom-number-input>
                  </b-th>
                  <b-th style="width: 15%">
                    <p>{{ tabrow.outsum }}</p>
                  </b-th>
                  <b-th style="width: 7%">
                    <CButton
                      size="sm"
                      color="primary"
                      variant="outline"
                      @click="Add"
                    >
                      <b-icon icon="plus"> </b-icon>
                    </CButton>
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(organizationaccountname)="{ item }">
                <p v-if="item.Status == 0">
                  {{ item.organizationaccountname }}
                </p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="organizationaccountlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="code"
                  v-model="item.organizationaccountid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(calculationkindname)="{ item }">
                <p v-if="item.Status == 0">{{ item.calculationkindname }}</p>
                <v-select
                  v-if="item.Status == 1 || item.Status == 2"
                  :options="calculationkindlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="item.calculationkindid"
                  class="mb-2"
                ></v-select>
              </template>
              <template v-slot:cell(insum)="{ item }">
                <p v-if="item.Status == 0">{{$options.filters.currency(item.insum, {
                        symbol: "",
                        fractionCount: 2,
                      })}}</p>
                <custom-number-input
                  v-if="item.Status == 1 || item.Status == 2"
                  v-model="item.insum"                        
                  ></custom-number-input>
                
              </template>
              <template v-slot:cell(percentage)="{ item }">
                <p v-if="item.Status == 0">{{ item.percentage }}</p>
                <custom-number-input
                  v-if="item.Status == 1 || item.Status == 2"
                  v-model="item.percentage"                        
                  ></custom-number-input>
                
              </template>
              <template v-slot:cell(outsum)="{ item }">
                <p>{{ $options.filters.currency(item.outsum, {
                        symbol: "",
                        fractionCount: 2,
                      })}}</p>
              </template>
              <template v-slot:cell(actions)="{ item }">
                <CButtonGroup
                  v-if="AppointEmpSalary.CanSave"
                  class="mx-auto d-block text-center"
                  size="sm"
                >
                  <CButton
                    variant="outline"
                    color="primary"
                    @click="EditItem(item)"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </CButton>
                  <CButton
                    variant="outline"
                    color="danger"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="x"></b-icon>
                  </CButton>
                </CButtonGroup>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'AppointEmpSalary' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="AppointEmpSalary.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
          <b-modal
            id="modalXl"
            size="xl"
            title="Extra Large Modal"
            hide-footer
            modal-class="custom-size-modal"
          >
            <employee-list-component
              :ondate="AppointEmpSalary.docdate"
              @SelectedItem="SelectedItem"
              @DblClick="AddPerson"
            >
            </employee-list-component>
            <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
            <!-- <edit-person-component></edit-person-component> -->

            <c-row class="mt-2">
              <c-col class="text-center">
                <b-button
                  class="mr-2"
                  variant="danger"
                  @click="CloseEmployeeModal"
                >
                  {{ $t("back") }}
                </b-button>
                <b-button variant="primary" @click="AddPerson(personvalue)">
                  {{ $t("Add") }}
                </b-button>
              </c-col>
            </c-row>
          </b-modal>
          <b-modal id="FillTableModal" no-close-on-backdrop size="xl" :title="$t('FillTable')" hide-footer modal-class="custom-size-modal">
            <b-row>
              <b-col>
                <vs-table
                :data="FillTableList"
                @sort="handleSort"
                @selected="SelectedPosition"
                  @DblClick="fillTable"
                v-model="selected"
                style="border:1px solid #eee">
                <template slot="thead">
                    <vs-th sort-key="departmentname">
                        {{$t('departmentname')}}
                    </vs-th>
                    <vs-th sort-key="positionname">
                        {{$t('positionname')}}
                    </vs-th>
                    <vs-th sort-key="qualificationcategoryname">
                        {{$t('qualificationcategoryname')}}
                    </vs-th>
                    <vs-th sort-key="quantity">
                        {{$t('quantity')}}
                    </vs-th>
                    <vs-th sort-key="formonths">
                        {{$t('formonths')}}
                    </vs-th>
                    <vs-th sort-key="tariffscaletype">
                        {{$t('tariffscaletype')}}
                    </vs-th>
                    <vs-th sort-key="tariffscale">
                        {{$t('tariffscale')}}
                    </vs-th>
                    <vs-th sort-key="corrcoef">
                        {{$t('corrcoef')}}
                    </vs-th>
                    <vs-th sort-key="salary">
                        {{$t('salary')}}
                    </vs-th>

                    <!-- <vs-th sort-key="carbohydrate">
                        {{$t('carbohydrate')}}
                    </vs-th> -->
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading">
                            <vs-td :data="data[indextr].departmentname">
                                {{data[indextr].departmentname}}
                            </vs-td>

                            <vs-td :data="data[indextr].positionname">
                                {{data[indextr].positionname}}
                            </vs-td>

                            <vs-td :data="data[indextr].qualificationcategoryname">
                                {{data[indextr].qualificationcategoryname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].quantity}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].formonths}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].tariffscaletype}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].tariffscale}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].corrcoef}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].salary}}
                            </vs-td>

                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].carbohydrate}}
                            </vs-td> -->
                        </vs-tr>
                </template>
                </vs-table>
              </b-col>
            </b-row>
           
              <div class="text-center mx-auto mt-3">
                <CButton size="sm" color="danger" class="mr-2" @click="Close">
                  <b-icon icon="arrow-left-short" ></b-icon>
                  {{$t('back')}}
                </CButton>
                <CButton size="sm" color="primary" @click="fillTable(positionvalue)">
                  <b-icon icon="check2"></b-icon>
                  {{$t('Save')}}
                </CButton>
              </div>
          </b-modal>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import StaffingService from "@/services/Staffing.service";
import AppointEmpSalaryService from "@/services/AppointEmpSalary.service";
import PersonService from "@/services/person.service";
import TariffScaleService from "@/services/TariffScale.service";
import OrganizationService from "@/services/organization.service";
import CalculationKindService from "@/services/CalculationKind.service";
import HrAcceptanceWorkService from "@/services/HrAcceptanceWork.service";
import HelperService from "@/services/helper.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import EmployeeListComponent from "@/components/EmployeeList";
import QualificationCategoryService from "@/services/QualificationCategory.service";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      selected : [],
      SaveLoading: false,
      Loading:false,
      AppointEmpSalary: {},
      selectedrowid: 0,
      organizationaccountlist: [],
      calculationkindlist: [],
      tariffscaletablelist: [],
      hracceptanceworklist: [],
       qualificationcategorylist: [],
      lang: "",
      AppointEmpSalaryTables: [
        {
          key: "organizationaccountname",
          label: this.$t("organizationaccountname"), class: "text-left",
        },
        { key: "calculationkindname", label: this.$t("calculationkindname"), class: "text-left", },
        { key: "insum", label: this.$t("insum"), class: "text-right", },
        { key: "percentage", label: this.$t("percentage"), class: "text-right", },
        { key: "outsum", label: this.$t("outsum"), class: "text-right", },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        calculationkindid: 0,
        insum: 0,
        percentage: 0,
        outsum: 0,
        Status: 1,
      },
      FillTableList: []
    };
  },
  created() {
    var self = this;

    AppointEmpSalaryService.Get(self.$route.params.id).then((res) => {
      self.AppointEmpSalary = res.data;
    });
    TariffScaleService.GetAllTableList().then((res) => {
      self.tariffscaletablelist = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      self.qualificationcategorylist = res.data;
    });
    /*     HrAcceptanceWorkService.GetAll().then((res) => {
      self.hracceptanceworklist = res.data;
    }); */
    OrganizationService.GetOrganizationAccountList().then((res) => {
      self.organizationaccountlist = res.data;
    });
    CalculationKindService.GetAll().then((res) => {
      self.calculationkindlist = res.data;
    });
  },

  methods: {
    OpenFillTableModal(){
      this.GetAllStaffingPosition()
      this.$bvModal.show('FillTableModal')
    },
    GetAllStaffingPosition(){
      StaffingService.GetAllStaffingPosition(this.AppointEmpSalary.docdate,this.AppointEmpSalary.positionid).then(res => {
        console.log(res.data)
        this.FillTableList = res.data
      }).catch(error => {
          this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
        });
    },
    DisabledItem() {
      if (this.AppointEmpSalary.Tables.filter((item) => item.Status != 3).length > 0) {
        return true;
      } else {
        return false;
      }
    },
    handleSort(){

    },
    Close(){
      this.$bvModal.hide('FillTableModal')
    },
    AddItem(){

    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
     SelectedPosition(value) {
      this.positionvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    AddPerson(data) {
      this.CloseEmployeeModal();
      console.log(data);
      this.AppointEmpSalary.personid = data.personid;
      this.AppointEmpSalary.personname = data.personname;
      this.AppointEmpSalary.employeeenrolmentid = data.employeeenrolmentid;
      this.AppointEmpSalary.hracceptanceworkid = data.hracceptanceworkid;
      this.AppointEmpSalary.positionid = data.positionid;
      this.AppointEmpSalary.positionname = data.positionname;
      this.AppointEmpSalary.employmentrate = data.employmentrate;
      if(this.AppointEmpSalary.personid>0){
          QualificationCategoryService.GetPersonQualificationCategory(this.AppointEmpSalary.personid,0,this.AppointEmpSalary.docdate).then((res) => {
          this.AppointEmpSalary.qualificationcategoryid = res.data.QualificationCategoryID;
          this.AppointEmpSalary.qualificationcategoryname = res.data.QualificationCategoryName;
        }).catch(error => {
          this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
        });
      }
      this.GetAllStaffingPosition()
    },
    fillTable(row) {
     var self = this;
     StaffingService.GetStaffingPosition(row.id,self.AppointEmpSalary.employmentrate)
        .then((res) => {
          self.AppointEmpSalary.tariffscalename = res.data.tariffscale;
          self.AppointEmpSalary.rankid = res.data.rankid;
          self.AppointEmpSalary.rankcode = res.data.rankcode;
          self.AppointEmpSalary.rankcoef = res.data.rankcoef;
          self.AppointEmpSalary.corrcoef = res.data.corrcoef;
          self.AppointEmpSalary.rankname = self.AppointEmpSalary.rankcode + '-' +res.data.corrcoef;
            res.data.StaffingCalcKindTables.forEach(function (item) {
                  self.tabrow = {
                  id: 0,
                  ownerid: 0,
                  organizationaccountid: self.AppointEmpSalary.organizationaccountid,
                  calculationkindid: item.calculationkindid,
                  calculationkindname: item.calculationkindname,
                  insum: item.calcsum,
                  percentage: item.calccoef,
                  outsum: 0,
                  Status: 1,
                };
                self.AppointEmpSalary.Tables.push(self.tabrow);
                self.tabrow = {
                  id: 0,
                  ownerid: 0,
                  organizationaccountid: 0,
                  calculationkindid: 0,
                  insum: 0,
                  percentage: 0,
                  outsum: 0,
                  Status: 1,
            };
          });
          this.$bvModal.hide('FillTableModal')
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    clearTable() {
      var self = this;
          self.AppointEmpSalary.Tables.forEach(function (item) {
              item.Status = 3;        
          });
    },
    RecalcData() {
      var self = this;
      
      
      if (self.AppointEmpSalary.Tables.filter(function (item) {
        if (item.Status !== 3) return item;
      }).length===0) {
        this.makeToast(
          this.$t("TablesNot"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      AppointEmpSalaryService.RecalcAppointEmpSalaryTable(self.AppointEmpSalary)
        .then((res) => {
          self.AppointEmpSalary.Tables.forEach(function (item) {
           item.Status = 3;
          });
          res.data.Tables.forEach(function (item) {
           if(item.Status != 3){
             item.Status = 1;
            self.AppointEmpSalary.Tables.push(item);
           }
          });
        })
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    personchange() {
      var self = this;
      HelperService.GetEmployeeEnrolment(self.AppointEmpSalary.personid).then(
        (res) => {
          if (!!res.data && res.data.length > 0) {
            self.AppointEmpSalary.employeeenrolmentid =
              res.data[0].employeeenrolmentid;
          }
        }
      );
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Add() {
      var self = this;
      if (
        self.tabrow.organizationaccountid === "" ||
        self.tabrow.organizationaccountid === undefined ||
        self.tabrow.organizationaccountid === null ||
        self.tabrow.organizationaccountid === 0
      ) {
        self.makeToast(
          self.$t("organizationaccountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.calculationkindid === "" ||
        self.tabrow.calculationkindid === undefined ||
        self.tabrow.calculationkindid === null ||
        self.tabrow.calculationkindid === 0
      ) {
        self.makeToast(
          self.$t("calculationkindCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.insum === "" ||
        self.tabrow.insum === undefined ||
        self.tabrow.insum === null ||
        self.tabrow.insum === 0
      ) {
        self.makeToast(self.$t("insumNotSelect"), self.$t("Error"), "danger");
        return false;
      }

      if (
        self.tabrow.percentage === "" ||
        self.tabrow.percentage === undefined ||
        self.tabrow.percentage === null ||
        self.tabrow.percentage === 0
      ) {
        self.makeToast(
          self.$t("percentageNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.outsum === "" ||
        self.tabrow.outsum === undefined ||
        self.tabrow.outsum === null ||
        self.tabrow.outsum === 0
      ) {
        self.makeToast(self.$t("outsumNotCorrect"), self.$t("Error"), "danger");
        return false;
      }

      self.AppointEmpSalary.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        organizationaccountid: 0,
        calculationkindid: 0,
        insum: 0,
        percentage: 0,
        outsum: 0,
        Status: 1,
      };
    },
    EditItem(item) {
      item.Status = 2;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.AppointEmpSalary.docnumber === 0 ||
        self.AppointEmpSalary.docnumber === null ||
        self.AppointEmpSalary.docnumber === undefined ||
        self.AppointEmpSalary.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointEmpSalary.docdate === 0 ||
        self.AppointEmpSalary.docdate === null ||
        self.AppointEmpSalary.docdate === undefined ||
        self.AppointEmpSalary.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointEmpSalary.personid === 0 ||
        self.AppointEmpSalary.personid === null ||
        self.AppointEmpSalary.personid === undefined ||
        self.AppointEmpSalary.personid === ""
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
/*       if (
        self.AppointEmpSalary.rankid === 0 ||
        self.AppointEmpSalary.rankid === null ||
        self.AppointEmpSalary.rankid === undefined ||
        self.AppointEmpSalary.rankid === ""
      ) {
        this.makeToast(this.$t("rankNotCorrect"), this.$t("Error"), "danger");
        return false;
      } */
/*       if (
        self.AppointEmpSalary.rankcoef === 0 ||
        self.AppointEmpSalary.rankcoef === null ||
        self.AppointEmpSalary.rankcoef === undefined ||
        self.AppointEmpSalary.rankcoef === ""
      ) {
        this.makeToast(
          this.$t("rankcoefNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
/*       if (
        self.AppointEmpSalary.rankcode === 0 ||
        self.AppointEmpSalary.rankcode === null ||
        self.AppointEmpSalary.rankcode === undefined ||
        self.AppointEmpSalary.rankcode === ""
      ) {
        this.makeToast(
          this.$t("rankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.AppointEmpSalary.corrcoef === 0 ||
        self.AppointEmpSalary.corrcoef === null ||
        self.AppointEmpSalary.corrcoef === undefined ||
        self.AppointEmpSalary.corrcoef === ""
      ) {
        this.makeToast(
          this.$t("corrcoefNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointEmpSalary.organizationaccountid === 0 ||
        self.AppointEmpSalary.organizationaccountid === null ||
        self.AppointEmpSalary.organizationaccountid === undefined ||
        self.AppointEmpSalary.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AppointEmpSalary.detailinfo === 0 ||
        self.AppointEmpSalary.detailinfo === null ||
        self.AppointEmpSalary.detailinfo === undefined ||
        self.AppointEmpSalary.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      AppointEmpSalaryService.Update(this.AppointEmpSalary)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "AppointEmpSalary" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>






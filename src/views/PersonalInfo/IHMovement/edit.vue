<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{$t('IHMovement')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="ihmovementnumber" rules="required|max:9">
                  <CInput
                    :placeholder="$t('ihmovementnumber')"
                    autocomplete="ihmovementnumber"
                    :label="$t('ihmovementnumber')"
                    v-model="IHMovement.ihmovementnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="ihmovementdate" rules="required">
                  <label for="datepicker-dateformat2">{{$t('ihmovementdate')}}</label>
                  <date-picker
                    v-model="IHMovement.ihmovementdate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('ihmovementdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    :disabled="DisabledItem()"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <custom-number-input
                  :placeholder="$t('ihmovementsum')"
                  autocomplete="text"
                  :label="$t('ihmovementsum')"
                  v-model="IHMovement.ihmovementsum"
                  disabled
                ></custom-number-input>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="fromdepartmentname" rules="required">
                  <label for>{{$t('fromdepartmentname')}}</label>
                  <v-select
                    :options="departmentlist"
                    v-model="IHMovement.fromdepartmentid"
                    @input="GetIHRestForIHMovement"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    :disabled="DisabledItem()"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="todepartmentname" rules="required">
                  <label for>{{$t('todepartmentname')}}</label>
                  <v-select
                    :options="departmentlist"
                    v-model="IHMovement.todepartmentid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    :disabled="DisabledItem()"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="fromresponsiblepersonname" rules="required">
                  <label for>{{$t('fromresponsiblepersonname')}}</label>
                  <v-select
                    :options="personlist"
                    @input="GetIHRestForIHMovement"
                    v-model="IHMovement.fromresponsiblepersonid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="DisabledItem()"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="toresponsiblepersonname" rules="required">
                  <label for>{{$t('toresponsiblepersonname')}}</label>
                  <v-select
                    :options="personlist"
                    v-model="IHMovement.toresponsiblepersonid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="DisabledItem()"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="IHMovement.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
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
        <CRow class="mb-4">
          <CCol class="text-right">
            <CButton size="sm" color="primary" @click="OpenModal" class="mr-3">
              <b-icon icon="plus"> </b-icon>
              {{$t('Add')}}
            </CButton>
          </CCol>
        </CRow>
         <vs-popup fullscreen :title="$t('contracttable')" :active.sync="AddModal">
           <vs-table multiple v-model="selected1" :data="FirstTableItems">
                <template slot="thead">
                  <vs-th
                    v-for="(th,indexth) in FirstTableFields"
                    :key="indexth"
                    class="text-left"
                    style="backgroundColor : #eee"
                  >{{th.label}}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="tr.inventoryholdingname">{{tr.inventoryholdingname}}</vs-td>

                    <vs-td :data="tr.measurename">{{tr.measurename}}</vs-td>

                    <vs-td :data="tr.quantity">{{tr.quantity}}</vs-td>

                    <vs-td
                      :data="tr.price"
                    >{{$options.filters.currency(tr.price, {symbol: '', fractionCount: 2})}}</vs-td>
                    <vs-td
                      :data="tr.docsum"
                    >{{$options.filters.currency(tr.docsum, {symbol: '', fractionCount: 2})}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
               <div class="text-center mx-auto">
                  <CButton size="sm" color="danger" class="mr-2" @click="Close">
                    <b-icon icon="arrow-left-short" ></b-icon>
                    {{$t('back')}}
                  </CButton>
                  <CButton size="sm" color="primary" @click="AddItem">
                    <b-icon icon="check2"></b-icon>
                    {{$t('Save')}}
                  </CButton>
                </div>
         </vs-popup>
        <!-- <vs-popup fullscreen :title="$t('contracttable')" :active.sync="AddModal">
          <b-row class="mx-1">
            <b-col cols="5" style="border:1px solid;height:80vh;overflow-y:scroll" class="p-0">
              <b-row>
                <b-col>
                  <c-input
                    class="mx-1 my-1"
                    size="sm"
                    v-model="search"
                    @keyup="Search"
                    :placeholder="$t('search')"
                  ></c-input>
                </b-col>
              </b-row>
              <vs-table multiple v-model="selected1" :data="FirstTableItems">
                <template slot="thead">
                  <vs-th
                    v-for="(th,indexth) in FirstTableFields"
                    :key="indexth"
                    class="text-left"
                    style="backgroundColor : #eee"
                  >{{th.label}}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="tr.inventoryholdingname">{{tr.inventoryholdingname}}</vs-td>

                    <vs-td :data="tr.measurename">{{tr.measurename}}</vs-td>

                    <vs-td :data="tr.quantity">{{tr.quantity}}</vs-td>

                    <vs-td
                      :data="tr.price"
                    >{{$options.filters.currency(tr.price, {symbol: '', fractionCount: 2})}}</vs-td>
                    <vs-td
                      :data="tr.docsum"
                    >{{$options.filters.currency(tr.docsum, {symbol: '', fractionCount: 2})}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </b-col>
            <b-col cols="2">
              <div class="d-flex align-items-center justify-content-center" style="height:100%">
                <b-button-group size="sm">
                  <b-button variant="primary" @click="MoveToFirst">
                    <b-icon icon="chevron-double-left"></b-icon>
                  </b-button>
                  <b-button variant="primary" @click="MoveToSecond">
                    <b-icon icon="chevron-double-right"></b-icon>
                  </b-button>
                </b-button-group>
              </div>
            </b-col>
            <b-col cols="5" style="border:1px solid;height:80vh;overflow-y:scroll" class="p-0">
              <vs-table multiple v-model="selected2" :data="SecondTableItems">
                <template slot="thead">
                  <vs-th
                    v-for="(th,indexth) in SecondTableFields"
                    :key="indexth"
                    style="backgroundColor : #eee"
                  >{{th.label}}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                    v-show="tr.Status != 3"
                  >
                    <vs-td
                      :data="tr.inventoryholdingname"
                    >{{tr.inventoryholdingname || tr.goodsname}}</vs-td>

                    <vs-td
                      :data="tr.unitofmeasurename"
                    >{{tr.unitofmeasurename || unitofmeasurelist.filter(item => item.id === tr.unitofmeasureid)[0].name}}</vs-td>
                    <vs-td :data="tr.quantity">
                      <b-form-input v-model="tr.quantity" @keyup="CheckMax(tr)" size="sm"></b-form-input>
                    </vs-td>

                    <vs-td
                      :data="tr.price"
                    >{{$options.filters.currency(tr.price, {symbol: '', fractionCount: 2})}}</vs-td>
                    <vs-td
                      :data="tr.docsum"
                    >{{$options.filters.currency(tr.price * tr.quantity, {symbol: '', fractionCount: 2})}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </b-col>
          </b-row>

          <div class="text-center mx-auto">
            <CButton size="sm" color="danger" class="mr-2" @click="Close">
              <b-icon icon="arrow-left-short" ></b-icon>
              {{$t('back')}}
            </CButton>
            <CButton size="sm" color="primary" @click="AddItem">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </div>
        </vs-popup> -->
        <CRow class="mx-2 mb-3">
          <CCol>
            <vs-table :data="itemsMainTable" style="border:1px solid #eee">
              <template slot="thead">
                <vs-th
                  v-for="(th,indexth) in fieldsMainTable"
                  :key="indexth"
                  style="backgroundColor : #eee"
                >{{th.label}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data" v-show="tr.Status != 3">
                  <vs-td :data="tr.goodsname">{{tr.goodsname}}</vs-td>

                  <vs-td :data="tr.unitofmeasure">
                    {{tr.unitofmeasure}}
                    <!-- {{
                    unitofmeasurelist.filter( (item2) => item2.id === tr.unitofmeasureid)[0].name
                    }} -->
                  </vs-td>
                  <vs-td :data="tr.quantity">{{tr.quantity }}</vs-td>
                  <vs-td
                    :data="tr.price"
                  >{{$options.filters.currency(tr.price, {symbol: '', fractionCount: 2})}}</vs-td>
                  <vs-td
                    :data="tr.deliverysumwithvat"
                  >{{$options.filters.currency( tr.price * tr.quantity, {symbol: '', fractionCount: 2})}}</vs-td>
                  <vs-td :data="tr.actions">
                    <div class="text-left">
                      <b-link
                        @click="EditItem(tr,indextr)"
                        class="mr-2"
                        v-c-tooltip="{content: $t('Edit') }"
                      >
                        <b-icon icon="pencil" ></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{content: $t('Delete') }"
                        @click="DeleteItem(tr,indextr)"
                      >
                        <b-icon icon="trash" ></b-icon>
                      </b-link>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'IHMovement'})"
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
import { mapState } from "vuex";
import HelperService from "@/services/helper.service";
import IHMovementService from "@/services/IHMovement.service";
import PersonService from "@/services/person.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";
import DepartmentService from "@/services/Department.service";
import ReportIHService from "@/services/ReportIH.service";
import { parse } from "@babel/core";
export default {
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      SaveLoading: false,
      AddModal: false,
      editedIndex: 0,
      search: "",
      sum: 0,
      firstTableAllCheck: false,
      secondTableAllCheck: false,
      IHMovement: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: [],
      },
      FirstTableFields: [
        // { key: "selected1" },
        { key: "inventoryholdingname", label: this.$t("goodsname") },
        { key: "measurename", label: this.$t("unitofmeasurename") },
        { key: "quantity", label: this.$t("quantity") },
        { key: "price", label: this.$t("price") },
        { key: "docsum", label: this.$t("docsum") },
      ],
      SecondTableFields: [
        // { key: "selected2" },
        { key: "goodsname", label: this.$t("goodsname") },
        {
          key: "unitofmeasure",
          label: this.$t("unitofmeasurename"),
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
        },
        {
          key: "price",
          label: this.$t("price"),
        },
        {
          key: "deliverysumwithvat",
          label: this.$t("docsum"),
        },
      ],
      FirstTableItems: [],
      SecondTableItems: [],
      honorarytitletypelist: [],
      personlist: [],
      accountlist: [],
      departmentlist: [],
      personlist: [],
      lang: "",
      fieldsMainTable: [
        {
          key: "goodsname",
          label: this.$t("goodsname"),
        },
        {
          key: "unitofmeasure",
          label: this.$t("unitofmeasurename"),
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
        },
        {
          key: "price",
          label: this.$t("price"),
        },
        {
          key: "deliverysumwithvat",
          label: this.$t("docsum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      itemsMainTable: [],
      Tables: {},
      unitofmeasurelist: [],
      InventoryHoldingList: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      createModal: false,
      selected1: [],
      selected2: [],
      HelperFirstTableItems: [],
    };
  },
  created() {
    IHMovementService.Get(this.$route.params.id).then((res) => {
      this.IHMovement = res.data;
      this.itemsMainTable = res.data.Tables;
      if (this.$route.params.id != 0) {
        this.GetIHRestForIHMovement();
      }
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    InventoryHoldingService.GetAll().then((res) => {
      this.InventoryHoldingList = res.data;
    });
    HelperService.GetOrganizationData().then((res) => {
      this.orgstateinfolist = res.data;
    });
    HelperService.GetExciseRateTypeList().then((res) => {
      this.ExciserateList = res.data;
    });

    DepartmentService.GetAll().then((res) => {
      this.departmentlist = res.data;
    });
    // PersonService.GetAllOrgPerson().then((res) => {
    //   this.personlist = res.data;
    // });
  },

  computed: {},
  mounted() {},
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    CheckMax(item) {
      if (item.maxquantity < item.quantity) {
        item.quantity = item.maxquantity;
        item.restquantity = item.maxquantity - item.quantity;
      }
      if (item.quantity < 0) {
        item.quantity = 0;
      }
      console.log(item);
      this.Changequantity(item);
    },
    DeleteItem(item, index) {
      item.Status = 3;
      item.inventoryholdingname = item.goodsname;
      item.measurename = item.unitofmeasure;
      item.docsum = item.deliverysumwithvat;
      item.ihmanageid = item.frombaseihmanageid;
      let helper = this.FirstTableItems.filter(
        (el) => el.ihmanageid === item.ihmanageid
      );
      if (helper.length > 0) {
        helper[0].quantity += parseFloat(item.quantity);
        // helper[0].docsum += parseFloat(item.docsum);
      } else {
        this.FirstTableItems.push(item);
      }
      this.CalculateTotalSum();
    },
    Search() {
      this.FirstTableItems = this.HelperFirstTableItems;
      this.FirstTableItems = this.FirstTableItems.filter((item) =>
        item.inventoryholdingname.includes(this.search)
      );
    },
    Changequantity(item) {
      item.docsum = item.quantity * item.price;
      item.deliverysumwithvat = item.docsum;
    },
    GetIHRestForIHMovement() {
      ReportIHService.GetIHRestForIHMovement(
        this.IHMovement.ihmovementdate,
        this.IHMovement.fromdepartmentid || 0,
        this.IHMovement.fromresponsiblepersonid || 0,
        "",
        true,
        this.IHMovement.id,
        this.IHMovement.TableID
      ).then((res) => {
        this.FirstTableItems = res.data;
        this.HelperFirstTableItems = res.data;
      });
    },
    // onRowSelected1(items) {
    //   this.selected1 = items;
    // },
    // onRowSelected2(items) {
    //   this.selected2 = items;
    // },
    ChangeSecondTableAllCheck() {
      if (this.secondTableAllCheck === true) {
        this.$refs.selectableTable2.selectAllRows();
      } else {
        this.$refs.selectableTable2.clearSelected();
      }
    },
    DisabledItem() {
      if (this.itemsMainTable.filter((item) => item.Status != 3).length > 0) {
        return true;
      } else {
        return false;
      }
    },
    ChangeFirstTableAllCheck() {
      if (this.firstTableAllCheck === true) {
        this.$refs.selectableTable1.selectAllRows();
      } else {
        this.$refs.selectableTable1.clearSelected();
      }
    },
    MoveToSecond() {
      console.log(this.selected1);
      for (let i = 0; i < this.selected1.length; i++) {
        let item = this.selected1[i];
        item.Status = 1;
        item.ownerid = 0;
        item.maxquantity = item.quantity;
        item.unitofmeasure = item.measurename;
        item.quantity = item.quantity;
        item.unitofmeasurename = item.measurename;
        item.unitofmeasureid = item.measureid;
        item.goodsname = item.inventoryholdingname;
        item.fromihmanageid = item.ihmanageid;
        item.frombaseihmanageid = item.ihmanageid;
        item.deliverysumwithvat = item.docsum;
        item.restquantity = item.maxquantity - item.quantity;
        let helper = this.SecondTableItems.filter(
          (el) =>
            el.ihmanageid === item.ihmanageid ||
            el.frombaseihmanageid === item.frombaseihmanageid
        );
        if (helper.length > 0) {
          helper[0].quantity += parseFloat(item.quantity);
          // helper[0].docsum += parseFloat(item.docsum);
        } else {
          this.SecondTableItems.push(item);
        }
        this.FirstTableItems.splice(this.FirstTableItems.indexOf(item), 1);
      }
      console.log(this.FirstTableItems);
      this.HelperFirstTableItems = this.FirstTableItems;
      this.selected1 = [];
    },
    MoveToFirst() {
      var self = this;
      self.selected2.forEach(function (item) {
        item.inventoryholdingname = item.goodsname;
        item.measurename = item.unitofmeasurename;
        item.measurename = item.unitofmeasure;
        item.measureid = item.unitofmeasureid;
        item.ihmanageid = item.fromihmanageid;
        item.docsum = item.deliverysumwithvat;
        self.FirstTableItems.push(item);
        self.SecondTableItems.splice(self.SecondTableItems.indexOf(item), 1);
      });
      this.HelperFirstTableItems = this.FirstTableItems;
      self.selected2 = [];
    },
    Close() {
      this.AddModal = false;
      this.selected1 = [];
      this.selected2 = [];
    },
    AddItem(){
      this.itemsMainTable = [].concat(this.selected1);
    },
    // AddItem() {
    //   if (this.editedIndex === 0) {
    //     for (let h = 0; h < this.SecondTableItems.length; h++) {
    //       let item = this.SecondTableItems[h];
    //       let helper = this.itemsMainTable.filter(
    //         (el) =>
    //           el.frombaseihmanageid === item.frombaseihmanageid &&
    //           el.Status != 3
    //       );
    //       if (helper.length > 0) {
    //         helper[0].quantity += item.quantity;
    //       } else {
    //         item.restquantity = item.maxquantity - item.quantity;
    //         this.itemsMainTable.push(item);
    //       }
    //       if (item.quantity < item.maxquantity && item.quantity > 0) {
    //         this.FirstTableItems.push({
    //           Status: 1,
    //           deliverysumwithvat: item.deliverysumwithvat,
    //           departmentid: item.departmentid,
    //           departmentname: item.departmentname,
    //           docsum: item.docsum,
    //           frombaseihmanageid: item.frombaseihmanageid,
    //           fromihmanageid: item.fromihmanageid,
    //           goodsname: item.goodsname,
    //           ihmanageid: item.ihmanageid,
    //           inventoryholdingid: item.inventoryholdingid,
    //           inventoryholdingname: item.inventoryholdingname,
    //           maxquantity: item.quantity,
    //           measureid: item.measureid,
    //           measurename: item.measurename,
    //           ownerid: item.ownerid,
    //           price: item.price,
    //           quantity: item.maxquantity - item.quantity,
    //           responsiblepersonid: item.responsiblepersonid,
    //           responsiblepersonname: item.responsiblepersonname,
    //           restquantity: item.restquantity,
    //           unitofmeasure: item.unitofmeasure,
    //           unitofmeasureid: item.unitofmeasureid,
    //           unitofmeasurename: item.unitofmeasurename,
    //         });
    //         console.log(this.FirstTableItems);
    //       }
    //     }
    //   }
    //   if (this.editedIndex === 1) {
    //     this.itemsMainTable = [].concat(this.SecondTableItems);
    //   }
    //   this.CalculateTotalSum();
    //   this.SecondTableItems = [];
    //   this.Close();
    //   console.log(this.itemsMainTable);
    // },
    OpenModal() {
      this.AddModal = true;
      this.editedIndex = 0;
      this.SecondTableItems = [];
    },

    EditItem(item, index) {
      item.Status = 2;
      this.AddModal = true;
      this.editedIndex = 1;
      this.SecondTableItems = this.itemsMainTable;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    CalculateTotalSum() {
      // var self = this;
      this.IHMovement.ihmovementsum = 0;
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        let item = this.itemsMainTable[i];
        if (item.Status != 3) {
          this.IHMovement.ihmovementsum += parseFloat(item.deliverysumwithvat);
        }
      }
    },
    check() {
      var self = this;
      if (
        self.IHMovement.ihmovementnumber === 0 ||
        self.IHMovement.ihmovementnumber === null ||
        self.IHMovement.ihmovementnumber === undefined ||
        self.IHMovement.ihmovementnumber === ""
      ) {
        this.makeToast(
          this.$t("contractnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMovement.ihmovementdate === 0 ||
        self.IHMovement.ihmovementdate === null ||
        self.IHMovement.ihmovementdate === undefined ||
        self.IHMovement.ihmovementdate === ""
      ) {
        this.makeToast(
          this.$t("contractdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMovement.ihmovementsum === 0 ||
        self.IHMovement.ihmovementsum === null ||
        self.IHMovement.ihmovementsum === undefined ||
        self.IHMovement.ihmovementsum === ""
      ) {
        this.makeToast(
          this.$t("IHMovementsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (this.itemsMainTable.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.IHMovement.fromdepartmentid === self.IHMovement.todepartmentid &&
        self.IHMovement.fromresponsiblepersonid ===
          self.IHMovement.toresponsiblepersonid
      ) {
        {
          this.makeToast(this.$t("CantMoveToSame"), this.$t("Error"), "danger");
          return false;
        }
      }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.IHMovement.Tables = this.itemsMainTable;
      IHMovementService.Update(this.IHMovement)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "IHMovement" });
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
  watch: {
    AddModal: {
      handler(newValue, OldValue) {
        if (newValue === false) {
          if (this.editedIndex === 0) {
            this.FirstTableItems = this.FirstTableItems.concat(
              this.SecondTableItems
            );
          }
        }
      },
    },
  },
};
</script>

<style>
</style>






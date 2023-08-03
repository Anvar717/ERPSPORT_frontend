<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("HROrgStructure") }}</h4>
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
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="HROrgStructure.docnumber"
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
                    v-model="HROrgStructure.docdate"
                    style="width:100%"
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
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="HROrgStructure.detailinfo"
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
          <CCol class="text-right mb-4 mr-3">
            <CButton
              color="primary"
              size="sm"
              @click="$bvModal.show('AddModal')"
            >
              <b-icon icon="plus"> </b-icon>
              {{ $t("Add") }}
            </CButton>
          </CCol>
          <b-modal size="lg" id="AddModal">
            <template v-slot:modal-title>{{ $t("HROrgStructure") }}</template>

            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("ordernumber")
                  }}</label>
                  <span class="col-sm-9 pt-2">{{ tabrow.ordernumber }}</span>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("departmentname")
                  }}</label>
                  <v-select
                    :options="departmentlist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.departmentid"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("positionidname")
                  }}</label>
                  <v-select
                    :options="positionlist"
                    class="col-sm-9"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.positionid"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("isfixedratecountname")
                  }}</label>
                  <b-form-checkbox
                    @input="isfixedratecountchange"
                    v-model="tabrow.isfixedratecount"
                    switch
                    class="col-sm-9 mt-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("ratecount")
                  }}</label>
                  <custom-number-input
                    class="col-sm-9"
                    v-if="tabrow.isfixedratecount"
                    v-model="tabrow.ratecount"
                  ></custom-number-input>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("isselfacceptanceworkname")
                  }}</label>
                  <b-form-checkbox
                    @input="isselfacceptanceworkchange"
                    v-model="tabrow.isselfacceptancework"
                    switch
                    class="mt-2 ml-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("acceptanceorgname")
                  }}</label>
                  <v-select
                    v-if="!tabrow.isselfacceptancework"
                    :options="acceptanceorglist"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="tabrow.acceptanceorgid"
                    class="col-sm-9"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CInput
                  horizontal
                  :label="$t('detailinfo')"
                  class="mb-0"
                  v-model="tabrow.detailinfo"
                ></CInput>
              </CCol>
            </CRow>

            <template v-slot:modal-footer>
              <div class="d-block text-right">
                <CButton
                  @click="$bvModal.hide('AddModal')"
                  color="danger"
                  class="mr-2"
                >
                  <b-icon icon="x"></b-icon>
                  {{ $t("NotAccept") }}
                </CButton>
                <CButton @click="Add" color="success">
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Accept") }}
                </CButton>
              </div>
            </template>
          </b-modal>
        </CRow>
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="HROrgStructureTables"
                :items="HROrgStructure.Tables"
                class="bg-color-table text-center"
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <!--<template v-slot:cell(ordernumber)="{item}">
                  <p>{{item.ordernumber}}</p>
                 
                </template>
                <template v-slot:cell(departmentname)="{item}">
                  <p>{{item.departmentname}}</p>
                 
                </template>
                <template v-slot:cell(positionidname)="{item}">
                  <p >{{item.positionidname}}</p>
                  
                </template>
                
                <template v-slot:cell(isfixedratecountname)="{item}">
                   <p >{{item.isfixedratecountname}}</p>
                </template>
               
                <template v-slot:cell(ratecount)="{item}">
                  <p v-if="item.Status == 0 ||  !item.isfixedratecount">{{item.ratecount}}</p>
                  <custom-number-input v-if="(item.Status == 1 || item.Status == 2) && item.isfixedratecount"  v-model="item.ratecount"></custom-number-input>
                </template>
                 <template v-slot:cell(isselfacceptancework)="{item}">
                  <p >{{item.isselfacceptanceworkname}}</p>
                </template>
                <template v-slot:cell(acceptanceorgname)="{item}">
                  <p>{{item.acceptanceorgname}}</p>
                </template>
                <template v-slot:cell(detailinfo)="{item}">
                  <p v-if="item.Status == 0">{{item.detailinfo}}</p>
                  <CInput
                    v-if="item.Status == 1 || item.Status == 2"
                    class="mb-2"
                    v-model="item.detailinfo"
                  ></CInput>
                </template>-->
                <template
                  v-if="HROrgStructure.CanSave"
                  v-slot:cell(actions)="{ item }"
                >
                  <div class="text-center">
                    <b-link
                      @click="EditItem(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteItem(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-3"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'HROrgStructure' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HROrgStructure.CanSave"
                size="sm"
                color="success"
                class="mr-3"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import HROrgStructureService from "@/services/HROrgStructure.service";
import PositionService from "@/services/Position.service";
import DepartmentService from "@/services/Department.service";
export default {
  data() {
    return {
      SaveLoading: false,
      HROrgStructure: {},
      selectedrowid: 0,
      lang: "",
      HROrgStructureTables: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        { key: "departmentname", label: this.$t("departmentname") },
        { key: "positionidname", label: this.$t("positionname") },
        { key: "isfixedratecountname", label: this.$t("isfixedratecountname") },
        { key: "ratecount", label: this.$t("ratecount") },
        {
          key: "isselfacceptanceworkname",
          label: this.$t("isselfacceptanceworkname"),
        },
        { key: "acceptanceorgname", label: this.$t("acceptanceorgname") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],

      tabrow: {
        id: 0,
        ownerid: 0,
        ordernumber: 1,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        isfixedratecount: true,
        isfixedratecountname: "",
        ratecount: 0,
        isselfacceptancework: true,
        isselfacceptanceworkname: "",
        acceptanceorgid: 0,
        acceptanceorgname: "",
        detailinfo: "",
        Status: 1,
      },
      filter: {
        DepartmentID: 0,
        tariffscaletypeid: 0,
        isByOrganization: false,
        staffTypeBasicTariffId: 0,
      },

      positionlist: [],
      departmentlist: [],
      acceptanceorglist: [],
      editedIndex: -1,
      lang: "",
    };
  },
  created() {
    var self = this;
    self.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;

    HROrgStructureService.Get(self.selectedrowid).then((res) => {
      self.HROrgStructure = res.data;
      var number = 0;
      self.HROrgStructure.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          number++;
        }
      });
      self.tabrow.ordernumber = number + 1;
    });
    DepartmentService.GetAll(this.lang).then((res) => {
      self.departmentlist = res.data;
    });
    PositionService.GetAll(
      self.filter.DepartmentID,
      self.filter.tariffscaletypeid,
      self.filter.isByOrganization,
      self.filter.staffTypeBasicTariffId
    ).then((res) => {
      self.positionlist = res.data;
    });
    OrganizationService.GetAll(0, 0, undefined, 0, null).then((res) => {
      self.acceptanceorglist = res.data;
    });
  },

  methods: {
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
        solid: true,
      });
    },
    Add() {
      var self = this;
      if (
        self.tabrow.departmentid === null ||
        self.tabrow.departmentid === undefined ||
        self.tabrow.departmentid === 0
      ) {
        this.makeToast(
          this.$t("DepartmentNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.tabrow.positionid === "" ||
        self.tabrow.positionid === undefined ||
        self.tabrow.positionid === null ||
        self.tabrow.positionid === 0
      ) {
        this.makeToast(
          this.$t("positionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.tabrow.isfixedratecount) {
        if (
          self.tabrow.ratecount === "" ||
          self.tabrow.ratecount === undefined ||
          self.tabrow.ratecount === null ||
          self.tabrow.ratecount === 0
        ) {
          this.makeToast(
            this.$t("ratecountNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      if (!self.tabrow.isselfacceptancework) {
        if (
          self.tabrow.acceptanceorgid === "" ||
          self.tabrow.acceptanceorgid === undefined ||
          self.tabrow.acceptanceorgid === null ||
          self.tabrow.acceptanceorgid === 0
        ) {
          this.makeToast(
            this.$t("acceptanceorgNotSelected"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      self.tabrow.departmentname = self.departmentlist.filter(function(item) {
        if (item.id === self.tabrow.departmentid) return item;
      })[0].name;
      self.tabrow.positionidname = self.positionlist.filter(function(item) {
        if (item.id === self.tabrow.positionid) return item;
      })[0].name;
      if (!self.tabrow.isselfacceptancework) {
        self.tabrow.acceptanceorgname = self.acceptanceorglist.filter(function(
          item
        ) {
          item;
          if (item.id === self.tabrow.acceptanceorgid) return item;
        })[0].name;
      }
      if (self.tabrow.isfixedratecount) self.tabrow.isfixedratecountname = "Да";
      else self.tabrow.isfixedratecountname = "Нет";
      if (self.tabrow.isselfacceptancework)
        self.tabrow.isselfacceptanceworkname = "Да";
      else self.tabrow.isselfacceptanceworkname = "Нет";
      if (self.editedIndex > -1) {
        Object.assign(
          self.HROrgStructure.Tables[self.editedIndex],
          self.tabrow
        );
      } else {
        self.HROrgStructure.Tables.push(self.tabrow);
      }

      var number = 0;
      self.HROrgStructure.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          number++;
        }
      });
      self.tabrow = {
        id: 0,
        ownerid: 0,
        ordernumber: number + 1,
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        isfixedratecount: true,
        isfixedratecountname: "",
        ratecount: 0,
        isselfacceptancework: true,
        isselfacceptanceworkname: "",
        acceptanceorgid: 0,
        acceptanceorgname: "",
        detailinfo: "",
        Status: 1,
      };
      this.$bvModal.hide("AddModal");
    },

    isfixedratecountchange() {
      var self = this;
      self.tabrow.isfixedratecount;
      if (!self.tabrow.isfixedratecount) self.tabrow.ratecount = 0;
    },
    isselfacceptanceworkchange() {
      var self = this;

      if (self.tabrow.isselfacceptancework) {
        self.tabrow.acceptanceorgid = 0;
        self.tabrow.acceptanceorgname = "";
      }
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.HROrgStructure.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      var self = this;
      item.Status = 3;
      var number = 1;
      self.HROrgStructure.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          item.ordernumber = number;
          if (item.Status === 0) item.Status = 2;
          number++;
        }
      });
      self.tabrow.ordernumber = number;
    },
    check() {
      var self = this;
      if (
        self.HROrgStructure.docnumber === 0 ||
        self.HROrgStructure.docnumber === null ||
        self.HROrgStructure.docnumber === undefined ||
        self.HROrgStructure.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HROrgStructure.docdate === 0 ||
        self.HROrgStructure.docdate === null ||
        self.HROrgStructure.docdate === undefined ||
        self.HROrgStructure.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.HROrgStructure.detailinfo === null ||
        self.HROrgStructure.detailinfo === undefined ||
        self.HROrgStructure.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HROrgStructure.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      HROrgStructureService.Update(self.HROrgStructure)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HROrgStructure" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style></style>

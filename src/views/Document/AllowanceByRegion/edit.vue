<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('AllowanceByRegion')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="docnumber">
                  <CInput
                    disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    class="col-sm-9"
                    :label="$t('docnumber')"
                    v-model="AllowanceByRegion.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="AllowanceByRegion.docdate"
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
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-2">{{$t('calculationkind')}}</label>
                  <v-select
                    :options="calculationkindlist"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    disabled
                    v-model="AllowanceByRegion.calculationkindid"
                    class="col-sm-10"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="normativedoc" rules="required">
                  <CInput
                    :placeholder="$t('normativedoc')"
                    autocomplete="normativedoc"
                    horizontal
                    :label="$t('normativedoc')"
                    v-model="AllowanceByRegion.normativedoc"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="AllowanceByRegion.detailinfo"
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
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('AllowanceByRegion')}}</template>

          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('oblast')}}</label>
                <v-select
                  :options="OblastList"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.oblastid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('region')}}</label>
                <v-select
                  :options="RegionList"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.regionid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{$t('iswholeregion')}}</label>
                <b-form-checkbox v-model="tabrow.iswholeregion" switch class="mt-2 ml-1"></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="!tabrow.iswholeregion">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('mfy')}}</label>
                <v-select
                  :options="MfyList"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.mfyid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('allowancerate')}}</label>
                <custom-number-input class="mb-0" size="lg" v-model="tabrow.allowancerate"></custom-number-input>
              </div>
            </b-col>
          </b-row>

          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="Add">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="$bvModal.show('AddModal')">
              <b-icon icon="plus"></b-icon>
              {{$t('Add')}}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                    <b-icon icon="pencil" ></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash" ></b-icon>
                  </b-link>
                </div>
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
                @click="$router.push({name : 'AllowanceByRegion'})"
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
import CalculationKindService from "@/services/CalculationKind.service";
import AllowanceByRegionService from "@/services/AllowanceByRegion.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import MfyService from "@/services/Mfy.service";

export default {
  name: "InfiniteScroll",
  data() {
    return {
      SaveLoading: false,
      AllowanceByRegion: {},
      editedIndex: -1,
      lang: "",
      fieldsMainTable: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
        },
        {
          key: "iswholeregion",
          label: this.$t("iswholeregion"),
        },
        {
          key: "mfyname",
          label: this.$t("mfyname"),
        },
        {
          key: "allowancerate",
          label: this.$t("allowancerate"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      itemsMainTable: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        iswholeregion: false,
        mfyid: 0,
        mfyname: "",
        allowancerate: 0,
      },
      calculationkindlist: [],
      OblastList: [],
      RegionList: [],
      MfyList: [],
      personloading: false,
      lang : localStorage.getItem('locale') || 'ru'

    };
  },
  created() {
    CalculationKindService.GetAll().then((res) => {
      this.calculationkindlist = res.data;
    });
    OblastService.GetAll(211).then((res) => {
      this.OblastList = res.data;
    });
    AllowanceByRegionService.Get(this.$route.params.id).then((res) => {
      this.AllowanceByRegion = res.data;
      this.itemsMainTable = res.data.Tables;
      this.AllowanceByRegion.calculationkindid = 9;
    });
  },
  mounted() {},
  computed: {},
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
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang,oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    getmfylist(regionid, setmfylist) {
      MfyService.GetAll(regionid).then((res) => {
        setmfylist(res.data);
      });
    },
    /* AddItem(){
      if (this.editedIndex > -1) {
        if (this.tabrow.iswholeregion) {
          this.tabrow.mfyid = 0;
        }
        this.tabrow.oblastname= this.tabrow.oblastid ? this.OblastList.filter(item => item.id === this.tabrow.oblastid)[0].name: "";
        this.tabrow.regionname= this.tabrow.regionid ? this.RegionList.filter(item => item.id === this.tabrow.regionid)[0].name: "";
        this.tabrow.mfyname= this.tabrow.mfyid ? this.MfyList.filter(item => item.id === this.tabrow.mfyid)[0].name: "";

          Object.assign(this.itemsMainTable[this.editedIndex], this.tabrow)
          this.Close()
        } else {
          this.Add();
        }
    }, */
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        (this.tabrow = {
          id: 0,
          ownerid: 0,
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          iswholeregion: false,
          mfyid: 0,
          mfyname: "",
          allowancerate: 0,
        }),
          (this.editedIndex = -1);
      });
    },
    Add() {
      if (
        this.tabrow.oblastid === "" ||
        this.tabrow.oblastid === undefined ||
        this.tabrow.oblastid === null ||
        this.tabrow.oblastid === 0
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        this.tabrow.regionid === "" ||
        this.tabrow.regionid === undefined ||
        this.tabrow.regionid === null ||
        this.tabrow.regionid === 0
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        !this.tabrow.iswholeregion &&
        (this.tabrow.mfyid === "" ||
          this.tabrow.mfyid === undefined ||
          this.tabrow.mfyid === null ||
          this.tabrow.mfyid === 0)
      ) {
        this.makeToast(this.$t("mfyNotSelected"), this.$t("Error"), "danger");
        return false;
      }

      if (
        this.tabrow.allowancerate === "" ||
        this.tabrow.allowancerate === undefined ||
        this.tabrow.allowancerate === null ||
        this.tabrow.allowancerate === 0
      ) {
        this.makeToast(
          this.$t("allowancerateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (this.tabrow.iswholeregion) {
        this.tabrow.mfyid = 0;
      }
      if (this.editedIndex > -1) {
        this.tabrow.oblastname = this.tabrow.oblastid
          ? this.OblastList.filter(
              (item) => item.id === this.tabrow.oblastid
            )[0].name
          : "";
        this.tabrow.regionname = this.tabrow.regionid
          ? this.RegionList.filter(
              (item) => item.id === this.tabrow.regionid
            )[0].name
          : "";
        this.tabrow.mfyname = this.tabrow.mfyid
          ? this.MfyList.filter((item) => item.id === this.tabrow.mfyid)[0].name
          : "";
        Object.assign(this.itemsMainTable[this.editedIndex], this.tabrow);
      } else {
        this.itemsMainTable.push({
          id: this.tabrow.id,
          ownerid: this.tabrow.ownerid,
          oblastid: this.tabrow.oblastid,
          oblastname: this.tabrow.oblastid
            ? this.OblastList.filter(
                (item) => item.id === this.tabrow.oblastid
              )[0].name
            : "",
          regionid: this.tabrow.regionid,
          regionname: this.tabrow.regionid
            ? this.RegionList.filter(
                (item) => item.id === this.tabrow.regionid
              )[0].name
            : "",
          iswholeregion: this.tabrow.iswholeregion,
          mfyid: this.tabrow.mfyid,
          mfyname: this.tabrow.mfyid
            ? this.MfyList.filter((item) => item.id === this.tabrow.mfyid)[0]
                .name
            : "",
          allowancerate: this.tabrow.allowancerate,
          Status: 1,
        });
      }

      (this.tabrow = {
        id: 0,
        ownerid: 0,
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        iswholeregion: false,
        mfyid: 0,
        mfyname: "",
        allowancerate: 0,
      }),
        this.$bvModal.hide("AddModal");
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.AllowanceByRegion.docnumber === 0 ||
        self.AllowanceByRegion.docnumber === null ||
        self.AllowanceByRegion.docnumber === undefined ||
        self.AllowanceByRegion.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceByRegion.docdate === 0 ||
        self.AllowanceByRegion.docdate === null ||
        self.AllowanceByRegion.docdate === undefined ||
        self.AllowanceByRegion.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceByRegion.calculationkindid === 0 ||
        self.AllowanceByRegion.calculationkindid === null ||
        self.AllowanceByRegion.calculationkindid === undefined ||
        self.AllowanceByRegion.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceByRegion.normativedoc === null ||
        self.AllowanceByRegion.normativedoc === undefined ||
        self.AllowanceByRegion.normativedoc === ""
      ) {
        this.makeToast(
          this.$t("normativedocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceByRegion.detailinfo === null ||
        self.AllowanceByRegion.detailinfo === undefined ||
        self.AllowanceByRegion.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AllowanceByRegion.Tables.filter((item) => item.Status !== 3)
          .length === 0
      ) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.AllowanceByRegion.docdate;
      /* this.CheckItemDelete(); */
      this.AllowanceByRegion.Tables = this.itemsMainTable;
      AllowanceByRegionService.Update(this.AllowanceByRegion)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "AllowanceByRegion",
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    /* CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    } */
  },
  watch: {
    "tabrow.oblastid": {
      handler(newValue, oldValue) {
        var self = this;
        if (newValue) {
          if (oldValue) {
            self.tabrow.regionid = null;
            self.tabrow.mfyid = null;
            self.MfyList = [];
          }

          self.getregionlist(newValue, function (data) {
            self.RegionList = data;
          });
        }
      },
    },
    "tabrow.regionid": {
      handler(newValue, oldValue) {
        var self = this;
        if (newValue) {
          if (oldValue) {
            self.tabrow.mfyid = null;
          }

          self.getmfylist(newValue, function (data) {
            self.MfyList = data;
          });
        }
      },
    },
  },
};
</script>

<style>
</style>
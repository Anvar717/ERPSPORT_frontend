<template>
  <div class="p-3">
    <CCardBody class="p-2">
      <CCard v-if="!isEdit">
        <CCardBody>
          <b-row class="mt-2">
            <b-col sm="1" lg="1" class="text-left">
              <label>{{ $t("isresident") }}</label>
              <b-form-checkbox
                v-model="filter.islocaljury"
                switch
                @input="juryTypeChange"
                class="ml-4"
              ></b-form-checkbox>
            </b-col>
            <b-col sm="3" lg="3" class="text-left">
              <label>{{ $t("identitydocument") }}</label>
              <v-select
                :options="getIdentityDocumentList"
                v-model="filter.identitydocumentid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                @input="filteridentitydocumentchange(filter)"
              ></v-select>
            </b-col>
            <b-col sm="3" lg="3" class="text-left">
              <label>{{ $t("documentseries") }}</label>
              <b-input-group>
                <v-select
                  v-if="filter.identitydocumentid === 1"
                  :options="DocSeriesList"
                  :reduce="(item) => item.name"
                  :placeholder="$t('docseries')"
                  v-model="filter.docseries"
                  label="name"
                ></v-select>
                <b-form-input
                  v-else-if="filter.identitydocumentid !== 1"
                  v-mask="filter.identitydocumentid == 4 ? '' : 'AA'"
                  :placeholder="$t('docseries')"
                  v-model="filter.docseries"
                />
                <template #append>
                  <b-form-input
                    v-mask="filter.identitydocumentid == 4 ? '' : '#######'"
                    type="number"
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    v-model="filter.docnumber"
                  ></b-form-input>
                </template>
              </b-input-group>
            </b-col>

            <b-col v-if="filter.islocaljury" sm="2" lg="2">
              <label>{{ $t("dateofbirth") }}</label>
              <div>
                <el-date-picker
                  v-model="filter.dateofbirth"
                  class="w-85"
                  type="date"
                  :placeholder="$t('dateofbirth')"
                  format="dd.MM.yyyy"
                  value-format="dd.MM.yyyy"
                  :picker-options="pickerOption"
                  v-insert-dots
                />
              </div>
            </b-col>
            <b-col sm="2" lg="2" v-if="filter.islocaljury">
              <label for="" style="margin-top: 41px"></label>
              <b-button variant="primary" @click="SearchByPinfl">
                <b-icon v-if="!pinflLoading" icon="search"></b-icon>
                <b-spinner v-if="pinflLoading" small></b-spinner>
                {{ $t("search") }}
              </b-button>
            </b-col>
          </b-row>
        </CCardBody>
      </CCard>
      <CCard v-loading="pinflLoading" class="p-3">
        <ValidationObserver ref="form" v-slot="errors">
          {{ setAllErrors(errors.errors) }}
          <b-row v-if="!isEdit">
            <b-col sm="12" md="6" class="text-center text-md-left">
              <h4 class="mb-4" v-if="person.CheckResult != null">
                {{ person.fullname }}
                <vs-tooltip
                  class="m-0"
                  style="display: inline-block"
                  :text="$t('CheckedPerson')"
                  ><b-icon
                    variant="success"
                    icon="check-circle-fill"
                  ></b-icon>
                </vs-tooltip>
              </h4>
              <h4 class="mb-4" v-if="person.CheckResult == null">
                {{ person.fullname }}
                <vs-tooltip
                  style="display: inline-block"
                  :text="$t('UncheckedPerson')"
                >
                  <b-icon
                    variant="warning"
                    icon="info-circle-fill"
                  ></b-icon>
                </vs-tooltip>
              </h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" md="6">
              <b-row>
                <b-col sm="12" md="12">
                  <ValidationProvider
                    v-slot="v"
                    name="familyname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0 px-0">
                      <label
                        class="col-form-label col-sm-3 pl-sm-2 pl-md-0"
                      >
                        {{ $t("familyname") }}
                        <code color="red" style="font-size: 16px">*</code>
                      </label>
                      <CInput
                        class="px-0 col-sm-9"
                        :placeholder="$t('familyname')"
                        autocomplete="familyname"
                        :disabled="
                          filter.identitydocumentid !== 4 &&
                          filter.identitydocumentid !== 6 &&
                          !person.IsForeigner
                        "
                        v-model="person.familyname"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">
                            {{ v.errors[0] }}
                          </div>
                        </template>
                      </CInput>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col>
                  <ValidationProvider
                    v-slot="v"
                    name="firstname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0">
                      <label
                        class="col-form-label col-sm-3 pl-sm-2 pl-md-0"
                      >
                        {{ $t("firstname") }}
                        <code color="red" style="font-size: 16px">*</code>
                      </label>
                      <CInput
                        :placeholder="$t('firstname')"
                        autocomplete="firstname"
                        v-model="person.firstname"
                        :disabled="
                          filter.identitydocumentid != 4 &&
                          !person.IsForeigner &&
                          filter.identitydocumentid != 6
                        "
                        class="col-sm-9 px-0"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">
                            {{ v.errors[0] }}
                          </div>
                        </template>
                      </CInput>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="12">
                  <ValidationProvider
                    v-slot="v"
                    name="lastname"
                    rules="required"
                  >
                    <div class="form-group form-row m-0">
                      <label
                        class="col-form-label col-sm-3 pl-sm-2 pl-md-0"
                      >
                        {{ $t("lastname") }}
                      </label>
                      <CInput
                        :placeholder="$t('lastname')"
                        autocomplete="lastname"
                        v-model="person.lastname"
                        :disabled="
                          filter.identitydocumentid != 4 &&
                          !person.IsForeigner &&
                          filter.identitydocumentid != 6
                        "
                        class="col-sm-9 px-0"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">
                            {{ v.errors[0] }}
                          </div>
                        </template>
                      </CInput>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="6">
              <b-row>
                <b-col sm="12" md="12" class="mt-2">
                  <ValidationProvider
                    v-slot="v"
                    name="dateofbirth"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3 ml-2 ml-md-0"
                        >{{ $t("dateofbirth") }}
                        <code color="red" style="font-size: 16px"
                          >*</code
                        ></label
                      >
                      <div class="col-sm-9">
                        <el-date-picker
                          v-model="person.dateofbirth"
                          class="w-85"
                          type="date"
                          :disabled="
                            filter.identitydocumentid != 4 &&
                            !person.IsForeigner &&
                            filter.identitydocumentid != 6
                          "
                          :placeholder="$t('dateofbirth')"
                          format="dd.MM.yyyy"
                          value-format="dd.MM.yyyy"
                          :picker-options="pickerOption"
                          v-insert-dots
                        />
                      </div>
                    </div>
                  </ValidationProvider>
                </b-col>
                <b-col sm="12" md="12">
                  <ValidationProvider
                    v-slot="v"
                    name="gender"
                    rules="required"
                  >
                    <div class="form-group form-row">
                      <label
                        class="col-form-label col-sm-3 ml-2 ml-md-0"
                        for
                        >{{ $t("gender") }}
                        <code color="red" style="font-size: 16px">*</code>
                      </label>
                      <v-select
                        class="col-sm-9"
                        :options="GenderList"
                        v-model="person.genderid"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        :disabled="
                          filter.identitydocumentid != 4 &&
                          filter.identitydocumentid != 6
                        "
                        :class="{ danger: v.errors[0] }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">
                            {{ v.errors[0] }}
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </ValidationObserver>
      </CCard>
    </CCardBody>
  </div>
</template>

<script>
import PersonService from "@/services/person.service";
import HelperService from "@/services/helper.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import OrganizationList from "@/components/OrganizationList";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
import CustomDatePicker from "@/components/customDatePicker.vue";

export default {
  name: "editPersonComponent",
  components: { OrganizationList, HistoryDetailInfo, CustomDatePicker },
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
    personId: {
      type: Number,
      default: 0,
    },
    uid: {
      type: String,
      default: "",
    },
    personData: {
      familyname: "",
      firstname: "",
      lastname: "",
      dateofbirth: "",
      genderid: "",
      nationalityid: "",
      citizenshipid: "",
      inn: "",
      pinfl: "",
      birthcountryid: "",
      birthoblastid: "",
      birthregionid: "",
      birthmfyid: "",
      birthaddress: "",
      persontypeid: 1,
      personid: null,
      athleteindicator:null,
      unitofmeasureid:null,
      sportrankid:null,
      PersonRelativeTables: [],
      LivePlaceTables: [],
      DocumentTables: [],
    },
    SportCompetition: {
      type: Object,
      default: null,
    },
    typeForm: {
      type: String,
      default: "JuryCreate",
    },

    model: {
      prop: "personData",
      event: "persondatachange",
    },
  },
  data() {
    return {
      sporttypeclassifierdisciplineids: [],
      sporttypeclassifierdisciplineid: null,
      DocSeriesList: [],
      personlocal: {
        familyname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        genderid: "",
        nationalityid: "",
        citizenshipid: "",
        inn: "",
        pinfl: "",
        birthcountryid: "",
        birthoblastid: "",
        birthregionid: "",
        birthmfyid: "",
        birthaddress: "",
        PersonRelativeTables: [],
        LivePlaceTables: [],
        DocumentTables: [],
        AttachedFiles: [],
      },

      GenderList: [],
      lang: "",
      IdentityDocumentList: [],

      liveplacetabrow: {
        ondate: "",
        countryname: "",
        countryid: 211,
        oblastname: "",
        oblastid: null,
        regionname: "",
        regionid: null,
        mfyid: null,
        address: "",
        stateid: 1,
        Status: 1,
      },

      filter: {
        organizationid: null,
        sporttitleid: null,
        identitydocumentid: 2,
        islocaljury: true,
        positionid: null,
        qualificationcategoryid: null,
        docseries: "",
        docnumber: "",
        inn: "",
        pinfl: "",
        dateofbirth: "",
      },
      pinflLoading: false,
      SaveLoading: false,
      tabIndex: 0,
      today: "",
      CheckResult: false,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";

    this.loadhelper();
   
    this.filteridentitydocumentchange(this.filter);
  },
  computed: {
    getIdentityDocumentList() {
      if (this.typeForm == 'WinnerCreate' || this.typeForm == 'ResultCreate' || this.typeForm == 'AthleteCreate') {
        return this.IdentityDocumentList
      } else {
        return this.IdentityDocumentList.slice(1);
      }
    },
    pickerOption() {
      let self = this
      return {
        firstDayOfWeek: 1,
        disabledDate(time) {
          const currentDate = new Date();
          const year = currentDate.getFullYear() - 16;
          const month = currentDate.getMonth();
          const day = currentDate.getDate();
          let date = new Date(year, month, day);
          if (self.filter.identitydocumentid == 2 || self.filter.identitydocumentid == 5) {
            date.setDate(date.getDate())
          } else {
            date = new Date()
          }
          return date < time.getTime()
        }
      }
    },
    person: {
      get: function () {
        return this.personData ? this.personData : this.personlocal;
      },
      set: function (value) {
        this.personlocal = value;
        this.$emit("persondatachange", value);
        this.liveplacetabrow.countryid = 211;
      },
    },
    isEdit() {
      return this.personId;
    },
  },
  watch: {
    "filter.docseries"(val) {
      if (val) {
        this.filter.docseries = val.toUpperCase();
      }
    },
  },
  directives: {
    insertDots: {
      bind(el) {
        el.addEventListener('input', function(e) {
          const input = e.target;
          const value = input.value;
          const formattedValue = value
            .replace(/[^0-9]/g, '') // Remove non-numeric characters
            .replace(/^(\d{2})(\d{2})(\d{0,4}).*/, '$1.$2.$3') // Insert dots after the second and fourth character
            // .replace(/(\..*)\./g, '$1'); // Remove multiple consecutive dots
          if (formattedValue !== value) {
            input.value = formattedValue;
            input.dispatchEvent(new Event('input'));
          }
        });
      }
    }
  },
  methods: {
    juryTypeChange() {
      if (this.filter.islocaljury) {
        this.filter.identitydocumentid = 2;
      } else {
        this.filter.identitydocumentid = 4;
      }
    },
    disabledForDateofBirth(date) {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      if (this.persontypeid == 1) {
        // alert(date)
        return !(
          date < new Date(yyyy - 7, mm, dd - 21) &&
          date > new Date(yyyy - 20, mm, dd)
        );
      }
    },
    loadhelper() {
      HelperService.GetGenderList(this.lang).then((res) => {
        this.GenderList = res.data;
      });
      IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
        this.DocSeriesList = res.data.result;
      });
      IdentityDocumentService.GetAll().then((res) => {
        this.IdentityDocumentList = res.data.result;
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.rowbreak === true) {
        return "bottom-color-red";
      }
      if (item.Status === 3) {
        return "d-none";
      }
    },
    isCheckDisabled() {
      if (
        ((this.filter.identitydocumentid == 3 ||
          this.filter.identitydocumentid == 4 ||
          this.filter.identitydocumentid == 6) &&
          this.tabIndex == 0) ||
        (this.tabIndex == 0 && this.person.DocumentTables.length == 0)
      ) {
        return true;
      }
    },
    filteridentitydocumentchange(row) {
      if (this.filter.identitydocumentid == 4) {
        this.filter.islocaljury = false;
      } else {
        this.filter.islocaljury = true;
      }
      this.filter.dateofbirth = ''
      this.filter.docseries = ''
    },

    SearchByPinfl() {
      this.pinflLoading = true;
      PersonService.GetFromGovData(
        this.filter.docseries,
        this.filter.docnumber,
        this.filter.pinfl,
        this.filter.dateofbirth,
        this.persontypeid,
        this.filter.inn,
        this.filter.identitydocumentid
      )
        .then((res) => {
          this.pinflLoading = false;
          this.person = res.data;
          
          this.SaveData()
        })
        .catch((error) => {
          this.pinflLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        })
        .finally(() => {
          this.pinflLoading = false;
        })
    },

    check() {
      if (this.typeForm == 'SaffCreate' && !this.filter.positionid) {
        this.makeToast(
          this.$t("positionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!this.person.familyname) {
        this.makeToast(
          this.$t("familynameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!this.person.firstname) {
        this.makeToast(
          this.$t("firstnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (!this.person.dateofbirth) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (!this.person.genderid) {
        this.makeToast(
          this.$t("genderidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      return true;
    },
    SaveData() {
      var self = this;
      if (
        self.filter.identitydocumentid == 4 ||
        self.filter.identitydocumentid == 6
      ) {
        self.person.identitydocumentid = self.filter.identitydocumentid;
        self.person.docnumber = self.filter.docnumber;
        self.person.docseries = self.filter.docseries;
      }
      if (!self.check()) {
        return false;
      }

      if (this.person.id === 0) {
        this.person.persontypeid = this.persontypeid;
      }
    
      this.SaveLoading = true;
      this.person.persontypeid = this.persontypeid;
      this.person.documentnumber = this.filter.docnumber;
      this.person.documentseries = this.filter.docseries;
   
      if (self.check()) {
        let personData = { ...this.person };
        personData.identitydocumentid = this.filter.identitydocumentid;
        this.$emit("save", personData);
        this.SaveLoading = false;
      } else {
        this.person.personid = this.person.id;
        let personData = { ...this.person };
        personData.identitydocumentid = this.filter.identitydocumentid;
        this.$emit("save", personData);
        this.SaveLoading = false;
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
  },
};
</script>
<style lang="scss">
.bottom-color-red {
  border-bottom: 2px solid red;
}
</style>

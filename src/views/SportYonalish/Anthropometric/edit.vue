<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <h3 class="text-center mt-2">
          <!-- <b-icon icon="pencil"></b-icon> -->
          {{ $t("Anthropometric") }}
        </h3>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="docnumber">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    disabled
                    autocomplete="text"
                    v-model="Anthropometric.docnumber"
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
              <CCol sm="4">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="Anthropometric.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('docdate')"
                  disabled
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("Sport turi") }}</label>
                <v-select
                  :options="sporttypeclassifierlist"
                  @input="ChangeSportTypeClassifier"
                  v-model="Anthropometric.sporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol sm="4">
                <label for="datepicker-dateformat2" class="col-form-label">{{
                  $t("sportgroupname")
                }}</label>
                <v-select
                  :options="sportgrouplist"
                  @input="ChangeSportGroup"
                  v-model="Anthropometric.sportgroupid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="sportgroupname"
                ></v-select>
              </CCol>
              <CCol sm="4">
                <div class="form-group">
                  <label for="datepicker-dateformat2" class="col-form-label">{{
                    $t("Sportchi")
                  }}</label>
                  <div>
                    <b-input-group>
                      <b-form-input
                        disabled
                        v-model="Anthropometric.personname"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary" @click="OpenPersonModal">
                          <b-icon icon="three-dots"></b-icon>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol>
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="detail">
                  <label for="datepicker-dateformat2" class="col-form-label">{{
                    $t("basis")
                  }}</label>
                  <CInput
                    autocomplete="text"
                    v-model="Anthropometric.detail"
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
        <b-row class="mt-2">
          <b-col>
            <b-table-simple responsive bordered striped>
              <b-thead>
                <b-tr class="headStyle">
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("№") }}
                  </b-th>
                  <b-th
                    colspan="2"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ $t("anthropometricindicator") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("unitofmeasure") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("oldtindicator") }}
                  </b-th>
                  <b-th class="text-center" style="vertical-align: middle">
                    {{ $t("nextindicator") }}
                  </b-th>
                </b-tr>
              </b-thead>
              <b-tbody v-for="(item, index) in Tables" :key="index">
                <b-tr>
                  <td
                    :rowspan="item.ChildTable.length + 1"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    :rowspan="item.ChildTable.length + 1"
                    :colspan="item.ChildTable.length == 0 ? 2 : 1"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ item.anthropometricindicatorname }}
                    <span v-if="!!item.minstandard && lang != 'ru'">
                      ({{ item.minstandard }}{{ $t("by") }} {{ item.maxstandard
                      }}{{ $t("of") }})</span
                    >
                    <span v-if="!!item.minstandard && lang == 'ru'">
                      ( от {{ item.minstandard }} до
                      {{ item.maxstandard }})</span
                    >
                  </td>
                  <td
                    v-if="item.unitofmeasurename"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ item.unitofmeasurename }}
                  </td>
                  <td
                    v-if="item.unitofmeasurename"
                    class="text-center"
                    style="vertical-align: middle"
                  >
                    {{ item.oldtindicator == null ? "-" : item.oldtindicator }}
                  </td>
                  <td v-if="item.unitofmeasurename">
                    <b-input
                      :class="
                        (item.nextindicator < item.minstandard ||
                          item.nextindicator > item.maxstandard) &&
                        item.nextindicator != null &&
                        item.nextindicator != 0
                          ? 'errorClass'
                          : 'successClass'
                      "
                      style="width: 90%"
                      type="number"
                      @input="changeItem(item)"
                      v-model="item.nextindicator"
                      :placeholder="$t('nextindicator')"
                    ></b-input>
                  </td>
                </b-tr>
                <b-tr v-for="(item1, i) in item.ChildTable" :key="i">
                  <td class="text-center" style="vertical-align: middle">
                    {{ item1.anthropometricindicatorname }}
                    <span v-if="!!item1.minstandard && lang != 'ru'">
                      ({{ item1.minstandard }}{{ $t("by") }}
                      {{ item1.maxstandard }}{{ $t("of") }})</span
                    >
                    <span v-if="!!item1.minstandard && lang == 'ru'">
                      ( от {{ item1.minstandard }} до
                      {{ item1.maxstandard }})</span
                    >
                  </td>
                  <td class="text-center" style="vertical-align: middle">
                    {{ item1.unitofmeasurename }}
                  </td>
                  <td class="text-center" style="vertical-align: middle">
                    {{
                      item1.oldtindicator == null ? "-" : item1.oldtindicator
                    }}
                  </td>
                  <td>
                    <b-input
                      :class="
                        (item1.nextindicator < item1.minstandard ||
                          item1.nextindicator > item1.maxstandard) &&
                        item1.nextindicator != null &&
                        item1.nextindicator != 0
                          ? 'errorClass'
                          : 'successClass'
                      "
                      style="width: 90%"
                      @input="changeItem1(item1)"
                      v-model="item1.nextindicator"
                      type="number"
                      :placeholder="$t('nextindicator')"
                    ></b-input>
                  </td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'Anthropometric' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                :disabled="SaveLoading"
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
        </CRow>
      </CCard>
      <b-modal
        id="PersonModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <sportsmen-list
          :sportgroupid="Anthropometric.sportgroupid"
          :sporttypeclassifierid="Anthropometric.sporttypeclassifierid"
          isallperson="false"
          @SelectedItem="SelectedItem"
          @DblClick="AddPersonData"
        ></sportsmen-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPersonData(studentvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>
    
<script>
import AnthropometricService from "@/services/Anthropometric.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportsmenList from "@/components/SportsmenList";
import EmployeeList from "@/components/EmployeeList";
import SportGroupService from "@/services/SportGroup.service";
import PersonList from "@/components/PersonList";
import SchoolYearService from "@/services/SchoolYear.service";
import FormingSportGroupService from "@/services/FormingSportGroup.service";
export default {
  components: {
    EmployeeList,
    PersonList,
    SportsmenList,
  },
  data() {
    return {
      SaveLoading: false,
      fileLoading: false,
      DownloadLoading: false,
      DeleteLoading: false,
      studentvalue: {},
      sportgrouplist: [],
      spinnerindex: 0,
      Anthropometric: {},
      sporttypeclassifierlist: [],
      Tables: [,],
      TitleFileTypeList: [],
      sporttitlelist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      selectedrowid: 0,
      configid: 0,
      filename: "",
      SchoolYearID: 0,
      lang: "ru",
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    SchoolYearService.GetDefault().then((res) => {
      this.SchoolYearID = res.data.id;
    });
    self.selectedrowid = self.$route.params.id;
    AnthropometricService.Get(self.selectedrowid).then((res) => {
      self.Anthropometric = res.data;
      self.Tables = res.data.anthropometricTable;
      if (!!self.Anthropometric.sporttypeclassifierid) {
        SportGroupService.GetAll(
          self.Anthropometric.sporttypeclassifierid,
          0,
          self.SchoolYearID,
          true
        ).then((res) => {
          self.sportgrouplist = res.data;
        });
      }
    });
    SportTypeClassifierService.GetAll(
      this.$can("AdminView", "permissions")
    ).then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
  },
  methods: {
    OpenPersonModal() {
      var self = this;
      self.$bvModal.show("PersonModal");
    },
    ChangeSportTypeClassifier() {
      this.Anthropometric.sportgroupid = 0;
      this.Anthropometric.personid = 0;
      this.Anthropometric.personname = "";
      if (!!this.Anthropometric.sporttypeclassifierid) {
        SportGroupService.GetAll(
          this.Anthropometric.sporttypeclassifierid,
          0,
this.SchoolYearID,
          true
        ).then((res) => {
          this.sportgrouplist = res.data;
        });
      }
    },
    ClosePersonModal() {
      this.$bvModal.hide("PersonModal");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    ChangeSportGroup() {
      console.log(this.Anthropometric.sportgroupid)
      this.Anthropometric.personid = 0;
      this.Anthropometric.personname = "";
    },
    AddPersonData(data) {
      var self = this;
      console.log(data);
      self.Anthropometric.personid = data.personid;
      self.Anthropometric.personname = data.personname;
      self.Anthropometric.sportgroupid = data.sportgroupid;
      self.Anthropometric.sportgroupname = data.sportgroupname;
      self.Anthropometric.sporttypeclassifierid = data.sporttypeclassifierid;
      self.Anthropometric.sporttypeclassifiername =
        data.sporttypeclassifiername;
        if (!!self.Anthropometric.sporttypeclassifierid) {
        SportGroupService.GetAll(
          self.Anthropometric.sporttypeclassifierid,
          0,
          self.SchoolYearID,
          true
        ).then((res) => {
          self.sportgrouplist = res.data;
        });
      }
      self.ClosePersonModal();
    },
    changeOblast() {
      if (this.Anthropometric.oblastid != 0) {
        RegionService.GetAll(this.lang, this.Anthropometric.oblastid).then(
          (res) => {
            this.regionlist = res.data;
          }
        );
      }
    },
    check() {
      var self = this;
      if (
        self.Anthropometric.docnumber === null ||
        self.Anthropometric.docnumber === undefined ||
        self.Anthropometric.docnumber === 0 ||
        self.Anthropometric.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Anthropometric.docdate === null ||
        self.Anthropometric.docdate === undefined ||
        self.Anthropometric.docdate === 0 ||
        self.Anthropometric.docdate === ""
      ) {
        self.makeToast(
          self.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Anthropometric.sporttypeclassifierid === null ||
        self.Anthropometric.sporttypeclassifierid === undefined ||
        self.Anthropometric.sporttypeclassifierid === 0
      ) {
        self.makeToast(
          self.$t("circlesporttypeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Anthropometric.sportgroupid === null ||
        self.Anthropometric.sportgroupid === undefined ||
        self.Anthropometric.sportgroupid === 0
      ) {
        self.makeToast(
          self.$t("fromsportgroupcategorytypeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Anthropometric.personid === null ||
        self.Anthropometric.personid === undefined ||
        self.Anthropometric.personid === 0
      ) {
        self.makeToast(
          self.$t("SportsmanNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    check1() {
      var errBool = true;
      var errArr = [];
      var errors = this.Tables.forEach((item) => {
        console.log(item);
        if (
          item.ChildTable.length == 0 &&
          (item.nextindicator < item.minstandard ||
            item.nextindicator > item.maxstandard) &&
          item.nextindicator != 0 &&
          item.nextindicator != null
        ) {
          errBool = false;
          errArr.push({ ...item, parentname: null });
        } else {
          item.ChildTable.forEach((el) => {
            if (
              (el.nextindicator < el.minstandard ||
                el.nextindicator > el.maxstandard) &&
              el.nextindicator != 0 &&
              el.nextindicator != null
            ) {
              errBool = false;
              errArr.push({
                ...el,
                parentname: item.anthropometricindicatorname,
              });
            }
          });
        }
      });
      return { errBool, errArr };
    },
    check2() {
      this.Tables.forEach(function (el) {
        console.log(el);
        var errorChild = el;
        errorChild.ChildTable.filter(
          (el) =>
            el.nextindicator < el.minstandard ||
            el.nextindicator > el.maxstandard
        );
      });
      if (errorChild.length > 0) {
        this.makeToast(
          this.$t("indicatorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } else {
        return true;
      }
    },
    changeItem1(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },
    changeItem(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },

    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.SaveLoading = true;
      self.Anthropometric.anthropometricTable = self.Tables;
      if (!self.check1().errBool) {
        self.check1().errArr.forEach((err) => {
          console.log(err);
          self.makeToast(
            self.$t("indicatornotcorrect", {
              parentname: err.parentname,
              errorTranslate: err.anthropometricindicatorname,
              errorTranslate1: err.unitofmeasurename,
              old: err.maxstandard,
              next: err.minstandard,
            }),
            self.$t("Error"),
            "danger"
          );
        });
        return false;
      }
      self.Anthropometric.anthropometricTable.forEach(function (item) {
        if (item.Status == 0) {
          item.Status = 1;
        }
        if (item.ChildTable.length > 0) {
          item.ChildTable.forEach(function (el) {
            if (el.Status == 0) {
              el.Status = 1;
            }
          });
        }
      });
      AnthropometricService.Update(self.Anthropometric)
        .then((res) => {
          self.SaveLoading = false;
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "Anthropometric",
          });
        })
        .catch((error) => {
          self.SaveLoading = true;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
  },
  watch: {},
};
</script>
    
<style scoped>
.errorClass {
  border: 1.5px solid rgb(228, 100, 100);
}
.successClass {
  border: 1.5px solid rgb(139, 236, 95);
}
</style>
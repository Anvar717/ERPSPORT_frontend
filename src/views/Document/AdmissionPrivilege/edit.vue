<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <h3 class="text-center mt-2">
          <!-- <b-icon icon="pencil"></b-icon> -->
          {{ $t("AdmissionPrivilege") }}
        </h3>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3">
                <label>{{ $t("docnumber") }}</label>
                <CInput autocomplete="text" type="number" v-model="AdmissionPrivilege.docnumber"></CInput>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("docdate") }}</label>
                <custom-date-picker v-model="AdmissionPrivilege.docdate" size="sm" lang="ru" :placeholder="$t('date')"
                  value-type="format" format="DD.MM.YYYY" style="width:100%"></custom-date-picker>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("SchoolYear") }}</label>
                <v-select :options="SchoolYearList" v-model="AdmissionPrivilege.schoolyearid" :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')" label="name"></v-select>
              </CCol>
              <!-- <CCol sm="3">
                <label>{{ $t("organization") }}</label>
                <v-select
                  :options="OrganizationList"
                  v-model="AdmissionPrivilege.organizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol> -->
              <CCol sm="3">
                <label>{{ $t("organizationtype") }}</label>
                <v-select :options="organizationtypelist" @input="ChangeOrgType" v-model="AdmissionPrivilege.organizationtypeid"
                  :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
              </CCol>
              <CCol sm="3" v-if="AdmissionPrivilege.organizationtypeid == 6">
                <label>{{ $t("schooltype") }}</label>
                <v-select :options="schooltypelist" v-model="AdmissionPrivilege.schooltypeid" :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')" label="name"></v-select>
              </CCol>
            </CRow>
            <CRow class="mt-2">
              <CCol class="text-right mr-3 mb-3">
                <CButton size="sm" color="primary" @click="OpenModal">
                  <b-icon icon="plus"></b-icon>
                  {{ $t("Add") }}
                </CButton>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("SportLevel") }}</template>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("privilegelevelname") }}</label>
                <v-select :options="privilegelevellist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="privilegelevelname" class="col-sm-9" v-model="tabrow.privilegelevelid"
                  @input="ChangePriveligelevel"></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("privilegeresulttypename") }}</label>
                <v-select :options="privilegeresulttypelist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="resulttypename" class="col-sm-9" v-model="tabrow.privilegeresulttypeid"
                  @input="ChangePriveligeResultType"></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 1">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                    $t("startdate")
                  }}
                </label>
                <date-picker v-model="tabrow.startdate" style="width: 100%" size="sm" lang="ru"
                  :placeholder="$t('startdate')" value-type="format" format="DD.MM.YYYY" class="col-sm-9"></date-picker>
              </div>
            </b-col>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 1">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">
                  {{
                    $t("enddate")
                  }}
                </label>
                <date-picker v-model="tabrow.enddate" style="width: 100%" size="sm" lang="ru" :placeholder="$t('enddate')"
                  value-type="format" format="DD.MM.YYYY" class="col-sm-9"></date-picker>
              </div>
            </b-col>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 1">
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("sporteventtype") }}</label>
                <v-select :options="sporteventtypelist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="name" class="col-sm-9" v-model="tabrow.sporteventtypeid"
                  @input="ChangeSportEventType"></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 1">
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("competitiontype") }}</label>
                <v-select :options="competitiontypelist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="name" class="col-sm-9" v-model="tabrow.competitiontypeid"
                  @input="ChangeSportCompetitionType"></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 1">
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("SportRank") }}</label>
                <v-select :options="ranklist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"
                  class="col-sm-9" v-model="tabrow.rankid" @input="ChangeRank"></v-select>
              </div>
            </CCol>
          </CRow>


          <CRow v-if="tabrow.privilegeresulttypeid == 2">
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("sporttitle") }}</label>
                <v-select :options="sporttitlelist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="name" class="col-sm-9" v-model="tabrow.sporttitleid" @input="ChangeSportTitle"></v-select>
              </div>
            </CCol>
          </CRow>
          <CRow v-if="tabrow.privilegeresulttypeid == 3">
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{ $t("SportTeamSquadLevel") }}</label>
                <v-select :options="teamsquadlevellist" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')"
                  label="name" class="col-sm-9" v-model="tabrow.teamsquadlevelid"
                  @input="ChangeTeamSquadLevel"></v-select>
              </div>
            </CCol>
          </CRow>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <b-table :fields="Fields" :items="AdmissionPrivilege.admissionPrivilegeTable"
              class="bg-color-table text-center mx-3" style="vertical-align: middle" bordered responsive="sm"
              :tbody-tr-class="rowClass">
              <template v-slot:cell(index)="{ index }">
                <p class="m-0">{{ index + 1 }}</p>
              </template>
              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{ content: $t('Edit') }">
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link class="mr-2" v-c-tooltip="{ content: $t('Delete') }" @click="DeleteItem(item)">
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="$router.push({ name: 'AdmissionPrivilege' })">
                <b-icon icon="arrow-left-short"></b-icon>
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
    </CCol>
  </CRow>
</template>

<script>
import AdmissionPrivilegeService from "@/services/AdmissionPrivilege.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import OrganizationService from "@/services/organization.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportRankService from "@/services/SportRank.service";
import SportTitleService from "@/services/SportTitle.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import HelperService from "@/services/helper.service";
export default {
  components: {
    CustomDatePicker
  },
  data() {
    return {
      SaveLoading: false,
      AdmissionPrivilege: {},
      OrganizationList: [],
      organizationtypelist: [],
      schooltypelist: [],
      SchoolYearList: [],
      sporteventtypelist: [],
      competitiontypelist: [],
      ranklist: [],
      privilegelevellist: [],
      privilegeresulttypelist: [],
      sporttitlelist: [],
      teamsquadlevellist: [],
      selectedrowid: 0,

      Fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          tdClass: "text-left",
          thClass: "text-center"
        },
        {
          key: "privilegelevelname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("privilegelevelname")
        },
        {
          key: "privilegeresulttypename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("privilegeresulttypename")
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          tdClass: "text-left",
          thClass: "text-center"
        },
        {
          key: "enddate",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("enddate")
        },
        {
          key: "sporteventtypename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporteventtype")
        },
        {
          key: "competitiontypename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("competitiontype")
        },
        {
          key: "rankname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SportRank")
        },
        

        {
          key: "sporttitlename",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("sporttitle")
        },
        {
          key: "teamsquadlevelname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("SportTeamSquadLevel")
        },
        {
          key: "actions",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("actions")
        }
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        competitiontypeid: 0,
        competitiontypename: "",
        rankid: 0,
        rankname: "",
        privilegelevelid: 0,
        privilegelevelname: "",
        privilegeresulttypeid: 0,
        privilegeresulttypename: "",
        sporttitleid: 0,
        sporttitlename: "",
        teamsquadlevelid: 0,
        teamsquadlevelname: "",
        Status: 1
      },
      editedIndex: -1,
      isDisabled: false
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    AdmissionPrivilegeService.Get(self.selectedrowid).then(res => {
      self.AdmissionPrivilege = res.data;
      res.data;
    });
    OrganizationService.GetAll().then(res => {
      self.OrganizationList = res.data;
    });
    SchoolYearService.GetAll().then(res => {
      this.SchoolYearList = res.data;
    });
    OrganizationTypeService.GetAll().then(res => {
      this.organizationtypelist = res.data;
    });
    SchoolTypeService.GetAll().then(res => {
      this.schooltypelist = res.data;
    });
    SportEventTypeService.GetAll().then(res => {
      this.sporteventtypelist = res.data;
    });

    SportRankService.GetAll().then(res => {
      this.ranklist = res.data;
    });
    SportTitleService.GetAll(true).then(res => {
      this.sporttitlelist = res.data;
    });
    HelperService.GetAllPrivilegeResultType().then(res => {
      this.privilegeresulttypelist = res.data;
    });
    HelperService.GetAllPrivilegeLevel().then(res => {
      this.privilegelevellist = res.data;
    });
    SportTeamSquadLevelService.GetAll().then(res => {
      this.teamsquadlevellist = res.data;
    });
  },
  methods: {
    ChangeOrgType() {
      this.AdmissionPrivilege.schooltypeid = 0
    },
    OpenModal() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },
    check() {
      var self = this;
      if (
        self.AdmissionPrivilege.docnumber === null ||
        self.AdmissionPrivilege.docnumber === undefined ||
        self.AdmissionPrivilege.docnumber === 0 ||
        self.AdmissionPrivilege.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AdmissionPrivilege.docdate === null ||
        self.AdmissionPrivilege.docdate === undefined ||
        self.AdmissionPrivilege.docdate === 0 ||
        self.AdmissionPrivilege.docnumber === ""
      ) {
        self.makeToast(
          self.$t("docdateNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AdmissionPrivilege.schoolyearid === null ||
        self.AdmissionPrivilege.schoolyearid === undefined ||
        self.AdmissionPrivilege.schoolyearid === 0 ||
        self.AdmissionPrivilege.schoolyearid === ""
      ) {
        self.makeToast(
          self.$t("schoolyearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.AdmissionPrivilege.organizationid === null ||
      //   self.AdmissionPrivilege.organizationid === undefined ||
      //   self.AdmissionPrivilege.organizationid === 0 ||
      //   self.AdmissionPrivilege.organizationid === ""
      // ) {
      //   self.makeToast(
      //     self.$t("organizationNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.AdmissionPrivilege.organizationtypeid === null ||
        self.AdmissionPrivilege.organizationtypeid === undefined ||
        self.AdmissionPrivilege.organizationtypeid === 0 ||
        self.AdmissionPrivilege.organizationtypeid === ""
      ) {
        self.makeToast(
          self.$t("organizationtypeNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AdmissionPrivilege.organizationtypeid == 6 &&
        (self.AdmissionPrivilege.schooltypeid === null ||
          self.AdmissionPrivilege.schooltypeid === undefined ||
          self.AdmissionPrivilege.schooltypeid === 0 ||
          self.AdmissionPrivilege.schooltypeid === "")
      ) {
        self.makeToast(
          self.$t("schooltypeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      AdmissionPrivilegeService.Update(self.AdmissionPrivilege)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "AdmissionPrivilege"
          });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.AdmissionPrivilege.admissionPrivilegeTable[this.editedIndex],
          this.tabrow
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.AdmissionPrivilege.admissionPrivilegeTable.indexOf(
        item
      );
      
      this.tabrow = Object.assign({}, item);
      this.getCompetitionTypeList()
      this.$bvModal.show("AddModal");
    },

    DeleteItem(item) {
      item.Status = 3;
    },
    Add() {
      var self = this;
      self.tabrow;
      //   if (
      //     self.tabrow.schooltypeid === "" ||
      //     self.tabrow.schooltypeid === undefined ||
      //     self.tabrow.schooltypeid === null ||
      //     self.tabrow.schooltypeid === 0
      //   ) {
      //     self.makeToast(
      //       self.$t("schooltypeNotCorrect"),
      //       self.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      self.AdmissionPrivilege.admissionPrivilegeTable.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        competitiontypeid: 0,
        competitiontypename: "",
        rankid: 0,
        rankname: "",
        privilegelevelid: 0,
        privilegelevelname: "",
        privilegeresulttypeid: 0,
        privilegeresulttypename: "",
        sporttitleid: 0,
        sporttitlename: "",
        teamsquadlevelid: 0,
        teamsquadlevelname: "",
        Status: 1
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          startdate: "",
          enddate: "",
          sporteventtypeid: 0,
          sporteventtypename: "",
          competitiontypeid: 0,
          competitiontypename: "",
          rankid: 0,
          rankname: "",
          privilegelevelid: 0,
          privilegelevelname: "",
          privilegeresulttypeid: 0,
          privilegeresulttypename: "",
          sporttitleid: 0,
          sporttitlename: "",
          teamsquadlevelid: 0,
          teamsquadlevelname: "",
          Status: 1
        };
        this.editedIndex = -1;
      });
    },
    ChangeSportEventType() {
      this.tabrow.competitiontypeid = 0
      this.competitiontypelist = []
      this.tabrow.sporteventtypename = this.sporteventtypelist.filter(
        item => this.tabrow.sporteventtypeid === item.id
      )[0].name;
      this.getCompetitionTypeList()
    },
    getCompetitionTypeList() {
      CompetitionTypeService.GetAll(this.tabrow.sporteventtypeid).then(res => {
        this.competitiontypelist = res.data;
      });
    },
    ChangeSportCompetitionType() {
      this.tabrow.competitiontypename = this.competitiontypelist.filter(
        item => this.tabrow.competitiontypeid === item.id
      )[0].name;
    },
    ChangeRank() {
      this.tabrow.rankname = this.ranklist.filter(
        item => this.tabrow.rankid === item.id
      )[0].name;
    },
    ChangePriveligelevel() {
      this.tabrow.privilegelevelname = this.privilegelevellist.filter(
        item => this.tabrow.privilegelevelid === item.id
      )[0].privilegelevelname;
    },
    ChangePriveligeResultType() {
      this.tabrow.privilegeresulttypename = this.privilegeresulttypelist.filter(
        item => this.tabrow.privilegeresulttypeid === item.id
      )[0].resulttypename;
    },
    ChangeSportTitle() {
      this.tabrow.sporttitlename = this.sporttitlelist.filter(
        item => this.tabrow.sporttitleid === item.id
      )[0].name;
    },
    ChangeTeamSquadLevel() {
      this.tabrow.teamsquadlevelname = this.teamsquadlevellist.filter(
        item => this.tabrow.teamsquadlevelid === item.id
      )[0].name;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
        solid: true
      });
    }
  },
  watch: {}
};
</script>

<style></style>
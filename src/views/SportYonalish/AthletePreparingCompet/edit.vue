<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("AthletePreparingCompet") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" lg="4">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="AthletePreparingCompet.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <label for="datepicker-dateformat2">{{
                    $t("docdate")
                  }}</label>
                  <date-picker
                    v-model="AthletePreparingCompet.docdate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>

              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubject"
                  rules="required"
                >
                  <label for>{{ $t("sporttypeclassifier") }}</label>
                  <v-select
                    :options="sporttypeclassifierlist"
                    v-model="AthletePreparingCompet.sporttypeclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubject"
                  rules="required"
                >
                  <label for>{{ $t("sportevent") }}</label>
                  <v-select
                    :options="sporteventlist"
                    v-model="AthletePreparingCompet.sporteventid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubject"
                  rules="required"
                >
                  <label for>{{ $t("SportTeamType") }}</label>
                  <v-select
                    :options="sportteamtypelist"
                    v-model="AthletePreparingCompet.sportteamtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="schoolsubject"
                  rules="required"
                >
                  <label for>{{ $t("gender") }}</label>
                  <v-select
                    :options="genderlist"
                    v-model="AthletePreparingCompet.genderid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
          <b-row class="mt-3">
            <b-col sm="4">
              <label>
                {{ $t("personname1") }}
              </label>
              <CInput
                class="mr-2"
                style="width: 100%"
                disabled
                v-model="AthletePreparingCompet.personname"
              >
                <template #append>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenStudentModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </template>
              </CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col class="text-right">
              <b-button variant="primary" @click="OpenCoachModal">
                {{ $t("Add") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-table
                :fields="Coachfields"
                :items="AthletePreparingCompet.athletepreparingcompetcoach"
                class="bg-color-table text-center p-0"
                style="vertical-align: middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:empty>
                  <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                </template>
                <template #cell(actions)="{ item }">
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
            </b-col>
          </b-row>
          <b-row class="mt-3" v-if="AthletePreparingCompet.personname">
            <b-col sm="12" md="1" lg="1"></b-col>
            <b-col sm="12" md="10" lg="10" class="card__1">
              <h4 style="text-align: center" class="divider">
                {{ $t("Sportchi ma'lumotlari") }}
              </h4>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("personname1") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ AthletePreparingCompet.personname }}</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("dateofbirth") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ FormingTeamSquadData.dateofbirth }}</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("documentseries") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ FormingTeamSquadData.documentseries }}</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("sporttitlename") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ FormingTeamSquadData.sporttitlename }}</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("sportorganization") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ FormingTeamSquadData.sportorganizationname }}</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col sm="12" md="3" lg="3">
                  <div>
                    <h5>{{ $t("AthleticAchievement") }}:</h5>
                  </div>
                </b-col>
                <b-col sm="12" md="9" lg="9">
                  <h5>{{ FormingTeamSquadData.athleticachievement }}</h5>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="1" lg="1"></b-col>
          </b-row>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'AthletePreparingCompet' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" :disabled="issavedisabled" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal
        id="StudentModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <forming-team-squad-list
          :sportteamtypeid="AthletePreparingCompet.sportteamtypeid"
          :sporttypeclassifierid="AthletePreparingCompet.sporttypeclassifierid"
          :genderid="AthletePreparingCompet.genderid"
          @SelectedItem="SelectedItem"
          @DblClick="AddStudentData"
        ></forming-team-squad-list>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseStudentModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddStudentData(studentvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        v-model="AddCoachModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('tabrow')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("Coach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="tabrow.personname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenTrenerModal"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("position") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="positionlist"
                  v-model="tabrow.positionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseTableModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="CoachModal"
        no-close-on-backdrop
        size="xl"
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="2"
          @SelectedItem="SelectedItemCoach"
          @DblClick="AddCoachData"
          isallperson="true"
          isRefresh="2"
        ></person-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseCoachModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachData(coachvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>
  
  <script>
import AthletePreparingCompetService from "@/services/AthletePreparingCompet.service";
import SportEventService from "@/services/SportEvent.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTeamTypeService from "@/services/SportTeamType.service";
import HelperService from "@/services/helper.service";
import FormingTeamSquadList from "@/components/FormingTeamSquadList";
import FormingTeamSquadService from "@/services/FormingTeamSquad.service";
import PositionService from "@/services/Position.service";
import PersonList from "@/components/PersonList";
export default {
  components: { FormingTeamSquadList, PersonList },
  data() {
    return {
      sporteventlist: [],
      sporttypeclassifierlist: [],
      sportteamtypelist: [],
      formingteamsquadlist: [],
      genderlist: [],
      positionlist: [],
      teamSquadCoach: {},
      teamSquadCoachTables: [],
      FormingTeamSquadData: {},
      coachvalue: {},
      SaveLoading: false,
      issavedisabled: false,
      AddCoachModal: false,
      editedIndex: -1,
      tabrow: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      },
      AthletePreparingCompet: {},
      studentvalue: {},
      lang: "",
      fields: [
        {
          key: "qualschoolsubjectname",
          label: this.$t("qualschoolsubject"),
        },
        {
          key: "isallschoolgrade",
          label: this.$t("isallschoolgrade"),
        },
        {
          key: "schoolgradegroupname",
          label: this.$t("schoolgradegroup"),
        },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      Coachfields: [
        {
          key: "positionname",
          label: this.$t("positionname"),
        },
        {
          key: "personname",
          label: this.$t("Coach"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    AthletePreparingCompetService.Get(this.$route.params.id).then((res) => {
      this.AthletePreparingCompet = res.data;
      if (this.$route.params.id > 0) {
        this.GetStudentData();
      }
    });
    SportEventService.GetAll().then((res) => {
      this.sporteventlist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    SportTeamTypeService.GetAll().then((res) => {
      this.sportteamtypelist = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    PositionService.GetAll(0, 0, false, 0).then((res) => {
      this.positionlist = res.data;
      console.log(this.positionlist);
    });
  },

  computed: {},
  mounted() {},
  methods: {
    OpenCoachModal() {
      this.AddCoachModal = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      };
    },
    OpenTrenerModal() {
      this.$bvModal.show("CoachModal");
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    AddStudentData(data) {
      this.AthletePreparingCompet.personid = data.personid;
      this.AthletePreparingCompet.personname = data.personname;
      this.AthletePreparingCompet.formingteamsquadid = data.formingteamsquadid;
      this.StudentData();
      this.CloseStudentModal();
    },
    StudentData() {
      FormingTeamSquadService.GetFormingTeamSquadAthleteInfo(
        this.AthletePreparingCompet.personid,
        this.AthletePreparingCompet.sporttypeclassifierid,
        this.AthletePreparingCompet.formingteamsquadid
      ).then((res) => {
        var self = this;
        self.FormingTeamSquadData = res.data;
        self.FormingTeamSquadData.dateofbirth = res.data.person.dateofbirth;
        self.FormingTeamSquadData.documentseries = res.data.person.DocumentTables[0].documentseries;
        console.log(self.FormingTeamSquadData);
        res.data.teamSquadCoachTables?.forEach((item) => {
          let temp = {
            id: 0,
            ownerid: 0,
            positionid: item.positionid,
            positionname: item.positionname,
            personid: item.personid,
            personname: item.personname,
            Status: 1,
          };
          self.AthletePreparingCompet.athletepreparingcompetcoach.push(temp);
        });
      });
      
    },
    GetStudentData() {
      FormingTeamSquadService.GetFormingTeamSquadAthleteInfo(
        this.AthletePreparingCompet.personid,
        this.AthletePreparingCompet.sporttypeclassifierid,
        this.AthletePreparingCompet.formingteamsquadid
      ).then((res) => {
        var self = this;
        self.FormingTeamSquadData = res.data;
        self.FormingTeamSquadData.dateofbirth = res.data.person.dateofbirth;
        self.FormingTeamSquadData.documentseries = res.data.person.DocumentTables[0].documentseries;
      });
      
    },
    CloseTableModal() {
      this.AddCoachModal = false;
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          positionid: 0,
          positionname: "",
          personid: 0,
          personname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    OpenStudentModal() {
      this.$bvModal.show("StudentModal");
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    AddCoachData(data) {
      this.tabrow.personname = data.fullname;
      this.tabrow.personid = data.id;
      this.tabrow.positionid = data.dateofbirth;
      this.tabrow.positionname = data.documentseries;
      this.CloseCoachModal();
    },
    AddCoachTable() {
      var self = this;
      if (!!self.tabrow.positionid) {
        self.tabrow.positionname = self.positionlist.filter(
          (item) => item.id === self.tabrow.positionid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.AthletePreparingCompet.athletepreparingcompetcoach[
            self.editedIndex
          ],
          self.tabrow
        );
      } else {
        self.AthletePreparingCompet.athletepreparingcompetcoach.push(
          self.tabrow
        );
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      };
      this.AddCoachModal = false;
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex =
        this.AthletePreparingCompet.athletepreparingcompetcoach.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.AddCoachModal = true;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    OpenModal() {
      this.tableModal = true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    SelectedItem(data) {
      this.studentvalue = data;
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
    SaveData() {
      this.issavedisabled = true;
      AthletePreparingCompetService.Update(this.AthletePreparingCompet)
        .then((res) => {
          this.issavedisabled = false;
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "AthletePreparingCompet" });
        })
        .catch((error) => {
          this.issavedisabled = false;
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
  
  <style scoped>
.card__1 {
  margin-top: 20px;
  height: 350px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
}
.divider {
  margin-top: 15px;
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
</style>
  
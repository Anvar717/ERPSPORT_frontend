<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("FormingTeamSquad") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row>
                <b-col sm="6" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("SportTeamSquadLevel") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.sportteamsquadlevelname }} </b>
                        </b-td>
                      </b-tr>
                       <b-tr v-if="FormingTeamSquad.sportteamsquadlevelid == 3">
                        <b-td>
                          <span>{{ $t("oblast") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{FormingTeamSquad.oblastname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr v-if="FormingTeamSquad.sportteamsquadlevelid == 2 || FormingTeamSquad.sportteamsquadlevelid == 3">
                        <b-td>
                          <span>{{ $t("region") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.regionname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="6" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                       <b-tr>
                        <b-td>
                          <span>{{ $t("sportteamsquadtype") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.sportteamsquadtypename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("sporttypeclassifier") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.sporttypeclassifiername }} </b>
                        </b-td>
                      </b-tr>
                       <b-tr>
                        <b-td>
                          <span>{{ $t("gender") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.gendername }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingTeamSquad.statusname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col cols="12" md="2">
                  <b-button
                    @click="Back"
                    size="sm"
                    variant="danger"
                    class="w-100 mb-1"
                  >
                    <b-icon-arrow-left-short scale="1.7" />
                    {{ $t("back") }}
                  </b-button>
                  <b-button
                    v-if="$can('FormingTeamSquadApprove', 'permissions') && FormingTeamSquad.CanApprove"
                    @click="OpenApproveModal"
                    size="sm"
                    variant="primary"
                    class="w-100 mb-1"
                  >
                    <b-icon scale="1.4" icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </b-button>
                  <b-button
                    v-if="
                      $can('FormingTeamSquadCancelApproval', 'permissions') && FormingTeamSquad.CanCancelApproval
                    "
                    @click="OpenCancelApproveModal"
                    size="sm"
                    style="background-color:firebrick; color: #fff;"
                    class="w-100 mb-1"
                  >
                    <b-icon icon="x" scale="1.5"></b-icon>
                    {{ $t("CancelApproval") }}
                  </b-button>
                </b-col>
                <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
                  <template #modal-title>
                    {{ $t("Approve") }}
                    <b-spinner v-if="ApproveLoading" small></b-spinner>
                  </template>
                  <!-- <b-row>
          <b-col>
            <label for=""> {{ $t('documentseries') }} </label>
            <b-form-input v-model="ApproveData.documentseries"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <label for=""> {{ $t('docnumber') }} </label>
            <b-form-input v-model="ApproveData.documentnumber"></b-form-input>
          </b-col>
        </b-row> -->
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ FormingTeamSquad.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ FormingTeamSquad.personname }}
                      </h5></span
                    >
                    <h5>{{ $t("WantApprove") }}</h5>
                  </b-card-text>
                  <b-row>
                    <b-col class="text-right">
                      <b-button
                        class="mr-2"
                        variant="danger"
                        @click="$refs['ApproveModal'].hide()"
                      >
                        {{ $t("Cancel") }}
                      </b-button>
                      <b-button variant="success" @click="Approve">
                        {{ $t("Accept") }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-modal>
                <b-modal
                  :ref="'CancelApprovalModal'"
                  hide-footer
                  no-close-on-backdrop
                >
                  <template #modal-title>
                    {{ $t("CancelApproval") }}
                    <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
                  </template>
                  <!-- <b-row>
          <b-col>
            <label for=""> {{ $t('documentseries') }} </label>
            <b-form-input v-model="CancelApproveData.documentseries"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <label for=""> {{ $t('docnumber') }} </label>
            <b-form-input v-model="CancelApproveData.documentnumber"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <label for=""> {{ $t('Reason') }} </label>
            <b-form-textarea v-model="CancelApproveData.returnReason"></b-form-textarea>
          </b-col>
        </b-row> -->
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ FormingTeamSquad.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ FormingTeamSquad.personname }}
                      </h5></span
                    >
                    <h5>{{ $t("WantCancelApproval") }}</h5>
                  </b-card-text>
                  <b-row>
                    <b-col class="text-right">
                      <b-button
                        class="mr-2"
                        variant="danger"
                        @click="$refs['CancelApprovalModal'].hide()"
                      >
                        {{ $t("Cancel") }}
                      </b-button>
                      <b-button variant="success" @click="CancelApproval">
                        {{ $t("Accept") }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-modal>
              </b-row>
              <!-- <b-row class="mr-1 mb-2">
              <b-col class="text-right">
                <b-button variant="primary" @click="OpenAddModal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row> -->
             <b-row class="mt-3">
        <b-col>
          <b-tabs>
            <b-tab active class="ml-2">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("Main") }}
              </template>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Sportfields"
                    :items="FormingTeamSquad.AthleteTeamtype1Tables"
                    class="bg-color-table text-center mx-3"
                    style="vertical-align: middle"
                    bordered
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:empty>
                      <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                    </template>
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span>
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                    <template v-slot:cell(isotherworkorganization)="{ item }">
                      <div>
                        <b-badge
                          :variant="getItemColor(item.isotherworkorganization)"
                          >{{
                            item.isotherworkorganization ? "Да" : "Нет"
                          }}</b-badge
                        >
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="ml-2">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("Reserve") }}
              </template>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Sportfields"
                    :items="FormingTeamSquad.AthleteTeamtype2Tables"
                    class="bg-color-table text-center mx-3"
                    style="vertical-align: middle"
                    bordered
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:empty>
                      <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                    </template>
                    <template v-slot:cell(isotherworkorganization)="{ item }">
                      <div>
                        <b-badge
                          :variant="getItemColor(item.isotherworkorganization)"
                          >{{
                            item.isotherworkorganization ? "Да" : "Нет"
                          }}</b-badge
                        >
                      </div>
                    </template>
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span> 
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="ml-2">
              <template slot="title">
                <b-icon icon="person-check"></b-icon>
                {{ $t("TrainerName") }}
              </template>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Coachfields"
                    :items="FormingTeamSquad.CoachTables"
                    class="bg-color-table text-center mx-3"
                    style="vertical-align: middle"
                    bordered
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:empty>
                      <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                    </template>
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span> 
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>

<script>
import FormingTeamSquadService from "@/services/FormingTeamSquad.service";
import {
  BListGroup,
  BListGroupItem,
  BTableSimple,
  BTbody,
  BTr,
  BTd,
} from "bootstrap-vue";
import CustomNumberInput from "../../../components/CustomNumberInput.vue";
export default {
  components: {
    BListGroupItem,
    BListGroup,
    BTableSimple,
    BTbody,
    BTr,
    CustomNumberInput,
    BTd,
  },

  data() {
    return {
      SaveLoading: false,
      isDisabledScore: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      FormingTeamSquad: {},
      Sportfields: [
      {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("personname1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "passportinfo",
          label: this.$t("passportinfo"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        // {
        //   key: "sportteamsquadtypename",
        //   label: this.$t("sportteamsquadtype"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        // {
        //   key: "sportteamtypename",
        //   label: this.$t("SportTeamType"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        {
          key: "sportorganizationname",
          label: this.$t("sportorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "workorganizationname",
          label: this.$t("workorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isotherworkorganization",
          label: this.$t("isotherworkorganization"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "otherworkorganizationname",
          label: this.$t("workorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievement"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporteventname",
          label: this.$t("competitiontype1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      AthleteCoachFields: [
       {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isfirstcoach",
          label: this.$t("isfirstcoach"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      Coachfields: [
      {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("fio"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "passportinfo",
          label: this.$t("passportinfo"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "positionclassificationname",
          label: this.$t("positionclassificationname1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "details",
          label: this.$t("detail1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      HighereduclassifierList: [],
      EducationfortypemList: [],
      assessmentcriteriatablestandarlist: [],
      EducationformList: [],
      EducationlanguageList: [],
      SchoolyearList: [],
      GenderList: [],
      statelist: [],
      OrganizationList: [],
      editedIndex: -1,
      tabIndex: 0,
      SaveLoading3: false,
      show: false,
      totalscore: 0,
      isEdit: true,
      intermediateScore: null,
      dtmid: "",
      isDisabledScore: false,
    };
  },

  async created() {
    await this.Refresh();
  },
  methods: {
    async Refresh() {
      this.show = true;
      await FormingTeamSquadService.Get(this.$route.params.id).then((res) => {
        this.FormingTeamSquad = res.data;
        this.show = false;
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({ name: "FormingTeamSquad" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      FormingTeamSquadService.Approve(this.FormingTeamSquad.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$refs["ApproveModal"].hide();
          this.makeToast(
            this.$t("ApproveSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      FormingTeamSquadService.CancelApproval(this.FormingTeamSquad.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$refs["CancelApprovalModal"].hide();
          this.makeToast(
            this.$t("CancelApprovalSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.CancelApprovalLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
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
  watch: {},
};
</script>

<style></style>

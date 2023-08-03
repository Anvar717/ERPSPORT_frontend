<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("AthletePreparingCompet") }}</h4>
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
                          <b> {{ AthletePreparingCompet.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("sporttypeclassifier") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b>
                            {{ AthletePreparingCompet.sporttypeclassifiername }}
                          </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("sportevent") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.sporteventname }} </b>
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
                          <span>{{ $t("SportTeamType") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.sportteamtypename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("gender") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.gendername }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("personname1") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.personname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthletePreparingCompet.statusname }} </b>
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
                    v-if="$can('AthletePreparingCompetApprove', 'permissions') && AthletePreparingCompet.statusid !== 2"
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
                      $can(
                        'AthletePreparingCompetCancelApproval',
                        'permissions'
                      )
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
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ AthletePreparingCompet.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} :
                        {{ AthletePreparingCompet.personname }}
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
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ AthletePreparingCompet.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} :
                        {{ AthletePreparingCompet.personname }}
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
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Coachfields"
                    :items="AthletePreparingCompet.athletepreparingcompetcoach"
                    class="bg-color-table text-center mx-3"
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
                      <h5>{{ AthletePreparingCompet.dateofbirth }}</h5>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col sm="12" md="3" lg="3">
                      <div>
                        <h5>{{ $t("documentseries") }}:</h5>
                      </div>
                    </b-col>
                    <b-col sm="12" md="9" lg="9">
                      <h5>{{ AthletePreparingCompet.documentseries }}</h5>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col sm="12" md="3" lg="3">
                      <div>
                        <h5>{{ $t("sporttitlename") }}:</h5>
                      </div>
                    </b-col>
                    <b-col sm="12" md="9" lg="9">
                      <h5>{{ AthletePreparingCompet.sporttitlename }}</h5>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col sm="12" md="3" lg="3">
                      <div>
                        <h5>{{ $t("sportorganization") }}:</h5>
                      </div>
                    </b-col>
                    <b-col sm="12" md="9" lg="9">
                      <h5>{{ AthletePreparingCompet.sportorganizationname }}</h5>
                    </b-col>
                  </b-row>
                  <b-row class="mt-3">
                    <b-col sm="12" md="3" lg="3">
                      <div>
                        <h5>{{ $t("AthleticAchievement") }}:</h5>
                      </div>
                    </b-col>
                    <b-col sm="12" md="9" lg="9">
                      <h5>{{ AthletePreparingCompet.athleticachievement }}</h5>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col sm="12" md="1" lg="1"></b-col>
              </b-row>
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>
  
  <script>
import AthletePreparingCompetService from "@/services/AthletePreparingCompet.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
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
    HistoryDetailInfo,
  },

  data() {
    return {
      SaveLoading: false,
      isDisabledScore: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      AthletePreparingCompet: {},
      Sportfields: [
        {
          key: "personname",
          label: this.$t("student"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "persondateofbirth",
          label: this.$t("DateOfBirthday"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
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
      HighereduclassifierList: [],
      EducationfortypemList: [],
      assessmentcriteriatablestandarlist: [],
      EducationformList: [],
      EducationlanguageList: [],
      SchoolyearList: [],
      GenderList: [],
      History: [],
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
      await AthletePreparingCompetService.Get(this.$route.params.id).then(
        (res) => {
          this.AthletePreparingCompet = res.data;
          AthletePreparingCompetService.Get(this.$route.params.id).then(
            (res) => {
              this.History = res.data.history;
            }
          );
          this.show = false;
        }
      );
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({ name: "AthletePreparingCompet" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      AthletePreparingCompetService.Approve(this.AthletePreparingCompet.id)
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
    CancelApproval() {
      this.CancelApprovalLoading = true;
      AthletePreparingCompetService.CancelApproval(
        this.AthletePreparingCompet.id
      )
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
  
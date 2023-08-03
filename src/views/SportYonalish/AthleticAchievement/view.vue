<template>
    <b-overlay :show="show">
      <CRow>
        <CCol>
          <CCard accent-color="primary" class="pb-4">
            <CCardHeader>
              <CRow>
                <CCol>
                  <h4 class="text-center">{{ $t("AthleticAchievement") }}</h4>
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
                            <b> {{ AthleticAchievement.docnumber }} </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("docdate") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ AthleticAchievement.docdate }} </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("personname1") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ AthleticAchievement.personname }} </b>
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
                            <span>{{ $t("detail") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ AthleticAchievement.detail }} </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("status") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ AthleticAchievement.statusname }} </b>
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
                    v-if="$can('AthleticAchievementApprove', 'permissions') && AthleticAchievement.statusid !== 2"
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
                        $can('AthleticAchievementCancelApproval', 'permissions')
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
                      <h5>{{ $t("id") }} : {{ AthleticAchievement.id }}</h5>
                      <span>
                        <h5>
                          {{ $t("name") }} : {{ AthleticAchievement.personname }}
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
                      <h5>{{ $t("id") }} : {{ AthleticAchievement.id }}</h5>
                      <span>
                        <h5>
                          {{ $t("name") }} : {{ AthleticAchievement.personname }}
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
                <CRow class="mt-3">
                    <CCol>
                <b-table
                  :fields="fields"
                  :items="AthleticAchievement.athleticachievementtable"
                  class="bg-color-table text-center"
                  style="vertical-align: middle"
                  bordered
                  responsive="sm"
                  :tbody-tr-class="rowClass"
                >
                  <template v-slot:empty>
                    <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                  </template>
                  <!-- <template #cell(actions)="{ item }">
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
                        @click="Delete(item)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link>
                    </div>
                  </template> -->
                </b-table>
              </CCol>
                </CRow>
              </ValidationObserver>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </b-overlay>
  </template>
  
  <script>
  import AthleticAchievementService from "@/services/AthleticAchievement.service";
  import HistoryDetailInfo from '@/components/HistoryDetailInfo.vue'
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
            AthleticAchievement: {},
            fields: [
        {
          key: "startdate",
          label: this.$t("startdate"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("sporteventtype"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "competitiontypename",
          label: this.$t("competitiontype"),
          thStyle: { width: "5%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventname",
          label: this.$t("sporteventname"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          thStyle: { width: "20%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          thStyle: { width: "15%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievementname"),
          thStyle: { width: "30%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasurename"),
          thStyle: { width: "5%" },
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          thStyle: { width: "10%" },
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        //   thStyle: { width: "5%" },
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
      ],
        HighereduclassifierList: [],
        EducationfortypemList: [],
        assessmentcriteriatablestandarlist: [],
        EducationformList: [],
        EducationlanguageList: [],
        SchoolyearList: [],
        GenderList: [],
        History:[],
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
        await AthleticAchievementService.Get(this.$route.params.id).then((res) => {
          this.AthleticAchievement = res.data;
        //   AthleticAchievementService.GetDetail(this.$route.params.id).then((res) => {
        //   this.History = res.data.history;
        // });
          this.show = false;
        });
      },
      rowClass(item, type) {
        if (item.Status === 3) {
          return "d-none";
        }
      },
      Back() {
        this.$router.push({ name: "AthleticAchievement" });
      },
      OpenApproveModal() {
        this.$refs["ApproveModal"].show();
      },
      OpenCancelApproveModal() {
        this.$refs["CancelApprovalModal"].show();
      },
      Approve() {
        this.ApproveLoading = true;
        AthleticAchievementService.Approve(this.AthleticAchievement.id)
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
        AthleticAchievementService.CancelApproval(this.AthleticAchievement.id)
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
  
<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("SportStudentMovement") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row>
                <b-col sm="12" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ SportStudentMovement.docnumber }}</b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ SportStudentMovement.docdate }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="12" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("schoolyear") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ SportStudentMovement.schoolyearname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("detail") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ SportStudentMovement.detail }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b-badge
                        :variant="
                         getItemColor(SportStudentMovement.statusname)
                        "
                      >
                        {{ SportStudentMovement.statusname }}
                      </b-badge>
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
                  v-if="SportStudentMovement.CanApprove"
                    @click="OpenApproveModal"
                    size="sm"
                    variant="primary"
                    class="w-100 mb-1"
                  >
                    <b-icon scale="1.4" icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </b-button>
                  <b-button
                  v-if="SportStudentMovement.CanCancelApproval"
                    @click="OpenCancelApproveModal"
                    size="sm"
                    style="background-color: firebrick; color: #fff"
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
          <h5>{{ $t("id") }} : {{ SportStudentMovement.id }}</h5>
          <span>
            <h5>
              {{ $t("docnumber") }} : {{ SportStudentMovement.docnumber }}
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
      <b-modal :ref="'CancelApprovalModal'" hide-footer no-close-on-backdrop>
        <template #modal-title>
          {{ $t("CancelApproval") }}
          <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ SportStudentMovement.id }}</h5>
          <span>
            <h5>
              {{ $t("docnumber") }} : {{ SportStudentMovement.docnumber }}
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
                <b-row class="mt-3">
                  <b-col>
                    <div class="table-container mobileStyle">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th
                              rowspan="2"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("OrderNumber") }}
                              <!-- {{ $t("totalschools") }} -->
                            </th>
                            <th
                              rowspan="2"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("studentmovementtype") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                            <th
                              colspan="3"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("current") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                            <th
                              rowspan="2"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("personname1") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                            <th
                              colspan="3"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("through") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                            <th
                              rowspan="2"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("exclusionreasontype") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                            <th
                              rowspan="2"
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("toorganization1") }}
                              <!-- {{ $t("Included") }} -->
                            </th>
                          </tr>
                          <tr>
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("Sport turi") }}
                            </th>
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("Sportgroup") }}
                            </th>
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("FromCoach") }}
                            </th>
                            <!-- <th style="text-align: center; vertical-align: middle">
                        {{ $t("fromorganization1") }}
                      </th> -->
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("Sport turi") }}
                            </th>
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("Sportgroup") }}
                            </th>
                            <th
                              style="text-align: center; vertical-align: middle"
                            >
                              {{ $t("ToCoach") }}
                            </th>
                            <!-- <th style="text-align: center; vertical-align: middle">
                        {{ $t("toorganization1") }}
                      </th> -->
                          </tr>
                        </thead>
                        <tbody v-if="!Loading">
                          <tr
                            v-for="(
                              item, i
                            ) in SportStudentMovement.sportStudentMovementTable"
                            style="text-align: center; vertical-align: middle"
                            :key="i"
                          >
                            <td>
                              {{ i + 1 }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.studentmovementtypename }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.fromsporttypeclassifiername }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.fromsportgroupname }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.fromcoachpersonname }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.frompersonname }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.tosporttypeclassifiername }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.tosportgroupname }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.tocoachpersonname }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.exclusionreasontypename }}
                            </td>
                            <td
                              style="text-align: left; vertical-align: middle"
                            >
                              {{ item.toorganizationname }}
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-if="Loading">
                          <tr>
                            <td class="text-center" colspan="19">
                              <b-spinner></b-spinner>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-col>
                </b-row>
              </b-row>
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>

<script>
import SportStudentMovementService from "@/services/SportStudentMovement.service";
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
      SportStudentMovement: {},
      CompetitionFields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventname",
          label: this.$t("competitionname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "countryname",
          label: this.$t("country"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      Coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("position"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
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
      await SportStudentMovementService.Get(this.$route.params.id).then(
        (res) => {
          this.SportStudentMovement = res.data;
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
      this.$router.push({ name: "SportStudentMovement" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      SportStudentMovementService.Approve(this.SportStudentMovement.id)
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
        : text === "Создан"
        ? "primary"
        : text === "Yaratilgan"
        ? "primary"
        : text === "Утвержден"
        ? "success"
        : text === "Tasdiqlangan"
        ? "success"
        : text === "Тасдиқланган"
        ? "success"
         : text ===  "Bekor qilingan"
        ? "danger"
        : text ===  "Бекор қилинган"
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      SportStudentMovementService.CancelApproval(this.SportStudentMovement.id)
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

<template>
  <b-overlay :show="previewshow">
    <b-row>
      <b-col cols="12" :md="10">
        <b-row>
          <b-col cols="12" md="12">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docnumber") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ StudentDetailInfo.docnumber }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docdate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ StudentDetailInfo.docdate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolyear") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ StudentDetailInfo.schoolyearname }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">
                      {{ $t("studentexpulsiontype") }} :
                    </td>
                    <td class="font-weight-bold pb-1">
                      <b-badge>
                        {{ StudentDetailInfo.studentexpulsiontypename }}
                      </b-badge>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge>
                        {{ StudentDetailInfo.detailinfo }}
                      </b-badge>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td>{{ $t("status") }} :</td>
                    <td>
                      <b-badge
                        :variant="getItemColor(StudentDetailInfo.statusname)"
                      >
                        {{ StudentDetailInfo.statusname }}
                      </b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
            <b-card>
              <b-tabs content-class="mt-3">
                <b-tab :title="$t('InfoClass')" active>
                  <b-table
                    :fields="fields"
                    :items="StudentDetail"
                    bordered
                   
                    responsive="sm"
                    striped
                    small
                    sticky-header="75vh"
                    no-border-collapse
                    foot-row-variant="info"
                  >
                    <template v-slot:custom-foot>
                      <tr>
                        <td colspan="2" class="text-center">
                          <b> {{ $t("Total") }} </b>
                        </td>
                        <td class="text-center">
                          <b> {{ calcTotal() }} </b>
                        </td>
                      </tr>
                    </template>
                  </b-table>
                </b-tab>
                <b-tab :title="$t('InfoStudent')">
                  <b-table
                    :fields="fieldsSecond"
                    :items="StudentSecondTab"
                    bordered
                   
                    responsive="sm"
                    striped
                    small
                    sticky-header="75vh"
                    no-border-collapse
                    foot-row-variant="info"
                  >
                    <!-- <template v-slot:custom-foot>
                      <tr>
                        <td colspan="2" class="text-center">
                          <b> {{ $t("Total") }} </b>
                        </td>
                        <td class="text-center">
                          <b> {{ calcTotal() }} </b>
                        </td>
                      </tr>
                    </template> -->
                  </b-table>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="2">
        <b-button @click="Back" size="sm" variant="danger" class="w-100 mb-1">
          <b-icon-arrow-left-short scale="1.7" />
          {{ $t("back") }}
        </b-button>
        <b-button
          v-if="StudentDetailInfo.CanApprove"
          @click="OpenApproveModal"
          size="sm"
          variant="success"
          class="w-100 mb-1"
        >
          <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="
            StudentDetailInfo.CanCancelApprove &&
              StudentDetailInfo.admissionappid == null
          "
          @click="OpenCancelApproveModal"
          size="sm"
          variant="danger"
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
          <h5>{{ $t("id") }} : {{ StudentExpulsion.id }}</h5>
          <!-- <span>
            <h5>{{ $t("name") }} : {{ StudentExpulsion.personname }}</h5></span
          > -->
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
          <h5>{{ $t("id") }} : {{ StudentExpulsion.id }}</h5>
          <!-- <span>
            <h5>{{ $t("name") }} : {{ StudentExpulsion.personname }}</h5></span
          > -->
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
    <b-row>
      <b-col> </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import StudentExpulsionService from "@/services/StudentExpulsion.service";
import {
  BRow,
  BCol,
  BOverlay,
  BButton,
  BCard,
  BCardBody,
  BCardTitle,
  BCardText,
  BImg,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BBadge,
  BTable,
  BModal,
  BFormTextarea,
  VBModal,
  VBTooltip,
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BOverlay,
    BButton,
    BCard,
    BCardBody,
    BCardTitle,
    BCardText,
    BImg,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BBadge,
    BTable,
    BModal,
    BFormTextarea,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      StudentDetailInfo: {},
      StudentTable: {},
      StudentExpulsion: {},
      previewshow: false,
      StudentExpulsionPreview: {},
      AcceptLoading: false,
      isShowRejectModal: false,
      fields: [
        // { key : 'schoolgradecode',label : this.$t('schoolgradecode'),class:'text-center' },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          class: "text-center",
        },
        // { key : 'schoolgradelettercode',label : this.$t('schoolgradelettercode'),class:'text-center' },
        {
          key: "schoolgradelettername",
          label: this.$t("schoolgradeletter"),
          class: "text-center",
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          class: "text-center",
        },
      ],
      fieldsSecond: [
        {
          key: "estatementdate",
          label: this.$t("estatementdate"),
          class: "text-center",
        },
        {
          key: "estatementnumber",
          label: this.$t("estatementnumber"),
          class: "text-center",
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade"),
          class: "text-center",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          class: "text-center",
        },
        {
          key: "studentexpulsiontypename",
          label: this.$t("studentexpulsiontype"),
          class: "text-center",
        },
        {
          key: "studentschoolmovementname",
          label: this.$t("StudentSchoolMovement"),
          class: "text-center",
        },
      ],
      filter: {
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
        description: "",
      },
      isBusy: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      AcceptLoading: false,
      RejectLoading: false,
      SendLoading: false,
      Loading: false,
      ApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      CancelApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      },
      DocumentSeriesList: [],
      StudentDetail: {},
      StudentSecondTab: {},
    };
  },
  props: {
    ismainquota: {
      type: Boolean,
    },
  },

  created() {
    var self = this;
    this.previewshow = true;
    self.selectedrowid = self.$route.params.id;
    self.isGraduation = self.$route.query.isGraduation;
    StudentExpulsionService.Get(self.selectedrowid, self.isGraduation).then(
      (res) => {
        self.StudentExpulsion = res.data;
        this.previewshow = false;
      }
    );
    StudentExpulsionService.GetDetail(self.selectedrowid).then((res) => {
      self.StudentDetailInfo = res.data.studentExpulsion;
      self.StudentDetail = res.data.detailInfo;
      self.StudentSecondTab = res.data.studentExpulsion.Tables;
    });
    self.Loading = false;
  },
  computed: {},
  methods: {
    calcTotal() {
      var s = 0;
      this.StudentDetail.forEach(function(item) {
        s += item.studentcount;
      });
      return s;
    },
    Back() {
      this.$router.push({
        name: "StudentExpulsion",
        query: {
          statusid: this.$route.query.statusid,
          oblastid: this.$route.query.oblastid,
          regionid: this.$route.query.regionid,
          organizationid: this.$route.query.organizationid,
          documentseries: this.$route.query.documentseries,
          documentnumber: this.$route.query.documentnumber,
          personname: this.$route.query.personname,
        },
      });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
      // this.ApproveData = {
      //   id: this.$route.params.id,
      // };
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
      // this.CancelApproveData = {
      //   id: this.$route.params.id,
      // };
    },

    Approve() {
      this.ApproveLoading = true;
      StudentExpulsionService.Approve(this.$route.params.id)
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
      StudentExpulsionService.CancelApproval(this.$route.params.id)
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
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },

    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
};
</script>

<style></style>

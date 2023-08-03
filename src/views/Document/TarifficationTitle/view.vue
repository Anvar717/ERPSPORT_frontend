<template>
  <b-overlay :show="previewshow">
    <b-row>
      <b-col cols="12" :md="10">
        <b-row>
          <b-col cols="12" md="6">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docnumber") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ TarifficationTitle.docnumber }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docdate") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ TarifficationTitle.docdate }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolyear") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ TarifficationTitle.schoolyearname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("Isplacedincity") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        <p v-if="TarifficationTitle.isplacedincity">
                          {{ $t("Yes") }}
                        </p>
                        <p v-if="!TarifficationTitle.isplacedincity">
                          {{ $t("No") }}
                        </p>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schooltype") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ TarifficationTitle.schooltypename }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("specializedsubjects") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <!-- <b-badge
                      > -->
                      {{ TarifficationTitle.specializedsubjects }}
                      <!-- </b-badge> -->
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <!-- <b-badge
                      > -->
                      {{ TarifficationTitle.detailinfo }}
                      <!-- </b-badge> -->
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ $t("status") }}
                    </td>
                    <td>
                      <b-badge
                        style="color:white"
                        :variant="
                          TarifficationTitle.statusname == 'Утвержден' ||
                          TarifficationTitle.statusid == 15
                            ? 'success'
                            : TarifficationTitle.statusname == 'Отправлен' ||
                              TarifficationTitle.statusid == 16
                            ? 'warning'
                            : TarifficationTitle.statusname == 'Создан' ||
                              TarifficationTitle.statusname == 'Изминен' ||
                              TarifficationTitle.statusname == 'Изменен' ||
                              TarifficationTitle.statusname == 'Принято'
                            ? 'primary'
                            : 'danger'
                        "
                      >
                        {{ TarifficationTitle.statusname }}
                      </b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12">
            <b-card>
              <b-table
                :fields="TarifficationTitleTables"
                :items="TarifficationTitle.Tables"
                class="bg-color-table text-center tdpadding mx-3"
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:cell(orgschoolgradename)="{ item }">
                  <p>{{ item.orgschoolgradename }}</p>
                </template>
                <template v-slot:cell(studentcount)="{ item }">
                  <p>{{ item.studentcount }}</p>
                </template>
                <template v-slot:cell(femalestudentcount)="{ item }">
                  <p>{{ item.femalestudentcount }}</p>
                </template>
                <template v-slot:cell(homeschoolingstudentcount)="{ item }">
                  <p>{{ item.homeschoolingstudentcount }}</p>
                </template>
                <template v-slot:cell(schoolingshiftname)="{ item }">
                  <p>{{ item.schoolingshiftname }}</p>
                </template>
                <template v-slot:cell(educationlanguagename)="{ item }">
                  <p>{{ item.educationlanguagename }}</p>
                </template>

                <template v-slot:cell(isspecialized)="{ item }">
                  <p v-if="item.isspecialized">{{ $t("Yes") }}</p>
                  <p v-if="!item.isspecialized">{{ $t("No") }}</p>
                </template>
                <template v-slot:cell(specializedsubjects)="{ item }">
                  <p>{{ item.specializedsubjects }}</p>
                </template>
              </b-table>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12">
            <b-card>
              <history-detail-info
                :history="HistoryData.history"
              ></history-detail-info>
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
          @click="OpenSendModal"
          v-if="TarifficationTitle.CanSend"
          size="sm"
          variant="warning"
          style="color:white"
          class="w-100 mb-1"
        >
          <b-icon variant="white" scale="1.4" icon="cursor"></b-icon>
          {{ $t("Send") }}
        </b-button>
        <!-- <b-button
          @click="OpenApproveModal"
          size="sm"
          variant="primary"
          class="w-100 mb-1"
          >
           <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Approve") }}
        </b-button> -->
        <!-- <b-button
          @click="OpenCancelApproveModal"
          size="sm"
          variant="danger"
          class="w-100 mb-1"
          >
          <b-icon icon="x" scale="1.5"></b-icon>
          {{ $t("CancelApproval") }}
        </b-button> -->
      </b-col>

      <b-modal :ref="'SendModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Send") }}
          <b-spinner v-if="SendLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitle.id }}</h5>
          <h5>{{ $t("WantApprove") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['SendModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Send">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Approve") }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitle.id }}</h5>
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
          <h5>{{ $t("id") }} : {{ TarifficationTitle.id }}</h5>
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
import TarifficationTitleService from "@/services/TarifficationTitle.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
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
    HistoryDetailInfo,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      TarifficationTitle: {},
      previewshow: false,
      TarifficationTitlePreview: {},
      HistoryData: {},
      AcceptLoading: false,
      isShowRejectModal: false,

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
      fields: [
        { key: "schoolgradename", label: this.$t("schoolgrade") },
        { key: "schoolgradelettername", label: this.$t("schoolgradeletter") },
      ],
      TarifficationTitleTables: [
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename"),
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
        },
        {
          key: "femalestudentcount",
          label: this.$t("femalestudentcount"),
        },
        {
          key: "homeschoolingstudentcount",
          label: this.$t("homeschoolingstudentcount"),
        },
        {
          key: "schoolingshiftname",
          label: this.$t("schoolingshiftname"),
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
        },
        {
          key: "isspecialized",
          label: this.$t("isspecialized"),
        },
        {
          key: "specializedsubjects",
          label: this.$t("specializedsubjects"),
        },
      ],
      isBusy: false,
      ApproveLoading: false,
      SendLoading: false,
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
      SendData: {
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
    this.Refresh();
    self.Loading = false;
  },
  computed: {},
  methods: {
    Back() {
      this.$router.push({ name: "TarifficationTitle" });
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
      this.ApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    OpenSendModal() {
      this.$refs["SendModal"].show();
      this.SendData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
      this.CancelApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      };
    },
    Back() {
      this.$router.push({ name: "TarifficationTitle" });
    },
    Refresh() {
      TarifficationTitleService.GetDetail(this.$route.params.id).then((res) => {
        this.TarifficationTitle = res.data.TarifficationTitle;
        this.HistoryData = res.data;
        this.previewshow = false;
      });
    },
    Delete(item) {
      this.DeleteLoading = true;
      TarifficationTitleService.Delete(item.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(
            this.$t("DeleteSuccess"),
            this.$t("message"),
            "success"
          );
          this.$router.go(-1);
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      TarifficationTitleService.Approve(this.TarifficationTitle.id)
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
    Send() {
      this.SendLoading = true;
      TarifficationTitleService.Send(this.TarifficationTitle.id)
        .then((res) => {
          this.SendLoading = false;
          this.$refs["SendModal"].hide();
          this.makeToast(this.$t("SendSuccess"), this.$t("message"), "success");
          this.Back();
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      TarifficationTitleService.CancelApproval(this.TarifficationTitle.id)
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

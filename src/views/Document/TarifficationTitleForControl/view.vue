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
                        {{ TarifficationTitleForControl.docnumber }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docdate") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ TarifficationTitleForControl.docdate }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolyear") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ TarifficationTitleForControl.schoolyearname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("Isplacedincity") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        <p v-if="TarifficationTitleForControl.isplacedincity">
                          {{ $t("Yes") }}
                        </p>
                        <p v-if="!TarifficationTitleForControl.isplacedincity">
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
                      {{ TarifficationTitleForControl.schooltypename }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("specializedsubjects") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <!-- <b-badge> -->
                      {{ TarifficationTitleForControl.specializedsubjects }}
                      <!-- </b-badge> -->
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ TarifficationTitleForControl.detailinfo }}
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
                          TarifficationTitleForControl.statusname ==
                            'Утвержден' ||
                          TarifficationTitleForControl.statusid == 15 ||
                          TarifficationTitleForControl.statusid == 9
                            ? 'success'
                            : TarifficationTitleForControl.statusname ==
                                'Отправлен' ||
                              TarifficationTitleForControl.statusid == 16
                            ? 'warning'
                            : TarifficationTitleForControl.statusname ==
                                'Создан' ||
                              TarifficationTitleForControl.statusname ==
                                'Изминен' ||
                              TarifficationTitleForControl.statusname ==
                                'Изменен' ||
                              TarifficationTitleForControl.statusname ==
                                'Принято'
                            ? 'primary'
                            : 'danger'
                        "
                      >
                        {{ TarifficationTitleForControl.statusname }}
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
                :items="TarifficationTitleForControl.Tables"
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
        <!-- <b-button
          @click="OpenSendModal"
          v-if="TarifficationTitleForControl.CanSend"
          size="sm"
          variant="warning"
          class="w-100 mb-1"
          >
           <b-icon scale="1.4" icon="cursor"></b-icon>
          {{ $t("Send") }}
        </b-button> -->
        <b-button
          @click="OpenApproveModal"
          v-if="
            TarifficationTitleForControl.CanApprove &&
              $can('TarifficationTitleApprove', 'permissions')
          "
          size="sm"
          variant="success"
          class="w-100 mb-1"
        >
          <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Approve") }}
        </b-button>
        <b-button
          @click="OpenRejectModal"
          v-if="
            TarifficationTitleForControl.CanReject &&
              $can('TarifficationTitleReject', 'permissions')
          "
          size="sm"
          variant="danger"
          class="w-100 mb-1"
        >
          <b-icon icon="x" scale="1.5"></b-icon>
          {{ $t("Reject") }}
        </b-button>
        <b-button
          @click="OpenAcceptModal"
          v-if="
            TarifficationTitleForControl.CanAccept &&
              $can('TarifficationTitleAccept', 'permissions')
          "
          size="sm"
          variant="success"
          class="w-100 mb-1"
        >
          <b-icon icon="check2" scale="1.5"></b-icon>
          {{ $t("Accept") }}
        </b-button>
        <b-button
          v-if="
            TarifficationTitleForControl.CanReceive &&
              $can('TarifficationTitleReceive', 'permissions')
          "
          @click="OpenReceiveModal"
          size="sm"
          variant="success"
          class="w-100 mb-1"
        >
          <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Receive") }}
        </b-button>
        <b-button
          v-if="
            TarifficationTitleForControl.CanDelivere &&
              $can('TarifficationTitleDelivere', 'permissions')
          "
          @click="OpenDelivereModal"
          size="sm"
          style="color:white"
          variant="warning"
          class="w-100 mb-1"
        >
          <b-icon variant="white" icon="cursor" scale="1.2"></b-icon>
          {{ $t("Delivered") }}
        </b-button>
      </b-col>

      <b-modal :ref="'SendModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Send") }}
          <b-spinner v-if="SendLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
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
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
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
      <b-modal :ref="'RejectModal'" hide-footer no-close-on-backdrop>
        <template #modal-title>
          {{ $t("Reject") }}
          <b-spinner v-if="RejectLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
          <h5>{{ $t("WantReject") }}</h5>
          <b-form-textarea v-model="RejectData.description"></b-form-textarea>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['RejectModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Reject">
              {{ $t("Reject") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'ReceivedModal'" no-close-on-backdrop hide-footer>
        <template #modal-title>
          {{ $t("Received") }}
          <b-spinner v-if="ReceiveLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
          <h5>{{ $t("WantReceived") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['ReceivedModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Receive">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'AcceptModal'" hide-footer no-close-on-backdrop>
        <template #modal-title>
          {{ $t("Accept") }}
          <b-spinner v-if="AcceptLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
          <h5>{{ $t("WantAccept") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['AcceptModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Accept">
              {{ $t("Accept") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal :ref="'DelivereModal'" hide-footer no-close-on-backdrop>
        <template #modal-title>
          {{ $t("Delivere") }}
          <b-spinner v-if="DelivereLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ TarifficationTitleForControl.id }}</h5>
          <h5>{{ $t("WantDelivere") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button
              class="mr-2"
              variant="danger"
              @click="$refs['DelivereModal'].hide()"
            >
              {{ $t("Cancel") }}
            </b-button>
            <b-button variant="success" @click="Delivere">
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
      TarifficationTitleForControl: {},
      previewshow: false,
      TarifficationTitlePreview: {},
      HistoryData: {},
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
      RejectLoading: false,
      AcceptLoading: false,
      RecieveLoading: false,
      SendLoading: false,
      DelivereLoading: false,
      Loading: false,
      ApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      ReceivedData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      NotReceivedData: {
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
      RejectData: {
        id: 0,
        description: "",
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
      this.$router.push({ name: "TarifficationTitleForControl" });
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenReceiveModal() {
      this.$refs["ReceivedModal"].show();
    },
    OpenRejectModal() {
      this.$refs["RejectModal"].show();
      this.RejectData = {
        id: this.$route.params.id,
        description: "",
      };
    },
    OpenAcceptModal() {
      this.$refs["AcceptModal"].show();
    },
    OpenDelivereModal() {
      this.$refs["DelivereModal"].show();
    },
    OpenSendModal() {
      this.$refs["SendModal"].show();
      this.SendData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    Back() {
      this.$router.push({ name: "TarifficationTitleForControl" });
    },
    Refresh() {
      TarifficationTitleService.GetDetail(this.$route.params.id).then((res) => {
        this.TarifficationTitleForControl = res.data.TarifficationTitle;
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
      TarifficationTitleService.Approve(this.TarifficationTitleForControl.id)
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
    Receive() {
      this.ReceiveLoading = true;
      TarifficationTitleService.Receive(this.TarifficationTitleForControl.id)
        .then((res) => {
          this.ReceiveLoading = false;
          this.$refs["ReceivedModal"].hide();
          this.makeToast(
            this.$t("ReceivedSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.ReceiveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Reject() {
      this.RejectLoading = true;
      if (
        this.RejectData.description.length == 0 ||
        this.RejectData.description.length == ""
      ) {
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );

        return false;
      }
      TarifficationTitleService.Reject(
        this.TarifficationTitleForControl.id,
        this.RejectData.description
      )
        .then((res) => {
          this.RejectLoading = false;
          this.$refs["RejectModal"].hide();
          this.makeToast(
            this.$t("RejectSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.RejectLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Accept() {
      this.AcceptLoading = true;
      TarifficationTitleService.Accept(this.TarifficationTitleForControl.id)
        .then((res) => {
          this.AcceptLoading = false;
          this.$refs["AcceptModal"].hide();
          this.makeToast(
            this.$t("AcceptSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.AcceptLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Delivere() {
      this.DelivereLoading = true;
      TarifficationTitleService.Delivere(this.TarifficationTitleForControl.id)
        .then((res) => {
          this.DelivereLoading = false;
          this.$refs["DelivereModal"].hide();
          this.makeToast(
            this.$t("DelivereSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.DelivereLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    Send() {
      this.SendLoading = true;
      TarifficationTitleService.Send(this.TarifficationTitleForControl.id)
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
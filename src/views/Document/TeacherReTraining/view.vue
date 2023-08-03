<template>
  <b-overlay :show="previewshow">
    <CCard accent-color="primary" class="pb-4">
      <CCardHeader>
        <b-row>
          <b-col
            sm="12"
            md="6"
            class="text-center d-md-flex align-items-center text-md-left"
          >
            <h4>{{ $t("TeacherReTraining") }}</h4>
          </b-col>
          <b-col sm="12" md="6" class="text-right">
            <!-- <b-button-group size="sm">
                <b-button
                   @click="$router.push({ name: 'TeacherReTraining' })"
                  variant="outline-danger"
                  ><b-icon icon="arrow-left-circle-fill"></b-icon> {{ $t("back") }}
                </b-button>
              </b-button-group> -->
          </b-col>
        </b-row>
      </CCardHeader>
      <b-row class="mt-4">
        <b-col cols="12" :md="10">
          <b-row class="ml-2">
            <b-col cols="12" md="6">
              <b-card class="ml-2">
                <table>
                  <tbody>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("id") }} :</td>
                      <td class="pb-1">
                        <span class="font-weight-bold">
                          {{ TeacherReTraining.id }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">
                        {{ $t("docnumber") }}
                        :
                      </td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.docnumber }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">
                        {{ $t("docdate") }}
                        :
                      </td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.docdate }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("Teacher") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.personname }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("docserainumber") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.diplomserianumber }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-1 pb-1">{{ $t("attachmentfile") }} :</td>
                      <b-input-group>
                        <b-form-input
                          autocomplete="attachmentfilename"
                          disabled
                          v-model="TeacherReTraining.attachmentfilename"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-button
                            @click="DownloadFile"
                            variant="outline-success"
                            >{{ $t("Download") }}</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </b-col>
            <b-col cols="12" md="6">
              <b-card>
                <table>
                  <tbody>
                    <tr class="mt-2">
                      <td class="pr-1 pb-1">{{ $t("dateofissue") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.dateofissue }}
                      </td>
                    </tr>
                    <tr class="mt-2">
                      <td class="pr-1 pb-1">{{ $t("givenbyorgid") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.givenbyorgname }}
                      </td>
                    </tr>
                    <tr class="mt-2">
                      <td class="pr-1 pb-1">{{ $t("schoolsubject") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.schoolsubjectname }}
                      </td>
                    </tr>
                    <tr class="mt-2">
                      <td class="pr-1 pb-1">{{ $t("schoolsubject") }} :</td>
                      <td class="font-weight-bold pb-1">
                        <CBadge
                          :color="getItemColor(TeacherReTraining.statusname)"
                          >{{ TeacherReTraining.statusname }}</CBadge
                        >
                      </td>
                    </tr>
                    <tr class="mt-2">
                      <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                      <td class="font-weight-bold pb-1">
                        {{ TeacherReTraining.detailinfo }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </b-col>
            <b-col cols="12" md="12" class="ml-2">
              <b-card>
                <b-row v-if="TeacherReTraining.attachmentfileid != 0">
                  <b-col
                    style="
                      position: relative;
                      margin-bottom: 16px;
                      color: white;
                    "
                    sm="12"
                    md="12"
                  >
                    <!-- <img :src="TeacherReTraining.url" alt="" width="100%" /> -->
                    <!-- <iframe width="100%" :src="axios.defaults.baseURL + 'FileManage/Get?id=' + TeacherReTraining.attachmentfileid" frameborder="0"></iframe> -->
                    <iframe
                    v-if="filetype == 'pdf'"
                      width="100%"
                      height="1200px"
                      :src="
                        axios.defaults.baseURL +
                        `FileManage/Get?id=${TeacherReTraining.attachmentfileid}`
                      "
                      frameborder="0"
                    ></iframe>
                     <img v-if="filetype == 'jpg' || filetype == 'png'" :src="TeacherReTraining.url" alt="" height="1100px" width="100%" />
                    <!-- <div
                      @click="DeleteFile()"
                      style="
                        width: 40px;
                        height: 40px;
                        background-color: red;
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                      "
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-icon icon="x"></b-icon>
                    </div> -->
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="ml-2">
            <b-col sm="12" md="12">
              <b-card>
                <history-detail-info
                  :history="TeacherReTraining.History"
                ></history-detail-info>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="2">
          <b-button
            @click="$router.go(-1)"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon-arrow-left-short scale="1.7" />
            {{ $t("back") }}
          </b-button>
          <b-button
            v-if="
              $can('TeacherRetrainingAccept', 'permissions') &&
              !(
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              ) &&
              TeacherReTraining.statusid == 8
            "
            @click="OpenApproveModal"
            size="sm"
            variant="primary"
            class="w-100 mb-1"
          >
            <b-icon scale="1.4" icon="check2"></b-icon>
            {{ $t("Accept") }}
          </b-button>
          <b-button
            v-if="
              $can('TeacherRetrainingReject', 'permissions') &&
              !(
                $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
              ) &&
              TeacherReTraining.statusid == 8
            "
            @click="OpenCancelApproveModal"
            size="sm"
            variant="danger"
            class="w-100 mb-1"
          >
            <b-icon icon="x" scale="1.5"></b-icon>
            {{ $t("Reject") }}
          </b-button>
        </b-col>
        <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
          <template #modal-title>
            {{ $t("Accept") }}
            <b-spinner v-if="ApproveLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ TeacherReTraining.id }}</h5>
            <h5>{{ $t("WantAccept") }}</h5>
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
            {{ $t("Reject") }}
            <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
          </template>
          <b-card-text class="mt-3">
            <h5>{{ $t("id") }} : {{ TeacherReTraining.id }}</h5>
            <h5>{{ $t("WantReject") }}</h5>
          </b-card-text>
          <label for=""> {{ $t("Reason") }} </label>
          <b-form-textarea
            id="textarea"
            v-model="reason"
            :placeholder="$t('entersomething')"
            rows="3"
            max-rows="6"
            class="mb-3"
          ></b-form-textarea>
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
    </CCard>
  </b-overlay>
</template>

<script>
import TeacherReTrainingService from "@/services/TeacherReTraining.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo.vue";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
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
      TeacherReTraining: {},
      previewshow: false,
      CancelApprovalModal: false,
      ApproveModal: false,
      TeacherReTrainingPreview: {},
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
      filetype : '',
      isBusy: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      AcceptLoading: false,
      RejectLoading: false,
      SendLoading: false,
      Loading: false,
      axios,
      ApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
      },
      FileDownload:{
        id : '',
      },
      CancelApproveData: {
        id: 0,
        documentseries: "",
        documentnumber: "",
        returnReason: "",
      },
      reason: "",
      DocumentSeriesList: [],
    };
  },
  props: {
    ismainquota: {
      type: Boolean,
    },
  },

  created() {
    this.previewshow = true;
    TeacherReTrainingService.Get(this.$route.params.id).then((res) => {
      this.TeacherReTraining = res.data.TeacherReTraining;
      this.FileDownload.id = this.TeacherReTraining.attachmentfileid;
      this.FileDownload.name = this.TeacherReTraining.attachmentfilename;
      let text = res.data.TeacherReTraining.attachmentfilename; 
        let result = text.slice(-3);
        this.filetype  = result
      this.previewshow = false;
      if (this.$route.params.id != 0 && this.filetype != 'pdf') {
        FileManageService.Get(this.TeacherReTraining.attachmentfileid)
          .then((res1) => {
             this.TeacherReTraining.attachmentfileid = res.data.id
            //  this.TeacherReTraining.attachmentfilename = res.data.pfiletext
            this.TeacherReTraining.attachmentfiletype = res.data.pfiletype;
            (this.TeacherReTraining.url = window.URL.createObjectURL(
              new Blob([res1.data])
            ));
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      }
    });
    this.Loading = false;
  },
  computed: {},
  methods: {
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    Back() {
      this.$router.push({ name: "SendTeacherReTraining" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
      this.ApproveData = {
        id: this.$route.params.id,
        documentseries: "",
        documentnumber: "",
      };
    },
    DownloadFile() {
      this.DownloadLoading = this.FileDownload.id;
      FileManageService.Get(this.FileDownload.id, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(
            res,
            this.FileDownload.name
          );
        })
        .catch((error) => {
          this.DownloadLoading = "";
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
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
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Не принято"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Принято"
        ? "success"
        : text === "Отправлен"
        ? "warning"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    Approve() {
      this.ApproveLoading = true;
      TeacherReTrainingService.Accept(this.TeacherReTraining.id)
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
    check() {
      var self = this;
      if (
        self.reason === 0 ||
        self.reason === null ||
        self.reason === undefined ||
        self.reason === ""
      ) {
        this.makeToast(this.$t("reasonNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    CancelApproval() {
      if (!this.check()) {
        return false;
      }
      this.CancelApprovalLoading = true;
      TeacherReTrainingService.Reject(this.TeacherReTraining.id, this.reason)
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
  },
};
</script>

<style>
</style>
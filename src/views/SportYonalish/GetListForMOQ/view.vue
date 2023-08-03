<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("GetListForMOQ") }}</h4>
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
                          <span>{{ $t("appealdocnumber1") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Appeal.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("fromorganizationname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b>
                            {{ Appeal.appealAssignment.fromorganizationname }}
                          </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("appealpurpose") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Appeal.appealpurposename }} </b>
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
                          <span>{{ $t("appealdate1") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Appeal.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("ToOrganization") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b>
                            {{ Appeal.appealAssignment.toorganizationname }}
                          </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b-badge
                            :variant="
                              Appeal.statusid === 8 ? 'warning' : 'danger'
                            "
                          >
                            {{ Appeal.statusname }}
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
                    v-if="Appeal.statusid !== 2"
                    @click="OpenApproveModal"
                    size="sm"
                    variant="primary"
                    class="w-100 mb-1"
                  >
                    <b-icon scale="1.4" icon="check2"></b-icon>
                    {{ $t("WriteAnswer") }}
                  </b-button>
                  <b-button
                    @click="OpenCancelApproveModal"
                    size="sm"
                    variant="success"
                    class="w-100 mb-1"
                  >
                    <b-icon icon="cursor" scale="1.2"></b-icon>
                    {{ $t("SendMinistry") }}
                  </b-button>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td class="text-center">
                          <span style="font-weight: bold"
                            >{{ $t("details") }}
                          </span>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td style="height: 600px">
                          <span>{{ Appeal.details }} </span>
                        </b-td>
                      </b-tr>
                      <b-tr> </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col
                  style="position: relative; margin-bottom: 16px; color: white"
                  sm="12"
                  md="6"
                >
                  <!-- <img :src="TeacherReTraining.url" alt="" width="100%" /> -->
                  <iframe
                    v-if="filetype == 'pdf'"
                    width="100%"
                    height="600px"
                    :src="
                      axios.defaults.baseURL +
                      `FileManage/Get?id=${Appeal.FileTables[0].attachmentfileid}`
                    "
                    frameborder="0"
                  ></iframe>
                  <img
                    v-if="filetype == 'jpg' || filetype == 'png'"
                    :src="TeacherReTraining.url"
                    alt=""
                    height="800px"
                    width="100%"
                  />
                </b-col>
                <b-modal
                  :ref="'ApproveModal'"
                  no-close-on-backdrop
                  hide-footer
                  size="lg"
                >
                  <template #modal-title>
                    {{ $t("WriteAnswer") }}
                  </template>
                  <b-col sm="12" md="12">
                    <b-table-simple small class="border">
                      <b-tbody>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("appealdocnumber1") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ Appeal.docnumber }} </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("appealdate1") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ Appeal.docdate }} </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("fromorganizationname") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b>
                              {{ Appeal.appealAssignment.fromorganizationname }}
                            </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("ToOrganization") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b>
                              {{ Appeal.appealAssignment.toorganizationname }}
                            </b>
                          </b-td>
                        </b-tr>
                        <b-tr>
                          <b-td>
                            <span>{{ $t("appealpurpose") }} :</span>
                          </b-td>
                          <b-td class="text-right">
                            <b> {{ Appeal.appealpurposename }} </b>
                          </b-td>
                        </b-tr>
                      </b-tbody>
                    </b-table-simple>
                    <b-row>
                      <b-col sm="12" md="12">
                        <b-form-textarea
                          class="mt-2"
                          v-model="AppealResponse.details"
                          :placeholder="$t('details')"
                          id="textarea"
                          rows="6"
                          max-rows="12"
                        />
                      </b-col>
                      <b-col sm="12" md="12" lg="12">
                        <custom-file-group
                          :labels="TitleFileTypeList1"
                          @change="ChangeFile1"
                          :items="AppealResponse.FileTables"
                          @delete="
                            (el) => {
                              AppealResponse.FileTables = el;
                            }
                          "
                        ></custom-file-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-row class="mt-2">
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
                  size="lg"
                  no-close-on-backdrop
                >
                  <template #modal-title>
                    {{ $t("SendMinistry") }}
                  </template>
                  <b-row>
                    <b-col>
                      <span style="font-size:14px">{{$t('ministry')}}</span>
                    </b-col>
                  </b-row>
                  <!-- <b-row>
                    <b-col>
                      <div class="form-group form-row">
              <label class="col-form-label col-sm-2">
                {{ $t("organization") }}
              </label>
              <div class="col-sm-10 d-flex">
                <v-select
                  class="w-100"
                  :options="OrganizationList"
                  v-model="sendministry.organizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="shortname"
                >
                </v-select>
              </div>
            </div>
                    </b-col>
                  </b-row> -->
                  <b-row class="mt-2">
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
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>
  
  <script>
import AppealService from "@/services/Appeal.service";
import AppealResponseService from "@/services/AppealResponse.service";
import FileManageService from "@/services/filemanage.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
import OrganizationService from "@/services/organization.service";
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
    CustomFileGroup,
  },

  data() {
    return {
      SaveLoading: false,
      isDisabledScore: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      filetype: "pdf",
      Appeal: {},
      GetListForMOQ: {},
      AppealResponse: {},
      sendministry:{
        organizationid: 0
      },
      statelist: [],
      TitleFileTypeList1:"",
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      OrganizationList: [],
      TitleFileTypeList: [],
      editedIndex: -1,
      tabIndex: 0,
      SaveLoading3: false,
      show: false,
      totalscore: 0,
      isEdit: true,
      intermediateScore: null,
      dtmid: "",
      isDisabledScore: false,

      filter: {
        description: "",
      },
    };
  },

  async created() {
    await this.Refresh();
     OrganizationService.GetAll().then((res) => {
      this.OrganizationList = res.data;
    });
  },
  methods: {
    async Refresh() {
      this.show = true;
      await AppealService.Get(this.$route.params.id).then((res) => {
        this.Appeal = res.data;
        this.TitleFileTypeList = res.data.table.Tables;
        AppealResponseService.Get(0).then((res) => {
        this.AppealResponse = res.data;
        this.TitleFileTypeList1 = res.data.table.Tables;
        this.show = false;
      });
        this.show = false;
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({ name: "GetListForMOQ" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      this.AppealResponse.parentid = this.Appeal.id;
      this.AppealResponse.docdate = this.Appeal.docdate;
      this.AppealResponse.appealpurposename = this.Appeal.appealpurposename;
      this.AppealResponse.appealpurposeid = this.Appeal.appealpurposeid;
      this.AppealResponse.appealResponseAssignment.toorganizationid   = this.Appeal.appealAssignment.fromorganizationid;
      AppealResponseService.Update(this.AppealResponse)
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
      AppealService.DeliveredSent(this.Appeal.id)
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
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.AppealResponse.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
            alert(index);
          })
          .catch((error) => {
            this.fileLoading = false;
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
      } else {
        this.makeToast(
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
  },
  watch: {},
};
</script>
  
  <style></style>
  
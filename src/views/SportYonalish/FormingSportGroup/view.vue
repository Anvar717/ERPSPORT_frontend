<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("FormingSportGroup") }}</h4>
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
                          <b> {{ FormingSportGroup.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("schoolyear") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.schoolyearname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("Coach") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.coachpersonname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("SportGroup") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.sportgroupname }} </b>
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
                          <span>{{ $t("SportGroup") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.academichours }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("orderNumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.ordernumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("OrderDate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.orderdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("detail") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.detail }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ FormingSportGroup.statusname }} </b>
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
                    v-if="
                      $can('FormingSportGroupApprove', 'permissions') &&
                      FormingSportGroup.statusid !== 2
                    "
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
                      $can('FormingSportGroupCancelApproval', 'permissions')
                    "
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
                    <h5>{{ $t("id") }} : {{ FormingSportGroup.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ FormingSportGroup.personname }}
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
                    <h5>{{ $t("id") }} : {{ FormingSportGroup.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ FormingSportGroup.personname }}
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
                  <b-tabs>
                    <!-- <b-tab active class="ml-2">
                      <template slot="title">
                        <b-icon icon="box-arrow-up"></b-icon>
                        {{ $t("Sportchi") }}
                      </template>
                      <b-row class="mt-3">
                        <b-col>
                          <b-table
                            :fields="Sportfields"
                            :items="FormingSportGroup.StudentSportGroupTable"
                            bordered
                            striped
                            responsive="sm"
                            small
                            no-border-collapse
                            show-empty
                          >
                            <template v-slot:empty>
                              <h5 class="text-center m-1">
                                {{ $t("NoItems") }}
                              </h5>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-tab> -->
                    <b-tab active class="ml-2">
                      <template slot="title">
                        <b-icon icon="person"></b-icon>
                        {{ $t("Sportchi") }}
                      </template>
                      <b-row class="mt-3">
                        <b-col>
                          <b-table
                            :fields="Detailfields"
                            :items="historymovementofstudents"
                            bordered
                            responsive="sm"
                            small
                            no-border-collapse
                            show-empty
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:empty>
                              <h5 class="text-center m-1">
                                {{ $t("NoItems") }}
                              </h5>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-tab>
                    <b-tab>
                      <template slot="title">
                        <b-icon icon="card-text"></b-icon>
                        {{ $t("History") }}
                      </template>
                      <b-row>
                        <b-col sm="12" md="12">
                          <b-card>
                            <history-detail-info
                              :history="History"
                            ></history-detail-info>
                          </b-card>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
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
import FormingSportGroupService from "@/services/FormingSportGroup.service";
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
      FormingSportGroup: {},
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
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "highereduclassifiername",
          label: this.$t("Highereduclassifiername"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      Detailfields: [
        {
          key: "personname",
          label: this.$t("fio"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "persondateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
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
          key: "sporttitlename",
          label: this.$t("sporttitle"),
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
      historymovementofstudents:[],
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
      await FormingSportGroupService.Get(this.$route.params.id).then((res) => {
        this.FormingSportGroup = res.data;
        FormingSportGroupService.GetDetail(this.$route.params.id).then((res) => {
          this.History = res.data.history;
        this.historymovementofstudents = res.data.historymovementofstudents
      });
        this.show = false;
      });
    },
    rowClass(item, type) {

      if (item.newadditiontothegroup) {
        return 'textSuccessClass';
      }
      else if (item.isleftthegroup) {
        return 'textClass';
      }
      else {
        return 'text1Class';
      }
    },
    Back() {
      this.$router.push({ name: "FormingSportGroup" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      FormingSportGroupService.Approve(this.FormingSportGroup.id)
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
      FormingSportGroupService.CancelApproval(this.FormingSportGroup.id)
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
}
</script>

<style>
.textClass {
 color:rgb(88, 84, 92);
 background-color: rgb(245, 153, 153);
}
.text1Class{
  color:rgb(88, 84, 92);
}
.textSuccessClass{
  color:rgb(88, 84, 92);
 background-color: rgb(195,239,215);
}
</style>

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
                    <td class="pr-1 pb-1">{{ $t("oblast") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ AppointQualCategory.oblastname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("region") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ AppointQualCategory.regionname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("organization") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ AppointQualCategory.organizationname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docdate") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ AppointQualCategory.docdate }}
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
                    <td class="pr-1 pb-1">{{ $t("docnumber") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ AppointQualCategory.docnumber }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolyear") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge
                      >
                        {{ AppointQualCategory.schoolyearname }}
                      </b-badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ $t('status') }}
                    </td>
                    <td>
                      <b-badge :variant="AppointQualCategory.statusname == 'Утвержден' ? 'success' : AppointQualCategory.statusname == 'Отправлен' ? 'info' : AppointQualCategory.statusname == 'Создан' ||  AppointQualCategory.statusname == 'Изминен' || AppointQualCategory.statusname == 'Изменен' || AppointQualCategory.statusname == 'Принято' ? 'success' : 'danger'"> {{ AppointQualCategory.statusname }} </b-badge>
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
              :fields="fields"
              :items="AppointQualCategory.Tables"
              class="bg-color text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              
              <template v-slot:cell(isappointment)="{item}">
                <p class="m-0">{{item.isappointmentid === 1 ? "Тайинлов/Назначение" : "Озод этиш/Отстранение"}}</p>
              </template>
              
              <!-- <template #cell(personname)="{item}">
                {{employeelist.filter(i => i.id === item.personid)[0].name }}
              </template> -->
              <template v-slot:cell(istemporarily)="{item}">
                <p class="m-0">{{item.istemporarily === true ? $t('yes') : $t('no')}}</p>
              </template>
            </b-table>
         
          </b-card>
           </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="12">
            <b-card>
              <history-detail-info :history="HistoryData.history"></history-detail-info>
            </b-card>
          </b-col>
        </b-row>
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

         v-if="$can('OrgSchoolGradeControlApprove', 'permissions')"
          @click="OpenApproveModal"
          size="sm"
          variant="primary"
          class="w-100 mb-1"
          >
           <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Approve") }}
        </b-button>
        <b-button
        v-if="$can('OrgSchoolGradeControlCancelApproval', 'permissions')"
          @click="OpenCancelApproveModal"
          size="sm"
          variant="danger"
          class="w-100 mb-1"
          >
          <b-icon icon="x" scale="1.5"></b-icon>
          {{ $t("CancelApproval") }}
        </b-button>
      </b-col>
              
              
      <b-modal
        :ref="'ApproveModal'"
        no-close-on-backdrop
        hide-footer
      >
        <template #modal-title>
          {{ $t("Approve") }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </template>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ AppointQualCategory.id }}</h5>
          <h5>{{ $t("WantApprove") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button class="mr-2" variant="danger" @click="$refs['ApproveModal'].hide()"> {{ $t('Cancel') }} </b-button>
            <b-button variant="success" @click="Approve"> {{ $t('Accept') }} </b-button>
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
           <h5>{{ $t("id") }} : {{ AppointQualCategory.id }}</h5>
          <h5>{{ $t("WantCancelApproval") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button class="mr-2" variant="danger" @click="$refs['CancelApprovalModal'].hide()"> {{ $t('Cancel') }} </b-button>
            <b-button variant="success" @click="CancelApproval"> {{ $t('Accept') }} </b-button>
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
import OrgSchoolGradeControlService from "@/services/OrgSchoolGradeControl.service";
import HistoryDetailInfo from '@/components/HistoryDetailInfo.vue'
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
    HistoryDetailInfo
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      AppointQualCategory : {},
      previewshow: false,
      AppointQualCategoryPreview: {},
      HistoryData:{},
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
      isBusy: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      AcceptLoading: false,
      RejectLoading: false,
      SendLoading: false,
      Loading : false,
      ApproveData : {
        id : 0,
        documentseries : "",
        documentnumber : "",
      },
      CancelApproveData : {
        id : 0,
        documentseries : "",
        documentnumber : "",
        returnReason : ""
      },
      DocumentSeriesList : []
 
    };
  },
  props:{
        ismainquota : {
            type : Boolean
        }
    },

  created() {
    var self = this;
    this.previewshow = true;
    this.Refresh();
    self.Loading = false
  },
  computed: {
   
   
  },
  methods: {
    Back(){
      this.$router.push({name : 'OrgSchoolGradeControl'})
    },

    rowClass(item, type) {
            if (item.Status === 3) {
                return "d-none";
            }
        },
    OpenApproveModal(){
      this.$refs['ApproveModal'].show()
      this.ApproveData = {
        id : this.$route.params.id,
        documentseries : "",
        documentnumber : ""
      }
    },
    OpenCancelApproveModal(){
      this.$refs['CancelApprovalModal'].show()
      this.CancelApproveData = {
        id : this.$route.params.id,
        documentseries : "",
        documentnumber : "",
        returnReason : ""
      }
    },
    Back(){
      this.$router.push({name : 'OrgSchoolGradeControl'})
    },
    Refresh(){
      OrgSchoolGradeControlService.GetDetail(this.$route.params.id).then((res) => {
      this.AppointQualCategory = res.data.orgSchoolGradeControl;
      this.HistoryData = res.data;
      this.previewshow = false
    })
    },
    Delete(item) {
      this.DeleteLoading = true;
      OrgSchoolGradeControlService.Delete(item.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.makeToast(this.$t("DeleteSuccess"),this.$t('message'), "success");
          this.$router.go(-1);
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.makeToast(error.response.data.error,this.$t('error'), "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      OrgSchoolGradeControlService.Approve(this.AppointQualCategory.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$refs['ApproveModal'].hide()
          this.makeToast(this.$t("ApproveSuccess"),this.$t('message'), "success");
          this.Back()
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error,this.$t('error'), "danger");
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      OrgSchoolGradeControlService.CancelApproval(this.AppointQualCategory.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$refs['CancelApprovalModal'].hide()
          this.makeToast(this.$t("CancelApprovalSuccess"),this.$t('message'), "success");
          this.Back()
        })
        .catch((error) => {
          this.CancelApprovalLoading = false;
          this.makeToast(error.response.data.error,this.$t('error'), "danger");
        });
    },
    makeToast(message, title, type) {
        var self = this;
        self.$bvToast.toast(message, {
          title: title,
          autoHideDelay: 2000,
          variant: type,
          solid: true
        });
      },
  },
};
</script>

<style>
</style>
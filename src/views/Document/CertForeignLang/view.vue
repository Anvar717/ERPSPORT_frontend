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
                    <td class="pr-1 pb-1">{{ $t("personname") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ CertForeignLang.personname }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("documentseries") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.documentseries }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("documentnumber") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.documentnumber }}
                    </td>
                  </tr>
                  <!-- <tr>
                    <td class="pr-1 pb-1">{{ $t("ondate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge
                      >
                        {{ AppointQualCategory.ondate }}
                      </b-badge>
                    </td>
                  </tr> -->
                </tbody>
              </table>
            </b-card>
          </b-col>
          <b-col cols="12" md="6">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("startdate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.startdate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("enddate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.enddate }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1">{{ $t("docnumber") }} :</td>
                    <td class="font-weight-bold">
                      {{ CertForeignLang.docnumber }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
           <b-col cols="12" md="6">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("docdate") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ CertForeignLang.docdate }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("detailinfo") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.detailinfo }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("certforeignlangtype") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.certforeignlangtypename }}
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
                    <td class="pr-1 pb-1">{{ $t("givenorganization") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ CertForeignLang.givenorganization }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("schoolsubject") }} :</td>
                    <td class="font-weight-bold pb-1">
                      <b-badge
                      >
                        {{ CertForeignLang.schoolsubjectname }}
                      </b-badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{ $t('status') }}
                    </td>
                    <td>
                      <b-badge :variant="CertForeignLang.statusname == 'Утвержден' ? 'success' : CertForeignLang.statusname == 'Отправлен' ? 'info' : CertForeignLang.statusname == 'Создан' ||  CertForeignLang.statusname == 'Изминен' || CertForeignLang.statusname == 'Изменен' ? 'primary' : 'danger'"> {{ CertForeignLang.statusname }} </b-badge>
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
              <history-detail-info :history="CertForeignLang.History"></history-detail-info>
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
        v-if="$can('CertForeignLangApprove', 'permissions') && CertForeignLang.CanApprove"
          @click="OpenApproveModal"
          size="sm"
          variant="primary"
          class="w-100 mb-1"
          >
           <b-icon scale="1.4" icon="check2"></b-icon>
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="$can('CertForeignLangCancelApproval', 'permissions') && CertForeignLang.CanCancelApprove"
          @click="OpenCancelApproveModal"
          size="sm"
          variant="danger"
          class="w-100 mb-1"
          >
          <b-icon icon="x" scale="1.5"></b-icon>
          {{ $t("CancelApproval") }}
        </b-button>
        <b-button
        v-if="$can('CertForeignLangSent', 'permissions') && CertForeignLang.CanSend"
          @click="$refs['SendModal'].show()"
          size="sm"
          variant="success"
          class="w-100 mb-1"
          > {{ $t("Send") }}
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
        <b-row>
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
        </b-row>
        <b-card-text class="mt-3">
          <h5>{{ $t("id") }} : {{ CertForeignLang.id }}</h5> <span> <h5>{{ $t("name") }} : {{ CertForeignLang.personname }}</h5></span>
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
       <b-row>
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
        </b-row>
        <b-card-text class="mt-3">
           <h5>{{ $t("id") }} : {{ CertForeignLang.id }}</h5> <span> <h5>{{ $t("name") }} : {{ CertForeignLang.personname }}</h5></span>
          <h5>{{ $t("WantCancelApproval") }}</h5>
        </b-card-text>
        <b-row>
          <b-col class="text-right">
            <b-button class="mr-2" variant="danger" @click="$refs['CancelApprovalModal'].hide()"> {{ $t('Cancel') }} </b-button>
            <b-button variant="success" @click="CancelApproval"> {{ $t('Accept') }} </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal
        :ref="'SendModal'"
        :cancel-title="$t('Cancel')"
        :ok-title="$t('Accept')"
        cancel-variant="danger"
        ok-variant="success"
        @ok="Send(CertForeignLang)"
      >
        <template #modal-title>
          {{ $t("Send") }} <b-spinner v-if="SendLoading" small></b-spinner>
        </template>
        <b-card-text>
           <h5>{{ $t("id") }} : {{ CertForeignLang.id }}</h5> <span> <h5>{{ $t("name") }} : {{ CertForeignLang.personname }}</h5></span>
          <h5>{{ $t("WantSend") }}</h5>
        </b-card-text>
      </b-modal>
    </b-row>
    <b-row>

      <b-col> </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import CertForeignLangService from "@/services/CertForeignLang.service";
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
      CertForeignLang : {},
      previewshow: false,
     CertForeignLangPreview: {},
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
    CertForeignLangService.Get(this.$route.params.id).then((res) => {
      self.CertForeignLang = res.data;
      this.previewshow = false
    })
    self.Loading = false
  },
  computed: {
   
   
  },
  methods: {
    Back(){
      this.$router.push({name : 'CertForeignLang',query : {
        statusid : this.$route.query.statusid,
        oblastid : this.$route.query.oblastid,
        regionid : this.$route.query.regionid,
        organizationid : this.$route.query.organizationid,
        documentseries : this.$route.query.documentseries,
        documentnumber : this.$route.query.documentnumber,
        personname : this.$route.query.personname,
      }})
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
    Delete(item) {
      this.DeleteLoading = true;
      CertForeignLangService.Delete(item.id)
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
    Send(item) {
      this.SendLoading = true;
     CertForeignLangService.Send(item.id)
        .then((res) => {
          this.SendLoading = false;
          this.makeToast(this.$t("SendSuccess"),this.$t('message'), "success");
          this.Back()
        })
        .catch((error) => {
          this.SendLoading = false;
          this.makeToast(error.response.data.error,this.$t('error'), "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      CertForeignLangService.Approve(this.ApproveData)
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
      CertForeignLangService.CancelApproval(this.CancelApproveData)
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
    Accept(item) {
      this.AcceptLoading = true;
      CertForeignLangService.Accept(item.id)
        .then((res) => {
          this.AcceptLoading = false;
          this.makeToast(this.$t("AcceptSuccess"),this.$t('message'), "success");
          this.$router.go(-1);
        })
        .catch((error) => {
          this.makeToast(error.response.data.error,this.$t('error'), "danger");
          this.AcceptLoading = false;
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
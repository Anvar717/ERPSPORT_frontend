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
              <h4 >{{ $t("LongRunningQuery") }}</h4>
            </b-col>
            <b-col sm="12" md="6" class="text-right">
              <b-button-group size="sm">
                <b-button
                   @click="$router.push({ name: 'LongRunningQuery' })"
                  variant="outline-danger"
                  ><b-icon icon="arrow-left-circle-fill"></b-icon> {{ $t("back") }}
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
    <b-row class="mt-4">
      <b-col cols="12" :md="11">
        <b-row>
          <b-col md="1"></b-col>
          <b-col cols="12" md="4">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("id") }} :</td>
                    <td class="pb-1">
                      <span class="font-weight-bold">
                        {{ AppointQualCategory.id }}
                      </span>
                    </td>
                  </tr>
                  <tr >
                    <td class="pr-1 pb-1">
                      {{ $t('startdate') }}
                    :</td>
                    <td  class="font-weight-bold pb-1">
                      {{ AppointQualCategory.start_date }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("enddate") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ AppointQualCategory.end_date }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
          <b-col cols="12" md="7">
            <b-card>
              <table>
                <tbody>
                  <tr>
                    <td class="pr-1 pb-1">{{ $t("queryparam") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ AppointQualCategory.query_param }}
                    </td>
                  </tr>
                  <tr class="mt-2">
                    <td class="pr-1 pb-1">{{ $t("methodname") }} :</td>
                    <td class="font-weight-bold pb-1">
                      {{ AppointQualCategory.method_name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </b-col>
        </b-row>
        
      </b-col>

  
    </b-row>
    </CCard>
  </b-overlay>
</template>

<script>
import LongRunningQueryService from "@/services/longrunningquery.service";
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
    BFormTextarea
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
    LongRunningQueryService.Get(this.$route.params.id).then((res) => {
      self.AppointQualCategory = res.data;
      this.previewshow = false
    })
    self.Loading = false
  },
  computed: {
   
   
  },
  methods: {
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
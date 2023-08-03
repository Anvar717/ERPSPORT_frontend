<template>
  <b-overlay :show="show">
    <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('SchoolAdmission')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
            <b-row>
                <b-col sm="12" md="6">
                    {{ $t('docnumber') }} : <b> {{ SchoolAdmission.docnumber }} </b>
                </b-col>
                <b-col sm="12" md="6">
                    {{ $t('docdate') }} : <b> {{ SchoolAdmission.docdate }} </b>
                </b-col>
                <b-col sm="12" md="6">
                    {{ $t('schoolyear') }} : <b> {{ SchoolAdmission.schoolyearname }} </b>
                </b-col>
                <b-col sm="12" md="6">
                    {{ $t('OrgSchoolGrade') }} : <b> {{ SchoolAdmission.orgschoolgradename }} </b>
                </b-col>
                <b-col sm="12" md="6">
                    {{ $t('detailinfo') }} : <b> {{ SchoolAdmission.detailinfo }} </b>
                </b-col>
            </b-row>
        </CCardBody>
        <CRow>
          <CCol>
            <b-table
              :fields="SchoolAdmissionTables"
              :items="SchoolAdmission.Tables"
              class="bg-color-table text-center  mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              small
            >
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'SchoolAdmission',query : {
                  startdate : $route.query.startdate,
                  enddate : $route.query.enddate,
                  search : $route.query.search,
                  schoolyear : $route.query.schoolyear,
                  orgschoolgrade : $route.query.orgschoolgrade,
                  pagelimit : $route.query.pagelimit
                }})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
  <b-row>
      <b-col sm="12" md="6">
          <history-detail-info :history="SchoolAdmission.History"></history-detail-info>
      </b-col>
  </b-row>
  </b-overlay>
</template>

<script>
import SchoolAdmissionService from "@/services/SchoolAdmission.service";
import HistoryDetailInfo from '@/components/HistoryDetailInfo.vue'
export default {
    components : { HistoryDetailInfo },
  data() {
    return {
      SchoolAdmission: {},
      SchoolAdmissionTables: [
        { key: "personname", label: this.$t("StudentName") },
        { key: "estatementnumber", label: this.$t("EstatementNumber") },
        { key: "estatementdate", label: this.$t("EstatementDate") },
        { key : 'studentadmissiontypename',label : this.$t('studentadmissiontypename')},
        { key : 'fromorganizationname', label : this.$t('fromorganizationname')}
      ],
      show : false,
    };
  },
  created() {
    this.Get()
    
  },
  methods: {
    Get(){
      this.show = true
      SchoolAdmissionService.Get(this.$route.params.id).then(res => {
        this.SchoolAdmission = res.data;
        this.show = false
      }).catch(error => {
        this.makeToast(error.response.data.error,this.$t('error'),'danger')
      });
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
};
</script>

<style>
</style>

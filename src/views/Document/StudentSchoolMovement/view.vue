<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("StudentSchoolMovement") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'StudentSchoolMovement',query : { Search : $route.query.Search } })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <!-- <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }} -->
            <CCard>
              <CCardBody>
                     <b-row>
                <b-col sm="12" md="4">
                    {{ $t('docnumber') }} : <b> {{ StudentSchoolMovement.docnumber }} </b>
                </b-col>
                <b-col sm="12" md="4">
                    {{ $t('docdate') }} : <b> {{ StudentSchoolMovement.docdate }} </b>
                </b-col>
                <b-col sm="12" md="4">
                    {{ $t('detailinfo') }} : <b> {{ StudentSchoolMovement.detailinfo }} </b>
                </b-col>
            </b-row>
              </CCardBody>
            </CCard>

            <CCard sm="12">
              <CCardHeader>
                <strong>{{$t('fromorganizationdata')}}</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol sm="2">
                    <div class="form-group form-row">
                      <label>{{$t('fromoblast')}}</label>
                      <span
                        style="color:blue;height:32px;vertical-align:middle"
                        class="form-control"
                      >{{StudentSchoolMovement.fromoblastname}}</span>
                    </div>
                  </CCol>
                  <CCol sm="2">
                    <label>{{$t('fromregion')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromregionname}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('fromorganization')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromorganizationname}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('fromdirector')}}</label>
                    <br />
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromdirector}}</span>
                  </CCol>
                </CRow>
                <CRow>
                   <CCol sm="2">
                    <label>{{$t('fromschoolyear')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromschoolyearname}}</span>
                  </CCol>
                  <CCol sm="2">
                    <label>{{$t('fromorgschoolgrade')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromorgschoolgradename}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('fromperson')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.frompersonname}}</span>
                  </CCol>
                  <CCol sm="4">
                    <label>{{$t('FromStudentAdmissionid')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.fromstudentadmissionname}}</span>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>

            <CCard sm="6">
              <CCardHeader>
                <strong>{{$t('toorganizationdata')}}</strong>
              </CCardHeader>
              <CCardBody>
                <CRow class="mb-2">
                    <CCol sm="3">
                    <label>{{$t('tooblast')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.tooblastname}}</span>
                  </CCol>
                  <CCol sm="3">
                    <label>{{$t('toregion')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.toregionname}}</span>
                  </CCol>
                   <CCol sm="6">
                    <label>{{$t('toorganization')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.toorganizationname}}</span>
                  </CCol>
                </CRow>

                <CRow>
                    <CCol sm="6">
                    <label>{{$t('todirector')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.todirector}}</span>
                  </CCol>
                  <CCol sm="6">
                    <label>{{$t('tocontactinfo')}}</label>
                    <span
                      style="color:blue;height:32px"
                      class="form-control"
                    >{{StudentSchoolMovement.tocontactinfo}}</span>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
        </CCardBody>

        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'StudentSchoolMovement',query : { Search : $route.query.Search } })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import StudentSchoolMovementService from "@/services/StudentSchoolMovement.service";
export default {
  data() {
    return {
      SaveLoading: false,
      StudentSchoolMovement: {
        docdate: "",
        docnumber: "",
        fromoblastname: "",
        fromregionname: "",
        fromorganizationname: "",
        fromdirector: "",
        fromschoolyearid: 0,
        fromorgschoolgradeid: 0,
        frompersonid: 0,
        tooblastid: 0,
        toregionid: 0,
        toorganizationid: 0,
        todirector: "",
        tocontactinfo: "",
        detailinfo: ""
      },
      toastCount: 0,
      allSignupErrors: {},
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    StudentSchoolMovementService.GetDetail(this.$route.params.id).then(res => {
      this.StudentSchoolMovement = res.data.studentSchoolMovement;
    });
  },
  methods: {
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },

    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    }
  }
};
</script>

<style></style>
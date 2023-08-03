<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("TeacherReTraining") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("docnumber")
                  }}</label>
                  <div class="col-sm-8">
                    <CInput
                      disabled
                      style="width: 100%"
                      :placeholder="$t('docnumber')"
                      autocomplete="docnumber"
                      v-model="TeacherReTraining.docnumber"
                    >
                    </CInput>
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("docdate")
                  }}</label>
                  <div class="d-flex col-sm-8">
                    <date-picker
                      v-model="TeacherReTraining.docdate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('docdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    >
                    </date-picker>
                  </div>
                </div>
              </CCol>
            </CRow>
            <!-- <CRow class="mt-3">
              <CCol sm="4">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{
                    $t("oblastid")
                  }}</label>
                  <v-select
                    :options="OblastList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="TeacherReTraining.oblastid"
                    @input="ChangeOblast"
                    class="col-sm-8"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="4">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{
                    $t("regionid")
                  }}</label>
                  <v-select
                    :options="RegionList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="TeacherReTraining.regionid"
                    @input="ChangeRegion"
                    class="col-sm-8"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="4">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-4" for>{{
                    $t("organization")
                  }}</label>
                  <v-select
                    :options="OrganizationList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="TeacherReTraining.organizationid"
                    class="col-sm-8"
                  ></v-select>
                </div>
              </CCol>
            </CRow> -->
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("Teacher")
                  }}</label>
                  <div class="d-flex col-sm-8">
                    <c-input
                      disabled
                      style="width: 100%"
                      :placeholder="$t('Teacher')"
                      v-model="TeacherReTraining.personname"
                    ></c-input>
                    <b-button
                      @click="OpenPersonModal"
                      variant="primary"
                      style="height: 35px"
                      size="sm"
                    >
                      <span>
                        <b-icon icon="three-dots"></b-icon>
                      </span>
                    </b-button>
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("schoolsubject")
                  }}</label>
                  <v-select
                    :options="SchoolSubjectList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="TeacherReTraining.schoolsubjectid"
                    @input="ChangeEduScience"
                    class="col-sm-8"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("docserainumber")
                  }}</label>
                  <div class="d-flex col-sm-8">
                    <CInput
                      class="mr-3"
                      style="width: 20%"
                      :placeholder="$t('AA')"
                      autocomplete="series"
                      v-model="TeacherReTraining.documentseries"
                    >
                    </CInput>
                    <CInput
                      style="width: 80%"
                      :placeholder="$t('9999999')"
                      autocomplete="documentnumber"
                      v-model="TeacherReTraining.documentnumber"
                    >
                    </CInput>
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("givenbyorgid")
                  }}</label>
                  <v-select
                    :options="GivenByOrgList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="TeacherReTraining.givenbyorgid"
                    class="col-sm-8"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("dateofissue")
                  }}</label>
                  <div class="d-flex col-sm-8">
                    <date-picker
                      v-model="TeacherReTraining.dateofissue"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('dateofissue')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    >
                    </date-picker>
                  </div>
                </div>
              </CCol>
              <!-- <CCol sm="2" class="text-right">
                        <b-button
              variant="outline-primary"
              @click="$refs.refInputEl.$el.click()"
            >
              <b-spinner
                style="margin-right: 10px"
                small
                v-if="FileLoading"
              ></b-spinner>
              <b-icon v-if="!FileLoading" icon="plus"></b-icon>
              <span style="font-size: 16px"> {{ $t("fileupload") }} </span>
            </b-button>
            <b-form-file
              v-model="files.file"
              ref="refInputEl"
              :state="Boolean(files.file)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              :hidden="true"
              plain
              @change="ChangeFile($event)"
              accept=".jpg, .png"
            ></b-form-file>
                    </CCol> -->
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("attachmentfile")
                  }}</label>
                  <!-- <div class="form-group form-row"> -->
                  <div class="d-flex col-sm-8">
                    <b-input-group>
                      <b-input-group-append>
                        <b-button
                          @click="$refs.refInputEl.$el.click()"
                          variant="outline-success"
                          >{{ $t("Upload") }}</b-button
                        >
                        <b-form-file
                          v-model="files.file"
                          ref="refInputEl"
                          :state="Boolean(files.file)"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                          :hidden="true"
                          plain
                          @change="ChangeFile($event)"
                          accept=".jpg, .png"
                        ></b-form-file>
                      </b-input-group-append>
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
                  </div>
                </div>
                <!-- </div> -->
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("detailinfo")
                  }}</label>
                  <div class="col-sm-8">
                    <!-- <CInput
                    style="width: 100%"
                      :placeholder="$t('detailinfo')"
                      autocomplete="detailinfo"
                      v-model="TeacherReTraining.detailinfo"
                    >
                    </CInput> -->
                    <b-form-textarea
                      id="textarea"
                      v-model="TeacherReTraining.detailinfo"
                      :placeholder="$t('detailinfo')"
                      rows="3"
                      max-rows="6"
                      class="mb-3"
                    ></b-form-textarea>
                  </div>
                </div>
              </CCol>
              <CCol> </CCol>
            </CRow>
            <CRow>
              <CCol>
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
                    <div
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
                    </div>
                  </b-col>
                </b-row>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="
                  $router.push(`/LearningProcessManagement/TeacherReTraining`)
                "
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal
        id="PersonModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Person')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :isteacher="true"
          @SelectedItem="SelectedItem"
          @DblClick="AddPersonData"
        ></employee-list>
        <!-- <get-employee-list-component @SelectedItem="SelectedItem(personvalue)" :isAllEmployee="false" @DblClick="AddPersonData"></get-employee-list-component> -->
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPersonData(personvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import TeacherReTrainingService from "@/services/TeacherReTraining.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import PersonList from "@/components/PersonList";
import EmployeeList from "@/components/EmployeeList";
import FileManageService from "@/services/filemanage.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import axios from "axios";
export default {
  components: {
    PersonList,
    EmployeeList,
  },
  data() {
    return {
      SaveLoading: false,
      TeacherReTraining: {},
      axios,
      personvalue: {},
      SchoolSubjectList: [],
      GivenByOrgList: [],
      IssuedDiplomaList: [],
      filetype: "",
      OblastList: [],
      files: {
        file: [],
        filename: "",
        url: "",
      },
      RegionList: [],
      OrganizationList: [],
      fields: [
        {
          key: "languagename",
          label: this.$t("translateModal.status"),
        },
        {
          key: "translatetext",
          label: this.$t("translateModal.name"),
        },
        {
          key: "actions",
          label: "",
        },
      ],
      allSignupErrors: {},
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      OblastList: [],
      FileLoading: false,
      RegionList: [],
      OrganizationList: [],
      JobTypeList: [],
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    SchoolSubjectService.GetAll(this.lang).then((res) => {
      this.SchoolSubjectList = res.data;
    });
    TeacherReTrainingService.Get(this.$route.params.id).then((res) => {
      this.TeacherReTraining = res.data.TeacherReTraining;
      this.FileAttach.attachmentfileid =
        res.data.TeacherReTraining.attachmentfileid;
      this.FileAttach.attachmentfilename =
        res.data.TeacherReTraining.attachmentfilename;
      if (this.$route.params.id != 0) {
        let text = this.TeacherReTraining.attachmentfilename;
        let result = text.slice(-3);
        this.filetype = result;
       if(this.filetype != 'pdf'){
         FileManageService.Get(this.TeacherReTraining.attachmentfileid)
          .then((res1) => {
            this.TeacherReTraining.attachmentfileid = res1.data.id;
            //  this.TeacherReTraining.attachmentfilename = res.data.pfiletext
            this.TeacherReTraining.attachmentfiletype = res1.data.pfiletype;
            (this.TeacherReTraining.url = window.URL.createObjectURL(
              new Blob([res1.data])
            )),
              console.log(this.TeacherReTraining.attachmentfileid);
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("error"),
              "danger"
            );
          });
       }
      }
      this.ChangeOblast();
      this.ChangeRegion();
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    OrganizationService.GetAll(0, 0, "", 7).then((res) => {
      this.GivenByOrgList = res.data;
    });
    HelperService.GetCustomJobTypeList().then((res) => {
      this.JobTypeList = res.data;
    });
  },
  methods: {
    ChangeEduScience() {
      if (!!this.TeacherReTraining.schoolsubjectid) {
        this.TeacherReTraining.schoolsubjectname =
          this.SchoolSubjectList.filter(
            (item) => item.id == this.TeacherReTraining.schoolsubjectid
          )[0].name;
      }
    },
    OpenPersonModal() {
      this.$bvModal.show("PersonModal");
    },
    ClosePersonModal() {
      this.$bvModal.hide("PersonModal");
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    AddPersonData(data) {
      var self = this;
      console.log(data);
      self.TeacherReTraining.personid = data.personid;
      self.TeacherReTraining.personname = data.personname;
      self.ClosePersonModal();
    },
    ChangeOblast() {
      //this.CustomJobLog.regionid = ''
      //this.CustomJobLog.organizationid = ''
      if (!!this.TeacherReTraining.oblastid) {
        RegionService.GetAll(this.lang, this.TeacherReTraining.oblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
    },
    ChangeRegion() {
      // this.CustomJobLog.organizationid = ''
      if (!!this.TeacherReTraining.regionid) {
        OrganizationService.GetAll(0, this.TeacherReTraining.regionid).then(
          (res) => {
            this.OrganizationList = res.data;
          }
        );
      }
    },
    DeleteFile() {
      this.TeacherReTraining.attachmentfileid = 0;
      this.TeacherReTraining.attachmentfilename = "";
      this.TeacherReTraining.attachmentfiletype = "";
      this.TeacherReTraining.url = "";
    },
    SaveData() {
      this.TeacherReTraining.attachmentfileid =
        this.FileAttach.attachmentfileid;
      this.TeacherReTraining.attachmentfilename =
        this.FileAttach.attachmentfilename;
      if (!this.check()) {
        return false;
      }
      this.TeacherReTraining.code = this.TeacherReTraining.docnumber;
      this.SaveLoading = true;
      TeacherReTrainingService.Update(this.TeacherReTraining)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/LearningProcessManagement/TeacherReTraining`);
        })
        .catch((error) => {
          this.SaveLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    ChangeFile(event) {
      const file = event.target.files[0];
      var formData = new FormData();
      formData.append("attachfile", file);
      this.FileLoading = true;
      FileManageService.Attach(formData)
        .then((res) => {
          this.FileLoading = false;
          this.TeacherReTraining.attachmentfileid = res.data.id;
          this.TeacherReTraining.attachmentfilename = res.data.pfiletext;
          this.TeacherReTraining.attachmentfiletype = res.data.pfiletype;
          this.TeacherReTraining.url = URL.createObjectURL(file);
          this.FileAttach.attachmentfileid = res.data.id;
          this.FileAttach.attachmentfilename = res.data.pfiletext;
          this.FileAttach.attachmentfiletype = res.data.pfiletype;
          this.FileAttach.url = URL.createObjectURL(file);
          let text = this.TeacherReTraining.attachmentfilename;
          let result = text.slice(-3);
          this.filetype = result;
        })
        .catch((error) => {
          this.FileLoading = false;
          this.makeToast(error.response.data.error, "danger");
        });
    },
    check() {
      var self = this;
      if (
        self.TeacherReTraining.docnumber === 0 ||
        self.TeacherReTraining.docnumber === null ||
        self.TeacherReTraining.docnumber === undefined ||
        self.TeacherReTraining.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.TeacherReTraining.oblastid === 0 ||
      //   self.TeacherReTraining.oblastid === null ||
      //   self.TeacherReTraining.oblastid === undefined ||
      //   self.TeacherReTraining.oblastid === ""
      // ) {
      //   this.makeToast(this.$t("oblastNotCorrect"), this.$t("Error"), "danger");
      //   return false;
      // }
      // if (
      //   self.TeacherReTraining.regionid === 0 ||
      //   self.TeacherReTraining.regionid === null ||
      //   self.TeacherReTraining.regionid === undefined ||
      //   self.TeacherReTraining.regionid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("regionNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.TeacherReTraining.schoolsubjectid === 0 ||
        self.TeacherReTraining.schoolsubjectid === null ||
        self.TeacherReTraining.schoolsubjectid === undefined ||
        self.TeacherReTraining.schoolsubjectid === ""
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //  if (
      //   self.TeacherReTraining.organizationid === 0 ||
      //   self.TeacherReTraining.organizationid === null ||
      //   self.TeacherReTraining.organizationid === undefined ||
      //   self.TeacherReTraining.organizationid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("organizationNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.TeacherReTraining.givenbyorgid === 0 ||
        self.TeacherReTraining.givenbyorgid === null ||
        self.TeacherReTraining.givenbyorgid === undefined ||
        self.TeacherReTraining.givenbyorgid === ""
      ) {
        this.makeToast(
          this.$t("givenbyorgNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherReTraining.personid === 0 ||
        self.TeacherReTraining.personid === null ||
        self.TeacherReTraining.personid === undefined ||
        self.TeacherReTraining.personid === ""
      ) {
        this.makeToast(
          this.$t("PersonIdNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherReTraining.attachmentfileid === 0 ||
        self.TeacherReTraining.attachmentfileid === null ||
        self.TeacherReTraining.attachmentfileid === undefined ||
        self.TeacherReTraining.attachmentfileid === ""
      ) {
        this.makeToast(
          this.$t("attachmentfileNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeacherReTraining.detailinfo === 0 ||
        self.TeacherReTraining.detailinfo === null ||
        self.TeacherReTraining.detailinfo === undefined ||
        self.TeacherReTraining.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.TeacherReTraining.statusid === 0 ||
      //     self.TeacherReTraining.statusid === null ||
      //     self.TeacherReTraining.statusid === undefined ||
      //     self.TeacherReTraining.statusid === ""
      //   ) {
      //     this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
      //     return false;
      //   }
      return true;
    },
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(
            res,
            this.FileAttach.attachmentfilename
          );
          console.log(this.TeacherReTraining.attachmentfilename);
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
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
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
};
</script>

<style>
</style>
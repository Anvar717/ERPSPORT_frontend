<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 v-if="typeid===1" class="text-center">{{$t('ProblemEdu')}}</h4>
              <h4 v-if="typeid===2" class="text-center">{{$t('SuggestionsEdu')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="directionname" rules="required">
                  <CInput
                    v-if="typeid===1"
                    :placeholder="$t('directionname')"
                    autocomplete="directionname"
                    horizontal
                    :label="$t('directionname')"
                    v-model="ProblemEdu.directionname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                  <CInput
                    v-if="typeid===2"
                    :placeholder="$t('suggestionname')"
                    autocomplete="suggestionname"
                    horizontal
                    :label="$t('suggestionname')"
                    v-model="ProblemEdu.directionname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <div class="form-group form-row">
                  <label
                    class="col-form-label col-sm-3"
                    v-if="typeid===1"
                    for
                  >{{$t('questiontext')}}</label>
                  <label
                    class="col-form-label col-sm-3"
                    v-if="typeid===2"
                    for
                  >{{$t('suggestiontext')}}</label>
                  <textarea
                    class="form-control col-sm-9"
                    v-model="ProblemEdu.questiontext"
                    rows="5"
                  ></textarea>
                </div>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                  <CCol sm="15">
                    <div class="form-group form-row">
                      <label class="col-form-label col-sm-3" for>{{$t('department')}}</label>
                      <v-select
                        class="col-sm-9"
                        :options="departmentlist"
                        v-model="ProblemEdu.fordepartment"
                        :reduce="item => item.name"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      ></v-select>
                    </div>
                  </CCol>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('answertext')}}</label>
                  <textarea class="form-control col-sm-9" v-model="ProblemEdu.answertext" rows="5"></textarea>
                </div>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="answeredby" rules="required">
                  <CInput
                    :placeholder="$t('answeredby')"
                    autocomplete="text"
                    horizontal
                    :label="$t('answeredby')"
                    v-model="ProblemEdu.answeredby"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <ValidationProvider v-slot="v" name="dateofanswer" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('dateofanswer')}}</label>
                    <div class="col-sm-6">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="ProblemEdu.dateofanswer"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('dateofanswer')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8">
                <div class="form-group form-row">
                  <label for class="col-form-label col-sm-3">{{$t('DoImport')}}</label>
                  <b-form-file
                    class="col-sm-9"
                    type="file"
                    multiple
                    id="file"
                    accept=".xls, .xlsx, .doc, .docx, .txt"
                    ref="file"
                    v-model="file"
                    :browse-text="$t('DoImport')"
                    :placeholder="$t('DoImport')"
                    drop-placeholder="Импортироват:"
                  >
                    <template slot="file-name" slot-scope="{ names }">
                      <b-badge
                        variant="dark"
                        class="ml-1"
                        v-for="(name,index) in names"
                        :key="'key-'+index"
                      >{{ name }}</b-badge>
                    </template>
                  </b-form-file>
                </div>
              </CCol>
              <CCol sm="2"></CCol>
            </CRow>
            <CRow>
              <CCol sm="2"></CCol>
              <CCol sm="8" v-if="$route.params.id">
                <label for class="col-form-label col-sm-3">{{$t('files')}} :</label>
                <div class="col-sm-9 float-right">
                  <span
                    v-for="(item,index) in ProblemEdu.TablesFile"
                    :key="index"
                    class="mr-2"
                    style="cursor:pointer"
                    v-show="item.Status != 3"
                  >
                    <a download @click="Download(item)">
                      <CBadge color="primary">{{item.attachfilename}}</CBadge>
                    </a>
                    <a href="javascript:void(0)" @click="$bvModal.show('DeleteModal' + item.id)">
                      <CBadge color="danger" size="lg">X</CBadge>
                    </a>
                    <b-modal :id="'DeleteModal' + item.id" hide-footer>
                      <template v-slot:modal-title>{{$t('WantDelete')}}</template>
                      <div class="d-block text-right">
                        <CButton
                          @click="$bvModal.hide('DeleteModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{$t('NotAccept')}}
                        </CButton>
                        <CButton @click="removeFile(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{$t('Accept')}}
                        </CButton>
                      </div>
                    </b-modal>
                  </span>
                </div>
              </CCol>
              <CCol sm="2"></CCol>
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
                @click="$router.push( typeid == 1 ? '/ProblemEdu/ProblemEdu' : '/ProblemEdu/SuggestionsEdu')" 
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import ProblemEduService from "@/services/ProblemEdu.service";
import DepartmentService from "@/services/Department.service";
import { BSpinner,BFormFile,BBadge } from 'bootstrap-vue'
import vSelect from 'vue-select'
import DatePicker from 'vue2-datepicker'
export default {
  components : { vSelect,BSpinner,DatePicker,BFormFile,BBadge },
  props: {
    typeid: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      deleteModal: false,
      SaveLoading: false,
      loadingButtonDeleteButton: false,
      ProblemEdu: {
        typeid: 1,
        directionname: '',
        questiontext:'',
        fordepartment: '',
        answertext:'',
        answeredby: '',
        TablesFile: []
      },
      departmentlist: [],
      items: [],
      toastCount: 0,
      allSignupErrors: {},
      file: []
    };
  },
  created() {
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
    ProblemEduService.Get(this.$route.params.id, this.typeid).then(res => {
      this.ProblemEdu = res.data;
    });
    DepartmentService.GetAll().then(res => {
      this.departmentlist = res.data;
    });
    this.ProblemEdu.typeid = this.typeid;
  },
  methods: {
    SaveData() {
      if (!this.check()) {
        return false;
      }
      let formData = new FormData();
      formData.append("id", this.ProblemEdu.id);
      formData.append("typeid", this.ProblemEdu.typeid);
      formData.append("directionname", this.ProblemEdu.directionname);
      formData.append("questiontext", this.ProblemEdu.questiontext);
      formData.append("fordepartment", this.ProblemEdu.fordepartment);
      formData.append("answertext", this.ProblemEdu.answertext);
      formData.append("answeredby", this.ProblemEdu.answeredby);
      formData.append("TablesFile", this.ProblemEdu.TablesFile);

      if (this.file.length > 0) {
        this.file.forEach((file, i) => {
          formData.append("attachedfiles", file);
        });
      }

      ProblemEduService.Update(formData)
        .then(res => {
          this.$makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push( this.typeid == 1 ? '/ProblemEdu/ProblemEdu' : '/ProblemEdu/SuggestionsEdu');
        })
        .catch(error => {
          this.$makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    removeFile(item) {
      item.Status = 3;

      this.$bvModal.hide("DeleteModal" + item.id);
    },
    check() {
      var self = this;
      if (
        self.ProblemEdu.directionname === 0 ||
        self.ProblemEdu.directionname === null ||
        self.ProblemEdu.directionname === undefined ||
        self.ProblemEdu.directionname === ""
      ) {
        this.$makeToast(
          this.$t("directionnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ProblemEdu.questiontext === 0 ||
        self.ProblemEdu.questiontext === null ||
        self.ProblemEdu.questiontext === undefined ||
        self.ProblemEdu.questiontext === ""
      ) {
        this.$makeToast(
          this.$t("QuestionTextNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ProblemEdu.fordepartment === 0 ||
        self.ProblemEdu.fordepartment === null ||
        self.ProblemEdu.fordepartment === undefined ||
        self.ProblemEdu.fordepartment === ""
      ) {
        this.$makeToast(
          this.$t("fordepartmentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    openDeleteModal(id) {
      this.deleteFileUniqueId = id;
      this.deleteModal = true;
    },
    handleFileUpload() {
      this.file = this.$refs.file;
    },
    forceFileDownload(response, name, attachfilename) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      let format = attachfilename.split(".");
      if (format.length > 0) {
        link.setAttribute(
          "download",
          format[0] + "." + format[format.length - 1]
        );
      }
      document.body.appendChild(link);
      link.click();
    },
    Download(item) {
      ProblemEduService.Download(this.ProblemEdu.id, item.id)
        .then(res => {
          this.forceFileDownload(res, item.id, item.attachfilename);
          this.$makeToast(
            this.$t("SuccessImport"),
            this.$t("message"),
            "success"
          );
        })
        .catch(error => {
          this.$makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    ImportFromExcel() {
      let formData = new FormData();

      // var selectfiles = this.file
      this.file.forEach((file, i) => {
        formData.append("excelfile", file);
      });
      formData.append("excelfile", 1);
      // formData.append('excelfile', selectfiles);
      /* formData.append("budget", this.Budget); */
      ProblemEduService.Update(formData)
        .then(res => {
          // this.ImportLoading = false
          // this.ImportModal = false
          alert(this.$t("ImportMessage"));
        })
        .catch(error => {
          alert(error.response.data.error);
        });
    }
  }
};
</script>

<style>
</style>
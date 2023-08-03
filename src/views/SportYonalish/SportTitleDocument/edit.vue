<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <h3 class="text-center mt-2">
          <!-- <b-icon icon="pencil"></b-icon> -->
          {{ $t("SportTitleDocument") }}
        </h3>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3">
                <ValidationProvider v-slot="v" name="docnumber">
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                   disabled
                    autocomplete="text"
                    v-model="SportTitleDocument.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="SportTitleDocument.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('docdate')"
                  disabled
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </CCol>
              <CCol sm="6">
                <div class="form-group">
                  <label for="datepicker-dateformat2" class="col-form-label">{{
                    $t("Sportchi")
                  }}</label>
                  <div>
                    <b-input-group>
                      <b-form-input
                        disabled
                        v-model="SportTitleDocument.personname"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary" @click="OpenPersonModal">
                          <b-icon icon="three-dots"></b-icon>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol>
               <CCol sm="3">
                <ValidationProvider v-slot="v" name="ordernumber">
                  <label>{{ $t("ordernumber1") }}</label>
                  <CInput
                    autocomplete="text"
                    v-model="SportTitleDocument.ordernumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("orderdate1") }}</label>
                <date-picker
                  v-model="SportTitleDocument.orderdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('orderdate1')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </CCol>
              <!-- <CCol sm="3">
                <ValidationProvider v-slot="v" name="certificatenumber">
                  <label>{{ $t("IdentityDocNumber") }}</label>
                  <CInput
                    type="number"
                    autocomplete="text"
                    v-model="SportTitleDocument.certificatenumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("givendate") }}</label>
                <date-picker
                  v-model="SportTitleDocument.givendate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('givendate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </CCol> -->
              <CCol sm="3">
                <label>{{ $t("sporttype") }}</label>
                <v-select
                  :options="sporttypeclassifierlist"
                  v-model="SportTitleDocument.sporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="fname-select"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("sporttitle") }}</label>
                <v-select
                  :options="sporttitlelist"
                  v-model="SportTitleDocument.sporttitleid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="fname-select"
                >
                <template #no-options="{ search, searching, loading }">
                  {{ $t("NoInfo") }}
                </template></v-select>
              </CCol>
            
            </CRow>
            <custom-file-group 
              :labels="TitleFileTypeList" 
              @change="ChangeFile1" 
              :items="SportTitleDocument.FileTables"
              @delete="el => { SportTitleDocument.FileTables = el }"
            ></custom-file-group>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'SportTitleDocument' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" :disabled="SaveLoading" color="success" class="mr-4" @click="SaveData">
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
          :title="$t('Student')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            persontypeid = 1
            isallperson = true
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          ></person-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="ClosePersonModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(studentvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
    </CCol>
  </CRow>
</template>
    
    <script>
import SportTitleDocumentService from "@/services/SportTitleDocument.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTitleService from "@/services/SportTitle.service";
import EmployeeList from "@/components/EmployeeList";
import PersonList from "@/components/PersonList";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import FileManageService from "@/services/filemanage.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
export default {
  components: {
    EmployeeList,
    PersonList,
    CustomFileGroup,
  },
  data() {
    return {
      SaveLoading: false,
      fileLoading: false,
      DownloadLoading: false,
      DeleteLoading: false,
      studentvalue: {},
      spinnerindex: 0,
      SportTitleDocument: {},
      sporttypeclassifierlist: [],
      TitleFileTypeList: [],
      sporttitlelist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      selectedrowid: 0,
      configid: 0,
      filename: "",
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;

    SportTitleDocumentService.Get(self.selectedrowid).then((res) => {
      self.SportTitleDocument = res.data;
      self.TitleFileTypeList = res.data.table.Tables;
      res.data;
      if (self.selectedrowid != 0) {
        self.changeOblast();
        self.changeRegion();
      }
    });
    SportTypeClassifierService.GetAll().then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
    SportTitleService.GetAll(false).then((res) => {
      self.sporttitlelist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      self.oblastlist = res.data;
    });
  },
  methods: {
    DownloadFile(item) {
      this.DownloadLoading = item.attachmentfileid;
      FileManageService.Get(item.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, item.attachmentfilename);
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

    OpenPersonModal() {
      this.$bvModal.show("PersonModal");
    },
    ClosePersonModal() {
      this.$bvModal.hide("PersonModal");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    AddPersonData(data) {
      var self = this;
      console.log(data);
      self.SportTitleDocument.personid = data.id;
      self.SportTitleDocument.personname = data.fullname;
      self.ClosePersonModal();
    },
    changeOblast() {
      if (this.SportTitleDocument.oblastid != 0) {
        RegionService.GetAll(this.lang, this.SportTitleDocument.oblastid).then(
          (res) => {
            this.regionlist = res.data;
          }
        );
      }
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.SportTitleDocument.FileTables.push({
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
    changeRegion() {
      if (
        this.SportTitleDocument.oblastid != 0 &&
        this.SportTitleDocument.regionid != 0
      ) {
        OrganizationService.GetAll(
          this.SportTitleDocument.oblastid,
          this.SportTitleDocument.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    check() {
      var self = this;
      // if (
      //   self.SportTitleDocument.docnumber === null ||
      //   self.SportTitleDocument.docnumber === undefined ||
      //   self.SportTitleDocument.docnumber === 0 ||
      //   self.SportTitleDocument.docnumber === ""
      // ) {
      //   self.makeToast(
      //     self.$t("DocNumberNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.SportTitleDocument.docdate === null ||
        self.SportTitleDocument.docdate === undefined ||
        self.SportTitleDocument.docdate === 0 ||
        self.SportTitleDocument.docdate === ""
      ) {
        self.makeToast(
          self.$t("docdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTitleDocument.ordernumber === null ||
        self.SportTitleDocument.ordernumber === undefined ||
        self.SportTitleDocument.ordernumber === 0
      ) {
        self.makeToast(
          self.$t("ordernumberNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTitleDocument.orderdate === null ||
        self.SportTitleDocument.orderdate === undefined ||
        self.SportTitleDocument.orderdate === 0
      ) {
        self.makeToast(
          self.$t("orderdate1NotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.SportTitleDocument.oblastid === null ||
      //   self.SportTitleDocument.oblastid === undefined ||
      //   self.SportTitleDocument.oblastid === 0
      // ) {
      //   self.makeToast(
      //     self.$t("oblastNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.SportTitleDocument.regionid === null ||
      //   self.SportTitleDocument.regionid === undefined ||
      //   self.SportTitleDocument.regionid === 0
      // ) {
      //   self.makeToast(
      //     self.$t("regionNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.SportTitleDocument.organizationid === null ||
      //   self.SportTitleDocument.organizationid === undefined ||
      //   self.SportTitleDocument.organizationid === 0
      // ) {
      //   self.makeToast(
      //     self.$t("organizationNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.SportTitleDocument.personid === null ||
        self.SportTitleDocument.personid === undefined ||
        self.SportTitleDocument.personid === 0
      ) {
        self.makeToast(
          self.$t("personNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.SportTitleDocument.certificatenumber === null ||
      //   self.SportTitleDocument.certificatenumber === undefined ||
      //   self.SportTitleDocument.certificatenumber === 0
      // ) {
      //   self.makeToast(
      //     self.$t("IdentityDocNumberNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.SportTitleDocument.givendate === null ||
      //   self.SportTitleDocument.givendate === undefined ||
      //   self.SportTitleDocument.givendate === 0
      // ) {
      //   self.makeToast(
      //     self.$t("givendateNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.SportTitleDocument.sporttypeclassifierid === null ||
        self.SportTitleDocument.sporttypeclassifierid === undefined ||
        self.SportTitleDocument.sporttypeclassifierid === 0
      ) {
        self.makeToast(
          self.$t("sporttypeclassifieridNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportTitleDocument.sporttitleid === null ||
        self.SportTitleDocument.sporttitleid === undefined ||
        self.SportTitleDocument.sporttitleid === 0
      ) {
        self.makeToast(
          self.$t("sporttitleidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      console.log(
        self.SportTitleDocument.FileTables.filter((item) => item.Status != 3)
          .length
      );
      if (
        self.SportTitleDocument.FileTables.filter((item) => item.Status != 3)
          .length != 3
      ) {
        self.makeToast(
          self.$t("FileTables3CountNotFilled"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },

    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.SaveLoading = true;
      SportTitleDocumentService.Update(self.SportTitleDocument)
        .then((res) => {
          self.SaveLoading = false;
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "SportTitleDocument",
          });
        })
        .catch((error) => {
          self.SaveLoading = false;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
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
        solid: true,
      });
    },
  },
  watch: {},
};
</script>
    
    <style></style>
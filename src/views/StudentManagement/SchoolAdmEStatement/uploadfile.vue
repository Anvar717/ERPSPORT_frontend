<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary">
        <CCardBody>
          <CRow>
            <CCol>
              <h6>
                {{ $t("docnumber") }}:
                <a style="color:blue">{{ SchoolAdmEStatement.docnumber }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("docdate") }}:
                <a style="color:blue">{{ SchoolAdmEStatement.docdate }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("ismainquota") }}:
                <a style="color:blue">{{
                  SchoolAdmEStatement.ismainquota ? $t("yes") : $t("no")
                }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("islowincomefamily") }}:
                <a style="color:blue">{{
                  SchoolAdmEStatement.islowincomefamily ? $t("yes") : $t("no")
                }}</a>
              </h6>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <h6>
                {{ $t("SchoolYear") }}:
                <a style="color:blue">{{ schoolyearname }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("educationlanguage") }}:
                <a style="color:blue">{{ educationlanguagename }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("detailinfo") }}:
                <a style="color:blue">{{ SchoolAdmEStatement.detailinfo }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("diseases") }}:
                <a style="color:blue">{{ SchoolAdmEStatement.diseases }}</a>
              </h6>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard accent-color="secondary">
        <CCardHeader>
          <CRow>
            <CCol>
              <h5 class="text-left" style="color:blue">
                {{ SchoolAdmEStatement.personname }}
              </h5>
            </CCol>

            <CCol class="text-right">
              <CButton
                v-if="!SchoolAdmEStatement.CanSave"
                size="sm"
                color="danger"
                class="mr-4"
                @click="$bvModal.show('NotReceivedModal')"
              >
                <b-icon icon="x"></b-icon>
                {{ $t("NotReceivedd") }}
              </CButton>
              <CButton
                v-if="SchoolAdmEStatement.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="$bvModal.show('ReceivedModal')"
              >
                <b-icon icon="check2"></b-icon>
                {{ $t("Received") }}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <h6>
                {{ $t("dateofbirth") }}:
                <a style="color:blue">{{ person.dateofbirth }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("gender") }}: <a style="color:blue">{{ gender }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("nationality") }}:
                <a style="color:blue">{{ nationality }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("citizenship") }}:
                <a style="color:blue">{{ citizenshipname }}</a>
              </h6>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <h6>
                {{ $t("inn") }}: <a style="color:blue">{{ person.inn }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("pinfl") }}: <a style="color:blue">{{ person.pinfl }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("contactinfo") }}:
                <a style="color:blue">{{ person.contactinfo }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("birthcountry") }}:
                <a style="color:blue">{{ birthcountry }}</a>
              </h6>
            </CCol>
          </CRow>
          <hr />
          <CRow class="mt-4">
            <CCol>
              <h6>
                {{ $t("oblast") }}: <a style="color:blue">{{ oblastname }}</a>
              </h6>
            </CCol>
            <CCol>
              <h6>
                {{ $t("region") }}: <a style="color:blue">{{ regionname }}</a>
              </h6>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <h6>
                {{ $t("mfy") }}: <a style="color:blue">{{ mfyname }}</a>
              </h6>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <h6>
                {{ $t("birthaddress") }}:
                <a style="color:blue">{{ person.birthaddress }}</a>
              </h6>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol>
              <b-tabs pills card align="center">
                <b-tab :title="$t('Document')" active>
                  <CRow>
                    <CCol>
                      <b-table
                        :fields="fieldsDocument"
                        :items="person.DocumentTables"
                        class="bg-color-table text-center mx-3"
                        style="vertical-align:middle"
                        bordered
                        responsive="sm"
                        show-empty
                      >
                        <template v-slot:empty>
                          <h5 class="text-center">{{ $t("NoItems") }}</h5>
                        </template>
                      </b-table>
                    </CCol>
                  </CRow>
                </b-tab>
                <b-tab :title="$t('LivePlace')">
                  <CRow>
                    <CCol>
                      <b-table
                        :fields="fieldsLivePlace"
                        :items="person.LivePlaceTables"
                        class="bg-color-table text-center mx-3"
                        style="vertical-align:middle"
                        bordered
                        responsive="sm"
                        show-empty
                      >
                        <template v-slot:empty>
                          <h5 class="text-center">{{ $t("NoItems") }}</h5>
                        </template>
                      </b-table>
                    </CCol>
                  </CRow>
                </b-tab>
                <b-tab :title="$t('personrelative')">
                  <CRow>
                    <CCol>
                      <b-table
                        :fields="fieldsRelative"
                        :items="person.PersonRelativeTables"
                        class="bg-color-table text-center mx-3"
                        style="vertical-align:middle"
                        bordered
                        responsive="sm"
                        show-empty
                      >
                        <template v-slot:empty>
                          <h5 class="text-center">{{ $t("NoItems") }}</h5>
                        </template>
                      </b-table>
                    </CCol>
                  </CRow>
                </b-tab>
              </b-tabs>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <!-- <CRow>
                        <CCol sm="2"></CCol>
                        <CCol sm="8">
                            <CInput horizontal :label="$t('attachmentname')" v-model="attachmentname" />
                        </CCol>
                        <CCol sm="2"></CCol>
                    </CRow> -->
          <CRow v-if="SchoolAdmEStatement.CanSave">
            <CCol sm="2"></CCol>
            <CCol sm="8">
              <div class="form-group form-row">
                <label for class="col-form-label col-sm-3">{{
                  $t("DoImport")
                }}</label>
                <b-form-file
                  class="col-sm-9"
                  type="file"
                  multiple
                  id="file"
                  accept=".doc, .docx, .txt, .pdf, .jpg, .jpeg, .png"
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
                      v-for="(name, index) in names"
                      :key="'key-' + index"
                      >{{ name }}</b-badge
                    >
                  </template>
                </b-form-file>
              </div>
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
          <CRow v-if="FileLoading">
            <CCol sm="2"></CCol>
            <CCol sm="8" class="text-center">
              <b-spinner></b-spinner>
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
          <CRow v-if="!FileLoading">
            <CCol sm="2"></CCol>
            <CCol sm="8" v-if="$route.params.id">
              <label for class="col-form-label col-sm-3"
                >{{ $t("files") }} :</label
              >
              <div class="col-sm-9 float-right">
                <span
                  v-for="(item, index) in SchoolAdmEStatement.TablesFile"
                  :key="index"
                  class="mr-2"
                  style="cursor:pointer"
                >
                  <a download @click="Download(item)">
                    <CBadge color="primary">{{ item.attachfilename }}</CBadge>
                  </a>
                  <a
                    v-if="!isview && SchoolAdmEStatement.CanSave"
                    href="javascript:void(0)"
                    @click="$bvModal.show('DeleteModal' + item.id)"
                  >
                    <CBadge color="danger" size="lg">X</CBadge>
                  </a>
                  <b-modal :id="'DeleteModal' + item.id" hide-footer>
                    <template v-slot:modal-title>{{
                      $t("WantDelete")
                    }}</template>
                    <div class="d-block text-right">
                      <CButton
                        @click="$bvModal.hide('DeleteModal' + item.id)"
                        color="danger"
                        class="mr-2"
                      >
                        <b-icon icon="x"></b-icon>
                        {{ $t("NotAccept") }}
                      </CButton>
                      <CButton @click="removeFile(item)" color="success">
                        <b-icon icon="check2"></b-icon>
                        {{ $t("Accept") }}
                      </CButton>
                    </div>
                  </b-modal>
                </span>
              </div>
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="
                    $router.push({
                      name: isview
                        ? 'SchoolAdmEStatementSend'
                        : 'SchoolAdmEStatement',
                    })
                  "
                >
                  <b-icon icon="arrow-left-short" ></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol v-if="SchoolAdmEStatement.CanSave">
              <div class="text-right">
                <CButton
                  size="sm"
                  color="success"
                  class="mr-4"
                  @click="SaveData"
                >
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="cloud-upload"></b-icon>
                  {{ $t("Upload") }}
                </CButton>
              </div>
            </CCol>

            <b-modal :id="'NotReceivedModal'" hide-footer>
              <template v-slot:modal-title>{{ $t("WantNotAccept") }}</template>
              <div class="d-block text-right">
                <CRow class="mt-3" v-if="SchoolAdmEStatement.statusid === 8">
                  <CCol>
                    <label class="d-block text-left" for>{{
                      $t("Description")
                    }}</label>
                    <textarea
                      class="form-control"
                      v-model="Description"
                      rows="5"
                    ></textarea>
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol>
                    <CButton
                      @click="$bvModal.hide('NotReceivedModal')"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Cancel" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Accept") }}
                    </CButton>
                  </CCol>
                </CRow>
              </div>
            </b-modal>
            <b-modal :id="'ReceivedModal'" hide-footer>
              <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
              <div class="d-block text-right">
                <CButton
                  @click="$bvModal.hide('ReceivedModal')"
                  color="danger"
                  class="mr-2"
                >
                  <b-icon icon="x"></b-icon>
                  {{ $t("NotAccept") }}
                </CButton>
                <CButton @click="Accept" color="success">
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Accept") }}
                </CButton>
              </div>
            </b-modal>
          </CRow>
        </CCardBody>
      </CCard>
      <history-detail-info :history="history"></history-detail-info>
    </CCol>
  </CRow>
</template>

<script>
import SchoolAdmEStatementService from "@/services/SchoolAdmEStatement.service";
import SchoolYearService from "@/services/SchoolYear.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import HelperService from "@/services/helper.service";
import NationalityService from "@/services/Nationality.service";
import CountryService from "@/services/Country.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import MfyService from "@/services/Mfy.service";
import HistoryDetailInfo from "@/components/HistoryDetailInfo";
export default {
  props: { isview: Boolean },
  components: { HistoryDetailInfo },
  data() {
    return {
      file: [],
      SaveLoading: false,
      SendLoading: false,
      SchoolAdmEStatement: {},
      attachmentname: "",
      schoolyearname: "",
      educationlanguagename: "",
      history: [],
      nationality: "",
      citizenshipname: "",
      birthcountry: "",
      gender: "",
      oblastname: "",
      regionname: "",
      mfyname: "",
      person: {},
      FileLoading: false,
      Description: "",

      fieldsDocument: [
        {
          key: "ondate",
          label: this.$t("ondate"),
        },
        {
          key: "identitydocumentname",
          label: this.$t("IdentityDocument"),
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
        },
        {
          key: "dateofexpire",
          label: this.$t("dateofexpire"),
        },
        {
          key: "issueorganization",
          label: this.$t("issueorganization"),
        },
        {
          key: "statename",
          label: this.$t("state"),
        },
      ],
      fieldsLivePlace: [
        {
          key: "ondate",
          label: this.$t("ondate"),
        },
        {
          key: "countryname",
          label: this.$t("Country"),
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
        },
        {
          key: "regionname",
          label: this.$t("region"),
        },
        {
          key: "mfyname",
          label: this.$t("Mfy"),
        },
        {
          key: "address",
          label: this.$t("Address"),
        },
        {
          key: "statename",
          label: this.$t("state"),
        },
      ],
      fieldsRelative: [
        {
          key: "ondate",
          label: this.$t("ondate"),
        },
        {
          key: "kinshipdegreename",
          label: this.$t("KinshipDegree"),
        },
        {
          key: "familyname",
          label: this.$t("familyname"),
        },
        {
          key: "firstname",
          label: this.$t("firstname"),
        },
        {
          key: "lastname",
          label: this.$t("lastname"),
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
        },
      ],
    };
  },
  created() {
    this.loaddata();
  },
  methods: {
    loaddata() {
      this.FileLoading = true;
      SchoolAdmEStatementService.GetDetail(this.$route.params.id).then(
        (res) => {
          this.SchoolAdmEStatement = res.data.schoolAdmEStatement;
          this.history = res.data.history;
          this.person = res.data.schoolAdmEStatement.person;
          this.FileLoading = false;
          SchoolYearService.GetAll().then((res) => {
            this.schoolyearname = res.data.filter(
              (item) => item.id === this.SchoolAdmEStatement.schoolyearid
            )[0].name;
          });
          EducationLanguageService.GetAll().then((res) => {
            this.educationlanguagename = res.data.filter(
              (item) => item.id === this.SchoolAdmEStatement.educationlanguageid
            )[0].name;
          });
          HelperService.GetGenderList(this.lang).then((res) => {
            this.gender = res.data.filter(
              (item) => item.id === this.person.genderid
            )[0].name;
          });
          NationalityService.GetAll().then((response) => {
            this.nationality = response.data.filter(
              (item) => item.id === this.person.nationalityid
            )[0].name;
          });
          CountryService.GetAll().then((res) => {
            this.citizenshipname = res.data.filter(
              (item) => item.id === this.person.citizenshipid
            )[0].name;
            this.birthcountry = res.data.filter(
              (item) => item.id === this.person.birthcountryid
            )[0].name;
          });
          OblastService.GetAll(this.person.birthcountryid).then((res) => {
            this.oblastname = res.data.filter(
              (item) => item.id === this.person.birthoblastid
            )[0].name;
          });
          RegionService.GetAll(this.person.birthoblastid).then((res) => {
            this.regionname = res.data.filter(
              (item) => item.id === this.person.birthregionid
            )[0].name;
          });
          MfyService.GetAll(this.person.birthregionid).then((res) => {
            this.mfyname =
              this.person.birthmfyid > 0
                ? res.data.filter(
                    (item) => item.id === this.person.birthmfyid
                  )[0].name
                : "";
          });
        }
      );
    },
    /* Send(){
            var vm = this;
            let id = [{"id" : vm.$route.params.id}]
            vm.SendLoading = true
            SchoolAdmEStatementService.Send(id).then(res => {
                vm.SendLoading = false
                vm.makeToast(vm.$t('SendMessage'),vm.$t('message'),'success')
                    setTimeout(function() {
                        vm.$router.push({name : 'SchoolAdmEStatement'})
                    }, 500);
            }).catch(error => {
                vm.SendLoading = false
                vm.makeToast(error.response.data.error,vm.$t('message'),'danger')
            })
        }, */
    Accept() {
      var self = this;

      let id = [{ id: self.SchoolAdmEStatement.id }];
      SchoolAdmEStatementService.Accept(id)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.$bvModal.hide("ReceivedModal");
          self.$router.push({ name: "SchoolAdmEStatement" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.$bvModal.hide("ReceivedModal");
        });
    },
    Cancel() {
      var self = this;
      if (self.SchoolAdmEStatement.statusid === 8 && self.Description === "") {
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmEStatementService.Cancel(
        self.SchoolAdmEStatement.id,
        self.Description
      )
        .then((res) => {
          self.$bvModal.hide("NotReceivedModal");
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.Description = "";
          self.$router.push({ name: "SchoolAdmEStatement" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.Description = "";
          self.$bvModal.hide("NotReceivedModal");
        });
    },
    SaveData() {
      // let file = this.$refs.file;
      // let names = []
      // // (file.value[0])
      // file.value.forEach(function(item){
      //   if(item.size  > 1024*1024){
      //     names.push(item.name)
      //   }
      // })
      // (names.join(','))
      var self = this;
      self.SaveLoading = true;
      let formData = new FormData();
      formData.append("SchoolAdmEStatementID", this.SchoolAdmEStatement.id);

      if (this.file.length > 0) {
        this.file.forEach((file, i) => {
          formData.append("attachedfiles", file);
        });
      }

      SchoolAdmEStatementService.AttachFile(formData)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          self.SaveLoading = false;
           this.loaddata();
        })
        .catch((error) => {
          self.SaveLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
      return;
    },
    removeFile(item) {
      SchoolAdmEStatementService.DeleteFile(
        this.SchoolAdmEStatement.id,
        item.id
      )
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("DeleteModal" + item.id);
          this.loaddata();
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
          this.$bvModal.hide("DeleteModal" + item.id);
        });
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
      SchoolAdmEStatementService.GetAttachedFile(
        this.SchoolAdmEStatement.id,
        item.id
      )
        .then((res) => {
          this.forceFileDownload(res, item.id, item.attachfilename);
          this.makeToast(
            this.$t("SuccessImport"),
            this.$t("message"),
            "success"
          );
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
};
</script>

<style></style>"

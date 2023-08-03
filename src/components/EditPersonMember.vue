<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <b-card>
          <b-row class="">
            <b-col lg="3" sm="12" class="achievement-input">
              <div class="mr-2">
                <label>{{ $t("identitydocument") }}</label>
                <v-select
                  :options="IdentityDocumentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  class="fname-select"
                  v-model="filter.identitydocumentid"
                ></v-select>
              </div>
            </b-col>
            <b-col lg="2" sm="12" class="achievement-input">
              <div class="mr-2">
                <label>{{ $t("documentseries") }}</label>
                <v-select
                  v-if="filter.identitydocumentid === 1"
                  :options="DocSeriesList"
                  :reduce="(item) => item.name"
                  :placeholder="$t('docseries')"
                  v-model="filter.documentseries"
                  label="name"
                ></v-select>
                <b-form-input
                  v-if="filter.identitydocumentid != 1"
                  style="text-transform: uppercase"
                  :placeholder="$t('documentseries')"
                  v-model="filter.documentseries"
                  v-mask="'AA'"
                />
              </div>
            </b-col>
            <b-col lg="3" sm="12" class="achievement-input">
              <div class="mr-2">
                <label>{{ $t("documentnumber") }}</label>
                <b-form-input
                  :placeholder="$t('documentnumber')"
                  v-model="filter.documentnumber"
                  v-mask="'#######'"
                />
              </div>
            </b-col>
            <b-col lg="4" sm="12">
              <div class="d-flex">
                <div class="mr-2">
                  <label>{{ $t("dateofbirth") }}</label>
                  <!-- <date-picker
                    style="width: 100%"
                    v-model="filter.dateofbirth"
                    value-type="format"
                    size="md"
                    v-mask="'##.##.####'"tdfrgfg 
                    format="DD.MM.YYYY"
                    :placeholder="$t('dateofbirth')"
                  ></date-picker> -->
                  <custom-date-picker
                    v-model="filter.dateofbirth"
                    @keyup="BindValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('dateofbirth')"
                  >
                  </custom-date-picker>
                </div>
                <div class="mr-4" style="margin-top: 1.8rem;">
                  <b-button @click="SearchPerson" variant="outline-primary">
                    <b-icon v-if="!SearchLoading" icon="search"></b-icon>
                    <b-spinner v-if="SearchLoading" small></b-spinner>
                    {{ $t("search") }}
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("familyname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                :placeholder="$t('familyname')"
                v-model="PersonMember.familyname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("firstname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('firstname')"
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                v-model="PersonMember.firstname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("lastname")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('lastname')"
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                v-model="PersonMember.lastname"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("dateofbirth")
            }}</label>
            <div class="col-sm-7">
              <date-picker
                style="width: 100%"
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                v-model="PersonMember.dateofbirth"
                value-type="format"
                size="md"
                format="DD.MM.YYYY"
                :placeholder="$t('dateofbirth')"
              ></date-picker>
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("gender")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="GenderList"
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="PersonMember.genderid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row mt-2">
            <label class="col-form-label col-sm-5" for>{{
              $t("citizenship")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="CitizenShipList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="PersonMember.citizenshipid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("oblast")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="PersonMember.birthoblastid"
              ></v-select>
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{ $t("pinfl") }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('pinfl')"
                :disabled="
                  filter.identitydocumentid != 3 &&
                  filter.identitydocumentid != 4
                "
                v-model="PersonMember.pinfl"
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("mobilenumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                v-mask="'+998-##-###-##-##'"
                :placeholder="$t('mobilenumber')"
                v-model="PersonMember.mobilenumber"
              />
            </div>
          </div>

          <!-- <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("country")
            }}</label>
            <div class="col-sm-7">
              <v-select
                :options="CitizenShipList"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="PersonMember.countryid"
              ></v-select>
            </div>
          </div> -->
        </b-card>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <b-card>
          <b-row>
            <b-col sm="12" lg="7" md="7">
              <div class="form-group form-row">
                <!-- <div class="form-group form-row"> -->
                <div class="d-flex col-sm-12">
                  <!-- <b-input-group> -->
                  <!-- <b-input-group-append> -->
                  <b-button
                    @click="$refs.refInputEl.$el.click(); {isImage = true}"
                    variant="outline-success"
                    >{{ $t("imgupload") }} <b-icon icon="plus"></b-icon
                  ></b-button>
                  <b-form-file
                    v-model="files.file"
                    ref="refInputEl"
                    :state="Boolean(files.file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    :hidden="true"
                    plain
                    @change="ChangeFile($event)"
                  ></b-form-file>
                </div>
                <div class="mt-2">
                  <b-button
                      class="ml-1"
                      @click="openCam"
                      v-if="isImage"
                      variant="outline-primary"
                      ><b-icon class="mr-1" icon="camera"></b-icon> {{ $t("opencamera") }} 
                    </b-button>
                    <b-button
                      class="ml-1"
                      @click="takePhoto"
                      v-if="isVideo"
                      variant="outline-primary"
                      ><b-icon class="mr-1" icon="camera"></b-icon> {{ $t("takephoto") }} 
                    </b-button>
                </div>
                <div class="mt-2">
                  <b-button
                      class="ml-1"
                      @click="openCam"
                      v-if="isCanvas"
                      variant="outline-danger"
                      ><b-icon class="mr-1" icon="x"></b-icon> {{ $t("Cancel") }} 
                    </b-button>
                    <b-button
                      class="ml-1"
                      @click="savePhoto"
                      v-if="isCanvas"
                      variant="outline-success"
                      ><b-icon class="mr-1" icon="check"></b-icon> {{ $t("save") }} 
                    </b-button>
                </div>
              </div>
              <br />
              <span>
                {{ $t("controlimg") }}
              </span>
            </b-col>
            <b-col sm="12" lg="5" md="5">
              <div class="person-member-img">
                <video width="300" style="border-radius: 4px; border: 1px solid gray;" v-if="isVideo" id="video"></video>
                <canvas style="border-radius: 4px; border: 1px solid gray;" id="canvas" width="300" height="350"  v-show="isCanvas"></canvas>
                <img
                v-if="isImage"
                  :src="
                    axios.defaults.baseURL +
                    'FileManage/Get?id=' +
                    PersonMember.attachmentfileid
                  "
                  class="img-thumbnail float-end"
                  fluid
                  style="width: 150px; height: 180px; object-fit: cover"
                />
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-card class="w-100">
          <div class="mt-3 d-flex">
            <b-col sm="6" md="6" lg="6" class="text-left pl-0"
              >
              <b-button @click="Back" size="sm" variant="outline-danger">
                <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
              </b-button>
            </b-col>
            <b-col sm="6" md="6" lg="6" class="text-right pr-0">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <b-icon icon="check2"></b-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import PersonMemberService from "@/services/PersonMember.service";
import PersonService from "@/services/person.service";
import FileManageService from "@/services/filemanage.service";
import HelperService from "@/services/helper.service";
import OblastService from "@/services/Oblast.service";
import CountryService from "@/services/Country.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: { CustomDatePicker },
  props: {
    editid: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    isImage(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false
        this.isCanvas = false
      }
    },
    isCanvas(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false
        this.isImage = false
      }
    },
    isVideo(newValue, oldValue) {
      if (newValue) {
        this.isImage = false
        this.isCanvas = false
      }
    },
  },
  data() {
    return {
      show: false,
      PersonMember: {},
      filter: {
        documentseries: "",
        documentnumber: "",
        dateofbirth: "",
        inn: "",
        identitydocumentid: "",
      },
      files: {
        file: [],
        filename: "",
        url: "",
      },
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      StateList: [],
      GenderList: [],
      OblastList: [],
      lang: "ru",
      ModalShow: false,
      SearchLoading: false,
      editedIndex1: -1,
      config: {
        dateFormat: "d.m.Y",
      },
      IdentityDocumentList: [],
      DocSeriesList: [],
      CitizenShipList: [],
      isVideo: false,
      isCanvas: false,
      isImage: true,
      canvasImage : null
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    PersonMemberService.Get(this.editid).then((res) => {
      this.show = false;
      this.PersonMember = res.data;
      if (this.editid != 0) {
        this.filter.documentseries = res.data.documentseries;
        this.filter.documentnumber = res.data.documentnumber;
        this.filter.identitydocumentid = res.data.identitydocumentid;
        this.filter.dateofbirth = res.data.dateofbirth;
      }
    });
    HelperService.GetStateList().then((res) => {
      this.StateList = res.data;
    });
    OblastService.GetAll(this.lang)
      .then((res) => {
        this.OblastList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    CountryService.GetAll(this.lang)
      .then((res) => {
        this.CitizenShipList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll(this.lang)
      .then((res) => {
        this.IdentityDocumentList = res.data.result;
      })
      .catch((error) => { 
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    HelperService.GetGenderList()
      .then((res) => {
        this.GenderList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    if (this.$route.params.id != 0) {
      let text = this.PersonMember.attachmentfilename;
      let result = text.slice(-3);
      this.filetype = result;
      if (this.filetype != "pdf") {
        FileManageService.Get(this.PersonMember.attachmentfileid)
          .then((res1) => {
            this.PersonMember.attachmentfileid = res1.data.id;
            //  this.TeacherReTraining.attachmentfilename = res.data.pfiletext
            this.PersonMember.attachmentfiletype = res1.data.pfiletype;
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
  },
  methods: {
    BindValue(value) {
      this.filter.dateofbirth = value;
    },
    openCam() {
      this.isVideo = true
      let All_mediaDevices=navigator.mediaDevices
      if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        console.log("getUserMedia() not supported.");
        return;
      }
      All_mediaDevices.getUserMedia({
        audio: false,
        video:
        { 
          width: { ideal: 300 }, 
          height: { ideal: 350 } 
        }
      })
        .then(function (vidStream) {
        console.log(vidStream)
        var video = document.getElementById('video');
        if ("srcObject" in video) {
            video.srcObject = vidStream;
        } else {
            video.src = window.URL.createObjectURL(vidStream);
        }
        video.onloadedmetadata = function() {
          video.play();
        };
      })
      .catch(function(e) {
        console.log(e.name + ": " + e.message);
      })
    },
    takePhoto() {
      this.isCanvas = true
      let video = document.querySelector("#video");
      let canvas = document.querySelector("#canvas");
      let photo = document.querySelector("#image");
      const ctx = canvas.getContext("2d")
      ctx.drawImage(video, 0, 0, 300, 350);
      this.canvasImage = canvas.toDataURL('image/jpeg')
    },
    savePhoto() {
      let obj = {
        target: {
          files: [this.DataURIToBlob(this.canvasImage)]
        }
      }
      var formData = new FormData();
      formData.append("attachfile", obj.target.files[0], 'image.jpeg');
      if (!!obj.target.files[0]) {
        if (obj.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.PersonMember.attachmentfileid = res.data.id;
              this.PersonMember.attachmentfilename = res.data.pfiletext;
              this.PersonMember.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text = this.PersonMember.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan200kb"),
            this.$t("error"),
            "danger"
          );
        }
      }
      
      this.isImage = true
    },
    DataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)
      return new Blob([ia], { type: mimeString})
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
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, this.FileAttach.attachmentfilename);
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
    ChangeFile(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.PersonMember.attachmentfileid = res.data.id;
              this.PersonMember.attachmentfilename = res.data.pfiletext;
              this.PersonMember.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text = this.PersonMember.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan200kb"),
            this.$t("error"),
            "danger"
          );
        }
      }
    },
    checkSearch() {
      if (
        this.filter.identitydocumentid === 0 ||
        this.filter.identitydocumentid === null ||
        this.filter.identitydocumentid === undefined ||
        this.filter.identitydocumentid === ""
      ) {
        this.makeToast(
          this.$t("identitydocumentNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.filter.documentseries === 0 ||
        this.filter.documentseries === null ||
        this.filter.documentseries === undefined ||
        this.filter.documentseries === ""
      ) {
        this.makeToast(
          this.$t("documentseriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.filter.documentnumber === 0 ||
        this.filter.documentnumber === null ||
        this.filter.documentnumber === undefined ||
        this.filter.documentnumber === ""
      ) {
        this.makeToast(
          this.$t("documentnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.filter.dateofbirth === 0 ||
        this.filter.dateofbirth === null ||
        this.filter.dateofbirth === undefined ||
        this.filter.dateofbirth === ""
      ) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    check() {
      if (
        this.PersonMember.firstname === 0 ||
        this.PersonMember.firstname === null ||
        this.PersonMember.firstname === undefined ||
        this.PersonMember.firstname === ""
      ) {
        this.makeToast(
          this.$t("firstnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.PersonMember.familyname === 0 ||
        this.PersonMember.familyname === null ||
        this.PersonMember.familyname === undefined ||
        this.PersonMember.familyname === ""
      ) {
        this.makeToast(
          this.$t("familynameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.PersonMember.lastname === 0 ||
        this.PersonMember.lastname === null ||
        this.PersonMember.lastname === undefined ||
        this.PersonMember.lastname === ""
      ) {
        this.makeToast(
          this.$t("lastnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.PersonMember.genderid === 0 ||
        this.PersonMember.genderid === null ||
        this.PersonMember.genderid === undefined ||
        this.PersonMember.genderid === ""
      ) {
        this.makeToast(this.$t("genderNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      //   if (
      //     this.PersonMember.identitydocumentid === 0 ||
      //     this.PersonMember.identitydocumentid === null ||
      //     this.PersonMember.identitydocumentid === undefined ||
      //     this.PersonMember.identitydocumentid === ""
      //   ) {
      //     this.makeToast(
      //       this.$t("identitydocumentNotSelected"),
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      if (
        this.PersonMember.dateofbirth === 0 ||
        this.PersonMember.dateofbirth === null ||
        this.PersonMember.dateofbirth === undefined ||
        this.PersonMember.dateofbirth === ""
      ) {
        this.makeToast(
          this.$t("dateofbirthNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.PersonMember.attachmentfileid === 0 ||
        this.PersonMember.attachmentfileid === null ||
        this.PersonMember.attachmentfileid === undefined ||
        this.PersonMember.attachmentfileid === ""
      ) {
        this.makeToast(this.$t("attachmentfileNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        this.PersonMember.mobilenumber === 0 ||
        this.PersonMember.mobilenumber === null ||
        this.PersonMember.mobilenumber === undefined ||
        this.PersonMember.mobilenumber === ""
      ) {
        this.makeToast(
          this.$t("mobilenumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    Back() {
      this.$router.push({
        name: "PersonMember",
        query: {
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },
    SearchPerson() {
      if (!this.checkSearch()) {
        return false;
      }
      this.SearchLoading = true;
      PersonMemberService.GetFromGovDataForPersonMember(
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.dateofbirth,
        this.filter.identitydocumentid
      )
        .then((res) => {
          this.SearchLoading = false;
          this.PersonMember.id = res.data.id;
          this.PersonMember.familyname = res.data.familyname;
          this.PersonMember.firstname = res.data.firstname;
          this.PersonMember.lastname = res.data.lastname;
          this.PersonMember.shortname = res.data.shortname;
          this.PersonMember.fullname = res.data.fullname;
          this.PersonMember.dateofbirth = res.data.dateofbirth;
          this.PersonMember.pinfl = res.data.pinfl;
          this.PersonMember.genderid = res.data.genderid;
          this.PersonMember.gendername = res.data.gendername;
          this.PersonMember.identitydocumentid = res.data.identitydocumentid;
          this.PersonMember.identitydocumentname =
            res.data.identitydocumentname;
          this.PersonMember.documentseries = res.data.documentseries;
          this.PersonMember.documentnumber = res.data.documentnumber;
          this.PersonMember.dateofissue = res.data.dateofissue;
          this.PersonMember.dateofexpire = res.data.dateofexpire;
          this.PersonMember.issueorganization = res.data.issueorganization;
          this.PersonMember.mobilenumber = res.data.mobilenumber;
          this.PersonMember.nameorder = res.data.nameorder;
          this.PersonMember.organizationid = res.data.organizationid;
          this.PersonMember.organizationname = res.data.organizationname;
        })
        .catch((err) => {
          this.makeToast(err.response.data.error, this.$t("error"), "danger");
          this.SearchLoading = false;
        });
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.PersonMember.documentseries = this.filter.documentseries;
      this.PersonMember.documentnumber = this.filter.documentnumber;
      this.PersonMember.identitydocumentid = this.filter.identitydocumentid;
      this.PersonMember.dateofbirth = this.filter.dateofbirth;
      PersonMemberService.Update(this.PersonMember)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          var self = this;
            setTimeout(function() {
              self.$emit("success", res.data);
            }, 500);
        })
        .catch((err) => {
          this.makeToast(
            this.$t(err.response.data.error),
            this.$t("Error"),
            "danger"
          );
        });
    },
  },
};
</script>

<style lang="scss">
</style>
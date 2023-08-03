<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("GuestRegistration") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("docnumber")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('docnumber')"
                    v-model="Data.docnumber"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("docdate")
                }}</label>
                <div class="col-sm-9">
                  <custom-date-picker
                    v-model="Data.docdate"
                    @keyup="DocDateValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('docdate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("fio")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('fio')"
                    v-model="Data.fullname"
                  />
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <b-row>
                <b-col sm="12" lg="7" md="7">
                  <div class="form-group form-row">
                    <div class="d-flex col-sm-12">
                      <b-button
                        @click="
                          $refs.refInputEl.$el.click();
                          {
                            isImage = true;
                          }
                        "
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
                        ><b-icon class="mr-1" icon="camera"></b-icon>
                        {{ $t("opencamera") }}
                      </b-button>
                      <b-button
                        class="ml-1"
                        @click="takePhoto"
                        v-if="isVideo"
                        variant="outline-primary"
                        ><b-icon class="mr-1" icon="camera"></b-icon>
                        {{ $t("takephoto") }}
                      </b-button>
                    </div>
                    <div class="mt-2">
                      <b-button
                        class="ml-1"
                        @click="openCam"
                        v-if="isCanvas"
                        variant="outline-danger"
                        ><b-icon class="mr-1" icon="x"></b-icon>
                        {{ $t("Cancel") }}
                      </b-button>
                      <b-button
                        class="ml-1"
                        @click="savePhoto"
                        v-if="isCanvas"
                        variant="outline-success"
                        ><b-icon class="mr-1" icon="check"></b-icon>
                        {{ $t("save") }}
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
                    <video
                      width="300"
                      style="border-radius: 4px; border: 1px solid gray"
                      v-if="isVideo"
                      id="video"
                    ></video>
                    <canvas
                      style="border-radius: 4px; border: 1px solid gray"
                      id="canvas"
                      width="300"
                      height="350"
                      v-show="isCanvas"
                    ></canvas>
                    <img
                      v-if="isImage"
                      :src="
                        Data.file.attachmentfileid
                          ? axios.defaults.baseURL +
                            'FileManage/Get?id=' +
                            Data.file.attachmentfileid
                          : 'data:image/jpg;base64,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'
                      "
                      class="img-thumbnail float-end"
                      fluid
                      style="width: 150px; height: 180px; object-fit: cover"
                    />
                  </div>
                </b-col>
              </b-row>
            </CCol>
          </CRow>
          <CRow class="mt-3">
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("receiverperson")
                }}</label>
                <div class="col-sm-9">
                  <b-input-group>
                    <b-form-input
                      disabled
                      :placeholder="$t('receiverperson')"
                      :label="$t('receiverperson')"
                      horizontal
                      v-model="Data.receiverpersonname"
                    />
                    <b-input-group-append>
                      <b-button @click="OpenPersonModal" variant="primary">
                        <b-icon icon="three-dots" />
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("phonenumber")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('phonenumber')"
                    v-model="Data.phonenumber"
                    v-mask="'+998-##-###-##-##'"
                  />
                </div>
              </div>
              <!-- <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("shortname")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('shortname')"
                    v-model="Data.shortname"
                  />
                </div>
              </div> -->
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="9">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-2" for>{{
                  $t("Thepurpose")
                }}</label>
                <div class="col-sm-9">
                  <b-form-textarea
                    :placeholder="$t('Thepurpose')"
                    v-model="Data.details"
                    id="textarea"
                    rows="2"
                    max-rows="2"
                    class="mb-3"
                  />
                </div>
              </div>
            </CCol>
          </CRow>
          <b-row class="mt-2">
            <b-col class="text-center">
              <div class="divider">{{ $t("startDATE") }}</div>
            </b-col>
          </b-row>
          <CRow class="mt-3">
            <CCol sm="6">
              <div class="form-group form-row justify-content-center">
                <!-- <label class="col-form-label col-sm-3" for>{{
                  $t("From")
                }}</label> -->
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="Data.startdate"
                    @keyup="StartDateValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('startDATE')"
                  >
                  </custom-date-picker>
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <div class="form-group form-row justify-content-center">
                <!-- <label class="col-form-label col-sm-3" for>{{
                  $t("Upto")
                }}</label> -->
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="Data.enddate"
                    @keyup="EndDateValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('enddate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
            </CCol>
          </CRow>
          <b-row>
            <b-col class="text-center">
              <div class="divider">
                {{ $t("endDATE") }}
              </div>
            </b-col>
          </b-row>
          <CRow class="mt-3">
            <CCol sm="6">
              <div class="form-group form-row justify-content-center">
                <div class="col-sm-7">
                  <date-picker
                    style="width: 100%"
                    v-model="Data.starttime"
                    value-type="format"
                    type="time"
                    @input="changeStart"
                    :open.sync="open"
                    :placeholder="$t('starttime')"
                    @change="handleChange"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <div class="form-group form-row justify-content-center">
                <div class="col-sm-7">
                  <date-picker
                    style="width: 100%"
                    v-model="Data.endtime"
                    value-type="format"
                    type="time"
                    :open.sync="openendtime"
                    :placeholder="$t('endtime')"
                    @change="EndtimeChange"
                  ></date-picker>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'GuestRegistration' })"
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
        <b-modal
          id="modalXl"
          size="xl"
          :title="$t('receiverperson')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          >
          </employee-list-component>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import GuestRegistrationService from "@/services/GuestRegistration.service";
import EmployeeListComponent from "@/components/EmployeeList";
import CustomDatePicker from "@/components/customDatePicker.vue";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
export default {
  components: { CustomDatePicker, EmployeeListComponent, axios },
  watch: {
    isImage(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isCanvas = false;
      }
    },
    isCanvas(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isImage = false;
      }
    },
    isVideo(newValue, oldValue) {
      if (newValue) {
        this.isImage = false;
        this.isCanvas = false;
      }
    },
  },
  data() {
    return {
      SaveLoading: false,
      Data: {},
      open: false,
      value: null,
      openendtime: false,
      receiverpersonlist: [],
      personvalue: {},
      axios,
      files: {
        file: [],
        filename: "",
        url: "",
      },
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
        attachmentfiletype: "",
      },
      isImage: true,
      isVideo: false,
      isCanvas: false,
      canvasImage: null,
    };
  },
  created() {
    var self = this;
    GuestRegistrationService.Get(self.$route.params.id).then((res) => {
      self.Data = res.data;
    });
  },
  methods: {
    handleChange(value, type) {
      if (type === "second") {
        this.open = false;
      }
    },
    EndtimeChange(value, type) {
      if (type === "second") {
        this.openendtime = false;
      }
    },
    changeStart(value) {
      var arr = value.split(":");
      var min = parseInt(arr[1]);
      var hour = parseInt(arr[0]);
      var sek = parseInt(arr[2]);
      min = min + 30;
      if (min >= 60) {
        min = min - 60;
        hour = hour + 1;
        if (min < 10) {
          min = 0 + "" + min;
          sek = 0 + "" + sek;
        }

      }
      if (hour < 10) {
          hour = 0 + "" + hour;
        }
      if (sek < 10) {
        sek = 0 + "" + sek;
      }
      this.Data.endtime = hour + ":" + min + ":" + sek;
      console.log(this.Data.endtime);
    },
    // notBeforeNineOClock(date) {
    //   return date.getHours() < this.Data.endtime.split(':')[0];
    // },
    openCam() {
      this.isVideo = true;
      let All_mediaDevices = navigator.mediaDevices;
      if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        console.log("getUserMedia() not supported.");
        return;
      }
      All_mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 300 },
          height: { ideal: 350 },
        },
      })
        .then(function (vidStream) {
          console.log(vidStream);
          var video = document.getElementById("video");
          if ("srcObject" in video) {
            video.srcObject = vidStream;
          } else {
            video.src = window.URL.createObjectURL(vidStream);
          }
          video.onloadedmetadata = function () {
            video.play();
          };
        })
        .catch(function (e) {
          console.log(e.name + ": " + e.message);
        });
    },
    DocDateValue(value) {
      this.Data.docdate = value;
    },
    StartDateValue(value) {
      this.Data.startdate = value;
    },
    EndDateValue(value) {
      this.Data.enddate = value;
    },
    OpenPersonModal() {
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("modalXl");
    },
    AddPersonData(data) {
      this.CloseEmployeeModal();
      this.Data.receiverpersonid = data.personid;
      this.Data.receiverpersonname = data.personname;
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    takePhoto() {
      this.isCanvas = true;
      let video = document.querySelector("#video");
      let canvas = document.querySelector("#canvas");
      let photo = document.querySelector("#image");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 300, 350);
      this.canvasImage = canvas.toDataURL("image/jpeg");
    },
    savePhoto() {
      let obj = {
        target: {
          files: [this.DataURIToBlob(this.canvasImage)],
        },
      };
      var formData = new FormData();
      formData.append("attachfile", obj.target.files[0], "image.jpeg");
      if (!!obj.target.files[0]) {
        if (obj.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.Data.file.attachmentfileid = res.data.id;
              this.Data.file.attachmentfilename = res.data.pfiletext;
              this.Data.file.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text = this.Data.file.attachmentfilename;
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

      this.isImage = true;
    },
    DataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(",");
      const byteString =
        splitDataURI[0].indexOf("base64") >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
      return new Blob([ia], { type: mimeString });
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
    ChangeFile(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.Data.file.attachmentfileid = res.data.id;
              this.Data.file.attachmentfilename = res.data.pfiletext;
              this.Data.file.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text = this.Data.file.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("message"),
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
    check() {
      var self = this;
      if (
        self.Data.file.attachmentfileid === 0 ||
        self.Data.file.attachmentfileid === null ||
        self.Data.file.attachmentfileid === undefined ||
        self.Data.file.attachmentfileid === ""
      ) {
        this.makeToast(
          this.$t("attachmentfileNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.fullname === 0 ||
        self.Data.fullname === null ||
        self.Data.fullname === undefined ||
        self.Data.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.receiverpersonname === 0 ||
        self.Data.receiverpersonname === null ||
        self.Data.receiverpersonname === undefined ||
        self.Data.receiverpersonname === ""
      ) {
        this.makeToast(
          this.$t("receiverpersonnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Data.details === 0 ||
        self.Data.details === null ||
        self.Data.details === undefined ||
        self.Data.details === ""
      ) {
        this.makeToast(
          this.$t("detailsNotCorrect"),
          this.$t("Error"),
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
      GuestRegistrationService.Update(self.Data)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "GuestRegistration" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
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
};
</script>
  
  <style lang="scss">
.divider {
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
</style>
  
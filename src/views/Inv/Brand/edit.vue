<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Brand") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="code"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('code1')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code1')"
                    type="number"
                    v-model="Brand.code"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="Brand.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <!-- <template #append>
                      <CButton
                        v-if="Brand.TranslatableColumns.includes('shortname')"
                        @click="translate('shortname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template> -->
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="Brand.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <!-- <template #append>
                      <CButton
                        v-if="Brand.TranslatableColumns.includes('fullname')"
                        @click="translate('fullname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template> -->
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("ProductClassification")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="ProductclassificationList"
                    v-model="Brand.productclassificationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("Manufacturer")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="ManufacturerList"
                    v-model="Brand.manufacturerid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="detail">
                  <CInput
                    :placeholder="$t('detail')"
                    autocomplete="detail"
                    horizontal
                    :label="$t('detail')"
                    v-model="Brand.detail"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
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
                        v-model="Brand.attachmentfilename"
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

                <!-- <b-img
                  v-if="data.admimageid"
                  :src="
                    axios.defaults.baseURL +
                      'AdmImage/Get?id=' +
                      data.admimageid
                  "
                  fluid
                /> -->
                <!-- </div> -->
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="Brand.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="translaterow.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{ item }">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton
              @click="SaveTranslate"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'Brand' })"
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
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import BrandService from "@/services/Brand.service";
import ProductClassificationService from "@/services/ProductClassification.service";
import ManufacturerService from "@/services/Manufacturer.service";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      Brand: { TranslatableColumns: [] },
      ProductclassificationList: [],
      ManufacturerList: [],
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      files: {
        file: [],
        filename: "",
        url: "",
      },
      translatelist: [],
      languagelist: [],
      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      fileLoading: false,
      translatebyname: "",
      statelist: [],
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    ProductClassificationService.GetAll().then((res) => {
      self.ProductclassificationList = res.data;
    });
    ManufacturerService.GetAll().then((res) => {
      self.ManufacturerList = res.data;
    });
    BrandService.Get(this.$route.params.id).then((res) => {
      self.Brand = res.data;
      this.FileAttach.attachmentfileid = res.data.Brand.attachmentfileid;
      this.FileAttach.attachmentfilename = res.data.Brand.attachmentfilename;
    });

    if (this.$route.params.id != 0) {
      let text = this.Brand.attachmentfilename;
      let result = text.slice(-3);
      this.filetype = result;
      if (this.filetype != "pdf") {
        FileManageService.Get(this.Brand.attachmentfileid)
          .then((res1) => {
            this.Brand.attachmentfileid = res1.data.id;
            //  this.TeacherReTraining.attachmentfilename = res.data.pfiletext
            this.Brand.attachmentfiletype = res1.data.pfiletype;
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
    ChangeFile(event) {
      const file = event.target.files[0];
      var formData = new FormData();
      formData.append("attachfile", file);
      this.FileLoading = true;
      FileManageService.Attach(formData)
        .then((res) => {
          this.FileLoading = false;

          this.Brand.attachmentfileid = res.data.id;
          this.Brand.attachmentfilename = res.data.pfiletext;
          this.Brand.attachmentfiletype = res.data.pfiletype;

          this.FileAttach.attachmentfileid = res.data.id;
          this.FileAttach.attachmentfilename = res.data.pfiletext;
          this.FileAttach.attachmentfiletype = res.data.pfiletype;

          this.FileAttach.url = URL.createObjectURL(file);

          console.log("---------", this.FileAttach.url);
          console.log("---------", res);
          // this.DownloadFile();

          let text = this.Brand.attachmentfilename;
          let result = text.slice(-3);
          this.filetype = result;
        })
        .catch((error) => {
          this.FileLoading = false;
          this.makeToast(error.response.data.error, "danger");
        });
    },
    // DownloadFile() {
    //   this.DownloadLoading = this.FileAttach.attachmentfileid;
    //   FileManageService.Get(this.Brand.attachmentfileid, "")
    //     .then((res) => {
    //       this.DownloadLoading = "";
    //       this.forceFileDownload(res, this.Brand.attachmentfilename);
    //       console.log(this.Brand.attachmentfilename);
    //     })
    //     .catch((error) => {
    //       this.DownloadLoading = "";
    //       this.makeToast(error.response.data.error, this.$t("error"), "danger");
    //     });
    // },
    // forceFileDownload(response, name) {
    //   var headers = response.headers;
    //   var blob = new Blob([response.data]);
    //   const url = window.URL.createObjectURL(blob);

    //   console.log("KLKLKLKL", url);
    //   // const link = document.createElement("a");
    //   // link.href = url;

    //   // link.setAttribute("download", name); //or any other extension
    //   // document.body.appendChild(link);
    //   // link.click();
    // },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.Brand.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function(
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.Brand.Translates = self.Brand.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.Brand.Translates.push(item);
      });
      self.translatemodal = false;
    },
    check() {
      var self = this;

      var checkCode = (code) => {
        return (
          code === 0 ||
          code === null ||
          code === undefined ||
          code === "" ||
          !Number.isInteger(Number(code)) ||
          Number(code) < 0
        );
      };

      var checkStringSpace = (string) => {
        return (
          string === 0 ||
          string === null ||
          string === undefined ||
          string === "" ||
          String(string).trim().length === 0
        );
      };

      if (checkCode(self.Brand.code)) {
        this.makeToast(
          `${this.$t("codeNotCorrect")}`,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (checkStringSpace(self.Brand.shortname)) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Brand.productclassificationid === 0 ||
        self.Brand.productclassificationid === null ||
        self.Brand.productclassificationid === undefined ||
        self.Brand.productclassificationid === ""
      ) {
        this.makeToast(
          this.$t("productclassificationidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.Brand.manufacturerid === 0 ||
        self.Brand.manufacturerid === null ||
        self.Brand.manufacturerid === undefined ||
        self.Brand.manufacturerid === ""
      ) {
        this.makeToast(
          `${this.$t("manufacturer")} ${this.$t("NotCorrectEnd")}`,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (checkStringSpace(self.Brand.fullname)) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.PaGroup.parentid === 0 ||
      //     self.PaGroup.parentid === null ||
      //     self.PaGroup.parentid === undefined ||
      //     self.PaGroup.parentid === ""
      //   ) {
      //     this.makeToast(this.$t("parentNotCorrect"), this.$t("Error"), "danger");
      //     return false;
      //   }
      if (
        self.Brand.stateid === 0 ||
        self.Brand.stateid === null ||
        self.Brand.stateid === undefined ||
        self.Brand.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, this.FileAttach.attachmentfilename);
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
    SaveData() {
      this.Brand.attachmentfileid = this.FileAttach.attachmentfileid;
      this.Brand.attachmentfilename = this.FileAttach.attachmentfilename;
      if (!this.check()) {
        return false;
      }
      var self = this;
      BrandService.Update(self.Brand)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Brand" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style></style>

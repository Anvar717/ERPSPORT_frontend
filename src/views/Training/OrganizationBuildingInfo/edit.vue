<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OrganizationBuildingInfo") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput :placeholder="$t('shortname')" autocomplete="text" horizontal :label="$t('shortname')"
                    v-model="OrganizationBuildingInfo.shortname" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
                    <template #append>
                      <CButton @click="translate('shortname')" style="height: 35px" variant="outline" type="button"
                        color="primary">
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
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
                  <CInput :placeholder="$t('fullname')" autocomplete="text" horizontal :label="$t('fullname')"
                    v-model="OrganizationBuildingInfo.fullname" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
                    <template #append>
                      <CButton @click="translate('fullname')" style="height: 35px" variant="outline" type="button"
                        color="primary">
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
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
                    $t("Oblast")
                  }}</label>
                  <v-select class="col-sm-9" :options="oblastlist" @input="changeOblast()"
                    v-model="OrganizationBuildingInfo.oblastid" :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("Region")
                  }}</label>
                  <v-select class="col-sm-9" :options="regionlist" @input="changeRegion()"
                    v-model="OrganizationBuildingInfo.regionid" :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("Organization")
                  }}</label>
                  <v-select class="col-sm-9" :options="organizationlist" v-model="OrganizationBuildingInfo.organizationid"
                    :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("SportFacilityType")
                  }}</label>
                  <v-select class="col-sm-9" :options="sportfacilitytypelist"
                    v-model="OrganizationBuildingInfo.sportfacilitytypeid" :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("circlesporttype")
                  }}</label>
                  <v-select class="col-sm-9" :options="sporttypeclassifierlist"
                    v-model="OrganizationBuildingInfo.sporttypeclassifierid" :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="subscriptioncapacity" rules="required">
                  <CInput :placeholder="$t('subscriptioncapacity')" autocomplete="subscriptioncapacity" horizontal
                    type="number" :label="$t('subscriptioncapacity')"
                    v-model="OrganizationBuildingInfo.subscriptioncapacity" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                  <label class="ol-form-label col-sm-3" for>{{
                    $t("internetconnection")
                  }}</label>
                  <b-form-checkbox v-model="OrganizationBuildingInfo.internetconnection" switch
                    class="col-sm-9"></b-form-checkbox>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="tourniquetcount" rules="required">
                  <CInput :placeholder="$t('tourniquetcount')" autocomplete="tourniquetcount" horizontal type="number"
                    :label="$t('tourniquetcount')" v-model="OrganizationBuildingInfo.tourniquetcount" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="latitude" rules="required">
                  <CInput :placeholder="$t('latitude')" autocomplete="latitude" horizontal type="number"
                    :label="$t('latitude')" v-model="OrganizationBuildingInfo.latitude" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="longitude" rules="required">
                  <CInput :placeholder="$t('longitude')" autocomplete="longitude" horizontal type="number"
                    :label="$t('longitude')" v-model="OrganizationBuildingInfo.longitude" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="internetconnectiontype" rules="required">
                  <CInput :placeholder="$t('internetconnectiontype')" autocomplete="internetconnectiontype" horizontal
                    :label="$t('internetconnectiontype')" v-model="OrganizationBuildingInfo.internetconnectiontype"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="address" rules="required">
                  <CInput :placeholder="$t('address')" autocomplete="address" horizontal :label="$t('address')"
                    v-model="OrganizationBuildingInfo.address" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="respersonname" rules="required">
                  <CInput :placeholder="$t('respersonname')" autocomplete="respersonname" horizontal
                    :label="$t('respersonname')" v-model="OrganizationBuildingInfo.respersonname" :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="respersonpositionname" rules="required">
                  <CInput :placeholder="$t('respersonpositionname')" autocomplete="respersonpositionname" horizontal
                    :label="$t('respersonpositionname')" v-model="OrganizationBuildingInfo.respersonpositionname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                <ValidationProvider v-slot="v" name="respersoncontactinfo" rules="required">
                  <CInput :placeholder="$t('respersoncontactinfo')" autocomplete="respersoncontactinfo" horizontal
                    :label="$t('respersoncontactinfo')" v-model="OrganizationBuildingInfo.respersoncontactinfo"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }">
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
                    $t("state")
                  }}</label>
                  <v-select class="col-sm-9" :options="statelist" v-model="OrganizationBuildingInfo.stateid"
                    :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <!-- <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("attachmentfile")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-file ref="fileManage" accept=".jpg, .png, .pdf" hidden plain
                      placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."
                      @change="ChangeFile"></b-form-file>
                    <b-button variant="primary" @click="$refs.fileManage.$el.click()">
                      <b-spinner small v-if="fileLoading"></b-spinner>
                      <b-icon v-if="!fileLoading" icon="paperclip"></b-icon>
                      {{ $t("DoImport") }}
                    </b-button>
                  </div>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>

            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div
                class="d-flex my-1"
                v-for="(item, index) in OrganizationBuildingInfo.FileTables"
                :key="index"
                v-show="item.Status != 3"
              >
                <b-button-group size="sm" v-if="item.Status != 3">
                  <b-button @click="DownloadFile(item)" variant="primary"
                    ><b-icon
                      v-if="DownloadLoading != item.attachmentfileid"
                      icon="download"
                    ></b-icon>
                    <b-spinner
                      small
                      v-if="DownloadLoading == item.attachmentfileid"
                    ></b-spinner>
                  </b-button>
                  <b-button variant="primary">{{
                    item.attachmentfilename
                  }}</b-button>
                  <b-button @click="DeleteFile(item, index)" variant="danger"
                    ><b-icon
                      v-if="DeleteLoading != item.attachmentfileid"
                      icon="trash"
                    >
                      <b-spinner
                        small
                        v-if="DeleteLoading == item.attachmentfileid"
                      ></b-spinner> </b-icon
                  ></b-button>
                </b-button-group>
              </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow> -->
            <b-row>
              <b-col md="3"></b-col>
              <b-col md="6">
                <custom-file-group :labels="TitleFileTypeList" @change="ChangeFile1"
                  :items="OrganizationBuildingInfo.FileTables"
                  @delete="el => { OrganizationBuildingInfo.FileTables = el }"></custom-file-group>
              </b-col>
              <b-col md="3">

              </b-col>
            </b-row>
          </ValidationObserver>
        </CCardBody>
        <CModal :title="$t('translate')" :show.sync="translatemodal" size="lg" :closeOnBackdrop="false">
          <b-table :fields="translitefields" :items="translatelist" class="bg-color-table text-center"
            style="vertical-align: middle" bordered responsive="sm">
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select :placeholder="$t('ChooseBelow')" class="mb-0" :options="languagelist"
                    :reduce="(item) => item.id" label="name" v-model="translaterow.languageid"
                    style="z-index: 9999"></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton @click="addtranslite" color="primary" variant="outline" class="text-center mx-auto d-block">
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
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="$router.push({ name: 'OrganizationBuildingInfo' })">
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
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import SportFacilityTypeService from "@/services/SportFacilityType.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service"
import FileManageService from "@/services/filemanage.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
export default {
  components: { CustomFileGroup },
  data() {
    return {
      SaveLoading: false,
      selectedrowid: 0,
      sportfacilitytypelist: [],
      sporttypeclassifierlist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      translatemodal: false,
      OrganizationBuildingInfo: { TranslatableColumns: [] },
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
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
      translatebyname: "",
      fileLoading: false,
      DownloadLoading: '',
      DeleteLoading: false,
      TitleFileTypeList: []
    };
  },
  created() {
    var self = this;
    // OrganizationBuildingInfoService.Get(self.selectedrowid).then((res) => {
    //   self.OrganizationBuildingInfo = res.data;
    // });
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    OrganizationBuildingInfoService.Get(self.selectedrowid).then((res) => {
      self.OrganizationBuildingInfo = res.data;
      self.TitleFileTypeList = res.data.table.Tables;
      if (self.OrganizationBuildingInfo.Translates == null) {
        self.OrganizationBuildingInfo.Translates = [];
        console.log(self.OrganizationBuildingInfo.Translates)
      }
    });
    SportFacilityTypeService.GetAll(this.organizationid).then((res) => {
      this.sportfacilitytypelist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.oblastlist = res.data;
    });
    // RegionService.GetAll(this.lang, 0, false).then((res) => {
    //   this.regionlist = res.data;
    // });
    // OrganizationService.GetAll(this.lang, 0, false).then((res) => {
    //   this.organizationlist = res.data;
    // });
    OrganizationBuildingInfoService.Get(self.selectedrowid).then((res) => {
      self.OrganizationBuildingInfo = res.data;
      self.changeOblast();
      self.changeRegion();
    });
  },
  methods: {
    DownloadFile(item) {
      this.DownloadLoading = item.attachmentfileid;
      FileManageService.Get(item.attachmentfileid)
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
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.OrganizationBuildingInfo.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            // this.FileAttach.attachmentfileid = res.data.id;
            // this.FileAttach.attachmentfilename = res.data.pfiletext;
            // this.FileAttach.attachmentfiletype = res.data.pfiletype;
            // this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
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
    ChangeFile(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 4194304) {
          this.fileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.OrganizationBuildingInfo.FileTables.push({
                id: 0,
                ownerid: 0,
                attachmentfileid: res.data.id,
                attachmentfilename: res.data.pfiletext,
                attachmentfiletype: res.data.pfiletype,
                Status: 1,
              });
              this.fileLoading = false;
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
            this.$t("FileSizeLargerThan4mb"),
            this.$t("error"),
            "danger"
          );
        }
      }
    },
    changeOblast() {
      if (this.OrganizationBuildingInfo.oblastid != 0) {
        RegionService.GetAll(
          this.lang,
          this.OrganizationBuildingInfo.oblastid
        ).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    changeRegion() {
      if (
        this.OrganizationBuildingInfo.oblastid != 0 &&
        this.OrganizationBuildingInfo.regionid != 0
      ) {
        OrganizationService.GetAll(
          this.OrganizationBuildingInfo.oblastid,
          this.OrganizationBuildingInfo.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    check() {
      var self = this;
      if (
        self.OrganizationBuildingInfo.oblastid === 0 ||
        self.OrganizationBuildingInfo.oblastid === null ||
        self.OrganizationBuildingInfo.oblastid === undefined ||
        self.OrganizationBuildingInfo.oblastid === ""
      ) {
        this.makeToast(this.$t("oblastNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrganizationBuildingInfo.regionid === 0 ||
        self.OrganizationBuildingInfo.regionid === null ||
        self.OrganizationBuildingInfo.regionid === undefined ||
        self.OrganizationBuildingInfo.regionid === ""
      ) {
        this.makeToast(this.$t("RegionNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      var self = this;
      OrganizationBuildingInfoService.Update(self.OrganizationBuildingInfo)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "OrganizationBuildingInfo" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    translate(selectcolumnname) {
      var self = this;
      if (self.OrganizationBuildingInfo.Translates == null) {
        self.OrganizationBuildingInfo.Translates = []
      }
      self.translatebyname = selectcolumnname;
      self.translatelist = self.OrganizationBuildingInfo.Translates.filter(
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
          self.translaterow.languagename = self.languagelist.filter(function (
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
      self.OrganizationBuildingInfo.Translates =
        self.OrganizationBuildingInfo.Translates.filter(
          (x) => x.columnname !== self.translatebyname
        );
      self.translatelist.forEach((item) => {
        self.OrganizationBuildingInfo.Translates.push(item);
      });
      self.translatemodal = false;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>
  
<style></style>
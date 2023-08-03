<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("StreetHouse") }}</h4>
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
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="StreetHouse.code"
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
                    :placeholder="$t('houseblock')"
                    autocomplete="text"
                    horizontal
                    :label="$t('houseblock')"
                    v-model="StreetHouse.houseblock"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          StreetHouse.TranslatableColumns.includes('houseblock')
                        "
                        @click="translate('houseblock')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
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
                  <CInput
                    :placeholder="$t('cadastercode')"
                    autocomplete="text"
                    horizontal
                    :label="$t('cadastercode')"
                    v-model="StreetHouse.cadastercode"
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
                <ValidationProvider
                  v-slot="v"
                  name="housenumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('HouseNumber')"
                    autocomplete="housenumber"
                    horizontal
                    :label="$t('HouseNumber')"
                    v-model="StreetHouse.housenumber"
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

              <label>{{ $t("withflats") }}</label
              ><CCol sm="1"></CCol>
              <CCol sm="5">
                <ValidationProvider v-slot="v" rules="required">
                  <b-form-checkbox
                    switch
                    v-model="StreetHouse.withflats"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                  </b-form-checkbox>
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
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="StreetHouse.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <!-- <div>
              <b-modal
                size="xl"
                v-model="MapModal"
                no-close-on-backdrop
                hide-footer
                :title="$t('map')"
              >
                <div style="width : 100%;height : 80vh">
                  <gmap-map
                    :center="center"
                    :zoom="8"
                    style="width:100%;height : 100%"
                    @click="myFunc"
                    map-type-id="hybrid"
                  >
                    <GmapMarker
                      :key="'three'"
                      :position="position"
                      :clickable="true"
                    >
                      <gmap-info-window
                        @closeclick="window_open1 = false"
                        :opened="window_open1"
                        :position="position"
                        :options="{
                          pixelOffset: {
                            width: 0,
                            height: 0,
                          },
                        }"
                      >
                        {{ StreetHouse.organizationname }}
                      </gmap-info-window>
                    </GmapMarker>
                  </gmap-map>
                </div>
                <CRow class="mt-1">
                  <CCol class="text-center">
                    <b-button
                      variant="outline-danger"
                      :ripple="false"
                      
                      @click="MapModal = false"
                      class="mr-1"
                      size="sm"
                    >
                      {{ $t("back") }}
                    </b-button>
                    <b-button
                      :variant="isChange ? 'primary' : 'outline-primary'"
                      
                      :ripple="false"
                      @click="isChange = !isChange"
                      class="mr-1"
                      size="sm"
                    >
                      {{ $t("Edit") }}
                    </b-button>
                    <b-button
                      variant="outline-success"
                      @click="AddMarker"
                      size="sm"
                    >
                      {{ $t("Save") }}
                    </b-button>
                  </CCol>
                </CRow>
              </b-modal>
            </div>
            <div>
              <b-card>
                <div class="d-flex justify-content-between">
                  <h4 class="text-center m-0">
                    <b-icon size="15" icon="map"></b-icon>
                    {{ $t("map") }}
                  </h4>
                  <a class="text-primary" @click="OpenMapModal">
                    <b-icon icon="plus-circle"></b-icon>
                    {{ $t("MarkInMap") }}
                  </a>
                </div>
                <b-alert
                  class="mb-0 mt-1"
                  show
                  :variant="
                    StreetHouse.latitude == 0 || StreetHouse.latitude == null
                      ? 'danger'
                      : 'success'
                  "
                >
                  <div class="alert-body">
                    <b-icon
                      class="mr-25"
                      :icon="
                        StreetHouse.latitude == 0 || StreetHouse.latitude == null
                          ? 'exclamation-triangle-fill'
                          : 'check-square'
                      "
                    />
                    <span class="ml-25">
                      {{
                        StreetHouse.latitude == 0 || StreetHouse.latitude == null
                          ? $t("NotMarkedInMap")
                          : $t("MarkedInMap")
                      }}</span
                    >
                  </div>
                </b-alert>
              </b-card>
            </div> -->
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
                @click="$router.push({ name: 'StreetHouse' })"
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
import ItemOfExpenseService from "@/services/ItemOfExpense.service";
import StreetHouseService from "@/services/StreetHouse.service";
export default {
  data() {
    return {
      center: { lat: "", lng: "" },
      show: false,
      MapModal: false,
      position: {
        lat: "",
        lng: "",
      },
      isChange: false,
      window_open1: false,
      SaveLoading: false,
      translatemodal: false,
      StreetHouse: {
        TranslatableColumns: [],
      },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      tableslist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
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
    HelperService.GetTableList().then((res) => {
      self.tableslist = res.data;
    });
    StreetHouseService.Get(self.selectedrowid, (self.externalid = null)).then(
      (res) => {
        this.show = false;
        self.StreetHouse = res.data;
        if (res.data.latitude === 0) {
          (this.center.lat = 41), (this.center.lng = 69);
        } else {
          (this.center.lat = res.data.latitude),
            (this.center.lng = res.data.longitude);
        }
        (this.position.lat = res.data.latitude),
          (this.position.lng = res.data.longitude);
      }
    );
  },
  methods: {
    myFunc(el) {
      if (this.isChange) {
        (this.position.lat = el.latLng.lat()),
          (this.position.lng = el.latLng.lng());
      }
    },
    AddMarker() {
      this.StreetHouse.latitude = this.position.lat;
      this.StreetHouse.longitude = this.position.lng;
      this.MapModal = false;
    },
    OpenMapModal() {
      this.MapModal = true;
    },
    check() {
      var self = this;

      if (
        self.StreetHouse.code === 0 ||
        self.StreetHouse.code === null ||
        self.StreetHouse.code === undefined ||
        self.StreetHouse.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.StreetHouse.housenumber === 0 ||
        self.StreetHouse.housenumber === null ||
        self.StreetHouse.housenumber === undefined ||
        self.StreetHouse.housenumber === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StreetHouse.cadastercode === 0 ||
        self.StreetHouse.cadastercode === null ||
        self.StreetHouse.cadastercode === undefined ||
        self.StreetHouse.cadastercode === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StreetHouse.houseblock === 0 ||
        self.StreetHouse.houseblock === null ||
        self.StreetHouse.houseblock === undefined ||
        self.StreetHouse.houseblock === ""
      ) {
        this.makeToast(
          this.$t("normativedocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.StreetHouse.stateid === 0 ||
        self.StreetHouse.stateid === null ||
        self.StreetHouse.stateid === undefined ||
        self.StreetHouse.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      StreetHouseService.Update(self.StreetHouse)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "StreetHouse" });
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
      self.translatebyname = selectcolumnname;
      self.translatelist = self.StreetHouse.Translates.filter(
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
      self.StreetHouse.Translates = self.StreetHouse.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.StreetHouse.Translates.push(item);
      });
      self.translatemodal = false;
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
  },
};
</script>

<style></style>

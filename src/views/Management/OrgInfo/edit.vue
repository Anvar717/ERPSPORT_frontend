<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("OrgInfo") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="number"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('number')"
                    autocomplete="number"
                    horizontal
                    :label="$t('number')"
                    v-model="OrgInfo.number"
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

              <CCol sm="4">
                <ValidationProvider v-slot="v" name="inn" rules="required">
                  <CInput
                    :placeholder="$t('inn')"
                    autocomplete="text"
                    horizontal
                    :label="$t('inn')"
                    v-model="OrgInfo.inn"
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
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="computersrooms"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('computersrooms')"
                    autocomplete="text"
                    horizontal
                    type="number"
                    :label="$t('computersrooms')"
                    v-model="OrgInfo.computersrooms"
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
            </CRow>

            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="Organization"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("oblastid")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="Oblastlist"
                      v-model="OrgInfo.oblastid"
                      :reduce="(item) => item.id"
                      @input="ChangeOblast"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="Organization"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("regionid")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="Regionlist"
                      v-model="OrgInfo.regionid"
                      :reduce="(item) => item.id"
                      @input="ChangeRegion"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="Organization"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("Organization")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationlist"
                      v-model="OrgInfo.organizationid"
                      :reduce="(item) => item.id"
                      @input="ChangeOrganization"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>

            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="connectivityspeed"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('connectivityspeed')"
                    autocomplete="text"
                    horizontal
                    :label="$t('connectivityspeed')"
                    v-model="OrgInfo.connectivityspeed"
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
              <CCol sm="4">
                <ValidationProvider v-slot="v" name="sector" rules="required">
                  <CInput
                    :placeholder="$t('sector')"
                    autocomplete="text"
                    horizontal
                    :label="$t('sector')"
                    v-model="OrgInfo.sector"
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
              <CCol sm="4">
                <!-- <ValidationProvider
                  v-slot="v"
                  name="educationlevel"
                  rules="required"
                > -->
                  <CInput
                    :placeholder="$t('educationlevel')"
                    autocomplete="text"
                    horizontal
                    :label="$t('educationlevel')"
                    v-model="OrgInfo.educationlevel"
                  >
                    <!-- <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template> -->
                  </CInput>
                <!-- </ValidationProvider> -->
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="1"
                ><label>{{ $t("electricity") }}</label></CCol
              >
              <CCol sm="3">
                <ValidationProvider v-slot="v" rules="required">
                  <b-form-checkbox
                    switch
                    v-model="OrgInfo.electricity"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                  </b-form-checkbox>
                </ValidationProvider>
              </CCol>
              <CCol sm="1"
                ><label>{{ $t("internetconnection") }}</label></CCol
              >
              <CCol sm="3">
                <ValidationProvider rules="required">
                  <b-form-checkbox
                    switch
                    v-model="OrgInfo.internetconnection"
                    id="internetconnection"
                  >
                  </b-form-checkbox>
                </ValidationProvider>
              </CCol>

              <CCol sm="1"
                ><label>{{ $t("mobilecoverage") }}</label></CCol
              >
              <CCol sm="3">
                <ValidationProvider v-slot="v" rules="required">
                  <b-form-checkbox
                    switch
                    v-model="OrgInfo.mobilecoverage"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                  </b-form-checkbox>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <ValidationProvider
                  v-if="OrgInfo.electricity"
                  v-slot="v"
                  name="electricitytype"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('electricitytype')"
                    autocomplete="electricitytype"
                    horizontal
                    :label="$t('electricitytype')"
                    v-model="OrgInfo.electricitytype"
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
              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  v-if="OrgInfo.internetconnection"
                  name="internetconnectiontype"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('internetconnectiontype')"
                    autocomplete="text"
                    horizontal
                    :label="$t('internetconnectiontype')"
                    v-model="OrgInfo.internetconnectiontype"
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
              <CCol sm="4">
                <ValidationProvider
                  v-if="OrgInfo.mobilecoverage"
                  v-slot="v"
                  name="mobilecoveragetype"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('mobilecoveragetype')"
                    autocomplete="text"
                    horizontal
                    :label="$t('mobilecoveragetype')"
                    v-model="OrgInfo.mobilecoveragetype"
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
            </CRow>
            <CRow>
              <CCol sm="1"
                ><label>{{ $t("isenabled") }}</label></CCol
              >
              <CCol sm="3">
                <ValidationProvider v-slot="v" rules="required">
                  <b-form-checkbox
                    switch
                    v-model="OrgInfo.isenabled"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                  </b-form-checkbox>
                </ValidationProvider>
              </CCol>
            </CRow>
            
            <div>
              <b-modal
                size="xl"
                v-model="MapModal"
                no-close-on-backdrop
                hide-footer
                :title="$t('map')"
              >
                <b-row>
                  <b-col>
                    <CInput
                        :placeholder="$t('latitude')"
                        autocomplete="text"
                        horizontal
                        :label="$t('latitude')"
                        v-model="filterCoor.lat"
                        type="number"
                      >
                      </CInput>
                  </b-col>
                  <b-col>
                    <CInput
                        :placeholder="$t('longitude')"
                        autocomplete="text"
                        horizontal
                        type="number"
                        :label="$t('longitude')"
                        v-model="filterCoor.lng"
                      >
                      </CInput>
                  </b-col>
                  <b-col>
                    <b-button variant="primary" @click="ViewCoor"> <b-icon icon="eye"></b-icon> {{ $t('view') }} </b-button>
                  </b-col>
                </b-row>
                <div style="width : 100%;height : 80vh">
                  <gmap-map
                    :center="center"
                    :zoom="zoom"
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
                        {{ OrgInfo.organizationname }}
                      </gmap-info-window>
                    </GmapMarker>
                  </gmap-map>
                </div>
                <CRow class="mt-1">
                  <CCol class="text-center">
                    <b-button
                      variant="outline-danger"
                      @click="MapModal = false"
                      class="mr-1"
                      size="sm"
                    >
                      {{ $t("back") }}
                    </b-button>
                    <b-button
                      :variant="isChange ? 'primary' : 'outline-primary'"
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
                    (OrgInfo.latitude == 0 || OrgInfo.latitude == null) && (OrgInfo.longitude == 0 || OrgInfo.longitude == null)
                      ? 'danger'
                      : 'success'
                  "
                >
                  <div class="alert-body">
                    <b-icon
                      class="mr-25"
                      :icon="
                        OrgInfo.latitude == 0 || OrgInfo.latitude == null
                          ? 'exclamation-triangle-fill'
                          : 'check-square'
                      "
                    />
                    <span class="ml-25">
                      {{
                        OrgInfo.latitude == 0 || OrgInfo.latitude == null
                          ? $t("NotMarkedInMap")
                          : $t("MarkedInMap")
                      }}</span
                    >
                  </div>
                </b-alert>
              </b-card>
            </div>
          </ValidationObserver>
        </CCardBody>

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

        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push(`/Management/OrgInfo`)"
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
import OrgInfoService from "@/services/orginfo.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
export default {
  data() {
    return {
      center: { lat: 41, lng: 69 },
      show: false,
      MapModal: false,
      organizationlist: [],
      Oblastlist: [],
      Regionlist: [],
      isChange: false,
      OrgInfo: {},
      SaveLoading: false,
      position: {
        lat: "",
        lng: "",
      },
      window_open1: false,
      OrgInfo: {
        code: "",
        shortname: "",
        fullname: "",
      },
      filter: {
        isfarmfy: "",
      },
      lang : localStorage.getItem('locale') || 'ru',
      zoom : 8,
      filterCoor : {
        lat : 0,
        lng : 0
      }
    };
  },

  created() {
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.Oblastlist = res.data;
    });
    OrgInfoService.Get(this.$route.params.id).then((res) => {
      this.show = false;
      this.OrgInfo = res.data;
      if (res.data.latitude === 0) {
        (this.center.lat = 41), (this.center.lng = 69);
      } else {
        (this.center.lat = res.data.latitude),
          (this.center.lng = res.data.longitude);
      }
      (this.position.lat = res.data.latitude),
        (this.position.lng = res.data.longitude);
      //   this.position = {
      //     lat: res.data.latitude,
      //     lng: res.data.longitude,
      //   };
      //   this.items1 =
      //     res.data.Translates.filter((item) => item.columnname == "shortname") ||
      //     [];
      //   this.items2 =
      //     res.data.Translates.filter((item) => item.columnname == "fullname") ||
      //     [];
      this.getRegionList();
      this.getOrgList();
    });
  },
  methods: {
    ViewCoor(){
      this.position = {
        lat : parseFloat(this.filterCoor.lat),
        lng : parseFloat(this.filterCoor.lng) 
      }
      this.center = this.position
      this.zoom = 10
    },
    ChangeOblast() {
      this.OrgInfo.regionid = 0;
      this.OrgInfo.organizationid = 0;
      this.getRegionList();
    },
    getRegionList() {
      if (!!this.OrgInfo.oblastid) {
        this.OrgInfo.oblastname = this.Oblastlist.filter(
          (item) => item.id === this.OrgInfo.oblastid
        )[0].name;
        RegionService.GetAll(this.lang,this.OrgInfo.oblastid).then((res) => {
          this.Regionlist = res.data;
        });
      }
    },
    getOrgList() {
      if (!!this.OrgInfo.regionid) {
        OrganizationService.GetAll(
          this.OrgInfo.oblastid,
          this.OrgInfo.regionid,
          this.filter.isfarmfy
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    ChangeOrganization() {
      if (!!this.OrgInfo.organizationid) {
        this.OrgInfo.organizationname = this.organizationlist.filter(
          (item) => item.id === this.OrgInfo.organizationid
        )[0].name;
      }
    },

    ChangeRegion() {
      this.OrgInfo.organizationid = 0;
      this.getOrgList();
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      OrgInfoService.Update(this.OrgInfo)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/Management/OrgInfo`);
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    myFunc(el) {
      if (this.isChange) {
        (this.position.lat = el.latLng.lat()),
          (this.position.lng = el.latLng.lng());
      }
    },
    AddMarker() {
      this.OrgInfo.latitude = this.position.lat;
      this.OrgInfo.longitude = this.position.lng;
      this.MapModal = false;
    },
    OpenMapModal() {
      this.MapModal = true;
      this.filterCoor = {
        lat : 0,
        lng : 0
      }
      this.center = {
        lat : 41,
        lng : 69
      }
      this.zoom = 8
      this.position = {
        lat : 0,
        lng : 0
      }
    },
    check() {
      var self = this;
      if (
        self.OrgInfo.number === 0 ||
        self.OrgInfo.number === null ||
        self.OrgInfo.number === undefined ||
        self.OrgInfo.number === ""
      ) {
        this.makeToast(this.$t("NumberNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrgInfo.inn === 0 ||
        self.OrgInfo.inn === null ||
        self.OrgInfo.inn === undefined ||
        self.OrgInfo.inn === ""
      ) {
        this.makeToast(this.$t("INNNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.OrgInfo.sector === 0 ||
        self.OrgInfo.sector === null ||
        self.OrgInfo.sector === undefined ||
        self.OrgInfo.sector === ""
      ) {
        this.makeToast(this.$t("SectorNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      // if (
      //   self.OrgInfo.educationlevel === 0 ||
      //   self.OrgInfo.educationlevel === null ||
      //   self.OrgInfo.educationlevel === undefined ||
      //   self.OrgInfo.educationlevel === ""
      // ) {
      //   this.makeToast(
      //     this.$t("EducationlevelNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      return true;
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

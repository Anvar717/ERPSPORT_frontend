<template>
  <div>
    <b-row class="mt-3 mb-3" v-if="!isView">
      <b-col class="text-right mr-0 pr-0">
        <b-button variant="primary" class="mr-2" @click="AddSportCompetetionIndicator">
          <b-icon icon="plus"></b-icon> {{ $t("Add") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table :fields="fields" :items="step1list" small responsive="sm" bordered head-row-variant="info"
          :tbody-tr-class="rowClass" show-empty>
          <template #cell(index)="{ item, index }">
            {{ index + 1 }}
          </template>
          <template #cell(actions)="{ item }">
            <div class="text-center">
              <b-link v-if="item.statusid != 2" @click="Edit(item)" class="mr-2" v-c-tooltip="{ content: $t('Edit') }">
                <b-icon icon="pencil"></b-icon>
              </b-link>
              <b-link v-if="item.statusid != 2" @click="Delete(item)" class="mr-2"
                v-c-tooltip="{ content: $t('Delete') }">
                <b-icon icon="trash"></b-icon>
              </b-link>
            </div>
          </template>
          <template #empty>
            <h5 class="text-center">{{ $t("NoItems") }}</h5>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="my-modal" :title="$t('sportcompetitionindicator')" v-model="createModal" hide-footer size="xl"
      no-close-on-backdrop>
      <b-card>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("country") }} </label>
            <v-select :options="countrylist" v-model="tabrow.countryid" @input="changeCountry"
              :placeholder="$t('ChooseBelow')" :reduce="(item) => item.id" label="name"></v-select>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("oblast") }} </label>
            <v-select :options="oblastlist" :disabled="tabrow.countryid != 211" v-model="tabrow.oblastid"
              @input="changeOblast" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <label for=""> {{ $t("region") }} </label>
            <v-select :options="regionlist" v-model="tabrow.regionid" :disabled="tabrow.countryid != 211"
              @input="changeRegion" :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="name"></v-select>
          </b-col>
          <b-col v-if="tabrow.regionid" sm="12" md="6" class="mt-2">
            <label for=""> {{ $t("organization") }} </label>
            <v-select v-model="tabrow.sportorganizationid" :reduce="(item) => item.id" label="name"
              :options="organizationlist" :placeholder="$t('organization')" class="fname-select"
              @input="getBuildingTypeList" />
          </b-col>
          <b-col sm="12" md="6" class="mt-2">
            <label for=""> {{ $t("address") }} </label>
            <b-form-input style="width: 100%" type="text" :placeholder="$t('address')"
              v-model="tabrow.address"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="6" class="mt-2">
            <label for=""> {{ $t("SportFacilityType") }} </label>
            <v-select :options="OrganizationBuildingInfoList" v-model="tabrow.orgbuildinginfoid"
              :reduce="(item) => item.id" :placeholder="$t('ChooseBelow')" label="orgbuildinginfoname"
              @input="setOrgBulidingName"></v-select>
          </b-col>
          <b-col sm="6" md="6" class="mt-2">
            <label for=""> {{ $t("orgbuildinginfoname") }} </label>
            <b-form-input style="width: 100%" type="text" :placeholder="$t('orgbuildinginfoname')"
              v-model="tabrow.orgbuildinginfoname"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="12" md="6" >
            <gmap-map v-if="tabrow.orgbuildinginfoid" :center="{
              lat: tabrow.latitude,
              lng: tabrow.longitude
            }" :zoom="map.zoom" style="width:100%;height : 400px" map-type-id="roadmap">
              <GmapMarker :key="'three'" :position="{
                lat: tabrow.latitude,
                lng: tabrow.longitude
              }" :visible="true">
              </GmapMarker>
            </gmap-map>
          </b-col>
          <b-col sm="12" md="6">
            <div v-for="(img,imgIndex) in tabrow.FileTables">
              <img width="100%" :src="axios.defaults.baseURL + 'FileManage/Get?id=' + img.attachmentfileid" alt="">
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right mt-2">
            <b-button @click="createModal = false" variant="outline-danger" class="mr-2"> {{ $t('back') }} </b-button>
            <b-button @click="Add" variant="success"> {{ $t('save') }} </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
    <b-row>
      <b-col class="text-right" v-if="!isView">
        <b-button variant="success" v-if="!isFilled || isNewAdded" class="mr-2" @click="Save"> <b-spinner
            v-if="SaveLoading" small></b-spinner> {{ $t('save') }} </b-button>
        <b-button variant="success" v-else-if="!isApproved && isFilled" class="mr-2" @click="Accept"> {{ $t('Accept') }}
        </b-button>
        <b-button variant="primary" v-if="isFilled" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
      <b-col class="text-right" v-if="isView">
        <b-button variant="primary" @click="$emit('next')"> {{ $t('next') }} </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CountryService from "@/services/Country.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SportCompetitionService from "@/services/SportCompetition.service";
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import axios from 'axios'
export default {
  data() {
    return {
      axios,
      step1: {},
      countrylist: [],
      lang: "",
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      step1list: [],
      loading: false,
      SaveLoading: false,
      tabrow: {
        latitude: "",
        longitude : ""
      },
      createModal: false,
      editedIndex: -1,
      firstList: [],
      OrganizationBuildingInfoList: [],
      fields: [
        { key: 'index', label: this.$t('№') },
        { key: 'countryname', label: this.$t('country') },
        { key: 'oblastname', label: this.$t('oblastname') },
        { key: 'regionname', label: this.$t('regionname') },
        { key: 'address', label: this.$t('address') },
        { key: 'sportorganizationname', label: this.$t('organization') },
        { key: 'orgbuildinginfoname', label: this.$t('orgbuildinginfoname') },
        { key: !this.isView ? 'actions' : '', label: this.$t('actions') },
      ],
      orgBuildingInfo: {},
      map: {
        center: {
          lat: 41.311081,
          lng: 69.240562
        },
        opened: false,
        zoom: 13,
        data: {}
      },
    };
  },
  props: {
    sportcompetitionindicator: {
      type: Array,
      default: [],
    },
    SportCompetition: {
      type: Object,
      default: {},
    },
    uid: {
      type: String,
      default: 'd0e626d2-cbb0-4805-b468-0c6afec46c26'
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    CountryService.GetAll(this.lang)
      .then((res) => {
        this.countrylist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.GetIndicatorList()
  },
  computed: {
    isApproved() {
      let isapproved = false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isapproved = this.SportCompetition.Steps[1].isapproved
      }
      return isapproved
    },
    isFilled() {
      let isfilled = false
      if (this.SportCompetition && this.SportCompetition.Steps) {
        isfilled = this.SportCompetition.Steps[1].isfilled
      }
      return isfilled
    },
    isNewAdded() {
      let oldTable = JSON.stringify(this.firstList)
      let newTable = JSON.stringify(this.step1list)
      if (this.SportCompetition.Steps[1].isfilled && oldTable != newTable) {
        return true
      }
      return false
    },
    isEdit() {
      return this.$routr.params.id
    }
  },
  methods: {
    setOrgBulidingName() {
      if (this.tabrow.orgbuildinginfoid) {
        console.log(this.tabrow)
        var buildingInfo = this.OrganizationBuildingInfoList.find(el => el.id == this.tabrow.orgbuildinginfoid)
        this.tabrow.orgbuildinginfoname = buildingInfo.orgbuildinginfoname
        OrganizationBuildingInfoService.Get(this.tabrow.orgbuildinginfoid).then(res => {
          this.orgBuildingInfo = res.data
          this.tabrow = {
            ...this.tabrow,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            FileTables: res.data.FileTables,
            
          }
        })
        console.log(this.tabrow)
      }
      else {
        this.tabrow.longitude = ""
      }

    },
    GetIndicatorList() {
      SportCompetitionService.GetIndicatorList(this.uid).then(res => {
        this.step1list = res.data.rows
        this.firstList = JSON.parse(JSON.stringify(res.data.rows))
      })
    },
    Save() {
      this.SaveLoading = true
      SportCompetitionService.UpdateIndicator(this.step1list).then(res => {
        this.$emit('GetAction', true)
        this.firstList = JSON.parse(JSON.stringify(this.step1list))
        this.SaveLoading = false
        this.makeToast(this.$t('SavedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
    },
    Accept() {
      SportCompetitionService.ApproveIndicator(this.uid).then(res => {
        this.$emit('next')
        this.$emit('GetAction', true)
        this.makeToast(this.$t('AcceptedSuccessfully'), this.$t("message"), "success");
      }).catch(error => {
        this.SaveLoading = false
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      })
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
    Add() {
      if (this.tabrow.countryid == 211 && !this.tabrow.oblastid) {
        this.makeToast(this.$t('oblastNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (!this.tabrow.address) {
        this.makeToast(this.$t('addressNotCorrect'), this.$t('Error'), 'danger')
        return false
      }
      if (!this.tabrow.orgbuildinginfoname) {
        this.makeToast(this.$t('pleaseEnterOrgbuildinginfoname'), this.$t('Error'), 'danger')
        return false
      }
      var self = this
      if (self.editedIndex > -1) {
        Object.assign(
          self.step1list[self.editedIndex],
          self.tabrow
        );
      } else {
        self.step1list.push(self.tabrow);
      }
      self.createModal = false
      self.tabrow = {}
    },
    Edit(item) {
      if (item.statusid == 0) {
        item.statusid = 2;
      }
      this.editedIndex = this.step1list.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$nextTick(() => {
        if (this.tabrow.countryid) {
          OblastService.GetAll(this.lang, this.tabrow.countryid)
            .then((res) => {
              this.oblastlist = res.data;
            })
            .catch((error) => {
              this.makeToast(
                error.response.data.error,
                this.$t("Error"),
                "danger"
              );
            });
        }
        if (this.tabrow.regionid) {
          OrganizationService.GetAll(
            this.tabrow.oblastid,
            this.tabrow.regionid,
            "",
            "",
            ""
          ).then((res) => {
            this.organizationlist = res.data;
          });
        }
        if (!!this.tabrow.oblastid) {
          RegionService.GetAll(this.lang, this.tabrow.oblastid).then((res) => {
            this.regionlist = res.data;
          });
        }
        this.createModal = true;
      })
    },
    Delete(item) {
      let editedIndex = this.step1list.indexOf(item);
      if (item.id) {
        SportCompetitionService.DeleteIndicator({ sportCompetitionUId: this.uid, id: item.id }).then(res => {
          this.step1list.splice(editedIndex, 1)
        })
      } else {
        this.step1list.splice(editedIndex, 1)
      }
    },
    AddSportCompetetionIndicator() {
      this.GetIndicator()
    },
    getBuildingTypeList() {
      let orgInfo = this.organizationlist.find(el => el.id == this.tabrow.sportorganizationid)
      this.tabrow.sportorganizationname = orgInfo.name
      OrganizationBuildingInfoService.GetAll(this.tabrow.sportorganizationid).then((res) => {
        this.OrganizationBuildingInfoList = res.data;
      });
    },
    GetIndicator() {
      this.loading = true
      SportCompetitionService.GetIndicator(0, this.uid).then((res) => {
        this.tabrow = res.data
        this.tabrow.statusid = 1
        this.tabrow.countryid = 211
        this.tabrow.countryname = 'УЗБЕКИСТАН'
        this.tabrow.sportCompetitionUId = this.uid
        this.tabrow.longitude = 0
        this.tabrow.latitude = 0
        this.tabrow.FileTables = []
        this.createModal = true
        this.loading = false;
        this.changeCountry(this.tabrow)
      });
    },
    changeCountry() {
      this.tabrow.oblastid = 0;
      this.tabrow.regionid = 0;
      this.tabrow.sportorganizationid = 0;
      this.regionlist = [];
      this.organizationlist = [];
      this.oblastlist = [];
      if (this.tabrow.countryid) {
        this.tabrow.countryname = this.countrylist.filter(el => el.id == this.tabrow.countryid)[0].name
        OblastService.GetAll(this.lang, this.tabrow.countryid)
          .then((res) => {
            this.oblastlist = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("Error"),
              "danger"
            );
          });
      }
    },
    changeOblast(item) {
      this.regionlist = [];
      this.organizationlist = [];
      this.tabrow.regionid = 0;
      this.tabrow.sportorganizationid = 0;
      if (!!this.tabrow.oblastid) {
        this.tabrow.oblastname = this.oblastlist.filter(el => el.id == this.tabrow.oblastid)[0].name
        RegionService.GetAll(this.lang, this.tabrow.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    changeRegion(item) {
      this.tabrow.sportorganizationid = 0;
      this.organizationlist = [];
      if (this.tabrow.regionid) {
        this.tabrow.regionname = this.regionlist.filter(el => el.id == this.tabrow.regionid)[0].name
        OrganizationService.GetAll(
          this.tabrow.oblastid,
          this.tabrow.regionid,
          "",
          "",
          ""
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    rowClass(item, type) {
      // if (item.statusid === 3) {
      //   return "d-none";
      // }
    },
  },
};
</script>

<style></style>
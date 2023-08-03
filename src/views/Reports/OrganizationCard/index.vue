<template>
  <b-container fluid>
    <b-card>
      <b-row>
        <b-col sm="8">
          <div class="d-flex">
              <div class="mr-2" style="width: 100%">
              <v-select
                :options="schoolyearlist"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolyear')"
                style="width:100% !important"
                label="name"
              ></v-select>
            </div>
            <div class="mr-2" style="width: 100%">
              <v-select
                :options="OblastList"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                v-model="filter.oblastid"
                @input="ChangeOblast"
              ></v-select>
            </div>
            <div class="mr-2" style="width: 100%">
              <v-select
                :options="RegionList"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                v-model="filter.regionid"
                @input="ChangeRegion"
              ></v-select>
            </div>
            <div class="mr-2" style="width: 100%">
              <v-select
                :options="OrganizationList"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                v-model="filter.organizationid"
              ></v-select>
            </div>
          </div>
        </b-col>
        <b-col sm="3">
          <div class="d-flex">
            <div class="mr-2">
              <b-button @click="Refresh" variant="primary">
                <b-icon icon="search"></b-icon> {{ $t("search") }}
              </b-button>
            </div>
            <div class="mr-5" >
              <b-button @click="PrintCard" variant="primary">
                <b-icon icon="printer"></b-icon> {{ $t("Print") }}
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="mt-3" v-if="!!OrganizationData.Title">
      <b-row>
        <b-col class="text-center">
          <h2
            style="cursor: pointer"
            class="font-weight:bold mb-0 font-size-34 wc-subtitle"
          >
            {{ OrganizationData.Title }}
          </h2>
        </b-col>
      </b-row>
    </b-card>
    <div>
      <b-tabs>
        <b-tab>
          <template #title>
            <span>{{ $t("reference") }}</span>
          </template>
          <b-card>
            <b-row>
              <b-col>
                <organization-card
                  :specsubject="specsubject"
                  :kadastr="kadastr"
                  :loading="loading"
                  :items="items"
                ></organization-card>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
        <b-tab>
          <template #title>
            <span>{{ $t("otherorganizationcard") }}</span>
          </template>
          <b-card>
            <b-row>
              <b-col>
                <other-organization-card
                  :kadastr="kadastr"
                  :loading="loading"
                  :items="items"
                ></other-organization-card>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import OrganizationCard from "@/components/OrganizationCard.vue";
import OtherOrganizationCard from "@/components/OtherOrganizationCard.vue";
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
export default {
  components: { OrganizationCard, OtherOrganizationCard },
  data() {
    return {
      OrganizationList: [],
      OblastList: [],
      RegionList: [],
      filter: {
        organizationid: "",
        regionid: "",
        oblastid: "",
        schoolyearid: 3,
      },
      items: {},
      OrganizationData: {},
      loading: false,
      kadastr: [],
      specsubject: [],
      schoolyearlist:[],
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
      SchoolYearService.GetDefault().then((res) => {
      this.filter.schoolyearid = res.data.id;
    });
    });
  },
  methods: {
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    check() {
      var self = this;
      if (
        self.filter.oblastid === null ||
        self.filter.oblastid === undefined ||
        self.filter.oblastid === 0 ||
        self.filter.oblastid === ""
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.filter.regionid === null ||
        self.filter.regionid === undefined ||
        self.filter.regionid === 0 ||
        self.filter.regionid === ""
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.filter.organizationid === null ||
        self.filter.organizationid === undefined ||
        self.filter.organizationid === 0 ||
        self.filter.organizationid === ""
      ) {
        this.makeToast(
          this.$t("organizationNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".docx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    PrintCard(){
      if (!this.check()) {
        return false;
      }
      OrganizationService.PrintOrganizationCard(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.schoolyearid
      ).then(res => {
        this.forceFileDownload(res, 'OrganizationCard');
      })
      .catch((error) => {
        this.makeToast(
          error.response.data.error,
          this.$t("message"),
          "danger"
        );
      });
    },
    Refresh() {
      this.loading = true;
      OrganizationService.GetOrganizationCard(this.filter.organizationid,this.filter.schoolyearid)
        .then((res) => {
          this.items = res.data.organizationData;
          this.OrganizationData = res.data;
          this.kadastr = res.data.kadastrDataList;
          this.specsubject = res.data.organizationData.SpesSubject;
          this.loading = false;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>
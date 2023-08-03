<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("AdmQuotaBySchoolList") }}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label> {{ $t('ondate') }} </label>
                <date-picker
                    v-model="filter.ondate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
              </div>
            </b-col>
            <b-col>
              <div>
                <label> {{ $t('SchoolYear') }} </label>
                 <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
            <b-col>
              <div>
                <label> {{ $t('oblast') }} </label>
                <v-select
                    :options="oblastlist"
                    v-model="filter.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('oblast')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
            <b-col>
              <div>
                <label> {{ $t('region') }} </label>
                <v-select
                    :options="regionlist"
                    v-model="filter.regionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('region')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
            <b-col>
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                style="margin-top:28px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
                {{ $t('Refresh') }}
              </CButton>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                style="margin-top:28px"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import AdmQuotaAndEstatementService from "@/services/AdmQuotaAndEstatement.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      oblastlist: [],
      regionlist: [],
      fields: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "mainquota",
          label: this.$t("mainquota"),
          sortable: false,
        },
        {
          key: "additionalquota",
          label: this.$t("additionalquota"),
          sortable: false,
        },
        {
          key: "totalquota",
          label: this.$t("totalquota"),
          sortable: false,
        },
        {
          key: "schoolgradecount",
          label: this.$t("schoolgradecount"),
          sortable: false,
        },
        {
          key: "averagegrade",
          label: this.$t("averagegrade"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        schoolyearid: 1,
        ondate: "",
        oblastid: 0,
        regionid: 0,
      },
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.oblastlist = res.data;
    });
    this.createDate();
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    getregionlist(oblastid, setregionlist) {
      RegionService.GetAll(this.lang,this.filter.oblastid).then((res) => {
        setregionlist(res.data);
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },

    Refresh() {
      this.isBusy = true;
      AdmQuotaAndEstatementService.GetSchoolAdmQuotaBySchool(
        this.filter.schoolyearid,
        this.filter.ondate,
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data;
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
  watch: {
    "filter.oblastid": {
      handler(newValue, oldValue) {
        if (newValue) {
          newValue;
          oldValue;
          if (oldValue) {
            oldValue;
            this.filter.regionid = null;
          }
          var self = this;
          this.getregionlist(newValue, function(data) {
            self.regionlist = data;
          });
        }
      },
    },
  },
};
</script>

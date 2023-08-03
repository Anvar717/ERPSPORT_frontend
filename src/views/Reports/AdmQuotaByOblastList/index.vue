<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3">
          <b-col class="ml-3">
            <h4 class="text-center">{{ $t("AdmQuotaByOblastList") }}</h4>
          </b-col>
          <!-- <b-col class="mr-3">
            <CButton
                color="danger"
                class="float-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
          </b-col> -->
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col>
              <div>
                <label  for>{{
                  $t("ondate")
                }}</label>
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
                <label> {{ $t('schoolyear') }} </label>
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
              <label for="" style="height : 40px"></label>
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                
              >
                <b-icon icon="arrow-repeat"> </b-icon>
                {{ $t('Refresh') }}
              </CButton>
            </b-col>
            <b-col>
              <!-- <label for="" style="height : 40px"></label> -->
              <CButton
                color="danger"
                class="float-right"
                style="margin-top : 28px"
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
import AdmQuotaAndEstatementService from "@/services/AdmQuotaAndEstatement.service";
export default {
  data() {
    return {
      schoolyearlist: [],
      fields: [
        {
          key: "oblastname",
          label: this.$t("oblastname"),
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
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
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
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },

    Refresh() {
      this.isBusy = true;
      AdmQuotaAndEstatementService.GetSchoolAdmQuotaByOblastList(
        this.filter.schoolyearid,
        this.filter.ondate
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
};
</script>

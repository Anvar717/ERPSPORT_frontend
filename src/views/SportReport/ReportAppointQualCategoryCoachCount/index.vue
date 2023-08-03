<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="mt-3 mx-1">
          <b-col>
            <h3 class="text-center">
              {{ $t("ReportAppointQualCategoryCoachCount") }}
            </h3>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row>
            <b-col md="3" sm="12">
              <div>
                <label> {{ $t("oblast") }} </label>
                <v-select
                  :options="oblastlist"
                  v-model="filter.oblastid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="ChangeOblast"
                >
                </v-select>
              </div>
            </b-col>
            <b-col md="3" sm="12">
              <div>
                <label> {{ $t("region") }} </label>
                <v-select
                  :options="regionlist"
                  v-model="filter.regionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </b-col>
            <b-col class="text-right mt-3">
              <CButton color="danger" @click="$router.go(-1)" size="sm">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <div class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("OrderNumber") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      v-if="filter.oblastid === 0 || filter.oblastid === null"
                      rowspan="2"
                    >
                      {{ $t("sportPlaceName") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        !filter.byschool
                      "
                      rowspan="2"
                    >
                      {{ $t("regionname") }}
                    </th>
                    <th
                      rowspan="2"
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        filter.byschool
                      "
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("organizationname") }}
                    </th>
                    <th
                      rowspan="2"
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ $t("organizationname") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Toifali trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      colspan="3"
                    >
                      {{ $t("Jumladan") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Sport turi") }}
                    </th>
                  </tr>
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("SecondCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("FirstCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("Oliy toifa") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in items"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <td>
                      {{ i + 1 }}
                    </td>
                    <td
                      v-if="filter.oblastid === 0 || filter.oblastid === null"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)" @click="oblastchange(item)">{{
                        item.oblastname
                      }}</a>
                    </td>
                    <td
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null)
                      "
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)" @click="regionchange(item)">{{
                        item.regionname
                      }}</a>
                    </td>
                    <td
                      v-if="filter.oblastid > 0 && filter.regionid > 0"
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)">{{ item.organizationname }}</a>
                    </td>
                    <td>
                      {{ item.totlacoachcount }}
                    </td>
                    <td>
                      {{ item.coachcountcategory }}
                    </td>
                    <td>{{ item.coachcountcategory3 }}</td>
                    <td>{{ item.coachcountcategory2 }}</td>
                    <td>{{ item.coachcountcategory1 }}</td>
                    <td>
                      <b-button
                        variant="primary"
                        size="sm"
                        @click="getsporttype(item, i)"
                      >
                        <b-icon
                          v-if="!isBusy || index != i"
                          icon="three-dots"
                          style="width: 34px"
                        ></b-icon>
                        <b-spinner v-if="isBusy && index == i" small></b-spinner>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="isShow" class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("OrderNumber") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Sport turi") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      rowspan="2"
                    >
                      {{ $t("Toifali trenerlar soni") }}
                    </th>
                    <th
                      style="text-align: center; vertical-align: middle"
                      colspan="3"
                    >
                      {{ $t("Jumladan") }}
                    </th>
                  </tr>
                  <tr>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("SecondCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("FirstCategory") }}
                    </th>
                    <th style="text-align: center; vertical-align: middle">
                      {{ $t("Oliy toifa") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in SportTypeTables"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <td>
                      {{ i + 1 }}
                    </td>
  
                    <td>{{ item.sporttypeclassifiername }}</td>
                    <td>
                      {{ item.totlacoachcount }}
                    </td>
                    <td>
                      {{ item.coachcountcategory }}
                    </td>
                    <td>{{ item.coachcountcategory3 }}</td>
                    <td>{{ item.coachcountcategory2 }}</td>
                    <td>{{ item.coachcountcategory1 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
      
  <script>
import SportReportService from "@/services/SportReport.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
export default {
  components: {},
  data() {
    return {
      oblastlist: [],
      regionlist: [],
      SportTypeTables: [],
      items: [],
      totalRows: "",
      isBusy: false,
      isShow: false,
      filter: {
        oblastid: 0,
        regionid: 0,
        OblastName: "",
        RegionName: "",
      },
    };
  },
  created() {
    this.Refresh();
    OblastService.GetAll(this.lang).then((res) => {
      this.oblastlist = res.data;
    });
  },
  computed: {},
  methods: {
    ChangeOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    getsporttype(item, i) {
      this.index = i;
      this.isShow = true;
      this.isBusy = true;
      SportReportService.GetReportAppointQualCategoryCoachCountBySportType(
        item.oblastid,
        item.regionid,
        item.organizationid
      ).then((res) => {
        this.isBusy = false;
        this.SportTypeTables = res.data.data;
      });
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportAppointQualCategoryCoachCount(
        this.filter.oblastid,
        this.filter.regionid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.ChangeOblast();
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          this.filter.RegionName = " / " + res.data.regionname;
        }
      });
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.filter.OblastName = " / " + item.oblastname;
      this.Refresh();
      //   this.getsporttype(item, i);
    },
    regionchange(item) {
      this.filter.regionid = item.regionid;
      this.filter.RegionName = " / " + item.regionname;
      this.Refresh();
      //   this.getsporttype(item, i);
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
  <style lang="scss" scoped>
p.test2 {
  //   writing-mode: sideways-lr;
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  text-align: start;
  font-size: 13px;
}
p.text1 {
  // text-align: start;
  font-size: 13px;
}
</style>

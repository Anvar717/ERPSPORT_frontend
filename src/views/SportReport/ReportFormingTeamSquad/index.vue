<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="$router.go(-1)" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8">
            <h4 class="text-center">{{ $t("ReportFormingTeamSquad") }}</h4>
          </b-col>
          <b-col md="2">
            <CButton @click="Print" class="float-right" color="primary" size="sm">
              <b-icon icon="printer" v-if="!PrintLoading"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner>
              {{ $t("Print") }}
            </CButton>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-row class="mt-2">
            <b-col md="3" sm="12">
              <div>
                <label>{{ $t("SportTeamSquadLevel") }}</label>
                <v-select
                  :options="squadlevellist"
                  v-model="filter.squadlevelid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="ChangeSquadLevel"
                ></v-select>
              </div>
            </b-col>
            <b-col md="3" sm="12" v-if="filter.squadlevelid != 1">
              <div>
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :options="oblastlist"
                  v-model="filter.oblastid"
                  @click="Refresh"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="ChangeOblast"
                ></v-select>
              </div>
            </b-col>
            <b-col md="3" sm="12" v-if="filter.squadlevelid != 1 && filter.squadlevelid != 2">
              <div>
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="regionlist"
                  v-model="filter.regionid"
                  @input="Refresh"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </b-col>
            <b-col md="3" lg="2" sm="12" class="">
              <label>{{ $t("date") }}</label>
              <div>
                <custom-date-picker
                  v-model="filter.date"
                  @click="Refresh"
                  style="width: 100%"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></custom-date-picker>
              </div>
            </b-col>
            <b-col md="1" lg="1" sm="12" class="text-left mt-4" style="padding-left: 15px">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height: 35px"
                class="d-flex align-items-center"
              >
                <b-icon icon="arrow-repeat"></b-icon>
                <span class="on-mobile pl-1">{{ $t("Refresh") }}</span>
              </CButton>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <div class="table-container" style="padding: 5px">
            <div class="mobileStyle">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      rowspan="4"
                    >{{ $t("OrderNumber") }}</th>
                    <th
                      v-if="
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != 3 &&
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != null
                      "
                      style="text-align: center; vertical-align: middle"
                      rowspan="4"
                    >{{ $t("Respublika") }}1</th>
                    <th
                      v-if="
                        filter.squadlevelid != 1 && filter.squadlevelid != null
                      "
                      style="text-align: center; vertical-align: middle"
                      rowspan="4"
                    >{{ $t("sportPlaceName") }}</th>
                    <th
                      v-if="
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != null
                      "
                      style="text-align: center; vertical-align: middle"
                      rowspan="4"
                    >{{ $t("regionname") }}</th>
                    <!-- <th
                      style="text-align: center; vertical-align: middle"
                      v-if="
                        filter.oblastid > 0 &&
                        (filter.regionid === 0 || filter.regionid === null) &&
                        filter.byschool
                      "
                      rowspan="4"
                    >
                      {{ $t("organizationname") }}
                    </th>-->
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      rowspan="4"
                    >{{ $t("Sport turi") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      rowspan="2"
                      colspan="6"
                    >{{ respublika }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="18"
                    >{{ $t("Jumladan") }}</th>
                  </tr>
                  <tr>
                    <th
                      colspan="6"
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                    >{{ $t("Yoshlar terma jamoasi") }}</th>
                    <th
                      colspan="6"
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                    >{{ $t("O'smirlar terma jamoasi") }}</th>
                    <th
                      colspan="6"
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                    >{{ $t("Kattalar terma jamoasi") }}</th>
                  </tr>
                  <tr>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Erkak") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Ayol") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Erkak") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Ayol") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Erkak") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Ayol") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Erkak") }}</th>
                    <th
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("Ayol") }}</th>
                  </tr>
                  <tr>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("totalcount") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("MainSquad") }}</p>
                    </th>
                    <th
                      style="
                        vertical-align: middle;
                        position: sticky;
                        top: 62px;
                      "
                    >
                      <p class="test2">{{ $t("Zaxira tarkib") }}</p>
                    </th>
                  </tr>
                  <tr>
                    <th
                      v-if="
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != 3 &&
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid == null
                      "
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="2"
                    >{{ $t("totalcount") }}</th>
                    <th
                      v-if="
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != 3 &&
                        filter.squadlevelid == 1 &&
                        filter.squadlevelid != null
                      "
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="2"
                    >{{ $t("totalcount") }}</th>
                    <th
                      v-if="
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != 3 &&
                        filter.squadlevelid != null
                      "
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="3"
                    >{{ $t("totalcount") }}</th>
                    <th
                      v-if="
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != null
                      "
                      style="
                        text-align: center;
                        vertical-align: middle;
                        position: sticky;
                        top: 0;
                      "
                      colspan="4"
                    >{{ $t("totalcount") }}</th>
                    <th>{{ bottomrow.mencount }}</th>
                    <th>{{ bottomrow.mainmencount }}</th>
                    <th>{{ bottomrow.reservemencount }}</th>
                    <th>{{ bottomrow.womancount }}</th>
                    <th>{{ bottomrow.mainwomancount }}</th>
                    <th>{{ bottomrow.reservewomancount }}</th>
                    <th>{{ bottomrow.youngmencount }}</th>
                    <th>{{ bottomrow.youngmainmencount }}</th>
                    <th>{{ bottomrow.youngreservemencount }}</th>
                    <th>{{ bottomrow.youngwomancount }}</th>
                    <th>{{ bottomrow.youngmainwomancount }}</th>
                    <th>{{ bottomrow.youngreservewomancount }}</th>
                    <th>{{ bottomrow.teenmencount }}</th>
                    <th>{{ bottomrow.teenmainmencount }}</th>
                    <th>{{ bottomrow.teenreservemencount }}</th>
                    <th>{{ bottomrow.teenwomancount }}</th>
                    <th>{{ bottomrow.teenmainwomancount }}</th>
                    <th>{{ bottomrow.teenreservewomancount }}</th>
                    <th>{{ bottomrow.adultmencount }}</th>
                    <th>{{ bottomrow.adultmainmencount }}</th>
                    <th>{{ bottomrow.adultreservemencount }}</th>
                    <th>{{ bottomrow.adultwomancount }}</th>
                    <th>{{ bottomrow.adultmainwomancount }}</th>
                    <th>{{ bottomrow.adultreservewomancount }}</th>
                  </tr>
                </thead>
                <b-tbody v-if="isBusy">
                  <b-tr>
                    <b-th class="text-center" style="height: 400px" colspan="27">
                      <b-spinner></b-spinner>
                    </b-th>
                  </b-tr>
                </b-tbody>
                <tbody v-if="!isBusy">
                  <tr
                    v-for="(item, i) in items"
                    style="text-align: center; vertical-align: middle"
                    :key="i"
                  >
                    <td>{{ i + 1 }}</td>
                    <td
                      v-if="
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != 3 &&
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != null
                      "
                      style="text-align: left; vertical-align: middle"
                    >
                      <a href="javascript:void(0)">{{ item.oblastname }}</a>
                    </td>
                    <td
                      v-if="
                        filter.squadlevelid != 1 && filter.squadlevelid != null
                      "
                      style="text-align: left; vertical-align: middle"
                    >
                      <a @click="oblastchange(item)" href="javascript:void(0)">{{ item.oblastname }}</a>
                    </td>
                    <td
                      v-if="
                        filter.squadlevelid != 1 &&
                        filter.squadlevelid != 2 &&
                        filter.squadlevelid != null
                      "
                      style="text-align: left; vertical-align: middle"
                    >
                      <a
                        @click="regionchange(item, i)"
                        href="javascript:void(0)"
                      >{{ item.regionname }}</a>
                    </td>
                    <td
                      style="text-align: left; vertical-align: middle"
                      @click="ChangeSportType(item)"
                    >
                      <a href="javascript:void(0)">
                        {{
                        item.sporttypeclassifiername
                        }}
                      </a>
                    </td>
                    <td>{{ item.mencount }}</td>
                    <td>{{ item.mainmencount }}</td>
                    <td>{{ item.reservemencount }}</td>
                    <td>{{ item.womancount }}</td>
                    <td>{{ item.mainwomancount }}</td>
                    <td>{{ item.reservewomancount }}</td>
                    <td>{{ item.youngmencount }}</td>
                    <td>{{ item.youngmainmencount }}</td>
                    <td>{{ item.youngreservemencount }}</td>
                    <td>{{ item.youngwomancount }}</td>
                    <td>{{ item.youngmainwomancount }}</td>
                    <td>{{ item.youngreservewomancount }}</td>
                    <td>{{ item.teenmencount }}</td>
                    <td>{{ item.teenmainmencount }}</td>
                    <td>{{ item.teenreservemencount }}</td>
                    <td>{{ item.teenwomancount }}</td>
                    <td>{{ item.teenmainwomancount }}</td>
                    <td>{{ item.teenreservewomancount }}</td>
                    <td>{{ item.adultmencount }}</td>
                    <td>{{ item.adultmainmencount }}</td>
                    <td>{{ item.adultreservemencount }}</td>
                    <td>{{ item.adultwomancount }}</td>
                    <td>{{ item.adultmainwomancount }}</td>
                    <td>{{ item.adultreservewomancount }}</td>
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
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {CustomDatePicker},
  data() {
    return {
      items: [],
      squadlevellist: [],
      oblastlist: [],
      regionlist: [],
      totalRows: "",
      isBusy: false,
      PrintLoading: false,
      respublika: "",
      lang: "ru",
      filter: {
        squadlevelid: 1,
        oblastid: 0,
        regionid: 0,
        date: "",
      },
      bottomrow: {
        mencount: 0,
        mainmencount: 0,
        reservemencount: 0,
        womancount: 0,
        mainwomancount: 0,
        reservewomancount: 0,
        youngmencount: 0,
        youngmainmencount: 0,
        youngreservemencount: 0,
        youngwomancount: 0,
        youngmainwomancount: 0,
        youngreservewomancount: 0,
        teenmencount: 0,
        teenmainmencount: 0,
        teenreservemencount: 0,
        teenwomancount: 0,
        teenmainwomancount: 0,
        teenreservewomancount: 0,
        adultmencount: 0,
        adultmainmencount: 0,
        adultreservemencount: 0,
        adultwomancount: 0,
        adultmainwomancount: 0,
        adultreservewomancount: 0
      }
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    (this.filter.squadlevelid =
      parseInt(this.$route.query.squadlevelid) || this.filter.squadlevelid),
      (this.filter.oblastid =
        parseInt(this.$route.query.oblastid) || this.filter.oblastid),
      (this.filter.regionid =
        parseInt(this.$route.query.regionid) || this.filter.regionid);
    if (this.$route.query && this.$route.query.squadLevelId) {
      this.filter.squadlevelid = this.$route.query.squadLevelId;
    }
    (this.filter.date = (this.$route.query.date) || this.filter.date),
    SportTeamSquadLevelService.GetAll()
      .then(res => {
        this.squadlevellist = res.data;
        if (!!this.filter.squadlevelid) {
          this.respublika = this.squadlevellist.filter(
            item => item.id === this.filter.squadlevelid
          )[0].name;
        }
      })
      .catch(error => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    OblastService.GetAll().then(res => {
      this.oblastlist = res.data;
    });
    this.Refresh();
  },
  computed: {},
  methods: {
    ChangeSquadLevel() {
      var self = this;
      self.filter.oblastid = 0;
      self.respublika = self.squadlevellist.filter(
        item => item.id === self.filter.squadlevelid
      )[0].name;
      SportReportService.GetReportFormingTeamSquadCount(
        self.filter.squadlevelid
      ).then(res => {
        self.isBusy = false;
      });
      this.Refresh();
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.getOblast();
      this.Refresh();
    },
    oblastchange(item) {
      this.filter.oblastid = item.oblastid;
      this.$router.push({
        name: "ReportFormingTeamSquadSportsman",
        query: { ...this.filter }
      });
      console.log(this.filter);
    },
    regionchange() {
      this.filter.regionid = item.regionid;
      this.$router.push({
        name: "ReportFormingTeamSquadSportsman",
        query: { ...this.filter }
      });
    },
    getOblast() {
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then(res => {
          this.regionlist = res.data;
        });
      }
    },
    ChangeSportType(item) {
      this.$router.push({
        name: "ReportFormingTeamSquadSportsman",
        query: {
          squadLevelId: this.filter.squadlevelid,
          sportTypeclassifierid: item.sporttypeclassifierid,
          date: this.filter.date,
        }
      });
    },
    calculateTotal(item) {
      var mencount = 0;
      var mainmencount = 0;
      var reservemencount = 0;
      var womancount = 0;
      var mainwomancount = 0;
      var reservewomancount = 0;
      var youngmencount = 0;
      var youngmainmencount = 0;
      var youngreservemencount = 0;
      var youngwomancount = 0;
      var youngmainwomancount = 0;
      var youngreservewomancount = 0;
      var teenmencount = 0;
      var teenmainmencount = 0;
      var teenreservemencount = 0;
      var teenwomancount = 0;
      var teenmainwomancount = 0;
      var teenreservewomancount = 0;
      var adultmencount = 0;
      var adultmainmencount = 0;
      var adultreservemencount = 0;
      var adultwomancount = 0;
      var adultmainwomancount = 0;
      var adultreservewomancount = 0;
      item.forEach(function(item) {
        mencount = mencount + item.mencount;
        mainmencount = mainmencount + item.mainmencount;
        reservemencount = reservemencount + item.reservemencount;
        womancount = womancount + item.womancount;
        mainwomancount = mainwomancount + item.mainwomancount;
        reservewomancount = reservewomancount + item.reservewomancount;
        youngmencount = youngmencount + item.youngmencount;
        youngmainmencount = youngmainmencount + item.youngmainmencount;
        youngreservemencount = youngreservemencount + item.youngreservemencount;
        youngwomancount = youngwomancount + item.youngwomancount;
        youngmainwomancount = youngmainwomancount + item.youngmainwomancount;
        youngreservewomancount =
          youngreservewomancount + item.youngreservewomancount;
        teenmencount = teenmencount + item.teenmencount;
        teenmainmencount = teenmainmencount + item.teenmainmencount;
        teenreservemencount = teenreservemencount + item.teenreservemencount;
        teenwomancount = teenwomancount + item.teenwomancount;
        teenmainwomancount = teenmainwomancount + item.teenmainwomancount;
        teenreservewomancount =
          teenreservewomancount + item.teenreservewomancount;
        adultmencount = adultmencount + item.adultmencount;
        adultmainmencount = adultmainmencount + item.adultmainmencount;
        adultreservemencount = adultreservemencount + item.adultreservemencount;
        adultwomancount = adultwomancount + item.adultwomancount;
        adultmainwomancount = adultmainwomancount + item.adultmainwomancount;
        adultreservewomancount =
          adultreservewomancount + item.adultreservewomancount;
      });
      this.bottomrow = {
        mencount: mencount,
        mainmencount: mainmencount,
        reservemencount: reservemencount,
        womancount: womancount,
        mainwomancount: mainwomancount,
        reservewomancount: reservewomancount,
        youngmencount: youngmencount,
        youngmainmencount: youngmainmencount,
        youngreservemencount: youngreservemencount,
        youngwomancount: youngwomancount,
        youngmainwomancount: youngmainwomancount,
        youngreservewomancount: youngreservewomancount,
        teenmencount: teenmencount,
        teenmainmencount: teenmainmencount,
        teenreservemencount: teenreservemencount,
        teenwomancount: teenwomancount,
        teenmainwomancount: teenmainwomancount,
        teenreservewomancount: teenreservewomancount,
        adultmencount: adultmencount,
        adultmainmencount: adultmainmencount,
        adultreservemencount: adultreservemencount,
        adultwomancount: adultwomancount,
        adultmainwomancount: adultmainwomancount,
        adultreservewomancount: adultreservewomancount
      };
    },
    Print() {
      (this.PrintLoading = true),
        SportReportService.PrintReportFormingTeamSquadCount(
          this.filter.squadlevelid,
          this.filter.oblastid,
          this.filter.regionid,
          this.filter.date,
        )
          .then(res => {
            (this.PrintLoading = false),
              this.forceFileDownload(res, "PrintReportFormingTeamSquadCount");
          })
          .catch(error => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
            this.PrintLoading = false;
          });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    Refresh() {
      this.isBusy = true;
      SportReportService.GetReportFormingTeamSquadCount(
        this.filter.squadlevelid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.date,
      ).then(res => {
        this.isBusy = false;
        this.items = res.data.data;
        this.calculateTotal(this.items);
      });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
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
th {
  color: #272838;
  border-bottom: 2px solid #eb9486;
}
td {
  color: #7e7f9a;
}
</style>
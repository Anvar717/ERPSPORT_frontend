<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center">{{ $t("page1") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-right mr-0 pr-0">
          <b-button variant="primary" @click="OpenCompetitionModal">
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col lg="12" class="p-0">
          <b-table
            :fields="Fields"
            :items="sportcompetitionindicator"
            class="bg-color-table text-center p-0"
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
            <template v-slot:empty>
              <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:cell(index)="{ index }">
              <p class="m-0">
                {{ index + 1 }}
              </p>
            </template>
            <template #cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="EditItem(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                  @click="DeleteItem(item)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      v-model="CompetitionModal"
      hide-footer
      no-close-on-backdrop
      size="xl"
      modal-class="custom-size-modal"
      :title="$t('page1')"
    >
      <b-row class="mt-3">
        <b-col class="text-center">
          <div class="divider">{{ $t("locationofcompetition") }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("country") }} </label>
          <v-select
            :options="countrylist"
            v-model="page1.countryid"
            @input="changeCountry"
            :disabled="sporteventtype != 2"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("oblast") }} </label>
          <v-select
            :options="oblastlist"
            :disabled="page1.countryid != 211"
            v-model="page1.oblastid"
            @input="changeOblast"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("region") }} </label>
          <v-select
            :options="regionlist"
            v-model="page1.regionid"
            :disabled="page1.countryid != 211"
            @input="changeRegion"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("sportorganization") }} </label>
          <v-select
            :options="organizationlist"
            v-model="page1.sportorganizationid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="8" class="mt-2">
          <label for=""> {{ $t("address") }} </label>
          <b-form-input
            style="width: 100%"
            type="text"
            :placeholder="$t('address')"
            v-model="page1.address"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-center">
          <div class="divider">{{ $t("dateofcompetition") }}</div>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("astartdate") }} </label>
          <custom-date-picker
            v-model="page1.competitionstartdate"
            @keyup="BindValueStartDate"
            :disabled-date="DisabledDateForStartdate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("aenddate") }} </label>
          <custom-date-picker
            v-model="page1.competitionenddate"
            :disabled-date="DisabledDateForEnddate"
            @keyup="BindValueEndDate"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-center">
          <div class="divider">{{ $t("dateofappeal") }}</div>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("astartdate") }} </label>
          <custom-date-picker
            v-model="page1.applicationstartdate"
            @keyup="BindValueApplicationStart"
            :disabled-date="DisabledApplicationDateForStartdate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("aenddate") }} </label>
          <custom-date-picker
            v-model="page1.applicationenddate"
            @keyup="BindValueApplicationEnd"
            :disabled-date="DisabledApplicationDateForEnddate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-center">
          <div class="divider">{{ $t("dateofappeal1") }}</div>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("astartdate") }} </label>
          <custom-date-picker
            v-model="page1.appealstartdate"
            @keyup="BindValueAppealStartDate"
            :disabled-date="DisabledAppealDateForStartdate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("aenddate") }} </label>
          <custom-date-picker
            v-model="page1.appealenddate"
            @keyup="BindValueAppealEndDate"
            :disabled-date="DisabledAppealDateForEnddate"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('astartdate')"
          >
          </custom-date-picker>
        </b-col>
        <b-col sm="12" md="3" class="mt-2"> </b-col>
      </b-row>

      <c-row class="mt-2">
        <c-col class="text-center">
          <b-button
            class="mr-2"
            variant="danger"
            @click="CloseCompetitionTableModal"
          >
            {{ $t("back") }}
          </b-button>
          <b-button variant="primary" @click="AddCompetitionTable">
            {{ $t("Add") }}
          </b-button>
        </c-col>
      </c-row>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
} from "bootstrap-vue";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import CountryService from "@/services/Country.service";
import OblastService from "@/services/Oblast.service";
import OrganizationService from "@/services/organization.service";
import RegionService from "@/services/Region.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    DatePicker,
    vSelect,
    BButton,
    BTable,
    CustomDatePicker,
  },
  props: {
    sportcompetitionindicator: {
      type: Array,
      default: [],
    },
    sporteventtype: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      show: false,
      page1: {
        id: 0,
        ownerid: 0,
        countryid: 211,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        address: "",
        competitionstartdate: "",
        competitionenddate: "",
        applicationstartdate: "",
        applicationenddate: "",
        appealstartdate: "",
        appealenddate: "",
        statusid: 0,
        statusname: "",
        Status: 1,
      },
      CompetitionModal: false,
      editedIndex: -1,
      financialyearlist: [],
      sporttypeclassifierlist: [],
      competitionlevellist: [],
      sporteventtypelist: [],
      sporteventlist: [],
      countrylist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      lang: "ru",
      Fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "countryname",
          label: this.$t("country"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportorganizationname",
          label: this.$t("sportorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "competitionstartdate",
          label: this.$t("competitionstartdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "competitionenddate",
          label: this.$t("competitionenddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "applicationstartdate",
          label: this.$t("applicationstartdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "applicationenddate",
          label: this.$t("applicationenddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "appealstartdate",
          label: this.$t("appealstartdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "appealenddate",
          label: this.$t("appealenddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  created() {
    this.show = true;
    this.lang = localStorage.getItem("locale") || "ru";
    CountryService.GetAll(this.lang)
      .then((res) => {
        this.countrylist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    if (!!this.page1.countryid) {
      OblastService.GetAll(this.lang, this.page1.countryid)
        .then((res) => {
          this.oblastlist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    this.show = false;
  },
  methods: {
    BindValueStartDate(value) {
      this.page1.competitionstartdate = value;
    },
    BindValueEndDate(value) {
      this.page1.competitionenddate = value;
    },
    BindValueApplicationEnd(value) {
      this.page1.applicationenddate = value;
    },
    BindValueApplicationStart(value) {
      this.page1.applicationstartdate = value;
    },
    BindValueAppealEndDate(value) {
      this.page1.appealenddate = value;
    },
    BindValueAppealStartDate(value) {
      this.page1.appealstartdate = value
    },
    DisabledApplicationDateForEnddate(date){
      if(!!this.page1.applicationstartdate){
        var arr = this.page1.applicationstartdate.split('.')
        return date < new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledApplicationDateForStartdate(date){
      if(!!this.page1.applicationenddate){
        var arr = this.page1.applicationenddate.split('.')
        return date > new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledDateForEnddate(date){
      if(!!this.page1.competitionstartdate){
        var arr = this.page1.competitionstartdate.split('.')
        return date < new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledDateForStartdate(date){
      if(!!this.page1.competitionenddate){
        var arr = this.page1.competitionenddate.split('.')
        return date > new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledAppealDateForEnddate(date){
      if(!!this.page1.appealstartdate){
        var arr = this.page1.appealstartdate.split('.')
        return date < new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    DisabledAppealDateForStartdate(date){
      if(!!this.page1.appealenddate){
        var arr = this.page1.appealenddate.split('.')
        return date > new Date(arr[2],arr[1] - 1,arr[0])
      }
    },
    changeCountry() {
      this.page1.oblastiid = 0;
      this.page.regionid = 0;
      this.page1.sportorganizationid = 0;
      this.regionlist = [];
      this.organizationlist = [];
      this.oblastlist = [];
      if (!!this.page1.countryid) {
        OblastService.GetAll(this.lang, this.page1.countryid)
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
    changeOblast() {
      this.page1.regionid = 0;
      this.regionlist = [];
      this.organizationlist = [];
      this.page1.sportorganizationid = 0;
      if (!!this.page1.oblastid) {
        RegionService.GetAll(this.lang, this.page1.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
    },
    changeRegion() {
      this.page1.sportorganizationid = 0;
      this.organizationlist = [];
      if (!!this.page1.regionid) {
        OrganizationService.GetAll(
          this.page1.oblastid,
          this.page1.regionid,
          "",
          "",
          ""
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenCompetitionModal() {
      this.CompetitionModal = true;
      this.page1 = {
        id: 0,
        ownerid: 0,
        countryid: 211,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        address: "",
        competitionstartdate: "",
        competitionenddate: "",
        applicationstartdate: "",
        applicationenddate: "",
        appealstartdate: "",
        appealenddate: "",
        statusid: 0,
        statusname: "",
        Status: 1,
      };
    },
    CloseCompetitionTableModal() {
      this.CompetitionModal = false;
      this.$nextTick(() => {
        this.page1 = {
          id: 0,
          ownerid: 0,
          countryid: 211,
          countryname: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          sportorganizationid: 0,
          sportorganizationname: "",
          orgbuildinginfoid: 0,
          address: "",
          competitionstartdate: "",
          competitionenddate: "",
          applicationstartdate: "",
          applicationenddate: "",
          appealstartdate: "",
          appealenddate: "",
          statusid: 0,
          statusname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.sportcompetitionindicator.indexOf(item);
      this.page1 = Object.assign({}, item);
      this.CompetitionModal = true;
    },
    AddCompetitionTable() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      if (!!self.page1.countryid) {
        self.page1.countryname = self.countrylist.filter(
          (item) => item.id === self.page1.countryid
        )[0].name;
      }
      if (!!self.page1.oblastid) {
        self.page1.oblastname = self.oblastlist.filter(
          (item) => item.id === self.page1.oblastid
        )[0].name;
      }
      if (!!self.page1.regionid) {
        self.page1.regionname = self.regionlist.filter(
          (item) => item.id === self.page1.regionid
        )[0].name;
      }
      if (!!self.page1.sportorganizationid) {
        self.page1.sportorganizationname = self.organizationlist.filter(
          (item) => item.id === self.page1.sportorganizationid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.sportcompetitionindicator[self.editedIndex],
          self.page1
        );
      } else {
        self.sportcompetitionindicator.push(self.page1);
      }
      self.page1 = {
        id: 0,
        ownerid: 0,
        countryid: 211,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        address: "",
        competitionstartdate: "",
        competitionenddate: "",
        applicationstartdate: "",
        applicationenddate: "",
        appealstartdate: "",
        appealenddate: "",
        statusid: 0,
        statusname: "",
        Status: 1,
      };
      self.editedIndex = -1;
      self.CompetitionModal = false;
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    check() {
      var self = this;

      if (
        self.page1.countryid === 0 ||
        self.page1.countryid === null ||
        self.page1.countryid === undefined ||
        self.page1.countryid === ""
      ) {
        this.makeToast(
          this.$t("countryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.oblastid === 0 ||
        self.page1.oblastid === null ||
        self.page1.oblastid === undefined ||
        self.page1.oblastid === ""
      ) {
        this.makeToast(this.$t("oblastNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.page1.regionid === 0 ||
        self.page1.regionid === null ||
        self.page1.regionid === undefined ||
        self.page1.regionid === ""
      ) {
        this.makeToast(this.$t("regionNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.page1.sportorganizationid === 0 ||
        self.page1.sportorganizationid === null ||
        self.page1.sportorganizationid === undefined ||
        self.page1.sportorganizationid === ""
      ) {
        this.makeToast(
          this.$t("sportorganizationNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.address === 0 ||
        self.page1.address === null ||
        self.page1.address === undefined ||
        self.page1.address === ""
      ) {
        this.makeToast(
          this.$t("addressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.competitionstartdate === 0 ||
        self.page1.competitionstartdate === null ||
        self.page1.competitionstartdate === undefined ||
        self.page1.competitionstartdate === ""
      ) {
        this.makeToast(
          this.$t("competitionstartdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.competitionenddate === 0 ||
        self.page1.competitionenddate === null ||
        self.page1.competitionenddate === undefined ||
        self.page1.competitionenddate === ""
      ) {
        this.makeToast(
          this.$t("competitionenddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.applicationstartdate === 0 ||
        self.page1.applicationstartdate === null ||
        self.page1.applicationstartdate === undefined ||
        self.page1.applicationstartdate === ""
      ) {
        this.makeToast(
          this.$t("applicationstartdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.applicationenddate === 0 ||
        self.page1.applicationenddate === null ||
        self.page1.applicationenddate === undefined ||
        self.page1.applicationenddate === ""
      ) {
        this.makeToast(
          this.$t("applicationenddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.appealstartdate === 0 ||
        self.page1.appealstartdate === null ||
        self.page1.appealstartdate === undefined ||
        self.page1.appealstartdate === ""
      ) {
        this.makeToast(
          this.$t("appealstartdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page1.appealenddate === 0 ||
        self.page1.appealenddate === null ||
        self.page1.appealenddate === undefined ||
        self.page1.appealenddate === ""
      ) {
        this.makeToast(
          this.$t("appealenddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
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
  },
};
</script>

<style lang="scss" scoped>
.divider {
  margin-top: 15px;
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
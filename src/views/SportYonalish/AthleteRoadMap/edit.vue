<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("AthleteRoadMap") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input
            disabled
            v-model="AthleteRoadMap.docnumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="AthleteRoadMap.docdate"
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            @keyup="BindValue"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("sportevent") }} </label>
          <b-form-input
            disabled
            v-model="AthleteRoadMap.sporteventname"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("Sport turi") }} </label>
          <b-form-input
            disabled
            v-model="AthleteRoadMap.sporttypeclassifiername"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="8" lg="8" class="mt-2">
          <label for=""> {{ $t("personname1") }} </label>
          <b-form-input
            disabled
            v-model="AthleteRoadMap.personname"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-tabs pills card class="p-0 team-squad">
            <b-tab active class="ml-0">
              <template slot="title">
                <b-icon icon="trophy"></b-icon>
                {{ $t("Competitions") }}
              </template>
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
                    :fields="CompetitionFields"
                    :items="AthleteRoadMap.athleteroadmaptable"
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
            </b-tab>
            <b-tab class="ml-0">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("Murabbiy") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right mr-0 pr-0">
                  <b-button variant="primary" @click="OpenCoachAddModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col lg="12" class="p-0">
                  <b-table
                    :fields="Coachfields"
                    :items="AthleteRoadMap.athleteroadmapcoachtable"
                    class="bg-color-table text-center p-0"
                    style="vertical-align: middle"
                    bordered
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:empty>
                      <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                    </template>
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link
                          @click="EditItemCoach(item)"
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Edit') }"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </b-link>
                        <b-link
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Delete') }"
                          @click="DeleteCoachItem(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-modal
        v-model="CompetitionModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('Competitions')"
      >
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">{{
                $t("ordernumber")
              }}</label>
              <div class="d-flex col-sm-8">
                <CInput
                  style="width: 100%"
                  type="number"
                  :placeholder="$t('ordernumber')"
                  v-model="CompetitionTabrow.ordernumber"
                ></CInput>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("competitionname") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sporteventlist"
                  v-model="CompetitionTabrow.sporteventid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <div class="text-center pb-4">
          <span style="font-size: 17px; text-decoration: underline">
            {{ $t("dateofcompetition") }}
          </span>
        </div>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4" for>{{
                $t("astartdate")
              }}</label>
              <div class="col-sm-8 d-flex">
                <custom-date-picker
                  v-model="CompetitionTabrow.startdate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  @keyup="BindValueStartDate"
                  :placeholder="$t('astartdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></custom-date-picker>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4" for>{{
                $t("aenddate")
              }}</label>
              <div class="col-sm-8 d-flex">
                <custom-date-picker
                  v-model="CompetitionTabrow.enddate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  @keyup="BindValueEndDate"
                  :placeholder="$t('aenddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></custom-date-picker>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <div class="text-center pb-4">
          <span style="font-size: 17px; text-decoration: underline">
            {{ $t("locationofcompetition") }}
          </span>
        </div>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("country") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="countrylist"
                  v-model="CompetitionTabrow.countryid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">{{ $t("address") }}</label>
              <div class="d-flex col-sm-8">
                <CInput
                  style="width: 100%"
                  type="text"
                  :placeholder="$t('address')"
                  v-model="CompetitionTabrow.address"
                ></CInput>
              </div>
            </div>
          </b-col>
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
      <b-modal
        v-model="CoachAddModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('Murabbiy')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("Coach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="Coachtabrow.personname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenCoachModal"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("position") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="positionlist"
                  v-model="Coachtabrow.positionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseCoachTableModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="CoachModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Coach')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :isteacher="false"
          :ondate="AthleteRoadMap.docdate"
          @SelectedItem="SelectedItemCoach"
          @DblClick="AddCoachData"
        ></employee-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseCoachModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachData(coachvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-row>
        <b-col>
          <div class="text-left">
            <b-button
              class="ml-1"
              size="sm"
              variant="danger"
              @click="$router.push({ name: 'AthleteRoadMap' })"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </b-button>
          </div>
        </b-col>
        <b-col>
          <div class="text-right">
            <b-button
              size="sm"
              :disabled="issavedisabled"
              variant="success"
              class="mr-1"
              @click="SaveData"
            >
              <b-spinner v-if="SaveLoading" small></b-spinner>
              <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
              {{ $t("Save") }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
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
import AthleteRoadMapService from "@/services/AthleteRoadMap.service";
import SportEventService from "@/services/SportEvent.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import CustomDatePicker from "@/components/customDatePicker.vue";
import CountryService from "@/services/Country.service";
import AthletePreparingCompetService from "@/services/AthletePreparingCompet.service";
import PositionService from "@/services/Position.service";
import EmployeeList from "@/components/EmployeeList";
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
    EmployeeList,
  },
  data() {
    return {
      show: false,
      AthleteRoadMap: {},
      coachvalue: {},
      SaveLoading: false,
      CompetitionModal: false,
      issavedisabled: false,
      CoachAddModal: false,
      positionlist: [],
      editedIndex1: -1,
      CompetitionTabrowData: {},
      sporteventlist: [],
      countrylist: [],
      editedIndex: -1,
      CompetitionTabrow: {
        id: 0,
        ordernumber: 0,
        ownerid: 0,
        sporteventid: 0,
        sporteventname: "",
        startdate: "",
        enddate: "",
        countryid: 0,
        countryname: "",
        address: "",
        Status: 1,
      },
      Coachtabrow: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      },
      CompetitionFields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        // {
        //   key: "ordernumber",
        //   label: this.$t("ordernumber"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
        {
          key: "sporteventname",
          label: this.$t("competitionname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
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
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      Coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("position"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
    };
  },
  created() {
    this.show = true;
    AthleteRoadMapService.Get(this.$route.params.id,this.$route.query.athletepreparingcompetid)
      .then((res) => {
        this.AthleteRoadMap = res.data;
        if (!!this.$route.query.parijid) {
          AthletePreparingCompetService.Get(this.$route.query.parijid).then(
            (res) => {
              this.AthleteRoadMap.athletepreparingcompetid = res.data.id;
              this.AthleteRoadMap.formingteamsquadid =
                res.data.formingteamsquadid;
              this.AthleteRoadMap.sporteventname = res.data.sporteventname;
              this.AthleteRoadMap.sporteventid = res.data.sporteventid;
              this.AthleteRoadMap.sporttypeclassifiername =
                res.data.sporttypeclassifiername;
              this.AthleteRoadMap.sporttypeclassifierid =
                res.data.sporttypeclassifierid;
              this.AthleteRoadMap.personname = res.data.personname;
              this.AthleteRoadMap.personid = res.data.personid;
              this.AthleteRoadMap.athleteroadmapcoachtable =
                res.data.athletepreparingcompetcoach;
              if (this.AthleteRoadMap.athleteroadmapcoachtable.length > 0) {
                this.AthleteRoadMap.athleteroadmapcoachtable.forEach(function (
                  item
                ) {
                  item.Status = 1;
                });
              }
            }
          );
        }
        this.show = false;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    SportEventService.GetAll().then((res) => {
      this.sporteventlist = res.data;
    });
    PositionService.GetAll(0, 0, false, 0).then((res) => {
      this.positionlist = res.data;
    });
    CountryService.GetAll(this.lang).then((res) => {
      this.countrylist = res.data;
    });
  },
  methods: {
    OpenCompetitionModal() {
      this.CompetitionModal = true;
      this.CompetitionTabrow = {
        id: 0,
        ordernumber: 0,
        ownerid: 0,
        sporteventid: 0,
        sporteventname: "",
        startdate: "",
        enddate: "",
        countryid: 0,
        countryname: "",
        address: "",
        Status: 1,
      };
    },
    BindValue(value) {
      this.AthleteRoadMap.docdate = value;
    },
    BindValueStartDate(value) {
      this.CompetitionTabrow.startdate = value;
    },
    BindValueEndDate(value) {
      this.CompetitionTabrow.enddate = value;
    },
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    AddCoachData(data) {
      this.Coachtabrow.personname = data.personname;
      this.Coachtabrow.personid = data.personid;
      this.CloseCoachModal();
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    check() {
      var self = this;

      if (
        self.AthleteRoadMap.docnumber === 0 ||
        self.AthleteRoadMap.docnumber === null ||
        self.AthleteRoadMap.docnumber === undefined ||
        self.AthleteRoadMap.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleteRoadMap.docdate === 0 ||
        self.AthleteRoadMap.docdate === null ||
        self.AthleteRoadMap.docdate === undefined ||
        self.AthleteRoadMap.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleteRoadMap.sporteventid === 0 ||
        self.AthleteRoadMap.sporteventid === null ||
        self.AthleteRoadMap.sporteventid === undefined ||
        self.AthleteRoadMap.sporteventid === ""
      ) {
        this.makeToast(
          this.$t("sporteventNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleteRoadMap.sporttypeclassifierid === 0 ||
        self.AthleteRoadMap.sporttypeclassifierid === null ||
        self.AthleteRoadMap.sporttypeclassifierid === undefined ||
        self.AthleteRoadMap.sporttypeclassifierid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifieridNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.AthleteRoadMap.personname === 0 ||
        self.AthleteRoadMap.personname === null ||
        self.AthleteRoadMap.personname === undefined ||
        self.AthleteRoadMap.personname === ""
      ) {
        this.makeToast(
          this.$t("personname1NotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    CloseCompetitionTableModal() {
      this.CompetitionModal = false;
      this.$nextTick(() => {
        this.CompetitionTabrow = {
          id: 0,
          ordernumber: 0,
          ownerid: 0,
          sporteventid: 0,
          sporteventname: "",
          startdate: "",
          enddate: "",
          countryid: 0,
          countryname: "",
          address: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    CloseCoachTableModal() {
      this.CoachAddModal = false;
      this.$nextTick(() => {
        this.Coachtabrow = {
          id: 0,
          ownerid: 0,
          positionid: 0,
          positionname: "",
          personid: 0,
          personname: "",
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.AthleteRoadMap.athleteroadmaptable.indexOf(item);
      this.CompetitionTabrow = Object.assign({}, item);
      this.CompetitionModal = true;
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    EditItemCoach(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 =
        this.AthleteRoadMap.athleteroadmapcoachtable.indexOf(item);
      this.Coachtabrow = Object.assign({}, item);
      this.CoachAddModal = true;
    },
    DeleteCoachItem(item) {
      item;
      item.Status = 3;
    },
    AddCompetitionTable() {
      var self = this;
      // if (
      //   self.CompetitionTabrow.ordernumber === null ||
      //   self.CompetitionTabrow.ordernumber === undefined ||
      //   self.CompetitionTabrow.ordernumber === 0 ||
      //   self.CompetitionTabrow.ordernumber === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("ordernumberNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.CompetitionTabrow.sporteventid === null ||
        self.CompetitionTabrow.sporteventid === undefined ||
        self.CompetitionTabrow.sporteventid === 0 ||
        self.CompetitionTabrow.sporteventid === ""
      ) {
        self.$makeToast(
          self.$t("sporteventidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CompetitionTabrow.startdate === null ||
        self.CompetitionTabrow.startdate === undefined ||
        self.CompetitionTabrow.startdate === 0 ||
        self.CompetitionTabrow.startdate === ""
      ) {
        self.$makeToast(
          self.$t("astartdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CompetitionTabrow.enddate === null ||
        self.CompetitionTabrow.enddate === undefined ||
        self.CompetitionTabrow.enddate === 0 ||
        self.CompetitionTabrow.enddate === ""
      ) {
        self.$makeToast(
          self.$t("aenddateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CompetitionTabrow.countryid === null ||
        self.CompetitionTabrow.countryid === undefined ||
        self.CompetitionTabrow.countryid === 0 ||
        self.CompetitionTabrow.countryid === ""
      ) {
        self.$makeToast(
          self.$t("countryNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CompetitionTabrow.address === null ||
        self.CompetitionTabrow.address === undefined ||
        self.CompetitionTabrow.address === 0 ||
        self.CompetitionTabrow.address === ""
      ) {
        self.$makeToast(
          self.$t("addressNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.CompetitionTabrow.sporteventid) {
        self.CompetitionTabrow.sporteventname = self.sporteventlist.filter(
          (item) => item.id === self.CompetitionTabrow.sporteventid
        )[0].name;
      }
      if (!!self.CompetitionTabrow.countryid) {
        self.CompetitionTabrow.countryname = self.countrylist.filter(
          (item) => item.id === self.CompetitionTabrow.countryid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.AthleteRoadMap.athleteroadmaptable[self.editedIndex],
          self.CompetitionTabrow
        );
      } else {
        self.AthleteRoadMap.athleteroadmaptable.push(self.CompetitionTabrow);
      }
      self.CompetitionTabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        highereduclassifierid: 0,
        highereduclassifiername: "",
        // iscoach: false,
        Status: 1,
      };
      this.CompetitionModal = false;
    },
    changeSportGroup() {
      if (!!this.AthleteRoadMap.sportgroupid) {
        this.sporttypeclassifierid = this.sportgrouplist.filter(
          (item) => item.id === this.AthleteRoadMap.sportgroupid
        )[0].sporttypeclassifierid;
      }
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddCoachTable() {
      var self = this;
      if (
        self.Coachtabrow.personid === null ||
        self.Coachtabrow.personid === undefined ||
        self.Coachtabrow.personid === 0 ||
        self.Coachtabrow.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.Coachtabrow.positionid === null ||
        self.Coachtabrow.positionid === undefined ||
        self.Coachtabrow.positionid === 0 ||
        self.Coachtabrow.positionid === ""
      ) {
        self.$makeToast(
          self.$t("positionNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      //   if (
      //     self.Coachtabrow.highereduclassifierid === null ||
      //     self.Coachtabrow.highereduclassifierid === undefined ||
      //     self.Coachtabrow.highereduclassifierid === 0 ||
      //     self.Coachtabrow.highereduclassifierid === ""
      //   ) {
      //     self.$makeToast(
      //       self.$t("highereduclassifierNotSelected"),
      //       self.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      //   var dublicate = false;
      //   self.AthleteRoadMap.athleteroadmapcoachtable.forEach(function (item) {
      //     if (
      //       item.Status !== 3 &&
      //       item.personid === self.Coachtabrow.personid &&
      //       self.Coachtabrow.Status != 2
      //     ) {
      //       dublicate = true;
      //     }
      //   });
      //   if (dublicate) {
      //     this.makeToast(
      //       this.$t("Dublicate") + ": " + self.Coachtabrow.personname,
      //       this.$t("Error"),
      //       "danger"
      //     );
      //     return false;
      //   }
      if (!!self.Coachtabrow.positionid) {
        self.Coachtabrow.positionname = self.positionlist.filter(
          (item) => item.id === self.Coachtabrow.positionid
        )[0].name;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.AthleteRoadMap.athleteroadmapcoachtable[self.editedIndex1],
          self.Coachtabrow
        );
      } else {
        self.AthleteRoadMap.athleteroadmapcoachtable.push(self.Coachtabrow);
      }
      self.Coachtabrow = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      };
      this.CoachAddModal = false;
    },
    OpenCoachAddModal() {
      this.CoachAddModal = true;
      this.Coachtabrow = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        personid: 0,
        personname: "",
        Status: 1,
      };
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      self.SaveLoading = true;
      self.issavedisabled = true;
      AthleteRoadMapService.Update(self.AthleteRoadMap)
        .then((res) => {
          self.SaveLoading = false;
          self.issavedisabled = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "AthleteRoadMap" });
        })
        .catch((error) => {
          self.SaveLoading = false;
           self.issavedisabled = false;
          self.$makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
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

<style lang="scss" scoped>
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
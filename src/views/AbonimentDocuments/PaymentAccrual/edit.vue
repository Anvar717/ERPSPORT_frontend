<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("PaymentAccrual") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol lg="3" md="3" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <div class="form-group form-row">
                    <label>{{ $t("docnumber") }}</label>
                    <CInput
                      :placeholder="$t('docnumber')"
                      autocomplete="docnumber"
                      horizontal
                      style="width: 100%"
                      disabled
                      v-model="PaymentAccrual.docnumber"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="3" md="3" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label>{{ $t("docdate") }}</label>
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="PaymentAccrual.docdate"
                      style="width: 100%"
                      size="sm"
                      :disabled="!filldisabled"
                      lang="ru"
                      :placeholder="$t('docdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </date-picker>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <div class="form-group form-row">
                  <label>{{ $t("Year") }}</label>
                  <b-form-input
                    type="number"
                    style="width: 100%"
                    class="mr-2"
                    :disabled="!filldisabled"
                    :placeholder="$t('Year')"
                    v-model="PaymentAccrual.Year"
                  >
                  </b-form-input>
                </div>
              </CCol>
              <CCol sm="3">
                <div class="form-group form-row">
                  <label>{{ $t("Month") }}</label>
                  <v-select
                    :options="MonthList"
                    style="width: 100%"
                    class="mr-2 fname-select"
                    :disabled="!filldisabled"
                    :reduce="(item) => item.id"
                    :placeholder="$t('docmonth')"
                    v-model="PaymentAccrual.Month"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol lg="3" md="3" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="servicepocket"
                  rules="required"
                >
                  <label for>{{ $t("servicepocket") }}</label>
                  <v-select
                    :options="ServicePocketList"
                    :disabled="!filldisabled"
                    v-model="PaymentAccrual.servicepocketid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <!-- <CCol lg="3" md="3" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="circlesporttype"
                  rules="required"
                >
                  <label for>{{ $t("circlesporttype") }}</label>
                  <v-select
                    :options="CircleSportTypeList"
                    :disabled="!filldisabled"
                    v-model="PaymentAccrual.circlesporttypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol> -->
              <CCol lg="3" md="3" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="sporttypeclassifier"
                  rules="required"
                >
                  <label for>{{ $t("sporttypeclassifier") }}</label>
                  <v-select
                    :options="sporttypeclassifierlist"
                    :disabled="!filldisabled"
                    v-model="PaymentAccrual.sporttypeclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("PaymentAccrual") }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("personmember")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    disabled
                    :placeholder="$t('personmember')"
                    v-model="tabrow.personmembername"
                  ></CInput>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenPersonMemberModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("bamamount")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    :placeholder="$t('bamamount')"
                    v-model="tabrow.bamamount"
                  ></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("priceamount")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    :placeholder="$t('priceamount')"
                    v-model="tabrow.priceamount"
                  ></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("recalculatedamount")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    :placeholder="$t('recalculatedamount')"
                    v-model="tabrow.recalculatedamount"
                  ></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("coachaccompanied")
                }}</label>
                <b-form-checkbox
                  v-model="tabrow.iscoachattached"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("severalchildren")
                }}</label>
                <b-form-checkbox
                  v-model="tabrow.isseveralchildren"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>
        <!-- <template v-slot:cell(isappointment)="{ item }">
          <p class="m-0">
            {{
              item.isappointmentid === 1
                ? "Тайинлов/Назначение"
                : "Озод этиш/Отстранение"
            }}
          </p>
        </template>
        <template v-slot:cell(iscoachattached)="{ item }">
          <p class="m-0">
            {{ item.iscoachattached === true ? $t("yes") : $t("no") }}
          </p>
        </template>
        <template v-slot:cell(isseveralchildren)="{ item }">
          <p class="m-0">
            {{ item.isseveralchildren === true ? $t("yes") : $t("no") }}
          </p>
        </template> -->
        <div class="table-container" style="padding: 5px">
          <div class="mobileStyle">
            <table class="table table-bordered table-striped">
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
                    {{ $t("personmembername") }}
                  </th>
                  <th
                    style="text-align: center; vertical-align: middle"
                    rowspan="2"
                  >
                    {{ $t("priceamount") }}
                  </th>
                  <th
                    style="text-align: center; vertical-align: middle"
                    rowspan="2"
                  >
                    {{ $t("recalculatedamount") }}
                  </th>
                  <th
                    style="text-align: center; vertical-align: middle"
                    rowspan="2"
                  >
                    {{ $t("coachaccompanied") }}
                  </th>
                  <th
                    style="text-align: center; vertical-align: middle"
                    rowspan="2"
                  >
                    {{ $t("isseveralchildren") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in PaymentAccrual.Tables"
                  :class="i == index ? 'success' : ''"
                  style="text-align: center; vertical-align: middle"
                  :key="i"
                >
                  <td>{{ i + 1 }}</td>
                  <!-- <td> {{ item.isappointmentid === 1? "Тайинлов/Назначение": "Озод этиш/Отстранение"}}</td> -->
                  <td class="text-left">{{ item.personmembername }}</td>
                  <td>{{ item.priceamount | currency }}</td>
                  <td>{{ item.recalculatedamount | currency }}</td>
                  <td>{{ item.iscoachattached === true ? $t("yes") : $t("no")}}</td>
                  <td>{{ item.isseveralchildren === true ? $t("yes") : $t("no") }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr
                  style="
                    text-align: center;
                    vertical-align: middle;
                    font-weight: bold;
                  "
                >
                  <td colspan="1">{{ $t("Total") }}</td>
                  <td></td>
                  <!-- <td style="white-space: nowrap">
                    {{
                      bottomrow.personmembername == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.personmembername,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td> -->
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.priceamount == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.priceamount, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.recalculatedamount == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.recalculatedamount,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td>
                  <td></td>
                  <td></td>
                  <!-- <td style="white-space: nowrap">
                    {{
                      bottomrow.iscoachattached == 0
                        ? "-"
                        : $options.filters.currency(bottomrow.iscoachattached, {
                            symbol: "",
                            fractionCount: 0,
                          })
                    }}
                  </td>
                  <td style="white-space: nowrap">
                    {{
                      bottomrow.isseveralchildren == 0
                        ? "-"
                        : $options.filters.currency(
                            bottomrow.isseveralchildren,
                            {
                              symbol: "",
                              fractionCount: 0,
                            }
                          )
                    }}
                  </td> -->
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- <CRow>
          <CCol>
            <CRow>
              <CCol>
                <div class="mobileStyle mx-3">
                  <b-table
                    :fields="Fields"
                    :items="PaymentAccrual.Tables"
                    class="bg-color-table text-center"
                    style="vertical-align: middle"
                    bordered
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:cell(isappointment)="{ item }">
                      <p class="m-0">
                        {{
                          item.isappointmentid === 1
                            ? "Тайинлов/Назначение"
                            : "Озод этиш/Отстранение"
                        }}
                      </p>
                    </template>
                    <template v-slot:cell(bamamount)="{ item }">
                      <span class="font-weight-bold">{{
                        $options.filters.currency(item.bamamount, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}</span>
                    </template>
                    <template v-slot:cell(ordernumber)="{ index }">
                    <span style="white-space: nowrap">
                      {{ index + 1 }}
                    </span>
                  </template>
                    <template v-slot:cell(priceamount)="{ item }">
                      <span class="font-weight-bold">{{
                        $options.filters.currency(item.priceamount, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}</span>
                    </template>
                    <template v-slot:cell(recalculatedamount)="{ item }">
                      <span class="font-weight-bold">{{
                        $options.filters.currency(item.recalculatedamount, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}</span>
                    </template>
                    <template v-slot:cell(iscoachattached)="{ item }">
                      <p class="m-0">
                        {{ item.iscoachattached === true ? $t("yes") : $t("no") }}
                      </p>
                    </template>
                    <template v-slot:cell(isseveralchildren)="{ item }">
                      <p class="m-0">
                        {{
                          item.isseveralchildren === true ? $t("yes") : $t("no")
                        }}
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
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow> -->
        <CRow class="mt-3">
          <CCol>
            <div class="text-left">
              <CButton class="ml-3" size="sm" color="danger" @click="Back()">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-3" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <b-modal
        id="modalmember"
        no-close-on-backdrop
        size="xl"
        :title="$t('PersonMember')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <Person-Component
          :isview="false"
          @SelectedItem="SelectedPersonMemberItem"
          @DblClick="AddPersonMemberData"
        ></Person-Component>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="ClosePersonMemberModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button
              variant="primary"
              @click="AddPersonMemberData(personvalue1)"
            >
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import PaymentAccrualService from "@/services/PaymentAccrual.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
//import PaymentAccrualTypeService from "@/services/PaymentAccrualType.service";
import PersonMemberService from "@/services/PersonMember.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import ServicePocketService from "@/services/ServicePocket.service";
import MemberComponent from "@/components/MemberList";
import PersonComponent from "@/components/PersonMember";
export default {
  components: { EmployeeListComponent, MemberComponent, PersonComponent },
  data() {
    return {
      SaveLoading: false,
      PaymentAccrual: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      OblastList: [],
      selectedrowid: 0,
      personvalue1: {},
      SchoolYear: [],
      SchoolGradeList: [],
      fileLoading: false,
      DownloadLoading: false,
      personvalue: {},
      schoolgradeletterlist: [],
      ServicePocketList: [],
      PaymentAccrualList: [],
      SportGroupCategoryTypeList: [],
      DeleteLoading: false,
      PaymentAccrualTypeList: [],
      CircleSportTypeList: [],
      sporttypeclassifierlist: [],
      FillLoading: false,
      MonthList: [
        { id: 1, code: "01", name: this.$t("Yanvar") },
        { id: 2, code: "02", name: this.$t("Fevral") },
        { id: 3, code: "03", name: this.$t("Mart") },
        { id: 4, code: "04", name: this.$t("Aprel") },
        { id: 5, code: "05", name: this.$t("May") },
        { id: 6, code: "06", name: this.$t("Iyun") },
        { id: 7, code: "07", name: this.$t("Iyul") },
        { id: 8, code: "08", name: this.$t("Avgust") },
        { id: 9, code: "09", name: this.$t("Sentabr") },
        { id: 10, code: "1", name: this.$t("Oktabr") },
        { id: 11, code: "11", name: this.$t("Noyabr") },
        { id: 12, code: "12", name: this.$t("Dekabr") },
        // { id : 4,name : this.$t('inn') }
      ],
      monthdata: {
        month: "",
        year: "",
        day: "01",
        code: "",
      },
      bottomrow: {
        personmembername: 0,
        priceamount: 0,
        recalculatedamount: 0,
        iscoachattached: 0,
        isseveralchildren: 0,
      },
      OrganizationList: [],
      PersonMemberList: [],
      employeelist: [],
      Tables: [],
      lang: "",
      Fields: [
        {
          key: "ordernumber",
          label: this.$t("OrderNumber"),
          class: "text-center",
        },
        {
          key: "personmembername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("personmember"),
        },
        {
          key: "priceamount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("priceamount"),
        },
        {
          key: "recalculatedamount",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("recalculatedamount"),
        },
        {
          key: "iscoachattached",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("coachaccompanied"),
        },
        {
          key: "isseveralchildren",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("severalchildren"),
        },
        // {
        //   key: "actions",
        //   tdClass: "text-center",
        //   thClass: "text-center",
        //   label: this.$t("actions"),
        // },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        personmemberid: 0,
        personmembername: "",
        iscoachattached: false,
        isseveralchildren: false,
        bamamount: 0,
        priceamount: 0,
        recalculatedamount: 0,
        Status: 1,
      },
      filldisabled: false,
      editedIndex: -1,
      ClearLoading: false,
      isDisabled: false,
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    PaymentAccrualService.Get(self.selectedrowid).then((res) => {
      self.PaymentAccrual = res.data;
      this.calculateTotal(this.PaymentAccrual.Tables);
      this.CheckDisabled();
      if (self.$route.params.id == 0) {
        self.PaymentAccrual.Year = null;
      }
    });
    ServicePocketService.GetAll().then((res) => {
      self.ServicePocketList = res.data;
    });
    PersonMemberService.GetAll().then((res) => {
      self.PersonMemberList = res.data;
    });
    CircleSportTypeService.GetAll().then((res) => {
      self.CircleSportTypeList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
  },
  methods: {
    OpenPersonMemberModal() {
      this.$bvModal.show("modalmember");
    },
    ClosePersonMemberModal() {
      this.$bvModal.hide("modalmember");
    },
    ClearTable() {
      var self = this;
      self.ClearLoading = true;
      self.PaymentAccrual.Tables.forEach(function (item) {
        item.Status = 3;
        self.ClearLoading = false;
      });
      self.CheckDisabled();
    },
    FillTable() {
      this.FillLoading = true;
      if (
        this.PaymentAccrual.Tables.filter((item) => item.Status != 3).length ===
        0
      ) {
        PaymentAccrualService.FillPaymentAccrual(this.PaymentAccrual)
          .then((res) => {
            this.PaymentAccrual = res.data.result;
            this.FillLoading = false;
            this.CheckDisabled();
            this.makeToast(
              this.$t("FillSuccess"),
              this.$t("message"),
              "success"
            );
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
        this.FillLoading = false;
      } else {
        this.FillLoading = false;
        this.makeToast(
          this.$t("FillUsedBeforeSuccess"),
          this.$t("message"),
          "danger"
        );
      }
    },
    AddPersonMemberData(data) {
      var self = this;
      self.tabrow.personmemberid = data.id;
      self.tabrow.personmembername = data.fullname;
      self.ClosePersonMemberModal();
    },
    SelectedPersonMemberItem(data) {
      this.personvalue1 = data;
    },
    ChangePersonMember() {
      this.tabrow.personmembername = this.PersonMemberList.filter(
        (item) => this.tabrow.personmemberid === item.id
      )[0].name;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({
        name: "PaymentAccrual",
        query: {
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },
    calculateTotal(item) {
      var personmembername = 0;
      var priceamount = 0;
      var recalculatedamount = 0;
      var iscoachattached = 0;
      var isseveralchildren = 0;
      item.forEach(function (item) {
        personmembername = personmembername + item.personmembername;
        priceamount = priceamount + item.priceamount;
        recalculatedamount = recalculatedamount + item.recalculatedamount;
        iscoachattached = iscoachattached + item.iscoachattached;
        isseveralchildren = isseveralchildren + item.isseveralchildren;
      });
      this.bottomrow = {
        personmembername: personmembername,
        priceamount: priceamount,
        recalculatedamount: recalculatedamount,
        iscoachattached: iscoachattached,
        isseveralchildren: isseveralchildren,
      };
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
    Add() {
      var self = this;
      self.tabrow;
      if (
        self.tabrow.personmemberid === "" ||
        self.tabrow.personmemberid === undefined ||
        self.tabrow.personmemberid === null ||
        self.tabrow.personmemberid === 0
      ) {
        self.makeToast(
          self.$t("personmemberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.bamamount === "" ||
        self.tabrow.bamamount === undefined ||
        self.tabrow.bamamount === null ||
        self.tabrow.bamamount === 0
      ) {
        self.makeToast(
          self.$t("bamamountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.priceamount === "" ||
        self.tabrow.priceamount === undefined ||
        self.tabrow.priceamount === null ||
        self.tabrow.priceamount === 0
      ) {
        self.makeToast(
          self.$t("priceamountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.recalculatedamount === "" ||
        self.tabrow.recalculatedamount === undefined ||
        self.tabrow.recalculatedamount === null ||
        self.tabrow.recalculatedamount === 0
      ) {
        self.makeToast(
          self.$t("recalculatedamountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.PaymentAccrual.Tables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        personmemberid: 0,
        personmembername: "",
        iscoachattached: false,
        isseveralchildren: false,
        bamamount: 0,
        priceamount: 0,
        recalculatedamount: 0,
        Status: 1,
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    OpenModal() {
      var self = this;
      if (!self.checkData()) {
        return false;
      }
      self.$bvModal.show("AddModal");
    },

    EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.PaymentAccrual.Tables[this.editedIndex],
          this.tabrow
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          docnumber: "",
          docdate: "",
          personmemberid: 0,
          nextmedicalcheckdate: "",
          personmembername: "",
          PaymentAccrualid: 0,
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    CheckDisabled() {
      var self = this;
      if (
        self.PaymentAccrual.Tables.filter((item) => item.Status != 3).length > 0
      ) {
        this.filldisabled = false;
      } else {
        this.filldisabled = true;
      }
    },
    check() {
      var self = this;
      if (
        self.PaymentAccrual.docnumber === 0 ||
        self.PaymentAccrual.docnumber === null ||
        self.PaymentAccrual.docnumber === undefined ||
        self.PaymentAccrual.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentAccrual.docdate === 0 ||
        self.PaymentAccrual.docdate === null ||
        self.PaymentAccrual.docdate === undefined ||
        self.PaymentAccrual.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentAccrual.servicepocketid === 0 ||
        self.PaymentAccrual.servicepocketid === null ||
        self.PaymentAccrual.servicepocketid === undefined ||
        self.PaymentAccrual.servicepocketid === ""
      ) {
        this.makeToast(
          this.$t("servicepocketNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentAccrual.sporttypeclassifierid === 0 ||
        self.PaymentAccrual.sporttypeclassifierid === null ||
        self.PaymentAccrual.sporttypeclassifierid === undefined ||
        self.PaymentAccrual.sporttypeclassifierid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifieridNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentAccrual.Year === 0 ||
        self.PaymentAccrual.Year === null ||
        self.PaymentAccrual.Year === undefined ||
        self.PaymentAccrual.Year === ""
      ) {
        this.makeToast(this.$t("YearNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.PaymentAccrual.Month === 0 ||
        self.PaymentAccrual.Month === null ||
        self.PaymentAccrual.Month === undefined ||
        self.PaymentAccrual.Month === ""
      ) {
        this.makeToast(this.$t("monthNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      // if (self.PaymentAccrual.Tables.length === 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }

      return true;
    },
    checkData() {
      var self = this;
      if (
        self.PaymentAccrual.docnumber === 0 ||
        self.PaymentAccrual.docnumber === null ||
        self.PaymentAccrual.docnumber === undefined ||
        self.PaymentAccrual.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.PaymentAccrual.docdate === 0 ||
        self.PaymentAccrual.docdate === null ||
        self.PaymentAccrual.docdate === undefined ||
        self.PaymentAccrual.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      PaymentAccrualService.Update(self.PaymentAccrual)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "PaymentAccrual",
            query: {
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
          });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style>
</style>






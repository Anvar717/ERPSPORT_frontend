<template>
  <b-container fluid>
    <CRow class="form-group mt-2">
      <CCol lg="12" md="12" sm="12" class="text-left mt-2">
        <b-row>
          <b-col class="mr-2 achievement-input" sm="12" lg="3">
            <b-form-input
              class="mr-2"
              :placeholder="$t('personmember')"
              v-model="filter.personmembername"
            ></b-form-input>
          </b-col>
          <b-col class="mr-2 achievement-input" sm="12" lg="2">
            <b-form-input
              class="mr-2"
              :placeholder="$t('personmembershipnumber')"
              v-model="filter.personmembershipnumber"
            ></b-form-input>
          </b-col>
          <b-col class="mr-2 achievement-input" sm="12" lg="3">
            <v-select
              :options="ServicePocketList"
              :reduce="(item) => item.id"
              :placeholder="$t('servicepocket')"
              label="name"
              class="fname-select"
              v-model="filter.servicepocketid"
            ></v-select>
          </b-col>
          <b-col class="mr-2 achievement-input" sm="12" lg="3">
            <div class="d-flex">
              <v-select
                class="mr-2 fname-select"
                :options="CircleSportTypeList"
                v-model="filter.circlesporttypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('circlesporttype')"
                label="name"
                style="width: 100%;"
              >
              </v-select>
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height: 35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </div>
          </b-col>
        </b-row>
      </CCol>
    </CRow>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="PaymentAccrualList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border: 1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <!-- <vs-th sort-key="id">
              {{ $t("id") }}
            </vs-th> -->
            <!-- <vs-th sort-key="inn" v-if="persontypeid == 2">
              {{ $t("inn") }}
            </vs-th> -->
            <vs-th sort-key="personmembername">
              {{ $t("personmember") }}
            </vs-th>
            <vs-th sort-key="personmembershipnumber">
              {{ $t("personmembershipnumber") }}
            </vs-th>
            <vs-th sort-key="circlesporttypename">
              {{ $t("circlesporttype") }}
            </vs-th>
            <vs-th sort-key="servicepocketname">
              {{ $t("servicepocket") }}
            </vs-th>
            <vs-th sort-key="paymentamount">
              {{ $t("paymentamount") }}
            </vs-th>
            <vs-th sort-key="membershipamount">
              {{ $t("membershipamount") }}
            </vs-th>
            <vs-th sort-key="paidamount">
              {{ $t("paidamount") }}
            </vs-th>
            <vs-th sort-key="paymentaccrualamount">
              {{ $t("paymentaccrualamount") }}
            </vs-th>
            <vs-th sort-key="balanceamount">
              {{ $t("balanceamount") }}
            </vs-th>
            <!-- <vs-th sort-key="unpaidamount">
              {{ $t("unpaidamount") }}
            </vs-th> -->
          </template>
          <template
            slot-scope="{ data }"
            style="overflow-y: scroll; height: 400px"
          >
            <vs-tr v-if="Loading" class="text-center">
              <vs-td colspan="10"
                ><b-spinner variant="primary"></b-spinner
              ></vs-td>
            </vs-tr>
            <vs-tr
              :data="tr"
              :key="indextr"
              v-for="(tr, indextr) in data"
              v-show="!Loading"
              @dblclick.native="$emit('DblClick', tr)"
            >
              <vs-td :data="data[indextr].personmembername">
                {{ data[indextr].personmembername }}
              </vs-td>
              <vs-td :data="data[indextr].personmembershipnumber">
                {{ data[indextr].personmembershipnumber }}
              </vs-td>
              <vs-td :data="data[indextr].circlesporttypename">
                {{ data[indextr].circlesporttypename }}
              </vs-td>
              <vs-td :data="data[indextr].servicepocketname">
                {{ data[indextr].servicepocketname }}
              </vs-td>

              <vs-td :data="data[indextr].paymentamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(data[indextr].paymentamount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}</span>
              </vs-td>
              <vs-td :data="data[indextr].membershipamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(data[indextr].membershipamount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}</span>
              </vs-td>
              <vs-td :data="data[indextr].paidamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(data[indextr].paidamount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}</span>
              </vs-td>
              <vs-td :data="data[indextr].paymentaccrualamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(
                    data[indextr].paymentaccrualamount,
                    {
                      symbol: "",
                      fractionCount: 2,
                    }
                  )
                }}</span>
              </vs-td>

              <vs-td :data="data[indextr].balanceamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(data[indextr].balanceamount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}</span>
              </vs-td>
              <!-- <vs-td :data="data[indextr].unpaidamount">
                <span class="font-weight-bold">{{
                  $options.filters.currency(data[indextr].unpaidamount, {
                    symbol: "",
                    fractionCount: 2,
                  })
                }}</span>
              </vs-td> -->
            </vs-tr>
          </template>
        </vs-table>
        <div class="my-3 personList-pagination justify-content-between d-flex align-items-center">
          <div style="white-space: nowrap" class="col-sm-6">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="PageLimitSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float: left; font-size: 12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
          </div>
          <b-pagination
            class="text-right mobile-paginationx"
            v-model="filter.PageNumber"
            :total-rows="totalRows"
            :per-page="filter.PageLimit"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditPersonComponent from "@/components/EditPersonMember";
import CircleSportTypeService from "@/services/CircleSportType.service";
import ServicePocketService from "@/services/ServicePocket.service";
import PaymentAccrualService from "@/services/PaymentAccrual.service";

export default {
  components: { EditPersonComponent },
  props: {
    ondate: {
      type: String,
      default: '10.10.2022',
    },
  },
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        PageNumber: 1,
        personmembername: "",
        personmembershipnumber: "",
        servicepocketid: 0,
        circlesporttypeid: 0,
      },
      PaymentAccrualList: [],
      DocSeriesList: [],
      DocumentTypeList: [],
      MemberShipTypeList: [],
      CircleSportTypeList: [],
      SportGroupCategoryTypeList: [],
      ServicePocketList: [],
      selected: [],
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    ServicePocketService.GetAll().then((res) => {
      this.ServicePocketList = res.data;
    });
    CircleSportTypeService.GetAll().then((res) => {
      this.CircleSportTypeList = res.data;
    });
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
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
    Refresh() {
      this.Loading = true;
      PaymentAccrualService.GetNotPaidPaymentAccrualList(
        this.ondate,
        this.filter.personmembername,
        this.filter.personmembershipnumber,
        this.filter.servicepocketid,
        this.filter.circlesporttypeid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.PaymentAccrualList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
      // console.log(this.selected)
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>

<style>
.vs-pagination--ul {
  margin-bottom: 0;
}
</style>

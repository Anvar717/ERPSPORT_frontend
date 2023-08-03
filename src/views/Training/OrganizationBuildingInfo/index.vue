<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("OrganizationBuildingInfo") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol class="d-flex mt-2">
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="changeOblast"
              ></v-select>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="changeRegion"
              ></v-select>
              <v-select
                :options="OrganizationList"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                style="width: 100%"
                class="mr-2"
              ></v-select>
              <v-select
                style="width: 100%"
                class="mr-2"
                :options="CircleSportTypeList"
                v-model="filter.circlesporttypeid"
                :reduce="(item) => item.id"
                :placeholder="$t('circlesporttype')"
                label="name"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="4" sm="11" class="text-left mt-2">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
            <CCol lg="2" md="6" sm="12" class="text-lg-right mt-2">
              <CButton
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton>
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
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
            :current-page="filter.PageNumber"
            @row-dblclicked="Edit"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
            
            hover
          >
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon
                  v-if="filter.SortColumn === 'code'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(name)>
              <div
                class="text-center"
                style="cursor: pointer"
                @click="ChangeSort('name')"
              >
                {{ $t("name") }}
                <b-icon
                  v-if="filter.SortColumn === 'name'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>

            <template v-slot:cell(statename)="{ item }">
              <CBadge :color="getItemColor(item.statename)">{{
                item.statename
              }}</CBadge>
            </template>
            <template v-slot:cell(internetconnection)="{ item }">
              <div v-if="lang == 'ru'">
                <b-badge :variant="getItemColor(item.internetconnection)">{{
                  item.internetconnection ? "Да" : "Нет"
                }}</b-badge>
              </div>
              <div v-if="lang == 'uz_latn'">
                <b-badge :variant="getItemColor(item.internetconnection)">{{
                  item.internetconnection ? "Ha" : "Yoq"
                }}</b-badge>
              </div>
              <div v-if="lang == 'uz_cyrl'">
                <b-badge :variant="getItemColor(item.internetconnection)">{{
                  item.internetconnection ? "Ҳа" : "Йўқ"
                }}</b-badge>
              </div>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <!-- v-if="$can('OrganizationBuildingInfoEdit', 'permissions')" -->
                <b-link
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
              </div>
              <b-modal :id="'DeleteModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('DeleteModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton
                    v-if="$can('OrganizationBuildingInfoDelete', 'permissions')"
                    @click="Delete(item)"
                    color="success"
                  >
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Accept") }}
                  </CButton>
                </div>
              </b-modal>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2 mt-5"
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
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
            <div style="float: right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0 mobile-pagination"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
    
    <script>
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import HelperService from "@/services/helper.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          style: "width:10%",
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        {
          key: "shortname",
          label: this.$t("shortname"),
          sortable: false,
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          sortable: false,
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          sortable: false,
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("Organization"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "sportfacilitytypename",
          label: this.$t("SportFacilityType"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("circlesporttype"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "subscriptioncapacity",
          label: this.$t("subscriptioncapacity"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "internetconnection",
          label: this.$t("internetconnection"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "tourniquetcount",
          label: this.$t("tourniquetcount"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "latitude",
          label: this.$t("latitude"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "longitude",
          label: this.$t("longitude"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "internetconnectiontype",
          label: this.$t("internetconnectiontype"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "respersonname",
          label: this.$t("respersonname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "respersonpositionname",
          label: this.$t("respersonpositionname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "respersoncontactinfo",
          label: this.$t("respersoncontactinfo"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "statename",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      lang: "",
      isBusy: true,
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      CircleSportTypeList: [],
      filter: {
        oblastid: "",
        regionid: "",
        organizationid: "",
        circlesporttypeid: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
    HelperService.GetOblastList().then((res) => {
      this.OblastList = res.data;
    });
    this.Refresh();
      CircleSportTypeService.GetAll().then((res) => {
      this.CircleSportTypeList = res.data;
    });
    this.lang = localStorage.getItem("locale") || "ru";
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
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Aktiv"
        ? "success"
        : text === "Passiv"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditOrganizationBuildingInfo",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditOrganizationBuildingInfo",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      OrganizationBuildingInfoService.Delete(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      OrganizationBuildingInfoService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.circlesporttypeid,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
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
    changeOblast() {
      RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
        this.RegionList = res.data;
      });
    },
    changeRegion() {
      OrganizationService.GetAll(this.filter.oblastid, this.filter.regionid, "", "", "").then((res) => {
        this.OrganizationList = res.data;
      });
    },
    ChangeSort(columnName) {
      this.filter.Sort = columnName;
      if (this.filter.order == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.order = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.order = "asc";
      }
      this.Refresh();
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
  },
};
</script>
    
    <style></style>
    
<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("MfyState") }}</h3>
        <CCardHeader>
          <CRow class="form-group ">
            <CCol lg="2" md="5" sm="4" class="text-left mt-2">
              <div>
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :options="OblastList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.oblastid"
                  @input="ChangeOblast"
                ></v-select>
              </div>
            </CCol>
            <CCol lg="2" md="5" sm="11" class="text-left mt-2">
              <div style="width : 100%">
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.regionid"
                ></v-select>
              </div>
            </CCol>
            <CCol lg="4" md="4" sm="11" class="text-left mt-3">
              <label for=""></label>
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="2" md="6" sm="12" class="text-lg-right" style="margin-right: -7px; margin-top: 40px;">
              <CButton
                v-if="$can('MfyStateEdit', 'permissions')"
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
            style="white-space: nowrap"
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
          >
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(ondate)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('ondate')"
              >
                {{ $t("ondate") }}
                <b-icon
                  v-if="filter.SortColumn === 'ondate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(oblast)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('oblast')"
              >
                {{ $t("oblast") }}
                <b-icon
                  v-if="filter.SortColumn === 'oblast'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(region)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('region')"
              >
                {{ $t("region") }}
                <b-icon
                  v-if="filter.SortColumn === 'region'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(mfy)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('mfy')"
              >
                {{ $t("mfy") }}
                <b-icon
                  v-if="filter.SortColumn === 'mfy'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('MfyStateEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('MfyStateDelete', 'permissions')"
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
                  <CButton @click="Delete(item)" color="success">
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
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div class="pagination-number" style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float:left" class="ml-2 mr-2 mt-n1 per-page">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="perPageSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float:left;font-size:12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
            <div style="float:right">
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
import MfyStateService from "@/services/MfyState.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
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
          key: "ondate",
          label: this.$t("ondate"),
          sortable: false,
        },
        {
          key: "oblastid",
          label: this.$t("oblastid"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "oblast",
          label: this.$t("oblast"),
          sortable: false,
           thClass: "text-center",
          tdClass: "text-left",
        },
         {
          key: "regionid",
          label: this.$t("regionid"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "region",
          label: this.$t("region"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "mfyid",
          label: this.$t("MfyId"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "mfy",
          label: this.$t("mfy"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      items: [],
      totalRows: "",
      OblastList: [],
      RegionList: [],
      mfylist: [],
      isBusy: true,
      lang : localStorage.getItem('locale') || 'ru',
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        oblastid: "",
        regionid: "",
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
      lang : localStorage.getItem('locale') || 'ru'
    };
  },
  created() {
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
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
    ChangeOblast() {
      this.filter.regionid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang,this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditMfyState",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditMfyState",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      MfyStateService.Delete(item.id)
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
      MfyStateService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.oblastid,
        this.filter.regionid,
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

<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("SchoolSubject") }}</h3>
        <CCardHeader>
          <CRow class="form-group justify-content-between">
            <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="7" md="6" sm="12" class="text-lg-right mt-2" style="margin-right: -7px;">
              <CButton
                v-if="$can('SchoolSubjectEdit', 'permissions')"
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
                <b-icon icon="arrow-left-short" ></b-icon>
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
          >
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon v-if="filter.SortColumn === 'code'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(shortname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('shortname')"
              >
                {{ $t("shortname") }}
                <b-icon v-if="filter.SortColumn === 'shortname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(fullname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('fullname')"
              >
                {{ $t("fullname") }}
                <b-icon v-if="filter.SortColumn === 'fullname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(parent)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('parent')"
              >
                {{ $t("parent") }}
                <b-icon v-if="filter.SortColumn === 'parent'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolsubjectgroup)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('schoolsubjectgroup')"
              >
                {{ $t("schoolsubjectgroup") }}
                <b-icon v-if="filter.SortColumn === 'schoolsubjectgroup'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(ischecknotebookpayment)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('ischecknotebookpayment')"
              >
                {{ $t("ischecknotebookpayment") }}
                <b-icon v-if="filter.SortColumn === 'ischecknotebookpayment'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(canbedivideed)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('canbedivideed')"
              >
                {{ $t("canbedivideed") }}
                <b-icon v-if="filter.SortColumn === 'canbedivideed'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('status')"
              >
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
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
                  v-if="$can('SchoolSubjectEdit', 'permissions')"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-link
                  v-if="$can('SchoolSubjectDelete', 'permissions')"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" ></b-icon>
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
import SchoolSubjectService from "@/services/SchoolSubject.service";
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
          key: "code",
          label: this.$t("code"),
          sortable: false,
        },
        {
          key: "shortname",
          label: this.$t("shortname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "parent",
          label: this.$t("parent"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "schoolsubjectgroup",
          label: this.$t("schoolsubjectgroup"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "ischecknotebookpayment",
          label: this.$t("ischecknotebookpayment"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "canbedivideed",
          label: this.$t("canbedivideed"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "code",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },

      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
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
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        :text === "Aktiv"
        ? "success"
        : text === "Passiv"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditSchoolSubject",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditSchoolSubject",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      SchoolSubjectService.Delete(item.id)
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
      SchoolSubjectService.GetList(
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
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
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

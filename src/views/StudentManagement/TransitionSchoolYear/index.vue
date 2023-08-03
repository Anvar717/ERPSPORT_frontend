<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("TransitionSchoolYear") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.Search"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="2" md="2" sm="1" class="text-left mt-2 pl-0">
              <v-select
                :options="schoolyearlist"
                v-model="filter.fromschoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('actionss.from')"
                label="name"
              ></v-select>
            </CCol>
            <CCol lg="2" md="2" sm="1" class="text-left mt-2 pl-0">
              <v-select
                :options="schoolyearlist"
                v-model="filter.toschoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('actionss.to')"
                label="name"
              ></v-select>
            </CCol>
            <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height:35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol>
            <CCol lg="3" md="2" sm="12" class="text-lg-right mt-2">
              <CButton
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
                v-if="$can('TransitionSchoolYearEdit','permissions')"
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
            style="white-space: nowrap; min-height : 500px"
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
              <div style="cursor : pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon v-if="filter.SortColumn === 'docnumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon v-if="filter.SortColumn === 'docdate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(fromschoolyear)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('fromschoolyear')"
              >
                {{ $t("fromschoolyear") }}
                <b-icon v-if="filter.SortColumn === 'fromschoolyear'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(toschoolyear)>
              <div style="cursor : pointer" @click="ChangeSort('toschoolyear')">
                {{ $t("toschoolyear") }}
                <b-icon v-if="filter.SortColumn === 'toschoolyear'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(fromorgschoolgrade)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('fromorgschoolgrade')"
              >
                {{ $t("fromorgschoolgrade") }}
                <b-icon v-if="filter.SortColumn === 'fromorgschoolgrade'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(toorgschoolgrade)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('toorgschoolgrade')"
              >
                {{ $t("toorgschoolgrade") }}
                <b-icon v-if="filter.SortColumn === 'toorgschoolgrade'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusname)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  @click="PushRemainStudents(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('PushRemainStudents') }"
                  v-if="item.statusname == 'Утвержден'"
                >
                  <b-icon scale="1.2" icon="file-check"></b-icon>
                </b-link>
                <b-link
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" scale="1.2"></b-icon>
                </b-link>
                <!-- <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2" ></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown> -->
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
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'CancelModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="CancelApproval(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('AcceptModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Approve(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
              </div>
            </template>
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
          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float:right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import TransitionSchoolYearService from "@/services/transitionSchoolYear.service";
import SchoolYearService from "@/services/SchoolYear.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "id",
          label: this.$t("id"),
          class : 'text-center'
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
        }, 
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
        },
        {
          key: "fromschoolyearname",
          label: this.$t("fromschoolyear"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "toschoolyearname",
          label: this.$t("toschoolyear"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          sortable: false,
          class: "text-left",
        },
        {
          key  :'errorinfo',
          label : this.$t('error'),
          sortable : false,
          class : 'text-center'
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          class: "text-left",
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        fromschoolyearid : 0,
        toschoolyearid : 0,
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },
      schoolyearlist : []
    };
  },
  created() {
    if(!!this.$route.query.Search){
      this.filter.Search = this.$route.query.Search
    }
    SchoolYearService.GetAll().then(res => {
      this.schoolyearlist = res.data;
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
    View(item){
      this.$router.push({
        name: "ViewTransitionSchoolYear",
        params: {
          id: item.id,
        },
        query : {
          isremain : false
        }
      });
    },
    PushRemainStudents(item){
      this.$router.push({
        name: "ViewTransitionSchoolYear",
        params: {
          id: item.id
        },
        query : {
          isremain : true
        }
      });
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
        name: "EditTransitionSchoolYear",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditTransitionSchoolYear",
        params: {
          id: item.id,
        },
        query : {
          Search : this.filter.Search
        }
      });
    },
    Delete(item) {
      TransitionSchoolYearService.Delete(item.id)
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
      TransitionSchoolYearService.GetList(
        this.filter.fromschoolyearid,
        this.filter.toschoolyearid,
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

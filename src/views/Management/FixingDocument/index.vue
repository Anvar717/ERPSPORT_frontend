<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("FixingDocument") }}</h3>
        <CCardHeader>
          <CRow>
            <CCol class="text-right">
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
          <CRow class="m-3 form-group">
            <CCol lg="3" md="3" sm="12" class="d-flex mt-2">
              <v-select
                    :options="FixingDocumentTypeList"
                    v-model="filter.fixingdocumenttypeid"
                    :reduce="item => item.id"
                    :placeholder="$t('fixingdocumenttype')"
                    @input="Refresh"
                    label="name"
                    style="width:100%"
                  ></v-select>
            </CCol>
             <CCol  lg="6" md="6" sm="12" class="d-flex mt-2">
                <v-select
                    :options="OblastList"
                    v-model="filter.oblastid"
                    :reduce="item => item.id"
                    :placeholder="$t('oblast')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="ChangeOblast"
                ></v-select>
                <v-select
                    :options="RegionList"
                    v-model="filter.regionid"
                    :reduce="item => item.id"
                    :placeholder="$t('region')"
                    label="name"
                    class="mr-2"
                    style="width:100%"
                    @input="ChangeRegion"
                  ></v-select>
                  <v-select
                    :options="OrganizationList"
                    v-model="filter.organizationid"
                    :reduce="item => item.id"
                    @input="Refresh"
                    :placeholder="$t('organization')"
                    label="name"
                    style="width:100%"
                    class="mr-2"
                  ></v-select>
            </CCol>
            <CCol lg="3" md="4" sm="12" class="text-left mt-1">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <!-- <CCol lg="1" md="1" sm="12" class="mt-2">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height:35px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol> -->
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
            <template v-slot:head(code)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('code')"
              >
                {{ $t("code") }}
                <b-icon
                  v-if="filter.SortColumn === 'code'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(shortname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('shortname')"
              >
                {{ $t("shortname") }}
                <b-icon
                  v-if="filter.SortColumn === 'shortname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(fullname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('fullname')"
              >
                {{ $t("fullname") }}
                <b-icon
                  v-if="filter.SortColumn === 'fullname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gradegroup)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('gradegroup')"
              >
                {{ $t("gradegroup") }}
                <b-icon
                  v-if="filter.SortColumn === 'gradegroup'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('statusname')"
              >
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'statusname'"
                  :icon="filter.SortIcon"
                ></b-icon>
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
                  v-if="$can('FixingDocumentEdit', 'permissions') && item.statusname != 'Утвержден'"
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('FixingDocumentApprove', 'permissions') && item.statusname != 'Утвержден'"
                    @click="$bvModal.show('AcceptModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Approve') }"
                >
                  <b-icon icon="check2"></b-icon>
                </b-link>
                <b-link
                  v-if="$can('FixingDocumentDelete', 'permissions') && item.statusname != 'Утвержден'"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
              </div>
               <b-modal :id="'AcceptModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('AcceptModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Approve(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
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
            <div style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="perPageSelect"
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
import FixingDocumentService from "@/services/FixingDocument.service";
import OblastService from '@/services/Oblast.service';
import RegionService from '@/services/Region.service';
import OrganizationService from '@/services/organization.service';
import HelperService from "@/services/helper.service";
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
          key: "documenttypename",
          label: this.$t("documenttype"),
           class: "text-center",
          sortable: false,
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "documentid",
          label: this.$t("DocumentID"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "personid",
          label: this.$t("PersonId"),
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false,
        },
      ],
      items: [],
      OblastList:[],
      RegionList:[],
      FixingDocumentTypeList:[],
      OrganizationList:[],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        oblastid:0,
        regionid:0,
        organizationid:0,
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
     OblastService.GetAll().then(res => {
        this.OblastList = res.data
    })
    HelperService.GetFixingDocumentTypeList().then((res) => {
      this.FixingDocumentTypeList = res.data;
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
        name: "EditFixingDocument",
        params: {
          id: 0,
        },
      });
    },
    ChangeOblast(){
        if(!!this.filter.oblastid){
            RegionService.GetAll(this.lang,this.filter.oblastid).then(res => {
                this.RegionList = res.data
            })
            this.Refresh()
        }
    },
    ChangeRegion(){
        if(!!this.filter.regionid){
            OrganizationService.GetAll(this.filter.oblastid,this.filter.regionid,false).then(res => {
                this.OrganizationList = res.data
            })
            this.Refresh()
        }
    },
    Edit(item) {
      this.$router.push({
        name: "EditFixingDocument",
        params: {
          id: item.id,
        },
      });
    },
    Approve(item) {
      var self = this;
      FixingDocumentService.Approve(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("AcceptMessage"),
            self.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    Delete(item) {
      FixingDocumentService.Delete(item.id)
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
      FixingDocumentService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.fixingdocumenttypeid,
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

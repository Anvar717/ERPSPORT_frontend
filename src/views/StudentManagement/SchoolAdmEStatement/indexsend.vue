<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("SchoolAdmEStatementSend") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
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
            <CCol lg="7" md="1" sm="1" class="text-lg-right mt-0">
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
            style="height:600px"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-dblclicked="Preview"
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
            <template v-slot:head(organizationname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('organizationname')"
              >
                {{ $t("organizationname") }}
                <b-icon v-if="filter.SortColumn === 'organizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyear)>
              <div style="cursor : pointer" @click="ChangeSort('schoolyear')">
                {{ $t("schoolyear") }}
                <b-icon v-if="filter.SortColumn === 'schoolyear'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolgradename)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schoolgradename')"
              >
                {{ $t("schoolgradename") }}
                <b-icon v-if="filter.SortColumn === 'schoolgradename'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(oblastname)>
              <div style="cursor : pointer" @click="ChangeSort('oblastname')">
                {{ $t("oblastname") }}
                <b-icon v-if="filter.SortColumn === 'oblastname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(regionname)>
              <div style="cursor : pointer" @click="ChangeSort('regionname')">
                {{ $t("regionname") }}
               <b-icon v-if="filter.SortColumn === 'regionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(mainquota)>
              <div style="cursor : pointer" @click="ChangeSort('mainquota')">
                {{ $t("mainquota") }}
                <b-icon v-if="filter.SortColumn === 'mainquota'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(additionalquota)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('additionalquota')"
              >
                {{ $t("additionalquota") }}
                <b-icon v-if="filter.SortColumn === 'additionalquota'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(totalquota)>
              <div style="cursor : pointer" @click="ChangeSort('totalquota')">
                {{ $t("totalquota") }}
                <b-icon v-if="filter.SortColumn === 'totalquota'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolgradecount)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schoolgradecount')"
              >
                {{ $t("schoolgradecount") }}
                <b-icon v-if="filter.SortColumn === 'schoolgradecount'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(parentorganizationname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('parentorganizationname')"
              >
                {{ $t("parentorganizationname") }}
                <b-icon v-if="filter.SortColumn === 'parentorganizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor : pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon v-if="filter.SortColumn === 'detailinfo'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(onlinequeueinfocode)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('onlinequeueinfocode')"
              >
                {{ $t("onlinequeueinfocode") }}
                <b-icon v-if="filter.SortColumn === 'onlinequeueinfocode'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
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
                  @click="Preview(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Preview') }"
                >
                  <!-- <b-icon icon="pencil" ></b-icon> -->
                  <b-icon font-scale="1.8" class="pt-2" icon="eye"></b-icon>
                </b-link>
                <!-- <b-link @click="Edit(item)" class="mr-2" v-c-tooltip="{content: $t('View') }">
                  <b-icon icon="list-ul"></b-icon>
                </b-link> -->
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      @click="$bvModal.show('NotReceivedModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      &nbsp; {{ $t("NotReceivedd") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('ReceivedModal' + item.id)"
                    >
                      <b-icon icon="check2" class="mr-2"></b-icon>
                      {{ $t("Received") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2" ></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotAccept")
                  }}</template>
                  <div class="d-block text-right">
                    <CRow class="mt-3">
                      <CCol v-if="item.statusid === 8">
                        <label class="d-block text-left" for>{{
                          $t("Description")
                        }}</label>
                        <v-select
                          :options="tablecolumntemplate"
                          v-model="templaterow.Description"
                          :reduce="(item) => item.name"
                          :placeholder="$t('Description')"
                          label="name"
                          @input="descriptionchange"
                        >
                        </v-select>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol v-if="item.statusid === 8 && templaterow.isother">
                        <textarea
                          class="form-control"
                          v-model="templaterow.Description"
                          rows="5"
                        ></textarea>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol>
                        <CButton
                          @click="$bvModal.hide('NotReceivedModal' + item.id)"
                          color="danger"
                          class="mr-2"
                        >
                          <b-icon icon="x"></b-icon>
                          {{ $t("NotAccept") }}
                        </CButton>
                        <CButton @click="Cancel(item)" color="success">
                          <b-icon icon="check2"></b-icon>
                          {{ $t("Accept") }}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </b-modal>
                <b-modal :id="'ReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ReceivedModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Accept(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Accept") }}
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
                      size="sm"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Delete(item)" color="success" size="sm">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Accept") }}
                    </CButton>
                  </div>
                </b-modal>
                <!--<b-modal :id="'ProtocolModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{$t('Protocol')}}</template>
                  <div class="d-block text-right">

                    
                    <b-table
                        :fields="protocolfields"
                        :items="protocollist"
                       
                        small="small"
                        responsive="sm"
                        class="generalTableClass"
                        show-empty
                        :busy="isBusy"

                       
                        striped
                        sticky-header="60vh"
                        no-border-collapse
                        bordered
                      >


                        <template v-slot:empty>
                          <h5 class="text-center">{{$t('NoItems')}}</h5>
                        </template>
                        
                      </b-table>
                   <CButton
                      @click="$bvModal.hide('ProtocolModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                    <b-icon icon="x"></b-icon>
                      {{$t('NotAccept')}}
                    </CButton>
                  </div>
                </b-modal>-->
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
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
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
import TableColumnTemplateService from "@/services/TableColumnTemplate.service";
import SchoolAdmEStatementService from "@/services/SchoolAdmEStatement.service";
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
          sortable: false,
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
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "personname",
          label: this.$t("Student"),
          sortable: false,
        },
        {
          key: "onlinequeueinfocode",
          label: this.$t("IDCode"),
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false,
        },
        {
          key: "parentorganizationname",
          label: this.$t("parentorganizationname"),
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      protocollist: [],
      tablecolumntemplate: [],
      templaterow: {
        Description: "",
        isother: false,
      },
      protocolfields: [
        {
          key: "statusname",
          label: this.$t("statusname"),
          sortable: false,
        },
        {
          key: "returnreason",
          label: this.$t("returnreason"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false,
        },
      ],
      totalRows: "",

      isBusy: true,
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },
    };
  },
  created() {
    TableColumnTemplateService.GetAll(293, "returnreason").then((res) => {
      this.tablecolumntemplate = res.data;
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
    Delete(item) {
      SchoolAdmEStatementService.Delete(item.id)
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
    Preview(item) {
      this.$router.push({
        name: "UploadFileSchoolAdmEStatementSend",
        params: {
          id: item.id,
          isview: true,
        },
      });
    },
    descriptionchange() {
      var self = this;
      self.templaterow.isother = self.tablecolumntemplate.filter(function(
        item
      ) {
        if (item.name === self.templaterow.Description) return item;
      })[0].isother;
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

    Accept(item) {
      SchoolAdmEStatementService.Accept(item.id, item)
        .then((res) => {
          this.makeToast(
            this.$t("AcceptMessage"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("ReceivedModal" + item.id);
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.$bvModal.hide("ReceivedModal" + item.id);
        });
    },
    Cancel(item) {
      var self = this;
      if (item.statusid === 8 && self.templaterow.Description === "") {
        self.makeToast(
          self.$t("DescriptionNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmEStatementService.Cancel(item.id, self.templaterow.Description)
        .then((res) => {
          self.$bvModal.hide("NotReceivedModal" + item.id);
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            isother: false,
          };
          self.Refresh();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.Description = "";
          self.$bvModal.hide("NotReceivedModal" + item.id);
        });
    },
    Protocol(item) {
      var self = this;

      SchoolAdmEStatementService.GetDocumentStatusLog(item.id).then((res) => {
        self.protocollist = res.data;
      });
      this.$bvModal.show("ProtocolModal" + item.id);
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
      SchoolAdmEStatementService.GetSentList(
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

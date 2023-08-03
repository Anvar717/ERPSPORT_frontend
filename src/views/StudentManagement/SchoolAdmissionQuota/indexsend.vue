<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("SchoolAdmissionQuotaSend") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="5" class="text-left mt-2">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{$t('StartDate')}}</label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="filter.StartDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol lg="3" md="3" sm="5" class="text-left mt-2">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{$t('EndDate')}}</label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="filter.EndDate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            
            <CCol lg="3" md="5" sm="10" class="text-left mt-2">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
            <CCol lg="3" md="2"  class="text-lg-right mt-2">
              <CButton
                @click="Print"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="printer"></b-icon>
                &nbsp; {{ $t("Export") }}
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
          <CRow>
            <CCol  lg="5" md="4" sm="11" class="mt-2">
                <b-button-group>
                  <b-button size="sm" :variant="filter.statusid == 0 ? 'success' :'outline-success'" @click="All"> <b-icon icon="liost-task" class="mr-2"></b-icon> {{$t('All')}} </b-button>
                  <b-button size="sm" v-if="SchoolAdmissionQuotaManage" :variant="filter.statusid == 8 ? 'success' :'outline-success'" @click="SendAll"> <b-icon icon="arrow-up"></b-icon>  {{$t('SendAll')}}</b-button>
                  <b-button size="sm" :variant="filter.statusid == 13 ? 'success' :'outline-success'" @click="ForConsiderationAll"><b-icon icon="arrow-down"></b-icon>  <b-icon icon="arrow-down"></b-icon>  {{$t('ForConsideration')}}</b-button>
                  <b-button size="sm"  :variant="filter.statusid == 9 ? 'success' :'outline-success'" @click="ReceivedAll"><b-icon icon="arrow-down"></b-icon> {{$t('ReceivedAll')}}</b-button>
                </b-button-group>
            </CCol>
            
            <CCol class="text-right">
              <label for="byf" class="mr-4">{{$t('showlanguage')}}</label>
              <div  class="form-group form-row text-right" style="float:right">
                <b-form-checkbox id="byf"  v-model="filter.showlanguage" name="check-button" switch></b-form-checkbox>
              </div>
            </CCol>
          </CRow>  
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="height:500px"
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
            <template v-slot:head(organizationname)>
              <div style="cursor : pointer" @click="ChangeSort('organizationname')">
                {{ $t("organizationname") }}
                <b-icon v-if="filter.SortColumn === 'organizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyearname)>
              <div style="cursor : pointer" @click="ChangeSort('schoolyearname')">
                {{ $t("schoolyearname") }}
                <b-icon v-if="filter.SortColumn === 'schoolyearname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(personname)>
              <div style="cursor : pointer" @click="ChangeSort('personname')">
                {{ $t("personname") }}
                <b-icon v-if="filter.SortColumn === 'personname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(dateofcreated)>
              <div style="cursor : pointer" @click="ChangeSort('dateofcreated')">
                {{ $t("dateofcreated") }}
                <b-icon v-if="filter.SortColumn === 'dateofcreated'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(status)="{ item }">
              <CBadge :color="getItemColor(item.status)">
                {{
                item.status
                }}
              </CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link @click="Edit(item)" class="mr-2" v-c-tooltip="{ content: $t('View') }">
                  <b-icon font-scale="1.8" class="pt-2" icon="eye"></b-icon>
                </b-link>
                <b-dropdown v-if="(item.statusid === 8 && SchoolAdmissionQuotaManage) || SchoolAdmissionQuotaMNOView" variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item @click="$bvModal.show('NotReceivedModal' + item.id)">
                      <b-icon icon="x" class="mr-2"></b-icon>
                      &nbsp; {{ $t("NotReceivedd") }}
                    </b-dropdown-item>
                    <b-dropdown-item v-if="SchoolAdmissionQuotaMNOView" @click="$bvModal.show('ReceivedModal' + item.id)">
                      <b-icon icon="check2" class="mr-2"></b-icon>
                      {{ $t("Received") }}
                    </b-dropdown-item> 
                    <b-dropdown-item v-if="SchoolAdmissionQuotaManage" @click="$bvModal.show('ForConsiderationModal' + item.id)">
                      <b-icon icon="check2" class="mr-2"></b-icon>
                      {{ $t("ForConsideration") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>
                    {{
                    $t("WantNotAccept")
                    }}
                  </template>
                  <div class="d-block text-right">
                    <CRow class="mt-3">
                      <CCol v-if="item.statusid === 8 || item.statusid === 13">
                        <label class="d-block text-left" for>
                          {{
                          $t("Description")
                          }}
                        </label>
                        <v-select
                          :options="tablecolumntemplate"
                          v-model="templaterow.Description"
                          :reduce="(item) => item.name"
                          :placeholder="$t('Description')"
                          label="name"
                          @input="descriptionchange"
                        ></v-select>
                      </CCol>
                    </CRow>
                    <CRow class="mt-3">
                      <CCol v-if="(item.statusid === 8 || item.statusid === 13) && templaterow.isother">
                        <textarea class="form-control" v-model="templaterow.Description" rows="5"></textarea>
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
                        <CButton @click="Reject(item)" color="success">
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
                <b-modal :id="'ForConsiderationModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ForConsiderationModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="ForConsideration(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Accept") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'ProtocolModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("Protocol") }}</template>
                  <div class="d-block text-right">
                    <b-table
                      :fields="protocolfields"
                      :items="protocollist"
                      small="small"
                      responsive="sm"
                      class="generalTableClass"
                      show-empty
                      :busy="isBusy"
                      @row-dblclicked="Edit"
                      @row-clicked="rowclicked"
                      striped
                      sticky-header="60vh"
                      no-border-collapse
                      bordered
                    >
                      <template v-slot:head(statusname)>
                        <div style="cursor : pointer" @click="ChangeSort('statusname')">
                          {{ $t("statusname") }}
                          <b-icon v-if="filter.SortColumn === 'statusname'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>
                      <template v-slot:head(returnreason)>
                        <div
                          class="text-center"
                          style="cursor : pointer"
                          @click="ChangeSort('returnreason')"
                        >
                          {{ $t("returnreason") }}
                          <b-icon v-if="filter.SortColumn === 'returnreason'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>
                      <template v-slot:head(dateofcreated)>
                        <div style="cursor : pointer" @click="ChangeSort('dateofcreated')">
                          {{ $t("dateofcreated") }}
                          <b-icon v-if="filter.SortColumn === 'dateofcreated'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>

                      <template v-slot:empty>
                        <h5 class="text-center">{{ $t("NoItems") }}</h5>
                      </template>
                    </b-table>
                    <CButton
                      @click="$bvModal.hide('ProtocolModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                  </div>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2" style="vertical-align:middle">
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
            <div style="float:left;font-size:12px">{{ $t("RecordsPerPage") }}</div>
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
import SchoolAdmissionQuotaService from "@/services/schooladmissionquota.service";
import TableColumnTemplateService from "@/services/TableColumnTemplate.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions")
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false
        },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          sortable: false
        },
        {
          key: "schoolyear",
          label: this.$t("schoolyear"),
          sortable: false
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false
        },
        {
          key: "mainquota",
          label: this.$t("mainquota"),
          sortable: false
        },
        {
          key: "additionalquota",
          label: this.$t("additionalquota"),
          sortable: false
        },
        {
          key: "totalquota",
          label: this.$t("totalquota"),
          sortable: false
        },
        {
          key: "schoolgradecount",
          label: this.$t("schoolgradecount"),
          sortable: false
        },

        {
          key: "parentorganizationname",
          label: this.$t("parentorganizationname"),
          sortable: false
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false
        }
      ],
      items: [],
      protocollist: [],
      tablecolumntemplate: [],
      templaterow: {
        Description: "",
        isother: false
      },
      protocolfields: [
        {
          key: "statusname",
          label: this.$t("statusname"),
          sortable: false
        },
        {
          key: "returnreason",
          label: this.$t("returnreason"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false
        }
      ],
      totalRows: "",
      isBusy: true,
      SchoolAdmissionQuotaManage: this.$can("SchoolAdmissionQuotaManage","permissions"),
      SchoolAdmissionQuotaMNOView: this.$can("SchoolAdmissionQuotaMNOView","permissions"),
      filter: {
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        statusid : 0,
        showlanguage : false
      }
    };
  },
  created() {
    TableColumnTemplateService.GetAll(291, "returnreason").then(res => {
      this.tablecolumntemplate = res.data;
    });
    this.createDate();
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
    }
  },

  methods: {
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = '01.01.' + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    SendAll(){
      this.filter.statusid = 8
    },
    ReceivedAll(){
      this.filter.statusid = 9
    },
    ForConsiderationAll(){
      this.filter.statusid = 13
    },
    All(){
      this.filter.statusid = 0
      this.Refresh()
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

    Edit(item) {
      this.$router.push({
        name: "EditSchoolAdmissionQuotaSend",
        params: {
          id: item.id,
          isview: true
        }
      });
    },
    Print() {
      SchoolAdmissionQuotaService.Print(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.statusid,
        this.filter.showlanguage
        )
        .then(response => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolAdmissionQuotaList.xlsx");

          fileLink.click();
        })
        .catch(e => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    Accept(item) {
      SchoolAdmissionQuotaService.Accept(item.id, item)
        .then(res => {
          this.makeToast(
            this.$t("AcceptMessage"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("ReceivedModal" + item.id);
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.$bvModal.hide("ReceivedModal" + item.id);
        });
    },
    ForConsideration(item) {
      SchoolAdmissionQuotaService.ForConsideration(item.id, item)
        .then(res => {
          this.makeToast(
            this.$t("AcceptMessage"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("ForConsiderationModal" + item.id);
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.$bvModal.hide("ForConsiderationModal" + item.id);
        });
    },
    Reject(item) {
      var self = this;
      if (item.statusid === 8 && self.templaterow.Description === "") {
        this.makeToast(
          this.$t("DescriptionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmissionQuotaService.Reject(item.id, self.templaterow.Description)
        .then(res => {
          self.$bvModal.hide("NotReceivedModal" + item.id);
          self.makeToast(
            self.$t("NotAcceptMessage"),
            self.$t("message"),
            "success"
          );
          self.templaterow = {
            Description: "",
            isother: false
          };
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.templaterow.Description = "";
          this.$bvModal.hide("NotReceivedModal" + item.id);
        });
    },
    Protocol(item) {
      var self = this;

      SchoolAdmissionQuotaService.GetDocumentStatusLog(item.id).then(res => {
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
      SchoolAdmissionQuotaService.GetSentList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.statusid,
        this.filter.showlanguage
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
        solid: true
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
    }
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.statusid":{
      handler(newValue,oldValue){
        if(newValue){
          this.Refresh()
        }
      }
    },
    "filter.showlanguage" : {
      handler(newValue,oldValue){
          if(newValue === true){
            this.fields.splice(9,0,{
              
                key: "educationlanguagename",
                label: this.$t("educationlanguage"),
                sortable: false
              
            })
          }
          if(newValue === false){
            if(this.fields.filter(item => item.key === 'educationlanguagename').length > 0){
              this.fields.splice(9,1)
            }
          }
          this.Refresh()
      }
    }
  },
};
</script>

<style></style>

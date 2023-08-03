
<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          <b-col md="2">
            <CButton color="danger" @click="$router.push('/')" size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="8"
            ><h4 class="text-center">
              {{ $t("AthletePassportSendList") }}
            </h4></b-col
          >
          <b-col md="2" class="text-right">
            <CButton @click="Print" color="primary" size="sm">
              <!-- <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              <b-spinner v-if="PrintLoading" small></b-spinner> -->
              &nbsp; {{ $t("Export") }}
            </CButton>  
          </b-col>
        </b-row>
        <CCardHeader>
          <CRow class="form-group" style="margin-left: 0px">
            <CCol lg="3" md="2" sm="1" class="text-left mt-1 pl-0">
              <v-select
                :options="oblastlist"
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.oblastId"
                @input="ChangeOblast"
              ></v-select>
            </CCol>
            <CCol lg="3" md="2" sm="" class="text-left mt-1 pl-0">
              <v-select
                :options="regionlist"
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.regionId"
                @input="ChangeRegion"
              ></v-select>
            </CCol>
            <CCol lg="2" md="3" sm="12" class="text-left mt-1 pl-0 mr-0">
              <v-select
                :options="organizationlist"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.organizationId"
                @input="Refresh"
              ></v-select>
            </CCol>
            <CCol lg="2" md="2" sm="" class="text-left mt-1 pl-0">
              <v-select
                :options="sporttypeclassifierlist"
                :reduce="(item) => item.id"
                :placeholder="$t('sporttypeclassifier')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.sporttypeclassifierid"
                @input="Refresh"
              ></v-select>
            </CCol>
            <CCol lg="2" md="2" sm="1" class="text-left mt-1 pl-0">
              <v-select
                :options="genderlist"
                :reduce="(item) => item.id"
                :placeholder="$t('gender')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.genderid"
                @input="Refresh"
              ></v-select>
            </CCol>
          </CRow>
          <CRow class="form-group" style="margin-left: 0px; margin-top: 10px">
          </CRow>
          <CRow>
            <CCol lg="3" md="2" sm="1">
              <ValidationProvider v-slot="v" name="SportTypeClassifier" class="d-flex">
                <div class="form-group">
                  <custom-date-picker
                    v-model="filter.startdate"
                    @keyup="(value) => filter.startdate = value"
                    :placeholder="$t('startdate')"
                    @input="Refresh"
                  >
                  </custom-date-picker>
                </div>
                <div class="form-group ml-3">
                  <custom-date-picker
                    v-model="filter.enddate"
                    @keyup="(value) => filter.enddate = value"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('enddate')"
                    @input="Refresh"
                  >
                  </custom-date-picker>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol lg="3" md="2" sm="1" class="d-flex">
              <v-select
                :options="athletepassportserieslist"
                :reduce="(item) => item.id"
                :placeholder="$t('Sport passport seriyasi')"
                label="name"
                class="w-50"
                v-model="filter.athletepassportseriesid"
              ></v-select>
              <b-form-input
                :placeholder="$t('Sport passport raqami')"
                v-model="filter.athletepassportumber"
                v-mask="'#######'"
                class="w-50 ml-2 mr-n2"
              />
            </CCol>
           
            <CCol sm="2">
              <v-select
                :options="SearchTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('SearchType')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.searchtype"
                @input="ChangeSearchType"
              ></v-select>
            </CCol>
            <CCol lg="4" md="3" sm="12">
              <custom-search
                v-model="filter.Search"
                @search="Search"
                filter="filter"
                @input="Refresh"
              ></custom-search>
            </CCol>
          </CRow>
          <!-- <CRow class="form-group" style="margin-left: 0px; margin-top: 10px">
            <CCol lg="3" md="2" sm="1" class="text-left mt-1 pl-0">
              <v-select
                :options="identityDocumentlist"
                :reduce="(item) => item.id"
                :placeholder="$t('IdentityDocument')"
                label="name"
                v-model="filter.identityDocumentId"
                @input="changeIdentityDocument"
              ></v-select>
            </CCol>
            <CCol lg="3" md="2" sm="1" class="text-left mt-1 pl-0">
              <div class="d-flex">
                <v-select
                  class="mr-2 w-50"
                  v-if="filter.identityDocumentId == 1"
                  :options="documentSerieslist"
                  :reduce="(item) => item.name"
                  label="name"
                  :placeholder="$t('DocumentSeries')"
                  v-model="filter.documentSeries"
                >
                </v-select>
                <b-form-input
                  class="text-upper mr-2 w-50"
                  v-if="filter.identityDocumentId != 1"
                  :placeholder="$t('DocumentSeries')"
                  v-model="filter.documentSeries"
                  v-mask="'AA'"
                />
                <b-form-input
                  class="mr-2 w-50"
                  :placeholder="$t('documentnumber')"
                  v-model="filter.documentNumber"
                  v-mask="'#######'"
                />
              </div>
            </CCol>
            <CCol sm="2" class="text-left mt-1 pl-0">
              <v-select
                :options="SearchTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('SearchType')"
                label="name"
                class="fname-select"
                style="width: 100%"
                v-model="filter.searchtype"
                @input="ChangeSearchType"
              ></v-select>
            </CCol>
            <CCol lg="4" md="3" sm="12" class="text-left mt-1 pl-0 mr-0">
              <custom-search
                v-model="filter.Search"
                @search="Search"
              ></custom-search>
            </CCol>
          </CRow> -->
          <b-row class="mt-3 d-flex">
            <b-col>
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group mr-3"
              >
                
                <b-button
                  @click="filter.statusId = 8"
                  :variant="
                    filter.statusId == 8 ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("senttedestatement") }}</span>
                </b-button>
                <b-button
                  @click="filter.statusId = 10"
                  :variant="
                    filter.statusId == 10 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("Canceled") }}
                </b-button>
                <b-button
                  @click="filter.statusId = 9"
                  :variant="
                    filter.statusId == 9 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("receivedcount") }}
                </b-button>
                <b-button
                  @click="filter.statusId = 0"
                  :variant="
                  filter.statusId == 0 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
              </b-button-group>
              
            </b-col>
            <b-col class="text-right">
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group"
              >
                <b-button
                  @click="filter.isoldathletepassport = ''"
                  :variant="
                    typeof filter.isoldathletepassport == 'string' ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("All") }}</span>
                </b-button>
                <b-button
                  @click="filter.isoldathletepassport = true"
                  :variant="
                    filter.isoldathletepassport === true ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isold") }}
                </b-button>
                <b-button
                  @click="filter.isoldathletepassport = false"
                  :variant="
                    filter.isoldathletepassport === false ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isnew") }}
                </b-button>
              </b-button-group>
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group ml-3"
              >
                <b-button
                  @click="filter.issenttoprint = null; filter.isprinted = null; filter.isreadytosend = null; fields[0].key = 'issenttoprint'"
                  :variant="
                    filter.issenttoprint == null && filter.isprinted == null && filter.isreadytosend == null ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("All") }}</span>
                </b-button>
                <b-button
                  @click="filter.issenttoprint = false; filter.isprinted = false; filter.isreadytosend = false; fields[0].key = 'issenttoprint'"
                  :variant="
                    filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == false ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("isnew") }}</span>
                </b-button>
                <b-button
                  @click="filter.issenttoprint = false; filter.isprinted = false; filter.isreadytosend = true; fields[0].key = 'issenttoprint'"
                  :variant="
                    filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == true ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("isreadytosend") }}</span>
                </b-button>
                <b-button
                  @click="filter.issenttoprint = true; filter.isprinted = false; filter.isreadytosend = false; fields[0].key = 'issenttoprint'"
                  :variant="
                    filter.issenttoprint == true && filter.isprinted == false && filter.isreadytosend == false ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("issenttoprint") }}
                </b-button>
                <b-button
                  @click="filter.issenttoprint = false; filter.isprinted = true; filter.isreadytosend = false; fields[0].key = 'isprinted'"
                  :variant="
                    filter.issenttoprint == false && filter.isprinted == true && filter.isreadytosend == false ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isprinted") }}
                </b-button>
              </b-button-group>
              <CButton v-if="filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == true"  @click="PrintSent" color="primary" class="ml-2" size="sm">
                <!-- <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner> -->
                &nbsp; {{ $t("Export") }}
              </CButton> 
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <!-- <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap; min-height: 500px"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-dblclicked="View"
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div style="cursor: pointer" @click="ChangeSort('id')">
                {{ $t("id") }}
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor: pointer" @click="ChangeSort('docdate')">
                {{ $t("DocDate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(isoldathletepassport)="{ item }" >
                <span >{{ item.isoldathletepassport ? $t("yes") : $t("no") }}</span>
            </template>
            <template v-slot:cell(isreadytosend)="{ item }">
              <div class="d-flex justify-content-center align-items-baseline">
                  <b-form-checkbox @change="changePrepareToSendCheck(item, $event)" :disabled="item.isreadytosend" v-model="item.isreadytosend"></b-form-checkbox>
                </div>
            </template>

            <template v-slot:cell(issenttoprint)="{ item }" >
              <div>
                <div class="d-flex justify-content-center align-items-baseline" v-if="filter.isreadytosend == true && filter.isprinted == false && filter.issenttoprint == false">
                  <b-form-checkbox @change="changePrintCheck(item, $event)" :disabled="item.isprinted" v-model="item.issenttoprint"></b-form-checkbox>
                </div>
                
                <div v-if="$can('AthletePassportCancelPrint', 'permissions') && filter.statusId == 9 && filter.issenttoprint == true && filter.isprinted == true && filter.isreadytosend == true" class="d-flex justify-content-center align-items-baseline">
                  <b-form-checkbox form-checkbox  @change="changeCancelPrintCheck(item, $event)" :disabled="!item.isprinted" v-model="item.isprinted" class="mr-2"></b-form-checkbox>
                </div>
              </div>
            </template>
            <template v-slot:cell(isprinted)="{ item }">          
              <div class="d-flex justify-content-center align-items-baseline">
                <b-form-checkbox @change="changePrintedCheck(item)" :disabled="item.isprinted" v-model="item.isprinted"></b-form-checkbox>
              </div>
            </template>
            
            <template v-slot:head(status)>
              <div style="cursor: pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge
                style="color: white"
                :color="getItemColor(item.statusid)"
                >{{ item.statusname }}</CBadge
              >
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid == 9 && item.statusid != 10 && item.statusid != 0 && item.statusid != 8"
                  @click="Printer(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Print') }"
                >
                  <b-icon scale="1.2" icon="printer"></b-icon>
                </b-link>
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
                      v-if="$can('AthletePassportDelete', 'permissions')"
                      @click="Delete(item)"
                      color="success"
                    >
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
                style="vertical-align: middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table> -->

        <div class="mobileStyle">
          <table 
            style="white-space: nowrap; height: 500px; overflow: auto;"
            class="table table-bordered table-striped">
            <thead>
              <tr>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("actions") }}</th>
                <th style="text-align: center; vertical-align: inherit;" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && (filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == false) "
                >
                  {{ $t("isnew") }}
                </th>
                <th style="text-align: center; vertical-align: inherit;" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == true"
                >
                  {{ $t("isreadytosend") }}
                </th>
                <th style="text-align: center; vertical-align: inherit;" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == true && filter.isprinted == false && filter.isreadytosend == false"
                >
                  {{ $t("issenttoprint") }}
                </th>
                <th style="text-align: center; vertical-align: inherit;" 
                  v-if="$can('AthletePassportCancelPrint', 'permissions') && (filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == false && filter.isprinted == true && filter.isreadytosend == false"
                >
                  {{ $t("isprinted") }}
                </th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("statusname") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("id") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("EstatementDate") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("oblast") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("region") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("organizationname") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("personname") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("gendername") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("dateofbirth") }}</th>
                <th style="text-align: center; vertical-align: inherit;">{{ $t("pinfl") }}</th>
                <th style="text-align: center; vertical-align: inherit; width: 120px;">{{ $t("Sport passport seriyasi") }}</th>
                <th style="text-align: center; vertical-align: inherit; width: 120px;">{{ $t("Sport passport raqami") }}</th>
                <th style="text-align: center; vertical-align: inherit; width: 120px;">{{ $t("DocDate") }}</th>
                <th style="text-align: center; vertical-align: inherit; width: 120px;">{{ $t("expirationdate") }}</th>
                <th style="text-align: center; vertical-align: inherit;" width="120">{{ $t("isoldathletepassport") }}</th>
              </tr>
            </thead>
            <tbody v-if="!isBusy">
              <tr v-for="(item, index) in items" :key="index">
                <td>
                  <b-link
                    @click="View(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('View') }"
                  >
                    <b-icon scale="1.2" icon="eye"></b-icon>
                  </b-link>
                  <b-link
                    v-if="item.statusid == 9 && item.statusid != 10 && item.statusid != 0 && item.statusid != 8"
                    @click="Printer(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Print') }"
                  >
                    <b-icon scale="1.2" icon="printer"></b-icon>
                  </b-link>
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
                        v-if="$can('AthletePassportDelete', 'permissions')"
                        @click="Delete(item)"
                        color="success"
                      >
                        <b-icon icon="check2"></b-icon>
                        {{ $t("Approve") }}
                      </CButton>
                    </div>
                  </b-modal>
                </td>
                <td class="text-center" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == false"
                >
                  <div class="d-flex">
                    <b-form-checkbox @change="changePrepareToSendCheck(item, $event)" :disabled="item.isreadytosend" v-model="item.isreadytosend"></b-form-checkbox>
  
                    <b-form-checkbox @change="changePrintCheck(item, $event)" v-model="item.issenttoprint" class="ml-3"></b-form-checkbox>
                  </div>
                </td>
                <td class="text-center" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == true && filter.isprinted == false && filter.isreadytosend == false"
                >
                  <!-- {{ item.issenttoprint }} -->
                    <div class="d-flex justify-content-center align-items-baseline">
                      <b-form-checkbox @change="changePrintCheck(item, $event)" v-model="item.issenttoprint"></b-form-checkbox>
                    </div>
                </td>
                <td class="text-center" 
                  v-if="(filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == true"
                >
                  <!-- {{ item.isprinted }} -->
                  <div class="d-flex justify-content-center align-items-baseline">
                    <b-form-checkbox @change="changePrintedCheck(item)" v-model="item.isreadytosend"></b-form-checkbox>
                  </div>
                </td>
                <td class="text-center" 
                  v-if="$can('AthletePassportCancelPrint', 'permissions') && (filter.statusId == 9 || filter.statusId == 0) && filter.issenttoprint == false && filter.isprinted == true && filter.isreadytosend == false"
                >
                  <div class="d-flex justify-content-center align-items-baseline">
                    <b-form-checkbox form-checkbox  @change="changeCancelPrintCheck(item, $event)" v-model="item.isprinted" class="mr-2"></b-form-checkbox>
                  </div>
                </td>
                <td class="text-center">
                  <CBadge
                    style="color: white; padding: 3px 10px; width: 95px; height: 20px;"
                    :color="getItemColor(item.statusid)"
                    >{{ item.statusname }}</CBadge
                  >
                </td>
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.senddate }}</td>
                <td class="text-left">{{ item.oblastname }}</td>
                <td class="text-left">{{ item.regionname }}</td>
                <td class="text-left">{{ item.organizationname }}</td>
                <td class="text-left">{{ item.personname }}</td>
                <td class="text-center">{{ item.gendername }}</td>
                <td class="text-center">{{ item.persondateofbirth }}</td>
                <td class="text-center">{{ item.personpinfl }}</td>
                <td class="text-center">{{ item.athletepassportseriesname }}</td>
                <td class="text-center">{{ item.docnumber }}</td>
                <td class="text-center">{{ item.docdate }}</td>
                <td class="text-center">{{ item.docexpiredate }}</td>
                <td class="text-center" width="120">
                  <b-badge :variant="item.isoldathletepassport == true ? 'success' : 'danger'" style="padding: 3px 10px; width: 85px; height: 20px;">
                    {{ item.isoldathletepassport ? $t('available') : $t('notavailable') }}
                  </b-badge>
                </td>
              </tr>
            </tbody>
            <tbody v-if="isBusy">
                <tr>
                  <td class="text-center" colspan="19">
                    <b-spinner></b-spinner>
                  </td>
                </tr>
              </tbody>
              
          </table>
        </div>
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
import AthletePassportService from "@/services/AthletePassport.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import HelperService from "@/services/helper.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import OrganizationService from "@/services/organization.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import AthletePassportSeriesService from "@/services/AthletePassportSeries.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components : {CustomDatePicker},
  data() {
    return {
      athletepassportserieslist: [],
      oblastlist: [],
      regionlist: [],
      genderlist: [],
      organizationlist: [],
      sporttypeclassifierlist: [],
      identityDocumentlist: [],
      documentSerieslist: [],
      Loading: false,
      fields: [
        {
          key: "",
          label: '',
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "isreadytosend",
          label: this.$t("isreadytosend"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "issenttoprint",
          label: this.$t("issenttoprint"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "isprinted",
          label: this.$t("isprinted"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "senddate",
          label: this.$t("EstatementDate"),
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-left",
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-left",
        },
        {
          key: "persondateofbirth",
          label: this.$t("dateofbirth"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "personpinfl",
          label: this.$t("pinfl"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          tdClass: "text-center",
        },
        {
          key: "athletepassportseriesname",
          label: this.$t("Sport passport seriyasi"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          thStyle: "text-wrap: wrap;width: 150px",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("Sport passport raqami"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          thStyle: "text-wrap: wrap;width: 150px",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("DocDate"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          thStyle: "text-wrap: wrap;width: 150px",
          tdClass: "text-center",
        },
        {
          key: "docexpiredate",
          label: this.$t("expirationdate"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          thStyle: "text-wrap: wrap;width: 150px",
          tdClass: "text-center",
        },
        {
          key: "isoldathletepassport",
          label: this.$t("isoldathletepassport"),
          sortable: false,
          thClass: "text-center vertical-align-inherit",
          thStyle: "text-wrap: wrap;width: 150px",
          tdClass: "text-center",
        },
      ],
      SearchTypeList: [
        { id: 1, name: this.$t("personname1") },
        { id: 2, name: this.$t("pinfl") },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        personName: "",
        statusId: 8,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 0,
        documentSeries: "",
        documentNumber: "",
        athletepassportseriesid: 0,
        athletepassportumber: "",
        startdate: "",
        enddate: "",
        organizationId: 0,
        oblastId: 0,
        regionId: 0,
        genderid: 0,
        sporttypeclassifierid: 0,
        isoldathletepassport: "",
        issenttoprint: false,
        isprinted : false,
        isreadytosend: false,
        isprintedfornewtab: false,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        searchtype: 1,
      },
    };
  },
  created() {
    if (!!this.$route.query) {
      Object.keys(this.$route.query).forEach((item) => {
        if (!!this.$route.query[item]) {
          this.filter[item] = this.$route.query[item]
        }
      })
    }
    (this.filter.statusId = this.$route.query.statusId || this.filter.statusId),
      OblastService.GetAll(this.lang, 0, false).then((res) => {
        this.oblastlist = res.data;
      });
    HelperService.GetGenderList(this.lang, false).then((res) => {
      this.genderlist = res.data;
    });
    SportTypeClassifierService.GetAll(true).then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    IdentityDocumentService.GetAll(this.lang)
      .then((res) => {
        this.identityDocumentlist = res.data.result;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.documentSerieslist = res.data.result;
    });
    AthletePassportSeriesService.GetAll().then((res) => {
      this.athletepassportserieslist = res.data;
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
    Printer(item) {
      AthletePassportService.PrintAthletePassportPdf('pdf', item.docuuid).then(res => {
        this.forceFileDownload(res,'Sportchi pasporti.pdf')
      })  
    },
    Print() {
      AthletePassportService.PrintSendList(
        this.filter.personId,
        this.filter.personName,
        this.filter.statusId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.athletepassportseriesid,
        this.filter.athletepassportumber,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.organizationId,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.genderid,
        this.filter.sporttypeclassifierid,
        this.filter.isoldathletepassport,
        this.filter.isprinted,
        this.filter.issenttoprint,
        this.filter.isprintedfornewtab
      )
        .then((res) => {
          this.forceFileDownload(res, "Sportchi pasporti.xlsx");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    PrintSent() {
      AthletePassportService.PrintAthleteListForPrintPassport(
        this.filter.personId,
        this.filter.personName,
        this.filter.statusId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.athletepassportseriesid,
        this.filter.athletepassportumber,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.organizationId,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.genderid,
        this.filter.sporttypeclassifierid,
        this.filter.isoldathletepassport,
        this.filter.isprinted,
        this.filter.issenttoprint = true,
      )
        .then((res) => {
          this.forceFileDownload(res, "PrintAthleteListForPrintPassport.xlsx");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
        AthletePassportService.DownloadPhotosAsZip(
          this.filter.statusId,
          this.filter.athletepassportseriesid,
          this.filter.organizationId,
          this.filter.oblastId,
          this.filter.regionId,
          this.filter.genderid,
          this.filter.sporttypeclassifierid
        )
          .then((res) => {
            this.forceFileDownload(res, "PrintAthleteListForPrintPassport.zip");
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
    },
    ChangeOblast() {
      this.filter.regionId = 0;
      this.filter.organizationId = 0;
      RegionService.GetAll(this.lang, this.filter.oblastId).then((res) => {
        this.regionlist = res.data;
      });
      this.Refresh();
    },
    ChangeRegion() {
      this.filter.organizationId = 0;
      OrganizationService.GetAll(
        this.filter.oblastId,
        this.filter.regionId,
        false
      ).then((res) => {
        this.organizationlist = res.data;
      });
      this.Refresh();
    },
    changeIdentityDocument() {
      this.filter.documentSeries = "";
      this.filter.documentNumber = "";
      this.filter.Search = "";
    },
    View(item) {
      this.$router.push({
        name: "ViewAthletePassportSendList",
        params: {
          id: item.id,
        },
        query: this.filter,
      });
    },
    getItemColor(id) {
      return id === 1
        ? "primary"
        : id === 2
        ? "success"
        : id === 3
        ? "danger"
        : id === 4
        ? "primary"
        : id === 8
        ? "warning"
        : id === 9
        ? "success "
        : id === 10
        ? "danger "
        : "primary";
    },
    ChangeSearchType() {
      this.filter.pinfl = "";
      this.filter.personName = "";
      this.filter.Search = "";
    },
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.personName = this.filter.Search;
      }
      if (this.filter.searchtype === 2) {
        this.filter.pinfl = this.filter.Search;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAthletePassport",
        params: {
          id: 0,
        },
      });
    },
    // View(item) {
    //   this.$router.push({
    //     name: "EditAthletePassport",
    //     params: {
    //       id: item.id,
    //     },
    //     query: {
    //       Search: this.filter.Search,
    //     },
    //   });
    // },
    Delete(item) {
      AthletePassportService.Delete(item.id)
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
    // Approve(item) {
    //   var self = this;
    //   AthletePassportService.Approve(item.id)
    //     .then((res) => {
    //       self.makeToast(
    //         self.$t("AcceptMessage"),
    //         self.$t("message"),
    //         "success"
    //       );
    //       this.Refresh();
    //     })
    //     .catch((error) => {
    //       self.makeToast(
    //         error.response.data.error,
    //         self.$t("message"),
    //         "danger"
    //       );
    //     });
    // },
    // CancelApproval(item) {
    //   var self = this;
    //   AthletePassportService.CancelApproval(item.id)
    //     .then((res) => {
    //       self.makeToast(
    //         self.$t("CancelAcceptMessage"),
    //         self.$t("message"),
    //         "danger"
    //       );
    //       this.Refresh();
    //     })
    //     .catch((error) => {
    //       self.makeToast(
    //         error.response.data.error,
    //         self.$t("message"),
    //         "danger"
    //       );
    //     });
    // },
    Refresh() {
      this.isBusy = true;
      AthletePassportService.GetSendList(
        0,
        this.filter.personName,
        this.filter.statusId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.athletepassportseriesid,
        this.filter.athletepassportumber,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.organizationId,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.genderid,
        this.filter.sporttypeclassifierid,
        this.filter.isoldathletepassport,
        this.filter.isprinted,
        this.filter.issenttoprint,
        this.filter.isreadytosend
        // this.filter.schoolyearid,
        // this.filter.sportgroupid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
      });
    },
    changePrepareToSendCheck(item, value) {
      if (item.isreadytosend == true) {
        AthletePassportService.SendToPrint(item.id, value).then(() => {
        item.isreadytosend = true
      })
      } else {
        AthletePassportService.PrepareToSend(item.id, value)
          .then(() => {
          item.isreadytosend = false
        })
      }
    },
    changePrintCheck(item, value) {
      if (item.issenttoprint == true) {
        AthletePassportService.SendToPrint(item.id, value).then(() => {
          item.issenttoprint = false
        })  
      } else {
        AthletePassportService.SendToPrint(item.id, value)
          .then(() => {
          item.isreadytosend = false
        })
      }
    },
    changePrintedCheck(item, value) {
      if (item.isreadytosend == true) {
        AthletePassportService.Print(item.id, value).then(() => {
          item.isreadytosend = false
        })
      } else {
        AthletePassportService.SendToPrint(item.id, value).then(() => {
          item.issenttoprint = false
        })  
      }
    },
    changeCancelPrintCheck(item, value) {
      if ( item.isreadytosend == true) {
        AthletePassportService.CancelPrint(item.id, value).then(() => {
          item.isprinted = false
        })
      } else {
        AthletePassportService.Print(item.id, value).then(() => {
          item.isprinted = false
        })
      }
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
    handlerCheck() {
      if (this.filter.isreadytosend == true || this.filter.isoldathletepassport === false && this.filter.statusId == 9 && this.filter.issenttoprint == null && this.filter.isprinted == null) {
        this.fields[0].key = 'issenttoprint'
        this.fields[0].label = this.$t("issenttoprint")
      } else if (filter.issenttoprint == false && filter.isprinted == false && filter.isreadytosend == false && this.filter.statusId == 9) {
        this.fields[0].key = 'isreadytosend'
        this.fields[0].label = this.$t("isreadytosend")
      }


      // if (this.filter.isoldathletepassport === false && this.filter.statusId == 9 && this.filter.issenttoprint == null && this.filter.isprinted == null) {
      //   this.fields[0].key = 'issenttoprint'
      //   this.fields[0].label = this.$t("issenttoprint")
      // } else if (this.filter.isoldathletepassport === false && this.filter.statusId == 9 && this.filter.issenttoprint == true && this.filter.isprinted == false) {
      //   this.fields[0].key = 'issenttoprint'
      //   this.fields[0].label = this.$t("issenttoprint")
      // } else {
      //   this.fields[0].key = ''
      //   this.fields[0].label = this.$t("issenttoprint")
      // }
    }
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
    "filter.isoldathletepassport": {
      handler(newValue) {
        this.handlerCheck()
      }
    },
    "filter.issenttoprint": {
      handler(newValue) {
        this.handlerCheck()
      }
    },
    "filter.isprinted": {
      handler(newValue) {
        this.handlerCheck()
      }
    },
    "filter.isreadytosend": {
      handler(newValue) {
        this.handlerCheck()
      }
    },
    "filter.statusId": {
      handler(newValue) {
        this.handlerCheck()
      }
    }
  },
};
</script>

<style>
.table thead th {
  vertical-align: inherit !important;
}
</style>
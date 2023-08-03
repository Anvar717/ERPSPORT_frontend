<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("HRTimeSheet") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'HRTimeSheet' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" lg="3">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <label class="col-form-label">{{
                    $t("docnumber")
                  }}</label>
                  <CInput
                    autocomplete="text"
                    v-model="HRTimeSheet.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="3">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="HRTimeSheet.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="personname-input achievement-input"
                  style="width:100%"
                  :disabled="DisabledItem()"
                ></date-picker>
              </CCol>
<!--              <CCol sm="4">
                <label>{{ $t("formonth") }}</label>
                <date-picker
                  v-model="HRTimeSheet.formonth"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </CCol>  -->
             <CCol sm="12" lg="3">
                <label for="#"> {{ $t('Month') }} </label>
                <v-select
                    :options="MonthsList"
                    v-model="HRTimeSheet.Month"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="label"
                    class="fname-select achievement-input"
                    @input="FillDetailInfo"
                    :disabled="DisabledItem()"
                ></v-select>
              </CCol>
             <CCol sm="12" lg="3">
                <label for="#"> {{ $t('Year') }} </label>
                <v-select
                    :options="YearsList"
                    v-model="HRTimeSheet.Year"
                    :reduce="(item) => item.name"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select achievement-input"
                    @input="FillDetailInfo"
                    :disabled="DisabledItem()"
                ></v-select>
              </CCol>
            </CRow>
            <b-row>
              <b-col lg="6" sm="12">
                <label for="#"> {{ $t('OrganizationAccount') }} </label>
                <v-select
                    :options="OrganizationAccountList"
                    v-model="HRTimeSheet.organizationaccountid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="code"
                    class="fname-select achievement-input"
                    :disabled="DisabledItem()"
                ></v-select>
              </b-col>
              <b-col lg="6" sm="12">
                <label for="#"> {{ $t('Department') }} </label>
                <v-select
                    :options="DepartmentList"
                    v-model="HRTimeSheet.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select achievement-input"
                    :disabled="DisabledItem()"
                ></v-select>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <CCol lg="6">
                <CInput
                  autocomplete="text"
                  :label="$t('detailinfo')"
                  v-model="HRTimeSheet.detailinfo"
                  class=""
                ></CInput>
              </CCol>
            </b-row>
          </ValidationObserver>
        </CCardBody>

        <CRow v-if="HRTimeSheet.CanSave" class="px-3">
          <CCol lg="6" sm="12" class="achievement-input">
            <b-input-group class="mt-2" size="sm">
              <b-input :placeholder="$t('person')" v-model="filter.Search"></b-input>
              <b-input-group-append>
                <b-button variant="info" @click="onFilter"> <b-icon icon="search" v-if="!filterLoading"></b-icon> <b-spinner small v-if="filterLoading"></b-spinner> </b-button>
              </b-input-group-append>
            </b-input-group>
          </CCol>
          <CCol class="text-lg-right" lg="6" sm="12">
            <CButton class="sm-1 mr-2" size="sm" color="info" @click="FillTable">
              <b-icon icon="list-ul" v-if="!FillLoading"></b-icon>
              <b-spinner small v-if="FillLoading"></b-spinner>
              {{ $t("Fill") }}
            </CButton>
            <CButton
              class="xl-1"
              size="sm"
              color="danger"
              @click="$bvModal.show('clearModal')"
            >
              <b-icon icon="exclamation-octagon"></b-icon>
              {{ $t("Clear") }}
              
              
            </CButton>
              <b-modal :id="'clearModal' " hide-footer>
                <template v-slot:modal-title>{{ $t("WantClear") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('clearModal')"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton @click="ClearTable" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
          </CCol>
        </CRow>
        <b-row class="mt-3">
          <b-col>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="HRTimeSheet.departmentid === 0 ? HRTimeSheetTablesFields : HRTimeSheetDepartmentTables"
                :items="HRTimeSheetTables"
                class="text-center"
                style="vertical-align:middle"
                bordered
                :busy="isBusy"
               
                show-empty
                no-border-collapse
                sticky-header="60vh"
              >
                 <template #cell(days)="{item}">
                    <p class="m-0 p-0" style="white-space:nowrap">
                        {{ item.factdays }} / <b>{{ item.plandays }} </b>
                    </p>
                </template>
                <template #cell(hours)="{item}">
                  <p class="m-0 p-0" style="white-space:nowrap">
                    {{ item.facthours }} / <b>{{ item.planhours }} </b>
                  </p>
                </template>
                <template #cell(employmenttypename)="{item}">
                  <p class="m-0 p-0" style="white-space:nowrap">
                    {{ item.employmenttypename }} <b>({{ item.employeeenrolmentid }} )</b>
                  </p>
                </template>
                <template #cell(fromtodate)="{item}">
                  <p class="m-0 p-0" style="white-space:nowrap">
                    {{ item.startdate ? item.startdate.split('.')[0] : ' ' }} - {{ item.startdate ? item.enddate.split('.')[0] : '' }}
                  </p>
                </template>
                <template #cell(actions)="{item}">
                  <div class="text-center">
                    <b-link
                      @click="EditItem1(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil" ></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="$bvModal.show('deleteModal' + item.id)"
                    >
                      <b-icon icon="trash" ></b-icon>
                    </b-link>
                    <b-modal :id="'deleteModal' + item.id" hide-footer>
                    <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                    <div class="d-block text-right">
                      <CButton
                        @click="$bvModal.hide('deleteModal' + item.id)"
                        color="danger"
                        class="mr-2"
                      >
                        <b-icon icon="x"></b-icon>
                        {{ $t("NotAccept") }}
                      </CButton>
                      <CButton @click="DeleteTableItem(item)" color="success">
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
            </div>
          </b-col>
        </b-row>
        <b-row class="mx-1 mb-3">
          <b-col>
            <div>
                <div class="pagination-number" style="float:left;font-size:12px">
                {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
                {{ lastNumber }} {{ $t("of") }}
                {{ totalRows }}
                </div>
                <div class="page-limit">
                  <div style="float:left" class="per-page ml-2 mr-2 mt-n1">
                    <b-form-select
                        v-model="filter.PageLimit"
                        id="PageLimitSelect"
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
          </b-col>
        </b-row>
        <b-modal id="AddModal" size="xl" :title="$t('HRTimeSheetTables')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
          <b-row class="mb-0">
            <b-col >
              <div class="form-group form-row mb-0 py-1 " :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Person")
                  }}
                </label>
                <div class="col-sm-8 d-flex">
                  <c-input style="width:100%" class="mb-0" disabled v-model="tabrow.personname" v-if="editedIndex1 == -1">
                    <template #append>
                      <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> {{ tabrow.personname }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Department")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="DepartmentList"
                    v-model="tabrow.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="editedIndex1 == -1"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> {{ tabrow.departmentname }} </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("Position")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="PositionList"
                    v-model="tabrow.positionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="editedIndex1 == -1"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> {{ tabrow.positionname }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("employeeenrolment")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="EmployeeEnrolmentList"
                    v-model="tabrow.employeeenrolmentid"
                    :reduce="(item) => item.personid"
                    :placeholder="$t('ChooseBelow')"
                    label="employeeenrolmentid"
                    disabled
                    v-if="editedIndex1 == -1"
                  ></v-select>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> {{ tabrow.employeeenrolmentid }} </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("organizationaccount")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="OrganizationAccountList"
                    v-model="tabrow.organizationaccountid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="code"
                    v-if="editedIndex1 == -1"
                  ></v-select>
                  <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> {{ tabrow.organizationaccountid ? OrganizationAccountList.filter(item => item.id === tabrow.organizationaccountid)[0].code : null }} </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("workschedule")
                  }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="WorkScheduleList"
                    v-model="tabrow.workscheduleid"
                    :reduce="(item) => item.id"
                    disabled
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-if="editedIndex1 == -1"
                  ></v-select>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.workscheduleid  ? WorkScheduleList.filter(item => item.id === tabrow.workscheduleid)[0].name : null }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("startdate")
                  }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.startdate"
                    disabled
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                    v-if="editedIndex1 == -1"
                  ></date-picker>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.startdate }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("enddate")
                  }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow.enddate"
                    size="sm"
                    disabled
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    v-if="editedIndex1 == -1"
                    style="width:100%"
                  ></date-picker>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.enddate }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("factdays")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.factdays" class="mb-0" v-if="editedIndex1 == -1" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.factdays }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("facthours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input v-model="tabrow.facthours" class="mb-0" v-if="editedIndex1 == -1" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.facthours }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("dayoffhours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.dayoffhours" class="mb-0" v-if="editedIndex1 == -1" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.dayoffhours }} 
                  </a>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="form-group form-row mb-0 py-1">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("nighthours")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input  v-model="tabrow.nighthours" class="mb-0" v-if="editedIndex1 == -1" disabled></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.nighthours }} 
                  </a>
                </div>
              </div>
            </b-col>
          </b-row>
           <b-row>
            <b-col>
              <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff' }">
                <label class="col-form-label col-sm-4">
                  {{
                  $t("detailinfo")
                  }}
                </label>
                <div class="col-sm-8">
                  <c-input v-model="tabrow.detailinfo" class="mb-0" v-if="editedIndex1 == -1"></c-input>
                  <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1"> 
                      {{ tabrow.detailinfo }} 
                  </a>
                </div>
              </div>
              
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="mt-3"> 
            <b-col>
              <b-table
                :fields="DaysTables"
                :items="tabrow.DaysTable"
                class="bg-color-table text-center mx-3"
                style="vertical-align:middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
                small
              >
                <template #cell(ondate)="{item}"> 
                  <p class="m-0 p-0" style="white-space : nowrap">
                    {{ item.ondate.split('.')[0] }}  <b> ( {{ getWeekday(item) }} ) </b>
                  </p> 
                </template>
                <template #cell(timesheetindicatorname)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.timesheetindicatorname }} </p>
                  <v-select
                  v-if="item.Status == 2 || item.Status == 1"
                    :options="TimeSheetIndicator"
                    v-model="item.timesheetindicatorid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </template>
                <template #cell(plandays)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.plandays }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.plandays" size="sm"></c-input>
                </template>
                 <template #cell(planhours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.planhours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.planhours" size="sm"></c-input>
                </template>
                 <template #cell(factdays)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.factdays }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2"  v-model="item.factdays" size="sm"></c-input>
                </template>
                 <template #cell(facthours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.facthours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2" @input="changehrtime(item)" v-model="item.facthours" size="sm"></c-input>
                </template>
                 <template #cell(dayoffhours)="{item}">
                  <p class="m-0 p-0" v-if="item.Status == 0"> {{ item.dayoffhours }} </p>
                  <c-input class="mb-0" v-if="item.Status == 1 || item.Status == 2" @input="changehrtime(item)" v-model="item.dayoffhours" size="sm"></c-input>
                </template>
                 <template #cell(nighthours)="{item}">
                  <!-- <p class="m-0 p-0" > {{ item.nighthours }} </p> -->
                  <c-input class="mb-0" v-if="item.Status === 2 || item.Status === 1"  @input="changehrtime(item)" v-model="item.nighthours" size="sm"></c-input>
                </template>
                <template #cell(actions)="{item}">
                  <div class="text-center">
                    <b-link
                      @click="EditItem(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil" ></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseTablesModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddTable">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
        </b-modal>
        <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
          <employee-list-component :ondate="HRTimeSheet.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddPerson(personvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
        </b-modal>
        <b-modal id="DaysTableModal" size="lg" :title="$t('DaysTable')" hide-footer no-close-on-backdrop>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("ondate")
                  }}
                </label>
                <div class="col-sm-9">
                  <date-picker
                    v-model="tables.ondate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                  ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("timesheetindicator")
                  }}
                </label>
                <div class="col-sm-9">
                  <v-select
                    :options="TimeSheetIndicator"
                    v-model="tables.timesheetindicatorid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <c-input horizontal v-model="tables.plandays" :label="$t('plandays')"></c-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <c-input horizontal v-model="tables.planhours" :label="$t('planhours')"></c-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <c-input horizontal v-model="tables.factdays" :label="$t('factdays')"></c-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <c-input horizontal v-model="tables.facthours" :label="$t('facthours')"></c-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <c-input horizontal v-model="tables.dayoffhours" :label="$t('dayoffhours')"></c-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <c-input horizontal v-model="tables.nighthours" :label="$t('nighthours')"></c-input>
            </b-col>
          </b-row>
          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="CloseDaysTableModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddDaysTable">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
        </b-modal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'HRTimeSheet' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="HRTimeSheet.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
      <history-detail-info :history="history"></history-detail-info>
    </CCol>
  </CRow>
</template>

<script>
import HRTimeSheetService from "@/services/HRTimeSheet.service";
import OrganizationService from '@/services/organization.service'
import EmployeeListComponent from '@/components/EmployeeList'
import DepartmentService from '@/services/Department.service'
import PositionService from '@/services/Position.service'
import TimeSheetIndicatorService from '@/services/TimesheetIndicator.service'
import HelperService from '@/services/helper.service'
import WorkScheduleService from '@/services/WorkSchedule.service'
import HistoryDetailInfo from "@/components/HistoryDetailInfo";
export default {
  components : {EmployeeListComponent,HistoryDetailInfo},
  data() {
    return {
      history: [],
      SaveLoading: false,
      HRTimeSheet: {},
      allSignupErrors: {},
      OrganizationAccountList : [],
      WorkScheduleList : [],
      DepartmentList : [],
      PositionList : [],
      YearsList : [],
      TimeSheetIndicator : [],
      EmployeeEnrolmentList : [],
       filterLoading : false,
      MonthsList: [
        {id : 1,label:this.$t('January')}, 
        {id : 2,label:this.$t('February')},
        {id : 3,label:this.$t('March')},
        {id : 4,label:this.$t('April')},
        {id : 5,label:this.$t('May')},
        {id : 6,label:this.$t('June')},
        {id : 7,label:this.$t('July')},
        {id : 8,label:this.$t('August')},
        {id : 9,label:this.$t('September')},
        {id : 10,label:this.$t('October')},
        {id : 11,label:this.$t('November')},
        {id : 12,label:this.$t('December')},
      ],
      
      HRTimeSheetTables : [],
      HRTimeSheetTablesFields : [
        {key : 'personname',label:this.$t('personname')},
        {key:  'departmentname',label : this.$t('departmentname')},
        {key : 'positionname',label:this.$t('positionname')},
        {key : 'documentid',label : this.$t('documentid')},

        {key : 'employmentrate',label : this.$t('employmentrate')},
        {key : 'employmenttypename',label : this.$t('employmenttypename'),thClass:'text-center'},
        {key : 'fromtodate',label : this.$t('fromtodate')},
        {key : 'days', label :this.$t('days')},
        {key : 'hours', label : this.$t('hours')},
        {key : 'dayoffhours',label : this.$t('dayoffhours')},
        {key : 'nighthours',label : this.$t('nighthours')},
        {key : 'detailinfo',label : this.$t('detailinfo')},
        {key : 'actions',label : this.$t('actions')}
      ],
      HRTimeSheetDepartmentTables : [
        {key : 'personname',label:this.$t('personname')},
        {key : 'positionname',label:this.$t('positionname')},
       /*  {key : 'employeeenrolmentid',label:this.$t('employeeenrolmentid')}, */
        {key : 'documentid',label : this.$t('documentid')},
        {key : 'employmentrate',label : this.$t('employmentrate')},
        {key : 'employmenttypename',label : this.$t('employmenttypename'),thClass:'text-center'},
        {key : 'fromtodate',label : this.$t('fromtodate')},
        {key : 'days', label :this.$t('days')},
        {key : 'hours', label : this.$t('hours')},
        {key : 'dayoffhours',label : this.$t('dayoffhours')},
        {key : 'nighthours',label : this.$t('nighthours')},
        {key : 'detailinfo',label : this.$t('detailinfo')},
        {key : 'actions',label : this.$t('actions')}
      ],
      tabrow : {
        id : 0,
        ownerid : 0,
        departmentid : 0,
        departmentname : '',
        personid : 0,
        personname : '',
        positionid : 0,
        positionname : '',
        employeeenrolmentid : 0,
        organizationaccountid : 0,
        workscheduleid : 0,
        employmentrate : 0,
        employmenttypeid : 0,
        employmenttypename : '',
        plandays : 0,
        planhours : 0,
        factdays : 0,
        facthours : 0,
        dayoffhours : 0,
        nighthours : 0,
        detailinfo : '',
        startdate : "",
        enddate : "",
        tableid : 0,
        documentid : 0,
        documentinfo : "",
        Status : 1,
        DaysTable : []
      },
      tables:{
        id : 0,
        ownerid : 0,
        timesheetindicatorid : 0,
        timesheetindicatorname : '',
        ondate : '',
        plandays : 0,
        planhours : 0,
        factdays : 0,
        facthours : 0,
        dayoffhours : 0,
        nighthours : 0,
        Status : 1
      },
      personvalue : {},
      DaysTables : [
        {key : 'ondate',label : this.$t('ondate')},
        {key : 'timesheetindicatorname',label :this.$t('timesheetindicator')},
        // {key : 'factdays',label : this.$t('factdays')},
        {key : 'facthours',label : this.$t('facthours')},
        {key : 'dayoffhours',label : this.$t('dayoffhours')},
        {key : 'nighthours',label : this.$t('nighthours')},
        // {key : 'actions',label : this.$t('actions')}
      ],
      editedIndex: -1,
      editedIndex1 : -1,
      FillLoading : false,
      HelperDaysTable : {},
      filter : {
        Search : '',
        SortColumn : '',
        OrderType : '',
        PageNumber : 1,
        PageLimit : 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      totalRows : 0,
      isBusy : false,
      newdocid : 0
    };
  },
  created() {
    
    this.loaddata(this.$route.params.id);
    
    OrganizationService.GetOrganizationAccountList().then(res => {
      this.OrganizationAccountList = res.data
    })
    DepartmentService.GetAll().then(res => {
      this.DepartmentList = res.data
    })
    PositionService.GetAll1().then(res => {
      this.PositionList = res.data
    })
    TimeSheetIndicatorService.GetAll().then(res => {
      this.TimeSheetIndicator = res.data
    })
    WorkScheduleService.GetAll().then(res => {
      this.WorkScheduleList = res.data
    })
      var d = new Date()
        this.YearsList = [
            {id : 1,name : d.getFullYear() - 1},
            {id : 2,name : d.getFullYear()},
            {id : 3,name : d.getFullYear() + 1}
        ]
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
    GetHRTimeSheetTables(ownerid){
      const { Search,SortColumn,OrderType,PageNumber,PageLimit } = this.filter
      this.isBusy = true
      HRTimeSheetService.GetHRTimeSheetTables(
        ownerid,
        Search,
        SortColumn,
        OrderType,
        PageNumber,
        PageLimit
      ).then(res => {
        this.HRTimeSheetTables = res.data.rows
        this.isBusy = false
        this.totalRows = res.data.total
      }).catch(error => {
        this.makeToast(error.response.data.error || error,this.$t('message'),'danger')
      })
    },
    onFilter(){
        this.filterLoading = true
        setTimeout(() => {
           this.loaddata(this.HRTimeSheet.id);
            this.filterLoading = false
        },1000)
    },
    changehrtime(item){
      this.calculate()
    },
    DisabledItem() {
      if (this.totalRows) {
        return true;
      } else {
        return false;
      }
    },
    calculate(){
      
      var self = this
       self.tabrow.facthours = 0
       self.tabrow.dayoffhours = 0
       self.tabrow.nighthours = 0
       self.tabrow.factdays = 0
       
      self.tabrow.DaysTable.forEach(function(item){
        if(item.Status !== 3){
          self.tabrow.facthours =  self.tabrow.facthours*1 + item.facthours*1
          self.tabrow.dayoffhours = self.tabrow.dayoffhours*1 + item.dayoffhours*1
          self.tabrow.nighthours = self.tabrow.nighthours*1 + item.nighthours*1
          if(item.facthours != 0){
            self.tabrow.factdays = self.tabrow.factdays*1 + 1
          }
        }
      })
      
    },
    getWeekday(item){
      var d = new Date(item.ondate.split('.')[2],item.ondate.split('.')[1] - 1,item.ondate.split('.')[0]).getDay()
      if(d === 0){
        return 'Вс'
      }
      if(d === 1){
        return 'Пн'
      }
      if(d === 2){
        return 'Вт'
      }
      if(d === 3){
        return 'Ср'
      }
      if(d === 4){
        return 'Чт'
      }
      if(d === 5){
        return 'Пт'
      }
      if(d === 6){
        return 'Сб'
      }
    },
    FillTable(){
      var self = this;
      if(this.totalRows > 0)
      {
           this.makeToast(this.$t("ClearTable"), this.$t("Error"), "danger");
                return false;
      }
            if (
                self.HRTimeSheet.docdate === null ||
                self.HRTimeSheet.docdate === undefined ||
                self.HRTimeSheet.docdate === 0 ||
                self.HRTimeSheet.docdate === ""
            ) {
                self.makeToast(
                self.$t("DateNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheet.Month === null ||
                self.HRTimeSheet.Month === undefined ||
                self.HRTimeSheet.Month === 0 ||
                self.HRTimeSheet.Month === ""
            ) {
                self.makeToast(
                self.$t("onmonthNotSelect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheet.departmentid === null ||
                self.HRTimeSheet.departmentid === undefined ||
                self.HRTimeSheet.departmentid === 0 ||
                self.HRTimeSheet.departmentid === ""
            ) {
                self.makeToast(
                self.$t("departmentNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheet.organizationaccountid === null ||
                self.HRTimeSheet.organizationaccountid === undefined ||
                self.HRTimeSheet.organizationaccountid === 0 ||
                self.HRTimeSheet.organizationaccountid === ""
            ) {
                self.makeToast(
                self.$t("organizationaccountNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
      /* var date = '01' + '.' + self.HRTimeSheet.Month + '.' + self.HRTimeSheet.Year; */
      self.FillLoading = true
      HRTimeSheetService.HrTimeSheetFill(self.HRTimeSheet).then(res => {
      /*   this.HRTimeSheet.Tables = res.data */
      self.FillLoading = false
      self.HRTimeSheet.formonth = res.data.formonth;
      self.HRTimeSheet = res.data;
      self.newdocid = res.data.id
            self.loaddata(self.HRTimeSheet.id);
      }).catch(error => {
        this.FillLoading = false
        this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
      })
      this.calculate()
    },
    ClearTable(){
      var self = this;
      HRTimeSheetService.ClearHrTimeSheet(self.HRTimeSheet).then(res => {

      self.HRTimeSheet.formonth = res.data.formonth;
      self.HRTimeSheet = res.data;
        self.loaddata(self.HRTimeSheet.id);
      }).catch(error => {
        this.FillLoading = false
        this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
      })
      this.$bvModal.hide('clearModal')
    },
    ChangePerson(){
      if(!!this.tabrow.personid){
        HelperService.GetEmployeeEnrolment(this.tabrow.personid).then(res => {
          this.EmployeeEnrolmentList = res.data
          this.tabrow.employeeenrolmentid = res.data[0].employeeenrolmentid;
          this.tabrow.positionid = res.data[0].positionid;
          this.tabrow.positionname = res.data[0].positionname
        })
      }
    },
    FillDetailInfo(){
      if(this.HRTimeSheet.Year === null) return this.HRTimeSheet.Year = ''
      if(this.HRTimeSheet.Month === null) return this.HRTimeSheet.Month = ''
      var monthname = this.MonthsList.filter(item => item.id === this.HRTimeSheet.Month)[0].label
      this.HRTimeSheet.detailinfo = `Табель за ${monthname} месяц ${this.HRTimeSheet.Year} года`
    },
    check(){
    var self = this;
      if (
        self.HRTimeSheet.docnumber === 0 ||
        self.HRTimeSheet.docnumber === null ||
        self.HRTimeSheet.docnumber === undefined ||
        self.HRTimeSheet.docnumber === ""
      ) {
        this.makeToast(this.$t("DocNumberNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.HRTimeSheet.Date === 0 ||
        self.HRTimeSheet.Date === null ||
        self.HRTimeSheet.Date === undefined ||
        self.HRTimeSheet.Date === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
            if (
        self.HRTimeSheet.formonth === 0 ||
        self.HRTimeSheet.formonth === null ||
        self.HRTimeSheet.formonth === undefined ||
        self.HRTimeSheet.formonth === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheet.Year === 0 ||
        self.HRTimeSheet.Year === null ||
        self.HRTimeSheet.Year === undefined ||
        self.HRTimeSheet.Year === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheet.Month === 0 ||
        self.HRTimeSheet.Month === null ||
        self.HRTimeSheet.Month === undefined ||
        self.HRTimeSheet.Month === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheet.organizationaccountid === 0 ||
        self.HRTimeSheet.organizationaccountid === null ||
        self.HRTimeSheet.organizationaccountid === undefined ||
        self.HRTimeSheet.organizationaccountid === ""
      ) {
        this.makeToast(this.$t("organizationaccountidNotSelected"), this.$t("Error"), "danger");
        return false;
      }
    if (
        self.HRTimeSheet.departmentid === 0 ||
        self.HRTimeSheet.departmentid === null ||
        self.HRTimeSheet.departmentid === undefined ||
        self.HRTimeSheet.departmentid === ""
      ) {
        this.makeToast(this.$t("departmentNotSelected"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheet.detailinfo === 0 ||
        self.HRTimeSheet.detailinfo === null ||
        self.HRTimeSheet.detailinfo === undefined ||
        self.HRTimeSheet.detailinfo === ""
      ) {
        this.makeToast(this.$t("detailinfoNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
    },
    EditItem1(item){
      this.$router.push({
        name : 'EditTabRowHRTimeSheet',
        params : {
          id : item.id,
        },
        query : {
          newdocid : this.newdocid
        }
      })
      
    },
    DeleteTableItem(item){
      HRTimeSheetService.DeleteHRTimeSheetTable(item.id).then(res => {
        this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
        this.loaddata(this.HRTimeSheet.id);
      }).catch(error => {
        this.FillLoading = false
        this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
      })
      
    },
    CloseTablesModal(){
      this.$bvModal.hide('AddModal')
      this.HRTimeSheet.Tables[this.editedIndex1].DaysTable = JSON.parse(localStorage.getItem('HrTimeSheet'))
      // this.HRTimeSheet.Tables[this.editedIndex1].DaysTable = this.HelperDaysTable
      this.$nextTick(() => {
        this.tabrow = {
          id : 0,
          ownerid : 0,
          departmentid : 0,
          departmentname : '',
          personid : 0,
          personname : '',
          positionid : 0,
          positionname : '',
          employeeenrolmentid : 0,
          employmenttypeid : 0,
          employmenttypename : '',
          organizationaccountid : 0,
          workscheduleid : 0,
          employmentrate : 0,
          plandays : 0,
          planhours : 0,
          factdays : 0,
          facthours : 0,
          dayoffhours : 0,
          nighthours : 0,
          detailinfo : '',
          startdate : "",
          enddate : "",
          tableid : 0,
          documentid : 0,
          documentinfo : '',
          Status : 1,
          DaysTable : []
        };
        this.editedIndex1 = -1;
        localStorage.removeItem('HrTimeSheet')
      });
    },
    AddTable(){
        var self = this;
        if (
          self.tabrow.personid === null ||
          self.tabrow.personid === undefined ||
          self.tabrow.personid === 0 ||
          self.tabrow.personid === ""
        ) {
          self.makeToast(
            self.$t("personNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.departmentid === null ||
          self.tabrow.departmentid === undefined ||
          self.tabrow.departmentid === 0 ||
          self.tabrow.departmentid === ""
        ) {
          self.makeToast(
            self.$t("departmentNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.positionid === null ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === 0 ||
          self.tabrow.positionid === ""
        ) {
          self.makeToast(
            self.$t("positionNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if(
          self.tabrow.employeeenrolmentid === null ||
          self.tabrow.employeeenrolmentid === undefined ||
          self.tabrow.employeeenrolmentid === 0 ||
          self.tabrow.employeeenrolmentid === ""
        )
          {
          self.makeToast(
            self.$t("employeeenrolmentNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if(
          self.tabrow.organizationaccountid === null ||
          self.tabrow.organizationaccountid === undefined ||
          self.tabrow.organizationaccountid === 0 ||
          self.tabrow.organizationaccountid === ""
        )
          {
          self.makeToast(
            self.$t("organizationaccountNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if(
          self.tabrow.workscheduleid === null ||
          self.tabrow.workscheduleid === undefined ||
          self.tabrow.workscheduleid === 0 ||
          self.tabrow.workscheduleid === ""
        )
          {
          self.makeToast(
            self.$t("workscheduleNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.departmentname = self.DepartmentList.filter(item => item.id === self.tabrow.departmentid)[0].name
        self.tabrow.positionname = self.PositionList.filter(item => item.id === self.tabrow.positionid)[0].name
        /* self.tabrow.employeeenrolmentid = self.EmployeeEnrolmentList.filter(item => item.employeeenrolmentid === self.tabrow.employeeenrolmentid)[0].employeeenrolmentid */
        if (self.editedIndex1 > -1) {
        Object.assign(
          self.HRTimeSheet.Tables[self.editedIndex1],
          self.tabrow
        );
      } else {
        self.HRTimeSheet.Tables.push(self.tabrow);
      }
      self.tabrow = {
          id : 0,
          ownerid : 0,
          departmentid : 0,
          departmentname : '',
          personid : 0,
          personname : '',
          positionid : 0,
          positionname : '',
          employeeenrolmentid : 0,
          employmenttypeid : 0,
          employmenttypename : '',
          organizationaccountid : 0,
          workscheduleid : 0,
          employmentrate : 0,
          plandays : 0,
          planhours : 0,
          factdays : 0,
          facthours : 0,
          dayoffhours : 0,
          nighthours : 0,
          detailinfo : '',
          Status : 1,
          startdate : "",
          enddate : '',
          tableid : 0,
          documentid : 0,
          documentinfo : '',
          DaysTable : []
        };
        
        self.$bvModal.hide('AddModal')
        localStorage.removeItem('HrTimeSheet')
    },
    DeleteItem(item){
      item.Status = 3
    },
    EditItem(item) {
      if(item.Status === 0){
        item.Status = 2
      }
      this.editedIndex = this.tabrow.DaysTable.indexOf(item);
      this.tables = Object.assign({}, item);
      this.$bvModal.show("DaysTableModal");
    },
    OpenAddModal(){
      // this.$bvModal.show('AddModal')
      var self = this
      self.$router.push({
        name : 'EditTabRowHRTimeSheet',
        params : {
          id : 0,
          data : self.HRTimeSheet
        },
      })
      /* var date = '01' + '.' + this.HRTimeSheet.Month + '.' + this.HRTimeSheet.Year; */
      // HRTimeSheetService.HrTimeSheetFill(this.HRTimeSheet).then(res => {
      //   this.tabrow.DaysTable = res.data[0].DaysTable
      //   this.calculate()
      // })
      
    },
    OpenPersonModal(){
      this.$bvModal.show('PersonModal')
    },
    CloseDaysTableModal() {
      this.$bvModal.hide("DaysTableModal");
      this.$nextTick(() => {
        this.tables = {
          id : 0,
          ownerid : 0,
          timesheetindicatorid : 0,
          ondate : '',
          plandays : 0,
          planhours : 0,
          factdays : 0,
          facthours : 0,
          dayoffhours : 0,
          nighthours : 0,
          Status : 1
        };
        this.editedIndex = -1;
      });
    },
    AddDaysTable(){
      var self = this;
      if (
        self.tables.ondate === null ||
        self.tables.ondate === undefined ||
        self.tables.ondate === 0 ||
        self.tables.ondate === ""
      ) {
        self.makeToast(
          self.$t("OndateNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tables.timesheetindicatorid === null ||
        self.tables.timesheetindicatorid === undefined ||
        self.tables.timesheetindicatorid === 0 ||
        self.tables.timesheetindicatorid === ""
      ) {
        self.makeToast(
          self.$t("timesheetindicatoridNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if(!!self.tables.timesheetindicatorid){
        self.tables.timesheetindicatorname = self.TimeSheetIndicator.filter(item => item.id === self.tables.timesheetindicatorid)[0].name
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.tabrow.DaysTable[self.editedIndex],
          self.tables
        );
      } else {
        self.tabrow.DaysTable.push(self.tables);
      }
      self.tables = {
        id : 0,
        ownerid : 0,
        timesheetindicatorid : 0,
        ondate : '',
        plandays : 0,
        planhours : 0,
        factdays : 0,
        facthours : 0,
        dayoffhours : 0,
        nighthours : 0,
        Status : 1
      };
      this.calculate()
      this.$bvModal.hide("DaysTableModal");
    },
    loaddata(id) {
      var self = this;
      HRTimeSheetService.Get(id).then((res) => {
        self.HRTimeSheet = res.data.HRTimeSheet;
        self.history = res.data.history;
        this.FillDetailInfo()
        this.GetHRTimeSheetTables(id)
      });
    },
    check() {
      return true;
    },
    SelectedItem(value){
      this.personvalue = value
    },
    OpenDaysTableModal(){
      this.$bvModal.show('DaysTableModal')
    },
    AddPerson(data){
      this.CloseEmployeeModal()
      this.tabrow.personid = data.personid
      this.tabrow.personname = data.personname
      this.tabrow.positionname = data.positionname
      this.tabrow.positionid = data.positionid
      this.tabrow.employeeenrolmentid = data.employeeenrolmentid
      this.tabrow.departmentid = data.departmentid
      this.tabrow.departmentname = data.departmentname
      this.tabrow.workscheduleid = data.workscheduleid
      this.tabrow.workschedule = data.workschedule

      //this.ChangePerson()
    },
    CloseEmployeeModal(){
      this.$bvModal.hide('PersonModal')
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      HRTimeSheetService.Update(self.HRTimeSheet)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "HRTimeSheet" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimeSheetTables(this.HRTimeSheet.id);
          }
      },
      },
      "filter.PageLimit": {
      handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimeSheetTables(this.HRTimeSheet.id);
          }
      },
    },
  },
};
</script>

<style>
</style>

<template>
  <b-container fluid>
      <b-row>
          <b-col>
              <CCard accent-color="primary" class="pb-4">
                  <CCardHeader>
                    <b-icon icon="pencil"></b-icon>
                    {{ $t("HRTimeSheetEdu") }}
                    <div class="card-header-actions">
                        <CLink
                        href="#"
                        class="card-header-action btn-close"
                        v-on:click="$router.push({ name: 'HRTimeSheetEdu' })"
                        >
                        <b-icon icon="x-circle"></b-icon>
                        </CLink>
                    </div>
                  </CCardHeader>
                  <c-card-body>
                      <b-row>
                          <b-col>
                              <label class="col-form-label col-sm-10">{{ $t("docnumber") }}</label>
                              <CInput v-model="HRTimeSheetEdu.docnumber"  />
                          </b-col>
                          <b-col>
                              <label class="col-form-label col-sm-10">{{ $t("docdate") }}</label>
                              <date-picker
                                v-model="HRTimeSheetEdu.docdate"
                                size="sm"
                                lang="ru"
                                :placeholder="$t('date')"
                                value-type="format"
                                format="DD.MM.YYYY"
                                style="width:100%"
                                :disabled="HRTimeSheetEduTables.length > 0"
                               ></date-picker>
                          </b-col>
                                       <b-col>
                <label for="#"> {{ $t('Month') }} </label>
                <v-select
                    :options="MonthsList"
                    v-model="HRTimeSheetEdu.Month"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="onChangeMonth"
                    :disabled="HRTimeSheetEduTables.length > 0"
                ></v-select>
              </b-col>
                           <b-col>
                <label for="#"> {{ $t('Year') }} </label>
                <v-select
                    :options="YearsList"
                    v-model="HRTimeSheetEdu.Year"
                    :reduce="(item) => item.name"
                    :placeholder="$t('ChooseBelow')"
                    :disabled="HRTimeSheetEduTables.length > 0"
                    label="name"
                ></v-select>
              </b-col>
                      </b-row>
                      <b-row>
                          <b-col>
                            <label for="#"> {{ $t('Department') }} </label>
                            <v-select
                                :options="DepartmentList"
                                v-model="HRTimeSheetEdu.departmentid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                :disabled="HRTimeSheetEduTables.length > 0"
                                label="name"
                            ></v-select>
                        </b-col>
                        <b-col>
                            <label for="#"> {{ $t('OrganizationAccount') }} </label>
                            <v-select
                                :options="OrganizationAccountList"
                                v-model="HRTimeSheetEdu.organizationaccountid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                :disabled="HRTimeSheetEduTables.length > 0"
                                label="code"
                            ></v-select>
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <CCol>
                            <CInput
                            autocomplete="text"
                            :label="$t('detailinfo')"
                            v-model="HRTimeSheetEdu.detailinfo"
                            :disabled="HRTimeSheetEduTables.length > 0"
                            ></CInput>
                        </CCol>
                      </b-row>
<!--                       <b-row>
                          <b-col class="text-right"> 
                              <b-button variant="primary" @click="$bvModal.show('AddModal')">
                                  <b-icon icon="plus"></b-icon> {{ $t('Add') }}
                              </b-button>
                          </b-col>
                      </b-row> -->
        <CRow v-if="HRTimeSheetEdu.CanSave">
          <CCol class="text-center">
             
              <CButton class="sm-1 mr-2" size="sm" color="info" @click="CheckFillTable">
               <b-icon icon="list-ul" v-if="!FillLoading"></b-icon>
                <b-spinner v-if="FillLoading" small></b-spinner>
                {{ $t("Fill") }}
              </CButton>
         
           
              <CButton
                class="xl-1 mr-2"
                size="sm"
                color="danger"
                @click="OpenClearTableModal"
              >
                <b-icon icon="exclamation-octagon"></b-icon>
                {{ $t("Clear") }}
                
              </CButton>
              <!-- <CButton
              :disabled="HRTimeSheetEduTables.length === 0"
                class="xl-1"
                size="sm"
                color="primary"
                @click="OpenModal"
              >
                <b-icon icon="plus"> </b-icon>
                {{ $t("Add") }}
              </CButton> -->
          </CCol>
        </CRow>
                      <b-row>
                          <b-col>
                              <b-input-group class="mt-2" size="sm">
                                  <b-input :placeholder="$t('person')"  v-model="filter.Search"></b-input>
                                  <b-input-group-append>
                                    <b-button variant="info" @click="onFilter"> <b-icon icon="search" v-if="!filterLoading"></b-icon> <b-spinner small v-if="filterLoading"></b-spinner> </b-button>
                                   </b-input-group-append>
                              </b-input-group>
                          </b-col>
                          <b-col>

                          </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col>
                            <b-table
                                :fields="HRTimeSheetEduTablesFields"
                                :items="HRTimeSheetEduTables"
                                class="text-center"
                                
                                style="vertical-align:middle"
                                bordered
                                :filter="filterbyperson"
                                responsive
                                :tbody-tr-class="rowClass"
                                sticky-header="60vh"
                                no-border-collapse
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
                            <template #cell(actions)="{item}">
                                <div class="text-center">
                                <b-link
                                    @click="EditItem3(item)"
                                    class="mr-2"
                                    v-c-tooltip="{ content: $t('Edit') }"
                                >
                                    <b-icon icon="pencil" ></b-icon>
                                </b-link>
                                <b-link
                                    class="mr-2"
                                    v-c-tooltip="{ content: $t('Delete') }"
                                    @click="DeleteItem(item)"
                                >
                                    <b-icon icon="trash" ></b-icon>
                                </b-link>
                                </div>
                            </template>
                            </b-table>
                        </b-col>
                      </b-row>
                      <b-modal :id="'clearModal'" hide-footer>
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
                      <b-row class="mx-1 mb-3">
          <b-col>
            <div>
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
          </b-col>
        </b-row>
                      <b-modal id="AddModal" size="xl" :title="$t('HRTimeSheetTables')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
                        <b-row>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{ backgroundColor : editedIndex3 > -1 ? '#eee' : '#fff'}">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("Person")
                                }}
                                </label>
                                <div class="col-sm-8 d-flex">
                                <c-input style="width:100%" disabled v-model="tabrow.personname" v-if="editedIndex3 == -1" >
                                    <template #append>
                                    <CButton @click="$bvModal.show('PersonModal')" size="sm" type="button" color="primary">
                                        <b-icon icon="three-dots"></b-icon>
                                    </CButton>
                                    </template>
                                </c-input>
                                <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex3 > -1">{{tabrow.personname}}</a>
                                </div>
                            </div>
                            </b-col>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor :  '#eee' }">
                                <label class="col-form-label col-sm-4" >
                                {{
                                $t("Department")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <v-select
                                    :options="DepartmentList"
                                    v-model="tabrow.departmentid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    disabled
                                    v-if="editedIndex3 == -1"
                                ></v-select> -->
                                <a style="color : blue; font-size: 16px;" class="h-100 d-flex align-items-center" >{{tabrow.departmentname}}</a>
                                </div>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor :'#fff' }">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("qualificationcategory")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <v-select
                                    :options="QualificationCategoryList"
                                    v-model="tabrow.qualificationcategoryid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    disabled
                                    v-if="editedIndex3 == -1"
                                ></v-select> -->
                                 <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ tabrow.qualificationcategoryname }} </a>
                                </div>
                            </div>
                            </b-col>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor :'#fff' }">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("employeeenrolment")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <v-select
                                    :options="EmployeeEnrolmentList"
                                    v-model="tabrow.employeeenrolmentid"
                                    :reduce="(item) => item.personid"
                                    :placeholder="$t('ChooseBelow')"
                                    label="employeeenrolmentid"
                                    disabled
                                    v-if="editedIndex3 == -1"
                                ></v-select> -->
                                 <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ tabrow.employeeenrolmentid }} </a>
                                </div>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor : '#eee' }">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("organizationaccount")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <v-select
                                    :options="OrganizationAccountList"
                                    v-model="tabrow.organizationaccountid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="code"
                                    disabled
                                    v-if="editedIndex3 == -1"
                                ></v-select> -->
                                 <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ tabrow.organizationaccountid ? OrganizationAccountList.filter(item => item.id == tabrow.organizationaccountid)[0].code : null }} </a>
                                </div>
                            </div>
                            </b-col>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor : '#eee' }">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("schoolsubject")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <v-select
                                    :options="SchoolSubjectList"
                                    v-model="tabrow.schoolsubjectid"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    disabled
                                     v-if="editedIndex3 == -1"
                                ></v-select> -->
                                 <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ tabrow.schoolsubjectname }} </a>
                                </div>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row >
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor :  '#fff' }" >
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("factdays")
                                }}
                                </label>
                                <div class="col-sm-8">
                                <!-- <c-input disabled v-model="tabrow.factdays"  v-if="editedIndex3 == -1"></c-input> -->
                                 <a style="color : blue;font-size : 16px" class="h-100 d-flex align-items-center" > {{ tabrow.factdays }} </a>
                                </div>
                            </div>
                            </b-col>
                            <b-col>
                            <div class="form-group form-row mb-0" :style="{backgroundColor : '#fff' }">
                                <label class="col-form-label col-sm-4">
                                {{
                                $t("facthours")
                                }}
                                </label>
                                <div class="col-sm-8" >
                                    <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center"  >{{
                                        $options.filters.currency(tabrow.facthours, {symbol: "", fractionCount: 2, })
                                        }}</a>
                               
                                </div>
                            </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col >
                                <div class="form-group form-row mb-0 py-1" :style="{ backgroundColor : editedIndex3 > -1 ? '#eee' : '#fff' }">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("detailinfo")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <c-input v-model="tabrow.detailinfo" class="mb-0" v-if="editedIndex3 == -1"></c-input>
                                    <a style="color : blue;font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex3 > -1"> 
                                        {{ tabrow.detailinfo }} 
                                    </a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-card no-body class="mt-3">
                            <b-tabs pills card v-model="tabIndex">
                                 <b-tab :title="$t('HRTimesheetEduGradeTables')" active>
                                    <!-- <b-table
                                        :fields="HRTimesheetEduGradeTables"
                                        :items="tabrow.HRTimesheetEduGradeTables"
                                        class="bg-color-table text-center mx-3"
                                        style="vertical-align:middle"
                                        bordered
                                        responsive
                                        :tbody-tr-class="rowClass"
                                        small
                                    >
                                        <template #head()></template>
                                        <template #cell(weekworkhours)="{item}">
                                            <custom-number-input
                                            
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrade(item)"  
                                                v-model="item.weekworkhours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(weekteachinghours)="{item}">
                                            <custom-number-input
                                            
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGradeteach(item)"  
                                                v-model="item.weekteachinghours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(hometeachinghours)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrade(item)"  
                                                v-model="item.hometeachinghours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(checknotebkhourssmall)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrade(item)"  
                                                :disabled="item.checknotebkhourssmall === 0"
                                                v-model="item.checknotebkhourssmall"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(checknotebkhourslarge)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrade(item)"  
                                                :disabled="item.checknotebkhourslarge === 0"
                                                v-model="item.checknotebkhourslarge"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(parttimehours)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrade(item)"  
                                                v-model="item.parttimehours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(missedworkhours)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGrademisse(item)"  
                                                v-model="item.missedworkhours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(missedteachinghours)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculateGradeteach(item)"  
                                                v-model="item.missedteachinghours"
                                            ></custom-number-input>
                                        </template> 
                                        <template #cell(planmonthworkhours)="{item}">
                                            <custom-number-input
                                            disabled
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                v-model="item.planmonthworkhours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(planmonthteachinghours)="{item}">
                                            <custom-number-input
                                            disabled
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                
                                                v-model="item.planmonthteachinghours"
                                            ></custom-number-input>
                                        </template>
                                         <template #cell(monthworkhours)="{item}">
                                            <custom-number-input
                                            disabled
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                v-model="item.monthworkhours"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(monthteachinghours)="{item}">
                                            <custom-number-input
                                            disabled
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                
                                                v-model="item.monthteachinghours"
                                            ></custom-number-input>
                                        </template>
                                    </b-table> -->
                                    <b-table-simple hover small bordered responsive="sm">
                                        <b-thead class="text-center" style="background-color:#CED2D8">
                                            <b-tr class="text-center align-items-center">
                                                <b-th rowspan="2" class="text-center align-middle">
                                                    {{ $t('orgschoolgradename') }}
                                                </b-th>
                                                <b-th class="text-center align-middle" rowspan="2">
                                                    {{ $t('studentcount') }}
                                                </b-th>
                                                <b-th class="text-center align-middle" rowspan="2">
                                                    {{ $t('isspecialized') }}
                                                </b-th>
                                                <b-th class="text-center" colspan="2">
                                                    {{ $t('week') }}
                                                </b-th>
                                                <b-th class="text-center align-middle" rowspan="2">
                                                    {{ $t('hometeachinghours') }}
                                                </b-th>
                                                <b-th class="text-center" colspan="2">
                                                    {{ $t('checknotebook') }}
                                                </b-th>
                                                <b-th class="text-center align-middle" rowspan="2">
                                                    {{ $t('parttimehours') }}
                                                </b-th>
                                                <b-th class="text-center" colspan="2">
                                                    {{ $t('missed') }}
                                                </b-th>
                                                <b-th class="text-center" colspan="2">
                                                    {{ $t('month') }}
                                                </b-th>
                                            </b-tr>
                                            <b-tr class="text-center">
                                                <b-th class="text-center">
                                                    {{ $t('workhours') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('teachinghours') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('hourssmall') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('hourslarge') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('workhours') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('teachinghours') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('workhours') }}
                                                </b-th>
                                                <b-th class="text-center">
                                                    {{ $t('teachinghours') }}
                                                </b-th>
                                            </b-tr>
                                        </b-thead>
                                        <b-tbody>
                                            <b-tr v-for="(item,index) in tabrow.HRTimesheetEduGradeTables" :key="index">
                                                <b-td class="text-center">
                                                    {{ item.orgschoolgradename }}
                                                </b-td>
                                                <b-td class="text-center">
                                                    {{ item.studentcount }}
                                                </b-td>
                                                <b-td class="text-center">
                                                    {{ item.isspecializedname }}
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        size="sm"
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrade(item)"  
                                                        v-model="item.weekworkhours"
                                                        disabled
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        disabled
                                                        @input="calculateGradeteach(item)"  
                                                        v-model="item.weekteachinghours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrade(item)"  
                                                        v-model="item.hometeachinghours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrade(item)"  
                                                        :disabled="item.checknotebkhourssmall === 0"
                                                        v-model="item.checknotebkhourssmall"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrade(item)"  
                                                        :disabled="item.checknotebkhourslarge === 0"
                                                        v-model="item.checknotebkhourslarge"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrade(item)"  
                                                        v-model="item.parttimehours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGrademisse(item)"  
                                                        v-model="item.missedworkhours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        @input="calculateGradeteach(item)"  
                                                        v-model="item.missedteachinghours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                     <custom-number-input
                                                        @input="ChangeMonthHours(item)"
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        v-model="item.monthworkhours"
                                                    ></custom-number-input>
                                                </b-td>
                                                <b-td class="text-center">
                                                    <custom-number-input
                                                         disabled
                                                        v-if="item.Status == 1 || item.Status == 2" 
                                                        v-model="item.monthteachinghours"
                                                    ></custom-number-input>
                                                </b-td>
                                            </b-tr>
                                        </b-tbody>
                                    </b-table-simple>
                                </b-tab>
                                <b-tab :title="$t('HRTimesheetEduDayTables')" >
                                    <b-table
                                    :fields="HRTimesheetEduDayTables"
                                    :items="tabrow.HRTimesheetEduDayTables"
                                    class="bg-color-table text-center mx-3"
                                    style="vertical-align:middle"
                                    bordered
                                    responsive
                                    :tbody-tr-class="rowClass"
                                    small
                                    >
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
                                        <template #cell(factdays)="{item}">
                                            <custom-number-input
                                                v-if="item.Status == 1 || item.Status == 2" 
                                                @input="calculate(item)"  
                                                v-model="item.factdays"
                                            ></custom-number-input>
                                        </template>
                                        <template #cell(ondate)="{item}"> 
                                            <p class="m-0 p-0" style="white-space : nowrap">
                                                {{ item.ondate.split('.')[0] }}  <b> ( {{ getWeekday(item) }} ) </b>
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
                                                @click="DeleteItem(item)"
                                            >
                                                <b-icon icon="trash" ></b-icon>
                                            </b-link>
                                            </div>
                                        </template>
                                    </b-table>
                                </b-tab>
                               
                            </b-tabs>
                        </b-card>
                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="primary" @click="AddTable">
                                    {{$t('Save')}}
                                </b-button>
                                <b-button  variant="danger" @click="CloseTablesModal">
                                    {{$t('back')}}
                                </b-button>
                                
                            </c-col>
                        </c-row>
                      </b-modal>
                      <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
                        <employee-list-component :ondate="HRTimeSheetEdu.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
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
                                    v-model="tables1.ondate"
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
                                        v-model="tables1.timesheetindicatorid"
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
                            <c-input horizontal v-model="tables1.plandays" :label="$t('plandays')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <c-input horizontal v-model="tables1.planhours" :label="$t('planhours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <c-input horizontal v-model="tables1.factdays" :label="$t('factdays')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                            <c-input horizontal v-model="tables1.facthours" :label="$t('facthours')"></c-input>
                            </b-col>
                        </b-row>
<!--                         <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables1.dayoffhours" :label="$t('dayoffhours')"></c-input>
                            </b-col>
                        </b-row> -->
<!--                         <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables1.nighthours" :label="$t('nighthours')"></c-input>
                            </b-col>
                        </b-row> -->
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
                    <b-modal id="GradeTablesModal" size="lg" :title="$t('GradeTablesModal')" hide-footer no-close-on-backdrop>
                        <b-row>
                            <b-col>
                                <div class="form-group form-row mb-0">
                                    <label class="col-form-label col-sm-3">
                                    {{
                                    $t("schoolgradegroup")
                                    }}
                                    </label>
                                    <div class="col-sm-9">
                                    <v-select
                                        :options="SchoolGradeGroupList"
                                        v-model="tables2.schoolgradegroupid"
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
                                <c-input horizontal v-model="tables2.weekworkhours" :label="$t('weekworkhours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.weekteachinghours" :label="$t('weekteachinghours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.hometeachinghours" :label="$t('hometeachinghours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.checknotebkhourssmall" :label="$t('checknotebkhourssmall')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.checknotebkhourslarge" :label="$t('checknotebkhourslarge')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.parttimehours" :label="$t('parttimehours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.missedworkhours" :label="$t('missedworkhours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.missedteachinghours" :label="$t('missedteachinghours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.monthworkhours" :label="$t('monthworkhours')"></c-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <c-input horizontal v-model="tables2.monthteachinghours" :label="$t('monthteachinghours')"></c-input>
                            </b-col>
                        </b-row>
                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="danger" @click="CloseGradeTablesModal">
                                    {{$t('back')}}
                                </b-button>
                                <b-button variant="primary" @click="AddGradeTables">
                                    {{$t('Add')}}
                                </b-button>
                            </c-col>
                        </c-row>
                    </b-modal>
                  </c-card-body>
                  <c-card-footer>
                      <b-row>
                          <b-col class="text-left">
                              <b-button variant="danger" @click="$router.push({name : 'HRTimeSheetEdu'})">
                                  <b-icon icon="arrow-left-short"></b-icon> {{ $t('Back') }}
                              </b-button>
                          </b-col>
                          <b-col class="text-right">
                              <b-button variant="success" @click="SaveDate">
                                  <b-icon icon="check"></b-icon> {{ $t('Save') }}
                              </b-button>
                          </b-col>
                      </b-row>
                  </c-card-footer>
              </CCard>
          </b-col>
         
      </b-row>
       <history-detail-info :history="history"></history-detail-info>
  </b-container>
</template>

<script>
import HRTimeSheetEduService from '@/services/HRTimeSheetEdu.service'
import DepartmentService from '@/services/Department.service'
import OrganizationService from '@/services/organization.service'
import QualificationCategoryService from '@/services/QualificationCategory.service'
import SchoolSubjectService from '@/services/SchoolSubject.service'
import EmployeeListComponent from '@/components/EmployeeList'
import TimeSheetIndicatorService from '@/services/TimesheetIndicator.service'
import SchoolGradeGroupService from '@/services/SchoolGradeGroup.service'
import HelperService from '@/services/helper.service'
import HistoryDetailInfo from "@/components/HistoryDetailInfo";
export default {
    components : { EmployeeListComponent,HistoryDetailInfo },
    data(){
        return{
            history: [],
            HRTimeSheetEdu : {},
            DepartmentList : [],
            OrganizationAccountList : [],
            QualificationCategoryList : [],
            SchoolSubjectList : [],
            EmployeeEnrolmentList : [],
            TimeSheetIndicator : [],
            SchoolGradeGroupList : [],
            filterLoading : false,
            MonthsList: [
                {id : 1,name:this.$t('January')}, 
                {id : 2,name:this.$t('February')},
                {id : 3,name:this.$t('March')},
                {id : 4,name:this.$t('April')},
                {id : 5,name:this.$t('May')},
                {id : 6,name:this.$t('June')},
                {id : 7,name:this.$t('July')},
                {id : 8,name:this.$t('August')},
                {id : 9,name:this.$t('September')},
                {id : 10,name:this.$t('October')},
                {id : 11,name:this.$t('November')},
                {id : 12,name:this.$t('December')},
            ],
            FactDayList: [
                {id : 0,name:"0"}, 
                {id : 1,name:"1"},
                
            ],
            HRTimeSheetEduTables : [],
            HRTimeSheetEduTablesFields : [
                {key : 'personname',label:this.$t('personname')},
               /*  {key : 'documentid',label:this.$t('teacherhourid')}, */
                {key : 'documentinfo',label:this.$t('documentinfo')},
                {key: 'departmentname',label : this.$t('departmentname')},
                {key: 'employmenttypename',label : this.$t('employmenttypename')},
                {key: 'positionname',label : this.$t('positionname')},
                {key : 'days',label : this.$t('days')},
                {key : 'hours',label : this.$t('hours')},
                {key : 'qualificationcategoryname',label : this.$t('qualificationcategoryname'),class: 'text-center'},
                {key : 'schoolsubjectname',label : this.$t('schoolsubjectname'),class: 'text-center'},
                {key : 'detailinfo',label : this.$t('detailinfo')},
                {key : 'actions',label : this.$t('actions')}
            ],
            HRTimesheetEduDayTables:[
                {key : 'ondate',label : this.$t('ondate')},
                {key : 'timesheetindicatorname',label :this.$t('timesheetindicator')},
                {key : 'factdays',label : this.$t('factdays')},
               /*  {key : 'dayoffhours',label : this.$t('dayoffhours')},
                {key : 'nighthours',label : this.$t('nighthours')},
                {key : 'actions',label : this.$t('actions')} */
            ],
            HRTimesheetEduGradeTables :[
                {key : 'orgschoolgradename',label : this.$t('orgschoolgradename')},
                {key : 'studentcount',label : this.$t('studentcount')},
                {key : 'isspecializedname',label : this.$t('isspecialized')},
                // {key : 'schoolgradegroupname',label : this.$t('schoolgradegroup')},
                {key : 'weekworkhours',label : this.$t('weekworkhours')},
                {key : 'weekteachinghours',label : this.$t('weekteachinghours')},
                {key : 'hometeachinghours',label : this.$t('hometeachinghours')},
                {key : 'checknotebkhourslarge',label : this.$t('checknotebkhourslarge')},
                {key : 'checknotebkhourssmall',label : this.$t('checknotebkhourssmall')},
                {key : 'parttimehours',label : this.$t('parttimehours')},
                {key : 'missedworkhours',label : this.$t('missedworkhours')},
                {key : 'missedteachinghours',label : this.$t('missedteachinghours')},
                // {key : 'planmonthworkhours',label : this.$t('planmonthworkhours')},
                // {key : 'planmonthteachinghours',label : this.$t('planmonthteachinghours')},
                {key : 'monthworkhours',label : this.$t('monthworkhours')},
                {key : 'monthteachinghours',label : this.$t('monthteachinghours')},
                /* {key : 'actions',label : this.$t('actions')}, */
            ],
             HelperDaysTable1 : {},
             HelperDaysTable2 : {},
            tabrow : {
                id : 0,
                ownerid : 0,
                departmentid : 0,
                departmentname : '',
                personid : 0,
                personname : '',
                employeeenrolmentid : 0,
                organizationaccountid : 0,
                qualificationcategoryid: 0,
                schoolsubjectid : 0,
                plandays : 0,
                planhours : 0,
                factdays : 0,
                facthours : 0,
                dayoffhours : 0,
                nighthours : 0,
                detailinfo : '',
                teacherhourid : 0,
                OwnerDocDate : '',
                OwnerForMonth : '',
                OwnerYear : 0,
                ownerMonth : 0,
                Status : 1,
                HRTimesheetEduDayTables : [],
                HRTimesheetEduGradeTables : []
            },
            tables1:{
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
            },
            tables2 : {
                id : 0,
                ownerid : 0,
                schoolgradegroupid : 0,
                weekworkhours : 0,
                weekteachinghours : 0,
                hometeachinghours : 0,
                checknotebkhourssmall : 0,
                checknotebkhourslarge : 0,
                parttimehours : 0,
                missedworkhours : 0,
                missedteachinghours : 0,
                monthworkhours : 0,
                monthteachinghours : 0,
                Status : 1
            },
            personvalue : {},
            tabIndex : 0,
            editedIndex1 : -1,
            editedIndex2 : -1,
            editedIndex3 : -1,
            FillLoading : false,
            filterbyperson : '',
            filterbyperson1  : '',
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
            SaveLoading : false,
        }
    },
    created(){
        this.loaddata(this.$route.params.id);
        DepartmentService.GetAll().then(res => {
            this.DepartmentList = res.data
        })
        OrganizationService.GetOrganizationAccountList().then(res => {
            this.OrganizationAccountList = res.data
        })
        QualificationCategoryService.GetAll().then(res => {
            this.QualificationCategoryList = res.data
        })
        SchoolSubjectService.GetAll().then(res => {
            this.SchoolSubjectList = res.data
        })
        TimeSheetIndicatorService.GetAll().then(res => {
            this.TimeSheetIndicator = res.data
        })
        SchoolGradeGroupService.GetAll().then(res => {
            this.SchoolGradeGroupList = res.data
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
    methods:{
    GetHRTimesheetEduTables(ownerid){
      const { Search,SortColumn,OrderType,PageNumber,PageLimit } = this.filter
      this.isBusy = true
      HRTimeSheetEduService.GetHRTimesheetEduTables(
        ownerid,
        Search,
        SortColumn,
        OrderType,
        PageNumber,
        PageLimit
      ).then(res => {
        this.HRTimeSheetEduTables = res.data.rows
        this.isBusy = false
        this.totalRows = res.data.total
      }).catch(error => {
        this.makeToast(error.response.data.error || error,this.$t('message'),'danger')
      })
    },
    OpenModal(){
        this.tabrow = {
                id : 0,
                ownerid : 0,
                departmentid : this.HRTimeSheetEdu.departmentid,
                departmentname : '',
                personid : 0,
                personname : '',
                employeeenrolmentid : 0,
                organizationaccountid : this.HRTimeSheetEdu.organizationaccountid,
                qualificationcategoryid: 0,
                schoolsubjectid : 0,
                plandays : 0,
                planhours : 0,
                factdays : 0,
                facthours : 0,
                dayoffhours : 0,
                nighthours : 0,
                detailinfo : '',
                teacherhourid : 0,
                Status : 1,
                HRTimesheetEduDayTables : [],
                HRTimesheetEduGradeTables : []
            }
            this.editedIndex3 = -1;
            
       
            this.$bvModal.show("AddModal");
    },
    onFilter(){
        this.filterLoading = true
        setTimeout(() => {
           this.loaddata(this.HRTimeSheetEdu.id);
            this.filterLoading = false
        },1000)
    },
    onChangeMonth(){
        this.HRTimeSheetEdu.detailinfo = 'табел за ' + this.MonthsList.filter(item => item.id === this.HRTimeSheetEdu.Month)[0].name
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
    check(){
    var self = this;
      if (
        self.HRTimeSheetEdu.docnumber === 0 ||
        self.HRTimeSheetEdu.docnumber === null ||
        self.HRTimeSheetEdu.docnumber === undefined ||
        self.HRTimeSheetEdu.docnumber === ""
      ) {
        this.makeToast(this.$t("DocNumberNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.HRTimeSheetEdu.docdate === 0 ||
        self.HRTimeSheetEdu.docdate === null ||
        self.HRTimeSheetEdu.docdate === undefined ||
        self.HRTimeSheetEdu.docdate === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheetEdu.Year === 0 ||
        self.HRTimeSheetEdu.Year === null ||
        self.HRTimeSheetEdu.Year === undefined ||
        self.HRTimeSheetEdu.Year === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheetEdu.Month === 0 ||
        self.HRTimeSheetEdu.Month === null ||
        self.HRTimeSheetEdu.Month === undefined ||
        self.HRTimeSheetEdu.Month === ""
      ) {
        this.makeToast(this.$t("DateNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheetEdu.organizationaccountid === 0 ||
        self.HRTimeSheetEdu.organizationaccountid === null ||
        self.HRTimeSheetEdu.organizationaccountid === undefined ||
        self.HRTimeSheetEdu.organizationaccountid === ""
      ) {
        this.makeToast(this.$t("organizationaccountidNotSelected"), this.$t("Error"), "danger");
        return false;
      }
    if (
        self.HRTimeSheetEdu.departmentid === 0 ||
        self.HRTimeSheetEdu.departmentid === null ||
        self.HRTimeSheetEdu.departmentid === undefined ||
        self.HRTimeSheetEdu.departmentid === ""
      ) {
        this.makeToast(this.$t("departmentNotSelected"), this.$t("Error"), "danger");
        return false;
      }
     if (
        self.HRTimeSheetEdu.detailinfo === 0 ||
        self.HRTimeSheetEdu.detailinfo === null ||
        self.HRTimeSheetEdu.detailinfo === undefined ||
        self.HRTimeSheetEdu.detailinfo === ""
      ) {
        this.makeToast(this.$t("detailinfoNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    CheckFillTable(){
        if(this.HRTimeSheetEduTables.length === 0){
            this.FillTable()
        }
        else{
            this.makeToast(this.$t("ClearTable"), this.$t("Error"), "danger");
        }
    },
    FillTable(){
        var self = this;
            if (
                self.HRTimeSheetEdu.docdate === null ||
                self.HRTimeSheetEdu.docdate === undefined ||
                self.HRTimeSheetEdu.docdate === 0 ||
                self.HRTimeSheetEdu.docdate === ""
            ) {
                self.makeToast(
                self.$t("DateNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.Month === null ||
                self.HRTimeSheetEdu.Month === undefined ||
                self.HRTimeSheetEdu.Month === 0 ||
                self.HRTimeSheetEdu.Month === ""
            ) {
                self.makeToast(
                self.$t("onmonthNotSelect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.departmentid === null ||
                self.HRTimeSheetEdu.departmentid === undefined ||
                self.HRTimeSheetEdu.departmentid === 0 ||
                self.HRTimeSheetEdu.departmentid === ""
            ) {
                self.makeToast(
                self.$t("departmentNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.organizationaccountid === null ||
                self.HRTimeSheetEdu.organizationaccountid === undefined ||
                self.HRTimeSheetEdu.organizationaccountid === 0 ||
                self.HRTimeSheetEdu.organizationaccountid === ""
            ) {
                self.makeToast(
                self.$t("organizationaccountNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
        this.FillLoading = true
        var self = this
      var date = '01' + '.' + self.HRTimeSheetEdu.Month + '.' + self.HRTimeSheetEdu.Year;
      HRTimeSheetEduService.FillHrTimeSheetEdu(self.HRTimeSheetEdu).then(res => {
        self.HRTimeSheetEdu = res.data
        self.loaddata(self.HRTimeSheetEdu.id);
        this.FillLoading = false
      }).catch(error => {
          this.FillLoading = false
          this.makeToast(error.response.data.error,this.$t('Error'),"danger")
      })
    },
     FillTableInAdData(){
        var self = this;
            if (
                self.HRTimeSheetEdu.docdate === null ||
                self.HRTimeSheetEdu.docdate === undefined ||
                self.HRTimeSheetEdu.docdate === 0 ||
                self.HRTimeSheetEdu.docdate === ""
            ) {
                self.makeToast(
                self.$t("DateNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.Month === null ||
                self.HRTimeSheetEdu.Month === undefined ||
                self.HRTimeSheetEdu.Month === 0 ||
                self.HRTimeSheetEdu.Month === ""
            ) {
                self.makeToast(
                self.$t("onmonthNotSelect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.departmentid === null ||
                self.HRTimeSheetEdu.departmentid === undefined ||
                self.HRTimeSheetEdu.departmentid === 0 ||
                self.HRTimeSheetEdu.departmentid === ""
            ) {
                self.makeToast(
                self.$t("departmentNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.HRTimeSheetEdu.organizationaccountid === null ||
                self.HRTimeSheetEdu.organizationaccountid === undefined ||
                self.HRTimeSheetEdu.organizationaccountid === 0 ||
                self.HRTimeSheetEdu.organizationaccountid === ""
            ) {
                self.makeToast(
                self.$t("organizationaccountNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
        
        var self = this
      HRTimeSheetEduService.CreateHRTimesheetEduTableByEnrolment(self.HRTimeSheetEdu.id,self.tabrow.employeeenrolmentid,0).then(res => {
                self.tabrow = res.data
                self.$vs.loading.close()
                self.tabrow.HRTimesheetEduDayTables.forEach(function(item){
                    item.Status = 1
                })
                self.tabrow.HRTimesheetEduGradeTables.forEach(function(item){
                    item.Status = 1
                })
            }).catch(error => {
                this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
            })
    },
    OpenClearTableModal(){
        this.$bvModal.show('clearModal')
    },
    ClearTable(){
            var self = this;
            HRTimeSheetEduService.ClearHRTimesheetEduTable(self.HRTimeSheetEdu).then(res => {
                self.loaddata(res.data.id);
            }).catch(error => {
                this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
            })
            this.$bvModal.hide('clearModal')
    },
    calculate(row){
      // this.tabrow.facthours
      
      var self = this
       if(row.factdays !== 1 && row.factdays !== 0){
           row.factdays = 0;
           self.makeToast(
                self.$t("Error"),
                self.$t("Error"),
                "danger"
                );
               
       }
       self.tabrow.factdays = 0
      self.tabrow.HRTimesheetEduDayTables.forEach(function(item){
        if(item.Status !== 3){

            self.tabrow.factdays = self.tabrow.factdays*1 + item.factdays*1
        }
      })
      
    },
    calculateGrade(row){
        var self = this
      if(row.schoolgradegroupid===1){
         row.weekteachinghours = row.weekworkhours;
         row.missedteachinghours = row.missedworkhours;
         row.monthworkhours = self.roundToTwo(row.weekworkhours*4.3 - row.missedworkhours*1, 2) ;
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      } 
      if(row.schoolgradegroupid===2){
         row.weekteachinghours = self.roundToTwo(row.weekworkhours*0.8, 2) ;
         row.missedteachinghours = self.roundToTwo(row.missedworkhours*0.8, 2) ;

         row.monthworkhours = self.roundToTwo(row.weekworkhours*4.3 - row.missedworkhours*1, 2) ;
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      }
      self.tabrow.facthours = 0
      self.tabrow.HRTimesheetEduGradeTables.forEach(function(item){
        if(item.Status !== 3){

            self.tabrow.facthours = self.roundToTwo(self.tabrow.facthours*1 + item.monthworkhours*1+ item.monthteachinghours*1, 2) 
        }
      })
    }, 
    calculateGrademisse(row){
        var self = this
      if(row.schoolgradegroupid===1){
         row.missedteachinghours = row.missedworkhours;
         row.monthworkhours = self.roundToTwo(row.weekworkhours*4.3 - row.missedworkhours*1, 2) ;
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      } 
      if(row.schoolgradegroupid===2){
          
         row.missedteachinghours = self.roundToTwo(row.missedworkhours*0.8, 2) ;
         row.monthworkhours = self.roundToTwo(row.weekworkhours*4.3 - row.missedworkhours*1, 2) ;
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      }
      self.tabrow.facthours = 0
      self.tabrow.HRTimesheetEduGradeTables.forEach(function(item){
        if(item.Status !== 3){

            self.tabrow.facthours = self.roundToTwo(self.tabrow.facthours*1 + item.monthworkhours*1+ item.monthteachinghours*1, 2) 
        }
      })
    }, 
    calculateGradeteach(row){
        var self = this
      if(row.schoolgradegroupid===1){
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      } 
      if(row.schoolgradegroupid===2){         
         row.monthteachinghours = self.roundToTwo(row.weekteachinghours*4.3 - row.missedteachinghours*1, 2) ;
      }
        item.totalmonthhours = self.roundToTwo( row.monthworkhours*1+ row.monthteachinghours*1, 2) 

      self.tabrow.facthours = 0
      self.tabrow.HRTimesheetEduGradeTables.forEach(function(item){
        if(item.Status !== 3){

            self.tabrow.facthours = self.roundToTwo(self.tabrow.facthours*1 + item.monthworkhours*1+ item.monthteachinghours*1, 2) 
        }
      })
    },
    ChangeMonthHours(item){
        item.monthteachinghours = item.totalmonthhours - item.monthworkhours
    },
        CloseDaysTableModal(){
            this.$bvModal.hide("DaysTableModal");
            this.$nextTick(() => {
                this.tables1 = {
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
                this.editedIndex1 = -1;
            });
        },
        CloseGradeTablesModal(){
            this.$bvModal.hide("GradeTablesModal");
            this.$nextTick(() => {
                this.tables2 = {
                    id : 0,
                    ownerid : 0,
                    schoolgradegroupid : 0,
                    weekworkhours : 0,
                    weekteachinghours : 0,
                    hometeachinghours : 0,
                    checknotebkhourssmall : 0,
                    checknotebkhourslarge : 0,
                    parttimehours : 0,
                    missedworkhours : 0,
                    missedteachinghours : 0,
                    monthworkhours : 0,
                    monthteachinghours : 0,
                    Status : 1
                };
                this.editedIndex2 = -1;
            });
        },
        AddTable(){
            var self = this;
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
                self.tabrow.qualificationcategoryid === null ||
                self.tabrow.qualificationcategoryid === undefined ||
                self.tabrow.qualificationcategoryid === 0 ||
                self.tabrow.qualificationcategoryid === ""
            ) {
                self.makeToast(
                self.$t("qualificationcategoryNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.tabrow.schoolsubjectid === null ||
                self.tabrow.schoolsubjectid === undefined ||
                self.tabrow.schoolsubjectid === 0 ||
                self.tabrow.schoolsubjectid === ""
            ) {
                self.makeToast(
                self.$t("schoolsubjectNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.tabrow.employeeenrolmentid === null ||
                self.tabrow.employeeenrolmentid === undefined ||
                self.tabrow.employeeenrolmentid === 0 ||
                self.tabrow.employeeenrolmentid === ""
            ) {
                self.makeToast(
                self.$t("employeeenrolmentNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.tabrow.organizationaccountid === null ||
                self.tabrow.organizationaccountid === undefined ||
                self.tabrow.organizationaccountid === 0 ||
                self.tabrow.organizationaccountid === ""
            ) {
                self.makeToast(
                self.$t("organizationaccountNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            
            
            var isminus = false;
             self.tabrow.HRTimesheetEduGradeTables.forEach(function (item) {
               if(item.Status !== 3){
                    if(item.monthworkhours < 0)   
                    isminus = true;         
                }
                
            })
            if(isminus){
                self.makeToast(
                self.$t("hasminus"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            self.tabrow.ownerid = self.HRTimeSheetEdu.id;
            HRTimeSheetEduService.UpdateHRTimesheetEduTable(this.tabrow).then(res => {
               self.tabrow = {
                id : 0,
                ownerid : 0,
                departmentid : 0,
                departmentname : '',
                personid : 0,
                personname : '',
                employeeenrolmentid : 0,
                organizationaccountid : 0,
                qualificationcategoryid: 0,
                schoolsubjectid : 0,
                plandays : 0,
                planhours : 0,
                factdays : 0,
                facthours : 0,
                dayoffhours : 0,
                nighthours : 0,
                detailinfo : '',
                teacherhourid : 0,
                Status : 1,
                HRTimesheetEduDayTables : [],
                HRTimesheetEduGradeTables : []
            };
            this.$bvModal.hide('AddModal')
            self.loaddata(self.HRTimeSheetEdu.id);
            }).catch((error) => {
                this.makeToast(
                    error.response.data.error,
                    this.$t("message"),
                    "danger"
                );
            });
            
        },
        AddGradeTables(){
            var self = this;
            if (
                self.tables2.schoolgradegroupid === null ||
                self.tables2.schoolgradegroupid === undefined ||
                self.tables2.schoolgradegroupid === 0 ||
                self.tables2.schoolgradegroupid === ""
            ) {
                self.makeToast(
                self.$t("schoolgradegroupNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if(!!self.tables2.schoolgradegroupid){
                self.tables2.schoolgradegroupname = self.SchoolGradeGroupList.filter(item => item.id === self.tables2.schoolgradegroupid)[0].name
            }
            if (self.editedIndex2 > -1) {
                Object.assign(
                self.tabrow.HRTimesheetEduGradeTables[self.editedIndex2],
                self.tables2
                );
            } else {
                self.tabrow.HRTimesheetEduGradeTables.push(self.tables2);
            }
            self.tables2 = {
                id : 0,
                ownerid : 0,
                schoolgradegroupid : 0,
                weekworkhours : 0,
                weekteachinghours : 0,
                hometeachinghours : 0,
                checknotebkhourssmall : 0,
                checknotebkhourslarge : 0,
                parttimehours : 0,
                missedworkhours : 0,
                missedteachinghours : 0,
                monthworkhours : 0,
                monthteachinghours : 0,
                Status : 1
            };
            self.$bvModal.hide("GradeTablesModal");
            localStorage.removeItem('HRTimesheetEduGradeTables')
        },
        AddDaysTable(){
            var self = this;
            if (
                self.tables1.ondate === null ||
                self.tables1.ondate === undefined ||
                self.tables1.ondate === 0 ||
                self.tables1.ondate === ""
            ) {
                self.makeToast(
                self.$t("OndateNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.tables1.timesheetindicatorid === null ||
                self.tables1.timesheetindicatorid === undefined ||
                self.tables1.timesheetindicatorid === 0 ||
                self.tables1.timesheetindicatorid === ""
            ) {
                self.makeToast(
                self.$t("timesheetindicatoridNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if(!!self.tables1.timesheetindicatorid){
                self.tables1.timesheetindicatorname = self.TimeSheetIndicator.filter(item => item.id === self.tables1.timesheetindicatorid)[0].name
            }
            if (self.editedIndex1 > -1) {
                Object.assign(
                self.tabrow.HRTimesheetEduDayTables[self.editedIndex1],
                self.tables1
                );
            } else {
                self.tabrow.HRTimesheetEduDayTables.push(self.tables1);
            }
            self.tables1 = {
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
            this.$bvModal.hide("DaysTableModal");
             localStorage.removeItem('HRTimesheetEduDayTables')
        },
        rowClass(item, type) {
            if (item.Status === 3) {
                return "d-none";
            }
        },
        ChangePerson(){
            if(!!this.tabrow.personid){
                HelperService.GetEmployeeEnrolment(this.tabrow.personid).then(res => {
                this.EmployeeEnrolmentList = res.data
                })
            }
        },
        SelectedItem(data){
            this.personvalue = data
        },
        AddPerson(data){
            console.log(data.personid);
            this.tabrow.personid = data.personid
            this.tabrow.personname = data.personname
            this.tabrow.employeeenrolmentid = data.employeeenrolmentid
            this.FillTableInAdData()
            this.ClosePersonModal()
            this.ChangePerson()
        },
        ClosePersonModal(){
            this.$bvModal.hide('PersonModal')
        },
        CloseTablesModal(){
            this.$bvModal.hide('AddModal')
           
                this.tabrow = {
                    id : 0,
                    ownerid : 0,
                    departmentid : 0,
                    departmentname : '',
                    personid : 0,
                    personname : '',
                    employeeenrolmentid : 0,
                    organizationaccountid : 0,
                    qualificationcategoryid: 0,
                    schoolsubjectid : 0,
                    plandays : 0,
                    planhours : 0,
                    factdays : 0,
                    facthours : 0,
                    dayoffhours : 0,
                    nighthours : 0,
                    detailinfo : '',
                    teacherhourid : 0,
                    Status : 1,
                    HRTimesheetEduDayTables : [],
                    HRTimesheetEduGradeTables : []
                };
                this.editedIndex3 = -1;
                
        },
       
        DeleteItem(item){
            HRTimeSheetEduService.DeleteHRTimesheetEduTable(item.ownerid,item.id).then(res => {              
            this.loaddata(this.HRTimeSheetEdu.id);
            })      
        },
        EditItem1(item){
            if(item.Status === 0){
                item.Status = 2
               
            }
            this.HelperDaysTable1 = [...item.HRTimesheetEduDayTables]
            localStorage.setItem('HRTimesheetEduDayTables',JSON.stringify(this.HelperDaysTable1))
            console.log(this.HelperDaysTable1)
            this.HelperDaysTable2 = [...item.HRTimesheetEduGradeTables]
            localStorage.setItem('HRTimesheetEduGradeTables',JSON.stringify(this.HelperDaysTable2))
            console.log(this.HelperDaysTable2)
            this.editedIndex1 = this.HRTimeSheetEdu.HRTimesheetEduTables.indexOf(item)
            this.tabrow = Object.assign({},item)
           // this.editedIndex1 = this.tabrow.HRTimesheetEduDayTables.indexOf(item);
            // this.tables1 = Object.assign({}, item);
            this.$bvModal.show("DaysTableModal");
        },
        EditItem2(item){
            if(item.Status === 0){
                item.Status = 2
            }
            this.editedIndex2 = this.tabrow.HRTimesheetEduGradeTables.indexOf(item);
            this.tables2 = Object.assign({}, item);
            this.$bvModal.show("GradeTablesModal");
        },
        EditItem3(item){
        var self = this
            this.tabrow = {
                    id : 0,
                    ownerid : 0,
                    departmentid : 0,
                    departmentname : '',
                    personid : 0,
                    personname : '',
                    employeeenrolmentid : 0,
                    organizationaccountid : 0,
                    qualificationcategoryid: 0,
                    schoolsubjectid : 0,
                    plandays : 0,
                    planhours : 0,
                    factdays : 0,
                    facthours : 0,
                    dayoffhours : 0,
                    nighthours : 0,
                    detailinfo : '',
                    teacherhourid : 0,
                    Status : 1,
                    HRTimesheetEduDayTables : [],
                    HRTimesheetEduGradeTables : []
                };
           
            self.editedIndex3 = 1;
            HRTimeSheetEduService.GetHRTimesheetEduTable(item.id).then(res => {
                self.tabrow = res.data
                self.$vs.loading.close()
                self.tabrow.HRTimesheetEduDayTables.forEach(function(item){
                    item.Status = 2
                })
                self.tabrow.HRTimesheetEduGradeTables.forEach(function(item){
                    item.Status = 2
                })
            }).catch(error => {
                this.makeToast(error.response.data.error || error,this.$t('error'),'danger')
            })
       
            this.$bvModal.show("AddModal");
        },
    roundToTwo(value, decimals) {
            value;
            decimals;

            return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    },
   
    loaddata(id) {
      var self = this;
      this.$vs.loading()
      HRTimeSheetEduService.Get(id).then((res) => {
        self.HRTimeSheetEdu = res.data.hRTimesheetEdu;
        self.history = res.data.history;
        this.GetHRTimesheetEduTables(id)
        this.$vs.loading.close()
      });
    },
    SaveDate(){
            var self = this;
            if (!self.check()) {
                return false;
            }
            HRTimeSheetEduService.Update(self.HRTimeSheetEdu)
                .then((res) => {
                self.makeToast(
                    self.$t("SuccessMessage"),
                    self.$t("message"),
                    "success"
                );
                self.$router.push({ name: "HRTimeSheetEdu" });
                })
                .catch((error) => {
                self.makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
            });
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
        
  
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimesheetEduTables(this.HRTimeSheetEdu.id);
          }
      },
      },
      "filter.PageLimit": {
      handler(newValue, oldValue) {
          if (newValue) {
            this.GetHRTimesheetEduTables(this.HRTimeSheetEdu.id);
          }
      },
    },
    },
}
</script>

<style>

</style>
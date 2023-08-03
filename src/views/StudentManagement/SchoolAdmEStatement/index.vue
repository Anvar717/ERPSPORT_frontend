<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('SchoolAdmEStatement')}}</h3>
        <CCardHeader>
          <b-row>
            <b-col sm="12" md="10">
              <CButton @click="Create" color="primary" variant="outline" class="mr-2" size="sm">
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{$t('Create')}}
              </CButton>
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
                @click="GetDocumentListForAction"
                v-b-toggle.sidebar-right
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
                :disabled="!checked"
              >
                <b-icon icon="check2"></b-icon>
                &nbsp; {{$t('Received')}}
              </CButton>
              <CButton
                @click="InsertDocument"
                v-b-toggle.sidebar-right
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
                :disabled="!checked"
              >
                <b-icon icon="check2"></b-icon>
                &nbsp; {{$t('Insert')}}
              </CButton>
              <a href="http://eduerpinfo.apptest.uz/StudentManagement/SchoolAdmEStatementSend" rel="noopener noreferrer" target="_blank" >
              <CButton
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"                               
              >
                <b-icon icon="check2"></b-icon>
                &nbsp; {{$t('help')}}
              </CButton>
              </a>
              
              
            </b-col>
            <b-col sm="12" md="2" class="text-right">
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </b-col>
          </b-row>
          <CRow class="form-group">
            <CCol lg="2" md="2" sm="12" class="text-left mt-2">
              <label class="col-form-label" for>{{$t('StartDate')}}</label>

              <date-picker
                v-model="filter.StartDate"
                style="width:100%"
                size="sm"
                lang="ru"
                :placeholder="$t('StartDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </CCol>
            <CCol lg="2" md="2" sm="12" class="text-left mt-2">
              
                <label class="col-form-label" for>{{$t('EndDate')}}</label>

                <!-- <custom-date-input />  -->
                <date-picker
                  v-model="filter.EndDate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                  
                </date-picker>
              
            </CCol>
            <CCol lg="2" md="2" sm="12" class="text-left mt-2">
                <label class="col-form-label" for>{{$t('schoolyear')}}</label>
                <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                </v-select>
            </CCol>
            <CCol lg="2" md="2" sm="12" class="text-left mt-2">
                <label class="col-form-label" for>{{$t('personname')}}</label>
                <b-form-input :placeholder="$t('personname')" v-model="filter.personname" />
            </CCol>
            <CCol lg="3" md="2" sm="12" class="text-left mt-5">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
          </CRow>
          <CRow v-if="$can('MinSportView','permissions') || $can('OblastSport','permissions') || $can('RegionXTB','permissions')">
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
                <label class="col-form-label" for>{{$t('oblast')}}</label>
                <v-select
                    :options="OblastList"
                    v-model="filter.oblastId"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="changeOblast"
                  >
                </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
                <label class="col-form-label" for>{{$t('region')}}</label>
                <v-select
                    :options="RegionList"
                    v-model="filter.regionId"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="changeRegion"
                  >
                </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
                <label class="col-form-label" for>{{$t('organization')}}</label>
                <v-select
                    :options="OrganizationList"
                    v-model="filter.organizationId"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="Refresh"
                  >
                </v-select>
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
            hover
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div style="cursor : pointer" @click="ChangeSort('id')">
                {{$t('id')}}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{$t('docnumber')}}
                <b-icon v-if="filter.SortColumn === 'docnumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{$t('docdate')}}
                <b-icon v-if="filter.SortColumn === 'docdate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(organizationname)>
              <div style="cursor : pointer" @click="ChangeSort('organizationname')">
                {{$t('organizationname')}}
                <b-icon v-if="filter.SortColumn === 'organizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyearname)>
              <div style="cursor : pointer" @click="ChangeSort('schoolyearname')">
                {{$t('schoolyearname')}}
                <b-icon v-if="filter.SortColumn === 'schoolyearname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(educationlanguagename)>
              <div style="cursor : pointer" @click="ChangeSort('educationlanguagename')">
                {{$t('educationlanguagename')}}
                <b-icon v-if="filter.SortColumn === 'educationlanguagename'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(personname)>
              <div style="cursor : pointer" @click="ChangeSort('personname')">
                {{$t('personname')}}
                <b-icon v-if="filter.SortColumn === 'personname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(onlinequeueinfocode)>
              <div style="cursor : pointer" @click="ChangeSort('onlinequeueinfocode')">
                {{$t('onlinequeueinfocode')}}
                <b-icon v-if="filter.SortColumn === 'onlinequeueinfocode'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(dateofcreated)>
              <div style="cursor : pointer" @click="ChangeSort('dateofcreated')">
                {{$t('dateofcreated')}}
                <b-icon v-if="filter.SortColumn === 'dateofcreated'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:head(check) >
              <b-checkbox v-model="allCheck"></b-checkbox>
            </template>
            <template v-slot:head(parentorganizationname)>
              <div style="cursor : pointer" @click="ChangeSort('parentorganizationname')">
                {{$t('parentorganizationname')}}
                <b-icon v-if="filter.SortColumn === 'parentorganizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
             <template v-slot:head(orgschoolgradename)>
              <div style="cursor : pointer" @click="ChangeSort('orgschoolgradename')">
                {{$t('orgschoolgradename')}}
                <b-icon v-if="filter.SortColumn === 'orgschoolgradename'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{$t('status')}}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:cell(check)="{item,index}">
              <b-checkbox  v-model="item.checked" @input="rowChecked(item,index)"></b-checkbox>
            </template>
            <template v-slot:cell(statusname)="{item}">
              <CBadge :color="getItemColor(item.statusname)">{{item.statusname}}</CBadge>
            </template>
            <template v-slot:cell(actions)="{item}">
              <div class="text-center">
                <b-link @click="Preview(item)" class="mr-2" v-c-tooltip="{content: $t('Preview') }">
                  <!-- <b-icon icon="pencil" ></b-icon> -->
                  <b-icon font-scale="1.8" class="pt-2" icon="eye"></b-icon>
                </b-link>
                <b-link @click="Edit(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                     <b-dropdown-item @click="$bvModal.show('NotReceivedModal' + item.id)">
                      <b-icon icon="x" class="mr-2"></b-icon>
                      &nbsp; {{$t('NotReceivedd')}}
                    </b-dropdown-item>
                    <b-dropdown-item @click="Protocol(item)">
                      <b-icon icon="newspaper" class="mr-2"></b-icon>
                      {{$t('Protocol')}}
                    </b-dropdown-item>
                    <b-dropdown-item @click="$bvModal.show('DeleteModal' + item.id)">
                      <b-icon icon="trash" class="mr-2" ></b-icon>
                      {{$t('Delete')}}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'DeleteModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{$t('WantDelete')}}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('DeleteModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{$t('CancelApproval')}}
                    </CButton>
                    <CButton @click="Delete(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{$t('Approve')}}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{$t('WantNotAccept')}}</template>
                  <div class="d-block text-right">
                     <CRow class="mt-3">
                       <CCol v-if="item.statusid === 8">
                         <label class="d-block text-left" for>{{$t('Description')}}</label>
                          <v-select
                            
                            :options="tablecolumntemplate"
                            v-model="templaterow.Description"
                            :reduce="item => item.name"
                            :placeholder="$t('Description')"
                            label="name"
                            @input="descriptionchange"
                          >
                        </v-select>
                  
                       </CCol>  
                        </CRow>
                         <CRow class="mt-3">
                       <CCol v-if="item.statusid === 8 && templaterow.isother">
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
                              {{$t('NotAccept')}}
                            </CButton>
                            <CButton @click="Cancel(item)" color="success">
                              <b-icon icon="check2"></b-icon>
                              {{$t('Accept')}}
                            </CButton>
                       </CCol>
                     </CRow>

                    
                  </div>
                </b-modal>
                <b-modal :id="'ProtocolModal' + item.id" hide-footer>
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
                      @row-dblclicked="Edit"
                      @row-clicked="rowclicked"
                      striped
                      sticky-header="60vh"
                      no-border-collapse
                      bordered
                    >
                      <template v-slot:head(statusname)>
                        <div style="cursor : pointer" @click="ChangeSort('statusname')">
                          {{$t('statusname')}}
                          <b-icon v-if="filter.SortColumn === 'statusname'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>
                      <template v-slot:head(returnreason)>
                        <div
                          class="text-center"
                          style="cursor : pointer"
                          @click="ChangeSort('returnreason')"
                        >
                          {{$t('returnreason')}}
                          <b-icon v-if="filter.SortColumn === 'returnreason'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>
                      <template v-slot:head(dateofcreated)>
                        <div style="cursor : pointer" @click="ChangeSort('dateofcreated')">
                          {{$t('dateofcreated')}}
                          <b-icon v-if="filter.SortColumn === 'dateofcreated'" :icon="filter.SortIcon"></b-icon>
                        </div>
                      </template>

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
                      {{$t('CancelApproval')}}
                    </CButton>
                  </div>
                </b-modal>
              </div>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{$t('NoItems')}}</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2 mx-3" style="vertical-align:middle">
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{$t('Loading')}}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{$t('RecordsFrom')}} {{firstNumber}} {{$t('by')}} {{lastNumber}} {{$t('of')}}
              {{totalRows}}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">{{$t('RecordsPerPage')}}</div>
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
      <vs-sidebar
        :click-not-close="true"
        position-right
        parent="body"
        default-index="1"
        color="primary"
        class="create-modal"
        spacer
        v-model="sidebarOpen"
      >
        <b-container fluid index="1" v-if="sidebarOpen">
          <b-row class="text-right">
            <b-col>
              <h4 class="text-left pl-3 py-3" @click="sidebarOpen = false" style="cursor:pointer">
                <b-icon icon="x"></b-icon>
              </h4>
            </b-col>
            <!-- <b-col>
              <h4 class="text-center py-3">{{$t('Header')}}</h4>
            </b-col> -->
          </b-row>
          <b-row>
            <b-col>
              <h4>
                <CButton @click="AcceptAll" type="button" block size="sm" color="primary">
                  <b-icon icon="check2" class="mr-1"> </b-icon> 
                  {{$t('Received')}}
                </CButton>
              </h4>
            </b-col>
          </b-row>
          <div class="px-3 py-2" v-for="(item,index) in GetDocumentList" :key="index">
            <CCard bordercolor="secondary" color="dark" textColor="light">
              <CCardHeader>
                {{$t('docnumber')}} : {{item.document.docnumber}}
                <span class="float-right">{{$t('docdate')}} : {{item.document.docdate}}</span>
              </CCardHeader>
              <CCardBody>
                <p>{{$t('Student')}} : {{item.document.personname}}</p>
                <p>{{$t('dateofbirth')}} : {{item.document.person.dateofbirth}}</p>
                <p>{{$t('adress')}} : {{item.document.person.birthaddress}}</p>
              </CCardBody>
            </CCard>
          </div>
        </b-container>
      </vs-sidebar>
      <vs-sidebar
        :click-not-close="true"
        position-right
        parent="body"
        default-index="1"
        color="primary"
        class="create-modal"
        spacer
        v-model="InsertSchoolAdmissionsidebarOpen"
      >
        <b-container class="sidebar-vsx" fluid v-if="InsertSchoolAdmissionsidebarOpen">
          <b-row>
            <b-col>
              <h4 class="text-right" @click="InsertSchoolAdmissionsidebarOpen = false" style="cursor:pointer">
                <b-icon icon="x"></b-icon>
              </h4>
            </b-col>
            
            
          </b-row>
          <b-row>
            <b-col>
            
                
                    <label >{{$t('OrgSchoolGrade')}}</label>
                    <v-select
                     
                      :options="orgschoolgradelist"
                      v-model="SchoolAdmission.orgschoolgradeid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      
                    </v-select>
                
             
            </b-col>
          </b-row>
          <b-row class="mt-3">
            
            <b-col>
                <CButton @click="InsertSchoolAdmission" block type="button" size="sm" color="primary">
                  <b-icon icon="check2" class="mr-2"></b-icon>
                  {{$t('InsertSchoolAdmission')}}
                </CButton>
            </b-col>
          </b-row>
        </b-container>
      </vs-sidebar>
    </CCol>
  </CRow>
</template>

<script>

import TableColumnTemplateService from "@/services/TableColumnTemplate.service";
import SchoolAdmEStatementService from "@/services/SchoolAdmEStatement.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SchoolAdmissionService from "@/services/SchoolAdmission.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolYearService from '@/services/SchoolYear.service'
export default {
  data() {
    return {
      fields: [
        {
          key: "check"
        },
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
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false
        },
        {
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false
        },
        {
          key: "educationlanguagename",
          label: this.$t("educationlanguagename"),
          sortable: false
        },
        {
          key: "personname",
          label: this.$t("Student"),
          sortable: false
        },
        // {
        //   key: "onlinequeueinfocode",
        //   label: this.$t("IDCode"),
        //   sortable: false
        // },
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
        // {
        //   key: "parentorganizationname",
        //   label: this.$t("parentorganizationname"),
        //   sortable: false
        // },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgradename"),
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false
        }
      ],
      items: [],
      SchoolAdmission: {},

      totalRows: "",
      isBusy: true,
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
        schoolyearid : 0,
        oblastId:0,
        regionId:0,
        organizationId:0,
        personname : ''
      },
      orgschoolgradelist: [],
      
      protocollist: [],
      tablecolumntemplate: [],
      templaterow: {
         Description: "",
         isother: false,
      },
      tabrow : {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            estatementnumber: "",
            estatementdate: "",
            studentadmissionid: 0,
            schooladmestatementid: 0,
            Status: 1
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
      check: [],
      allCheck: false,
      checkedItems: [],
      checked: false,
      GetDocumentList: [],
      OblastList: [],
      RegionList:[],
      OrganizationList:[],
      sidebarOpen: false,
      InsertSchoolAdmissionsidebarOpen: false,
      schoolyearlist : []
    };
  },
  created() {
    this.filter.schoolyearid = this.$route.query.schoolyear
    TableColumnTemplateService.GetAll(293,'returnreason').then(res => {
      this.tablecolumntemplate = res.data;
    });
    OblastService.GetAll().then(res =>{
      this.OblastList = res.data
    })
    OrgSchoolGradeService.GetAll('',1).then(res => {
        this.orgschoolgradelist = res.data;
      });
    this.filter.schoolyearid = parseInt(
      localStorage.getItem("default_school_year")
    );
    this.createDate();
    this.Refresh();
    SchoolYearService.GetAll().then(res => {
      this.schoolyearlist = res.data
    })
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
    changeOblast(){
      RegionService.GetAll(this.lang, this.filter.oblastId).then(res => {
        this.RegionList = res.data
      })
    },
     changeRegion(){
      OrganizationService.GetAll(this.filter.oblastId, this.filter.regionId, false).then(res => {
        this.OrganizationList = res.data
      })
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
       var yyy1 = todaydate.getFullYear()-1;
      this.filter.StartDate = '01.01.' + yyy1;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    Preview(item) {
      this.$router.push({
        name: "UploadFileSchoolAdmEStatement",
        params: { id: item.id }
      });
    },
    descriptionchange() {
      var self = this;
      self.templaterow.isother = self.tablecolumntemplate.filter(function(item) {
        if (item.name === self.templaterow.Description) return item;
      })[0].isother;
    },
    Print() {
      SchoolAdmEStatementService.Print(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.personname,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationId,
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "schooladmestatement.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
      
    },
    SendAll() {
      let idlist = [];
      this.checkedItems.filter(function(e) {
        idlist.push({ id: e.id });
      });
      SchoolAdmEStatementService.Send(idlist)
        .then(res => {
          this.sidebarOpen = false;
          this.makeToast(this.$t("sendAll"), this.$t("message"), "success");
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    AcceptAll() {
      let idlist = [];
      this.checkedItems.filter(function(e) {
        idlist.push({ id: e.id });
      });
      SchoolAdmEStatementService.Accept(idlist)
        .then(res => {
          this.sidebarOpen = false;
          this.makeToast(this.$t("sendAll"), this.$t("message"), "success");
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    InsertSchoolAdmission() {
       var self = this;
      
      SchoolAdmissionService.Insert(self.SchoolAdmission)
        .then(res => {
          self.InsertSchoolAdmissionsidebarOpen = false;
          self.makeToast(self.$t("sendAll"), self.$t("message"), "success");
          self.Refresh();
        })
        .catch(error => {
          self.InsertSchoolAdmissionsidebarOpen = false;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    birthoblast(countryid, oblastid) {
      OblastService.GetAll(countryid).then(res => {
        return res.data.filter(item => item.id === oblastid)[0].name;
      });
    },
    rowChecked(item, index) {
      if (item != null) {
        if (item.checked) {
          this.items[index]._rowVariant = "primary";
        } else {
          this.items[index]._rowVariant = "default";
        }
      }
      this.checkedItems = this.items.filter(item => item.checked === true);
      if (this.checkedItems.length > 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    GetDocumentListForAction() {
      this.sidebarOpen = true;
      let idlist = [];
      this.checkedItems.filter(function(e) {
        idlist.push(e.id);
      });
      let data = { action: "send", idlist: idlist };
      (data);
      SchoolAdmEStatementService.GetDocumentListForAction(data)
        .then(res => {
          this.GetDocumentList = res.data;
        })
        .catch(error => {
          this.makeToast(error, this.$t("message"), "danger");
        });
    },
    InsertDocument() {
      var self = this;
      self.InsertSchoolAdmissionsidebarOpen = true;
      
      console.log(self.tabrow);
      SchoolAdmissionService.Get(0).then(res => {
        self.SchoolAdmission = res.data;
        self.SchoolAdmission.Tables = [];
        self.checkedItems.forEach(function(item) {  
          self.tabrow= {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            estatementnumber: "",
            estatementdate: "",
            studentadmissionid: 0,
            schooladmestatementid: item.id,
            Status: 1
          };       
             
          self.SchoolAdmission.Tables.push(self.tabrow);
          self.tabrow= {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            estatementnumber: "",
            estatementdate: "",
            studentadmissionid: 0,
            schooladmestatementid: 0,
            Status: 1
          };      
        });
      });
      console.log(self.checkedItems);

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
        name: "EditSchoolAdmEStatement",
        params: {
          id: 0
        }
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditSchoolAdmEStatement",
        params: {
          id: item.id,
        },
        query : {
          schoolyear : this.filter.schoolyearid
        }
      });
    },
    Delete(item) {
      SchoolAdmEStatementService.Delete(item.id)
        .then(res => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Cancel(item) {
      var self = this;
      if(item.statusid === 8 &&  self.templaterow.Description === ''){
        self.makeToast(
          self.$t("DescriptionNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      SchoolAdmEStatementService.Cancel(item.id, self.templaterow.Description)
        .then(res => {
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
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.Description = '';
          self.$bvModal.hide("NotReceivedModal" + item.id);
        });
    },
    Protocol(item) {
      var self = this;

      SchoolAdmEStatementService.GetDocumentStatusLog(item.id).then(res => {
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
      SchoolAdmEStatementService.GetList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.schoolyearid,
        this.filter.personname,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.organizationId,
        
      ).then(res => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
        this.rowChecked();
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
      }
    },
    allCheck: {
      handler(newValue) {
        this.items.forEach((el, index) => {
          if(el.statusid !== 8 && el.statusid !== 9){
              if (newValue) {
            this.items[index].checked = newValue;
            this.items[index]._rowVariant = "primary";
            this.checkedItems.push(el);
          } else {
            delete this.items[index].checked;
            this.items[index]._rowVariant = "default";
            this.checkedItems = [];
          }
          }
          
        });
      }
    }
  }
};
</script>

<style>

</style>
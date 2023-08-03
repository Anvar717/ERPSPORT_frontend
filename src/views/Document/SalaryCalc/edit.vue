<template>
    <CRow>
        <CCol>
            <CCard accent-color="primary" class="pb-4">
                <CCardHeader>
                    <b-icon icon="pencil"></b-icon>
                    {{ $t("SalaryCalc") }}
                    <div class="card-header-actions">
                        <CLink
                            href="#"
                            class="card-header-action btn-close"
                            v-on:click="$router.push({ name: 'SalaryCalc' })"
                        >
                        <b-icon icon="x-circle"></b-icon>
                        </CLink>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm="4">
                            <label>{{
                                $t("docnumber")
                            }}</label>
                            <CInput
                                autocomplete="text"
                                v-model="SalaryCalc.docnumber"
                                
                            >
                            </CInput>
                        </CCol>
                        <CCol sm="4">
                            <label>{{ $t("docdate") }}</label>
                            <date-picker
                            v-model="SalaryCalc.docdate"
                            size="sm"
                            lang="ru"
                            :placeholder="$t('date')"
                            value-type="format"
                            format="DD.MM.YYYY"
                            style="width:100%"
                            ></date-picker>
                        </CCol>
                        <b-col>
                            <label for="#"> {{ $t('OrganizationAccount') }} </label>
                            <v-select
                                :options="OrganizationAccountList"
                                v-model="SalaryCalc.organizationaccountid"
                                :reduce="(item) => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="code"
                            ></v-select>
                        </b-col>
                    </CRow>
                    <b-row>
                        <CCol>
                            <CInput
                            autocomplete="text"
                            :label="$t('detailinfo')"
                            v-model="SalaryCalc.detailinfo"
                            ></CInput>
                        </CCol>
                    </b-row>
             <CRow>
              <CCol>
                <div class="text-center mx-auto">
                    <CButton size="sm" class="mr-2" color="info" @click="FillData">
                        <b-icon v-if="!salaryloading" icon="check2"></b-icon>
                        <b-spinner small v-if="salaryloading"></b-spinner>
                        {{ $t("Fill") }}
                    </CButton>
                    <CButton  size="sm" class="mr-2" color="danger" @click="$bvModal.show('clearModal')">
                        <b-icon icon="check2"></b-icon>
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
                    <CButton @click="clearTable" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
            </div>
              </CCol>
            </CRow>
                    <b-row>
                        <b-col class="text-left"> 
                            <b-input-group style="width : 60%" class="mt-3"> 
                                <b-form-input v-model="filter.Search" :placeholder="$t('search')" ></b-form-input>
                                <b-input-group-append>
                                <b-button @click="Refresh" variant="primary"> <b-icon icon="search"></b-icon> {{ $t('search') }} </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col class="text-right">
                            <h5 class=""> {{ $t('totalaccrualsum') }} :  <span style="color:blue"> {{$options.filters.currency(SalaryCalc.TotalAccrualSum, {symbol: '', fractionCount: 2})}}  </span>   </h5>
                            <h5 class=""> {{ $t('totaldeductionsum') }} :  <span style="color:blue"> {{$options.filters.currency(SalaryCalc.TotalDeductionSum, {symbol: '', fractionCount: 2})}}  </span>   </h5>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <b-table
                                :fields="SalaryCalcTables"
                                :items="SalaryCalc.EnrolmentTables"
                                 class="text-center"
                                
                                style="vertical-align:middle"
                                bordered
                                responsive
                                :tbody-tr-class="rowClass"
                                sticky-header="60vh"
                                no-border-collapse
                            >
                                <template #cell(employee)="{item}">
                                    <p class="m-0 p-0" style="white-space:nowrap">
                                        {{item.employmenttypename}} <b>({{item.employeeenrolmentid}})</b>
                                    </p> </template>
                               <template #cell(day)="{item}">
                                    <p class="m-0 p-0" style="white-space:nowrap">
                                        {{ item.factdays }} / <b>{{ item.plandays }} </b>
                                    </p>
                                </template>
                                <template #cell(hour)="{item}">
                                    <p class="m-0 p-0" style="white-space:nowrap">
                                        {{item.facthours}} / <b>{{item.planhours}}</b>
                                    </p>
                                </template>
                                <template #cell(accrualsum)="{item}">
                                    <p class="m-0 p-0">
                                          {{$options.filters.currency(item.accrualsum, {symbol: '', fractionCount: 2})}}
                                    </p>
                                </template>
                                <template v-slot:cell(deductionsum)="{ item }">
                                <p class="m-0 p-0">
                                    {{
                                    $options.filters.currency(item.deductionsum, {
                                        symbol: "",
                                        fractionCount: 2,
                                    })
                                    }}
                                </p>
                                </template>
                                <template #empty>
                                        <h5 class="text-center"> {{ $t('NoItems') }} </h5>
                                    </template>
                                     <template #table-busy>
                                    <div
                                        class="text-center text-primary my-2"
                                        style="vertical-align:middle"
                                    >
                                        <b-spinner class="align-middle mr-2"></b-spinner>
                                        <strong>{{ $t("Loading") }}</strong>
                                    </div>
                                </template>
                                <template #cell(actions)="{item}">
                                    <div class="text-center">
                                        <b-link
                                        @click="View(item)"
                                        class="mr-2"
                                        v-c-tooltip="{ content: $t('view') }"
                                        >
                                         <b-icon icon="eye" ></b-icon>
                                        </b-link>
                                    </div>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-modal id="AddModal" size="xl" :title="$t('SalaryCalc')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
                        <b-row class="mx-n2"> 
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor :'#eee' }">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("Person")
                                    }}
                                    </label>
                                    <div class="col-sm-8 d-flex">
                                        <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center">{{tabrow.personname}}</a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff'}">
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
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.positionname}}</a>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="mx-n2"> 
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#fff' : '#fff'}">
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
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.employeeenrolmentid}}</a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#fff' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("employmenttype")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <v-select
                                        :options="EmploymentTypeList"
                                        v-model="tabrow.employmenttypeid"
                                        :reduce="(item) => item.id"
                                        :placeholder="$t('ChooseBelow')"
                                        label="name"
                                        v-if="editedIndex1 == -1"
                                    ></v-select>
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.employmenttypename}}</a>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="mx-n2">
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("ondate")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <date-picker
                                        v-model="tabrow.ondate"
                                        size="sm"
                                        lang="ru"
                                        :placeholder="$t('date')"
                                        value-type="format"
                                        format="DD.MM.YYYY"
                                        style="width:100%"
                                        v-if="editedIndex1 == -1"
                                    ></date-picker>
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.ondate}}</a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("plandays")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <c-input v-if="editedIndex1 == -1" v-model="tabrow.plandays"></c-input>
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.plandays}}</a>
                                    </div>
                                </div>
                            </b-col>
                            
                        </b-row>
                        <b-row class="mx-n2">
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#fff' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("planhours")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <c-input v-if="editedIndex1 == -1" v-model="tabrow.planhours"></c-input>
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.planhours}}</a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#fff' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                    {{
                                    $t("factdays")
                                    }}
                                    </label>
                                    <div class="col-sm-8">
                                    <c-input  v-model="tabrow.factdays" v-if="editedIndex1 == -1"></c-input>
                                    <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.factdays}}</a>
                                    </div>
                                </div>
                            </b-col>    
                        </b-row>
                        <b-row class="mx-n2">
                            <b-col>
                                <div class="form-group form-row mb-0" :style="{backgroundColor : editedIndex1 > -1 ? '#eee' : '#fff'}">
                                    <label class="col-form-label col-sm-4">
                                        {{
                                            $t("facthours")
                                        }}
                                    </label>
                                    <div class="col-sm-8">
                                        <c-input v-model="tabrow.facthours" v-if="editedIndex1 == -1" ></c-input>
                                        <a style="color : blue; font-size : 16px;" class="h-100 d-flex align-items-center" v-if="editedIndex1 > -1">{{tabrow.facthours}}</a>
                                    </div>
                                </div>
                            </b-col>
                            <b-col></b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-right mb-2"></b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-table
                                    :fields="RowTables"
                                    :items="tabrow.rowTables"
                                    class="bg-color-table text-center"
                                    style="vertical-align:middle"
                                    bordered
                                    responsive="sm"
                                    small
                                    show-empty
                                    :busy="isBusy2"
                                >
                               <template #cell(day)="{item}">
                                   <p class="m-0 p-0" style="white-space:nowrap">
                                       {{ item.factdays}} / <b>{{item.plandays}}</b>
                                   </p>
                               </template>
                               <template #cell(hour)="{item}">
                                   <p class="m-0 p-0" style="white-space:nowrap">
                                       {{item.facthours}}/<b>{{item.planhours}}</b>
                                   </p>
                               </template>
                                <template v-slot:cell(insum)="{ item }">
                                <p>
                                    {{
                                    $options.filters.currency(item.insum, {
                                        symbol: "",
                                        fractionCount: 2,
                                    })
                                    }}
                                </p>
                                 </template>
                                <template v-slot:cell(outsum)="{ item }">
                                <p>
                                    {{
                                    $options.filters.currency(item.outsum, {
                                        symbol: "",
                                        fractionCount: 2,
                                    })
                                    }}
                                </p>
                                </template>
                                    <template #cell(actions)="{item}">
                                        <div class="text-center">
                                            <b-link
                                            @click="EditItem(item)"
                                            class="mr-2"
                                            v-c-tooltip="{ content: $t('Edit') }"
                                            >
                                            <!-- <b-icon icon="pencil" ></b-icon> -->
                                             <b-icon icon="eye" ></b-icon>
                                            </b-link>
                                            <!-- <b-link
                                            class="mr-2"
                                            v-c-tooltip="{ content: $t('Delete') }"
                                            @click="DeleteItem(item)"
                                            >
                                            <b-icon icon="trash" ></b-icon>
                                            </b-link> -->
                                        </div>
                                    </template>
                                    <template #empty>
                                        <h5> {{ $t('NoItems') }} </h5>
                                    </template>
                                     <template #table-busy>
                                    <div
                                        class="text-center text-primary my-2"
                                        style="vertical-align:middle"
                                    >
                                        <b-spinner class="align-middle mr-2"></b-spinner>
                                        <strong>{{ $t("Loading") }}</strong>
                                    </div>
                                </template>
                                </b-table>
                            </b-col>
                        </b-row>

                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="danger" @click="CloseAddTableModal">
                                    {{$t('back')}}
                                </b-button> 
                                <!-- <b-button variant="primary" @click="AddTable">
                                    {{$t('Add')}}
                                </b-button> -->
                            </c-col>
                        </c-row>
                    </b-modal>
                    <b-modal id="PersonModal" size="xl" :title="$t('Person')" no-close-on-backdrop hide-footer modal-class="custom-size-modal">
                        <employee-list-component :ondate="SalaryCalc.docdate" @SelectedItem="SelectedItem" @DblClick="AddPerson"></employee-list-component>
                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
                                    {{$t('back')}}
                                </b-button>
                                <!-- <b-button variant="primary" @click="AddPerson(personvalue)">
                                    {{$t('Add')}}
                                </b-button> -->
                            </c-col>
                        </c-row>
                    </b-modal>
                    <b-modal id="RowTableModal" size="lg" :title="$t('RowTable')" no-close-on-backdrop hide-footer>
                        <b-row class="mt-n4 mb-n3">
                            <b-col>
                                <table class="content-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                {{ $t("calculationkind") }}
                                            </td>
                                            <td>
                                                <b> {{ tables.calculationkindname }} </b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {{ $t('ondate') }}
                                            </td>
                                            <td>
                                                <b>{{ tables.ondate }}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> {{ $t('plandays') }} </td>
                                            <td> <b> {{ tables.plandays }} </b> </td>
                                        </tr>
                                        <tr>
                                            <td> {{ $t('factdays') }} </td>
                                            <td> <b> {{ tables.factdays }} </b> </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>
                                                {{ $t('percentage') }}
                                            </td>
                                            <td>
                                                <b>{{ tables.percentage }}</b>
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td>
                                                {{ $t('planhours') }}
                                            </td>
                                            <td>
                                                <b>{{ tables.planhours }}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {{ $t('facthours') }}
                                            </td>
                                            <td>
                                                <b>{{ tables.facthours }}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {{ $t('insum') }}
                                            </td>
                                            <td>
                                               <b> {{$options.filters.currency(tables.insum, {symbol: '', fractionCount: 2})}}</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {{ $t('outsum') }}
                                            </td>
                                            <td>
                                                <b>{{$options.filters.currency(tables.outsum, {symbol: '', fractionCount: 2})}} </b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-col>
                        </b-row>
                        <c-row class="mt-2">
                            <c-col class="text-center">
                                <b-button class="mr-2" variant="danger" @click="CloseRowTableModal">
                                    {{$t('back')}}
                                </b-button>
                                <!-- <b-button variant="primary" @click="AddRowTable">
                                    {{$t('Add')}}
                                </b-button> -->
                            </c-col>
                        </c-row>
                    </b-modal>
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
                    <CRow class="mt-3">
                        <CCol>
                            <div class="text-left">
                            <CButton
                                size="sm"
                                color="danger"
                                @click="$router.push({ name: 'SalaryCalc' })"
                            >
                                <b-icon icon="arrow-left-short" ></b-icon>
                                {{ $t("back") }}
                            </CButton>
                            </div>
                        </CCol>
                        <CCol>
                            <div class="text-right">
                            <CButton
                                v-if="SalaryCalc.CanSave"
                                size="sm"
                                color="success"
                                @click="SaveData"
                            >
                                <b-spinner v-if="SaveLoading" small></b-spinner>
                                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                                {{ $t("Save") }}
                            </CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
import SalaryCalcService from '@/services/salarycalc.service'
import OrganizationService from '@/services/organization.service'
import HelperService from '@/services/helper.service'
import EmployeeListComponent from '@/components/EmployeeList'
import PositionService from '@/services/Position.service'
import CalculationKindService from '@/services/CalculationKind.service'
export default{
    components : {EmployeeListComponent},
    data(){
        return{
            SalaryCalc : {},
            salaryloading : false,
            OrganizationAccountList : [],
            StatusList : [],
            SaveLoading : false,
            totalRows: "",
            isBusy: false,
            isBusy2: false,
            filter: {
                DocumentId: 0,
                Search : "",
                SortColumn: "",
                OrderType: "asc",
                PageNumber: 1,
                PageLimit: 20,
                pageOptions: [5, 10, 15, 20, 25, 50, 100],
                SortIcon : "arrow-up",
            },  
            SalaryCalcTables : [
                {key : 'ondate',label:this.$t('ondate')},
                {key : 'personname',label : this.$t('personname'),class: "text-left"},
                {key : 'employee',label : this.$t('employmenttypename'),class: "text-left"},
                {key : 'positionname',label : this.$t('positionname'),class: "text-left"},
                // {key : 'plandays',label : this.$t('plandays')},
                // {key : 'planhours',label : this.$t('planhours')},
                // {key : 'factdays',label : this.$t('factdays')},
                // {key : 'facthours',label : this.$t('facthours')},
                {key: 'day',label: this.$t("days"), class: "text-right"},
                {key: 'hour', label: this.$t('hours'), class: "text-right"}, 
                {key : 'accrualsum',label: this.$t('totalaccrualsum'),class: "text-right"},
                {key : 'deductionsum',label : this.$t('totaldeductionsum'),class: "text-right"},
                {key : 'actions',label : this.$t('actions')}
            ],
            RowTables : [
                {key : 'ondate',label:this.$t('ondate'),thClass : 'text-center'},
                {key : 'schoolsubjectname',label : this.$t('schoolsubjectname'),thClass : 'text-center'},
                {key : 'qualificationcategoryname',label : this.$t('qualificationcategoryname'),thClass : 'text-center'},
                {key : 'calculationkindname',label : this.$t('calculationkindname'),thClass : 'text-center'},
                // {key : 'plandays',label : this.$t('plandays')},
                // {key : 'planhours',label : this.$t('planhours')},
                // {key : 'factdays',label : this.$t('factdays')},
                // {key : 'facthours',label : this.$t('facthours')},
                {key: 'day', label : this.$t('days'),thClass : 'text-center'},
                {key: 'hour',label: this.$t('hours'),thClass : 'text-center'},
                {key : 'percentage',label : this.$t('percentage'),thClass : 'text-center'},
                {key : 'insum',label : this.$t('insum'),class: "text-right"},
                {key : 'outsum',label : this.$t('outsum'),class: "text-right"},
                {key : 'actions',label : this.$t('actions'),thClass : 'text-center'}
            ],
            tabrow : {
                id : 0,
                ownerid : 0,
                ondate : '',
                plandays : 0,
                planhours : 0,
                factdays : 0,
                facthours : 0,
                personid : 0,
                personname : '',
                employeeenrolmentid : 0,
                positionid : 0,
                positionname : '',
                employmenttypeid: 0,
                employmentrate : 0,
                RowTotalSum : 0,
                Status : 1,
                rowTables : []
            },
            tables : {
                id : 0,
                ownerid : 0,
                ondate : '',
                plandays : 0,
                planhours : 0,
                factdays : 0,	
                facthours : 0,
                calculationkindid : 0,
                percentage : 0,
                insum : 0,
                outsum : 0,
                Status : 1 
            },  
            
            personvalue : {},
            EmployeeEnrolmentList : [],
            PositionList : [],
            EmploymentTypeList : [],
            CalculationKindList : [],
            editedIndex : -1,
            editedIndex1 : -1,
            FillTable : []

        }
    },
    created(){
        SalaryCalcService.Get(this.$route.params.id).then(res => {
            this.SalaryCalc = res.data
            this.filter.DocumentId = this.$route.params.id;
            this.Refresh();
            // if(this.$router.params.id != 0){
            //     this.FillData()
            // }
             //this.FillData()
        })
        OrganizationService.GetOrganizationAccountList().then(res => {
            this.OrganizationAccountList = res.data
        })
        HelperService.GetStateList().then(res => {
            this.StatusList = res.data
        })
        PositionService.GetAll1().then(res => {
            this.PositionList = res.data
        })
        HelperService.GetEmploymentType().then(res => {
            this.EmploymentTypeList = res.data
        })
        CalculationKindService.GetAll().then(res => {
            this.CalculationKindList = res.data
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
    },
  },
    methods:{
    clearTable() {
        var self = this;
        if(this.totalRows == 0)
        {
             this.$bvModal.hide('clearModal')
           this.makeToast(this.$t("FillTAble"), this.$t("Error"), "danger");
                return false;
        }
       SalaryCalcService.ClearSalaryCalc(self.SalaryCalc).then((res) => {
                this.salaryloading = false
                this.FillTable = res.data
                this.filter.DocumentId = res.data.id
                this.Refresh()
                 this.$bvModal.hide('clearModal')
            }).catch(error => {
                this.salaryloading = false
                this.makeToast(error.response.data.error,this.$t('Error'),'danger')
            })
           
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
      SalaryCalcService.GetSalaryCalcEnrolments(
        this.filter.DocumentId,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.SalaryCalc.EnrolmentTables = res.data.rows;
        this.totalRows = res.data.total;
      });
    },
    
    rowClass(item, type) {
            if (item.Status === 3) {
                return "d-none";
            }
        },
    FillData() {
      var self = this;
      if(this.totalRows > 0)
      {
           this.makeToast(this.$t("ClearTable"), this.$t("Error"), "danger");
                return false;
      }
      this.salaryloading = true
        SalaryCalcService.FillSalaryCalc(self.SalaryCalc)
            .then((res) => {
                this.salaryloading = false
                this.FillTable = res.data
                this.filter.DocumentId = res.data.id
                this.Refresh()
            
            }).catch(error => {
                this.salaryloading = false
                this.makeToast(error.response.data.error,this.$t('Error'),'danger')
            })
    },
        EditItem(item){
            if(item.Status === 0){
                item.Status = 2
            }
            this.editedIndex = this.tabrow.rowTables.indexOf(item);
            this.tables = Object.assign({}, item);
            this.$bvModal.show("RowTableModal");
        },
        View(item){
            this.isBusy2 = true
           SalaryCalcService.GetSalaryCalcRows(item.id).then((res) =>{
            this.editedIndex1 = this.SalaryCalc.EnrolmentTables.indexOf(item);
             this.tabrow = Object.assign({}, item);
             this.tabrow.rowTables = res.data
             this.isBusy2 = false
           }).catch(error => {
               this.makeToast(error.response.data.error || error,this.$t('error'), 'danger')
               this.isBusy2 = false
           })
            this.$bvModal.show("AddModal");
        },
        DeleteItem(item){
            item.Status = 3
        },
        CloseAddTableModal(){
            this.$bvModal.hide("AddModal");
            this.$nextTick(() => {
                this.tabrow = {
                    id : 0,
                    ownerid : 0,
                    ondate : '',
                    plandays : 0,
                    planhours : 0,
                    factdays : 0,
                    facthours : 0,
                    personid : 0,
                    personname : '',
                    employeeenrolmentid : 0,
                    positionid : 0,
                    employmenttypeid: 0,
                    employmentrate : 0,
                    Status : 1,
                    rowTables : []
                },
                this.editedIndex1 = -1;
            });
        },
        CloseRowTableModal() {
            this.$bvModal.hide("RowTableModal");
            this.$nextTick(() => {
                this.tables = {
                    id : 0,
                    ownerid : 0,
                    ondate : '',
                    plandays : 0,
                    planhours : 0,
                    factdays : 0,	
                    facthours : 0,
                    calculationkindid : 0,
                    percentage : 0,
                    insum : 0,
                    outsum : 0,
                    Status : 1 
                };
                this.editedIndex = -1;
            });
        },
        SelectedItem(data){
            this.personvalue = data
        },
        makeToast(message, title, type) {
            var self = this;
            self.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 2000,
                variant: type,
                solid: true,
            });
        },
        AddPerson(data){
            this.CloseEmployeeModal()
            this.tabrow.personid = data.personid
            this.tabrow.personname = data.personname
            this.ChangePerson()
        },
        CloseEmployeeModal(){
          this.$bvModal.hide('PersonModal')
        },
        ChangePerson(){
            if(!!this.tabrow.personid){
                HelperService.GetEmployeeEnrolment(this.tabrow.personid).then(res => {
                this.EmployeeEnrolmentList = res.data
                this.tabrow.employeeenrolmentid = res.data[0].personid
                })
            }
        },
        check(){
            var self = this;
            if (
                self.SalaryCalc.docnumber === 0 ||
                self.SalaryCalc.docnumber === null ||
                self.SalaryCalc.docnumber === undefined ||
                self.SalaryCalc.docnumber === ""
            ) {
                this.makeToast(this.$t("DocNumberNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SalaryCalc.docdate === 0 ||
                self.SalaryCalc.docdate === null ||
                self.SalaryCalc.docdate === undefined ||
                self.SalaryCalc.docdate === ""
            ) {
                this.makeToast(this.$t("DocDateNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SalaryCalc.organizationaccountid === 0 ||
                self.SalaryCalc.organizationaccountid === null ||
                self.SalaryCalc.organizationaccountid === undefined ||
                self.SalaryCalc.organizationaccountid === ""
            ) {
                this.makeToast(this.$t("organizationaccountidNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            if (
                self.SalaryCalc.statusid === 0 ||
                self.SalaryCalc.statusid === null ||
                self.SalaryCalc.statusid === undefined ||
                self.SalaryCalc.statusid === ""
            ) {
                this.makeToast(this.$t("statusidNotCorrect"), this.$t("Error"), "danger");
                return false;
            }
            return true
        },
        
        SaveData(){
            var self = this;
            if (!self.check()) {
                return false;
            }
            self.SalaryCalc.EnrolmentTables.forEach(function (item) {
              item.Status = 0;        
          });
            this.SaveLoading = true
            SalaryCalcService.Update(self.SalaryCalc)
                .then((res) => {
                    this.SaveLoading = false
                self.makeToast(
                    self.$t("SuccessMessage"),
                    self.$t("message"),
                    "success"
                );
                self.$router.push({ name: "SalaryCalc" });
                })
                .catch((error) => {
                    this.SaveLoading = false
                self.makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
            });
            
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
}
</script>

<style></style>
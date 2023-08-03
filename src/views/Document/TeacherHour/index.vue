<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("TeacherHour") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="2" md="2" sm="5" class="text-left mt-1">
              <label class="col-form-label" for>{{ $t("StartDate") }}</label>

              <date-picker
                v-model="filter.StartDate"
                style="width: 100%"
                size="sm"
                lang="ru"
                :placeholder="$t('StartDate')"
                value-type="format"
                format="DD.MM.YYYY"
              ></date-picker>
            </CCol>
            <CCol lg="2" md="2" sm="11" class="text-left mt-1">
              <ValidationProvider v-slot="v" name="EndDate">
                <label class="col-form-label" for>{{ $t("EndDate") }}</label>

                <!-- <custom-date-input />  -->
                <date-picker
                  v-model="filter.EndDate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                  <template slot="invalid-feedback">
                    <div class="invalid-feedback">{{ v.errors[0] }}</div>
                  </template>
                </date-picker>
              </ValidationProvider>
            </CCol>
            <CCol lg="4" md="5" sm="11" class="text-left mt-1">
              <label class="col-form-label" for>{{ $t("search") }}</label>

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

            <CCol lg="4" md="6" sm="12" class="text-lg-right mt-1">
              <CButton
                v-if="$can('TeacherHourEdit', 'permissions')"
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-1"
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
          <CRow>
            <CCol lg="2" md="2" sm="12" class="text-left mt-1">
              <label class="col-form-label" for>{{ $t("SchoolYear") }}</label>

              <v-select
                :options="schoolyearlist"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('SchoolYear')"
                label="name"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-1">
              <label class="col-form-label" for>{{
                $t("OrgSchoolGrade")
              }}</label>

              <v-select
                :options="orgschoolgradelist"
                v-model="filter.orgschoolgradeid"
                :reduce="(item) => item.id"
                :placeholder="$t('OrgSchoolGrade')"
                label="name"
              >
              </v-select>
            </CCol>
            <CCol lg="2" md="2" sm="12" class="text-left mt-1">
              <label class="col-form-label" for>{{
                $t("schoolsubject")
              }}</label>

             <v-select
                    :options="schoolsubjectlist"
                    v-model="filter.schoolsubjectid"
                    :reduce="item => item.id"
                    :placeholder="$t('schoolsubject')"
                    label="name"
                  >
                  </v-select>
            </CCol>
            <CCol lg="5" md="5" sm="12">
              <label class="col-form-label">{{ $t("Employee") }}</label>
              <div class="d-flex col-sm-9">
                <CInput
                  class="mb-0 mr-2"
                  style="width: 100%"
                  disabled
                  v-model="filter.personname"
                ></CInput>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="OpenEmployeeModal"
                >
                  <b-icon icon="three-dots"></b-icon>
                </b-button>
                <b-button
                  size="sm"
                  variant="primary"
                  class="mb-0 ml-2"
                  @click="ChangeRefresh"
                >
                  <b-icon icon="arrow-repeat">
                  </b-icon>
                </b-button>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <div>
          <b-tabs class="ml-1 mt-3">
            <b-tab :title="$t('TeacherHourTab1')">
              <CCardBody>
                <b-table
                  :fields="fields"
                  :items="items"
                  style="height: 500px"
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
                    <div style="cursor: pointer" @click="ChangeSort('id')">
                      {{ $t("id") }}
                      <b-icon
                        v-if="filter.SortColumn === 'id'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(docnumber)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('docnumber')"
                    >
                      {{ $t("docnumber") }}
                      <b-icon
                        v-if="filter.SortColumn === 'docnumber'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(docdate)>
                    <div style="cursor: pointer" @click="ChangeSort('docdate')">
                      {{ $t("docdate") }}
                      <b-icon
                        v-if="filter.SortColumn === 'docdate'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(schoolyear)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('schoolyear')"
                    >
                      {{ $t("schoolyear") }}
                      <b-icon
                        v-if="filter.SortColumn === 'schoolyear'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(personname)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('personname')"
                    >
                      {{ $t("Employee") }}
                      <b-icon
                        v-if="filter.SortColumn === 'personname'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(positionname)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('positionname')"
                    >
                      {{ $t("positionname") }}
                      <b-icon
                        v-if="filter.SortColumn === 'positionname'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(hours)>
                    <div style="cursor: pointer" @click="ChangeSort('hours')">
                      {{ $t("hours") }}
                      <b-icon
                        v-if="filter.SortColumn === 'hours'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(totalaccrualsum)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('totalaccrualsum')"
                    >
                      {{ $t("totalaccrualsum") }}
                      <b-icon
                        v-if="filter.SortColumn === 'totalaccrualsum'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(homeschoolinghours)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('homeschoolinghours')"
                    >
                      {{ $t("homeschoolinghours") }}
                      <b-icon
                        v-if="filter.SortColumn === 'homeschoolinghours'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(employeeenrolmentid)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('employeeenrolmentid')"
                    >
                      {{ $t("employeeenrolmentid") }}
                      <b-icon
                        v-if="filter.SortColumn === 'employeeenrolmentid'"
                        :icon="filter.SortIcon"
                      ></b-icon>
                    </div>
                  </template>
                  <template v-slot:head(detailinfo)>
                    <div
                      style="cursor: pointer"
                      @click="ChangeSort('detailinfo')"
                    >
                      {{ $t("detailinfo") }}
                      <b-icon
                        v-if="filter.SortColumn === 'detailinfo'"
                        :icon="filter.SortIcon"
                      ></b-icon>
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
                    <CBadge :color="getItemColor(item.statusid)">{{
                      item.statusname
                    }}</CBadge>
                  </template>
                  <template v-slot:cell(actions)="row">
                    <div class="text-center">
                      <b-link
                        @click="toggleDetail(row)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('ShowDetail') }"
                      >
                        <b-icon
                          scale="1.5"
                          :icon="row.detailsShowing ? 'x' : 'plus'"
                        ></b-icon>
                      </b-link>
                      <b-link
                        v-if="$can('TeacherHourEdit', 'permissions')"
                        @click="Edit(row.item)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil"></b-icon>
                      </b-link>
                      <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                        <div slot="button-content">
                          <b-icon icon="three-dots-vertical"></b-icon>
                        </div>
                        <div>
                          <b-dropdown-item
                            v-if="$can('TeacherHourAccept', 'permissions')"
                            @click="$bvModal.show('AcceptModal' + row.item.id)"
                          >
                            <b-icon class="mr-2" icon="check2"></b-icon>
                            &nbsp; {{ $t("Acceptt") }}
                          </b-dropdown-item>
                          <b-dropdown-item
                            v-if="$can('TeacherHourCancel', 'permissions')"
                            @click="$bvModal.show('CancelModal' + row.item.id)"
                          >
                            <b-icon icon="x" class="mr-2"></b-icon>
                            {{ $t("NotAccept") }}
                          </b-dropdown-item>
                          <b-dropdown-item
                            v-if="$can('TeacherHourDelete', 'permissions')"
                            @click="$bvModal.show('DeleteModal' + row.item.id)"
                          >
                            <b-icon icon="trash" class="mr-2"></b-icon>
                            {{ $t("Delete") }}
                          </b-dropdown-item>
                        </div>
                      </b-dropdown>
                      <b-modal :id="'DeleteModal' + row.item.id" hide-footer>
                        <template v-slot:modal-title>{{
                          $t("WantDelete")
                        }}</template>
                        <div class="d-block text-right">
                          <CButton
                            @click="$bvModal.hide('DeleteModal' + row.item.id)"
                            color="danger"
                            class="mr-2"
                          >
                            <b-icon icon="x"></b-icon>
                            {{ $t("NotAccept") }}
                          </CButton>
                          <CButton @click="Delete(row.item)" color="success">
                            <b-icon icon="check2"></b-icon>
                            {{ $t("Approve") }}
                          </CButton>
                        </div>
                      </b-modal>
                      <b-modal :id="'CancelModal' + row.item.id" hide-footer>
                        <template v-slot:modal-title>{{
                          $t("WantCancel")
                        }}</template>
                        <div class="d-block text-right">
                          <CButton
                            @click="$bvModal.hide('CancelModal' + row.item.id)"
                            color="danger"
                            class="mr-2"
                          >
                            <b-icon icon="x"></b-icon>
                            {{ $t("NotAccept") }}
                          </CButton>
                          <CButton
                            @click="CancelApproval(row.item)"
                            color="success"
                          >
                            <b-icon icon="check2"></b-icon>
                            {{ $t("Approve") }}
                          </CButton>
                        </div>
                      </b-modal>
                      <b-modal :id="'AcceptModal' + row.item.id" hide-footer>
                        <template v-slot:modal-title>{{
                          $t("WantAccept")
                        }}</template>
                        <div class="d-block text-right">
                          <CButton
                            @click="$bvModal.hide('AcceptModal' + row.item.id)"
                            color="danger"
                            class="mr-2"
                          >
                            <b-icon icon="x"></b-icon>
                            {{ $t("NotAccept") }}
                          </CButton>
                          <CButton @click="Approve(row.item)" color="success">
                            <b-icon icon="check2"></b-icon>
                            {{ $t("Approve") }}
                          </CButton>
                        </div>
                      </b-modal>
                    </div>
                  </template>
                  <template #cell(totalaccrualsum)="{ item }">
                    <p class="m-0 p-0">
                      {{
                        $options.filters.currency(item.totalaccrualsum, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </p>
                  </template>
                  <template v-slot:row-details="row">
                    <b-row>
                      <b-col>
                        <b-table-simple
                          :busy="isBusy1"
                          small
                          responsive
                          hover
                          :bordered="false"
                        >
                          <b-thead>
                            <b-tr style="background-color: #eee">
                              <b-th
                                v-for="(item, i) in fields1"
                                :key="i"
                                class="text-center"
                              >
                                {{ item.label }}
                              </b-th>
                            </b-tr>
                          </b-thead>
                          <b-tbody v-if="items1[row.item.id].length != 0">
                            <b-tr
                              v-for="(el, index) in items1[row.item.id]"
                              :key="index"
                            >
                              <b-td>{{ el.schoolsubjectname }}</b-td>
                              <b-td>{{ el.qualificationcategoryname }}</b-td>
                              <b-td>{{ el.orgschoolgradename }}</b-td>
                              <b-td>{{ el.hours }}</b-td>
                              <b-td>{{ el.studentcount }}</b-td>
                              <b-td>{{ el.homeschoolinghour }}</b-td>
                              <b-td>{{ el.homeschstdudentcount }}</b-td>
                            </b-tr>
                          </b-tbody>
                          <b-tbody v-if="items1[row.item.id].length == 0">
                            <b-tr>
                              <b-td colspan="4">{{ $t("NoItems") }}</b-td>
                            </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </b-col>
                    </b-row>
                  </template>
                  <template v-slot:empty>
                    <h5 class="text-center">{{ $t("NoItems") }}</h5>
                  </template>
                  <template v-slot:table-busy>
                    <div
                      class="text-center text-primary my-2 mt-5"
                      style="vertical-align: middle"
                    >
                      <b-spinner class="align-middle mr-2"></b-spinner>
                      <strong>{{ $t("Loading") }}</strong>
                    </div>
                  </template>
                </b-table>
                <div class="pb-4">
                  <div style="float: left; font-size: 12px">
                    {{ $t("RecordsFrom") }} {{ this.firstNumber }}
                    {{ $t("by") }} {{ this.lastNumber }} {{ $t("of") }}
                    {{ this.totalRows }}
                  </div>
                  <div style="float: left" class="ml-2 mr-2 mt-n1">
                    <b-form-select
                      v-model="filter.PageLimit"
                      id="PageLimitSelect"
                      size="sm"
                      :options="filter.pageOptions"
                    ></b-form-select>
                  </div>
                  <div style="float: left; font-size: 12px">
                    {{ $t("RecordsPerPage") }}
                  </div>
                  <div style="float: right">
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
            </b-tab>
            <b-tab :title="$t('TeacherHourTab2')" @click="RefreshHour2">
              <CCardBody>
                <div class="table-container" style="overflow-y:auto;height:65vh">
                <b-table-simple
                  :busy="isBusy2"
                  small
                   class="table table-bordered table-responsive stikcy-header"
                  responsive
                  hover
                  :bordered="false"
                >
                  <b-thead>
                    <b-tr style="background-color: #eee">
                      <b-th
                        v-for="(item, i) in fields2"
                        :key="i"
                        class="text-center"
                      >
                        {{ item.label }}
                      </b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody v-if="items2.length != 0 && isBusy2 == false">
                    <b-tr
                      v-for="(el, index) in items2"
                      :key="index"
                    >
                     <b-td>{{ el.personname }}</b-td>
                      <b-td>{{ el.schoolsubjectname }}</b-td>
                      <b-td>{{ el.qualificationcategoryname }}</b-td>
                      <b-td>{{ el.orgschoolgradename }}</b-td>
                      <b-td style="text-align: center;">{{ el.hours }}</b-td>
                      <b-td style="text-align: center;">{{ el.studentcount }}</b-td>
                      <b-td style="text-align: center;">{{ el.homeschoolinghour }}</b-td>
                      <b-td style="text-align: center;">{{ el.homeschstdudentcount }}</b-td>
                    </b-tr>
                    <tr style="text-align: center;vertical-align: middle;font-weight: bold" class="footer">					
								<td >{{$t('Total')}}</td>	
                <td >{{$t('')}}</td>
                <td >{{$t('')}}</td>	
                <td >{{$t('')}}</td>							
								<td style="text-align: center;">{{bottomrow.hours== 0?'-': $options.filters.currency(bottomrow.hours, {symbol: '', fractionCount: 0})}}</td>
								<td style="text-align: center;">{{bottomrow.studentcount== 0?'-': $options.filters.currency(bottomrow.studentcount, {symbol: '', fractionCount: 0})}}</td>
								<td style="text-align: center;">{{bottomrow.homeschoolinghour== 0?'-': $options.filters.currency(bottomrow.homeschoolinghour, {symbol: '', fractionCount: 0})}}</td>
                                <td style="text-align: center;">{{bottomrow.homeschstdudentcount== 0?'-': $options.filters.currency(bottomrow.homeschstdudentcount, {symbol: '', fractionCount: 0})}}</td>
								<!-- <td>{{bottomrow.boyscount== 0?'-': $options.filters.currency(bottomrow.boyscount, {symbol: '', fractionCount: 0})}}</td> -->
							</tr>
                  </b-tbody>
                  <b-tbody v-if="items2.length == 0">
                    <b-tr>
                      <b-td  style="text-align: center;" colspan="8">{{ $t("NoItems") }}</b-td>
                    </b-tr>
                  </b-tbody>
                 <b-tbody >
              <b-tr v-if="isBusy2">
                <b-td class="text-center" colspan="8">
                  <b-spinner></b-spinner>
                </b-td>
              </b-tr>
            </b-tbody>
                </b-table-simple>
                </div>
              </CCardBody>
            </b-tab>
          </b-tabs>
        </div>
        <b-modal
          id="modalXl"
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
            @SelectedItem="SelectedItem"
            @DblClick="AddPerson"
          >
          </employee-list-component>
          <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
          <!-- <edit-person-component></edit-person-component> -->

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPerson(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import TeacherHourService from "@/services/TeacherHour.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import EmployeeListComponent from "@/components/EmployeeList";
export default {
  components: { EmployeeListComponent },
  data() {
    return {
      fields1: [
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategoryname"),
        },
        { key: "orgschoolgradename", label: this.$t("orgschoolgradename") },
        { key: "hours", label: this.$t("hours") },
        { key: "studentcount", label: this.$t("studentcount") },
        { key: "homeschoolinghour", label: this.$t("homeschoolinghour") },
        { key: "homeschstdudentcount", label: this.$t("homeschstdudentcount") },
      ],
      fields2: [
        { key: "personname", label: this.$t("person") },
        { key: "schoolsubjectname", label: this.$t("schoolsubjectname") },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategoryname"),
        },
        { key: "orgschoolgradename", label: this.$t("orgschoolgradename") },
        { key: "hours", label: this.$t("hours") },
        { key: "studentcount", label: this.$t("studentcount") },
        { key: "homeschoolinghour", label: this.$t("homeschoolinghour") },
        { key: "homeschstdudentcount", label: this.$t("homeschstdudentcount") },
      ],
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
          key: "schoolyearname",
          label: this.$t("schoolyear"),
          sortable: false,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
        },
        {
          key: "hours",
          label: this.$t("hours"),
          sortable: false,
        },
        {
          key: "homeschoolinghours",
          label: this.$t("homeschoolinghours"),
          sortable: false,
        },
        {
          key: "totalaccrualsum",
          label: this.$t("totalaccrualsum"),
          sortable: false,
          style: "white-space:nowrap",
        },
        {
          key: "positionname",
          label: this.$t("positionname"),
          sortable: false,
        },
        {
          key: "employeeenrolmentid",
          label: this.$t("employeeenrolmentid"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      schoolyearlist: [],
      items2:[],
      isBus2:false,
      orgschoolgradelist: [],
      schoolsubjectlist:[],
      totalRows: "",
      isBusy: true,
      isBusy2:false,
      filter: {
        schoolyearid: 0,
        personid: 0,
        orgschoolgradeid: 0,
        personname: "",
        schoolsubjectid: 0,
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
      },
      isBusy1: false,
      items1: [],
    };
  },
  created() {
    this.createDate();
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OrgSchoolGradeService.GetAll("", 0, this.$route.query.orgid).then((res) => {
      this.orgschoolgradelist = res.data;
    });
    SchoolSubjectService.GetAll().then(res => {
      this.schoolsubjectlist = res.data;
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
    toggleDetail(row) {
      row.toggleDetails();
      if (!row.detailsShowing) {
        this.isBusy1 = true;
        TeacherHourService.Get(row.item.id).then((res) => {
          this.items1[row.item.id] = res.data.Tables;
          this.isBusy1 = false;
        });
      }
    },
    calculateTotal(item){
      var  hours= 0;
      var studentcount= 0;      
      var homeschoolinghour= 0;    
      var  homeschstdudentcount= 0;   
      item.forEach(function (item) {          
            hours = hours + item.hours;
            studentcount = studentcount + item.studentcount;
            homeschoolinghour = homeschoolinghour + item.homeschoolinghour;
            homeschstdudentcount = homeschstdudentcount + item.homeschstdudentcount;
      });
      this.bottomrow= {
        hours : hours,
        studentcount: studentcount, 
        homeschoolinghour : homeschoolinghour,
        homeschstdudentcount : homeschstdudentcount
      }
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    AddPerson(data) {
      this.CloseEmployeeModal();
      this.filter.personid = data.personid;
      this.filter.personname = data.personname;
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      var yyyy1 = todaydate.getFullYear() - 1;
      this.filter.StartDate = "01.01." + yyyy1;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
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
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditTeacherHour",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditTeacherHour",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      TeacherHourService.Delete(item.id)
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
    Approve(item) {
      var self = this;
      TeacherHourService.Approve(item.id)
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
    CancelApproval(item) {
      var self = this;
      TeacherHourService.CancelApproval(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("CancelMessage"),
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
    ChangeRefresh(){
      this.RefreshHour2();
      this.Refresh()
    },

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    RefreshHour2() {
      this.isBusy2 = true;
      TeacherHourService.AttachedHours(
        this.filter.schoolyearid,
        this.filter.personid,
        this.filter.orgschoolgradeid,
        this.filter.schoolsubjectid
      ).then((res) => {
        this.isBusy2 = false;
        this.items2 = res.data;
        this.calculateTotal(this.items2)
      });
    },
    Refresh() {
      this.isBusy = true;
      TeacherHourService.GetList(
        this.filter.schoolyearid,
        this.filter.personid,
        this.filter.orgschoolgradeid,
        this.filter.schoolsubjectid,
        this.filter.StartDate,
        this.filter.EndDate,
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

<style>
.footer{
position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
</style>

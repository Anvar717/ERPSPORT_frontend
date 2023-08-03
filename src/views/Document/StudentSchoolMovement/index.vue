<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="my-3 mx-1">
          <b-col>
            <h3>{{ $t("StudentSchoolMovement") }}</h3>
          </b-col>
          <b-col class="text-right">
            <CButton
              v-if="
                filter.DocumentType == 1 &&
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  !$can('RegionXTB', 'permissions')
              "
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
          </b-col>
        </b-row>
        <b-tabs class="mx-2">
          <!-- variant="pills" -->
          <b-tab active class="ml-2" @click="FirstTab">
            <template slot="title">
              <b-icon icon="box-arrow-up"></b-icon>
              {{ $t("OutputStudentSchoolMovement") }}
            </template>
          </b-tab>
          <b-tab @click="SecondTab" class="ml-2">
            <template slot="title">
              <b-icon icon="box-arrow-down"></b-icon>
              {{ $t("InputStudentSchoolMovement") }}
            </template>
          </b-tab>
        </b-tabs>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="4" sm="12" class="text-left d-flex mt-2">
              <div class="mr-2">
                <date-picker
                  v-model="filter.StartDate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('StartDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
              <div>
                <date-picker
                  v-model="filter.EndDate"
                  style="width:100%;"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('EndDate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                >
                </date-picker>
              </div>
            </CCol>
            <CCol lg="2" md="4" sm="12" class="text-left d-flex mt-2">
              <v-select
                :options="schoolyearlist"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('schoolyear')"
                style="width:100% !important"
                label="name"
              ></v-select>
            </CCol>
            <CCol lg="5" md="4" sm="12" class="text-lg-right mt-2">
              <b-input-group>
                <b-form-input
                  v-model="filter.organizationname"
                  :placeholder="$t('organization')"
                ></b-form-input>
                <b-form-input
                  v-model="filter.personname"
                  :placeholder="$t('person')"
                ></b-form-input>
                <b-form-input
                  :placeholder="$t('search')"
                  v-model="filter.Search"
                  v-on:keyup.enter="Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="Search" variant="outline-primary"
                    ><b-icon icon="search"></b-icon>
                    {{ $t("search") }}</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </CCol>
          </CRow>
          <CRow
            class="form-group"
            v-if="
              $can('AdminView', 'permissions') ||
                $can('MinSportView', 'permissions') ||
                $can('OblastSport', 'permissions') ||
                $can('RegionXTB', 'permissions')
            "
          >
            <CCol class="d-flex mt-2">
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                    $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="changeOblast()"
              ></v-select>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    !$can('OblastSport', 'permissions') &&
                    $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 100%"
                @input="changeRegion()"
              ></v-select>
              <v-select
                :options="OrganizationList"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                @input="Refresh"
                :placeholder="$t('organization')"
                label="name"
                style="width:100%"
                class="mr-2"
              ></v-select>
            </CCol>
          </CRow>
          <b-row class="mt-4">
            <b-col>
              <b-button-group @click="Refresh" size="sm">
                <b-button
                  @click="filter.statusid = 0"
                  :variant="
                    filter.statusid == 0 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("All") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 1"
                  :variant="
                    filter.statusid == 1 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("AllNew") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 4"
                  :variant="
                    filter.statusid == 4 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("edited") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 2"
                  :variant="
                    filter.statusid == 2 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("accepted") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 3"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("canceledStatus") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 8"
                  :variant="
                    filter.statusid == 8 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("SendAll") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 14"
                  :variant="
                    filter.statusid == 14 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("AllNotAcceptStatus") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 9"
                  :variant="
                    filter.statusid == 9 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("ReceivedStatus") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 10"
                  :variant="
                    filter.statusid == 10 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("NotReceivedStatus") }}
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
          <CRow class="form-group mt-4">
            <CCol sm="12" md="9">
              <h4 class="m-0 p-0 region-text">
                <a href="javascript:void(0)" @click="topcountrychange">{{
                  $t("O`zbekiston")
                }}</a>
                <a href="javascript:void(0)" @click="topoblastchange">{{
                  filter.OblastName
                }}</a>
                <a href="javascript:void(0)">{{ filter.RegionName }}</a>
              </h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style=" height:450px"
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
                <b-icon
                  v-if="filter.SortColumn === 'id'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(toorganization)>
              <div style="width:100px">
                {{ $t("toorganization") }}
              </div>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor : pointer" @click="ChangeSort('docnumber')">
                {{ $t("docnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor : pointer" @click="ChangeSort('docdate')">
                {{ $t("docdate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolyearname)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('schoolyearname')"
              >
                {{ $t("schoolyearname") }}
                <b-icon
                  v-if="filter.SortColumn === 'schoolyearname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(curriculumtypename)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('curriculumtypename')"
              >
                {{ $t("curriculumtypename") }}
                <b-icon
                  v-if="filter.SortColumn === 'curriculumtypename'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(ishomeschooling)>
              <div
                style="cursor : pointer"
                @click="ChangeSort('ishomeschooling')"
              >
                {{ $t("ishomeschooling") }}
                <b-icon
                  v-if="filter.SortColumn === 'ishomeschooling'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div style="cursor : pointer" @click="ChangeSort('status')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'status'"
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
                  v-if="
                    filter.DocumentType == 1 &&
                      !(
                        $can('AdminView', 'permissions') ||
                        $can('MinSportView', 'permissions') ||
                        $can('OblastSport', 'permissions') ||
                        $can('RegionXTB', 'permissions')
                      )
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    filter.DocumentType == 2 &&
                      !(
                        $can('AdminView', 'permissions') ||
                        $can('MinSportView', 'permissions') ||
                        $can('OblastSport', 'permissions') ||
                        $can('RegionXTB', 'permissions')
                      )
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.DocumentType == 1"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="filter.DocumentType == 2"
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-dropdown
                  variant="link"
                  no-caret
                  class="ml-n2 px-0"
                  v-if="
                    !(
                      $can('AdminView', 'permissions') ||
                      $can('MinSportView', 'permissions') ||
                      $can('OblastSport', 'permissions') ||
                      $can('RegionXTB', 'permissions')
                    )
                  "
                >
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 1"
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Approve") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 1"
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 1"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 1"
                      @click="$bvModal.show('SentModal' + item.id)"
                    >
                      <b-icon icon="cursor" class="mr-2"></b-icon>
                      {{ $t("Sent") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 2"
                      @click="$bvModal.show('ReceivedModal' + item.id)"
                    >
                      <b-icon icon="check2" class="mr-2"></b-icon>
                      {{ $t("Received") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 1"
                      @click="$bvModal.show('CancelModal1' + item.id)"
                    >
                      <b-icon icon="x-circle" class="mr-2"></b-icon>
                      {{ $t("CancelDocument") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 2"
                      @click="$bvModal.show('NotReceivedModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotReceived") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="filter.DocumentType == 2"
                      @click="InsertDocument(item)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("Insert") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
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
                <b-modal :id="'CancelModal1' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal1' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Cancel(item)" color="success">
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
                <b-modal :id="'SentModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantSent") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('SentModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Sent(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'ReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantReceived")
                  }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('ReceivedModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Received(item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'NotReceivedModal' + item.id" hide-footer>
                  <template v-slot:modal-title>{{
                    $t("WantNotReceived")
                  }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('NotReceivedModal' + item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="NotReceived(item)" color="success">
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
                class="text-center text-primary my-2 mt-2"
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
        <b-container
          class="sidebar-vsx"
          fluid
          v-if="InsertSchoolAdmissionsidebarOpen"
        >
          <b-row>
            <b-col>
              <h4
                class="text-right"
                @click="InsertSchoolAdmissionsidebarOpen = false"
                style="cursor:pointer"
              >
                <b-icon icon="x"></b-icon>
              </h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label>{{ $t("OrgSchoolGrade") }}</label>
              <v-select
                :options="orgschoolgradelist"
                v-model="SchoolAdmission.orgschoolgradeid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              >
              </v-select>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <CButton
                @click="InsertSchoolAdmission"
                block
                type="button"
                size="sm"
                color="primary"
              >
                <b-icon icon="check2" class="mr-2"></b-icon>
                {{ $t("InsertSchoolAdmission") }}
              </CButton>
            </b-col>
          </b-row>
        </b-container>
      </vs-sidebar>
    </CCol>
  </CRow>
</template>

<script>
import StudentSchoolMovementService from "@/services/StudentSchoolMovement.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import SchoolAdmissionService from "@/services/SchoolAdmission.service";
import SchoolYearService from "@/services/SchoolYear.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
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
          key: "schoolyearname",
          label: this.$t("schoolyearname"),
          sortable: false,
        },
        {
          key: "fromorganizationname",
          label: this.$t("fromorganization"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "orgschoolgradename",
          label: this.$t("orgschoolgrade"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "toorganizationname",
          label: this.$t("toorganization"),
          style: "width:100px",
          class: "text-left",
          sortable: false,
        },
        {
          key: "frompersonname",
          label: this.$t("frompersonname"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          class: "text-left",
          sortable: false,
        },
        {
          key: "studentexpulsionname",
          label: this.$t("studentexpulsion"),
          sortable: false,
        },
        {
          key: "schooladmissionname",
          label: this.$t("schooladmission"),
          sortable: false,
        },
        {
          key: "schooladmission",
          label: this.$t("schooladmission"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        statusid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        DocumentType: 1,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        StartDate: "",
        EndDate: "",
        organizationname: "",
        personname: "",
        schoolyearid: 3,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        OblastName: "",
        RegionName: "",
        OrganizationName: "",
      },
      InsertSchoolAdmissionsidebarOpen: false,
      orgschoolgradelist: [],
      OblastList: [],
      RegionList: [],
      SchoolAdmission: {},
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        estatementnumber: "",
        estatementdate: "",
        studentadmissionid: 0,
        schooladmestatementid: 0,
        studentschoolmovementid: 0,
        Status: 1,
      },
      SchoolAdmission: {},
      // tabrow: {
      //   id: 0,
      //   ownerid: 0,
      //   personid: 0,
      //   personname: "",
      //   estatementnumber: "",
      //   estatementdate: "",
      //   studentadmissionid: 0,
      //   schooladmestatementid: 0,
      //   studentschoolmovementid: 0,
      //   Status: 1,
      // },
      schoolyearlist: [],
      OrganizationList: [],
    };
  },
  created() {
    if (!!this.$route.query.Search) {
      this.filter.Search = this.$route.query.Search;
    }
    this.filter.schoolyearid = parseInt(
      localStorage.getItem("default_school_year")
    );
    OrgSchoolGradeService.GetAll().then((res) => {
      this.orgschoolgradelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
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
    },
  },
  methods: {
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = "01.01.2020";
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    InsertDocument(item) {
      var self = this;
      self.InsertSchoolAdmissionsidebarOpen = true;

      SchoolAdmissionService.Get(0).then((res) => {
        self.SchoolAdmission = res.data;
        self.SchoolAdmission.Tables = [];

        self.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          estatementnumber: "",
          estatementdate: "",
          studentadmissionid: 0,
          schooladmestatementid: 0,
          studentschoolmovementid: item.id,
          Status: 1,
        };

        self.SchoolAdmission.Tables.push(self.tabrow);
        self.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          estatementnumber: "",
          estatementdate: "",
          studentadmissionid: 0,
          schooladmestatementid: 0,
          studentschoolmovementid: 0,
          Status: 1,
        };
      });
    },
    topcountrychange() {
      this.filter.oblastid = 0;
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.OblastName = "";
      this.filter.RegionName = "";
      this.Refresh();
    },
    topoblastchange() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      this.filter.RegionName = "";
      this.Refresh();
    },
    InsertSchoolAdmission() {
      var self = this;
      /*  let idlist = [];
      this.checkedItems.filter(function(e) {
        idlist.push({ id: e.id });
      }); */

      SchoolAdmissionService.Insert(self.SchoolAdmission)
        .then((res) => {
          self.InsertSchoolAdmissionsidebarOpen = false;
          self.makeToast(self.$t("sendAll"), self.$t("message"), "success");
          self.Refresh();
        })
        .catch((error) => {
          self.InsertSchoolAdmissionsidebarOpen = false;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отправлен"
        ? "success"
        : text === "Отозван"
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    changeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    changeRegion() {
      console.log(JSON.parse(localStorage.getItem("user_info")).isonlineadm);
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          null,
          0,
          JSON.parse(localStorage.getItem("user_info")).isonlineadm,
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    Create() {
      this.$router.push({
        name: "EditStudentSchoolMovement",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditStudentSchoolMovement",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewStudentSchoolMovement",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      StudentSchoolMovementService.Delete(item.id)
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
    Cancel(item) {
      var self = this;
      StudentSchoolMovementService.Cancel(item.id)
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
    Approve(item) {
      var self = this;
      StudentSchoolMovementService.Approve(item.id)
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
      StudentSchoolMovementService.CancelApproval(item.id)
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
    Sent(item) {
      var self = this;
      StudentSchoolMovementService.Sent(item.id)
        .then((res) => {
          self.makeToast(self.$t("SentMessage"), self.$t("message"), "success");
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
    Received(item) {
      var self = this;
      StudentSchoolMovementService.Accept(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("ReceivedMessage"),
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
    NotReceived(item) {
      var self = this;
      StudentSchoolMovementService.Reject(item.id)
        .then((res) => {
          self.makeToast(
            self.$t("NotReceivedMessage"),
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    FirstTab() {
      this.filter.DocumentType = 1;
      this.Refresh();
    },
    SecondTab() {
      this.filter.DocumentType = 2;
      this.Refresh();
    },
    Refresh(documenttype) {
      this.isBusy = true;
      StudentSchoolMovementService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.DocumentType,
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.schoolyearid,
        this.filter.organizationname,
        this.filter.personname,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.statusid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.filter.oblastid = res.data.oblastid;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
          this.filter.OblastName = " / " + res.data.oblastname;
        }
        this.filter.regionid = res.data.regionid;
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false
          ).then((res) => {
            this.OrganizationList = res.data;
          });
          this.filter.RegionName = " / " + res.data.regionname;
        }
        this.totalRows = res.data.data.total;
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
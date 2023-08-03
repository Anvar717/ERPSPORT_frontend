<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("TeacherReTraining") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="2" md="2" class="text-left mt-2">
              <label class="col-form-label" for>{{ $t("StartDate") }}</label>

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
            <CCol lg="2" md="2" class="text-left mt-2">
              <label class="col-form-label" for>{{ $t("EndDate") }}</label>

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

            <CCol lg="1" md="1" sm="11" class="text-left mt-2">
              <!-- <CInput
                :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries"
              >
              </CInput> -->
              <label class="col-form-label" for>{{
                $t("documentseries")
              }}</label>
              <b-input
                :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries"
              >
              </b-input>
            </CCol>
            <CCol lg="2" md="2" sm="11" class="text-left mt-2">
              <label class="col-form-label" for>{{
                $t("documentnumber")
              }}</label>
              <CInput
                :placeholder="$t('documentnumber')"
                autocomplete="text"
                v-model="filter.documentnumber"
              >
              </CInput>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <label class="col-form-label" for>{{ $t("Teacher") }}</label>
              <CInput
                :placeholder="$t('Teacher')"
                autocomplete="text"
                v-model="filter.personname"
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
            <CCol lg="2" md="2" sm="12" class="text-lg-right mt-5">
              <CButton
                @click="Create"
                v-if="
                  $can('TeacherRetrainingEdit', 'permissions') &&
                    !(
                      $can('AdminView', 'permissions') ||
                      $can('MinSportView', 'permissions') ||
                      $can('OblastSport', 'permissions') ||
                      $can('RegionXTB', 'permissions')
                    )
                "
                color="primary"
                variant="outline"
                size="sm"
                class="mr-2"
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
              <!-- <v-select
                  :options="schoolyearlist"
                  v-model="filter.schoolyearid"
                  :reduce="(item) => item.id"
                  class="mr-2"
                style="width: 100%"
                  :placeholder="$t('SchoolYear')"
                  label="name"
                >
                </v-select> -->
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
          <CRow>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <v-select
                v-model="filter.schoolsubjectid"
                :reduce="(item) => item.id"
                label="name"
                :options="SchoolSubjectList"
                :placeholder="$t('schoolsubject')"
              >
              </v-select>
            </CCol>
            <CCol lg="8" md="8" sm="12" class="text-left mt-2">
              <b-button-group @click="Refresh">
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
                  @click="filter.statusid = 3"
                  :variant="
                    filter.statusid == 3 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("canceled1") }}
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
                  @click="filter.statusid = 8"
                  :variant="
                    filter.statusid == 8 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("SendAll") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 10"
                  :variant="
                    filter.statusid == 10 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("canceled") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 9"
                  :variant="
                    filter.statusid == 9 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("accepted1") }}
                </b-button>
              </b-button-group>
            </CCol>
            <CCol lg="1" md="1" sm="12" class="text-right mt-2">
              <CButton @click="Print" color="primary" class="mr-2" size="sm">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
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
              <div style="cursor: pointer" @click="ChangeSort('docnumber')">
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
            <template v-slot:head(oblastname)>
              <div style="cursor: pointer" @click="ChangeSort('oblastname')">
                {{ $t("oblastname") }}
                <b-icon
                  v-if="filter.SortColumn === 'oblastname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(regionnname)>
              <div style="cursor: pointer" @click="ChangeSort('regionnname')">
                {{ $t("regionnname") }}
                <b-icon
                  v-if="filter.SortColumn === 'regionnname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(organizationname)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('organizationname')"
              >
                {{ $t("organizationname") }}
                <b-icon
                  v-if="filter.SortColumn === 'organizationname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(schoolsubjectname)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('schoolsubjectname')"
              >
                {{ $t("schoolsubjectname") }}
                <b-icon
                  v-if="filter.SortColumn === 'schoolsubjectname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(detailinfo)>
              <div style="cursor: pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'detailinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(statusname)>
              <div style="cursor: pointer" @click="ChangeSort('statusname')">
                {{ $t("status") }}
                <b-icon
                  v-if="filter.SortColumn === 'statusname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(oblastname)="{ item }">
              <span style="white-space: nowrap">
                {{ item.oblastname }}
              </span>
            </template>
            <template v-slot:cell(regionname)="{ item }">
              <span style="white-space: nowrap">
                {{ item.regionname }}
              </span>
            </template>
            <template v-slot:cell(schoolsubjectname)="{ item }">
              <span style="white-space: nowrap">
                {{ item.schoolsubjectname }}
              </span>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="text-center">
                <!-- <b-link
                  @click="toggleDetail(row)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('ShowDetail') }"
                >
                  <b-icon scale="1.5" :icon="row.detailsShowing ? 'x' : 'plus'"></b-icon>
                  
                </b-link> -->
                <b-link
                  style="font-size:17px"
                  @click="Edit(row.item)"
                  v-if="
                    $can('TeacherRetrainingEdit', 'permissions') &&
                      !(
                        $can('AdminView', 'permissions') ||
                        $can('MinSportView', 'permissions') ||
                        $can('OblastSport', 'permissions') ||
                        $can('RegionXTB', 'permissions')
                      ) &&
                      !(
                        row.item.statusid == 8 ||
                        row.item.statusid == 9 ||
                        row.item.statusid == 2
                      )
                  "
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>
                <b-link
                  @click="View(row.item)"
                  class="mr-2"
                  style="font-size:18px"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon icon="eye"></b-icon>
                </b-link>
                <b-link
                  style="font-size:17px"
                  @click="OpenViewModal(row.item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('history') }"
                >
                  <b-icon icon="chat-left-dots"></b-icon>
                </b-link>
                <b-dropdown
                  v-if="
                    ($can('TeacherRetrainingApprove', 'permissions') ||
                      $can('TeacherRetrainingCancelApproval', 'permissions') ||
                      $can('TeacherRetrainingSend', 'permissions') ||
                      $can('TeacherRetrainingDelete', 'permissions')) &&
                      !(
                        $can('AdminView', 'permissions') ||
                        $can('MinSportView', 'permissions') ||
                        $can('OblastSport', 'permissions') ||
                        $can('RegionXTB', 'permissions')
                      ) &&
                      !(row.item.statusid == 9 || row.item.statusid == 8)
                  "
                  variant="link"
                  no-caret
                  class="ml-n2 px-0"
                >
                  <div slot="button-content">
                    <b-icon
                      style="font-size:17px"
                      icon="three-dots-vertical"
                    ></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="
                        $can('TeacherRetrainingApprove', 'permissions') &&
                          !(
                            row.item.statusid == 8 ||
                            row.item.statusid == 9 ||
                            row.item.statusid == 2
                          )
                      "
                      @click="$bvModal.show('AcceptModal' + row.item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can(
                          'TeacherRetrainingCancelApproval',
                          'permissions'
                        ) &&
                          (row.item.statusid == 8 ||
                            row.item.statusid == 9 ||
                            row.item.statusid == 2)
                      "
                      @click="$bvModal.show('CancelModal' + row.item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('TeacherRetrainingSend', 'permissions') &&
                          !(
                            row.item.statusid == 8 ||
                            row.item.statusid == 9 ||
                            row.item.statusid == 10
                          )
                      "
                      @click="$bvModal.show('SendModal' + row.item.id)"
                    >
                      <b-icon class="mr-2" icon="cursor"></b-icon>
                      &nbsp; {{ $t("Send") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="
                        $can('TeacherRetrainingDelete', 'permissions') &&
                          !(
                            row.item.statusid == 2 ||
                            row.item.statusid == 9 ||
                            row.item.statusid == 8
                          )
                      "
                      @click="$bvModal.show('DeleteModal' + row.item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-modal :id="'DeleteModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
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
                  <template v-slot:modal-title>{{ $t("WantCancel") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('CancelModal' + row.item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="CancelApproval(row.item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'AcceptModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantAccept") }}</template>
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
                <b-modal :id="'SendModal' + row.item.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantSend") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('SendModal' + row.item.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Send(row.item)" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Send") }}
                    </CButton>
                  </div>
                </b-modal>
                <b-modal :id="'ViewModal' + row.item.id" hide-footer size="xl">
                  <template v-slot:modal-title>{{ $t("History") }}</template>
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
                              v-for="(item, i) in fields2"
                              :key="i"
                              class="text-center"
                            >
                              {{ item.label }}
                            </b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody v-if="History.length != 0">
                          <b-tr v-for="(el, index) in History" :key="index">
                            <b-td class="text-center"
                              ><CBadge :color="getItemColor(el.statusname)">{{
                                el.statusname
                              }}</CBadge></b-td
                            >
                            <b-td class="text-center">{{ el.username }}</b-td>
                            <b-td class="text-center">{{
                              el.dateofcreated
                            }}</b-td>
                            <b-td class="text-left">{{ el.returnreason }}</b-td>
                          </b-tr>
                        </b-tbody>
                        <b-tbody v-if="History.length == 0">
                          <b-tr>
                            <b-td class="text-center" colspan="4">{{
                              $t("NoItems")
                            }}</b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                    </b-col>
                  </b-row>
                  <!-- <div style="width: 100%; height: 100%">
                    <div
                      class="container-fluid w-100"
                      style="
                        width: 100% !important;
                        position: relative;
                        overflow-y: auto;
                      "
                    >
                      <b-row class="p-0">
                        <b-col>
                          <ul class="timeline">
                            <li v-for="(el, i) in History" :key="i">
                              <b-row class="p-0">
                                <b-col class="float-left">
                                  <b-row class="p-0 ml-5">
                                    <b-col class="float-left">
                                      <div
                                        class="
                                          d-flex
                                          justify-content-between
                                          flex-sm-row flex-column
                                          mb-sm-0 mb-1
                                        "
                                      >
                                      </div>
                                      <p>
                                        <b-badge :variant="getItemColor(el)">{{
                                          el.dateofcreated
                                        }}</b-badge>
                                        -
                                        <b-badge :variant="getItemColor(el)">
                                          {{ el.statusname }}
                                        </b-badge>
                                        {{ el.returnreason == null ? "" : "-" }}
                                        {{ el.returnreason }}
                                      </p>
                                    </b-col>
                                  </b-row>
                                </b-col>
                              </b-row>
                            </li>
                          </ul>
                        </b-col>
                      </b-row>
                    </div>
                  </div> -->
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
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import TeacherReTrainingService from "@/services/TeacherReTraining.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
export default {
  data() {
    return {
      fields2: [
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "username",
          label: this.$t("username"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "returnreason",
          label: this.$t("returnreason"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "oblastname",
          label: this.$t("oblast"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("person"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "diplomserianumber",
          label: this.$t("docserainumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "dateofissue",
          label: this.$t("dateofissue"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubject"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "givenbyorgname",
          label: this.$t("givenbyorgid"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "statusname",
          label: this.$t("status"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      items: [],
      SchoolSubjectList: [],
      totalRows: "",
      PrintLoading: false,
      isBusy: true,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        schoolsubjectid: 0,
        statusid: 0,
        StartDate: "",
        EndDate: "",
        personname: "",
        StartDate: "",
        documentseries: "",
        documentnumber: "",
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
      ViewModal: false,
      items1: [],
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      History: [],
    };
  },
  created() {
    this.createDate();
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      this.SchoolSubjectList = res.data;
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
    Print() {
      this.PrintLoading = true;
      TeacherReTrainingService.PrintList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.statusid,
        this.filter.schoolsubjectid,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.personname,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "TeacherReTraining.xlsx");

          fileLink.click();
          this.PrintLoading = false;
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
          this.PrintLoading = false;
        });
    },
    toggleDetail(row) {
      row.toggleDetails();
      if (!row.detailsShowing) {
        this.isBusy1 = true;
        // TeacherReTrainingService.Get(row.item.id).then((res) => {
        //   this.items1[row.item.id] = res.data.Tables;
        //   this.isBusy1 = false;
        // });
      }
    },
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
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    View(item) {
      this.$router.push({
        name: "ViewTeacherReTraining",
        params: {
          id: item.id,
        },
      });
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var mm1 = String(todaydate.getMonth() + 2).padStart(2, "0");
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
    OpenViewModal(id) {
      this.$bvModal.show("ViewModal" + id);
      TeacherReTrainingService.GetTeacherReTrainingprotocol(id).then((res) => {
        this.History = res.data.History;
      });
    },
    Create() {
      this.$router.push({
        name: "EditTeacherReTraining",
        params: {
          id: 0,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditTeacherReTraining",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      TeacherReTrainingService.Delete(item.id)
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
    Send(item) {
      var self = this;
      TeacherReTrainingService.Send(item.id)
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
    Approve(item) {
      var self = this;
      TeacherReTrainingService.Approve(item.id)
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
      TeacherReTrainingService.CancelApproval(item.id)
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      TeacherReTrainingService.GetList(
        this.filter.StartDate,
        this.filter.EndDate,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.statusid,
        this.filter.schoolsubjectid,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.personname,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        if (res.data.oblastid != 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid != 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          // this.filter.regionname = res.data.regionname;
          OrganizationService.GetAll(
            this.filter.oblastid,
            this.filter.regionid,
            false
          ).then((res) => {
            this.OrganizationList = res.data;
          });
          // this.filter.regionname = this.RegionList.filter(
          //   (item) => (this.filter.regionid = item.id)
          // )[0].name;
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
<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <b-row class="card-head mt-3 mx-1">
          
          <b-col md="2" >
            <CButton
              color="danger"
              @click="$router.push('/')" 
              size="sm">
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </b-col>
          <b-col md="6"
            ><h4 class="text-center">{{ $t("AthletePassport") }}</h4>
          </b-col>

          <b-col md="4" class="text-right d-flex justify-content-end">
            <div class="mr-2">
              <b-button
                :variant="cache_filters === false ? 'primary' : 'danger'"
                size="sm"
                v-b-toggle.collapse-1
                ><b-icon icon="funnel-fill"></b-icon>
              </b-button>
            </div>            
            <div class="mr-2">
              <CButton
                @click="Create"
                v-if="$can('AthletePassportEdit', 'permissions')"
                color="primary"
                variant="outline"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                {{ $t("Create") }}
              </CButton>
            </div>
            <div class="mr-2">
              <CButton @click="Print" color="primary" size="sm">
                <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
                <b-spinner v-if="PrintLoading" small></b-spinner>
                &nbsp; {{ $t("Export") }}
              </CButton>
            </div>
          </b-col>
        </b-row>
        <CCardHeader>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <custom-filter-collapse
                :filter="filter"
                @search="Search"
                v-model="filter"
                @clear="clearFilter"
                isCollapse
              ></custom-filter-collapse>
            </b-card>
          </b-collapse>
          <CRow class="form-group" style="margin-left: 0px">
            <CCol
              v-if="
                $can('MinSportView', 'permissions') &&
                $can('MinSportView', 'permissions') &&
                $can('AdminView', 'permissions')
              "
              lg="3"
              md="2"
              sm="1"
              class="text-left mt-1 pl-0"
            >
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
            <CCol
              v-if="
                $can('MinSportView', 'permissions') &&
                $can('MinSportView', 'permissions') &&
                $can('AdminView', 'permissions')
              "
              lg="3"
              md="2"
              sm=""
              class="text-left mt-1 pl-0"
            >
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
            <CCol
              v-if="
                $can('MinSportView', 'permissions') &&
                $can('MinSportView', 'permissions') &&
                $can('AdminView', 'permissions')
              "
              lg="2"
              md="3"
              sm="12"
              class="text-left mt-1 pl-0 mr-0"
            >
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
            <!-- <CCol lg="2" md="2" sm="" class="text-left mt-1 pl-0">
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
            </CCol> -->
            <!-- <CCol lg="2" md="2" sm="1" class="text-left mt-1 pl-0">
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
            </CCol> -->
          </CRow>
          <CRow class="form-group" style="margin-left: 0px; margin-top: 10px">
          </CRow>
          <CRow class="form-group" style="margin-left: 0px; margin-top: 10px">
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
                v-model="filter.fakeSearch"
                @search="Search"
              ></custom-search>
            </CCol>
          </CRow>
          <b-row>
            <b-col>
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group mr-3"
              >
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
                  {{ $t("Qoralama") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 8"
                  :variant="
                    filter.statusid == 8 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("senttedestatement") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 10"
                  :variant="
                    filter.statusid == 10 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("Canceled") }}
                </b-button>
                <b-button
                  @click="filter.statusid = 9"
                  :variant="
                    filter.statusid == 9 ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("receivedcount") }}
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
                    typeof filter.isoldathletepassport == 'string'
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  <span>{{ $t("All") }}</span>
                </b-button>
                <b-button
                  @click="filter.isoldathletepassport = true"
                  :variant="
                    filter.isoldathletepassport === true
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  {{ $t("isnew") }}
                </b-button>
                <b-button
                  @click="filter.isoldathletepassport = false"
                  :variant="
                    filter.isoldathletepassport === false
                      ? 'primary'
                      : 'outline-primary'
                  "
                >
                  {{ $t("isold") }}
                </b-button>
              </b-button-group>
              <!-- <custom-filter :filter="filter" @search="Search" v-model="filter"></custom-filter> -->
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            style="white-space: nowrap; min-height: 500px"
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
            <!-- <template v-slot:head(athletepassportseriesname)>
              <div style="cursor: pointer; width: 100px;" @click="ChangeSort('athletepassportseriesname')">
                {{ $t("Sport passport seriyasi") }}
                <b-icon
                  v-if="filter.SortColumn === 'athletepassportseriesname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template> -->
            <template v-slot:cell(isoldathletepassport)="{ item }">
              <span>{{
                item.isoldathletepassport ? $t("yes") : $t("no")
              }}</span>
            </template>
            <template v-slot:head(docnumber)>
              <div style="cursor: pointer" @click="ChangeSort('docnumber')">
                {{ $t("Sport passport raqami") }}
                <b-icon
                  v-if="filter.SortColumn === 'docnumber'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docdate)>
              <div style="cursor: pointer" @click="ChangeSort('docdate')">
                {{ $t("dateofissue") }}
                <b-icon
                  v-if="filter.SortColumn === 'docdate'"
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
              <CBadge
                style="color: white"
                :color="getItemColor(item.statusid)"
                >{{ item.statusname }}</CBadge
              >
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="
                    $can('AthletePassportEdit', 'permissions') &&
                    item.statusid != 2 &&
                    item.statusid != 8 &&
                    item.statusid != 9
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-link>

                <b-link
                  @click="View(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('View') }"
                >
                  <b-icon scale="1.2" icon="eye"></b-icon>
                </b-link>
                <b-link
                  v-if="item.statusid == 9"
                  @click="Printer(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Print') }"
                >
                  <b-icon scale="1.2" icon="printer"></b-icon>
                </b-link>
                <b-link
                  v-if="
                    item.statusid != 2 &&
                    item.statusid != 8 &&
                    item.statusid != 9
                  "
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon scale="1.2" icon="trash"></b-icon>
                </b-link>
                <!-- <b-dropdown variant="link" no-caret class="ml-n2 px-0">
                  <div slot="button-content">
                    <b-icon icon="three-dots-vertical"></b-icon>
                  </div>
                  <div>
                    <b-dropdown-item
                      v-if="item.statusid != 2"
                      @click="$bvModal.show('AcceptModal' + item.id)"
                    >
                      <b-icon class="mr-2" icon="check2"></b-icon>
                      &nbsp; {{ $t("Acceptt") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="item.statusid != 3"
                      @click="$bvModal.show('CancelModal' + item.id)"
                    >
                      <b-icon icon="x" class="mr-2"></b-icon>
                      {{ $t("NotAccept") }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="item.statusid != 2"
                      @click="$bvModal.show('DeleteModal' + item.id)"
                    >
                      <b-icon icon="trash" class="mr-2"></b-icon>
                      {{ $t("Delete") }}
                    </b-dropdown-item>
                  </div>
                </b-dropdown> -->
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
                <!-- <b-modal :id="'CancelModal' + item.id" hide-footer>
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
                    <CButton
                      v-if="
                        $can('AthletePassportCancelApproval', 'permissions')
                      "
                      @click="CancelApproval(item)"
                      color="success"
                    >
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal> -->
                <!-- <b-modal :id="'AcceptModal' + item.id" hide-footer>
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
                    <CButton
                      v-if="$can('AthletePassportApprove', 'permissions')"
                      @click="Approve(item)"
                      color="success"
                    >
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal> -->
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
          </b-table>
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
    <CCol v-show="false">
      <!-- <template v-slot:cell(photo)="{ item }">
        <div>
          <img
            :src="
              !!item.attachmentfileid
                ? axios.defaults.baseURL +
                  'FileManage/Get?id=' +
                  item.attachmentfileid
                : 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEPDQ4QEA0QDQ8ODRAOEA4SDw8NDw0QFREWIhURExMYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANgA6QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADQQAQACAAIHBgQGAgMAAAAAAAABAgMRBAUVMVFjkhIhQWFxkSIygaETQmKxwdEzciNS4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAHxyx9KpT5rRHlvn2B2FbfXFI3VtPtDzXXNfGkx6TEgtBywNIriRnWc/Lxj1dQAAAAAAAAAAAAAAAAAAAAAAHnEvFYmZnKI3zwfZnJn9Y6ZOJbKPkjdHHzkHXTNaWtnFPhrx/NP9K+ZHwAAHql5rOcTMTxhMwtaYkb5i0ecd6CAv9E1lW/dPwW4Tun0lOZJe6p0ub1mtu+1fHjALAAAAAAAAAAAAAAAAAAAAFdrnH7NOzG+85fTxUax13fPFiP8ArWPvKuAAAAAAATNU3yxq+ecfb/xDSdXf5sP1n9pBpIAAAAAAAAAAAAAAAAAAABnda2zx7+WUfZESdZ/57+v8IwAAAAAACRq+csbD/wBv4R3rDv2bRaN9ZifYGrgeMK2dYnjET7w9gAAAAAAAAAAAAAAAAAAzms4/57/T9kVZ66wJi8X8JiKz5SrAAAAAAAH2Iz7uPc+Jmq8Dt4kT+WnfP8QC/wAKuVYjhEQ9AAAAAAAAAAAAAAAAAAADlpGFF6WrPjHtPhLNYuHNbTWYymGqU+vML5L5fpn+AVQAAAAAPsRnOXHuaTQtHjDpEeO+Z4ypdWYPbxa8K/FP0aIAAAAAAAAAAAAAAAAAAAABF1jgdvCtEb4+KPWEp8kGTHvGj47f7W/d4AAAABdakw8qWt4zbL6Qs1fqW0fhZcLT91gAAAAAAAAAAAAAAAAAAAEoukafSn5s54R3yDviYkViZmcojxU+l61tMzFPhjj4z/SPpmmWxZ7+6sbq/wAyig+vgAAAAAkaHpc4VpmO+J3xuzX2i6TXEjOs+seMMy7aNjzh2i0fWPCY4A0446NpFcSudZ9Y8Y+jsAAAAAAAAAAADjpeN+HS1uEd3nIOubliaTSu+9Y+sZ+zP42l3vvvPpHdDgC9xNa4cbs7ekZIuLri0/LSI85nNWAO+Lpd7/NecuG6HAAAAAAAAAAAAeqXms5xMxPlOSbga1xK/NlePPun3QAGgwNZ4dt89ieE/wBpkWifHNk3XB0i9PltMeXh7A1Ap9H1vP565/qj+lrhYtbRnWYmAewAAAAAFTrzE7qU4/FK2lntbXzxrfpiIBDAAAAAAAAAAAAAAAAAAAASND0mcO0TG7xjjCOA1lLZxExumM4fUXVt88GnlGX1hKAAAAB8mcmWxr9q1rcZmfu0GscTs4V54xl7s4AAAAAAAAAAAAAAAAAAAAAAC01JjfFanH4o9Y3rlmtAv2cak/qy+k9zSgAAAArNd3ypWONs/ZSrLXl88SscK5+8q0AAAAAAAAAAAAAAAAAAAAAAH2s5TE8Jzaqk5xE8YzZRptBtnhYc/oj9gdwACQBnNZ3zxr+WUe0Iq6xdU9q1rfiZZzM5ZPGxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsXmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoaDVFs8GvlMx90bY3MnpTtC0b8Ks17XaznPdkCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z'
                "
                  class="img-thumbnail float-end"
                  fluid
                  style="
                    width: 70px;
                    height: 70px;
                    object-fit: cover;
                    max-width: 70px !important;
                "
          />
        </div>
      </template> -->
      <div class="main" id="printer">
        <div class="main-img">
          <div class="div1">
            <div>
              <img
                class="logo"
                src="/img/pasport_img/LOGO 2 SPORT.png"
                alt=""
              />
            </div>
            <img
              class="person"
              src="/img/pasport_img/person-png-icon-1.jpg"
              alt=""
            />
            <div>
              <img class="gerb" src="/img/pasport_img/uzb_gerb.svg" alt="" />
            </div>
            <div>
              <h1 class="seria">
                <b
                  >{{ printer.athletepassportseriesname }}
                  <span>{{ printer.docnumber }}</span>
                </b>
              </h1>
            </div>
          </div>
          <div class="div2">
            <h1 class="sport_pasport">Sport pasporti</h1>
            <p>Спортивный паспорт - Sports passport</p>
            <h5 style="padding-top: 32px !important">familiyasi / surname</h5>
            <h2>
              <b style="text-transform: uppercase">{{ passport.familyname }}</b>
            </h2>
            <h5>ismi / given name</h5>
            <h2>
              <b style="text-transform: uppercase">{{ passport.firstname }}</b>
            </h2>
            <h5>Otasining ismi / Father's name</h5>
            <h2>
              <b style="text-transform: uppercase">{{ passport.lastname }}</b>
            </h2>
            <h5>Berinlgan sanasi / Date of issue</h5>
            <h2>
              <b style="text-transform: uppercase">{{ printer.docdate }}</b>
            </h2>
            <h5>Amal qilish muddati / Date of issue</h5>
            <h2>
              <b style="text-transform: uppercase">{{
                printer.docexpiredate
              }}</b>
            </h2>
            <h5>Jshshir / Pinoi</h5>
            <h2>
              <b style="text-transform: uppercase">{{ passport.pinfl }}</b>
            </h2>
          </div>
          <div class="qrcode">
            <qrcode-vue
              :value="`${passport.firstname}`"
              :size="120"
              render-as="svg"
              level="H"
            />
          </div>
        </div>
      </div>
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
import printer from "./printer.vue";
import html2pdf from "html2pdf.js";
import QrcodeVue from "qrcode.vue";
import CustomFilterCollapse from "../../../components/customFilterCollapse.vue";
export default {
  components: { printer, QrcodeVue, CustomFilterCollapse },
  data() {
    return {
      oblastlist: [],
      regionlist: [],
      genderlist: [],
      organizationlist: [],
      sporttypeclassifierlist: [],
      identityDocumentlist: [],
      documentSerieslist: [],
      passport: {},
      printer: {},
      personPhoto: {},
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "persondateofbirth",
          label: this.$t("dateofbirth"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personpinfl",
          label: this.$t("pinfl"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "athletepassportseriesname",
          label: this.$t("Sport passport seriyasi"),
          sortable: false,
          thClass: "text-center",
          thStyle: "text-wrap: wrap;width: 110px",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          label: this.$t("Sport passport raqami"),
          sortable: false,
          thClass: "text-center",
          thStyle: "text-wrap: wrap;width: 110px",
          tdClass: "text-center",
        },
        {
          key: "docdate",
          label: this.$t("dateofissue"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docexpiredate",
          label: this.$t("expirationdate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isoldathletepassport",
          label: this.$t("isoldathletepassport"),
          sortable: false,
          thClass: "text-center",
          thStyle: "text-wrap: wrap;width: 100px",
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
      PrintLoading: false,
      cache_filters: false,
      filter: {
        personid: 0,
        personName: "",
        Search: "",
        statusid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 1,
        documentSeries: "",
        documentNumber: "",
        organizationId: 0,
        oblastId: 0,
        regionId: 0,
        genderid: 0,
        sporttypeclassifierid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        searchtype: 1,
        fakeSearch: "",
        startdate: "",
        enddate: "",
        isoldathletepassport: "",
      },
    };
  },
  created() {
    if (!!this.$route.query.Search) {
      this.filter.Search = this.$route.query.Search;
    }
    (this.filter.statusid = this.$route.query.statusid || this.filter.statusid),
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
    clearFilter() {
      this.filter = {
        personid: 0,
        personName: "",
        Search: "",
        statusid: 0,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 1,
        documentSeries: "",
        documentNumber: "",
        organizationId: 0,
        oblastId: 0,
        regionId: 0,
        genderid: 0,
        sporttypeclassifierid: 0,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        searchtype: 1,
        fakeSearch: "",
        startdate: "",
        enddate: "",
        isoldathletepassport: "",
      };
      this.cache_filters = false;
      this.Refresh();
    },
    Print() {
      this.PrintLoading = true;
      AthletePassportService.PrintGetList(
        this.filter.personid,
        this.filter.personName,
        this.filter.Search,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.organizationId,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.genderid,
        this.filter.sporttypeclassifierid,
        this.filter.isoldathletepassport
      )
        .then((res) => {
          this.PrintLoading = false;
          this.forceFileDownload(res, "Sport pasporti uchun so'rov yuborganlar");
        })
        .catch((error) => {
          this.PrintLoading = false;
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
      link.setAttribute("download", name + ".xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
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
      this.filter.fakeSearch = "";
    },
    View(item) {
      this.$router.push({
        name: "ViewAthletePassport",
        params: {
          id: item.id,
        },
        query: {
          statusid: this.filter.statusid,
          isremain: false,
        },
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
        ? "info"
        : id === 8
        ? "warning"
        : id === 9
        ? "success"
        : id === 10
        ? "danger"
        : "primary";
    },
    ChangeSearchType() {
      this.filter.pinfl = "";
      this.filter.personName = "";
      this.filter.fakeSearch = "";
    },
    Search() {
      if (this.filter.genderid == 0 && this.filter.sporttypeclassifierid == 0) {
        this.cache_filters = false;
        this.Refresh();
        return
      }
      if (this.filter.searchtype === 1) {
        this.filter.personName = this.filter.fakeSearch;
      }
      if (this.filter.searchtype === 2) {
        this.filter.pinfl = this.filter.fakeSearch;
      }
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.cache_filters = true;
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
    Edit(item) {
      this.$router.push({
        name: "EditAthletePassport",
        params: {
          id: item.id,
        },
        query: {
          Search: this.filter.Search,
        },
      });
    },
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
      AthletePassportService.GetList(
        this.filter.personid,
        this.filter.personName,
        this.filter.Search,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.pinfl,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.identityDocumentId,
        this.filter.documentSeries,
        this.filter.documentNumber,
        this.filter.organizationId,
        this.filter.oblastId,
        this.filter.regionId,
        this.filter.genderid,
        this.filter.sporttypeclassifierid,
        this.filter.isoldathletepassport
        // this.filter.schoolyearid,
        // this.filter.sportgroupid
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
      });
    },
    Printer(item) {
      var self = this;
      AthletePassportService.Get(item.id).then((res) => {
        self.passport = res.data.Person;
        self.printer = res.data;
        self.personPhoto = res.data.Person.PersonPhoto;
        var content = document.getElementById("printer");
        var opt = {
          margin: [-0.15, 0, -1, 0],
          filename: "sportchi_passporti.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
        };
        html2pdf().from(content).set(opt).save();
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
.main-img {
  /* height: 165vh; */
  height: 79vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  color: black;
  position: relative;
  margin-left: -26px;
  background-image: url("/img/pasport_img/backgraund_img.svg");
}
.div1 {
  margin-top: 100px;
  margin-left: 70px;
}
.logo {
  width: 340px;
}
.person {
  width: 300px;
  height: auto;
  margin-top: 100px;
  position: relative;
}
.seria {
  font-size: 40px;
  margin-top: 25px;
  letter-spacing: 0.02em;
  line-height: 0;
  margin-left: 20px;
}
.div2 {
  margin-top: 70px;
  margin-left: 80px;
  line-height: 0.4;
}
.div2 h1 {
  text-transform: uppercase;
  font-size: 70px;
  margin-top: 50px;
  line-height: 0;
}
.div2 p {
  font-size: 25px;
  /* letter-spacing: 0.2em; */
  margin-top: 50px;
}
.div2 h5 {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  line-height: 0;
  padding-top: 37px;
}
.div2 h2 {
  text-transform: uppercase;
  font-size: 40px;
  line-height: 0;
  padding-top: 22px;
}
.qrcode {
  width: 200px;
  height: 200px;
  position: absolute;
  display: block;
  float: right;
  bottom: 40px;
  right: -10px;
}
/* .qrcode img{
          width: 180px;
          height:180px;
      } */
.gerb {
  width: 100px;
  height: auto;
  position: absolute;
  top: 505px;
  left: 264px;
}
</style>

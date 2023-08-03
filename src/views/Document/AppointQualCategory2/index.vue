<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head p-3">
          <div class="w-100 text-center">
            <h3 class="text-center pl-1">{{ $t("AppointQualCategoryName") }}</h3>
          </div>
          <div class="btn_list w-100 text-lg-right mt-3 btn_group">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
              <b-icon icon="printer"> </b-icon>
              &nbsp; {{ $t("Print") }}
            </CButton>
            <b-dropdown
                id="dropdown-buttons"
                :text="$t('Create')"
                size="sm"
                variant="primary"
                class="mr-2"
              >
              <b-dropdown-item-button @click="ChangeSportQualSpecialty(item)"
              v-for="(item, i) in sportqualspecialtylist" :key="i"
                  >{{item.name}}</b-dropdown-item-button
                >
                <!-- <b-dropdown-item-button @click="ChangeTrener"
                  >Тренер</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="ChangeInstructor"
                  >Инструктор - методист</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="ChangeReferee"
                  >Ҳакам</b-dropdown-item-button
                > -->
              </b-dropdown>
              <!-- <CButton
                v-if="$can('AppointQualCategorySportEdit', 'permissions')"
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon icon="plus"> </b-icon>
                &nbsp; {{ $t("Create") }}
              </CButton> -->
            <CButton
              color="danger"
              class="float-sm-right mr-1"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </div>
        </div>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
              :disabled="
                (!$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  $can('OblastSport', 'permissions')) ||
                $can('RegionXTB', 'permissions')
              "
                v-model="filter.oblastid"
                :reduce="(item) => item.id"
                label="name"
                @input="changeOblast(filter.oblastid)"
                :options="OblastList"
                :placeholder="$t('oblast')"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
              :disabled="
                !$can('AdminView', 'permissions') &&
                !$can('MinSportView', 'permissions') &&
                !$can('OblastSport', 'permissions') &&
                $can('RegionXTB', 'permissions')
              "
                v-model="filter.regionid"
                :options="RegionList"
                :reduce="(item) => item.id"
                label="name"
                :placeholder="$t('region')"
                @input="changeRegion(filter.oblastid, filter.regionid)"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                label="name"
                :options="OrganizationList"
                :placeholder="$t('organization')"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <v-select
                :options="qualificationcategorylist"
                v-model="filter.qualificationcategoryid"
                :reduce="(item) => item.id"
                :placeholder="$t('qualificationcategory')"
                label="name"
                class="fname-select"
              >
              </v-select>
            </CCol>
          </CRow>
          <CRow class="form-group">
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <v-select
                :options="sporttypeclassifierlist"
                v-model="filter.sporttypeclassifierId"
                :reduce="(item) => item.id"
                :placeholder="$t('sporttypeclassifier')"
                label="name"
                class="fname-select"
              >
              </v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <!-- <CInput
              size="sm"
                :placeholder="$t('documentseries')"
                autocomplete="text"
                v-model="filter.documentseries"
              >
              </CInput> -->
              <b-input-group>
                <b-input
                  style="width: 35%"
                  v-model="filter.documentseries"
                  :placeholder="$t('documentseries')"
                ></b-input>
                <b-input
                  style="width: 65%"
                  v-model="filter.documentnumber"
                  :placeholder="$t('documentnumber')"
                ></b-input>
              </b-input-group>
            </CCol>
            <!-- <CCol lg="2" md="2" sm="12" class="text-left mt-2">
              <CInput
              size="sm"
                :placeholder="$t('documentnumber')"
                autocomplete="text"
                v-model="filter.documentnumber"
              >
              </CInput>
            </CCol> --><CCol lg="3" md="3" sm="12" class="mt-2">
              <v-select
                :options="sportqualspecialtylist"
                :reduce="(item) => item.id"
                :placeholder="$t('SportQualSpecialTy')"
                label="name"
                v-model="filter.sportqualspecialtyid"
              ></v-select>
            </CCol>
            <CCol lg="3" md="3" sm="12" class="text-left mt-2">
              <CInput
                size="md"
                :placeholder="$t('search')"
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
            <!-- <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
              </CButton>
            </CCol> -->
          </CRow>
          <b-row>
            <b-col>
              <b-button-group @click="Refresh" size="sm" class="sportTitle-btn-group">
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
                  {{ $t("canceled1") }}
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </CCardHeader>
        <CCardBody>
          <!-- style="white-space: nowrap" -->
          <b-table
            :fields="fields"
            :items="items"
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
            <template v-slot:head(detailinfo)>
              <div style="cursor: pointer" @click="ChangeSort('detailinfo')">
                {{ $t("detailinfo") }}
                <b-icon
                  v-if="filter.SortColumn === 'detailinfo'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(givenorganization)>
              <div
                style="cursor: pointer"
                @click="ChangeSort('givenorganization')"
              >
                {{ $t("givenorganization") }}
                <b-icon
                  v-if="filter.SortColumn === 'givenorganization'"
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
            <template #cell(item.)="{ item }">
              <b-icon
                scale="1.5"
                :icon="
                  item.isverified ? 'check-circle-fill' : 'info-circle-fill'
                "
                :variant="item.isverified ? 'success' : 'warning'"
              ></b-icon>
            </template>
            <template #cell(personname)="{ item }">
              <div @click="GoEmployeeCard(item)">
                <span style="color: blue; cursor: pointer">
                  {{ item.personname }}
                </span>
              </div>
            </template>
            <template v-slot:cell(statusname)="{ item }">
              <CBadge :color="getItemColor(item.statusid)">{{
                item.statusname
              }}</CBadge>
            </template>
            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="$can('AppointQualCategorySportEdit', 'permissions') && item.isverified!==true"
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
                  v-if="$can('AppointQualCategorySportDelete', 'permissions') && item.isverified!==true"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
                <b-link v-if="item.isverified == true" @click="Printer(item)" class="mr-2">
                  <b-icon icon="printer"></b-icon>
                </b-link>
              </div>
              <b-modal :id="'DeleteModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('DeleteModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Delete(item)" color="success">
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
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="Approve(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
              <b-modal :id="'NotAcceptModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{
                  $t("WantNotAccept")
                }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('NotAcceptModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("CancelApproval") }}
                  </CButton>
                  <CButton @click="CancelApproval(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </CButton>
                </div>
              </b-modal>
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
      <div id="malaka" style="padding: 0 10px;">
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td style="width: 50%;">
                <table style="width: 100%;">
                  <tbody>
                    <tr>
                      <td>
                        <img src="/img/img.svg" height="805" alt="">
                      </td>
                      <td>
                        <h2 style="margin-bottom: 240px;text-align: center; margin-top: -50px;">O'ZBEKISTON RESPUBLIKASI</h2>
                        <p style="text-align: center;">Malaka oshirish haqida</p>
                        <h2 style="text-align: center;">MALAKA SERTIFIKATI</h2>
                        <p style="text-align: center;">{{ malaka.documentseries }} № {{ malaka.documentnumber }}</p>
            
                        <div style="margin-top: 150px;">  
                          <p style="margin-bottom: 30px;">Qayd raqami: {{ malaka.docnumber }}</p>
                          <p>
                              <!-- Berilgan sana: {{ malaka.docdate.split('.')[2] }}-yil {{ malaka.docdate.split('.')[0] + '.' +  malaka.docdate.split('.')[1]}} -->
                              Berilgan sana: {{ malaka.docdate }}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="width: 50%;">
                <h3 style="text-align: center; margin-top: 0; margin-bottom: 50px;">Mazkur malaka sertifikati egasi</h3>
                <p style="text-align: center; border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px; font-size: medium;">
                  <u>&#8195;&#8195;&#8195;{{ malaka.personname }}&#8195;&#8195;&#8195;</u>
                </p>
                <p style="text-align: center; font-size: x-small; margin-top: -15px;">(Familiyasi, ismi, otasining ismi)</p>
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;font-size: medium;">
                    <u>{{ malaka.startdate }}</u> dan <u>{{ malaka.enddate }}</u>  gacha
                </p>
                <p style="text-align: center; font-size: x-small; margin-bottom: 30px;">&#8195;</p>
        
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;font-size: medium;"><u>&#8195;&#8195;{{ malaka.organizationname }} &#8195;&#8195;</u>da</p>
                <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Ta'lim muassasining nomi)</p>
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px; font-size: medium;"><u>{{ malaka.academichours || 10 }}</u>soatli</p>
                
                <p style="text-align: center; font-size: x-small;margin-top: -15px;">(vaqti)</p>
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;font-size: medium;"><u>{{ malaka.coursename || 'test' }}</u></p>
                <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Malaka oshirish kursining nomi)</p>
                <p style="margin-left: 20px;font-size: medium;">bo'yicha malakasini oshirdi.</p>
                <table>
                  <tbody>
                    <tr>
                      <td style="width: 30%;">
                        <p style="margin-left: 20px; margin-top: 10px;">
                          <b>Rektor_____________________</b><br>
                          <small style="margin-left: 80px;"><span style="font-size: x-small;">Rektor imzosi</span></small>
                        </p>
                      </td>
                      <td  style="width: 70%;">
                        <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;"><u>&#8195;&#8195;{{ malaka.director }} &#8195;&#8195;</u></p>
                        <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Familiyasi, ismi, otasining ismi)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="shape" style="height: 100px; margin-top: 50px;">
                    <div class="circle">M.O'</div>
                    <div style="display: block;float: right;width: 200px">
                      <qrcode-vue :value="`${malaka.personname}`" :size="120" render-as="svg" level="H" />
                    </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import AppointQualCategoryService from "@/services/AppointQualCategory.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import HelperService from "@/services/helper.service";
import OrganizationService from "@/services/organization.service";
import malaka from "./malaka.vue";
import html2pdf from 'html2pdf.js'
import QrcodeVue from 'qrcode.vue'
export default {
  components : {malaka,QrcodeVue},
  data() {
    return {
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
        // {
        //   key: "oblastname",
        //   label: this.$t("oblastname"),
        //   sortable: false,
        // },
        // {
        //   key: "regionname",
        //   label: this.$t("regionname"),
        //   sortable: false,
        // },
        {
          key: "workorganizationname",
          label: this.$t("workorganization"),
          thClass: "text-center",
          tdClass: "text-left",
          sortable: false,
        },

        {
          key: "personname",
          label: this.$t("personname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
          {
          key: "sportqualspecialtyname",
          label: this.$t("SportQualSpecialTy"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("Sport turi"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("QualificationCategory"),
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
          label: this.$t("ihmenunumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "startdate",
          label: this.$t("givendate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate1"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "givenorganization",
          label: this.$t("givenorganization"),
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
      qualificationcategorylist: [],
      sporttypeclassifierlist: [],
      sportqualspecialtylist: [],
      totalRows: "",
      isBusy: true,
      filter: {
        sporttypeclassifierId:0,
        sportqualspecialtyid: 0,
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        ID: "",
        inn: "",
        pinfl: "",
        identitydocumentid: "",
        documentseries: "",
        documentnumber: "",
        persontypeid: 1,
        schoolsubjectid:0,
        isallperson: false,
        organizationid: 0,
        oblastid: 0,
        qualificationcategoryid:0,
        regionid: 0,
        personname: "",
        filetype: "",
        appointqualid: 0,
        statusid: 0,
      },
      OblastList: [],
      RegionList: [],
      schoolsubjectlist: [],
      OrganizationList: [],
      lang: localStorage.getItem("locale") || "ru",
      malaka : {}
    };
  },
  created() {
    this.filter.statusid = this.$route.query.statusid || 0;
    this.filter.oblastid = this.$route.query.oblastid || 0;
    this.filter.regionid = this.$route.query.regionid || 0;
    this.filter.organizationid = this.$route.query.organizationid || 0;
    this.filter.documentseries = this.$route.query.documentseries || "";
    this.filter.documentnumber = this.$route.query.documentnumber || "";
    this.filter.personname = this.$route.query.personname || "";
    this.lang = localStorage.getItem("locale") || "ru";
    if (!!this.filter.oblastid) {
      this.changeOblast(this.filter.oblastid);
    }
    if (!!this.filter.regionid) {
      this.changeRegion(this.filter.oblastid, this.filter.regionid);
    }
    this.Refresh();
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.OblastList = res.data;
    });
    QualificationCategoryService.GetAll().then((res) => {
      this.qualificationcategorylist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.sporttypeclassifierlist = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      this.schoolsubjectlist = res.data;
    });
    HelperService.GetAllSportQualSpecialty().then((res) => {
      this.sportqualspecialtylist = res.data;
    });
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
    changeOblast(item) {
      RegionService.GetAll(this.lang, item).then((res) => {
        this.RegionList = res.data;
      });
    },
    GoEmployeeCard(item) {
      this.$router.push({
        name: "EmployeeCard",
        query: {
          PersonId: item.personid,
        },
      });
    },
    changeRegion(oblast, region) {
      OrganizationService.GetAll(oblast, region, false).then((res) => {
        this.OrganizationList = res.data;
      });
    },
    rowclicked() {},
    Create() {
      this.$router.push({
        name: "EditAppointQualCategory2",
        params: {
          id: 0,
        },
      });
    },
    ChangeSportQualSpecialty(item) {
      this.$router.push({
        name: "EditAppointQualCategory2",
        params: {
          id: 0,
        },
        query: {
          sportqualspecialtyid: item.id,
          sportqualspecialtyName: item.name
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewAppointQualCategory2",
        params: {
          id: item.id,
        },
        query: {
          oblastid: this.filter.oblastid,
          regionid: this.filter.regionid,
          organizationid: this.filter.organizationid,
          documentseries: this.filter.documentseries,
          documentnumber: this.filter.documentnumber,
          personname: this.filter.personname,
          statusid: this.filter.statusid,
        },
      });
    },
    Edit(item) {
      this.$router.push({
        name: "EditAppointQualCategory2",
        params: {
          id: item.id,
        },
        query: {
          sportqualspecialtyid: item.sportqualspecialtyid,
        },
      });
    },
    Delete(item) {
      AppointQualCategoryService.Delete(item.id)
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
    forceFileDownload1(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name + ".pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    Print() {
      AppointQualCategoryService.AppointQualCategoryPrint(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.schoolsubjectid,
        this.filter.qualificationcategoryid,
        3,
        this.filter.sportqualspecialtyid,
        this.filter.sporttypeclassifierId,
        this.filter.statusid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((res) => {
          this.forceFileDownload(res, "AppointQualCategoryPrint");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    // Printer(data) {
    //   const html = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //       <div class="body-malaka" style="padding: 0 10px;">
    //         <table style="width: 100%;">
    //           <tbody>
    //             <tr>
    //               <td style="width: 50%;">
    //                 <table style="width: 100%;">
    //                   <tbody>
    //                     <tr>
    //                       <td>
    //                       
    //                       </td>
    //                       <td>
    //                         <h2 style="margin-bottom: 240px;text-align: center; margin-top: -50px;">O'ZBEKISTON RESPUBLIKASI</h2>
    //                         <p style="text-align: center;">Malaka oshirish haqida</p>
    //                         <h2 style="text-align: center;">MALAKA SERTIFIKATI</h2>
    //                         <p style="text-align: center;">${data.documentseries} № ${data.documentnumber}</p>
                
    //                         <div style="margin-top: 150px;">  
    //                           <p style="margin-bottom: 30px;">Qayd raqami: ___<u>${ data.docnumber }</u>__</p>
    //                           <p>
    //                               Berilgan sana: ${ data.docdate.split('.')[2] }-yil ${ data.docdate.split('.')[0] + '.' +  data.docdate.split('.')[1]}
    //                           </p>
    //                         </div>
    //                       </td>
    //                     </tr>
    //                   </tbody>
    //                 </table>
    //               </td>
                  
    //               <td style="width: 50%;">
    //                 <h3 style="text-align: center; margin-top: -150px; margin-bottom: 50px;">Mazkur malaka sertifikati egasi</h3>
    //                 <p style="text-align: center; border-bottom: 1px solid black!important;">
    //                   <u>&#8195;&#8195;&#8195;${ data.personname }&#8195;&#8195;&#8195;</u>
    //                 </p>
    //                 <p style="text-align: center; font-size: x-small; margin-top: -15px;">(Familiyasi, ismi, otasining ismi)</p>
    //                 <p style="text-align: center;">
    //                     <u>%startYear% yil_%startDate%</u>__dan <u>%endYear%</u> yil___<u>%endDate%</u>___gacha
    //                 </p>
            
    //                 <p style="text-align: center;"><u>&#8195;&#8195;&#8195;%organizationname%&#8195;&#8195;&#8195;</u>da</p>
    //                 <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Ta'lim muassasining nomi)</p>
    //                 <p style="text-align: center;">_______<u>%hour%</u>______soatli</p>
                    
    //                 <p style="text-align: center; font-size: x-small;margin-top: -15px;">(vaqti)</p>
    //                 <p style="text-align: center;">_____<u>%coursname%</u>_______</p>
    //                 <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Malaka oshirish kursining nomi)</p>
    //                 <p style="margin-left: 20px;">bo'yicha malakasini oshirdi.</p>
            
    //                 <p class="rector" style="margin-left: 20px;">
    //                     <b>Rektor_______________<u>%rektor%</u>_______</b><br>
    //                     <small style="margin-left: 80px;"
    //                     ><span style="font-size: x-small;">Rektor imzosi</span
    //                     ><span style="font-size: x-small; margin-left: 80px;">(Familiyasi, ismi, otasining ismi)</span></small
    //                     >
    //                 </p>
    //                 <div class="shape" style="height: 100px; margin-top: 50px;">
    //                     <div class="circle">M.O'</div>
    //                     <div style="display: block;float: right;width: 200px">
    //                       <!-- <vue-qrcode
    //                         :scale="5"
    //                         :quality="1"
    //                         errorCorrectionLevel="H"
    //                         value="https://www.1stg.me"
    //                       />   -->
    //                     </div>
    //                 </div>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </body>
    //     </html>
    //   `
    //   AppointQualCategoryService.AppointQualCategoryPrintPdf({ text: html }).then(res => {
    //     this.forceFileDownload1(res, "AppointQualCategoryPrint");
    //   })
    // },
    Printer(item) {
      
      var self = this;
      AppointQualCategoryService.Get(item.id).then(res => {
        self.malaka = res.data
        var content = document.getElementById('malaka')
        var opt = {
          margin:       [-0.15, 0, -1, 0],
          filename:     'myfile.pdf',
          image:        { type: 'jpeg', quality: 1 },
          html2canvas:  { scale: 4 },
          jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
        };
        html2pdf().from(content).set(opt).save()
      })
    },
    Approve(item) {
      var self = this;
      AppointQualCategoryService.Approve(item.id)
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
      AppointQualCategoryService.CancelApproval(item.id)
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

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      AppointQualCategoryService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.schoolsubjectid,
        this.filter.qualificationcategoryid,
        3,
        this.filter.sportqualspecialtyid,
        this.filter.sporttypeclassifierId,
        this.filter.statusid,
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
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
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
.table thead th {
  vertical-align: top;
}
</style>

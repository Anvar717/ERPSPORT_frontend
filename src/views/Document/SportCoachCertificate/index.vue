<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <div class="card-head p-3">
          <div class="text-center w-100">
            <h3 class="text-center">{{ $t("AppointQualCategory2") }}</h3>
          </div>
          <div class="w-50 mt-3">
            <ValidationProvider v-slot="v" name="SportTypeClassifier" class="d-flex ml-1">
              <div class="form-group">
                <custom-date-picker
                  v-model="filter.startdate"
                  @keyup="(value) => filter.startdate = value"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                >
                </custom-date-picker>
              </div>
              <div class="form-group ml-3">
                <custom-date-picker
                  v-model="filter.enddate"
                  @keyup="(value) => filter.enddate = value"
                  format="DD.MM.YYYY"
                  :disabled-date="DisabledForEnddate"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('enddate')"
                >
                </custom-date-picker>
              </div>
            </ValidationProvider>
          </div>
          <div class="btn_group btn_list w-50 text-lg-right">
            <CButton @click="Print" color="primary" class="mr-2" size="sm">
             <b-spinner v-if="PrintLoading" small></b-spinner>
              <b-icon v-if="!PrintLoading" icon="printer"></b-icon>
              &nbsp; {{ $t("Print") }}
            </CButton>
            <CButton
              v-if="$can('SportCoachCertificateEdit', 'permissions')"
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
              class="float-sm-right"
              @click="$router.push('/')"
              size="sm"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </CButton>
          </div>
        </div>
        <CCardHeader>
          <!-- <CRow class="form-group">
            <CCol lg="3" md="3" sm="11" class="text-left mt-2">
              <v-select
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
            <CCol lg="3" md="3" sm="12" class="text-lg-right mt-2">
              <CButton @click="Print" color="primary" class="mr-2" size="sm">
                <b-icon icon="printer"> </b-icon>
                &nbsp; {{ $t("Print") }}
              </CButton>
              <CButton
              v-if="$can('SportCoachCertificateEdit', 'permissions')"
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
            </CCol>
          </CRow> -->
          <CRow class="form-group">
            <CCol md="2" lg="4" sm="12" class="text-left">
              <ValidationProvider v-slot="v" name="SportTypeClassifier">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    v-model="filter.organizationid"
                    :reduce="(item) => item.id"
                    label="name"
                    @input="Refresh"
                    :options="OrganizationList"
                    :placeholder="$t('organization')"
                  >
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol md="2" lg="2" sm="12" class="text-left">
              <ValidationProvider v-slot="v" name="SportTypeClassifier">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-12"
                    :options="SportTypeClassifierList"
                    v-model="filter.sporttypeclassifierid"
                    :reduce="(item) => item.id"
                    @input="Refresh"
                    :placeholder="$t('SportTypeClassifier')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            
            <CCol lg="3" md="3" sm="12" class="text-left">
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
                <!-- <b-input-group-append> -->

                <!-- </b-input-group-append> -->
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
            </CCol> -->
            <CCol lg="3" md="3" sm="12" class="text-left">
              <CInput
                size="sm"
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.personname"
                v-on:keyup.enter="Search"
                class="personname-input"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                    style="height: 36px"
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
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group"
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
            <b-col class="text-right">
              <b-button-group
                @click="Refresh"
                size="sm"
                class="sportTitle-btn-group"
              >
                <b-button
                  @click="filter.isoldsportcoachcertificate = ''"
                  :variant="
                    typeof filter.isoldsportcoachcertificate == 'string' ? 'primary' : 'outline-primary'
                  "
                >
                  <span>{{ $t("All") }}</span>
                </b-button>
                <b-button
                  @click="filter.isoldsportcoachcertificate = false"
                  :variant="
                    filter.isoldsportcoachcertificate === false ? 'primary' : 'outline-primary'
                  "
                >
                  {{ $t("isnew") }}
                </b-button>
                <b-button
                  @click="filter.isoldsportcoachcertificate = true"
                  :variant="
                    filter.isoldsportcoachcertificate === true ? 'primary' : 'outline-primary'
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
            <template v-slot:head(personname)>
              <div style="cursor: pointer" @click="ChangeSort('personname')">
                {{ $t("personname") }}
                <b-icon
                  v-if="filter.SortColumn === 'personname'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(sporttypeclassifiername)>
              <div style="cursor: pointer" @click="ChangeSort('sporttypeclassifiername')">
                {{ $t("sporttypeclassifiername") }}
                <b-icon
                  v-if="filter.SortColumn === 'sporttypeclassifiername'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(documentseries)>
              <div style="cursor: pointer" @click="ChangeSort('documentseries')">
                {{ $t("documentseries") }}
                <b-icon
                  v-if="filter.SortColumn === 'documentseries'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(documentnumber)>
              <div style="cursor: pointer" @click="ChangeSort('documentnumber')">
                {{ $t("documentnumber") }}
                <b-icon
                  v-if="filter.SortColumn === 'documentnumber'"
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
            <template v-slot:head(docexpiredate)>
              <div style="cursor: pointer" @click="ChangeSort('docexpiredate')">
                {{ $t("enddate1") }}
                <b-icon
                  v-if="filter.SortColumn === 'docexpiredate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(docgivendate)>
              <div style="cursor: pointer" @click="ChangeSort('docgivendate')">
                {{ $t("givendate") }}
                <b-icon
                  v-if="filter.SortColumn === 'docgivendate'"
                  :icon="filter.SortIcon"
                ></b-icon>
              </div>
            </template>
            <template v-slot:head(gendername)>
              <div style="cursor: pointer" @click="ChangeSort('gendername')">
                {{ $t("gendername") }}
                <b-icon
                  v-if="filter.SortColumn === 'gendername'"
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
            <template #cell(isverified)="{ item }">
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
                  v-if="$can('SportCoachCertificateEdit', 'permissions') && item.statusid != 2"
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
                  v-if="$can('SportCoachCertificateDelete', 'permissions') && item.statusid != 2"
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link>
                <b-link @click="Printer(item)" class="mr-2"
                   v-if="item.statusid == 2"
                   v-c-tooltip="{ content: $t('Print') }">
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
                        <p style="text-align: center;" v-if="!malaka.isoldsportcoachcertificate">{{ malaka.documentseries }} № {{ malaka.documentnumber }}</p>
                        <p style="text-align: center;" v-if="malaka.isoldsportcoachcertificate">{{ malaka.oldsportcoachcertificateserial }} № {{ malaka.oldsportcoachcertificatenumber }}</p>
            
                        <div style="margin-top: 150px;">  
                          <p style="margin-bottom: 30px;">Qayd raqami: {{ malaka.docnumber }}</p>
                          <p>
                              <!-- Berilgan sana: {{ malaka.docdate.split('.')[2] }}-yil {{ malaka.docdate.split('.')[0] + '.' +  malaka.docdate.split('.')[1]}} -->
                              Berilgan sana: {{ malaka.docgivendate }}
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
        
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;font-size: medium;"><u>&#8195;&#8195;{{ malaka.organizationname }}</u>da</p>
                <p style="text-align: center; font-size: x-small;margin-top: -15px;">(Ta'lim muassasining nomi)</p>
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px; font-size: medium;"><u>{{ malaka.academichours }}</u> soatli</p>
                
                <p style="text-align: center; font-size: x-small;margin-top: -15px;">(vaqti)</p>
                <p style="text-align: center;border-bottom: 1px solid black; margin-left: 20px;margin-right: 20px;font-size: medium;"><u>{{ malaka.coursename }}</u></p>
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
import SportCoachCertificateService from "@/services/SportCoachCertificate.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import OrganizationService from "@/services/organization.service";
import html2pdf from 'html2pdf.js'
import QrcodeVue from 'qrcode.vue'
import CustomDatePicker from "@/components/customDatePicker.vue";
import AppointQualCategoryService from "../../../services/AppointQualCategory.service";
export default {
  components : {QrcodeVue, CustomDatePicker},
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
        {
          key: "docnumber",
          label: this.$t("docnumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        // {
        //   key: "regionname",
        //   label: this.$t("regionname"),
        //   sortable: false,
        // },
        // {
        //   key: "organizationname",
        //   label: this.$t("organizationname"),
        //   sortable: false,
        // },

        {
          key: "personname",
          label: this.$t("personname"),
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
          key: "gendername",
          label: this.$t("gender"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "documentseries",
          label: this.$t("certificateseria"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "documentnumber",
          label: this.$t("certificatenumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docgivendate",
          label: this.$t("givendate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docexpiredate",
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
      PrintLoading: false,
      SportTypeClassifierList: [],
      totalRows: "",
      isBusy: true,
      filter: {
        oblastid: 0,
        regionid: 0,
        organizationid: null,
        personname: "",
        documentseries: "",
        documentnumber: "",
        statusid: 0,
        SortColumn: "",
        OrderType: "asc",
        Search: "",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon: "arrow-up",
        ID: "",
        inn: "",
        pinfl: "",
        identitydocumentid: "",
        persontypeid: 1,
        isallperson: false,
        filetype: "",
        appointqualid: 0,
        qualificationCategoryId: 0,
        qualcategorytypeid: 0,
        sportqualspecialtyid: 0,
        sporttypeclassifierId: 0,
        sporttypeclassifierid: null,
        startdate: '',
        enddate : '',
        isoldsportcoachcertificate : ''
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
    this.filter.organizationid = this.$route.query.organizationid || JSON.parse(localStorage.getItem('user_info')).OrgID;
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
    SchoolSubjectService.GetAll().then((res) => {
      this.schoolsubjectlist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierList = res.data;
    });
    OrganizationService.GetAll('', '', false, 19).then((res) => {
        this.OrganizationList = res.data;
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
        name: "EditSportCoachCertificate",
        params: {
          id: 0,
        },
      });
    },
    View(item) {
      this.$router.push({
        name: "ViewSportCoachCertificate",
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
        name: "EditSportCoachCertificate",
        params: {
          id: item.id,
        },
      });
    },
    Delete(item) {
      SportCoachCertificateService.Delete(item.id)
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
      this.PrintLoading = true
      SportCoachCertificateService.SportCoachCertificatePrint(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.statusid,
        this.filter.sporttypeclassifierid,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((res) => {
          this.forceFileDownload(res, "SportCoachCertificatePrint");
           this.PrintLoading = false;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    // Printer(item) {
    //   var self = this;
    //   SportCoachCertificateService.GetSportCoachCertificateForPrint(item.id).then(res => {
    //     this.forceFileDownload1(res, "SportCoachCertificatePrint");
    //   })
    // },
     Printer(item) {
      var self = this;
      SportCoachCertificateService.PrintSportCoachCertificatePdf('pdf',item.id).then(res => {
        this.forceFileDownload1(res, "SportCoachCertificatePdf");
      })
    },
    Approve(item) {
      var self = this;
      SportCoachCertificateService.Approve(item.id)
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
      SportCoachCertificateService.CancelApproval(item.id)
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
      SportCoachCertificateService.GetList(
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
        this.filter.personname,
        this.filter.documentseries,
        this.filter.documentnumber,
        this.filter.statusid,
        this.filter.sporttypeclassifierid,
        this.filter.startdate,
        this.filter.enddate,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.isoldsportcoachcertificate
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
    DisabledForEnddate(date){
      if (!!this.filter.startdate) {
        var d = this.filter.startdate.split('.')
        return date < new Date(`${d[2]}-${d[1]}-${d[0]}`)
      }
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

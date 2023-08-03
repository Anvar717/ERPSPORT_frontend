<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AppointQualCategory2") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label for="v" class="col-form-label col-sm-3">{{
                    $t("number")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      :placeholder="$t('number')"
                      autocomplete="docnumber"
                      horizontal
                      v-model="SportCoachCertificate.docnumber"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("docdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="SportCoachCertificate.docdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <!-- <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("personname")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('personname')"
                        autocomplete="personname"
                        :label="$t('personname')"
                        horizontal
                        v-model="SportCoachCertificate.personname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenEmployeeModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol> -->
              <!-- <CCol sm="12" md="6" v-if="!$can('AdminView', 'permissions')">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("search")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-select
                        :options="DocumentSeriesList"
                        v-model="SportCoachCertificate.documentseries"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      />

                      <b-form-input
                        :placeholder="$t('documentnumber')"
                        autocomplete="documentnumber"
                        horizontal
                        v-model="SportCoachCertificate.documentnumber"
                      />

                      <b-input-group-append>
                        <date-picker
                          v-model="SportCoachCertificate.ondate"
                          style="width: 100%"
                          size="mm"
                          lang="ru"
                          :placeholder="$t('ondate')"
                          value-type="format"
                          format="DD.MM.YYYY"
                        />
                      </b-input-group-append>
                      <b-input-group-append>
                        <b-button @click="persondata" variant="primary">
                          <b-icon v-if="!GetFromDbTsLoading" icon="search" />
                          <b-spinner v-if="GetFromDbTsLoading" small>
                          </b-spinner>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol> -->
            </CRow>
            <CRow>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("personname")
                  }}</label>
                  <div class="col-sm-9">
                    <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('personname')"
                        autocomplete="personname"
                        :label="$t('personname')"
                        horizontal
                        v-model="SportCoachCertificate.personname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenEmployeeModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="Sport turi"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("Sport turi") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="SportTypeClassifierList"
                        :reduce="(item) => item.id"
                        @input="changeSportType"
                        :placeholder="$t('Sport turi')"
                        v-model="SportCoachCertificate.sporttypeclassifierid"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("startstudydate")
                    }}</label>
                    <div class="col-sm-9">
                      <custom-date-picker
                        v-model="SportCoachCertificate.startdate"
                        @keyup="(value) => SportCoachCertificate.startdate = value"
                        format="DD.MM.YYYY"
                        type="date"
                        :clearable="false"
                        :placeholder="$t('startstudydate')"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </custom-date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("endstudydate") }}</label
                    >
                    <div class="col-sm-9">
                      <custom-date-picker
                        v-model="SportCoachCertificate.enddate"
                        @keyup="(value) => SportCoachCertificate.enddate = value"
                        format="DD.MM.YYYY"
                        type="date"
                        @change="changeEndDate"
                        :disabled-date="DisabledForEnddate"
                        :clearable="false"
                        :placeholder="$t('endstudydate')"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </custom-date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label for="v" class="col-form-label col-sm-3">{{
                    $t("certificateseria")
                  }}</label>
                  <div class="col-sm-9">
                    <b-form-input
                      :placeholder="$t('certificateseria')"
                      autocomplete="certificateseria"
                      horizontal
                      disabled
                      v-model="SportCoachCertificate.documentseries"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
              <CCol sm="12" md="6">
                <div class="form-group form-row">
                  <label
                    for="datepicker-dateformat2"
                    class="col-form-label col-sm-3"
                    >{{ $t("certificatenumber") }}</label
                  >
                  <div class="col-sm-9">
                    <b-form-input
                      :placeholder="$t('certificatenumber')"
                      autocomplete="certificatenumber"
                      horizontal
                      disabled
                      v-model="SportCoachCertificate.documentnumber"
                    ></b-form-input>
                  </div>
                </div>
              </CCol>
            </CRow>
            <CRow>
              
              <CCol sm="12" md="6">
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("givendate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="SportCoachCertificate.docgivendate"
                        style="width: 100%"
                        size="sm"
                        :disabled-date="DisabledForDocgivendate"
                        lang="ru"
                        :placeholder="$t('givendate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="docexpiredate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("enddate1")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="SportCoachCertificate.docexpiredate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        disabled
                        :placeholder="$t('enddate1')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              
              <CCol
                sm="12"
                md="6"
                v-if="SportCoachCertificate.TalimSifatiInfo != null"
              >
                <ValidationProvider
                  v-slot="v"
                  name="personfullname"
                  rules="required"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('personnameDBS')"
                    autocomplete="personnameDBS"
                    horizontal
                    :label="$t('personnameDBS')"
                    v-model="SportCoachCertificate.TalimSifatiInfo.personfullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="SportCoachCertificate.docnumber"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="givenorganization"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('GivenOrganization')"
                    autocomplete="givenorganization"
                    horizontal
                    :label="$t('GivenOrganization')"
                    v-model="SportCoachCertificate.givenorganization"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol> -->
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="trainingcoursename"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('trainingcoursename')"
                    autocomplete="trainingcoursename"
                    horizontal
                    disabled
                    :label="$t('trainingcoursename')"
                    v-model="SportCoachCertificate.coursename"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="QualCategoryTrainingType"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("QualCategoryTrainingType") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="QualCategoryTrainingTypeList"
                        :reduce="(item) => item.id"
                        @input="ChangeQualCategoryTrainingType"
                        :placeholder="$t('QualCategoryTrainingType')"
                        v-model="SportCoachCertificate.qualcategorytrainingtypeid"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="academichours"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("AcademicHours") }}</label
                    >
                    <div class="col-sm-9">
                      <v-select
                        :options="AcademicHoursList"
                        :reduce="(item) => item.id"
                        @input="changeacademichour"
                        :placeholder="$t('ChooseBelow')"
                        v-model="
                          SportCoachCertificate.qualcategorytrainingtypetableid
                        "
                        label="academichours"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="isoldsportcoachcertificate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("isoldsportcoachcertificate")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <b-form-checkbox
                        v-model="SportCoachCertificate.isoldsportcoachcertificate"
                        switch
                        class="mt-2 ml-1"
                      ></b-form-checkbox>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6" v-if="SportCoachCertificate.isoldsportcoachcertificate">
                <ValidationProvider
                  v-slot="v"
                  name="oldsportcoachcertificateserial"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("oldsportcoachcertificateserial")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <b-form-input
                        :placeholder="$t('oldsportcoachcertificateserial')"
                        autocomplete="oldsportcoachcertificateserial"
                        horizontal
                        v-mask="`AA`"
                        v-model="SportCoachCertificate.oldsportcoachcertificateserial"
                      ></b-form-input>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" md="6" v-if="SportCoachCertificate.isoldsportcoachcertificate">
                <ValidationProvider
                  v-slot="v"
                  name="oldsportcoachcertificatenumber"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label for="v" class="col-form-label col-sm-3">{{
                      $t("oldsportcoachcertificatenumber")
                    }}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <b-form-input
                        :placeholder="$t('oldsportcoachcertificatenumber')"
                        autocomplete="oldsportcoachcertificatenumber"
                        horizontal
                        v-mask="`#######`"
                        v-model="SportCoachCertificate.oldsportcoachcertificatenumber"
                      ></b-form-input>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="academichours"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('academichours1')"
                    autocomplete="academichours1"
                    horizontal
                    type="number"
                    :label="$t('academichours1')"
                    v-model="SportCoachCertificate.academichours"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                 <ValidationProvider
                  v-slot="v"
                  name="schoolsubjectname"
                  rules="required"
                >
                  <CInput
                  :disabled="!$can('AdminView', 'permissions')"
                    :placeholder="$t('schoolsubject')"
                    autocomplete="schoolsubjectname"
                    horizontal
                    :label="$t('schoolsubject')"
                    v-model="SportCoachCertificate.schoolsubjectname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
               
              </CCol> -->
              <!-- <CCol sm="12" md="6">
                <ValidationProvider
                  v-slot="v"
                  name="qualificationcategoryname"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("qualificationcategory") }}</label
                    >
                    <div class="col-sm-9">
                   
                      <v-select
                        :disabled="!$can('AdminView', 'permissions')"
                        :options="QualificationCategoryList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('qualificationcategory')"
                        v-model="SportCoachCertificate.qualificationcategoryid"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template></v-select
                      >
                    </div>
                  </div>
                </ValidationProvider>
              </CCol> -->
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row>
          <!-- <c-col class="text-left ml-0 ">
            <div class="form-group form-row">
              <label style="margin-left:20px" class="text-left mr-3">{{
                $t("isFill")
              }}</label>
              <b-form-checkbox
                class="ml-3 mt-n1"
                v-model="isFill"
                size="lg"
                value="accepted"
              ></b-form-checkbox>
            </div>
          </c-col> -->
          <!-- <c-col class="text-right mr-3">
            <c-button
              size="sm"
              color="primary"
              @click="$bvModal.show('AddModal')"
            >
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col> -->
        </c-row>
        <!-- <b-row class="mx-0 mb-3" v-if="isFill">
          <b-col sm="8">
            <div class="d-flex">
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("oblast") }}</label>
                <v-select
                  :options="OblastList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.oblastid"
                  @input="ChangeOblast"
                ></v-select>
              </div>
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("region") }}</label>
                <v-select
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.regionid"
                  @input="ChangeRegion"
                ></v-select>
              </div>
              <div class="mr-2" style="width : 100%">
                <label>{{ $t("organization") }}</label>
                <v-select
                  :options="OrganizationList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="filter.organizationid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="4">
            <b-button class="mt-4" variant="primary" @click="Fill">
              <b-icon icon="search" v-if="!fillLoading"></b-icon>
              <b-spinner small v-if="fillLoading"></b-spinner> {{ $t("Fill") }}
            </b-button>
          </b-col>
        </b-row> -->
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'SportCoachCertificate' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="SportCoachCertificate.CanSave"
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
        <b-modal
          id="modalXl"
          no-close-on-backdrop
          size="xl"
          :title="$t('Person')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          ></person-list>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
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
import SportCoachCertificateService from "@/services/SportCoachCertificate.service";
// import PersonService from "@/services/person.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import PersonList from "@/components/PersonList";
// import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";
import GetEmployeeListComponent from "@/components/GetEmployeeListComponent.vue";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";
import QualCategoryTrainingTypeService from "@/services/QualCategoryTrainingType.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    PersonList,
    GetEmployeeListComponent,
    OrganizationListComponent,
    EmployeeListComponent,
    CustomDatePicker
  },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      SportCoachCertificate: {},
      QualificationCategoryList: [],
      AcademicHoursList: [],
      selectedrowid: 0,
      ownerid: 0,
      personid: 0,
      schoolsubjectid: 0,
      qualificationcategoryid: 0,
      startdate: 0,
      enddate: 0,
      fillLoading: false,
      isFill: false,
      editedIndex: -1,
      filter: {
        organizationid: "",
        regionid: "",
        oblastid: "",
      },
      personloading: false,
      innofPerson: "",
      NotFoundPerson: true,
      personvalue: {},
      DocumentSeriesList: [],
      sporttypelist: [],
      SchoolSubjectList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      QualCategoryTrainingTypeList: [],
      PropsOrganization: 0,
      lang: localStorage.getItem("locale") || "ru",
      GetFromDbTsLoading: false
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SportCoachCertificateService.Get(self.selectedrowid).then((res) => {
      self.SportCoachCertificate = res.data;
      if (self.selectedrowid != 0) {
        QualCategoryTrainingTypeService.GetAllQualCategoryTrainingTypeTable(
          this.SportCoachCertificate.qualcategorytrainingtypeid
        ).then((res) => {
          this.AcademicHoursList = res.data;
        });
      }
    });
    SportTypeClassifierService.GetAll(true,localStorage.getItem('locale')).then((res) => {
      self.SportTypeClassifierList = res.data;
    });
    QualCategoryTrainingTypeService.GetAll().then((res) => {
      self.QualCategoryTrainingTypeList = res.data;
    });
  },
  methods: {
    ChangeQualCategoryTrainingType() {
      this.SportCoachCertificate.qualcategorytrainingtypetableid = 0;
      QualCategoryTrainingTypeService.GetAllQualCategoryTrainingTypeTable(
        this.SportCoachCertificate.qualcategorytrainingtypeid
      ).then((res) => {
        this.AcademicHoursList = res.data;
      });
    },
    changeacademichour() {
      var self = this;
      self.SportCoachCertificate.academichours = self.AcademicHoursList.filter(
        (item) =>
          item.id === self.SportCoachCertificate.qualcategorytrainingtypetableid
      )[0].academichours;
    },
    changeSportType() {
      var self = this;
      self.SportCoachCertificate.sporttypeclassifiername =
        self.SportTypeClassifierList.filter(
          (item) => item.id === self.SportCoachCertificate.sporttypeclassifierid
        )[0].name;
      self.SportCoachCertificate.coursename = "";
      self.SportCoachCertificate.coursename =
        "Sport turlari bo‘yicha trener-o‘qituvchi" +
        ' ('+ self.SportCoachCertificate.sporttypeclassifiername +')';
    },
    DisabledForEnddate(date){
      if (!!this.SportCoachCertificate.startdate) {
        var d = this.SportCoachCertificate.startdate.split('.')
        return date < new Date(`${d[2]}-${d[1]}-${d[0]}`)
      }
    },
    Fill() {
      if (!!this.filter.organizationid) {
        this.fillLoading = true;
        SportCoachCertificateService.Import(this.filter.organizationid)
          .then((res) => {
            this.fillLoading = false;
            this.SportCoachCertificate.Tables = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error || error,
              this.$t("error"),
              "danger"
            );
          });
      }
    },
    ChangeOblast() {
      this.filter.regionid = "";
      this.filter.organizationid = "";
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = "";
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(0, this.filter.regionid).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false

      this.$bvModal.hide("modalXl");
    },
    CloseOrganizationModal() {
      // this.EmployeeModal = false

      this.$bvModal.hide("OrganizationModal");
    },
    GetInfoQual(pinfl, documentseries, documentnumber) {
      var self = this;
      SportCoachCertificateService.Get(
        0,
        pinfl,
        documentseries,
        documentnumber
      ).then((res) => {
        self.SportCoachCertificate = res.data;
      });
    },
    AddPersonData(data) {
      this.CloseEmployeeModal();
      this.SportCoachCertificate.personid = data.id;
      this.SportCoachCertificate.personname = data.fullname;
    },
    AddOrganizationData(data) {
      this.SportCoachCertificate.personname = "";
      this.CloseOrganizationModal();
      this.SportCoachCertificate.organizationid = data.id;
      this.SportCoachCertificate.organizationname = data.shortname;
    },
    changeEndDate() {
      
      if (!!this.SportCoachCertificate.enddate) {
        this.SportCoachCertificate.docgivendate = this.SportCoachCertificate.enddate
        let date = this.SportCoachCertificate.enddate.split('.')
        let date1 = new Date(`${date[2]}-${date[1]}-${date[0]}`)
        let date2 = new Date('2022-08-30')
        if (date1 - date2 < 0) {
          this.SportCoachCertificate.documentseries = 'MO'
          this.SportCoachCertificate.docexpiredate = `${date[0]}.${date[1]}.${date[2] * 1 + 5}`
        } else {
          this.SportCoachCertificate.documentseries = 'MS'
          this.SportCoachCertificate.docexpiredate = `${date[0]}.${date[1]}.${date[2] * 1 + 4}`
        }
      }
    },
    DisabledForDocgivendate(date){
      if (!!this.SportCoachCertificate.enddate) {
        var d = this.SportCoachCertificate.enddate.split('.')
        var enddate = new Date(`${d[2]}-${d[1]}-${d[0]}`)
        return date < new Date(enddate.getTime() - (1 * 24 * 60 * 60 * 1000))
      }
    },
    persondata() {
      var self = this;
      this.GetFromDbTsLoading = true;
      var personname = this.SportCoachCertificate.personname;
      SportCoachCertificateService.GetFromDbTs(
        this.SportCoachCertificate.documentseries,
        this.SportCoachCertificate.documentnumber,
        this.SportCoachCertificate.ondate,
        this.SportCoachCertificate.personid
      )
        .then((res) => {
          this.GetFromDbTsLoading = false;
          self.SportCoachCertificate = res.data;
          this.SportCoachCertificate.personname = personname;
          this.SportCoachCertificate.ondate = res.data.startdate;
        })
        .catch((error) => {
          this.GetFromDbTsLoading = false;
          this.makeToast(
            error.response.data.error || error,
            this.$t("error"),
            "danger"
          );
        });
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    // SelectedOrganizationItem(value) {
    //   this.organizationvalue = value;
    // },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      // this.PropsOrganization = this.SportCoachCertificate.organizationid;
      this.$bvModal.show("modalXl");
    },
    // OpenOrganizationModal() {
    //   this.$bvModal.show("OrganizationModal");
    // },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    AddPerson() {
      this.showModal("createModal", true);
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.SportCoachCertificate[this.editedIndex],
          this.SportCoachCertificate
        );
        this.Close();
      } else {
        this.Add();
      }
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          schoolsubjectid: 0,
          schoolsubject: "",
          qualificationcategoryid: 0,
          qualificationcategory: "",
          documentseries: "",
          documentnumber: "",
          startdate: 0,
          enddate: 0,
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    // Add() {
    //   var self = this;
    //   if (
    //     self.SportCoachCertificate.startdate === "" ||
    //     self.SportCoachCertificate.startdate === undefined ||
    //     self.SportCoachCertificate.startdate === null ||
    //     self.SportCoachCertificate.startdate === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("startdateNotCorrect"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }

    //   if (
    //     self.SportCoachCertificate.enddate === "" ||
    //     self.SportCoachCertificate.enddate === undefined ||
    //     self.SportCoachCertificate.enddate === null ||
    //     self.SportCoachCertificate.enddate === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("endtimeNotCorrect"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   if (
    //     self.SportCoachCertificate.personid === "" ||
    //     self.SportCoachCertificate.personid === undefined ||
    //     self.SportCoachCertificate.personid === null ||
    //     self.SportCoachCertificate.personid === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("employeeNotCorrect"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   if (
    //     self.SportCoachCertificate.sporttypeclassifierid === null ||
    //     self.SportCoachCertificate.sporttypeclassifierid === undefined ||
    //     self.SportCoachCertificate.sporttypeclassifierid === 0 ||
    //     self.SportCoachCertificate.sporttypeclassifierid === ""
    //   ) {
    //     self.$makeToast(
    //       self.$t("circlesporttypeNotCorrect"),
    //       self.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   if (
    //     self.SportCoachCertificate.documentseries === "" ||
    //     self.SportCoachCertificate.documentseries === undefined ||
    //     self.SportCoachCertificate.documentseries === null ||
    //     self.SportCoachCertificate.documentseries === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("documentseriesNotCorrect"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   if (
    //     self.SportCoachCertificate.documentnumber === "" ||
    //     self.SportCoachCertificate.documentnumber === undefined ||
    //     self.SportCoachCertificate.documentnumber === null ||
    //     self.SportCoachCertificate.documentnumber === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("documentnumberNotCorrect"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   this.$bvModal.hide("AddModal");
    // },
    check() {
      var self = this;
      if (
        self.SportCoachCertificate.docnumber === 0 ||
        self.SportCoachCertificate.docnumber === null ||
        self.SportCoachCertificate.docnumber === undefined ||
        self.SportCoachCertificate.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCoachCertificate.docdate === 0 ||
        self.SportCoachCertificate.docdate === null ||
        self.SportCoachCertificate.docdate === undefined ||
        self.SportCoachCertificate.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCoachCertificate.personid === "" ||
        self.SportCoachCertificate.personid === undefined ||
        self.SportCoachCertificate.personid === null ||
        self.SportCoachCertificate.personid === 0
      ) {
        this.makeToast(
          this.$t("personidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCoachCertificate.sporttypeclassifierid === "" ||
        self.SportCoachCertificate.sporttypeclassifierid === undefined ||
        self.SportCoachCertificate.sporttypeclassifierid === null ||
        self.SportCoachCertificate.sporttypeclassifierid === 0
      ) {
        this.makeToast(
          this.$t("sporttypeclassifierNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.$can("AdminView", "permissions")) {
        if (
          self.SportCoachCertificate.documentseries === "" ||
          self.SportCoachCertificate.documentseries === undefined ||
          self.SportCoachCertificate.documentseries === null ||
          self.SportCoachCertificate.documentseries === 0
        ) {
          this.makeToast(
            this.$t("DocumentseriesNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportCoachCertificate.documentnumber === "" ||
          self.SportCoachCertificate.documentnumber === undefined ||
          self.SportCoachCertificate.documentnumber === null ||
          self.SportCoachCertificate.documentnumber === 0
        ) {
          this.makeToast(
            this.$t("DocumentnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportCoachCertificate.startdate === "" ||
          self.SportCoachCertificate.startdate === undefined ||
          self.SportCoachCertificate.startdate === null ||
          self.SportCoachCertificate.startdate === 0
        ) {
          this.makeToast(
            this.$t("StartdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportCoachCertificate.enddate === "" ||
          self.SportCoachCertificate.enddate === undefined ||
          self.SportCoachCertificate.enddate === null ||
          self.SportCoachCertificate.enddate === 0
        ) {
          this.makeToast(
            this.$t("EnddateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportCoachCertificate.qualcategorytrainingtypeid === "" ||
          self.SportCoachCertificate.qualcategorytrainingtypeid === undefined ||
          self.SportCoachCertificate.qualcategorytrainingtypeid === null ||
          self.SportCoachCertificate.qualcategorytrainingtypeid === 0
        ) {
          this.makeToast(
            this.$t("qualcategorytrainingtypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.SportCoachCertificate.qualcategorytrainingtypetableid === "" ||
          self.SportCoachCertificate.qualcategorytrainingtypetableid === undefined ||
          self.SportCoachCertificate.qualcategorytrainingtypetableid === null ||
          self.SportCoachCertificate.qualcategorytrainingtypetableid === 0
        ) {
          this.makeToast(
            this.$t("qualcategorytrainingtypetableNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      this.SportCoachCertificate.qualcategorytypeid = 3;
      this.SaveLoading = true
      SportCoachCertificateService.Update(self.SportCoachCertificate)
        .then((res) => {
          this.SaveLoading = false
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SportCoachCertificate" });
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
};
</script>

<style></style>

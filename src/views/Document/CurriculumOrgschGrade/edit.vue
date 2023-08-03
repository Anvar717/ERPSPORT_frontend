<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <b-icon icon="pencil"></b-icon>
          {{ $t("CurriculumOrgschGrade") }}
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="$router.push({ name: 'CurriculumOrgschGrade' })"
            >
              <b-icon icon="x-circle"></b-icon>
            </CLink>
          </div>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <label class="col-form-label col-sm-10">{{
                    $t("docnumber")
                  }}</label>
                  <CInput
                    disabled
                    autocomplete="text"
                    horizontal
                    v-model="CurriculumOrgschGrade.docnumber"
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
              <CCol sm="2">
                <label class="col-form-label col-sm-10">{{
                  $t("docdate")
                }}</label>
                <date-picker
                  v-model="CurriculumOrgschGrade.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
              </CCol>
              <CCol sm="2">
                <label class="col-form-label col-sm-10">{{
                  $t("schoolyear")
                }}</label>
                <v-select
                  :options="schoolyearlist"
                  v-model="CurriculumOrgschGrade.schoolyearid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </CCol>
              <CCol sm="3">
                <label class="col-form-label col-sm-10">{{
                  $t("OrgSchoolGrade")
                }}</label>
                <v-select
                  :options="orgschoolgradelist"
                  v-model="CurriculumOrgschGrade.orgschoolgradeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="orgschoolgradechange"
                ></v-select>
              </CCol>
              <CCol sm="3">
                <div v-if="openedattachedorgschoolgrade">
                  <label class="col-form-label col-sm-10">{{
                    $t("attachedorgschoolgrade")
                  }}</label>
                  <v-select
                    :options="attachedorgschoolgradelist"
                    v-model="CurriculumOrgschGrade.attachedorgschoolgradeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="attachedorgschoolgradechange"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <label>{{ $t("studentcount") }}</label>
                <CInput
                  autocomplete="text"
                  disabled
                  horizontal
                  v-model="CurriculumOrgschGrade.studentcount"
                >
                </CInput>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("FemaleStudentCount") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  disabled
                  v-model="CurriculumOrgschGrade.femalestudentcount"
                >
                </CInput>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("HomeSchoolIngstudentCount") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  disabled
                  v-model="CurriculumOrgschGrade.homeschoolingstudentcount"
                >
                </CInput>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("EducationLanguage") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  disabled
                  v-model="CurriculumOrgschGrade.educationlanguagename"
                >
                </CInput>
              </CCol>
              <CCol sm="3">
                <label>{{ $t("SchoolingShift") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  disabled
                  v-model="CurriculumOrgschGrade.schoolingshiftname"
                >
                </CInput>
              </CCol>
              <CCol sm="2">
                <label>{{ $t("isspecialized") }}</label>
                <b-form-checkbox
                  v-model="CurriculumOrgschGrade.isspecialized"
                  size="lg"
                  disabled
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
              <CCol sm="3" v-if="CurriculumOrgschGrade.isspecialized">
                <label>{{ $t("SchoolingShift") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  disabled
                  v-model="CurriculumOrgschGrade.specializedsubjects"
                >
                </CInput>
              </CCol>
              <CCol sm="6">
                <label>{{ $t("DetailInfo") }}</label>
                <CInput
                  autocomplete="text"
                  horizontal
                  v-model="CurriculumOrgschGrade.detailinfo"
                ></CInput>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <b-tabs pills card>
              <b-tab :title="$t('Tables')" active>
                <h5 class="text-center mt-3">{{ $t("MainHours") }}</h5>
                <CRow>
                  <CCol>
                    <b-table
                      :fields="CurriculumOrgschGradeTables"
                      :items="CurriculumOrgschGrade.Tables"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(schoolsubjectname)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                        <p
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left"
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                      </template>
                      <template v-slot:cell(hours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid == 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.hours }}
                        </p>
                        <!-- <custom-number-input
                          v-if="(item.Status == 2 || item.Status == 1) && item.canbedivided"
                          v-model="item.hours"
                          @input="changetablesrow(item)"
                        ></custom-number-input> -->
                      </template>
                      <template v-slot:cell(divideedhours)="{ item }">
                        <p
                          v-if="
                            item.Status == 0 && item.schoolsubjectgroupid == 0
                          "
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.divideedhours }}
                        </p>
                        <p
                          v-if="
                            (item.Status == 0 || !item.canbedivided) &&
                            item.schoolsubjectgroupid > 0
                          "
                        >
                          {{ item.divideedhours }}
                        </p>
                        <custom-number-input
                          v-if="
                            (item.Status == 2 || item.Status == 1) &&
                            item.canbedivided
                          "
                          v-model="item.divideedhours"
                          @input="changetablesrow(item)"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(totalhours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="text-align: center; color: blue"
                        >
                          {{ item.totalhours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.totalhours }}
                        </p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="CurriculumOrgschGrade.CanSave"
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            v-if="item.Status == 0 && item.canbedivided"
                            variant="outline"
                            color="primary"
                            @click="EditRow(item)"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                      <template v-slot:custom-foot>
                        <b-tr>
                          <b-th
                            style="
                              text-align: center;
                              font-size: 15px;
                              color: blue;
                            "
                            >{{ tablestotaltabrow.schoolsubjectname }}</b-th
                          >
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ tablestotaltabrow.hours }}
                            </p>
                          </b-th>
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ tablestotaltabrow.divideedhours }}
                            </p>
                          </b-th>
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ tablestotaltabrow.totalhours }}
                            </p>
                          </b-th>
                          <b-th> </b-th>
                        </b-tr>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
                <h5
                  v-if="CurriculumOrgschGrade.IsOptionalTables.length > 0"
                  class="text-center mt-3"
                >
                  {{ $t("IsOptionalHours") }}
                </h5>
                <CRow v-if="CurriculumOrgschGrade.IsOptionalTables.length > 0">
                  <CCol>
                    <b-table
                      :fields="CurriculumOrgschGradeTables"
                      :items="CurriculumOrgschGrade.IsOptionalTables"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                       <template v-slot:cell(schoolsubjectname)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                        <p
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left"
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                      </template>
                       <template v-slot:cell(hours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid == 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.hours }}
                        </p>
                        <!-- <custom-number-input
                          v-if="(item.Status == 2 || item.Status == 1) && item.canbedivided"
                          v-model="item.hours"
                          @input="changetablesrow(item)"
                        ></custom-number-input> -->
                      </template>
                      <template v-slot:cell(divideedhours)="{ item }">
                        <p
                          v-if="
                            item.Status == 0 && item.schoolsubjectgroupid == 0
                          "
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.divideedhours }}
                        </p>
                        <p
                          v-if="
                            (item.Status == 0 || !item.canbedivided) &&
                            item.schoolsubjectgroupid > 0
                          "
                        >
                          {{ item.divideedhours }}
                        </p>
                        <custom-number-input
                          v-if="
                            (item.Status == 2 || item.Status == 1) &&
                            item.canbedivided
                          "
                          v-model="item.divideedhours"
                          @input="changeoptionaltablesrow(item)"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(totalhours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="text-align: center; color: blue"
                        >
                          {{ item.totalhours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.totalhours }}
                        </p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="CurriculumOrgschGrade.CanSave"
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            v-if="item.Status == 0 && item.canbedivided"
                            variant="outline"
                            color="primary"
                            @click="EditOptionalRow(item)"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>

                      <!-- <template v-slot:custom-foot>
                      <b-tr>
                        <b-th style="text-align: center;font-size:15px;color:blue">{{tablestotaltabrow.schoolsubjectname}}</b-th>
                        <b-th>
                          <p style="text-align: center;font-size:15px;color:blue">{{tablestotaltabrow.hours}}</p>
                        </b-th>
                        <b-th>
                          <p style="text-align: center;font-size:15px;color:blue">{{tablestotaltabrow.divideedhours}}</p>
                        </b-th>
                        <b-th>
                          <p style="text-align: center;font-size:15px;color:blue">{{tablestotaltabrow.totalhours}}</p>
                        </b-th>
                        <b-th>
                        </b-th>
                      </b-tr>
                      </template> -->
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <!-- --fgbbdsfgsdfg -->
              <b-tab
                :title="$t('IshomeTables')"
                v-if="CurriculumOrgschGrade.homeschoolingstudentcount > 0"
              >
                <h5 class="text-center mt-3">{{ $t("MainHours") }}</h5>

                <CRow>
                  <CCol>
                    <b-table
                      :fields="CurriculumOrgschGradeTables"
                      :items="CurriculumOrgschGrade.IshomeTables"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(schoolsubjectname)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                        <p
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left"
                        >
                          {{ item.schoolsubjectname }}
                        </p>
                      </template>
                      <template v-slot:cell(hours)="{ item }">
                        <p
                          v-if="
                            item.Status == 0 && item.schoolsubjectgroupid === 0
                          "
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hours }}
                        </p>
                        <p
                          v-if="
                            item.Status == 0 && item.schoolsubjectgroupid > 0
                          "
                        >
                          {{ item.hours }}
                        </p>
                        <custom-number-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.hours"
                          @input="changesshometablesrow(item)"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(divideedhours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.divideedhours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.divideedhours }}
                        </p>
                      </template>
                      <template v-slot:cell(totalhours)="{ item }">
                        <p
                          v-if="item.schoolsubjectgroupid === 0"
                          style="text-align: center; color: blue"
                        >
                          {{ item.totalhours }}
                        </p>
                        <p v-if="item.schoolsubjectgroupid > 0">
                          {{ item.totalhours }}
                        </p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="CurriculumOrgschGrade.CanSave"
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            v-if="
                              item.Status == 0 && item.schoolsubjectgroupid > 0
                            "
                            variant="outline"
                            color="primary"
                            @click="EditRow(item)"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                      <template v-slot:custom-foot>
                        <b-tr>
                          <b-th
                            style="
                              text-align: center;
                              font-size: 15px;
                              color: blue;
                            "
                            >{{
                              ishometablestotaltabrow.schoolsubjectname
                            }}</b-th
                          >
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ ishometablestotaltabrow.hours }}
                            </p>
                          </b-th>
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ ishometablestotaltabrow.divideedhours }}
                            </p>
                          </b-th>
                          <b-th>
                            <p
                              style="
                                text-align: center;
                                font-size: 15px;
                                color: blue;
                              "
                            >
                              {{ ishometablestotaltabrow.totalhours }}
                            </p>
                          </b-th>
                          <b-th> </b-th>
                        </b-tr>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
                <h5
                  v-if="CurriculumOrgschGrade.IsOptionalIshomeTables.length > 0"
                  class="text-center mt-3"
                >
                  {{ $t("IsOptionalHours") }}
                </h5>

                <CRow
                  v-if="CurriculumOrgschGrade.IsOptionalIshomeTables.length > 0"
                >
                  <CCol>
                    <b-table
                      :fields="CurriculumOrgschGradeTables"
                      :items="CurriculumOrgschGrade.IsOptionalIshomeTables"
                      class="bg-color-table text-center tdpadding mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(schoolsubjectname)="{ item }">
                        <p style="text-align: left">
                          {{ item.schoolsubjectname }}
                        </p>
                      </template>
                      <template v-slot:cell(hours)="{ item }">
                        <p>{{ item.hours }}</p>
                      </template>
                      <template v-slot:cell(divideedhours)="{ item }">
                        <p>{{ item.divideedhours }}</p>
                      </template>
                      <template v-slot:cell(totalhours)="{ item }">
                        <p>{{ item.totalhours }}</p>
                      </template>

                      <!-- <template v-slot:custom-foot>
               <b-tr>
                 <b-th style="text-align: center;font-size:15px;color:blue">{{ishometablestotaltabrow.schoolsubjectname}}</b-th>
                 <b-th>
                   <p style="text-align: center;font-size:15px;color:blue">{{ishometablestotaltabrow.hours}}</p>
                 </b-th>
                 <b-th>
                   <p style="text-align: center;font-size:15px;color:blue">{{ishometablestotaltabrow.divideedhours}}</p>
                 </b-th>
                 <b-th>
                   <p style="text-align: center;font-size:15px;color:blue">{{ishometablestotaltabrow.totalhours}}</p>
                 </b-th>
                 <b-th>
                 </b-th>
               </b-tr>
              </template> -->
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <!-- //// -->
            </b-tabs>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'CurriculumOrgschGrade' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="CurriculumOrgschGrade.CanSave"
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolGradeService from "@/services/SchoolGrade.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolYearService from "@/services/SchoolYear.service";
import CurriculumTypeService from "@/services/CurriculumType.service";
import OrgSchoolGradeService from "@/services/OrgSchoolGrade.service";
import CurriculumOrgschGradeService from "@/services/CurriculumOrgschGrade.service";

export default {
  data() {
    return {
      SaveLoading: false,
      CurriculumOrgschGrade: {},
      selectedrowid: 0,

      schoolyearlist: [],
      curriculumtypelist: [],
      orgschoolgradelist: [],
      attachedorgschoolgradelist: [],
      schoolsubjectlist: [],
      schoolgradelist: [],

      CurriculumOrgschGradeTables: [
        { key: "schoolsubjectname", label: this.$t("SchoolSubjectName") },
        { key: "hours", label: this.$t("hours") },
        { key: "divideedhours", label: this.$t("divideedhours") },
        { key: "totalhours", label: this.$t("totalhours") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        ishomeschooling: false,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
        schoolsubjectgroupid: 0,
        canbedivided: false,
        isdesabledhours: true,
        isdesableddivideedhours: true,
        isoptionalsubject: false,
        Status: 1,
      },
      tablestotaltabrow: {
        id: 0,
        ownerid: 0,
        ishomeschooling: false,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
        schoolsubjectgroupid: 0,
        Status: 1,
      },
      isoptionaltablestotaltabrow: {
        id: 0,
        ownerid: 0,
        ishomeschooling: false,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
        schoolsubjectgroupid: 0,
        Status: 1,
      },
      ishometablestotaltabrow: {
        id: 0,
        ownerid: 0,
        ishomeschooling: false,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
        schoolsubjectgroupid: 0,
        Status: 1,
      },
      schoolgradeid: 0,
      schoolgradecode: "",
      tablestotaltabrowtotalhours: 0,
      ishometablestotaltabrowtotalhours: 0,
      isoptionaltablestotaltabrowtotalhours: 0,
      openedattachedorgschoolgrade: false,
      toastCount: 0,
      allSignupErrors: {},
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    SchoolGradeService.GetAll().then((res) => {
      self.schoolgradelist = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      self.schoolsubjectlist = res.data;
    });
    OrgSchoolGradeService.GetAll().then((res) => {
      self.orgschoolgradelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      self.schoolyearlist = res.data;
    });
    CurriculumTypeService.GetAll().then((res) => {
      self.curriculumtypelist = res.data;
    });
    CurriculumOrgschGradeService.Get(self.selectedrowid).then((res) => {
      self.CurriculumOrgschGrade = res.data;
      self.helperdata();
      self.calculatetotalRow();
    });
  },
  methods: {
    check() {
      var self = this;
      if (self.CurriculumOrgschGrade.attachedorgschoolgradeid === 0) {
        if (self.tablestotaltabrowtotalhours != self.tablestotaltabrow.hours) {
          self.makeToast(
            self.$t("TotalhoursNotTrue") +
              ": " +
              self.tablestotaltabrowtotalhours,
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.ishometablestotaltabrowtotalhours !=
          self.ishometablestotaltabrow.hours
        ) {
          self.makeToast(
            self.$t("IshomeTotalhoursNotTrue") +
              ": " +
              self.ishometablestotaltabrowtotalhours,
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.isoptionaltablestotaltabrowtotalhours !=
          self.ishometablestotaltabrow.hours
        ) {
          self.makeToast(
            self.$t("IshomeTotalhoursNotTrue") +
              ": " +
              self.isoptionaltablestotaltabrowtotalhours,
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      /*  if (
        self.CurriculumOrgschGrade.docnumber === null ||
        self.CurriculumOrgschGrade.docnumber === undefined ||
        self.CurriculumOrgschGrade.docnumber === 0 ||
        self.CurriculumOrgschGrade.docnumber === ""
      ) {
        self.makeToast(
          self.$t("DocNumberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CurriculumOrgschGrade.schoolyearid === null ||
        self.CurriculumOrgschGrade.schoolyearid === undefined ||
        self.CurriculumOrgschGrade.schoolyearid === 0
      ) {
        self.makeToast(
          self.$t("SchoolYearNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      
      if (
        self.CurriculumOrgschGrade.normativedoc === null ||
        self.CurriculumOrgschGrade.normativedoc === undefined ||
        self.CurriculumOrgschGrade.normativedoc === 0 ||
        self.CurriculumOrgschGrade.normativedoc === ""
      ) {
        self.makeToast(
          self.$t("NormativeDocNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var tableitemscount = 0;
      tableitemscount = self.CurriculumOrgschGrade.Tables.filter(
        item => item.Status !== 3
      ).length;
      if (tableitemscount === 0) {
        self.makeToast(self.$t("TableNotfull"), self.$t("Error"), "danger");
        return false;
      } */
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }

      CurriculumOrgschGradeService.Update(self.CurriculumOrgschGrade)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "CurriculumOrgschGrade" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },

    changedisabledattachedorgschoolgrade() {
      var self = this;
      /* OrgSchoolGradeService.GetAll(this.schoolgradecode).then(res => {
            this.attachedorgschoolgradelist = res.data;
          }); */
      self.openedattachedorgschoolgrade = false;
      if (self.CurriculumOrgschGrade.studentcount < 24) {
        if (
          self.schoolgradecode === "001" ||
          self.schoolgradecode === "002" ||
          self.schoolgradecode === "003"
        ) {
          self.openedattachedorgschoolgrade = true;
        } else {
          self.openedattachedorgschoolgrade = false;
        }
      }
    },
    helperdata() {
      var self = this;
      if (self.CurriculumOrgschGrade.orgschoolgradeid > 0) {
        self.schoolgradeid = self.orgschoolgradelist.filter(function (item) {
          if (item.id === self.CurriculumOrgschGrade.orgschoolgradeid)
            return item;
        })[0].schoolgradeid;
        self.schoolgradecode = self.orgschoolgradelist.filter(function (item) {
          if (item.id === self.CurriculumOrgschGrade.orgschoolgradeid)
            return item;
        })[0].schoolgradecode;
      }
      self.changedisabledattachedorgschoolgrade();
    },
    orgschoolgradechange() {
      var self = this;
      self.CurriculumOrgschGrade.attachedorgschoolgradeid = 0;

      self.CurriculumOrgschGrade.studentcount = 0;
      self.CurriculumOrgschGrade.femalestudentcount = 0;
      self.CurriculumOrgschGrade.homeschoolingstudentcount = 0;
      self.CurriculumOrgschGrade.educationlanguagename = 0;
      self.CurriculumOrgschGrade.schoolingshiftname = 0;
      self.CurriculumOrgschGrade.isspecialized = 0;
      self.CurriculumOrgschGrade.specializedsubjects = 0;
      self.CurriculumOrgschGrade.OblastID = 0;

      self.CurriculumOrgschGrade.Tables.forEach(function (item) {
        item.Status = 3;
      });

      self.CurriculumOrgschGrade.IshomeTables.forEach(function (item) {
        item.Status = 3;
      });
      self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item) {
        item.Status = 3;
      });
      self.CurriculumOrgschGrade.IsOptionalIshomeTables.forEach(function (
        item
      ) {
        item.Status = 3;
      });
      self.calculatetotalRow();
      self.helperdata();

      CurriculumOrgschGradeService.GetCurriculumOrgschGradeTable(
        self.CurriculumOrgschGrade.schoolyearid,
        self.schoolgradeid,
        self.CurriculumOrgschGrade.orgschoolgradeid,
        self.CurriculumOrgschGrade.docdate
      )
        .then((res) => {
          self.CurriculumOrgschGrade.studentcount = res.data.studentcount;
          self.CurriculumOrgschGrade.femalestudentcount =
            res.data.femalestudentcount;
          self.CurriculumOrgschGrade.homeschoolingstudentcount =
            res.data.homeschoolingstudentcount;
          self.CurriculumOrgschGrade.educationlanguagename =
            res.data.educationlanguagename;
          self.CurriculumOrgschGrade.schoolingshiftname =
            res.data.schoolingshiftname;
          self.CurriculumOrgschGrade.isspecialized = res.data.isspecialized;
          self.CurriculumOrgschGrade.specializedsubjects =
            res.data.specializedsubjects;
          self.CurriculumOrgschGrade.specializedsubjectsid =
            res.data.specializedsubjectsid;
          self.CurriculumOrgschGrade.OblastID = res.data.OblastID;

          res.data.Tables.forEach(function (item) {
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: item.ishomeschooling,
              schoolsubjectid: item.schoolsubjectid,
              schoolsubjectname: item.schoolsubjectname,
              hours: item.hours,
              divideedhours: item.divideedhours,
              totalhours: item.totalhours,
              schoolsubjectgroupid: item.schoolsubjectgroupid,
              canbedivided: item.canbedivided,
              isdesabled: item.isdesabled,
              isdesableddivideedhours: item.isdesableddivideedhours,
              isoptionalsubject: item.isoptionalsubject,
              Status: item.Status,
            };
            self.CurriculumOrgschGrade.Tables.push(self.tabrow);
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: false,
              schoolsubjectid: 0,
              schoolsubjectname: "",
              hours: 0,
              divideedhours: 0,
              totalhours: 0,
              schoolsubjectgroupid: 0,
              canbedivided: false,
              isdesabledhours: true,
              isdesableddivideedhours: true,
              isoptionalsubject: false,
              Status: 1,
            };
          });
          res.data.IshomeTables.forEach(function (item) {
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: item.ishomeschooling,
              schoolsubjectid: item.schoolsubjectid,
              schoolsubjectname: item.schoolsubjectname,
              hours: item.hours,
              divideedhours: item.divideedhours,
              totalhours: item.totalhours,
              schoolsubjectgroupid: item.schoolsubjectgroupid,
              canbedivided: item.canbedivided,
              isdesabledhours: item.isdesabledhours,
              isdesableddivideedhours: item.isdesableddivideedhours,
              isoptionalsubject: item.isoptionalsubject,
              Status: item.Status,
            };
            self.CurriculumOrgschGrade.IshomeTables.push(self.tabrow);
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: true,
              schoolsubjectid: 0,
              schoolsubjectname: "",
              hours: 0,
              divideedhours: 0,
              totalhours: 0,
              schoolsubjectgroupid: 0,
              canbedivided: false,
              isdesabled: true,
              isdesableddivideedhours: true,
              isoptionalsubject: false,
              Status: 1,
            };
          });
          res.data.IsOptionalTables.forEach(function (item) {
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: item.ishomeschooling,
              schoolsubjectid: item.schoolsubjectid,
              schoolsubjectname: item.schoolsubjectname,
              hours: item.hours,
              divideedhours: item.divideedhours,
              totalhours: item.totalhours,
              schoolsubjectgroupid: item.schoolsubjectgroupid,
              canbedivided: item.canbedivided,
              isdesabled: item.isdesabled,
              isdesableddivideedhours: item.isdesableddivideedhours,
              isoptionalsubject: item.isoptionalsubject,
              Status: item.Status,
            };
            self.CurriculumOrgschGrade.IsOptionalTables.push(self.tabrow);
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: false,
              schoolsubjectid: 0,
              schoolsubjectname: "",
              hours: 0,
              divideedhours: 0,
              totalhours: 0,
              schoolsubjectgroupid: 0,
              canbedivided: false,
              isdesabledhours: true,
              isdesableddivideedhours: true,
              isoptionalsubject: false,
              Status: 1,
            };
          });
          res.data.IsOptionalIshomeTables.forEach(function (item) {
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: item.ishomeschooling,
              schoolsubjectid: item.schoolsubjectid,
              schoolsubjectname: item.schoolsubjectname,
              hours: item.hours,
              divideedhours: item.divideedhours,
              totalhours: item.totalhours,
              schoolsubjectgroupid: item.schoolsubjectgroupid,
              canbedivided: item.canbedivided,
              isdesabledhours: item.isdesabledhours,
              isdesableddivideedhours: item.isdesableddivideedhours,
              isoptionalsubject: item.isoptionalsubject,
              Status: item.Status,
            };
            self.CurriculumOrgschGrade.IsOptionalIshomeTables.push(self.tabrow);
            self.tabrow = {
              id: 0,
              ownerid: 0,
              ishomeschooling: true,
              schoolsubjectid: 0,
              schoolsubjectname: "",
              hours: 0,
              divideedhours: 0,
              totalhours: 0,
              schoolsubjectgroupid: 0,
              canbedivided: false,
              isdesabled: true,
              isdesableddivideedhours: true,
              isoptionalsubject: false,
              Status: 1,
            };
          });
          self.calculatetotalRow();
          /*  self.changedisabledrow(); */
          self.helperdata();
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    attachedorgschoolgradechange() {
      var self = this;
      if (self.CurriculumOrgschGrade.attachedorgschoolgradeid > 0) {
        self.CurriculumOrgschGrade.Tables.forEach(function (item) {
          item.Status = 3;
        });

        self.CurriculumOrgschGrade.IshomeTables.forEach(function (item) {
          item.Status = 3;
        });
        self.calculatetotalRow();
        self.helperdata();
      } else {
        self.orgschoolgradechange();
      }
    },
    calculatetotalRow() {
      var self = this;

      self.tablestotaltabrow = {
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
      };
      self.isoptionaltablestotaltabrow = {
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
      };
      self.ishometablestotaltabrow = {
        hours: 0,
        divideedhours: 0,
        totalhours: 0,
      };
      self.tablestotaltabrow.schoolsubjectname = self.$t("Total");
       self.isoptionaltablestotaltabrow.schoolsubjectname = self.$t("Total");
      self.ishometablestotaltabrow.schoolsubjectname = self.$t("Total");
      self.CurriculumOrgschGrade.Tables.forEach(function (item) {
        if (item.Status !== 3 && item.schoolsubjectgroupid === 0) {
          self.tablestotaltabrow.hours =
            self.tablestotaltabrow.hours + item.hours;
          self.tablestotaltabrow.divideedhours =
            self.tablestotaltabrow.divideedhours + item.divideedhours;
          self.tablestotaltabrow.totalhours =
            self.tablestotaltabrow.totalhours + item.totalhours;
        }
      });
      if (self.tablestotaltabrowtotalhours == 0)
        self.tablestotaltabrowtotalhours = self.tablestotaltabrow.hours;
      self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item) {
        if (item.Status !== 3 && item.schoolsubjectgroupid === 0) {
          self.isoptionaltablestotaltabrow.hours =
            self.isoptionaltablestotaltabrow.hours + item.hours;
          self.tablestotisoptionaltablestotaltabrowaltabrow.divideedhours =
            self.isoptionaltablestotaltabrow.divideedhours + item.divideedhours;
          self.isoptionaltablestotaltabrow.totalhours =
            self.isoptionaltablestotaltabrow.totalhours + item.totalhours;
        }
      });
      if (self.isoptionaltablestotaltabrowtotalhours == 0)
        self.isoptionaltablestotaltabrowtotalhours = self.isoptionaltablestotaltabrow.hours;

      self.CurriculumOrgschGrade.IshomeTables.forEach(function (item) {
        if (item.Status !== 3 && item.schoolsubjectgroupid === 0) {
          self.ishometablestotaltabrow.hours =
            self.ishometablestotaltabrow.hours + item.hours;
          self.ishometablestotaltabrow.divideedhours =
            self.ishometablestotaltabrow.divideedhours + item.divideedhours;
          self.ishometablestotaltabrow.totalhours =
            self.ishometablestotaltabrow.totalhours + item.totalhours;
        }
      });
      if (self.ishometablestotaltabrowtotalhours == 0)
        self.ishometablestotaltabrowtotalhours =
          self.ishometablestotaltabrow.hours;
      /* self.changedisabledrow(); */
    },
    changetablesrow(changerow) {
      var self = this;
      /* ----1---- */
      if (
        changerow.hours !== changerow.divideedhours &&
        changerow.divideedhours !== 0
      ) {
        alert("Bo`lib o`tilish soati asosiy soatdan katta bo`lmasligi kerak");
        changerow.divideedhours = changerow.hours;
      }
      /* ----2---- */
      changerow.totalhours = changerow.hours + changerow.divideedhours;
      /* ----3---- */
      self.CurriculumOrgschGrade.Tables.forEach(function (item) {
        if (
          item.schoolsubjectid === changerow.schoolsubjectgroupid &&
          item.schoolsubjectgroupid === 0
        ) {
          item.hours = 0;
          item.divideedhours = 0;
          item.totalhours = 0;
          self.CurriculumOrgschGrade.Tables.forEach(function (item1) {
            if (
              item1.Status !== 3 &&
              item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
            ) {
              item.hours = item.hours + item1.hours;
              item.divideedhours = item.divideedhours + item1.divideedhours;
              item.totalhours = item.totalhours + item1.totalhours;
            }
          });
          self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item1) {
            if (
              item1.Status !== 3 &&
              item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
            ) {
              item.hours = item.hours + item1.hours;
              item.divideedhours = item.divideedhours + item1.divideedhours;
              item.totalhours = item.totalhours + item1.totalhours;
            }
          });
        }
      });
      /* ----4---- */
      self.calculatetotalRow();
    },
    changeoptionaltablesrow(changerow) {
      var self = this;
      /* ----1---- */
      if (
        changerow.hours !== changerow.divideedhours &&
        changerow.divideedhours !== 0
      ) {
        alert("Bo`lib o`tilish soati asosiy soatdan katta bo`lmasligi kerak");
        changerow.divideedhours = changerow.hours;
      }
      /* ----2---- */
      changerow.totalhours = changerow.hours + changerow.divideedhours;
      /* ----3---- */
      self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item) {
        if (
          item.schoolsubjectid === changerow.schoolsubjectgroupid &&
          item.schoolsubjectgroupid === 0
        ) {
          item.hours = 0;
          item.divideedhours = 0;
          item.totalhours = 0;
          self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item1) {
            if (
              item1.Status !== 3 &&
              item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
            ) {
              item.hours = item.hours + item1.hours;
              item.divideedhours = item.divideedhours + item1.divideedhours;
              item.totalhours = item.totalhours + item1.totalhours;
            }
          });
          // self.CurriculumOrgschGrade.IsOptionalTables.forEach(function (item1) {
          //   if (
          //     item1.Status !== 3 &&
          //     item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
          //   ) {
          //     item.hours = item.hours + item1.hours;
          //     item.divideedhours = item.divideedhours + item1.divideedhours;
          //     item.totalhours = item.totalhours + item1.totalhours;
          //   }
          // });
        }
      });
      /* ----4---- */
      self.calculatetotalRow();
    },
    changesshometablesrow(changerow) {
      var self = this;
      /* ----1---- */
      if (
        changerow.hours !== changerow.divideedhours &&
        changerow.divideedhours !== 0
      ) {
        alert("Bo`lib o`tilish soati asosiy soatdan katta bo`lmasligi kerak");
        changerow.divideedhours = changerow.hours;
      }
      /* ----2---- */
      changerow.totalhours = changerow.hours + changerow.divideedhours;
      /* ----3---- */
      self.CurriculumOrgschGrade.IshomeTables.forEach(function (item) {
        if (
          item.schoolsubjectid === changerow.schoolsubjectgroupid &&
          item.schoolsubjectgroupid === 0
        ) {
          item.hours = 0;
          item.divideedhours = 0;
          item.totalhours = 0;
          self.CurriculumOrgschGrade.IshomeTables.forEach(function (item1) {
            if (
              item1.Status !== 3 &&
              item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
            ) {
              item.hours = item.hours + item1.hours;
              item.divideedhours = item.divideedhours + item1.divideedhours;
              item.totalhours = item.totalhours + item1.totalhours;
            }
          });
          self.CurriculumOrgschGrade.IsOptionalIshomeTables.forEach(function (
            item1
          ) {
            if (
              item1.Status !== 3 &&
              item1.schoolsubjectgroupid === changerow.schoolsubjectgroupid
            ) {
              item.hours = item.hours + item1.hours;
              item.divideedhours = item.divideedhours + item1.divideedhours;
              item.totalhours = item.totalhours + item1.totalhours;
            }
          });
        }
      });
      /* ----4---- */
      self.calculatetotalRow();
    },
    EditRow(item) {
      item.Status = 2;
    },
    EditOptionalRow(item){
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
  watch: {
    "CurriculumOrgschGrade.orgschoolgradeid": {
      handler(newValue, oldValue) {
        OrgSchoolGradeService.GetAll(this.schoolgradecode).then((res) => {
          this.attachedorgschoolgradelist = res.data;
        });
      },
    },
  },
};
</script>

<style></style>

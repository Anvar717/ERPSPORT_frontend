  <template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("HrAcceptanceWork") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="2">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required|max:9"
                >
                  <CInput
                    disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    :label="$t('docnumber')"
                    v-model="HrAcceptanceWork.docnumber"
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
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <label>{{ $t("docdate") }}</label>

                  <custom-date-picker
                    v-model="HrAcceptanceWork.docdate"
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
                  </custom-date-picker>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="detailinfo"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="HrAcceptanceWork.detailinfo"
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
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol class="bg-color-table text-lg-right tdpadding mb-4 mt-2">
              <div class="text-lg-right">
                <CButton
                  size="sm"
                  color="primary"
                  variant="outline"
                  @click="AddRow"
                  v-if="HrAcceptanceWork.CanSave"
                >
                  <b-icon icon="plus"> </b-icon>
                  {{ $t("Add") }}
                </CButton>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <CCol class="myDiv p-0">
                <div class="mobileStyle">
                  <b-table
                    :fields="HrAcceptanceWorkTables"
                    :items="HrAcceptanceWork.Tables"
                    class="bg-color-table text-center tdpadding"
                    style="vertical-align: middle"
                    bordered
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:cell(personname)="{ item }">
                      <p>{{ item.personname }}</p>
                    </template>
                    <template v-slot:cell(departmentname)="{ item }">
                      <p>{{ item.departmentname }}</p>
                    </template>
                    <template v-slot:cell(positionidname)="{ item }">
                      <p>{{ item.positionidname }}</p>
                    </template>
                    <template v-slot:cell(employmenttype)="{ item }">
                      <p>{{ item.employmenttype }}</p>
                    </template>
                    <template v-slot:cell(employmentrate)="{ item }">
                      <p>{{ item.employmentrate }}</p>
                    </template>
                    <template v-slot:cell(startdate)="{ item }">
                      <p>{{ item.startdate }}</p>
                    </template>
                    <template v-slot:cell(enddate)="{ item }">
                      <p>{{ item.enddate }}</p>
                    </template>
                    <template v-slot:cell(detailinfo)="{ item }">
                      <p>{{ item.detailinfo }}</p>
                    </template>
                    <template v-slot:cell(employeeenrolment)="{ item }">
                      <p>{{ item.employeeenrolmentid }}</p>
                    </template>
                    <template v-slot:cell(ordernumber)="{ item }">
                      <p>{{ item.ordernumber }}</p>
                    </template>
                    <template v-slot:cell(hrempappointordertypename)="{ item }">
                      <p>{{ item.hrempappointordertypename }}</p>
                    </template>
  
                    <template v-slot:cell(workschedulename)="{ item }">
                      <p>{{ item.workschedulename }}</p>
                    </template>
                    <template
                      v-slot:cell(actions)="{ item }"
                      v-if="HrAcceptanceWork.CanSave"
                    >
                      <div class="text-center">
                        <b-link
                          class="mr-1"
                          v-b-tooltip
                          :title="$t('Edit')"
                          @click="EditItem(item)"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </b-link>
                        <b-link
                          v-b-tooltip
                          :title="$t('Delete')"
                          @click="DeleteItem(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </div>
              </CCol>
            </CCol>
          </CRow>
          <b-modal id="AddModal" size="xl" no-close-on-backdrop>
            <template v-slot:modal-title>{{
              $t("EmployeeInformation")
            }}</template>
            <CRow>
              <!-- <CCol sm="2">
                  <label>{{$t('ordernumber')}}</label>
                  <CInput disabled class="mb-2" v-model="tabrow.ordernumber"></CInput>
                </CCol> -->
              <CCol sm="3">
                <label>{{ $t("hrempappointordertypename") }}</label>
                <p v-if="tabrow.Status === 2" style="color: blue">
                  {{ tabrow.hrempappointordertypename }}
                </p>
                <v-select
                  v-if="tabrow.Status === 1"
                  :options="hrempappointordertypelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.hrempappointordertypeid"
                  @input="hrempappointordertypechange"
                  class="mb-2 fname-select"
                >
                </v-select>
              </CCol>
              <CCol sm="3" v-if="tabrow.hrempappointordertypeid !== 1">
                <b-col>
                  <div>
                    <label>{{ $t("Employee") }}</label>
                    <p v-if="tabrow.Status === 2" style="color: blue">
                      {{ tabrow.personname }}
                    </p>
                    <c-input
                      style="width: 100%"
                      v-if="tabrow.Status === 1"
                      disabled
                      v-model="tabrow.personname"
                    >
                      <template #append>
                        <CButton
                          @click="OpenPersonModal"
                          size="sm"
                          type="button"
                          color="primary"
                        >
                          <b-icon icon="three-dots"></b-icon>
                        </CButton>
                      </template>
                    </c-input>
                  </div>
                </b-col>
              </CCol>
            </CRow>
            <CCard sm="6" v-if="tabrow.hrempappointordertypeid === 1">
              <CCardBody sm="6">
                <CRow class="mt-3">
                  <CCol sm="2">
                    <label>{{ $t("astartdate") }}</label>
                    <custom-date-picker
                      style="width: 100%"
                      v-model="tabrow.startdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('astartdate')"
                      @input="startdatechange"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></custom-date-picker>
                  </CCol>
                  <CCol sm="2">
                    <label>{{ $t("aenddate") }}</label>
                    <custom-date-picker
                      v-model="tabrow.enddate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('aenddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></custom-date-picker>
                  </CCol>

                  <CCol>
                    <label>{{ $t("detailinfo") }}</label>
                    <CInput class="mb-2" v-model="tabrow.detailinfo"></CInput>
                  </CCol>
                </CRow>

                <CRow class="mt-2">
                  <CCol lg="4" sm="12">
                    <label>{{ $t("Department") }}</label>
                    <v-select
                      :options="departmentlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="departmentchange"
                      v-model="tabrow.departmentid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol lg="4" sm="12">
                    <label>{{ $t("position") }}</label>
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.positionid"
                      :placeholder="$t('ChooseBelow')"
                      label="positionidname"
                      @input="positionchange"
                      v-model="tabrow.positionid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol
                    lg="4"
                    sm="12"
                    v-if="
                      tabrow.positionid == 7 ||
                      tabrow.positionid == 8 ||
                      tabrow.positionid == 118
                    "
                  >
                    <label>{{ $t("subject") }}</label>
                    <v-select
                      :options="subjectlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.schoolsubjectid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol lg="4" sm="12" v-if="isfixedratecount">
                    <label>{{ $t("ratecount") }}</label>
                    <p style="color: blue">{{ ratecount }}</p>
                  </CCol>
                  <CCol lg="4" sm="12">
                    <label>{{ $t("hremploymentrate") }}</label>
                    <p style="color: blue">{{ hremploymentrate }}</p>
                  </CCol>
                </CRow>

                <CRow class="mt-3">
                  <b-col>
                    <div class="form-group form-row mb-0">
                      <label>
                        {{ $t("Employee") }}
                      </label>
                      <p v-if="tabrow.Status === 2" style="color: blue">
                        {{ tabrow.personname }}
                      </p>
                      <c-input
                        style="width: 100%"
                        v-if="tabrow.Status === 1"
                        disabled
                        v-model="tabrow.personname"
                      >
                        <template #append>
                          <CButton
                            @click="OpenEmployeeModal"
                            size="sm"
                            type="button"
                            color="primary"
                          >
                            <b-icon icon="three-dots"></b-icon>
                          </CButton>
                        </template>
                      </c-input>
                    </div>
                  </b-col>

                  <CCol sm="3">
                    <label>{{ $t("employmenttype") }}</label>
                    <v-select
                      :options="employmenttypelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.employmenttypeid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="1" v-if="isfixedratecount">
                    <label>{{ $t("employmentrate") }}</label>
                    <!-- <custom-number-input
                      type="number"
                      v-model="tabrow.employmentrate"
                    ></custom-number-input> -->
                    <v-select
                      :options="hremploymentratelist"
                      :reduce="(item) => item.hremploymentrate"
                      :placeholder="$t('ChooseBelow')"
                      label="hremploymentrate"
                      v-model="tabrow.employmentrate"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label>{{ $t("workschedulename") }}</label>
                    <v-select
                      :options="workschedulelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.workscheduleid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard sm="6" v-if="tabrow.hrempappointordertypeid === 2">
              <CCardBody sm="6">
                <CRow class="mt-3">
                  <CCol sm="2">
                    <label>{{ $t("astartdate") }}</label>
                    <date-picker
                      style="width: 100%"
                      v-model="tabrow.startdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('astartdate')"
                      @input="startdatechange"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol sm="2">
                    <label>{{ $t("aenddate") }}</label>
                    <date-picker
                      v-model="tabrow.enddate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('aenddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol>
                    <label>{{ $t("detailinfo") }}</label>
                    <CInput class="mb-2" v-model="tabrow.detailinfo"></CInput>
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol>
                    <label>{{ $t("fromdepartment") }}</label>
                    <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromposition") }}</label>
                    <p style="color: blue">{{ tabrow.frompositionidname }}</p>
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromemploymentrate") }}</label>
                    <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
                  </CCol>
                </CRow>
                <CRow class="mt-2">
                  <CCol>
                    <label>{{ $t("Department") }}</label>
                    <v-select
                      :options="departmentlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="departmentchange"
                      v-model="tabrow.departmentid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol>
                    <label>{{ $t("position") }}</label>
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.positionid"
                      :placeholder="$t('ChooseBelow')"
                      label="positionidname"
                      @input="positionchange"
                      v-model="tabrow.positionid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol>
                    <label>{{ $t("hremploymentrate") }}</label>
                    <p style="color: blue">{{ hremploymentrate }}</p>
                  </CCol>
                  <CCol v-if="isfixedratecount">
                    <label>{{ $t("ratecount") }}</label>
                    <p style="color: blue">{{ ratecount }}</p>
                  </CCol>
                </CRow>

                <CRow class="mt-3">
                  <CCol sm="3">
                    <label>{{ $t("employmenttype") }}</label>
                    <v-select
                      :options="employmenttypelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.employmenttypeid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="1" v-if="isfixedratecount">
                    <label>{{ $t("employmentrate") }}</label>
                    <!-- <custom-number-input
                      type="number"
                      v-model="tabrow.employmentrate"
                    ></custom-number-input> -->
                     <v-select
                      :options="hremploymentratelist"
                      :reduce="(item) => item.hremploymentrate"
                      :placeholder="$t('ChooseBelow')"
                      label="hremploymentrate"
                      v-model="tabrow.employmentrate"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label>{{ $t("workschedulename") }}</label>
                    <v-select
                      :options="workschedulelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.workscheduleid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard sm="6" v-if="tabrow.hrempappointordertypeid === 3">
              <CCardBody sm="6">
                <CRow class="mt-3">
                  <CCol>
                    <label>{{ $t("fromdepartment") }}</label>
                    <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
                    <!--  <p v-if="tabrow.Status === 2" style="color:blue">{{tabrow.fromdepartmentname}}</p>
                      <v-select v-if="tabrow.Status === 1" :options="departmentlist" :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')" label="name" v-model="tabrow.fromdepartmentid" class="mb-2"
                        @input="fromdepartmentchange"></v-select> -->
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromposition") }}</label>
                    <p style="color: blue">{{ tabrow.frompositionidname }}</p>
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromemploymentrate") }}</label>
                    <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
                  </CCol>
                </CRow>

                <CRow class="mt-3">
                  <!--  <b-col>
                      <div class="form-group form-row mb-0">
                        <label >
                          {{
                          $t("Employee")
                          }}
                        </label>
                        <p v-if="tabrow.Status === 2" style="color:blue">{{tabrow.personname}}</p>
                          <c-input style="width:100%" v-if="tabrow.Status === 1 " disabled v-model="tabrow.personname">
                            <template #append>
                              <CButton @click="OpenPersonModal" :disabled="!tabrow.fromdepartmentid" size="sm" type="button" color="primary">
                                <b-icon icon="three-dots"></b-icon>
                              </CButton>
                            </template>
                          </c-input>
                      </div>
                    </b-col> -->

                  <CCol sm="2">
                    <label>{{ $t("startdate") }}</label>
                    <date-picker
                      style="width: 100%"
                      v-model="tabrow.startdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('startdate')"
                      @input="startdatechange"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol>
                    <label>{{ $t("detailinfo") }}</label>
                    <CInput class="mb-2" v-model="tabrow.detailinfo"></CInput>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard sm="6" v-if="tabrow.hrempappointordertypeid === 4">
              <CCardBody sm="6">
                <CRow class="mt-3">
                  <CCol sm="2">
                    <label>{{ $t("astartdate") }}</label>
                    <date-picker
                      style="width: 100%"
                      v-model="tabrow.startdate"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('astartdate')"
                      @input="startdatechange"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol sm="2">
                    <label>{{ $t("aenddate") }}</label>
                    <date-picker
                      v-model="tabrow.enddate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('aenddate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </CCol>
                  <CCol>
                    <label>{{ $t("detailinfo") }}</label>
                    <CInput class="mb-2" v-model="tabrow.detailinfo"></CInput>
                  </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol>
                    <label>{{ $t("fromdepartment") }}</label>
                    <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
                    <!--  <p v-if="tabrow.Status === 2" style="color:blue">{{tabrow.fromdepartmentname}}</p>
                      <v-select v-if="tabrow.Status === 1" :options="departmentlist" :reduce="item => item.id"
                        :placeholder="$t('ChooseBelow')" label="name" v-model="tabrow.fromdepartmentid" class="mb-2"
                        @input="fromdepartmentchange"></v-select> -->
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromposition") }}</label>
                    <p style="color: blue">{{ tabrow.frompositionidname }}</p>
                  </CCol>
                  <CCol>
                    <label>{{ $t("fromemploymentrate") }}</label>
                    <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
                  </CCol>
                </CRow>
                <CRow class="mt-2">
                  <CCol>
                    <label>{{ $t("Department") }}</label>
                    <v-select
                      :options="departmentlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      @input="departmentchange"
                      v-model="tabrow.departmentid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol>
                    <label>{{ $t("position") }}</label>
                    <v-select
                      :options="positionlist"
                      :reduce="(item) => item.positionid"
                      :placeholder="$t('ChooseBelow')"
                      label="positionidname"
                      @input="positionchange"
                      v-model="tabrow.positionid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol>
                    <label>{{ $t("hremploymentrate") }}</label>
                    <p style="color: blue">{{ hremploymentrate }}</p>
                  </CCol>
                  <CCol v-if="isfixedratecount">
                    <label>{{ $t("ratecount") }}</label>
                    <p style="color: blue">{{ ratecount }}</p>
                  </CCol>
                </CRow>

                <CRow class="mt-3">
                  <!-- <b-col>
                      <div class="form-group form-row mb-0">
                        <label >
                          {{
                          $t("Employee")
                          }}
                        </label>
                        <p v-if="tabrow.Status === 2" style="color:blue">{{tabrow.personname}}</p>
                          <c-input style="width:100%" v-if="tabrow.Status === 1 " disabled v-model="tabrow.personname">
                            <template #append>
                              <CButton @click="OpenPersonModal" :disabled="!tabrow.fromdepartmentid" size="sm" type="button" color="primary">
                                <b-icon icon="three-dots"></b-icon>
                              </CButton>
                            </template>
                          </c-input>
                      </div>
                    </b-col>-->
                  <CCol sm="3">
                    <label>{{ $t("employmenttype") }}</label>
                    <v-select
                      disabled
                      :options="employmenttypelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.employmenttypeid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="1">
                    <label>{{ $t("employmentrate") }}</label>
                    <!-- <custom-number-input
                      @input="employmentratechange"
                      type="number"
                      v-model="tabrow.employmentrate"
                    ></custom-number-input> -->
                    <v-select
                      :options="hremploymentratelist"
                      :reduce="(item) => item.hremploymentrate"
                       @input="employmentratechange"
                      :placeholder="$t('ChooseBelow')"
                      label="hremploymentrate"
                      v-model="tabrow.employmentrate"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label>{{ $t("workschedulename") }}</label>
                    <v-select
                      disabled
                      :options="workschedulelist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow.workscheduleid"
                      class="mb-2 fname-select"
                    ></v-select>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <template v-slot:modal-footer>
              <div class="text-center mx-auto">
                <CButton
                  size="sm"
                  color="danger"
                  class="mr-2"
                  @click="$bvModal.hide('AddModal')"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
                <CButton size="sm" color="primary" @click="AddData">
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton>
              </div>
            </template>
          </b-modal>
          <CRow class="mt-3">
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-0"
                  size="sm"
                  color="danger"
                  @click="
                    $router.push({
                      name: 'HrAcceptanceWork',
                      query: {
                        StartDate: $route.query.StartDate,
                        EndDate: $route.query.EndDate,
                        Search: $route.query.Search,
                        pagelimit: $route.query.pagelimit,
                      },
                    })
                  "
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton
                  v-if="HrAcceptanceWork.CanSave"
                  size="sm"
                  color="success"
                  class="mr-0"
                  @click="SaveData"
                >
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <b-modal
        ref="my-modal"
        size="xl"
        v-model="createModal"
        hide-footer
        hide-header
        class="bigxl"
      >
        <header class="modal-header">
          <h5 class="modal-title">{{ $t("Employee") }}</h5>
          <button
            type="button"
            aria-label="Close"
            class="close"
            @click="showModal('createModal', false)"
          >
            ×
          </button>
        </header>
        <div class="modal-body">
          <edit-person-component
            :show-back-button="false"
            :person-type-id="2"
            @success="employeeCreated($event)"
          >
          </edit-person-component>
        </div>
      </b-modal>
      <b-modal
        id="PersonModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Person')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :hrappointordertypeid="tabrow.hrempappointordertypeid"
          :deparment="tabrow.departmentid"
          :ondate="HrAcceptanceWork.ondate"
          :isteacher="null"
          @SelectedItem="SelectedItem"
          @DblClick="AddPersonData"
        ></employee-list>
        <!-- <get-employee-list-component @SelectedItem="SelectedItem(personvalue)" :isAllEmployee="false" @DblClick="AddPersonData"></get-employee-list-component> -->
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPersonData(personvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
          id="EmployeeModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            :isAllEmployee="true"
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
    </CCol>
  </CRow>
</template>

  <script>
import WorkScheduleService from "@/services/WorkSchedule.service";
import DepartmentService from "@/services/Department.service";
import HROrgStructureService from "@/services/HROrgStructure.service";
import HelperService from "@/services/helper.service";
import PersonList from "@/components/PersonList";
import HrAcceptanceWorkService from "@/services/HrAcceptanceWork.service";
import EmployeeManageService from "@/services/EmployeeManage.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import EmployeeList from "@/components/EmployeeList";
import GetEmployeeListComponent from "@/components/GetEmployeeListComponent";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
export default {
  components: {
    editPersonComponent,
    EmployeeList,
    GetEmployeeListComponent,
    PersonList,
    CustomDatePicker
  },
  data() {
    return {
      createModal: false,
      SaveLoading: false,
      HrAcceptanceWork: {},
      selectedrowid: 0,
      employeelist: [],
      departmentlist: [],
      positionlist: [],
      subjectlist: [],
      frompositionlist: [],
      employmenttypelist: [],
      hrempappointordertypelist: [],
      workschedulelist: [],
      lang: "",
      HrAcceptanceWorkTables: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
        },
        {
          key: "hrempappointordertypename",
          label: this.$t("hrempappointordertypename"),
        },
        {
          key: "departmentname",
          label: this.$t("departmentname"),
        },
        {
          key: "fromdepartmentname",
          label: this.$t("fromdepartmentname"),
        },
        {
          key: "personname",
          label: this.$t("Employee"),
        },

        {
          key: "frompositionidname",
          label: this.$t("frompositionidname"),
        },
        {
          key: "positionidname",
          label: this.$t("positionname"),
        },
        {
          key: "employmenttype",
          label: this.$t("employmenttype"),
        },
        {
          key: "employmentrate",
          label: this.$t("employmentrate"),
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
        },

        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
        },

        {
          key: "workschedulename",
          label: this.$t("workschedulename"),
        },
      ],
      hremploymentratelist: [
        {
          id:1,
          hremploymentrate : 0.25
        },
        {
          id:2,
          hremploymentrate : 0.5
        },
        {
          id:3,
          hremploymentrate : 0.75
        },
        {
          id:4,
          hremploymentrate : 1
        },
        {
          id:5,
          hremploymentrate : 1.5
        },
      ],
      today: "",
      hremploymentrate: 0,
      ratecount: 0,
      isfixedratecount: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        employmenttypeid: 0,
        employmenttype: "",
        employmentrate: 1,
        employeeenrolmentid: 0,
        startdate: "",
        enddate: "",
        detailinfo: "",
        ordernumber: 1,
        hrempappointordertypeid: 1,
        fromdepartmentid: 0,
        fromdepartmentname: "",
        frompositionid: 0,
        frompositionidname: "",
        fromemployeeenrolmentid: 0,
        fromemploymentrate: 0,
        workscheduleid: 0,
        workschedulename: "",
        Status: 1,
      },
      employeefilter: {
        fullname: "",
        dateofbirth: "",
        inn: "",
      },
      personvalue: {},
    };
  },
  created() {
    var self = this;
    var lang = localStorage.getItem("locale");
    self.selectedrowid = self.$route.params.id;

    WorkScheduleService.GetAll().then((res) => {
      self.workschedulelist = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      self.departmentlist = res.data;
    });
    HelperService.HrEmpAppointOrderType(lang).then((res) => {
      self.hrempappointordertypelist = res.data;
    });
    HelperService.GetEmploymentType(lang).then((res) => {
      self.employmenttypelist = res.data;
    });

    HrAcceptanceWorkService.Get(self.$route.params.id).then((res) => {
      self.HrAcceptanceWork = res.data;
    });
    SchoolSubjectService.GetAll().then((res) => {
      this.subjectlist = res.data;
    });
    self.createDate();
  },

  methods: {
    DisabledDocDate(date) {
      return date < new Date("12.01.2020");
    },
    DisabledStartDate(date) {
      var arr = this.tabrow.startdate.split(".");
      // return date < new Date(arr[2], arr[1] - 1, arr[0]);
       return date < new Date("12.01.2020");
    },
    OpenEmployeeModal() {
      this.$bvModal.show("EmployeeModal");
    },
    CloseEmployeeModal() {
      this.$bvModal.hide("EmployeeModal");
    },
    OpenPersonModal() {
      this.$bvModal.show("PersonModal");
    },
    ClosePersonModal() {
      this.$bvModal.hide("PersonModal");
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    AddPersonData(data) {
      console.log(data);
      var self = this;
      if (data.personname) {
        self.tabrow.personid = data.personid;
        self.tabrow.personname = data.personname;
        self.tabrow.frompositionidname = data.positionname;
        self.tabrow.frompositionid = data.positionid;
        self.tabrow.fromemploymentrate = data.employmentrate;
        self.tabrow.fromemployeeenrolmentid = data.employeeenrolmentid;
        self.tabrow.fromdepartmentid = data.departmentid;
        self.tabrow.fromdepartmentname = data.department;
        if (self.tabrow.hrempappointordertypeid === 4) {
          self.tabrow.workscheduleid = data.workscheduleid;
        }
      } else {
        self.tabrow.personid = data.id;
        self.tabrow.personname = data.fullname;
      }
      self.getfromposition();
      self.ClosePersonModal();
      self.CloseEmployeeModal();
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.today = dd + "." + mm + "." + yyyy;
    },
    employeeCreated(data) {
      data;
      this.showModal("createModal", false);
      this.tabrow.personid = data.id;
      this.tabrow.personname = data.fullname + "(" + data.dateofbirth + ")";
      this.loademployeelist(this.tabrow.personid);
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    getposition() {
      var self = this;
      if (self.tabrow.departmentid > 0) {
        HROrgStructureService.GetAll(
          self.tabrow.departmentid,
          self.tabrow.startdate
        ).then((res) => {
          self.positionlist = res.data;
        });
      }
    },
    getfromposition() {
      var self = this;

      if (self.tabrow.fromdepartmentid > 0) {
        HROrgStructureService.GetAll(
          self.tabrow.fromdepartmentid,
          self.tabrow.startdate
        ).then((res) => {
          self.frompositionlist = res.data;
        });
      }
    },
    getemployee() {
      var self = this;

      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.tabrow.startdate,
        self.tabrow.fromdepartmentid,
        self.tabrow.hrempappointordertypeid
      ).then((res) => {
        self.employeelist = res.data;
        self.employeechange();
      });
    },
    calculatehremploymentrate() {
      var self = this;
      var tableemploymentrate = 0;
      self.HrAcceptanceWork.Tables.forEach(function (item) {
        if (
          item.departmentid === self.tabrow.departmentid &&
          item.positionid === self.tabrow.positionid
        ) {
          item.enddate;
          if (item.enddate === "" || item.enddate > self.tabrow.startdate)
            tableemploymentrate = tableemploymentrate + item.employmentrate;
        }
        if (
          item.fromdepartmentid === self.tabrow.departmentid &&
          item.frompositionid === self.tabrow.positionid
        ) {
          if (item.startdate <= self.tabrow.startdate)
            tableemploymentrate = tableemploymentrate - item.fromemploymentrate;
        }
      });
      if (self.tabrow.departmentid > 0 && self.tabrow.positionid > 0) {
        EmployeeManageService.GetHRAcceptedRateCount(
          self.tabrow.startdate,
          self.tabrow.departmentid,
          self.tabrow.positionid
        ).then((res) => {
          self.hremploymentrate = res.data + tableemploymentrate;
        });
      }
    },
    departmentchange() {
      var self = this;
      self.getposition();
      self.calculatehremploymentrate();
    },
    positionchange() {
      var self = this;

      self.calculatehremploymentrate();
      self.ratecount =
        self.positionlist.length > 0
          ? self.positionlist.filter(function (item) {
              if (item.positionid === self.tabrow.positionid) return item;
            })[0]?.ratecount
          : 0;
          if(self.tabrow.hrempappointordertypeid != 3){
            self.tabrow.positionidname = self.positionlist.filter(function (item) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0]?.positionidname;
          }
      self.isfixedratecount =
        self.positionlist.length > 0
          ? self.positionlist.filter(function (item) {
              if (item.positionid === self.tabrow.positionid) return item;
            })[0]?.isfixedratecount
          : 0;
    },
    fromdepartmentchange() {
      var self = this;

      self.getfromposition();
      self.getemployee();
    },
    startdatechange() {
      var self = this;

      self.getposition();
      self.getfromposition();
      self.calculatehremploymentrate();
      self.getemployee();
    },
    employeechange() {
      var self = this;
      if (self.tabrow.fromemployeeenrolmentid > 0) {
        self.tabrow.fromemployeeenrolmentid = "";
      }
      self.employeelist;
      self.tabrow.fromemployeeenrolmentid = self.employeelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employeeenrolmentid;
      self.tabrow.fromemploymentrate = self.employeelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employmentrate;

      if (self.tabrow.hrempappointordertypeid !== 1) {
        self.tabrow.frompositionid;
        self.tabrow.frompositionidname;
        self.tabrow.frompositionid = self.employeelist.filter(function (item) {
          if (item.id === self.tabrow.personid) return item;
        })[0].positionid;

        self.tabrow.frompositionid;
        self.tabrow.frompositionidname = self.frompositionlist.filter(function (
          item
        ) {
          if (item.positionid === self.tabrow.frompositionid) return item;
        })[0].positionidname;
        self.tabrow.frompositionid;
        self.tabrow.frompositionidname;
      }
      if (self.tabrow.hrempappointordertypeid === 4) {
        self.tabrow.workscheduleid = self.employeelist.filter(function (item) {
          if (item.id === self.tabrow.personid) return item;
        })[0].workscheduleid;
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
    AddData() {
      var self = this;

      if (
        self.tabrow.ordernumber === "" ||
        self.tabrow.ordernumber === undefined ||
        self.tabrow.ordernumber === null ||
        self.tabrow.ordernumber === 0
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.hrempappointordertypeid === "" ||
        self.tabrow.hrempappointordertypeid === undefined ||
        self.tabrow.hrempappointordertypeid === null ||
        self.tabrow.hrempappointordertypeid === 0
      ) {
        this.makeToast(
          this.$t("hrempappointordertypeCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.detailinfo === "" ||
        self.tabrow.detailinfo === undefined ||
        self.tabrow.detailinfo === null ||
        self.tabrow.detailinfo === 0
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow.hrempappointordertypeid === 1) {
        if (
          self.tabrow.departmentid === "" ||
          self.tabrow.departmentid === undefined ||
          self.tabrow.departmentid === null ||
          self.tabrow.departmentid === 0
        ) {
          this.makeToast(
            this.$t("departmentNotSelect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.positionid === "" ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === null ||
          self.tabrow.positionid === 0
        ) {
          this.makeToast(
            this.$t("positionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.personid === "" ||
          self.tabrow.personid === undefined ||
          self.tabrow.personid === null ||
          self.tabrow.personid === 0
        ) {
          this.makeToast(
            this.$t("employeeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.employmenttypeid === "" ||
          self.tabrow.employmenttypeid === undefined ||
          self.tabrow.employmenttypeid === null ||
          self.tabrow.employmenttypeid === 0
        ) {
          this.makeToast(
            this.$t("employmenttypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.isfixedratecount) {
          if (
            self.tabrow.employmentrate === "" ||
            self.tabrow.employmentrate === undefined ||
            self.tabrow.employmentrate === null ||
            self.tabrow.employmentrate === 0
          ) {
            this.makeToast(
              this.$t("employmentrateNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }

        if (
          self.tabrow.workscheduleid === "" ||
          self.tabrow.workscheduleid === undefined ||
          self.tabrow.workscheduleid === null ||
          self.tabrow.workscheduleid === 0
        ) {
          this.makeToast(
            this.$t("workscheduleNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.startdate === "" ||
          self.tabrow.startdate === undefined ||
          self.tabrow.startdate === null ||
          self.tabrow.startdate === 0
        ) {
          this.makeToast(
            this.$t("startdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.tabrow.employmenttypeid === 4) {
          this.makeToast(
            this.$t("EmploymentTypeWasSelectedIncorrectly"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.departmentname = self.departmentlist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.departmentid) return item;
        })[0].name;
        self.tabrow.employmenttype = self.employmenttypelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.employmenttypeid) return item;
        })[0].name;
        self.tabrow.workschedulename = self.workschedulelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.workscheduleid) return item;
        })[0].name;
      }

      if (self.tabrow.hrempappointordertypeid === 2) {
        if (
          self.tabrow.fromdepartmentid === "" ||
          self.tabrow.fromdepartmentid === undefined ||
          self.tabrow.fromdepartmentid === null ||
          self.tabrow.fromdepartmentid === 0
        ) {
          this.makeToast(
            this.$t("fromdepartmentNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.frompositionid === "" ||
          self.tabrow.frompositionid === undefined ||
          self.tabrow.frompositionid === null ||
          self.tabrow.frompositionid === 0
        ) {
          this.makeToast(
            this.$t("frompositionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.departmentid === "" ||
          self.tabrow.departmentid === undefined ||
          self.tabrow.departmentid === null ||
          self.tabrow.departmentid === 0
        ) {
          this.makeToast(
            this.$t("departmentNotSelect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.positionid === "" ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === null ||
          self.tabrow.positionid === 0
        ) {
          this.makeToast(
            this.$t("positionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.personid === "" ||
          self.tabrow.personid === undefined ||
          self.tabrow.personid === null ||
          self.tabrow.personid === 0
        ) {
          this.makeToast(
            this.$t("employeeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.employmenttypeid === "" ||
          self.tabrow.employmenttypeid === undefined ||
          self.tabrow.employmenttypeid === null ||
          self.tabrow.employmenttypeid === 0
        ) {
          this.makeToast(
            this.$t("employmenttypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.isfixedratecount) {
          if (
            self.tabrow.employmentrate === "" ||
            self.tabrow.employmentrate === undefined ||
            self.tabrow.employmentrate === null ||
            self.tabrow.employmentrate === 0
          ) {
            this.makeToast(
              this.$t("employmentrateNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
        if (
          self.tabrow.workscheduleid === "" ||
          self.tabrow.workscheduleid === undefined ||
          self.tabrow.workscheduleid === null ||
          self.tabrow.workscheduleid === 0
        ) {
          this.makeToast(
            this.$t("workscheduleNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.startdate === "" ||
          self.tabrow.startdate === undefined ||
          self.tabrow.startdate === null ||
          self.tabrow.startdate === 0
        ) {
          this.makeToast(
            this.$t("startdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.tabrow.employmenttypeid === 4) {
          this.makeToast(
            this.$t("EmploymentTypeWasSelectedIncorrectly"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.fromdepartmentname = self.departmentlist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.fromdepartmentid) return item;
        })[0].name;
        self.tabrow.frompositionidname = self.frompositionlist.filter(function (
          item
        ) {
          if (item.positionid === self.tabrow.frompositionid) return item;
        })[0]?.positionidname;
        self.tabrow.departmentname = self.departmentlist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.departmentid) return item;
        })[0].name;
        self.tabrow.positionidname = self.positionlist.filter(function (item) {
          if (item.positionid === self.tabrow.positionid) return item;
        }).length > 0 ? self.positionlist.filter(function (item) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0]?.positionidname : "";
        self.tabrow.employmenttype = self.employmenttypelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.employmenttypeid) return item;
        })[0].name;
        self.tabrow.workschedulename = self.workschedulelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.workscheduleid) return item;
        })[0].name;
      }

      if (self.tabrow.hrempappointordertypeid === 3) {
        if (
          self.tabrow.fromdepartmentid === "" ||
          self.tabrow.fromdepartmentid === undefined ||
          self.tabrow.fromdepartmentid === null ||
          self.tabrow.fromdepartmentid === 0
        ) {
          this.makeToast(
            this.$t("fromdepartmentNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.frompositionid === "" ||
          self.tabrow.frompositionid === undefined ||
          self.tabrow.frompositionid === null ||
          self.tabrow.frompositionid === 0
        ) {
          this.makeToast(
            this.$t("frompositionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.personid === "" ||
          self.tabrow.personid === undefined ||
          self.tabrow.personid === null ||
          self.tabrow.personid === 0
        ) {
          this.makeToast(
            this.$t("employeeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.startdate === "" ||
          self.tabrow.startdate === undefined ||
          self.tabrow.startdate === null ||
          self.tabrow.startdate === 0
        ) {
          this.makeToast(
            this.$t("startdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.frompositionlist.length == 0
          
        ) {
          this.makeToast(
            this.$t("HROrgSutructureNotCancelled"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        //console.log(self.departmentlist, self.tabrow.fromdepartmentid)
        // self.tabrow.fromdepartmentname = self.departmentlist.filter(function (
        //   item
        // ) {
        //   if (item.id === self.tabrow.fromdepartmentid) return item;
        // })[0].id;
        // self.tabrow.fromdepartmentname = self.departmentlist.filter(item => item.id == self.tabrow.fromdepartmentid)[0].name;
        self.tabrow.frompositionidname = self.frompositionlist.filter(function (
          item
        ) {
          if (item.positionid === self.tabrow.frompositionid) return item;
        })[0]?.positionidname;
      }
      if (self.tabrow.hrempappointordertypeid === 4) {
        if (
          self.tabrow.fromdepartmentid === "" ||
          self.tabrow.fromdepartmentid === undefined ||
          self.tabrow.fromdepartmentid === null ||
          self.tabrow.fromdepartmentid === 0
        ) {
          this.makeToast(
            this.$t("fromdepartmentNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.frompositionid === "" ||
          self.tabrow.frompositionid === undefined ||
          self.tabrow.frompositionid === null ||
          self.tabrow.frompositionid === 0
        ) {
          this.makeToast(
            this.$t("frompositionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.departmentid === "" ||
          self.tabrow.departmentid === undefined ||
          self.tabrow.departmentid === null ||
          self.tabrow.departmentid === 0
        ) {
          this.makeToast(
            this.$t("departmentNotSelect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.positionid === "" ||
          self.tabrow.positionid === undefined ||
          self.tabrow.positionid === null ||
          self.tabrow.positionid === 0
        ) {
          this.makeToast(
            this.$t("positionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.personid === "" ||
          self.tabrow.personid === undefined ||
          self.tabrow.personid === null ||
          self.tabrow.personid === 0
        ) {
          this.makeToast(
            this.$t("employeeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.employmenttypeid === "" ||
          self.tabrow.employmenttypeid === undefined ||
          self.tabrow.employmenttypeid === null ||
          self.tabrow.employmenttypeid === 0
        ) {
          this.makeToast(
            this.$t("employmenttypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }

        if (
          self.tabrow.workscheduleid === "" ||
          self.tabrow.workscheduleid === undefined ||
          self.tabrow.workscheduleid === null ||
          self.tabrow.workscheduleid === 0
        ) {
          this.makeToast(
            this.$t("workscheduleNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.startdate === "" ||
          self.tabrow.startdate === undefined ||
          self.tabrow.startdate === null ||
          self.tabrow.startdate === 0
        ) {
          this.makeToast(
            this.$t("startdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.tabrow.enddate === "" ||
          self.tabrow.enddate === undefined ||
          self.tabrow.enddate === null ||
          self.tabrow.enddate === 0
        ) {
          this.makeToast(
            this.$t("enddateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (self.tabrow.employmenttypeid !== 4) {
          this.makeToast(
            this.$t("EmploymentTypeNotWasSelectedIncorrectly"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        self.tabrow.fromdepartmentname = self.departmentlist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.fromdepartmentid) return item;
        })[0].name;
        self.tabrow.frompositionidname = self.frompositionlist.filter(function (
          item
        ) {
          if (item.positionid === self.tabrow.frompositionid) return item;
        })[0]?.positionidname;
        self.tabrow.departmentname = self.departmentlist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.departmentid) return item;
        })[0].name;
        if(self.tabrow.hrempappointordertypeid != 3){
            self.tabrow.positionidname = self.positionlist.filter(function (item) {
          if (item.positionid === self.tabrow.positionid) return item;
        })[0]?.positionidname;
          }
        self.tabrow.employmenttype = self.employmenttypelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.employmenttypeid) return item;
        })[0].name;
        self.tabrow.workschedulename = self.workschedulelist.filter(function (
          item
        ) {
          if (item.id === self.tabrow.workscheduleid) return item;
        })[0].name;
      }

      self.tabrow.hrempappointordertypename =
        self.hrempappointordertypelist.filter(function (item) {
          if (item.id === self.tabrow.hrempappointordertypeid) return item;
        })[0].name;
      if (
        self.tabrow.hrempappointordertypeid !== 4 &&
        self.tabrow.hrempappointordertypeid !== 3 &&
        self.isfixedratecount === true
      ) {
        if (
          self.hremploymentrate + self.tabrow.employmentrate >
          self.ratecount
        ) {
          this.makeToast(
            self.tabrow.departmentname +
              "да " +
              self.tabrow.positionidname +
              " лавозимда бўш ўрни етарли эмас",
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.tabrow.id === 0) {
        var addrow = true;
        self.HrAcceptanceWork.Tables.forEach(function (item) {
          if (
            item.personid === self.tabrow.personid &&
            item.positionid === self.tabrow.positionid &&
            item.id === 0
          ) {
            item.personid = self.tabrow.personid;
            item.personname = self.tabrow.personname;
            item.departmentid = self.tabrow.departmentid;
            item.departmentname = self.tabrow.departmentname;
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
            item.employmenttypeid = self.tabrow.employmenttypeid;
            item.employmenttype = self.tabrow.employmenttype;
            item.employmentrate = self.tabrow.employmentrate;
            item.startdate = self.tabrow.startdate;
            item.enddate = self.tabrow.enddate;
            item.detailinfo = self.tabrow.detailinfo;
            item.employeeenrolmentid = self.tabrow.employeeenrolmentid;
            item.ordernumber = self.tabrow.ordernumber;
            item.hrempappointordertypeid = self.tabrow.hrempappointordertypeid;
            item.hrempappointordertypename =
              self.tabrow.hrempappointordertypename;
            item.schoolsubjectid = self.tabrow.schoolsubjectid;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.fromdepartmentid = self.tabrow.fromdepartmentid;
            item.fromdepartmentname = self.tabrow.fromdepartmentname;
            item.frompositionid = self.tabrow.frompositionid;
            item.frompositionidname = self.tabrow.frompositionidname;
            item.fromemployeeenrolmentid = self.tabrow.fromemployeeenrolmentid;
            item.fromemploymentrate = self.tabrow.fromemploymentrate;
            item.workscheduleid = self.tabrow.workscheduleid;
            item.workschedulename = self.tabrow.workschedulename;
            item.Status = 1;
            console.log(self.HrAcceptanceWork.Tables)
            addrow = false;
          }
        });
        if (addrow) {
          var isDublicate = false;
          if (self.tabrow.hrempappointordertypeid === 1) {
            self.HrAcceptanceWork.Tables.forEach(function (item) {
              if (
                item.positionid === self.tabrow.positionid &&
                item.personid === self.tabrow.personid
              ) {
                self.makeToast(
                  self.$t("duplicatePosition"),
                  self.$t("error"),
                  "danger"
                );
                isDublicate = true;
              }
            });
          }
          if (!isDublicate) {
            self.HrAcceptanceWork.Tables.push(self.tabrow);
          }
          self.tabrow = {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            departmentid: 0,
            departmentname: "",
            positionid: 0,
            positionidname: "",
            employmenttypeid: 0,
            employmenttype: "",
            employmentrate: 1,
            startdate: self.today,
            enddate: "",
            detailinfo: "",
            employeeenrolmentid: 0,
            ordernumber: 1,
            hrempappointordertypeid: 1,
            fromdepartmentid: 0,
            fromdepartmentname: "",
            frompositionid: 0,
            frompositionidname: "",
            fromemployeeenrolmentid: 0,
            fromemploymentrate: 0,
            workscheduleid: 0,
            workschedulename: "",
            schoolsubjectid: 0,
            schoolsubjectname: "",
            Status: 1,
          };
        }
      } else {
        self.HrAcceptanceWork.Tables.forEach(function (item) {
          if (item.id === self.tabrow.id) {
            item.departmentid = self.tabrow.departmentid;
            item.departmentname = self.tabrow.departmentname;
            item.schoolsubjectid = self.tabrow.schoolsubjectid;
            item.schoolsubjectname = self.tabrow.schoolsubjectname;
            item.positionid = self.tabrow.positionid;
            item.positionidname = self.tabrow.positionidname;
            item.employmenttypeid = self.tabrow.employmenttypeid;
            item.employmenttype = self.tabrow.employmenttype;
            item.employmentrate = self.tabrow.employmentrate;
            item.startdate = self.tabrow.startdate;
            item.enddate = self.tabrow.enddate;
            item.detailinfo = self.tabrow.detailinfo;
            item.employeeenrolmentid = self.tabrow.employeeenrolmentid;
            item.ordernumber = self.tabrow.ordernumber;
            item.hrempappointordertypeid = self.tabrow.hrempappointordertypeid;
            item.hrempappointordertypename =
              self.tabrow.hrempappointordertypename;
            item.fromdepartmentid = self.tabrow.fromdepartmentid;
            item.fromdepartmentname = self.tabrow.fromdepartmentname;
            item.frompositionid = self.tabrow.frompositionid;
            item.frompositionidname = self.tabrow.frompositionidname;
            item.fromemployeeenrolmentid = self.tabrow.fromemployeeenrolmentid;
            item.fromemploymentrate = self.tabrow.fromemploymentrate;
            item.workscheduleid = self.tabrow.workscheduleid;
            item.workschedulename = self.tabrow.workschedulename;
            item.Status = 2;
          }
        });
        self.tabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          schoolsubjectid: 0,
          schoolsubjectname: "",
          departmentid: 0,
          departmentname: "",
          positionid: 0,
          positionidname: "",
          employmenttypeid: 0,
          employmenttype: "",
          employmentrate: 1,
          startdate: self.today,
          enddate: "",
          detailinfo: "",
          employeeenrolmentid: 0,
          ordernumber: 0,
          hrempappointordertypeid: 1,
          fromdepartmentid: 0,
          fromdepartmentname: "",
          frompositionid: 0,
          frompositionidname: "",
          fromemployeeenrolmentid: 0,
          fromemploymentrate: 0,
          workscheduleid: 0,
          workschedulename: "",
          Status: 1,
        };
      }

      this.$bvModal.hide("AddModal");
    },
    AddRow() {
      var self = this;
      self.today;
      var number = 0;
      self.HrAcceptanceWork.Tables.forEach(function (item) {
        if (item.Status !== 3) {
          number++;
        }
      });
      self.tabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        employmenttypeid: 0,
        employmenttype: "",
        employmentrate: 1,
        startdate: self.today,
        enddate: "",
        detailinfo: "",
        employeeenrolmentid: 0,
        ordernumber: number + 1,
        hrempappointordertypeid: 1,
        fromdepartmentid: 0,
        fromdepartmentname: "",
        frompositionid: 0,
        frompositionidname: "",
        fromemployeeenrolmentid: 0,
        fromemploymentrate: 0,
        workscheduleid: 0,
        workschedulename: "",
        schoolsubjectid: 0,
        schoolsubjectname: "",
        Status: 1,
      };
      self.hremploymentrate = 0;
      self.employeelist = [];
      self.getposition();
      self.positionlist = [];
      self.frompositionlist = [];
      self.getfromposition();
      self.$bvModal.show("AddModal");
    },
    EditItem(item) {
      var self = this;
      self.tabrow = {
        id: item.id,
        ownerid: item.ownerid,
        personid: item.personid,
        personname: item.personname,
        departmentid: item.departmentid,
        departmentname: item.departmentname,
        positionid: item.positionid,
        positionidname: item.positionidname,
        employmenttypeid: item.employmenttypeid,
        employmenttype: item.employmenttype,
        employmentrate: item.employmentrate,
        startdate: item.startdate,
        enddate: item.enddate,
        detailinfo: item.detailinfo,
        employeeenrolmentid: item.employeeenrolmentid,
        ordernumber: item.ordernumber,
        schoolsubjectid: item.schoolsubjectid,
        schoolsubjectname: item.schoolsubjectname,
        hrempappointordertypeid: item.hrempappointordertypeid,
        hrempappointordertypename: item.hrempappointordertypename,
        fromdepartmentid: item.fromdepartmentid,
        fromdepartmentname: item.fromdepartmentname,
        frompositionid: item.frompositionid,
        frompositionidname: item.frompositionidname,
        fromemployeeenrolmentid: item.fromemployeeenrolmentid,
        fromemploymentrate: item.fromemploymentrate,
        workscheduleid: item.workscheduleid,
        workschedulename: item.workschedulename,
        Status: 2,
      };
     // alert(1)
     self.getfromposition();
      self.getposition();
    //  alert(2)
    //  alert(3)
      self.positionchange();
   //   alert(4)
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      var self = this;
      item.Status = 3;
      var number = 1;
      self.HrAcceptanceWork.Tables.forEach(function (item) {
        if (item.Status !== 3) {
          item.ordernumber = number;
          number++;
        }
      });
    },
    hrempappointordertypechange() {
      var self = this;
      if (self.tabrow.hrempappointordertypeid === 4) {
        self.tabrow.employmenttypeid = 4;
        self.tabrow.employmentrate = 0.5;
      }
      self.tabrow.personname = "";
      self.tabrow.fromdepartmentid = 0;
      self.tabrow.fromdepartmentname = "";
      self.tabrow.frompositionid = 0;
      self.tabrow.frompositionidname = "";
      self.tabrow.fromemploymentrate = 0;
    },
    employmentratechange() {
      var self = this;
      if (self.tabrow.hrempappointordertypeid === 4) {
        if (
          self.tabrow.employmentrate > 0.5 ||
          self.tabrow.employmentrate <= 0
        ) {
          this.makeToast(
            this.$t("employmentrate xato"),
            this.$t("Error"),
            "danger"
          );
          self.tabrow.employmentrate = 0.5;
        }
      }
    },
    loademployeelist(personid) {
      var self = this;
      self.tabrow.personid = 0;
      EmployeeManageService.GetAllFree(
        self.employeefilter.fullname,
        self.employeefilter.dateofbirth,
        self.employeefilter.inn,
        personid
      ).then((res) => {
        self.employeelist = res.data;
      });
    },
    check() {
      var self = this;
      if (
        self.HrAcceptanceWork.docnumber === 0 ||
        self.HrAcceptanceWork.docnumber === null ||
        self.HrAcceptanceWork.docnumber === undefined ||
        self.HrAcceptanceWork.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrAcceptanceWork.docdate === 0 ||
        self.HrAcceptanceWork.docdate === null ||
        self.HrAcceptanceWork.docdate === undefined ||
        self.HrAcceptanceWork.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HrAcceptanceWork.detailinfo === null ||
        self.HrAcceptanceWork.detailinfo === undefined ||
        self.HrAcceptanceWork.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      // var self = this;
      if (!this.check()) {
        return false;
      }
      HrAcceptanceWorkService.Update(this.HrAcceptanceWork)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({
            name: "HrAcceptanceWork",
            query: {
              StartDate: this.$route.query.StartDate,
              EndDate: this.$route.query.EndDate,
              Search: this.$route.query.Search,
              pagelimit: this.$route.query.pagelimit,
            },
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

  <style>
@media (min-width: 1200px) {
  .modal-xl {
    max-width: 90% !important;
  }
}

@media (min-width: 992px) {
  .modal-lg {
    max-width: auto !important;
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 90% !important;
  }
}
</style>
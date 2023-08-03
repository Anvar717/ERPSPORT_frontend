<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Organization") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="INN"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('INN')"
                    autocomplete="INN"
                    horizontal
                    :label="$t('INN')"
                    v-model="Organization.INN"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        @click="Search"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="search"></b-icon>
                        {{ $t("search") }}
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="Organization.ShortName"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    class="ellipsis-input"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          Organization.TranslatableColumns.includes('ShortName')
                        "
                        @click="translate('shortname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="Organization.FullName"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    class="ellipsis-input"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          Organization.TranslatableColumns.includes('FullName')
                        "
                        @click="translate('fullname')"
                        style="height: 35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="Oblast" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("Oblast")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="oblastlist"
                      v-model="Organization.OblastID"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="Region" rules="required">
                  <div class="form-group form-row">
                    <label
                      v-if="!RegionLoading"
                      class="col-form-label col-sm-3"
                      for
                      >{{ $t("region") }}</label
                    >
                    <label
                      v-if="RegionLoading"
                      class="col-form-label col-sm-5 text-right"
                    >
                      <b-spinner small></b-spinner>
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="regionlist"
                      v-model="Organization.RegionID"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="Oblast" rules="required">
                  <div class="form-group form-row">
                    <label
                      v-if="!MfyLoading"
                      class="col-form-label col-sm-3"
                      for
                      >{{ $t("Mfy") }}</label
                    >
                    <label
                      v-if="MfyLoading"
                      class="col-form-label col-sm-3 text-right"
                    >
                      <b-spinner small></b-spinner>
                    </label>
                    <v-select
                      class="col-sm-9"
                      :options="mfylist"
                      v-model="Organization.mfyid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="Adress"
                  rules="required|max:250"
                >
                  <CInput
                    :placeholder="$t('Adress')"
                    autocomplete="Adress"
                    horizontal
                    :label="$t('Adress')"
                    v-model="Organization.Adress"
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
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="ZipCode"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('ZipCode')"
                    autocomplete="ZipCode"
                    horizontal
                    :label="$t('ZipCode')"
                    v-model="Organization.ZipCode"
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
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="ContactInfo"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('ContactInfo')"
                    autocomplete="ContactInfo"
                    horizontal
                    :label="$t('ContactInfo')"
                    v-model="Organization.ContactInfo"
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
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="Director"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('Director')"
                    autocomplete="Director"
                    horizontal
                    :label="$t('Director')"
                    v-model="Organization.Director"
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
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="Accounter"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('Accounter')"
                    autocomplete="Accounter"
                    horizontal
                    :label="$t('Accounter')"
                    v-model="Organization.Accounter"
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
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="Cashier"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('Cashier')"
                    autocomplete="Cashier"
                    horizontal
                    :label="$t('Cashier')"
                    v-model="Organization.Cashier"
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
            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="organizationtype"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("organizationtype")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationtypelist"
                      v-model="Organization.organizationtypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="schoollegalform"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("schoollegalform")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoollegalformlist"
                      v-model="Organization.schoollegalformid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="schoollegalform"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("SchoolManagementForm")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="SchoolManagementFormList"
                      v-model="Organization.schoolmanagementformid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="schooltype"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("schooltype")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schooltypelist"
                      v-model="Organization.schooltypeid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="website"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('website')"
                    autocomplete="website"
                    horizontal
                    :label="$t('website')"
                    v-model="Organization.website"
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
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="foundationdocument"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('foundationdocument')"
                    autocomplete="foundationdocument"
                    horizontal
                    :label="$t('foundationdocument')"
                    v-model="Organization.foundationdocument"
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

            <CRow>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="foundationdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("foundationdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="Organization.foundationdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('foundationdate')"
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
              <CCol lg="4" sm="12">
                <ValidationProvider v-slot="v" name="oked" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("oked")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="okedlist"
                      v-model="Organization.okedid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="fullname"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol lg="4" sm="12">
                <ValidationProvider
                  v-slot="v"
                  name="ParentOrganization"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{
                      $t("ParentOrganization")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="organizationlist"
                      v-model="Organization.parentid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="text-right">
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{
                    $t("isreconstructed")
                  }}</label>
                  <b-form-checkbox
                    v-model="Organization.isreconstructed"
                    switch
                    class="mt-1 ml-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
              <CCol sm="3" class="text-right">
                <div class="form-group form-row">
                  <label class="col-form-label" for>{{
                    $t("haspaidservice")
                  }}</label>
                  <b-form-checkbox
                    v-model="Organization.haspaidservice"
                    switch
                    class="mt-1 ml-1"
                  ></b-form-checkbox>
                </div>
              </CCol>
              <CCol sm="12" lg="4">
                <ValidationProvider
                  v-slot="v"
                  name="studentcapacity"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('studentcapacity')"
                    autocomplete="studentсapacity"
                    horizontal
                    type="number"
                    :label="$t('studentcapacity')"
                    v-model="Organization.studentсapacity"
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
              <CCol sm="12" lg="4">
                <ValidationProvider
                  v-slot="v"
                  name="coefficient"
                  rules="required|max:40"
                >
                  <CInput
                    :placeholder="$t('coefficient')"
                    autocomplete="coefficient"
                    horizontal
                    disabled
                    :label="$t('coefficient')"
                    v-model="OrgCoefficient.orgcoefficient"
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
            <CRow>
              <CCol  sm="12" lg="4">
                <ValidationProvider
                  v-slot="v"
                  name="schoolgroupcontingent"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-10" for>{{
                      $t("schoolgroupcontingent")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="schoolgroupcontingentlist"
                      v-model="Organization.schoolgroupcontingentid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" style="margin-top:20px">
                <ValidationProvider
                  v-slot="v"
                  name="schoolgroupcontingent"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-3"  for>{{
                      $t("state")
                    }}</label>
                    <v-select
                      class="col-sm-9"
                      :options="statelist"
                      v-model="Organization.StateID"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>

        <CRow>
          <CCol>
            <b-tabs card pills class="">
              <b-tab :title="$t('SettlementAccount')" active>
                <!-- <div class="tabPanel"> -->
                  <CRow class="mobileStyle mx-0">
                    <b-table
                      :fields="OrganizationTables"
                      :items="Organization.Accounts"
                      class="bg-color-table text-center tdpadding mt-3"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width: 30%">
                            <CInput
                              autocomplete="text"
                              v-model="tabrow.code"
                              class="mb-0 organiation-input"
                            ></CInput>
                          </b-th>
                          <b-th style="width: 30%">
                            <CInput
                              autocomplete="text"
                              class="mb-0 organiation-input"
                              v-model="tabrow.accountname"
                            ></CInput>
                          </b-th>
                          <b-th style="width: 30%">
                            <v-select
                              :options="banklist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow.bankid"
                              class="status-select"
                            ></v-select>
                          </b-th>
                          <b-th>
                            <b-form-checkbox
                              switch
                              v-model="tabrow.isdefault"
                            ></b-form-checkbox>
                          </b-th>
                          <b-th>
                            <v-select
                              :options="statelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow.stateid"
                              class="status-select"
                            ></v-select>
                          </b-th>
                          <b-th>
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              @click="AddRow"
                              class="add-btn"
                            >
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                        </b-tr>
                      </template>
  
                      <template v-slot:cell(code)="{ item }">
                        <p v-if="item.Status == 0">{{ item.code }}</p>
                        <CInput
                          v-if="item.Status == 2 || item.Status == 1"
                          autocomplete="text"
                          horizontal
                          v-model="item.code"
                        ></CInput>
                      </template>
                      <template v-slot:cell(accountname)="{ item }">
                        <p v-if="item.Status == 0">{{ item.accountname }}</p>
                        <CInput
                          v-if="item.Status == 2 || item.Status == 1"
                          autocomplete="text"
                          horizontal
                          v-model="item.accountname"
                        ></CInput>
                      </template>
                      <template v-slot:cell(isdefault)="{ item }">
                        <b-badge
                          v-if="item.Status == 0"
                          :variant="item.isdefault ? 'success' : 'danger'"
                        >
                          {{ item.isdefault ? $t("yes") : $t("no") }}
                        </b-badge>
                        <b-form-checkbox
                          v-if="item.Status == 1 || item.Status == 2"
                          v-model="item.isdefault"
                          switch
                        ></b-form-checkbox>
                      </template>
                      <template v-slot:cell(bankname)="{ item }">
                        <p v-if="item.Status == 0">{{ item.bankname }}</p>
                        <v-select
                          v-if="item.Status == 2 || item.Status == 1"
                          :options="banklist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="item.bankid"
                          class="mb-2"
                        ></v-select>
                      </template>
                      <template v-slot:cell(statename)="{ item }">
                        <p v-if="item.Status == 0">{{ item.statename }}</p>
                        <v-select
                          v-if="item.Status == 2 || item.Status == 1"
                          :options="statelist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="item.stateid"
                          class="mb-2"
                        ></v-select>
                      </template>
  
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            variant="outline"
                            color="primary"
                            @click="EditItem(item)"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </CButton>
                          <CButton
                            variant="outline"
                            color="danger"
                            @click="DeleteRow(item)"
                          >
                            <b-icon icon="x"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                    </b-table>
                  </CRow>
                <!-- </div> -->
              </b-tab>
              <!-- --fgbbdsfgsdfg -->
              <b-tab :title="$t('SpesSubject')">
                <CRow>
                  <CCol class="mobileStyle mx-0">
                    <b-table
                      :fields="OrganizationSpesSubject"
                      :items="Organization.SpesSubject"
                      class="bg-color-table text-center tdpadding"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width: 14%">
                            <v-select
                              :options="schoolsubjectlist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow1.schoolsubjectid"
                            ></v-select>
                          </b-th>
                          <b-th style="width: 20%">
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              @click="Add"
                            >
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                        </b-tr>
                      </template>

                      <template v-slot:cell(schoolsubjectname)="{ item }">
                        <p>{{ item.schoolsubjectname }}</p>
                      </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="Organization.CanSave"
                          class="mx-auto d-block text-center"
                          size="sm"
                        >
                          <CButton
                            variant="outline"
                            color="danger"
                            @click="DeleteRow(item)"
                          >
                            <b-icon icon="x"></b-icon>
                          </CButton>
                        </CButtonGroup>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <b-tab
                v-if="Organization.organizationtypeid == 4"
                :title="$t('OrgBranch')"
              >
                <b-row class="mb-2">
                  <b-col class="text-right">
                    <b-button
                      @click="OpenOrgBranchModal"
                      variant="primary"
                      size="sm"
                    >
                      <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                    </b-button>
                  </b-col>
                </b-row>
                <CRow>
                  <CCol class="mobileStyle mx-0">
                    <b-table
                      :fields="OrganizationOrgBranch"
                      :items="Organization.OrgBranch"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      small
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditOrgBranch(item)"
                            v-b-tooltip.hover
                            :title="$t('Edit')"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          
                        </div>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>
              </b-tab>
              <b-tab
                :title="$t('SportTypeClassifier')"
              >
                <b-row class="mb-2">
                  <b-col class="text-right">
                    <b-button
                      @click="OpenSportTypeClassifier"
                      variant="primary"
                      size="sm"
                    >
                      <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                    </b-button>
                  </b-col>
                </b-row>
                <CRow>
                  <CCol class="mobileStyle mx-0">
                    <b-table
                      :fields="OrganizationSportTypeClassifier"
                      :items="Organization.SportTypeClassifier"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      small
                      :tbody-tr-class="rowClass"
                    >
                    <template v-slot:cell(actions)="{ item }">
                      <CButtonGroup
                        class="mx-auto d-block text-center"
                        size="sm"
                      >
                        <CButton
                          variant="outline"
                          color="primary"
                          @click="EditSportTypeClassifier(item)"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </CButton>
                        <CButton
                         style="margin-left:10px"
                          variant="outline"
                          color="danger"
                          @click="DeleteRow(item)"
                        >
                          <b-icon icon="x"></b-icon>
                        </CButton>
                      </CButtonGroup>
                    </template>
                      <!-- <template v-slot:cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditSportTypeClassifier(item)"
                            v-b-tooltip.hover
                            :title="$t('Edit')"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                        </div>
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
              <CButton class="ml-4" size="sm" color="danger" @click="Back()">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" :disabled="issavedisabled" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>

        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="translaterow.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{ item }">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton
              @click="SaveTranslate"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
        <b-modal
          :title="$t('OrgBranch')"
          size="lg"
          id="OrgBranchModal"
          no-close-on-backdrop
          hide-footer
        >
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{
                  $t("startdate")
                }}</label>
                <date-picker
                  v-model="tabrow2.startdate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-8 mb-0"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{
                  $t("enddate")
                }}</label>
                <date-picker
                  v-model="tabrow2.enddate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-8 mb-0"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("shortname")
                }}</label>
                <CInput
                  autocomplete="text"
                  class="col-sm-8 mb-0"
                  v-model="tabrow2.shortname"
                ></CInput>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("fullname")
                }}</label>
                <CInput
                  autocomplete="text"
                  class="col-sm-8 mb-0"
                  v-model="tabrow2.fullname"
                ></CInput>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("inn")
                }}</label>
                <CInput
                  autocomplete="text"
                  class="col-sm-8 mb-0"
                  v-model="tabrow2.inn"
                ></CInput>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("studentcapacity")
                }}</label>
                <CInput
                  autocomplete="text"
                  class="col-sm-8 mb-0"
                  type="number"
                  v-model="tabrow2.studentcapacity"
                ></CInput>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("oblast")
                }}</label>
                <v-select
                  class="col-sm-8"
                  :options="oblastlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow2.oblastid"
                  @input="ChangeOblast"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("region")
                }}</label>
                <v-select
                  :options="RegionList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow2.regionid"
                  @input="ChangeRegion"
                  class="col-sm-8"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("mfy")
                }}</label>
                <v-select
                  :options="MfyList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow2.mfyid"
                  class="col-sm-8"
                  @input="ChangeMfy"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("state")
                }}</label>
                <v-select
                  :options="statelist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow2.stateid"
                  @input="ChangeState"
                  class="col-sm-8"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center">
              <b-button
                @click="CloseOrgBranchModal"
                size="sm"
                variant="danger"
                class="mr-2"
              >
                <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
              </b-button>
              <b-button size="sm" variant="success" @click="AddOrgBranch">
                <b-icon icon="check2"></b-icon> {{ $t("save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
        <b-modal
          :title="$t('SportTypeClassifier')"
          size="lg"
          id="SportTypeClassifierModal"
          no-close-on-backdrop
          hide-footer
        >
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{
                  $t("startdate")
                }}</label>
                <date-picker
                  v-model="tabrow3.startdate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-8 mb-0"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">{{
                  $t("enddate")
                }}</label>
                <date-picker
                  v-model="tabrow3.enddate"
                  style="width: 100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-8 mb-0"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("SportTypeClassifier")
                }}</label>
                <v-select
                  class="col-sm-8"
                  :options="sporttypeclassifierlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="sporttypeclassifierchange"
                  v-model="tabrow3.sporttypeclassifierid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("normativeact")
                }}</label>
                <CInput
                  autocomplete="text"
                  class="col-sm-8 mb-0"
                  v-model="tabrow3.normativeact"
                ></CInput>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center">
              <b-button
                @click="CloseSportTypeClassifierModal"
                size="sm"
                variant="danger"
                class="mr-2"
              >
                <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
              </b-button>
              <b-button size="sm" variant="success" @click="AddSportTypeClassifier">
                <b-icon icon="check2"></b-icon> {{ $t("save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import MfyService from "@/services/Mfy.service";
import RegionService from "@/services/Region.service";
import HelperService from "@/services/helper.service";
import BankService from "@/services/Bank.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import OkedService from "@/services/Oked.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import OrganizationService from "@/services/organization.service";
import SchoolSubjectService from "@/services/SchoolSubject.service";
import SchoolGroupContingentService from "@/services/SchoolGroupContingent.service";
import SchoolManagementFormService from "@/services/SchoolManagementForm.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
export default {
  data() {
    return {
      SaveLoading: false,
      issavedisabled: false,
      Organization: { TranslatableColumns: [] },
      /* ////////////////////// */
      translatemodal: false,

      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],

      selectedrowid: 0,
      organizationlist: [],
      RegionLoading: false,
      MfyLoading: false,
      oblastlist: [],
      regionlist: [],
      mfylist: [],
      organizationtypelist: [],
      sporttypeclassifierlist: [],
      schooltypelist: [],
      okedlist: [],
      schoollegalformlist: [],
      banklist: [],
      schoolsubjectlist: [],
      schoolgroupcontingentlist: [],
      OrganizationTables: [
        {
          key: "code",
          label: this.$t("settlementaccountcode"),
        },
        {
          key: "accountname",
          label: this.$t("accountname"),
        },
        {
          key: "bankname",
          label: this.$t("bankname"),
        },
        {
          key: "isdefault",
          label: this.$t("isdefault"),
        },
        {
          key: "statename",
          label: this.$t("statename"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tabrow: {
        id: 0,
        organizationid: 0,
        code: "",
        accountname: "",
        isdefault: false,
        stateid: 1,
        bankid: 0,
        Status: 1,
      },
      OrganizationSpesSubject: [
        {
          key: "schoolsubjectname",
          label: this.$t("schoolsubjectname"),
        },

        { key: "actions", label: this.$t("actions") },
      ],
      OrganizationOrgBranch: [
        { key: "shortname", label: this.$t("shortname") },
        { key: "fullname", label: this.$t("fullname") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "inn", label: this.$t("inn") },
        { key: "studentcapacity", label: this.$t("studentcapacity") },
        { key: "oblastname", label: this.$t("oblastname") },
        { key: "regionname", label: this.$t("regionname") },
        { key: "mfyname", label: this.$t("mfyname") },
        { key: "statename", label: this.$t("statename") },
        { key: "actions", label: this.$t("actions") },
      ],
      OrganizationSportTypeClassifier: [
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "sporttypeclassifiername", label: this.$t("SportTypeClassifier") },
        { key: "normativeact", label: this.$t("normativeact") },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow1: {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        Status: 1,
      },
      tabrow2: {
        id: 0,
        ownerid: 0,
        shortname: "",
        fullname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        stateid: 0,
        statename: "",
        startdate: "",
        enddate: "",
        inn: "",
        studentcapacity: 0,
        Status: 1,
      },
      tabrow3: {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: 0,
        sporttypeclassifiername:"",
        normativeact:"",
        startdate: "",
        enddate: "",
        stateid: 0,
        statename: "",
        Status: 1,
      },
      OrgCoefficient: {},
      SchoolManagementFormList: [],
      toastCount: 0,
      allSignupErrors: {},
      RegionList: [],
      organizationlist: [],
      MfyList: [],
      editedIndex1: -1,
      lang: localStorage.getItem("locale") || "ru",
      // OblastList  : []
    };
  },
  created() {
    var self = this;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });

    //self.selectedrowid = self.$route.params.id;

    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    SchoolGroupContingentService.GetAll().then((res) => {
      self.schoolgroupcontingentlist = res.data;
    });
    BankService.GetAll().then((res) => {
      self.banklist = res.data;
    });
    SchoolLegalFormService.GetAll().then((res) => {
      self.schoollegalformlist = res.data;
    });
    OkedService.GetAll().then((res) => {
      self.okedlist = res.data;
    });
    SchoolTypeService.GetAll().then((res) => {
      self.schooltypelist = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      self.organizationtypelist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      self.sporttypeclassifierlist = res.data;
    });
    SchoolManagementFormService.GetAll().then((res) => {
      self.SchoolManagementFormList = res.data;
    });
    /* HelperService.GetOblastList().then(res => {
      this.oblastlist = res.data;
    }); */
    OrganizationService.GetAll().then((res) => {
      self.organizationlist = res.data;
    });
    OrganizationService.Get(this.$route.params.id, "").then((res) => {
      this.Organization = res.data;
      this.GetOblastList();
      this.getregionlist();
      self.getmfylist(self.Organization.RegionID);
      if (this.editedIndex1 === -1) {
        this.tabrow2.oblastid = res.data.OblastID;
        this.tabrow2.regionid = res.data.RegionID;
      }
    });
    SchoolSubjectService.GetAll().then((res) => {
      self.schoolsubjectlist = res.data;
    });
    OrganizationService.GetOrganizationCoefficient(this.$route.params.id).then(
      (res) => {
        this.OrgCoefficient = res.data;
        this.OrgCoefficient.orgcoefficient =
          this.OrgCoefficient.orgcoefficient.toFixed(1);
      }
    );
  },
  methods: {
    OpenOrgBranchModal() {
      this.$bvModal.show("OrgBranchModal");
      (this.tabrow2 = {
        id: 0,
        ownerid: 0,
        shortname: "",
        fullname: "",
        oblastid: this.Organization.OblastID,
        oblastname: "",
        regionid: this.Organization.RegionID,
        regionname: "",
        mfyid: 0,
        mfyname: "",
        inn: "",
        startdate: "",
        enddate: "",
        studentcapacity: 0,
        stateid: 0,
        statename: "",
        Status: 1,
      }),
        (this.RegionList = this.regionlist);
      this.MfyList = this.mfylist;
      this.editedIndex1 = -1;
    },
    CloseOrgBranchModal() {
      this.$bvModal.hide("OrgBranchModal");
      this.$nextTick(() => {
        (this.tabrow2 = {
          id: 0,
          ownerid: 0,
          shortname: "",
          fullname: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          startdate: "",
          enddate: "",
          studentcapacity: 0,
          mfyid: 0,
          mfyname: "",
          stateid: 0,
          statename: "",
          Status: 1,
        }),
          (this.editedIndex1 = -1);
      });
    },
    OpenSportTypeClassifier() {
      this.$bvModal.show("SportTypeClassifierModal");
      (this.tabrow3 = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporttypeclassifiername: "",
        normativeact: "",
        stateid: 0,
        statename: "",
        Status: 1,
      })
    },
    CloseSportTypeClassifierModal() {
      this.$bvModal.hide("SportTypeClassifierModal");
      this.$nextTick(() => {
        (this.tabrow3 = {
          id: 0,
          ownerid: 0,
          sporttypeclassifierid: 0,
          sporttypeclassifiername:"",
          normativeact:"",
          startdate: "",
          enddate: "",
          stateid: 0,
          statename: "",
          Status: 1,
        }),
          (this.editedIndex1 = -1);
      });
    },
    EditItem(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },
    EditOrgBranch(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.Organization.OrgBranch.indexOf(item);
      this.tabrow2 = Object.assign({}, item);
      this.ChangeOblast();
      this.ChangeRegion();
      this.$bvModal.show("OrgBranchModal");
    },
    ChangeOblast() {
      if (!!this.tabrow2.oblastid) {
        RegionService.GetAll(this.lang, this.tabrow2.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      if (!!this.tabrow2.regionid) {
        MfyService.GetAll(this.tabrow2.regionid).then((res) => {
          this.MfyList = res.data;
        });
      }
    },
    ChangeMfy() {
      if (!!this.tabrow2.mfyid) {
        this.tabrow2.mfyname = this.MfyList.filter(
          (item) => item.id == this.tabrow2.mfyid
        )[0].name;
      }
    },
    ChangeState() {
      if (!!this.tabrow2.stateid) {
        this.tabrow2.statename = this.statelist.filter(
          (item) => item.id == this.tabrow2.stateid
        )[0].name;
      }
    },
    GetOblastList() {
      HelperService.GetOblastList().then((res) => {
        this.oblastlist = res.data;
      });
    },
    getregionlist(OblastID, setregionlist) {
      this.RegionLoading = true;

      RegionService.GetAll(this.lang, this.Organization.OblastID).then(
        (res) => {
          setregionlist(res.data);
          this.RegionLoading = false;
        }
      );
    },
    getmfylist(RegionID, setmfylist) {
      this.MfyLoading = true;
      MfyService.GetAll(this.Organization.RegionID).then((res) => {
        setmfylist(res.data);
        this.MfyLoading = false;
      });
    },

    OkedChange() {
      var self = this;
      self.Organization.oked = self.okedlist.filter(function (item) {
        if (item.id === self.Organization.okedid) return item;
      })[0].name;
    },
    Search() {
      var self = this;
      OrganizationService.Get(0, this.Organization.INN).then((res) => {
        self.Organization = res.data;
        self.getregionlist(self.Organization.OblastID);
        self.getmfylist(self.Organization.RegionID);
      });
    },
    EditSportTypeClassifier(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.Organization.SportTypeClassifier.indexOf(item);
      this.tabrow3 = Object.assign({}, item);
      this.$bvModal.show("SportTypeClassifierModal");
    },
    /* /////////// */
    Add() {
      var self = this;
      if (
        self.tabrow1.schoolsubjectid === "" ||
        self.tabrow1.schoolsubjectid === undefined ||
        self.tabrow1.schoolsubjectid === null ||
        self.tabrow1.schoolsubjectid === 0
      ) {
        this.makeToast(
          this.$t("schoolsubjectNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow1.schoolsubjectname = self.schoolsubjectlist.filter(function (
        item
      ) {
        if (item.id === self.tabrow1.schoolsubjectid) return item;
      })[0].name;

      var dublicate = false;
      self.Organization.SpesSubject.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.schoolsubjectid === self.tabrow1.schoolsubjectid
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + "" + self.tabrow1.schoolsubjectname,
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      self.Organization.SpesSubject.push(self.tabrow1);
      self.tabrow1 = {
        id: 0,
        ownerid: 0,
        schoolsubjectid: 0,
        schoolsubjectname: "",
        Status: 1,
      };
    },
    
    AddOrgBranch() {
      var self = this;
      if (
        self.tabrow2.shortname === "" ||
        self.tabrow2.shortname === undefined ||
        self.tabrow2.shortname === null ||
        self.tabrow2.shortname === 0
      ) {
        this.makeToast(
          this.$t("shortnameNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.fullname === "" ||
        self.tabrow2.fullname === undefined ||
        self.tabrow2.fullname === null ||
        self.tabrow2.fullname === 0
      ) {
        this.makeToast(
          this.$t("fullnameNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.startdate === "" ||
        self.tabrow2.startdate === undefined ||
        self.tabrow2.startdate === null ||
        self.tabrow2.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.studentcapacity === "" ||
        self.tabrow2.studentcapacity === undefined ||
        self.tabrow2.studentcapacity === null ||
        self.tabrow2.studentcapacity === 0
      ) {
        this.makeToast(
          this.$t("studentcapacityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.oblastid === "" ||
        self.tabrow2.oblastid === undefined ||
        self.tabrow2.oblastid === null ||
        self.tabrow2.oblastid === 0
      ) {
        this.makeToast(
          this.$t("oblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.regionid === "" ||
        self.tabrow2.regionid === undefined ||
        self.tabrow2.regionid === null ||
        self.tabrow2.regionid === 0
      ) {
        this.makeToast(
          this.$t("regionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.mfyid === "" ||
        self.tabrow2.mfyid === undefined ||
        self.tabrow2.mfyid === null ||
        self.tabrow2.mfyid === 0
      ) {
        this.makeToast(this.$t("mfyNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.tabrow2.stateid === "" ||
        self.tabrow2.stateid === undefined ||
        self.tabrow2.stateid === null ||
        self.tabrow2.stateid === 0
      ) {
        this.makeToast(this.$t("stateNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      this.tabrow2.oblastname = this.oblastlist.filter(
        (item) => item.id == this.tabrow2.oblastid
      )[0].name;
      this.tabrow2.regionname = this.RegionList.filter(
        (item) => item.id == this.tabrow2.regionid
      )[0].name;
      this.ChangeMfy();
      this.ChangeState();
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.Organization.OrgBranch[self.editedIndex1],
          self.tabrow2
        );
      } else {
        self.Organization.OrgBranch.push(self.tabrow2);
      }
      self.CloseOrgBranchModal();
    },

    /* //////// */
        /**********************/
    AddSportTypeClassifier() {
      var self = this;
      if (
        self.tabrow3.startdate === "" ||
        self.tabrow3.startdate === undefined ||
        self.tabrow3.startdate === null ||
        self.tabrow3.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.editedIndex1 == -1) {
        self.Organization.SportTypeClassifier.push(self.tabrow3);
      }
      else {
        Object.assign(
          self.Organization.SportTypeClassifier[this.editedIndex1],
          this.tabrow3
        );
      }
      this.$bvModal.hide("SportTypeClassifierModal");
      self.tabrow3 = {
        id: 0,
        startdate: "",
        enddate: "",
        sporttypeclassifiername: "",
        Status: 1,
      };
    },
    sporttypeclassifierchange() {
      var self = this;
      self.tabrow3.sporttypeclassifiername = self.sporttypeclassifierlist.filter(
        function (item) {
          if (item.id === self.tabrow3.sporttypeclassifierid) return item;
        }
      )[0].name;
      self.tabrow3.sporttypeclassifiername;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      OrganizationService.Update(this.Organization)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "Organization" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    /*********************/

    check() {
      var self = this;

      if (
        self.Organization.INN === 0 ||
        self.Organization.INN === null ||
        self.Organization.INN === undefined ||
        self.Organization.INN === ""
      ) {
        this.makeToast(this.$t("innNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Organization.ShortName === 0 ||
        self.Organization.ShortName === null ||
        self.Organization.ShortName === undefined ||
        self.Organization.ShortName === ""
      ) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.FullName === 0 ||
        self.Organization.FullName === null ||
        self.Organization.FullName === undefined ||
        self.Organization.FullName === ""
      ) {
        this.makeToast(
          this.$t("FullNameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.OblastID === 0 ||
        self.Organization.OblastID === null ||
        self.Organization.OblastID === undefined ||
        self.Organization.OblastID === ""
      ) {
        this.makeToast(
          this.$t("OblastNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.RegionID === 0 ||
        self.Organization.RegionID === null ||
        self.Organization.RegionID === undefined ||
        self.Organization.RegionID === ""
      ) {
        this.makeToast(
          this.$t("RegionNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.Adress === 0 ||
        self.Organization.Adress === null ||
        self.Organization.Adress === undefined ||
        self.Organization.Adress === ""
      ) {
        this.makeToast(this.$t("AdressNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Organization.ZipCode === 0 ||
        self.Organization.ZipCode === null ||
        self.Organization.ZipCode === undefined ||
        self.Organization.ZipCode === ""
      ) {
        this.makeToast(
          this.$t("ZipCodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.Director === 0 ||
        self.Organization.Director === null ||
        self.Organization.Director === undefined ||
        self.Organization.Director === ""
      ) {
        this.makeToast(
          this.$t("DirectorNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.Accounter === 0 ||
        self.Organization.Accounter === null ||
        self.Organization.Accounter === undefined ||
        self.Organization.Accounter === ""
      ) {
        this.makeToast(
          this.$t("AccounterNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Organization.okedid === 0 ||
        self.Organization.okedid === null ||
        self.Organization.okedid === undefined ||
        self.Organization.okedid === ""
      ) {
        this.makeToast(this.$t("okedNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.Organization.ContactInfo === 0 ||
        self.Organization.ContactInfo === null ||
        self.Organization.ContactInfo === undefined ||
        self.Organization.ContactInfo === ""
      ) {
        this.makeToast(
          this.$t("contactinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.Organization.organizationtypeid === 0 ||
      //   self.Organization.organizationtypeid === null ||
      //   self.Organization.organizationtypeid === undefined ||
      //   self.Organization.organizationtypeid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("organizationtypeNotSelected"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.Organization.StateID === 0 ||
        self.Organization.StateID === null ||
        self.Organization.StateID === undefined ||
        self.Organization.StateID === ""
      ) {
        this.makeToast(this.$t("StateNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      /* if (self.Organization.organizationtypeid === 1) {
        if (
          self.Organization.schooltypeid === 0 ||
          self.Organization.schooltypeid === null ||
          self.Organization.schooltypeid === undefined ||
          self.Organization.schooltypeid === ""
        ) {
          this.makeToast(
            this.$t("schooltypeNotSelected"),
            this.$t("Error"),
            "danger"
          );
           return false;
        }

       
      } */
      if (
        self.Organization.schoollegalformid === 0 ||
        self.Organization.schoollegalformid === null ||
        self.Organization.schoollegalformid === undefined ||
        self.Organization.schoollegalformid === ""
      ) {
        this.makeToast(
          this.$t("schoollegalformNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      this.Organization.studentсapacity = parseInt(
        this.Organization.studentсapacity,
        10
      );
      this.issavedisabled = true;
      OrganizationService.Update(self.Organization)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          this.issavedisabled = false;
          self.$router.push({
            name: "Organization",
            query: {
              schoolmanagementformid: this.$route.query.schoolmanagementformid,
              schoollegalformid: this.$route.query.schoollegalformid,
              schooltypeid: this.$route.query.schooltypeid,
              organizationtypeid: this.$route.query.organizationtypeid,
              regionid: this.$route.query.regionid,
              oblastid: this.$route.query.oblastid,
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
          });
        })
        .catch((error) => {
           this.issavedisabled = false;
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },

    /* ////////////////// */


    
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.Organization.Translates.filter(
        (item) => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        this.makeToast(
          this.$t("languageidNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        this.makeToast(
          this.$t("translatetextNotSelect"),
          this.$t("Error"),
          "danger"
        );
      } else {
        var dublikate = false;
        self.translatelist.forEach((item) => {
          if (item.languageid === self.translaterow.languageid) {
            this.makeToast(this.$t("dublikate"), this.$t("Error"), "danger");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function (
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: "",
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.Organization.Translates = self.Organization.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.Organization.Translates.push(item);
      });
      self.translatemodal = false;
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

    /* ///////////////////////// */

    AddRow(data) {
      var self = this;
      if (
        self.tabrow.code === null ||
        self.tabrow.code === undefined ||
        self.tabrow.code === 0 ||
        self.tabrow.code === ""
      ) {
        alert(self.$t("CodeNotCorrect"));
        return false;
      }
      if (
        self.tabrow.accountname === null ||
        self.tabrow.accountname === undefined ||
        self.tabrow.accountname === 0 ||
        self.tabrow.accountname === ""
      ) {
        alert(self.$t("AccountNameNotCorrect"));
        return false;
      }
      if (
        self.tabrow.bankid === null ||
        self.tabrow.bankid === undefined ||
        self.tabrow.bankid === 0
      ) {
        alert(self.$t("BankNotSelected"));
        return false;
      }
      if (
        self.tabrow.stateid === null ||
        self.tabrow.stateid === undefined ||
        self.tabrow.stateid === 0
      ) {
        alert(self.$t("StateNotSelected"));
        return false;
      }
      self.Organization.Accounts.push(self.tabrow);
      self.tabrow = {
        id: 0,
        organizationid: 0,
        code: "",
        accountname: "",
        stateid: 1,
        bankid: 0,
        Status: 1,
      };
    },
    EditRow(item) {
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
    Back() {
      this.$router.push({
        name: "Organization",
        query: {
          schoolmanagementformid: this.$route.query.schoolmanagementformid,
          schoollegalformid: this.$route.query.schoollegalformid,
          schooltypeid: this.$route.query.schooltypeid,
          organizationtypeid: this.$route.query.organizationtypeid,
          regionid: this.$route.query.regionid,
          oblastid: this.$route.query.oblastid,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
        },
      });
    },

    schoolyearchange() {
      var self = this;
      self.Organization.schoolyearname = self.schoolyearlist.filter(function (
        item
      ) {
        if (item.id === self.Organization.schoolyearid) return item;
      })[0].name;
      self.Organization.schoolyearname;
    },
    curriculumtypechange() {
      var self = this;
      self.Organization.curriculumtypename = self.curriculumtypelist.filter(
        function (item) {
          if (item.id === self.Organization.curriculumtypeid) return item;
        }
      )[0].name;
      self.Organization.curriculumtypename;
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
    "Organization.OblastID": {
      handler(newValue, oldValue) {
        if (newValue) {
          newValue;
          if (oldValue) {
            oldValue;
            this.Organization.RegionID = null;
            this.Organization.mfyid = null;
          }
          var self = this;
          if (self.editedIndex1 == -1) {
            this.tabrow2.oblastid = newValue;
          }
          this.getregionlist(newValue, function (data) {
            self.regionlist = data;
          });
        }
      },
    },
    "Organization.RegionID": {
      handler(newValue, oldValue) {
        if (newValue) {
          if (oldValue) {
            this.Organization.mfyid = null;
          }
          var self = this;
          if (self.editedIndex1 == -1) {
            this.tabrow2.regionid = newValue;
          }
          this.getmfylist(newValue, function (data) {
            self.mfylist = data;
          });
        }
      },
    },
  },
};
</script>

<style></style>

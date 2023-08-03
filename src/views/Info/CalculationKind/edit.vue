<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("CalculationKind") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="code"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="CalculationKind.code"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="CalculationKind.shortname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          CalculationKind.TranslatableColumns.includes(
                            'shortname'
                          )
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="CalculationKind.fullname"
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template #append>
                      <CButton
                        v-if="
                          CalculationKind.TranslatableColumns.includes(
                            'fullname'
                          )
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="normativedoc"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('NormativeDoc')"
                    autocomplete="normativedoc"
                    horizontal
                    :label="$t('NormativeDoc')"
                    v-model="CalculationKind.normativedoc"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("startdate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="CalculationKind.startdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('startdate')"
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
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="enddate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                      >{{ $t("enddate") }}</label
                    >
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="CalculationKind.enddate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('enddate')"
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
              <CCol sm="3"></CCol>
            </CRow>
                        <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("ItemOfExpense")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="itemofexpenselist"
                    v-model="CalculationKind.itemofexpenseid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
                        <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("CalculationType")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="calculationtypelist"
                    v-model="CalculationKind.calculationtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
                        <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("CalculationMethod")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="calculationmethodlist"
                    v-model="CalculationKind.calculationmethodid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
             <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("minimumvaluetype")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="minimumvaluetypelist"
                    v-model="CalculationKind.minimumvaluetypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("calculatebytimetype")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="calculatebytimetypelist"
                    v-model="CalculationKind.calculatebytimetypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
           <CRow>
            <CCol sm="3"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('dependonrate')}}</label>
                    <b-form-checkbox switch class="col-sm-9 mt-1" v-model="CalculationKind.dependonrate"></b-form-checkbox>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </CRow>
         <CRow>
            <CCol sm="3"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('byenrolment')}}</label>
                    <b-form-checkbox switch class="col-sm-9 mt-1" v-model="CalculationKind.byenrolment"></b-form-checkbox>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </CRow>
           <CRow v-if="CalculationKind.calculationtypeid === 2 || CalculationKind.calculationtypeid === 6">
            <CCol sm="3"></CCol>
            <c-col sm="8">
                <div class="form-group form-row">
                    <label class="col-form-label col-sm-3" for>{{$t('ismandatory')}}</label>
                    <b-form-checkbox switch class="col-sm-9 mt-1" v-model="CalculationKind.ismandatory"></b-form-checkbox>
                </div>
            </c-col>
            <CCol sm="2"></CCol>
          </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="CalculationKind.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>

          </ValidationObserver>
        </CCardBody>
        <CRow>
          <!-- Tab begins here -->
          <CCol>
            <b-tabs pills card>
              <b-tab :title="$t('Percent')" active>
                <CRow>
                  <b-table
                    :fields="PercentTables"
                    :items="CalculationKind.PercentTables"
                    class="bg-color-table text-center mx-3"
                    style="vertical-align: middle"
                    bordered
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:thead-top>
                      <b-tr>
                        <b-th style="width: 30%">
                          <date-picker
                            v-model="tabrow.ondate"
                            size="sm"
                            lang="ru"
                            :placeholder="$t('date')"
                            value-type="format"
                            format="DD.MM.YYYY"
                            style="width: 100%"
                          ></date-picker>
                        </b-th>
                        <b-th style="width: 30%">
                          <CInput
                            autocomplete="text"
                            v-model="tabrow.percentrate"
                            class="mb-0"
                          ></CInput>
                        </b-th>
                        <b-th style="width: 30%">
                          <CInput
                            autocomplete="text"
                            v-model="tabrow.detailinfo"
                            class="mb-0"
                          ></CInput>
                        </b-th>
                        <b-th>
                          <CButton
                            size="sm"
                            color="primary"
                            variant="outline"
                            @click="AddRow"
                          >
                            <b-icon icon="plus"> </b-icon>
                            {{ $t("Add") }}
                          </CButton>
                        </b-th>
                      </b-tr>
                    </template>

                    <template v-slot:cell(ondate)="{ item }">
                      <p v-if="item.Status == 0"> {{ item.ondate }} </p>
                      <date-picker
                        v-if="item.Status == 2 || item.Status == 1"
                        v-model="item.ondate"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('date')"
                        value-type="format"
                        format="DD.MM.YYYY"
                        style="width: 100%"
                      ></date-picker>
                    </template>
                    <template v-slot:cell(percentrate)="{ item }">
                      <p v-if="item.Status == 0">{{ item.percentrate }}</p>
                      <CInput
                        v-if="item.Status == 2 || item.Status == 1"
                        autocomplete="text"
                        v-model="item.percentrate"
                      ></CInput>
                    </template>
                    <template v-slot:cell(detailinfo)="{ item }">
                      <p v-if="item.Status == 0">{{ item.detailinfo }}</p>
                      <CInput
                        v-if="item.Status == 2 || item.Status == 1"
                        autocomplete="text"
                        v-model="item.detailinfo"
                      ></CInput>
                    </template>

                    <template v-slot:cell(actions)="{ item }">
                      <CButtonGroup
                        class="mx-auto d-block text-center"
                        size="sm"
                      >
                        <CButton
                          variant="outline"
                          color="primary"
                          @click="EditRow(item)"
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
              </b-tab>
              <!-- --fgbbdsfgsdfg -->
              <b-tab :title="$t('UsedTableTables')">
                <CRow>
                  <CCol>
                    <b-table
                      :fields="UsedTableTables"
                      :items="CalculationKind.UsedTables"
                      class="bg-color-table text-center mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width: 10%">
                            <date-picker
                              v-model="tabrow1.startdate"
                              size="sm"
                              lang="ru"
                              :placeholder="$t('date')"
                              value-type="format"
                              format="DD.MM.YYYY"
                              style="width: 100%"
                            ></date-picker>
                          </b-th>
                          <b-th style="width: 10%">
                            <date-picker
                              v-model="tabrow1.enddate"
                              size="sm"
                              lang="ru"
                              :placeholder="$t('date')"
                              value-type="format"
                              format="DD.MM.YYYY"
                              style="width: 100%"
                            ></date-picker>
                          </b-th>
                          <b-th style="width: 25%">
                            <v-select
                              :options="formedcalculationkindlist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow1.formedcalculationkindid"
                            ></v-select>
                          </b-th>
                          <b-th style="width : 15%">
                            <v-select
                              :options="minimumvaluetypelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow1.minimumvaluetypeid"
                            ></v-select>
                          </b-th>
                          <b-th style="width: 15%">
                            <CInput
                              autocomplete="text"
                              class="mb-0"
                              v-model="tabrow1.quantityofminimumvalue"
                            ></CInput>
                          </b-th>
                         <b-th style="width:11%" class="text-center">
                                <b-form-checkbox
                                  v-model="tabrow1.calcfrominsum"
                                  switch
                                  class="mt-2 ml-1"
                                ></b-form-checkbox>
                              </b-th>
                          <b-th style="width: 10%">
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              @click="Add1"
                            >
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                          
                        </b-tr>
                      </template>

                      <template v-slot:cell(startdate)="{ item }">
                        <p v-if="item.Status == 0">{{ item.startdate }}</p>
                        <date-picker
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.startdate"
                          size="sm"
                          lang="ru"
                          :placeholder="$t('date')"
                          value-type="format"
                          format="DD.MM.YYYY"
                          style="width: 100%"
                        ></date-picker>
                      </template>
                      <template v-slot:cell(enddate)="{ item }">
                        <p v-if="item.Status == 0">{{ item.enddate }}</p>
                        <date-picker
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.enddate"
                          size="sm"
                          lang="ru"
                          :placeholder="$t('date')"
                          value-type="format"
                          format="DD.MM.YYYY"
                          style="width: 100%"
                        ></date-picker>
                      </template>
                      <template
                        v-slot:cell(formedcalculationkindname)="{ item }"
                      >
                        <p v-if="item.Status == 0">
                          {{ item.formedcalculationkindname }}
                        </p>
                        <custom-number-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.formedcalculationkindname"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(minimumvaluetypename)="{ item }">
                        <p v-if="item.Status == 0">
                          {{ item.minimumvaluetypename }}
                        </p>
                        <custom-number-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.minimumvaluetypename"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(quantityofminimumvalue)="{ item }">
                        <p v-if="item.Status == 0">
                          {{ item.quantityofminimumvalue }}
                        </p>
                        <custom-number-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.quantityofminimumvalue"
                        ></custom-number-input>
                      </template>
                      <template v-slot:cell(calcfrominsum)="{item}">
                            <b-form-checkbox
                              disabled="true"
                              v-if="item.Status == 0"
                              v-model="item.calcfrominsum"
                              switch
                              class="mt-2 ml-1"
                            ></b-form-checkbox>
                            <b-form-checkbox
                              v-if="item.Status == 1 || item.Status == 2"
                              v-model="item.calcfrominsum"
                              switch
                              class="mt-2 ml-1"
                            ></b-form-checkbox>
                          </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="CalculationKind.CanSave"
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
              <!-- DocsTab Begins Here -->
              <b-tab :title="$t('AllowedDoc')">
                <CRow>
                  <CCol>
                    <b-table
                      :fields="DocTables"
                      :items="CalculationKind.DocTables"
                      class="bg-color-table text-center mx-3"
                      style="vertical-align: middle"
                      bordered
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr>
                          <b-th style="width: 15%">
                            <date-picker
                              v-model="tabrow2.ondate"
                              size="sm"
                              lang="ru"
                              :placeholder="$t('date')"
                              value-type="format"
                              format="DD.MM.YYYY"
                              style="width: 100%"
                            ></date-picker>
                          </b-th>
                          <b-th style="width: 25%">
                            <v-select
                              :options="tableslist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow2.tableid"
                            ></v-select>
                          </b-th>
                          <b-th>
                            <v-select
                              :options="statelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="tabrow2.stateid"
                            ></v-select>
                          </b-th>
                          <b-th style="width: 20%" class="text-center">
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              @click="Add2"
                            >
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                          
                        </b-tr>
                      </template>

                      <template v-slot:cell(ondate)="{ item }">
                        <p v-if="item.Status == 0">{{ item.ondate }}</p>
                        <CInput
                          v-if="item.Status == 2 || item.Status == 1"
                          autocomplete="text"
                          v-model="item.ondate"
                          class="mb-0"
                        ></CInput>
                      </template>
                      <template
                        v-slot:cell(tablename)="{ item }"
                      >
                        <p v-if="item.Status == 0">
                          {{ item.tablename }}
                        </p>
                        <v-select
                          v-if="item.Status == 2 || item.Status == 1"
                          :options="tableslist"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          label="name"
                          v-model="item.tableid"
                        ></v-select>
                      </template>
                      <template v-slot:cell(state)="{item}">
                            <v-select
                              :options="statelist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              v-model="item.stateid"
                            ></v-select>
                          </template>
                      <template v-slot:cell(actions)="{ item }">
                        <CButtonGroup
                          v-if="CalculationKind.CanSave"
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
            </b-tabs>
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
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'CalculationKind' })"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
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
import HelperService from "@/services/helper.service";
import ItemOfExpenseService from "@/services/ItemOfExpense.service";
import CalculationKindService from "@/services/CalculationKind.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      CalculationKind: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" },
      ],
      translatelist: [],
      languagelist: [],
      minimumvaluetypelist: [],
      formedcalculationkindlist: [],
      itemofexpenselist: [],
      calculationtypelist: [],
      calculationmethodlist: [],
      tableslist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: "",
      },
      PercentTables: [
        {
          key: "ondate",
          label: this.$t("ondate"),
        },
        {
          key: "percentrate",
          label: this.$t("percentrate"),
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tabrow: {
        id: 0,
        ondate: 0,
        percentrate: "",
        detailinfo: "",
        Status: 1,
      },
      UsedTableTables: [
        {
          key: "startdate",
          label: this.$t("startdate"),
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
        },
        {
          key: "formedcalculationkindname",
          label: this.$t("formedcalculationkindname"),
        },
        {
          key: "minimumvaluetypename",
          label: this.$t("minimumvaluetypename"),
        },
        {
          key: "quantityofminimumvalue",
          label: this.$t("quantityofminimumvalue"),
        },
       {
          key: "calcfrominsum",
          label: this.$t("calcfrominsum"),
        },

        { key: "actions", label: this.$t("actions") },
      ],
      tabrow1: {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        formedcalculationkindid: 0,
        minimumvaluetypeid: 0,
        quantityofminimumvalue: "",
        calcfrominsum: 0,
        Status: 1,
      },
      DocTables: [
        {
          key: "ondate",
          label: this.$t("ondate"),
        },
        {
          key: "tablename",
          label: this.$t("tablename"),
        },
        {
          key: "state",
          label: this.$t("state"),
        },
        { key: "actions", label: this.$t("actions") },
      ],
      tabrow2: {
        id: 0,
        ownerid: 0,
        ondate: "",
        tableid: 0,
        stateid: 0,
        Status: 1,
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      calculatebytimetypelist: [],
    };
  },
  created() {
    var self = this;

    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then((res) => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    HelperService.GetCalculateByTimetype().then((res) => {
      self.calculatebytimetypelist = res.data;
    });
    HelperService.GetMinimumValuelist().then((res) => {
      self.minimumvaluetypelist = res.data;
    });
        ItemOfExpenseService.GetAll().then((res) => {
      self.itemofexpenselist = res.data;
    });
    HelperService.GetCalculationKindlist().then((res) => {
      self.formedcalculationkindlist = res.data;
    });
    HelperService.GetTableList().then((res) => {
      self.tableslist = res.data;
    });
    HelperService.GetCalculationMethodList().then((res) => {
      self.calculationmethodlist = res.data;
    });
     HelperService.GetCalculationTypeList().then((res) => {
      self.calculationtypelist = res.data;
    });
    CalculationKindService.Get(self.selectedrowid).then((res) => {
      self.CalculationKind = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.CalculationKind.code === 0 ||
        self.CalculationKind.code === null ||
        self.CalculationKind.code === undefined ||
        self.CalculationKind.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.CalculationKind.shortname === 0 ||
        self.CalculationKind.shortname === null ||
        self.CalculationKind.shortname === undefined ||
        self.CalculationKind.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalculationKind.fullname === 0 ||
        self.CalculationKind.fullname === null ||
        self.CalculationKind.fullname === undefined ||
        self.CalculationKind.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalculationKind.normativedoc === 0 ||
        self.CalculationKind.normativedoc === null ||
        self.CalculationKind.normativedoc === undefined ||
        self.CalculationKind.normativedoc === ""
      ) {
        this.makeToast(
          this.$t("normativedocNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalculationKind.startdate === 0 ||
        self.CalculationKind.startdate === null ||
        self.CalculationKind.startdate === undefined ||
        self.CalculationKind.startdate === ""
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalculationKind.calculatebytimetypeid === 0 ||
        self.CalculationKind.calculatebytimetypeid === null ||
        self.CalculationKind.calculatebytimetypeid === undefined ||
        self.CalculationKind.calculatebytimetypeid === ""
      ) {
        this.makeToast(
          this.$t("calculatebytimetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*       if (
        self.CalculationKind.enddate === 0 ||
        self.CalculationKind.enddate === null ||
        self.CalculationKind.enddate === undefined ||
        self.CalculationKind.enddate === ""
      ) {
        this.makeToast(
          this.$t("enddateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.CalculationKind.stateid === 0 ||
        self.CalculationKind.stateid === null ||
        self.CalculationKind.stateid === undefined ||
        self.CalculationKind.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    AddRow() {
      var self = this;
      if (
        self.tabrow.ondate === "" ||
        self.tabrow.ondate === undefined ||
        self.tabrow.ondate === null ||
        self.tabrow.ondate === 0
      ) {
        this.makeToast(
          this.$t("ondateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.percentrate === "" ||
        self.tabrow.percentrate === undefined ||
        self.tabrow.percentrate === null ||
        self.tabrow.percentrate === 0
      ) {
        this.makeToast(
          this.$t("percentrateNotSelected"),
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
          this.$t("detailinfoNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*       self.tabrow1.schoolsubjectname = self.schoolsubjectlist.filter(function (
        item
      ) {
        if (item.id === self.tabrow1.schoolsubjectid) return item;
      })[0].name; */

      /*       var dublicate = false;
      self.Organization.SpesSubject.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.schoolsubjectid === self.tabrow1.schoolsubjectid
        ) {
          dublicate = true;
        }
      }); */
      /*       if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + "" + self.tabrow1.schoolsubjectname,
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      self.CalculationKind.PercentTables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ondate: 0,
        percentrate: "",
        detailinfo: "",
        Status: 1,
      };
    },
    Add1() {
      var self = this;
      if (
        self.tabrow1.startdate === "" ||
        self.tabrow1.startdate === undefined ||
        self.tabrow1.startdate === null ||
        self.tabrow1.startdate === 0
      ) {
        this.makeToast(
          this.$t("startdateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow1.formedcalculationkindid === "" ||
        self.tabrow1.formedcalculationkindid === undefined ||
        self.tabrow1.formedcalculationkindid === null ||
        self.tabrow1.formedcalculationkindid === 0
      ) {
        this.makeToast(
          this.$t("formedcalculationkindidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
/*       if (
        self.tabrow1.minimumvaluetypeid === "" ||
        self.tabrow1.minimumvaluetypeid === undefined ||
        self.tabrow1.minimumvaluetypeid === null ||
        self.tabrow1.minimumvaluetypeid === 0
      ) {
        this.makeToast(
          this.$t("minimumvaluetypeidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
/*       if (
        self.tabrow1.quantityofminimumvalue === "" ||
        self.tabrow1.quantityofminimumvalue === undefined ||
        self.tabrow1.quantityofminimumvalue === null ||
        self.tabrow1.quantityofminimumvalue === 0
      ) {
        this.makeToast(
          this.$t("quantityofminimumvalueNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      self.tabrow1.formedcalculationkindname = self.formedcalculationkindlist.filter(
        function (item) {
          if (item.id === self.tabrow1.formedcalculationkindid) return item;
        }
      )[0].name;

      if (!self.tabrow1.quantityofminimumvalue === "" || 
          !self.tabrow1.quantityofminimumvalue === undefined ||
          !self.tabrow1.quantityofminimumvalue === null ||
          !self.tabrow1.quantityofminimumvalue === 0) 
      {
      self.tabrow1.minimumvaluetypename = self.minimumvaluetypelist.filter(
        function (item) {
          if (item.id === self.tabrow1.minimumvaluetypeid) return item;
        }
      )[0].name;
      }

      /*       var dublicate = false;
      self.Organization.SpesSubject.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.schoolsubjectid === self.tabrow1.schoolsubjectid
        ) {
          dublicate = true;
        }
      }); */
      /*       if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + "" + self.tabrow1.schoolsubjectname,
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      self.CalculationKind.UsedTables.push(self.tabrow1);
      self.tabrow1 = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        formedcalculationkindid: 0,
        minimumvaluetypeid: 0,
        quantityofminimumvalue: "",
        calcfrominsum: 0,
        Status: 1,
      };
    },
        Add2() {
      var self = this;
      if (
        self.tabrow2.ondate === "" ||
        self.tabrow2.ondate === undefined ||
        self.tabrow2.ondate === null ||
        self.tabrow2.ondate === 0
      ) {
        this.makeToast(
          this.$t("ondateNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow2.tableid === "" ||
        self.tabrow2.tableid === undefined ||
        self.tabrow2.tableid === null ||
        self.tabrow2.tableid === 0
      ) {
        this.makeToast(
          this.$t("tableNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      self.tabrow2.tablename = self.tableslist.filter(
        function (item) {
          if (item.id === self.tabrow2.tableid) return item;
        }
      )[0].name;

      self.CalculationKind.DocTables.push(self.tabrow2);
      self.tabrow2 = {
        id: 0,
        ownerid: 0,
        ondate: "",
        tableid: 0,
        stateid: 0,
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
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      CalculationKindService.Update(self.CalculationKind)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "CalculationKind" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.CalculationKind.Translates.filter(
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
      self.CalculationKind.Translates = self.CalculationKind.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.CalculationKind.Translates.push(item);
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>

<style>
</style>
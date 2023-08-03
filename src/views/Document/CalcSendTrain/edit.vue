<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('CalcSendTrain')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required">
                  <label class="col-form-label" for>{{$t('docnumber')}}</label>
                  <CInput
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    v-model="CalcSendTrain.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <!-- <div class="form-group form-row"> -->
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label"
                    >{{$t('ondate')}}</label>
                    <div>
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="CalcSendTrain.docdate"
                        style="width:100%"
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
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="calculationkind" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('calculationkind')}}</label>
                    <v-select
                      style="width:100%"
                      :options="calculationkindlist"
                      v-model="CalcSendTrain.calculationkindid"
                      :reduce="item => item.id"
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
              <!--<CCol>
                <ValidationProvider v-slot="v" name="hracceptancework" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('hracceptancework')}}</label>
                    <v-select
                      class="col-sm-12"
                      :options="hracceptanceworklist"
                      v-model="CalcSendTrain.hracceptanceworkid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>-->
            </CRow>
            <CRow>
              <CCol>
                <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-3">
                    {{
                    $t("Employee")
                    }}
                  </label>
                    <c-input style="width:100%" disabled v-model="CalcSendTrain.personname">
                      <template #append>
                        <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
                          <b-icon icon="three-dots"></b-icon>
                        </CButton>
                      </template>
                    </c-input>
                </div>
              </CCol>
              
               <CCol>
                <ValidationProvider v-slot="v" name="employeeenrolmentid" rules="required">
                  <label class="col-form-label" for>{{$t('employeeenrolmentid')}}</label>
                  <CInput
                    disabled
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    v-model="CalcSendTrain.employeeenrolmentid"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="organizationaccount" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('organizationaccount')}}</label>
                    <v-select
                      class="col-sm-12"
                      :options="organizationaccountlist"
                      v-model="CalcSendTrain.organizationaccountid"
                      :reduce="item => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>
              
             
            </CRow>
            <b-row>
              <CCol>
                <ValidationProvider v-slot="v" name="bonusmonthcount" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('bonusmonthcount')}}</label>
                    <custom-number-input
                      class="col-sm-12"
                      v-model="CalcSendTrain.bonusmonthcount"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </custom-number-input>
                  </div>
                </ValidationProvider>
              </CCol>
                <CCol>
                <ValidationProvider v-slot="v" name="roundingtype" rules="required">
                  <div class="form-group form-row">
                    <label class="col-form-label" for>{{$t('roundingtype')}}</label>
                    <v-select
                      class="col-sm-12"
                      :options="roundingtypelist"
                      v-model="CalcSendTrain.roundingtypeid"
                      :reduce="item => item.id"
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
              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <label class="col-form-label" for>{{$t('detailinfo')}}</label>
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    v-model="CalcSendTrain.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </b-row>
            <b-row>
              <b-col class="text-right">
                <CButton
                  v-if="tabIndex === 0"
                  size="sm"
                  color="primary"
                  @click="$bvModal.show('AddModal')"
                >
                  <b-icon icon="plus"> </b-icon> {{$t('Add')}}
                </CButton>
                <CButton
                  v-if="tabIndex === 1"
                  size="sm"
                  color="primary"
                  @click="$bvModal.show('BonusAddModal')"
                >
                  <b-icon icon="plus"> </b-icon>  {{$t('Add')}}
                </CButton>
                <CButton
                  v-if="tabIndex === 2"
                  size="sm"
                  color="primary"
                  @click="$bvModal.show('DetailCalculationAddModal')"
                >
                  <b-icon icon="plus"> </b-icon>  {{$t('Add')}}
                </CButton>
              </b-col>
            </b-row>
            <CRow>
              <CCol>
                <b-tabs v-model="tabIndex">
                  <b-tab :title="$t('CalculationTables')" active>
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="CalcSendTrainTables"
                          :items="CalcSendTrain.Tables"
                          class="bg-color-table text-center mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          
                          <template #cell(actions)="{item}">
                              <div class="text-center">
                                <b-link @click="EditItem1(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                                  <b-icon icon="pencil" ></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash" ></b-icon>
                                </b-link>
                              </div>
                            </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>

                  <b-tab :title="$t('BonusTables')">
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="CalcSendTrainBonusTables"
                          :items="CalcSendTrain.BonusTables"
                          class="bg-color-table text-center  mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >                          
                          <template #cell(actions)="{item}">
                              <div class="text-center">
                                <b-link @click="EditItem2(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                                  <b-icon icon="pencil" ></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash" ></b-icon>
                                </b-link>
                              </div>
                            </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>

                  <b-tab :title="$t('DetailCalculationTables')">
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="CalcSendTrainDetailTables"
                          :items="CalcSendTrain.DetailTables"
                          class="bg-color-table text-center mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template #cell(actions)="{item}">
                            <div class="text-center">
                              <b-link @click="EditItem3(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                                <b-icon icon="pencil" ></b-icon>
                              </b-link>
                              <b-link
                                class="mr-2"
                                v-c-tooltip="{content: $t('Delete') }"
                                @click="DeleteItem(item)"
                              >
                                <b-icon icon="trash" ></b-icon>
                              </b-link>
                            </div>
                          </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>
                </b-tabs>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'CalcSendTrain'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="CalcSendTrain.CanSave"
                size="sm"
                color="success"
                class="mr-4"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
        <b-modal id="PersonModal" no-close-on-backdrop size="xl" :title="$t('Person')" hide-footer modal-class="custom-size-modal">
          <employee-list-component :ondate="CalcSendTrain.docdate" @SelectedItem="SelectedItem" @DblClick="AddPersonData">

              </employee-list-component>

            <c-row class="mt-2">
                <c-col class="text-center">
                    <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                        {{$t('back')}}
                    </b-button>
                    <b-button variant="primary" @click="AddPersonData(personvalue)">
                        {{$t('Add')}}
                    </b-button>
                </c-col>
            </c-row>
        </b-modal>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('CalculationTables')}}</template>
          <b-row>
            <b-col>
              <CInput class="mb-0" horizontal :label="$t('ordernumber')" v-model="Tables.ordernumber"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('organizationaccount')}}</label>
                <v-select
                  :options="organizationaccountlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  class="col-sm-9"
                  label="code"
                  v-model="Tables.organizationaccountid"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('onmonth')}}</label>
                <div class="col-sm-9">
                  <date-picker
                    v-model="Tables.onmonth"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('onmonth')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('possalary')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.possalary"
                    ></custom-number-input>
                  </div>
                </div>
                
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('bonussum')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.bonussum"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('daylysalary')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.daylysalary"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('paydays')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.paydays"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('totalsum')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.totalsum"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('daylysalary')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="itemofexpenselist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="Tables.itemofexpenseid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('totalsum')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="Tables.autototalsum"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="AddTables">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <b-modal id="BonusAddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('BonusTables')}}</template>
          <b-row>
            <b-col>
              <CInput class="mb-0" horizontal :label="$t('ordernumber')" v-model="BonusTables.ordernumber"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('organizationaccount')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="organizationaccountlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                      v-model="BonusTables.organizationaccountid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('calculationkind')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="calculationkindlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="BonusTables.calculationkindid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('itemofexpense')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="itemofexpenselist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="BonusTables.itemofexpenseid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('onmonth')}}</label>
                  <div class="col-sm-9">
                    <date-picker
                      v-model="BonusTables.onmonth"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('onmonth')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('bonussum')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="BonusTables.bonussum"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close2">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="AddBonusTables">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <b-modal id="DetailCalculationAddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('DetailCalculationTables')}}</template>
          <b-row>
            <b-col>
              <CInput class="mb-0" horizontal :label="$t('ordernumber')" v-model="DetailTables.ordernumber"></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('organizationaccount')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="organizationaccountlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="code"
                      v-model="DetailTables.organizationaccountid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('calculationkind')}}</label>
                  <div class="col-sm-9">
                    <v-select
                      :options="calculationkindlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="DetailTables.calculationkindid"
                    ></v-select>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('onmonth')}}</label>
                  <div class="col-sm-9">
                    <date-picker
                      v-model="DetailTables.onmonth"
                      style="width:100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('onmonth')"
                      value-type="format"
                      format="DD.MM.YYYY"
                    ></date-picker>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('insum')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="DetailTables.insum"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('factdays')}}</label>
                  <div class="col-sm-9">
                    <CInput class="mb-0" v-model="DetailTables.factdays"></CInput>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('facthours')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="DetailTables.facthours"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('plandays')}}</label>
                  <div class="col-sm-9">
                    <CInput class="mb-0" v-model="DetailTables.plandays"></CInput>
                  </div>
                </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{$t('plandays')}}</label>
                  <div class="col-sm-9">
                    <custom-number-input
                      autocomplete="number"
                      v-model="DetailTables.planhours"
                    ></custom-number-input>
                  </div>
                </div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close3">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="AddDetailTables">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ItemOfExpenseService from "@/services/ItemOfExpense.service";
import CalcSendTrainService from "@/services/CalcSendTrain.service";
import CalculationKindService from "@/services/CalculationKind.service";
import HrAcceptanceWorkService from "@/services/HrAcceptanceWork.service";
import OrganizationService from "@/services/organization.service";
import PersonService from "@/services/person.service";
import HelperService from "@/services/helper.service";
import EmployeeListComponent from '@/components/EmployeeList'
export default {
  components : {EmployeeListComponent},
  data() {
    return {
      tabIndex : 0,
      SaveLoading: false,
      CalcSendTrain: {},
      selectedrowid: 0,
      calculationkindlist: [],
      organizationaccountlist: [],
      hracceptanceworklist: [],
      roundingtypelist: [],
      itemofexpenselist: [],
      employeeenrolmentlist: [],
      Tables: [],
      BonusTables: [],
      DetailTables: [],
      personvalue : {},
      CalcSendTrainTables: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        { key: "organizationaccount", label: this.$t("organizationaccount") },
        { key: "onmonth", label: this.$t("onmonth") },
        { key: "possalary", label: this.$t("possalary") },
        { key: "bonussum", label: this.$t("bonussum") },
        { key: "daylysalary", label: this.$t("daylysalary") },
        { key: "paydays", label: this.$t("paydays") },
        { key: "totalsum", label: this.$t("totalsum") },
        { key: "itemofexpensename", label: this.$t("itemofexpense") },
        { key: "autototalsum", label: this.$t("autototalsum") },
        { key: "actions", label: "" }
      ],

      Tables: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccountid: 0,
        organizationaccount: "",
        onmonth: "",
        possalary: 0,
        bonussum: 0,
        daylysalary: 0,
        paydays: 0,
        totalsum: 0,
        autototalsum: 0,
        itemofexpenseid: 0,
        itemofexpensename: "",
        Status: 1
      },

      CalcSendTrainBonusTables: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        { key: "organizationaccount", label: this.$t("organizationaccount") },
        { key: "calculationkindname", label: this.$t("calculationkindname") },
        { key: "itemofexpensename", label: this.$t("itemofexpense") },
        { key: "onmonth", label: this.$t("onmonth") },
        { key: "bonussum", label: this.$t("bonussum") },
        { key: "actions", label: "" }
      ],

      BonusTables: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccount: "",
        organizationaccountid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        itemofexpenseid: 0,
        itemofexpensename: "",
        onmonth: "",
        bonussum: 0,
        Status: 1
      },

      CalcSendTrainDetailTables: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        { key: "organizationaccount", label: this.$t("organizationaccount") },
        { key: "calculationkindname", label: this.$t("calculationkindname") },
        { key: "onmonth", label: this.$t("onmonth") },
        { key: "insum", label: this.$t("insum") },
        { key: "factdays", label: this.$t("factdays") },
        { key: "facthours", label: this.$t("facthours") },
        { key: "plandays", label: this.$t("plandays") },
        { key: "planhours", label: this.$t("planhours") },
        { key: "actions", label: "" }
      ],
      DetailTables: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccount: "",
        organizationaccountid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        onmonth: "",
        insum: 0,
        factdays: 0,
        facthours: 0,
        plandays: 0,
        planhours: 0,
        Status: 1
      },
      toastCount: 0,
      allSignupErrors: {},
      editedIndex : -1
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    CalcSendTrainService.Get(self.selectedrowid).then(res => {
      self.CalcSendTrain = res.data;
    }),
      CalculationKindService.GetAll().then(res => {
        self.calculationkindlist = res.data;
      });
    // HrAcceptanceWorkService.GetAll().then(res => {
    //   self.hracceptanceworklist = res.data;
    // });
    OrganizationService.GetOrganizationAccountList().then(res => {
      self.organizationaccountlist = res.data;
    });
    HelperService.GetRoundingTypeList(self.lang).then(res => {
      self.roundingtypelist = res.data;
    });
    ItemOfExpenseService.GetAll().then(res => {
      self.itemofexpenselist = res.data;
    });
  },
  methods: {
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.Tables = {
          id: 0,
          ownerid: 0,
          ordernumber: 0,
          organizationaccountid: 0,
          organizationaccount: "",
          onmonth: "",
          possalary: 0,
          bonussum: 0,
          daylysalary: 0,
          paydays: 0,
          totalsum: 0,
          autototalsum: 0,
          itemofexpenseid: 0,
          itemofexpensename: "",
          Status: 1
        };
        this.editedIndex = -1;
      });
    },
    Close2() {
      this.$bvModal.hide("BonusAddModal");
      this.$nextTick(() => {
        this.BonusTables = {
          id: 0,
          ownerid: 0,
          ordernumber: 0,
          organizationaccount: "",
          organizationaccountid: 0,
          calculationkindid: 0,
          calculationkindname: "",
          itemofexpenseid: 0,
          itemofexpensename: "",
          onmonth: "",
          bonussum: 0,
          Status: 1
        };
        this.editedIndex = -1;
      });
    },
    Close3() {
      this.$bvModal.hide("DetailCalculationAddModal");
      this.$nextTick(() => {
        this.DetailTables = {
          id: 0,
          ownerid: 0,
          ordernumber: 0,
          organizationaccount: "",
          organizationaccountid: 0,
          calculationkindid: 0,
          calculationkindname: "",
          itemofexpenseid: 0,
          itemofexpensename: "",
          onmonth: "",
          bonussum: 0,
          Status: 1
        };
        this.editedIndex = -1;
      });
    },
    EditItem1(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.CalcSendTrain.Tables.indexOf(item);
      this.Tables = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    EditItem2(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.CalcSendTrain.BonusTables.indexOf(item);
      this.BonusTables = Object.assign({}, item);
      this.$bvModal.show("BonusAddModal");
    },
    EditItem3(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.CalcSendTrain.DetailTables.indexOf(item);
      this.DetailTables = Object.assign({}, item);
      this.$bvModal.show("DetailCalculationAddModal");
    },
    OpenPersonModal(){
      this.$bvModal.show('PersonModal')
    }, 
    ClosePersonModal(){
      this.$bvModal.hide('PersonModal')
    },
    SelectedItem(value){
      this.personvalue = value
    },
    AddPersonData(data){
      // console.log(data)
      this.ClosePersonModal()
      this.CalcSendTrain.personid = this.personvalue.personid
      this.CalcSendTrain.personname = this.personvalue.personname
      this.CalcSendTrain.hracceptanceworkid = this.personvalue.hracceptanceworkid
      this.CalcSendTrain.employeeenrolmentid = this.personvalue.employeeenrolmentid
      // console.log(data)
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },

    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    personchange() {
      var self = this;
      CalcSendTrain.GetEmployeeEnrolment(self.CalcSendTrain.personid).then(
        res => {
          self.employeeenrolmentlist = res.data;
          (self.employeeenrolmentlist);
          self.CalcSendTrain.employeeenrolmentid = res.data.employeeenrolmentid;
        }
      );
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    AddTables() {
      var self = this;

      if (
        self.Tables.ordernumber === "" ||
        self.Tables.ordernumber === undefined ||
        self.Tables.ordernumber === null ||
        self.Tables.ordernumber === 0
      ) {
        self.makeToast(
          self.$t("ordernumberNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Tables.onmonth === "" ||
        self.Tables.onmonth === undefined ||
        self.Tables.onmonth === null ||
        self.Tables.onmonth === 0
      ) {
        self.makeToast(self.$t("onmonthNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.Tables.organizationaccountid === "" ||
        self.Tables.organizationaccountid === undefined ||
        self.Tables.organizationaccountid === null ||
        self.Tables.organizationaccountid === 0
      ) {
        self.makeToast(
          self.$t("organizationaccountNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Tables.itemofexpenseid === "" ||
        self.Tables.itemofexpenseid === undefined ||
        self.Tables.itemofexpenseid === null ||
        self.Tables.itemofexpenseid === 0
      ) {
        self.makeToast(
          self.$t("itemofexpenseNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.Tables.organizationaccount = self.organizationaccountlist.filter(
        function(item) {
          if (item.id === self.Tables.organizationaccountid) return item;
        }
      )[0].code;

      self.Tables.itemofexpensename = self.itemofexpenselist.filter(function(
        item
      ) {
        if (item.id === self.Tables.itemofexpenseid) return item;
      })[0].name;

      if (this.editedIndex > -1) {
        Object.assign(this.CalcSendTrain.Tables[this.editedIndex], this.Tables);
      } else {
        self.CalcSendTrain.Tables.push(self.Tables);
      }
      self.Tables = {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccountid: 0,
        organizationaccount: "",
        onmonth: "",
        possalary: 0,
        bonussum: 0,
        daylysalary: 0,
        paydays: 0,
        totalsum: 0,
        autototalsum: 0,
        itemofexpenseid: 0,
        itemofexpensename: "",
        Status: 1
      };
      this.$bvModal.hide('AddModal')
    },

    AddBonusTables() {
      var self = this;

      if (
        self.BonusTables.ordernumber === "" ||
        self.BonusTables.ordernumber === undefined ||
        self.BonusTables.ordernumber === null ||
        self.BonusTables.ordernumber === 0
      ) {
        self.makeToast(
          self.$t("ordernumberNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BonusTables.onmonth === "" ||
        self.BonusTables.onmonth === undefined ||
        self.BonusTables.onmonth === null ||
        self.BonusTables.onmonth === 0
      ) {
        self.makeToast(self.$t("onmonthNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.BonusTables.bonussum === "" ||
        self.BonusTables.bonussum === undefined ||
        self.BonusTables.bonussum === null ||
        self.BonusTables.bonussum === 0
      ) {
        self.makeToast(
          self.$t("bonussumNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BonusTables.organizationaccountid === "" ||
        self.BonusTables.organizationaccountid === undefined ||
        self.BonusTables.organizationaccountid === null ||
        self.BonusTables.organizationaccountid === 0
      ) {
        self.makeToast(
          self.$t("organizationaccountNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BonusTables.calculationkindid === "" ||
        self.BonusTables.calculationkindid === undefined ||
        self.BonusTables.calculationkindid === null ||
        self.BonusTables.calculationkindid === 0
      ) {
        self.makeToast(
          self.$t("calculationkindNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.BonusTables.itemofexpenseid === "" ||
        self.BonusTables.itemofexpenseid === undefined ||
        self.BonusTables.itemofexpenseid === null ||
        self.BonusTables.itemofexpenseid === 0
      ) {
        self.makeToast(
          self.$t("itemofexpenseNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.BonusTables.organizationaccount = self.organizationaccountlist.filter(
        function(item) {
          if (item.id === self.BonusTables.organizationaccountid) return item;
        }
      )[0].code;

      self.BonusTables.calculationkindname = self.calculationkindlist.filter(
        function(item) {
          if (item.id === self.BonusTables.calculationkindid) return item;
        }
      )[0].name;
      self.BonusTables.itemofexpensename = self.itemofexpenselist.filter(
        function(item) {
          if (item.id === self.BonusTables.itemofexpenseid) return item;
        }
      )[0].name;
      if (this.editedIndex > -1) {
        Object.assign(this.CalcSendTrain.BonusTables[this.editedIndex], this.BonusTables);
      } else {
        self.CalcSendTrain.BonusTables.push(self.BonusTables);
      }
      
      self.BonusTables = {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccount: "",
        organizationaccountid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        itemofexpenseid: 0,
        itemofexpensename: "",
        onmonth: "",
        bonussum: 0,
        Status: 1
      };
      this.$bvModal.hide('BonusAddModal')
    },
    AddDetailTables() {
      var self = this;

      if (
        self.DetailTables.ordernumber === "" ||
        self.DetailTables.ordernumber === undefined ||
        self.DetailTables.ordernumber === null ||
        self.DetailTables.ordernumber === 0
      ) {
        self.makeToast(
          self.$t("ordernumberNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.DetailTables.onmonth === "" ||
        self.DetailTables.onmonth === undefined ||
        self.DetailTables.onmonth === null ||
        self.DetailTables.onmonth === 0
      ) {
        self.makeToast(self.$t("onmonthNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.DetailTables.organizationaccountid === "" ||
        self.DetailTables.organizationaccountid === undefined ||
        self.DetailTables.organizationaccountid === null ||
        self.DetailTables.organizationaccountid === 0
      ) {
        self.makeToast(
          self.$t("organizationaccountNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.DetailTables.calculationkindid === "" ||
        self.DetailTables.calculationkindid === undefined ||
        self.DetailTables.calculationkindid === null ||
        self.DetailTables.calculationkindid === 0
      ) {
        self.makeToast(
          self.$t("calculationkindNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      self.DetailTables.organizationaccount = self.organizationaccountlist.filter(
        function(item) {
          if (item.id === self.DetailTables.organizationaccountid) return item;
        }
      )[0].code;

      self.DetailTables.calculationkindname = self.calculationkindlist.filter(
        function(item) {
          if (item.id === self.DetailTables.calculationkindid) return item;
        }
      )[0].name;

      self.CalcSendTrain.DetailTables.push(self.DetailTables);
      self.DetailTables = {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        organizationaccount: "",
        organizationaccountid: 0,
        calculationkindid: 0,
        calculationkindname: "",
        onmonth: "",
        insum: 0,
        factdays: 0,
        facthours: 0,
        plandays: 0,
        planhours: 0,
        Status: 1
      };
      this.$bvModal.hide("DetailCalculationAddModal");
    },
    check() {
      var self = this;
      if (
        self.CalcSendTrain.docnumber === 0 ||
        self.CalcSendTrain.docnumber === null ||
        self.CalcSendTrain.docnumber === undefined ||
        self.CalcSendTrain.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcSendTrain.docdate === 0 ||
        self.CalcSendTrain.docdate === null ||
        self.CalcSendTrain.docdate === undefined ||
        self.CalcSendTrain.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcSendTrain.calculationkindid === 0 ||
        self.CalcSendTrain.calculationkindid === null ||
        self.CalcSendTrain.calculationkindid === undefined ||
        self.CalcSendTrain.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcSendTrain.hracceptanceworkid === 0 ||
        self.CalcSendTrain.hracceptanceworkid === null ||
        self.CalcSendTrain.hracceptanceworkid === undefined ||
        self.CalcSendTrain.hracceptanceworkid === ""
      ) {
        this.makeToast(
          this.$t("hracceptanceworkNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcSendTrain.personid === 0 ||
        self.CalcSendTrain.personid === null ||
        self.CalcSendTrain.personid === undefined ||
        self.CalcSendTrain.personid === ""
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcSendTrain.employeeenrolmentid === 0 ||
        self.CalcSendTrain.employeeenrolmentid === null ||
        self.CalcSendTrain.employeeenrolmentid === undefined ||
        self.CalcSendTrain.employeeenrolmentid === ""
      ) {
        this.makeToast(
          this.$t("employeeenrolmentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcSendTrain.organizationaccountid === 0 ||
        self.CalcSendTrain.organizationaccountid === null ||
        self.CalcSendTrain.organizationaccountid === undefined ||
        self.CalcSendTrain.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcSendTrain.bonusmonthcount === 0 ||
        self.CalcSendTrain.bonusmonthcount === null ||
        self.CalcSendTrain.bonusmonthcount === undefined ||
        self.CalcSendTrain.bonusmonthcount === ""
      ) {
        this.makeToast(
          this.$t("bonusmonthcountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcSendTrain.roundingtypeid === 0 ||
        self.CalcSendTrain.roundingtypeid === null ||
        self.CalcSendTrain.roundingtypeid === undefined ||
        self.CalcSendTrain.roundingtypeid === ""
      ) {
        this.makeToast(
          this.$t("roundingtypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcSendTrain.detailinfo === 0 ||
        self.CalcSendTrain.detailinfo === null ||
        self.CalcSendTrain.detailinfo === undefined ||
        self.CalcSendTrain.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.CalcSendTrain.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }
      if (self.CalcSendTrain.BonusTables.length === 0) {
        this.makeToast(
          this.$t("BonusTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.CalcSendTrain.DetailTables.length === 0) {
        this.makeToast(
          this.$t("DetailTablesNotFilled"),
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
      CalcSendTrainService.Update(self.CalcSendTrain)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          self.$router.push({ name: "CalcSendTrain" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
};
</script>

<style>
</style>
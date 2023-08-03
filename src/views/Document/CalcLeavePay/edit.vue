<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('CalcLeavePay')}}</h4>
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
                    v-model="CalcLeavePay.docnumber"
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
                        v-model="CalcLeavePay.docdate"
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
                      disabled
                      :options="calculationkindlist"
                      v-model="CalcLeavePay.calculationkindid"
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
                      v-model="CalcLeavePay.hracceptanceworkid"
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
              <!-- <CCol>
                
                <div class="form-group form-row mb-0">
                  <label class="col-form-label col-sm-3">
                    {{
                    $t("Employee")
                    }}
                  </label>
                    <c-input style="width:100%" disabled v-model="CalcLeavePay.personname">
                      <template #append>
                        <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
                          <b-icon icon="three-dots"></b-icon>
                        </CButton>
                      </template>
                    </c-input>
                </div>
              </CCol>
               -->
               <CCol>
                <ValidationProvider v-slot="v" name="personname" rules="required">
                  <label class="col-form-label" for>{{$t('Employee')}}</label>
                  <CInput
                    disabled
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    v-model="CalcLeavePay.personname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol> 
              <CCol>
                <ValidationProvider v-slot="v" name="employeeenrolmentid" rules="required">
                  <label class="col-form-label" for>{{$t('employeeenrolmentid')}}</label>
                  <CInput
                    disabled
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    v-model="CalcLeavePay.employeeenrolmentid"
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
                      v-model="CalcLeavePay.organizationaccountid"
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
                      v-model="CalcLeavePay.bonusmonthcount"
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
                      v-model="CalcLeavePay.roundingtypeid"
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
                    v-model="CalcLeavePay.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </b-row>
            <CButton
                  v-if="tabIndex === 0"
                  size="sm"
                  color="success"
                  @click="Calculate"
                >
                  <b-icon icon="calculator" class="mr-2"></b-icon> {{$t('Calculate')}}
                </CButton>
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
                          :fields="CalcLeavePayTables"
                          :items="CalcLeavePay.Tables"
                          class="bg-color-table text-center mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                           <template v-slot:cell(ordernumber)="{ item }">
                            <p>{{item.ordernumber}}</p>                           
                          </template>
                          <template v-slot:cell(organizationaccount)="{ item }">
                            <p>{{item.organizationaccount}}</p>                           
                          </template>
                          <template v-slot:cell(onmonth)="{ item }">
                            <p>{{item.onmonth}}</p>                           
                          </template>
                         
                          <template v-slot:cell(possalary)="{ item }">
                            <p>{{$options.filters.currency(item.possalary, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>
                          <template v-slot:cell(bonussum)="{ item }">
                            <p>{{$options.filters.currency(item.bonussum, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>
                          <template v-slot:cell(daylysalary)="{ item }">
                            <p>{{$options.filters.currency(item.daylysalary, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>
                          
                           <template v-slot:cell(paydays)="{ item }">
                            <p>{{item.paydays}}</p>                           
                          </template> 
                         
                          <template v-slot:cell(totalsum)="{ item }">
                            <p>{{$options.filters.currency(item.totalsum, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>
                          
                           <template v-slot:cell(itemofexpensename)="{ item }">
                            <p>{{item.itemofexpensename}}</p>                           
                          </template>
                          <template v-slot:cell(autototalsum)="{ item }">
                            <p>{{$options.filters.currency(item.autototalsum, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>
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
                          :fields="CalcLeavePayBonusTables"
                          :items="CalcLeavePay.BonusTables"
                          class="bg-color-table text-center  mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >            
                         <template v-slot:cell(bonussum)="{ item }">
                            <p>{{$options.filters.currency(item.bonussum, {
                                  symbol: "",
                                  fractionCount: 2,
                                })  }}</p>    
                          </template>           
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
                          :fields="CalcLeavePayDetailTables"
                          :items="CalcLeavePay.DetailTables"
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
                @click="$router.push({name : 'CalcLeavePay'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="CalcLeavePay.CanSave"
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
          <employee-list-component :ondate="CalcLeavePay.docdate" @SelectedItem="SelectedItem" @DblClick="AddPersonData">

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
                  <label class="col-form-label col-sm-3">{{$t('itemofexpense')}}</label>
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
                  <label class="col-form-label col-sm-3">{{$t('autototalsum')}}</label>
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
import CalcLeavePayService from "@/services/CalcLeavePay.service";
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
      CalcLeavePay: {},
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
      CalcLeavePayTables: [
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

      CalcLeavePayBonusTables: [
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

      CalcLeavePayDetailTables: [
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
    CalcLeavePayService.Get(self.selectedrowid).then(res => {
      self.CalcLeavePay = res.data;
      /* if(self.$route.params.calculationkindid === 25){ */
      if(self.$route.params.id===0){
          self.CalcLeavePay.calculationkindid = self.$route.params.calculationkindid;
          self.CalcLeavePay.documentid = self.$route.params.documentid;
          self.CalcLeavePay.documenttableid = self.$route.params.documenttableid;
          self.CalcLeavePay.documentinfo = self.$route.params.documentinfo;
          self.CalcLeavePay.tableid = self.$route.params.tableid;
          self.CalcLeavePay.personid = self.$route.params.personid;
          self.CalcLeavePay.personname = self.$route.params.personname;
          self.CalcLeavePay.employeeenrolmentid = self.$route.params.employeeenrolmentid;
      }
          
      /* }
      if(self.$route.params.calculationkindid === 27){
          self.CalcLeavePay.calculationkindid = self.$route.params.calculationkindid;
          self.CalcLeavePay.hrempsickleaveid = self.$route.params.hrempsickleaveid;
          self.CalcLeavePay.hrempsickleavetableid = self.$route.params.hrempsickleavetableid;
          self.CalcLeavePay.personid = self.$route.params.personid;
          self.CalcLeavePay.personname = self.$route.params.personname;
          self.CalcLeavePay.employeeenrolmentid = self.$route.params.employeeenrolmentid;
      } */
     
      console.log(self.CalcLeavePay);
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
    Calculate(){
      var self = this;
      if (
        self.CalcLeavePay.organizationaccountid === 0 ||
        self.CalcLeavePay.organizationaccountid === null ||
        self.CalcLeavePay.organizationaccountid === undefined ||
        self.CalcLeavePay.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountidNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      CalcLeavePayService.RecalcCalcLeavePay(self.CalcLeavePay)
        .then(res => {
          
            
            self.CalcLeavePay.hracceptanceworkid = res.data.hracceptanceworkid;
            self.CalcLeavePay.Tables.forEach(function (item) {
              item.Status = 3;
            }); 
            res.data.Tables.forEach(function (item) {
              if (item.Status !== 3) {
                self.Tables = {
                  id: 0,
                  ownerid: 0,
                  ordernumber: item.ordernumber,
                  organizationaccountid: item.organizationaccountid,
                  organizationaccount: item.organizationaccount,
                  onmonth: item.onmonth,
                  possalary: item.possalary,
                  bonussum: item.bonussum,
                  daylysalary: item.daylysalary,
                  paydays: item.paydays,
                  totalsum: item.totalsum,
                  autototalsum: item.autototalsum,
                  itemofexpenseid: item.itemofexpenseid,
                  itemofexpensename: item.itemofexpensename,
                  Status: 1
                };
                self.CalcLeavePay.Tables.push(self.Tables);
      
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
              }
            }); 
            
            self.CalcLeavePay.BonusTables.forEach(function (item) {
              item.Status = 3;
            }); 
            res.data.BonusTables.forEach(function (item) {
              if (item.Status !== 3) {
                self.BonusTables = {
                  id: 0,
                  ownerid: 0,
                  ordernumber: item.ordernumber,
                  organizationaccount: item.organizationaccount,
                  organizationaccountid: item.organizationaccountid,
                  calculationkindid: item.calculationkindid,
                  calculationkindname: item.calculationkindname,
                  itemofexpenseid: item.itemofexpenseid,
                  itemofexpensename: item.itemofexpensename,
                  onmonth: item.onmonth,
                  bonussum: item.bonussum,
                  Status: 1
                };
                self.CalcLeavePay.BonusTables.push(self.BonusTables);
      
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
              }
            }); 
            self.CalcLeavePay.DetailTables.forEach(function (item) {
              item.Status = 3;
            }); 
            res.data.DetailTables.forEach(function (item) {
              if (item.Status !== 3) {
                self.DetailTables = {
                    id: 0,
                    ownerid: 0,
                    ordernumber: item.ordernumber,
                    organizationaccount: item.organizationaccount,
                    organizationaccountid: item.organizationaccountid,
                    calculationkindid: item.calculationkindid,
                    calculationkindname: item.calculationkindname,
                    onmonth: item.onmonth,
                    insum: item.insum,
                    factdays: item.factdays,
                    facthours: item.facthours,
                    plandays: item.plandays,
                    planhours: item.planhours,
                    Status: 1
                  };
                self.CalcLeavePay.DetailTables.push(self.DetailTables);
      
                self.DetailTables= {
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
              }
            });
          
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
     
    },
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
      this.editedIndex = this.CalcLeavePay.Tables.indexOf(item);
      this.Tables = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    EditItem2(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.CalcLeavePay.BonusTables.indexOf(item);
      this.BonusTables = Object.assign({}, item);
      this.$bvModal.show("BonusAddModal");
    },
    EditItem3(item){
      if (item.Status === 0) item.Status = 2;
      this.editedIndex = this.CalcLeavePay.DetailTables.indexOf(item);
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
      this.CalcLeavePay.personid = this.personvalue.personid
      this.CalcLeavePay.personname = this.personvalue.personname
      this.CalcLeavePay.hracceptanceworkid = this.personvalue.hracceptanceworkid
      this.CalcLeavePay.employeeenrolmentid = this.personvalue.employeeenrolmentid
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
      CalcLeavePay.GetEmployeeEnrolment(self.CalcLeavePay.personid).then(
        res => {
          self.employeeenrolmentlist = res.data;
          (self.employeeenrolmentlist);
          self.CalcLeavePay.employeeenrolmentid = res.data.employeeenrolmentid;
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
        Object.assign(this.CalcLeavePay.Tables[this.editedIndex], this.Tables);
      } else {
        self.CalcLeavePay.Tables.push(self.Tables);
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
        Object.assign(this.CalcLeavePay.BonusTables[this.editedIndex], this.BonusTables);
      } else {
        self.CalcLeavePay.BonusTables.push(self.BonusTables);
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

      self.CalcLeavePay.DetailTables.push(self.DetailTables);
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
        self.CalcLeavePay.docnumber === 0 ||
        self.CalcLeavePay.docnumber === null ||
        self.CalcLeavePay.docnumber === undefined ||
        self.CalcLeavePay.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcLeavePay.docdate === 0 ||
        self.CalcLeavePay.docdate === null ||
        self.CalcLeavePay.docdate === undefined ||
        self.CalcLeavePay.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcLeavePay.calculationkindid === 0 ||
        self.CalcLeavePay.calculationkindid === null ||
        self.CalcLeavePay.calculationkindid === undefined ||
        self.CalcLeavePay.calculationkindid === ""
      ) {
        this.makeToast(
          this.$t("calculationkindeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

/*       if (
        self.CalcLeavePay.hracceptanceworkid === 0 ||
        self.CalcLeavePay.hracceptanceworkid === null ||
        self.CalcLeavePay.hracceptanceworkid === undefined ||
        self.CalcLeavePay.hracceptanceworkid === ""
      ) {
        this.makeToast(
          this.$t("hracceptanceworkNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */

      if (
        self.CalcLeavePay.personid === 0 ||
        self.CalcLeavePay.personid === null ||
        self.CalcLeavePay.personid === undefined ||
        self.CalcLeavePay.personid === ""
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.CalcLeavePay.employeeenrolmentid === 0 ||
        self.CalcLeavePay.employeeenrolmentid === null ||
        self.CalcLeavePay.employeeenrolmentid === undefined ||
        self.CalcLeavePay.employeeenrolmentid === ""
      ) {
        this.makeToast(
          this.$t("employeeenrolmentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcLeavePay.organizationaccountid === 0 ||
        self.CalcLeavePay.organizationaccountid === null ||
        self.CalcLeavePay.organizationaccountid === undefined ||
        self.CalcLeavePay.organizationaccountid === ""
      ) {
        this.makeToast(
          this.$t("organizationaccountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcLeavePay.bonusmonthcount === 0 ||
        self.CalcLeavePay.bonusmonthcount === null ||
        self.CalcLeavePay.bonusmonthcount === undefined ||
        self.CalcLeavePay.bonusmonthcount === ""
      ) {
        this.makeToast(
          this.$t("bonusmonthcountNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcLeavePay.roundingtypeid === 0 ||
        self.CalcLeavePay.roundingtypeid === null ||
        self.CalcLeavePay.roundingtypeid === undefined ||
        self.CalcLeavePay.roundingtypeid === ""
      ) {
        this.makeToast(
          this.$t("roundingtypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalcLeavePay.detailinfo === 0 ||
        self.CalcLeavePay.detailinfo === null ||
        self.CalcLeavePay.detailinfo === undefined ||
        self.CalcLeavePay.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.CalcLeavePay.Tables.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }
      /* if (self.CalcLeavePay.BonusTables.length === 0) {
        this.makeToast(
          this.$t("BonusTablesNotFilled"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (self.CalcLeavePay.DetailTables.length === 0) {
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
      CalcLeavePayService.Update(self.CalcLeavePay)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          self.$router.push({ name: "CalcLeavePay" });
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
<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("IHIncome") }}</h4>
            </CCol>
            <CCol>
              <div class="text-right">
                <b-form-checkbox
                  v-model="IHIncome.hasvat"
                  @change="Checkhasvat"
                  disabled
                  name="check-button1"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasvat") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="IHIncome.hasexcise"
                  @change="Checkhasexcise"
                  name="check-button2"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasexcise") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="IHIncome.hasmedical"
                  @change="Checkhasmedical"
                  name="check-button3"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasmedical") }}</b-form-checkbox
                >
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="ihincomenumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('ihincomenumber')"
                    autocomplete="ihincomenumber"
                    :label="$t('ihincomenumber')"
                    v-model="IHIncome.ihincomenumber"
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
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="ihincomedate"
                  rules="required"
                >
                  <label for="datepicker-dateformat2">{{
                    $t("ihincomedate")
                  }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="IHIncome.ihincomedate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('ihincomedate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
              <CCol sm="3">
                <custom-number-input
                  :placeholder="$t('ihincomesum')"
                  autocomplete="text"
                  :label="$t('ihincomesum')"
                  v-model="IHIncome.ihincomesum"
                  disabled
                ></custom-number-input>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="department"
                  rules="required"
                >
                  <!-- <div class="form-group form-row"> -->
                  <label for>{{ $t("department") }}</label>
                  <v-select
                    :options="departmentlist"
                    v-model="IHIncome.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol>
                <label class="col-form-label col-sm-3">{{
                  $t("ResponsiblePerson")
                }}</label>
                <div class="d-flex">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    disabled
                    v-model="IHIncome.responsiblepersonname"
                  ></CInput>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenEmployeeModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </CCol>
            </CRow>
            <CRow class="mt-2">
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
                    v-model="IHIncome.detailinfo"
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
            <CRow class="my-3">
              <CCol>
                <CCard accent-color="primary">
                  <CCardHeader>
                    <h3 class="text-center">{{ $t("buyer") }}</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol sm="4">
                        <CInput
                          disabled
                          :placeholder="$t('buyerinn')"
                          :label="$t('buyerinn')"
                          v-model="IHIncome.buyerinn"
                        ></CInput>
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyername')"
                          :label="$t('buyername')"
                          v-model="IHIncome.buyername"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyeradress')"
                          :label="$t('buyeradress')"
                          v-model="IHIncome.buyeradress"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <!--                       <CCol>
                        <CInput
                          :placeholder="$t('buyeraccountcode')"
                          :label="$t('buyeraccountcode')"
                          v-model="IHIncome.buyeraccountcode"
                        />
                      </CCol>-->
                      <CCol>
                        <ValidationProvider
                          v-slot="v"
                          name="buyeraccountcode"
                          rules="required"
                        >
                          <!-- <div class="form-group form-row"> -->
                          <label for>{{ $t("buyeraccountcode") }}</label>
                          <v-select
                            :options="accountlist"
                            @input="accountchange"
                            v-model="IHIncome.buyeraccountcode"
                            :reduce="(item) => item.code"
                            :placeholder="$t('ChooseBelow')"
                            label="code"
                          >
                            <template slot="invalid-feedback">
                              <div class="invalid-feedback">
                                {{ v.errors[0] }}
                              </div>
                            </template>
                          </v-select>
                          <!-- </div> -->
                        </ValidationProvider>
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyerbankcode')"
                          :label="$t('buyerbankcode')"
                          v-model="IHIncome.buyerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyeroked')"
                          :label="$t('buyeroked')"
                          v-model="IHIncome.buyeroked"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyervatcode')"
                          :label="$t('buyervatcode')"
                          v-model="IHIncome.buyervatcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyerfirstsign')"
                          :label="$t('buyerfirstsign')"
                          v-model="IHIncome.buyerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("buyeroblast") }}</label>
                          <v-select
                            :options="oblastlist"
                            v-model="IHIncome.buyeroblastid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                            @input="chooseregionforbuyer"
                          ></v-select>
                      </CCol>
                      <CCol v-if="!isplan">
                         <label>{{ $t("buyerregion") }} <b-spinner v-if="regionlaodingforbuyer" small></b-spinner> </label>
                          <v-select
                            :options="regionlistforbuyer"
                            v-model="IHIncome.buyerregionid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                          ></v-select>
                      </CCol>
                    </CRow>-->
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard accent-color="primary">
                  <CCardHeader>
                    <h3 class="text-center">{{ $t("seller") }}</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol sm="4">
                        <CInput
                          :placeholder="$t('sellerinn')"
                          :label="$t('sellerinn')"
                          v-model="IHIncome.sellerinn"
                          maxlength="9"
                        >
                        </CInput>
                      </CCol>
                      <CCol>
                        <label for=""> {{ $t("sellername") }} </label>
                        <CInput
                          :placeholder="$t('sellername')"
                          v-model="IHIncome.sellername"
                          class="mr-2"
                          style="width: 100%"
                          :disabled="DisabledBuyerName"
                        >
                          <template #append>
                            <CButton
                              color="primary"
                              size="sm"
                              @click="OpenContractorModal"
                            >
                              <b-icon
                                icon="three-dots"
                                v-if="!ContractorLoading"
                              ></b-icon>
                              <b-spinner
                                small
                                v-if="ContractorLoading"
                              ></b-spinner>
                            </CButton>
                          </template>
                        </CInput>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleradress')"
                          :label="$t('selleradress')"
                          v-model="IHIncome.selleradress"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleraccountcode')"
                          :label="$t('selleraccountcode')"
                          v-model="IHIncome.selleraccountcode"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerbankcode')"
                          :label="$t('sellerbankcode')"
                          v-model="IHIncome.sellerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleroked')"
                          :label="$t('selleroked')"
                          v-model="IHIncome.selleroked"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellervatcode')"
                          :label="$t('sellervatcode')"
                          v-model="IHIncome.sellervatcode"
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerfirstsign')"
                          :label="$t('sellerfirstsign')"
                          v-model="IHIncome.sellerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("selleroblast") }}</label>
                          <v-select
                            disabled
                            :options="oblastlist"
                            v-model="IHIncome.selleroblastid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                            @input="chooseregionforseller"
                          ></v-select>
                      </CCol>
                      <CCol>
                         <label>{{ $t("sellerregion") }} <b-spinner v-if="regionlaodingforseller" small></b-spinner> </label>
                          <v-select
                            disabled
                            :options="regionlistforseller"
                            v-model="IHIncome.sellerregionid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                          ></v-select>
                      </CCol>
                    </CRow>-->
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <c-row>
              <c-col>
                <ValidationProvider v-slot="v" name="contract" rules="required">
                  <!-- <div class="form-group form-row"> -->
                  <label for>{{ $t("contract") }}</label>
                  <v-select
                    :options="contractlist"
                    v-model="IHIncome.contractid"
                    @input="contractchange"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </c-col>
              <c-col></c-col>
            </c-row>
          </ValidationObserver>
        </CCardBody>
        <CRow class="mb-4">
          <CCol class="text-right">
            <CButton size="sm" color="primary" @click="OpenModal" class="mr-3">
              <b-icon icon="plus"> </b-icon>
              {{ $t("Add") }}
            </CButton>
          </CCol>
        </CRow>
        <b-modal id="AddModal" size="xl" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("contracttable") }}</template>
          <CRow>
            <CCol>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("isautocalc")
                }}</label>
                <b-form-checkbox
                  class="col-sm-9 mt-2"
                  v-model="Tables1.isautocalc"
                  name="check-button"
                  switch
                ></b-form-checkbox>
              </div>
            </CCol>
            <CCol class="text-right">
              <!-- <c-button @click="showModal('createModal',true)" size="sm" color="primary">
                <c-icon size="sm" name="cil-plus"></c-icon>
                {{$t('AddTmz')}}
              </c-button> -->
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="4">
              <CInput
                disabled
                :label="$t('ordernumber')"
                class="mb-0"
                v-model="Tables1.ordernumber"
              ></CInput>
            </CCol>
            <CCol sm="4">
              <!-- <label for="#">{{$t('inventoryholding')}}</label>
              <v-select
                :options="InventoryHoldingList"
                :reduce="item => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Tables1.inventoryholdingid"
                @input="ChangeTmz"
              ></v-select> -->
              <label>{{ $t("inventoryholding") }}</label>
              <div class="d-flex">
                <CInput
                  class="mb-0 mr-2"
                  style="width: 100%"
                  disabled
                  v-model="Tables1.goodsname"
                ></CInput>
                <b-button size="sm" variant="primary" @click="OpenTMZModal">
                  <b-icon icon="three-dots"></b-icon>
                </b-button>
              </div>
            </CCol>
            <CCol sm="4">
              <label for="#">{{ $t("unitofmeasure") }}</label>
              <v-select
                :options="unitofmeasurelist"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Tables1.unitofmeasureid"
              ></v-select>
            </CCol>
          </CRow>

          <c-row class="mt-3 mx-1" v-if="IHIncome.hasmedical">
            <c-col>
              <div
                class="row"
                style="
                  padding: 3px;
                  border: solid 1px #a4a8ab;
                  margin-top: 20px;
                "
              >
                <div class="form-check col-sm-12" style="margin-top: -17px">
                  <!--<mark style="background-color: #f5f5f5"></mark>-->

                  <span class="form-check-label" style="color: green">
                    <mark
                      style="
                        background-color: #fff;
                        color: blue;
                        font-size: 18px;
                      "
                      >{{ $t("hasmedical") }}</mark
                    >
                  </span>
                </div>

                <CRow style="width: 100%" class="mx-2 my-4">
                  <CCol sm="3">
                    <CInput
                      :label="$t('serialnumber')"
                      type="text"
                      class="mb-0"
                      v-model="Tables1.serialnumber"
                    ></CInput>
                  </CCol>
                  <CCol sm="3">
                    <ValidationProvider
                      v-slot="v"
                      name="expirationdate"
                      rules="required"
                    >
                      <label for="datepicker-dateformat2">{{
                        $t("expirationdate")
                      }}</label>

                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="Tables1.expirationdate"
                        style="width: 100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('expirationdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </ValidationProvider>
                  </CCol>
                  <CCol sm="3">
                    <label for="#">{{ $t("baseprice") }}</label>
                    <custom-number-input
                      class="mb-0"
                      v-model="Tables1.baseprice"
                      @input="Calculate"
                    ></custom-number-input>
                  </CCol>
                  <CCol sm="3">
                    <label for="#">{{ $t("profitrate") }}</label>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text
                          style="cursor: pointer"
                          :style="
                            !plus
                              ? {
                                  border: '1px solid red',
                                  backgroundColor: 'red',
                                  color: 'white',
                                }
                              : ''
                          "
                          @click="plus = !plus"
                        >
                          <strong>{{ plus ? "+" : "-" }}</strong>
                        </b-input-group-text>
                      </template>
                      <custom-number-input
                        class="mb-0"
                        style="width: auto"
                        :style="!plus ? { border: '1px solid red' } : ''"
                        @input="Calculate"
                        v-model="Tables1.profitrate"
                      ></custom-number-input>
                    </b-input-group>
                  </CCol>
                </CRow>
              </div>
            </c-col>
          </c-row>
          <CRow class="mt-3">
            <CCol sm="4">
              <label for="#">{{ $t("quantity") }}</label>
              <custom-number-input
                class="mb-0"
                v-model="Tables1.quantity"
                @input="Calculate"
              ></custom-number-input>
            </CCol>
            <!--<CCol sm="1" class="text-center mt-4" style="vertical-align:middle;font-size:24px">*</CCol>-->
            <CCol sm="4">
              <label for="#">{{ $t("price") }}</label>
              <custom-number-input
                class="mb-0"
                v-model="Tables1.price"
                :disabled="IHIncome.hasmedical"
                @input="Calculate"
              ></custom-number-input>
            </CCol>
            <CCol
              sm="3"
              class="text-center mt-4"
              style="vertical-align: middle; font-size: 20px; margin-top: 20px"
              >=
              {{
                $options.filters.currency(Tables1.sum, {
                  symbol: "",
                  fractionCount: 2,
                })
              }}</CCol
            >
          </CRow>

          <c-row class="mt-3 mx-1" v-if="IHIncome.hasexcise">
            <c-col>
              <div
                class="row"
                style="
                  padding: 3px;
                  border: solid 1px #a4a8ab;
                  margin-top: 20px;
                "
              >
                <div class="form-check col-sm-12" style="margin-top: -17px">
                  <!--<mark style="background-color: #f5f5f5"></mark>-->

                  <span class="form-check-label" style="color: green">
                    <mark
                      style="
                        background-color: #fff;
                        color: blue;
                        font-size: 18px;
                      "
                      >{{ $t("hasexcise") }}</mark
                    >
                  </span>
                </div>

                <CRow style="width: 100%" class="mx-2 my-4">
                  <CCol sm="3">
                    <label for="#">{{ $t("exciseratetype") }}</label>
                    <v-select
                      :options="ExciserateList"
                      :placeholder="$t('ChooseBelow')"
                      :reduce="(item) => item.name"
                      label="name"
                      v-model="Tables1.exciseratetype"
                      @input="Calculate"
                    ></v-select>
                  </CCol>
                  <CCol sm="3">
                    <label for>{{ $t("exciserate") }}</label>
                    <custom-number-input
                      @input="Calculate"
                      class="mb-0"
                      v-model="Tables1.exciserate"
                    ></custom-number-input>
                  </CCol>
                  <CCol sm="3">
                    <label for>{{ $t("excisesum") }}</label>
                    <custom-number-input
                      class="mb-0"
                      @input="Calculate"
                      v-model="Tables1.excisesum"
                      disabled
                    ></custom-number-input>
                  </CCol>
                  <CCol sm="3">
                    <label for="#">{{ $t("deliverysum") }}</label>
                    <custom-number-input
                      class="mb-0"
                      @input="Calculate"
                      v-model="Tables1.deliverysum"
                      :disabled="Tables1.isautocalc"
                    ></custom-number-input>
                  </CCol>
                </CRow>
              </div>
            </c-col>
          </c-row>
          <c-row class="mt-3 mx-1" v-if="IHIncome.hasvat">
            <c-col>
              <div
                class="row"
                style="
                  padding: 3px;
                  border: solid 1px #a4a8ab;
                  margin-top: 20px;
                "
              >
                <div class="form-check col-sm-12" style="margin-top: -17px">
                  <!--<mark style="background-color: #f5f5f5"></mark>-->

                  <span class="form-check-label" style="color: green">
                    <mark
                      style="
                        background-color: #fff;
                        color: blue;
                        font-size: 18px;
                      "
                      >{{ $t("hasvat") }}</mark
                    >
                  </span>
                </div>

                <CRow style="width: 100%" class="mx-2 my-4">
                  <CCol sm="4">
                    <label for="#">{{ $t("vatrate") }}</label>
                    <custom-number-input
                      class="mb-0"
                      @input="Calculate"
                      v-model="Tables1.vatrate"
                    ></custom-number-input>
                  </CCol>
                  <CCol sm="4">
                    <label for="#">{{ $t("vatsum") }}</label>
                    <custom-number-input
                      class="mb-0"
                      @input="Calculate"
                      :disabled="Tables1.isautocalc"
                      v-model="Tables1.vatsum"
                    ></custom-number-input>
                  </CCol>
                  <CCol sm="4">
                    <label for="#">{{ $t("deliverysumwithvat") }}</label>
                    <custom-number-input
                      class="mb-0"
                      @input="Calculate"
                      v-model="Tables1.deliverysumwithvat"
                      :disabled="Tables1.isautocalc"
                    ></custom-number-input>
                  </CCol>
                </CRow>
              </div>
            </c-col>
          </c-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="AddItem">
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </template>
        </b-modal>

        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle; overflow: scroll"
              bordered
              small
              responsive="sm"
              no-border-collapse
              :tbody-tr-class="rowClass"
            >
              <template #cell(quantity)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.quantity, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(price)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.price, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(exciserate)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.exciserate, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(excisesum)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.excisesum, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(deliverysum)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.deliverysum, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(vatrate)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.vatrate, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(vatsum)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.vatsum, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(deliverysumwithvat)="{ item }">
                <p class="p-0 m-0" style="word-spacing: nowrap">
                  {{
                    $options.filters.currency(item.deliverysumwithvat, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}
                </p>
              </template>
              <template #cell(goodsname)="{ item }">
                {{
                  (item.goodsname = InventoryHoldingList.filter(
                    (item1) => item1.id === item.inventoryholdingid
                  )[0].name)
                }}
              </template>
              <template #cell(unitofmeasure)="{ item }">
                {{
                  (item.unitofmeasure = unitofmeasurelist.filter(
                    (item2) => item2.id === item.unitofmeasureid
                  )[0].name)
                }}
              </template>

              <template #cell(actions)="{ item, index }">
                <div class="text-center">
                  <b-link
                    @click="EditItem(item, index)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'IHIncome' })"
              >
                <b-icon icon="arrow-left-short"></b-icon>
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
        <b-modal id="EraseWarningModal" hide-footer @close="CancelEraseTable">
          <template v-slot:modal-title>{{ $t("WantEraseTable") }}</template>
          <div class="d-block text-right">
            <CButton
              @click="CancelEraseTable"
              color="danger"
              class="mr-2"
              size="sm"
            >
              <b-icon icon="x"></b-icon>
              {{ $t("NotAccept") }}
            </CButton>
            <CButton @click="EraseTable" color="success" size="sm">
              <b-icon icon="check2"></b-icon>
              {{ $t("Approve") }}
            </CButton>
          </div>
        </b-modal>
        <b-modal
          ref="my-modal"
          size="xl"
          v-model="createModal"
          no-close-on-backdrop
          hide-footer
          hide-header
        >
          <header class="modal-header">
            <h5 class="modal-title">{{ $t("Tmz") }}</h5>
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
            <edit-tmz-component
              :show-back-button="false"
              @success="TmzCreated($event)"
            ></edit-tmz-component>
          </div>
        </b-modal>
        <b-modal
          id="modalXlContractor"
          size="xl"
          :title="$t('Contractor')"
          hide-footer
          no-close-on-backdrop
          modal-class="custom-size-modal"
        >
          <contractor-list
            @SelectedItem="SelectedItemContractor"
            @DblClick="AddContractor"
            component
          >
          </contractor-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseContractorModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddContractor(contractorvalue)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="modalXl"
          no-close-on-backdrop
          size="xl"
          :title="$t('Tmz')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <inventory-holding-list
            @SelectedItem="SelectedItem"
            @DblClick="AddPersonData"
          ></inventory-holding-list>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="CloseTMZModal">
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPersonData(personvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="modalXl1"
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
            :ondate="IHIncome.docdate"
            @SelectedItem="SelectedItem1"
            @DblClick="Enterdata"
            :isteacher="null"
          >
          </employee-list-component>
          <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
          <!-- <edit-person-component></edit-person-component> -->

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEmployeeModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddPerson">
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
import HelperService from "@/services/helper.service";
import IHIncomeService from "@/services/IHIncome.service";
import PersonService from "@/services/person.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";
import EmployeeListComponent from "@/components/EmployeeList";
import ContractorService from "@/services/Contractor.service";
import BudgetService from "@/services/Budget.service";
import DepartmentService from "@/services/Department.service";
import ContractService from "@/services/Contract.service";
import editTmzComponent from "@/views/PersonalInfo/InventoryHolding/edit";
import ContractorList from "@/components/ContractorList";
import InventoryHoldingList from "@/components/InventoryHoldingList";
export default {
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  components: {
    editTmzComponent,
    ContractorList,
    InventoryHoldingList,
    EmployeeListComponent,
  },
  data() {
    return {
      SaveLoading: false,
      editedIndex: -1,
      sum: 0,
      IHIncome: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables1: [],
      },
      honorarytitletypelist: [],
      personlist: [],
      accountlist: [],
      departmentlist: [],
      personlist: [],
      contractlist: [],
      lang: "",
      fieldsMainTable: [
        { key: "ordernumber", label: this.$t("ordernumber") },
        // {
        //   key: "inventoryholding",
        //   label: this.$t("inventoryholding")
        // },
        { key: "goodsname", label: this.$t("goodsname") },
        { key: "unitofmeasure", label: this.$t("unitofmeasure") },
        { key: "quantity", label: this.$t("quantity") },
        { key: "price", label: this.$t("price") },

        // { key: "exciseratetype", label: this.$t("exciseratetype") },
        // { key: "exciserate", label: this.$t("exciserate") },
        // { key: "excisesum", label: this.$t("excisesum") },
        // { key: "deliverysum", label: this.$t("deliverysum") },
        { key: "deliverysum", label: this.$t("deliverysum") },
        // { key: "vatrate", label: this.$t("vatrate") },
        // { key: "vatsum", label: this.$t("vatsum") },
        // { key: "deliverysumwithvat", label: this.$t("deliverysumwithvat") },

        { key: "isautocalc", label: this.$t("isautocalc") },

        // { key: "serialnumber", label: this.$t("serialnumber") },
        // { key: "expirationdate", label: this.$t("expirationdate") },
        // { key: "baseprice", label: this.$t("baseprice") },
        // { key: "profitrate", label: this.$t("profitrate") },

        { key: "actions", label: this.$t("actions") },
      ],
      itemsMainTable: [],
      Tables1: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        inventoryholdingid: 0,
        goodsname: "",
        unitofmeasureid: 0,
        quantity: 0,
        price: 0,
        exciseratetype: "",
        exciserate: 0,
        excisesum: 0,
        deliverysum: 0,
        vatrate: 0,
        vatsum: 0,
        sum: 0,
        deliverysumwithvat: 0,
        isautocalc: true,
        serialnumber: "",
        expirationdate: "",
        baseprice: 0,
        profitrate: 0,
        Status: 1,
      },
      contractorlist: [],
      addoreditrow: -1,
      unitofmeasurelist: [],
      InventoryHoldingList: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      createModal: false,
      DisabledBuyerName: true,
      contractorvalue: {},
      ContractorLoading: false,
      personvalue: {},
      personvalue1: {},
    };
  },
  created() {
    IHIncomeService.Get(this.$route.params.id).then((res) => {
      this.IHIncome = res.data;
      this.itemsMainTable = res.data.Tables;
      this.ContractList();
    });
    ContractorService.GetAll().then((res) => {
      this.contractorlist = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    InventoryHoldingService.GetAll().then((res) => {
      this.InventoryHoldingList = res.data;
    });
    HelperService.GetOrganizationData().then((res) => {
      this.orgstateinfolist = res.data;
    });
    HelperService.GetExciseRateTypeList().then((res) => {
      this.ExciserateList = res.data;
    });
    BudgetService.GetOrganizationAccountList().then((res) => {
      this.accountlist = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.departmentlist = res.data;
    });

    this.Tables1.ordernumber = this.itemsMainTable.length + 1;
  },
  computed: {},
  methods: {
    ChangeTmz() {
      if (!!this.Tables1.inventoryholdingid) {
        this.Tables1.unitofmeasureid = this.InventoryHoldingList.filter(
          (item) => item.id === this.Tables1.inventoryholdingid
        )[0].unitofmeasureid;
      } else {
        this.Tables1.unitofmeasureid = null;
      }
    },
    AddPerson() {
      this.CloseEmployeeModal();
      this.IHIncome.responsiblepersonid = this.personvalue.personid;
      this.IHIncome.responsiblepersonname = this.personvalue.personname;
    },
    SelectedItem1(value) {
      this.personvalue1 = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl1");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl1");
    },
    Enterdata(data) {
      console.log(data);
      this.IHIncome.responsiblepersonid = data.personid;
      // this.IHIncome.responsiblepersonname = data.personname;
      this.$set(this.IHIncome, "responsiblepersonname", data.personname);
      this.CloseEmployeeModal();
    },
    AddPersonData(data1) {
      var self = this;
      self.Tables1.inventoryholdingid = data1.id;
      self.Tables1.goodsname = data1.fullname;
      self.Tables1.unitofmeasure = data1.unitofmeasurename;
      self.Tables1.unitofmeasureid = this.unitofmeasurelist.filter(
        (item) => item.name === self.Tables1.unitofmeasure
      )[0].id;
      console.log(data1);
      self.CloseTMZModal();
    },
    SelectedItem(data) {
      this.personvalue = data;
    },
    OpenTMZModal() {
      this.$bvModal.show("modalXl");
    },
    CloseTMZModal() {
      this.$bvModal.hide("modalXl");
    },
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        (this.Tables1 = {
          id: 0,
          ownerid: 0,
          ordernumber: 0,
          inventoryholdingid: 0,
          goodsname: "",
          unitofmeasureid: 0,
          quantity: 0,
          price: 0,
          exciseratetype: "",
          exciserate: 0,
          excisesum: 0,
          deliverysum: 0,
          vatrate: 0,
          vatsum: 0,
          sum: 0,
          deliverysumwithvat: 0,
          isautocalc: true,
          serialnumber: "",
          expirationdate: "",
          baseprice: 0,
          profitrate: 0,
          Status: 1,
        }),
          (this.editedIndex = -1);
      });
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.itemsMainTable[this.editedIndex], this.Tables1);
        this.CalculateTotalSum();
        this.Close();
      } else {
        this.Add();
      }
    },
    AddContractor(data) {
      var vm = this;
      vm.IHIncome.sellerinn = data.inn;
      vm.IHIncome.selleradress = data.adress;
      vm.IHIncome.sellername = data.fullname;
      // console.log(vm.Contract.sellerinn)
      console.log(data.id);
      vm.ContractorLoading = true;
      ContractorService.Get(data.id, data.inn).then((res) => {
        vm.IHIncome.selleraccountcode = res.data.Accounts[0].code;
        vm.IHIncome.sellerbankcode = res.data.Accounts[0].bankcode;
        vm.IHIncome.selleroked = res.data.oked;
        vm.IHIncome.sellervatcode = res.data.vatcode;
        vm.IHIncome.sellerfirstsign = res.data.director;
        vm.ContractorLoading = false;
      });
      vm.CloseContractorModal();
      vm.ContractList();
    },
    SelectedItemContractor(value) {
      this.contractorvalue = value;
    },
    TmzCreated(data) {
      if (data.success) {
        this.showModal("createModal", false);
      }
      InventoryHoldingService.GetAll().then((res) => {
        this.InventoryHoldingList = res.data;
      });
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    checkvatcode() {
      if (this.IHIncome.sellervatcode.length > 0) {
        this.IHIncome.hasvat = true;
      } else {
        this.IHIncome.hasvat = false;
      }
    },
    OpenContractorModal() {
      this.$bvModal.show("modalXlContractor");
    },
    CloseContractorModal() {
      this.$bvModal.hide("modalXlContractor");
    },
    accountchange() {
      var self = this;
      if (!!self.IHIncome.buyeraccountcode) {
        self.IHIncome.buyerbankcode = self.accountlist.filter(
          (item) => item.code === self.IHIncome.buyeraccountcode
        )[0].bankcode;
      } else {
        self.IHIncome.buyerbankcode = "";
      }
    },
    contractchange() {
      if (!!this.IHIncome.contractid) {
        let a = {};
        a = this.contractlist.filter(
          (item) => item.id === this.IHIncome.contractid
        )[0];
        this.IHIncome.sellerinn = a.sellerinn;
        this.IHIncome.sellername = a.sellername;
        this.IHIncome.selleradress = a.selleradress;
        this.IHIncome.selleraccountcode = a.selleraccountcode;
        this.IHIncome.sellerbankcode = a.sellerbankcode;
        this.IHIncome.selleroked = a.selleroked;
        this.IHIncome.sellervatcode = a.sellervatcode;
        this.IHIncome.sellerfirstsign = a.sellerfirstsign;
        this.IHIncome.ihincomesum = a.contractsum;
        ContractService.Get(a.id).then((res) => {
          this.itemsMainTable = res.data.Tables;
          this.CalculateContractSum();
          this.itemsMainTable.forEach(function (item) {
            item.Status = 1;
          });
        });

        // console.log(a);
      } else {
        this.IHIncome.sellerinn = "";
        this.IHIncome.sellername = "";
        this.IHIncome.selleradress = "";
        this.IHIncome.selleraccountcode = "";
        this.IHIncome.sellerbankcode = "";
        this.IHIncome.selleroked = "";
        this.IHIncome.sellervatcode = "";
        this.IHIncome.sellerfirstsign = "";
      }
    },
    Calculate() {
      this.Tables1.sum = this.Tables1.quantity * this.Tables1.price;
      if (this.Tables1.isautocalc) {
        if (this.Tables1.exciseratetype === "%") {
          this.Tables1.excisesum =
            (this.Tables1.sum * this.Tables1.exciserate) / 100;
        } else {
          this.Tables1.excisesum =
            this.Tables1.quantity * this.Tables1.exciserate;
        }
        if (this.IHIncome.hasmedical) {
          if (this.plus === true) {
            this.Tables1.price =
              this.Tables1.baseprice +
              (this.Tables1.baseprice * this.Tables1.profitrate) / 100;
          } else {
            this.Tables1.price =
              this.Tables1.baseprice -
              (this.Tables1.baseprice * this.Tables1.profitrate) / 100;
          }
        }

        this.Tables1.sum = this.Tables1.quantity * this.Tables1.price;
        this.Tables1.deliverysum = this.Tables1.excisesum + this.Tables1.sum;
        if (this.IHIncome.hasexcise) {
          this.Tables1.vatsum =
            (this.Tables1.vatrate * this.Tables1.deliverysum) / 100;
        } else {
          this.Tables1.vatsum = (this.Tables1.sum * this.Tables1.vatrate) / 100;
        }
        this.Tables1.deliverysumwithvat =
          this.Tables1.deliverysum + this.Tables1.vatsum;
      }
    },
    OpenModal() {
      this.$bvModal.show("AddModal");
      this.Tables1.sum = 0;
      var number = 0;
      this.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          number++;
        }
      });
      this.Tables1.ordernumber = number + 1;
    },
    CheckInn() {
      if (!!this.IHIncome.sellerinn) {
        this.ContractList();
        this.DisabledBuyerName = true;
        ContractorService.GetByInn(this.IHIncome.sellerinn)
          .then((res) => {
            this.IHIncome.sellername = res.data.fullname;
            this.IHIncome.selleradress = res.data.adress;
            this.IHIncome.selleroked = res.data.oked;
            this.IHIncome.sellervatcode = res.data.vatcode;
            if (res.data.Accounts.length > 0) {
              this.IHIncome.selleraccountcode = res.data.Accounts[0].code;
              this.IHIncome.sellerbankcode = res.data.Accounts[0].bankcode;
            }
            this.checkvatcode();
          })
          .catch((error) => {
            this.DisabledBuyerName = false;
          });
      }
    },
    CalculateTotalSum() {
      var self = this;
      self.IHIncome.ihincomesum = 0;
      self.itemsMainTable.forEach(function (item) {
        if (item.Status != 3) {
          self.IHIncome.ihincomesum += item.deliverysumwithvat;
        }
      });
    },
    EditItem(item, index) {
      if (item.Status === 1) {
        item.Status = 1;
      } else {
        item.Status = 2;
      }
      this.Tables1.sum = item.quantity * item.price;

      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.Tables1 = Object.assign({}, item);
      this.$bvModal.show("AddModal");
      this.Calculate();
      // alert("sal")
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
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ContractList() {
      if (!!this.IHIncome.sellerinn) {
        ContractService.GetAllForIHIncome(this.IHIncome.sellerinn).then(
          (res) => {
            this.contractlist = res.data;
          }
        );
      } else {
        this.contractorlist = [];
      }
    },
    Add() {
      if (
        this.Tables1.ordernumber === 0 ||
        this.Tables1.ordernumber === null ||
        this.Tables1.ordernumber === undefined ||
        this.Tables1.ordernumber === ""
      ) {
        this.makeToast(
          this.$t("ordernumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   this.Tables1.inventoryholding === 0 ||
      //   this.Tables1.inventoryholding === null ||
      //   this.Tables1.inventoryholding === undefined ||
      //   this.Tables1.inventoryholding === ""
      // ) {
      //   this.makeToast(
      //     this.$t("inventoryholdingNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   this.Tables1.goodsname === 0 ||
      //   this.Tables1.goodsname === null ||
      //   this.Tables1.goodsname === undefined ||
      //   this.Tables1.goodsname === ""
      // ) {
      //   this.makeToast(
      //     this.$t("documentseriesNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        this.Tables1.unitofmeasureid === 0 ||
        this.Tables1.unitofmeasureid === null ||
        this.Tables1.unitofmeasureid === undefined ||
        this.Tables1.unitofmeasureid === ""
      ) {
        this.makeToast(
          this.$t("unitofmeasureNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.quantity === 0 ||
        this.Tables1.quantity === null ||
        this.Tables1.quantity === undefined ||
        this.Tables1.quantity === ""
      ) {
        this.makeToast(
          this.$t("quantityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.price === 0 ||
        this.Tables1.price === null ||
        this.Tables1.price === undefined ||
        this.Tables1.price === ""
      ) {
        this.makeToast(this.$t("priceNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      /* if (
        this.Tables1.exciseratetype === 0 ||
        this.Tables1.exciseratetype === null ||
        this.Tables1.exciseratetype === undefined ||
        this.Tables1.exciseratetype === ""
      ) {
        this.makeToast(
          this.$t("exciseratetypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      // if (
      //   this.Tables1.exciserate === 0 ||
      //   this.Tables1.exciserate === null ||
      //   this.Tables1.exciserate === undefined ||
      //   this.Tables1.exciserate === ""
      // ) {
      //   this.makeToast(
      //     this.$t("exciserateNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   this.Tables1.excisesum === 0 ||
      //   this.Tables1.excisesum === null ||
      //   this.Tables1.excisesum === undefined ||
      //   this.Tables1.excisesum === ""
      // ) {
      //   this.makeToast(
      //     this.$t("excisesumNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        this.Tables1.deliverysum === 0 ||
        this.Tables1.deliverysum === null ||
        this.Tables1.deliverysum === undefined ||
        this.Tables1.deliverysum === ""
      ) {
        this.makeToast(
          this.$t("deliverysumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (this.Tables1.vatrate != 0 && this.Tables1.vatrate != 15) {
        this.makeToast(
          this.$t("vatrateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        this.Tables1.vatsum === 0 ||
        this.Tables1.vatsum === null ||
        this.Tables1.vatsum === undefined ||
        this.Tables1.vatsum === ""
      ) {
        this.makeToast(this.$t("vatsumNotCorrect"), this.$t("Error"), "danger");
        return false;
      } */
      if (
        this.Tables1.deliverysumwithvat === 0 ||
        this.Tables1.deliverysumwithvat === null ||
        this.Tables1.deliverysumwithvat === undefined ||
        this.Tables1.deliverysumwithvat === ""
      ) {
        this.makeToast(
          this.$t("deliverysumwithvatNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      this.Tables1.goodsname = this.InventoryHoldingList.filter(
        (item) => item.id === this.Tables1.inventoryholdingid
      )[0].name;
      this.Tables1.unitofmeasure = this.unitofmeasurelist.filter(
        (item) => item.id === this.Tables1.unitofmeasureid
      )[0].name;
      var self = this;
      self.Tables1.ordernumber = self.itemsMainTable.length + 1;
      self.itemsMainTable.push(self.Tables1);

      self.Tables1 = {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        inventoryholdingid: 0,
        goodsname: "",
        unitofmeasureid: 0,
        quantity: 0,
        price: 0,
        exciseratetype: "",
        exciserate: 0,
        excisesum: 0,
        deliverysum: 0,
        vatrate: 0,
        vatsum: 0,
        deliverysumwithvat: 0,
        isautocalc: true,
        serialnumber: "",
        expirationdate: "",
        baseprice: 0,
        profitrate: 0,
        Status: 1,
      };
      this.CalculateTotalSum();
      this.CalculateContractSum();
      this.$bvModal.hide("AddModal");
    },
    DeleteItem(item) {
      var self = this;
      item.Status = 3;
      var number = 1;
      this.CalculateContractSum();
      self.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          item.ordernumber = number;
          number++;
        }
      });
      this.CalculateTotalSum();
    },

    check() {
      var self = this;
      if (
        self.IHIncome.ihincomenumber === 0 ||
        self.IHIncome.ihincomenumber === null ||
        self.IHIncome.ihincomenumber === undefined ||
        self.IHIncome.ihincomenumber === ""
      ) {
        this.makeToast(this.$t("numberNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.IHIncome.responsiblepersonid === 0 ||
        self.IHIncome.responsiblepersonid === null ||
        self.IHIncome.responsiblepersonid === undefined ||
        self.IHIncome.responsiblepersonid === ""
      ) {
        this.makeToast(
          this.$t("responsiblepersonNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.ihincomedate === 0 ||
        self.IHIncome.ihincomedate === null ||
        self.IHIncome.ihincomedate === undefined ||
        self.IHIncome.ihincomedate === ""
      ) {
        this.makeToast(
          this.$t("contractdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.detailinfo === 0 ||
        self.IHIncome.detailinfo === null ||
        self.IHIncome.detailinfo === undefined ||
        self.IHIncome.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /*       if (
        self.IHIncome.detailinfo === null ||
        self.IHIncome.detailinfo === undefined ||
        self.IHIncome.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHIncome.ihincomesum === 0 ||
        self.IHIncome.ihincomesum === null ||
        self.IHIncome.ihincomesum === undefined ||
        self.IHIncome.ihincomesum === ""
      ) {
        this.makeToast(
          this.$t("ihincomesumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.IHIncome.prepaidpercent === 0 ||
        self.IHIncome.prepaidpercent === null ||
        self.IHIncome.prepaidpercent === undefined ||
        self.IHIncome.prepaidpercent === ""
      ) {
        this.makeToast(
          this.$t("prepaidpercentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /* if (
        self.IHIncome.prepaidsum === 0 ||
        self.IHIncome.prepaidsum === null ||
        self.IHIncome.prepaidsum === undefined ||
        self.IHIncome.prepaidsum === ""
      ) {
        this.makeToast(
          this.$t("prepaidsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHIncome.buyerinn === 0 ||
        self.IHIncome.buyerinn === null ||
        self.IHIncome.buyerinn === undefined ||
        self.IHIncome.buyerinn === ""
      ) {
        this.makeToast(
          this.$t("buyerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.buyername === 0 ||
        self.IHIncome.buyername === null ||
        self.IHIncome.buyername === undefined ||
        self.IHIncome.buyername === ""
      ) {
        this.makeToast(
          this.$t("buyernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.buyeradress === 0 ||
        self.IHIncome.buyeradress === null ||
        self.IHIncome.buyeradress === undefined ||
        self.IHIncome.buyeradress === ""
      ) {
        this.makeToast(
          this.$t("buyeradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.buyeraccountcode === 0 ||
        self.IHIncome.buyeraccountcode === null ||
        self.IHIncome.buyeraccountcode === undefined ||
        self.IHIncome.buyeraccountcode === ""
      ) {
        this.makeToast(
          this.$t("buyeraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.buyerbankcode === 0 ||
        self.IHIncome.buyerbankcode === null ||
        self.IHIncome.buyerbankcode === undefined ||
        self.IHIncome.buyerbankcode === ""
      ) {
        this.makeToast(
          this.$t("buyerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.buyeroked === 0 ||
        self.IHIncome.buyeroked === null ||
        self.IHIncome.buyeroked === undefined ||
        self.IHIncome.buyeroked === ""
      ) {
        this.makeToast(
          this.$t("buyerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.IHIncome.buyervatcode === 0 ||
        self.IHIncome.buyervatcode === null ||
        self.IHIncome.buyervatcode === undefined ||
        self.IHIncome.buyervatcode === ""
      ) {
        this.makeToast(
          this.$t("buyervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHIncome.buyerfirstsign === 0 ||
        self.IHIncome.buyerfirstsign === null ||
        self.IHIncome.buyerfirstsign === undefined ||
        self.IHIncome.buyerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("buyerfirstsignNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.sellerinn === 0 ||
        self.IHIncome.sellerinn === null ||
        self.IHIncome.sellerinn === undefined ||
        self.IHIncome.sellerinn === ""
      ) {
        this.makeToast(
          this.$t("sellerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.sellername === 0 ||
        self.IHIncome.sellername === null ||
        self.IHIncome.sellername === undefined ||
        self.IHIncome.sellername === ""
      ) {
        this.makeToast(
          this.$t("sellernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.selleradress === 0 ||
        self.IHIncome.selleradress === null ||
        self.IHIncome.selleradress === undefined ||
        self.IHIncome.selleradress === ""
      ) {
        this.makeToast(
          this.$t("selleradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.selleraccountcode === 0 ||
        self.IHIncome.selleraccountcode === null ||
        self.IHIncome.selleraccountcode === undefined ||
        self.IHIncome.selleraccountcode === ""
      ) {
        this.makeToast(
          this.$t("selleraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.sellerbankcode === 0 ||
        self.IHIncome.sellerbankcode === null ||
        self.IHIncome.sellerbankcode === undefined ||
        self.IHIncome.sellerbankcode === ""
      ) {
        this.makeToast(
          this.$t("sellerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*  if (
        self.IHIncome.selleroked === 0 ||
        self.IHIncome.selleroked === null ||
        self.IHIncome.selleroked === undefined ||
        self.IHIncome.selleroked === ""
      ) {
        this.makeToast(
          this.$t("sellerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /*       if (
        self.IHIncome.sellervatcode === 0 ||
        self.IHIncome.sellervatcode === null ||
        self.IHIncome.sellervatcode === undefined ||
        self.IHIncome.sellervatcode === ""
      ) {
        this.makeToast(
          this.$t("sellervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHIncome.sellerfirstsign === 0 ||
        self.IHIncome.sellerfirstsign === null ||
        self.IHIncome.sellerfirstsign === undefined ||
        self.IHIncome.sellerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("sellerfirstsignNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHIncome.departmentid === 0 ||
        self.IHIncome.departmentid === null ||
        self.IHIncome.departmentid === undefined ||
        self.IHIncome.departmentid === ""
      ) {
        this.makeToast(
          this.$t("departmentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (this.itemsMainTable.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.CheckItemDelete();
      this.IHIncome.Tables = this.itemsMainTable;
      IHIncomeService.Update(this.IHIncome)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "IHIncome" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    },
    CalculateContractSum() {
      var self = this;
      self.IHIncome.contractsum = 0;
      self.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          self.IHIncome.contractsum += item.deliverysumwithvat;
        }
      });
      self.IHIncome.prepaidsum =
        (self.IHIncome.contractsum * self.IHIncome.prepaidpercent) / 100;
    },
    WatchAllBoolean() {
      if (this.itemsMainTable.length !== 0) {
        this.$bvModal.show("EraseWarningModal");
      }
    },
    EraseTable() {
      this.itemsMainTable.forEach(function (item) {
        item.Status = 3;
      });
      this.$bvModal.hide("EraseWarningModal");
      this.CalculateContractSum();
      this.makeToast("SuccessEraseTable", this.$t("message"), "success");
    },
    CancelEraseTable() {
      this.$bvModal.hide("EraseWarningModal");
      if (this.EraseWarning === "hasmedical") {
        // this.EraseWarning = ''
        this.IHIncome.hasmedical = !this.IHIncome.hasmedical;
      }
      if (this.EraseWarning === "hasexcise") {
        // this.EraseWarning = ''
        this.IHIncome.hasexcise = !this.IHIncome.hasexcise;
      }
      if (this.EraseWarning === "hasvat") {
        // this.EraseWarning = ''
        this.IHIncome.hasvat = !this.IHIncome.hasvat;
      }
    },
    Checkhasexcise() {
      if (
        this.itemsMainTable.length != 0 &&
        this.EraseWarning != "" &&
        this.itemsMainTable.filter((item) => item.Status === 3).length !==
          this.itemsMainTable.length
      ) {
        this.WatchAllBoolean();
      }
      this.EraseWarning = "hasexcise";
      // this.IHIncome.hasexcise = !this.IHIncome.hasexcise
    },
    Checkhasmedical() {
      if (
        this.itemsMainTable.length != 0 &&
        this.EraseWarning != "" &&
        this.itemsMainTable.filter((item) => item.Status === 3).length !==
          this.itemsMainTable.length
      ) {
        this.WatchAllBoolean();
      }
      this.EraseWarning = "hasmedical";
      // this.IHIncome.hasexcise = !this.IHIncome.hasexcise
    },
    Checkhasvat() {
      if (
        this.itemsMainTable.length != 0 &&
        this.EraseWarning != "" &&
        this.itemsMainTable.filter((item) => item.Status === 3).length !==
          this.itemsMainTable.length
      ) {
        this.WatchAllBoolean();
      }
      this.EraseWarning = "hasvat";
    },
    // changebool(item){
    //   this.WatchAllBoolean()
    //   this.EraseWarning = item
    // }
  },
  watch: {
    "IHIncome.hasmedical": {
      handler(newValue, oldValue) {
        // if(newValue != oldValue && oldValue != undefined){
        //   if(this.EraseWarning != 'hasmedical' && this.EraseWarning != ''){
        //     this.WatchAllBoolean()
        //     this.EraseWarning = 'hasmedical'
        //   }
        //   else{
        //     this.EraseWarning = 'a'
        //   }

        //   // this.IHIncome.hasmedical = oldValue
        // }
        if (newValue === true) {
          this.fieldsMainTable.splice(
            3,
            0,
            { key: "serialnumber", label: this.$t("serialnumber") },
            { key: "expirationdate", label: this.$t("expirationdate") }
          );
          this.fieldsMainTable.splice(
            6,
            0,
            { key: "baseprice", label: this.$t("baseprice") },
            { key: "profitrate", label: this.$t("profitrate") }
          );
        } else {
          if (
            this.fieldsMainTable.filter((item) => item.key === "serialnumber")
              .length != 0
          ) {
            this.fieldsMainTable.splice(3, 2);
            this.fieldsMainTable.splice(4, 2);
          }
        }
      },
    },
    "IHIncome.hasexcise": {
      handler(newValue, oldValue) {
        // if(newValue !== oldValue && oldValue != undefined){
        //   if(this.EraseWarning != 'hasexcise' && (this.EraseWarning != '')){
        //     this.WatchAllBoolean()
        //     this.EraseWarning = 'hasexcise'
        //   }
        //   else{
        //     this.EraseWarning = 'b'
        //   }
        // }
        if (newValue === true) {
          this.fieldsMainTable.splice(
            this.IHIncome.hasvat
              ? this.fieldsMainTable.length - 6
              : this.fieldsMainTable.length - 3,
            0,
            { key: "exciseratetype", label: this.$t("exciseratetype") },
            { key: "exciserate", label: this.$t("exciserate") },
            { key: "excisesum", label: this.$t("excisesum") }
          );
        } else {
          if (
            this.fieldsMainTable.filter((item) => item.key === "exciseratetype")
              .length != 0
          ) {
            this.fieldsMainTable.splice(
              this.IHIncome.hasvat
                ? this.fieldsMainTable.length - 9
                : this.fieldsMainTable.length - 6,
              3
            );
          }
        }
      },
    },
    "IHIncome.hasvat": {
      handler(newValue, oldValue) {
        if (newValue != oldValue && oldValue != undefined) {
          if (
            this.itemsMainTable.length != 0 &&
            this.EraseWarning != "" &&
            this.itemsMainTable.filter((item) => item.Status === 3).length !==
              this.itemsMainTable.length
          ) {
            this.WatchAllBoolean();
          }
          this.EraseWarning = "hasvat";
        }
        if (newValue === true) {
          this.fieldsMainTable.splice(
            this.fieldsMainTable.length - 2,
            0,
            { key: "vatrate", label: this.$t("vatrate") },
            { key: "vatsum", label: this.$t("vatsum") },
            { key: "deliverysumwithvat", label: this.$t("deliverysumwithvat") }
          );
        } else {
          if (
            this.fieldsMainTable.filter((item) => item.key === "vatrate")
              .length != 0
          ) {
            this.fieldsMainTable.splice(this.fieldsMainTable.length - 5, 3);
          }
        }
      },
    },
    plus: {
      handler() {
        this.Calculate();
      },
    },
  },
};
</script>

<style></style>

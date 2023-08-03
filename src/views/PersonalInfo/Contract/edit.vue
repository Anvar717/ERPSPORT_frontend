<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("Contract") }}</h4>
            </CCol>
            <CCol>
              <div class="text-right">
                <b-form-checkbox
                  v-model="Contract.hasvat"
                  @change="Checkhasvat"
                  disabled
                  name="check-button1"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasvat") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="Contract.hasexcise"
                  @change="Checkhasexcise"
                  name="check-button2"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasexcise") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="Contract.hasmedical"
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
                  name="contractnumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('contractnumber')"
                    autocomplete="contractnumber"
                    :label="$t('contractnumber')"
                    v-model="Contract.contractnumber"
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
                  name="contractdate"
                  rules="required"
                >
                  <label for="datepicker-dateformat2">{{
                    $t("contractdate")
                  }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="Contract.contractdate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('contractdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="startdate"
                  rules="required"
                >
                  <label for="datepicker-dateformat2">{{
                    $t("startdate")
                  }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="Contract.startdate"
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
                </ValidationProvider>
              </CCol>
              <!--               <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    :label="$t('detailinfo')"
                    v-model="Contract.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>-->
            </CRow>
            <CRow>
              <CCol sm="3">
                <custom-number-input
                  :placeholder="$t('contractsum')"
                  autocomplete="text"
                  :label="$t('contractsum')"
                  v-model="Contract.contractsum"
                  disabled
                ></custom-number-input>
              </CCol>
              <CCol sm="3">
                <custom-number-input
                  :placeholder="$t('prepaidpercent')"
                  autocomplete="text"
                  :label="$t('prepaidpercent')"
                  v-model="Contract.prepaidpercent"
                  @input="CalculateContractSum"
                ></custom-number-input>
              </CCol>
              <CCol sm="3">
                <custom-number-input
                  :placeholder="$t('prepaidsum')"
                  autocomplete="text"
                  :label="$t('prepaidsum')"
                  v-model="Contract.prepaidsum"
                  disabled
                ></custom-number-input>
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
                          v-model="Contract.buyerinn"
                        ></CInput>
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyername')"
                          :label="$t('buyername')"
                          v-model="Contract.buyername"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyeradress')"
                          :label="$t('buyeradress')"
                          v-model="Contract.buyeradress"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <!--                       <CCol>
                        <CInput
                          :placeholder="$t('buyeraccountcode')"
                          :label="$t('buyeraccountcode')"
                          v-model="Contract.buyeraccountcode"
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
                            v-model="Contract.buyeraccountcode"
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
                          v-model="Contract.buyerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyeroked')"
                          :label="$t('buyeroked')"
                          v-model="Contract.buyeroked"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyervatcode')"
                          :label="$t('buyervatcode')"
                          v-model="Contract.buyervatcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyerfirstsign')"
                          :label="$t('buyerfirstsign')"
                          v-model="Contract.buyerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("buyeroblast") }}</label>
                          <v-select
                            :options="oblastlist"
                            v-model="Contract.buyeroblastid"
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
                            v-model="Contract.buyerregionid"
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
                          v-model="Contract.sellerinn"
                          maxlength="9"
                          disabled
                        >
                          <!-- <template #append>
                            <CButton color="primary" size="sm" @click="CheckInn">
                              <b-icon icon="search"></b-icon>
                            </CButton>
                          </template> -->
                        </CInput>
                      </CCol>
                      <CCol>
                        <label for=""> {{ $t("sellername") }} </label>
                        <CInput
                          :placeholder="$t('sellername')"
                          v-model="Contract.sellername"
                          disabled
                          class="mr-2"
                          style="width: 100%"
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
                          v-model="Contract.selleradress"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleraccountcode')"
                          :label="$t('selleraccountcode')"
                          v-model="Contract.selleraccountcode"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerbankcode')"
                          :label="$t('sellerbankcode')"
                          v-model="Contract.sellerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleroked')"
                          :label="$t('selleroked')"
                          v-model="Contract.selleroked"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellervatcode')"
                          :label="$t('sellervatcode')"
                          v-model="Contract.sellervatcode"
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerfirstsign')"
                          :label="$t('sellerfirstsign')"
                          v-model="Contract.sellerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("selleroblast") }}</label>
                          <v-select
                            disabled
                            :options="oblastlist"
                            v-model="Contract.selleroblastid"
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
                            v-model="Contract.sellerregionid"
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
            <CCol class="text-right"> </CCol>
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
            <!-- <CCol sm="4">
              <label for="#">{{$t('inventoryholding')}}</label>
              <v-select
                :options="InventoryHoldingList"
                :reduce="item => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                v-model="Tables1.inventoryholdingid"
                @input="ChangeTmz"
              ></v-select>
            </CCol> -->
            <c-col sm="4">
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
            </c-col>
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

          <c-row class="mt-3 mx-1" v-if="Contract.hasmedical">
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
                              ? { backgroundColor: 'red', color: 'white' }
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
                :disabled="Contract.hasmedical"
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

          <c-row class="mt-3 mx-1" v-if="Contract.hasexcise">
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
          <c-row class="mt-3 mx-1" v-if="Contract.hasvat">
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
              <CButton
                size="sm"
                color="danger"
                class="mr-2"
                @click="$bvModal.hide('AddModal')"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
              <CButton size="sm" color="primary" @click="Add">
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
                @click="$router.push({ name: 'Contract' })"
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
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HonoraryTitleTypeService from "@/services/HonoraryTitleType.service";
import HelperService from "@/services/helper.service";
import ContractService from "@/services/Contract.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";
import ContractorService from "@/services/Contractor.service";
import BudgetService from "@/services/Budget.service";
import editTmzComponent from "@/views/PersonalInfo/InventoryHolding/edit";
import InventoryHoldingList from "@/components/InventoryHoldingList";
import ContractorList from "@/components/ContractorList";
export default {
  components: { editTmzComponent, InventoryHoldingList, ContractorList },
  data() {
    return {
      SaveLoading: false,
      sum: 0,
      Contract: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables1: [],
      },
      honorarytitletypelist: [],
      accountlist: [],
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
        isautocalc: false,
        serialnumber: "",
        expirationdate: null,
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
      personvalue: {},
      contractorvalue: {},
      ContractorLoading: false,
    };
  },
  created() {
    HonoraryTitleTypeService.GetAll().then((res) => {
      this.honorarytitletypelist = res.data;
    });

    ContractService.Get(this.$route.params.id).then((res) => {
      this.Contract = res.data;
      this.itemsMainTable = res.data.Tables;
      this.CalculateContractSum();
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
  },
  computed: {},
  methods: {
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
    AddContractor(data) {
      var vm = this;
      vm.Contract.sellerinn = data.inn;
      vm.Contract.selleradress = data.adress;
      vm.Contract.sellername = data.fullname;
      // console.log(vm.Contract.sellerinn)
      console.log(data.id);
      vm.ContractorLoading = true;
      ContractorService.Get(data.id, data.inn).then((res) => {
        vm.Contract.selleraccountcode = res.data.Accounts[0].code;
        vm.Contract.sellerbankcode = res.data.Accounts[0].bankcode;
        vm.Contract.selleroked = res.data.oked;
        vm.Contract.sellervatcode = res.data.vatcode;
        vm.Contract.sellerfirstsign = res.data.director;
        vm.ContractorLoading = false;
      });
      vm.CloseContractorModal();
    },
    SelectedItemContractor(value) {
      this.contractorvalue = id;
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
      if (this.Contract.sellervatcode.length > 0) {
        this.Contract.hasvat = true;
      } else {
        this.Contract.hasvat = false;
      }
    },
    accountchange() {
      var self = this;
      if (!!self.Contract.buyeraccountcode) {
        self.Contract.buyerbankcode = self.accountlist.filter(
          (item) => item.code === self.Contract.buyeraccountcode
        )[0].bankcode;
      } else {
        self.Contract.buyerbankcode = "";
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
        if (this.Contract.hasmedical) {
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
        if (this.Contract.hasexcise) {
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
      this.addoreditrow = -1;
      this.Tables1.sum = 0;
      var number = 0;
      this.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          number++;
        }
      });
      this.Tables1 = {
        id: 0,
        ownerid: 0,
        ordernumber: number + 1,
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
        expirationdate: null,
        baseprice: 0,
        profitrate: 0,
        Status: 1,
      };
    },
    CheckInn() {
      if (!!this.Contract.sellerinn) {
        ContractorService.GetByInn(this.Contract.sellerinn).then((res) => {
          this.Contract.sellername = res.data.fullname;
          this.Contract.selleradress = res.data.adress;
          this.Contract.selleroked = res.data.oked;
          this.Contract.sellervatcode = res.data.vatcode;
          this.Contract.selleraccountcode = res.data.Accounts[0].code;
          this.Contract.sellerbankcode = res.data.Accounts[0].bankcode;
          this.checkvatcode();
        });
      }
    },
    OpenContractorModal() {
      this.$bvModal.show("modalXlContractor");
    },
    CloseContractorModal() {
      this.$bvModal.hide("modalXlContractor");
    },
    EditItem(item, index) {
      if (item.Status === 1) {
        item.Status = 1;
      } else {
        item.Status = 2;
      }
      this.Tables1 = {
        id: item.id,
        ownerid: item.ownerid,
        ordernumber: item.ordernumber,
        inventoryholdingid: item.inventoryholdingid,
        goodsname: item.goodsname,
        unitofmeasureid: item.unitofmeasureid,
        quantity: item.quantity,
        price: item.price,
        exciseratetype: item.exciseratetype,
        exciserate: item.exciserate,
        excisesum: item.excisesum,
        deliverysum: item.deliverysum,
        vatrate: item.vatrate,
        vatsum: item.vatsum,
        deliverysumwithvat: item.deliverysumwithvat,
        isautocalc: item.isautocalc,
        serialnumber: item.serialnumber,
        expirationdate: item.expirationdate,
        sum: item.sum,
        baseprice: item.baseprice,
        profitrate: item.profitrate,
      };
      this.Tables1.sum = item.quantity * item.price;

      this.$bvModal.show("AddModal");
      this.addoreditrow = index;
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

      // this.Tables1.goodsname = this.InventoryHoldingList.filter(
      //   (item) => item.id === this.Tables1.inventoryholdingid
      // )[0].name;
      this.Tables1.unitofmeasure = this.unitofmeasurelist.filter(
        (item) => item.id === this.Tables1.unitofmeasureid
      )[0].name;
      var self = this;
      // this.itemsMainTable.push(this.Tables1);
      // (se.itemsMainTable);
      if (self.Tables1.id === 0 && self.addoreditrow == -1) {
        var addnewrow = true;
        self.itemsMainTable.forEach(function (item) {
          if (item.ordernumber === self.Tables1.ordernumber && item.id === 0) {
            item.id = self.Tables1.id;
            item.ownerid = self.Tables1.ownerid;
            item.ordernumber = self.Tables1.ordernumber;
            item.inventoryholdingid = self.Tables1.inventoryholdingid;
            item.goodsname = self.Tables1.goodsname;
            item.unitofmeasureid = self.Tables1.unitofmeasureid;
            item.quantity = self.Tables1.quantity;
            item.price = self.Tables1.price;
            item.exciseratetype = self.Tables1.exciseratetype;
            item.exciserate = self.Tables1.exciserate;
            item.excisesum = self.Tables1.excisesum;
            item.deliverysum = self.Tables1.deliverysum;
            item.vatrate = self.Tables1.vatrate;
            item.vatsum = self.Tables1.vatsum;
            item.deliverysumwithvat = self.Tables1.deliverysumwithvat;
            item.isautocalc = self.Tables1.isautocalc;
            (item.sum = self.Tables1.sum),
              (item.serialnumber = self.Tables1.serialnumber);
            item.expirationdate = self.Tables1.expirationdate;
            item.baseprice = self.Tables1.baseprice;
            item.profitrate = self.Tables1.profitrate;
            item.Status = 1;
            addnewrow = false;
          }
        });
        if (addnewrow) {
          if (!self.plus) {
            self.Tables1.profitrate = -self.Tables1.profitrate;
          }

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
            isautocalc: false,
            serialnumber: "",
            expirationdate: null,
            baseprice: 0,
            profitrate: 0,
            Status: 1,
          };
        }
      } else {
        self.itemsMainTable.forEach(function (item) {
          if (item.id === self.Tables1.id) {
            item.ordernumber = self.Tables1.ordernumber;
            item.inventoryholdingid = self.Tables1.inventoryholdingid;
            item.goodsname = self.Tables1.goodsname;
            item.unitofmeasureid = self.Tables1.unitofmeasureid;
            item.quantity = self.Tables1.quantity;
            item.price = self.Tables1.price;
            item.exciseratetype = self.Tables1.exciseratetype;
            item.exciserate = self.Tables1.exciserate;
            item.excisesum = self.Tables1.excisesum;
            item.deliverysum = self.Tables1.deliverysum;
            item.vatrate = self.Tables1.vatrate;
            item.vatsum = self.Tables1.vatsum;
            item.deliverysumwithvat = self.Tables1.deliverysumwithvat;
            (item.sum = self.Tables1.sum),
              (item.isautocalc = self.Tables1.isautocalc);
            item.serialnumber = self.Tables1.serialnumber;
            item.expirationdate = self.Tables1.expirationdate;
            item.baseprice = self.Tables1.baseprice;
            item.profitrate = self.Tables1.profitrate;
            item.Status = 2;
          }
        });
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
          isautocalc: false,
          serialnumber: "",
          expirationdate: null,
          baseprice: 0,
          profitrate: 0,
          Status: 1,
        };
      }
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
    },
    check() {
      var self = this;
      if (
        self.Contract.contractnumber === 0 ||
        self.Contract.contractnumber === null ||
        self.Contract.contractnumber === undefined ||
        self.Contract.contractnumber === ""
      ) {
        this.makeToast(
          this.$t("contractnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.contractdate === 0 ||
        self.Contract.contractdate === null ||
        self.Contract.contractdate === undefined ||
        self.Contract.contractdate === ""
      ) {
        this.makeToast(
          this.$t("contractdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /*       if (
        self.Contract.detailinfo === null ||
        self.Contract.detailinfo === undefined ||
        self.Contract.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.Contract.contractsum === 0 ||
        self.Contract.contractsum === null ||
        self.Contract.contractsum === undefined ||
        self.Contract.contractsum === ""
      ) {
        this.makeToast(
          this.$t("contractsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.Contract.prepaidpercent === 0 ||
        self.Contract.prepaidpercent === null ||
        self.Contract.prepaidpercent === undefined ||
        self.Contract.prepaidpercent === ""
      ) {
        this.makeToast(
          this.$t("prepaidpercentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /* if (
        self.Contract.prepaidsum === 0 ||
        self.Contract.prepaidsum === null ||
        self.Contract.prepaidsum === undefined ||
        self.Contract.prepaidsum === ""
      ) {
        this.makeToast(
          this.$t("prepaidsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.Contract.buyerinn === 0 ||
        self.Contract.buyerinn === null ||
        self.Contract.buyerinn === undefined ||
        self.Contract.buyerinn === ""
      ) {
        this.makeToast(
          this.$t("buyerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.buyername === 0 ||
        self.Contract.buyername === null ||
        self.Contract.buyername === undefined ||
        self.Contract.buyername === ""
      ) {
        this.makeToast(
          this.$t("buyernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.buyeradress === 0 ||
        self.Contract.buyeradress === null ||
        self.Contract.buyeradress === undefined ||
        self.Contract.buyeradress === ""
      ) {
        this.makeToast(
          this.$t("buyeradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.buyeraccountcode === 0 ||
        self.Contract.buyeraccountcode === null ||
        self.Contract.buyeraccountcode === undefined ||
        self.Contract.buyeraccountcode === ""
      ) {
        this.makeToast(
          this.$t("buyeraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.buyerbankcode === 0 ||
        self.Contract.buyerbankcode === null ||
        self.Contract.buyerbankcode === undefined ||
        self.Contract.buyerbankcode === ""
      ) {
        this.makeToast(
          this.$t("buyerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*       if (
        self.Contract.buyeroked === 0 ||
        self.Contract.buyeroked === null ||
        self.Contract.buyeroked === undefined ||
        self.Contract.buyeroked === ""
      ) {
        this.makeToast(
          this.$t("buyerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /* if (
        self.Contract.buyervatcode === 0 ||
        self.Contract.buyervatcode === null ||
        self.Contract.buyervatcode === undefined ||
        self.Contract.buyervatcode === ""
      ) {
        this.makeToast(
          this.$t("buyervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.Contract.buyerfirstsign === 0 ||
        self.Contract.buyerfirstsign === null ||
        self.Contract.buyerfirstsign === undefined ||
        self.Contract.buyerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("buyerfirstsignNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.sellerinn === 0 ||
        self.Contract.sellerinn === null ||
        self.Contract.sellerinn === undefined ||
        self.Contract.sellerinn === ""
      ) {
        this.makeToast(
          this.$t("sellerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.sellername === 0 ||
        self.Contract.sellername === null ||
        self.Contract.sellername === undefined ||
        self.Contract.sellername === ""
      ) {
        this.makeToast(
          this.$t("sellernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.selleradress === 0 ||
        self.Contract.selleradress === null ||
        self.Contract.selleradress === undefined ||
        self.Contract.selleradress === ""
      ) {
        this.makeToast(
          this.$t("selleradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.selleraccountcode === 0 ||
        self.Contract.selleraccountcode === null ||
        self.Contract.selleraccountcode === undefined ||
        self.Contract.selleraccountcode === ""
      ) {
        this.makeToast(
          this.$t("selleraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Contract.sellerbankcode === 0 ||
        self.Contract.sellerbankcode === null ||
        self.Contract.sellerbankcode === undefined ||
        self.Contract.sellerbankcode === ""
      ) {
        this.makeToast(
          this.$t("sellerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*  if (
        self.Contract.selleroked === 0 ||
        self.Contract.selleroked === null ||
        self.Contract.selleroked === undefined ||
        self.Contract.selleroked === ""
      ) {
        this.makeToast(
          this.$t("sellerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /*       if (
        self.Contract.sellervatcode === 0 ||
        self.Contract.sellervatcode === null ||
        self.Contract.sellervatcode === undefined ||
        self.Contract.sellervatcode === ""
      ) {
        this.makeToast(
          this.$t("sellervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.Contract.sellerfirstsign === 0 ||
        self.Contract.sellerfirstsign === null ||
        self.Contract.sellerfirstsign === undefined ||
        self.Contract.sellerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("sellerfirstsignNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (self.Contract.Tables.length === 0) {
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
      this.Contract.Tables = this.itemsMainTable;
      ContractService.Update(this.Contract)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "Contract" });
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
      self.Contract.contractsum = 0;
      self.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          self.Contract.contractsum += item.deliverysumwithvat;
        }
      });
      self.Contract.prepaidsum =
        (self.Contract.contractsum * self.Contract.prepaidpercent) / 100;
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
        this.Contract.hasmedical = !this.Contract.hasmedical;
      }
      if (this.EraseWarning === "hasexcise") {
        // this.EraseWarning = ''
        this.Contract.hasexcise = !this.Contract.hasexcise;
      }
      if (this.EraseWarning === "hasvat") {
        // this.EraseWarning = ''
        this.Contract.hasvat = !this.Contract.hasvat;
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
      // this.Contract.hasexcise = !this.Contract.hasexcise
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
      // this.Contract.hasexcise = !this.Contract.hasexcise
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
    "Contract.hasmedical": {
      handler(newValue, oldValue) {
        // if(newValue != oldValue && oldValue != undefined){
        //   if(this.EraseWarning != 'hasmedical' && this.EraseWarning != ''){
        //     this.WatchAllBoolean()
        //     this.EraseWarning = 'hasmedical'
        //   }
        //   else{
        //     this.EraseWarning = 'a'
        //   }

        //   // this.Contract.hasmedical = oldValue
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
          this.Tables1.expirationdate = null;
        }
      },
    },
    "Contract.hasexcise": {
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
            this.Contract.hasvat
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
              this.Contract.hasvat
                ? this.fieldsMainTable.length - 9
                : this.fieldsMainTable.length - 6,
              3
            );
          }
        }
      },
    },
    "Contract.hasvat": {
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

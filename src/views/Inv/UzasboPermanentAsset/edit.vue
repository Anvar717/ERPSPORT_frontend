<template>
  <ValidationObserver ref="form" v-slot="errors">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="cardView pb-4">
          <!-- <CCardHeader> -->
          <CRow class="mt-3">
            <CCol>
              <h4 class="text-center">
                <!--  -->
                {{ $t("PermanentAsset") }} ({{
                  $t("EditUzasboPermanentAsset")
                }})
              </h4>
              <hr />
            </CCol>
          </CRow>
          <!-- </CCardHeader> -->
          <CCardBody>
            <!-- <ValidationObserver ref="form" v-slot="errors"> -->
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="4">
                <div class="form-group">
                  <label for
                    >{{ $t("asboid")
                    }}<code color="red" style="font-size: 16px">*</code></label
                  >
                  <ValidationProvider v-slot="v" name="asboid">
                    <CInput
                      :placeholder="$t('asboid')"
                      autocomplete="asboid"
                      v-model="PermanentAssetIntake.permanentAsset.asboid"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                      disabled
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </div>
              </CCol>

              <CCol sm="4">
                <ValidationProvider v-slot="v" name="inventorynumber">
                  <CInput
                    :placeholder="$t('inventorynumber')"
                    autocomplete="inventorynumber"
                    vertical
                    :label="$t('inventorynumber')"
                    v-model="
                      PermanentAssetIntake.permanentAsset.inventorynumber
                    "
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                    disabled
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol sm="4">
                <ValidationProvider
                  v-slot="v"
                  name="subinventorynumber"
                  rules="required"
                >
                  <CInput
                    :placeholder="$t('subinventorynumber')"
                    autocomplete="subinventorynumber"
                    vertical
                    :label="$t('subinventorynumber')"
                    v-model="
                      PermanentAssetIntake.permanentAsset.subinventorynumber
                    "
                    :addInputClasses="{
                      'is-invalid': v.classes.invalid,
                      'is-valid': v.classes.valid,
                    }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">
                        {{ v.errors[0] }}
                      </div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for
                    >{{ $t("shortname")
                    }}<code color="red" style="font-size: 16px">*</code></label
                  >
                  <ValidationProvider v-slot="v" name="code" rules="required">
                    <CInput
                      :placeholder="$t('shortname')"
                      autocomplete="text"
                      v-model="PermanentAssetIntake.permanentAsset.shortname"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                      disabled
                    >
                      <!-- <template #append>
                                <CButton
                                  v-if="
                                    PermanentAsset.TranslatableColumns.includes(
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
                              </template> -->
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </div>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for
                    >{{ $t("fullname")
                    }}<code color="red" style="font-size: 16px">*</code></label
                  >
                  <ValidationProvider
                    v-slot="v"
                    name="fullname"
                    rules="required"
                  >
                    <CInput
                      :placeholder="$t('fullname')"
                      autocomplete="text"
                      v-model="PermanentAssetIntake.permanentAsset.fullname"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                      disabled
                    >
                      <!-- <template #append>
                                <CButton
                                  v-if="
                                    PermanentAsset.TranslatableColumns.includes(
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
                              </template> -->
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </div>
              </CCol>

              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="unitofmeasure"
                  rules="required"
                >
                  <div>
                    <label for>{{ $t("unitofmeasure") }}</label>
                    <v-select
                      :options="unitofmeasurelist"
                      v-model="
                        PermanentAssetIntake.permanentAsset.unitofmeasureid
                      "
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      disabled
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol sm="6">
                <ValidationProvider v-slot="v" name="pagroup" rules="required">
                  <div class="form-group">
                    <label for>{{ $t("pagroup") }}</label>
                    <v-select
                      :options="pagrouplist"
                      v-model="PermanentAssetIntake.permanentAsset.pagroupid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      disabled
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for>
                    {{ $t("deliverydate") }}
                    <code color="red" style="font-size: 16px">*</code></label
                  >
                  <custom-date-picker
                    v-model="PermanentAssetIntake.permanentAsset.deliverydate"
                    @keyup="BindValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('deliverydate')"
                    disabled
                  >
                  </custom-date-picker>
                </div>
              </CCol>

              <CCol sm="6">
                <ValidationProvider
                  v-slot="v"
                  name="pasubrroup"
                  rules="required"
                >
                  <div class="form-group">
                    <label for>{{ $t("pasubrroup") }}</label>
                    <v-select
                      :options="pasubgrouplist"
                      v-model="PermanentAssetIntake.permanentAsset.pasubrroupid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      disabled
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </v-select>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for
                    >{{ $t("implementationdate") }}
                    <code color="red" style="font-size: 16px">*</code></label
                  >
                  <custom-date-picker
                    v-model="
                      PermanentAssetIntake.permanentAsset.implementationdate
                    "
                    @keyup="BindValue2"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('implementationdate')"
                    disabled
                  >
                  </custom-date-picker>
                </div>
              </CCol>

              <CCol sm="6">
                <div class="form-group">
                  <label for>{{ $t("retirementdate") }}</label>
                  <custom-date-picker
                    v-model="PermanentAssetIntake.permanentAsset.retirementdate"
                    @keyup="BindValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('retirementdate')"
                  >
                  </custom-date-picker>
                </div>
              </CCol>
            </CRow>

            <!-- </ValidationObserver> -->
          </CCardBody>

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
                    >
                    </v-select>
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
                      color="info"
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
                color="info"
                size="sm"
                variant="outline"
              >
                <b-icon icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </template>
          </CModal>
        </CCard>

        <CCard accent-color="primary" class="pb-4">
          <CRow class="mt-3">
            <CCol>
              <h4 class="text-center">
                {{ $t("PermanentAssetAdd") }}
              </h4>
              <hr />
            </CCol>
          </CRow>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CCol sm="12">
                  <ValidationProvider v-slot="v" name="brand" rules="required">
                    <div>
                      <label for
                        >{{ $t("brand") }}
                        <code color="red" style="font-size: 16px">*</code>
                      </label>

                      <div>
                        <v-select
                          :options="brandlist"
                          v-model="PermanentAssetIntake.permanentAsset.brandid"
                          :reduce="(item) => item.id"
                          :placeholder="$t('ChooseBelow')"
                          :class="{ danger: v.errors[0] }"
                          @input="ChangeBrand"
                          label="name"
                        />
                        <div v-if="!!v.errors[0]" class="err-msg">
                          {{ v.errors[0] }}
                        </div>
                      </div>
                    </div>
                  </ValidationProvider>
                </CCol>

                <CCol sm="12">
                  <ValidationProvider
                    v-slot="v"
                    name="seriesnumber"
                    rules="required"
                  >
                    <CInput
                      :placeholder="$t('seriesnumber')"
                      autocomplete="seriesnumber"
                      vertical
                      :label="$t('seriesnumber')"
                      v-model="PermanentAssetIntake.permanentAsset.seriesnumber"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">
                          {{ v.errors[0] }}
                        </div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </CCol>

                <CCol sm="12">
                  <ValidationProvider
                    v-slot="v"
                    name="productclassification"
                    rules="required"
                  >
                    <div class="form-group">
                      <label for>{{ $t("productclassification") }}</label>
                      <v-select
                        :options="ProductclassificationList"
                        v-model="
                          PermanentAssetIntake.permanentAsset
                            .productclassificationid
                        "
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">
                            {{ v.errors[0] }}
                          </div>
                        </template>
                      </v-select>
                    </div>
                  </ValidationProvider>
                </CCol>
              </CCol>
              <CCol sm="6">
                <CCol sm="12">
                  <div class="form-group">
                    <label for>{{ $t("ismanufacturerunknown") }}</label>
                    <b-form-checkbox
                      v-model="
                        PermanentAssetIntake.permanentAsset
                          .ismanufacturerunknown
                      "
                      switch
                      class="mt-2 ml-1"
                    ></b-form-checkbox>
                  </div>
                </CCol>
                <CCol
                  sm="12"
                  v-if="
                    !PermanentAssetIntake.permanentAsset.ismanufacturerunknown
                  "
                >
                  <div class="form-group">
                    <label for>{{ $t("manufacturer") }}</label>
                    <v-select
                      :options="manufacturerlist"
                      @input="Changemanufacture"
                      v-model="
                        PermanentAssetIntake.permanentAsset.manufaturerid
                      "
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </CCol>
                <CCol
                  sm="12"
                  v-if="
                    !PermanentAssetIntake.permanentAsset.ismanufacturerunknown
                  "
                >
                  <div class="form-group">
                    <label for>{{ $t("manufacturercountry") }}</label>
                    <v-select
                      :options="ManufactureCountryList"
                      v-model="
                        PermanentAssetIntake.permanentAsset
                          .manufacturercountryid
                      "
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </CCol>
                <!-- <CCard accent-color="primary">
                  <CCardBody>
                    <CRow>
                      
                     
                    </CRow>
                  </CCardBody>
                </CCard> -->
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard accent-color="primary" class="pb-4">
          <CRow class="mt-3">
            <CCol>
              <h4 class="text-center">
                {{ $t("PermanentAssetIntake") }}
              </h4>
              <hr />
            </CCol>
          </CRow>
          <CCardBody>
            <!-- <ValidationObserver ref="form" v-slot="errors"> -->
            {{ setAllErrors(errors.errors) }}
            <b-row>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("code1") }}</label>
                <b-form-input
                  :placeholder="$t('code1')"
                  v-model="PermanentAssetIntake.docnumber"
                ></b-form-input>
              </b-col>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("docdate") }}</label>
                <date-picker
                  v-model="PermanentAssetIntake.docdate"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width:100%"
                ></date-picker>
              </b-col>

              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("SourceOfFinance") }}</label>
                <v-select
                  :options="SourceOffinanceList"
                  v-model="PermanentAssetIntake.sourceoffinanceid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("department") }}</label>
                <v-select
                  :options="DepartmentList"
                  v-model="PermanentAssetIntake.departmentid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("room") }}</label>
                <v-select
                  :options="RoomList"
                  v-model="PermanentAssetIntake.roomid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("supplier") }}</label>
                <v-select
                  :options="SupplierList"
                  v-model="PermanentAssetIntake.supplierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="innname"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="my-2">
                <label>{{ $t("responsibleperson") }}</label>
                <v-select
                  :options="ResponsiblePersonList"
                  v-model="PermanentAssetIntake.responsiblepersonid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="fullname"
                ></v-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-right">
                <b-button variant="outline-info" @click="OpenTabrowModal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-table
                  :fields="PermanentAssetIntakeTables"
                  :items="PermanentAssetIntake.PermanentAssetIntakeTables"
                  class="text-center"
                  
                  style="vertical-align:middle"
                  bordered
                  responsive
                  :tbody-tr-class="rowClass"
                  sticky-header="60vh"
                  no-border-collapse
                  small
                >
                  <template #cell(actions)="{item}">
                    <div class="text-center">
                      <b-link
                        @click="EditItem(item)"
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
              </b-col>
            </b-row>
            <b-modal
              :title="$t('PermanentAssetIntake')"
              v-model="PermanentAssetComponentModal"
              size="xl"
              modal-class="custom-size-modal"
              no-close-on-backdrop
              hide-footer
            >
              <permanent-asset-component
                @select="ChangePermanentAsset"
                :isComponent="true"
              ></permanent-asset-component>
            </b-modal>
            <b-modal
              :title="$t('PermanentAssetIntake')"
              v-model="tabrowModal"
              size="xl"
              modal-class="custom-size-modal"
              no-close-on-backdrop
              hide-footer
            >
              <b-row>
                <b-col class="my-2">
                  <label for=""> {{ $t("permanentasset") }} </label>
                  <!-- <v-select
                    :options="PermanentAssetList"
                    v-model="tabrow.permanentassetid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select> -->
                  <b-input-group>
                    <b-form-input
                      disabled
                      v-model="tabrow.permanentassetname"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        variant="outline-info"
                        disabled
                        @click="PermanentAssetComponentModal = true"
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col class="my-2">
                  <label>{{ $t("inventorynumber") }}</label>
                  <b-form-input
                    :placeholder="$t('inventory')"
                    v-model="tabrow.inventorynumber"
                    disabled
                  ></b-form-input>
                </b-col>
                <b-col class="my-2">
                  <label>{{ $t("quantity") }}</label>
                  <!-- <b-form-input :placeholder="$t('quantity')" v-model="tabrow.quantity"></b-form-input> -->
                  <custom-number-input
                    :placeholder="$t('quantity')"
                    v-model="tabrow.quantity"
                    :decimals="0"
                  >
                  </custom-number-input>
                </b-col>
                <b-col class="my-2">
                  <label>{{ $t("amount") }}</label>
                  <!-- <b-form-input :placeholder="$t('amount')" v-model="tabrow.amount"></b-form-input> -->
                  <custom-number-input
                    :placeholder="$t('amount')"
                    v-model="tabrow.amount"
                    :decimals="0"
                    disabled
                  >
                  </custom-number-input>
                </b-col>
                <b-col class="my-2">
                  <label>{{ $t("lastrepairsum") }}</label>
                  <custom-number-input
                    :placeholder="$t('lastrepairsum')"
                    v-model="tabrow.lastrepairsum"
                    :decimals="0"
                  >
                  </custom-number-input>
                  <!-- <b-form-input
                    :placeholder="$t('lastrepairsum')"
                    v-model="tabrow.lastrepairsum"
                  ></b-form-input> -->
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-tabs pills>
                    <b-tab :title="$t('PermanentAssetIntakeRepair')">
                      <b-row>
                        <b-col class="text-right">
                          <b-button
                            size="sm"
                            variant="outline-info"
                            @click="OpenTabrow1Modal"
                          >
                            <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                          </b-button>
                        </b-col>
                      </b-row>
                      <b-table
                        :fields="tabrow1Field"
                        :items="tabrow.PermanentAssetIntakeRepairTables"
                        class="text-center mt-3"
                        
                        style="vertical-align:middle"
                        bordered
                        responsive
                        :tbody-tr-class="rowClass"
                        sticky-header="60vh"
                        no-border-collapse
                        small
                      >
                        <template #cell(actions)="{item}">
                          <div class="text-center">
                            <b-link
                              @click="EditItem1(item)"
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
                    </b-tab>
                    <b-tab :title="$t('PermanentAssetIntakeMetrological')">
                      <b-row>
                        <b-col class="text-right">
                          <b-button
                            size="sm"
                            variant="outline-info"
                            @click="OpenTabrow2Modal"
                          >
                            <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                          </b-button>
                        </b-col>
                      </b-row>
                      <b-table
                        :fields="tabrow2Field"
                        :items="tabrow.PermanentAssetIntakeMetrologicalTables"
                        class="text-center mt-3"
                        
                        style="vertical-align:middle"
                        bordered
                        responsive
                        :tbody-tr-class="rowClass"
                        sticky-header="60vh"
                        no-border-collapse
                        small
                      >
                        <template #cell(actions)="{item}">
                          <div class="text-center">
                            <b-link
                              @click="EditItem2(item)"
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
                    </b-tab>
                    <!-- <b-tab :title="$t('PermanentAssetIntakeFile')">
                      <b-row>
                        <b-col class="text-right">
                          <b-button
                            size="sm"
                            @click="$refs.refInputEl.$el.click()"
                            variant="outline-info"
                          >
                            <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                          </b-button>
                          <b-form-file
                            ref="refInputEl"
                            :hidden="true"
                            plain
                            @change="ChangeFile($event)"
                          />
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col
                          sm="12"
                          md="4"
                          lg="2"
                          v-for="(file,
                          fileIndex) in tabrow.PermanentAssetIntakeFileTables"
                          :key="fileIndex"
                          v-show="file.Status != 3"
                        >
                          <b-card footer-tag="footer" class="text-center">
                            <b-card-text class="mt-4 text-center">
                              <b-icon
                                scale="4"
                                variant="primary"
                                icon="file-earmark"
                              ></b-icon>
                              <p class="mt-4 mb-0">
                                {{ file.attachmentfilename }}
                              </p>
                            </b-card-text>
                            <template #footer>
                              <b-icon
                                v-if="!file.loading"
                                @click="Download(file)"
                                class="mr-3"
                                scale="1.5"
                                style="cursor:pointer"
                                icon="cloud-download"
                              ></b-icon>
                              <b-spinner small v-if="file.loading"></b-spinner>
                              <b-icon
                                @click="DeleteItem(file)"
                                scale="1.5"
                                style="cursor:pointer"
                                icon="trash"
                              ></b-icon>
                            </template>
                          </b-card>
                        </b-col>
                      </b-row>
                    </b-tab> -->
                  </b-tabs>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">
                  <b-button
                    variant="outline-danger"
                    @click="CloseTabrowModal"
                    class="mr-2"
                  >
                    <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
                  </b-button>
                  <b-button variant="outline-success" @click="AddTabrow">
                    <b-icon icon="check"></b-icon> {{ $t("save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <b-modal
              :title="$t('PermanentAssetIntakeRepair')"
              v-model="tabrow1Modal"
              size="lg"
              no-close-on-backdrop
              hide-footer
            >
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("SourceOfFinance") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="SourceOffinanceList"
                    v-model="tabrow1.sourceoffinanceid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("organization") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="ContractorList"
                    v-model="tabrow1.contractorid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="innname"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("EquipmentConditionType") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="EquipmentConditionTypeList"
                    v-model="tabrow1.equipmentconditiontypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("RepairType") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="RepairTypeList"
                    v-model="tabrow1.repairtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("lastrepairdate") }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow1.lastrepairdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                  ></date-picker>
                </div>
              </div>
              <b-row>
                <b-col class="text-right">
                  <b-button
                    variant="outline-danger"
                    @click="CloseTabrow1Modal"
                    class="mr-2"
                  >
                    <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
                  </b-button>
                  <b-button variant="outline-success" @click="AddTabrow1">
                    <b-icon icon="check"></b-icon> {{ $t("save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <b-modal
              :title="$t('PermanentAssetIntakeRepair')"
              v-model="tabrow2Modal"
              size="lg"
              no-close-on-backdrop
              hide-footer
            >
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("certificatenumber") }}
                </label>
                <div class="col-sm-8">
                  <b-form-input
                    :placeholder="$t('certificatenumber')"
                    v-model="tabrow2.certificatenumber"
                  ></b-form-input>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("certificatedate") }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow2.certificatedate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                  ></date-picker>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("SourceOfFinance") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="SourceOffinanceList"
                    v-model="tabrow2.sourceoffinanceid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("organization") }}
                </label>
                <div class="col-sm-8">
                  <v-select
                    :options="ContractorList"
                    v-model="tabrow2.contractorid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="innname"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("expiredate") }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow2.expiredate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                  ></date-picker>
                </div>
              </div>
              <div class="form-group form-row ">
                <label class="col-form-label col-sm-4">
                  {{ $t("nextmetrologydate") }}
                </label>
                <div class="col-sm-8">
                  <date-picker
                    v-model="tabrow2.nextmetrologydate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                  ></date-picker>
                </div>
              </div>
              <b-row>
                <b-col class="text-right">
                  <b-button
                    variant="outline-danger"
                    @click="CloseTabrow2Modal"
                    class="mr-2"
                  >
                    <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
                  </b-button>
                  <b-button variant="outline-success" @click="AddTabrow2">
                    <b-icon icon="check"></b-icon> {{ $t("save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <!-- </ValidationObserver> -->
          </CCardBody>
          <b-row>
            <b-col class="d-flex justify-content-between mx-3">
              <b-button variant="outline-danger" @click="$router.back()">
                {{ $t("back") }}
              </b-button>
              <b-button variant="outline-success" @click="SaveData">
                {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </CCard>
      </CCol>
    </CRow>
  </ValidationObserver>
</template>

<script>
import HelperService from "@/services/helper.service";
import PermanentAssetIntakeService from "@/services/PermanentAssetIntake.service";
import ResponsiblePersonService from "@/services/ResponsiblePerson.service";
import RoomService from "@/services/Room.service";
import SourceOffinanceService from "@/services/SourceOfFinance.service";
import SuplierService from "@/services/Contractor.service";
import DepartmentService from "@/services/Department.service";
import EquipmentConditionTypeService from "@/services/EquipmentConditionType.service";
import RepairtypeService from "@/services/RepairType.service";
import PermanentAssetService from "@/services/PermanentAsset.service";
import FileManageService from "@/services/filemanage.service";
import CustomNumberInput from "../../../components/CustomNumberInput.vue";
import PermanentAssetComponent from "../../Inv/PermanentAsset/index.vue";

import BrandService from "@/services/Brand.service";
import CountryService from "@/services/Country.service";
import ManufacturerService from "@/services/Manufacturer.service";
import OrganizationService from "@/services/organization.service";
import PaGroupService from "@/services/PaGroup.service";
import PaSubGroupService from "@/services/PaSubGroup.service";
import ProductClassificationService from "@/services/ProductClassification.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import CustomDatePicker from "@/components/customDatePicker.vue";

export default {
  components: { CustomNumberInput, PermanentAssetComponent, CustomDatePicker },
  data() {
    return {
      SaveLoading: false,

      translatemodal: false,
      selectedrowid: 0,
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
      statelist: [],
      brandlist: [],
      countrylist: [],
      manufacturerlist: [],
      organizationlist: [],
      pagrouplist: [],
      pasubgrouplist: [],
      ProductclassificationList: [],
      unitofmeasurelist: [],
      ManufactureCountryList: [],

      PermanentAssetIntake: {
        permanentAsset: { TranslatableColumns: [] },
      },
      ResponsiblePersonList: [],
      RoomList: [],
      SourceOffinanceList: [],
      SupplierList: [],
      DepartmentList: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        permanentassetid: 0,
        permanentassetname: "",
        quantity: 0,
        amount: 0,
        lastrepairsum: 0,
        Status: 1,
        PermanentAssetIntakeRepairTables: [],
        PermanentAssetIntakeMetrologicalTables: [],
        PermanentAssetIntakeFileTables: [],
      },
      PermanentAssetIntakeTables: [
        {
          key: "permanentassetname",
          label: this.$t("permanentasset"),
          class: "text-center",
        },
        { key: "amount", label: this.$t("amount"), class: "text-center" },
        { key: "quantity", label: this.$t("quantity"), class: "text-center" },
        {
          key: "lastrepairsum",
          label: this.$t("lastrepairsum"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      tabrow1Field: [
        {
          key: "sourceoffinancename",
          label: this.$t("sourceoffinance"),
          class: "text-center",
        },
        {
          key: "contractorname",
          label: this.$t("contractor"),
          class: "text-center",
        },
        {
          key: "equipmentconditiontypename",
          label: this.$t("equipmentconditiontype"),
          class: "text-center",
        },
        {
          key: "repairtypename",
          label: this.$t("repairtype"),
          class: "text-center",
        },
        {
          key: "lastrepairdate",
          label: this.$t("lastrepairdate"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      tabrow2Field: [
        {
          key: "certificatenumber",
          label: this.$t("certificatenumber"),
          class: "text-center",
        },
        {
          key: "certificatedate",
          label: this.$t("certificatedate"),
          class: "text-center",
        },
        {
          key: "sourceoffinancename",
          label: this.$t("sourceoffinance"),
          class: "text-center",
        },
        {
          key: "contractorname",
          label: this.$t("organization"),
          class: "text-center",
        },
        {
          key: "expiredate",
          label: this.$t("expiredate"),
          class: "text-center",
        },
        {
          key: "nextmetrologydate",
          label: this.$t("nextmetrologydate"),
          class: "text-center",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      tabrow3Field: [],
      tabrowModal: false,
      tabrow1Modal: false,
      tabrow2Modal: false,
      editedIndex: -1,
      editedIndex1: -1,
      editedIndex2: -1,
      editedIndex3: -1,
      tabrow1: {
        id: 0,
        ownerid: 0,
        equipmentconditiontypeid: 0,
        equipmentconditiontypename: "",
        lastrepairdate: "",
        repairtypeid: 0,
        repairtypename: "",
        contractorid: 0,
        contractorname: "",
        sourceoffinanceid: 0,
        sourceoffinancename: "",
        Status: 1,
      },
      tabrow2: {
        id: 0,
        ownerid: 0,
        certificatenumber: "",
        certificatedate: "",
        contractorid: 0,
        contractorname: "",
        nextmetrologydate: "",
        sourceoffinanceid: 0,
        sourceoffinancename: "",
        expiredate: "",
        Status: 1,
      },
      tabrow3: {
        id: 0,
        ownerid: 0,
        attachmentfileid: "",
        attachmentfilename: "",
        attachmentfiletype: "",
        Status: 1,
      },
      EquipmentConditionTypeList: [],
      RepairTypeList: [],
      ContractorList: [],
      PermanentAssetList: [],
      PermanentAssetComponentModal: false,
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
    BrandService.GetAll().then((res) => {
      self.brandlist = res.data;
    });
    CountryService.GetAll().then((res) => {
      self.countrylist = res.data;
    });
    ManufacturerService.GetAll().then((res) => {
      self.manufacturerlist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      self.organizationlist = res.data;
    });
    PaGroupService.GetAll().then((res) => {
      self.pagrouplist = res.data;
    });
    PaSubGroupService.GetAll().then((res) => {
      self.pasubgrouplist = res.data;
    });
    ProductClassificationService.GetAll().then((res) => {
      self.ProductclassificationList = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });

    PermanentAssetIntakeService.Get(this.$route.params.id).then((res) => {
      this.PermanentAssetIntake = res.data;
      this.PermanentAssetIntake.permanentAsset.stateid = 1;
      this.PermanentAssetIntake.permanentAsset.asboid =
        self.$route.query.asboid;
      this.PermanentAssetIntake.permanentAsset.pagroupid =
        self.$route.query.pagroupid;
      this.PermanentAssetIntake.permanentAsset.pasubrroupid =
        self.$route.query.pasubrroupid;
      this.PermanentAssetIntake.permanentAsset.retirementdate =
        self.$route.query.retirementdate;
      this.PermanentAssetIntake.permanentAsset.deliverydate =
        self.$route.query.deliverydate;
      this.PermanentAssetIntake.permanentAsset.implementationdate =
        self.$route.query.implementationdate;
      this.PermanentAssetIntake.permanentAsset.unitofmeasureid =
        self.$route.query.unitofmeasureid;

      this.tabrow.inventorynumber = self.$route.query.inventorynumber;
      this.tabrow.permanentassetname = self.$route.query.permanentassetname;
      this.tabrow.amount = self.$route.query.amount;

      this.PermanentAssetIntake.permanentAsset.inventorynumber =
        self.$route.query.inventorynumber;
      this.PermanentAssetIntake.permanentAsset.fullname =
        self.$route.query.permanentassetname;
      this.PermanentAssetIntake.permanentAsset.shortname =
        self.$route.query.permanentassetname;
    });

    ResponsiblePersonService.GetAll().then((res) => {
      this.ResponsiblePersonList = res.data;
    });
    RoomService.GetAll().then((res) => {
      this.RoomList = res.data;
    });
    SourceOffinanceService.GetAll().then((res) => {
      this.SourceOffinanceList = res.data;
    });
    SuplierService.GetAll("").then((res) => {
      this.SupplierList = res.data;
      this.ContractorList = res.data;
    });
    DepartmentService.GetAll().then((res) => {
      this.DepartmentList = res.data;
    });
    EquipmentConditionTypeService.GetAll().then((res) => {
      this.EquipmentConditionTypeList = res.data;
    });
    RepairtypeService.GetAll().then((res) => {
      this.RepairTypeList = res.data;
    });
    PermanentAssetService.GetAll().then((res) => {
      this.PermanentAssetList = res.data;
    });
  },
  methods: {
    ChangeBrand(e) {
      // brandlist
      // PermanentAssetIntake.permanentAsset.brandid
      var tes = this.brandlist.filter(
        (item) => item.id == this.PermanentAssetIntake.permanentAsset.brandid
      );
      // console.log("AAAAAA", tes[0]);

      // this.PermanentAssetIntake.permanentAsset.manufacturercountryid =
      //   tes[0].manufacturerid;
      this.PermanentAssetIntake.permanentAsset.manufaturerid =
        tes[0].manufacturerid;
      // this.PermanentAssetIntake.permanentAsset.ismanufacturerunknown = true;
      this.PermanentAssetIntake.permanentAsset.productclassificationid =
        tes[0].productclassificationid;

      this.Changemanufacture();
    },
    // permmanentAsset
    Changemanufacture() {
      this.PermanentAssetIntake.permanentAsset.manufacturercountryid = 0;
      this.getManufactureCountryList();
    },
    getManufactureCountryList() {
      if (!!this.PermanentAssetIntake.permanentAsset.manufaturerid) {
        ManufacturerService.GetAllManufacturerCountry(
          this.PermanentAssetIntake.permanentAsset.manufaturerid
        ).then((res) => {
          this.ManufactureCountryList = res.data;
        });
      }
    },
    BindValue(value) {
      this.PermanentAssetIntake.permanentAsset.deliverydate = value;
    },
    BindValue2(value) {
      this.PermanentAssetIntake.permanentAsset.implementationdate = value;
    },

    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.PermanentAssetIntake.permanentAsset.Translates.filter(
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
          self.translaterow.languagename = self.languagelist.filter(function(
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
      self.PermanentAssetIntake.permanentAsset.Translates = self.PermanentAssetIntake.permanentAsset.Translates.filter(
        (x) => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach((item) => {
        self.PermanentAssetIntake.permanentAsset.Translates.push(item);
      });
      self.translatemodal = false;
    },

    //Modal
    OpenTabrowModal() {
      this.tabrow = {
        id: 0,
        ownerid: 0,
        permanentassetid: 0,
        quantity: 0,
        amount: this.$route.query.amount,
        lastrepairsum: 0,
        Status: 1,
        inventorynumber: this.$route.query.inventorynumber,
        permanentassetname: this.$route.query.permanentassetname,
        PermanentAssetIntakeRepairTables: [],
        PermanentAssetIntakeMetrologicalTables: [],
        PermanentAssetIntakeFileTables: [],
      };
      this.editedIndex = -1;
      this.tabrowModal = true;
    },
    clearTabrow() {
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          permanentassetid: 0,
          quantity: 0,
          amount: this.$route.query.amount,
          lastrepairsum: 0,
          inventorynumber: this.$route.query.inventorynumber,
          permanentassetname: this.$route.query.permanentassetname,
          Status: 1,
          PermanentAssetIntakeRepairTables: [],
          PermanentAssetIntakeMetrologicalTables: [],
          PermanentAssetIntakeFileTables: [],
        };
        this.editedIndex = -1;
      });
    },
    ChangePermanentAsset(item) {
      this.tabrow.permanentassetname = item.fullname;
      this.tabrow.permanentassetid = item.id;
      this.tabrow.inventorynumber = item.inventorynumber;
      this.PermanentAssetComponentModal = false;
    },
    CloseTabrowModal() {
      this.tabrowModal = false;
      this.clearTabrow();
    },
    AddTabrow() {
      var self = this;
      if (!this.check()) {
        return false;
      }
      if (!!this.tabrow.permanentassetid) {
        this.tabrow.permanentassetname = this.PermanentAssetList.filter(
          (item) => item.id == this.tabrow.permanentassetid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.PermanentAssetIntake.PermanentAssetIntakeTables[
            self.editedIndex
          ],
          self.tabrow
        );
      } else {
        self.PermanentAssetIntake.PermanentAssetIntakeTables.push(self.tabrow);
      }
      this.clearTabrow();
      this.tabrowModal = false;
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.PermanentAssetIntake.PermanentAssetIntakeTables.indexOf(
        item
      );
      this.tabrow = Object.assign({}, item);
      this.tabrowModal = true;
    },
    check() {
      if (!this.tabrow.quantity) {
        this.makeToast(
          this.$t("quantityNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      // if (!this.tabrow.amount) {
      //   this.makeToast(
      //     this.$t("amountNotSelected"),
      //     this.$t("message"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (!this.tabrow.lastrepairsum) {
      //   this.makeToast(
      //     this.$t("lastrepairsumNotSelected"),
      //     this.$t("message"),
      //     "danger"
      //   );
      //   return false;
      // }
      return true;
    },

    // Modal1
    OpenTabrow1Modal() {
      this.clearTabrow1();
      this.tabrow1Modal = true;
    },
    clearTabrow1() {
      this.$nextTick(() => {
        this.tabrow1 = {
          id: 0,
          ownerid: 0,
          equipmentconditiontypeid: 0,
          lastrepairdate: "",
          repairtypeid: 0,
          contractorid: 0,
          sourceoffinanceid: 0,
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    CloseTabrow1Modal() {
      this.tabrow1Modal = false;
      this.clearTabrow1();
    },
    AddTabrow1() {
      if (!this.check1()) {
        return false;
      }
      var self = this;
      if (!!this.tabrow1.equipmentconditiontypeid) {
        this.tabrow1.equipmentconditiontypename = this.EquipmentConditionTypeList.filter(
          (item) => item.id == this.tabrow1.equipmentconditiontypeid
        )[0].name;
      }
      if (!!this.tabrow1.repairtypeid) {
        this.tabrow1.repairtypename = this.RepairTypeList.filter(
          (item) => item.id == this.tabrow1.repairtypeid
        )[0].name;
      }
      if (!!this.tabrow1.contractorid) {
        this.tabrow1.contractorname = this.ContractorList.filter(
          (item) => item.id == this.tabrow1.contractorid
        )[0].fullname;
      }
      if (!!this.tabrow1.sourceoffinanceid) {
        this.tabrow1.sourceoffinancename = this.SourceOffinanceList.filter(
          (item) => item.id == this.tabrow1.sourceoffinanceid
        )[0].name;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.tabrow.PermanentAssetIntakeRepairTables[self.editedIndex1],
          self.tabrow1
        );
      } else {
        self.tabrow.PermanentAssetIntakeRepairTables.push(self.tabrow1);
      }
      this.clearTabrow1();
      this.tabrow1Modal = false;
    },
    EditItem1(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.tabrow.PermanentAssetIntakeRepairTables.indexOf(
        item
      );
      this.tabrow1 = Object.assign({}, item);
      this.tabrow1Modal = true;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check1() {
      if (!this.tabrow1.equipmentconditiontypeid) {
        this.makeToast(
          this.$t("equipmentconditiontypeNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow1.lastrepairdate) {
        this.makeToast(
          this.$t("lastrepairdateNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow1.repairtypeid) {
        this.makeToast(
          this.$t("repairtypeNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow1.contractorid) {
        this.makeToast(
          this.$t("contractorNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow1.sourceoffinanceid) {
        this.makeToast(
          this.$t("sourceoffinanceNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      return true;
    },

    //Modal2

    OpenTabrow2Modal() {
      this.clearTabrow2();
      this.tabrow2Modal = true;
    },
    clearTabrow2() {
      this.$nextTick(() => {
        this.tabrow2 = {
          id: 0,
          ownerid: 0,
          certificatenumber: "",
          certificatedate: "",
          contractorid: 0,
          nextmetrologydate: "",
          sourceoffinanceid: 0,
          expiredate: "",
          Status: 1,
        };
        this.editedIndex2 = -1;
      });
    },
    CloseTabrow2Modal() {
      this.tabrow2Modal = false;
      this.clearTabrow2();
    },
    AddTabrow2() {
      if (!this.check2()) {
        return true;
      }
      var self = this;
      if (!!this.tabrow2.contractorid) {
        this.tabrow2.contractorname = this.ContractorList.filter(
          (item) => item.id == this.tabrow2.contractorid
        )[0].fullname;
      }
      if (!!this.tabrow2.sourceoffinanceid) {
        this.tabrow2.sourceoffinancename = this.SourceOffinanceList.filter(
          (item) => item.id == this.tabrow2.sourceoffinanceid
        )[0].name;
      }
      if (self.editedIndex2 > -1) {
        Object.assign(
          self.tabrow.PermanentAssetIntakeMetrologicalTables[self.editedIndex2],
          self.tabrow2
        );
      } else {
        self.tabrow.PermanentAssetIntakeMetrologicalTables.push(self.tabrow2);
      }
      this.clearTabrow2();
      this.tabrow2Modal = false;
    },
    EditItem2(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.tabrow.PermanentAssetIntakeMetrologicalTables.indexOf(
        item
      );
      this.tabrow2 = Object.assign({}, item);
      this.tabrow2Modal = true;
    },
    check2() {
      if (!this.tabrow2.certificatenumber) {
        this.makeToast(
          this.$t("certificatenumberNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow2.certificatedate) {
        this.makeToast(
          this.$t("certificatedateNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow2.contractorid) {
        this.makeToast(
          this.$t("contractorNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow2.nextmetrologydate) {
        this.makeToast(
          this.$t("nextmetrologydateNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.tabrow2.sourceoffinanceid) {
        this.makeToast(
          this.$t("sourceoffinanceNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      return true;
    },

    //Modal3

    ChangeFile(e) {
      const file = e.target.files[0];
      var formData = new FormData();
      formData.append("attachfile", file);
      FileManageService.Attach(formData).then((res) => {
        this.tabrow3.attachmentfileid = res.data.id;
        this.tabrow3.attachmentfilename = res.data.pfiletext;
        this.tabrow3.attachmentfiletype = res.data.pfiletype;
        this.tabrow.PermanentAssetIntakeFileTables.push(this.tabrow3);
      });
    },
    Download(file) {
      file.loading = true;
      FileManageService.Get(file.attachmentfileid).then((res) => {
        this.forceFileDownload(res, file.attachmentfilename);
        file.loading = false;
      });
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },

    // Other Functions
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
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
    check0() {
      var checkCode = (code) => {
        return (
          code === 0 ||
          code === null ||
          code === undefined ||
          code === "" ||
          !Number.isInteger(Number(code)) ||
          Number(code) < 0
        );
      };

      var checkStringSpace = (string) => {
        return (
          string === 0 ||
          string === null ||
          string === undefined ||
          string === "" ||
          String(string).trim().length === 0
        );
      };

      if (checkCode(this.PermanentAssetIntake.docnumber)) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (!this.PermanentAssetIntake.departmentid) {
        this.makeToast(
          this.$t("departmentNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.PermanentAssetIntake.roomid) {
        this.makeToast(
          this.$t("roomNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.PermanentAssetIntake.responsiblepersonid) {
        this.makeToast(
          this.$t("responsiblepersonNotCorrect"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.PermanentAssetIntake.sourceoffinanceid) {
        this.makeToast(
          this.$t("sourceoffinanceNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      if (!this.PermanentAssetIntake.supplierid) {
        this.makeToast(
          this.$t("supplierNotSelected"),
          this.$t("message"),
          "danger"
        );
        return false;
      }
      return true;
    },
    checkPerrmanentAsset() {
      var self = this;

      var checkCode = (code) => {
        return (
          code === 0 ||
          code === null ||
          code === undefined ||
          code === "" ||
          !Number.isInteger(Number(code)) ||
          Number(code) < 0
        );
      };

      var checkStringSpace = (string) => {
        return (
          string === 0 ||
          string === null ||
          string === undefined ||
          string === "" ||
          String(string).trim().length === 0
        );
      };

      // if (checkCode(self.PermanentAsset.code)) {
      //   this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
      //   return false;
      // }
      if (checkCode(self.PermanentAssetIntake.permanentAsset.asboid)) {
        this.makeToast(this.$t("asboidNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (checkCode(self.PermanentAssetIntake.permanentAsset.inventorynumber)) {
        this.makeToast(
          this.$t("inventorynumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        checkStringSpace(self.PermanentAssetIntake.permanentAsset.shortname)
      ) {
        this.makeToast(
          this.$t("ShortnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (checkStringSpace(self.PermanentAssetIntake.permanentAsset.fullname)) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      // if (
      //   checkCode(self.PermanentAssetIntake.permanentAsset.subinventorynumber)
      // ) {
      //   this.makeToast(
      //     this.$t("subinventorynumberNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.PermanentAssetIntake.permanentAsset.stateid === 0 ||
      //   self.PermanentAssetIntake.permanentAsset.stateid === null ||
      //   self.PermanentAssetIntake.permanentAsset.stateid === undefined ||
      //   self.PermanentAssetIntake.permanentAsset.stateid === ""
      // ) {
      //   this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
      //   return false;
      // }

      return true;
    },
    SaveData() {
      if (!this.checkPerrmanentAsset()) {
        return false;
      }
      if (!this.check0()) {
        return false;
      }

      this.SaveLoading = true;
      PermanentAssetIntakeService.Update(this.PermanentAssetIntake)
        .then((res) => {
          this.SaveLoading = false;
          this.$router.push({ name: "PermanentAssetIntake" });
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

<style></style>

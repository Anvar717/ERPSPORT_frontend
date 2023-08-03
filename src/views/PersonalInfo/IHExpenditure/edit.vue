<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-left">{{ $t("IHExpenditure") }}</h4>
            </CCol>
            <CCol>
              <div class="text-right">
                <b-form-checkbox
                  v-model="IHExpenditure.hasvat"
                  @change="Checkhasvat"
                  disabled
                  name="check-button1"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasvat") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="IHExpenditure.hasexcise"
                  @change="Checkhasexcise"
                  name="check-button2"
                  switch
                  class="d-inline-block mr-3"
                  >{{ $t("hasexcise") }}</b-form-checkbox
                >
                <b-form-checkbox
                  v-model="IHExpenditure.hasmedical"
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
                  name="ihexpenditurenumber"
                  rules="required|max:9"
                >
                  <CInput
                    :placeholder="$t('ihexpenditurenumber')"
                    autocomplete="ihexpenditurenumber"
                    :label="$t('ihexpenditurenumber')"
                    v-model="IHExpenditure.ihexpenditurenumber"
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
                  name="IHExpendituredate"
                  rules="required"
                >
                  <label for="datepicker-dateformat2">{{
                    $t("IHExpendituredate")
                  }}</label>

                  <!-- <custom-date-input />  -->
                  <date-picker
                    v-model="IHExpenditure.ihexpendituredate"
                    style="width:100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('ihexpendituredate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </date-picker>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <ValidationProvider
                  v-slot="v"
                  name="expendituretype"
                  rules="required"
                >
                  <!-- <div class="form-group form-row"> -->
                  <label for>{{ $t("expendituretype") }}</label>
                  <v-select
                    :options="expendituretypelist"
                    v-model="IHExpenditure.expendituretypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    ><!--@input="expendituretypechange"-->
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
              <CCol sm="6">
                <custom-number-input
                  :placeholder="$t('ihexpendituresum')"
                  autocomplete="text"
                  :label="$t('ihexpendituresum')"
                  v-model="IHExpenditure.ihexpendituresum"
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
                    v-model="IHExpenditure.departmentid"
                    @input="GetIHForDocument"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    :disabled="DisabledItem()"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                  <!-- </div> -->
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <!-- <ValidationProvider
                  v-slot="v"
                  name="ResponsiblePerson"
                  rules="required"
                >
                  <label for>{{ $t("ResponsiblePerson") }}</label>
                  <v-select
                    :options="personlist"
                    v-model="IHExpenditure.responsiblepersonid"
                    :reduce="(item) => item.id"
                    @input="GetIHForDocument"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    :disabled="DisabledItem()"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider> -->
                <label class="col-form-label col-sm-3">{{
                  $t("ResponsiblePerson")
                }}</label>
                <div class="d-flex">
                  <CInput
                    class="mb-0 mr-2"
                    style="width:100%"
                    disabled
                    v-model="IHExpenditure.responsiblepersonname"
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
                    v-model="IHExpenditure.detailinfo"
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
                    <h3 class="text-center">
                      {{
                        IHExpenditure.expendituretypeid != 0
                          ? expendituretypelist.filter(
                              (el) => el.id == IHExpenditure.expendituretypeid
                            )[0].isforotherorganization
                            ? $t("seller")
                            : expendituretypelist.filter(
                                (el) => el.id == IHExpenditure.expendituretypeid
                              )[0].name
                          : $t("IHExpenditure")
                      }}
                    </h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol sm="4">
                        <CInput
                          :placeholder="$t('sellerinn')"
                          :label="$t('sellerinn')"
                          v-model="IHExpenditure.sellerinn"
                          disabled
                          maxlength="9"
                        ></CInput>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellername')"
                          :label="$t('sellername')"
                          v-model="IHExpenditure.sellername"
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleradress')"
                          :label="$t('selleradress')"
                          v-model="IHExpenditure.selleradress"
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <label for>{{ $t("selleraccountcode") }}</label>
                        <v-select
                          :options="accountlist"
                          @input="accountchange"
                          v-model="IHExpenditure.selleraccountcode"
                          :reduce="(item) => item.code"
                          :placeholder="$t('ChooseBelow')"
                          label="code"
                        ></v-select>
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerbankcode')"
                          :label="$t('sellerbankcode')"
                          disabled
                          v-model="IHExpenditure.sellerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('selleroked')"
                          :label="$t('selleroked')"
                          v-model="IHExpenditure.selleroked"
                          disabled
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellervatcode')"
                          :label="$t('sellervatcode')"
                          v-model="IHExpenditure.sellervatcode"
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('sellerfirstsign')"
                          :label="$t('sellerfirstsign')"
                          v-model="IHExpenditure.sellerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("selleroblast") }}</label>
                          <v-select
                            disabled
                            :options="oblastlist"
                            v-model="IHExpenditure.selleroblastid"
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
                            v-model="IHExpenditure.sellerregionid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                          ></v-select>
                      </CCol>
                    </CRow>-->
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol
                v-if="
                  IHExpenditure.expendituretypeid != 0
                    ? expendituretypelist.filter(
                        (el) => el.id == IHExpenditure.expendituretypeid
                      )[0].isforotherorganization
                    : false
                "
              >
                <!-- v-for="" -->
                <CCard accent-color="primary">
                  <CCardHeader>
                    <h3 class="text-center">{{ $t("buyer") }}</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol sm="4">
                        <CInput
                          :placeholder="$t('buyerinn')"
                          :label="$t('buyerinn')"
                          v-model="IHExpenditure.buyerinn"
                        >
                          <template #append>
                            <CButton
                              color="primary"
                              size="sm"
                              @click="CheckInn"
                              :disabled="innLoading"
                            >
                              <b-icon icon="search" v-if="!innLoading"></b-icon>
                              <b-spinner v-if="innLoading" small></b-spinner>
                            </CButton>
                          </template>
                        </CInput>
                      </CCol>
                      <CCol>
                        <CInput
                          :disabled="DisabledBuyerName"
                          :placeholder="$t('buyername')"
                          :label="$t('buyername')"
                          v-model="IHExpenditure.buyername"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyeradress')"
                          :label="$t('buyeradress')"
                          v-model="IHExpenditure.buyeradress"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <!--                       <CCol>
                        <CInput
                          :placeholder="$t('buyeraccountcode')"
                          :label="$t('buyeraccountcode')"
                          v-model="IHExpenditure.buyeraccountcode"
                        />
                      </CCol>-->
                      <CCol>
                        <CInput
                          :placeholder="$t('buyeraccountcode')"
                          :label="$t('buyeraccountcode')"
                          v-model="IHExpenditure.buyeraccountcode"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyerbankcode')"
                          :label="$t('buyerbankcode')"
                          v-model="IHExpenditure.buyerbankcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyeroked')"
                          :label="$t('buyeroked')"
                          v-model="IHExpenditure.buyeroked"
                        />
                      </CCol>
                      <CCol>
                        <CInput
                          disabled
                          :placeholder="$t('buyervatcode')"
                          :label="$t('buyervatcode')"
                          v-model="IHExpenditure.buyervatcode"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CInput
                          :placeholder="$t('buyerfirstsign')"
                          :label="$t('buyerfirstsign')"
                          v-model="IHExpenditure.buyerfirstsign"
                        />
                      </CCol>
                    </CRow>

                    <!-- <CRow>
                      <CCol>
                          <label>{{ $t("buyeroblast") }}</label>
                          <v-select
                            :options="oblastlist"
                            v-model="IHExpenditure.buyeroblastid"
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
                            v-model="IHExpenditure.buyerregionid"
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
        <c-row class="mx-3 mb-2">
          <CCol>
            <ValidationProvider v-slot="v" name="contract" rules="required">
              <!-- <div class="form-group form-row"> -->
              <label for>{{ $t("contract") }}</label>
              <v-select
                :options="contractlist"
                v-model="IHExpenditure.contractid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
                ><!--@input="contractchange"-->
                <template slot="invalid-feedback">
                  <div class="invalid-feedback">{{ v.errors[0] }}</div>
                </template>
              </v-select>
              <!-- </div> -->
            </ValidationProvider>
          </CCol>
          <c-col></c-col>
        </c-row>
        <!-- ADD BUTTON -->
        <CRow class="mb-4">
          <CCol class="text-right">
            <CButton size="sm" color="primary" @click="OpenModal" class="mr-3">
              <b-icon icon="plus"> </b-icon>
              {{ $t("Add") }}
            </CButton>
          </CCol>
        </CRow>
        <vs-popup
          fullscreen
          :title="$t('contracttable')"
          :active.sync="AddModal"
        >
          <b-row class="mx-1">
            <b-col
              cols="5"
              style="border:1px solid;height:80vh;overflow-y:scroll"
              class="p-0"
            >
              <b-row>
                <b-col>
                  <c-input
                    class="mx-1 my-1"
                    size="sm"
                    v-model="search"
                    @keyup="Search"
                    :placeholder="$t('search')"
                  ></c-input>
                </b-col>
              </b-row>
              <vs-table multiple v-model="selected1" :data="FirstTableItems">
                <template slot="thead">
                  <vs-th
                    v-for="(th, indexth) in FirstTableFields"
                    :key="indexth"
                    class="text-left"
                    style="backgroundColor : #eee"
                    >{{ th.label }}</vs-th
                  >
                </template>

                <template slot-scope="{ data }">
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td :data="tr.inventoryholdingname">{{
                      tr.inventoryholdingname
                    }}</vs-td>

                    <vs-td :data="tr.measurename">{{ tr.measurename }}</vs-td>

                    <vs-td :data="tr.quantity">{{ tr.quantity }}</vs-td>

                    <vs-td :data="tr.price">{{
                      $options.filters.currency(tr.price, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</vs-td>
                    <vs-td :data="tr.docsum">{{
                      $options.filters.currency(tr.docsum, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </b-col>
            <b-col cols="2">
              <div
                class="d-flex align-items-center justify-content-center"
                style="height:100%"
              >
                <b-button-group size="sm">
                  <b-button variant="primary" @click="MoveToFirst">
                    <b-icon icon="chevron-double-left"></b-icon>
                  </b-button>
                  <b-button variant="primary" @click="MoveToSecond">
                    <b-icon icon="chevron-double-right"></b-icon>
                  </b-button>
                </b-button-group>
              </div>
            </b-col>
            <b-col
              cols="5"
              style="border:1px solid;height:80vh;overflow-y:scroll"
              class="p-0"
            >
              <vs-table multiple v-model="selected2" :data="SecondTableItems">
                <template slot="thead">
                  <vs-th
                    v-for="(th, indexth) in SecondTableFields"
                    :key="indexth"
                    style="backgroundColor : #eee"
                    >{{ th.label }}</vs-th
                  >
                </template>

                <template slot-scope="{ data }">
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                    v-show="tr.Status != 3"
                  >
                    <vs-td :data="tr.inventoryholdingname">{{
                      tr.inventoryholdingname || tr.goodsname
                    }}</vs-td>

                    <vs-td :data="tr.unitofmeasurename">{{
                      tr.unitofmeasurename ||
                        unitofmeasurelist.filter(
                          (item) => item.id === tr.unitofmeasureid
                        )[0].name
                    }}</vs-td>

                    <vs-td :data="tr.quantity">
                      <b-form-input
                        v-model="tr.quantity"
                        @keyup="CheckMax(tr)"
                        size="sm"
                      ></b-form-input>
                    </vs-td>

                    <vs-td :data="tr.price">{{
                      $options.filters.currency(tr.price, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</vs-td>
                    <vs-td :data="tr.docsum">{{
                      $options.filters.currency(tr.price * tr.quantity, {
                        symbol: "",
                        fractionCount: 2,
                      })
                    }}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </b-col>
          </b-row>

          <div class="text-center mx-auto">
            <CButton size="sm" color="danger" class="mr-2" @click="Close">
              <b-icon icon="arrow-left-short" ></b-icon>
              {{ $t("back") }}
            </CButton>
            <CButton size="sm" color="primary" @click="AddItem">
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </div>
        </vs-popup>
        <CRow class="mx-2 mb-3">
          <CCol>
            <vs-table :data="itemsMainTable" style="border:1px solid #eee">
              <template slot="thead">
                <vs-th
                  v-for="(th, indexth) in fieldsMainTable"
                  :key="indexth"
                  style="backgroundColor : #eee"
                  >{{ th.label }}</vs-th
                >
              </template>

              <template slot-scope="{ data }">
                <vs-tr
                  :key="indextr"
                  v-for="(tr, indextr) in data"
                  v-show="tr.Status != 3"
                >
                  <vs-td :data="tr.goodsname">{{ tr.goodsname }}</vs-td>

                  <vs-td :data="tr.unitofmeasure">
                    {{
                      unitofmeasurelist.filter(
                        (item2) => item2.id === tr.unitofmeasureid
                      )[0].name
                    }}
                  </vs-td>

                  <vs-td :data="tr.quantity">{{ tr.quantity }}</vs-td>
                  <vs-td :data="tr.price">{{
                    $options.filters.currency(tr.price, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}</vs-td>
                  <vs-td :data="tr.deliverysumwithvat">{{
                    $options.filters.currency(tr.price * tr.quantity, {
                      symbol: "",
                      fractionCount: 2,
                    })
                  }}</vs-td>
                  <vs-td :data="tr.actions">
                    <div class="text-left">
                      <b-link
                        @click="EditItem(tr, indextr)"
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Edit') }"
                      >
                        <b-icon icon="pencil" ></b-icon>
                      </b-link>
                      <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="DeleteItem(tr, indextr)"
                      >
                        <b-icon icon="trash" ></b-icon>
                      </b-link>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'IHExpenditure' })"
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
          id="modalXl"
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list-component
          :isteacher="null"
            :ondate="IHExpenditure.docdate"
            @SelectedItem="SelectedItem"
            @DblClick="Enterdata"
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
import { mapState } from "vuex";
import HelperService from "@/services/helper.service";
import IHExpenditureService from "@/services/IHExpenditure.service";
import ExpenditureTypeService from "@/services/ExpenditureType.service";
import PersonService from "@/services/person.service";
import EmployeeListComponent from "@/components/EmployeeList";
import DepartmentService from "@/services/Department.service";
import ContractService from "@/services/Contract.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";
import ContractorService from "@/services/Contractor.service";
import BudgetService from "@/services/Budget.service";
import ReportIHService from "@/services/ReportIH.service";
import { parse } from "@babel/core";
export default {
   components: { EmployeeListComponent },
  props: {
    persontypeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      SaveLoading: false,
      AddModal: false,
      editedIndex: 0,
      search: "",
      sum: 0,
      firstTableAllCheck: false,
      secondTableAllCheck: false,
      IHExpenditure: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables: [],
      },
      FirstTableFields: [
        // { key: "selected1" },
        { key: "inventoryholdingname", label: this.$t("goodsname") },
        { key: "measurename", label: this.$t("unitofmeasurename") },
        { key: "quantity", label: this.$t("quantity") },
        { key: "price", label: this.$t("price") },
        { key: "docsum", label: this.$t("docsum") },
      ],
      SecondTableFields: [
        // { key: "selected2" },
        { key: "goodsname", label: this.$t("goodsname") },
        {
          key: "unitofmeasure",
          label: this.$t("unitofmeasurename"),
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
        },
        {
          key: "price",
          label: this.$t("price"),
        },
        {
          key: "deliverysumwithvat",
          label: this.$t("docsum"),
        },
      ],
      FirstTableItems: [],
      SecondTableItems: [],
      personlist: [],
      accountlist: [],
      departmentlist: [],
      expendituretypelist: [],
      contractlist: [],
      personlist: [],
      lang: "",
      fieldsMainTable: [
        {
          key: "goodsname",
          label: this.$t("goodsname"),
        },
        {
          key: "unitofmeasure",
          label: this.$t("unitofmeasurename"),
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
        },
        {
          key: "price",
          label: this.$t("price"),
        },
        {
          key: "deliverysumwithvat",
          label: this.$t("docsum"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      itemsMainTable: [],
      Tables: {},
      unitofmeasurelist: [],
      InventoryHoldingList: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      createModal: false,
      selected1: [],
      selected2: [],
      HelperFirstTableItems: [],
      innLoading: false,
      DisabledBuyerName: true,
    };
  },
  created() {
    IHExpenditureService.Get(this.$route.params.id).then((res) => {
      this.IHExpenditure = res.data;
      this.itemsMainTable = res.data.Tables;
      if (this.$route.params.id != 0) {
        this.GetIHForDocument();
      }
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    InventoryHoldingService.GetAll().then((res) => {
      this.InventoryHoldingList = res.data;
    });
    ExpenditureTypeService.GetAll().then((res) => {
      this.expendituretypelist = res.data;
    });
    HelperService.GetOrganizationData().then((res) => {
      this.orgstateinfolist = res.data;
    });
    HelperService.GetExciseRateTypeList().then((res) => {
      this.ExciserateList = res.data;
    });
    console.log(
      this.expendituretypelist.filter(
        (item) => item.id === IHExpenditure.expendituretypeid
      )
    );
    /*     ContractService.GetAll().then((res) => {
      this.contractlist = res.data;
    }); */
    DepartmentService.GetAll().then((res) => {
      this.departmentlist = res.data;
    });
    BudgetService.GetOrganizationAccountList().then((res) => {
      this.accountlist = res.data;
    });
  },

  computed: {},
  mounted() {},
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddPerson() {
      this.CloseEmployeeModal();
      this.IHExpenditure.responsiblepersonid = this.personvalue.personid;
      this.IHExpenditure.responsiblepersonname = this.personvalue.personname;
    },
     SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    Enterdata(data){
      this.IHExpenditure.responsiblepersonid = data.personid
      this.IHExpenditure.responsiblepersonname = data.personname
      this.CloseEmployeeModal()
    },
    DisabledItem() {
      if (this.itemsMainTable.filter((item) => item.Status != 3).length > 0) {
        return true;
      } else {
        return false;
      }
    },

    CheckMax(item) {
      if (item.maxquantity < item.quantity) {
        item.quantity = item.maxquantity;
        item.restquantity = item.maxquantity - item.quantity;
      }
      if (item.quantity < 0) {
        item.quantity = 0;
      }
      this.Changequantity(item);
    },
    DeleteItem(item, index) {
      item.Status = 3;
      item.inventoryholdingname = item.goodsname;
      item.measurename = item.unitofmeasure;
      item.docsum = item.deliverysumwithvat;
      item.ihmanageid = item.frombaseihmanageid;
      let helper = this.FirstTableItems.filter(
        (el) => el.ihmanageid === item.ihmanageid
      );
      if (helper.length > 0) {
        //helper[0].quantity += parseFloat(item.quantity);
        // helper[0].docsum += parseFloat(item.docsum);
        helper[0].quantity += item.quantity;
      } else {
        item.restquantity = item.maxquantity - item.quantity;
        this.itemsMainTable.push(item);
      }
      if (item.quantity < item.maxquantity && item.quantity > 0) {
        // var vm = this
        console.log(item);
        // item.quantity = item.maxquantity - item.quantity
        // console.log(item.quantity)
        // this.FirstTableItems.push(item)
        this.itemsMainTable.push({
          Status: 1,
          deliverysumwithvat: item.deliverysumwithvat,
          departmentid: item.departmentid,
          departmentname: item.departmentname,
          docsum: item.docsum,
          goodsname: item.goodsname,
          ihmanageid: item.ihmanageid,
          inventoryholdingid: item.inventoryholdingid,
          inventoryholdingname: item.inventoryholdingname,
          maxquantity: item.quantity,
          measureid: item.measureid,
          measurename: item.measurename,
          ownerid: item.ownerid,
          price: item.price,
          quantity: item.maxquantity - item.quantity,
          responsiblepersonid: item.responsiblepersonid,
          responsiblepersonname: item.responsiblepersonname,
          restquantity: item.restquantity,
          unitofmeasure: item.unitofmeasure,
          unitofmeasureid: item.unitofmeasureid,
          unitofmeasurename: item.unitofmeasurename,
        });
        console.log(this.FirstTableItems);
      }
      this.CalculateTotalSum();
    },

    Search() {
      this.FirstTableItems = this.HelperFirstTableItems;
      this.FirstTableItems = this.FirstTableItems.filter((item) =>
        item.inventoryholdingname.includes(this.search)
      );
    },
    Changequantity(item) {
      item.docsum = item.quantity * item.price;
      item.deliverysumwithvat = item.docsum;
    },
    GetIHForDocument() {
      ReportIHService.GetIHForDocument(
        this.IHExpenditure.ihexpendituredate,
        this.IHExpenditure.departmentid,
        this.IHExpenditure.responsiblepersonid,
        "",
        true,
        this.IHExpenditure.id,
        (this.IHExpenditure.TableID = 0)
      ).then((res) => {
        this.FirstTableItems = res.data;
        this.HelperFirstTableItems = res.data;
      });
    },
    ChangeSecondTableAllCheck() {
      if (this.secondTableAllCheck === true) {
        this.$refs.selectableTable2.selectAllRows();
      } else {
        this.$refs.selectableTable2.clearSelected();
      }
    },
    DisabledItem() {
      if (this.itemsMainTable.filter((item) => item.Status != 3).length > 0) {
        return true;
      } else {
        return false;
      }
    },
    ChangeFirstTableAllCheck() {
      if (this.firstTableAllCheck === true) {
        this.$refs.selectableTable1.selectAllRows();
      } else {
        this.$refs.selectableTable1.clearSelected();
      }
    },
    MoveToSecond() {
      console.log(this.selected1);
      for (let i = 0; i < this.selected1.length; i++) {
        let item = this.selected1[i];
        item.Status = 1;
        item.ownerid = 0;
        item.maxquantity = item.quantity;
        item.unitofmeasure = item.measurename;
        item.quantity = item.quantity;
        item.unitofmeasurename = item.measurename;
        item.unitofmeasureid = item.measureid;
        item.goodsname = item.inventoryholdingname;
        item.fromihmanageid = item.ihmanageid;
        item.baseihmanageid = item.ihmanageid;
        item.frombaseihmanageid = item.ihmanageid;
        item.deliverysumwithvat = item.docsum;
        item.restquantity = item.maxquantity - item.quantity;

        let helper = this.SecondTableItems.filter(
          (el) =>
            el.ihmanageid === item.ihmanageid ||
            el.frombaseihmanageid === item.frombaseihmanageid
        );
        if (helper.length > 0) {
          helper[0].quantity += item.quantity;
          // helper[0].docsum += parseFloat(item.docsum);
        } else {
          this.SecondTableItems.push(item);
        }

        this.FirstTableItems.splice(this.FirstTableItems.indexOf(item), 1);
      }
      console.log(this.FirstTableItems);
      this.HelperFirstTableItems = this.FirstTableItems;
      this.selected1 = [];
    },
    MoveToFirst() {
      var self = this;
      self.selected2.forEach(function(item) {
        item.inventoryholdingname = item.goodsname;
        item.measurename = item.unitofmeasurename;
        item.measurename = item.unitofmeasure;
        item.measureid = item.unitofmeasureid;
        item.ihmanageid = item.fromihmanageid;
        item.docsum = item.deliverysumwithvat;
        self.FirstTableItems.push(item);
        self.SecondTableItems.splice(self.SecondTableItems.indexOf(item), 1);
      });
      this.HelperFirstTableItems = this.FirstTableItems;
      self.selected2 = [];
    },
    Close() {
      this.AddModal = false;
      this.selected1 = [];
      this.selected2 = [];
    },
    AddItem() {
      var self = this;
      self.SecondTableItems.filter(function(item) {
        if (item.quantity < item.maxquantity && item.quantity > 0) {
          // var vm = this
          // console.log(item);
          item.quantity = item.maxquantity - item.quantity;
          // console.log(item.quantity);
          self.FirstTableItems.push(item);
          // console.log(self.FirstTableItems);
        }
      });
      if (this.editedIndex === 0) {
        for (let h = 0; h < this.SecondTableItems.length; h++) {
          let item = this.SecondTableItems[h];
          let helper = this.itemsMainTable.filter(
            (el) =>
              el.frombaseihmanageid === item.frombaseihmanageid &&
              el.Status != 3
          );
          // console.log(helper);
          if (helper.length > 0) {
            // helper[0].restquantity = parseFloat(helper[0].restquantity)
            item.quantity = item.maxquantity - item.quantity;
            helper[0].quantity += item.quantity;
          } else {
            item.quantity = item.maxquantity - item.quantity;
            item.restquantity = item.maxquantity - item.quantity;
            this.itemsMainTable.push(item);
          }
          /*           if (item.quantity < item.restquantity && item.quantity > 0) {
            let a = item;
            a.quantity =
              parseFloat(item.restquantity) - parseFloat(item.quantity);
            this.FirstTableItems.push(a);
          } */
        }
      }
      if (this.editedIndex === 1) {
        // for(let h = 0; h < this.SecondTableItems.length; h ++){
        //     let item = this.SecondTableItems[h]
        //     if(item.quantity > item.restquantity && item.restquantity > 0){
        //       let a = item
        //       a.quantity = parseFloat(item.quantity) - parseFloat(item.restquantity)
        //       this.FirstTableItems.push(a)
        //     }
        // }
        this.itemsMainTable = [].concat(this.SecondTableItems);
      }
      this.CalculateTotalSum();
      this.SecondTableItems = [];
      this.Close();
      console.log(this.itemsMainTable);
    },
    CalculateTotalSum() {
      // var self = this;
      this.IHExpenditure.ihexpendituresum = 0;
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        let item = this.itemsMainTable[i];
        if (item.Status != 3) {
          this.IHExpenditure.ihexpendituresum += parseFloat(
            item.deliverysumwithvat
          );
        }
      }
      // alert("OK");
    },
    OpenModal() {
      this.AddModal = true;
      this.editedIndex = 0;
      this.SecondTableItems = [];
    },

    EditItem(item, index) {
      item.Status = 2;
      this.AddModal = true;
      this.editedIndex = 1;
      this.SecondTableItems = this.itemsMainTable;
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
    checkvatcode() {
      if (this.IHExpenditure.buyervatcode.length > 0) {
        this.IHExpenditure.hasvat = true;
      } else {
        this.IHExpenditure.hasvat = false;
      }
    },
    contractchange() {
      if (!!this.IHExpenditure.contractid) {
        let a = {};
        a = this.contractlist.filter(
          (item) => item.id === this.IHExpenditure.contractid
        )[0];
        this.IHExpenditure.sellerinn = a.sellerinn;
        this.IHExpenditure.sellername = a.sellername;
        this.IHExpenditure.selleradress = a.selleradress;
        this.IHExpenditure.selleraccountcode = a.selleraccountcode;
        this.IHExpenditure.sellerbankcode = a.sellerbankcode;
        this.IHExpenditure.selleroked = a.selleroked;
        this.IHExpenditure.sellervatcode = a.sellervatcode;
        this.IHExpenditure.sellerfirstsign = a.sellerfirstsign;
        this.IHExpenditure.IHExpendituresum = a.contractsum;
        ContractService.Get(a.id).then((res) => {
          this.itemsMainTable = res.data.Tables;
          this.CalculateContractSum();
          this.itemsMainTable.forEach(function(item) {
            item.Status = 1;
          });
        });

        // console.log(a);
      } else {
        this.IHExpenditure.sellerinn = "";
        this.IHExpenditure.sellername = "";
        this.IHExpenditure.selleradress = "";
        this.IHExpenditure.selleraccountcode = "";
        this.IHExpenditure.sellerbankcode = "";
        this.IHExpenditure.selleroked = "";
        this.IHExpenditure.sellervatcode = "";
        this.IHExpenditure.sellerfirstsign = "";
        this.checkvatcode();
      }
    },

    accountchange() {
      var self = this;
      if (!!self.IHExpenditure.selleraccountcode) {
        self.IHExpenditure.sellerbankcode = self.accountlist.filter(
          (item) => item.code === self.IHExpenditure.selleraccountcode
        )[0].bankcode;
      } else {
        self.IHExpenditure.sellerbankcode = "";
      }
    },
    CheckInn() {
      if (!!this.IHExpenditure.buyerinn) {
        this.DisabledBuyerName = true;
        this.innLoading = true;
        ContractorService.GetByInn(this.IHExpenditure.buyerinn)
          .then((res) => {
            this.innLoading = false;
            this.makeToast(
              this.$t("FoundInfoByInn"),
              this.$t("message"),
              "success"
            );
            this.IHExpenditure.buyername = res.data.fullname;
            this.IHExpenditure.buyeradress = res.data.adress;
            this.IHExpenditure.buyeroked = res.data.oked;
            this.IHExpenditure.buyervatcode = res.data.vatcode;
            this.IHExpenditure.buyeraccountcode = res.data.Accounts[0].code;
            this.IHExpenditure.buyerbankcode = res.data.Accounts[0].bankcode;
            this.checkvatcode();
          })
          .catch((error) => {
            this.innLoading = false;
            this.DisabledBuyerName = false;
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      }
    },
    CalculateContractSum() {
      var self = this;
      self.IHExpenditure.contractsum = 0;
      self.itemsMainTable.forEach(function(item) {
        if (item.Status !== 3) {
          self.IHExpenditure.contractsum += item.deliverysumwithvat;
        }
      });
      self.IHExpenditure.prepaidsum =
        (self.IHExpenditure.contractsum * self.IHExpenditure.prepaidpercent) /
        100;
    },

    WatchAllBoolean() {
      if (this.itemsMainTable.length !== 0) {
        this.$bvModal.show("EraseWarningModal");
      }
    },
    EraseTable() {
      this.itemsMainTable.forEach(function(item) {
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
        this.IHExpenditure.hasmedical = !this.IHExpenditure.hasmedical;
      }
      if (this.EraseWarning === "hasexcise") {
        // this.EraseWarning = ''
        this.IHExpenditure.hasexcise = !this.IHExpenditure.hasexcise;
      }
      if (this.EraseWarning === "hasvat") {
        // this.EraseWarning = ''
        this.IHExpenditure.hasvat = !this.IHExpenditure.hasvat;
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
      // this.IHExpenditure.hasexcise = !this.IHExpenditure.hasexcise
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
      // this.IHExpenditure.hasexcise = !this.IHExpenditure.hasexcise
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
    check() {
      var self = this;
      if (
        self.IHExpenditure.ihexpenditurenumber === 0 ||
        self.IHExpenditure.ihexpenditurenumber === null ||
        self.IHExpenditure.ihexpenditurenumber === undefined ||
        self.IHExpenditure.ihexpenditurenumber === ""
      ) {
        this.makeToast(
          this.$t("contractnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHExpenditure.ihexpendituredate === 0 ||
        self.IHExpenditure.ihexpendituredate === null ||
        self.IHExpenditure.ihexpendituredate === undefined ||
        self.IHExpenditure.ihexpendituredate === ""
      ) {
        this.makeToast(
          this.$t("contractdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHExpenditure.ihexpendituresum === 0 ||
        self.IHExpenditure.ihexpendituresum === null ||
        self.IHExpenditure.ihexpendituresum === undefined ||
        self.IHExpenditure.ihexpendituresum === ""
      ) {
        this.makeToast(this.$t("sumNotCorrect"), this.$t("Error"), "danger");
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
      this.IHExpenditure.Tables = this.itemsMainTable;
      IHExpenditureService.Update(this.IHExpenditure)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "IHExpenditure" });
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
  watch: {
    "IHExpenditure.hasmedical": {
      handler(newValue, oldValue) {
        // if(newValue != oldValue && oldValue != undefined){
        //   if(this.EraseWarning != 'hasmedical' && this.EraseWarning != ''){
        //     this.WatchAllBoolean()
        //     this.EraseWarning = 'hasmedical'
        //   }
        //   else{
        //     this.EraseWarning = 'a'
        //   }

        //   // this.IHExpenditure.hasmedical = oldValue
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
    "IHExpenditure.hasexcise": {
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
            this.IHExpenditure.hasvat
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
              this.IHExpenditure.hasvat
                ? this.fieldsMainTable.length - 9
                : this.fieldsMainTable.length - 6,
              3
            );
          }
        }
      },
    },
    "IHExpenditure.hasvat": {
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
  watch: {
    AddModal: {
      handler(newValue, OldValue) {
        if (newValue === false) {
          if (this.editedIndex === 0) {
            this.FirstTableItems = this.FirstTableItems.concat(
              this.SecondTableItems
            );
          }
        }
      },
    },
  },
};
</script>

<style></style>

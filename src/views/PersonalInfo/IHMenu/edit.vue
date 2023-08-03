<template>
  <CRow>
    <CCol>
      <ValidationObserver ref="form" v-slot="errors">
        {{setAllErrors(errors.errors)}}
        <CRow class="my-3">
          <CCol>
            <CCard accent-color="primary">
              <CCardHeader>
                <h3 class="text-center">{{$t('IHMenu')}}</h3>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <ValidationProvider v-slot="v" name="ihmenunumber" rules="required|max:9">
                      <CInput
                        :placeholder="$t('ihmenunumber')"
                        autocomplete="ihmenunumber"
                        :label="$t('ihmenunumber')"
                        v-model="IHMenu.ihmenunumber"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="ihmenudate" rules="required">
                      <label for="datepicker-dateformat2">{{$t('ihmenudate')}}</label>

                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="IHMenu.ihmenudate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('ihmenudate')"
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
                  <CCol sm="3">
                    <custom-number-input
                      :placeholder="$t('ihmenusum')"
                      autocomplete="text"
                      :label="$t('ihmenusum')"
                      v-model="IHMenu.ihmenusum"
                    ></custom-number-input>
                  </CCol>
                  <CCol>
                    <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                      <CInput
                        :placeholder="$t('detailinfo')"
                        autocomplete="detailinfo"
                        :label="$t('detailinfo')"
                        v-model="IHMenu.detailinfo"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <ValidationProvider v-slot="v" name="kitchen" rules="required">
                      <!-- <div class="form-group form-row"> -->
                      <label for>{{$t('kitchen')}}</label>
                      <v-select
                        :options="kitchenlist"
                        v-model="IHMenu.kitchenid"
                        :reduce="item => item.id"
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
                    <ValidationProvider v-slot="v" name="department" rules="required">
                      <!-- <div class="form-group form-row"> -->
                      <label for>{{$t('department')}}</label>
                      <v-select
                        :options="departmentlist"
                        v-model="IHMenu.departmentid"
                        :reduce="item => item.id"
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
                </CRow>
                <br />
                <CRow>
                  <CCol>
                    <ValidationProvider v-slot="v" name="templatename" rules="required">
                      <CInput
                        :placeholder="$t('templatename')"
                        autocomplete="templatename"
                        :label="$t('templatename')"
                        v-model="IHMenu.templatename"
                        :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <div class="form-group form-row">
                      <label class="col-form-label col-xs-1" for>{{$t('istemplate')}}</label>
                      <b-form-checkbox
                        class="col-sm-9 mt-1 text-center"
                        v-model="IHMenu.istemplate"
                        name="check-button"
                        switch
                      ></b-form-checkbox>
                    </div>
                  </CCol>
                  <CCol>
                    <div class="form-group form-row">
                      <label class="col-form-label col-xs-1" for>{{$t('isadditional')}}</label>
                      <b-form-checkbox
                        class="col-sm-9 mt-1 text-center"
                        v-model="IHMenu.isadditional"
                        name="check-button"
                        switch
                      ></b-form-checkbox>
                    </div>
                  </CCol>
                </CRow>
                <c-row class="mt-3 mx-1">
                  <c-col sm="4" class="pr-4">
                    <div class="row" style="padding: 3px;border:solid 1px #a4a8ab">
                      <div class="form-check col-sm-12" style="margin-top: -17px;">
                        <!--<mark style="background-color: #f5f5f5"></mark>-->

                        <span class="form-check-label" style="color: green; ">
                          <mark
                            style="background-color: #fff;color:blue;font-size:18px"
                          >{{$t('menutype')}}</mark>
                        </span>
                      </div>

                      <CRow  class="mt-2" style="width:100%">
                        <CCol >
                          
                          <b-table
                            :fields="IHMenuTablesIHMenuByType"
                            :items="IHMenu.TablesIHMenuByType"
                            class="bg-color-table text-center mx-3"
                            style="vertical-align:middle"
                            bordered
                            
                            :tbody-tr-class="rowClass"
                             @row-clicked="rowclickIHMenuByType"
                          >
                            <template v-slot:thead-top>
                              <b-tr>
                                <b-th style="width:50%">
                                  <v-select
                                    :options="menutypelist"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    v-model="tablesihmenubytypetabrow.menutypeid"
                                  ></v-select>
                                </b-th>
                                <b-th style="width:30%">
                                  <custom-number-input  v-model="tablesihmenubytypetabrow.personcount" ></custom-number-input>
                                </b-th>
                                <b-th style="width:20%">
                                  <CButton
                                    size="sm"
                                    color="primary"
                                    variant="outline"
                                    @click="AddTablesIHMenuByTypeRow"
                                  >
                                    <b-icon icon="plus"> </b-icon>
                                    {{ $t("Add") }}
                                  </CButton>
                                </b-th>
                              </b-tr>
                            </template>
                            <template v-slot:cell(menutype)="{item}">
                              <p v-if="item.Status == 0">{{item.menutype}}</p>
                              <v-select
                                v-if="item.Status == 1 || item.Status == 2"
                                :options="menutypelist"
                                :reduce="item => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                v-model="item.menutypeid"
                              ></v-select>
                            </template>
                            <template v-slot:cell(personcount)="{ item }">
                              <p v-if="item.Status == 0">{{ item.personcount }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.personcount"
                              ></CInput>
                            </template>
                            <template v-slot:cell(actions)="{ item }">
                              <CButtonGroup class="mx-auto d-block text-center" size="sm">
                                <CButton variant="outline" color="primary" @click="EditRow(item)">
                                  <b-icon icon="pencil"></b-icon>
                                </CButton>
                                <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                                  <b-icon icon="x"></b-icon>
                                </CButton>
                              </CButtonGroup>
                            </template>
                          </b-table>
                        </CCol>
                      </CRow>
                    </div>
                  </c-col>
                  <c-col sm="8" class="pl-4">
                    <div class="row" style="padding: 3px;border:solid 1px #a4a8ab">
                      <div class="form-check col-sm-12" style="margin-top: -17px;">
                        <span class="form-check-label" style="color: green; ">
                          <mark
                            style="background-color: #fff;color:blue;font-size:18px"
                          >{{$t('menutype')}}</mark>
                        </span>
                      </div>

                      <CRow class="mt-2">
                        <c-col>
                          <b-table
                            :fields="IHMenuDish"
                            :items="IHMenu.IHMenuDish"
                            class="bg-color-table text-center mx-3"
                            style="vertical-align:middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                           

                          >
                            <template v-slot:thead-top>
                              <b-tr>
                                <b-th style="width:14%">
                                  <v-select
                                    :options="dishlist"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    v-model="tabrow1.dishid"
                                  ></v-select>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.dishoutputsz"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.dietnumber"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.personcount"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.calorie"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.protein"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput autocomplete="text" class="mb-0" v-model="tabrow1.fat"></CInput>
                                </b-th>
                                <b-th style="width : 10%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow1.carbohydrate"
                                  ></CInput>
                                </b-th>
                                <b-th style="width:4%">
                                  <CButton
                                    size="sm"
                                    color="primary"
                                    variant="outline"
                                    @click="AddRow1"
                                  >
                                    <b-icon icon="plus"> </b-icon>
                                  </CButton>
                                </b-th>
                              </b-tr>
                            </template>

                            <template v-slot:cell(dishname)="{item}">
                              <p v-if="item.Status == 0">{{item.dishname}}</p>
                              <v-select
                                v-if="item.Status == 1 || item.Status == 2"
                                :options="dishlist"
                                :reduce="item => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                v-model="item.dishid"
                                class="mb-0"
                              ></v-select>
                            </template>
                            <template v-slot:cell(dishoutputsz)="{ item }">
                              <p v-if="item.Status == 0">{{ item.dishoutputsz }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.dishoutputsz"
                              ></CInput>
                            </template>
                            <template v-slot:cell(dietnumber)="{ item }">
                              <p v-if="item.Status == 0">{{ item.dietnumber }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.dietnumber"
                              ></CInput>
                            </template>
                            <template v-slot:cell(personcount)="{ item }">
                              <p v-if="item.Status == 0">{{ item.personcount }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.personcount"
                              ></CInput>
                            </template>
                            <template v-slot:cell(calorie)="{ item }">
                              <p v-if="item.Status == 0">{{ item.calorie }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.calorie"
                              ></CInput>
                            </template>
                            <template v-slot:cell(protein)="{ item }">
                              <p v-if="item.Status == 0">{{ item.protein }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.protein"
                              ></CInput>
                            </template>
                            <template v-slot:cell(fat)="{ item }">
                              <p v-if="item.Status == 0">{{ item.fat }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.fat"
                              ></CInput>
                            </template>
                            <template v-slot:cell(carbohydrate)="{ item }">
                              <p v-if="item.Status == 0">{{ item.carbohydrate }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.carbohydrate"
                              ></CInput>
                            </template>
                            <template v-slot:cell(actions)="{ item }">
                              <CButtonGroup
                                v-if="IHMenu.CanSave"
                                class="mx-auto d-block text-center"
                                size="sm"
                              >
                                <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                                  <b-icon icon="x"></b-icon>
                                </CButton>
                              </CButtonGroup>
                            </template>
                          </b-table>
                        </c-col>
                      </CRow>
                    </div>
                  </c-col>
                </c-row>
                <c-row class="mt-3 mx-1">
                  
                </c-row>
                <c-row class="mt-3 mx-1">
                  <c-col>
                    <div class="row" style="padding: 3px;border:solid 1px #a4a8ab;margin-top:20px">
                      <div class="form-check col-sm-12" style="margin-top: -17px;">
                        <!--<mark style="background-color: #f5f5f5"></mark>-->

                        <span class="form-check-label" style="color: green; ">
                          <mark
                            style="background-color: #fff;color:blue;font-size:18px"
                          >{{$t('IHMenuDishTable')}}</mark>
                        </span>
                      </div>

                      <CRow style="width:100%" class="mx-2 my-4">
                        <c-col>
                          <b-table
                            :fields="IHMenuDishTable"
                            :items="IHMenu.IHMenuDishTable"
                            class="bg-color-table text-center tdpadding mx-3"
                            style="vertical-align:middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:thead-top>
                              <b-tr>
                                <b-th style="width : 30%">
                                  <v-select
                                    :options="InventoryHoldingList"
                                    :reduce="(item) => item.id"
                                    :placeholder="$t('ChooseBelow')"
                                    label="name"
                                    v-model="tabrow2.inventoryholdingid"
                                  ></v-select>
                                </b-th>
                                <b-th style="width :8%">
                                  <CInput autocomplete="text" class="mb-0" v-model="tabrow2.norm"></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput autocomplete="text" class="mb-0" v-model="tabrow2.fact"></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.personcount"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.totalfact"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput autocomplete="text" class="mb-0" v-model="tabrow2.price"></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.totalsum"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.restquantity"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.calorie"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.protein"
                                  ></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput autocomplete="text" class="mb-0" v-model="tabrow2.fat"></CInput>
                                </b-th>
                                <b-th style="width : 8%">
                                  <CInput
                                    autocomplete="text"
                                    class="mb-0"
                                    v-model="tabrow2.carbohydrate"
                                  ></CInput>
                                </b-th>
                                <b-th style="width:4%">
                                  <CButton
                                    size="sm"
                                    color="primary"
                                    variant="outline"
                                    @click="AddRow2"
                                  >
                                    <b-icon icon="plus"> </b-icon>
                                  </CButton>
                                </b-th>
                              </b-tr>
                            </template>

                            <template v-slot:cell(inventoryholdingname)="{item}">
                              <p v-if="item.Status == 0">{{item.inventoryholdingname}}</p>
                              <v-select
                                v-if="item.Status == 1 || item.Status == 2"
                                :options="inventoryholdinglist"
                                :reduce="item => item.id"
                                :placeholder="$t('ChooseBelow')"
                                label="name"
                                v-model="item.inventoryholdingid"
                                class="mb-2"
                              ></v-select>
                            </template>
                            <template v-slot:cell(norm)="{ item }">
                              <p v-if="item.Status == 0">{{ item.norm }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.norm"
                              ></CInput>
                            </template>
                            <template v-slot:cell(fact)="{ item }">
                              <p v-if="item.Status == 0">{{ item.fact }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.fact"
                              ></CInput>
                            </template>
                            <template v-slot:cell(personcount)="{ item }">
                              <p v-if="item.Status == 0">{{ item.personcount }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.personcount"
                              ></CInput>
                            </template>
                            <template v-slot:cell(totalfact)="{ item }">
                              <p v-if="item.Status == 0">{{ item.totalfact }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.totalfact"
                              ></CInput>
                            </template>
                            <template v-slot:cell(price)="{ item }">
                              <p v-if="item.Status == 0">{{ item.price }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.price"
                              ></CInput>
                            </template>
                            <template v-slot:cell(totalsum)="{ item }">
                              <p v-if="item.Status == 0">{{ item.totalsum }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.totalsum"
                              ></CInput>
                            </template>
                            <template v-slot:cell(restquantity)="{ item }">
                              <p v-if="item.Status == 0">{{ item.restquantity }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.restquantity"
                              ></CInput>
                            </template>
                            <template v-slot:cell(calorie)="{ item }">
                              <p v-if="item.Status == 0">{{ item.calorie }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.calorie"
                              ></CInput>
                            </template>
                            <template v-slot:cell(protein)="{ item }">
                              <p v-if="item.Status == 0">{{ item.protein }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.protein"
                              ></CInput>
                            </template>
                            <template v-slot:cell(fat)="{ item }">
                              <p v-if="item.Status == 0">{{ item.fat }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.fat"
                              ></CInput>
                            </template>
                            <template v-slot:cell(carbohydrate)="{ item }">
                              <p v-if="item.Status == 0">{{ item.carbohydrate }}</p>
                              <CInput
                                v-if="item.Status == 2 || item.Status == 1"
                                autocomplete="text"
                                class="mb-0"
                                v-model="item.carbohydrate"
                              ></CInput>
                            </template>
                            <template v-slot:cell(actions)="{ item }">
                              <CButtonGroup
                                v-if="IHMenu.CanSave"
                                class="mx-auto d-block text-center"
                                size="sm"
                              >
                                <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                                  <b-icon icon="x"></b-icon>
                                </CButton>
                              </CButtonGroup>
                            </template>
                          </b-table>
                        </c-col>
                      </CRow>
                    </div>
                  </c-col>
                </c-row>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </ValidationObserver>
      <CRow>
        <CCol>
          <div class="text-left">
            <CButton class="ml-4" size="sm" color="danger" @click="$router.push({name : 'IHMenu'})">
              <b-icon icon="arrow-left-short" ></b-icon>
              {{$t('back')}}
            </CButton>
          </div>
        </CCol>
        <CCol>
          <div class="text-right">
            <CButton size="sm" color="success" class="mr-4" @click="SaveData">
              <b-spinner v-if="SaveLoading" small></b-spinner>
              <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import DishService from "@/services/Dish.service";
import KitchenService from "@/services/Kitchen.service";
import MenuTypeService from "@/services/MenuType.service";
import IHMenuService from "@/services/IHMenu.service";
import PersonService from "@/services/person.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import InventoryHoldingService from "@/services/InventoryHolding.service";
import ContractorService from "@/services/Contractor.service";
import BudgetService from "@/services/Budget.service";
import DepartmentService from "@/services/Department.service";
import ContractService from "@/services/Contract.service";
import editTmzComponent from "@/views/PersonalInfo/InventoryHolding/edit";
export default {
  components: { editTmzComponent },
  data() {
    return {
      SaveLoading: false,
      sum: 0,
      IHMenu: {},
      kitchenlist: [],
      accountlist: [],
      departmentlist: [],
      menutypelist: [],
      dishlist: [],
      InventoryHoldingList: [],
      unitofmeasurelist: [],
      contractlist: [],
      lang: "",
      IHMenuTablesIHMenuByType: [
        {
          key: "menutype",
          label: this.$t("menutype"),
        },
        {
          key: "personcount",
          label: this.$t("personcount"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tablesihmenubytypetabrow: {
        id: 0,
        menutypeid: 0,
        personcount: 0,
        Status: 1,
      },
      IHMenuDish: [
        {
          key: "dish",
          label: this.$t("dish"),
        },
        {
          key: "dishoutputsz",
          label: this.$t("dishoutputsz"),
        },
        {
          key: "dietnumber",
          label: this.$t("dietnumber"),
        },
        {
          key: "personcount",
          label: this.$t("personcount"),
        },
        {
          key: "calorie",
          label: this.$t("calorie"),
        },
        {
          key: "protein",
          label: this.$t("protein"),
        },
        {
          key: "fat",
          label: this.$t("fat"),
        },
        {
          key: "carbohydrate",
          label: this.$t("carbohydrate"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tabrow1: {
        id: 0,
        dishid: 0,
        dishname: 0,
        dishoutputsz: 0,
        dietnumber: 0,
        personcount: 0,
        calorie: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        Status: 1,
      },
      IHMenuDishTable: [
        {
          key: "inventoryholdingname",
          label: this.$t("inventoryholdingname"),
        },
        {
          key: "norm",
          label: this.$t("norm"),
        },
        {
          key: "fact",
          label: this.$t("fact"),
        },
        {
          key: "personcount",
          label: this.$t("personcount"),
        },
        {
          key: "totalfact",
          label: this.$t("totalfact"),
        },
        {
          key: "price",
          label: this.$t("price"),
        },
        {
          key: "totalsum",
          label: this.$t("totalsum"),
        },
        {
          key: "restquantity",
          label: this.$t("restquantity"),
        },
        {
          key: "calorie",
          label: this.$t("calorie"),
        },
        {
          key: "protein",
          label: this.$t("protein"),
        },
        {
          key: "fat",
          label: this.$t("fat"),
        },
        {
          key: "carbohydrate",
          label: this.$t("carbohydrate"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      tabrow2: {
        id: 0,
        inventoryholdingid: 0,
        norm: 0,
        fact: 0,
        personcount: 0,
        totalfact: 0,
        price: 0,
        totalsum: 0,
        restquantity: 0,
        calorie: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        Status: 1,
      },
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
        expirationdate: "",
        baseprice: 0,
        profitrate: 0,
        Status: 1,
      },
      contractorlist: [],
      addoreditrow: -1,
      unitofmeasurelist: [],
      inventoryholdinglist: [],
      ExciserateList: [],
      plus: false,
      EraseWarningModal: false,
      EraseWarning: "a",
      createModal: false,
    };
  },
  created() {
    IHMenuService.Get(this.$route.params.id).then((res) => {
      this.IHMenu = res.data;
      this.itemsMainTable = res.data.Tables;
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
    ContractService.GetAll().then((res) => {
      this.contractlist = res.data;
    });
    MenuTypeService.GetAll().then((res) => {
      this.menutypelist = res.data;
    });
    DishService.GetAll().then((res) => {
      this.dishlist = res.data;
    });
  },
  computed: {},
  methods: {
    rowclickIHMenuByType(){
      
      alert("reyeryer");
    },
    ChangeTmz() {
      if (!!this.Tables1.inventoryholdingid) {
        this.Tables1.unitofmeasureid = this.InventoryHoldingList.filter(
          (item) => item.id === this.Tables1.inventoryholdingid
        )[0].unitofmeasureid;
      } else {
        this.Tables1.unitofmeasureid = null;
      }
    },
    AddTablesIHMenuByTypeRow() {
      if (
        this.tablesihmenubytypetabrow.menutypeid === 0 ||
        this.tablesihmenubytypetabrow.menutypeid === null ||
        this.tablesihmenubytypetabrow.menutypeid === undefined 
      ) {
        this.makeToast(
          this.$t("menutypeNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      this.IHMenu.TablesIHMenuByType.push(this.tablesihmenubytypetabrow);
      this.tablesihmenubytypetabrow = {
        id: 0,
        menutypeid: 0,
        personcount: 0,
        Status: 1,
      };
    },
    AddRow1() {
      this.IHMenu.IHMenuDish.push(this.tabrow1);
    },
    AddRow2() {
      this.IHMenu.IHMenuDishTable.push(this.tabrow2);
    },
    
    EditRow(row) {
      row.Status = 2;
    },
    DeleteRow(item) {
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
            expirationdate: "",
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
          expirationdate: "",
          baseprice: 0,
          profitrate: 0,
          Status: 1,
        };
      }
      this.CalculateContractSum();
      this.$bvModal.hide("AddModal");
    },
    
    check() {
      var self = this;
      if (
        self.IHMenu.IHMenunumber === 0 ||
        self.IHMenu.IHMenunumber === null ||
        self.IHMenu.IHMenunumber === undefined ||
        self.IHMenu.IHMenunumber === ""
      ) {
        this.makeToast(
          this.$t("contractnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.IHMenudate === 0 ||
        self.IHMenu.IHMenudate === null ||
        self.IHMenu.IHMenudate === undefined ||
        self.IHMenu.IHMenudate === ""
      ) {
        this.makeToast(
          this.$t("contractdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      /*       if (
        self.IHMenu.detailinfo === null ||
        self.IHMenu.detailinfo === undefined ||
        self.IHMenu.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHMenu.IHMenusum === 0 ||
        self.IHMenu.IHMenusum === null ||
        self.IHMenu.IHMenusum === undefined ||
        self.IHMenu.IHMenusum === ""
      ) {
        this.makeToast(
          this.$t("IHMenusumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.IHMenu.prepaidpercent === 0 ||
        self.IHMenu.prepaidpercent === null ||
        self.IHMenu.prepaidpercent === undefined ||
        self.IHMenu.prepaidpercent === ""
      ) {
        this.makeToast(
          this.$t("prepaidpercentNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /* if (
        self.IHMenu.prepaidsum === 0 ||
        self.IHMenu.prepaidsum === null ||
        self.IHMenu.prepaidsum === undefined ||
        self.IHMenu.prepaidsum === ""
      ) {
        this.makeToast(
          this.$t("prepaidsumNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHMenu.buyerinn === 0 ||
        self.IHMenu.buyerinn === null ||
        self.IHMenu.buyerinn === undefined ||
        self.IHMenu.buyerinn === ""
      ) {
        this.makeToast(
          this.$t("buyerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.buyername === 0 ||
        self.IHMenu.buyername === null ||
        self.IHMenu.buyername === undefined ||
        self.IHMenu.buyername === ""
      ) {
        this.makeToast(
          this.$t("buyernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.buyeradress === 0 ||
        self.IHMenu.buyeradress === null ||
        self.IHMenu.buyeradress === undefined ||
        self.IHMenu.buyeradress === ""
      ) {
        this.makeToast(
          this.$t("buyeradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.buyeraccountcode === 0 ||
        self.IHMenu.buyeraccountcode === null ||
        self.IHMenu.buyeraccountcode === undefined ||
        self.IHMenu.buyeraccountcode === ""
      ) {
        this.makeToast(
          this.$t("buyeraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.buyerbankcode === 0 ||
        self.IHMenu.buyerbankcode === null ||
        self.IHMenu.buyerbankcode === undefined ||
        self.IHMenu.buyerbankcode === ""
      ) {
        this.makeToast(
          this.$t("buyerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.buyeroked === 0 ||
        self.IHMenu.buyeroked === null ||
        self.IHMenu.buyeroked === undefined ||
        self.IHMenu.buyeroked === ""
      ) {
        this.makeToast(
          this.$t("buyerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /* if (
        self.IHMenu.buyervatcode === 0 ||
        self.IHMenu.buyervatcode === null ||
        self.IHMenu.buyervatcode === undefined ||
        self.IHMenu.buyervatcode === ""
      ) {
        this.makeToast(
          this.$t("buyervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHMenu.buyerfirstsign === 0 ||
        self.IHMenu.buyerfirstsign === null ||
        self.IHMenu.buyerfirstsign === undefined ||
        self.IHMenu.buyerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("buyerfirstsignNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.sellerinn === 0 ||
        self.IHMenu.sellerinn === null ||
        self.IHMenu.sellerinn === undefined ||
        self.IHMenu.sellerinn === ""
      ) {
        this.makeToast(
          this.$t("sellerinnNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.sellername === 0 ||
        self.IHMenu.sellername === null ||
        self.IHMenu.sellername === undefined ||
        self.IHMenu.sellername === ""
      ) {
        this.makeToast(
          this.$t("sellernameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.selleradress === 0 ||
        self.IHMenu.selleradress === null ||
        self.IHMenu.selleradress === undefined ||
        self.IHMenu.selleradress === ""
      ) {
        this.makeToast(
          this.$t("selleradressNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.selleraccountcode === 0 ||
        self.IHMenu.selleraccountcode === null ||
        self.IHMenu.selleraccountcode === undefined ||
        self.IHMenu.selleraccountcode === ""
      ) {
        this.makeToast(
          this.$t("selleraccountcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.IHMenu.sellerbankcode === 0 ||
        self.IHMenu.sellerbankcode === null ||
        self.IHMenu.sellerbankcode === undefined ||
        self.IHMenu.sellerbankcode === ""
      ) {
        this.makeToast(
          this.$t("sellerbankcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      /*  if (
        self.IHMenu.selleroked === 0 ||
        self.IHMenu.selleroked === null ||
        self.IHMenu.selleroked === undefined ||
        self.IHMenu.selleroked === ""
      ) {
        this.makeToast(
          this.$t("sellerokedNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      /*       if (
        self.IHMenu.sellervatcode === 0 ||
        self.IHMenu.sellervatcode === null ||
        self.IHMenu.sellervatcode === undefined ||
        self.IHMenu.sellervatcode === ""
      ) {
        this.makeToast(
          this.$t("sellervatcodeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      } */
      if (
        self.IHMenu.sellerfirstsign === 0 ||
        self.IHMenu.sellerfirstsign === null ||
        self.IHMenu.sellerfirstsign === undefined ||
        self.IHMenu.sellerfirstsign === ""
      ) {
        this.makeToast(
          this.$t("sellerfirstsignNotCorrect"),
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
      this.IHMenu.Tables = this.itemsMainTable;
      IHMenuService.Update(this.IHMenu)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "IHMenu" });
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
      self.IHMenu.contractsum = 0;
      self.itemsMainTable.forEach(function (item) {
        if (item.Status !== 3) {
          self.IHMenu.contractsum += item.deliverysumwithvat;
        }
      });
      self.IHMenu.prepaidsum =
        (self.IHMenu.contractsum * self.IHMenu.prepaidpercent) / 100;
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
        this.IHMenu.hasmedical = !this.IHMenu.hasmedical;
      }
      if (this.EraseWarning === "hasexcise") {
        // this.EraseWarning = ''
        this.IHMenu.hasexcise = !this.IHMenu.hasexcise;
      }
      if (this.EraseWarning === "hasvat") {
        // this.EraseWarning = ''
        this.IHMenu.hasvat = !this.IHMenu.hasvat;
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
      // this.IHMenu.hasexcise = !this.IHMenu.hasexcise
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
      // this.IHMenu.hasexcise = !this.IHMenu.hasexcise
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
    "IHMenu.hasmedical": {
      handler(newValue, oldValue) {
        // if(newValue != oldValue && oldValue != undefined){
        //   if(this.EraseWarning != 'hasmedical' && this.EraseWarning != ''){
        //     this.WatchAllBoolean()
        //     this.EraseWarning = 'hasmedical'
        //   }
        //   else{
        //     this.EraseWarning = 'a'
        //   }

        //   // this.IHMenu.hasmedical = oldValue
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
    "IHMenu.hasexcise": {
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
            this.IHMenu.hasvat
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
              this.IHMenu.hasvat
                ? this.fieldsMainTable.length - 9
                : this.fieldsMainTable.length - 6,
              3
            );
          }
        }
      },
    },
    "IHMenu.hasvat": {
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

<style>
</style>






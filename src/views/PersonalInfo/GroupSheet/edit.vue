<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("GroupSheet") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row>
                <b-col sm="6" md="3">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("statusname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.statusname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="6" md="3">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("educationlanguagename") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.educationlanguagename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("schoolyearname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.schoolyearname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("gendername") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.gendername }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="12" md="6">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("examgroupname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.examgroupname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("educationformtypename") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.educationformtypename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("higHerEduClassifier") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.highereduclassifiername }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="6" lg="4">
                  <b-input-group>
                    <b-form-input v-model="dtmid"></b-form-input>
                    <b-input-group-append>
                      <b-button variant="primary" @click="RefreshbyDtm">
                        <b-icon icon="search"></b-icon> {{ $t("search") }}
                      </b-button>
                      <b-button variant="danger" @click="Refresh">
                        <b-icon icon="trash"></b-icon> {{ $t("clear") }}
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
              <!-- <b-row class="mr-1 mb-2">
              <b-col class="text-right">
                <b-button variant="primary" @click="OpenAddModal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row> -->
              <b-modal
                id="AddModal"
                size="xl"
                :title="$t('GroupSheet')"
                no-close-on-backdrop
                hide-footer
                modal-class="custom-size-modal-planshet"
              >
                <b-row>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("fio") }} :</span>
                        <span>
                          <b> {{ tabrow.groupformbyedudirectiontablename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("dtmid") }} :</span>
                        <span>
                          <b> {{ tabrow.dtmid }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("totalscore") }} :</span>
                        <span>
                          <b> {{ totalscore }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("higHerEduClassifier") }} :</span>
                        <span>
                          <b> {{ GroupSheet.highereduclassifiername }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("examgroupname") }} :</span>
                        <span>
                          <b> {{ GroupSheet.examgroupname }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
                <!-- <b-row class="mr-1 mb-2">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddModalTabrow2">
                    <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row> -->

                <b-row class="mt-3">
                  <b-col>
                    <b-tabs pills v-model="tabIndex">
                      <b-tab
                        :title="$t('IJTStandardTable')"
                        @click="ChangeStandartTable"
                      >
                        <CRow class="mt-2">
                          <CCol>
                            <b-table
                              :fields="StandardTable"
                              :items="tabrow.IJTStandardTable"
                              class="bg-color-table text-center mx-3"
                              style="vertical-align: middle"
                              bordered
                              small
                              responsive="sm"
                              :tbody-tr-class="rowClass"
                              v-if="isEdit"
                            >
                              <template v-slot:cell(actions)="{ item }">
                                <div class="text-center">
                                  <b-link
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                    v-if="isEdit"
                                  >
                                    {{ $t("rating") }}
                                  </b-link>
                                  <b-link
                                    v-if="!isEdit"
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                  >
                                    {{ $t("View") }}
                                  </b-link>
                                </div>
                              </template>
                              <template v-slot:cell(totalscore)="{ item }">
                                <span v-if="!item.notrated">
                                  {{ item.totalscore }}
                                </span>
                                <span v-if="item.notrated">
                                  <b-badge variant="danger">
                                    {{ $t("notrated") }}
                                  </b-badge>
                                </span>
                              </template>
                            </b-table>
                            <b-table-simple
                              small
                              bordered
                              responsive
                              v-if="!isEdit"
                            >
                              <b-thead>
                                <b-tr style="background-color: lightgray">
                                  <b-th
                                    v-for="(item, index) in StandardTable"
                                    :key="index"
                                  >
                                    {{ item.label }}
                                  </b-th>
                                </b-tr>
                              </b-thead>
                              <b-tbody
                                v-for="(item, index) in tabrow.IJTStandardTable"
                                :key="index"
                              >
                                <b-tr class="text-black">
                                  <td
                                    class="text-center"
                                    style="background-color: #cdf6ff"
                                    colspan="4"
                                  >
                                    <span class="font-weight-bold">
                                      {{
                                        item.comissionmemberassignmenttablename
                                      }}
                                    </span>
                                  </td>
                                </b-tr>
                                <b-tr
                                  v-for="(
                                    el, index
                                  ) in item.GroupSheetStandards"
                                  :key="index"
                                >
                                  <b-td>
                                    {{ el.assessmentcriteriatablename }}
                                  </b-td>
                                  <b-td>
                                    {{ el.scorecalculationtypename }}
                                  </b-td>
                                  <b-td class="text-center">
                                    <span v-if="!el.notrated">
                                      {{ el.totalscore }}
                                    </span>
                                    <span v-if="el.notrated">
                                      <b-badge variant="danger">
                                        {{ $t("notrated") }}
                                      </b-badge>
                                    </span>
                                  </b-td>
                                  <b-td>
                                    <b-link
                                      v-if="!isEdit"
                                      @click="EditItemStandardTable(el)"
                                      class="mr-2"
                                    >
                                      {{ $t("View") }}
                                    </b-link>
                                  </b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </CCol>
                        </CRow>
                      </b-tab>
                      <b-tab :title="$t('MJTStandardTable')">
                        <CRow class="mt-2">
                          <CCol>
                            <b-table
                              :fields="StandardTable"
                              :items="tabrow.MJTStandardTable"
                              class="bg-color-table text-center mx-3"
                              style="vertical-align: middle"
                              bordered
                              small
                              responsive="sm"
                              :tbody-tr-class="rowClass"
                              v-if="isEdit"
                            >
                              <template v-slot:cell(actions)="{ item }">
                                <div class="text-center">
                                  <b-link
                                    v-if="isEdit"
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                  >
                                    {{ $t("rating") }}
                                  </b-link>
                                  <b-link
                                    v-if="!isEdit"
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                  >
                                    {{ $t("View") }}
                                  </b-link>
                                </div>
                              </template>
                              <template v-slot:cell(totalscore)="{ item }">
                                <span v-if="!item.notrated">
                                  {{ item.totalscore }}
                                </span>
                                <span v-if="item.notrated">
                                  <b-badge variant="danger">
                                    {{ $t("notrated") }}
                                  </b-badge>
                                </span>
                              </template>
                            </b-table>
                            <b-table-simple
                              bordered
                              small
                              responsive
                              v-if="!isEdit"
                            >
                              <b-thead>
                                <b-tr style="background-color: lightgray">
                                  <b-th
                                    v-for="(item, index) in StandardTable"
                                    :key="index"
                                  >
                                    {{ item.label }}
                                  </b-th>
                                </b-tr>
                              </b-thead>
                              <b-tbody
                                v-for="(item, index) in tabrow.MJTStandardTable"
                                :key="index"
                              >
                                <b-tr class="text-black">
                                  <td
                                    class="text-center"
                                    style="background-color: #cdf6ff"
                                    colspan="4"
                                  >
                                    <span class="font-weight-bold">
                                      {{
                                        item.comissionmemberassignmenttablename
                                      }}
                                    </span>
                                  </td>
                                </b-tr>
                                <b-tr
                                  v-for="(
                                    el, index
                                  ) in item.GroupSheetStandards"
                                  :key="index"
                                >
                                  <b-td>
                                    {{ el.assessmentcriteriatablename }}
                                  </b-td>
                                  <b-td>
                                    {{ el.scorecalculationtypename }}
                                  </b-td>
                                  <b-td class="text-center">
                                    <span v-if="!el.notrated">
                                      {{ el.totalscore }}
                                    </span>
                                    <span v-if="el.notrated">
                                      <b-badge variant="danger">
                                        {{ $t("notrated") }}
                                      </b-badge>
                                    </span>
                                  </b-td>
                                  <b-td>
                                    <b-link
                                      v-if="!isEdit"
                                      @click="EditItemStandardTable(el)"
                                      class="mr-2"
                                    >
                                      {{ $t("View") }}
                                    </b-link>
                                  </b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </CCol>
                        </CRow>
                      </b-tab>
                    </b-tabs>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col class="text-center">
                    <b-button
                      variant="danger"
                      @click="CloseAddModal"
                      class="mr-2"
                    >
                      <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                    </b-button>
                    <!-- <b-button variant="success" @click="Add">
                    <b-icon icon="check2"></b-icon> {{ $t("Save") }}
                  </b-button> -->
                  </b-col>
                </b-row>
              </b-modal>
              <b-modal
                id="AddModalTabrow2"
                size="xl"
                :title="$t('StandardTable')"
                no-close-on-backdrop
                hide-footer
                modal-class="custom-size-modal-planshet"
              >
                <b-row>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("fio") }} :</span>
                        <span>
                          <b> {{ tabrow.groupformbyedudirectiontablename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("physicaltrainingtypename") }} :</span>
                        <span>
                          <b> {{ tabrow2.physicaltrainingtypename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("assessmentcriteriatablename") }} :</span>
                        <span>
                          <b> {{ tabrow2.assessmentcriteriatablename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("scorecalculationtypename") }} :</span>
                        <span>
                          <b> {{ tabrow2.scorecalculationtypename }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("totalscore") }} :</span>
                        <span>
                          <b> {{ tabrow2.totalscore }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span style="white-space: nowrap" class="mr-2"
                          >{{ $t("detail") }} :</span
                        >
                        <span>
                          <b>
                            {{ tabrow2.assessmentcriteriatabledetailinfo }}
                          </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span
                          >{{
                            $t("comissionmemberassignmenttablename")
                          }}
                          :</span
                        >
                        <span>
                          <b>
                            {{ tabrow2.comissionmemberassignmenttablename }}
                          </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("higHerEduClassifier") }} :</span>
                        <span>
                          <b>
                            {{ GroupSheet.highereduclassifiername }}
                          </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>

                <CRow class="mt-3">
                  <CCol>
                    <b-table
                      :fields="resultTable"
                      :items="tabrow2.ResultTable"
                      class="bg-color-table text-center mx-3"
                      style="vertical-align: middle"
                      bordered
                      small
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:thead-top>
                        <b-tr v-if="isEdit">
                          <b-th style="width: 16%">
                            <v-select
                              :options="assessmentcriteriatablestandarlist"
                              :reduce="(item) => item.id"
                              :placeholder="$t('ChooseBelow')"
                              label="name"
                              :searchable="false"
                              v-model="tabrow3.assessmentcriteriatablestandarid"
                              @input="ChangeAssessmentCriteria"
                            ></v-select>
                          </b-th>
                          <b-th>
                            {{ tabrow3.scoretypename }}
                          </b-th>
                          <b-th style="width: 12%">
                            <!-- <b-form-input
                              v-model="tabrow3.score"
                              :placeholder="$t('score')"
                              @keyup="calcScore(tabrow3)"
                              :disabled="tabrow3.scoretypeid == 1"
                            ></b-form-input> -->
                            <custom-number-input
                              v-model="tabrow3.score"
                              :placeholder="$t('score')"
                              @keyup="calcScore(tabrow3)"
                              :disabled="isDisabledScore"
                            />
                          </b-th>
                          <!-- <b-th  v-if="!isDisabledScore" style="width: 12%"> -->
                          <!-- <b-form-input
                              v-model="tabrow3.score"
                              :placeholder="$t('score')"
                              @keyup="calcScore(tabrow3)"
                              :disabled="tabrow3.scoretypeid == 1"
                            ></b-form-input> -->
                          <!-- <custom-number-input
                              v-model="tabrow3.score" 
                              :placeholder="$t('score')" 
                              @keyup="calcScore(tabrow3)" 
                              :disabled="isDisabledScore" />
                          </b-th> -->
                          <b-th style="width: 12%">
                            <!-- <b-form-input
                              v-model="tabrow3.techscore"
                              @keyup="calcScore(tabrow3)"
                              :placeholder="$t('techscore')"
                              :disabled="!tabrow3.istechscore"
                            ></b-form-input> -->
                            <custom-number-input
                              v-model="tabrow3.techscore"
                              :placeholder="$t('techscore')"
                              @keyup="calcScore(tabrow3)"
                              :disabled="!tabrow3.istechscore"
                            />
                          </b-th>
                          <b-th style="width: 12%">
                            <!-- <b-form-input
                              v-model="tabrow3.totalscore"
                              :placeholder="$t('totalscore')"
                              disabled
                            ></b-form-input> -->
                            <custom-number-input
                              v-model="tabrow3.totalscore"
                              :placeholder="$t('totalscore')"
                              disabled
                            />
                          </b-th>
                          <b-th style="width: 14%">
                            <b-form-input
                              v-model="tabrow3.detail"
                              :placeholder="$t('detail')"
                            ></b-form-input>
                          </b-th>
                          <b-th style="width: 20%" class="text-center">
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              @click="AddTabrow3"
                            >
                              <b-icon icon="plus"> </b-icon>
                              {{ $t("Add") }}
                            </CButton>
                          </b-th>
                        </b-tr>
                      </template>
                      <template v-slot:cell(actions)="{ item, index }">
                        <div class="text-center">
                          <!-- <b-link
                          @click="EditItem(item)"
                          class="mr-2"
                        >
                          {{ $t('rating') }}
                        </b-link> -->
                          <b-link
                            class="mr-2"
                            v-if="isEdit"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteItem(item, index)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                      <template v-slot:cell(score)="{ item }">
                        <!-- <b-form-input
                          v-if="item.Status == 2 || item.Status == 1"
                            v-model="item.score"
                            :placeholder="$t('score')"
                            size="sm"
                            @keyup="calcScore(item)"
                          ></b-form-input> -->
                        <span> {{ item.score }} </span>
                      </template>
                      <template v-slot:cell(techscore)="{ item }">
                        <!-- <b-form-input
                            v-if="item.Status == 2 || item.Status == 1"
                            v-model="item.techscore"
                            :placeholder="$t('techscore')"
                            @keyup="calcScore(item)"
                            size="sm"
                          ></b-form-input> -->
                        <span> {{ item.techscore }} </span>
                      </template>
                      <template v-slot:cell(detail)="{ item }">
                        <!-- <b-form-input
                            v-if="item.Status == 2 || item.Status == 1"
                            v-model="item.detail"
                            :placeholder="$t('detail')"
                            size="sm"
                          ></b-form-input> -->
                        <span> {{ item.detail }} </span>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>

                <b-row>
                  <b-col>
                    <b-button
                      variant="danger"
                      @click="CloseStandardTable"
                      class="ml-3"
                    >
                      <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                    </b-button>
                  </b-col>
                  <b-col class="text-right">
                    <b-button
                      class="mr-3"
                      variant="success"
                      @click="AddTabrow2"
                      v-if="isEdit"
                    >
                      <b-icon icon="check2" v-if="!SaveLoading3"></b-icon>
                      <b-spinner v-if="SaveLoading3" small></b-spinner>
                      {{ $t("Save") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
              <b-modal
                id="AddModalTabrow3"
                size="lg"
                :title="tabrow.groupformbyedudirectiontablename"
                no-close-on-backdrop
                hide-footer
                centered
                modal-class="custom-size-modal-planshet"
              >
                <b-table
                  :fields="resultTableView"
                  :items="tabrow2.ResultTable"
                  class="bg-color-table text-center mx-3"
                  style="vertical-align: middle"
                  bordered
                  small
                  responsive="sm"
                  :tbody-tr-class="rowClass"
                >
                </b-table>

                <b-row>
                  <b-col class="text-right">
                    <b-button
                      class="mr-3"
                      variant="success"
                      @click="ApproveAddTabrow2"
                    >
                      <b-icon icon="check2" v-if="!SaveLoading3"></b-icon>
                      <b-spinner v-if="SaveLoading3" small></b-spinner>
                      {{ $t("Approve") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
              <CRow class="mt-3">
                <CCol>
                  <b-table
                    :fields="GroupSheetTables"
                    :items="GroupSheet.GroupSheetTables"
                    class="bg-color-table text-center"
                    style="vertical-align: middle"
                    bordered
                    small
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:cell(actions)="{ item }">
                      <div class="text-center d-flex">
                        <b-button
                          variant="success"
                          size="sm"
                          @click="EditItemGroupSheet(item)"
                          class="mr-2"
                        >
                          {{ $t("rating") }}
                        </b-button>
                        <b-button
                          variant="info"
                          size="sm"
                          @click="ViewItem(item)"
                        >
                          {{ $t("View") }}
                        </b-button>
                      </div>
                    </template>
                    <template v-slot:cell(ordernumber)="{ index }">
                      <span style="white-space: nowrap">
                        {{ index + 1 }}
                      </span>
                    </template>
                    <template v-slot:cell(MJT)="{ item }">
                      <span style="white-space: nowrap">
                        {{ item.MJTResultCount }} / <b> {{ item.MJTCount }} </b>
                      </span>
                    </template>
                    <template v-slot:cell(IJT)="{ item }">
                      <span style="white-space: nowrap">
                        {{ item.IJTResultCount }} / <b> {{ item.IJTCount }} </b>
                      </span>
                    </template>
                    <template v-slot:cell(TotalBal)="{ item }">
                      <span v-if="!item.notrated"> {{ item.TotalBal }} </span>
                      <span v-if="item.notrated">
                        <b-badge variant="danger">
                          {{ $t("notrated") }}
                        </b-badge>
                      </span>
                    </template>
                  </b-table>
                </CCol>
              </CRow>
            </ValidationObserver>
          </CCardBody>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton class="ml-4" size="sm" color="danger" @click="Close">
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <CButton
                  size="sm"
                  color="success"
                  class="mr-4"
                  @click="SaveData"
                >
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
  </b-overlay>
</template>

<script>
import GroupSheetService from "@/services/GroupSheet.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
import SchoolYearService from "@/services/SchoolYear.service";
import HelperService from "@/services/helper.service";
import OrganizationService from "@/services/organization.service";
import PhysicalTrainingTypeService from "@/services/PhysicalTrainingType.service";
import {
  BListGroup,
  BListGroupItem,
  BTableSimple,
  BTbody,
  BTr,
  BTd,
} from "bootstrap-vue";
import AssessmentCriteriaService from "@/services/AssessmentCriteria.service";
import CustomNumberInput from "../../../components/CustomNumberInput.vue";
export default {
  components: {
    BListGroupItem,
    BListGroup,
    BTableSimple,
    BTbody,
    BTr,
    CustomNumberInput,
    BTd,
  },

  data() {
    return {
      SaveLoading: false,
      isDisabledScore: false,
      GroupSheet: {},
      tabrow2: {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        assessmentcriteriatableid: 0,
        assessmentcriteriatablename: "",
        scorecalculationtypeid: 0,
        scorecalculationtypename: "",
        comissionmemberassignmenttableid: 0,
        comissionmemberassignmenttablename: "",
        totalscore: 0,
        Status: 1,
        assessmentcriteriatabledetailinfo: "",
        ResultTable: [],
      },
      tabrow3: {
        id: 0,
        ownerid: 0,
        assessmentcriteriatablestandarid: 0,
        assessmentcriteriatablestandarname: "",
        score: 0,
        techscore: 0,
        totalscore: 0,
        detail: "",
        scoretypeid: 0,
        scoretypename: "",
        techscoretypeid: 0,
        istechscore: false,
        Status: 1,
      },
      GroupSheetTables: [
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          class: "text-center",
        },
        {
          key: "dtmid",
          label: this.$t("dtmid"),
          class: "text-center",
        },

        {
          key: "groupformbyedudirectiontablename",
          label: this.$t("groupformbyedudirectiontablename"),
          class: "text-left",
        },
        {
          key: "ComissionMemberCount",
          label: this.$t("ComissionMemberCount"),
          class: "text-center",
        },
        {
          key: "MJT",
          label: this.$t("MJT"),
          class: "text-center",
        },
        {
          key: "MJTResultBal",
          label: this.$t("MJTResultBal"),
          class: "text-center",
        },
        {
          key: "IJT",
          label: this.$t("IJT"),
          class: "text-center",
        },
        {
          key: "IJTResultBal",
          label: this.$t("IJTResultBal"),
          class: "text-center",
        },
        { key: "TotalBal", label: this.$t("totalscore"), class: "text-center" },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      StandardTable: [
        {
          key: "assessmentcriteriatablename",
          label: this.$t("assessmentcriteriatablename"),
          class: "text-left",
        },
        {
          key: "scorecalculationtypename",
          label: this.$t("scorecalculationtypename"),
        },
        {
          key: "totalscore",
          label: this.$t("totalscore"),
        },
        { key: "actions", label: this.$t("actions") },
      ],
      resultTable: [
        {
          key: "assessmentcriteriatablestandarname",
          label: this.$t("assessmentcriteriatablestandarname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "scoretypename",
          label: this.$t("scoretypename"),
        },
        {
          key: "score",
          label: this.$t("score"),
        },
        {
          key: "techscore",
          label: this.$t("techscore"),
        },
        {
          key: "totalscore",
          label: this.$t("totalscore"),
        },
        {
          key: "detail",
          label: this.$t("detail"),
        },
        // { key: "status", label: this.$t("") },
        { key: "actions", label: this.$t("actions") },
      ],
      resultTableView: [
        {
          key: "assessmentcriteriatablestandarname",
          label: this.$t("assessmentcriteriatablestandarname"),
          thClass: "text-center",
          tdClass: "text-left",
        },

        {
          key: "score",
          label: this.$t("score"),
        },
        {
          key: "techscore",
          label: this.$t("techscore"),
        },
        {
          key: "totalscore",
          label: this.$t("totalscore"),
        },
        {
          key: "detail",
          label: this.$t("detail"),
        },
      ],
      HighereduclassifierList: [],
      EducationfortypemList: [],
      assessmentcriteriatablestandarlist: [],
      EducationformList: [],
      EducationlanguageList: [],
      SchoolyearList: [],
      GenderList: [],
      statelist: [],
      OrganizationList: [],
      physicaltrainingtypelist: [],
      assessmentcriteriatablelist: [],
      IJTStandardTable: [],
      MJTStandardTable: [],
      //   tabrow: {
      //     id: 0,
      //     ownerid: 0,
      //     physicaltrainingtypeid: 0,
      //     physicaltrainingtypename: "",
      //     assessmentcriteriatableid: 0,
      //     examstartdate: "",
      //     examstarttime: {
      //       hour: 0,
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //       ticks: 0,
      //     },
      //     examenddate: "",
      //     examendtime: {
      //       hour: 0,
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //       ticks: 0,
      //     },
      //     examaddress: "",
      //     Status: 1,
      //   },
      tabrow: {
        id: 0,
        ownerid: 0,
        dtmid: "",
        groupformbyedudirectiontableid: 0,
        groupformbyedudirectiontablename: "",
        Status: 1,
        standardTable: [],
        IJTStandardTable: [],
        MJTStandardTable: [],
      },
      editedIndex: -1,
      tabIndex: 0,
      SaveLoading3: false,
      show: false,
      totalscore: 0,
      isEdit: true,
      intermediateScore: null,
      dtmid: "",
      isDisabledScore: false,
    };
  },

  async created() {
    await this.Refresh();
    if (!!this.$route.query.dtmId) {
      this.dtmid = this.$route.query.dtmId;
      this.GroupSheet.GroupSheetTables =
        this.GroupSheet.GroupSheetTables.filter((el) => el.dtmid == this.dtmid);
    }
    HigherEduClassifierService.GetAll().then((res) => {
      this.HighereduclassifierList = res.data;
    });
    EducationLanguageService.GetAll().then((res) => {
      this.EducationlanguageList = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.SchoolyearList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.GenderList = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      this.OrganizationList = res.data;
    });
    PhysicalTrainingTypeService.GetAll().then((res) => {
      this.physicaltrainingtypelist = res.data;
    });
  },
  methods: {
    RefreshbyDtm() {
      if (this.dtmid != "") {
        this.GroupSheet.GroupSheetTables =
          this.GroupSheet.GroupSheetTables.filter(
            (el) =>
              el.dtmid == this.dtmid ||
              el.groupformbyedudirectiontablename.includes(this.dtmid) ||
              el.groupformbyedudirectiontablename.includes(
                this.dtmid.toUpperCase()
              )
          );
      } else {
        this.Refresh();
      }
    },
    ChangeAssessmentCriteria() {
      this.tabrow3.score = 0;
      if (!this.tabrow3.assessmentcriteriatablestandarid) {
        this.tabrow3.score = 0;
        this.intermediateScore = null;
      }
      AssessmentCriteriaService.GetAllAssessmentCriteriaTableStandardById(
        this.tabrow3.assessmentcriteriatablestandarid
      ).then((res) => {
        this.tabrow3.scoretypeid = res.data.scoretypeid;
        this.tabrow3.scoretypename = res.data.scoretypename;
        this.tabrow3.techscoretypeid = res.data.techscoretypeid;
        this.tabrow3.istechscore = res.data.istechscore;
        this.intermediateScore = res.data;
        this.isDisabledScore = false;
        if (res.data.scoretypeid == 1 || res.data.scoretypeid == 2) {
          this.tabrow3.score = res.data.fromscore;
        }
        if (!!res.data.istechscore) {
          if (res.data.techscoretypeid == 1 || res.data.techscoretypeid == 2) {
            this.tabrow3.techscore = res.data.fromtechscore;
          }
        }
        if (
          !res.data.istechscore &&
          (res.data.scoretypeid == 1 || res.data.scoretypeid == 2)
        ) {
          this.isDisabledScore = true;
          return false;
        }
        if (
          res.data.istechscore &&
          (res.data.techscoretypeid == 1 || res.data.techscoretypeid == 2)
        ) {
          this.isDisabledScore = true;
          return false;
        }
        if (
          !res.data.istechscore &&
          res.data.techscoretypeid != 1 &&
          res.data.techscoretypeid != 2
        ) {
          this.isDisabledScore = false;
          return false;
        }
      });
    },
    async Refresh() {
      this.show = true;
      await GroupSheetService.Get(this.$route.params.id).then((res) => {
        this.GroupSheet = res.data;
        this.show = false;
      });
    },
    Close() {
      this.$router.push({
        name: "GroupSheet",
        query: {
          schoolYearId: this.$route.query.schoolYearId,
          higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
          educationFormTypemId: this.$route.query.educationFormTypemId,
          educationLanguageId: this.$route.query.educationLanguageId,
          genderId: this.$route.query.genderId,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
          dtmId: this.$route.query.dtmId,
        },
      });
    },
    calcScore(item) {
      if (item.scoretypeid == 3) {
        if (item.fromscore > item.score && item.toscore < item.score) {
          this.makeToast(this.$t("scoreError"), this.$t("Error"), "danger");
          item.score = 0;
        }
      }
      if (item.techscoretypeid == 3) {
        if (
          item.fromtechscore > item.techscore &&
          item.totechscore < item.techscore
        ) {
          this.makeToast(this.$t("scoreError"), this.$t("Error"), "danger");
          item.techscore = 0;
        }
      }
      item.totalscore = item.techscore * 1 + item.score * 1;
    },
    EditItem(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },
    DeleteItem(item, index) {
      if (item.Status == 1) {
        this.tabrow2.ResultTable.splice(index, 1);
      } else {
        item.Status = 3;
      }
    },
    ViewItem(item) {
      this.isEdit = false;
      this.editedIndex = this.GroupSheet.GroupSheetTables.indexOf(item);
      if (item.id != 0) {
        this.$bvModal.show("AddModal");
      }
      // this.tabrow = Object.assign({}, item);
      GroupSheetService.GroupSheetTableForView(item.id)
        .then((res) => {
          this.tabrow = res.data;
          var self = this;
          self.totalscore = 0;
          res.data.IJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
          });
          res.data.MJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
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
    ChangeStandartTable() {},
    // isDisabledScore() {
    //   if (!this.tabrow3.istechscore && (this.tabrow3.scoretypeid == 1 || this.tabrow3.scoretypeid == 2)) {
    //     return true
    //   }
    //   if(this.tabrow3.istechscore && (this.tabrow3.techscoretypeid == 1 || this.tabrow3.techscoretypeid == 2)) {
    //     return true
    //   }
    //   if(!this.tabrow3.istechscore && this.tabrow3.scoretypeid == 3) {
    //     return false
    //   }
    //   if (!this.tabrow3.istechscore && (this.tabrow3.scoretypeid === 1 || this.tabrow3.scoretypeid == 2)) {
    //     return true
    //   }
    //   if (this.tabrow3.istechscore && (this.tabrow3.techscoretypeid == 1 || this.tabrow3.techscoretypeid == 2)) {
    //     return true
    //   }
    //   return false
    // },
    AddTabrow3() {
      var self = this;
      if (
        self.tabrow3.assessmentcriteriatablestandarid === "" ||
        self.tabrow3.assessmentcriteriatablestandarid === undefined ||
        self.tabrow3.assessmentcriteriatablestandarid === null ||
        self.tabrow3.assessmentcriteriatablestandarid === 0
      ) {
        this.makeToast(
          this.$t("assessmentcriteriatablestandarNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.tabrow3.assessmentcriteriatablestandarid) {
        self.tabrow3.assessmentcriteriatablestandarname =
          this.assessmentcriteriatablestandarlist.filter(
            (item) => item.id == self.tabrow3.assessmentcriteriatablestandarid
          )[0].name;
      }
      if (!this.intermediateScore.istechscore) {
        if (
          this.intermediateScore.scoretypeid == 1 ||
          this.intermediateScore.scoretypeid == 2
        ) {
          if (this.intermediateScore.fromscore != this.tabrow3.score) {
            this.makeToast(
              this.$t("intermediateScoreNotCorrect") +
                ":" +
                this.intermediateScore.fromscore +
                "-" +
                this.intermediateScore.toscore,
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
        if (this.intermediateScore.scoretypeid == 3) {
          if (
            this.intermediateScore.fromscore > this.tabrow3.score ||
            this.tabrow3.score > this.intermediateScore.toscore
          ) {
            this.makeToast(
              this.$t("intermediateScoreNotCorrect") +
                ":" +
                this.intermediateScore.fromscore +
                "-" +
                this.intermediateScore.toscore,
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
      }
      if (this.intermediateScore.istechscore) {
        if (
          this.intermediateScore.techscoretypeid == 1 ||
          this.intermediateScore.techscoretypeid == 2
        ) {
          if (this.intermediateScore.fromtechscore != this.tabrow3.techscore) {
            this.makeToast(
              this.$t("intermediateTechScoreNotCorrect") +
                ":" +
                this.intermediateScore.fromtechscore +
                "-" +
                this.intermediateScore.totechscore,
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
        if (this.intermediateScore.techscoretypeid == 3) {
          if (
            this.intermediateScore.fromtechscore > this.tabrow3.techscore ||
            this.tabrow3.techscore > this.intermediateScore.totechscore
          ) {
            this.makeToast(
              this.$t("intermediateTechScoreNotCorrect") +
                ":" +
                this.intermediateScore.fromtechscore +
                "-" +
                this.intermediateScore.totechscore,
              this.$t("Error"),
              "danger"
            );
            return false;
          }
        }
      }
      // if (!(this.tabrow3.istechscore == false ? this.tabrow3.scoretypeid == 1 || this.tabrow3.scoretypeid == 2 : this.tabrow3.techscoretypeid == 1 || this.tabrow3.techscoretypeid == 2)) {
      //   this.makeToast(
      //     this.$t("intermediateScoreNotCorrect") +
      //       ":" +
      //       this.intermediateScore.fromscore +
      //       "-" +
      //       this.intermediateScore.toscore,
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   (this.intermediateScore.scoretypeid == 3 &&
      //     this.tabrow3.score < this.intermediateScore.fromscore) ||
      //   this.tabrow3.score > this.intermediateScore.toscore
      // ) {
      //   this.makeToast(
      //     this.$t("intermediateScoreNotCorrect") +
      //       ":" +
      //       this.intermediateScore.fromscore +
      //       "-" +
      //       this.intermediateScore.toscore,
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   (this.intermediateScore.scoretypeid == 3 &&
      //     this.intermediateScore.istechscore &&
      //     this.tabrow3.techscore < this.intermediateScore.fromtechscore) ||
      //   this.tabrow3.techscore > this.intermediateScore.totechscore
      // ) {
      //   this.makeToast(
      //     this.$t("intermediateTechScoreNotCorrect") +
      //       ":" +
      //       this.intermediateScore.fromtechscore +
      //       "-" +
      //       this.intermediateScore.totechscore,
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      //  var duplicateperson  = this.tabrow2.ResultTable.filter((item) => item.Status != 3).map(item => item.assessmentcriteriatablestandarid)
      //  console.log(this.tabrow2.ResultTable, this.tabrow2.ResultTable.map(item => item.Status))
      // if(Status.includes(this.tabrow2.ResultTable.map(item => item.Status))){
      //     this.makeToast(this.$t("dublicate"), this.$t("Error"), "danger");
      //   return false;
      //   }
      // if(duplicateperson.includes(this.tabrow3.assessmentcriteriatablestandarid)){
      //   this.makeToast(this.$t("dublicate"), this.$t("Error"), "danger");
      // return false;
      // }
      // console.log(this.tabrow2.assessmentcriteriatableattemptcount, this.tabrow2.ResultTable.length)
      //  array.filter(item => item.Status != 3).length
      // console.log( this.tabrow2.ResultTable.filter(item => item.Status != 3).length)
      if (this.tabrow3.scoretypeid != 2) {
        if (
          this.tabrow2.ResultTable.filter((item) => item.Status != 3).length +
            1 >
          this.tabrow2.assessmentcriteriatableattemptcount
        ) {
          this.makeToast(
            this.$t("AddNotTables") +
              " " +
              this.tabrow2.assessmentcriteriatableattemptcount,
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      // Array.prototype.push.apply(this.tabrow2.ResultTable, this.DeleteMassiv);
      // console.log(this.tabrow2.ResultTable)
      self.tabrow3.ownerid = self.tabrow2.id;
      self.tabrow2.ResultTable.push(self.tabrow3);
      self.tabrow3 = {
        id: 0,
        ownerid: 0,
        assessmentcriteriatablestandarid: 0,
        assessmentcriteriatablestandarname: "",
        score: 0,
        techscore: 0,
        totalscore: 0,
        detail: "",
        Status: 1,
        scoretypeid: 0,
        scoretypename: "",
        techscoretypeid: 0,
        istechscore: false,
      };
      this.intermediateScore = null;
    },
    getTabrow(id) {
      GroupSheetService.GroupSheetTable(id, this.GroupSheet.id)
        .then((res) => {
          this.tabrow = res.data;
          var self = this;
          self.totalscore = 0;
          res.data.IJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
          });
          res.data.MJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
          });
          this.$bvModal.show("AddModal");
        })
        .catch((error) => {
          this.tabrow.id = 0;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    AddTabrow2() {
      this.$bvModal.show("AddModalTabrow3");
    },
    ApproveAddTabrow2() {
      this.SaveLoading3 = true;
      var obj = {
        groupSheetResults: this.tabrow2.ResultTable,
        assessmentCriteriaTableId: this.tabrow2.assessmentcriteriatableid,
        groupSheetId: this.GroupSheet.id,
        //  assessmentCriteriaTableId: this.tabrow3.assessmentcriteriatablestandarid
      };
      GroupSheetService.UpdateGroupSheetResult(obj)
        .then((res) => {
          this.SaveLoading3 = false;
          this.$bvModal.hide("AddModalTabrow3");
          this.$bvModal.hide("AddModalTabrow2");
          this.getTabrow(this.tabrow.id);
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.SaveLoading3 = false;
        });
    },
    OpenAddModal() {
      this.$bvModal.show("AddModal");
      //   this.tabrow = {
      //     id: 0,
      //     ownerid: 0,
      //     physicaltrainingtypeid: 0,
      //     physicaltrainingtypename: "",
      //     assessmentcriteriatableid: 0,
      //     examstartdate: "",
      //     examstarttime: {
      //       hour: 0,
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //       ticks: 0,
      //     },
      //     examenddate: "",
      //     examendtime: {
      //       hour: 0,
      //       minute: 0,
      //       second: 0,
      //       millisecond: 0,
      //       ticks: 0,
      //     },
      //     examaddress: "",
      //     Status: 1,
      //   };
    },
    CloseAddModal() {
      this.tabrow.id = 0;
      this.$bvModal.hide("AddModal");
      this.Refresh();
      this.$nextTick(() => {
        // this.tabrow = {
        //   id: 0,
        //   ownerid: 0,
        //   physicaltrainingtypeid: 0,
        //   physicaltrainingtypename: "",
        //   assessmentcriteriatableid: 0,
        //   examstartdate: "",
        //   examstarttime: {
        //     hour: 0,
        //     minute: 0,
        //     second: 0,
        //     millisecond: 0,
        //     ticks: 0,
        //   },
        //   examenddate: "",
        //   examendtime: {
        //     hour: 0,
        //     minute: 0,
        //     second: 0,
        //     millisecond: 0,
        //     ticks: 0,
        //   },
        //   examaddress: "",
        //   Status: 1,
        // };
        this.editedIndex = -1;
      });
    },
    OpenAddModalTabrow2() {
      this.$bvModal.show("AddModalTabrow2");
    },
    CloseStandardTable() {
      for (let i = 0; i < this.tabrow2.ResultTable.length; i++) {
        if (this.tabrow2.ResultTable[i].Status == 1) {
          this.tabrow2.ResultTable.splice(i, 1);
        }
      }
      this.$bvModal.hide("AddModalTabrow2");
      this.$nextTick(() => {
        // this.tabrow = {
        //   id: 0,
        //   ownerid: 0,
        //   physicaltrainingtypeid: 0,
        //   physicaltrainingtypename: "",
        //   assessmentcriteriatableid: 0,
        //   examstartdate: "",
        //   examstarttime: {
        //     hour: 0,
        //     minute: 0,
        //     second: 0,
        //     millisecond: 0,
        //     ticks: 0,
        //   },
        //   examenddate: "",
        //   examendtime: {
        //     hour: 0,
        //     minute: 0,
        //     second: 0,
        //     millisecond: 0,
        //     ticks: 0,
        //   },
        //   examaddress: "",
        //   Status: 1,
        // };
        this.editedIndex = -1;
      });
    },
    EditItemGroupSheet(item) {
      this.isEdit = true;
      this.tabrow = {};
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.GroupSheet.GroupSheetTables.indexOf(item);
      // this.tabrow = Object.assign({}, item);
      this.getTabrow(item.id);
      if (!!this.tabrow.id) {
        this.$bvModal.show("AddModal");
      }
    },
    EditItemStandardTable(item) {
      this.intermediateScore = null;
      if (item.Status === 0) {
        item.Status = 2;
      }
      if (this.tabIndex == 0) {
        this.editedIndex = this.tabrow.IJTStandardTable.indexOf(item);
      } else {
        this.editedIndex = this.tabrow.MJTStandardTable.indexOf(item);
      }
      AssessmentCriteriaService.GetAllAssessmentCriteriaTableStandard(
        item.assessmentcriteriatableid
      ).then((res) => {
        this.assessmentcriteriatablestandarlist = res.data;
      });
      this.tabrow2.assessmentcriteriatableid = item.assessmentcriteriatableid;
      this.tabrow3 = {
        id: 0,
        ownerid: 0,
        assessmentcriteriatablestandarid: 0,
        assessmentcriteriatablestandarname: "",
        score: 0,
        techscore: 0,
        totalscore: 0,
        detail: "",
        Status: 1,
        scoretypeid: 0,
        scoretypename: "",
        techscoretypeid: 0,
        istechscore: false,
      };
      this.tabrow2 = Object.assign({}, item);
      console.log(item);
      this.$bvModal.show("AddModalTabrow2");
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    check() {
      var self = this;
      if (
        self.GroupSheet.docnumber === 0 ||
        self.GroupSheet.docnumber === null ||
        self.GroupSheet.docnumber === undefined ||
        self.GroupSheet.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotSelect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
        5;
      }
      var self = this;
      GroupSheetService.Update(self.GroupSheet)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "GroupSheet",
            query: {
              schoolYearId: this.$route.query.schoolYearId,
              higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
              educationFormTypemId: this.$route.query.educationFormTypemId,
              educationLanguageId: this.$route.query.educationLanguageId,
              genderId: this.$route.query.genderId,
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
              dtmId: this.$route.query.dtmId,
            },
          });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
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
    "tabrow3.score": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.calcScore(this.tabrow3);
        }
      },
    },
    "tabrow3.techscore": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.calcScore(this.tabrow3);
        }
      },
    },
  },
};
</script>

<style></style>

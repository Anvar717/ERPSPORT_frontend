<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("CalendarPlan") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input v-model="CalendarPlan.docnumber"></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="CalendarPlan.docdate"
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            @keyup="BindValue"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportEventCategory") }} </label>
          <v-select
            :options="SportEventCategoryList"
            v-model="CalendarPlan.sporteventcategoryid"
            @input="changeSportEventCategory"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <!-- <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportTypeGroup") }} </label>
          <v-select
            :options="SportTypeGroupList"
            v-model="CalendarPlan.sporttypegroupid"
            @input="changeSportTypeGroup"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col> -->
        <b-col
          sm="12"
          md="4"
          class="mt-2"
          v-if="CalendarPlan.sporteventcategoryid == 2"
        >
          <label for=""> {{ $t("SportEventType") }} </label>
          <v-select
            :options="SportEventTypeList"
            @input="changeSportEventType"
            v-model="CalendarPlan.sporteventtypeid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col
          sm="12"
          md="4"
          class="mt-2"
          v-if="CalendarPlan.sporteventcategoryid == 2"
        >
          <label for=""> {{ $t("CompetitionType") }} </label>
          <v-select
            :options="CompetitionTypeList"
            @input="changeCompetition"
            v-model="CalendarPlan.competitiontypeid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportEvent") }} </label>
          <v-select
            :options="SportEventList"
            v-model="CalendarPlan.sporteventid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("detail") }} </label>
          <b-form-input
            :placeholder="$t('detail')"
            autocomplete="details"
            horizontal
            v-model="CalendarPlan.details"
          >
          </b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("startdate") }} </label>
          <custom-date-picker
            v-model="CalendarPlan.startdate"
            style="width: 100%"
            size="sm"
            lang="ru"
            @keyup="BindValue1"
            :placeholder="$t('startdate')"
            value-type="format"
            format="DD.MM.YYYY"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("enddate") }} </label>
          <custom-date-picker
            v-model="CalendarPlan.enddate"
            style="width: 100%"
            size="sm"
            lang="ru"
            @keyup="BindValue2"
            :disabled-date="disableddate"
            :placeholder="$t('enddate')"
            value-type="format"
            format="DD.MM.YYYY"
          ></custom-date-picker>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("") }} </label>
          <b-form-checkbox switch v-model="CalendarPlan.islocationunknown">{{
            $t("islocationunknown")
          }}</b-form-checkbox>
        </b-col>
        <b-col sm="12" md="3" class="mt-2">
          <label for=""> {{ $t("") }} </label>
          <b-form-checkbox switch v-model="CalendarPlan.isparticipantunknown">{{
            $t("isparticipantunknown")
          }}</b-form-checkbox>
        </b-col>
        <b-col sm="12" md="6">
          <b-row>
            <b-col sm="12" md="5" class="mt-3">
              <b-form-file
                ref="fileManage"
                accept=".jpg, .png, .pdf"
                hidden
                plain
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="ChangeFile1"
              ></b-form-file>
              <b-button variant="primary" @click="$refs.fileManage.$el.click()">
                <b-spinner small v-if="fileLoading"></b-spinner>
                <b-icon v-if="!fileLoading" icon="paperclip"></b-icon>
                {{ $t("DoImport") }}
              </b-button>
            </b-col>
            <b-col sm="12" md="7" class="mt-3">
              <div
                class="d-flex my-1"
                v-for="(item, index) in CalendarPlan.FileTables"
                :key="index"
                v-show="item.Status != 3"
              >
                <b-button-group size="sm">
                  <b-button @click="DownloadFile(item)" variant="primary"
                    ><b-icon
                      v-if="DownloadLoading != item.attachmentfileid"
                      icon="download"
                    ></b-icon>
                    <b-spinner
                      small
                      v-if="DownloadLoading == item.attachmentfileid"
                    ></b-spinner>
                  </b-button>
                  <b-button variant="primary">{{
                    item.attachmentfilename
                  }}</b-button>
                  <b-button @click="DeleteFile(item, index)" variant="danger"
                    ><b-icon
                      v-if="DeleteLoading != item.attachmentfileid"
                      icon="trash"
                    >
                      <b-spinner
                        small
                        v-if="DeleteLoading == item.attachmentfileid"
                      ></b-spinner> </b-icon
                  ></b-button>
                </b-button-group>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-tabs>
            <b-tab active class="">
              <template slot="title">
                <b-icon icon="trophy"></b-icon>
                {{ $t("sporttype") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddSportTypeModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="SportTypeFields"
                      :items="CalendarPlan.Tables"
                      class="bg-color-table text-center p-0"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditSportTypeItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteSportTypeItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="" v-if="CalendarPlan.islocationunknown">
              <template slot="title">
                <b-icon icon="geo"></b-icon>
                {{ $t("LoacationTables") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenLocationModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="LoacationFields"
                      :items="CalendarPlan.LocationTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditLocationItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteLocationItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="" v-if="CalendarPlan.isparticipantunknown">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("ParticipantTables") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenParticipantModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="ParticipantFields"
                      :items="CalendarPlan.ParticipantTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditParticipantItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteParticipantItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                    </b-table>
                    <div class="pb-4">
                      <div
                        class="pagination-number"
                        style="float: left; font-size: 12px"
                      >
                        {{ $t("RecordsFrom") }} {{ firstNumber }}
                        {{ $t("by") }} {{ lastNumber }} {{ $t("of") }}
                        {{ totalRows }}
                      </div>
                      <div class="page-limit">
                        <div
                          style="float: left"
                          class="per-page ml-2 mr-2 mt-n1"
                        >
                          <b-form-select
                            v-model="filter.PageLimit"
                            id="PageLimitSelect"
                            size="sm"
                            :options="filter.pageOptions"
                            @input="Refresh"
                          ></b-form-select>
                        </div>
                        <div
                          class="per-page"
                          style="float: left; font-size: 12px"
                        >
                          {{ $t("RecordsPerPage") }}
                        </div>
                      </div>
                      <div style="float: right">
                        <b-pagination
                          v-model="filter.PageNumber"
                          :total-rows="totalRows"
                          :per-page="filter.PageLimit"
                          @input="Refresh"
                          align="right"
                          size="sm"
                          class="my-0 mobile-pagination"
                        ></b-pagination>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="">
              <template slot="title">
                <b-icon icon="credit-card"></b-icon>
                {{ $t("SportEventCalendarBudgetTables") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenRequiredAmountModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="RequiredAmountFields"
                      :items="CalendarPlan.SportEventCalendarBudgetTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditRequiredAmountItem(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteRequiredAmountItem(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                      <template v-slot:cell(quantity)="{ item }">
                        <span class="font-weight-bold">{{
                          item.quantity
                        }}</span>
                      </template>
                      <template v-slot:cell(price)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.price, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                      <template v-slot:cell(amount)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.amount, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="">
              <template slot="title">
                <b-icon icon="credit-card"></b-icon>
                {{ $t("SportEventCalendarBudgetSourceTables") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenBudgetSourceTables">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="p-0">
                  <div class="mobileStyle mx-3">
                    <b-table
                      :fields="BudgetSourceTablesFields"
                      :items="CalendarPlan.SportEventCalendarBudgetSourceTables"
                      class="bg-color-table text-center"
                      style="vertical-align: middle"
                      bordered
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                      </template>
                      <template #cell(actions)="{ item }">
                        <div class="text-center">
                          <b-link
                            @click="EditBudgetSourceTables(item)"
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Edit') }"
                          >
                            <b-icon icon="pencil"></b-icon>
                          </b-link>
                          <b-link
                            class="mr-2"
                            v-c-tooltip="{ content: $t('Delete') }"
                            @click="DeleteBudgetSourceTables(item)"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-link>
                        </div>
                      </template>
                      <template v-slot:cell(quantity)="{ item }">
                        <span class="font-weight-bold">{{
                          item.quantity
                        }}</span>
                      </template>
                      <template v-slot:cell(price)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.price, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                      <template v-slot:cell(amount)="{ item }">
                        <span class="font-weight-bold">{{
                          $options.filters.currency(item.amount, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </template>
                    </b-table>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-modal
        v-model="AddSportTypeModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('sporttype')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("code") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('code')"
                  v-model="SportTypeTabrow.code"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sporttype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sporttypelist"
                  v-model="SportTypeTabrow.sporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("highereduclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="highereduclassifierlist"
                  v-model="Sporttabrow.highereduclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseSportTypeTableModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddSportTypeTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        v-model="ParticipantModal"
        hide-footer
        size="xl"
        no-close-on-backdrop
        :title="$t('ParticipantTables')"
      >
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("SportEventParticipant") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="SportEventParticipantList"
                  v-model="ParticipantTabrow.sporteventparticipantid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-tabs class="mt-1" pills card v-model="activeTab">
          <b-tab :title="$t('byRegion')" key="0" />
          <b-tab :title="$t('byOrganizationType')" key="1" />
        </b-tabs>
        <b-card>
          <!-- Orgs List -->
          <div v-if="activeTab == 0">
            <organization-list-component
              :organizationtypeid="ParticipantTabrow.organizationtypeid"
              @SelectedItem="SelectedOrganizationItem"
              @DblClick="AddOrganizationData"
            >
            </organization-list-component>
            <c-row class="mt-2">
              <c-col class="text-center">
                <b-button
                  variant="primary"
                  @click="AddOrganizationData(organizationvalue)"
                >
                  {{ $t("Add") }}
                </b-button>
              </c-col>
            </c-row>
          </div>
          <!-- Filter by type -->
          <b-row v-else-if="activeTab == 1">
            <b-col sm="12" md="4">
              <label> {{ $t("organizationtype") }} </label>
              <v-select
                :options="organizationtypelist"
                v-model="ParticipantTabrow.organizationtypeid"
                :reduce="(item) => item.id"
                @input="changeOrganizationType"
                :placeholder="$t('organizationtype')"
                label="name"
                style="width: 100%"
                class="mr-2"
              >
              </v-select>
            </b-col>
            <b-col sm="12" md="4">
              <label> {{ $t("schooltype") }} </label>
              <v-select
                :options="schooltypelist"
                v-model="ParticipantTabrow.schooltypeid"
                :reduce="(item) => item.id"
                @input="changeSchoolType"
                :placeholder="$t('schooltype')"
                style="width: 100%"
                class="mr-2"
                label="name"
              >
              </v-select>
            </b-col>
            <b-col sm="3" md="3">
              <label class="mt-4">
                {{
                  $t("byThisFilterFoundOrgs", {
                    count: countFoundOrgs ? countFoundOrgs : 0,
                  })
                }}
              </label>
            </b-col>
            <b-row>
              <b-col class="text-right mt-4">
                <b-button
                  @click="Add"
                  :disabled="!countFoundOrgs"
                  variant="success"
                >
                  {{ $t("Fill") }}
                </b-button>
              </b-col>
            </b-row>
          </b-row>
        </b-card>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("SportEventParticipant") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="SportEventParticipantList"
                  v-model="ParticipantTabrow.sporteventparticipantid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row >
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Oblast") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="OblastList"
                  @input="ChangeOblastParticipant"
                  v-model="ParticipantTabrow.oblastid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row >
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Region") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="RegionList"
                  @input="ChangeRegionParticipant"
                  v-model="ParticipantTabrow.regionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row >
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("organization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportorganizationlist"
                  v-model="ParticipantTabrow.organizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("schooltype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                class="w-100"
                    :options="schooltypelist"
                    v-model="ParticipantTabrow.schooltypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseParticipantModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddParticipantTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row> -->
      </b-modal>
      <b-modal
        v-model="LocationModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('LoacationTables')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Country") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="CountryList"
                  @input="ChangeCountry"
                  v-model="LocationTabrow.countryid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="LocationTabrow.countryid == 211">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Oblast") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="OblastList"
                  @input="ChangeOblast"
                  v-model="LocationTabrow.oblastid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="LocationTabrow.countryid == 211">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Region") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="RegionList"
                  @input="ChangeRegion"
                  v-model="LocationTabrow.regionid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="LocationTabrow.countryid == 211">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sportorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportorganizationlist"
                  @input="ChangeOrg"
                  v-model="LocationTabrow.sportorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="LocationTabrow.countryid == 211">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("orgbuildinginfoname") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="orgbuildinginfolist"
                  @input="ChangeOrgBuild"
                  v-model="LocationTabrow.orgbuildinginfoid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="orgbuildinginfoname"
                ></v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("address") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('address')"
                  v-model="LocationTabrow.address"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseLocationTableModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddLocationTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        v-model="RequiredAmountModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('SportEventCalendarBudgetTables')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("ItemOfExpense") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="SportItemOfExpenseList"
                  v-model="RequiredAmountTabrow.sportitemofexpenseid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("Quantity") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  class="mb-0"
                  type="number"
                  style="width: 100%"
                  @input="changeQuantity"
                  v-model="RequiredAmountTabrow.quantity"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("price") }}
              </label>
              <div class="col-sm-8 d-flex">
                <custom-number-input
                  class="mb-0"
                  style="width: 100%"
                  @input="changeQuantity"
                  v-model="RequiredAmountTabrow.price"
                ></custom-number-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("RowTotalSum") }}
              </label>
              <div class="col-sm-8 d-flex">
                <custom-number-input
                  class="mb-0"
                  disabled
                  style="width: 100%"
                  v-model="RequiredAmountTabrow.amount"
                ></custom-number-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("detail") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('detail')"
                  v-model="RequiredAmountTabrow.detail"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseRequiredAmountModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddRequiredAmountTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        v-model="BudgetSourceModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('SportEventCalendarBudgetSourceTables')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sourceoffinance") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sourceoffinancelist"
                  v-model="BudgetSourceTabrow.sourceoffinanceid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("amount") }}
              </label>
              <div class="col-sm-8 d-flex">
                <custom-number-input
                  class="mb-0"
                  style="width: 100%"
                  v-model="BudgetSourceTabrow.amount"
                ></custom-number-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseBudgetSourceModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddBudgetSource">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-row class="mt-1">
        <b-col>
          <div class="text-left">
            <b-button
              class="ml-0"
              size="sm"
              variant="danger"
              @click="$router.push({ name: 'CalendarPlan' })"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </b-button>
          </div>
        </b-col>
        <b-col>
          <div class="text-right">
            <b-button
              size="sm"
              variant="success"
              class="mr-0"
              @click="SaveData"
            >
              <b-spinner v-if="SaveLoading" small></b-spinner>
              <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
              {{ $t("Save") }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
} from "bootstrap-vue";
//import CalendarPlanService from "@/services/CalendarPlan.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import EmployeeList from "@/components/EmployeeList";
import SportEventCalendarService from "@/services/SportEventCalendar.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";
import SportEventParticipantService from "@/services/SportEventParticipant.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import SportEventService from "@/services/SportEvent.service";
import SportTypeGroupService from "@/services/SportTypeGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import CountryService from "@/services/Country.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import PersonList from "@/components/PersonList";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import CurrencyService from "@/services/Currency.service";
import FileManageService from "@/services/filemanage.service";
import OrganizationService from "@/services/organization.service";
import CustomDatePicker from "../../../components/customDatePicker.vue";
import OrganizationBuildingInfoService from "@/services/OrganizationBuildingInfo.service";
import SchoolTypeService from "@/services/SchoolType.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";
import SportItemOfExpenseService from '@/services/sportitemofexpense.service';
import SourceOffinanceService from "@/services/SourceOfFinance.service";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    DatePicker,
    vSelect,
    BButton,
    BTable,
    PersonList,
    EmployeeList,
    CustomDatePicker,
    OrganizationListComponent,
  },
  data() {
    return {
      show: false,
      CalendarPlan: {},
      SaveLoading: false,
      BudgetSourceModal:false,
      loading: false,
      AddSportTypeModal: false,
      ParticipantModal: false,
      LocationModal: false,
      organizationvalue: null,
      RequiredAmountModal: false,
      activeTab: 0,
      schoolyearlist: [],
      SportEventCategoryList: [],
      schooltypelist: [],
      SportEventTypeList: [],
      sourceoffinancelist:[],
      sporttypelist: [],
      CompetitionTypeList: [],
      sportorganizationlist: [],
      sportgrouplist: [],
      CountryList: [],
      SportTypeGroupList: [],
      OblastList: [],
      RegionList: [],
      sporttitlelist: [],
      UnitOfMeasureList: [],
      organizationtypelist: [],
      CurrencyList: [],
      SportEventList: [],
      SportEventParticipantList: [],
      highereduclassifierlist: [],
      orgbuildinginfolist: [],
      studentvalue: {},
      lang: localStorage.getItem("locale") || "ru",
      coachvalue: {},
      editedIndex: -1,
      editedIndex1: -1,
      editedIndex2: -1,
      editedIndex3: -1,
      editedIndex4:-1,
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      filter: {
        sporteventcalendarid: 0,
        oblastid: 0,
        regionid: 0,
        organizationid: 0,
        organizationtypeid: 0,
        schooltypeid: 0,
        Search: "",
        SortColumn: "",
        PageNumber: 1,
        PageLimit: 20,
        OrderType: "asc",
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
      },
      AttachedFiles: [],
      SportItemOfExpenseList:[],
      SportTypeTabrow: {
        id: 0,
        ownerid: 0,
        code: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        Status: 1,
      },
      ParticipantTabrow: {
        id: 0,
        ownerid: 0,
        sporteventparticipantid: 0,
        sporteventparticipantname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        organizationtypeid: 0,
        organizationtypename: "",
        schooltypeid: 0,
        schooltypename: "",
        Status: 1,
      },
      LocationTabrow: {
        id: 0,
        ownerid: 0,
        countryid: 0,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        orgbuildinginfoname: "",
        address: "",
        Status: 1,
      },
      RequiredAmountTabrow: {
        id: 0,
        ownerid: 0,
        sportitemofexpenseid: 0,
        sportitemofexpensename:0,
        price: 0,
        amount: 0,
        quantity: 0,
        detail: "",
        Status: 1,
      },
      BudgetSourceTabrow: {
        id: 0,
        ownerid: 0,
        sourceoffinanceid: 0,
        sourceoffinancename:0,
        amount: 0,
        Status: 1,
      },
      DeleteLoading: false,
      DownloadLoading: false,
      fileLoading: false,
      totalRows: 0,
      countFoundOrgs: null,
      SportTypeFields: [
        {
          key: "code",
          label: this.$t("code"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttype"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      LoacationFields: [
        {
          key: "countryname",
          label: this.$t("Country"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportorganizationname",
          label: this.$t("sportorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "orgbuildinginfoname",
          label: this.$t("orgbuildinginfoname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      ParticipantFields: [
        // {
        //   key: "sporteventparticipantname",
        //   label: this.$t("SportEventParticipant"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        {
          key: "oblastname",
          label: this.$t("Oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("Region"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "schooltypename",
          label: this.$t("schooltype"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      RequiredAmountFields: [
        {
          key: "sportitemofexpensename",
          label: this.$t("SportItemOfExpense"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "quantity",
          label: this.$t("Quantity"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "price",
          label: this.$t("price"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "amount",
          label: this.$t("RowTotalSum"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        {
          key: "detail",
          label: this.$t("detail"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      BudgetSourceTablesFields: [
        {
          key: "sourceoffinancename",
          label: this.$t("sourceoffinance"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "amount",
          label: this.$t("RowTotalSum"),
          thClass: "text-center",
          tdClass: "text-right",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
    };
  },
  created() {
    this.show = true;
    SportEventCalendarService.Get(this.$route.params.id)
      .then((res) => {
        this.CalendarPlan = res.data;
        this.Refresh();
        this.getItemOfExpenceService();
        if (!!this.CalendarPlan.sporteventcategoryid) {
          SportEventService.GetAll(
            this.CalendarPlan.sporteventcategoryid,
            this.CalendarPlan.sporteventtypeid,
            this.CalendarPlan.competitiontypeid
          ).then((res) => {
            this.SportEventList = res.data;
          });
        }
        if (!!this.CalendarPlan.sporteventtypeid) {
          CompetitionTypeService.GetAll(
            this.CalendarPlan.sporteventtypeid
          ).then((res) => {
            this.CompetitionTypeList = res.data;
          });
        }
        if (!!this.CalendarPlan.sporteventcategoryid) {
          SportEventTypeService.GetAll(
            this.CalendarPlan.sporteventcategoryid
          ).then((res) => {
            this.SportEventTypeList = res.data;
          });
        }
        OblastService.GetAll(this.lang, 0, false).then((res) => {
          this.OblastList = res.data;
        });
        SchoolTypeService.GetAll().then((res) => {
          this.schooltypelist = res.data;
        });
        this.show = false;
        if (this.$route.params.id == 0) {
          // this.createDate();
          this.CalendarPlan.docdate = "05.01.2023";
          this.CalendarPlan.startdate = "05.01.2023";
          this.CalendarPlan.enddate = "31.12.2023";
        }
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    SportEventCategoryService.GetAll().then((res) => {
      this.SportEventCategoryList = res.data;
    });
    SportEventParticipantService.GetAll().then((res) => {
      this.SportEventParticipantList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.sporttypelist = res.data;
    });
    CountryService.GetAll(this.lang, 0, false).then((res) => {
      this.CountryList = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.UnitOfMeasureList = res.data;
    });
    CurrencyService.GetAll().then((res) => {
      this.CurrencyList = res.data;
    });
    OrganizationTypeService.GetAll().then((res) => {
      this.organizationtypelist = res.data;
    });
    SourceOffinanceService.GetAll().then((res) => {
      this.sourceoffinancelist = res.data;
    });
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    changeQuantity() {
      if (
        !!this.RequiredAmountTabrow.price &&
        !!this.RequiredAmountTabrow.quantity
      ) {
        this.RequiredAmountTabrow.amount =
          this.RequiredAmountTabrow.price * this.RequiredAmountTabrow.quantity;
      } else {
        this.RequiredAmountTabrow.amount = 0;
      }
    },
    getItemOfExpenceService(){
      SportItemOfExpenseService.GetAll()
      .then((res) => {
        this.SportItemOfExpenseList = res.data;
        // this.SportItemOfExpenseList = res.data.filter(el => {
        //     let hasInTable = this.step1list.some(e => e.sportitemofexpenseid == el.id)
        //     if (!hasInTable) {
        //       return el
        //     }
        //   });   
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    },
    BindValue(value) {
      this.CalendarPlan.docdate = value;
    },
    BindValue1(value) {
      this.CalendarPlan.startdate = value;
    },
    BindValue2(value) {
      this.CalendarPlan.enddate = value;
    },
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.CalendarPlan.startdate = dd + "." + mm + "." + yyyy;
      this.CalendarPlan.enddate = dd + "." + mm + "." + yyyy;
    },
    disableddate(date) {
      // console.log(date)
      // var todaydate = new Date();
      // var dd = String(todaydate.getDate()).padStart(2, "0");
      // var mm = String(todaydate.getMonth()).padStart(2, "0");
      // var yyyy = todaydate.getFullYear();
      // return date > new Date(parseInt(yyyy), parseInt(mm), parseInt(dd));
      if (!!this.CalendarPlan.startdate) {
        let arr = this.CalendarPlan.startdate.split(".");
        return date < new Date(arr[2], arr[1] - 1, arr[0]);
      }
    },
    DeleteFile(item, index) {
      // this.DeleteFileLoading = item.id
      // FileManageService.Delete(item.id).then(res => {
      //   this.DeleteFileLoading = ""
      if (item.Status == 1) {
        this.CalendarPlan.FileTables.splice(index, 1);
      } else {
        this.CalendarPlan.FileTables.forEach(function (item) {
          if (el.attachmentfileid == item.attachmentfileid) {
            item.Status = 3;
          }
        });
      }
    },
    Add() {
      if (!this.ParticipantTabrow.organizationtypeid) {
        this.makeToast(this.$t('organizationTypeNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      if (!this.ParticipantTabrow.schooltypeid) {
        this.makeToast(this.$t('schoolTypeNotSelected'), this.$t('Error'), 'danger')
        return false
      }
      let formData = {
        schoolTypeId: this.ParticipantTabrow.schooltypeid,
        organizationTypeId: this.ParticipantTabrow.organizationtypeid,
        sportEventCalendarId: this.CalendarPlan.id,
      }
      this.loading =true
      SportEventCalendarService.Fill(formData.sportEventCalendarId, formData.organizationTypeId, formData.schoolTypeId).then(res =>{
        this.Refresh()
      }).finally(() => {
        this.loading = false
        this.ParticipantModal = false
        this.tabrow = {}
      })
      
    },
    changeSportEventCategory() {
      this.CalendarPlan.sporteventid = 0;
      this.CalendarPlan.competitiontypeid = 0;
      this.CalendarPlan.sporteventtypeid = 0;
      if (
        !!this.CalendarPlan.sporteventcategoryid &&
        this.CalendarPlan.sporteventcategoryid == 2
      ) {
        SportEventTypeService.GetAll(
          this.CalendarPlan.sporteventcategoryid
        ).then((res) => {
          this.SportEventTypeList = res.data;
        });
      } else if (this.CalendarPlan.sporteventcategoryid == 1) {
        SportEventService.GetAll(
          this.CalendarPlan.sporteventcategoryid,
          this.CalendarPlan.sporteventtypeid,
          this.CalendarPlan.competitiontypeid
        ).then((res) => {
          this.SportEventList = res.data;
        });
      } else if (this.CalendarPlan.sporteventcategoryid == 3) {
        SportEventService.GetAll(
          this.CalendarPlan.sporteventcategoryid,
          this.CalendarPlan.sporteventtypeid,
          this.CalendarPlan.competitiontypeid
        ).then((res) => {
          this.SportEventList = res.data;
        });
      } else if (this.CalendarPlan.sporteventcategoryid == 4) {
        SportEventService.GetAll(
          this.CalendarPlan.sporteventcategoryid,
          this.CalendarPlan.sporteventtypeid,
          this.CalendarPlan.competitiontypeid
        ).then((res) => {
          this.SportEventList = res.data;
        });
      }
    },
    changeSportEventType() {
      this.CalendarPlan.competitiontypeid = 0;
      this.CalendarPlan.sporteventid = 0;
      if (!!this.CalendarPlan.sporteventtypeid) {
        CompetitionTypeService.GetAll(this.CalendarPlan.sporteventtypeid).then(
          (res) => {
            this.CompetitionTypeList = res.data;
          }
        );
      }
    },
    changeCompetition() {
      this.CalendarPlan.sporteventid = 0;
      if (!!this.CalendarPlan.sporteventcategoryid) {
        SportEventService.GetAll(
          this.CalendarPlan.sporteventcategoryid,
          this.CalendarPlan.sporteventtypeid,
          this.CalendarPlan.competitiontypeid
        ).then((res) => {
          this.SportEventList = res.data;
        });
      }
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
    DownloadFile() {
      this.DownloadLoading = this.FileAttach.attachmentfileid;
      FileManageService.Get(this.FileAttach.attachmentfileid, 1)
        .then((res) => {
          this.DownloadLoading = "";
          this.forceFileDownload(res, this.FileAttach.attachmentfilename);
        })
        .catch((error) => {
          this.DownloadLoading = "";
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    ChangeOrgBuild() {
      var self = this;
      if (!!self.LocationTabrow.orgbuildinginfoid) {
        self.LocationTabrow.address = self.orgbuildinginfolist.filter(
          (item) => item.id === self.LocationTabrow.orgbuildinginfoid
        )[0].address;
      }
    },
    ChangeFile1(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 4194304) {
          this.fileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.CalendarPlan.FileTables.push({
                id: 0,
                ownerid: 0,
                attachmentfileid: res.data.id,
                attachmentfilename: res.data.pfiletext,
                attachmentfiletype: res.data.pfiletype,
                Status: 1,
              });
              this.fileLoading = false;
            })
            .catch((error) => {
              this.fileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan4mb"),
            this.$t("error"),
            "danger"
          );
        }
      }
    },
    changeOrganizationType(orgId){
      this.ParticipantTabrow.organizationtypename = this.organizationtypelist.filter(el => el.id == orgId)[0].name
      if (this.ParticipantTabrow.schooltypeid) {
        this.getOrganizationCount()
      }
    },
    changeSchoolType(Id){
      this.ParticipantTabrow.schooltypename = this.schooltypelist.filter(el => el.id == Id)[0].name
      if (this.ParticipantTabrow.organizationtypeid) {
        this.getOrganizationCount()
      }
    },
    getOrganizationCount(){
      if (this.ParticipantTabrow.organizationtypeid && this.ParticipantTabrow.schooltypeid) {
        OrganizationService.GetOrganizationCount({ schoolTypeId: this.ParticipantTabrow.schooltypeid, organizationTypeId: this.ParticipantTabrow.organizationtypeid}).then((res) => {
          this.countFoundOrgs = res.data;
        });
      }
    },
    ChangeCountry() {
      this.LocationTabrow.oblastid = 0;
      this.LocationTabrow.oblastname = "";
      this.LocationTabrow.regionid = 0;
      this.LocationTabrow.regionname = "";
      this.LocationTabrow.sportorganizationid = 0;
      this.LocationTabrow.sportorganizationname = "";
      this.LocationTabrow.orgbuildinginfoid = 0;
      this.LocationTabrow.orgbuildinginfoname = "";
      if (!!this.LocationTabrow.countryid) {
        OblastService.GetAll(this.lang, 0, false).then((res) => {
          this.OblastList = res.data;
        });
      }
    },
    ChangeOblast() {
      this.LocationTabrow.regionid = 0;
      this.LocationTabrow.regionname = "";
      this.LocationTabrow.sportorganizationid = 0;
      this.LocationTabrow.sportorganizationname = "";
      this.LocationTabrow.orgbuildinginfoid = 0;
      this.LocationTabrow.orgbuildinginfoname = "";
      if (!!this.LocationTabrow.oblastid) {
        RegionService.GetAll(this.lang, this.LocationTabrow.oblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
    },
    ChangeOblastParticipant() {
      this.ParticipantTabrow.regionid = 0;
      this.ParticipantTabrow.regionname = "";
      this.ParticipantTabrow.organizationid = 0;
      this.ParticipantTabrow.organizationname = "";
      if (!!this.ParticipantTabrow.oblastid) {
        RegionService.GetAll(this.lang, this.ParticipantTabrow.oblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
    },
    ChangeRegion() {
      this.LocationTabrow.sportorganizationid = 0;
      this.LocationTabrow.sportorganizationname = "";
      this.LocationTabrow.orgbuildinginfoid = 0;
      this.LocationTabrow.orgbuildinginfoname = "";
      if (!!this.LocationTabrow.regionid) {
        OrganizationService.GetAll(
          this.LocationTabrow.oblastid,
          this.LocationTabrow.regionid
        ).then((res) => {
          this.sportorganizationlist = res.data;
        });
      }
    },
    ChangeRegionParticipant() {
      this.ParticipantTabrow.organizationid = 0;
      this.ParticipantTabrow.organizationname = "";
      if (!!this.ParticipantTabrow.regionid) {
        OrganizationService.GetAll(
          this.ParticipantTabrow.oblastid,
          this.ParticipantTabrow.regionid
        ).then((res) => {
          this.sportorganizationlist = res.data;
        });
      }
    },
    ChangeOrg() {
      if (!!this.LocationTabrow.sportorganizationid) {
        OrganizationBuildingInfoService.GetAll(
          this.LocationTabrow.sportorganizationid
        ).then((res) => {
          this.orgbuildinginfolist = res.data;
        });
      }
    },
    OpenAddSportTypeModal() {
      if (!this.check()) {
        return false;
      }
      if (this.CalendarPlan.id == 0) {
        this.UpdateData();
      }
      this.AddSportTypeModal = true;
      this.SportTypeTabrow = {
        id: 0,
        ownerid: 0,
        code: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        Status: 1,
      };
    },
    OpenBudgetSourceTables() {
      if (!this.check()) {
        return false;
      }
      if (this.CalendarPlan.id == 0) {
        this.UpdateData();
      }
      this.BudgetSourceModal = true;
      this.BudgetSourceTabrow = {
        id: 0,
        ownerid: 0,
        sourceoffinanceid: 0,
        sourceoffinancename:0,
        amount: 0,
        Status: 1
      };
    },
    OpenParticipantModal() {
      if (!this.check()) {
        return false;
      }
      if (this.CalendarPlan.id == 0) {
        this.UpdateData();
      }
      this.ParticipantModal = true;
      this.ParticipantTabrow = {
        id: 0,
        ownerid: 0,
        sporteventparticipantid: 0,
        sporteventparticipantname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        schooltypeid: 0,
        schooltypename: "",
        organizationtypeid: 0,
        organizationtypename: "",
        Status: 1,
      };
    },
    OpenRequiredAmountModal() {
      if (!this.check()) {
        return false;
      }
      if (this.CalendarPlan.id == 0) {
        this.UpdateData();
      }
      this.RequiredAmountModal = true;
      this.RequiredAmountTabrow = {
        id: 0,
        ownerid: 0,
        sportitemofexpenseid: 0,
        sportitemofexpensename:0,
        price: 0,
        amount: 0,
        quantity: 0,
        detail: "",
        Status: 1,
      };
    },
    check() {
      var self = this;

      if (
        self.CalendarPlan.docnumber === 0 ||
        self.CalendarPlan.docnumber === null ||
        self.CalendarPlan.docnumber === undefined ||
        self.CalendarPlan.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalendarPlan.docdate === 0 ||
        self.CalendarPlan.docdate === null ||
        self.CalendarPlan.docdate === undefined ||
        self.CalendarPlan.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.CalendarPlan.sporteventcategoryid === 0 ||
        self.CalendarPlan.sporteventcategoryid === null ||
        self.CalendarPlan.sporteventcategoryid === undefined ||
        self.CalendarPlan.sporteventcategoryid === ""
      ) {
        this.makeToast(
          this.$t("sporteventcategoryidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.CalendarPlan.sporteventcategoryid == 2) {
        if (
          self.CalendarPlan.sporteventtypeid === 0 ||
          self.CalendarPlan.sporteventtypeid === null ||
          self.CalendarPlan.sporteventtypeid === undefined ||
          self.CalendarPlan.sporteventtypeid === ""
        ) {
          this.makeToast(
            this.$t("sporteventtypeidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.CalendarPlan.competitiontypeid === 0 ||
          self.CalendarPlan.competitiontypeid === null ||
          self.CalendarPlan.competitiontypeid === undefined ||
          self.CalendarPlan.competitiontypeid === ""
        ) {
          this.makeToast(
            this.$t("competitiontypeidNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      // if (
      //   self.CalendarPlan.sporteventid === 0 ||
      //   self.CalendarPlan.sporteventid === null ||
      //   self.CalendarPlan.sporteventid === undefined ||
      //   self.CalendarPlan.sporteventid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("sporteventidNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.CalendarPlan.orderdate === 0 ||
      //   self.CalendarPlan.orderdate === null ||
      //   self.CalendarPlan.orderdate === undefined ||
      //   self.CalendarPlan.orderdate === ""
      // ) {
      //   this.makeToast(
      //     this.$t("orderdate1NotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      return true;
    },
    CloseBudgetSourceModal() {
      this.BudgetSourceModal = false;
      this.$nextTick(() => {
        this.BudgetSourceTabrow = {
          id: 0,
        ownerid: 0,
        sourceoffinanceid: 0,
        sourceoffinancename:0,
        amount: 0,
        Status: 1
        };
        this.editedIndex4 = -1;
      });
    },
    CloseSportTypeTableModal() {
      this.AddSportTypeModal = false;
      this.$nextTick(() => {
        this.SportTypeTabrow = {
          id: 0,
          ownerid: 0,
          code: "",
          sporttypeclassifierid: 0,
          sporttypeclassifiername: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    CloseLocationTableModal() {
      this.LocationModal = false;
      this.$nextTick(() => {
        this.LocationTabrow = {
          id: 0,
          ownerid: 0,
          countryid: 0,
          countryname: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          sportorganizationid: 0,
          sportorganizationname: "",
          orgbuildinginfoid: 0,
          orgbuildinginfoname: "",
          address: "",
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    CloseParticipantModal() {
      this.ParticipantModal = false;
      this.$nextTick(() => {
        this.ParticipantTabrow = {
          id: 0,
          ownerid: 0,
          sporteventparticipantid: 0,
          sporteventparticipantname: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          organizationid: 0,
          organizationname: "",
          schooltypeid: 0,
          schooltypename: "",
          organizationtypeid: 0,
          organizationtypename: "",
          Status: 1,
        };
        this.editedIndex2 = -1;
      });
    },
    CloseRequiredAmountModal() {
      this.RequiredAmountModal = false;
      this.$nextTick(() => {
        this.RequiredAmountTabrow = {
          id: 0,
          ownerid: 0,
          sportitemofexpenseid: 0,
        sportitemofexpensename:0,
          price: 0,
          amount: 0,
          quantity: 0,
          detail: "",
          Status: 1,
        };
        this.editedIndex3 = -1;
      });
    },
    EditSportTypeItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.CalendarPlan.Tables.indexOf(item);
      this.SportTypeTabrow = Object.assign({}, item);
      this.AddSportTypeModal = true;
    },
    DeleteSportTypeItem(item) {
      item;
      item.Status = 3;
    },
    EditParticipantItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.CalendarPlan.ParticipantTables.indexOf(item);
      this.ParticipantTabrow = Object.assign({}, item);
      if (!!this.ParticipantTabrow.oblastid) {
        RegionService.GetAll(this.lang, this.ParticipantTabrow.oblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
      if (!!this.ParticipantTabrow.regionid) {
        OrganizationService.GetAll(
          this.ParticipantTabrow.oblastid,
          this.ParticipantTabrow.regionid
        ).then((res) => {
          this.sportorganizationlist = res.data;
        });
      }
      this.ParticipantModal = true;
    },
    EditRequiredAmountItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex3 = this.CalendarPlan.SportEventCalendarBudgetTables.indexOf(item);
      this.RequiredAmountTabrow = Object.assign({}, item);
      this.RequiredAmountModal = true;
    },
    DeleteParticipantItem(item) {
      SportEventCalendarService.DeleteSportEventCalendarParticipantTable(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    EditBudgetSourceTables(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex4 = this.CalendarPlan.SportEventCalendarBudgetSourceTables.indexOf(item);
      this.BudgetSourceTabrow = Object.assign({}, item);
      this.BudgetSourceModal = true;
    },
    DeleteBudgetSourceTables(item) {
      item;
      item.Status = 3;
    },
    DeleteRequiredAmountItem(item) {
      item;
      item.Status = 3;
    },
    EditLocationItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.CalendarPlan.LocationTables.indexOf(item);
      this.LocationTabrow = Object.assign({}, item);
      if (!!this.LocationTabrow.oblastid) {
        RegionService.GetAll(this.lang, this.LocationTabrow.oblastid).then(
          (res) => {
            this.RegionList = res.data;
          }
        );
      }
      if (!!this.LocationTabrow.countryid) {
        OblastService.GetAll(this.lang, 0, false).then((res) => {
          this.OblastList = res.data;
        });
      }
      if (!!this.LocationTabrow.regionid) {
        OrganizationService.GetAll(
          this.LocationTabrow.oblastid,
          this.LocationTabrow.regionid
        ).then((res) => {
          this.sportorganizationlist = res.data;
        });
      }
      this.ChangeOrg();
      this.LocationModal = true;
    },
    DeleteLocationItem(item) {
      item;
      item.Status = 3;
    },
    AddSportTypeTable() {
      var self = this;
      if (
        self.SportTypeTabrow.code === null ||
        self.SportTypeTabrow.code === undefined ||
        self.SportTypeTabrow.code === 0 ||
        self.SportTypeTabrow.code === ""
      ) {
        self.$makeToast(self.$t("CodeNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportTypeTabrow.sporttypeclassifierid === null ||
        self.SportTypeTabrow.sporttypeclassifierid === undefined ||
        self.SportTypeTabrow.sporttypeclassifierid === 0 ||
        self.SportTypeTabrow.sporttypeclassifierid === ""
      ) {
        self.$makeToast(
          self.$t("circlesporttypeNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.SportTypeTabrow.sporttypeclassifierid) {
        self.SportTypeTabrow.sporttypeclassifiername =
          self.sporttypelist.filter(
            (item) => item.id === self.SportTypeTabrow.sporttypeclassifierid
          )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.CalendarPlan.Tables[self.editedIndex],
          self.SportTypeTabrow
        );
      } else {
        self.CalendarPlan.Tables.push(self.SportTypeTabrow);
      }
      self.SportTypeTabrow = {
        id: 0,
        ownerid: 0,
        code: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        Status: 1,
      };
      this.AddSportTypeModal = false;
    },
    AddBudgetSource() {
      var self = this;
      if (
        self.BudgetSourceTabrow.sourceoffinanceid === null ||
        self.BudgetSourceTabrow.sourceoffinanceid === undefined ||
        self.BudgetSourceTabrow.sourceoffinanceid === 0 ||
        self.BudgetSourceTabrow.sourceoffinanceid === ""
      ) {
        self.$makeToast(self.$t("sourceoffinanceNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.BudgetSourceTabrow.amount === null ||
        self.BudgetSourceTabrow.amount === undefined ||
        self.BudgetSourceTabrow.amount === 0 ||
        self.BudgetSourceTabrow.amount === ""
      ) {
        self.$makeToast(
          self.$t("amountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.BudgetSourceTabrow.sourceoffinanceid) {
        self.BudgetSourceTabrow.sourceoffinancename =
          self.sourceoffinancelist.filter(
            (item) => item.id === self.BudgetSourceTabrow.sourceoffinanceid
          )[0].name;
      }
      if (self.editedIndex4 > -1) {
        Object.assign(
          self.CalendarPlan.SportEventCalendarBudgetSourceTables[self.editedIndex4],
          self.BudgetSourceTabrow
        );
      } else {
        self.CalendarPlan.SportEventCalendarBudgetSourceTables.push(self.BudgetSourceTabrow);
      }
      self.BudgetSourceTabrow = {
        id: 0,
        ownerid: 0,
        sourceoffinanceid: 0,
        sourceoffinancename: 0,
        amount: 0,
        Status: 1
      }
      this.BudgetSourceModal = false;
    },
    AddOrganizationData(data) {
      this.ParticipantTabrow = {
        id: 0,
        ownerid: 0,
        oblastid: data.oblastid,
        oblastname: data.oblast,
        regionid: data.regionid,
        regionname: data.region,
        organizationid: data.id,
        organizationname: data.fullname,
        organizationtypeid: data.organizationtypeid,
        organizationtypename: data.organizationtypename,
        schooltypeid: data.schooltypeid,
        schooltypename: data.schooltypename,
        sporteventparticipantid: 0,
        Status: this.ParticipantTabrow.Status,
      };
      this.AddParticipantTable();
    },
    SelectedOrganizationItem(value) {
      this.organizationvalue = value;
    },
    AddParticipantTable() {
      var self = this;
      // if (
      //   self.ParticipantTabrow.sporteventparticipantid === null ||
      //   self.ParticipantTabrow.sporteventparticipantid === undefined ||
      //   self.ParticipantTabrow.sporteventparticipantid === 0 ||
      //   self.ParticipantTabrow.sporteventparticipantid === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("sporteventparticipantNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.ParticipantTabrow.oblastid === null ||
        self.ParticipantTabrow.oblastid === undefined ||
        self.ParticipantTabrow.oblastid === 0 ||
        self.ParticipantTabrow.oblastid === ""
      ) {
        self.$makeToast(
          self.$t("oblastNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ParticipantTabrow.regionid === null ||
        self.ParticipantTabrow.regionid === undefined ||
        self.ParticipantTabrow.regionid === 0 ||
        self.ParticipantTabrow.regionid === ""
      ) {
        self.$makeToast(
          self.$t("regionNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ParticipantTabrow.organizationid === null ||
        self.ParticipantTabrow.organizationid === undefined ||
        self.ParticipantTabrow.organizationid === 0 ||
        self.ParticipantTabrow.organizationid === ""
      ) {
        self.$makeToast(
          self.$t("organizationNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.ParticipantTabrow.schooltypeid === null ||
      //   self.ParticipantTabrow.schooltypeid === undefined ||
      //   self.ParticipantTabrow.schooltypeid === 0 ||
      //   self.ParticipantTabrow.schooltypeid === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("schooltypeNotSelected"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (!!self.ParticipantTabrow.sporteventparticipantid) {
      //   self.ParticipantTabrow.sporteventparticipantname =
      //     self.SportEventParticipantList.filter(
      //       (item) => item.id === self.ParticipantTabrow.sporteventparticipantid
      //     )[0].name;
      // }
      // if (!!self.ParticipantTabrow.oblastid) {
      //   self.ParticipantTabrow.oblastname = self.OblastList.filter(
      //     (item) => item.id === self.ParticipantTabrow.oblastid
      //   )[0].name;
      // }
      // if (!!self.ParticipantTabrow.regionid) {
      //   self.ParticipantTabrow.regionname = self.RegionList.filter(
      //     (item) => item.id === self.ParticipantTabrow.regionid
      //   )[0].name;
      // }
      // if (!!self.ParticipantTabrow.organizationid) {
      //   self.ParticipantTabrow.organizationname = self.sportorganizationlist.filter(
      //     (item) => item.id === self.ParticipantTabrow.organizationid
      //   )[0].name;
      // }
      if (!!self.ParticipantTabrow.schooltypeid) {
        self.ParticipantTabrow.schooltypename = self.schooltypelist.filter(
          (item) => item.id === self.ParticipantTabrow.schooltypeid
        )[0].name;
      }
      if (!!self.ParticipantTabrow.organizationtypeid) {
        self.ParticipantTabrow.organizationtypename =
          self.organizationtypelist.filter(
            (item) => item.id === self.ParticipantTabrow.organizationtypeid
          )[0].name;
      }
      if (!!self.CalendarPlan.id) {
        self.ParticipantTabrow.ownerid = self.CalendarPlan.id
      }
      SportEventCalendarService.UpdateSportEventCalendarParticipantTable(self.ParticipantTabrow)
        .then((res) => {
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.RefreshParticipant();
          self.Refresh();
        })
        .catch((error) => {
          self.$makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          self.RefreshParticipant();
          self.Refresh();
        });
    },
    RefreshParticipant() {
      this.ParticipantTabrow = {
        id: 0,
        ownerid: 0,
        sporteventparticipantid: 0,
        sporteventparticipantname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        schooltypeid: 0,
        schooltypename: "",
        organizationtypeid: 0,
        organizationtypename: "",
        Status: 1,
      };
      this.ParticipantModal = false;
    },
    AddRequiredAmountTable() {
      var self = this;
      if (
        self.RequiredAmountTabrow.sportitemofexpenseid === null ||
        self.RequiredAmountTabrow.sportitemofexpenseid === undefined ||
        self.RequiredAmountTabrow.sportitemofexpenseid === 0 ||
        self.RequiredAmountTabrow.sportitemofexpenseid === ""
      ) {
        self.$makeToast(
          self.$t("sportitemofexpenseNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RequiredAmountTabrow.quantity === null ||
        self.RequiredAmountTabrow.quantity === undefined ||
        self.RequiredAmountTabrow.quantity === 0 ||
        self.RequiredAmountTabrow.quantity === ""
      ) {
        self.$makeToast(
          self.$t("quantityNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.RequiredAmountTabrow.price === null ||
        self.RequiredAmountTabrow.price === undefined ||
        self.RequiredAmountTabrow.price === 0 ||
        self.RequiredAmountTabrow.price === ""
      ) {
        self.$makeToast(self.$t("priceNotCorrect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.RequiredAmountTabrow.amount === null ||
        self.RequiredAmountTabrow.amount === undefined ||
        self.RequiredAmountTabrow.amount === 0 ||
        self.RequiredAmountTabrow.amount === ""
      ) {
        self.$makeToast(
          self.$t("amountNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.RequiredAmountTabrow.detail === null ||
      //   self.RequiredAmountTabrow.detail === undefined ||
      //   self.RequiredAmountTabrow.detail === 0 ||
      //   self.RequiredAmountTabrow.detail === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("detailNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (!!self.RequiredAmountTabrow.sportitemofexpenseid) {
        self.RequiredAmountTabrow.sportitemofexpensename =
          self.SportItemOfExpenseList.filter(
            (item) => item.id === self.RequiredAmountTabrow.sportitemofexpenseid
          )[0].name;
      }
      if (self.editedIndex3 > -1) {
        Object.assign(
          self.CalendarPlan.SportEventCalendarBudgetTables[self.editedIndex3],
          self.RequiredAmountTabrow
        );
      } else {
        self.CalendarPlan.SportEventCalendarBudgetTables.push(self.RequiredAmountTabrow);
      }
      self.RequiredAmountTabrow = {
        id: 0,
        ownerid: 0,
        sportitemofexpenseid: 0,
        sportitemofexpensename:0,
        price: 0,
        amount: 0,
        quantity: 0,
        detail: "",
        Status: 1,
      };
      this.RequiredAmountModal = false;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddLocationTable() {
      var self = this;
      if (
        self.LocationTabrow.countryid === null ||
        self.LocationTabrow.countryid === undefined ||
        self.LocationTabrow.countryid === 0 ||
        self.LocationTabrow.countryid === ""
      ) {
        self.$makeToast(
          self.$t("countryNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.LocationTabrow.countryid == 211) {
        if (
          self.LocationTabrow.oblastid === null ||
          self.LocationTabrow.oblastid === undefined ||
          self.LocationTabrow.oblastid === 0 ||
          self.LocationTabrow.oblastid === ""
        ) {
          self.$makeToast(
            self.$t("oblastNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.LocationTabrow.regionid === null ||
          self.LocationTabrow.regionid === undefined ||
          self.LocationTabrow.regionid === 0 ||
          self.LocationTabrow.regionid === ""
        ) {
          self.$makeToast(
            self.$t("regionNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.LocationTabrow.sportorganizationid === null ||
          self.LocationTabrow.sportorganizationid === undefined ||
          self.LocationTabrow.sportorganizationid === 0 ||
          self.LocationTabrow.sportorganizationid === ""
        ) {
          self.$makeToast(
            self.$t("organizationNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.LocationTabrow.orgbuildinginfoid === null ||
          self.LocationTabrow.orgbuildinginfoid === undefined ||
          self.LocationTabrow.orgbuildinginfoid === 0 ||
          self.LocationTabrow.orgbuildinginfoid === ""
        ) {
          self.$makeToast(
            self.$t("orgbuildinginfoNotSelected"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.LocationTabrow.address === null ||
          self.LocationTabrow.address === undefined ||
          self.LocationTabrow.address === 0 ||
          self.LocationTabrow.address === ""
        ) {
          self.$makeToast(
            self.$t("addressNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }

      if (!!self.LocationTabrow.countryid) {
        self.LocationTabrow.countryname = self.CountryList.filter(
          (item) => item.id === self.LocationTabrow.countryid
        )[0].name;
      }
      if (!!self.LocationTabrow.oblastid) {
        self.LocationTabrow.oblastname = self.OblastList.filter(
          (item) => item.id === self.LocationTabrow.oblastid
        )[0].name;
      }
      if (!!self.LocationTabrow.regionid) {
        self.LocationTabrow.regionname = self.RegionList.filter(
          (item) => item.id === self.LocationTabrow.regionid
        )[0].name;
      }
      if (!!self.LocationTabrow.sportorganizationid) {
        self.LocationTabrow.sportorganizationname =
          self.sportorganizationlist.filter(
            (item) => item.id === self.LocationTabrow.sportorganizationid
          )[0].name;
      }
      if (!!self.LocationTabrow.orgbuildinginfoid) {
        self.LocationTabrow.orgbuildinginfoname =
          self.orgbuildinginfolist.filter(
            (item) => item.id === self.LocationTabrow.orgbuildinginfoid
          )[0].orgbuildinginfoname;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.CalendarPlan.LocationTables[self.editedIndex1],
          self.LocationTabrow
        );
      } else {
        self.CalendarPlan.LocationTables.push(self.LocationTabrow);
      }
      self.LocationTabrow = {
        id: 0,
        ownerid: 0,
        countryid: 0,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        orgbuildinginfoname: "",
        address: "",
        Status: 1,
      };
      this.LocationModal = false;
    },
    OpenLocationModal() {
      if (!this.check()) {
        return false;
      }
      this.LocationModal = true;
      this.LocationTabrow = {
        id: 0,
        ownerid: 0,
        countryid: 211,
        countryname: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        orgbuildinginfoid: 0,
        orgbuildinginfoname: "",
        address: "",
        Status: 1,
      };
      if (!!this.LocationTabrow.countryid) {
        OblastService.GetAll(this.lang, 0, false).then((res) => {
          this.OblastList = res.data;
        });
      }
    },
    Refresh() {
      var self = this;
      self.loading = true;
      SportEventCalendarService.GetSportEventCalendarParticipantList(
        self.CalendarPlan.id,
        self.filter.oblastid,
        self.filter.regionid,
        self.filter.organizationid,
        self.filter.organizationtypeid,
        self.filter.schooltypeid,
        self.filter.Search,
        self.filter.SortColumn,
        self.filter.OrderType,
        self.filter.PageNumber,
        self.filter.PageLimit
      )
        .then((res) => {
          self.loading = false;
          self.CalendarPlan.ParticipantTables = res.data.rows;
          self.totalRows = res.data.total;
        })
        .catch((error) => {
          self.$makeToast(
            error.response.data.error,
            self.$t("error"),
            "danger"
          );
          self.loading = false;
        });
    },

    UpdateData() {
      SportEventCalendarService.Update(this.CalendarPlan)
        .then((res) => {
          this.CalendarPlan = res.data.SportEventCalendar
        })
        .catch((error) => {
          this.$makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      self.SaveLoading = true;
      SportEventCalendarService.Update(self.CalendarPlan)
        .then((res) => {
          self.SaveLoading = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "CalendarPlan" });
        })
        .catch((error) => {
          self.SaveLoading = false;
          self.$makeToast(
            error.response.data.error,
            self.$t("message"),
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
        solid: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("SportStudentMovement") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input
            disabled
            v-model="SportStudentMovement.docnumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="SportStudentMovement.docdate"
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            @keyup="BindValue1"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("schoolyear") }} </label>
          <v-select
            class="w-100"
            :options="schoolyearlist"
            v-model="SportStudentMovement.schoolyearid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          >
          </v-select>
        </b-col>
        <b-col sm="12" md="12" class="mt-2">
          <label for=""> {{ $t("detail") }} </label>
          <b-form-textarea
            id="textarea"
            v-model="SportStudentMovement.detail"
            :placeholder="$t('detail')"
            min-rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" md="12" lg="12">
          <custom-file-group
            :labels="TitleFileTypeList"
            @change="ChangeFile1"
            :items="SportStudentMovement.FileTables"
            @delete="
              (el) => {
                SportStudentMovement.FileTables = el;
              }
            "
          ></custom-file-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <template slot="title">
            <b-icon icon="box-arrow-up"></b-icon>
            {{ $t("SportStudentMovementassignment") }}
          </template>
          <b-row class="mt-3">
            <b-col class="text-right">
              <b-button variant="primary" @click="OpenAddModal">
                {{ $t("Add") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="table-container mobileStyle">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("OrderNumber") }}
                        <!-- {{ $t("totalschools") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("studentmovementtype") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        colspan="3"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("current") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("personname1") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        colspan="3"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("through") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("exclusionreasontype") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("toorganization1") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                      <th
                        rowspan="2"
                        style="text-align: center; vertical-align: middle"
                      >
                        {{ $t("actions") }}
                        <!-- {{ $t("Included") }} -->
                      </th>
                    </tr>
                    <tr>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sport turi") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sportgroup") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("FromCoach") }}
                      </th>
                      <!-- <th style="text-align: center; vertical-align: middle">
                        {{ $t("fromorganization1") }}
                      </th> -->
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sport turi") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("Sportgroup") }}
                      </th>
                      <th style="text-align: center; vertical-align: middle">
                        {{ $t("ToCoach") }}
                      </th>
                      <!-- <th style="text-align: center; vertical-align: middle">
                        {{ $t("toorganization1") }}
                      </th> -->
                    </tr>
                  </thead>
                  <tbody v-if="!Loading">
                    <tr
                      v-for="(
                        item, i
                      ) in SportStudentMovement.sportStudentMovementTable"
                      style="text-align: center; vertical-align: middle"
                      :key="i"
                    >
                      <td>
                        {{ i + 1 }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.studentmovementtypename }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.fromsporttypeclassifiername }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.fromsportgroupname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.fromcoachpersonname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.frompersonname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.tosporttypeclassifiername }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.tosportgroupname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.tocoachpersonname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.exclusionreasontypename }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
                        {{ item.toorganizationname }}
                      </td>
                      <td style="text-align: left; vertical-align: middle">
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
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-if="Loading">
                    <tr>
                      <td class="text-center" colspan="19">
                        <b-spinner></b-spinner>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-modal
        v-model="AddModal"
        hide-footer
        size="xl"
        modal-class="custom-size-modal"
        no-close-on-backdrop
        :title="$t('Sporttabrow')"
      >
        <b-row>
          <b-col lg="4" sm="12">
            <div class="form-group">
              <label class="col-form-label">
                {{ $t("studentmovementtype") }}
              </label>
              <div class="col-sm-9 d-flex">
                <v-select
                  class="w-100"
                  :options="studentmovementtypelist"
                  @input="ChangeStudentMovement"
                  v-model="Sporttabrow.studentmovementtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <hr />
        <b-row style="display: flex; justify-content: space-around">
          <b-col sm="12" md="5" lg="5" class="card__1">
            <h4 style="color: #f96167; text-align: center" class="divider">
              {{ $t("current") }}
            </h4>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid != 4">
              <label class="col-form-label col-sm-4">
                {{ $t("fromsporttypeclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="fromsporttypeclassifierlist"
                  @input="ChangeSportClassifier"
                  v-model="Sporttabrow.fromsporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid != 4">
              <label class="col-form-label col-sm-4">
                {{ $t("fromsportgroup") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="from1sportgrouplist"
                  @input="ChangeSportGroup"
                  v-model="Sporttabrow.fromsportgroupid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="sportgroupname"
                >
                </v-select>
              </div>
            </div>
            <div class="form-group form-row mb-0 mt-2">
              <label class="col-form-label col-sm-4">
                {{ $t("StudentPerson") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow.frompersonname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenStudentModal"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid == 1">
              <label class="col-form-label col-sm-4">
                {{ $t("sporttitle") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow.fromsporttitlename"
                >
                </CInput>
              </div>
            </div>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid != 4">
              <label class="col-form-label col-sm-4">
                {{ $t("FromCoach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow.fromcoachpersonname"
                >
                </CInput>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 2 && Sporttabrow.studentmovementtypeid != 4"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("fromorganization1") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  disabled
                  style="width: 100%"
                  v-model="Sporttabrow.fromorganizationname"
                ></b-form-input>
              </div>
            </div>
            <!-- <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("fromorganization1") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="OrganizationList"
                  v-model="Sporttabrow.fromorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div> -->
            <!-- </div> -->
          </b-col>
          <b-col sm="12" md="5" lg="5" class="card__1">
            <h4 style="color: #2bae66ff; text-align: center" class="divider">
              {{ $t("through") }}
            </h4>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 3 && Sporttabrow.studentmovementtypeid != 4"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("tosporttypeclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="fromsporttypeclassifierlist"
                  @input="ChangeToSporttype"
                  :disabled="Sporttabrow.studentmovementtypeid == 2 || Sporttabrow.studentmovementtypeid == 4 || Sporttabrow.studentmovementtypeid == 5"
                  v-model="Sporttabrow.tosporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>

            </div>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid != 5 && Sporttabrow.studentmovementtypeid != 1  && Sporttabrow.studentmovementtypeid != 3 && Sporttabrow.studentmovementtypeid != 2">
              <label class="col-form-label col-sm-4">
                {{ $t("sporttypeclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="fromsporttypeclassifierlist"
                  @input="ChangeSportClassifier1"
                  v-model="Sporttabrow.fromsporttypeclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
            <div class="form-group form-row mb-0 mt-2" v-if="Sporttabrow.studentmovementtypeid == 4">
              <label class="col-form-label col-sm-4">
                {{ $t("sporttitle") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow.fromsporttitlename"
                >
                </CInput>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("tosportgroup") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="fromsportgrouplist"
                  @input="changeToGroup"
                  v-model="Sporttabrow.tosportgroupid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="sportgroupname"
                >
                </v-select>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("ToCoach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  disabled
                  style="width: 100%"
                  v-model="Sporttabrow.tocoachpersonname"
                ></b-form-input>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("academichours") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  disabled
                  style="width: 100%"
                  v-model="infodata.academichours"
                ></b-form-input>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid != 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("studentcount") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  disabled
                  style="width: 100%"
                  v-model="infodata.studentcount"
                ></b-form-input>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.studentmovementtypeid == 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("exclusionreasontype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="exclusionreasontypelist"
                  @input="changeReason"
                  v-model="Sporttabrow.exclusionreasontypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
            <div
              class="form-group form-row mb-0 mt-2"
              v-if="Sporttabrow.exclusionreasontypeid == 3"
            >
              <label class="col-form-label col-sm-4">
                {{ $t("toorganization1") }}
              </label>
              <div class="col-sm-8 d-flex">
                <!-- <v-select
                  class="w-100"
                  :options="OrganizationList"
                  v-model="Sporttabrow.toorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select> -->
                <b-input-group>
                      <b-form-input
                        disabled
                        :placeholder="$t('organization')"
                        autocomplete="organization"
                        :label="$t('organization')"
                        horizontal
                        v-model="Sporttabrow.toorganizationname"
                      />
                      <b-input-group-append>
                        <b-button @click="OpenOrganizationModal" variant="primary">
                          <b-icon icon="three-dots" />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("exclusionreasontype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="exclusionreasontypelist"
                  v-model="Sporttabrow.exclusionreasontypeid"
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
            <b-button class="mr-2" variant="danger" @click="CloseTableModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddTable">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="StudentModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <sportsmen-list
        v-if="Sporttabrow.studentmovementtypeid != 4"
          isallperson="false"
          :sporttypeclassifierid="Sporttabrow.fromsporttypeclassifierid"
          :sportgroupid="Sporttabrow.fromsportgroupid"
          @SelectedItem="SelectedItem"
          @DblClick="AddStudentData"
        ></sportsmen-list>
        <person-list
        persontypeid = 1
        v-if="Sporttabrow.studentmovementtypeid == 4"
            @SelectedItem="SelectedItem"
            @DblClick="AddStudentData1"
          ></person-list>


        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseStudentModal">
              {{ $t("back") }}
            </b-button>
            <b-button v-if="Sporttabrow.studentmovementtypeid != 4" variant="primary" @click="AddStudentData(studentvalue)">
              {{ $t("Add") }}
            </b-button>
            <b-button v-if="Sporttabrow.studentmovementtypeid == 4" variant="primary" @click="AddStudentData1(studentvalue)">
              {{ $t("Add") }}
            </b-button>
            
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="CoachModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Coach')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :isteacher="false"
          @SelectedItem="SelectedItemCoach"
          @DblClick="AddCoachData"
        ></employee-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseCoachModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachData(coachvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="CoachModal1"
        no-close-on-backdrop
        size="xl"
        :title="$t('Coach')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :isteacher="false"
          @SelectedItem="SelectedItemCoach1"
          @DblClick="AddCoachData1"
        ></employee-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseCoachModal1">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachData1(coachvalue1)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
          id="OrganizationModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Organization')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <organization-list-component
          :organizationtypeid="filter.organizationtype"
            @SelectedItem="SelectedOrganizationItem"
            @DblClick="AddOrganizationData"
          >
          </organization-list-component>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseOrganizationModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddOrganizationData(organizationvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      <b-row>
        <b-col>
          <div class="text-left">
            <b-button
              class=""
              size="sm"
              variant="danger"
              @click="$router.push({ name: 'SportStudentMovement' })"
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
              :disabled="issavedisabled"
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
import SportStudentMovementService from "@/services/SportStudentMovement.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import OrganizationService from "@/services/organization.service";
import EmployeeList from "@/components/EmployeeList";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
import SchoolYearService from "@/services/SchoolYear.service";
import StudentMovementTypeService from "@/services/StudentMovementType.service";
import SportGroupService from "@/services/SportGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import ExclusionReasonTypeService from "@/services/ExclusionReasonType.service";
import PersonList from "@/components/PersonList";
import SportStudentManageService from "@/services/SportStudentManage.service";
import FileManageService from "@/services/filemanage.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import FormingSportGroupService from "@/services/FormingSportGroup.service";
import SportsmenList from "@/components/SportsmenList";
import OrganizationListComponent from "@/components/OrganizationListComponent.vue";
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
    CustomFileGroup,
    SportsmenList,
    OrganizationListComponent
  },
  data() {
    return {
      show: false,
      SportStudentMovement: {},
      filter: {
        organizationtype:6,
      },
      SportGroupData: {},
      SaveLoading: false,
      AddModal: false,
      issavedisabled: false,
      CoachAddModal: false,
      fileLoading: false,
      sporttitleid: 0,
      schoolyearlist: [],
      studentmovementtypelist: [],
      exclusionreasontypelist: [],
      parentlist: [],
      sportgrouplist: [],
      fromsporttypeclassifierlist: [],
      fromsportgrouplist: [],
      TitleFileTypeList: [],
      from1sportgrouplist: [],
      SportTabrowData: {},
      FileAttach: {},
      SportStudentMovementpurposelist: [],
      OrganizationList: [],
      SportStudentMovementsatisfactiontypelist: [],
      highereduclassifierlist: [],
      TitleFileTypeList: [],
      studentvalue: {},
      coachvalue: {},
      coachvalue1: {},
      editedIndex: -1,
      Loading: false,
      DownloadLoading: false,
      DeleteLoading: false,
      sporttypeclassifierid: 0,
      editedIndex1: -1,
      files: {
        file: [],
        filename: "",
        url: "",
      },
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      infodata: {
        academichours: 0,
        studentcount: 0,
      },
      organizationvalue: {

      },
      Sporttabrow: {
        id: 0,
        ownerid: 0,
        studentmovementtypeid: 0,
        studentmovementtypename: "",
        exclusionreasontypeid: 0,
        exclusionreasontypename: "",
        fromorganizationid: 0,
        fromorganizationname: "",
        fromsporttypeclassifierid: 0,
        fromsporttypeclassifiername: "",
        fromsportgroupid: 0,
        fromsportgroupname: "",
        frompersonid: 0,
        frompersonname: "",
        fromsporttitleid: 0,
        fromsporttitlename: "",
        fromcoachpersonid: 0,
        fromcoachpersonname: "",
        toorganizationid: 0,
        toorganizationname: "",
        tosporttypeclassifierid: 0,
        tosporttypeclassifiername: "",
        tosportgroupid: 0,
        tosportgroupname: "",
        tosporttitleid: 0,
        tosporttitlename: "",
        tocoachpersonid: 0,
        tocoachpersonname: "",
        Status: 1,
      },
    };
  },
  created() {
    this.show = true;
    SportStudentMovementService.Get(this.$route.params.id)
      .then((res) => {
        this.SportStudentMovement = res.data;
        this.TitleFileTypeList = res.data.table.Tables;
        if (res.data.file != null) {
          this.FileAttach.attachmentfileid = res.data.file.attachmentfileid;
          this.FileAttach.attachmentfilename = res.data.file.attachmentfilename;
        }
        if (res.data.file == null) {
          this.SportStudentMovement.file = {
            attachmentfileid: "",
            attachmentfilename: "",
            attachmentfiletype: "",
          };
        }
        if (this.$route.params.id == 0) {
          SchoolYearService.GetDefault().then((res) => {
            this.SportStudentMovement.schoolyearid = res.data.id;
          });
        }

        // this.TitleFileTypeList = res.data.table.Tables;
        this.show = false;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    StudentMovementTypeService.GetAll().then((res) => {
      this.studentmovementtypelist = res.data;
    });
    ExclusionReasonTypeService.GetAll().then((res) => {
      this.exclusionreasontypelist = res.data;
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SportTypeClassifierService.GetAll(false).then((res) => {
      this.fromsporttypeclassifierlist = res.data;
    });
    OrganizationService.GetAll().then((res) => {
      this.OrganizationList = res.data;
    });
  },
  methods: {
    CloseOrganizationModal() {
      // this.EmployeeModal = false

      this.$bvModal.hide("OrganizationModal");
    },
    AddOrganizationData(data) {
      this.CloseOrganizationModal();
      this.Sporttabrow.toorganizationid = data.id;
      this.Sporttabrow.toorganizationname = data.shortname;
    },
    OpenOrganizationModal(){
      this.$bvModal.show("OrganizationModal");
    },
    SelectedOrganizationItem(value){
       this.organizationvalue = value;
    },
    ChangeStudentMovement() {
      this.Sporttabrow.exclusionreasontypeid = 0;
      this.Sporttabrow.exclusionreasontypeid = "";
      this.Sporttabrow.tosporttypeclassifierid = 0;
      this.Sporttabrow.tosporttypeclassifiername = "";
      this.Sporttabrow.tosportgroupid = 0;
      this.Sporttabrow.tosportgroupname = "";
      this.Sporttabrow.tocoachpersonname = "";
      this.Sporttabrow.tocoachpersonid = 0;
      this.Sporttabrow.toorganizationid = 0;
      this.Sporttabrow.toorganizationname = "";
      this.Sporttabrow.fromsporttypeclassifierid = 0;
      this.Sporttabrow.fromsporttypeclassifiername = "";
      this.Sporttabrow.fromsportgroupid = 0;
      this.Sporttabrow.fromsportgroupname = "";
      this.Sporttabrow.fromcoachpersonname = "";
      this.Sporttabrow.fromcoachpersonid = 0;
      this.Sporttabrow.fromorganizationid = 0;
      this.Sporttabrow.fromorganizationname = "";
      this.Sporttabrow.frompersonname = "";
      this.Sporttabrow.frompersonid = 0;
    },
    ChangeToSporttype() {
      this.Sporttabrow.tosportgroupid = 0;
      this.Sporttabrow.tosportgroupname = "";
      this.Sporttabrow.tocoachpersonid = 0;
      this.Sporttabrow.tocoachpersonname = "";
      this.infodata.studentcount = "";
      this.infodata.academichours = 0;
      if (!!this.Sporttabrow.tosporttypeclassifierid) {
        if (this.Sporttabrow.studentmovementtypeid == 2) {
          SportGroupService.GetAll(
            this.Sporttabrow.tosporttypeclassifierid,
            0,
            this.SportStudentMovement.schoolyearid,
            true,
            this.Sporttabrow.fromsportgroupid,
            null, 
            null,
            this.Sporttabrow.fromsporttitleid,
            true
          ).then((res) => {
            this.fromsportgrouplist = res.data;
          });
        } else {
          SportGroupService.GetAll(
            this.Sporttabrow.tosporttypeclassifierid,
            0,
            this.SportStudentMovement.schoolyearid,
            true,
            0,
            true,
            null,
            this.Sporttabrow.fromsporttitleid,
            true
          ).then((res) => {
            this.fromsportgrouplist = res.data;
          });
        }
      }
    },
    changeReason() {
      this.Sporttabrow.toorganizationid = 0;
      this.Sporttabrow.toorganizationname = "";
      this.Sporttabrow.tosporttypeclassifierid = 0;
      (this.Sporttabrow.tosporttypeclassifiername = ""),
        (this.Sporttabrow.tosportgroupid = 0);
      this.Sporttabrow.tosportgroupname = "";
      this.Sporttabrow.tocoachpersonid = 0;
      this.Sporttabrow.tocoachpersonname = "";
    },
    ChangeSportClassifier() {
      this.Sporttabrow.fromsportgroupid = 0;
      this.Sporttabrow.frompersonid = 0;
      this.Sporttabrow.frompersonname = "";
      this.Sporttabrow.fromorganizationid = 0;
      this.Sporttabrow.fromorganizationname = "";
      this.Sporttabrow.fromcoachpersonid = 0;
      this.Sporttabrow.fromcoachpersonname = "";
      this.from1sportgrouplist = [];
      this.Sporttabrow.fromcoachpersonid = 0;
      this.Sporttabrow.fromcoachpersonname = "";
      if (!!this.Sporttabrow.fromsporttypeclassifierid) {
        SportGroupService.GetAll(
          this.Sporttabrow.fromsporttypeclassifierid,
          0,
          this.SportStudentMovement.schoolyearid,
          true,
          null, 
          null, 
          null, 
          this.Sporttabrow.fromsporttitleid,
          true
        ).then((res) => {
          this.from1sportgrouplist = res.data;
        });
      }
    },
    ChangeSportClassifier1() {
      this.Sporttabrow.tosporttypeclassifierid = this.Sporttabrow.fromsporttypeclassifierid;
      this.Sporttabrow.tosporttitleid = this.Sporttabrow.fromsporttitleid
      SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.frompersonid,
        this.Sporttabrow.fromsporttypeclassifierid
      )
        .then((res) => {
          this.Sporttabrow.fromcoachpersonid = res.data.CoachTable[0]?.personid;
          this.Sporttabrow.fromorganizationid = res.data.sportorganizationid;
          this.Sporttabrow.fromsporttitleid = res.data.sporttitleid;
          this.Sporttabrow.fromsporttitlename = res.data.sporttitlename;
          this.Sporttabrow.fromorganizationname =
            res.data.sportorganizationname;
          this.Sporttabrow.fromcoachpersonname =
            res.data.CoachTable[0]?.personname;
            this.ChangeToSporttype()
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
     
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.SportStudentMovement.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
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
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    OpenAddModal() {
      if (!this.check()) {
        return false;
      }
      this.AddModal = true;
      this.Sporttabrow = {
        id: 0,
        ownerid: 0,
        studentmovementtypeid: 0,
        studentmovementtypename: "",
        exclusionreasontypeid: 0,
        exclusionreasontypename: "",
        fromorganizationid: this.SportStudentMovement.organizationid,
        fromorganizationname: this.SportStudentMovement.organizationname,
        fromsporttypeclassifierid: 0,
        fromsporttypeclassifiername: "",
        fromsportgroupid: 0,
        fromsportgroupname: "",
        frompersonid: 0,
        frompersonname: "",
        fromsporttitleid: null,
        fromsporttitlename: "",
        fromcoachpersonid: 0,
        fromcoachpersonname: "",
        toorganizationid: null,
        toorganizationname: "",
        tosporttypeclassifierid: 0,
        tosporttypeclassifiername: "",
        tosportgroupid: 0,
        tosportgroupname: "",
        tosporttitleid: null,
        tosporttitlename: "",
        tocoachpersonid: null,
        tocoachpersonname: "",
        Status: 1,
      };
    },
    ChangeFile(event) {
      const file = event.target.files[0];
      var formData = new FormData();
      formData.append("attachfile", file);
      this.FileLoading = true;
      FileManageService.Attach(formData)
        .then((res) => {
          this.FileLoading = false;
          this.SportStudentMovement.file.attachmentfileid = res.data.id;
          this.SportStudentMovement.file.attachmentfilename =
            res.data.pfiletext;
          this.SportStudentMovement.file.attachmentfiletype =
            res.data.pfiletype;
          this.SportStudentMovement.file.url = URL.createObjectURL(file);
          this.FileAttach.attachmentfileid = res.data.id;
          this.FileAttach.attachmentfilename = res.data.pfiletext;
          this.FileAttach.attachmentfiletype = res.data.pfiletype;
          this.FileAttach.url = URL.createObjectURL(file);
          let text = this.SportStudentMovement.file.attachmentfilename;
          let result = text.slice(-3);
          this.filetype = result;
        })
        .catch((error) => {
          this.FileLoading = false;
          this.makeToast(error.response.data.error, "danger");
        });
    },
    DeleteFile(item) {
      this.DeleteLoading = true;
      this.SportStudentMovement.file.attachmentfileid = 0;
      this.SportStudentMovement.file.attachmentfilename = "";
      this.SportStudentMovement.file.attachmentfiletype = "";
      this.SportStudentMovement.file.url = "";
      this.DeleteLoading = false;
    },
    DownloadFile() {
      this.DownloadLoading = true;
      FileManageService.Get(this.SportStudentMovement.file.attachmentfileid)
        .then((res) => {
          this.DownloadLoading = false;
          this.forceFileDownload(
            res,
            this.SportStudentMovement.file.attachmentfilename
          );
        })
        .catch((error) => {
          this.DownloadLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
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
    AddTable() {
      var self = this;
      console.log(self.Sporttabrow.fromsportgroupid);
      if (
        self.Sporttabrow.studentmovementtypeid === null ||
        self.Sporttabrow.studentmovementtypeid === undefined ||
        self.Sporttabrow.studentmovementtypeid === 0 ||
        self.Sporttabrow.studentmovementtypeid === ""
      ) {
        self.$makeToast(
          self.$t("studentmovementtypeNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Sporttabrow.frompersonid === null ||
        self.Sporttabrow.frompersonid === undefined ||
        self.Sporttabrow.frompersonid === 0 ||
        self.Sporttabrow.frompersonid === ""
      ) {
        self.$makeToast(
          self.$t("fromstudentNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Sporttabrow.fromsporttypeclassifierid === null ||
        self.Sporttabrow.fromsporttypeclassifierid === undefined ||
        self.Sporttabrow.fromsporttypeclassifierid === 0 ||
        self.Sporttabrow.fromsporttypeclassifierid === ""
      ) {
        self.$makeToast(
          self.$t("fromsporttypeclassifierNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.Sporttabrow.studentmovementtypeid != 4) {
        if (
        self.Sporttabrow.fromsportgroupid === null ||
        self.Sporttabrow.fromsportgroupid === undefined ||
        self.Sporttabrow.fromsportgroupid === 0 ||
        self.Sporttabrow.fromsportgroupid === ""
      ) {
        self.$makeToast(
          self.$t("fromsportgroupNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
        }
        if (
        self.Sporttabrow.fromcoachpersonid === null ||
        self.Sporttabrow.fromcoachpersonid === undefined ||
        self.Sporttabrow.fromcoachpersonid === 0 ||
        self.Sporttabrow.fromcoachpersonid === ""
      ) {
        self.$makeToast(
          self.$t("fromcoachNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
     }
      if (self.Sporttabrow.studentmovementtypeid != 3) {
        if (
          self.Sporttabrow.tosporttypeclassifierid === null ||
          self.Sporttabrow.tosporttypeclassifierid === undefined ||
          self.Sporttabrow.tosporttypeclassifierid === 0 ||
          self.Sporttabrow.tosporttypeclassifierid === ""
        ) {
          self.$makeToast(
            self.$t("tosporttypeclassifierNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Sporttabrow.tosportgroupid === null ||
          self.Sporttabrow.tosportgroupid === undefined ||
          self.Sporttabrow.tosportgroupid === 0 ||
          self.Sporttabrow.tosportgroupid === ""
        ) {
          self.$makeToast(
            self.$t("tosportgroupNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.Sporttabrow.tocoachpersonid === null ||
          self.Sporttabrow.tocoachpersonid === undefined ||
          self.Sporttabrow.tocoachpersonid === 0 ||
          self.Sporttabrow.tocoachpersonid === ""
        ) {
          self.$makeToast(
            self.$t("tocoachpersonNotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.Sporttabrow.exclusionreasontypeid == 3) {
        if (
          self.Sporttabrow.toorganizationid === null ||
          self.Sporttabrow.toorganizationid === undefined ||
          self.Sporttabrow.toorganizationid === 0 ||
          self.Sporttabrow.toorganizationid === ""
        ) {
          self.$makeToast(
            self.$t("toorganization1NotCorrect"),
            self.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (!!self.Sporttabrow.studentmovementtypeid) {
        self.Sporttabrow.studentmovementtypename =
          self.studentmovementtypelist.filter(
            (item) => item.id === self.Sporttabrow.studentmovementtypeid
          )[0].name;

          
      }
      if (!!self.Sporttabrow.fromsporttypeclassifierid) {
        self.Sporttabrow.fromsporttypeclassifiername =
          self.fromsporttypeclassifierlist.filter(
            (item) => item.id === self.Sporttabrow.fromsporttypeclassifierid
          )[0].name;
      }
      if (!!self.Sporttabrow.fromsportgroupid) {
        self.Sporttabrow.fromsportgroupname = self.from1sportgrouplist.filter(
          (item) => item.id === self.Sporttabrow.fromsportgroupid
        )[0].sportgroupname;
      }
      if (!!self.Sporttabrow.tosporttypeclassifierid ) {
        self.Sporttabrow.tosporttypeclassifiername =
          self.fromsporttypeclassifierlist.filter(
            (item) => item.id === self.Sporttabrow.tosporttypeclassifierid
          )[0].name;
      }
      if (!!self.Sporttabrow.tosportgroupid) {
        self.Sporttabrow.tosportgroupname = self.fromsportgrouplist.filter(
          (item) => item.id === self.Sporttabrow.tosportgroupid
        )[0].sportgroupname;
      }
      if (!!self.Sporttabrow.exclusionreasontypeid) {
        self.Sporttabrow.exclusionreasontypename =
          self.exclusionreasontypelist.filter(
            (item) => item.id === self.Sporttabrow.exclusionreasontypeid
          )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.SportStudentMovement.sportStudentMovementTable[self.editedIndex],
          self.Sporttabrow
        );
      } else {
        self.SportStudentMovement.sportStudentMovementTable.push(
          self.Sporttabrow
        );
      }
      self.Sporttabrow = {
        id: 0,
        ownerid: 0,
        schoolyearid: 0,
        schoolyearname: "",
        studentmovementtypeid: 0,
        studentmovementtypename: "",
        exclusionreasontypeid: 0,
        exclusionreasontypename: "",
        fromorganizationid: null,
        fromorganizationname: "",
        fromsporttypeclassifierid: 0,
        fromsporttypeclassifiername: "",
        fromsportgroupid: 0,
        fromsportgroupname: "",
        frompersonid: 0,
        frompersonname: "",
        fromsporttitleid: 0,
        fromsporttitlename: "",
        fromcoachpersonid: 0,
        fromcoachpersonname: "",
        toorganizationid: null,
        toorganizationname: "",
        tosporttypeclassifierid: 0,
        tosporttypeclassifiername: "",
        tosportgroupid: 0,
        tosportgroupname: "",
        tosporttitleid: null,
        tosporttitlename: "",
        tocoachpersonid: null,
        tocoachpersonname: "",
        Status: 1,
      };
      this.AddModal = false;
    },
    changeToGroup() {
      this.Sporttabrow.tocoachpersonid = 0;
      this.Sporttabrow.tocoachpersonname = "";
      if (!!this.Sporttabrow.tosportgroupid) {
        SportGroupService.GetSportGroupInfo(
          this.Sporttabrow.tosportgroupid,
          this.SportStudentMovement.schoolyearid
        ).then((res) => {
          this.Sporttabrow.tocoachpersonid = res.data.coachpersonid;
          this.Sporttabrow.tocoachpersonname = res.data.coachpersonname;
          this.infodata.studentcount = res.data.studentcount;
          this.infodata.academichours = res.data.academichours;
        });
      }
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex =
        this.SportStudentMovement.sportStudentMovementTable.indexOf(item);
      this.Sporttabrow = Object.assign({}, item);
      if (!!this.Sporttabrow.fromsporttypeclassifierid) {
        SportGroupService.GetAll(
          this.Sporttabrow.fromsporttypeclassifierid,
          0,
          this.SportStudentMovement.schoolyearid,
          true,
          null, null, null,
          this.Sporttabrow.fromsporttitleid,
          true
        ).then((res) => {
          this.from1sportgrouplist = res.data;
        });
      }
      if (!!this.Sporttabrow.tosporttypeclassifierid) {
        if (this.Sporttabrow.studentmovementtypeid == 2) {
          SportGroupService.GetAll(
            this.Sporttabrow.tosporttypeclassifierid,
            0,
            this.SportStudentMovement.schoolyearid,
            true,
            this.Sporttabrow.fromsportgroupid,
            null, null, null,
            true
          ).then((res) => {
            this.fromsportgrouplist = res.data;
          });
        } else {
          SportGroupService.GetAll(
            this.Sporttabrow.tosporttypeclassifierid,
            0,
            this.SportStudentMovement.schoolyearid,
            true,
            0,
            true,
            null, null, true

          ).then((res) => {
            this.fromsportgrouplist = res.data;
          });
        }
      }
      if (!!this.Sporttabrow.tosportgroupid) {
        SportGroupService.GetSportGroupInfo(
          this.Sporttabrow.tosportgroupid,
          this.SportStudentMovement.schoolyearid
        ).then((res) => {
          this.Sporttabrow.tocoachpersonid = res.data.coachpersonid;
          this.Sporttabrow.tocoachpersonname = res.data.coachpersonname;
          this.infodata.studentcount = res.data.studentcount;
          this.infodata.academichours = res.data.academichours;
        });
      }
      this.AddModal = true;
    },
    ChangeSportGroup() {
      var self = this
      if (!!self.Sporttabrow.fromsportgroupid) {
        self.sporttitleid = self.from1sportgrouplist.filter(
          (item) => item.id === self.Sporttabrow.fromsportgroupid
        )[0].sportlevelid;
      }
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    OpenStudentModal() {
      this.$bvModal.show("StudentModal");
    },
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    OpenCoach1Modal() {
      this.$bvModal.show("CoachModal1");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    SelectedItemCoach1(data) {
      this.coachvalue1 = data;
    },
    AddStudentData(data) {
      this.Sporttabrow.frompersonname = data.personname;
      this.Sporttabrow.frompersonid = data.personid;
      this.Sporttabrow.fromsporttitleid = data.sporttitleid;
      this.Sporttabrow.fromsportmanageid = data.sportmanageid;
      this.Sporttabrow.fromsporttitlename = data.sporttitlename;
      if (this.Sporttabrow.studentmovementtypeid == 2 ||  this.Sporttabrow.studentmovementtypeid == 5) {
        this.Sporttabrow.tosporttypeclassifierid =
          this.Sporttabrow.fromsporttypeclassifierid;
        this.Sporttabrow.tosporttypeclassifiername =
          this.Sporttabrow.fromsporttypeclassifiername;
        if (this.Sporttabrow.studentmovementtypeid == 2) {
          SportGroupService.Get(this.Sporttabrow.fromsportgroupid).then((res) => {
          this.SportGroupData = res.data;
        });
        }
      }
      if (this.Sporttabrow.studentmovementtypeid == 2) {
        SportGroupService.GetAll(
          this.Sporttabrow.fromsporttypeclassifierid,
          0,
          this.SportStudentMovement.schoolyearid,
          true,
          this.Sporttabrow.fromsportgroupid,
          null, null,  this.Sporttabrow.fromsporttitleid, true
        ).then((res) => {
          this.fromsportgrouplist = res.data;
        });
      }
      if (this.Sporttabrow.studentmovementtypeid == 5) {
        SportGroupService.GetAll(
          this.Sporttabrow.fromsporttypeclassifierid,
          this.sporttitleid,
          this.SportStudentMovement.schoolyearid,
          null,
          0,
          false,
          this.Sporttabrow.fromsportgroupid,
          this.Sporttabrow.fromsporttitleid,
          true
        ).then((res) => {
          this.fromsportgrouplist = res.data;
        });
      }
      if (
        !!this.Sporttabrow.tosporttypeclassifierid &&
        this.Sporttabrow.studentmovementtypeid != 2 && this.Sporttabrow.studentmovementtypeid != 5
      ) {
        SportGroupService.GetAll(
          this.Sporttabrow.tosporttypeclassifierid,
          0,
          this.SportStudentMovement.schoolyearid,
          true,
          0,
          true,
          null,  this.Sporttabrow.fromsporttitleid, true
        ).then((res) => {
          this.fromsportgrouplist = res.data;
        });
      }
      if (this.Sporttabrow.studentmovementtypeid != 4 && this.Sporttabrow.studentmovementtypeid != 1) {
        SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.frompersonid,
        this.Sporttabrow.fromsporttypeclassifierid
      )
        .then((res) => {
          this.Sporttabrow.fromcoachpersonid = res.data.CoachTable[0].personid;
          this.Sporttabrow.fromorganizationid = res.data.sportorganizationid;
          this.Sporttabrow.fromorganizationname =
            res.data.sportorganizationname;
          this.Sporttabrow.fromcoachpersonname =
            res.data.CoachTable[0].personname;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      }
      if(this.Sporttabrow.studentmovementtypeid == 1) {
          SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.frompersonid,
        this.Sporttabrow.fromsporttypeclassifierid
      )
        .then((res) => {
          this.Sporttabrow.fromcoachpersonid = res.data.CoachTable[0].personid;
          this.Sporttabrow.fromorganizationid = res.data.sportorganizationid;
          this.Sporttabrow.fromsporttitlename = res.data.sporttitlename;
          this.Sporttabrow.fromsporttitleid = res.data.sporttitleid;
          this.Sporttabrow.tosporttitleid = res.data.sporttitleid;
          this.Sporttabrow.fromorganizationname =
            res.data.sportorganizationname;
          this.Sporttabrow.fromcoachpersonname =
            res.data.CoachTable[0].personname;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      }
      if(this.Sporttabrow.studentmovementtypeid == 4) {
          SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.frompersonid,
        this.Sporttabrow.fromsporttypeclassifierid
      )
        .then((res) => {
          this.Sporttabrow.fromcoachpersonid = res.data.CoachTable[0].personid;
          this.Sporttabrow.fromorganizationid = res.data.sportorganizationid;
          this.Sporttabrow.fromsporttypeclassifierid = res.data.sporttypeclassifierid;
          this.Sporttabrow.fromsporttypeclassifiername = res.data.sporttypeclassifiername;
          this.Sporttabrow.fromsporttitlename = res.data.sporttitlename;
          this.Sporttabrow.fromsporttitleid = res.data.sporttitleid;
          this.Sporttabrow.fromorganizationname =
            res.data.sportorganizationname;
          this.Sporttabrow.fromcoachpersonname =
            res.data.CoachTable[0].personname;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      }
      this.CloseStudentModal();
    },
    AddStudentData1(data) {
      this.Sporttabrow.frompersonname = data.fullname;
      this.Sporttabrow.frompersonid = data.id;
      this.Sporttabrow.fromsportmanageid = data.sportmanageid;
          SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.frompersonid,
        this.Sporttabrow.fromsporttypeclassifierid
      )
        .then((res) => {
          this.Sporttabrow.fromcoachpersonid = res.data.CoachTable[0].personid;
          this.Sporttabrow.fromorganizationid = res.data.sportorganizationid;
          this.Sporttabrow.fromsporttypeclassifierid = res.data.sporttypeclassifierid;
          this.Sporttabrow.fromsporttypeclassifiername = res.data.sporttypeclassifiername;
          this.Sporttabrow.fromsporttitlename = res.data.sporttitlename;
          this.Sporttabrow.fromsporttitleid = res.data.sporttitleid;
          this.Sporttabrow.fromorganizationname =
            res.data.sportorganizationname;
          this.Sporttabrow.fromcoachpersonname =
            res.data.CoachTable[0].personname;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      this.CloseStudentModal();
    },
    AddCoachData(data) {
      this.Sporttabrow.fromcoachpersonname = data.personname;
      this.Sporttabrow.fromcoachpersonid = data.personid;
      this.CloseCoachModal();
    },
    AddCoachData1(data) {
      this.Sporttabrow.tocoachpersonname = data.personname;
      this.Sporttabrow.tocoachpersonid = data.personid;
      this.CloseCoachModal1();
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    CloseCoachModal1() {
      this.$bvModal.hide("CoachModal1");
    },
    CloseTableModal() {
      this.AddModal = false;
      this.$nextTick(() => {
        this.Sporttabrow = {
          id: 0,
          ownerid: 0,
          schoolyearid: 0,
          schoolyearname: "",
          studentmovementtypeid: 0,
          studentmovementtypename: "",
          exclusionreasontypeid: 0,
          exclusionreasontypename: "",
          fromorganizationid: null,
          fromorganizationname: "",
          fromsporttypeclassifierid: 0,
          fromsporttypeclassifiername: "",
          fromsportgroupid: 0,
          fromsportgroupname: "",
          frompersonid: 0,
          frompersonname: "",
          fromsporttitleid: 0,
          fromsporttitlename: "",
          fromcoachpersonid: 0,
          fromcoachpersonname: "",
          toorganizationid: 0,
          toorganizationname: "",
          tosporttypeclassifierid: 0,
          tosporttypeclassifiername: "",
          tosportgroupid: 0,
          tosportgroupname: "",
          tosporttitleid: 0,
          tosporttitlename: "",
          tocoachpersonid: 0,
          tocoachpersonname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    BindValue1(value) {
      this.SportStudentMovement.docdate = value;
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.SportStudentMovement.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
              Status: 1,
            });
            this.FileAttach.attachmentfileid = res.data.id;
            this.FileAttach.attachmentfilename = res.data.pfiletext;
            this.FileAttach.attachmentfiletype = res.data.pfiletype;
            this.FileAttach.url = URL.createObjectURL(file);
            this.fileLoading = false;
            alert(index);
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
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    check() {
      var self = this;
      if (
        self.SportStudentMovement.docnumber === 0 ||
        self.SportStudentMovement.docnumber === null ||
        self.SportStudentMovement.docnumber === undefined ||
        self.SportStudentMovement.docnumber === ""
      ) {
        this.makeToast(
          this.$t("SportStudentMovementdocnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportStudentMovement.docdate === 0 ||
        self.SportStudentMovement.docdate === null ||
        self.SportStudentMovement.docdate === undefined ||
        self.SportStudentMovement.docdate === ""
      ) {
        this.makeToast(
          this.$t("SportStudentMovementdocdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportStudentMovement.schoolyearid === null ||
        self.SportStudentMovement.schoolyearid === undefined ||
        self.SportStudentMovement.schoolyearid === 0 ||
        self.SportStudentMovement.schoolyearid === ""
      ) {
        self.$makeToast(
          self.$t("schoolyearNotSelect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportStudentMovement.detail === 0 ||
        self.SportStudentMovement.detail === null ||
        self.SportStudentMovement.detail === undefined ||
        self.SportStudentMovement.detail === ""
      ) {
        this.makeToast(this.$t("detailNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      self.issavedisabled = true;
      self.SaveLoading = true;
      SportStudentMovementService.Update(self.SportStudentMovement)
        .then((res) => {
          self.SaveLoading = false;
          self.issavedisabled = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "SportStudentMovement" });
        })
        .catch((error) => {
          self.SaveLoading = false;
          self.issavedisabled = false;
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
.divider {
  margin-top: 15px;
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
.card__1 {
  margin-top: 20px;
  height: 350px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
}
// .divider {
//   display: flex;
//   align-items: center;
//   text-align: center;
// }
// .divider::after,
// .divider::before {
//   content: "";
//   border: 1px solid #838996;
//   flex: 1;
// }
// .divider:not(:empty)::before {
//   margin-right: 0.25em;
// }
// .divider:not(:empty)::after {
//   margin-left: 0.25em;
// }
</style>
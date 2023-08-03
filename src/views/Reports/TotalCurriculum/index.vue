<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3 mb-0">{{ $t("TotalCurriculum") }}</h3>
        <CCardHeader>
           <CRow class="form-group">
            <CCol class="d-flex mt-2">
              <v-select
                :options="schoolyearlist"
                v-model="filter.schoolyearid"
                :reduce="(item) => item.id"
                :placeholder="$t('SchoolYear')"
                class="mr-2"
                label="name"
                style="width: 50%"
              ></v-select>
              <v-select
                :options="OblastList"
                v-model="filter.oblastid"
                :disabled="
                  (!$can('AdminView', 'permissions') &&
                    !$can('MinSportView', 'permissions') &&
                    $can('OblastSport', 'permissions')) ||
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('oblast')"
                label="name"
                class="mr-2"
                style="width: 70%"
                @input="ChangeOblast"
              ></v-select>
              <v-select
                :options="RegionList"
                v-model="filter.regionid"
                :disabled="
                  !$can('AdminView', 'permissions') &&
                  !$can('MinSportView', 'permissions') &&
                  !$can('OblastSport', 'permissions') &&
                  $can('RegionXTB', 'permissions')
                "
                :reduce="(item) => item.id"
                :placeholder="$t('region')"
                label="name"
                class="mr-2"
                style="width: 70%"
                @input="ChangeRegion"
              ></v-select>
              <v-select
                :options="OrganizationList"
                v-model="filter.organizationid"
                :reduce="(item) => item.id"
                :placeholder="$t('organization')"
                label="name"
                style="width: 50%"
                class="mr-2"
              ></v-select>
              <div>
                <CButton
                color="primary"
                style="width: 80%"
                class="mr-2"
                @click="Refresh()"
                size="sm"
              >
                <b-icon icon="arrow-repeat" ></b-icon>
              </CButton>
              </div>
              <div>
                 <CButton
                color="danger"
                style="width: 120%"
                class="mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
              </div>
            </CCol>
          </CRow>
          <!-- <b-row>
            <b-col>
              <div>
                <label> {{ $t('SchoolYear') }} </label>
                <v-select
                    :options="schoolyearlist"
                    v-model="filter.schoolyearid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('SchoolYear')"
                    label="name"
                  >
                  </v-select>
              </div>
            </b-col>
            <b-col>
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                style="margin-top:28px"
              >
                <b-icon icon="arrow-repeat"> </b-icon>
                {{ $t('Refresh') }}
              </CButton>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right"
                style="margin-top:28px"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{ $t("back") }}
              </CButton>
            </b-col>
          </b-row> -->
        </CCardHeader>
        <CRow>
          <CCol>
            <b-tabs pills card>
              <b-tab :title="$t('MainHours')" active>
                <div class="table-container" style="padding: 5px">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("schoolsubjectname") }}
                        </th>
                        <th
                          colspan="11"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("schoolgrades") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("hours") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("divideedhours") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("totalhours") }}
                        </th>
                      </tr>
                      <tr>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad1") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad2") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad3") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad4") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad5") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad6") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad7") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad8") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad9") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad10") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad11") }}
                        </th>
                      </tr>
                      <tr>
                        <th
                          colspan="11"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("countchoolgrad") }}
                        </th>
                      </tr>
                      <tr>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad1 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad2 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad3 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad4 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad5 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad6 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad7 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad8 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad9 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad10 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCount.countchoolgrad11 }}
                        </th>
                      </tr>
                    </thead>

                    <tbody v-if="!Loading">
                      <tr
                        v-for="(item, i) in Tables"
                        style="text-align: center; vertical-align: middle"
                        :key="i"
                      >
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.schoolsubjectname }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.schoolsubjectname }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad1 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad1 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad2 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad2 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad3 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad3 }}
                        </td>

                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad4 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad4 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad5 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad5 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad6 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad6 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad8 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad9 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad9 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad10 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad10 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad11 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad11 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.divideedhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.divideedhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.totalhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.totalhours }}
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

                  <br />
                </div>
              </b-tab>
              <b-tab :title="$t('IshomeTables')">
                <div class="table-container" style="padding: 5px">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("schoolsubjectname") }}
                        </th>
                        <th
                          colspan="11"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("schoolgrades") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("hours") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("divideedhours") }}
                        </th>
                        <th
                          rowspan="4"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("totalhours") }}
                        </th>
                      </tr>
                      <tr>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad1") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad2") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad3") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad4") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad5") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad6") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad7") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad8") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad9") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad10") }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ $t("hoursschoolgrad11") }}
                        </th>
                      </tr>
                      <tr>
                        <th
                          colspan="11"
                          style="text-align: center; vertical-align: middle"
                        >
                          {{ $t("countchoolgrad") }}
                        </th>
                      </tr>
                      <tr>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad1 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad2 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad3 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad4 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad5 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad6 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad7 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad8 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad9 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad10 }}
                        </th>
                        <th style="text-align: center; vertical-align: middle">
                          {{ SchoolCountHomeSchooling.countchoolgrad11 }}
                        </th>
                      </tr>
                    </thead>

                    <tbody v-if="!Loading">
                      <tr
                        v-for="(item, i) in TablesHomeSchooling"
                        style="text-align: center; vertical-align: middle"
                        :key="i"
                      >
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.schoolsubjectname }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.schoolsubjectname }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad1 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad1 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad2 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad2 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad3 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad3 }}
                        </td>

                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad4 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad4 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad5 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad5 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad6 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad6 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad7 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad8 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad9 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad9 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad10 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad10 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hoursschoolgrad11 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hoursschoolgrad11 }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.hours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.hours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.divideedhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.divideedhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid === 0"
                          style="
                            text-align: center;
                            font-size: 15px;
                            color: blue;
                          "
                        >
                          {{ item.totalhours }}
                        </td>
                        <td
                          v-if="item.schoolsubjectgroupid > 0"
                          style="text-align: left; vertical-align: middle"
                        >
                          {{ item.totalhours }}
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

                  <br />
                </div>
              </b-tab>
            </b-tabs>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import SchoolYearService from "@/services/SchoolYear.service";
import ReportLearningProcessService from "@/services/ReportLearningProcess.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import OrganizationService from "@/services/organization.service";

export default {
  data() {
    return {
      schoolyearlist: [],
      SchoolCount: {},
      SchoolCountHomeSchooling: {},
          OrganizationList: [],
      OblastList: [],
      RegionList: [],
      Tables: [],
      TablesHomeSchooling: [],
      Loading: false,
      totalRows: "",
      isBusy: true,

      filter: {
        schoolyearid: 3,
        oblastid:0,
        regionid:0,
        organizationid:0
      },
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll().then((res) => {
      this.OblastList = res.data;
    });
    this.createDate();
    this.Refresh();
  },

  methods: {
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.ondate = dd + "." + mm + "." + yyyy;
    },

    Print() {
      TotalCurriculumService.Print(
        this.filter.schoolyearid,
        this.filter.ondate,
        this.filter.educationlanguageid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.byschool,
        this.filter.onlyreconstructed
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "SchoolAdmissionQuotaList.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    Refresh() {
      this.Loading = true;
      ReportLearningProcessService.GetTotalCurriculum(
        this.filter.schoolyearid,
        this.filter.oblastid,
        this.filter.regionid,
        this.filter.organizationid,
      ).then((res) => {
        this.Loading = false;
        this.SchoolCount = res.data.SchoolCount;
        this.SchoolCountHomeSchooling = res.data.SchoolCountHomeSchooling;
        this.Tables = res.data.Tables;
        this.TablesHomeSchooling = res.data.TablesHomeSchooling;
        if (res.data.oblastid > 0) {
          this.filter.oblastid = res.data.oblastid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
        }
        if (res.data.regionid > 0) {
          this.filter.oblastid = res.data.oblastid;
          this.filter.regionid = res.data.regionid;
          RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
            this.RegionList = res.data;
          });
          if (!!this.filter.regionid) {
            OrganizationService.GetAll(
              this.filter.oblastid,
              this.filter.regionid
            ).then((res) => {
              this.OrganizationList = res.data;
            });
          }
        }
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
  watch: {
    "filter.schoolyearid": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
  },
};
</script>

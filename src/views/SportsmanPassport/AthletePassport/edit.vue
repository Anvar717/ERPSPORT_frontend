<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("AthletePassport") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("StudentPerson")
                }}</label>
                <div class="col-sm-9">
                  <CInput disabled v-model="AthletePassport.personname">
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
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("dateofbirth")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('dateofbirth')"
                    v-model="person.dateofbirth"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("NationalitieName")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('nationality')"
                    v-model="person.nationalityname"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("gender")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('gender')"
                    v-model="person.gendername"
                    disabled
                  />
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <b-row>
                <b-col sm="12" lg="7" md="7">
                  <div class="form-group form-row"></div>
                </b-col>
                <b-col sm="12" lg="5" md="5">
                  <div class="person-member-img">
                    <img
                      v-if="isImage"
                      :src="
                        AthletePassport.Person.PersonPhoto != null && AthletePassport.Person.PersonPhoto.attachmentfileid
                          ? axios.defaults.baseURL +
                            'FileManage/Get?id=' +
                            AthletePassport.Person.PersonPhoto.attachmentfileid
                          : 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEPDQ4QEA0QDQ8ODRAOEA4SDw8NDw0QFREWIhURExMYHSggGBolGxUTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIANgA6QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADQQAQACAAIHBgQGAgMAAAAAAAABAgMRBAUVMVFjkhIhQWFxkSIygaETQmKxwdEzciNS4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAHxyx9KpT5rRHlvn2B2FbfXFI3VtPtDzXXNfGkx6TEgtBywNIriRnWc/Lxj1dQAAAAAAAAAAAAAAAAAAAAAAHnEvFYmZnKI3zwfZnJn9Y6ZOJbKPkjdHHzkHXTNaWtnFPhrx/NP9K+ZHwAAHql5rOcTMTxhMwtaYkb5i0ecd6CAv9E1lW/dPwW4Tun0lOZJe6p0ub1mtu+1fHjALAAAAAAAAAAAAAAAAAAAAFdrnH7NOzG+85fTxUax13fPFiP8ArWPvKuAAAAAAATNU3yxq+ecfb/xDSdXf5sP1n9pBpIAAAAAAAAAAAAAAAAAAABnda2zx7+WUfZESdZ/57+v8IwAAAAAACRq+csbD/wBv4R3rDv2bRaN9ZifYGrgeMK2dYnjET7w9gAAAAAAAAAAAAAAAAAAzms4/57/T9kVZ66wJi8X8JiKz5SrAAAAAAAH2Iz7uPc+Jmq8Dt4kT+WnfP8QC/wAKuVYjhEQ9AAAAAAAAAAAAAAAAAAADlpGFF6WrPjHtPhLNYuHNbTWYymGqU+vML5L5fpn+AVQAAAAAPsRnOXHuaTQtHjDpEeO+Z4ypdWYPbxa8K/FP0aIAAAAAAAAAAAAAAAAAAAABF1jgdvCtEb4+KPWEp8kGTHvGj47f7W/d4AAAABdakw8qWt4zbL6Qs1fqW0fhZcLT91gAAAAAAAAAAAAAAAAAAAEoukafSn5s54R3yDviYkViZmcojxU+l61tMzFPhjj4z/SPpmmWxZ7+6sbq/wAyig+vgAAAAAkaHpc4VpmO+J3xuzX2i6TXEjOs+seMMy7aNjzh2i0fWPCY4A0446NpFcSudZ9Y8Y+jsAAAAAAAAAAADjpeN+HS1uEd3nIOubliaTSu+9Y+sZ+zP42l3vvvPpHdDgC9xNa4cbs7ekZIuLri0/LSI85nNWAO+Lpd7/NecuG6HAAAAAAAAAAAAeqXms5xMxPlOSbga1xK/NlePPun3QAGgwNZ4dt89ieE/wBpkWifHNk3XB0i9PltMeXh7A1Ap9H1vP565/qj+lrhYtbRnWYmAewAAAAAFTrzE7qU4/FK2lntbXzxrfpiIBDAAAAAAAAAAAAAAAAAAAASND0mcO0TG7xjjCOA1lLZxExumM4fUXVt88GnlGX1hKAAAAB8mcmWxr9q1rcZmfu0GscTs4V54xl7s4AAAAAAAAAAAAAAAAAAAAAAC01JjfFanH4o9Y3rlmtAv2cak/qy+k9zSgAAAArNd3ypWONs/ZSrLXl88SscK5+8q0AAAAAAAAAAAAAAAAAAAAAAH2s5TE8Jzaqk5xE8YzZRptBtnhYc/oj9gdwACQBnNZ3zxr+WUe0Iq6xdU9q1rfiZZzM5ZPGxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsXmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoFvsbmT0mxuZPSCoaDVFs8GvlMx90bY3MnpTtC0b8Ks17XaznPdkCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z'
                      "
                      class="img-thumbnail float-end"
                      fluid
                      style="width: 150px; height: 180px; object-fit: cover"
                    />
                  </div>
                </b-col>
              </b-row>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <div
                v-for="(el, index) in person.DocumentTables"
                :key="index"
                class="form-group form-row"
              >
                <label class="col-form-label col-sm-3" for>{{
                  $t("DocumentSeries")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('documentseries')"
                    v-model="el.documentseries"
                    disabled
                  />
                </div>
              </div>
              <div
                v-for="(el, index) in person.DocumentTables"
                :key="index"
                class="form-group form-row"
              >
                <label class="col-form-label col-sm-3" for>{{
                  $t("documentnumber")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('documentnumber')"
                    v-model="el.documentnumber"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("oblastname")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('oblastname')"
                    v-model="person.birthoblastname"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("regionname")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('regionname')"
                    v-model="person.birthregionname"
                    disabled
                  />
                </div>
              </div>
            </CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("pinfl")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('pinfl')"
                    v-model="person.pinfl"
                    disabled
                  />
                </div>
              </div>
              <div
                v-for="(item, index) in person.PersonRelativeTables"
                :key="index"
                class="form-group form-row"
              >
                <label class="col-form-label col-sm-3" for>{{
                  $t("AthleteParents")
                }}</label>
                <div class="col-sm-9">
                  <b-form-input
                    :placeholder="$t('nationality')"
                    v-model="item.fullname"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{ $t("DocDate") }}
                </label>
                <div class="col-sm-9 d-flex">
                  <custom-date-picker
                    v-model="AthletePassport.docdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('docdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValuedocdate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <b-row>
          <b-col class="mobileStyle mx-3">
            <custom-file-group
              :labels="TitleFileTypeList"
              @change="ChangeFile1"
              :items="AthletePassport.FileTables"
              @delete="
                (el) => {
                  AthletePassport.FileTables = el;
                }
              "
            ></custom-file-group>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("EduSportSchoolTable") }}</h4>
          </b-col>
          <b-col class="text-right">
            <!-- <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenEduSportSchoolTableModal"
            >
              {{ $t("Add") }}
            </b-button> -->
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="">
            <div class="mobileStyle mx-3">
              <b-table
                :fields="EduSportSchoolfields"
                :items="AthletePassport.EduSportSchoolTable"
                class="text-center"
                head-variant="light"
                sticky-header
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
                      @click="EditItemEduSportSchool(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteEduSportSchoolItem(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("Coachtabrow") }}</h4>
          </b-col>
          <b-col class="text-right">
            <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenAddModal"
            >
              {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="">
            <div class="mobileStyle mx-3">
              <b-table
                :fields="coachfields"
                :items="AthletePassport.CoachTables"
                class="text-center"
                head-variant="light"
                sticky-header
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
                      @click="EditItemCoach(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteCoachItem(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
                <template #cell(isfirstcoach)="{ item }">
                  <CBadge :color="getItemColor1(item.isfirstcoach)">{{
                    item.isfirstcoach ? $t("yess") : $t("noo")
                  }}</CBadge>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("EduTables") }}</h4>
          </b-col>
          <b-col class="text-right">
            <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenEduTablesModal"
            >
              {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="EduTablesfields"
                :items="AthletePassport.EduTables"
                class="bg-color-table text-center"
                style="vertical-align: middle"
                head-variant="light"
                sticky-header
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:empty>
                  <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                </template>
                <template #cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link
                      @click="EditItemEduTables(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteEduTables(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("AchievementTables") }}</h4>
          </b-col>
          <b-col class="text-right">
            <!-- <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenAchievementTablesModal"
            >
              {{ $t("Add") }}
            </b-button> -->
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="AchievementTablesfields"
                :items="AthletePassport.AchievementTables"
                class="bg-color-table text-center"
                head-variant="light"
                sticky-header
                style="vertical-align: middle"
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:empty>
                  <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                </template>
                <template #cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link
                      @click="EditItemAchievementTables(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteAchievementTables(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("TeamActivityTables") }}</h4>
          </b-col>
          <b-col class="text-right">
            <!-- <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenTeamActivityTablesModal"
            >
              {{ $t("Add") }}
            </b-button> -->
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <div class="mobileStyle mx-3">
              <b-table
                :fields="TeamActivityTablesfields"
                :items="AthletePassport.TeamActivityTables"
                class="bg-color-table text-center"
                style="vertical-align: middle"
                head-variant="light"
                sticky-header
                bordered
                responsive="sm"
                :tbody-tr-class="rowClass"
              >
                <template v-slot:empty>
                  <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                </template>
                <template #cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link
                      @click="EditItemTeamActivityTables(item)"
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Edit') }"
                    >
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link
                      class="mr-2"
                      v-c-tooltip="{ content: $t('Delete') }"
                      @click="DeleteTeamActivityTables(item)"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col sm="12" lg="6" md="6">
            <h4 class="col-sm-6">{{ $t("EduSchoolTable") }}</h4>
          </b-col>
          <b-col class="text-right">
            <!-- <b-button
              v-if="AthletePassport.CanSave"
              variant="primary"
              class="mr-4"
              @click="OpenEduSchoolTable"
            >
              {{ $t("Add") }}
            </b-button> -->
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <b-table
              :fields="EduSchoolTablefields"
              :items="AthletePassport.EduSchoolTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align: middle"
              head-variant="light"
              sticky-header
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template v-slot:empty>
                <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
              </template>
              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <b-link
                    @click="EditEduSchoolTable(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteEduSchoolTable(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <CRow class="mt-4">
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push(`/SportsmanPassport/AthletePassport`)"
              >
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="AthletePassport.CanSave"
                :disabled="isDisabled"
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
        <b-modal
          id="StudentModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Student')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            persontypeid="1"
            @SelectedItem="SelectedItem"
            @DblClick="AddStudentData"
          ></person-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseStudentModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddStudentData(studentvalue)">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          v-model="EduSportSchoolTableAddModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('EduSportSchoolTable')"
        >
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("oblast") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="oblastlist"
                    v-model="EduSportSchooltabrow.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeOblast"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("region") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="regionlist"
                    v-model="EduSportSchooltabrow.regionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeRegion"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("organization") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="organizationlist"
                    v-model="EduSportSchooltabrow.organizationid"
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
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("startdate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduSportSchooltabrow.startdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValueStartDate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("enddate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduSportSchooltabrow.enddate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValueenddate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEduSportSchoolTableModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddEduSportSchoolTable">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          v-model="CoachAddModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('Coachtabrow')"
        >
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("Coach") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <CInput
                    style="width: 100%"
                    disabled
                    v-model="Coachtabrow.personname"
                  >
                    <template #append>
                      <b-button
                        size="sm"
                        variant="primary"
                        @click="OpenCoachModal"
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </template>
                  </CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("dateofacception") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="Coachtabrow.dateofacception"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("coachworkplacename") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="coachworkplacelist"
                    v-model="Coachtabrow.coachworkplaceid"
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
                  {{ $t("isfirstcoach") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <b-form-checkbox
                    switch
                    v-model="Coachtabrow.isfirstcoach"
                  ></b-form-checkbox>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row>
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseCoachTableModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddCoachTable">
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
          v-model="EduTablesModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('EduTables')"
        >
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporttypeclassifier") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporttypeclassifierlist"
                    v-model="EduTablestabrow.sporttypeclassifierid"
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
                  {{ $t("sportstartdate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduTablestabrow.sportstartdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("SportTiTle") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporttitlelist"
                    v-model="EduTablestabrow.sporttitleid"
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
                  {{ $t("dateofissue") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduTablestabrow.sporttitleissuedate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporttitleissueorg") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporttitleissueorglist"
                    v-model="EduTablestabrow.sporttitleissueorgid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEduTablesModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddEduTablesData()">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          v-model="AchievementTablesAddModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('AthleticAchievement')"
        >
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("startdate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="tabrow.startdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValue"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("enddate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="tabrow.enddate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValueEndDate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporteventtype") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporteventtypelist"
                    v-model="tabrow.sporteventtypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeSportEvent"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("competitiontype") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="competitiontypelist"
                    v-model="tabrow.competitiontypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeCompetitionType"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("SportEvent") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporteventlist"
                    v-model="tabrow.sporteventid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporttypeclassifier") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="SporttypeClassifierlist"
                    v-model="tabrow.sporttypeclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="Change"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporttypeclassifierdiscipline1") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sporttypeclassifierdisciplinelist"
                    v-model="tabrow.sporttypeclassifierdisciplineid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="sporttypeclassifierdisciplinename"
                    @input="ChangeSporttypeclassifierdiscipline"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("achievementname") }}
                </label>
                <div class="col-sm-4 d-flex">
                  <b-form-input
                    :placeholder="$t('achievement')"
                    v-model="tabrow.achievement"
                    type="number"
                    :disabled="tabrow.unitofmeasureid <= 0 || null"
                  ></b-form-input>
                </div>
                <div class="col-sm-4 d-flex">
                  <v-select
                    class="w-100"
                    :options="unitofmeasurelist"
                    v-model="tabrow.unitofmeasureid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    disabled
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sportrank") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sportranklist"
                    v-model="tabrow.sportrankid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseAchievementTablesModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddAchievementTablesData">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          v-model="TeamActivityTablesAddModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('TeamActivityTables')"
        >
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("sporttypeclassifier") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="SportTypeClassifierlist"
                    v-model="TeamActivityTablestabrow.sporttypeclassifierid"
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
                  {{ $t("SportTeamSquadLevel") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sportteamsquadlevellist"
                    v-model="TeamActivityTablestabrow.sportteamsquadlevelid"
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
                  {{ $t("SportTeamSquadType") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sportteamsquadtypelist"
                    v-model="TeamActivityTablestabrow.sportteamsquadtypeid"
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
                  {{ $t("SportTeamType") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <v-select
                    class="w-100"
                    :options="sportteamtypelist"
                    v-model="TeamActivityTablestabrow.sportteamtypeid"
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
                  {{ $t("squadacceptancedate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="TeamActivityTablestabrow.squadacceptancedate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("squaddismissaldate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="TeamActivityTablestabrow.squaddismissaldate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("Coach") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <CInput
                    style="width: 100%"
                    disabled
                    v-model="TeamActivityTablestabrow.coachname"
                  >
                    <template #append>
                      <b-button
                        size="sm"
                        variant="primary"
                        @click="OpenTeamActivityTablesCoachModal"
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </template>
                  </CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseTeamActivityTablesModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddTeamActivityTablesData()">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          v-model="EduSchoolTableAddModal"
          hide-footer
          size="lg"
          no-close-on-backdrop
          :title="$t('EduSchoolTable')"
        >
          <!-- <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("startdate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduSchoolTabletabrow.startdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('startdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValuestartdate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-4">
                  {{ $t("enddate") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <custom-date-picker
                    v-model="EduSchoolTabletabrow.enddate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('enddate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    @keyup="BindValueenddate"
                    style="width: 100%"
                  ></custom-date-picker>
                </div>
              </div>
            </b-col>
          </b-row> -->
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("oblast") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <!-- <v-select
                    class="w-100"
                    :options="oblastlist"
                    v-model="EduSchoolTabletabrow.oblastid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeOblast"
                  >
                  </v-select> -->
                  <b-form-input
                    :placeholder="$t('oblast')"
                    v-model="EduSchoolTabletabrow.oblastname"
                  ></b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("region") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <!-- <v-select
                    class="w-100"
                    :options="regionlist"
                    v-model="EduSchoolTabletabrow.regionid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    @input="ChangeRegion"
                  >
                  </v-select> -->
                  <b-form-input
                    :placeholder="$t('region')"
                    v-model="EduSchoolTabletabrow.regionname"
                  ></b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("organization") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <!-- <v-select
                    class="w-100"
                    :options="organizationlist"
                    v-model="EduSchoolTabletabrow.organizationid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                  </v-select> -->
                  <b-form-input
                    :placeholder="$t('organization')"
                    v-model="EduSchoolTabletabrow.organizationname"
                  ></b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4">
                  {{ $t("schoolgrade") }}
                </label>
                <div class="col-sm-8 d-flex">
                  <!-- <v-select
                    class="w-100"
                    :options="schoolgradelist"
                    v-model="EduSchoolTabletabrow.schoolgradeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  >
                  </v-select> -->
                  <b-form-input
                    :placeholder="$t('schoolgrade')"
                    v-model="EduSchoolTabletabrow.schoolgradename"
                  ></b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <c-row class="mt-3">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseEduSchoolTableModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button variant="primary" @click="AddEduSchoolTableData()">
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="TeamActivityTablesCoachModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Coach')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <employee-list
            :isteacher="false"
            @SelectedItem="SelectedItemTeamActivityTablesCoach"
            @DblClick="AddTeamActivityTablesCoachData"
          ></employee-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseTeamActivityTablesCoachModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddTeamActivityTablesCoachData(coachvalue)"
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
import AthletePassportService from "@/services/AthletePassport.service";
import PersonService from "@/services/person.service";
import PersonList from "@/components/PersonList";
import EmployeeList from "@/components/EmployeeList";
import OrganizationService from "@/services/organization.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTitleService from "@/services/SportTitle.service";
import CompetitionLevelService from "@/services/CompetitionLevel.service";
import SportRankService from "@/services/SportRank.service";
import SportTeamTypeService from "@/services/SportTeamType.service";
import SportTeamSquadTypeService from "@/services/SportTeamSquadType.service";
import CustomDatePicker from "@/components/customDatePicker.vue";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
import SportEventTypeService from "@/services/SportEventType.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import UnitOfMeasureService from "@/services/UnitOfMeasure.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportEventService from "@/services/SportEvent.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
export default {
  components: {
    PersonList,
    EmployeeList,
    CustomDatePicker,
    axios,
    CustomFileGroup,
  },
  watch: {
    isImage(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isCanvas = false;
      }
    },
    isCanvas(newValue, oldValue) {
      if (newValue) {
        this.isVideo = false;
        this.isImage = false;
      }
    },
    isVideo(newValue, oldValue) {
      if (newValue) {
        this.isImage = false;
        this.isCanvas = false;
      }
    },
  },
  data() {
    return {
      TitleFileTypeList: [],
      SportTypeClassifierlist: [],
      sportteamsquadlevellist: [],
      sporteventlist: [],
      sporteventtypelist: [],
      competitiontypelist: [],
      SporttypeClassifierlist: [],
      sporttypeclassifierdisciplinelist: [],
      unitofmeasurelist: [],
      sportranklist: [],
      oblastlist: [],
      regionlist: [],
      schoolgradelist: [],
      organizationlist: [],
      axios,
      isImage: true,
      isVideo: false,
      isDisabled: false,
      isCanvas: false,
      canvasImage: null,
      Person: {},
      CheckResult: {},
      person: {},
      personPhoto: {},
      CoachAddModal: false,
      SaveLoading: false,
      EduTablesModal: false,
      AchievementTablesAddModal: false,
      TeamActivityTablesAddModal: false,
      EduSchoolTableAddModal: false,
      EduSportSchoolTableAddModal: false,
      coachworkplacelist: [],
      sporttypeclassifierlist: [],
      sporttitlelist: [],
      sporttitleissueorglist: [],
      competitionlevellist: [],
      sportteamtypelist: [],
      sportteamsquadtypelist: [],
      AthletePassport: {},
      studentvalue: {},
      coachvalue: {},
      editedIndex: -1,
      editedIndex1: -1,
      editedIndex2: -1,
      editedIndex3: -1,
      editedIndex4: -1,
      editedIndex5: -1,
      EduSportSchooltabrow: {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        Status: 1,
      },
      Coachtabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        dateofacception: "",
        coachworkplaceid: 0,
        coachworkplacename: "",
        isfirstcoach: false,
        Status: 1,
      },
      EduTablestabrow: {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttitleid: 0,
        sporttitlename: "",
        sporttitleissuedate: "",
        sporttitleissueorgid: 0,
        sporttitleissueorgname: "",
        Status: 1,
      },
      tabrow: {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        sporteventid: 0,
        sporteventname: "",
        competitiontypeid: 0,
        competitiontypename: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      },
      TeamActivityTablestabrow: {
        id: 0,
        ownerid: 0,
        sportteamtypeid: 0,
        sportteamtypename: "",
        sportteamsquadtypeid: 0,
        sportteamsquadtypename: "",
        squadacceptancedate: "",
        squaddismissaldate: "",
        coachid: 0,
        coachname: "",
        Status: 1,
      },
      EduSchoolTabletabrow: {
        id: 0,
        ownerid: 0,
        // startdate: "",
        // enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        Status: 1,
      },
      EduSportSchoolfields: [
        {
          key: "oblastname",
          label: this.$t("oblast"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("region"),
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
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        // { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "coachworkplacename",
          label: this.$t("coachworkplacename"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isfirstcoach",
          label: this.$t("isfirstcoach"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "dateofacception",
          label: this.$t("dateofacception"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      EduTablesfields: [
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportstartdate",
          label: this.$t("sportstartdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitlename",
          label: this.$t("SportTiTle"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitleissuedate",
          label: this.$t("dateofissue"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitleissueorgname",
          label: this.$t("sporttitleissueorg"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      AchievementTablesfields: [
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventtypename",
          label: this.$t("sporteventtype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "competitiontypename",
          label: this.$t("competitiontype"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventname",
          label: this.$t("SportEvent"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifier"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportrankname",
          label: this.$t("sportrank"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "achievement",
          label: this.$t("achievementname"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "unitofmeasurename",
          label: this.$t("unitofmeasurename"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        // {
        //   key: "actions",
        //   label: this.$t("actions"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
      ],
      TeamActivityTablesfields: [
        {
          key: "sporttypeclassifiername",
          label: this.$t("sporttypeclassifiername"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sportteamsquadlevelname",
          label: this.$t("SportTeamSquadLevel"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sportteamsquadtypename",
          label: this.$t("sportteamsquadtype"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sportteamtypename",
          label: this.$t("SportTeamType"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "squadacceptancedate",
          label: this.$t("squadacceptancedate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "squaddismissaldate",
          label: this.$t("squaddismissaldate"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "coachname",
          label: this.$t("coachname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        // { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      EduSchoolTablefields: [
        // {
        //   key: "startdate",
        //   label: this.$t("startdate"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        // {
        //   key: "enddate",
        //   label: this.$t("enddate"),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        // },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        // { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      files: {
        file: [],
        filename: "",
        url: "",
      },
      PersonRelativeTablesData: [],
      lang: localStorage.getItem("locale") || "ru",
    };
  },
  created() {
    AthletePassportService.Get(this.$route.params.id).then((res) => {
      this.AthletePassport = res.data;
      this.TitleFileTypeList = res.data.table.Tables;
      if (this.$route.params.id != 0) {
        this.Change();
        this.ChangeSportEvent();
      }
      this.personPhoto = res.data.Person.PersonPhoto == null ? '' : res.data.Person.PersonPhoto;
      this.person.dateofbirth = res.data.Person.dateofbirth;
      this.person.birthoblastname = res.data.Person.birthoblastname;
      this.person.birthregionname = res.data.Person.birthregionname;
      this.person.gendername = res.data.Person.gendername;
      this.person.nationalityname = res.data.Person.nationalityname;
      this.person.pinfl = res.data.Person.pinfl;
      this.person.DocumentTables = res.data.Person.DocumentTables;
      this.person.PersonRelativeTables = res.data.Person.PersonRelativeTables;
    });
    OrganizationService.GetAll(null, null, null, null, null).then((res) => {
      this.coachworkplacelist = res.data;
      this.sporttitleissueorglist = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
      this.SportTypeClassifierlist = res.data;
      this.sporttypeclassifierlist = res.data;
      this.SporttypeClassifierlist = res.data;
    });
    SportTitleService.GetAll().then((res) => {
      this.sporttitlelist = res.data;
    });
    CompetitionLevelService.GetAll().then((res) => {
      this.competitionlevellist = res.data;
    });
    SportRankService.GetAll().then((res) => {
      this.sportranklist = res.data;
    });
    SportTeamTypeService.GetAll().then((res) => {
      this.sportteamtypelist = res.data;
    });
    SportTeamSquadTypeService.GetAll().then((res) => {
      this.sportteamsquadtypelist = res.data;
    });

    SportEventTypeService.GetAll().then((res) => {
      this.sporteventtypelist = res.data;
    });
    UnitOfMeasureService.GetAll().then((res) => {
      this.unitofmeasurelist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.oblastlist = res.data;
    });
    SportTeamSquadLevelService.GetAll().then((res) => {
      this.sportteamsquadlevellist = res.data;
    });
  },
  methods: {
    getItemColor1(text) {
      return text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "danger";
    },
    ChangeOblast() {
      RegionService.GetAll(this.lang, this.EduSportSchooltabrow.oblastid).then(
        (res) => {
          this.regionlist = res.data;
        }
      );
    },
    ChangeRegion() {
      OrganizationService.GetAll(
        this.EduSportSchooltabrow.oblastid,
        this.EduSportSchooltabrow.regionid,
        null,
        null,
        null
      ).then((res) => {
        this.organizationlist = res.data;
      });
    },
    // ChangeRegion() {
    //   OrganizationService.GetAll(
    //     this.EduSchoolTabletabrow.oblastid,
    //     this.EduSchoolTabletabrow.regionid,
    //     false
    //   ).then((res) => {
    //     this.organizationlist = res.data;
    //   });
    // },
    ChangeSportEvent() {
      this.tabrow.competitiontypeid = 0;
      this.tabrow.competitiontypename = "";
      CompetitionTypeService.GetAll(this.tabrow.sporteventtypeid).then(
        (res) => {
          this.competitiontypelist = res.data;
        }
      );
    },
    ChangeCompetitionType() {
      SportEventService.GetAll(
        null,
        this.tabrow.sporteventtypeid,
        this.tabrow.competitiontypeid
      ).then((res) => {
        this.sporteventlist = res.data;
      });
    },
    Change() {
      this.tabrow.sporttypeclassifierdisciplineid = 0;
      this.tabrow.sporttypeclassifierdisciplinename = "";
      this.tabrow.unitofmeasureid = 0;
      this.tabrow.unitofmeasurename = "";
      SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(
        this.tabrow.sporttypeclassifierid
      ).then((res) => {
        this.sporttypeclassifierdisciplinelist = res.data;
      });
    },
    ChangeSporttypeclassifierdiscipline() {
      if (!!this.tabrow.sporttypeclassifierdisciplineid) {
        this.tabrow.unitofmeasureid =
          this.sporttypeclassifierdisciplinelist.filter(
            (item) => item.id === this.tabrow.sporttypeclassifierdisciplineid
          )[0].unitofmeasureid;
      }
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.AthletePassport.FileTables.push({
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
    takePhoto() {
      this.isCanvas = true;
      let video = document.querySelector("#video");
      let canvas = document.querySelector("#canvas");
      let photo = document.querySelector("#image");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 300, 350);
      this.canvasImage = canvas.toDataURL("image/jpeg");
    },
    savePhoto() {
      let obj = {
        target: {
          files: [this.DataURIToBlob(this.canvasImage)],
        },
      };
      var formData = new FormData();
      formData.append("attachfile", obj.target.files[0], "image.jpeg");
      if (!!obj.target.files[0]) {
        if (obj.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.AthletePassport.Person.PersonPhoto.attachmentfileid =
                res.data.id;
              this.AthletePassport.Person.PersonPhoto.attachmentfilename =
                res.data.pfiletext;
              this.AthletePassport.Person.PersonPhoto.attachmentfiletype =
                res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text =
                this.AthletePassport.Person.PersonPhoto.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("error"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan200kb"),
            this.$t("error"),
            "danger"
          );
        }
      }

      this.isImage = true;
    },
    DataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(",");
      const byteString =
        splitDataURI[0].indexOf("base64") >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
      return new Blob([ia], { type: mimeString });
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
    ChangeFile(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 204800) {
          this.FileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.AthletePassport.Person.PersonPhoto.attachmentfileid =
                res.data.id;
              this.AthletePassport.Person.PersonPhoto.attachmentfilename =
                res.data.pfiletext;
              this.AthletePassport.Person.PersonPhoto.attachmentfiletype =
                res.data.pfiletype;

              this.FileAttach.attachmentfileid = res.data.id;
              this.FileAttach.attachmentfilename = res.data.pfiletext;
              this.FileAttach.attachmentfiletype = res.data.pfiletype;

              this.FileAttach.url = URL.createObjectURL(file);

              // console.log("---------", this.FileAttach.url);
              // console.log("---------", res);
              // this.DownloadFile();

              let text =
                this.AthletePassport.Person.PersonPhoto.attachmentfilename;
              let result = text.slice(-3);
              this.filetype = result;
            })
            .catch((error) => {
              this.FileLoading = false;
              this.makeToast(
                error.response.data.error,
                this.$t("message"),
                "danger"
              );
            });
        } else {
          this.makeToast(
            this.$t("FileSizeLargerThan200kb"),
            this.$t("error"),
            "danger"
          );
        }
      }
    },
    BindValuedocdate(value) {
      this.AthletePassport.docdate = value;
    },
    openCam() {
      this.isVideo = true;
      let All_mediaDevices = navigator.mediaDevices;
      if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        console.log("getUserMedia() not supported.");
        return;
      }
      All_mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 300 },
          height: { ideal: 350 },
        },
      })
        .then(function (vidStream) {
          console.log(vidStream);
          var video = document.getElementById("video");
          if ("srcObject" in video) {
            video.srcObject = vidStream;
          } else {
            video.src = window.URL.createObjectURL(vidStream);
          }
          video.onloadedmetadata = function () {
            video.play();
          };
        })
        .catch(function (e) {
          console.log(e.name + ": " + e.message);
        });
    },
    OpenEduSportSchoolTableModal() {
      this.EduSportSchoolTableAddModal = true;
      this.EduSportSchooltabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        Status: 1,
      };
    },
    OpenAddModal() {
      this.CoachAddModal = true;
      this.Coachtabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        dateofacception: "",
        coachworkplaceid: 0,
        coachworkplacename: "",
        isfirstcoach: false,
        Status: 1,
      };
    },
    OpenEduTablesModal() {
      this.EduTablesModal = true;
      this.EduTablestabrow = {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttitleid: 0,
        sporttitlename: "",
        sporttitleissuedate: "",
        sporttitleissueorgid: 0,
        sporttitleissueorgname: "",
        Status: 1,
      };
    },
    OpenAchievementTablesModal() {
      this.AchievementTablesAddModal = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        sporteventid: 0,
        sporteventname: "",
        competitiontypeid: 0,
        competitiontypename: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      };
    },
    OpenTeamActivityTablesModal() {
      this.TeamActivityTablesAddModal = true;
      this.TeamActivityTablestabrow = {
        id: 0,
        ownerid: 0,
        sportteamtypeid: 0,
        sportteamtypename: "",
        sportteamsquadtypeid: 0,
        sportteamsquadtypename: "",
        squadacceptancedate: "",
        squaddismissaldate: "",
        coachid: 0,
        coachname: "",
        Status: 1,
      };
    },
    CloseCoachTableModal() {
      this.CoachAddModal = false;
      this.$nextTick(() => {
        this.Coachtabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          dateofacception: "",
          coachworkplaceid: 0,
          coachworkplacename: "",
          isfirstcoach: false,
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    OpenEduSchoolTable() {
      this.EduSchoolTableAddModal = true;
      this.EduSchoolTabletabrow = {
        id: 0,
        ownerid: 0,
        // startdate: "",
        // enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        Status: 1,
      };
    },
    CloseEduSportSchoolTableModal() {
      this.EduSportSchoolTableAddModal = false;
      this.$nextTick(() => {
        this.EduSportSchooltabrow = {
          id: 0,
          ownerid: 0,
          startdate: "",
          enddate: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          organizationid: 0,
          organizationname: "",
          Status: 1,
        };
        this.editedIndex5 = -1;
      });
    },
    CloseEduSchoolTableModal() {
      this.EduSchoolTableAddModal = false;
      this.$nextTick(() => {
        this.EduSchoolTabletabrow = {
          id: 0,
          ownerid: 0,
          // startdate: "",
          // enddate: "",
          oblastid: 0,
          oblastname: "",
          regionid: 0,
          regionname: "",
          organizationid: 0,
          organizationname: "",
          schoolgradeid: 0,
          schoolgradename: "",
          Status: 1,
        };
        this.editedIndex4 = -1;
      });
    },
    CloseEduTablesModal() {
      this.EduTablesModal = false;
      this.$nextTick(() => {
        this.EduTablestabrow = {
          id: 0,
          ownerid: 0,
          sporttypeclassifierid: 0,
          sporttypeclassifiername: "",
          sporttitleid: 0,
          sporttitlename: "",
          sporttitleissuedate: "",
          sporttitleissueorgid: 0,
          sporttitleissueorgname: "",
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    CloseAchievementTablesModal() {
      this.AchievementTablesAddModal = false;
      this.$nextTick(() => {
        this.tabrow = {
          id: 0,
          ownerid: 0,
          startdate: "",
          enddate: "",
          sporteventtypeid: 0,
          sporteventtypename: "",
          sporteventid: 0,
          sporteventname: "",
          competitiontypeid: 0,
          competitiontypename: "",
          unitofmeasureid: 0,
          unitofmeasurename: "",
          sporttypeclassifierid: 0,
          sporttypeclassifiername: "",
          sporttypeclassifierdisciplineid: 0,
          sporttypeclassifierdisciplinename: "",
          achievement: "",
          sportrankid: 0,
          sportrankname: "",
          Status: 1,
        };
        this.editedIndex3 = -1;
      });
    },
    CloseTeamActivityTablesModal() {
      this.TeamActivityTablesAddModal = false;
      this.$nextTick(() => {
        this.TeamActivityTablestabrow = {
          id: 0,
          ownerid: 0,
          sportteamtypeid: 0,
          sportteamtypename: "",
          sportteamsquadtypeid: 0,
          sportteamsquadtypename: "",
          squadacceptancedate: "",
          squaddismissaldate: "",
          coachid: 0,
          coachname: "",
          Status: 1,
        };
        this.editedIndex2 = -1;
      });
    },
    EditItemCoach(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.AthletePassport.CoachTables.indexOf(item);
      this.Coachtabrow = Object.assign({}, item);
      this.CoachAddModal = true;
    },
    EditItemTeamActivityTables(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.AthletePassport.TeamActivityTables.indexOf(item);
      this.TeamActivityTablestabrow = Object.assign({}, item);
      this.TeamActivityTablesAddModal = true;
    },
    EditEduSchoolTable(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex4 = this.AthletePassport.EduSchoolTable.indexOf(item);
      this.EduSchoolTabletabrow = Object.assign({}, item);
      this.EduSchoolTableAddModal = true;
    },
    EditItemAchievementTables(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex3 = this.AthletePassport.AchievementTables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      if (!!this.tabrow.sporttypeclassifierid) {
        SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(
          this.tabrow.sporttypeclassifierid
        ).then((res) => {
          this.sporttypeclassifierdisciplinelist = res.data;
        });
      }
      this.AchievementTablesAddModal = true;
    },
    EditItemEduTables(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.AthletePassport.EduTables.indexOf(item);
      this.EduTablestabrow = Object.assign({}, item);
      this.EduTablesModal = true;
    },
    DeleteCoachItem(item) {
      item;
      item.Status = 3;
    },
    DeleteEduTables(item) {
      item;
      item.Status = 3;
    },
    DeleteAchievementTables(item) {
      item;
      item.Status = 3;
    },
    DeleteTeamActivityTables(item) {
      item;
      item.Status = 3;
    },
    DeleteEduSchoolTable(item) {
      item;
      item.Status = 3;
    },
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    OpenTeamActivityTablesCoachModal() {
      this.$bvModal.show("TeamActivityTablesCoachModal");
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    AddCoachData(data) {
      this.Coachtabrow.personname = data.personname;
      this.Coachtabrow.personid = data.personid;
      this.CloseCoachModal();
    },
    AddTeamActivityTablesCoachData(data) {
      this.TeamActivityTablestabrow.coachname = data.personname;
      this.TeamActivityTablestabrow.coachid = data.personid;
      this.CloseTeamActivityTablesCoachModal();
    },
    AddEduSportSchoolTable() {
      var self = this;
      // if (
      //   self.Coachtabrow.personname === null ||
      //   self.Coachtabrow.personname === undefined ||
      //   self.Coachtabrow.personname === 0 ||
      //   self.Coachtabrow.personname === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("personnameNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.Coachtabrow.dateofacception === null ||
      //   self.Coachtabrow.dateofacception === undefined ||
      //   self.Coachtabrow.dateofacception === 0 ||
      //   self.Coachtabrow.dateofacception === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("dateofacceptionNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      // if (
      //   self.Coachtabrow.coachworkplaceid === null ||
      //   self.Coachtabrow.coachworkplaceid === undefined ||
      //   self.Coachtabrow.coachworkplaceid === 0 ||
      //   self.Coachtabrow.coachworkplaceid === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("coachworkplaceidNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }

      if (!!self.EduSportSchooltabrow.oblastid) {
        self.EduSportSchooltabrow.oblastname = self.oblastlist.filter(
          (item) => item.id === self.EduSportSchooltabrow.oblastid
        )[0].name;
      }
      if (!!self.EduSportSchooltabrow.regionid) {
        self.EduSportSchooltabrow.regionname = self.regionlist.filter(
          (item) => item.id === self.EduSportSchooltabrow.regionid
        )[0].name;
      }
      if (!!self.EduSportSchooltabrow.organizationid) {
        self.EduSportSchooltabrow.organizationname =
          self.organizationlist.filter(
            (item) => item.id === self.EduSportSchooltabrow.organizationid
          )[0].name;
      }
      if (self.editedIndex5 > -1) {
        Object.assign(
          self.AthletePassport.EduSportSchoolTable[self.editedIndex5],
          self.EduSportSchooltabrow
        );
      } else {
        self.AthletePassport.EduSportSchoolTable.push(
          self.EduSportSchooltabrow
        );
        console.log(self.EduSportSchooltabrow);
      }
      self.EduSportSchooltabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        Status: 1,
      };
      this.EduSportSchoolTableAddModal = false;
    },
    AddCoachTable() {
      var self = this;
      if (
        self.Coachtabrow.personname === null ||
        self.Coachtabrow.personname === undefined ||
        self.Coachtabrow.personname === 0 ||
        self.Coachtabrow.personname === ""
      ) {
        self.$makeToast(
          self.$t("personnameNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Coachtabrow.dateofacception === null ||
        self.Coachtabrow.dateofacception === undefined ||
        self.Coachtabrow.dateofacception === 0 ||
        self.Coachtabrow.dateofacception === ""
      ) {
        self.$makeToast(
          self.$t("dateofacceptionNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Coachtabrow.coachworkplaceid === null ||
        self.Coachtabrow.coachworkplaceid === undefined ||
        self.Coachtabrow.coachworkplaceid === 0 ||
        self.Coachtabrow.coachworkplaceid === ""
      ) {
        self.$makeToast(
          self.$t("coachworkplaceidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (!!self.Coachtabrow.coachworkplaceid) {
        self.Coachtabrow.coachworkplacename = self.coachworkplacelist.filter(
          (item) => item.id === self.Coachtabrow.coachworkplaceid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.AthletePassport.CoachTables[self.editedIndex],
          self.Coachtabrow
        );
      } else {
        self.AthletePassport.CoachTables.push(self.Coachtabrow);
      }
      self.Coachtabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        dateofacception: "",
        coachworkplaceid: 0,
        coachworkplacename: "",
        isfirstcoach: false,
        Status: 1,
      };
      this.CoachAddModal = false;
    },
    AddEduTablesData() {
      var self = this;
      if (
        self.EduTablestabrow.sporttypeclassifierid === null ||
        self.EduTablestabrow.sporttypeclassifierid === undefined ||
        self.EduTablestabrow.sporttypeclassifierid === 0 ||
        self.EduTablestabrow.sporttypeclassifierid === ""
      ) {
        self.$makeToast(
          self.$t("sporttypeclassifieridNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.EduTablestabrow.sporttitleid === null ||
        self.EduTablestabrow.sporttitleid === undefined ||
        self.EduTablestabrow.sporttitleid === 0 ||
        self.EduTablestabrow.sporttitleid === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.EduTablestabrow.sporttitleissuedate === null ||
        self.EduTablestabrow.sporttitleissuedate === undefined ||
        self.EduTablestabrow.sporttitleissuedate === 0 ||
        self.EduTablestabrow.sporttitleissuedate === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleissuedateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.EduTablestabrow.sporttitleissueorgid === null ||
        self.EduTablestabrow.sporttitleissueorgid === undefined ||
        self.EduTablestabrow.sporttitleissueorgid === 0 ||
        self.EduTablestabrow.sporttitleissueorgid === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleissueorgidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }

      if (!!self.EduTablestabrow.sporttypeclassifierid) {
        self.EduTablestabrow.sporttypeclassifiername =
          self.sporttypeclassifierlist.filter(
            (item) => item.id === self.EduTablestabrow.sporttypeclassifierid
          )[0].name;
      }
      if (!!self.EduTablestabrow.sporttitleid) {
        self.EduTablestabrow.sporttitlename = self.sporttitlelist.filter(
          (item) => item.id === self.EduTablestabrow.sporttitleid
        )[0].name;
      }
      if (!!self.EduTablestabrow.sporttitleissueorgid) {
        self.EduTablestabrow.sporttitleissueorgname =
          self.sporttitleissueorglist.filter(
            (item) => item.id === self.EduTablestabrow.sporttitleissueorgid
          )[0].name;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.AthletePassport.EduTables[self.editedIndex1],
          self.EduTablestabrow
        );
      } else {
        self.AthletePassport.EduTables.push(self.EduTablestabrow);
      }
      self.EduTablestabrow = {
        id: 0,
        ownerid: 0,
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttitleid: 0,
        sporttitlename: "",
        sporttitleissuedate: "",
        sporttitleissueorgid: 0,
        sporttitleissueorgname: "",
        Status: 1,
      };
      this.EduTablesModal = false;
    },
    AddAchievementTablesData() {
      var self = this;
      if (
        self.tabrow.startdate === null ||
        self.tabrow.startdate === undefined ||
        self.tabrow.startdate === 0 ||
        self.tabrow.startdate === ""
      ) {
        self.makeToast(
          self.$t("startdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.enddate === null ||
        self.tabrow.enddate === undefined ||
        self.tabrow.enddate === 0 ||
        self.tabrow.enddate === ""
      ) {
        self.makeToast(
          self.$t("enddateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporteventtypeid === null ||
        self.tabrow.sporteventtypeid === undefined ||
        self.tabrow.sporteventtypeid === 0 ||
        self.tabrow.sporteventtypeid === ""
      ) {
        self.makeToast(
          self.$t("sporteventtypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporteventid === null ||
        self.tabrow.sporteventid === undefined ||
        self.tabrow.sporteventid === 0 ||
        self.tabrow.sporteventid === ""
      ) {
        self.makeToast(
          self.$t("sporteventidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.competitiontypeid === null ||
        self.tabrow.competitiontypeid === undefined ||
        self.tabrow.competitiontypeid === 0 ||
        self.tabrow.competitiontypeid === ""
      ) {
        self.makeToast(
          self.$t("competitiontypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporttypeclassifierid === null ||
        self.tabrow.sporttypeclassifierid === undefined ||
        self.tabrow.sporttypeclassifierid === 0 ||
        self.tabrow.sporttypeclassifierid === ""
      ) {
        self.makeToast(
          self.$t("sporttypeclassifieridNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sporttypeclassifierdisciplineid === null ||
        self.tabrow.sporttypeclassifierdisciplineid === undefined ||
        self.tabrow.sporttypeclassifierdisciplineid === 0 ||
        self.tabrow.sporttypeclassifierdisciplineid === ""
      ) {
        self.makeToast(
          self.$t("sporttypeclassifierdisciplineidNotCorrect1"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.sportrankid === null ||
        self.tabrow.sportrankid === undefined ||
        self.tabrow.sportrankid === 0 ||
        self.tabrow.sportrankid === ""
      ) {
        self.makeToast(
          self.$t("sportrankNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.tabrow.sporteventtypeid) {
        self.tabrow.sporteventtypename = self.sporteventtypelist.filter(
          (item) => item.id === self.tabrow.sporteventtypeid
        )[0].name;
      }
      if (!!self.tabrow.sporteventid) {
        self.tabrow.sporteventname = self.sporteventlist.filter(
          (item) => item.id === self.tabrow.sporteventid
        )[0].name;
      }
      if (!!self.tabrow.competitiontypeid) {
        self.tabrow.competitiontypename = self.competitiontypelist.filter(
          (item) => item.id === self.tabrow.competitiontypeid
        )[0].name;
      }
      if (!!self.tabrow.sporttypeclassifierid) {
        self.tabrow.sporttypeclassifiername =
          self.sporttypeclassifierlist.filter(
            (item) => item.id === self.tabrow.sporttypeclassifierid
          )[0].name;
      }
      if (!!self.tabrow.sporttypeclassifierdisciplineid) {
        self.tabrow.sporttypeclassifierdisciplinename =
          self.sporttypeclassifierdisciplinelist.filter(
            (item) => item.id === self.tabrow.sporttypeclassifierdisciplineid
          )[0].sporttypeclassifierdisciplinename;
      }
      if (!!self.tabrow.sportrankid) {
        self.tabrow.sportrankname = self.sportranklist.filter(
          (item) => item.id === self.tabrow.sportrankid
        )[0].name;
      }
      if (!!self.tabrow.unitofmeasureid) {
        self.tabrow.unitofmeasurename = self.unitofmeasurelist.filter(
          (item) => item.id === self.tabrow.unitofmeasureid
        )[0].name;
      }
      if (self.editedIndex3 > -1) {
        Object.assign(
          self.AthletePassport.AchievementTables[self.editedIndex3],
          self.tabrow
        );
      } else {
        self.AthletePassport.AchievementTables.push(self.tabrow);
      }
      self.tabrow = {
        id: 0,
        ownerid: 0,
        startdate: "",
        enddate: "",
        sporteventtypeid: 0,
        sporteventtypename: "",
        sporteventid: 0,
        sporteventname: "",
        competitiontypeid: 0,
        competitiontypename: "",
        unitofmeasureid: 0,
        unitofmeasurename: "",
        sporttypeclassifierid: 0,
        sporttypeclassifiername: "",
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        achievement: "",
        sportrankid: 0,
        sportrankname: "",
        Status: 1,
      };
      this.AchievementTablesAddModal = false;
    },

    AddEduSchoolTableData() {
      var self = this;
      if (self.editedIndex4 > -1) {
        Object.assign(
          self.AthletePassport.EduSchoolTable[self.editedIndex4],
          self.EduSchoolTabletabrow
        );
      } else {
        self.AthletePassport.EduSchoolTable.push(self.EduSchoolTabletabrow);
      }
      self.EduSchoolTabletabrow = {
        id: 0,
        ownerid: 0,
        // startdate: "",
        // enddate: "",
        oblastid: 0,
        oblastname: "",
        regionid: 0,
        regionname: "",
        organizationid: 0,
        organizationname: "",
        schoolgradeid: 0,
        schoolgradename: "",
        Status: 1,
      };
      this.EduSchoolTableAddModal = false;
    },

    BindValue(value) {
      this.tabrow.startdate = value;
    },
    BindValueEndDate(value) {
      this.tabrow.enddate = value;
    },
    BindValueStartDate(value) {
      this.EduSportSchooltabrow.startdate = value;
    },
    BindValueenddate(value) {
      this.EduSportSchooltabrow.enddate = value;
    },
    AddTeamActivityTablesData() {
      var self = this;
      if (
        self.TeamActivityTablestabrow.sporttypeclassifierid === null ||
        self.TeamActivityTablestabrow.sporttypeclassifierid === undefined ||
        self.TeamActivityTablestabrow.sporttypeclassifierid === 0 ||
        self.TeamActivityTablestabrow.sporttypeclassifierid === ""
      ) {
        self.$makeToast(
          self.$t("sporttypeclassifieridNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeamActivityTablestabrow.sportteamsquadlevelid === null ||
        self.TeamActivityTablestabrow.sportteamsquadlevelid === undefined ||
        self.TeamActivityTablestabrow.sportteamsquadlevelid === 0 ||
        self.TeamActivityTablestabrow.sportteamsquadlevelid === ""
      ) {
        self.$makeToast(
          self.$t("sportteamsquadlevelidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeamActivityTablestabrow.sportteamsquadtypeid === null ||
        self.TeamActivityTablestabrow.sportteamsquadtypeid === undefined ||
        self.TeamActivityTablestabrow.sportteamsquadtypeid === 0 ||
        self.TeamActivityTablestabrow.sportteamsquadtypeid === ""
      ) {
        self.$makeToast(
          self.$t("sportteamsquadtypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeamActivityTablestabrow.sportteamtypeid === null ||
        self.TeamActivityTablestabrow.sportteamtypeid === undefined ||
        self.TeamActivityTablestabrow.sportteamtypeid === 0 ||
        self.TeamActivityTablestabrow.sportteamtypeid === ""
      ) {
        self.$makeToast(
          self.$t("sportteamtypeidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.TeamActivityTablestabrow.squadacceptancedate === null ||
        self.TeamActivityTablestabrow.squadacceptancedate === undefined ||
        self.TeamActivityTablestabrow.squadacceptancedate === 0 ||
        self.TeamActivityTablestabrow.squadacceptancedate === ""
      ) {
        self.$makeToast(
          self.$t("squadacceptancedateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.TeamActivityTablestabrow.squaddismissaldate === null ||
      //   self.TeamActivityTablestabrow.squaddismissaldate === undefined ||
      //   self.TeamActivityTablestabrow.squaddismissaldate === 0 ||
      //   self.TeamActivityTablestabrow.squaddismissaldate === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("squaddismissaldateNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.TeamActivityTablestabrow.coachname === null ||
        self.TeamActivityTablestabrow.coachname === undefined ||
        self.TeamActivityTablestabrow.coachname === 0 ||
        self.TeamActivityTablestabrow.coachname === ""
      ) {
        self.$makeToast(
          self.$t("coachnameNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.TeamActivityTablestabrow.sporttypeclassifierid) {
        self.TeamActivityTablestabrow.sporttypeclassifiername =
          self.SportTypeClassifierlist.filter(
            (item) =>
              item.id === self.TeamActivityTablestabrow.sporttypeclassifierid
          )[0].name;
      }
      if (!!self.TeamActivityTablestabrow.sportteamsquadlevelid) {
        self.TeamActivityTablestabrow.sportteamsquadlevelname =
          self.sportteamsquadlevellist.filter(
            (item) =>
              item.id === self.TeamActivityTablestabrow.sportteamsquadlevelid
          )[0].name;
      }
      if (!!self.TeamActivityTablestabrow.sportteamtypeid) {
        self.TeamActivityTablestabrow.sportteamtypename =
          self.sportteamtypelist.filter(
            (item) => item.id === self.TeamActivityTablestabrow.sportteamtypeid
          )[0].name;
      }
      if (!!self.TeamActivityTablestabrow.sportteamsquadtypeid) {
        self.TeamActivityTablestabrow.sportteamsquadtypename =
          self.sportteamsquadtypelist.filter(
            (item) =>
              item.id === self.TeamActivityTablestabrow.sportteamsquadtypeid
          )[0].name;
      }
      if (self.editedIndex2 > -1) {
        Object.assign(
          self.AthletePassport.TeamActivityTables[self.editedIndex2],
          self.TeamActivityTablestabrow
        );
      } else {
        self.AthletePassport.TeamActivityTables.push(
          self.TeamActivityTablestabrow
        );
      }
      self.TeamActivityTablestabrow = {
        id: 0,
        ownerid: 0,
        sportteamtypeid: 0,
        sportteamtypename: "",
        sportteamsquadtypeid: 0,
        sportteamsquadtypename: "",
        squadacceptancedate: "",
        squaddismissaldate: "",
        coachid: 0,
        coachname: "",
        Status: 1,
      };
      this.TeamActivityTablesAddModal = false;
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    CloseTeamActivityTablesCoachModal() {
      this.$bvModal.hide("TeamActivityTablesCoachModal");
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      // if (!this.check()) {
      //   return false;
      // }
      this.SaveLoading = true;
      this.isDisabled = true;
      AthletePassportService.Update(this.AthletePassport)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/SportsmanPassport/AthletePassport`);
          this.isDisabled = false;
        })
        .catch((error) => {
          this.isDisabled = false;
          this.SaveLoading = false;
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    SelectedItemTeamActivityTablesCoach(data) {
      this.coachvalue = data;
    },
    OpenStudentModal() {
      this.$bvModal.show("StudentModal");
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    AddStudentData(data) {
      this.AthletePassport.personname = data.fullname;
      this.AthletePassport.personid = data.id;
      PersonService.Get(
        data.id,
        data.identitydocument,
        data.documentseries,
        data.documentnumber,
        data.pinfl,
        true,
        null
      )
        .then((res) => {
          this.person = res.data;
          this.AthletePassport.Person.PersonPhoto = res.data.PersonPhoto;
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
      AthletePassportService.GetAthletePassportTableInfo(data.id)
        .then((res) => {
          this.AthletePassport.EduSportSchoolTable =
            res.data.EduSportSchoolTable;
          this.AthletePassport.CoachTables = res.data.CoachTables;
          this.AthletePassport.EduTables = res.data.EduTables;
          this.AthletePassport.TeamActivityTables = res.data.TeamActivityTables;
          this.AthletePassport.AchievementTables = res.data.AchievementTables;
          this.AthletePassport.EduSchoolTable = res.data.EduSchoolTable;
          this.AthletePassport.EduSportSchoolTable.forEach((item, index) => {
            item.Status = 1;
          });
          this.AthletePassport.CoachTables.forEach((item, index) => {
            item.Status = 1;
          });
          this.AthletePassport.EduTables.forEach((item, index) => {
            item.Status = 1;
          });
          this.AthletePassport.TeamActivityTables.forEach((item, index) => {
            item.Status = 1;
          });
          this.AthletePassport.AchievementTables.forEach((item, index) => {
            item.Status = 1;
          });
          this.AthletePassport.EduSchoolTable.forEach((item, index) => {
            item.Status = 1;
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
      this.CloseStudentModal();
    },
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
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
};
</script>

<style scoped>
</style>
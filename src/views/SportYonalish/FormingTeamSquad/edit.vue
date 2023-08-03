<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("FormingTeamSquad") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input
            disabled
            v-model="FormingTeamSquad.docnumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="FormingTeamSquad.docdate"
            disabled
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
            class="fname-select"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportTeamSquadLevel") }} </label>
          <v-select
            :options="sportteamsquadlevellist"
            v-model="FormingTeamSquad.sportteamsquadlevelid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col
          sm="12"
          md="4"
          class="mt-2"
          v-if="
            FormingTeamSquad.sportteamsquadlevelid == 2 ||
              FormingTeamSquad.sportteamsquadlevelid == 3
          "
        >
          <label for=""> {{ $t("Oblast") }} </label>
          <v-select
            disabled
            :options="oblastlist"
            v-model="FormingTeamSquad.oblastid"
            @input="changeOblast"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <b-col
          sm="12"
          md="4"
          class="mt-2"
          v-if="FormingTeamSquad.sportteamsquadlevelid == 3"
        >
          <label for=""> {{ $t("Region") }} </label>
          <v-select
            disabled
            :options="regionlist"
            v-model="FormingTeamSquad.regionid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportTeamSquadType") }} </label>
          <v-select
            :options="sportteamsquadtypelist"
            v-model="FormingTeamSquad.sportteamsquadtypeid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("sporttypeclassifier") }} </label>
          <v-select
            :options="sporttypeclassifierlist"
            v-model="FormingTeamSquad.sporttypeclassifierid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("gender") }} </label>
          <v-select
            :options="genderlist"
            v-model="FormingTeamSquad.genderid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" md="12">
          <b-row>
            <b-col sm="12" md="4">
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
            <b-col sm="12" md="8">
              <div
                class="d-flex my-1"
                v-for="(item, index) in FormingTeamSquad.FileTables"
                :key="index"
                v-show="item.Status != 3"
              >
                <b-button-group size="sm" v-if="item.Status != 3">
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
          <b-tabs pills card class="p-0 team-squad">
            <b-tab active class="p-0">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("Main") }}
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
                  <b-table
                    :fields="Sportfields"
                    :items="FormingTeamSquad.AthleteTeamtype1Tables"
                    class="bg-color-table text-center"
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
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span>
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                    <template #cell(sporteventname)="{ item }">
                      <div
                        class="text-center"
                        v-if="item.AthleteTableSporteventTables.length > 0"
                      >
                        {{
                          item.AthleteTableSporteventTables.map(
                            (e) => e.sporteventname
                          ).join(", ")
                        }}
                      </div>
                    </template>
                    <template #cell(workorganizationname)="{ item }">
                      <div class="text-center">
                        {{ item.workorganizationname }}
                        {{ item.otherworkorganizationname }}
                      </div>
                    </template>
                    <template v-slot:cell(isotherworkorganization)="{ item }">
                      <div>
                        <b-badge
                          :variant="getItemColor(item.isotherworkorganization)"
                          >{{
                            item.isotherworkorganization ? "Да" : "Нет"
                          }}</b-badge
                        >
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="p-0">
              <template slot="title">
                <b-icon icon="person"></b-icon>
                {{ $t("Reserve") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddModal1">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Sportfields"
                    :items="FormingTeamSquad.AthleteTeamtype2Tables"
                    class="bg-color-table text-center mobileStyle"
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
                          @click="EditItem1(item)"
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Edit') }"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </b-link>
                        <b-link
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Delete') }"
                          @click="DeleteItem1(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                      </div>
                    </template>
                    <template v-slot:cell(isotherworkorganization)="{ item }">
                      <div>
                        <b-badge
                          :variant="getItemColor(item.isotherworkorganization)"
                          >{{
                            item.isotherworkorganization ? "Да" : "Нет"
                          }}</b-badge
                        >
                      </div>
                    </template>
                    <template #cell(workorganizationname)="{ item }">
                      <div
                        class="text-center"
                        v-if="item.AthleteTableSporteventTables.length > 0"
                      >
                        {{ item.workorganizationname }}
                        {{ item.otherworkorganizationname }}
                      </div>
                    </template>
                    <template #cell(sporteventname)="{ item }">
                      <div
                        class="text-center"
                        v-if="item.AthleteTableSporteventTables.length > 0"
                      >
                        {{
                          item.AthleteTableSporteventTables.map(
                            (el) => el.sporteventname
                          ).join(", ")
                        }}
                      </div>
                    </template>
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span>
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab class="p-0">
              <template slot="title">
                <b-icon icon="person-check"></b-icon>
                {{ $t("TrainerName") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenCoachAddModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Coachfields"
                    :items="FormingTeamSquad.CoachTables"
                    class="bg-color-table text-center"
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
                    <template #cell(index)="{ index }">
                      <span>
                        {{ index + 1 }}
                      </span>
                    </template>
                    <template #cell(passportinfo)="{ item }">
                      <span>
                        {{ item.dateofbirth }}
                      </span>
                      <span>
                        {{ item.pasportserial }}
                      </span>
                      <span>
                        {{ item.posportnumber }}
                      </span>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-modal
        v-model="AddModal"
        hide-footer
        size="xl"
        no-close-on-backdrop
        :title="$t('Main')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("personname1") }}
              </label>
              <div class="col-sm-8">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow.personname"
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
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("SportTitle") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100 fname-select"
                  :options="sporttitlelist"
                  :disabled="DisabledTabrow.titledisabled"
                  v-model="Sporttabrow.sporttitleid"
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
                {{ $t("sportteamsquadtype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportteamsquadtypelist"
                  v-model="Sporttabrow.sportteamsquadtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("SportTeamType") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportteamtypelist"
                  v-model="Sporttabrow.sportteamtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sportorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100 fname-select"
                  :options="organizationlist"
                  :disabled="DisabledTabrow.orgdisabled"
                  v-model="Sporttabrow.sportorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="Sporttabrow.isotherworkorganization == false">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("workorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100 fname-select"
                  :options="organizationlist"
                  :disabled="DisabledTabrow.workdisabled"
                  v-model="Sporttabrow.workorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="Sporttabrow.isotherworkorganization">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("workorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('workorganization')"
                  v-model="Sporttabrow.otherworkorganizationname"
                  class="fname-select"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4" for>{{
                $t("isotherworkorganization")
              }}</label>
              <div class="col-sm-8 d-flex">
                <b-form-checkbox
                  v-model="Sporttabrow.isotherworkorganization"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("achievement") }}
              </label>
              <div class="col-sm-8 d-flex">
                <!-- <b-form-input
                  size="sm"
                  :placeholder="$t('achievement')"
                  :disabled="DisabledTabrow.achievementdisabled"
                  v-model="Sporttabrow.achievement"
                ></b-form-input> -->
                <v-select
                  class="w-100"
                  :placeholder="$t('ChooseBelow')"
                  :options="athleticachievementList"
                  :reduce="(item) => item.athleticachievementtableid"
                  v-model="Sporttabrow.athleticachievementtableid"
                  label="athleticachievementinfo"
                ></v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sportevent") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100 fname-select"
                  :options="sporteventlist"
                  multiple
                  :reduce="reduce"
                  v-model="Sporttabrow.AthleteTableSporteventTables"
                  @input="changeSportEventType"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="text-right">
            <b-button variant="primary" @click="OpenAthleteCoachModal">
              {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-table
              :fields="AthleteCoachFields"
              :items="Sporttabrow.AthleteCoachTables"
              class="bg-color-table text-center p-0 mobileStyle"
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
                    @click="EditAthleteCoachItem(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteAthleteCoachItem(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
              <template v-slot:cell(isfirstcoach)="{ item }">
                <div v-if="item.isfirstcoach == true">
                  <b-badge :variant="getItemColor(item.isfirstcoach)">{{
                    $t("true")
                  }}</b-badge>
                </div>
                <div v-if="item.isfirstcoach == false" class="text-left">
                  <b-badge :variant="getItemColor(item.isfirstcoach)">{{
                    $t("false")
                  }}</b-badge>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
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
        v-model="AddModal1"
        hide-footer
        size="xl"
        no-close-on-backdrop
        :title="$t('Reserve')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("personname1") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="Sporttabrow1.personname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenStudentModal1"
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
                {{ $t("SportTitle") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sporttitlelist"
                  :disabled="DisabledTabrow1.titledisabled"
                  v-model="Sporttabrow1.sporttitleid"
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
                {{ $t("sportteamsquadtype") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportteamsquadtypelist"
                  v-model="Sporttabrow.sportteamsquadtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("SportTeamType") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sportteamtypelist"
                  v-model="Sporttabrow1.sportteamtypeid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("sportorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="organizationlist"
                  :disabled="DisabledTabrow1.orgdisabled"
                  v-model="Sporttabrow1.sportorganizationid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="Sporttabrow.isotherworkorganization == false">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("workorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="organizationlist"
                  :disabled="DisabledTabrow1.workdisabled"
                  v-model="Sporttabrow1.workorganizationid"
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
              <label class="col-form-label col-sm-4" for>{{
                $t("isotherworkorganization")
              }}</label>
              <div class="col-sm-8 d-flex">
                <b-form-checkbox
                  v-model="Sporttabrow1.isotherworkorganization"
                  switch
                ></b-form-checkbox>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="Sporttabrow1.isotherworkorganization">
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("workorganization") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('workorganization')"
                  v-model="Sporttabrow1.otherworkorganizationname"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("achievement") }}
              </label>
              <div class="col-sm-8 d-flex">
                <!-- <b-form-input
                  size="sm"
                  :placeholder="$t('achievement')"
                  :disabled="DisabledTabrow1.achievementdisabled"
                  v-model="Sporttabrow1.achievement"
                ></b-form-input> -->
                <v-select
                  class="w-100"
                  :placeholder="$t('ChooseBelow')"
                  :options="athleticachievementList"
                  :reduce="(item) => item.athleticachievementtableid"
                  v-model="Sporttabrow1.athleticachievementtableid"
                  label="athleticachievementinfo"
                ></v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("competitiontype1") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sporteventlist"
                  multiple
                  @input="changeSportEvent"
                  v-model="Sporttabrow1.AthleteTableSporteventTables"
                  :reduce="reduce"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col class="text-right">
            <b-button variant="primary" @click="OpenAthleteCoachModal1">
              {{ $t("Add") }}
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-table
              :fields="AthleteCoachFields"
              :items="Sporttabrow1.AthleteCoachTables"
              class="bg-color-table text-center mx-3"
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
                    @click="EditAthleteCoachItem1(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteAthleteCoachItem1(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
              <template v-slot:cell(isfirstcoach)="{ item }">
                <div v-if="item.isfirstcoach == true">
                  <b-badge :variant="getItemColor(item.isfirstcoach)">{{
                    $t("true")
                  }}</b-badge>
                </div>
                <div v-if="item.isfirstcoach == false" class="text-left">
                  <b-badge :variant="getItemColor(item.isfirstcoach)">{{
                    $t("false")
                  }}</b-badge>
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseTableModal1">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddTable1">
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
        :title="$t('TrainerName')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("fio") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
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
                {{ $t("Position") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="positionlist"
                  v-model="Coachtabrow.positionid"
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
                {{ $t("detail") }}
              </label>
              <div class="col-sm-8 d-flex">
                <b-form-input
                  size="sm"
                  :placeholder="$t('detail')"
                  v-model="Coachtabrow.details"
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
        v-model="AthleteCoachModalAddModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('Murabbiy')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("Coach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="AthleteCoachTabrow.personname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenCoachModal1"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("coachworkplacename") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="coachworkplacelist"
                  @input="changeCoachWorkPlace"
                  v-model="AthleteCoachTabrow.coachworkplaceid"
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
                {{ $t("dateofacception") }}
              </label>
              <div class="col-sm-8 d-flex">
                <date-picker
                  v-model="AthleteCoachTabrow.dateofacception"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-3" for>{{
                $t("isfirstcoach")
              }}</label>
              <b-form-checkbox
                v-model="AthleteCoachTabrow.isfirstcoach"
                switch
                class="mt-2 ml-1"
              ></b-form-checkbox>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseAthleteCoachModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddAthleteCoachTables">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        v-model="AthleteCoachModalAddModal1"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('Murabbiy')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("Coach") }}
              </label>
              <div class="col-sm-8 d-flex">
                <CInput
                  class="mr-2"
                  style="width: 100%"
                  disabled
                  v-model="AthleteCoachTabrow1.personname"
                >
                  <template #append>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="OpenCoachModal2"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </template>
                </CInput>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("coachworkplacename") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="coachworkplacelist"
                  @input="changeCoachWorkPlace"
                  v-model="AthleteCoachTabrow1.coachworkplaceid"
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
                {{ $t("dateofacception") }}
              </label>
              <div class="col-sm-8 d-flex">
                <date-picker
                  v-model="AthleteCoachTabrow1.dateofacception"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('date')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  style="width: 100%"
                ></date-picker>
              </div>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-3" for>{{
                $t("isfirstcoach")
              }}</label>
              <b-form-checkbox
                v-model="AthleteCoachTabrow1.isfirstcoach"
                switch
                class="mt-2 ml-1"
              ></b-form-checkbox>
            </div>
          </b-col>
        </b-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseAthleteCoachModal1"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddAthleteCoachTables1">
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
        <person-list
          persontypeid="1"
          :sporttypeclassifierid="FormingTeamSquad.sporttypeclassifierid"
          :genderid="FormingTeamSquad.genderid"
          @SelectedItem="SelectedItem"
          @DblClick="AddStudentData"
          isallperson="true"
        ></person-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseStudentModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddStudentData(studentvalue)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="StudentModal1"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="1"
          :sporttypeclassifierid="FormingTeamSquad.sporttypeclassifierid"
          :genderid="FormingTeamSquad.genderid"
          @SelectedItem="SelectedItem1"
          isallperson="true"
          @DblClick="AddStudentData1"
        ></person-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseStudentModal1">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddStudentData1(studentvalue1)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
      <b-modal
        id="CoachModal"
        no-close-on-backdrop
        size="xl"
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="2"
          @SelectedItem="SelectedItemCoach"
          @DblClick="AddCoachData"
          isallperson="true"
          isRefresh="2"
        ></person-list>

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
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="2"
          @SelectedItem="SelectedItemCoach1"
          @DblClick="AddCoachData1"
          isallperson="true"
          isRefresh="2"
        ></person-list>

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
        id="CoachModal2"
        no-close-on-backdrop
        size="xl"
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="2"
          @SelectedItem="SelectedItemCoach2"
          @DblClick="AddCoachData2"
          isallperson="true"
          isRefresh="2"
        ></person-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseCoachModal2">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddCoachData2(coachvalue2)">
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
              @click="$router.push({ name: 'FormingTeamSquad' })"
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
import FormingTeamSquadService from "@/services/FormingTeamSquad.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import EmployeeList from "@/components/EmployeeList";
import HelperService from "@/services/helper.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import OrganizationService from "@/services/organization.service";
import SportTitleService from "@/services/SportTitle.service";
import PositionService from "@/services/Position.service";
import PersonList from "@/components/PersonList";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import SportTeamSquadTypeService from "@/services/SportTeamSquadType.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportStudentManageService from "@/services/SportStudentManage.service";
import FileManageService from "@/services/filemanage.service";
import SportTeamTypeService from "@/services/SportTeamType.service";
import CustomDatePicker from "../../../components/customDatePicker.vue";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventService from "@/services/SportEvent.service";
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
  },
  data() {
    return {
      show: false,
      FormingTeamSquad: {},
      SaveLoading: false,
      AddModal: false,
      AddModal1: false,
      CoachAddModal: false,
      AthleteCoachModalAddModal: false,
      issavedisabled: false,
      AthleteCoachModalAddModal1: false,
      isdisabled: false,
      fileLoading: false,
      DeleteLoading: false,
      editedIndex4: -1,
      DownloadLoading: "",
      DeleteFileLoading: "",
      lang: "",
      schoolyearlist: [],
      sportgrouplist: [],
      sporttitlelist: [],
      sportteamsquadlevellist: [],
      oblastlist: [],
      regionlist: [],
      coachworkplacelist: [],
      sportteamsquadtypelist: [],
      circlesporttypelist: [],
      highereduclassifierlist: [],
      SportTabrowData1: {},
      organizationlist: [],
      genderlist: [],
      athleticachievementList: [],
      positionlist: [],
      studentvalue: {},
      studentvalue1: {},
      sporttypeclassifierlist: [],
      sporteventlist: [],
      sportteamtypelist: [],
      SportTabrowData: {},
      coachvalue: {},
      coachvalue1: {},
      editedIndex: -1,
      editedIndex1: -1,
      editedIndex2: -1,
      DisabledTabrow: {
        titledisabled: false,
        workdisabled: false,
        orgdisabled: false,
        achievementdisabled: false,
      },
      DisabledTabrow1: {
        titledisabled: false,
        workdisabled: false,
        orgdisabled: false,
        achievementdisabled: false,
      },
      Sporttabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        pasportserial: "",
        posportnumber: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        workorganizationid: 0,
        isotherworkorganization: false,
        workorganizationname: "",
        sporteventname: "",
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // athleticachievementList: [],
        // sportteamsquadtypeid: null,
        // sportteamsquadtypename: "",
        sportteamtypeid: 0,
        sportteamtypename: "",
        Status: 1,
        AthleteTableSporteventTables: null,
        AthleteCoachTables: [
          {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            isfirstcoach: true,
            Status: 0,
          },
        ],
      },
      Sporttabrow1: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        otherworkorganizationname: "",
        isotherworkorganization: false,
        workorganizationid: 0,
        workorganizationname: "",
        pasportserial: "",
        posportnumber: "",
        sporteventname: "",
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // sportteamsquadtypeid: null,
        // sportteamsquadtypename: "",
        sportteamtypeid: 0,
        sportteamtypename: "",
        AthleteTableSporteventTables: null,
        Status: 1,
        AthleteCoachTables: [
          {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            isfirstcoach: true,
            Status: 0,
          },
        ],
      },
      files: {
        file: [],
        filename: "",
        url: "",
      },
      AthleteCoachTabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      },
      AthleteCoachTabrow1: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      },
      FileAttach: {
        attachmentfileid: "",
        attachmentfilename: "",
      },
      Coachtabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        pasportserial: "",
        posportnumber: "",
        dateofbirth: "",
        positionid: 0,
        positionname: "",
        details: "",
        Status: 1,
      },
      Sportfields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("personname1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "passportinfo",
          label: this.$t("passportinfo"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        // {
        //   key: "sportteamsquadtypename",
        //   label: this.$t("sportteamsquadtype"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        // {
        //   key: "sportteamtypename",
        //   label: this.$t("SportTeamType"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        {
          key: "sportorganizationname",
          label: this.$t("sportorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "workorganizationname",
          label: this.$t("workorganization"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        // {
        //   key: "otherworkorganizationname",
        //   label: this.$t("workorganization"),
        //   thClass: "text-center",
        //   tdClass: "text-left",
        // },
        {
          key: "achievement",
          label: this.$t("achievement"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporteventname",
          label: this.$t("competitiontype1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      AthleteCoachFields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "isfirstcoach",
          label: this.$t("isfirstcoach"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      Coachfields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "personname",
          label: this.$t("fio"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "passportinfo",
          label: this.$t("passportinfo"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("Position"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "details",
          label: this.$t("detail1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
    };
  },
  created() {
    this.show = true;
    this.lang = localStorage.getItem("locale") || "ru";
    FormingTeamSquadService.Get(this.$route.params.id)
      .then((res) => {
        this.FormingTeamSquad = res.data;
        this.show = false;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    CircleSportTypeService.GetAll()
      .then((res) => {
        this.circlesporttypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    HelperService.GetGenderList(this.lang)
      .then((res) => {
        this.genderlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    PositionService.GetAll(0, 0, false, 0)
      .then((res) => {
        this.positionlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTitleService.GetAll(true)
      .then((res) => {
        this.sporttitlelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    OrganizationService.GetAll(null, null, null, null, null)
      .then((res) => {
        this.coachworkplacelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTeamSquadLevelService.GetAll()
      .then((res) => {
        this.sportteamsquadlevellist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTeamSquadTypeService.GetAll()
      .then((res) => {
        this.sportteamsquadtypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTypeClassifierService.GetAll()
      .then((res) => {
        this.sporttypeclassifierlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTeamTypeService.GetAll()
      .then((res) => {
        this.sportteamtypelist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    OrganizationService.GetAll()
      .then((res) => {
        this.organizationlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    // CompetitionTypeService.GetAll()
    //   .then((res) => {
    //     this.sporteventlist = res.data;
    //   })
    //   .catch((error) => {
    //     this.makeToast(error.response.data.error, this.$t("Error"), "danger");
    //   });

    SportEventService.GetAll(0, 0, 0).then((res) => {
      this.sporteventlist = res.data;
    });
    OblastService.GetAll(this.lang, 0, false).then((res) => {
      this.oblastlist = res.data;
    });
  },
  methods: {
    ChangeFile1(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 4194304) {
          this.fileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.FormingTeamSquad.FileTables.push({
                id: 0,
                ownerid: 0,
                attachmentfileid: res.data.id,
                attachmentfilename: res.data.pfiletext,
                attachmentfiletype: res.data.pfiletype,
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
            this.$t("FileSizeLargerThan4mb"),
            this.$t("error"),
            "danger"
          );
        }
      }
    },
    DeleteFile(item, index) {
      // this.DeleteFileLoading = item.id
      // FileManageService.Delete(item.id).then(res => {
      //   this.DeleteFileLoading = ""
      if (item.Status == 1) {
        this.FormingTeamSquad.FileTables.splice(index, 1);
      } else {
        this.FormingTeamSquad.FileTables.forEach(function(el) {
          if (item.attachmentfileid == el.attachmentfileid) {
            item.Status = 3;
          }
        });
        this.DeleteLoading = false;
      }
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
    changeOblast() {
      this.FormingTeamSquad.regionid = 0;
      if (!!this.FormingTeamSquad.oblastid) {
        RegionService.GetAll(this.lang, this.FormingTeamSquad.oblastid).then(
          (res) => {
            this.regionlist = res.data;
          }
        );
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
    OpenAddModal() {
      if (!this.check()) {
        return false;
      }
      this.AddModal = true;
      this.Sporttabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        workorganizationid: 0,
        isotherworkorganization: false,
        workorganizationname: "",
        sporteventname: "",
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // athleticachievementList: [],
        // sportteamsquadtypeid: null,
        sportteamtypeid: 0,
        sportteamtypename: "",
        // sportteamsquadtypename: "",
        Status: 1,
        AthleteCoachTables: [],
      };
      this.editedIndex = -1;
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    OpenAddModal1() {
      if (!this.check()) {
        return false;
      }
      this.AddModal1 = true;
      this.Sporttabrow1 = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        sportorganizationid: 0,
        sportorganizationname: "",
        isotherworkorganization: false,
        workorganizationid: 0,
        workorganizationname: "",
        sporteventname: "",
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // sportteamsquadtypeid: null,
        sportteamtypeid: 0,
        sportteamtypename: "",
        // sportteamsquadtypename: "",
        Status: 1,
        AthleteCoachTables: [],
      };
      this.editedIndex3 = -1;
    },
    OpenAthleteCoachModal() {
      this.AthleteCoachModalAddModal = true;
      this.AthleteCoachTabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      };
      this.editedIndex2 = -1;
    },
    OpenAthleteCoachModal1() {
      this.AthleteCoachModalAddModal1 = true;
      this.AthleteCoachTabrow1 = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      };
      this.editedIndex4 = -1;
    },
    check() {
      var self = this;

      if (
        self.FormingTeamSquad.docnumber === 0 ||
        self.FormingTeamSquad.docnumber === null ||
        self.FormingTeamSquad.docnumber === undefined ||
        self.FormingTeamSquad.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingTeamSquad.docdate === 0 ||
        self.FormingTeamSquad.docdate === null ||
        self.FormingTeamSquad.docdate === undefined ||
        self.FormingTeamSquad.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingTeamSquad.sportteamsquadlevelid === 0 ||
        self.FormingTeamSquad.sportteamsquadlevelid === null ||
        self.FormingTeamSquad.sportteamsquadlevelid === undefined ||
        self.FormingTeamSquad.sportteamsquadlevelid === ""
      ) {
        this.makeToast(
          this.$t("sportteamsquadlevelNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingTeamSquad.sportteamsquadlevelid == 2 ||
        self.FormingTeamSquad.sportteamsquadlevelid == 3
      ) {
        if (
          self.FormingTeamSquad.oblastid === 0 ||
          self.FormingTeamSquad.oblastid === null ||
          self.FormingTeamSquad.oblastid === undefined ||
          self.FormingTeamSquad.oblastid === ""
        ) {
          this.makeToast(
            this.$t("oblastNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      if (self.FormingTeamSquad.sportteamsquadlevelid == 3) {
        if (
          self.FormingTeamSquad.regionid === 0 ||
          self.FormingTeamSquad.regionid === null ||
          self.FormingTeamSquad.regionid === undefined ||
          self.FormingTeamSquad.regionid === ""
        ) {
          this.makeToast(
            this.$t("regionNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
      }
      // if (
      //   self.FormingTeamSquad.sportteamsquadtypeid === 0 ||
      //   self.FormingTeamSquad.sportteamsquadtypeid === null ||
      //   self.FormingTeamSquad.sportteamsquadtypeid === undefined ||
      //   self.FormingTeamSquad.sportteamsquadtypeid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("sportteamsquadtypeNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.FormingTeamSquad.sporttypeclassifierid === 0 ||
        self.FormingTeamSquad.sporttypeclassifierid === null ||
        self.FormingTeamSquad.sporttypeclassifierid === undefined ||
        self.FormingTeamSquad.sporttypeclassifierid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifieridNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingTeamSquad.genderid === 0 ||
        self.FormingTeamSquad.genderid === null ||
        self.FormingTeamSquad.genderid === undefined ||
        self.FormingTeamSquad.genderid === ""
      ) {
        this.makeToast(this.$t("genderNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    OpenStudentModal() {
      console.log(this.FormingTeamSquad.sporttypeclassifierid);
      this.$bvModal.show("StudentModal");
    },
    OpenStudentModal1() {
      this.$bvModal.show("StudentModal1");
    },
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    OpenCoachModal1() {
      this.$bvModal.show("CoachModal1");
    },
    OpenCoachModal2() {
      this.$bvModal.show("CoachModal2");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    SelectedItem1(data) {
      this.studentvalue1 = data;
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    SelectedItemCoach1(data) {
      this.coachvalue1 = data;
    },
    SelectedItemCoach2(data) {
      this.coachvalue2 = data;
    },
    AddStudentData(data) {
      this.Sporttabrow.personname = data.fullname;
      this.Sporttabrow.personid = data.id;
      this.Sporttabrow.dateofbirth = data.dateofbirth;
      this.Sporttabrow.pasportserial = data.documentseries;
      this.Sporttabrow.posportnumber = data.documentnumber;
      this.Sporttabrow.sporttitleid = 0;
      this.Sporttabrow.sportorganizationid = 0;
      this.Sporttabrow.workorganizationid = 0;
      this.Sporttabrow.achievement = "";
      SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.personid,
        this.FormingTeamSquad.sporttypeclassifierid
      )
        .then((res) => {
          this.SportTabrowData = res.data;
          this.Sporttabrow.sporttitleid = this.SportTabrowData.sporttitleid;
          this.Sporttabrow.sportorganizationid = this.SportTabrowData.sportorganizationid;
          this.Sporttabrow.workorganizationid = this.SportTabrowData.workorganizationid;
          this.Sporttabrow.achievement = this.SportTabrowData.achievement;
          this.athleticachievementList = this.SportTabrowData.athleticachievementList;
          // this.Sporttabrow.athleticachievementList =
          //   this.SportTabrowData.athleticachievementList;
          if (!!this.Sporttabrow.sporttitleid) {
            this.DisabledTabrow.titledisabled = true;
          }
          if (!!this.Sporttabrow.workorganizationid) {
            this.DisabledTabrow.workdisabled = true;
          }
          if (!!this.Sporttabrow.sportorganizationid) {
            this.DisabledTabrow.orgdisabled = true;
          }
          if (!!this.Sporttabrow.achievement) {
            this.DisabledTabrow.achievementdisabled = true;
          }
          var self = this;
          if (self.Sporttabrow.AthleteCoachTables.length > 0) {
            self.Sporttabrow.AthleteCoachTables.forEach(function(item) {
              if (item.Status == 0) {
                item.Status = 3;
              } else {
                self.Sporttabrow.AthleteCoachTables.splice(item, 1);
              }
            });
          }
          self.SportTabrowData.CoachTable.forEach(function(item) {
            self.AthleteCoachTabrow = {
              id: 0,
              ownerid: 0,
              personid: item.personid,
              personname: item.personname,
              isfirstcoach: item.isfirstcoach,
              Status: 1,
            };
            self.Sporttabrow.AthleteCoachTables.push(self.AthleteCoachTabrow);
            self.AthleteCoachTabrow = {
              id: 0,
              ownerid: 0,
              personid: 0,
              personname: "",
              isfirstcoach: true,
              Status: 1,
            };
          });
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      this.CloseStudentModal();
    },
    AddStudentData1(data) {
      this.Sporttabrow1.personname = data.fullname;
      this.Sporttabrow1.personid = data.id;
      this.Sporttabrow1.dateofbirth = data.dateofbirth;
      this.Sporttabrow1.pasportserial = data.documentseries;
      this.Sporttabrow1.posportnumber = data.documentnumber;
      this.Sporttabrow1.sporttitleid = 0;
      this.Sporttabrow1.sportorganizationid = 0;
      this.Sporttabrow1.workorganizationid = 0;
      this.Sporttabrow1.achievement = "";
      SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow1.personid,
        this.FormingTeamSquad.sporttypeclassifierid
      )
        .then((res) => {
          this.SportTabrowData1 = res.data;
          this.Sporttabrow1.sporttitleid = this.SportTabrowData1.sporttitleid;
          this.Sporttabrow1.sportorganizationid = this.SportTabrowData1.sportorganizationid;
          this.Sporttabrow1.workorganizationid = this.SportTabrowData1.workorganizationid;
          // this.Sporttabrow1.achievement =
          //   this.SportTabrowData1.athleticachievement;
          this.Sporttabrow1.achievement = this.SportTabrowData1.achievement;
          this.athleticachievementList = this.SportTabrowData1.athleticachievementList;
          if (!!this.Sporttabrow1.sporttitleid) {
            this.DisabledTabrow1.titledisabled = true;
          }
          if (!!this.Sporttabrow1.workorganizationid) {
            this.DisabledTabrow1.workdisabled = true;
          }
          if (!!this.Sporttabrow1.sportorganizationid) {
            this.DisabledTabrow1.orgdisabled = true;
          }
          if (!!this.Sporttabrow1.achievement) {
            this.DisabledTabrow1.achievementdisabled = true;
          }
          var self = this;
          if (self.Sporttabrow1.AthleteCoachTables.length > 0) {
            self.Sporttabrow1.AthleteCoachTables.forEach(function(item) {
              if (item.Status == 0) {
                item.Status = 3;
              } else {
                self.Sporttabrow1.AthleteCoachTables.splice(item, 1);
              }
            });
          }
          self.SportTabrowData1.CoachTable.forEach(function(item) {
            self.AthleteCoachTabrow1 = {
              id: 0,
              ownerid: 0,
              personid: item.personid,
              personname: item.personname,
              isfirstcoach: item.isfirstcoach,
              Status: 1,
            };
            self.Sporttabrow1.AthleteCoachTables.push(self.AthleteCoachTabrow1);
            self.AthleteCoachTabrow1 = {
              id: 0,
              ownerid: 0,
              personid: 0,
              personname: "",
              isfirstcoach: true,
              Status: 1,
            };
          });
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      this.CloseStudentModal1();
    },
    AddCoachData(data) {
      this.Coachtabrow.personname = data.fullname;
      this.Coachtabrow.personid = data.id;
      this.Coachtabrow.dateofbirth = data.dateofbirth;
      this.Coachtabrow.pasportserial = data.documentseries;
      this.Coachtabrow.posportnumber = data.documentnumber;
      this.CloseCoachModal();
    },
    AddCoachData1(data) {
      this.AthleteCoachTabrow.personname = data.fullname;
      this.AthleteCoachTabrow.personid = data.id;
      this.AthleteCoachTabrow.dateofbirth = data.dateofbirth;
      this.CloseCoachModal1();
    },
    AddCoachData2(data) {
      this.AthleteCoachTabrow1.personname = data.fullname;
      this.AthleteCoachTabrow1.personid = data.id;
      this.AthleteCoachTabrow1.dateofbirth = data.dateofbirth;
      this.CloseCoachModal2();
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    CloseStudentModal1() {
      this.$bvModal.hide("StudentModal1");
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    CloseCoachModal1() {
      this.$bvModal.hide("CoachModal1");
    },
    CloseCoachModal2() {
      this.$bvModal.hide("CoachModal2");
    },
    CloseTableModal() {
      this.AddModal = false;
      this.$nextTick(() => {
        this.Sporttabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          sporttitleid: 0,
          sporttitlename: "",
          sportorganizationid: 0,
          sportorganizationname: "",
          workorganizationid: 0,
          isotherworkorganization: false,
          workorganizationname: "",
          pasportserial: "",
          posportnumber: "",
          achievement: "",
          athleticachievementid: 0,
          athleticachievementtableid: 0,
          sportteamtypeid: 0,
          sportteamtypename: "",
          // sportteamsquadtypeid: null,
          // sportteamsquadtypename: "",
          Status: 1,
          AthleteCoachTables: [
            {
              id: 0,
              ownerid: 0,
              personid: 0,
              personname: "",
              isfirstcoach: true,
              Status: 0,
            },
          ],
        };
        this.editedIndex2 = -1;
        this.editedIndex = -1;
      });
    },
    CloseTableModal1() {
      this.AddModal1 = false;
      this.$nextTick(() => {
        this.Sporttabrow1 = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          sporttitleid: 0,
          sporttitlename: "",
          sportorganizationid: 0,
          sportorganizationname: "",
          isotherworkorganization: false,
          workorganizationid: 0,
          workorganizationname: "",
          pasportserial: "",
          posportnumber: "",
          achievement: "",
          athleticachievementid: 0,
          athleticachievementtableid: 0,
          sportteamtypeid: 0,
          sportteamtypename: "",
          // sportteamsquadtypeid: null,
          // sportteamsquadtypename: "",
          AthleteTableSporteventTables: null,
          Status: 1,
          AthleteCoachTables: [
            {
              id: 0,
              ownerid: 0,
              personid: 0,
              personname: "",
              isfirstcoach: true,
              Status: 0,
            },
          ],
        };
        this.editedIndex4 = -1;
        this.editedIndex3 = -1;
      });
    },
    CloseCoachTableModal() {
      this.CoachAddModal = false;
      this.$nextTick(() => {
        this.Coachtabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          pasportserial: "",
          posportnumber: "",
          positionid: 0,
          positionname: "",
          details: "",
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    CloseAthleteCoachModal() {
      this.AthleteCoachModalAddModal = false;
      this.$nextTick(() => {
        this.AthleteCoachTabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          isfirstcoach: true,
          Status: 1,
        };
        this.editedIndex2 = -1;
      });
    },
    CloseAthleteCoachModal1() {
      this.AthleteCoachModalAddModal1 = false;
      this.$nextTick(() => {
        this.AthleteCoachTabrow1 = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          isfirstcoach: true,
          Status: 1,
        };
        this.editedIndex4 = -1;
      });
    },
    EditItem(item) {
      var self = this;
      if (item.Status === 0) {
        item.Status = 2;
      }
      self.editedIndex = self.FormingTeamSquad.AthleteTeamtype1Tables.indexOf(
        item
      );
      self.Sporttabrow = Object.assign({}, item);
      SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.personid,
        this.FormingTeamSquad.sporttypeclassifierid
      )
        .then((res) => {
          this.SportTabrowData = res.data;
          this.Sporttabrow.achievement = this.SportTabrowData.achievement;
          this.athleticachievementList = this.SportTabrowData.athleticachievementList;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      self.AddModal = true;
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    EditItem1(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex3 = this.FormingTeamSquad.AthleteTeamtype2Tables.indexOf(
        item
      );
      this.Sporttabrow1 = Object.assign({}, item);
      this.AddModal1 = true;
    },
    DeleteItem1(item) {
      item;
      item.Status = 3;
    },
    EditItemCoach(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.FormingTeamSquad.CoachTables.indexOf(item);
      this.Coachtabrow = Object.assign({}, item);
      this.CoachAddModal = true;
    },
    DeleteAthleteCoachItem(item) {
      item;
      item.Status = 3;
    },
    EditAthleteCoachItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex2 = this.Sporttabrow.AthleteCoachTables.indexOf(item);
      this.AthleteCoachTabrow = Object.assign({}, item);
      this.AthleteCoachModalAddModal = true;
    },
    DeleteAthleteCoachItem1(item) {
      item;
      item.Status = 3;
    },
    EditAthleteCoachItem1(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex4 = this.Sporttabrow1.AthleteCoachTables.indexOf(item);
      this.AthleteCoachTabrow1 = Object.assign({}, item);
      this.AthleteCoachModalAddModal1 = true;
    },
    DeleteCoachItem(item) {
      item;
      item.Status = 3;
    },

    AddTable() {
      var self = this;
      if (
        self.Sporttabrow.personid === null ||
        self.Sporttabrow.personid === undefined ||
        self.Sporttabrow.personid === 0 ||
        self.Sporttabrow.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.Sporttabrow.sporttitleid === null ||
        self.Sporttabrow.sporttitleid === undefined ||
        self.Sporttabrow.sporttitleid === 0 ||
        self.Sporttabrow.sporttitleid === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.Sporttabrow.achievement === null ||
      //   self.Sporttabrow.achievement === undefined ||
      //   self.Sporttabrow.achievement === 0 ||
      //   self.Sporttabrow.achievement === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("achievementNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      var dublicate = false;
      self.FormingTeamSquad.AthleteTeamtype1Tables.forEach(function(item) {
        if (
          item.Status !== 3 &&
          item.personid === self.Sporttabrow.personid &&
          item.Status !== 2
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + ": " + self.Sporttabrow.personname,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.Sporttabrow.sporttitleid) {
        self.Sporttabrow.sporttitlename = self.sporttitlelist.filter(
          (item) => item.id === self.Sporttabrow.sporttitleid
        )[0].name;
      } else {
        self.Sporttabrow.sporttitlename = "";
      }
      if (!!self.Sporttabrow.sportorganizationid) {
        self.Sporttabrow.sportorganizationname = self.organizationlist.filter(
          (item) => item.id === self.Sporttabrow.sportorganizationid
        )[0].name;
      } else {
        self.Sporttabrow.sportorganizationname = "";
      }
      if (!!self.Sporttabrow.workorganizationid) {
        self.Sporttabrow.workorganizationname = self.organizationlist.filter(
          (item) => item.id === self.Sporttabrow.workorganizationid
        )[0].name;
      } else {
        self.Sporttabrow.workorganizationname = "";
      }
      // if (!!self.Sporttabrow.sporteventid) {
      //   self.Sporttabrow.sporteventname = self.sporteventlist.filter(
      //     (item) => item.id === self.Sporttabrow.sporteventid
      //   )[0].name;
      // }
      // if (!!self.Sporttabrow.sportteamsquadtypeid) {
      //   self.Sporttabrow.sportteamsquadtypename = self.sportteamsquadtypelist.filter(
      //     (item) => item.id === self.Sporttabrow.sportteamsquadtypeid
      //   )[0].name;
      // }
      console.log(self.athleticachievementList);
      console.log(self.Sporttabrow.athleticachievementtableid);
      if (!!self.Sporttabrow.athleticachievementtableid) {
        self.Sporttabrow.achievement = self.athleticachievementList.filter(
          (item) =>
            item.athleticachievementtableid ==
            self.Sporttabrow.athleticachievementtableid
        )[0].athleticachievementinfo;
        self.Sporttabrow.athleticachievementid = self.athleticachievementList.filter(
          (item) =>
            item.athleticachievementtableid ==
            self.Sporttabrow.athleticachievementtableid
        )[0].athleticachievementid;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.FormingTeamSquad.AthleteTeamtype1Tables[self.editedIndex],
          self.Sporttabrow
        );
      } else {
        console.log(self.Sporttabrow);
        self.FormingTeamSquad.AthleteTeamtype1Tables.push(self.Sporttabrow);
        console.log();
      }
      self.Sporttabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        sportorganizationid: 0,
        pasportserial: "",
        posportnumber: "",
        isotherworkorganization: false,
        otherworkorganizationname: "",
        workorganizationid: 0,
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // sportteamsquadtypeid: null,
        // sportteamsquadtypename: "",
        AthleteTableSporteventTables: null,
        Status: 1,
        AthleteCoachTables: [
          {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            isfirstcoach: true,
            Status: 0,
          },
        ],
      };
      this.AddModal = false;
    },
    AddTable1() {
      var self = this;
      if (
        self.Sporttabrow1.personid === null ||
        self.Sporttabrow1.personid === undefined ||
        self.Sporttabrow1.personid === 0 ||
        self.Sporttabrow1.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.Sporttabrow1.sporttitleid === null ||
        self.Sporttabrow1.sporttitleid === undefined ||
        self.Sporttabrow1.sporttitleid === 0 ||
        self.Sporttabrow1.sporttitleid === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var dublicate = false;
      self.FormingTeamSquad.AthleteTeamtype2Tables.forEach(function(item) {
        console.log(item);
        if (
          item.Status !== 3 &&
          item.personid === self.Sporttabrow1.personid &&
          item.Status !== 2
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("") + ": " + self.Sporttabrow1.personname,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.Sporttabrow1.sporttitleid) {
        self.Sporttabrow1.sporttitlename = self.sporttitlelist.filter(
          (item) => item.id === self.Sporttabrow1.sporttitleid
        )[0].name;
      } else {
        self.Sporttabrow1.sporttitlename = "";
      }
      if (!!self.Sporttabrow1.sportorganizationid) {
        self.Sporttabrow1.sportorganizationname = self.organizationlist.filter(
          (item) => item.id === self.Sporttabrow1.sportorganizationid
        )[0].name;
      } else {
        self.Sporttabrow1.sportorganizationname = "";
      }
      if (!!self.Sporttabrow1.workorganizationid) {
        self.Sporttabrow1.workorganizationname = self.organizationlist.filter(
          (item) => item.id === self.Sporttabrow1.workorganizationid
        )[0].name;
      } else {
        self.Sporttabrow1.workorganizationname = "";
      }
      if (!!self.Sporttabrow1.athleticachievementtableid) {
        self.Sporttabrow1.achievement = self.athleticachievementList.filter(
          (item) =>
            item.athleticachievementtableid ==
            self.Sporttabrow1.athleticachievementtableid
        )[0].athleticachievementinfo;
        self.Sporttabrow1.athleticachievementid = self.athleticachievementList.filter(
          (item) =>
            item.athleticachievementtableid ==
            self.Sporttabrow1.athleticachievementtableid
        )[0].athleticachievementid;
      }
      // if (!!self.Sporttabrow1.sporteventid) {
      //   self.Sporttabrow1.sporteventname = self.sporteventlist.filter(
      //     (item) => item.id === self.Sporttabrow1.sporteventid
      //   )[0].name;
      // }
      // if (!!self.Sporttabrow1.sportteamsquadtypeid) {
      //   self.Sporttabrow1.sportteamsquadtypename = self.sportteamsquadtypelist.filter(
      //     (item) => item.id === self.Sporttabrow1.sportteamsquadtypeid
      //   )[0].name;
      // }
      // if (!!self.Sporttabrow1.sportteamtypeid) {
      //   self.Sporttabrow1.sportteamtypename = self.sportteamtypelist.filter(
      //     (item) => item.id === self.Sporttabrow1.sportteamtypeid
      //   )[0].name;
      // }
      if (self.editedIndex3 > -1) {
        Object.assign(
          self.FormingTeamSquad.AthleteTeamtype2Tables[self.editedIndex3],
          self.Sporttabrow1
        );
      } else {
        self.FormingTeamSquad.AthleteTeamtype2Tables.push(self.Sporttabrow1);
      }
      self.Sporttabrow1 = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        isotherworkorganization: false,
        otherworkorganizationname: "",
        pasportserial: "",
        posportnumber: "",
        sportorganizationid: 0,
        workorganizationid: 0,
        achievement: "",
        athleticachievementid: 0,
        athleticachievementtableid: 0,
        // sportteamsquadtypeid: 0,
        // sportteamsquadtypename: "",
        Status: 1,
        AthleteCoachTables: [
          {
            id: 0,
            ownerid: 0,
            personid: 0,
            personname: "",
            isfirstcoach: true,
            Status: 0,
          },
        ],
      };
      this.AddModal1 = false;
    },
    changeSportEventType(item) {
      let newarr = item.map((el) => el.sporteventname);
      let str = newarr.join(", ");
      this.Sporttabrow.sporteventname = str;
    },
    changeSportEvent(item) {
      let newarr = item.map((item) => item.sporteventname);
      let str = newarr.join(", ");
      this.Sporttabrow1.sporteventname = str;
    },
    reduce(item) {
      return {
        sporteventid: item.id,
        sporteventname: item.name,
      };
    },
    AddAthleteCoachTables() {
      var self = this;
      if (
        self.AthleteCoachTabrow.personid === null ||
        self.AthleteCoachTabrow.personid === undefined ||
        self.AthleteCoachTabrow.personid === 0 ||
        self.AthleteCoachTabrow.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      // var dublicate = false;
      // self.Sporttabrow.AthleteCoachTables.forEach(function (item) {
      //   if (
      //     item.Status !== 3 &&
      //     item.personid === self.AthleteCoachTabrow.personid
      //   ) {
      //     dublicate = true;
      //   }
      // });
      // if (dublicate) {
      //   this.makeToast(
      //     this.$t("Dublicate") + ": " + self.AthleteCoachTabrow.personname,
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (self.editedIndex2 > -1) {
        Object.assign(
          self.Sporttabrow.AthleteCoachTables[self.editedIndex2],
          self.AthleteCoachTabrow
        );
      } else {
        console.log(self.Sporttabrow);
        self.Sporttabrow.AthleteCoachTables.push(self.AthleteCoachTabrow);
      }
      self.AthleteCoachTabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      };
      this.AthleteCoachModalAddModal = false;
    },
    AddAthleteCoachTables1() {
      var self = this;
      if (
        self.AthleteCoachTabrow1.personid === null ||
        self.AthleteCoachTabrow1.personid === undefined ||
        self.AthleteCoachTabrow1.personid === 0 ||
        self.AthleteCoachTabrow1.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      // var dublicate = false;
      // self.Sporttabrow.AthleteCoachTables.forEach(function (item) {
      //   if (
      //     item.Status !== 3 &&
      //     item.personid === self.AthleteCoachTabrow1.personid
      //   ) {
      //     dublicate = true;
      //   }
      // });
      // if (dublicate) {
      //   this.makeToast(
      //     this.$t("Dublicate") + ": " + self.AthleteCoachTabrow1.personname,
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (self.editedIndex4 > -1) {
        Object.assign(
          self.Sporttabrow1.AthleteCoachTables[self.editedIndex4],
          self.AthleteCoachTabrow1
        );
      } else {
        console.log(self.Sporttabrow1);
        self.Sporttabrow1.AthleteCoachTables.push(self.AthleteCoachTabrow1);
      }
      self.AthleteCoachTabrow1 = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        isfirstcoach: true,
        Status: 1,
      };
      this.AthleteCoachModalAddModal1 = false;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    AddCoachTable() {
      var self = this;
      if (
        self.Coachtabrow.personid === null ||
        self.Coachtabrow.personid === undefined ||
        self.Coachtabrow.personid === 0 ||
        self.Coachtabrow.personid === ""
      ) {
        self.$makeToast(self.$t("personNotSelect"), self.$t("Error"), "danger");
        return false;
      }
      if (
        self.Coachtabrow.positionid === null ||
        self.Coachtabrow.positionid === undefined ||
        self.Coachtabrow.positionid === 0 ||
        self.Coachtabrow.positionid === ""
      ) {
        self.$makeToast(
          self.$t("positionidnotcorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var dublicate = false;
      self.FormingTeamSquad.CoachTables.forEach(function(item) {
        if (
          item.Status !== 3 &&
          item.personid === self.Coachtabrow.personid &&
          item.Status !== 2
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.makeToast(
          this.$t("Dublicate") + ": " + self.Coachtabrow.personname,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.Coachtabrow.positionid) {
        self.Coachtabrow.positionname = self.positionlist.filter(
          (item) => item.id === self.Coachtabrow.positionid
        )[0].name;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.FormingTeamSquad.CoachTables[self.editedIndex1],
          self.Coachtabrow
        );
      } else {
        self.FormingTeamSquad.CoachTables.push(self.Coachtabrow);
      }
      self.Coachtabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        positionid: 0,
        positionname: "",
        details: "",
        Status: 1,
      };
      this.CoachAddModal = false;
    },
    OpenCoachAddModal() {
      this.CoachAddModal = true;
      this.Coachtabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        positionid: 0,
        positionname: "",
        details: "",
        Status: 1,
      };
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      self.issavedisabled = true;
      self.SaveLoading = true;
      FormingTeamSquadService.Update(self.FormingTeamSquad)
        .then((res) => {
          self.SaveLoading = false;
          self.issavedisabled = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "FormingTeamSquad" });
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
.card-header {
  padding: 0.75rem;
}
</style>

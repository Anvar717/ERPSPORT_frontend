<template>
  <div>
    <b-row v-if="checkKeyInFilter('ID')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("ID") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input size="md" v-model="filter.ID" v-on:keyup.enter="Search" ref="ID"></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="checkKeyInFilter('oblastid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
        " sm="12" md="4" lg="4">
        <div>
          <label>
            <!-- {{ $t("SportTitle") }} -->
          </label>
          <v-select :options="OblastList" v-model="filter.oblastid" :disabled="(!$can('AdminView', 'permissions') &&
              !$can('MinSportView', 'permissions') &&
              $can('OblastSport', 'permissions')) ||
            $can('RegionXTB', 'permissions')
            " :reduce="(item) => item.id" :placeholder="$t('Oblast')" label="name" class="mr-2 fname-select"
            style="width: 100%" @input="ChangeOblast">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('regionid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
        ">
        <div>
          <label>
            <!-- {{ $t("Region") }} -->
          </label>
          <!-- <div class="col-sm-8 d-flex"> -->
          <v-select :options="RegionList" v-model="filter.regionid" :disabled="!$can('AdminView', 'permissions') &&
            !$can('MinSportView', 'permissions') &&
            !$can('OblastSport', 'permissions') &&
            $can('RegionXTB', 'permissions')
            " :reduce="(item) => item.id" :placeholder="$t('Region')" label="name" class="mr-2 fname-select"
            style="width: 100%" @input="ChangeRegion()">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
          <!-- </div> -->
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('organizationid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
        ">
        <div>
          <label>
            <!-- {{ $t("organization") }} -->
          </label>
          <!-- <div class="col-sm-8 d-flex"> -->
          <v-select :options="OrganizationList" v-model="filter.organizationid" :reduce="(item) => item.id"
            :placeholder="$t('Organization')" label="name" style="width: 100%" class="mr-2 fname-select">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
          <!-- </div> -->
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="3" lg="3" v-if="checkKeyInFilter('schoolyearid')" class="mb-2">
        <label>
          <!-- {{ $t("schoolyear") }} -->
        </label>
        <v-select :options="SchoolYearList" v-model="filter.schoolyearid" :reduce="(item) => item.id"
          :placeholder="$t('schoolyear')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="4" class="mb-2" v-if="checkKeyInFilter('sporttitleid')">
        <div>
          <label>
            <!-- {{ $t("SportTitle") }} -->
          </label>
          <v-select :options="SportTitleList" v-model="filter.sporttitleid" :reduce="(item) => item.id"
            :placeholder="$t('SportTitle')" label="name" style="width: 100%" class="mr-2 fname-select">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4" class="mb-2" v-if="checkKeyInFilter('sporttypeclassifierid')">
        <div>
          <label>
            <!-- {{ $t("SportTypeClassifier") }} -->
          </label>
          <v-select :options="SportTypeClassifierList" v-model="filter.sporttypeclassifierid" :reduce="(item) => item.id"
            :placeholder="$t('SportTypeClassifier')" label="name" style="width: 100%" class="mr-2 fname-select">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4" class="mb-2" v-if="checkKeyInFilter('sporteventtypeid')">
        <div>
          <label>
            <!-- {{ $t("sporteventtype") }} -->
          </label>
          <v-select :options="SportEventTypeList" v-model="filter.sporteventtypeid" :reduce="(item) => item.id"
            :placeholder="$t('sporteventtype')" label="name" style="width: 100%" class="mr-2 fname-select">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4" class="mb-2" v-if="checkKeyInFilter('sportgroupid')">
        <div>
          <label>
            <!-- {{ $t("SportGroup") }} -->
          </label>
          <v-select :options="SportGroupList" v-model="filter.sportgroupid" :reduce="(item) => item.id"
            :placeholder="$t('SportGroup')" label="sportgroupname" style="width: 100%" class="mr-2 fname-select">
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template>
          </v-select>
        </div>
      </b-col>
      <b-col v-if="checkKeyInFilter('competitiontypeid')" sm="12" md="4" lg="4" class="mb-2">
        <label>
          <!-- {{ $t("competitiontype") }} -->
        </label>
        <v-select :options="CompetitionTypeList" v-model="filter.competitiontypeid" :reduce="(item) => item.id"
          :placeholder="$t('competitiontype')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('sportteamsquadlevelid')" class="mb-2">
        <label>
          <!-- {{ $t("SportTeamSquadLevel") }} -->
        </label>
        <v-select :options="sportteamsquadlevellist" v-model="filter.sportteamsquadlevelid" :reduce="(item) => item.id"
          :placeholder="$t('SportTeamSquadLevel')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('sportteamsquadtypeid')" class="mb-2">
        <label>
          <!-- {{ $t("SportTeamSquadType") }} -->
        </label>
        <v-select :options="sportteamsquadtypelist" v-model="filter.sportteamsquadtypeid" :reduce="(item) => item.id"
          :placeholder="$t('SportTeamSquadType')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('sportteamtypeid')" class="mb-2">
        <label>
          <!-- {{ $t("sportteamtypename") }} -->
        </label>
        <v-select :options="sportteamtypelist" v-model="filter.sportteamtypeid" :reduce="(item) => item.id"
          :placeholder="$t('sportteamtypename')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="4" v-if="checkKeyInFilter('sporteventid')" class="mb-2">
        <label>
          <!-- {{ $t("SportEvent") }} -->
        </label>
        <v-select :options="SportEventList" v-model="filter.sporteventid" :reduce="(item) => item.id"
          :placeholder="$t('SportEvent')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('organizationtypeid')" class="mb-2">
        <label>
          <!-- {{ $t("organizationtype") }} -->
        </label>
        <v-select :options="organizationtypelist" v-model="filter.organizationtypeid" :reduce="(item) => item.id"
          :placeholder="$t('organizationtype')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('schooltypeid')" class="mb-2">
        <label>
          <!-- {{ $t("schooltype") }} -->
        </label>
        <v-select :options="schooltypelist" v-model="filter.schooltypeid" :reduce="(item) => item.id"
          :placeholder="$t('schooltype')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('StartDate')" class="mb-2">
        <label>
          {{ $t("StartDate") }}
        </label>
        <date-picker v-model="filter.StartDate" style="width: 100%" size="sm" lang="ru" :placeholder="$t('StartDate')"
          value-type="format" format="DD.MM.YYYY">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </date-picker>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('EndDate')" class="mb-2">
        <label>
          {{ $t("EndDate") }}
        </label>
        <date-picker v-model="filter.EndDate" style="width: 100%" size="sm" lang="ru" :placeholder="$t('EndDate')"
          value-type="format" format="DD.MM.YYYY">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </date-picker>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('DepartmentID')" class="mb-2">
        <label>
          <!-- {{ $t("department") }} -->
        </label>
        <v-select :options="Departmentlist" v-model="filter.DepartmentID" :reduce="(item) => item.id"
          :placeholder="$t('department')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('HREmpAppointOrderTypeID')" class="mb-2">
        <label>
          <!-- {{ $t("HREmpAppointOrderType") }} -->
        </label>
        <v-select :options="HREmpAppointOrderTypelist" v-model="filter.HREmpAppointOrderTypeID"
          :reduce="(item) => item.id" :placeholder="$t('HREmpAppointOrderType')" label="name" style="width: 100%"
          class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('PositionID')" class="mb-2">
        <label>
          <!-- {{ $t("Position") }} -->
        </label>
        <v-select :options="PositionList" v-model="filter.PositionID" :reduce="(item) => item.id"
          :placeholder="$t('Position')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('employmenttypeid')" class="mb-2">
        <label>
          <!-- {{ $t("employmenttype") }} -->
        </label>
        <v-select :options="employmenttypelist" v-model="filter.employmenttypeid" :reduce="(item) => item.id"
          :placeholder="$t('employmenttype')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('OnDate')" class="mb-2">
        <label>
          {{ $t("OnDate") }}
        </label>
        <date-picker v-model="filter.OnDate" style="width: 100%" size="sm" lang="ru" :placeholder="$t('OnDate')"
          value-type="format" format="DD.MM.YYYY">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </date-picker>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('StartDateOfBirth')" class="mb-2">
        <label>
          {{ $t("StartDateOfBirth") }}
        </label>
        <date-picker v-model="filter.StartDateOfBirth" style="width: 100%" size="sm" lang="ru"
          :placeholder="$t('StartDateOfBirth')" value-type="format" format="DD.MM.YYYY">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </date-picker>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('EndDateOfBirth')" class="mb-2">
        <label>
          {{ $t("EndDateOfBirth") }}
        </label>
        <date-picker v-model="filter.EndDateOfBirth" style="width: 100%" size="sm" lang="ru"
          :placeholder="$t('EndDateOfBirth')" value-type="format" format="DD.MM.YYYY">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </date-picker>
      </b-col>

      <b-col sm="12" lg="2" v-if="checkKeyInFilter('staffcategoryid')" class="mb-2">
        <label>
          <!-- {{ $t("StaffCategory") }} -->
        </label>
        <v-select :options="staffcategorylist" v-model="filter.staffcategoryid" :reduce="(item) => item.id"
          :placeholder="$t('StaffCategory')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('genderid')" class="mb-2">
        <label>
          <!-- {{ $t("gender") }} -->
        </label>
        <v-select :options="genderlist" v-model="filter.genderid" :reduce="(item) => item.id" :placeholder="$t('gender')"
          label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('fromemploymentrate')" class="mb-2">
        <label>
          <!-- {{ $t("fromemploymentrate") }} -->
        </label>
        <b-form-input v-model="filter.fromemploymentrate" :placeholder="$t('fromemploymentrate')"
          v-on:keyup.enter="Search" autocomplete="text" type="number" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </b-form-input>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('toemploymentrate')" class="mb-2">
        <label>
          <!-- {{ $t("toemploymentrate") }} -->
        </label>
        <b-form-input v-model="filter.toemploymentrate" :placeholder="$t('toemploymentrate')" v-on:keyup.enter="Search"
          style="width: 100%" class="mr-2 fname-select" autocomplete="text" type="number">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </b-form-input>
      </b-col>

      <b-col sm="12" lg="2" v-if="checkKeyInFilter('SchoolYearID')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="schoolyearlist" v-model="filter.SchoolYearID" :reduce="(item) => item.id"
          :placeholder="$t('SchoolYear')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>

      <b-col sm="12" lg="2" v-if="checkKeyInFilter('sportlevelid')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="sportlevelList" v-model="filter.sportlevelid" :reduce="(item) => item.id"
          :placeholder="$t('SportLevel')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('schoollegalformid')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="schoollegalformlist" v-model="filter.schoollegalformid" :reduce="(item) => item.id"
          :placeholder="$t('schoollegalform')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('sporteventcategoryid')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="SportEventCategoryList" v-model="filter.sporteventcategoryid" :reduce="(item) => item.id"
          :placeholder="$t('SportEventCategory')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('sporttypegroupid')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="SportEventParticipantList" v-model="filter.sporttypegroupid" :reduce="(item) => item.id"
          :placeholder="$t('SportEventParticipant1')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('educationlanguageid')" class="mb-2">
        <label>
          <!-- {{ $t("SchoolYear") }} -->
        </label>
        <v-select :options="educationlanguagelist" v-model="filter.educationlanguageid" :reduce="(item) => item.id"
          :placeholder="$t('educationlanguage')" label="name" style="width: 100%" class="mr-2 fname-select">
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col>
      <b-col sm="12" md="4" lg="3" v-if="checkKeyInFilter('coachname')" class="mb-2">
        <label>
          {{ $t("Murabbiy") }}
        </label>

        <b-form-input size="md" v-model="filter.coachname" v-on:keyup.enter="Search"
          :placeholder="$t('fio')"></b-form-input>
      </b-col>
      <b-col sm="12" md="4" lg="3" v-if="checkKeyInFilter('sportsmename')" class="mb-2">
        <label>
          {{ $t("Student") }}
        </label>
        <b-form-input size="md" v-model="filter.sportsmename" v-on:keyup.enter="Search"
          :placeholder="$t('fio')"></b-form-input>
      </b-col>
      <b-col sm="12" md="4" lg="3" v-if="checkKeyInFilter('FullName')" class="mb-2">
        <label>
          <!-- {{ $t("fio") }} -->
        </label>
        <b-form-input size="md" v-model="filter.FullName" v-on:keyup.enter="Search"
          :placeholder="$t('fio')"></b-form-input>
      </b-col>

      <b-col sm="12" lg="2" v-if="checkKeyInFilter('startage')">
        <label>
          <!-- {{ $t("FromBirth") }} -->
        </label>
        <b-form-input v-model="filter.startage" v-on:keyup.enter="Search" :placeholder="$t('FromBirth')"></b-form-input>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('endage')">
        <label>
          <!-- {{ $t("FromBirth") }} -->
        </label>
        <b-form-input v-model="filter.endage" v-on:keyup.enter="Search" :placeholder="$t('ToBirth')"></b-form-input>
      </b-col>

      <!-- <b-col sm="12" lg="2" v-if="checkKeyInFilter('searchtype')" class="mb-2">
        <label>
           {{ $t("SchoolYear") }} 
        </label>
        <v-select
          :options="SearchTypeList"
          v-model="filter.searchtype"
          :reduce="(item) => item.id"
          :placeholder="$t('Sportchi') + '/' + $t('Murabbiy')"
          label="name"
          style="width: 100%"
          class="mr-2 fname-select"
        >
          <template #no-options="{ search, searching, loading }">
            {{ $t("NoInfo") }}
          </template>
        </v-select>
      </b-col> -->

      <b-col sm="12" lg="2" v-if="checkKeyInFilter('coachPersonName')">
        <label>
          <!-- {{ $t("FromBirth") }} -->
        </label>
        <b-form-input v-model="filter.coachPersonName" v-on:keyup.enter="Search"
          :placeholder="$t('Murabbiy') + ' ' + $t('fio')"></b-form-input>
      </b-col>
      <b-col sm="12" lg="2" v-if="checkKeyInFilter('personName')">
        <label>
          <!-- {{ $t("FromBirth") }} -->
        </label>
        <b-form-input v-model="filter.personName" v-on:keyup.enter="Search"
          :placeholder="$t('Sportchi') + ' ' + $t('fio')"></b-form-input>
      </b-col>
    </b-row>
    
    <c-row class="mt-2">
      <c-col class="text-center">
        <!-- <b-button class="mr-2" variant="danger" @click="CloseModal">
            {{ $t("Back") }}
          </b-button> -->
        <b-button class="mr-2" variant="danger" @click="Clear">
          {{ $t("Clear") }}
        </b-button>
        <b-button class="mr-2" variant="primary" @click="Search">
          {{ $t("Search") }}
        </b-button>
        <b-button class="mr-2" variant="primary" v-b-toggle.collapse-1 @click="Search">
          {{ $t("Back") }}
        </b-button>
      </c-col>
    </c-row>
    <!-- <CInput :placeholder="placeholder" :horizontal="horizontal" :label="label" :disabled="disabled" class="mb-0 CurrenyInput"  type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/> -->
  </div>
</template>

<script>
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportTitleService from "@/services/SportTitle.service";
import SchoolYearService from "@/services/SchoolYear.service";
import SportGroupService from "@/services/SportGroup.service";
import CompetitionTypeService from "@/services/CompetitionType.service";
import SportEventTypeService from "@/services/SportEventType.service";
import SportTeamSquadLevelService from "@/services/SportTeamSquadLevel.service";
import SportTeamSquadTypeService from "@/services/SportTeamSquadType.service";
import HelperService from "@/services/helper.service";
import SportEventService from "@/services/SportEvent.service";
import SportTeamTypeService from "@/services/SportTeamType.service";
import DepartmentService from "@/services/Department.service";
import PositionService from "@/services/Position.service";
import OrganizationTypeService from "@/services/OrganizationType.service";
import StaffCategoryService from "@/services/StaffCategory.service";
import SchoolTypeService from "@/services/SchoolType.service";
import SportLevelService from "@/services/SportLevel.service";
import SchoolLegalFormService from "@/services/SchoolLegalForm.service";
import SportTypeGroupService from "@/services/SportTypeGroup.service";
import SportEventCategoryService from "@/services/SportEventCategory.service";
import EducationLanguageService from "@/services/EducationLanguage.service";
export default {
  props: {
    value: {},
    decimals: {},
    horizontal: {
      default: false,
      type: Boolean,
    },
    label: {
      default: "",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    size: {
      default: "md",
      type: String,
    },
    filter: {
      default: {},
      type: Object,
    },
    oblastid: {
      type: String,
      default: "",
    },
    placeholder: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      isInputActive: false,
      FilterModal: false,
      OblastList: [],
      RegionList: [],
      OrganizationList: [],
      SportTypeClassifierList: [],
      CompetitionTypeList: [],
      SportEventTypeList: [],
      SportTitleList: [],
      SportGroupList: [],
      SchoolYearList: [],
      SearchTypeList: [
        { id: 1, name: this.$t("personname1") },
        { id: 2, name: this.$t("Coach") },
        // { id : 4,name : this.$t('inn') }
      ],
      sportteamsquadlevellist: [],
      sportteamsquadtypelist: [],
      genderlist: [],
      sportteamtypelist: [],
      SportEventList: [],
      Departmentlist: [],
      HREmpAppointOrderTypelist: [],
      PositionList: [],
      employmenttypelist: [],
      organizationtypelist: [],
      schooltypelist: [],
      staffcategorylist: [],
      // SearchTypeList: [],
      sportlevelList: [],
      schoollegalformlist: [],
      SportEventCategoryList: [],
      SportEventParticipantList: [],
      educationlanguagelist: [],
      lang: "",
      filters: {},
      ApprovedUserList : []
    };
  },
  created() {
    this.filters = this.filter;
    if (this.checkKeyInFilter("oblastid")) {
      console.log("filters", this.oblastid);
      OblastService.GetAll()
        .then((res) => {
          this.OblastList = res.data;
          setTimeout(() => this.getRegion(this.filters), 600);
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporttitleid")) {
      SportTitleService.GetAll(true)
        .then((res) => {
          this.SportTitleList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporttypeclassifierid")) {
      SportTypeClassifierService.GetAll(true)
        .then((res) => {
          this.SportTypeClassifierList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sportgroupid")) {
      SportGroupService.GetAll()
        .then((res) => {
          this.SportGroupList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("schoolyearid")) {
      SchoolYearService.GetAll(true)
        .then((res) => {
          this.SchoolYearList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("competitiontypeid")) {
      CompetitionTypeService.GetAll()
        .then((res) => {
          this.CompetitionTypeList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporteventtypeid")) {
      SportEventTypeService.GetAll()
        .then((res) => {
          this.SportEventTypeList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sportteamsquadlevelid")) {
      SportTeamSquadLevelService.GetAll()
        .then((res) => {
          this.sportteamsquadlevellist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sportteamsquadtypeid")) {
      SportTeamSquadTypeService.GetAll()
        .then((res) => {
          this.sportteamsquadtypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("genderid")) {
      HelperService.GetGenderList()
        .then((res) => {
          this.genderlist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sportteamtypeid")) {
      SportTeamTypeService.GetAll()
        .then((res) => {
          this.sportteamtypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporteventid")) {
      SportEventService.GetAll()
        .then((res) => {
          this.SportEventList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("DepartmentID")) {
      DepartmentService.GetAll()
        .then((res) => {
          this.Departmentlist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("HREmpAppointOrderTypeID")) {
      HelperService.HrEmpAppointOrderType()
        .then((res) => {
          this.HREmpAppointOrderTypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("PositionID")) {
      PositionService.GetAll(0, 0, false, 0)
        .then((res) => {
          this.PositionList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("employmenttypeid")) {
      HelperService.GetEmploymentType()
        .then((res) => {
          this.employmenttypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("staffcategoryid")) {
      StaffCategoryService.GetAll()
        .then((res) => {
          this.staffcategorylist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("organizationtypeid")) {
      OrganizationTypeService.GetAll()
        .then((res) => {
          this.organizationtypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("schooltypeid")) {
      SchoolTypeService.GetAll()
        .then((res) => {
          this.schooltypelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("staffcategoryid")) {
      StaffCategoryService.GetAll()
        .then((res) => {
          this.staffcategorylist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sportlevelid")) {
      SportLevelService.GetAll()
        .then((res) => {
          this.sportlevelList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("schoollegalformid")) {
      SchoolLegalFormService.GetAll()
        .then((res) => {
          this.schoollegalformlist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporteventcategoryid")) {
      SportEventCategoryService.GetAll()
        .then((res) => {
          this.SportEventCategoryList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("sporttypegroupid")) {
      SportTypeGroupService.GetAll()
        .then((res) => {
          this.SportEventParticipantList = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    if (this.checkKeyInFilter("educationlanguageid")) {
      EducationLanguageService.GetAll()
        .then((res) => {
          this.educationlanguagelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
    }
    
  },
  computed: {
    displayValue: {
      get: function () {
        let numberdec = 3;
        if (
          isNaN(this.decimals) ||
          this.decimals === null ||
          this.decimals === ""
        ) {
          numberdec = 3;
        } else {
          numberdec = parseFloat(this.decimals);
        }
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return isNaN(this.value) || this.value === null || this.value === ""
            ? 0
            : this.value.toString().replace(".", ",");
        } else {
          return isNaN(this.value) || this.value === null || this.value === ""
            ? this.value
            : this.decimalToRussianF(this.value, numberdec);
        }
      },
      set: function (modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(
          modifiedValue.replace(",", ".").replace(/[^.0-9a-z]/gi, "")
        );
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0;
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    decimalToRussianF(value, fraction) {
      var number = value;
      return new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: fraction,
        minimumFractionDigits: fraction,
      }).format(number);
    },
    ChangeOblast() {
      this.filter.regionid = 0;
      this.RegionList = [];
      this.OrganizationList = [];
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll(this.lang, this.filter.oblastid).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeRegion() {
      this.filter.organizationid = 0;
      this.OrganizationList = [];
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          "",
          "",
          ""
        ).then((res) => {
          this.OrganizationList = res.data;
        });
      }
    },
    Search() {
      this.$emit("search", true);
    },
    getRegion(id) {
      this.filter = id;
      if (this.filter.oblastid != 0 || this.filter.oblastid != null) {
        console.log(22222, this.filter);
        console.log(22222, this.filter.oblastid);
        RegionService.GetAll(this.lang, this.filter.oblastid)
          .then((res) => {
            this.RegionList = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("Error"),
              "danger"
            );
          });
      }
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          "",
          "",
          ""
        )
          .then((res) => {
            this.OrganizationList = res.data;
          })
          .catch((error) => {
            this.makeToast(
              error.response.data.error,
              this.$t("Error"),
              "danger"
            );
          });
      }
    },
    Clear() {
      this.$emit("clear", true);
    },
    CloseModal() {
      this.$emit("close", true);
    },
    checkKeyInFilter(key) {
      return key in this.filter;
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

<style>
.CurrenyInput input {
  text-align: right;
}
</style>

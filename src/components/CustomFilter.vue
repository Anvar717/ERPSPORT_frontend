
<template>
  <div>
    <b-row v-if="checkKeyInFilter('ID')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("ID") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input
              size="md"
              v-model="filter.ID"
              v-on:keyup.enter="Search"
              ref="ID"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row
      v-if="
        checkKeyInFilter('oblastid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
      "
    >
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("Oblast") }}
          </label>
          <div class="col-sm-8 d-flex">
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
              :placeholder="$t('ChooseBelow')"
              label="name"
              class="mr-2 fname-select"
              style="width: 100%"
              @input="ChangeOblast()"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template></v-select
            >
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row
      v-if="
        checkKeyInFilter('regionid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
      "
    >
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("Region") }}
          </label>
          <div class="col-sm-8 d-flex">
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
              :placeholder="$t('ChooseBelow')"
              label="name"
              class="mr-2 fname-select"
              style="width: 100%"
              @input="ChangeRegion()"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row
      v-if="
        checkKeyInFilter('organizationid') &&
        ($can('AdminView', 'permissions') ||
          $can('MinSportView', 'permissions') ||
          $can('OblastSport', 'permissions') ||
          $can('RegionXTB', 'permissions'))
      "
    >
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("organization") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="OrganizationList"
              v-model="filter.organizationid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sporttitleid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportTitle") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SportTitleList"
              v-model="filter.sporttitleid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sporttypeclassifierid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportTypeClassifier") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SportTypeClassifierList"
              v-model="filter.sporttypeclassifierid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sporteventtypeid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("sporteventtype") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SportEventTypeList"
              v-model="filter.sporteventtypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row v-if="checkKeyInFilter('sportgroupid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportGroup") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SportGroupList"
              v-model="filter.sportgroupid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="sportgroupname"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('competitiontypeid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("competitiontype") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="CompetitionTypeList"
              v-model="filter.competitiontypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('schoolyearid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("schoolyear") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SchoolYearList"
              v-model="filter.schoolyearid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- <b-row v-if="checkKeyInFilter('searchtype')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SearchType") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SearchTypeList"
              v-model="filter.searchtype"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row> -->    
    <b-row v-if="checkKeyInFilter('sportteamsquadlevelid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportTeamSquadLevel") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="sportteamsquadlevellist"
              v-model="filter.sportteamsquadlevelid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sportteamsquadtypeid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportTeamSquadType") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="sportteamsquadtypelist"
              v-model="filter.sportteamsquadtypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('genderid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("gender") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="genderlist"
              v-model="filter.genderid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sportteamtypeid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("sportteamtypename") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="sportteamtypelist"
              v-model="filter.sportteamtypeid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sporteventid')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("SportEvent") }}
          </label>
          <div class="col-sm-8 d-flex">
            <v-select
              :options="SportEventList"
              v-model="filter.sporteventid"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              style="width: 100%"
              class="mr-2 fname-select"
            >
              <template #no-options="{ search, searching, loading }">
                {{ $t("NoInfo") }}
              </template>
            </v-select>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- <b-row v-if="checkKeyInFilter('searchtype')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("search") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input
              size="md"
              v-model="filter.searchtype"
              v-on:keyup.enter="Search"            
              :placeholder="$t('fio')"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row> -->
    <!-- <b-row v-if="checkKeyInFilter('fakeSearch')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("search") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input
              size="md"
              v-model="filter.fakeSearch"
              v-on:keyup.enter="Search"
              ref="fakeSearch"
              :placeholder="$t('fio')"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>     -->
    <b-row v-if="checkKeyInFilter('coachname')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("Murabbiy") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input
              size="md"
              v-model="filter.coachname"
              v-on:keyup.enter="Search"            
              :placeholder="$t('fio')"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="checkKeyInFilter('sportsmename')">
      <b-col>
        <div class="form-group form-row">
          <label class="col-form-label col-sm-4">
            {{ $t("Student") }}
          </label>
          <div class="col-sm-8 d-flex">
            <b-form-input
              size="md"
              v-model="filter.sportsmename"
              v-on:keyup.enter="Search"              
              :placeholder="$t('fio')"
            ></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <c-row class="mt-2">
      <c-col class="text-center">
        <b-button class="mr-2" variant="danger" @click="CloseModal">
          {{ $t("Back") }}
        </b-button>
        <b-button class="mr-2" variant="danger" @click="Clear">
          {{ $t("Clear") }}
        </b-button>
        <b-button variant="primary" @click="Search">
          {{ $t("Search") }}
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
    };
  },
  created() {
    if (this.checkKeyInFilter("oblastid")) {
      OblastService.GetAll()
        .then((res) => {
          this.OblastList = res.data;
          
          if (!!this.filter.oblastid) {
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
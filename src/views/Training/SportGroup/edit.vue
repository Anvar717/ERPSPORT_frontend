<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportGroup") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('code')"
                autocomplete="text"
                horizontal
                disabled
                :label="$t('code')"
                v-model="SportGroup.code"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>
                  {{
                  $t("circlesporttype")
                  }}
                </label>
                <v-select
                  class="col-sm-9"
                  :options="sporttypeclassifierlist"
                  v-model="SportGroup.sporttypeclassifierid"
                  @input="ChangeSporttypeClassifier"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>
                  {{
                  $t("SportLevel")
                  }}
                </label>
                <v-select
                  class="col-sm-9"
                  :options="sportlevellist"
                  v-model="SportGroup.sportlevelid"
                  :reduce="(item) => item.id"
                  @input="ChangeSportLevel"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('sportgroupnumber')"
                autocomplete="text"
                horizontal
                disabled
                :label="$t('sportgroupnumber')"
                v-model="SportGroup.sportgroupnumber"
                @input="ChangeSportGroupNumber"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('sportgroupname')"
                autocomplete="text"
                horizontal
                :label="$t('sportgroupname')"
                v-model="SportGroup.sportgroupname"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>
                  {{
                  $t("Status")
                  }}
                </label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="SportGroup.stateid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({ name: 'SportGroup' })"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import SportGroupService from "@/services/SportGroup.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import SportLevelService from "@/services/SportLevel.service";
export default {
  data() {
    return {
      SaveLoading: false,
      sporttypeclassifierlist: [],
      sportlevellist: [],
      SportGroup: {},
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "actions", label: "" }
      ],
      statelist: []
    };
  },
  created() {
    SportTypeClassifierService.GetAll().then(res => {
      this.sporttypeclassifierlist = res.data;
    });
    SportLevelService.GetAll().then(res => {
      this.sportlevellist = res.data;
    });
    HelperService.GetLanguageList().then(res => {
      this.LanguageList = res.data;
    });
    HelperService.GetGenderList().then(res => {
      this.genderlist = res.data;
    });
    HelperService.GetStateList().then(res => {
      this.statelist = res.data;
    });
    SportGroupService.Get(this.$route.params.id).then(res => {
      this.SportGroup = res.data;
      this.items1 =
        res.data.Translates.filter(item => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter(item => item.columnname == "fullname") || [];
    });
  },
  methods: {
    ChangeSporttypeClassifier() {
      this.SportGroup.sporttypeclassifiername = this.sporttypeclassifierlist.filter(
        item => item.id == this.SportGroup.sporttypeclassifierid
      )[0].name;
      this.SportGroup.sportgroupname = this.SportGroup.sporttypeclassifiername;
    },
    ChangeSportLevel() {
      this.SportGroup.sportlevelname = this.sportlevellist.filter(
        item => item.id == this.SportGroup.sportlevelid
      )[0].name;
      this.SportGroup.sportgroupname =
        this.SportGroup.sporttypeclassifiername +
        " " +
        this.SportGroup.sportlevelname;

      // SportGroupService.GetLastSportGroupNumber(
      //   this.SportGroup.sporttypeclassifierid,
      //   this.SportGroup.sportlevelid
      // );{
      //   this.SportGroup.sportgroupnumber = res.data
      // }
       SportGroupService.GetLastSportGroupNumber(
        this.SportGroup.sporttypeclassifierid,
        this.SportGroup.sportlevelid
       ).then(res => {
       this.SportGroup.sportgroupnumber = res.data
    });
    },
    ChangeSportGroupNumber() {
      this.SportGroup.sportgroupname =
        this.SportGroup.sporttypeclassifiername +
        " " +
        this.SportGroup.sportlevelname +
        " " +
        this.SportGroup.sportgroupnumber;
    },
    check() {
      var self = this;

      if (
        self.SportGroup.code === 0 ||
        self.SportGroup.code === null ||
        self.SportGroup.code === undefined ||
        self.SportGroup.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportGroup.sportgroupnumber === 0 ||
        self.SportGroup.sportgroupnumber === null ||
        self.SportGroup.sportgroupnumber === undefined ||
        self.SportGroup.sportgroupnumber === ""
      ) {
        this.makeToast(
          this.$t("sportgroupnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportGroup.stateid === 0 ||
        self.SportGroup.stateid === null ||
        self.SportGroup.stateid === undefined ||
        self.SportGroup.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      SportGroupService.Update(this.SportGroup)
        .then(res => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "SportGroup" });
        })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
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
        solid: true
      });
    }
  }
};
</script>

<style></style>

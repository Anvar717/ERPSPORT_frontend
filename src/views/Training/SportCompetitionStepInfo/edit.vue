<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("SportCompetitionStepInfo") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('ordernumber')"
                autocomplete="text"
                horizontal
                :label="$t('ordernumber')"
                v-model="SportCompetitionStepInfo.ordernumber"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                type="number"
                :placeholder="$t('code1-old')"
                autocomplete="text"
                :disabled="$route.params.id!='0'"
                horizontal
                :label="$t('code1-old')"
                v-model="SportCompetitionStepInfo.code"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('shortname')"
                autocomplete="text"
                horizontal
                :label="$t('shortname')"
                v-model="SportCompetitionStepInfo.shortname"
              >
                <template #append>
                  <CButton
                    @click="ShortNameLang"
                    style="height: 35px"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="globe2"></b-icon>
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('fullname')"
                autocomplete="text"
                horizontal
                :label="$t('fullname')"
                v-model="SportCompetitionStepInfo.fullname"
              >
                <template #append>
                  <CButton
                    @click="FullNameLang"
                    style="height: 35px"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="globe2"></b-icon>
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <CInput
                :placeholder="$t('description')"
                autocomplete="text"
                horizontal
                :label="$t('description')"
                v-model="SportCompetitionStepInfo.description"
              ></CInput>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("ismultirow")
                }}</label>
                <div class="col-sm-9">
                  <b-form-checkbox
                    v-model="SportCompetitionStepInfo.ismultirow"
                    switch
                  ></b-form-checkbox>
                </div>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>

          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("sportcompetitiontype")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="compTypeTableList"
                  v-model="compTypeTableIds"
                  multiple
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
                <label class="col-form-label col-sm-3" for>{{
                  $t("tablename")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="tablelist"
                  v-model="SportCompetitionStepInfo.tableid"
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
                <label class="col-form-label col-sm-3" for>{{
                  $t("Status")
                }}</label>
                <v-select
                  class="col-sm-9"
                  :options="statelist"
                  v-model="SportCompetitionStepInfo.stateid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                ></v-select>
              </div>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <hr>
          <CRow>
            <CCol sm="3"></CCol>
            <CCol sm="6">
              <div class="mb-2 d-flex justify-content-between">
                <h4>{{ $t('tables1') }}</h4>
                <CButton
                  class="ml-4"
                  size="sm"
                  color="primary"
                  @click="HelperModal = true"
                >
                  <b-icon icon="plus" />
                  {{ $t("Add") }}
                </CButton>
              </div>
              <table class="table table-bordered">
                <thead class="thead-light ">
                  <tr>
                    <th>№</th>
                    <th>{{ $t('tablename') }}</th>
                    <th>{{ $t('position') }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="item.Status!=3" v-for="(item, index) in SportCompetitionStepInfo.helperTable" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ getTableName(item.tableid)?getTableName(item.tableid).name:item.tableid }}</td>
                    <td>{{ getPositionName(item.rowid)?getPositionName(item.rowid).name:item.rowid }}</td>
                    <td>
                      <b-link
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Delete') }"
                          @click="DeleteItem(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                    </td>
                  </tr>
                  <tr v-if="SportCompetitionStepInfo && !SportCompetitionStepInfo.helperTable.length">
                    <td colspan="4" class="text-center">
                      {{ $t('NoInfo') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCol>
            <CCol sm="3"></CCol>
          </CRow>
          <!--  -->
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({ name: 'SportCompetitionStepInfo' })"
                >
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
        </CCardBody>
        <!--  -->
        <CModal
          :title="$t('HelperTable')"
          :show.sync="HelperModal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <div>
            <CRow>
              <CCol sm="12">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-2" for>{{
                    $t("tablename")
                  }}</label>
                  <v-select
                    class="col-sm-6"
                    :options="helperTableList"
                    v-model="toTableId"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
  
            <CRow>
              <CCol sm="12">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-2" for>{{ $t("position") }}</label>
                  <v-select
                    :options="positionlist"
                    multiple
                    class="col-sm-9"
                    v-model="helperTableIds"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
            </CRow>
          </div>
          <template #footer>
            <CButton
              @click="SaveHelper"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
        <!--  -->
        <CModal
          :title="$t('translate')"
          :show.sync="TranslateModal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="fields"
            :items="items"
            class="bg-color-table text-center"
            style="vertical-align: middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width: 30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="LanguageList"
                    :reduce="(item) => item.id"
                    label="name"
                    v-model="Translate.languageid"
                    style="z-index: 9999"
                  ></v-select>
                </b-th>
                <b-th style="width: 60%">
                  <CInput
                    class="mb-0"
                    v-model="Translate.translatetext"
                  ></CInput>
                </b-th>
                <b-th style="width: 10%">
                  <CButton
                    @click="AddItem"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{ item }">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton
              @click="SaveTranslate"
              color="primary"
              size="sm"
              variant="outline"
            >
              <b-icon icon="check2"></b-icon>
              {{ $t("Save") }}
            </CButton>
          </template>
        </CModal>
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import HelperService from "@/services/helper.service";
import SportCompetitionStepInfoService from "@/services/SportCompetitionStepInfo.service";
import TableService from "@/services/Table.service";
import PositionService from "@/services/Position.service";

export default {
  data() {
    return {
      SaveLoading: false,
      SportCompetitionStepInfo: {
        code: "",
        shortname: "",
        fullname: "",
        description: "",
        ismultirow: true,
        isfilled: true,
        isapproved: true,
        nextstepcode: "",
        previousstepcode: "",
        Translates: [],
      },
      HelperModal:false,
      toTableId: null,
      helperTableIds:[],
      compTypeTableIds: null,
      oldCompTypeVal: null,
      compTypeTableList:[],
      helperTableList:[],
      TranslateModal: false,
      fields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("translateModal.name") },
        { key: "actions", label: "" },
      ],
      items1: [],
      items2: [],
      positionlist: [],
      items: [],
      LanguageList: [],
      Translate: {
        languageid: "",
        translatetext: "",
      },
      TranslatebyName: "shortname",
      statelist: [],
      tablelist : []
    };
  },
  created() {
    HelperService.GetLanguageList().then((res) => {
      this.LanguageList = res.data;
    });
    HelperService.GetGenderList().then((res) => {
      this.genderlist = res.data;
    });
    HelperService.GetStateList().then((res) => {
      this.statelist = res.data;
    });
    TableService.GetAll().then((res) => {
      this.helperTableList = res.data;
    });
    PositionService.GetAll(0, 0, false, 0)
      .then((res) => {
        this.positionlist = res.data;
      })
    TableService.GetAll(0).then(res => {
      this.tablelist = res.data
    })
    SportCompetitionStepInfoService.Get(this.$route.params.id).then((res) => {
      this.SportCompetitionStepInfo = res.data;
      this.items1 =
        res.data.Translates.filter((item) => item.columnname == "shortname") ||
        [];
      this.items2 =
        res.data.Translates.filter((item) => item.columnname == "fullname") ||
        [];
    });

    setTimeout(() => {
      HelperService.GetAllSportCompetitionType().then(res => {
        this.compTypeTableList = res.data;
        this.compTypeTableIds = this.SportCompetitionStepInfo.compTypeTable.map((comp) => comp.sportcompetitiontypeid)
        this.oldCompTypeVal = this.SportCompetitionStepInfo.compTypeTable.map((comp) => comp.sportcompetitiontypeid)
      });
    }, 500);
  },
  methods: {
    check() {
      var self = this;

      if (
        self.SportCompetitionStepInfo.code === 0 ||
        self.SportCompetitionStepInfo.code === null ||
        self.SportCompetitionStepInfo.code === undefined ||
        self.SportCompetitionStepInfo.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.SportCompetitionStepInfo.shortname === 0 ||
        self.SportCompetitionStepInfo.shortname === null ||
        self.SportCompetitionStepInfo.shortname === undefined ||
        self.SportCompetitionStepInfo.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.SportCompetitionStepInfo.fullname === 0 ||
        self.SportCompetitionStepInfo.fullname === null ||
        self.SportCompetitionStepInfo.fullname === undefined ||
        self.SportCompetitionStepInfo.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }

      if (
        self.SportCompetitionStepInfo.stateid === 0 ||
        self.SportCompetitionStepInfo.stateid === null ||
        self.SportCompetitionStepInfo.stateid === undefined ||
        self.SportCompetitionStepInfo.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveHelper() {
      if (this.helperTableIds && this.helperTableIds.length) {
        let helperTableItem = {}
        this.helperTableIds.forEach(el => {
          helperTableItem = {
              tableid: this.toTableId,
              rowid: el,
              rowname: this.getPositionName(el)?this.getPositionName(el).name:el,
              status:1
          }
          this.SportCompetitionStepInfo.helperTable.push(helperTableItem)
        })
      }
      this.HelperModal = false
    },
    getPositionName(id) {
      return this.positionlist.find((el) => el.id == id)
    },
    getTableName(id) {
      return this.helperTableList.find((el) => el.id == id)
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    // changeCompType(value) {
    //   const firstArray = this.SportCompetitionStepInfo.compTypeTable.map((comp) => comp.sportcompetitiontypeid)
    //   let newDifArray = firstArray.filter(el => this.compTypeTableIds.indexOf(el) == -1)
    //   if (newDifArray && newDifArray.length) {
    //     if (this.oldCompTypeVal) {
          
    //     } else {
          
    //     }
    //     newDifArray.forEach(newEl => {
          
    //     })
    //   }
    //   this.oldCompTypeVal = value
    //   // this.compTypeTableList.find(e => e.sportcompetitiontypeid ==)
    //   let newItem = {
    //     Status: 1,
    //     sportcompetitiontypeid: 1,
    //     sportcompetitiontypename: "Янги мусобоқа"
    //   }
    // },
    checkCompTypeTable() {
      // const firstArray = this.SportCompetitionStepInfo.compTypeTable.map((comp) => comp.sportcompetitiontypeid)
      // let newDifArray = firstArray.filter(el => this.compTypeTableIds.indexOf(el) == -1)
      // this.SportCompetitionStepInfo.compTypeTable.forEach(el => {
      //   if (newDifArray.includes(el.sportcompetitiontypeid)) {
      //     if (firstArray.length > newDifArray.length) {
      //       el.Status = 3
      //     } else if (firstArray.length > newDifArray.length) {
      //       el.Status = 2
      //     }
      //   }
      // })
      if (this.compTypeTableIds.length) {
        this.SportCompetitionStepInfo.compTypeTable=[]
        this.compTypeTableIds.forEach(el => {
          let sportcompetitiontype = this.compTypeTableList.find(e => e.id == el)
          this.SportCompetitionStepInfo.compTypeTable.push({
              Status: 1,
              sportcompetitiontypeid: el,
              sportcompetitiontypename: sportcompetitiontype.name
          })
        })
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.checkCompTypeTable()
      SportCompetitionStepInfoService.Update(this.SportCompetitionStepInfo)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "SportCompetitionStepInfo" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    ShortNameLang() {
      this.items = this.items1;
      this.TranslateModal = true;
      this.TranslatebyName = "shortname";
      this.Translate = {};
    },
    FullNameLang() {
      this.items = this.items2;
      this.TranslateModal = true;
      this.TranslatebyName = "fullname";
      this.Translate = {};
    },
    AddItem() {
      if (this.TranslatebyName == "shortname") {
        this.ItemsPush();
        this.SportCompetitionStepInfoTranslatePush();
        this.items1 = this.items;
      } else {
        this.ItemsPush();
        this.SportCompetitionStepInfoTranslatePush();
        this.items2 = this.items;
      }
      this.Translate = {};
    },
    SaveTranslate() {
      this.TranslateModal = false;
    },
    ItemsPush() {
      this.items.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
      });
    },
    SportCompetitionStepInfoTranslatePush() {
      this.SportCompetitionStepInfo.Translates.push({
        languageid: this.Translate.languageid,
        languagename: this.LanguageList.filter(
          (item) => item.id == this.Translate.languageid
        )[0].name,
        translatetext: this.Translate.translatetext,
        columnname: this.TranslatebyName,
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
  
  <style></style>
  
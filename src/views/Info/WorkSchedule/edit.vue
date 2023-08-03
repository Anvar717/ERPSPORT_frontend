<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('WorkSchedule')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required|max:9">
                  <CInput
                    :placeholder="$t('code')"
                    autocomplete="code"
                    horizontal
                    :label="$t('code')"
                    v-model="WorkSchedule.code"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('shortname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('shortname')"
                    v-model="WorkSchedule.shortname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="WorkSchedule.TranslatableColumns.includes('shortname')"
                        @click="translate('shortname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <ValidationProvider v-slot="v" name="code" rules="required">
                  <CInput
                    :placeholder="$t('fullname')"
                    autocomplete="text"
                    horizontal
                    :label="$t('fullname')"
                    v-model="WorkSchedule.fullname"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template #append>
                      <CButton
                        v-if="WorkSchedule.TranslatableColumns.includes('fullname')"
                        @click="translate('fullname')"
                        style="height:35px"
                        variant="outline"
                        type="button"
                        color="primary"
                      >
                        <b-icon icon="globe2"></b-icon>
                      </CButton>
                    </template>
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{$t('state')}}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="WorkSchedule.stateid"
                    :reduce="item => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol>
                <b-tabs>
                  <b-tab :title="$t('WorksCheduleDayHourTab')" active>
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="WorkScheduleTablesDayHour"
                          :items="WorkSchedule.TablesDayHour"
                          class="bg-color-table text-center mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template v-slot:thead-top>
                            <b-tr>
                              <b-th style="width:5%">
                                <CInput
                                  type="number"
                                  class="mb-0"
                                  v-model="tabrowtablesdayhour.daynumber"
                                ></CInput>
                              </b-th>
                              <b-th style="width:11%" class="text-center">
                                <b-form-checkbox
                                  v-model="tabrowtablesdayhour.isdayoff"
                                  switch
                                  class="mt-2 ml-1"
                                ></b-form-checkbox>
                              </b-th>
                              <b-th style="width:18%">
                                <CInput
                                  class="mb-0"
                                  v-model="tabrowtablesdayhour.begintime"
                                  type="time"
                                ></CInput>
                              </b-th>
                              <b-th style="width:18%">
                                <CInput
                                  class="mb-0"
                                  v-model="tabrowtablesdayhour.endtime"
                                  type="time"
                                ></CInput>
                              </b-th>
                              <b-th style="width:7%" class="text-center">
                                <CButton
                                  size="sm"
                                  color="primary"
                                  variant="outline"
                                  @click="Addtablesdayhour"
                                >
                                  <b-icon icon="plus"> </b-icon>
                                </CButton>
                              </b-th>
                            </b-tr>
                          </template>
                          <template v-slot:cell(daynumber)="{item}">
                            <p v-if="item.Status == 0">{{item.daynumber}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.daynumber"
                            ></CInput>
                          </template>
                          <template v-slot:cell(isdayoff)="{item}">
                            <b-form-checkbox
                              disabled="true"
                              v-if="item.Status == 0"
                              v-model="item.isdayoff"
                              switch
                              class="mt-2 ml-1"
                            ></b-form-checkbox>
                            <b-form-checkbox
                              v-if="item.Status == 1 || item.Status == 2"
                              v-model="item.isdayoff"
                              switch
                              class="mt-2 ml-1"
                            ></b-form-checkbox>
                          </template>
                          <template v-slot:cell(begintime)="{item}">
                            <p v-if="item.Status == 0">{{item.begintime}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.begintime"
                              type="time"
                            ></CInput>
                          </template>
                          <template v-slot:cell(endtime)="{item}">
                            <p v-if="item.Status == 0">{{item.endtime}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.endtime"
                              type="time"
                            ></CInput>
                          </template>
                          <template v-slot:cell(actions)="{item}">
                            <CButtonGroup class="mx-auto d-block text-center" size="sm">
                              <CButton variant="outline" color="primary" @click="EditRow(item)">
                                <b-icon icon="pencil"></b-icon>
                              </CButton>
                              <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                                <b-icon icon="x"></b-icon>
                              </CButton>
                            </CButtonGroup>
                          </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>
                  <b-tab :title="$t('WorksCheduleWorkHourTab')">
                    <CRow class="mt-4">
                      <CCol>
                        <b-table
                          :fields="WorkScheduleTablesWorkHour"
                          :items="WorkSchedule.TablesWorkHour"
                          class="bg-color-table text-center tdpadding mx-3"
                          style="vertical-align:middle"
                          bordered
                          responsive="sm"
                          :tbody-tr-class="rowClass"
                        >
                          <template v-slot:thead-top>
                            <b-tr>
                              <b-th style="width:11%">
                                <date-picker
                                  v-model="tabrowtablesworkhour.ondate"
                                  style="width:100%"
                                  size="sm"
                                  lang="ru"
                                  :placeholder="$t('ondate')"
                                  value-type="format"
                                  format="DD.MM.YYYY"
                                ></date-picker>
                              </b-th>
                              <b-th style="width:13%">
                                <CInput
                                  type="number"
                                  class="mb-0"
                                  v-model="tabrowtablesworkhour.days"
                                ></CInput>
                              </b-th>
                              <b-th style="width : 40%">
                                <custom-number-input v-model="tabrowtablesworkhour.hours"></custom-number-input>
                              </b-th>
                              <b-th style="width:8%">
                                <CButton
                                  size="sm"
                                  color="primary"
                                  variant="outline"
                                  @click="Addtablesworkhour"
                                >
                                  <b-icon icon="plus"> </b-icon>
                                </CButton>
                              </b-th>
                            </b-tr>
                          </template>
                          <template v-slot:cell(ondate)="{item}">
                            <p v-if="item.Status == 0">{{item.ondate}}</p>
                            <date-picker
                              v-model="item.ondate"
                              v-if="item.Status == 1 || item.Status == 2"
                              style="width:100%"
                              class="mb-2"
                              size="sm"
                              lang="ru"
                              :placeholder="$t('ondate')"
                              value-type="format"
                              format="DD.MM.YYYY"
                            ></date-picker>
                          </template>
                          <template v-slot:cell(days)="{item}">
                            <p v-if="item.Status == 0">{{item.days}}</p>
                            <CInput
                              v-if="item.Status == 1 || item.Status == 2"
                              class="mb-0"
                              v-model="item.days"
                            ></CInput>
                          </template>
                          <template v-slot:cell(hours)="{item}">
                            <p v-if="item.Status == 0">{{item.hours}}</p>
                            <custom-number-input
                              v-if="item.Status == 1 || item.Status == 2"
                              v-model="item.hours"
                            ></custom-number-input>
                          </template>
                          <template v-slot:cell(actions)="{item}">
                            <CButtonGroup class="mx-auto d-block text-center" size="sm">
                              <CButton variant="outline" color="primary" @click="EditRow(item)">
                                <b-icon icon="pencil"></b-icon>
                              </CButton>
                              <CButton variant="outline" color="danger" @click="DeleteRow(item)">
                                <b-icon icon="x"></b-icon>
                              </CButton>
                            </CButtonGroup>
                          </template>
                        </b-table>
                      </CCol>
                    </CRow>
                  </b-tab>
                </b-tabs>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>

        <CModal
          :title="$t('translate')"
          :show.sync="translatemodal"
          size="lg"
          :closeOnBackdrop="false"
        >
          <b-table
            :fields="translitefields"
            :items="translatelist"
            class="bg-color-table text-center"
            style="vertical-align:middle"
            bordered
            responsive="sm"
          >
            <template v-slot:thead-top>
              <b-tr>
                <b-th style="width:30%">
                  <v-select
                    :placeholder="$t('ChooseBelow')"
                    class="mb-0"
                    :options="languagelist"
                    :reduce="item => item.id"
                    label="name"
                    v-model="translaterow.languageid"
                    style="z-index:9999"
                  ></v-select>
                </b-th>
                <b-th style="width:60%">
                  <CInput class="mb-0" v-model="translaterow.translatetext"></CInput>
                </b-th>
                <b-th style="width:10%">
                  <CButton
                    @click="addtranslite"
                    color="primary"
                    variant="outline"
                    class="text-center mx-auto d-block"
                  >
                    <b-icon icon="plus"> </b-icon>
                  </CButton>
                </b-th>
              </b-tr>
            </template>
            <template v-slot:cell(translatetext)="{item}">
              <CInput v-model="item.translatetext" class="mb-0"></CInput>
            </template>
          </b-table>
          <template #footer>
            <CButton @click="SaveTranslate" color="primary" size="sm" variant="outline">
              <b-icon icon="check2"></b-icon>
              {{$t('Save')}}
            </CButton>
          </template>
        </CModal>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'WorkSchedule'})"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton size="sm" color="success" class="mr-4" @click="SaveData">
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import WorkScheduleService from "@/services/WorkSchedule.service";
export default {
  data() {
    return {
      SaveLoading: false,
      translatemodal: false,
      WorkSchedule: { TranslatableColumns: [] },
      selectedrowid: 0,
      translitefields: [
        { key: "languagename", label: this.$t("languagename") },
        { key: "translatetext", label: this.$t("name") },
        { key: "actions", label: "" }
      ],

      translatelist: [],
      languagelist: [],

      translaterow: {
        tableid: 0,
        tablerowid: 0,
        languageid: 0,
        languagename: "",
        columnname: "",
        translatetext: ""
      },
      translatebyname: "",
      toastCount: 0,
      allSignupErrors: {},
      statelist: [],
      WorkScheduleTablesDayHour: [
        { key: "daynumber", label: this.$t("daynumber") },
        { key: "isdayoff", label: this.$t("isdayoff") },
        { key: "begintime", label: this.$t("begintime") },
        { key: "endtime", label: this.$t("endtime") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrowtablesdayhour: {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        isdayoff: 0,
        begintime: 0,
        endtime: 0,
        Status: 1
      },
      WorkScheduleTablesWorkHour: [
        { key: "ondate", label: this.$t("ondate") },
        { key: "days", label: this.$t("days") },
        { key: "hours", label: this.$t("hours") },
        { key: "actions", label: this.$t("actions") }
      ],
      tabrowtablesworkhour: {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        ondate: "",
        days: 0,
        hours: 0,
        Status: 1
      }
    };
  },
  created() {
    var self = this;
    self.selectedrowid = self.$route.params.id;
    HelperService.GetLanguageList().then(res => {
      self.languagelist = res.data;
    });
    HelperService.GetStateList().then(res => {
      self.statelist = res.data;
    });
    WorkScheduleService.Get(self.selectedrowid).then(res => {
      self.WorkSchedule = res.data;
    });
  },
  methods: {
    check() {
      var self = this;

      if (
        self.WorkSchedule.code === 0 ||
        self.WorkSchedule.code === null ||
        self.WorkSchedule.code === undefined ||
        self.WorkSchedule.code === ""
      ) {
        this.makeToast(this.$t("codeNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.WorkSchedule.shortname === 0 ||
        self.WorkSchedule.shortname === null ||
        self.WorkSchedule.shortname === undefined ||
        self.WorkSchedule.shortname === ""
      ) {
        this.makeToast(
          this.$t("shortnametNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.WorkSchedule.fullname === 0 ||
        self.WorkSchedule.fullname === null ||
        self.WorkSchedule.fullname === undefined ||
        self.WorkSchedule.fullname === ""
      ) {
        this.makeToast(
          this.$t("fullnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.WorkSchedule.stateid === 0 ||
        self.WorkSchedule.stateid === null ||
        self.WorkSchedule.stateid === undefined ||
        self.WorkSchedule.stateid === ""
      ) {
        this.makeToast(this.$t("StateNotSelected"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      WorkScheduleService.Update(self.WorkSchedule)
        .then(res => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "WorkSchedule" });
        })
        .catch(error => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    Addtablesdayhour() {
      var self = this;
      self.WorkSchedule.TablesDayHour.push(self.tabrowtablesdayhour);
      self.tabrowtablesdayhour = {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        isdayoff: 0,
        begintime: 0,
        endtime: 0,
        Status: 1
      };
    },
    Addtablesworkhour() {
      var self = this;
      self.WorkSchedule.TablesWorkHour.push(self.tabrowtablesworkhour);
      tabrowtablesworkhour = {
        id: 0,
        ownerid: 0,
        daynumber: 0,
        ondate: "",
        days: 0,
        hours: 0,
        Status: 1
      };
    },
    EditRow(item) {
      item.Status = 2;
    },
    DeleteRow(item) {
      item.Status = 3;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    translate(selectcolumnname) {
      var self = this;
      self.translatebyname = selectcolumnname;
      self.translatelist = self.WorkSchedule.Translates.filter(
        item => item.columnname == selectcolumnname
      );
      self.translatemodal = true;
    },
    addtranslite() {
      var self = this;
      if (
        self.translaterow.languageid === 0 ||
        self.translaterow.languageid === undefined ||
        self.translaterow.languageid === null
      ) {
        alert("languageidNotSelect");
      } else if (
        self.translaterow.translatetext === "" ||
        self.translaterow.translatetext === undefined ||
        self.translaterow.translatetext === null
      ) {
        alert("translatetextNotSelect");
      } else {
        var dublikate = false;
        self.translatelist.forEach(item => {
          if (item.languageid === self.translaterow.languageid) {
            alert("dublikate");
            dublikate = true;
          }
        });
        if (!dublikate) {
          self.translaterow.languagename = self.languagelist.filter(function(
            item
          ) {
            if (item.id === self.translaterow.languageid) return item;
          })[0].name;
          self.translaterow.columnname = self.translatebyname;
          self.translatelist.push(self.translaterow);
          self.translaterow = {
            tableid: 0,
            tablerowid: 0,
            languageid: 0,
            languagename: "",
            columnname: "",
            translatetext: ""
          };
        }
      }
    },
    SaveTranslate() {
      var self = this;
      self.WorkSchedule.Translates = self.WorkSchedule.Translates.filter(
        x => x.columnname !== self.translatebyname
      );
      self.translatelist.forEach(item => {
        self.WorkSchedule.Translates.push(item);
      });
      self.translatemodal = false;
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    }
  }
};
</script>

<style>
</style>
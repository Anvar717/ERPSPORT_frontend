<template>
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("QualCategoryTrainingType") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <CRow>
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="code"
                    rules="required|max:9"
                  >
                    <CInput
                      type="number"
                      :placeholder="$t('code1')"
                      autocomplete="code"
                      horizontal
                      :label="$t('code')"
                      v-model="QualCategoryTrainingType.code"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </CCol>
  
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    name="code"
                    rules="required|min:1"
                  >
                    <CInput
                      :placeholder="$t('shortname')"
                      autocomplete="shortname"
                      horizontal
                      :label="$t('shortname')"
                      v-model="QualCategoryTrainingType.shortname"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
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
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </CCol>
                <CCol>
                  <ValidationProvider
                    v-slot="v"
                    rules="required|min:1"
                  >
                    <CInput
                      :placeholder="$t('fullname')"
                      autocomplete="fullname"
                      horizontal
                      :label="$t('fullname')"
                      v-model="QualCategoryTrainingType.fullname"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
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
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </ValidationProvider>
                </CCol>
              </CRow>
                <CRow>
                  <CCol>
                    <ValidationProvider
                    v-slot="v"
                      name="detailinfo"
                      rules="required|min:1"
                    >
                      <CInput
                        :placeholder="$t('detailinfo')"
                        autocomplete="detailinfo"
                        horizontal
                        :label="$t('detailinfo')"
                        v-model="QualCategoryTrainingType.detailinfo"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
                  <CCol>
              <ValidationProvider>
                <div class="form-group form-row">
                  <label  class="col-form-label col-sm-3">{{
                    $t("qualcategorytypeid")
                  }}</label>
                  <v-select 
                    class="col-sm-9"
                    :options="QualCategoryTypeList  "
                    v-model="QualCategoryTrainingType.qualcategorytypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </ValidationProvider>
              </CCol>
                <CCol>
                <ValidationProvider>
                  <div class="form-group form-row">
                    <label  class="col-form-label col-sm-3">{{
                      $t("Status")
                    }}</label>
                    <v-select 
                      class="col-sm-9"
                      :options="statelist"
                      v-model="QualCategoryTrainingType.stateid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                    ></v-select>
                  </div>
                </ValidationProvider>
                </CCol>
              </CRow>
              </ValidationObserver>
            </CCardBody>
            <b-modal id="AddModal" size="lg" no-close-on-backdrop>
              <template v-slot:modal-title>{{
                $t("QualCategoryTrainingType")
              }}</template> 
               <b-row>
                   <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="courseduration"
                      rules="required|min:1"
                    >
                      <CInput
                        :placeholder="$t('courseduration')"
                        autocomplete="courseduration"
                        horizontal
                        :label="$t('courseduration')"
                        v-model="tabrow.courseduration"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
               </b-row>
               <b-row>
                   <CCol>
                    <ValidationProvider
                      v-slot="v"
                      name="academichours"
                      rules="required|min:1"
                    >
                      <CInput
                        :placeholder="$t('academichours')"
                        autocomplete="academichours"
                        horizontal
                        type="number"
                        :label="$t('academichours')"
                        v-model="tabrow.academichours"
                        :addInputClasses="{
                          'is-invalid': v.classes.invalid,
                          'is-valid': v.classes.valid,
                        }"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </CInput>
                    </ValidationProvider>
                  </CCol>
               </b-row>
               
  
              <template v-slot:modal-footer>
                <div class="text-center mx-auto">
                  <CButton size="sm" color="danger" class="mr-2" @click="Close">
                    <b-icon icon="arrow-left-short"></b-icon>
                    {{ $t("back") }}
                  </CButton>
                  <CButton size="sm" color="primary" @click="AddItem">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Save") }}
                  </CButton>
                </div>
              </template>
            </b-modal>
            <c-row>
              <c-col class="text-right mr-3 mb-3">
                <c-button size="sm" color="primary" @click="OpenModal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </c-button>
              </c-col>
            </c-row>
            <CRow>
              <CCol>
                <b-table
                  :fields="Fields"
                  :items="QualCategoryTrainingType.qualcategorytrainingtypetable"
                  class="bg-color-table text-center mx-3"
                  style="vertical-align: middle"
                  bordered
                  responsive="sm"
                  :tbody-tr-class="rowClass"
                >
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
                </b-table>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <div class="text-left">
                  <CButton class="ml-4" size="sm" color="danger" @click="Back()">
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
          </CCard>
          <b-modal
            id="modalXl"
            no-close-on-backdrop
            size="xl"
            :title="$t('membership')"
            hide-footer
            modal-class="custom-size-modal"
          >
            <Member-Component
              :isview="false"
              @SelectedItem="SelectedEmployeeItem"
              @DblClick="AddEmployeeData"
            ></Member-Component>
    
            <c-row class="mt-2">
              <c-col class="text-center">
                <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                  {{ $t("back") }}
                </b-button>
                <b-button variant="primary" @click="AddEmployeeData(personvalue)">
                  {{ $t("Add") }}
                </b-button>
              </c-col>
            </c-row>
          </b-modal>
        </CCol>
        <!-- translate modal -->
        <CRow>
          <CModal
            :title="$t('translate')"
            :show.sync="TranslateModal"
            size="lg"
            :closeOnBackdrop="false"
          >
            <b-table
              :fields="LanguageFields"
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
                      @click="AddItemModal"
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
        </CRow>
      </CRow>
    </template>
    <script>
  import SchoolYearService from "@/services/SchoolYear.service";
  import HelperService from "@/services/helper.service";
    import QualCategoryTrainingTypeService from "@/services/QualCategoryTrainingType.service";
    import EmployeeListComponent from "@/components/EmployeeList";
    import SportTypeDivisionService from "@/services/SportTypeDivision.service";
    import SchoolGradeLetterService from "@/services/SchoolGradeLetter.service";
    import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
    import MemberShipTypeService from "@/services/MemberShipType.service";
    import PersonMemberService from "@/services/PersonMember.service";
    import MemberComponent from "@/components/MemberList";
    import PersonComponent from "@/components/PersonMember";
    export default {
      components: { EmployeeListComponent, MemberComponent, PersonComponent },
      data() {
        return {
          SaveLoading: false,
          QualCategoryTrainingType: {
            code: "",
            shortname: "",
            fullname: "",
            Translates: [],
          },
          OrganizationLoading: false,
          RegionLoading: false,
            RegionList: [],
            QualCategoryTypeList:[],
          personvalue1: {},
          OblastList: [],
          lang: "",

          TranslateModal: false,
          Translate: {
            languageid: "",
            translatetext: "",
          },
          TranslatebyName: "shortname",
          statelist: [],
          items1: [],
          items2: [],
          items: [],
          Fields: [
            {
              key: "courseduration",
              tdClass: "text-left",
              thClass: "text-center",
              label: this.$t("courseduration"),
            },
            {
              key: "academichours",
              tdClass: "text-left",
              thClass: "text-center",
              label: this.$t("academichours"),
              },
            {
              key: "actions",
              tdClass: "text-center",
              thClass: "text-center",
              label: this.$t("actions"),
            },
          ],
          LanguageList: [],
          LanguageFields: [
            { key: "languagename", label: this.$t("languagename") },
            { key: "translatetext", label: this.$t("translateModal.name") },
            { key: "actions", label: "" },
          ],
          tabrow: {
            id: 0,
            ownerid: 0,
            courseduration: 0,
            academichours: 0,
            Status: 1,
          },
          editedIndex: -1,
          isDisabled: false,
        };
      },
      created() {
        var self = this;
        this.lang = localStorage.getItem("locale") || "ru";
        self.selectedrowid = self.$route.params.id;

        QualCategoryTrainingTypeService.Get(self.selectedrowid).then((res) => {
          self.QualCategoryTrainingType = res.data;
          this.items1 =
            res.data.Translates.filter((item) => item.columnname == "shortname") ||
            [];
          this.items2 =
            res.data.Translates.filter((item) => item.columnname == "fullname") ||
            [];
          SchoolYearService.GetAll().then((res) => {
            self.SchoolYear = res.data;
            
          });

        });
        HelperService.GetStateList().then((res) => {
          this.statelist = res.data;
        });
        HelperService.GetQualCategoryTypeList().then((res) => {
          this.QualCategoryTypeList = res.data;
        });
        HelperService.GetLanguageList().then((res) => {
          this.LanguageList = res.data;
        });
  
      },
      methods: {

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
        AddItemModal() {
          if (this.TranslatebyName == "shortname") {
            this.ItemsPush();
            this.QualCategoryTrainingTypeTranslatePush();
            this.items1 = this.items;
          } else {
            this.ItemsPush();
            this.QualCategoryTrainingTypeTranslatePush();
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
        QualCategoryTrainingTypeTranslatePush() {
          this.QualCategoryTrainingType.Translates.push({
            languageid: this.Translate.languageid,
            languagename: this.LanguageList.filter(
              (item) => item.id == this.Translate.languageid
            )[0].name,
            translatetext: this.Translate.translatetext,
            columnname: this.TranslatebyName,
          });
        },
   
        setAllErrors(errors) {
          this.allSignupErrors = errors;
        },
        rowClass(item, type) {
          if (item.Status === 3) {
            return "d-none";
          }
        },
        OpenOrgModal() {
          this.$bvModal.show("modalXl");
        },
        ClosePersonModal() {
          this.$bvModal.hide("modalXl");
        },
        SelectedEmployeeItem(data) {
          this.personvalue = data;
        },
        AddEmployeeData(data) {
          var self = this;
          self.tabrow.membershipid = data.id;
          self.tabrow.membershipname = data.membershiptypename;
          self.ClosePersonModal();
        },
        Back() {
          this.$router.push({
            name: "QualCategoryTrainingType",
            query: {
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
            },
          });
        },
        makeToast(message, title, type) {
          var self = this;
          self.toastCount++;
          self.$bvToast.toast(message, {
            title: title,
            autoHideDelay: 2000,
            variant: type,
            solid: true,
          });
        },
        Add() {
            var self = this;
              self.tabrow;
            if (
            self.tabrow.courseduration === "" ||
            self.tabrow.courseduration === undefined ||
            self.tabrow.courseduration === null ||
            self.tabrow.courseduration === 0
          ) {
            self.makeToast(
              self.$t("coursedurationNotCorrect"),
              self.$t("Error"),
              "danger"
            );
            return false;
          }
            if (
            self.tabrow.academichours === "" ||
            self.tabrow.academichours === undefined ||
            self.tabrow.academichours === null ||
            self.tabrow.academichours === 0
          ) {
            self.makeToast(
              self.$t("academichoursNotCorrect"),
              self.$t("Error"),
              "danger"
            );
            return false;
          }

          self.QualCategoryTrainingType.qualcategorytrainingtypetable.push(self.tabrow);
          self.tabrow = {
            id: 0,
            ownerid: 0,
            academichours: 0,
            courseduration: 0,
            Status: 1,
          };
          self.isDisabled = true;
          self.$bvModal.hide("AddModal");
        },
        OpenModal() {
          var self = this;
          if (!self.checkData()) {
            return false;
          }
          self.$bvModal.show("AddModal");
        },
    
        EditItem(item) {
          item.Status = 2;
          this.editedIndex = this.QualCategoryTrainingType.qualcategorytrainingtypetable.indexOf(item);
          this.tabrow = Object.assign({}, item);
          this.$bvModal.show("AddModal");
        },
      
        DeleteItem(item) {
            item;
            item.Status = 3;
        },
        AddItem() {
          if (this.editedIndex > -1) {
            Object.assign(
              this.QualCategoryTrainingType.qualcategorytrainingtypetable[this.editedIndex],
              this.tabrow
            );
            this.Close();
          } else {
            this.Add();
          }
        },
        Close() {
          this.$bvModal.hide("AddModal");
          this.$nextTick(() => {
            this.tabrow = {
              id: 0,
              ownerid: 0,
              academichours: 0,
              courseduration: 0,
              Status: 1,
            };
            this.editedIndex = -1;
          });
        },
    
        check() {
          var self = this;
          if (
            self.QualCategoryTrainingType.code === 0 ||
            self.QualCategoryTrainingType.code === null ||
            self.QualCategoryTrainingType.code === undefined ||
            self.QualCategoryTrainingType.code === ""
          ) {
            this.makeToast(
              this.$t("codeNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
         
          if (self.QualCategoryTrainingType.qualcategorytrainingtypetable.length === 0) {
            this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
            return false;
          }
    
          return true;
        },
        checkData() {
          var self = this;
          
          if (
            self.QualCategoryTrainingType.shortname === 0 ||
            self.QualCategoryTrainingType.shortname === null ||
            self.QualCategoryTrainingType.shortname === undefined ||
            self.QualCategoryTrainingType.shortname === ""
          ) {
            this.makeToast(
              this.$t("shortnameNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
          if (
            self.QualCategoryTrainingType.fullname === 0 ||
            self.QualCategoryTrainingType.fullname === null ||
            self.QualCategoryTrainingType.fullname === undefined ||
            self.QualCategoryTrainingType.fullname === ""
          ) {
            this.makeToast(
              this.$t("fullnameNotCorrect"),
              this.$t("Error"),
              "danger"
            );
            return false;
          }
          
          
          return true;
        },
        SaveData() {
          var self = this;
          if (!self.check()) {
            return false;
          }
          QualCategoryTrainingTypeService.Update(self.QualCategoryTrainingType)
            .then((res) => {
              self.makeToast(
                self.$t("SuccessMessage"),
                self.$t("message"),
                "success"
              );
              self.$router.push({
                name: "QualCategoryTrainingType",
                query: {
                  Search: this.$route.query.Search,
                  SortColumn: this.$route.query.SortColumn,
                  OrderType: this.$route.query.OrderType,
                  PageNumber: this.$route.query.PageNumber,
                  PageLimit: this.$route.query.PageLimit,
                },
              });
            })
            .catch((error) => {
              self.makeToast(
                error.response.data.error,
                self.$t("message"),
                "danger"
              );
            });
        },
  
      },
    }
  </script>
    
    <style>
  </style>
    
    
    
    
    
    
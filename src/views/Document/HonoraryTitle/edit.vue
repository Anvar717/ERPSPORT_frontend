<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{$t('HonoraryTitle')}}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{setAllErrors(errors.errors)}}
            <CRow>
              <CCol>
                <ValidationProvider v-slot="v" name="docnumber" rules="required|max:9">
                  <CInput
                    disabled
                    :placeholder="$t('docnumber')"
                    autocomplete="docnumber"
                    horizontal
                    :label="$t('docnumber')"
                    v-model="HonoraryTitle.docnumber"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
              <CCol>
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label
                      for="datepicker-dateformat2"
                      class="col-form-label col-sm-3"
                    >{{$t('docdate')}}</label>
                    <div class="col-sm-9">
                      <!-- <custom-date-input />  -->
                      <date-picker
                        v-model="HonoraryTitle.docdate"
                        style="width:100%"
                        size="sm"
                        lang="ru"
                        :placeholder="$t('docdate')"
                        value-type="format"
                        format="DD.MM.YYYY"
                      >
                        <template slot="invalid-feedback">
                          <div class="invalid-feedback">{{ v.errors[0] }}</div>
                        </template>
                      </date-picker>
                    </div>
                  </div>
                </ValidationProvider>
              </CCol>

              <CCol>
                <ValidationProvider v-slot="v" name="detailinfo" rules="required">
                  <CInput
                    :placeholder="$t('detailinfo')"
                    autocomplete="detailinfo"
                    horizontal
                    :label="$t('detailinfo')"
                    v-model="HonoraryTitle.detailinfo"
                    :addInputClasses="{'is-invalid': v.classes.invalid,'is-valid':  v.classes.valid }"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </CInput>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="$bvModal.show('AddModal')">
              <b-icon icon="plus"></b-icon>
              {{$t('Add')}}
            </c-button>
          </c-col>
        </c-row>
        <b-modal id="AddModal" size="xl" no-close-on-backdrop>
          <template v-slot:modal-title>{{$t('HonoraryTitle')}}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{
                  $t("person")
                  }}
                </label>
                <div class="col-sm-9 d-flex">
                  <c-input style="width:100%" disabled v-model="Tables1.personname">
                    <template #append>
                      <CButton @click="OpenPersonModal" size="sm" type="button" color="primary">
                        <b-icon icon="three-dots"></b-icon>
                      </CButton>
                    </template>
                  </c-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('honorarytitletypename')}}</label>
                <v-select
                  :options="honorarytitletypelist"
                  :reduce="item => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="Tables1.honorarytitletypeid"
                  class="col-sm-9"
                ></v-select>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput
                horizontal
                class="mb-0"
                :label="$t('documentseries')"
                v-model="Tables1.documentseries"
              ></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <CInput
                horizontal
                class="mb-0"
                :label="$t('documentnumber')"
                v-model="Tables1.documentnumber"
              ></CInput>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('startdate')}}</label>
                <date-picker
                  v-model="Tables1.startdate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('startdate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-9"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{$t('enddate')}}</label>
                <date-picker
                  v-model="Tables1.enddate"
                  style="width:100%"
                  size="sm"
                  lang="ru"
                  :placeholder="$t('enddate')"
                  value-type="format"
                  format="DD.MM.YYYY"
                  class="col-sm-9"
                ></date-picker>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <CInput
                horizontal
                class="mb-0"
                :label="$t('detailinfo')"
                v-model="Tables1.detailinfo"
              ></CInput>
            </b-col>
          </b-row>
          <template v-slot:modal-footer>
            <div class="text-center mx-auto">
              <CButton size="sm" color="danger" class="mr-2" @click="Close">
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
              <CButton size="sm" color="primary" @click="Add">
                <b-icon icon="check2"></b-icon>
                {{$t('Save')}}
              </CButton>
            </div>
          </template>
        </b-modal>
        <CRow>
          <CCol>
            <b-table
              :fields="fieldsMainTable"
              :items="itemsMainTable"
              class="bg-color-table text-center mx-3"
              style="vertical-align:middle"
              bordered
              responsive="sm"
              :tbody-tr-class="rowClass"
            >
              <template
                v-slot:cell(honorarytitletypename)="{item}"
              >{{honorarytitletypelist.filter(el => el.id === item.honorarytitletypeid)[0].name}}</template>
              <template #cell(actions)="{item}">
                <div class="text-center">
                  <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{content: $t('Edit') }">
                    <b-icon icon="pencil" ></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{content: $t('Delete') }"
                    @click="DeleteItem(item)"
                  >
                    <b-icon icon="trash" ></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({name : 'HonoraryTitle'})"
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
          <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop>
            <header class="modal-header">
              <h5 class="modal-title">{{$t('Employee')}}</h5>
              <button
                type="button"
                aria-label="Close"
                class="close"
                @click="showModal('createModal',false)"
              >×</button>
            </header>
            <div class="modal-body">
              <edit-person-component
                :show-back-button="false"
                :person-type-id="2"
                @success="studentCreated($event)"
              ></edit-person-component>
            </div>
          </b-modal>
        </CRow>
      </CCard>
      <b-modal id="PersonModal" no-close-on-backdrop size="xl" :title="$t('Person')" hide-footer modal-class="custom-size-modal">
        <person-list  persontypeid="0"  @SelectedItem="SelectedItem(personvalue)" @DblClick="AddPersonData"></person-list>    

          <c-row class="mt-2">
              <c-col class="text-center">
                  <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                      {{$t('back')}}
                  </b-button>
                  <b-button variant="primary" @click="AddEmployeePersonData(personvalue)">
                      {{$t('Add')}}
                  </b-button>
              </c-col>
          </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import HonoraryTitleTypeService from "@/services/HonoraryTitleType.service";
import HonoraryTitleService from "@/services/HonoraryTitle.service";
import PersonService from "@/services/person.service";
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import PersonList from '@/components/PersonList'
export default {
  components: { editPersonComponent, PersonList },
  data() {
    return {
      SaveLoading: false,
      createModal : false,
      HonoraryTitle: {
        docdate: "",
        docnumber: "",
        detailinfo: "",
        Tables1: [],
      },
      editedIndex: -1,
      honorarytitletypelist: [],
      lang: "",
      fieldsMainTable: [
        { key: "personname", label: this.$t("Employee") },
        {
          key: "honorarytitletypename",
          label: this.$t("honorarytitletypename"),
        },
        { key: "documentseries", label: this.$t("documentseries") },
        { key: "documentnumber", label: this.$t("documentnumber") },
        { key: "startdate", label: this.$t("startdate") },
        { key: "enddate", label: this.$t("enddate") },
        { key: "detailinfo", label: this.$t("detailinfo") },
        { key: "actions", label: this.$t("actions") },
      ],
      itemsMainTable: [],
      Tables1: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        honorarytitletypeid: 0,
        honorarytitletypename: "",
        documentseries: "",
        documentnumber: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        Status: 1,
      },
      personloading: false,
      innofPerson: "",
      personvalue : {}
    };
  },
  created() {
    HonoraryTitleTypeService.GetAll().then((res) => {
      this.honorarytitletypelist = res.data;
    });

    HonoraryTitleService.Get(this.$route.params.id).then((res) => {
      this.HonoraryTitle = res.data;
      this.itemsMainTable = res.data.Tables1;
    });
  },
  computed: {},
  methods: {
    studentCreated(data) {
      (data);
      this.showModal("createModal", false);
    },
    AddPersonData(data){
      var self = this
      self.Tables1.personid = data.id
      self.Tables1.personname = data.fullname
      self.ClosePersonModal()
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    SelectedItem(value,data){
        value = data
    },
    OpenPersonModal(){
      this.$bvModal.show('PersonModal')
    }, 
    ClosePersonModal(){
      this.$bvModal.hide("PersonModal")
    }, 
    AddPerson (){
      this.showModal("createModal", true);
    },
    FindPersonByInn() {
      if (!!this.innofPerson) {
        this.personloading = true;
        PersonService.GetByInnORPinfl(
          "",
          2,
          "",
          "",
          this.innofPerson.length === 9 ? this.innofPerson : "",
          this.innofPerson.length === 14 ? this.innofPerson : "",
          "",
          ""
        )
          .then((res) => {
            this.Tables1.personid = res.data.id;
            this.Tables1.personname = res.data.fullname
            this.personloading = false;
          })
          .catch((error) => {
            this.Tables1.personname = ""
            this.makeToast(
              error.response.data.error,
              this.$t("message"),
              "danger"
            );
          });
      } else {
        this.tabrow.personid = null;
      }
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
    Close() {
      this.$bvModal.hide("AddModal");
      this.$nextTick(() => {
        this.Tables1 = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          honorarytitletypeid: 0,
          honorarytitletypename: "",
          documentseries: "",
          documentnumber: "",
          startdate: "",
          enddate: "",
          detailinfo: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },

    Add() {
      if (
        this.Tables1.personid === 0 ||
        this.Tables1.personid === null ||
        this.Tables1.personid === undefined ||
        this.Tables1.personid === ""
      ) {
        this.makeToast(
          this.$t("employeeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.honorarytitletypeid === 0 ||
        this.Tables1.honorarytitletypeid === null ||
        this.Tables1.honorarytitletypeid === undefined ||
        this.Tables1.honorarytitletypeid === ""
      ) {
        this.makeToast(
          this.$t("honorarytitletypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.documentseries === 0 ||
        this.Tables1.documentseries === null ||
        this.Tables1.documentseries === undefined ||
        this.Tables1.documentseries === ""
      ) {
        this.makeToast(
          this.$t("documentseriesNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.documentnumber === 0 ||
        this.Tables1.documentnumber === null ||
        this.Tables1.documentnumber === undefined ||
        this.Tables1.documentnumber === ""
      ) {
        this.makeToast(
          this.$t("documentnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        this.Tables1.startdate === 0 ||
        this.Tables1.startdate === null ||
        this.Tables1.startdate === undefined ||
        this.Tables1.startdate === ""
      ) {
        this.makeToast(
          this.$t("startdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      this.Tables1.honorarytitletypename = this.Tables1.honorarytitletypeid
        ? this.honorarytitletypelist.filter(
            (item) => item.id === this.Tables1.honorarytitletypeid
          )[0].name
        : "";
      if (this.editedIndex > -1) {
        Object.assign(this.itemsMainTable[this.editedIndex], this.Tables1);
      } else {
        this.itemsMainTable.push(this.Tables1);
      }

      this.Tables1 = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        honorarytitletypeid: 0,
        honorarytitletypename: "",
        documentseries: "",
        documentnumber: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        Status: 1,
      };
      this.editedIndex = -1;
      this.$bvModal.hide("AddModal");
    },
    EditItem(item) {
      if (item.Status == 0) item.Status = 2;
      this.editedIndex = this.itemsMainTable.indexOf(item);
      this.Tables1 = Object.assign({}, item);
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    check() {
      var self = this;
      if (
        self.HonoraryTitle.docnumber === 0 ||
        self.HonoraryTitle.docnumber === null ||
        self.HonoraryTitle.docnumber === undefined ||
        self.HonoraryTitle.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HonoraryTitle.docdate === 0 ||
        self.HonoraryTitle.docdate === null ||
        self.HonoraryTitle.docdate === undefined ||
        self.HonoraryTitle.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.HonoraryTitle.detailinfo === null ||
        self.HonoraryTitle.detailinfo === undefined ||
        self.HonoraryTitle.detailinfo === ""
      ) {
        this.makeToast(
          this.$t("detailinfoNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (self.HonoraryTitle.Tables1.length === 0) {
        this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
        return false;
      }

      return true;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      this.CheckItemDelete();
      this.HonoraryTitle.Tables1 = this.itemsMainTable;
      HonoraryTitleService.Update(this.HonoraryTitle)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push({ name: "HonoraryTitle" });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    CheckItemDelete() {
      for (let i = 0; i < this.itemsMainTable.length; i++) {
        if (
          (this.itemsMainTable[i].Status == 3 &&
            this.itemsMainTable[i].personid == "") ||
          this.itemsMainTable[i].schoolsubjectid == ""
        ) {
          this.itemsMainTable.splice(i, 1);
        }
      }
    },
  },
};
</script>

<style>
</style>






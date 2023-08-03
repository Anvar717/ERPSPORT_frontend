<template>
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("MissedDays") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <CRow>
                <CCol lg="4" sm="12" md="4">
                  <ValidationProvider
                    v-slot="v"
                    name="docnumber"
                    rules="required|max:9"
                  >
                  <div class="form-group">
                    <label
                        for="docnumber"
                        class="col-form-label col-sm-3 col-lg-8"
                        >{{ $t("docnumber") }}</label
                      >
                      <div class="">
                        <CInput
                          :placeholder="$t('docnumber')"
                          autocomplete="docnumber"
                          disabled
                          style="width: 100%;"
                          v-model="MissedDays.docnumber"
                          :addInputClasses="{
                            'is-invalid': v.classes.invalid,
                            'is-valid': v.classes.valid,
                          }"
                        >
                          <template slot="invalid-feedback">
                            <div class="invalid-feedback">{{ v.errors[0] }}</div>
                          </template>
                        </CInput>
                      </div>
                    </div>
                  </ValidationProvider>
                </CCol >
                <CCol lg="4" sm="12" md="4">
                  <ValidationProvider
                    v-slot="v"
                    name="startdate"
                    rules="required"
                  >
                    <div class="form-group">
                      <label
                        for="datepicker-dateformat2"
                        class="col-form-label col-sm-3 col-lg-8"
                        >{{ $t("docdate") }}</label
                      >
                      <div class="p-0">
                        <!-- <custom-date-input />  -->
                        <date-picker
                          v-model="MissedDays.docdate"
                          style="width: 100%"
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
                <CCol lg="4" sm="12" md="4">
                  <div class="form-group">
                    <label class="col-form-label col-sm-3 col-lg-8">{{
                      $t("membership")
                    }}</label>
                    <div class="d-flex">
                      <CInput
                        class="mb-0"
                        style="width: 100%"
                        disabled
                        :placeholder="$t('membership')"
                        v-model="MissedDays.membershiptablename"
                      ></CInput>
                      <b-button
                        size="sm"
                        variant="primary"
                        @click="OpenPersonMemberShipModal"
                      >
                        <b-icon icon="three-dots"></b-icon>
                      </b-button>
                    </div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="4" lg="4">
                  <div class="form-group">
                    <label class="col-form-label col-sm-3 col-lg-8">{{
                      $t("personmember")
                    }}</label>
                    <div class="d-flex">
                      <CInput
                        class="mb-0"
                        style="width: 100%"
                        disabled
                        :placeholder="$t('personmember')"
                        v-model="MissedDays.personmembername"
                      ></CInput>
                    </div>
                  </div>
                </CCol>
                <CCol sm="12" md="4" lg="4">
                  <div class="form-group">
                    <label class="col-form-label col-sm-3 col-lg-8">{{
                      $t("month")
                    }}</label>
                    <b-form-input
                      :placeholder="$t('year')"
                      v-model="MissedDays.Year"
                    >
                    </b-form-input>
                  </div>
                </CCol>
                <CCol sm="12" md="4" lg="4">
                  <label class="col-form-label col-sm-3 col-lg-8">{{
                      $t("MonthList")
                    }}</label>
                  <v-select
                    :options="MonthList"
                    style="width: 100%"
                    class="mb-0"
                    :reduce="(item) => item.id"
                    :placeholder="$t('docmonth')"
                    v-model="MissedDays.Month"
                    label="name"
                  ></v-select>
                </CCol>
              </CRow>
              <CRow class="d-flex align-items-center">
                <CCol sm="12" md="4" lg="4">
                  <ValidationProvider
                    v-slot="v"
                    name="misseddayscount"
                    rules="required|min:1"
                  >
                  <div class="">
                    <label class="col-form-label">{{
                      $t("misseddayscount")
                    }}</label>
                    <CInput
                      :placeholder="$t('misseddayscount')"
                      autocomplete="misseddayscount"
                      v-model="MissedDays.misseddayscount"
                      :addInputClasses="{
                        'is-invalid': v.classes.invalid,
                        'is-valid': v.classes.valid,
                      }"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </CInput>
                  </div>
                  </ValidationProvider>
                </CCol>
              </CRow>
              <CRow class="mt-2 ml-0 mr-0">
                  <b-row>
                    <b-col sm="12" md="8">
                      <!-- <p style="cursor:pointer; color: blue; font-size:20px" @click="$refs.fileManage.$el.click()">
                           {{$t('changeapplication')}}
                     </p> -->
                     <b-form-file
                        ref="fileManage"
                        accept=".jpg, .png, .pdf"
                        hidden
                        plain
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        @change="ChangeFile"
                        style="width: 100%;"
                      ></b-form-file>
                      <b-button
                        variant="primary"
                        @click="$refs.fileManage.$el.click()"
                      >
                        <b-spinner small v-if="fileLoading"></b-spinner>
                        <b-icon v-if="!fileLoading" icon="paperclip"></b-icon>
                        {{ $t("changeapplication") }}({{
                          $t("changedoctorapplication")
                        }})
                      </b-button>
                    </b-col>
                    <b-col sm="12" md="4">
                      <div
                        class="d-flex my-1"
                        v-for="(item, index) in MissedDays.MissedDaysFileTables"
                        :key="index"
                        v-show="item.Status != 3"
                      >
                        <b-button-group size="sm">
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
                          <b-button
                            @click="DeleteFile(item, index)"
                            variant="danger"
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
              </CRow>
              <CRow class="mt-4">
                <CCol>
                  <label for>{{ $t("detail") }}</label>
                  <textarea
                    class="form-control"
                    v-model="MissedDays.detail"
                    rows="5"
                  ></textarea>
                </CCol>
              </CRow>
            </ValidationObserver>
          </CCardBody>
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
        <b-modal
          id="membershiptable"
          no-close-on-backdrop
          size="xl"
          :title="$t('membershiptable')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <Member-Ship-Person-Component
            :isview="false"
            @SelectedItem="SelectedMemberShipItem"
            @DblClick="AddMemberShipData"
          ></Member-Ship-Person-Component>
  
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="CloseMemberShipPersonModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddMemberShipData(personvalue2)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
        <b-modal
          id="modalmember"
          no-close-on-backdrop
          size="xl"
          :title="$t('PersonMember')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <Person-Component
            :isview="false"
            @SelectedItem="SelectedPersonMemberItem"
            @DblClick="AddPersonMemberData"
          ></Person-Component>
  
          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button
                class="mr-2"
                variant="danger"
                @click="ClosePersonMemberModal"
              >
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddPersonMemberData(personvalue1)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCol>
    </CRow>
  </template>
  
  <script>
  import MissedDaysService from "@/services/MissedDays.service";
  import EmployeeListComponent from "@/components/EmployeeList";
  import MemberShipTypeService from "@/services/MemberShipType.service";
  import PersonMemberService from "@/services/PersonMember.service";
  import FileManageService from "@/services/filemanage.service";
  import MemberComponent from "@/components/MemberList";
  import PersonComponent from "@/components/PersonMember";
  import MemberShipPersonComponent from "@/components/MemberShipPerson";
  export default {
    components: {
      EmployeeListComponent,
      MemberComponent,
      PersonComponent,
      MemberShipPersonComponent,
    },
    data() {
      return {
        SaveLoading: false,
        MissedDays: {},
        DeleteLoading: false,
        OrganizationLoading: false,
        DownloadLoading: false,
        RegionLoading: false,
        DownloadLoading1: false,
        fileLoading1: false,
        DeleteLoading1: false,
        RegionList: [],
        OblastList: [],
        FileTables1: [],
        monthdata: {
          month: "",
          year: "",
          day: "01",
          code: "",
        },
        FileTables2: [],
        selectedrowid: 0,
        SchoolYear: [],
        SchoolGradeList: [],
        schoolgradeletterlist: [],
        MinimumValueTypeList: [],
        ServicePocketList: [],
        personvalue: {},
        personvalue1: {},
        personvalue2: {},
        CircleSportTypeList: [],
        MemberShipList: [],
        SportGroupCategoryTypeList: [],
        OrganizationList: [],
        PersonMemberList: [],
        employeelist: [],
        MonthList: [
          { id: 1, code: "01", name: this.$t("Yanvar") },
          { id: 2, code: "02", name: this.$t("Fevral") },
          { id: 3, code: "03", name: this.$t("Mart") },
          { id: 4, code: "04", name: this.$t("Aprel") },
          { id: 5, code: "05", name: this.$t("May") },
          { id: 6, code: "06", name: this.$t("Iyun") },
          { id: 7, code: "07", name: this.$t("Iyul") },
          { id: 8, code: "08", name: this.$t("Avgust") },
          { id: 9, code: "09", name: this.$t("Sentabr") },
          { id: 10, code: "1", name: this.$t("Oktabr") },
          { id: 11, code: "11", name: this.$t("Noyabr") },
          { id: 12, code: "12", name: this.$t("Dekabr") },
          // { id : 4,name : this.$t('inn') }
        ],
        lang: "",
        isDisabled: false,
        fileLoading: false,
      };
    },
    created() {
      var self = this;
      this.lang = localStorage.getItem("locale") || "ru";
      self.selectedrowid = self.$route.params.id;
      MissedDaysService.Get(self.selectedrowid).then((res) => {
        self.MissedDays = res.data;
        // if(self.$route.params.id != 0){
        //   self.FileTables1 = Object.keys(
        //   self.MissedDays.MissedDaysFileTables[0]
        // ).map(function (key) {
        //   return [Number(key), self.MissedDays.MissedDaysFileTables[0][key]];
        // });
        // self.FileTables2 = Object.keys(
        //   self.MissedDays.MissedDaysFileTables[1]
        // ).map(function (key) {
        //   return [Number(key), self.MissedDays.MissedDaysFileTables[1][key]];
        // });
        // }
      });
      MemberShipTypeService.GetAll().then((res) => {
        self.MemberShipList = res.data;
      });
      PersonMemberService.GetAll().then((res) => {
        self.PersonMemberList = res.data;
      });
    },
    methods: {
      ChangeFile(event) {
        var formData = new FormData();
        formData.append("attachfile", event.target.files[0]);
        if (!!event.target.files[0]) {
          if (event.target.files[0].size < 4194304) {
            this.fileLoading = true;
            FileManageService.Attach(formData)
              .then((res) => {
                this.MissedDays.MissedDaysFileTables.push({
                  id: 0,
                  ownerid: 0,
                  attachmentfileid: res.data.id,
                  attachmentfilename: res.data.pfiletext,
                  attachmentfiletype: res.data.pfiletype,
                  Status: 1,
                });
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
        this.DeleteLoading = true;
        if (item.Status == 1) {
          this.MissedDays.MissedDaysFileTables.splice(index, 1);
          this.DeleteLoading = false;
        } else {
          this.MissedDays.MissedDaysFileTables.forEach(function (item) {
            if (el.attachmentfileid == item.attachmentfileid) {
              item.Status = 3;
            }
          });
          this.DeleteLoading = false;
        }
  
        // }).catch(error => {
        //     this.DeleteFileLoading = ""
        //     this.makeToast(error.response.data.error,this.$t('error'),'danger')
        // })
      },
      DownloadFile(item) {
        this.DownloadLoading = item.attachmentfileid;
        FileManageService.Get(item.attachmentfileid)
          .then((res) => {
            this.DownloadLoading = "";
            this.forceFileDownload(res, item.attachmentfilename);
            console.log(item.attachmentfilename);
          })
          .catch((error) => {
            this.DownloadLoading = "";
            this.makeToast(error.response.data.error, this.$t("error"), "danger");
          });
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
      ChangePersonMember() {
        this.MissedDays.personmembername = this.PersonMemberList.filter(
          (item) => this.MissedDays.personmemberid === item.id
        )[0].name;
      },
      // ChangeMonth(){
      //  this.MissedDays.Month = this.MonthList.filter(
      //     (item) => this.MissedDays.Month === item.id
      //   )[0].code;
      // },
      ChangeMemberShip() {
        this.MissedDays.membershipname = this.MemberShipList.filter(
          (item) => this.MissedDays.membershipid === item.id
        )[0].name;
      },
      OpenOrgModal() {
        this.$bvModal.show("modalXl");
      },
      OpenPersonModal() {
        this.$bvModal.show("modalmember");
      },
      ClosePersonModal() {
        this.$bvModal.hide("modalXl");
      },
      OpenPersonMemberShipModal() {
        this.$bvModal.show("membershiptable");
      },
      CloseMemberShipPersonModal() {
        this.$bvModal.hide("membershiptable");
      },
      ClosePersonMemberModal() {
        this.$bvModal.hide("modalmember");
      },
      setAllErrors(errors) {
        this.allSignupErrors = errors;
      },
      SelectedEmployeeItem(data) {
        this.personvalue = data;
      },
      SelectedPersonMemberItem(data) {
        this.personvalue1 = data;
      },
      SelectedMemberShipItem(data) {
        this.personvalue2 = data;
      },
      AddEmployeeData(data) {
        var self = this;
        self.MissedDays.membershipid = data.id;
        self.MissedDays.membershipname = data.membershiptypename;
        self.ClosePersonModal();
      },
      AddMemberShipData(data) {
        var self = this;
        self.MissedDays.membershiptableid = data.membershiptableid;
        self.MissedDays.membershiptablename = data.membershiptablename;
        self.MissedDays.personmemberid = data.personmemberid;
        self.MissedDays.personmembername = data.personmembername;
        self.MissedDays.membershipid = data.membershipid;
        self.MissedDays.membershipname = data.membershipname;
        self.CloseMemberShipPersonModal();
      },
      AddPersonMemberData(data) {
        var self = this;
        self.MissedDays.personmemberid = data.id;
        self.MissedDays.personmembername = data.fullname;
        self.ClosePersonMemberModal();
      },
      rowClass(item, type) {
        if (item.Status === 3) {
          return "d-none";
        }
      },
      Back() {
        this.$router.push({
          name: "MissedDays",
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
      check() {
        var self = this;
        if (
          self.MissedDays.docnumber === 0 ||
          self.MissedDays.docnumber === null ||
          self.MissedDays.docnumber === undefined ||
          self.MissedDays.docnumber === ""
        ) {
          this.makeToast(
            this.$t("docnumberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.MissedDays.docdate === 0 ||
          self.MissedDays.docdate === null ||
          self.MissedDays.docdate === undefined ||
          self.MissedDays.docdate === ""
        ) {
          this.makeToast(
            this.$t("docdateNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.MissedDays.membershipid === 0 ||
          self.MissedDays.membershipid === null ||
          self.MissedDays.membershipid === undefined ||
          self.MissedDays.membershipid === ""
        ) {
          this.makeToast(
            this.$t("membershiptypeNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.MissedDays.personmemberid === 0 ||
          self.MissedDays.personmemberid === null ||
          self.MissedDays.personmemberid === undefined ||
          self.MissedDays.personmemberid === ""
        ) {
          this.makeToast(
            this.$t("personmemberNotCorrect"),
            this.$t("Error"),
            "danger"
          );
          return false;
        }
        if (
          self.MissedDays.Month === 0 ||
          self.MissedDays.Month === null ||
          self.MissedDays.Month === undefined ||
          self.MissedDays.Month === ""
        ) {
          this.makeToast(this.$t("monthNotCorrect"), this.$t("Error"), "danger");
          return false;
        }
        if (
          self.MissedDays.Year === 0 ||
          self.MissedDays.Year === null ||
          self.MissedDays.Year === undefined ||
          self.MissedDays.Year === ""
        ) {
          this.makeToast(this.$t("YearNotCorrect"), this.$t("Error"), "danger");
          return false;
        }
        if (
          self.MissedDays.detail === null ||
          self.MissedDays.detail === undefined ||
          self.MissedDays.detail === ""
        ) {
          this.makeToast(
            this.$t("detailinfoNotCorrect"),
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
        MissedDaysService.Update(self.MissedDays)
          .then((res) => {
            self.makeToast(
              self.$t("SuccessMessage"),
              self.$t("message"),
              "success"
            );
            self.$router.push({
              name: "MissedDays",
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
  };
  </script>
  
  <style>
  </style>
  
  
  
  
  
  
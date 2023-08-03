<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("MemberShip") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="docnumber"
                  rules="required"
                >
                  <label>{{ $t("docnumber") }}</label>
                  <CInput
                    autocomplete="text"
                    disabled
                    v-model="MemberShip.docnumber"
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
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider v-slot="v" name="docdate" rules="required">
                  <div class="form-group form-row">
                    <label>{{ $t("docdate") }}</label>
                    <!-- <custom-date-input />  -->
                    <date-picker
                      v-model="MemberShip.docdate"
                      style="width: 100%"
                      size="sm"
                      lang="ru"
                      :placeholder="$t('docdate')"
                      value-type="format"
                      format="DD.MM.YYYY"
                      class="fname-select"
                    >
                      <template slot="invalid-feedback">
                        <div class="invalid-feedback">{{ v.errors[0] }}</div>
                      </template>
                    </date-picker>
                  </div>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="servicepocket"
                  rules="required"
                >
                  <label for>{{ $t("servicepocket") }}</label>
                  <v-select
                    :options="ServicePocketList"
                    v-model="MemberShip.servicepocketid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="sporttypeclassifier"
                  rules="required"
                >
                  <label for>{{ $t("sporttypeclassifier") }}</label>
                  <v-select
                    :options="sporttypeclassifierlist"
                    v-model="MemberShip.sporttypeclassifierid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="membershiptype"
                  rules="required"
                >
                  <label for>{{ $t("membershiptype") }} </label>
                  <v-select
                    :options="MemberShipTypeList"
                    v-model="MemberShip.membershiptypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
              <CCol sm="12" lg="4" class="achievement-input">
                <ValidationProvider
                  v-slot="v"
                  name="sportgroupcategorytype"
                  rules="required"
                >
                  <label for>{{ $t("sportgroupcategorytype") }} </label>
                  <v-select
                    :options="SportGroupCategoryTypeList"
                    v-model="MemberShip.sportgroupcategorytypeid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    class="fname-select"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </ValidationProvider>
              </CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <b-modal id="AddModal" size="lg" no-close-on-backdrop>
          <template v-slot:modal-title>{{ $t("MemberShip") }}</template>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("personmember")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    class="mb-0 mr-2"
                    style="width: 100%"
                    disabled
                    :placeholder="$t('personmember')"
                    v-model="tabrow.personmembername"
                  ></CInput>
                  <b-button
                    size="sm"
                    variant="primary"
                    @click="OpenPersonMemberModal"
                  >
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("nextmedicalcheckdate")
                }}</label>
                <div class="d-flex col-sm-9">
                  <date-picker
                    v-model="tabrow.nextmedicalcheckdate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('nextmedicalcheckdate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  >
                  </date-picker>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("internalrulesagreed")
                }}</label>
                <b-form-checkbox
                  v-model="tabrow.internalrulesagreed"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("hastaxrelief")
                }}</label>
                <b-form-checkbox
                  v-model="tabrow.isseveralchildren"
                  switch
                  @change="ChangeSumm"
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3" for>{{
                  $t("workwithcoach")
                }}</label>
                <b-form-checkbox
                  v-model="tabrow.iscoachattached"
                  switch
                  @change="ChangeSumm"
                  class="mt-2 ml-1"
                  style="width: 100%"
                ></b-form-checkbox>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="tabrow.iscoachattached">
            <b-col>
              <div class="form-group form-row mb-0">
                <label class="col-form-label col-sm-3">
                  {{ $t("Coach") }}
                </label>
                <div class="col-sm-9 d-flex">
                  <CInput
                    style="width: 100%"
                    disabled
                    v-model="tabrow.personcoachname"
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
                <label class="col-form-label col-sm-3" for>{{
                  $t("privilegereason")
                }}</label>
                <div class="d-flex col-sm-9">
                  <v-select
                    :options="PrivilegereasonList"
                    v-model="tabrow.privilegereasonid"
                    :reduce="(item) => item.id"
                    @input="ChangeSumm"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    style="width: 100%"
                  >
                  </v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("privilegereason")
                  }}</label>
                  <div class="d-flex col-sm-9">
                    <v-select
                      :options="PersoncoachList"
                      v-model="tabrow.personcoachid"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      style="width: 100%"
                    >
                    </v-select>
                  </div>
                </div>
              </b-col>
            </b-row> -->
          <b-row>
            <b-col>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("amount")
                }}</label>
                <div class="d-flex col-sm-9">
                  <CInput
                    style="width: 100%"
                    disabled
                    :placeholder="$t('amount')"
                    v-model="tabrow.amount"
                  ></CInput>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mb-1 mt-4 ml-0">
            <b-col sm="12" md="4" class="p-0">
              <b-form-file
                ref="fileManage"
                accept=".jpg, .png, .pdf"
                hidden
                plain
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="ChangeFile"
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
                v-for="(item, index) in tabrow.MemberShipFileTables"
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
        <CRow>
          <CCol>
            <c-row class="mt-3 ">
              <!-- <c-col sm="12" md="10" lg="10"> </c-col> -->
              <c-col class="mb-3">
                <div class="d-flex justify-content-end">
                  <!-- <div class="mr-2">
                    <c-button size="sm" color="primary" @click="SendAllSms">
                      <b-icon icon="chat-left"></b-icon> {{ $t("Send") }}
                    </c-button>
                  </div> -->
                  <div class="mr-3">
                    <c-button size="sm" color="primary" @click="OpenModal">
                      <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                    </c-button>
                  </div>
                </div>
              </c-col>
            </c-row>
            <CRow>
              <CCol>
                <div class="mobileStyle mx-3">
                  <b-table
                    :fields="Fields"
                    :items="MemberShip.MemberShipTables"
                    class="bg-color-table text-center p-1"
                    style="vertical-align: middle; width: 100%;"
                    bordered
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:cell(isappointment)="{ item }">
                      <p class="m-0">
                        {{
                          item.isappointmentid === 1
                            ? "Тайинлов/Назначение"
                            : "Озод этиш/Отстранение"
                        }}
                      </p>
                    </template>
  
                    <!-- <template #cell(personname)="{item}">
                    {{employeelist.filter(i => i.id === item.personid)[0].name }}
                  </template> -->
                    <template v-slot:cell(istemporarily)="{ item }">
                      <p class="m-0">
                        {{ item.istemporarily === true ? $t("yes") : $t("no") }}
                      </p>
                    </template>
                    <template v-slot:cell(isseveralchildren)="{ item }">
                      <p class="m-0">
                        {{
                          item.isseveralchildren === true ? $t("yes") : $t("no")
                        }}
                      </p>
                    </template>
                    <template v-slot:cell(iscoachattached)="{ item }">
                      <p class="m-0">
                        {{ item.iscoachattached === true ? $t("yes") : $t("no") }}
                      </p>
                    </template>
                    <template v-slot:cell(internalrulesagreed)="{ item }">
                      <p class="m-0">
                        {{
                          item.internalrulesagreed === true ? $t("yes") : $t("no")
                        }}
                      </p>
                    </template>
                    <template v-slot:cell(amount)="{ item }">
                      <div class="d-flex align-items-right">
                        <span class="font-weight-bold" style="width:100px">{{
                          $options.filters.currency(item.amount, {
                            symbol: "",
                            fractionCount: 2,
                          })
                        }}</span>
                      </div>
                    </template>
                    <template v-slot:cell(index)="{ index }">
                      {{ index + 1 }}
                    </template>
                    <template #cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link
                          @click="EditItem(item)"
                          class="mr-2"
                          v-if="item.statusid != 7"
                          v-c-tooltip="{ content: $t('Edit') }"
                        >
                          <b-icon icon="pencil"></b-icon>
                        </b-link>
                        <b-link
                          @click="Printer(item)"
                          class="mr-2"
                          v-c-tooltip="{ content: $t('Print') }"
                        >
                          <b-icon icon="printer"></b-icon>
                        </b-link>
                        <b-link
                          class="mr-2"
                          v-if="item.statusid != 7"
                          v-c-tooltip="{ content: $t('Delete') }"
                          @click="DeleteItem(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                        <b-link
                          class="mr-2"
                          v-if="item.statusid != 7"
                          v-c-tooltip="{ content: $t('SMS') }"
                          @click="SendSms(item)"
                        >
                          <b-icon icon="chat-left"></b-icon>
                        </b-link>
                        <b-modal :id="'SendSmsModal' + item.id" hide-footer>
                          <template v-slot:modal-title>{{
                            $t("WantSmsSend")
                          }}</template>
                          <div>
                            <p>
                              {{ item.personmembername }}
                            </p>
                          </div>
                          <div class="d-block text-right">
                            <CButton
                              @click="$bvModal.hide('SendSmsModal' + item.id)"
                              color="danger"
                              class="mr-2"
                            >
                              <b-icon icon="x" />
                              {{ $t("NotAccept") }}
                            </CButton>
                            <CButton @click="Send(item)" color="success">
                              <b-icon icon="check2" />
                              {{ $t("Approve") }}
                            </CButton>
                          </div>
                        </b-modal>
                      </div>
                    </template>
                  </b-table>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow class="mt-3">
          <CCol>
            <div class="text-left">
              <CButton class="ml-3" size="sm" color="danger" @click="Back()">
                <b-icon icon="arrow-left-short"></b-icon>
                {{ $t("back") }}
              </CButton>
            </div>
          </CCol>
          <CCol>
            <div class="text-right">
              <CButton
                v-if="MemberShip.CanSave"
                size="sm"
                color="success"
                class="mr-3"
                @click="SaveData"
              >
                <b-spinner v-if="SaveLoading" small></b-spinner>
                <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                {{ $t("Save") }}
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCard>
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
        id="SendAllSmsModal"
        no-close-on-backdrop
        size="md"
        :title="$t('SendSms')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <c-row>
          <c-col>
            <p class="mr-4">
              {{ $t("commenttosend") }}
            </p>
          </c-col>
        </c-row>
        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button
              class="mr-2"
              variant="danger"
              @click="CloseSendSmsAllModal"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="SendAll()">
              {{ $t("Send") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>
  
  <script>
import SchoolYearService from "@/services/SchoolYear.service";
import PrivilegeReasonService from "@/services/PrivilegeReason.service";
import MemberShipService from "@/services/MemberShip.service";
import EmployeeListComponent from "@/components/EmployeeList";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import PersonMemberService from "@/services/PersonMember.service";
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
import FileManageService from "@/services/filemanage.service";
import ServicePocketService from "@/services/ServicePocket.service";
import MemberComponent from "@/components/MemberList";
import PriceListService from "@/services/PriceList.service";
import PersonComponent from "@/components/PersonMember";
import EmployeeList from "@/components/EmployeeList";
export default {
  components: {
    EmployeeListComponent,
    MemberComponent,
    PersonComponent,
    EmployeeList,
  },
  data() {
    return {
      SaveLoading: false,
      MemberShip: {},
      OrganizationLoading: false,
      RegionLoading: false,
      RegionList: [],
      OblastList: [],
      PersoncoachList: [],
      selectedrowid: 0,
      SchoolYear: [],
      SchoolGradeList: [],
      fileLoading: false,
      DownloadLoading: false,
      personvalue: {},
      coachvalue: {},
      schoolgradeletterlist: [],
      PrivilegereasonList: [],
      ServicePocketList: [],
      MemberShipList: [],
      SportGroupCategoryTypeList: [],
      DeleteLoading: false,
      MemberShipTypeList: [],
      sporttypeclassifierlist: [],
      OrganizationList: [],
      PersonMemberList: [],
      employeelist: [],
      lang: "",
      Fields: [
        {
          key: "index",
          label: this.$t("ordernumber"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "docnumber",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("InvoisNumber"),
        },
        {
          key: "personmembername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("Aboniment"),
        },
        {
          key: "mobilenumber",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("mobilenumber"),
        },
        {
          key: "nextmedicalcheckdate",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("nextmedicalcheckdate"),
        },
        {
          key: "internalrulesagreed",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("internalrulesagreed"),
        },
        {
          key: "isseveralchildren",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("hastaxrelief"),
        },
        {
          key: "personcoachname",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("Coach"),
        },
        {
          key: "iscoachattached",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("workwithcoach"),
        },
        {
          key: "privilegereasonname",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("privilegereasonname"),
        },
        {
          key: "amount",
          tdClass: "text-center",
          thClass: "text-center",
          style: "width:40%",
          label: this.$t("amount"),
        },
        {
          key: "actions",
          tdClass: "text-center",
          thClass: "text-center",
          label: this.$t("actions"),
        },
      ],
      PriceData: {},
      SendAllSmsModal: false,
      tabrow: {
        id: 0,
        ownerid: 0,
        docnumber: "",
        docdate: "",
        pricelistid: 0,
        privilegereasonid: 0,
        privilegereasonname: "",
        personmemberid: 0,
        personcoachid: 0,
        personcoachname: "",
        nextmedicalcheckdate: "",
        MemberShipFileTables: [],
        personmembername: "",
        membershipid: 0,
        internalrulesagreed: true,
        isseveralchildren: false,
        iscoachattached: false,
        amount: 0,
        percentage: 0,
        Status: 1,
      },
      SummData: {
        amount: 0,
      },
      editedIndex: -1,
      isDisabled: false,
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    MemberShipService.Get(self.selectedrowid).then((res) => {
      self.MemberShip = res.data;
      SchoolYearService.GetAll().then((res) => {
        self.SchoolYear = res.data;
      });
    });
    ServicePocketService.GetAll().then((res) => {
      self.ServicePocketList = res.data;
    });
    SportGroupCategoryTypeService.GetAll().then((res) => {
      self.SportGroupCategoryTypeList = res.data;
    });
    MemberShipTypeService.GetAll().then((res) => {
      self.MemberShipTypeList = res.data;
    });
    PersonMemberService.GetAll().then((res) => {
      self.PersonMemberList = res.data;
    });
    PrivilegeReasonService.GetAll().then((res) => {
      self.PrivilegereasonList = res.data;
    });
    SportTypeClassifierService.GetAll().then((res) => {
        self.sporttypeclassifierlist = res.data;
      });
  },
  methods: {
    OpenPersonMemberModal() {
      this.$bvModal.show("modalmember");
    },
    ClosePersonMemberModal() {
      this.$bvModal.hide("modalmember");
    },
    SendSms(item) {
      this.$bvModal.show("SendSmsModal" + item.id);
    },
    SendAllSms() {
      this.$bvModal.show("SendAllSmsModal");
    },
    CloseSendSmsAllModal() {
      this.$bvModal.hide("SendAllSmsModal");
    },
    SendAll() {
      MemberShipService.SendSms(this.MemberShip.id, 0)
        .then((res) => {
          this.makeToast(this.$t("SmsMessage"), this.$t("message"), "success");
          this.$bvModal.hide("SendAllSmsModal");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Send(item) {
      MemberShipService.SendSms(this.MemberShip.id, item.id)
        .then((res) => {
          this.makeToast(this.$t("SmsMessage"), this.$t("message"), "success");
          this.$bvModal.hide("SendSmsModal" + item.id);
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    AddPersonMemberData(data) {
      var self = this;
      self.tabrow.personmemberid = data.id;
      self.tabrow.personmembername = data.fullname;
      self.ClosePersonMemberModal();
    },
    SelectedPersonMemberItem(data) {
      this.personvalue1 = data;
    },
    ChangeFile(event) {
      var formData = new FormData();
      formData.append("attachfile", event.target.files[0]);
      if (!!event.target.files[0]) {
        if (event.target.files[0].size < 4194304) {
          this.fileLoading = true;
          FileManageService.Attach(formData)
            .then((res) => {
              this.tabrow.MemberShipFileTables.push({
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
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    AddCoachData(data) {
      this.tabrow.personcoachname = data.personname;
      this.tabrow.personcoachid = data.personid;
      this.CloseCoachModal();
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    DeleteFile(item, index) {
      this.DeleteLoading = true;
      if (item.Status == 1) {
        this.tabrow.MemberShipFileTables.splice(index, 1);
        this.DeleteLoading = false;
      } else {
        this.tabrow.MemberShipFileTables.forEach(function (el) {
          if (item.attachmentfileid == el.attachmentfileid) {
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
    Printer(item) {
      MemberShipService.PrintMemberShipPdf('pdf', item.ownerid, 'uz_latn').then(res => {
        this.forceFileDownload(res, "Абонимент.pdf");
      })
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    ChangeSumm() {
      var self = this;
      if (!!self.tabrow.privilegereasonid) {
        self.tabrow.percentage = self.PrivilegereasonList.filter(function (
          item
        ) {
          if (item.id === self.tabrow.privilegereasonid) return item;
        })[0].percentage;
      }
      if (
        this.tabrow.isseveralchildren &&
        !this.tabrow.iscoachattached &&
        this.tabrow.privilegereasonid == 0
      ) {
        this.tabrow.amount =
          (this.PriceData.amount * this.PriceData.morethanonechild) / 100;
      } else if (
        !this.tabrow.isseveralchildren &&
        this.tabrow.iscoachattached &&
        this.tabrow.privilegereasonid == 0
      ) {
        this.tabrow.amount =
          this.PriceData.amount + this.PriceData.coachpayment;
      } else if (
        this.tabrow.isseveralchildren &&
        this.tabrow.iscoachattached &&
        this.tabrow.privilegereasonid == 0
      ) {
        this.tabrow.amount =
          (this.PriceData.amount * this.PriceData.morethanonechild) / 100 +
          this.PriceData.coachpayment;
      } else if (
        !this.tabrow.isseveralchildren &&
        !this.tabrow.iscoachattached &&
        this.tabrow.privilegereasonid == 0
      ) {
        this.tabrow.amount = this.PriceData.amount;
      } else if (
        this.tabrow.isseveralchildren &&
        !this.tabrow.iscoachattached &&
        !!this.tabrow.privilegereasonid
      ) {
        this.tabrow.amount =
          (this.PriceData.amount * this.PriceData.morethanonechild) / 100;
        this.tabrow.amount =
          this.tabrow.amount -
          (this.tabrow.amount * this.tabrow.percentage) / 100;
      } else if (
        !this.tabrow.isseveralchildren &&
        this.tabrow.iscoachattached &&
        !!this.tabrow.privilegereasonid
      ) {
        this.tabrow.amount =
          this.PriceData.amount + this.PriceData.coachpayment;
        this.tabrow.amount =
          this.tabrow.amount -
          (this.tabrow.amount * this.tabrow.percentage) / 100;
      } else if (
        this.tabrow.isseveralchildren &&
        this.tabrow.iscoachattached &&
        !!this.tabrow.privilegereasonid
      ) {
        this.tabrow.amount =
          (this.PriceData.amount * this.PriceData.morethanonechild) / 100 +
          this.PriceData.coachpayment;
        this.tabrow.amount =
          this.tabrow.amount -
          (this.tabrow.amount * this.tabrow.percentage) / 100;
      } else if (
        !this.tabrow.isseveralchildren &&
        !this.tabrow.iscoachattached &&
        !!this.tabrow.privilegereasonid
      ) {
        this.tabrow.amount =
          this.PriceData.amount -
          (this.PriceData.amount * this.tabrow.percentage) / 100;
      }
      //else if (this.tabrow.privilegereasonid > 0) {
      //   this.tabrow.amount =  this.tabrow.amount -
      //     (this.tabrow.amount * this.tabrow.percentage) / 100;
      // }
    },
    ChangeSumm1() {
      if (this.tabrow.iscoachattached) {
        this.tabrow.amount = this.tabrow.amount + this.tabrow.coachpayment;
      } else {
        this.tabrow.amount = this.tabrow.amount - this.tabrow.coachpayment;
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
    ChangePersonMember() {
      this.tabrow.personmembername = this.PersonMemberList.filter(
        (item) => this.tabrow.personmemberid === item.id
      )[0].name;
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
      if(item.statusid == 7) {
        return "c-bg-danger"
      }
    },
    Back() {
      this.$router.push({
        name: "MemberShip",
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
      // if (
      //   self.tabrow.docdate === "" ||
      //   self.tabrow.docdate === undefined ||
      //   self.tabrow.docdate === null ||
      //   self.tabrow.docdate === 0
      // ) {
      //   self.makeToast(
      //     self.$t("docdateNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.tabrow.personmemberid === "" ||
        self.tabrow.personmemberid === undefined ||
        self.tabrow.personmemberid === null ||
        self.tabrow.personmemberid === 0
      ) {
        self.makeToast(
          self.$t("personmemberNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.nextmedicalcheckdate === "" ||
        self.tabrow.nextmedicalcheckdate === undefined ||
        self.tabrow.nextmedicalcheckdate === null ||
        self.tabrow.nextmedicalcheckdate === 0
      ) {
        self.makeToast(
          self.$t("nextmedicalcheckdateNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.internalrulesagreed === "" ||
        self.tabrow.internalrulesagreed === undefined ||
        self.tabrow.internalrulesagreed === null ||
        self.tabrow.internalrulesagreed === 0
      ) {
        self.makeToast(
          self.$t("internalrulesagreedNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.isseveralchildren === "" ||
        self.tabrow.isseveralchildren === undefined ||
        self.tabrow.isseveralchildren === null ||
        self.tabrow.isseveralchildren === 0
      ) {
        self.makeToast(
          self.$t("hastaxreliefNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.iscoachattached === "" ||
        self.tabrow.iscoachattached === undefined ||
        self.tabrow.iscoachattached === null ||
        self.tabrow.iscoachattached === 0
      ) {
        self.makeToast(
          self.$t("workwithcoachNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.tabrow.MemberShipFileTables.length == 0 ||
        self.tabrow.MemberShipFileTables == null
      ) {
        self.makeToast(
          self.$t("attachmentfileidNotCorrect"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.tabrow.amount === "" ||
      //   self.tabrow.amount === undefined ||
      //   self.tabrow.amount === null ||
      //   self.tabrow.amount === 0
      // ) {
      //   self.makeToast(self.$t("amountNotCorrect"), self.$t("Error"), "danger");
      //   return false;
      // }
      if (!!self.tabrow.privilegereasonid) {
        self.tabrow.privilegereasonname = self.PrivilegereasonList.filter(
          (item) => item.id === self.tabrow.privilegereasonid
        )[0].name;
      }
      // self.tabrow.personcoachname = self.PersoncoachList.filter(function (
      //   item
      // ) {
      //   if (item.id === self.tabrow.personcoachid) return item;
      // })[0].name;
      self.MemberShip.MemberShipTables.push(self.tabrow);
      self.tabrow = {
        id: 0,
        ownerid: 0,
        docnumber: "",
        docdate: "",
        personmemberid: 0,
        nextmedicalcheckdate: "",
        MemberShipFileTables: [],
        personmembername: "",
        personcoachid: 0,
        personcoachname: "",
        membershipid: 0,
        pricelistid: 0,
        privilegereasonid: 0,
        privilegereasonname: "",
        internalrulesagreed: false,
        isseveralchildren: false,
        iscoachattached: false,
        amount: 0,
        Status: 1,
      };
      self.isDisabled = true;
      self.$bvModal.hide("AddModal");
    },
    OpenModal() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      self.editedIndex = -1;
      (self.tabrow = {
        id: 0,
        ownerid: 0,
        docnumber: "",
        docdate: "",
        personmemberid: 0,
        nextmedicalcheckdate: "",
        personmembername: "",
        personcoachid: 0,
        personcoachname: "",
        membershipid: 0,
        internalrulesagreed: false,
        isseveralchildren: false,
        iscoachattached: false,
        MemberShipFileTables: [],
        amount: 0,
        pricelistid: 0,
        privilegereasonid: 0,
        privilegereasonname: "",
        Status: 1,
      }),
        (self.tabrow.docdate = self.MemberShip.docdate);
      PriceListService.GetPriceListForMemberShip(
        self.MemberShip.servicepocketid,
        self.MemberShip.sporttypeclassifierid,
        self.MemberShip.membershiptypeid
      ).then((res) => {
        self.tabrow.docnumber = res.data.docnumber;
        self.tabrow.amount = res.data.amount;
        self.tabrow.pricelistid = res.data.id;
        self.SummData.amount = res.data.amount;
        self.tabrow.coachpayment = res.data.coachpayment;
        self.tabrow.morethanonechild = res.data.morethanonechild;
        self.tabrow.MemberShipFileTables = [];
        this.PriceData = res.data;
      });
      self.$bvModal.show("AddModal");
    },

    async EditItem(item) {
      item.Status = 2;
      this.editedIndex = this.MemberShip.MemberShipTables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      await PriceListService.GetPriceListForMemberShip(
        this.MemberShip.servicepocketid,
        this.MemberShip.sporttypeclassifierid,
        this.MemberShip.membershiptypeid
      ).then((res) => {
        this.PriceData = res.data;
      });
      this.$bvModal.show("AddModal");
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    AddItem() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.MemberShip.MemberShipTables[this.editedIndex],
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
          docnumber: "",
          docdate: "",
          personmemberid: 0,
          nextmedicalcheckdate: "",
          personmembername: "",
          personcoachid: 0,
          personcoachname: "",
          membershipid: 0,
          internalrulesagreed: false,
          isseveralchildren: false,
          iscoachattached: false,
          amount: 0,
          MemberShipFileTables: [],
          pricelistid: 0,
          privilegereasonid: 0,
          privilegereasonname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    check() {
      var self = this;
      if (
        self.MemberShip.docnumber === 0 ||
        self.MemberShip.docnumber === null ||
        self.MemberShip.docnumber === undefined ||
        self.MemberShip.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MemberShip.docdate === 0 ||
        self.MemberShip.docdate === null ||
        self.MemberShip.docdate === undefined ||
        self.MemberShip.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MemberShip.servicepocketid === 0 ||
        self.MemberShip.servicepocketid === null ||
        self.MemberShip.servicepocketid === undefined ||
        self.MemberShip.servicepocketid === ""
      ) {
        this.makeToast(
          this.$t("servicepocketNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MemberShip.sporttypeclassifierid === 0 ||
        self.MemberShip.sporttypeclassifierid === null ||
        self.MemberShip.sporttypeclassifierid === undefined ||
        self.MemberShip.sporttypeclassifierid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifieridNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MemberShip.membershiptypeid === 0 ||
        self.MemberShip.membershiptypeid === null ||
        self.MemberShip.membershiptypeid === undefined ||
        self.MemberShip.membershiptypeid === ""
      ) {
        this.makeToast(
          this.$t("membershiptypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      
      if (
        self.MemberShip.sportgroupcategorytypeid === 0 ||
        self.MemberShip.sportgroupcategorytypeid === null ||
        self.MemberShip.sportgroupcategorytypeid === undefined ||
        self.MemberShip.sportgroupcategorytypeid === ""
      ) {
        this.makeToast(
          this.$t("sportgroupcategorytypeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (self.MemberShip.MemberShipTables.length === 0) {
      //   this.makeToast(this.$t("TablesNotFilled"), this.$t("Error"), "danger");
      //   return false;
      // }

      return true;
    },
    checkData() {
      var self = this;
      if (
        self.MemberShip.docnumber === 0 ||
        self.MemberShip.docnumber === null ||
        self.MemberShip.docnumber === undefined ||
        self.MemberShip.docnumber === ""
      ) {
        this.makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.MemberShip.docdate === 0 ||
        self.MemberShip.docdate === null ||
        self.MemberShip.docdate === undefined ||
        self.MemberShip.docdate === ""
      ) {
        this.makeToast(
          this.$t("docdateNotCorrect"),
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
      MemberShipService.Update(self.MemberShip)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "MemberShip",
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
.c-bg-danger {
  background-color: rgb(255, 205, 205);
}
</style>
  
  
  
  
  
  
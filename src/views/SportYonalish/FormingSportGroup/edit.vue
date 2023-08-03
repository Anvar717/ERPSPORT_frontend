<template>
  <b-overlay :show="show">
    <b-card>
      <b-row style="padding-left: 0px">
        <b-col>
          <h4>{{ $t("FormingSportGroup") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2" style="padding-left: 0px">
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docnumber") }} </label>
          <b-form-input
            disabled
            v-model="FormingSportGroup.docnumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("docdate") }} </label>
          <custom-date-picker
            v-model="FormingSportGroup.docdate"
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            @keyup="BindValue1"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("schoolyear") }} </label>
          <v-select
            :options="schoolyearlist"
            :disabled="!disableStudyYear"
            v-model="FormingSportGroup.schoolyearid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          >
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template></v-select
          >
        </b-col>
      </b-row>
      <b-row class="mt-2" style="padding-left: 0px">
        <b-col>
          <div class="form-group">
            <label for="datepicker-dateformat2" class="col-form-label">{{
              $t("Coach")
            }}</label>
            <div>
              <CInput
                class="mr-2"
                style="width: 100%"
                disabled
                v-model="FormingSportGroup.coachpersonname"
              >
                <template #append>
                  <b-button size="sm" variant="primary" @click="OpenCoachModal">
                    <b-icon icon="three-dots"></b-icon>
                  </b-button>
                </template>
              </CInput>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("SportGroup") }} </label>
          <v-select
            :options="sportgrouplist"
            @input="changeSportGroup"
            v-model="FormingSportGroup.sportgroupid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="sportgroupname"
          >
            <template #no-options="{ search, searching, loading }">
              {{ $t("NoInfo") }}
            </template></v-select
          >
        </b-col>
        <b-col sm="12" md="4" lg="4" class="mt-2">
          <label for=""> {{ $t("academichours") }} </label>
          <b-form-input
            type="number"
            disabled
            :placeholder="$t('academichours')"
            v-model="FormingSportGroup.academichours"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" lg="4" class="mt-2">
          <label for=""> {{ $t("orderNumber") }} </label>
          <b-form-input
            :placeholder="$t('orderNumber')"
            v-model="FormingSportGroup.ordernumber"
          ></b-form-input>
        </b-col>
        <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("OrderDate") }} </label>
          <custom-date-picker
            v-model="FormingSportGroup.orderdate"
            size="sm"
            @keyup="BindValue2"
            lang="ru"
            :placeholder="$t('OrderDate')"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
      </b-row>
      <b-row class="mt-2" style="padding-left: 0px">
        <b-col sm="12" md="8" class="mt-2">
          <label for=""> {{ $t("detail") }} </label>
          <b-form-textarea
            id="textarea"
            v-model="FormingSportGroup.detail"
            :placeholder="$t('detail')"
            rows="2"
            max-rows="6"
            class="mb-3"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mt-3" style="padding-left: 0px">
        <b-col>
          <b-tabs>
            <b-tab active class="ml-2">
              <template slot="title">
                <b-icon icon="box-arrow-up"></b-icon>
                {{ $t("Sportchi") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="pl-0">
                  <b-table
                    :fields="Sportfields"
                    :items="FormingSportGroup.StudentSportGroupTable"
                    class="bg-color-table text-center ml-1"
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
                  </b-table>
                </b-col>
              </b-row>
            </b-tab>
            <!-- <b-tab class="ml-2">
              <template slot="title">
                <b-icon icon="box-arrow-down"></b-icon>
                {{ $t("Murabbiy") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenCoachAddModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col class="pl-1">
                  <b-table
                    :fields="Coachfields"
                    :items="FormingSportGroup.CoachSportGroupTable"
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
                          @click="DeleteItem(item)"
                        >
                          <b-icon icon="trash"></b-icon>
                        </b-link>
                      </div>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-tab> -->
          </b-tabs>
        </b-col>
      </b-row>
      <b-modal
        v-model="AddModal"
        hide-footer
        size="lg"
        no-close-on-backdrop
        :title="$t('Sporttabrow')"
      >
        <b-row>
          <b-col>
            <div class="form-group form-row mb-0">
              <label class="col-form-label col-sm-4">
                {{ $t("StudentPerson") }}
              </label>
              <div class="col-sm-8 d-flex">
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
                  class="w-100"
                  disabled
                  :options="sporttitlelist"
                  v-model="Sporttabrow.sporttitleid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                  <template #no-options="{ search, searching, loading }">
                    {{ $t("NoInfo") }}
                  </template>
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-4">
                {{ $t("highereduclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="highereduclassifierlist"
                  v-model="Sporttabrow.highereduclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row> -->
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
      <!-- <b-modal
        v-model="CoachAddModal"
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
                {{ $t("sporttitle") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="sporttitlelist"
                  v-model="Coachtabrow.sporttitleid"
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
                {{ $t("highereduclassifier") }}
              </label>
              <div class="col-sm-8 d-flex">
                <v-select
                  class="w-100"
                  :options="highereduclassifierlist"
                  v-model="Coachtabrow.highereduclassifierid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="fullname"
                >
                </v-select>
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
      </b-modal> -->
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
          isallperson="true"
          @SelectedItem="SelectedItem"
          @DblClick="AddStudentData"
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
        id="CoachModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Coach')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list
          :isteacher="false"
          isallperson="true"
          :ondate="FormingSportGroup.docdate"
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
      <b-row>
        <b-col>
          <div class="text-left">
            <b-button
              class=""
              size="sm"
              variant="danger"
              @click="openCloseModal"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </b-button>
          </div>
        </b-col>
        <b-col>
          <div class="text-right">
            <b-button size="sm" variant="success" :disabled="issavedisabled" @click="SaveData">
              <b-spinner v-if="SaveLoading" small></b-spinner>
              <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
              {{ $t("Save") }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-modal id="changeExist" header-bg-variant="warning" header-text-variant="white" :title="$t('warning')" centered cancel-variant="danger" ok-variant="success" :ok-title="$t('yes')" :cancel-title="$t('no')" @ok="$router.push({ name: 'FormingSportGroup' })">
        <h5> {{ $t('changeExist') }} </h5>
    </b-modal>
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
import FormingSportGroupService from "@/services/FormingSportGroup.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import SchoolYearService from "@/services/SchoolYear.service";
import EmployeeList from "@/components/EmployeeList";
import SportTitleService from "@/services/SportTitle.service";
import HigherEduClassifierService from "@/services/HigherEduClassifier.service";
import SportGroupService from "@/services/SportGroup.service";
import SportStudentManageService from "@/services/SportStudentManage.service";
import PersonList from "@/components/PersonList";
import CustomDatePicker from "@/components/customDatePicker.vue";
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
      FormingSportGroup: {},
      SaveLoading: false,
      AddModal: false,
      CoachAddModal: false,
      schoolyearlist: [],
      sportgrouplist: [],
      SportTabrowData: {},
      sporttitlelist: [],
      highereduclassifierlist: [],
      studentvalue: {},
      coachvalue: {},
      editedIndex: -1,
      sporttypeclassifierid: 0,
      editedIndex1: -1,
      issavedisabled: false,
      Sporttabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        // highereduclassifierid: 0,
        // highereduclassifiername: "",
        // iscoach: false,
        Status: 1,
      },
      Coachtabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        highereduclassifierid: 0,
        highereduclassifiername: "",
        // iscoach: true,
        Status: 1,
      },
      Sportfields: [
        {
          key: "personname",
          label: this.$t("student"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "persondateofbirth",
          label: this.$t("DateOfBirthday"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      Coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitleName"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "highereduclassifiername",
          label: this.$t("Highereduclassifiername"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      FormingSportGroupClone : {}
    };
  },
  async created() {
    this.show = true;
    console.log(this.$route?.params);
    await FormingSportGroupService.Get(this.$route.params.id).then((res) => {
      this.FormingSportGroup = res.data;
      this.FormingSportGroupClone = JSON.parse(JSON.stringify(this.FormingSportGroup))
      if (this.$route.params.id == 0) {
        SchoolYearService.GetDefault().then((res) => {
          this.FormingSportGroup.schoolyearid = res.data.id;
          this.FormingSportGroupClone = JSON.parse(JSON.stringify(this.FormingSportGroup))
        });
      }
      SportGroupService.GetAll().then((res) => {
        this.sportgrouplist = res.data;
        this.changeSportGroup();
      });
      this.show = false;
      
    });
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    SportTitleService.GetAll(true).then((res) => {
      this.sporttitlelist = res.data;
    });
    HigherEduClassifierService.GetAll().then((res) => {
      this.highereduclassifierlist = res.data;
    });
    
  },
  computed: {
    disableStudyYear() {
      const { params } = this.$route
      if ('isEdit' in params) {
        return params.isEdit
      }

      return false
    }
  },
  methods: {
    openCloseModal() {
      this.compareObject(this.FormingSportGroup,this.FormingSportGroupClone)
    },
    compareObject(obj, objClone) {
      var obj1 = Object.values(obj).map(item => (item === undefined || item === '') ? null : item)
      var objClone1 = Object.values(objClone).map(item => (item === undefined || item === '') ? null : item)
      if (JSON.stringify(obj1) == JSON.stringify(objClone1)) {
        this.$router.push({ name: 'FormingSportGroup' })
      }
      else {
        this.$bvModal.show('changeExist')
      }
    },
    OpenAddModal() {
      this.AddModal = true;
      this.Sporttabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        // highereduclassifierid: 0,
        // highereduclassifiername: "",
        // iscoach: false,
        Status: 1,
      };
    },
    BindValue1(value) {
      this.FormingSportGroup.docdate = value;
    },
    BindValue2(value) {
      this.FormingSportGroup.orderdate = value;
    },
    check() {
      var self = this;

      if (
        self.FormingSportGroup.docnumber === 0 ||
        self.FormingSportGroup.docnumber === null ||
        self.FormingSportGroup.docnumber === undefined ||
        self.FormingSportGroup.docnumber === ""
      ) {
        this.$makeToast(
          this.$t("docnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingSportGroup.docdate === 0 ||
        self.FormingSportGroup.docdate === null ||
        self.FormingSportGroup.docdate === undefined ||
        self.FormingSportGroup.docdate === ""
      ) {
        this.$makeToast(
          this.$t("docdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingSportGroup.schoolyearid === 0 ||
        self.FormingSportGroup.schoolyearid === null ||
        self.FormingSportGroup.schoolyearid === undefined ||
        self.FormingSportGroup.schoolyearid === ""
      ) {
        this.$makeToast(
          this.$t("schoolyearNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingSportGroup.sportgroupid === 0 ||
        self.FormingSportGroup.sportgroupid === null ||
        self.FormingSportGroup.sportgroupid === undefined ||
        self.FormingSportGroup.sportgroupid === ""
      ) {
        this.$makeToast(
          this.$t("sportgroupNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.FormingSportGroup.ordernumber === 0 ||
        self.FormingSportGroup.ordernumber === null ||
        self.FormingSportGroup.ordernumber === undefined ||
        self.FormingSportGroup.ordernumber === ""
      ) {
        this.$makeToast(
          this.$t("orderNumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.FormingSportGroup.academichours === 0 ||
      //   self.FormingSportGroup.academichours === null ||
      //   self.FormingSportGroup.academichours === undefined ||
      //   self.FormingSportGroup.academichours === ""
      // ) {
      //   this.makeToast(
      //     this.$t("academichoursNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.FormingSportGroup.orderdate === 0 ||
        self.FormingSportGroup.orderdate === null ||
        self.FormingSportGroup.orderdate === undefined ||
        self.FormingSportGroup.orderdate === ""
      ) {
        this.$makeToast(
          this.$t("OrderDateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
    },
    OpenStudentModal() {
      this.$bvModal.show("StudentModal");
    },
    OpenCoachModal() {
      this.$bvModal.show("CoachModal");
    },
    SelectedItem(data) {
      this.studentvalue = data;
    },
    SelectedItemCoach(data) {
      this.coachvalue = data;
    },
    AddStudentData(data) {
      this.Sporttabrow.personname = data.fullname;
      this.Sporttabrow.personid = data.id;
      this.Sporttabrow.persondateofbirth = data.dateofbirth;
      SportStudentManageService.GetSportsmenOtherInfo(
        this.Sporttabrow.personid,
        this.sporttypeclassifierid
      )
        .then((res) => {
          this.SportTabrowData = res.data;
          this.Sporttabrow.sporttitleid = this.SportTabrowData.sporttitleid;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      this.CloseStudentModal();
    },
    AddCoachData(data) {
      this.FormingSportGroup.coachpersonname = data.personname;
      this.FormingSportGroup.coachpersonid = data.personid;
      this.CloseCoachModal();
    },
    CloseStudentModal() {
      this.$bvModal.hide("StudentModal");
    },
    CloseCoachModal() {
      this.$bvModal.hide("CoachModal");
    },
    clearSportTabrow() {
      this.Sporttabrow = {
          id: 0,
          ownerid: 0,
          personid: 0,
          personname: "",
          sporttitleid: 0,
          sporttitlename: "",
          // highereduclassifierid: 0,
          // highereduclassifiername: "",
          // iscoach: false,
          Status: 1,
        };
    },
    CloseTableModal() {
      this.AddModal = false;
      this.$nextTick(() => {
        y=this.clearSportTabrow()
        this.editedIndex = -1;
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
          sporttitleid: 0,
          sporttitlename: "",
          highereduclassifierid: 0,
          highereduclassifiername: "",
          // iscoach: true,
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex =
        this.FormingSportGroup.StudentSportGroupTable.indexOf(item);
      this.Sporttabrow = Object.assign({}, item);
      this.AddModal = true;
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    EditItemCoach(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 =
        this.FormingSportGroup.CoachSportGroupTable.indexOf(item);
      this.Coachtabrow = Object.assign({}, item);
      this.CoachAddModal = true;
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
      // if (
      //   self.Sporttabrow.sporttitleid === null ||
      //   self.Sporttabrow.sporttitleid === undefined ||
      //   self.Sporttabrow.sporttitleid === 0 ||
      //   self.Sporttabrow.sporttitleid === ""
      // ) {
      //   self.$makeToast(
      //     self.$t("sporttitleidNotCorrect"),
      //     self.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      var dublicate = false;
      self.FormingSportGroup.StudentSportGroupTable.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.personid === self.Sporttabrow.personid &&
          self.Sporttabrow.Status != 2
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.$makeToast(
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
      }
      if (!!self.Sporttabrow.highereduclassifierid) {
        self.Sporttabrow.highereduclassifiername =
          self.highereduclassifierlist.filter(
            (item) => item.id === self.Sporttabrow.highereduclassifierid
          )[0].fullname;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.FormingSportGroup.StudentSportGroupTable[self.editedIndex],
          self.Sporttabrow
        );
      } else {
        self.FormingSportGroup.StudentSportGroupTable.push(self.Sporttabrow);
      }
     self.clearSportTabrow()
      this.AddModal = false;
    },
    changeSportGroup() {
      if (!!this.FormingSportGroup.sportgroupid) {
        console.log(this.sportgrouplist)
        this.FormingSportGroup.academichours = this.sportgrouplist.filter(
          (item) => item.id === this.FormingSportGroup.sportgroupid
        )[0].academichours;
        this.sporttypeclassifierid = this.sportgrouplist.filter(
          (item) => item.id === this.FormingSportGroup.sportgroupid
        )[0].sporttypeclassifierid;
      }
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
        self.Coachtabrow.sporttitleid === null ||
        self.Coachtabrow.sporttitleid === undefined ||
        self.Coachtabrow.sporttitleid === 0 ||
        self.Coachtabrow.sporttitleid === ""
      ) {
        self.$makeToast(
          self.$t("sporttitleNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Coachtabrow.highereduclassifierid === null ||
        self.Coachtabrow.highereduclassifierid === undefined ||
        self.Coachtabrow.highereduclassifierid === 0 ||
        self.Coachtabrow.highereduclassifierid === ""
      ) {
        self.$makeToast(
          self.$t("highereduclassifierNotSelected"),
          self.$t("Error"),
          "danger"
        );
        return false;
      }
      var dublicate = false;
      self.FormingSportGroup.CoachSportGroupTable.forEach(function (item) {
        if (
          item.Status !== 3 &&
          item.personid === self.Coachtabrow.personid &&
          self.Coachtabrow.Status != 2
        ) {
          dublicate = true;
        }
      });
      if (dublicate) {
        this.$makeToast(
          this.$t("Dublicate") + ": " + self.Coachtabrow.personname,
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (!!self.Coachtabrow.sporttitleid) {
        self.Coachtabrow.sporttitlename = self.sporttitlelist.filter(
          (item) => item.id === self.Coachtabrow.sporttitleid
        )[0].name;
      }
      if (!!self.Coachtabrow.highereduclassifierid) {
        self.Coachtabrow.highereduclassifiername =
          self.highereduclassifierlist.filter(
            (item) => item.id === self.Coachtabrow.highereduclassifierid
          )[0].fullname;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(
          self.FormingSportGroup.CoachSportGroupTable[self.editedIndex1],
          self.Coachtabrow
        );
      } else {
        self.FormingSportGroup.CoachSportGroupTable.push(self.Coachtabrow);
      }
      self.Coachtabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        sporttitleid: 0,
        sporttitlename: "",
        highereduclassifierid: 0,
        highereduclassifiername: "",
        // iscoach: true,
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
        sporttitleid: 0,
        sporttitlename: "",
        highereduclassifierid: 0,
        highereduclassifiername: "",
        // iscoach: true,
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
      FormingSportGroupService.Update(self.FormingSportGroup)
        .then((res) => {
          self.SaveLoading = false;
          self.issavedisabled = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "FormingSportGroup" });
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
    }
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
</style>
<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4>{{ $t("Appeal") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="6" class="mt-2">
          <label for=""> {{ $t("appealdocnumber1") }} </label>
          <b-form-input disabled v-model="Appeal.docnumber"></b-form-input>
        </b-col>
        <b-col sm="12" md="6" class="mt-2">
          <label for=""> {{ $t("appealdate1") }} </label>
          <custom-date-picker
            v-model="Appeal.docdate"
            size="sm"
            lang="ru"
            :placeholder="$t('date')"
            @keyup="BindValue1"
            value-type="format"
            format="DD.MM.YYYY"
            style="width: 100%"
          ></custom-date-picker>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col sm="12" md="6" class="mt-2">
          <label for=""> {{ $t("ToOrganization") }} </label>
          <v-select
            :options="OrganizationList"
            v-model="Appeal.appealAssignment.toorganizationid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <b-col sm="12" md="6" class="mt-2">
          <label for=""> {{ $t("appealpurpose") }} </label>
          <v-select
            :options="appealpurposelist"
            v-model="Appeal.appealpurposeid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            class="fname-select"
          ></v-select>
        </b-col>
        <!-- <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("AppealSatisfactionType") }} </label>
          <v-select
            :options="appealsatisfactiontypelist"
            v-model="Appeal.appealsatisfactiontypeid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col> -->
        <b-col sm="12" md="12" class="mt-3">
          <label for=""> {{ $t("details") }} </label>
          <b-form-textarea
            id="textarea"
            v-model="Appeal.details"
            :placeholder="$t('details')"
            rows="2"
            style="height: 100px"
            max-rows="6"
            class="mb-3"
          ></b-form-textarea>
        </b-col>
        <b-col sm="12" md="12" lg="12">
          <custom-file-group
            :labels="TitleFileTypeList"
            @change="ChangeFile1"
            :items="Appeal.FileTables"
            @delete="
              (el) => {
                Appeal.FileTables = el;
              }
            "
          ></custom-file-group>
        </b-col>
      </b-row>
      <!-- <b-row class="mt-3">
        <b-col>
              <template slot="title">
                <b-icon icon="box-arrow-up"></b-icon>
                {{ $t("appealassignment") }}
              </template>
              <b-row class="mt-3">
                <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddModal">
                    {{ $t("Add") }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-table
                    :fields="Assignmentfields"
                    :items="Appeal.AppealAssignmentlist"
                    class="bg-color-table text-center mx-3"
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
          </b-tabs>
        </b-col>
      </b-row> -->
      <!-- <b-modal
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
                  :options="sporttitlelist"
                  v-model="Sporttabrow.sporttitleid"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                >
                </v-select>
              </div>
            </div>
          </b-col>
        </b-row>
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
      </b-modal> -->
      <!-- <b-modal
        id="StudentModal"
        no-close-on-backdrop
        size="xl"
        :title="$t('Student')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <person-list
          persontypeid="1"
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
      </b-modal> -->
      <b-row class="mt-3">
        <b-col>
          <div class="text-left">
            <b-button
              class="ml-0"
              size="sm"
              variant="danger"
              @click="$router.push({ name: 'Appeal' })"
            >
              <b-icon icon="arrow-left-short"></b-icon>
              {{ $t("back") }}
            </b-button>
          </div>
        </b-col>
        <b-col>
          <div class="text-right">
            <b-button
            :disabled="issavedisabled"
              size="sm"
              variant="success"
              class="mr-0"
              @click="SaveData"
            >
              <b-spinner v-if="SaveLoading" small></b-spinner>
              <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
              {{ $t("Save") }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
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
import AppealService from "@/services/Appeal.service";
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import OrganizationService from "@/services/organization.service";
import EmployeeList from "@/components/EmployeeList";
import AppealSatisfactionTypeService from "@/services/AppealSatisfactionType.service";
import CustomFileGroup from "@/components/CustomFileGroup.vue";
import AppealPurposeService from "@/services/AppealPurpose.service";
import PersonList from "@/components/PersonList";
import FileManageService from "@/services/filemanage.service";
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
    CustomFileGroup,
  },
  data() {
    return {
      show: false,
      Appeal: {},
      SaveLoading: false,
      AddModal: false,
      CoachAddModal: false,
      fileLoading: false,
      issavedisabled: false,
      schoolyearlist: [],
      parentlist: [],
      sportgrouplist: [],
      SportTabrowData: {},
      appealpurposelist: [],
      OrganizationList: [],
      appealsatisfactiontypelist: [],
      highereduclassifierlist: [],
      TitleFileTypeList: [],
      studentvalue: {},
      coachvalue: {},
      editedIndex: -1,
      sporttypeclassifierid: 0,
      editedIndex1: -1,
      Sporttabrow: {
        id: 0,
        ownerid: 0,
        fromorganizationid: 0,
        fromorganizationname: "",
        fromdepartmentid: 0,
        fromdepartmentname: "",
        frompersonid: 0,
        frompersonname: "",
        toorganizationid: 0,
        toorganizationname: "",
        todepartmentid: 0,
        todepartmentname: "",
        topersonid: 0,
        topersonname: "",
        details: "",
        parentid: 0,
        appealid: 0,
        statusid: 0,
        statusname: "",
        Status: 1,
      },
      Assignmentfields: [
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
    };
  },
  created() {
    this.show = true;
    AppealService.Get(this.$route.params.id)
      .then((res) => {
        this.Appeal = res.data;
        this.TitleFileTypeList = res.data.table.Tables;
        if (this.Appeal.appealAssignment == null) {
          this.Appeal.appealAssignment = {
            Status: 0,
            appealid: null,
            details: null,
            fromdepartmentid: null,
            fromdepartmentname: null,
            fromorganizationid: 0,
            fromorganizationname: null,
            frompersonid: null,
            frompersonname: null,
            id: 0,
            ownerid: 0,
            parentid: null,
            statusid: 0,
            statusname: null,
            todepartmentid: null,
            todepartmentname: null,
            toorganizationid: 0,
            toorganizationname: null,
            topersonid: null,
            topersonname: null,
          };
        }
        this.show = false;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, this.$t("error"), "danger");
      });
    AppealSatisfactionTypeService.GetAll().then((res) => {
      this.appealsatisfactiontypelist = res.data;
    });
    AppealPurposeService.GetAll().then((res) => {
      this.appealpurposelist = res.data;
    });
    OrganizationService.GetAll(0, 0, undefined, 21, null).then((res) => {
      this.OrganizationList = res.data;
    });
  },
  methods: {
    // OpenAddModal() {
    //   this.AddModal = true;
    //   this.Sporttabrow = {
    //     id: 0,
    //   ownerid: 0,
    // fromorganizationid: 0,
    //   fromorganizationname: "",
    //   fromdepartmentid: 0,
    //   fromdepartmentname: "",
    //   frompersonid: 0,
    //   frompersonname: "",
    //   toorganizationid: 0,
    //   toorganizationname: "",
    //   todepartmentid: 0,
    //   todepartmentname: "",
    //   topersonid: 0,
    //   topersonname: "",
    //   details: "",
    //   parentid: 0,
    //   appealid: 0,
    //   statusid: 0,
    //   statusname: "",
    //   Status: 1
    //   };
    // },
    BindValue1(value) {
      this.Appeal.docdate = value;
    },
    ChangeFile1(event, item) {
      var formData = new FormData();
      console.log(item);
      formData.append("attachfile", event.target.files[0]);
      if (event.target.files[0].size < item.baytmaxsize) {
        this.fileLoading = true;
        FileManageService.Attach(formData)
          .then((res) => {
            this.Appeal.FileTables.push({
              id: 0,
              ownerid: 0,
              attachmentfileid: res.data.id,
              attachmentfilename: item.fullname,
              attachmentfiletype: res.data.pfiletype,
              tablefileconfigid: item.id,
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
          this.$t("FileSizeLargerThan4mb", { mb: item.maxsize }),
          this.$t("error"),
          "danger"
        );
      }
    },
    check() {
      var self = this;

      if (
        self.Appeal.docnumber === 0 ||
        self.Appeal.docnumber === null ||
        self.Appeal.docnumber === undefined ||
        self.Appeal.docnumber === ""
      ) {
        this.makeToast(
          this.$t("appealdocnumberNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Appeal.docdate === 0 ||
        self.Appeal.docdate === null ||
        self.Appeal.docdate === undefined ||
        self.Appeal.docdate === ""
      ) {
        this.makeToast(
          this.$t("appealdocdateNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Appeal.appealAssignment.toorganizationid === 0 ||
        self.Appeal.appealAssignment.toorganizationid === null ||
        self.Appeal.appealAssignment.toorganizationid === undefined ||
        self.Appeal.appealAssignment.toorganizationid === ""
      ) {
        this.makeToast(
          this.$t("toorganizationidNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      // if (
      //   self.Appeal.appealsatisfactiontypeid === 0 ||
      //   self.Appeal.appealsatisfactiontypeid === null ||
      //   self.Appeal.appealsatisfactiontypeid === undefined ||
      //   self.Appeal.appealsatisfactiontypeid === ""
      // ) {
      //   this.makeToast(
      //     this.$t("appealsatisfactiontypeNotCorrect"),
      //     this.$t("Error"),
      //     "danger"
      //   );
      //   return false;
      // }
      if (
        self.Appeal.appealpurposeid === 0 ||
        self.Appeal.appealpurposeid === null ||
        self.Appeal.appealpurposeid === undefined ||
        self.Appeal.appealpurposeid === ""
      ) {
        this.makeToast(
          this.$t("appealpurposeNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.Appeal.details === 0 ||
        self.Appeal.details === null ||
        self.Appeal.details === undefined ||
        self.Appeal.details === ""
      ) {
        this.makeToast(this.$t("detailNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      self.SaveLoading = true;
      self.issavedisabled = true;
      AppealService.Update(self.Appeal)
        .then((res) => {
          self.SaveLoading = false;
          self.$makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Appeal" });
        })
        .catch((error) => {
          self.issavedisabled = false;
          self.SaveLoading = false;
          self.$makeToast(
            error.response.data.error,
            self.$t("message"),
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
        solid: true,
      });
    },
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
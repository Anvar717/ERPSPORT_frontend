<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center">{{ $t("sportcompetitionjurystaffing") }}</h4>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col class="text-right mr-0 pr-0">
          <b-button variant="primary" @click="OpenRefereeModal">
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col lg="12" class="p-0">
          <b-table
            :fields="Fields"
            :items="sportcompetitionjurystaffing"
            class="bg-color-table text-center p-0"
            style="vertical-align: middle"
            bordered
            responsive="sm"
            :tbody-tr-class="rowClass"
          >
            <template v-slot:empty>
              <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:cell(index)="{ index }">
              <p class="m-0">
                {{ index + 1 }}
              </p>
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
    </b-card>
    <b-modal
      v-model="CompetitionModal"
      hide-footer
      size="lg"
      no-close-on-backdrop
      modal-class="custom-size-modal"
      :title="$t('sportcompetitionjurystaffing')"
    >
      <!-- <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("qualificationcategory") }} </label>
          <v-select
            :options="qualificationcategorylist"
            v-model="page3.qualificationcategoryid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{ $t("position") }}</label>
            <div class="d-flex col-sm-9">
              <v-select
                :options="positionlist"
                 class="w-100"
                v-model="page3.positionid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="name"
              ></v-select>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{
              $t("qualificationcategory")
            }}</label>
            <div class="d-flex col-sm-9">
              <v-select
               class="w-100"
            :options="qualificationcategorylist"
            v-model="page3.qualificationcategoryid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
          <b-col>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-3">
                {{ $t("Quantity") }}
              </label>
              <div class="col-sm-9 d-flex">
                <b-form-input
                  type="number"
                 class="w-100"
                  v-model="page3.quentity"
                ></b-form-input>
              </div>
            </div>
          </b-col>
        </b-row>
      <c-row class="mt-2">
        <c-col class="text-center">
          <b-button
            class="mr-2"
            variant="danger"
            @click="CloseCompetitionTableModal"
          >
            {{ $t("back") }}
          </b-button>
          <b-button variant="primary" @click="AddCompetitionTable">
            {{ $t("Add") }}
          </b-button>
        </c-col>
      </c-row>
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
import DatePicker from "vue2-datepicker";
import vSelect from "vue-select";
import PositionService from "@/services/Position.service";
import QualificationCategoryService from "@/services/QualificationCategory.service";
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
  },
  props: {
    sportcompetitionjurystaffing: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      show: false,
      page3: {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quentity: 0,
        statusid: 0,
        statusnames: "",
        Status: 1,
      },
      coachvalue:{},
      CompetitionModal: false,
      editedIndex: -1,
      financialyearlist: [],
      sporttypeclassifierlist: [],
      competitionlevellist: [],
      sporteventtypelist: [],
      sporteventlist: [],
      positionlist: [],
      qualificationcategorylist: [],
      regionlist: [],
      organizationlist: [],
      lang: "ru",
      Fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "positionname",
          label: this.$t("position"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "qualificationcategoryname",
          label: this.$t("qualificationcategory"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "quentity",
          label: this.$t("membercount"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
    };
  },
  created() {
    this.show = true;
    this.lang = localStorage.getItem("locale") || "ru";
    PositionService.GetAll(0, 0, false, 0)
      .then((res) => {
        this.positionlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    QualificationCategoryService.GetAll(this.lang)
      .then((res) => {
        this.qualificationcategorylist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    this.show = false;
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    //  OpenCoachModal() {
    //   this.$bvModal.show("CoachModal");
    // },
    // SelectedItemCoach(data) {
    //   this.coachvalue = data;
    // },
    // AddCoachData(data) {
    //   this.page3.personname = data.fullname;
    //   this.page3.personid = data.id;
    //   this.CloseCoachModal();
    // },
    // CloseCoachModal() {
    //   this.$bvModal.hide("CoachModal");
    // },
    OpenRefereeModal() {
      this.CompetitionModal = true;
      this.page3 = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quentity: 0,
        statusid: 0,
        statusnames: "",
        Status: 1,
      };
    },
    CloseCompetitionTableModal() {
      this.CompetitionModal = false;
      this.$nextTick(() => {
        this.page3 = {
          id: 0,
          ownerid: 0,
          positionid: 0,
          positionname: "",
          qualificationcategoryid: 0,
          qualificationcategoryname: "",
          quentity: 0,
          statusid: 0,
          statusnames: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.sportcompetitionjurystaffing.indexOf(item);
      this.page3 = Object.assign({}, item);
      this.CompetitionModal = true;
    },
    AddCompetitionTable() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      if (!!self.page3.positionid) {
        self.page3.positionname = self.positionlist.filter(
          (item) => item.id === self.page3.positionid
        )[0].name;
      }
      if (!!self.page3.qualificationcategoryid) {
        self.page3.qualificationcategoryname =
          self.qualificationcategorylist.filter(
            (item) => item.id === self.page3.qualificationcategoryid
          )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.sportcompetitionjurystaffing[self.editedIndex],
          self.page3
        );
      } else {
        self.sportcompetitionjurystaffing.push(self.page3);
      }
      self.page3 = {
        id: 0,
        ownerid: 0,
        positionid: 0,
        positionname: "",
        qualificationcategoryid: 0,
        qualificationcategoryname: "",
        quentity: 0,
        statusid: 0,
        statusnames: "",
        Status: 1,
      };
      self.editedIndex = -1;
      self.CompetitionModal = false;
    },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    check() {
      var self = this;

      if (
        self.page3.positionid === 0 ||
        self.page3.positionid === null ||
        self.page3.positionid === undefined ||
        self.page3.positionid === ""
      ) {
        this.makeToast(
          this.$t("positionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page3.qualificationcategoryid === 0 ||
        self.page3.qualificationcategoryid === null ||
        self.page3.qualificationcategoryid === undefined ||
        self.page3.qualificationcategoryid === ""
      ) {
        this.makeToast(
          this.$t("qualificationcategoryNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page3.quentity === 0 ||
        self.page3.quentity === null ||
        self.page3.quentity === undefined ||
        self.page3.quentity === ""
      ) {
        this.makeToast(
          this.$t("quantityNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      return true;
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
.divider {
  margin-top: 15px;
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
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
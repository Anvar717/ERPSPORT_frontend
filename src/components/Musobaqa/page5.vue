<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center">
            {{ $t("sportcompetitionparticipantrequirement") }}
          </h4>
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
            :items="sportcompetitionparticipantrequirement"
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
      :title="$t('sportcompetitionparticipantrequirement')"
    >
      <!-- <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("qualificationcategory") }} </label>
          <v-select
            :options="sporttitlelist"
            v-model="page5.sporttitleid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{ $t("gender") }}</label>
            <div class="d-flex col-sm-9">
              <v-select
                :options="genderlist"
                class="w-100"
                v-model="page5.genderid"
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
            <label class="col-form-label col-sm-3">{{ $t("minage") }}</label>
            <div class="d-flex col-sm-9">
              <CInput
                style="width: 100%"
                @input="changeminage"
                :placeholder="$t('minage')"
                v-model="page5.minage"
              ></CInput>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{ $t("maxage") }}</label>
            <div class="d-flex col-sm-9">
              <CInput
                style="width: 100%"
                @input="changemaxage"
                :placeholder="$t('maxage')"
                v-model="page5.maxage"
              ></CInput>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{
              $t("sporttitle1")
            }}</label>
            <div class="d-flex col-sm-9">
              <v-select
                class="w-100"
                :options="sporttitlelist"
                v-model="page5.sporttitleid"
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
              $t("maxprogramsamount")
            }}</label>
            <div class="d-flex col-sm-9">
              <CInput
                style="width: 100%"
                :placeholder="$t('maxprogramsamount')"
                v-model="page5.maxprogramsamount"
              ></CInput>
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
import HelperService from "@/services/helper.service";
import SportTitleService from "@/services/SportTitle.service";
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
    sportcompetitionparticipantrequirement: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      show: false,
      page5: {
        id: 0,
        ownerid: 0,
        genderid: 0,
        gendername: "",
        minage: 0,
        maxage: 0,
        sporttitleid: 0,
        sporttitlename: "",
        maxprogramsamount: 0,
        statusid: 0,
        statusname: "",
        Status: 1,
      },
      coachvalue: {},
      CompetitionModal: false,
      editedIndex: -1,
      genderlist: [],
      sporttitlelist: [],
      lang: "ru",
      Fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "minage",
          label: this.$t("minage"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "maxage",
          label: this.$t("maxage"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporttitlename",
          label: this.$t("sporttitle1"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "maxprogramsamount",
          label: this.$t("maxprogramsamount"),
          thClass: "text-center",
          tdClass: "text-centers",
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
    HelperService.GetGenderList(this.lang)
      .then((res) => {
        this.genderlist = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, this.$t("Error"), "danger");
      });
    SportTitleService.GetAll(this.lang)
      .then((res) => {
        this.sporttitlelist = res.data;
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
    // changeminage() {
    //   if (!!this.page5.minage && !!this.page5.maxage) {
    //     if (this.page5.minage > this.page5.maxage) {
    //       this.page5.minage = this.page5.maxage -1
    //     }
    //   }
    // },
    // changemaxage() {
    //   if (!!this.page5.minage && !!this.page5.maxage) {
    //     console.log(this.page5.minage, this.page5.maxage)
    //     if (this.page5.minage > this.page5.maxage) {
    //       this.page5.maxage = this.page5.minage + 1
    //     }
    //   }
    // },
    OpenRefereeModal() {
      this.CompetitionModal = true;
      this.page5 = {
        id: 0,
        ownerid: 0,
        genderid: 0,
        gendername: "",
        minage: 0,
        maxage: 0,
        sporttitleid: 0,
        sporttitlename: "",
        maxprogramsamount: 0,
        statusid: 0,
        statusname: "",
        Status: 1,
      };
    },
    CloseCompetitionTableModal() {
      this.CompetitionModal = false;
      this.$nextTick(() => {
        this.page5 = {
          id: 0,
          ownerid: 0,
          genderid: 0,
          gendername: "",
          minage: 0,
          maxage: 0,
          sporttitleid: 0,
          sporttitlename: "",
          maxprogramsamount: 0,
          statusid: 0,
          statusname: "",
          Status: 1,
        };
        this.editedIndex = -1;
      });
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex =
        this.sportcompetitionparticipantrequirement.indexOf(item);
      this.page5 = Object.assign({}, item);
      this.CompetitionModal = true;
    },
    AddCompetitionTable() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      if (!!self.page5.genderid) {
        self.page5.gendername = self.genderlist.filter(
          (item) => item.id === self.page5.genderid
        )[0].name;
      }
      if (!!self.page5.sporttitleid) {
        self.page5.sporttitlename = self.sporttitlelist.filter(
          (item) => item.id === self.page5.sporttitleid
        )[0].name;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.sportcompetitionparticipantrequirement[self.editedIndex],
          self.page5
        );
      } else {
        self.sportcompetitionparticipantrequirement.push(self.page5);
      }
      self.page5 = {
        id: 0,
        ownerid: 0,
        genderid: 0,
        gendername: "",
        minage: 0,
        maxage: 0,
        sporttitleid: 0,
        sporttitlename: "",
        maxprogramsamount: 0,
        statusid: 0,
        statusname: "",
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
        self.page5.genderid === 0 ||
        self.page5.genderid === null ||
        self.page5.genderid === undefined ||
        self.page5.genderid === ""
      ) {
        this.makeToast(
          this.$t("positionNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page5.minage === 0 ||
        self.page5.minage === null ||
        self.page5.minage === undefined ||
        self.page5.minage === ""
      ) {
        this.makeToast(this.$t("minageNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.page5.maxage === 0 ||
        self.page5.maxage === null ||
        self.page5.maxage === undefined ||
        self.page5.maxage === ""
      ) {
        this.makeToast(this.$t("maxageNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      if (
        self.page5.sporttitleid === 0 ||
        self.page5.sporttitleid === null ||
        self.page5.sporttitleid === undefined ||
        self.page5.sporttitleid === ""
      ) {
        this.makeToast(
          this.$t("sporttitleNotSelected"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.page5.maxprogramsamount === 0 ||
        self.page5.maxprogramsamount === null ||
        self.page5.maxprogramsamount === undefined ||
        self.page5.maxprogramsamount === ""
      ) {
        this.makeToast(
          this.$t("maxprogramsamountNotCorrect"),
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
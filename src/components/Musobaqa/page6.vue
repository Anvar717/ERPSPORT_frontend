<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <h4 class="text-center">{{ $t("sportcompetitionsportdiscipline") }}</h4>
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
            :items="sportcompetitionsportdiscipline"
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
      :title="$t('sportcompetitionsportdiscipline')"
    >
      <!-- <b-col sm="12" md="4" class="mt-2">
          <label for=""> {{ $t("qualificationcategory") }} </label>
          <v-select
            :options="sporttitlelist"
            v-model="page6.sporttitleid"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
          ></v-select>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-3">{{
              $t("sporttypeclassifierdiscipline")
            }}</label>
            <div class="d-flex col-sm-9">
              <v-select
                :options="sporttypeclassifierdisciplinelist"
                class="w-100"
                v-model="page6.sporttypeclassifierdisciplineid"
                :reduce="(item) => item.id"
                :placeholder="$t('ChooseBelow')"
                label="sporttypeclassifierdisciplinename"
              ></v-select>
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
import SportTypeClassifierService from "@/services/SportTypeClassifier.service";
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
    id: {
      type: Number,
      default: 0,
    },
    sportcompetitionsportdiscipline: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      show: false,
      page6: {
        id: 0,
        ownerid: 0,
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        statusid: 0,
        statusname: "",
        Status: 1,
      },
      coachvalue: {},
      CompetitionModal: false,
      editedIndex: -1,
      sporttypeclassifierdisciplinelist: [],
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
          key: "sporttypeclassifierdisciplinename",
          label: this.$t("sporttypeclassifierdiscipline"),
          thClass: "text-center",
          tdClass: "text-left",
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
    this.show = false;
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenRefereeModal() {
      this.CompetitionModal = true;
      SportTypeClassifierService.GetAllSportTypeClassifierDiscipLine(this.id)
        .then((res) => {
          this.sporttypeclassifierdisciplinelist = res.data;
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, this.$t("Error"), "danger");
        });
      this.page6 = {
        id: 0,
        ownerid: 0,
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
        statusid: 0,
        statusname: "",
        Status: 1,
      };
    },
    CloseCompetitionTableModal() {
      this.CompetitionModal = false;
      this.$nextTick(() => {
        this.page6 = {
          id: 0,
          ownerid: 0,
          sporttypeclassifierdisciplineid: 0,
          sporttypeclassifierdisciplinename: "",
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
      this.editedIndex = this.sportcompetitionsportdiscipline.indexOf(item);
      this.page6 = Object.assign({}, item);
      this.CompetitionModal = true;
    },
    AddCompetitionTable() {
      var self = this;
      if (!self.check()) {
        return false;
      }
      if (!!self.page6.sporttypeclassifierdisciplineid) {
        self.page6.sporttypeclassifierdisciplinename =
          self.sporttypeclassifierdisciplinelist.filter(
            (item) => item.id === self.page6.sporttypeclassifierdisciplineid
          )[0].sporttypeclassifierdisciplinename;
      }
      if (self.editedIndex > -1) {
        Object.assign(
          self.sportcompetitionsportdiscipline[self.editedIndex],
          self.page6
        );
      } else {
        self.sportcompetitionsportdiscipline.push(self.page6);
      }
      self.page6 = {
        id: 0,
        ownerid: 0,
        sporttypeclassifierdisciplineid: 0,
        sporttypeclassifierdisciplinename: "",
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
        self.page6.sporttypeclassifierdisciplineid === 0 ||
        self.page6.sporttypeclassifierdisciplineid === null ||
        self.page6.sporttypeclassifierdisciplineid === undefined ||
        self.page6.sporttypeclassifierdisciplineid === ""
      ) {
        this.makeToast(
          this.$t("sporttypeclassifierdisciplineidNotCorrect"),
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
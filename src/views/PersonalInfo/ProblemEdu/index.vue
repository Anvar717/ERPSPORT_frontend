<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 v-if="typeid === 1" class="text-center mt-3">
          {{ $t("ProblemEdu") }}
        </h3>
        <h3 v-if="typeid === 2" class="text-center mt-3">
          {{ $t("SuggestionsEdu") }}
        </h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('search')"
                autocomplete="text"
                v-model="filter.Search"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    variant="outline"
                    type="button"
                    color="primary"
                  >
                    <b-icon-search />
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-8" for>{{
                  $t("NotAnswer")
                }}</label>
                <b-form-checkbox
                  v-model="filter.NotAnswer"
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </div>
            </CCol>
            <CCol lg="1" md="1" sm="1" class="text-left mt-2 pl-0">
              <CButton
                @click="Refresh"
                size="sm"
                color="primary"
                variant="outline"
                style="height:35px"
              >
                <b-icon-arrow-repeat />
              </CButton>
            </CCol>
            <CCol lg="6" md="5" sm="12" class="text-lg-right mt-2">
              <CButton
                v-if="
                  typeid
                    ? $can('ProblemEduEdit', 'permissions')
                    : $can('SuggestionsEduEdit', 'permissions')
                "
                @click="Create"
                color="primary"
                variant="outline"
                class="mr-2"
                size="sm"
              >
                <b-icon-plus />
                &nbsp; {{ $t("Create") }}
              </CButton>
              <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon-arrow-left-short />
                {{ $t("back") }}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <b-table
            :fields="fields"
            :items="items"
            small="small"
            responsive="sm"
            class="generalTableClass"
            show-empty
            :busy="isBusy"
            :current-page="filter.PageNumber"
            @row-dblclicked="Edit"
            @row-clicked="rowclicked"
           
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(id)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('id')"
              >
                {{ $t("id") }}
                <b-icon v-if="filter.SortColumn === 'id'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(directionname)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('directionname')"
              >
                {{ $t("directionname") }}
                <b-icon v-if="filter.SortColumn === 'directionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(questiontext)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('questiontext')"
              >
                {{ $t("questiontext") }}
                <b-icon v-if="filter.SortColumn === 'questiontext'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(fordepartment)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('fordepartment')"
              >
                {{ $t("fordepartment") }}
                <b-icon v-if="filter.SortColumn === 'fordepartment'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template style="width:2%" v-slot:head(answertext)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('answertext')"
              >
                {{ $t("answertext") }}
                <b-icon v-if="filter.SortColumn === 'answertext'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(answeredby)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('answeredby')"
              >
                {{ $t("answeredby") }}
                <b-icon v-if="filter.SortColumn === 'answeredby'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(dateofanswer)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('dateofanswer')"
              >
                {{ $t("dateofanswer") }}
                <b-icon v-if="filter.SortColumn === 'dateofanswer'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(status)>
              <div
                class="text-center"
                style="cursor : pointer"
                @click="ChangeSort('status')"
              >
                {{ $t("status") }}
                <b-icon v-if="filter.SortColumn === 'status'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>

            <template v-slot:cell(actions)="{ item }">
              <div class="text-center">
                <b-link
                  v-if="
                    typeid
                      ? $can('ProblemEduEdit', 'permissions')
                      : $can('SuggestionsEduEdit', 'permissions')
                  "
                  @click="Edit(item)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Edit') }"
                >
                  <b-icon icon="pencil" ></b-icon>
                </b-link>
                <b-link
                  v-if="
                    typeid
                      ? $can('ProblemEduDelete', 'permissions')
                      : $can('SuggestionsEduDelete', 'permissions')
                  "
                  @click="$bvModal.show('DeleteModal' + item.id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash" ></b-icon>
                </b-link>
              </div>
              <b-modal :id="'DeleteModal' + item.id" hide-footer>
                <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                <div class="d-block text-right">
                  <CButton
                    @click="$bvModal.hide('DeleteModal' + item.id)"
                    color="danger"
                    class="mr-2"
                  >
                    <b-icon icon="x"></b-icon>
                    {{ $t("NotAccept") }}
                  </CButton>
                  <CButton @click="Delete(item)" color="success">
                    <b-icon icon="check2"></b-icon>
                    {{ $t("Accept") }}
                  </CButton>
                </div>
              </b-modal>
            </template>
            <template #cell(status)="{item}">
              <CBadge :color="getItemColor(item.status)">{{
                item.status
              }}</CBadge>
            </template>
            <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
            <template v-slot:table-busy>
              <div
                class="text-center text-primary my-2"
                style="vertical-align:middle"
              >
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{ $t("Loading") }}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{ $t("RecordsFrom") }} {{ firstNumber }} {{ $t("by") }}
              {{ lastNumber }} {{ $t("of") }}
              {{ totalRows }}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="perPageSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">
              {{ $t("RecordsPerPage") }}
            </div>
            <div style="float:right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ProblemEduService from "@/services/ProblemEdu.service";
import { BFormCheckbox,BIconPlus,BIconSearch,BIconArrowRepeat,BIconArrowLeftShort,BTable,BPagination,BFormSelect,BSpinner,BLink } from 'bootstrap-vue'
export default {
  components : {BFormCheckbox,BIconPlus,BIconSearch,BIconArrowRepeat,BIconArrowLeftShort,BTable,BPagination,BFormSelect,BSpinner,BLink },
  props: {
    typeid: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "id",
          label: this.$t("id"),
          sortable: false,
        },
        ,
        {
          key: "directionname",
          label: this.$t("directionname"),
          sortable: false,
        },
        {
          key: "questiontext",
          label: this.$t("questiontext"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "fordepartment",
          label: this.$t("fordepartment"),
          sortable: false,
        },
        {
          key: "answertext",
          label: this.$t("answertext"),
          sortable: false,
          class: "text-left",
        },
        {
          key: "answeredby",
          label: this.$t("answeredby"),
          sortable: false,
        },
        {
          key: "dateofanswer",
          label: this.$t("dateofanswer"),
          sortable: false,
        },
        {
          key: "status",
          label: this.$t("status"),
          sortable: false,
        },
      ],
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        Search: "",
        NotAnswer: false,
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
      },
    };
  },
  created() {
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  methods: {
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Create() {
      this.$router.push(
        this.typeid == 1
          ? `/ProblemEdu/ProblemEdu/edit/id=0`
          : "/ProblemEdu/SuggestionsEdu/edit/id=0"
      );
    },
    Edit(item) {
      this.$router.push(
        this.typeid == 1
          ? `/ProblemEdu/ProblemEdu/edit/id=${item.id}`
          : `/ProblemEdu/SuggestionsEdu/edit/id=${item.id}`
      );
    },
    Delete(item) {
      ProblemEduService.Delete(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.Refresh();
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      ProblemEduService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.typeid,
        this.filter.NotAnswer
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data.rows;
        this.totalRows = res.data.total;
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
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      },
    },
    typeid: {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>

<style></style>

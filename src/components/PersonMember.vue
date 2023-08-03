<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col class="text-right">
        <CRow class="form-group">
          <CCol lg="4" md="6" sm="6" xs="4" class="text-left mt-2">
            <CInput
              :placeholder="$t('search')"
              autocomplete="text"
              v-model="filter.Search"
              v-on:keyup.enter="Refresh"
            >
              <template #append>
                <CButton
                  @click="Refresh"
                  size="sm"
                  variant="outline"
                  type="button"
                  color="primary"
                >
                  <b-icon icon="search"></b-icon>
                  {{ $t("search") }}
                </CButton>
              </template>
            </CInput>
          </CCol>
          <CCol lg="8" md="2" sm="2" xs="4" class="text-left mt-2 pl-0">
            <div class="person-member-btn ml-3">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  variant="outline"
                  style="height: 35px"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                </CButton>
                <CButton
                  v-if="$can('PersonMemberEdit', 'permissions')"
                  @click="create"
                  color="primary"
                  variant="outline"
                  class="mr-2 ml-3"
                  size="sm"
                >
                  <b-icon icon="plus"> </b-icon>
                  &nbsp; {{ $t("Create") }}
                </CButton>
            </div>
          </CCol>
          <!-- <CCol lg="7" md="4" sm="4" xs="4" class="text-lg-right mt-2"></CCol> -->
        </CRow>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <vs-table
          :data="MemberList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border: 1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <vs-th sort-key="id">
              {{ $t("id") }}
            </vs-th>
            <!-- <vs-th sort-key="inn" v-if="persontypeid == 2">
              {{ $t("inn") }}
            </vs-th> -->
            <vs-th sort-key="fullname">
              {{ $t("fullname") }}
            </vs-th>
            <vs-th sort-key="dateofbirth">
              {{ $t("dateofbirth") }}
            </vs-th>
            <vs-th sort-key="gendername">
              {{ $t("gender") }}
            </vs-th>
            <vs-th sort-key="pinfl">
              {{ $t("pinfl") }}
            </vs-th>
            <vs-th sort-key="documentseries">
              {{ $t("documentseries") }}
            </vs-th>
            <vs-th sort-key="documentnumber">
              {{ $t("documentnumber") }}
            </vs-th>
            <vs-th sort-key="hasfile">
              {{ $t("image") }}
            </vs-th>
            <vs-th sort-key="actions">
              {{ $t("actions") }}
            </vs-th>
          </template>
          <template
            slot-scope="{ data }"
            style="overflow-y: scroll; height: 400px"
          >
            <vs-tr v-if="Loading" class="text-center">
              <vs-td colspan="10"
                ><b-spinner variant="primary"></b-spinner
              ></vs-td>
            </vs-tr>
            <vs-tr
              :data="tr"
              :key="indextr"
              v-for="(tr, indextr) in data"
              v-show="!Loading"
              @dblclick.native="$emit('DblClick', tr)"
            >
              <vs-td :data="data[indextr].id">
                {{ data[indextr].id }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id" v-if="persontypeid == 2">
                {{ data[indextr].inn }}
              </vs-td> -->
              <vs-td :data="data[indextr].id">
                {{ data[indextr].fullname }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].dateofbirth }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].gendername }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].pinfl }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentseries }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].documentnumber }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                <div>
                  <b-badge :variant="getItemColor(data[indextr].hasfile)">{{
                    data[indextr].hasfile ? "Да" : "Нет"
                  }}</b-badge>
                </div>
              </vs-td>
              <vs-td :data="data[indextr].id" style="width: 34px">
                <div class="text-center">
                  <b-link
                    v-if="$can('PersonMemberEdit', 'permissions')"
                    @click="Edit(data[indextr])"
                    class="mr-2"
                  >
                    <!-- <b-icon icon="pencil"></b-icon> -->
                    <b-button variant="primary">
                      {{ $t("Edit") }}
                    </b-button>
                  </b-link>
                  <!-- <b-link
                v-if="$can('PersonMemberDelete', 'permissions')"
                  @click="$bvModal.show('DeleteModal' + data[indextr].id)"
                  class="mr-2"
                  v-c-tooltip="{ content: $t('Delete') }"
                >
                  <b-icon icon="trash"></b-icon>
                </b-link> -->
                </div>
                <b-modal :id="'DeleteModal' + data[indextr].id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('DeleteModal' + data[indextr].id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x"></b-icon>
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Delete(data[indextr])" color="success">
                      <b-icon icon="check2"></b-icon>
                      {{ $t("Accept") }}
                    </CButton>
                  </div>
                </b-modal>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="my-3 personList-pagination justify-content-between d-flex align-items-center">
          <div style="white-space: nowrap" class="col-sm-6">
            <div class="pagination-number" style="float: left; font-size: 12px">
              {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
              {{ this.lastNumber }} {{ $t("of") }}
              {{ this.totalRows }}
            </div>
            <div class="page-limit">
              <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                <b-form-select
                  v-model="filter.PageLimit"
                  id="PageLimitSelect"
                  size="sm"
                  :options="filter.pageOptions"
                ></b-form-select>
              </div>
              <div class="per-page" style="float: left; font-size: 12px">
                {{ $t("RecordsPerPage") }}
              </div>
            </div>
          </div>
          <b-pagination
            class="text-right mobile-pagination"
            v-model="filter.PageNumber"
            :total-rows="totalRows"
            :per-page="filter.PageLimit"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
    <b-modal
      ref="my-modal"
      size="xl"
      v-model="createModal"
      hide-footer
      hide-header
      no-close-on-backdrop
    >
      <header class="modal-header">
        <h5 class="modal-title">{{ $t("Employee") }}</h5>
        <button
          type="button"
          aria-label="Close"
          class="close"
          @click="showModal('createModal', false)"
        >
          ×
        </button>
      </header>
      <div class="modal-body">
        <Edit-Person-Component
          :show-back-button="false"
          @success="studentCreated($event)"
          :editid="edititem.id"
        ></Edit-Person-Component>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import PersonMemberService from "@/services/PersonMember.service";
import EditPersonComponent from "@/components/EditPersonMember";
export default {
  components: { EditPersonComponent },
  data() {
    return {
      filter: {
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageLimit: 20,
        pageOptions: [20, 50, 100, 200],
        PageNumber: 1,
      },
      MemberList: [],
      selected: [],
      edititem: {
        id: 0,
      },
      totalRows: 0,
      Loading: false,
      createModal: false,
    };
  },
  created() {
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
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
    Refresh() {
      this.Loading = true;
      PersonMemberService.GetList(
        0,
        0,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.MemberList = res.data.rows;
        this.totalRows = res.data.total;
        this.Loading = false;
      });
    },
    create() {
      this.showModal("createModal", true);
    },
    getItemColor(text) {
      return text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === "Отменено"
        ? "danger"
        : "danger";
    },
    Edit(item) {
      this.edititem.id = item.id;
      this.showModal("createModal", item.id, true);
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
    Delete(item) {
      PersonMemberService.Delete(item.id)
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
    studentCreated(data) {
      data;
      this.showModal("createModal", false);
      if (data.success) {
        this.Refresh();
      }
    },
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
      // console.log(this.selected)
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        this.Refresh();
      },
    },
  },
};
</script>

<style>
.vs-pagination--ul {
  margin-bottom: 0;
}
</style>

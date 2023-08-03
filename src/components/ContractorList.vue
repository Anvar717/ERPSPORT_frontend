<template>
  <b-container fluid>
    <b-row>
      <b-col class="text-center mb-2">
        <h4>{{ $t("contractorname") }}</h4>
      </b-col>
    </b-row>
    <b-row>
      <CCol lg="4" md="4" sm="11" class="text-left">
              <custom-search v-model="filter.Search" @search="Search"></custom-search>
            </CCol>
      <!-- <b-col>
        <CInput
          :placeholder="$t('search')"
          v-model="filter.Search"
          v-on:keyup.enter="Refresh"
        >
          <template #append>
            <CButton @click="Refresh" size="sm" type="button" color="primary">
              <b-icon icon="search"></b-icon>
              {{ $t("search") }}
            </CButton>
          </template>
        </CInput>
      </b-col>
      <b-col>
        <b-button @click="Refresh" variant="primary">
          <b-icon icon="arrow-clockwise"></b-icon>
        </b-button>
      </b-col> -->
      <b-col class="text-right">
        <b-button variant="primary" @click="AddModal"
          >{{ $t("Add") }} <b-icon icon="plus"></b-icon
        ></b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <vs-table
          :data="ContractorList"
          @sort="handleSort"
          @selected="SelectedItem"
          v-model="selected"
          style="border:1px solid #eee"
          :max-items="filter.PageLimit"
        >
          <template slot="thead">
            <vs-th sort-key="actions" v-if="!component">
              {{ $t("actions") }}
            </vs-th>
            <vs-th sort-key="inn">
              {{ $t("inn") }}
            </vs-th>
            <vs-th sort-key="shortname">
              {{ $t("shortname") }}
            </vs-th>
            <vs-th sort-key="fullname">
              {{ $t("fullname") }}
            </vs-th>
            <vs-th sort-key="vatcode">
              {{ $t("vatcode") }}
            </vs-th>
            <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->
            <vs-th sort-key="adress">
              {{ $t("adress") }}
            </vs-th>
            <vs-th sort-key="contactinfo">
              {{ $t("contactinfo") }}
            </vs-th>
            <vs-th sort-key="mobilenumber">
              {{ $t("mobilenumber") }}
            </vs-th>
            <!-- <vs-th sort-key="workschedule">
                        {{$t('workschedule')}}
                    </vs-th> -->
          </template>
          <template v-slot:empty>
              <h5 class="text-center">{{ $t("NoItems") }}</h5>
            </template>
          <template
            slot-scope="{ data }"
            style="overflow-y:scroll;height:400px"
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
              @dblclick.native="dblclick(tr)"
            >
              <vs-td :data="data[indextr].id" v-if="!component">
                <div class="text-center">
                  <b-link
                    @click="EditItem(tr)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil" size="sm" />
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem(tr)"
                  >
                    <b-icon icon="trash" size="sm" />
                  </b-link>
                </div>
                <b-modal :id="'DeleteModal' + tr.id" hide-footer>
                  <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
                  <div class="d-block text-right">
                    <CButton
                      @click="$bvModal.hide('DeleteModal' + tr.id)"
                      color="danger"
                      class="mr-2"
                    >
                      <b-icon icon="x" />
                      {{ $t("NotAccept") }}
                    </CButton>
                    <CButton @click="Delete(tr)" color="success">
                      <b-icon icon="check2" />
                      {{ $t("Approve") }}
                    </CButton>
                  </div>
                </b-modal>
              </vs-td>
              <vs-td :data="data[indextr].inn">
                {{ data[indextr].inn }}
              </vs-td>
              <vs-td :data="data[indextr].shortname">
                {{ data[indextr].shortname }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].fullname }}
              </vs-td>

              <vs-td :data="data[indextr].id">
                {{ data[indextr].vatcode }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->
              <vs-td :data="data[indextr].id">
                {{ data[indextr].adress }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].contactinfo }}
              </vs-td>
              <vs-td :data="data[indextr].id">
                {{ data[indextr].mobilenumber }}
              </vs-td>
              <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].workschedule}}
                            </vs-td> -->
            </vs-tr>
          </template>
        </vs-table>
        <div class="my-3 justify-content-between d-flex align-items-center">
          <span></span>
          <b-pagination
            v-model="filter.PageNumber"
            :total-rows="totalItems"
            :per-page="filter.PageLimit"
          ></b-pagination>
        </div>
      </b-col>
      <b-modal
        id="modalContractor"
        size="xl"
        :title="$t('Contractor')"
        hide-footer
        no-close-on-backdrop
        modal-class="custom-size-modal"
      >
        <edit-contractor-component
          component
          @Success="SaveContractor"
        ></edit-contractor-component>
      </b-modal>
    </b-row>
  </b-container>
</template>

<script>
import ContractorService from "@/services/Contractor.service";
import editContractorComponent from "@/views/Info/Contractor/edit";
export default {
  props: {
    component: {
      type: Boolean,
      default: false,
    },
  },
  components: { editContractorComponent },
  data: () => ({
    filter: {
      Search: "",
      SortColumn: "",
      OrderType: "asc",
      PageNumber: 1,
      PageLimit: 10,
    },
    Loading: false,
    ContractorList: [],
    selected: [],
    totalItems: 0,
    createModal: false,
  }),
  created() {
    this.Refresh();
  },
  methods: {
    handleSort(key, active) {},
    SelectedItem() {
      this.$emit("SelectedItem", this.selected);
    },
    Refresh() {
      this.Loading = true;
      ContractorService.GetList(
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      ).then((res) => {
        this.ContractorList = res.data.rows;
        this.Loading = false;
        this.totalItems = res.data.total;
      });
    },
    AddModal() {
      if (this.component) {
        this.$bvModal.show("modalContractor");
      } else {
        this.$router.push({ name: "EditContractor", params: { id: 0 } });
      }
    },
    EditItem(item) {
      this.$router.push({ name: "EditContractor", params: { id: item.id } });
    },
    DeleteItem(item) {
      this.$bvModal.show("DeleteModalDeleteModal" + item.id);
    },
    Delete(item) {
      ContractorService.Delete(item.id)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.$bvModal.hide("DeleteModal" + item.id);
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
    makeToast(message, title, type) {
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    dblclick(item) {
      if (this.component) {
        this.$emit("DblClick", item);
      } else {
        this.$router.push({ name: "EditContractor", params: { id: item.id } });
      }
    },
    CloseContractorModal() {
      this.$bvModal.hide("modalContractor");
    },
    SaveContractor(data) {
      if (data.id > 0) {
        this.$bvModal.hide("modalContractor");
        this.Refresh();
      }
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

<style></style>

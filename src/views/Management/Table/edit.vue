<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("Table") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow class="mt-n1">
            <CCol sm="4">
              <label>{{ $t("shortname") }}</label>
              <CInput
                :placeholder="$t('shortname')"
                autocomplete="shortname"
                v-model="Table.shortname"
                disabled
              >
              </CInput>
            </CCol>
            <CCol sm="4">
              <label>{{ $t("fullname") }}</label>
              <CInput
                :placeholder="$t('fullname')"
                autocomplete="fullname"
                v-model="Table.fullname"
                disabled
              >
              </CInput>
            </CCol>
            <CCol sm="4">
              <label>{{ $t("dbtablename") }}</label>
              <CInput
                :placeholder="$t('dbtablename')"
                autocomplete="dbtablename"
                v-model="Table.dbtablename"
                disabled
              >
              </CInput>
            </CCol>
          </CRow>
          <b-row>
            <b-col class="text-right">
              <b-button variant="primary" @click="OpenTabrowModal">
                <b-icon icon="plus"></b-icon> {{ $t("Add") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <b-table
                :fields="fields"
                :items="Table.Tables"
                class="text-center"
                
                style="vertical-align: middle"
                bordered
                responsive
                :tbody-tr-class="rowClass"
                sticky-header="60vh"
                no-border-collapse
                small
              >
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
                <template v-slot:cell(ismultiple)="{ item }">
                <p class="m-0">
                  {{ item.ismultiple === true ? $t("yes") : $t("no") }}
                </p>
              </template>
              <template v-slot:cell(isrequired)="{ item }">
                <p class="m-0">
                  {{ item.isrequired === true ? $t("yes") : $t("no") }}
                </p>
              </template>
              </b-table>
            </b-col>
          </b-row>
          <b-modal
            :title="$t('Table')"
            v-model="tabrowModal"
            size="xl"
            modal-class="custom-size-modal"
            no-close-on-backdrop
            hide-footer
          >
            <CRow class="mt-n1">
              <CCol sm="4">
                <label>{{ $t("Code") }}</label>
                <CInput
                type="number"
                  :placeholder="$t('Code')"
                  autocomplete="ordercode"
                  v-model="tabrow.ordercode"
                >
                </CInput>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("shortname") }}</label>
                <CInput
                  :placeholder="$t('shortname')"
                  autocomplete="shortname"
                  v-model="tabrow.shortname"
                >
                </CInput>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("fullname") }}</label>
                <CInput
                  :placeholder="$t('fullname')"
                  autocomplete="fullname"
                  v-model="tabrow.fullname"
                >
                </CInput>
              </CCol>
            </CRow>
            <CRow class="mt-n1">
              <CCol sm="4">
                <label>{{ $t("isrequired") }}</label>
                <b-form-checkbox
                  v-model="tabrow.isrequired"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("Ismultiple") }}</label>
                <b-form-checkbox
                  v-model="tabrow.ismultiple"
                  switch
                  class="mt-2 ml-1"
                ></b-form-checkbox>
              </CCol>
              <CCol sm="4">
                <label>{{ $t("maxsize") }}</label>
                <CInput
                type="number"
                  :placeholder="$t('maxsize')"
                  autocomplete="maxsize"
                  v-model="tabrow.maxsize"
                >
                </CInput>
              </CCol>
            </CRow>
            <b-row>
              <b-col class="text-right">
                <b-button size="sm" variant="primary" @click="OpenTabrow2Modal">
                  <b-icon icon="plus"></b-icon> {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row>
            <b-table
              :fields="fields1"
              :items="tabrow.Tables1"
              class="text-center mt-3"
              
              style="vertical-align: middle"
              bordered
              responsive
              :tbody-tr-class="rowClass"
              sticky-header="60vh"
              no-border-collapse
              small
            >
              <template #cell(actions)="{ item }">
                <div class="text-center">
                  <b-link
                    @click="EditItem2(item)"
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Edit') }"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-link>
                  <b-link
                    class="mr-2"
                    v-c-tooltip="{ content: $t('Delete') }"
                    @click="DeleteItem2(item)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-link>
                </div>
              </template>
            </b-table>
            <b-modal
              :title="$t('tables1')"
              v-model="tabrow2Modal"
              size="lg"
              modal-class="custom-size-modal"
              no-close-on-backdrop
              hide-footer
            >
              <CRow>
                <CCol>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-4" for>{{
                      $t("fileextension")
                    }}</label>
                    <v-select
                      :options="fileextensionlist"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="tabrow1.fileextensionid"
                      class="col-sm-8"
                    ></v-select>
                  </div>
                </CCol>
              </CRow>
              <b-row class="mt-4">
                <b-col class="text-center">
                  <b-button
                    variant="danger"
                    @click="CloseTabrow1Modal"
                    class="mr-2"
                  >
                    <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
                  </b-button>
                  <b-button variant="success" @click="AddTabrow1">
                    <b-icon icon="check"></b-icon> {{ $t("save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <b-row class="mt-4">
              <b-col class="text-center">
                <b-button
                  variant="danger"
                  @click="CloseTabrowModal"
                  class="mr-2"
                >
                  <b-icon icon="arrow-left"></b-icon> {{ $t("back") }}
                </b-button>
                <b-button variant="success" @click="AddTabrow">
                  <b-icon icon="check"></b-icon> {{ $t("save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-modal>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push(`/Management/Table`)"
              >
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
    </CCol>
  </CRow>
</template>
  
  <script>
import TableService from "@/services/Table.service";
import HelperService from "@/services/helper.service";
export default {
  data() {
    return {
      SaveLoading: false,
      Table: {},
      tabrow: {
        id: 0,
        ownerid: 0,
        ordercode: "",
        shortname: "",
        fullname: "",
        isrequired: true,
        ismultiple: true,
        maxsize: 0,
        Status: 1,
        Tables1: [],
      },
      tabrow1: {
        id: 0,
        ownerid: 0,
        fileextensionid: 0,
        Status: 1,
      },
      tabrowModal: false,
      tabrow2Modal: false,
      fields: [
        {
          key: "ordercode",
          label: this.$t("Code"),
          sortable: false,
        },
        {
          key: "shortname",
          label: this.$t("shortname"),
          sortable: false,
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          sortable: false,
        },
        {
          key: "isrequired",
          label: this.$t("isrequired"),
        },
        {
          key: "ismultiple",
          label: this.$t("Ismultiple"),
        },
        {
          key: "maxsize",
          label: this.$t("maxsize"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      fileextensionlist: [],
      fields1: [
        {
          key: "fileextensionname",
          label: this.$t("fileextensionname"),
          sortable: false,
        },
        {
          key: "actions",
          label: this.$t("actions"),
        },
      ],
      lang: localStorage.getItem("locale") || "ru",
      editedIndex: -1,
    };
  },
  created() {
    TableService.Get(this.$route.params.id).then((res) => {
      this.Table = res.data;
    });
    HelperService.GetFileExtensionList().then((res) => {
      this.fileextensionlist = res.data;
    });
  },
  methods: {
    OpenTabrowModal() {
      this.tabrow = {
        id: 0,
        ownerid: 0,
        ordercode: "",
        shortname: "",
        fullname: "",
        isrequired: true,
        ismultiple: true,
        maxsize: 0,
        Status: 1,
        Tables1: [],
      };
      this.editedIndex = -1;
      this.tabrowModal = true;
    },
    AddTabrow() {
      var self = this;
      if (self.editedIndex > -1) {
        Object.assign(self.Table.Tables[self.editedIndex], self.tabrow);
      } else {
        self.Table.Tables.push(self.tabrow);
      }
      this.tabrowModal = false;
    },
    clearTabrow1() {
      this.$nextTick(() => {
        this.tabrow1 = {
          id: 0,
          ownerid: 0,
          fileextensionid: 0,
          Status: 1,
        };
        this.editedIndex1 = -1;
      });
    },
    OpenTabrow2Modal() {
      this.tabrow1 = {
        id: 0,
        ownerid: 0,
        fileextensionid: 0,
        fileextensionname: "",
        Status: 1,
      };
      this.editedIndex1 = -1;
      this.tabrow2Modal = true;
    },
    AddTabrow1() {
      var self = this;
      if (!!this.tabrow1.fileextensionid) {
        this.tabrow1.fileextensionname = this.fileextensionlist.filter(
          (item) => item.id == this.tabrow1.fileextensionid
        )[0].name;
      }
      if (self.editedIndex1 > -1) {
        Object.assign(self.tabrow.Tables1[self.editedIndex1], self.tabrow1);
      } else {
        self.tabrow.Tables1.push(self.tabrow1);
      }
      this.tabrow2Modal = false;
    },
    CloseTabrowModal() {
      this.tabrowModal = false;
    },
    CloseTabrow1Modal() {
      this.tabrow2Modal = false;
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    EditItem(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex = this.Table.Tables.indexOf(item);
      this.tabrow = Object.assign({}, item);
      this.tabrowModal = true;
    },
    DeleteItem(item) {
      item.Status = 3;
    },
    EditItem2(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      this.editedIndex1 = this.tabrow.Tables1.indexOf(item);
      this.tabrow1 = Object.assign({}, item);
      this.tabrow2Modal = true;
    },
    DeleteItem2(item) {
      item.Status = 3;
    },
    SaveData() {
      this.SaveLoading = true;
      this.tabrow.ownerid = this.$route.params.id
      TableService.Update(this.Table)
        .then((res) => {
          this.makeToast(
            this.$t("SuccessMessage"),
            this.$t("message"),
            "success"
          );
          this.$router.push(`/Management/Table`);
        })
        .catch((error) => {
          this.SaveLoading = false;
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
  },
};
</script>
  
  <style>
</style>
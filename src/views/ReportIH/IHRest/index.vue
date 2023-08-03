<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{ $t("IHRest") }}</h3>
        <CCardHeader>
          <CRow class="form-group">
            <CCol lg="3" md="5" sm="5" class="text-left mt-2">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-4" for>{{
                  $t("Date")
                }}</label>
                <div class="col-sm-6">
                  <date-picker
                    v-model="filter.OnDate"
                    style="width: 100%"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('OnDate')"
                    value-type="format"
                    format="DD.MM.YYYY"
                  ></date-picker>
                </div>
              </div>
            </CCol>
            <CCol lg="2" md="5" sm="11" class="text-left mt-2">
              <ValidationProvider v-slot="v" name="Department">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="departmentlist"
                    v-model="filter.departmentid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('Department')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider>
            </CCol>
            <CCol lg="4" md="5" sm="11" class="text-left mt-2">
              <!-- <ValidationProvider v-slot="v" name="ResponsiblePerson">
                <div class="form-group form-row">
                  <v-select
                    class="col-sm-9"
                    :options="personlist"
                    v-model="filter.responsiblepersonid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ResponsiblePerson')"
                    label="name"
                  >
                    <template slot="invalid-feedback">
                      <div class="invalid-feedback">{{ v.errors[0] }}</div>
                    </template>
                  </v-select>
                </div>
              </ValidationProvider> -->
              <div class="d-flex">
                <CInput
                  class="mb-0 mr-2"
                  style="width: 100%"
                  disabled
                  :placeholder="$t('ResponsiblePerson')"
                  v-model="filter.responsiblepersonname"
                ></CInput>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="OpenEmployeeModal"
                >
                  <b-icon icon="three-dots"></b-icon>
                </b-button>
              </div>
            </CCol>
            <CCol lg="3" md="5" sm="11" class="text-left mt-2">
              <CInput
                :placeholder="$t('IHName')"
                autocomplete="text"
                v-model="filter.ihname"
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
                    <b-icon icon="search"></b-icon>
                    {{ $t("search") }}
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol lg="9" md="6" sm="12" class="text-left mt-2 pl-0">
              <!-- <CButton @click="Search" size="sm" variant="outline" type="button" color="primary">
                <b-icon icon="search"></b-icon>
                {{$t('search')}}
              </CButton>-->
              <!--               <CButton
                color="danger"
                class="float-sm-right mr-2"
                @click="$router.push('/')"
                size="sm"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>-->
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
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          ></b-table>
        </CCardBody>
      </CCard>
      <b-modal
        id="modalXl"
        size="xl"
        :title="$t('Employee')"
        hide-footer
        modal-class="custom-size-modal"
      >
        <employee-list-component
          :ondate="filter.OnDate"
          @SelectedItem="SelectedItem"
          @DblClick="Enterdata"
          :isteacher="null"
        >
        </employee-list-component>
        <!-- <b-form-input v-model="value1" @keyup="CheckMax(tr)" size="sm"></b-form-input> -->
        <!-- <edit-person-component></edit-person-component> -->

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="CloseEmployeeModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPerson">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>

<script>
import ReportIHService from "@/services/ReportIH.service";
import PersonService from "@/services/person.service";
import EmployeeListComponent from "@/components/EmployeeList";
import DepartmentService from "@/services/Department.service";

export default {
  components: { EmployeeListComponent },

  data() {
    return {
      fields: [
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "responsiblepersonname",
          label: this.$t("responsiblepersonname"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "inventoryholdingname",
          label: this.$t("inventoryholdingname"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "measurename",
          label: this.$t("measurename"),
          sortable: false,
          class: "text-center",
        },
        {
          key: "quantity",
          label: this.$t("quantity"),
          class: "text-center",
        },
        {
          key: "price",
          label: this.$t("price"),
          class: "text-center",
        },
        {
          key: "docsum",
          label: this.$t("docsum"),
          class: "text-center",
        },
      ],
      items: [],
      departmentlist: [],
      personlist: [],
      personvalue: {},
      totalRows: "",
      isBusy: true,
      filter: {
        OnDate: "",
        departmentid: 0,
        responsiblepersonid: 0,
        responsiblepersonname: "",
        startdate : "",
        enddate: "",
        ihname: "",
      },
      toastinfo: {
        toast: false,
        message: "",
        bgcolor: "",
      },
    };
  },
  created() {
    this.createDate();
    this.Refresh();
    DepartmentService.GetAll().then((res) => {
      this.departmentlist = res.data;
    });
  },

  methods: {
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.OnDate = dd + "." + mm + "." + yyyy;
    },
    Search() {
      this.Refresh();
    },
    AddPerson() {
      this.CloseEmployeeModal();
      this.filter.responsiblepersonid = this.personvalue.personid;
      this.filter.responsiblepersonname = this.personvalue.personname;
    },
    SelectedItem(value) {
      this.personvalue = value;
    },
    OpenEmployeeModal() {
      // this.EmployeeModal = true
      this.$bvModal.show("modalXl");
    },
    CloseEmployeeModal() {
      // this.EmployeeModal = false
      this.$bvModal.hide("modalXl");
    },
    Enterdata(data) {
      this.filter.responsiblepersonid = data.personid;
      this.filter.responsiblepersonname = data.personname;
      this.CloseEmployeeModal();
    },
    Refresh() {
      this.isBusy = true;
      ReportIHService.GetIHRest(
        this.filter.OnDate,
        this.filter.departmentid,
        this.filter.responsiblepersonid,
        this.filter.ihname,
        this.filter.Sort,
        this.filter.order,
        this.filter.offset,
        this.filter.perPage
      ).then((res) => {
        this.isBusy = false;
        this.items = res.data;
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

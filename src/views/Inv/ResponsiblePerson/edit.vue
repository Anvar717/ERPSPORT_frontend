<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("ResponsiblePerson") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <ValidationObserver ref="form" v-slot="errors">
            {{ setAllErrors(errors.errors) }}
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <!-- <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("person")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="PersonList"
                    v-model="ResponsiblePerson.personid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div> -->
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3">{{
                    $t("Employee")
                  }}</label>
                  <div class="d-flex col-sm-9">
                    <b-form-input
                      class="mb-0 mr-2"
                      style="width: 100%"
                      disabled
                      v-model="ResponsiblePerson.personname"
                    ></b-form-input>
                    <b-button
                      size="sm"
                      variant="primary"
                      @click="$bvModal.show('EmployeeModal')"
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </b-button>
                  </div>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
            <CRow>
              <CCol sm="3"></CCol>
              <CCol sm="6">
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-3" for>{{
                    $t("state")
                  }}</label>
                  <v-select
                    class="col-sm-9"
                    :options="statelist"
                    v-model="ResponsiblePerson.stateid"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                  ></v-select>
                </div>
              </CCol>
              <CCol sm="3"></CCol>
            </CRow>
          </ValidationObserver>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push({ name: 'ResponsiblePerson' })"
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
        <b-modal
          id="EmployeeModal"
          no-close-on-backdrop
          size="xl"
          :title="$t('Employee')"
          hide-footer
          modal-class="custom-size-modal"
        >
          <person-list
            :isViewAddButton="false"
            @SelectedItem="SelectedEmployeeItem"
            @DblClick="AddEmployeeData"
          ></person-list>

          <c-row class="mt-2">
            <c-col class="text-center">
              <b-button class="mr-2" variant="danger" @click="ClosePersonModal">
                {{ $t("back") }}
              </b-button>
              <b-button
                variant="primary"
                @click="AddEmployeeData(employeevalue)"
              >
                {{ $t("Add") }}
              </b-button>
            </c-col>
          </c-row>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import HelperService from "@/services/helper.service";
import ResponsiblePersonService from "@/services/ResponsiblePerson.service";
import PersonList from "@/components/PersonList";
export default {
  components: { PersonList },
  data() {
    return {
      SaveLoading: false,
      ResponsiblePerson: {},
      employeevalue: {},
      statelist: [],
      PersonList: [],
    };
  },
  created() {
    var self = this;
    HelperService.GetStateList().then((res) => {
      self.statelist = res.data;
    });
    // PersonService.GetList().then((res) => {
    //   self.PersonList = res.data;
    // });
    ResponsiblePersonService.Get(
      this.$route.params.id,
      this.isViewAddButton == false
    ).then((res) => {
      self.ResponsiblePerson = res.data;
    });
  },
  methods: {
    check() {
      var self = this;
      if (
        self.ResponsiblePerson.personname === 0 ||
        self.ResponsiblePerson.personname === null ||
        self.ResponsiblePerson.personname === undefined ||
        self.ResponsiblePerson.personname === ""
      ) {
        this.makeToast(
          this.$t("personnameNotCorrect"),
          this.$t("Error"),
          "danger"
        );
        return false;
      }
      if (
        self.ResponsiblePerson.stateid === 0 ||
        self.ResponsiblePerson.stateid === null ||
        self.ResponsiblePerson.stateid === undefined ||
        self.ResponsiblePerson.stateid === ""
      ) {
        this.makeToast(this.$t("StatusNotCorrect"), this.$t("Error"), "danger");
        return false;
      }
      return true;
    },
    SelectedEmployeeItem(data) {
      this.employeevalue = data;
    },
    AddEmployeeData(data) {
      this.ResponsiblePerson.personid = data.id;
      this.ResponsiblePerson.personname = data.fullname;
      this.ClosePersonModal();
    },
    ClosePersonModal() {
      this.$bvModal.hide("EmployeeModal");
    },
    // CloseEmployeeModal() {
    //   this.$bvModal.hide("EmployeeModal");
    // },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
    SaveData() {
      if (!this.check()) {
        return false;
      }
      var self = this;
      ResponsiblePersonService.Update(self.ResponsiblePerson)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "ResponsiblePerson" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
  },
};
</script>

<style></style>

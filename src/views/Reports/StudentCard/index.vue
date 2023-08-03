<template>
  <b-container fluid>
    <b-card>
      <b-row class="mb-4">
        <b-col sm="12" md="4" lg="10" class="d-flex justify-content-lg-end text-lg-right achievement-input">
          <b-button
           v-if="$can('AdminView', 'permissions')"
            variant="danger"
            class="mr-2"
            @click="$bvModal.show('DeleteIsAdminModal')"
          >
            <b-icon icon="info-circle"></b-icon> {{ $t("DeleteIsAdminModal1") }}
          </b-button>
           <b-button
           v-if="$can('StudentDelete', 'permissions') && studentdochistory.length != 0"
            variant="danger"
            class="mr-2"
            @click="$bvModal.show('DeleteModal')"
          >
            <b-icon icon="trash"></b-icon> {{ $t("Delete") }}
          </b-button>
        </b-col>
        <b-col sm="2" lg="2" class="text-right">
          <b-button variant="danger" class="mr-2" @click="$router.back()">
            <b-icon icon="arrow-left-short"></b-icon> {{ $t("gotodashboard") }}
          </b-button>
          <!-- <b-button v-if="$route.query.docseries || $route.query.docnumber || $route.query.dateofbirth" @click="$router.push({name : 'EditStudent',params : {isStudent : true,id : items.id}})" variant="danger" >
                    <b-icon icon="arrow-left-short"></b-icon> {{ $t('gotodashboard') }} ( {{ $t('Student') }} ) 
                </b-button> -->
          <b-modal :id="'DeleteModal'" hide-footer>
            <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
            <div class="d-block text-right">
              <CButton
                @click="$bvModal.hide('DeleteModal')"
                color="danger"
                class="mr-2"
              >
                <b-icon icon="x"></b-icon>
                {{ $t("NotAccept") }}
              </CButton>
              <CButton @click="Delete()" color="success">
                <b-icon icon="check2"></b-icon>
                {{ $t("Accept") }}
              </CButton>
            </div>
          </b-modal>
          <b-modal :id="'DeleteIsAdminModal'" hide-footer>
            <template v-slot:modal-title>{{ $t("WantDelete") }}</template>
            <div class="d-block text-right">
              <CButton
                @click="$bvModal.hide('DeleteIsAdminModal')"
                color="danger"
                class="mr-2"
              >
                <b-icon icon="x"></b-icon>
                {{ $t("NotAccept") }}
              </CButton>
              <CButton @click="DeletePersonIsAdmin()" color="success">
                <b-icon icon="check2"></b-icon>
                {{ $t("Accept") }}
              </CButton>
            </div>
          </b-modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 class="text-center mb-3">{{ $t("StudentCard") }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-row class="">
            <b-col lg="3" sm="12" class="achievement-input">
              <b-form-select
                value-field="id"
                text-field="name"
                class="mr-2"
                v-model="filter.DocumentType"
                @change="ChangeDocumentType"
                :options="DocumentTypeList"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >-- {{ $t("ChooseBelow") }} --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-col>
            <b-col lg="3" sm="12" v-if="filter.DocumentType === 2" class="achievement-input">
              <b-form-input
                class="mr-2"
                v-model="filter.DocumentSeries"
                :placeholder="$t('documentseries')"
              ></b-form-input>
            </b-col>
            <b-col lg="3" sm="12" v-if="filter.DocumentType === 1" class="achievement-input">
              <b-form-select
                value-field="name"
                text-field="name"
                class="mr-2"
                v-model="filter.DocumentSeries"
                :options="DocumentSeriesList"
              >
                <template #first>
                  <b-form-select-option :value="''" disabled
                    >-- {{ $t("ChooseBelow") }} --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-col>
            <b-col lg="3" sm="12" class="achievement-input">
              <b-form-input
                class="mr-2"
                v-model="filter.DocumentNumber"
                :placeholder="$t('documentnumber')"
              ></b-form-input>
            </b-col>
            <b-col lg="3" sm="12" v-if="filter.DocumentType === 2" class="achievement-input">
              <b-form-input
                class="mr-2"
                v-model="filter.Pinfl"
                :placeholder="$t('Pinfl')"
              ></b-form-input>
            </b-col>
            <b-col lg="3" sm="12" class="achievement-input">
              <div class="d-flex">
                <date-picker
                  v-if="filter.DocumentType === 1"
                  style="width: 100%"
                  v-model="filter.DateOfBirth"
                  size="sm"
                  lang="ru"
                  class="mr-2"
                  :placeholder="$t('DateOfBirth')"
                  value-type="format"
                  format="DD.MM.YYYY"
                ></date-picker>
                <b-button
                  @click="Refresh"
                  variant="primary"
                  style="white-space: nowrap"
                >
                  <b-icon v-if="!Loading" icon="search"> </b-icon>
                  <b-spinner small v-if="Loading"></b-spinner> {{ $t("search") }}
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row class="mb-3">
        <b-col>
          <b-tabs pills card>
            <b-tab :title="$t('Main')" active>
              <student-card
                :loading="Loading"
                :history="history"
                :studentdochistory="studentdochistory"
                :items="items"
              >
              </student-card>
            </b-tab>
            <b-tab :title="$t('StudentManageHistory')">
              <b-row>
                <b-col>
                  <h5 class="text-center">
                    {{ $t("StudentManageHistory") }}
                  </h5>
                </b-col>
              </b-row>
              <b-row
                class="mt-3"
                v-for="(item, key) in studentdochistory"
                :key="key + 'studentdochistory'"
              >
                <b-col>
                  <b-card bg-variant="light" style="font-size: 16px">
                    <b-row class="mt-3">
                      <b-col sm="12" md="3">
                        <h5>{{ $t("organization") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        {{ item.organizationname }}
                      </b-col>
                      <b-col sm="12" md="3">
                        <h5>{{ $t("tablename") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        {{ item.tablename }}
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col sm="12" md="3">
                        <h5>{{ $t("docnumber") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        {{ item.docnumber }}
                      </b-col>
                      <b-col sm="12" md="3">
                        <h5>{{ $t("docdate") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        {{ item.docdate }}
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col sm="12" md="3">
                        <h5>{{ $t("schoolyearname") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        {{ item.schoolyearname }}
                      </b-col>
                      <b-col sm="12" md="3">
                        <h5>{{ $t("statusname") }}</h5>
                      </b-col>
                      <b-col sm="12" md="3" class="text-left">
                        <CBadge :color="getItemColor(item.statusname)">{{
                          item.statusname
                        }}</CBadge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('StudentDocHistory')"
              ><b-card-text>
                <b-row>
                  <b-col>
                    <h5 class="text-center">
                      {{ $t("StudentDocHistory") }}
                    </h5>
                  </b-col>
                </b-row>
                <b-row
                  class="mt-3"
                  v-for="(item, key) in studentmanagehistory"
                  :key="key + 'studentmanagehistory'"
                >
                  <b-col>
                    <b-card bg-variant="light" style="font-size: 16px">
                      <!-- <b-row>
                        <b-col>
                          <h5 class="text-center">
                            {{ $t("StudentManageHistory") }}
                          </h5>
                        </b-col>
                      </b-row> -->
                      <b-row class="mt-3">
                        <b-col sm="12" md="3">
                          <h5>{{ $t("startdocumentid") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.startdocumentid }}
                        </b-col>
                        <b-col sm="12" md="3">
                          <h5>{{ $t("enddocumentid") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.enddocumentid }}
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col sm="12" md="3">
                          <h5>{{ $t("organization") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.organizationname }}
                        </b-col>
                        <b-col sm="12" md="3">
                          <h5>{{ $t("orgschoolgrade") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.orgschoolgradename }}
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col sm="12" md="3">
                          <h5>{{ $t("starttablename") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.starttablename }}
                        </b-col>
                        <b-col sm="12" md="3">
                          <h5>{{ $t("endtablename") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.endtablename }}
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col sm="12" md="3">
                          <h5>{{ $t("startdate") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.startdate }}
                        </b-col>
                        <b-col sm="12" md="3">
                          <h5>{{ $t("enddate") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.enddate }}
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col sm="12" md="3">
                          <h5>{{ $t("schoolyearname") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          {{ item.schoolyearname }}
                        </b-col>
                        <b-col sm="12" md="3">
                          <h5>{{ $t("statusname") }}</h5>
                        </b-col>
                        <b-col sm="12" md="3" class="text-left">
                          <CBadge :color="getItemColor(item.statusname)">{{
                            item.statusname
                          }}</CBadge>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </b-card-text></b-tab
            >
          </b-tabs>
          <!-- <b-button v-if="$route.query.docseries || $route.query.docnumber || $route.query.dateofbirth" @click="$router.push({name : 'EditStudent',params : {isStudent : true,id : items.id}})" variant="danger" >
                    <b-icon icon="arrow-left-short"></b-icon> {{ $t('gotodashboard') }} ( {{ $t('Student') }} ) 
                </b-button> -->
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import IdentityDocumentService from "@/services/IdentityDocument.service";
import StudentManageService from "@/services/StudentManage.service";
import StudentCard from "@/components/StudentCard.vue";
import PersonService from "@/services/person.service";
export default {
  components: { StudentCard },
  data() {
    return {
      filter: {
        DocumentSeries: "",
        DocumentType: 1,
        PersonId: 0,
        DocumentNumber: "",
        Pinfl: "",
        DateOfBirth: "",
        StudentID: 0,
      },
      DeleteModal: false,
      DeleteIsAdminModal: false,
      DocumentTypeList: [],
      DocumentSeriesList: [],
      studentmanagehistory: [],
      Loading: false,
      items: [],
      studentdochistory: [],
      history: [],
    };
  },
  created() {
    IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data.result;
    });
    IdentityDocumentService.GetAll().then((res) => {
      this.DocumentTypeList = res.data.result;
    });
    if (
      !!this.$route.query.docseries ||
      !!this.$route.query.docnumber ||
      !!this.$route.query.dateofbirth
    ) {
      this.filter.PersonId = this.$route.query.personid;
      this.filter.DocumentSeries = this.$route.query.docseries;
      this.filter.DocumentNumber = this.$route.query.docnumber;
      this.filter.DateOfBirth = this.$route.query.dateofbirth;
      this.Refresh();
    }
    if (!!this.$route.query.ID) {
      this.filter.StudentID = this.$route.query.ID;
    }
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
    Delete() {
      PersonService.Delete(this.filter.StudentID)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.items = [],
          this.filter ={
        DocumentSeries: "",
        DocumentType: 1,
        PersonId: 0,
        DocumentNumber: "",
        Pinfl: "",
        DateOfBirth: "",
        StudentID: 0,
      },
          this.$bvModal.hide("DeleteModal");
     // this.Refresh()
        })
        .catch((error) => {
          this.$bvModal.hide("DeleteModal");
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    DeletePersonIsAdmin() {
      PersonService.DeletePersonIsAdmin(this.filter.StudentID)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.items = [],
          this.$bvModal.hide('DeleteIsAdminModal')
      this.Refresh()
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.$bvModal.hide('DeleteIsAdminModal')
        });
    },
    Refresh() {
      this.Loading = true;
      StudentManageService.GetStudentCard(
        this.filter.PersonId,
        this.filter.DocumentSeries,
        this.filter.DocumentNumber,
        this.filter.Pinfl,
        this.filter.DateOfBirth
      )
        .then((res) => {
          this.Loading = false;
          this.items = res.data.personData;
          this.history = res.data.History;
          this.studentdochistory = res.data.StudentDocHistory;
          this.studentmanagehistory = res.data.StudentManageHistory;
          this.filter.StudentID = res.data.personData.id
        })
        .catch((err) => {
          this.makeToast(
            err.response.data.error || error,
            this.$t("error"),
            "danger"
          );
          this.Loading = false;
        });
    },
    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
    ChangeDocumentType() {
      this.filter.DocumentSeries = "";
      this.filter.DocumentNumber = "";
      this.filter.DateOfBirth = "";
    },
  },
};
</script>

<style>
</style>
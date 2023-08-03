<template>
  <b-container fluid>
    <b-card>
      <b-row >
        <b-col>
          <b-button variant="danger" class="mr-2 actions_btn" @click="$router.back()">
            <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
          </b-button>
        </b-col>
          <b-col>
            <h4 class="text-center mb-3"> {{ $t('EmployeeCard') }} </h4>
          </b-col>
          <b-col>

          </b-col>
      </b-row>
      <b-row>
        <b-col lg="3" sm="12" class="achievement-input">
          <b-form-select value-field="id" text-field="name" class="" v-model="filter.DocumentType" :options="DocumentTypeList">
            <template #first>
                <b-form-select-option :value="null" disabled>-- {{ $t('ChooseBelow') }} --</b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col v-if="filter.DocumentType === 2" lg="3" sm="12" class="achievement-input">
          <b-form-input class="" v-model="filter.DocumentSeries" :placeholder="$t('documentseries')"></b-form-input>
        </b-col>
        <b-col v-if="filter.DocumentType === 1" lg="3" sm="12" class="achievement-input">
          <b-form-select value-field="name" text-field="name" class="" v-model="filter.DocumentSeries" :options="DocumentSeriesList">
              <template #first>
                  <b-form-select-option :value="null" disabled>-- {{ $t('ChooseBelow') }} --</b-form-select-option>
              </template>
          </b-form-select>
        </b-col>
        <b-col lg="2" sm="12" class="achievement-input">
          <b-form-input class="" v-model="filter.DocumentNumber" :placeholder="$t('documentnumber')"></b-form-input>
        </b-col>
        <b-col lg="4" sm="12" class="achievement-input">
          <div class="d-flex">
            <b-form-input v-if="filter.DocumentType === 2" class="" v-model="filter.Pinfl" :placeholder="$t('Pinfl')"></b-form-input>
            <date-picker v-if="filter.DocumentType === 1" style="width:100%" v-model="filter.DateOfBirth" size="sm" lang="ru" class=""
                :placeholder="$t('DateOfBirth')"  value-type="format" format="DD.MM.YYYY"></date-picker>
            <b-button @click="Refresh" variant="primary" class="ml-2" style="white-space:nowrap"> <b-spinner small v-if="Loading"></b-spinner> <b-icon v-if="!Loading" icon="search"> </b-icon> {{ $t('search') }} </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="mb-2">
        <b-col class="text-right">
          <b-button variant="primary" @click="PrintEmployeeCard"> 
            <b-icon icon="printer" v-if="!printLoading"> </b-icon>
            <b-spinner v-if="printLoading" small></b-spinner> 
            {{ $t('Download') }} 
          </b-button>
        </b-col>
      </b-row>
    <b-card style="background-color: #DEC5EC;">
       <b-row class="mb-3" v-if="false">
        <b-col  class="d-flex text-left " style="flex-wrap: wrap;">
          <b-button variant="danger" class="mr-2 actions_btn" @click="$router.back()">
            <b-icon icon="arrow-left-short"></b-icon> {{ $t("gotodashboard") }}
          </b-button>
          <b-button
           v-if="$can('EmployeeDelete', 'permissions')"
            variant="danger"
            class="mr-2 actions_btn"
            @click="$bvModal.show('DeleteModal')"
          >
            <b-icon icon="trash"></b-icon> {{ $t("Delete") }}
          </b-button>
          <b-button
           v-if="$can('AdminView', 'permissions')"
            variant="danger"
            class="mr-2 actions_btn"
            @click="$bvModal.show('DeleteIsAdminModal')"
          >
            <b-icon icon="info-circle"></b-icon> {{ $t("DeleteEIsAdminModal") }}
          </b-button>
        </b-col>

          
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

      </b-row>
      
      <div>
        <employee-card 
          :loading="Loading" 
          :certforeignlanglist="certForeignLangList" 
          :history="positionhistory" 
          :diplominfo="higherEduDiplomList" 
          :WorkOrganization="workorganization"
          :items="items" 
          :experience-tables="experienceTables"
          @changesubject="Refresh"
          :appointqualcategorylist="appointQualCategoryList"
          @experience="getExperience"
          :ExperienceLoading="experienceLoading"
          >
        </employee-card>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import IdentityDocumentService from "@/services/IdentityDocument.service";
import EmployeeManageService from '@/services/EmployeeManage.service'
import EmployeeCard from '@/components/EmployeeCard.vue';
import PersonService from "@/services/person.service";
export default {
  components : {EmployeeCard},
  data(){
    return {
      filter : {
        DocumentType : 2,
        DocumentSeries : "",
        PersonId : 0,
        DocumentNumber : '',
        Pinfl : '',
        DateOfBirth : '',
        EmployeeID: 0,
      },
      DocumentTypeList : [],
      Loading : false,
      DeleteModal: false,
      DeleteIsAdminModal: false,
      items : [],
      lang: localStorage.getItem("locale") || "ru",
      positionhistory : [],
      higherEduDiplomList:[],
      workorganization: {},
      appointQualCategoryList : [],
      certForeignLangList: [],
      experienceTables: [],
      experienceLoading: false,
      printLoading : false
    }
  },
  created(){
    IdentityDocumentService.GetAll().then(res => {
        this.DocumentTypeList = res.data.result
    })
    if(!!this.$route.query.docseries || !!this.$route.query.docnumber || !!this.$route.query.pinfl){
      this.filter.DocumentSeries = this.$route.query.docseries
      this.filter.DocumentNumber = this.$route.query.docnumber
      this.filter.Pinfl = this.$route.query.pinfl
      this.Refresh()
    }
    if(!!this.$route.query.PersonId){
      this.filter.PersonId = this.$route.query.PersonId
      this.Refresh()
    }
    if (!!this.$route.query.ID) {
      this.filter.EmployeeID = this.$route.query.ID;
    }
  },
  methods: {
    PrintEmployeeCard() {
      this.printLoading = true
      EmployeeManageService.PrintEmployeeCardWord(
        this.items.id,
        this.items.DocumentTables[0].documentseries,
        this.items.DocumentTables[0].documentnumber,
        this.items.pinfl
      ).then(res => {
        this.printLoading = false
        this.makeToast(this.$t("FillSuccess"), this.$t('message'), 'success')
        this.forceFileDownload(res,this.items.DocumentTables[0].documentseries + this.items.DocumentTables[0].documentnumber + '.docx')
      })
    },
    forceFileDownload(response, name) {
      var headers = response.headers;
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", name); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    async getExperience() {
      this.experienceLoading = true
      await PersonService.UpdateExperienceFromMinTrud(this.items.id, this.items.pinfl).then((res) => {
        this.Refresh()
        this.experienceLoading = false
      })
        .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );  
      })
    },
    Refresh(){
        this.Loading = true
        EmployeeManageService.GetEmployeeCard(
            this.filter.PersonId,
            this.filter.DocumentSeries,
            this.filter.DocumentNumber,
            this.filter.Pinfl,
            this.lang
        ).then(res => {
            this.Loading = false
            this.items = res.data.personData
            if (res.data.positionhistory != null) {
              this.positionhistory = res.data.positionhistory
            }
            this.higherEduDiplomList = res.data.personData.PersonDiploms
            this.appointQualCategoryList = res.data.appointQualCategoryList
            this.certForeignLangList = res.data.certForeignLangList
            this.filter.EmployeeID = res.data.personData.id
            this.experienceTables = res.data.personData.PersonExperienceTables
            this.workorganization = res.data.currentWorkOrganization
        }).catch(err => {
            this.makeToast(err.response.data.error || error,this.$t('error'),'danger')
            this.Loading = false
        })
    },
    DeletePersonIsAdmin() {
      PersonService.DeletePersonIsAdmin(this.filter.EmployeeID)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
         this.items = [],
          this.filter ={
        DocumentSeries: "",
        DocumentType: 2,
        PersonId: 0,
        DocumentNumber: "",
        Pinfl: "",
        DateOfBirth: "",
        StudentID: 0,
      },
          this.$bvModal.hide("DeleteIsAdminModal");
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
          this.$bvModal.hide("DeleteIsAdminModal");
        });
    },
    Delete() {
      PersonService.Delete(this.filter.EmployeeID)
        .then((res) => {
          this.makeToast(
            this.$t("DeleteMessage"),
            this.$t("message"),
            "success"
          );
          this.items = [],
           this.filter ={
        DocumentSeries: "",
        DocumentType: 2,
        PersonId: 0,
        DocumentNumber: "",
        Pinfl: "",
        DateOfBirth: "",
        StudentID: 0,
      },
          this.$bvModal.hide("DeleteModal");
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
    makeToast(message, title, type) {
        var self = this;
        self.$bvToast.toast(message, {
            title: title,
            autoHideDelay: 2000,
            variant: type,
            solid: true
        });
    },
    
  }
}
</script>

<style>

</style>
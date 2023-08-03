<template>
  <b-overlay>
    <b-card>
      <b-row>
        <b-col class="d-flex justify-content-between text-center">
          <h4 class="text-center" style="margin-left:650px">
            {{ $t("GetSchoolStudentCountBySchoolGrade") }}
          </h4>
          <b-form-checkbox
            @input="Refresh"
            switch
            v-model="filter.bygradeletter"
          >
            {{ $t("bygradeletter") }}
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col sm="12" md="2">
          <v-select
            :options="schoolyearlist"
            v-model="filter.schoolyearid"
            :reduce="(item) => item.id"
            :placeholder="$t('SchoolYear')"
            label="name"
          >
          </v-select>
        </b-col>
        <b-col sm="12" md="2" v-if="$can('AdminView','permissions')||$can('OblastSport','permissions')||$can('MinSportView','permissions')||$can('RegionXTB','permissions')">
          <v-select
            :options="oblastlist"
            v-model="filter.oblastid"
            :reduce="(item) => item.id"
            :placeholder="$t('oblast')"
            label="name"
            :disabled="($can('AdminView','permissions')?false:true)&&($can('MinSportView','permissions')?false:true)"
            @input="ChangeOblast"
          >
          </v-select>
        </b-col>
        <b-col sm="12" md="2"  v-if="$can('AdminView','permissions')||$can('RegionXTB','permissions')||$can('MinSportView','permissions')||$can('OblastSport','permissions')">
          <v-select
            :options="regionlist"
            v-model="filter.regionid"
            :reduce="(item) => item.id"
            :placeholder="$t('region')"
            label="name"
           :disabled="($can('AdminView','permissions')?false:true)&&($can('MinSportView','permissions')?false:true)&&($can('OblastSport','permissions')?false:true)"
            @input="ChangeRegion"
          >
          </v-select>
        </b-col>
        <b-col sm="12" md="3"  v-if="$can('AdminView','permissions')||$can('OblastSport','permissions')||$can('MinSportView','permissions')||$can('RegionXTB','permissions')">
          <v-select
            :options="organizationlist"
            v-model="filter.organizationid"
            :reduce="(item) => item.id"
            :placeholder="$t('organization')"
            label="name"
          >
          </v-select>
        </b-col>
        
        <b-col sm="12" md="2">
          <date-picker
            v-model="filter.ondate"
            style="width:100%"
            size="sm"
            lang="ru"
            :placeholder="$t('OnDate')"
            value-type="format"
            format="DD.MM.YYYY"
          ></date-picker>
        </b-col>
        <b-col sm="12" md="1">
          <b-button @click="Refresh" variant="primary">
            {{ $t("Refresh") }}
          </b-button>
        </b-col>
        <b-col sm="12" md="3"> </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-table
            :fields="filter.bygradeletter ? fields1 : fields"
            :items="StudentCountList"
            bordered
           
            small
            responsive="sm"
            :busy="isLoading"
            show-empty
          >
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
            <template #custom-foot>
              <b-tr>
                <b-th v-if="filter.bygradeletter" colspan="2" class="text-center bg-secondary">
                  {{ $t("All") }}
                </b-th>
                <b-th v-if="!filter.bygradeletter" class="text-center bg-secondary">
                  {{ $t("All") }}
                </b-th>
                <b-th class="text-center bg-secondary">
                  {{ allstudent() }}
                </b-th>
              </b-tr>
            </template>
            <!-- <template #foot(schoolgradename)>
              {{ $t("All") }}
            </template>
            <template #foot(studentcount)>
              {{ allstudent() }}
            </template> -->
          </b-table>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BRow,
  BCol,
  BCard,
  BFormCheckbox,
  BButton,
} from "bootstrap-vue";
import OrganizationService from "@/services/organization.service";
import OblastService from "@/services/Oblast.service";
import RegionService from "@/services/Region.service";
import SchoolYearService from "@/services/SchoolYear.service";
import vSelect from "vue-select";
import DatePicker from "vue2-datepicker";
import StudentManageService from "@/services/StudentManage.service";
export default {
  components: {
    BOverlay,
    BRow,
    BCol,
    BCard,
    vSelect,
    DatePicker,
    BFormCheckbox,
    BButton,
  },
  data() {
    return {
      filter: {
        schoolyearid: 0,
        organizationid: 0,
        ondate: "",
        bygradeletter: false,
        oblastid: 0,
        regionid: 0,
      },
      StudentCountListOblast :[],
      schoolyearlist: [],
      oblastlist: [],
      regionlist: [],
      organizationlist: [],
      isLoading: false,
      fields1: [
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          class: "text-center",
        },
        {
          key: "schoolgradelettername",
          label: this.$t("schoolgradeletter"),
          class: "text-center",
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          class: "text-center",
        },
      ],
      fields: [
        {
          key: "schoolgradename",
          label: this.$t("schoolgradename"),
          class: "text-center",
        },
        {
          key: "studentcount",
          label: this.$t("studentcount"),
          class: "text-center",
        },
      ],
      StudentCountList: [],
    };
  },
  created() {
    SchoolYearService.GetAll().then((res) => {
      this.schoolyearlist = res.data;
    });
    OblastService.GetAll("", 211, "").then((res) => {
      this.oblastlist = res.data;
    });
    this.Refresh();
  },
  methods: {
    ChangeRegion() {
     
      //  if(this.StudentCountListOblast.regionid !=0){
      //   this.filter.regionid = this.StudentCountListOblast.regionid
      //    OrganizationService.GetAll(
      //     this.filter.oblastid,
      //     this.filter.regionid,
      //     false
      //   ).then((res) => {
      //     this.organizationlist = res.data;
      //   });
      // }else{
         this.filter.organizationid = 0;
      if (!!this.filter.regionid) {
        OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
      }
      // }
    },
    ChangeOblast() {
     
      // if(this.StudentCountListOblast.oblastid !=0){
      //   this.filter.oblastid = this.StudentCountListOblast.oblastid
      //    RegionService.GetAll("", this.filter.oblastid).then((res) => {
      //     this.regionlist = res.data;
      //   });
      // }else{
         this.filter.regionid = 0;
      this.filter.organizationid = 0;
      if (!!this.filter.oblastid) {
        RegionService.GetAll("", this.filter.oblastid).then((res) => {
          this.regionlist = res.data;
        });
      }
      // }
    },
    allstudent() {
      var s = 0;
      this.StudentCountList.forEach(function(item) {
        s += item.studentcount;
      });
      return s;
    },
    Refresh() {
      this.isLoading = true;
      StudentManageService.GetSchoolStudentCountBySchoolGrade(
        this.filter.schoolyearid,
        this.filter.organizationid,
        this.filter.ondate,
        this.filter.bygradeletter
      )
        .then((res) => {
          this.StudentCountList = res.data.data;
          this.StudentCountListOblast = res.data;
          this.isLoading = false;
          if(this.StudentCountListOblast.oblastid !=0){
            this.filter.oblastid = this.StudentCountListOblast.oblastid
             RegionService.GetAll("", this.filter.oblastid).then((res) => {
            this.regionlist = res.data;
        });
          }
          if(this.StudentCountListOblast.regionid !=0){
            this.filter.regionid = this.StudentCountListOblast.regionid
             OrganizationService.GetAll(
          this.filter.oblastid,
          this.filter.regionid,
          false
        ).then((res) => {
          this.organizationlist = res.data;
        });
          }
          // this.ChangeOblast()
          // this.ChangeRegion()
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, this.$t("error"), "danger");
        });
    },
  },
};
</script>

<style></style>

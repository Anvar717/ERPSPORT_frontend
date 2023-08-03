<template>
  <b-overlay :show="show">
      <b-card>
          <b-row>
              <b-col>
                  <h4> {{ $t('TransitionSchoolYear') }} </h4>
              </b-col>
          </b-row>
          <b-row class="mt-2">
              <b-col sm="12" md="4" class="mt-2">
                  <label for=""> {{ $t('docnumber') }} </label>
                  <b-form-input v-model="TransitionSchoolYear.docnumber"></b-form-input>
              </b-col>
              <b-col sm="12" md="4" class="mt-2">
                  <label for=""> {{ $t('docdate') }} </label>
                  <date-picker
                    v-model="TransitionSchoolYear.docdate"
                    size="sm"
                    lang="ru"
                    :placeholder="$t('date')"
                    value-type="format"
                    format="DD.MM.YYYY"
                    style="width:100%"
                    ></date-picker>
              </b-col>
              <b-col sm="12" md="4" class="mt-2">
                  <label for=""> {{ $t('fromschoolyear') }} </label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="TransitionSchoolYear.fromschoolyearid"
                    disabled
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="4" class="mt-2">
                  <label for=""> {{ $t('toschoolyear') }} </label>
                  <v-select
                    :options="schoolyearlist"
                    v-model="TransitionSchoolYear.toschoolyearid"
                    disabled
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                ></v-select>
              </b-col>
              <b-col sm="12" md="8" class="mt-2">
                  <label for=""> {{ $t('detailinfo') }} </label>
                  <b-form-input v-model="TransitionSchoolYear.detailinfo"></b-form-input>
              </b-col>
          </b-row>
          <!-- <b-row class="mt-3">
              <b-col class="text-right">
                  <b-button variant="primary" @click="OpenAddModal"> {{ $t('Add') }} </b-button>
              </b-col>
          </b-row>
          <b-row class="mt-3">
              <b-col>
                  <b-table
                    :fields="fields"
                    :items="TransitionSchoolYear.Tables"
                    bordered
                    striped
                    responsive="sm"
                   
                    small
                    no-border-collapse
                    show-empty
                  >
                    <template v-slot:empty>
                        <h5 class="text-center m-1">{{ $t("NoItems") }}</h5>
                    </template>
                  </b-table>
              </b-col>
          </b-row> -->
          <b-row class="mt-3">
              <b-col class="d-flex justify-content-between">
                  <b-button variant="danger" @click="$router.push({ name : 'TransitionSchoolYear' })"> {{ $t('back') }} </b-button>
                  <b-button v-if="TransitionSchoolYear.CanSave" variant="success" @click="SaveData"> <b-spinner small v-if="SaveLoading"></b-spinner> {{ $t('save') }} </b-button>
              </b-col>
          </b-row>
          <b-modal v-model="AddModal" hide-footer no-close-on-backdrop :title="$t('TransitionSchoolYearGrade')">
              <b-row >
                  <b-col>
                      <label for=""> {{ $t('schoolgradeid') }} </label>
                      <v-select
                            :options="SchoolGradeList"
                            v-model="tabrow.schoolgradeid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                            @input="ChangeSchoolGrade"
                        ></v-select>
                  </b-col>
              </b-row>
              <b-row class="mt-3">
                  <b-col>
                      <label for=""> {{ $t('schoolgradeletter') }} </label>
                      <v-select
                            :options="SchoolGradeLetterList"
                            v-model="tabrow.schoolgradeletterid"
                            :reduce="(item) => item.id"
                            :placeholder="$t('ChooseBelow')"
                            label="name"
                            @input="ChangeSchoolGradeLetter"
                        ></v-select>
                  </b-col>
              </b-row>
              <b-row class="mt-3">
                  <b-col>
                      <label for=""> {{ $t('schoolgradecount') }} </label>
                      <b-form-input v-model="tabrow.schoolgradecount"> </b-form-input>
                  </b-col>
              </b-row>
              <b-row class="mt-3">
                  <b-col>
                      <label for=""> {{ $t('studentcount') }} </label>
                      <b-form-input v-model="tabrow.studentcount"> </b-form-input>
                  </b-col>
              </b-row>
              <b-row class="mt-3">
                  <b-col class="text-right">
                        <b-button class="mr-2" variant="danger" @click="AddModal=false"> {{ $t('back') }} </b-button>
                        <b-button variant="success" @click="AddTabrow"> {{ $t('save') }} </b-button>
                  </b-col>
              </b-row>
          </b-modal>
           <b-modal v-model="FirstModal" :title="$t('CancelApproval')" no-close-on-backdrop hide-footer>
               <transition name="slide-fade">
                <b-row v-if="SecondModal == false">
                    <b-col>
                        <h5> {{ $t('WantCancelApproval') }} </h5>
                            <b-row>
                                <b-col class="text-right">
                                    <b-button class="mr-2" @click="FirstModal = false" variant="danger"> {{ $t('no') }} </b-button>
                                    <b-button @click="SecondModal = true" variant="success">  {{ $t('yes') }} </b-button>
                                </b-col>
                            </b-row>
                    </b-col>
                </b-row>
                    <b-row v-if="SecondModal == true">
                        <b-col>
                            <h5> {{ $t('WantCancelApproval1') }} </h5>
                            <b-row>
                                <b-col class="text-right">
                                    <b-button class="mr-2" @click="FirstModal = false" variant="danger"> {{ $t('no') }} </b-button>
                                    <b-button @click="SaveData" variant="success"> <b-spinner small v-if="SaveLoading"></b-spinner> {{ $t('yes') }} </b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </transition>
            </b-modal>
      </b-card>
  </b-overlay>
</template>

<script>
import { BOverlay,BCard,BRow,BCol,BFormInput,BButton,BTable } from 'bootstrap-vue'
import TransitionSchoolYearService from '@/services/transitionSchoolYear.service'
import DatePicker from 'vue2-datepicker'
import vSelect from 'vue-select'
import SchoolYearService from "@/services/SchoolYear.service";
// import SchoolGradeService from '@/services/SchoolGrade.service'
// import SchoolGradeLetterService from '@/services/SchoolGradeLetter.service'
export default {
    components : {BOverlay,BCard,BRow,BCol,BFormInput,DatePicker,vSelect,BButton,BTable},
    data(){
        return{
            show : false,
            TransitionSchoolYear : {},
            schoolyearlist : [],
            tabrow : {
                id : 0,
                ownerid : 0,
                schoolgradeid : 0,
                schoolgradename : '',
                schoolgradeletterid : 0,
                schoolgradelettername : "",
                schoolgradecount : 0,
                studentcount : 0
            },
            fields : [
                { key : 'schoolgradename',label : this.$t('schoolgrade'),class:'text-center' },
                { key : 'schoolgradelettername',label : this.$t('schoolgradeletter'),class:'text-center'  },
                { key : 'schoolgradecount',label : this.$t('schoolgradecount'),class:'text-center'  },
                { key : 'studentcount',label : this.$t('studentcount'),class:'text-center'  },
                { key : 'actions',label : this.$t('actions'),class:'text-center'  }
            ],
            AddModal : false,
            SchoolGradeList : [],
            SchoolGradeLetterList : [],
            editedIndex : -1,
            SaveLoading : false,
            FirstModal : false,
            SecondModal : false
        }
    },
    created(){
        this.show = true
        TransitionSchoolYearService.Get(this.$route.params.id).then(res => {
            this.TransitionSchoolYear = res.data;
            this.show = false
        }).catch(error => {
            this.$makeToast(error.response.data.error,this.$t('error'),'danger')
        })
        SchoolYearService.GetAll().then(res => {
            this.schoolyearlist = res.data;
        });
        // SchoolGradeService.GetAll().then(res => {
        //     this.SchoolGradeList = res.data
        // })
        // SchoolGradeLetterService.GetAll().then(res => {
        //     this.SchoolGradeLetterList = res.data
        // })
    },
    methods:{
        OpenFirstModal(){
            this.FirstModal = true
            this.SecondModal = false
        },
        ChangeSchoolGrade(){
            if(!!this.tabrow.schoolgradeid){
                this.tabrow.schoolgradename = this.SchoolGradeList.filter(item => item.id == this.tabrow.schoolgradeid)[0].name
            }
        },
        ChangeSchoolGradeLetter(){
            if(!!this.tabrow.schoolgradeletterid){
                this.tabrow.schoolgradelettername = this.SchoolGradeLetterList.filter(item => item.id == this.tabrow.schoolgradeletterid)[0].name
            }
        },
        OpenAddModal(){
            this.AddModal = true
            this.tabrow = {
                id : 0,
                ownerid : 0,
                schoolgradeid : 0,
                schoolgradeletterid : 0,
                schoolgradecount : 0,
                studentcount : 0
            }
        },
        
        AddTabrow(){
            if (this.editedIndex > -1) {
                Object.assign(this.TransitionSchoolYear.Tables[this.editedIndex], this.tabrow);
            } else {
                this.TransitionSchoolYear.Tables.push(this.tabrow);
            }
        },
        check() {
            var self = this;
            if (
                self.TransitionSchoolYear.docnumber === null ||
                self.TransitionSchoolYear.docnumber === undefined ||
                self.TransitionSchoolYear.docnumber === 0 ||
                self.TransitionSchoolYear.docnumber === ""
            ) {
                self.$makeToast(
                self.$t("DocNumberNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.TransitionSchoolYear.docdate === null ||
                self.TransitionSchoolYear.docdate === undefined ||
                self.TransitionSchoolYear.docdate === 0 ||
                self.TransitionSchoolYear.docdate === ""
            ) {
                self.$makeToast(
                self.$t("docdateNotCorrect"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.TransitionSchoolYear.fromschoolyearid === null ||
                self.TransitionSchoolYear.fromschoolyearid === undefined ||
                self.TransitionSchoolYear.fromschoolyearid === 0 ||
                self.TransitionSchoolYear.fromschoolyearid === ""
            ) {
                self.$makeToast(
                self.$t("fromschoolyearNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            if (
                self.TransitionSchoolYear.toschoolyearid === null ||
                self.TransitionSchoolYear.toschoolyearid === undefined ||
                self.TransitionSchoolYear.toschoolyearid === 0 ||
                self.TransitionSchoolYear.toschoolyearid === ""
            ) {
                self.$makeToast(
                self.$t("toschoolyearNotSelected"),
                self.$t("Error"),
                "danger"
                );
                return false;
            }
            return true;
        },
        SaveData(){
            var self = this;
            if (!self.check()) {
                return false;
            }
            self.SaveLoading = true
            TransitionSchoolYearService.Update(self.TransitionSchoolYear)
                .then(res => {
                    self.SaveLoading = false
                self.$makeToast(
                    self.$t("SuccessMessage"),
                    self.$t("message"),
                    "success"
                );
                self.$router.push({ name: "TransitionSchoolYear" });
                })
                .catch(error => {
                    self.SaveLoading = false
                self.$makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
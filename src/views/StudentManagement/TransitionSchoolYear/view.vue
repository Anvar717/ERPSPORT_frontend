<template>
  <b-overlay :show="show">
      <b-row>
          <b-col sm="12" md="10">
              <b-card>
                  <b-row>
                      <b-col sm="12" md="6">
                          <table>
                              <tr>
                                  <td>
                                      {{ $t('docnumber') }} : 
                                  </td>
                                  <td class="text-right">
                                      <b> {{ GetTransitionSchoolYear.docnumber }} </b>
                                  </td>
                              </tr>
                              <tr>
                                  <td> {{ $t('docdate') }} :</td>
                                  <td class="text-right"> <b> {{ GetTransitionSchoolYear.docdate }} </b> </td>
                              </tr>
                              <tr>
                                  <td> {{ $t('fromschoolyear') }} :</td>
                                  <td class="text-right"> <b> {{ GetTransitionSchoolYear.fromschoolyearname }} </b> </td>
                              </tr>
                              <tr>
                                  <td> {{ $t('toschoolyear') }} :</td>
                                  <td class="text-right"> <b> {{ GetTransitionSchoolYear.toschoolyearname }} </b> </td>
                              </tr>
                          </table>
                      </b-col>
                      <b-col sm="12" md="6">
                          <table>
                              <tr>
                                  <td> {{ $t('detailinfo') }} : </td>
                                  <td class="text-right"> <b> {{ GetTransitionSchoolYear.detailinfo }} </b> </td>
                              </tr>
                              <tr>
                                  <td> {{ $t('status') }}  :</td>
                                  <td> <b-badge :variant="getItemColor(GetTransitionSchoolYear.statusname)"> {{ GetTransitionSchoolYear.statusname }} </b-badge> </td>
                              </tr>
                          </table>
                      </b-col>
                  </b-row>
              </b-card>
              <b-card>
                 <b-table
                    :fields="fields"
                    :items="TransitionSchoolYear"
                    bordered
                   
                    responsive="sm"
                    striped
                    small
                    sticky-header="75vh"
                    no-border-collapse
                    foot-row-variant="info"
                 >
                    <template v-slot:custom-foot>
                        <tr>
                            <td colspan="2" class="text-center"> <b> {{ $t('Total') }} </b> </td>
                            <td class="text-center"> <b> {{ calcTotal() }} </b> </td>
                        </tr>
                    </template>
                    <template v-slot:cell(actions)="{ item, index }">
              <div class="text-center">
                <b-link
                      id="show-btn"
                      @click="showModal(item, index)"
                      v-c-tooltip="{ content: $t('View') }"
                    >
                      <b-icon scale="1.2" icon="eye"></b-icon>
                      <!-- <i class="bi bi-eye"></i> -->
                    </b-link>
                     <b-modal :id="'my-modal' + index"  size="xl" hide-footer>
                    <div class="row m-2">
                      <div class="col">
                        <b-table
                          :fields="fields1"
                          bordered
                          :items="items1"
                          style="min-height: 100px"
                          responsive="sm"
                          :busy="isLoading"
                         
                          sticky-header="60vh"
                          no-border-collapse
                          no-footer-sorting
                          striped
                          show-empty
                        >
                          <template v-slot:empty>
                            <h5 class="text-center">{{ $t("NoItems") }}</h5>
                          </template>
                          <!-- <template #cell(price)="{ item }">
                            {{
                              $options.filters.currency(item.price, {
                                symbol: "  ",
                                fractionCount: 2,
                              })
                            }}
                          </template>
                          <template #cell(status_name)="{ item }">
                            <span
                              :class="
                                `badge rounded-pill bg-${$getItemColor(
                                  item
                                )} ms-1`
                              "
                            >
                              {{
                                item.status_name == "Winner"
                                  ? "Победитель"
                                  : "Отменено"
                              }}
                            </span>
                          </template> -->
                        </b-table>
                      </div>
                    </div>
                  </b-modal>
              </div>
            </template>
                 </b-table>
              </b-card>
          </b-col>
          <b-col sm="12" md="2">
              <b-button variant="danger" @click="$router.push({ name : 'TransitionSchoolYear' })" size="sm" block> {{ $t('back') }} </b-button>
              <b-button v-if="$route.query.isremain == false && GetTransitionSchoolYear.CanApprove" variant="success" size="sm" block @click="OpenApproveModal">  {{ $t('Approve') }} </b-button>
              <b-button v-if="$route.query.isremain == true && TransitionSchoolYear.length > 0" variant="success" size="sm" block @click="OpenRefreshApproveModal">  {{ $t('RefreshApprove') }} </b-button>
              <b-button v-if="GetTransitionSchoolYear.CanCancelApprove && $route.query.isremain == false" variant="danger" size="sm" block @click="OpenCancelApproveModal">  {{ $t('CancelApproval') }} </b-button>
          </b-col>
      </b-row>
      <b-modal v-model="ApproveModal" :title="$t('Approve')" no-close-on-backdrop hide-footer>
          <b-row class="mb-3">
              <b-col>
                  <label for=""> {{ $t('inn') }} </label>
                  <b-form-input v-model="ObjectforApprove.inn"></b-form-input>
              </b-col>
          </b-row>
          <h5> {{ $t('WantApprove') }} </h5>
          <b-row>
              <b-col class="text-right">
                  <b-button class="mr-2" @click="ApproveModal = false" variant="danger"> {{ $t('no') }} </b-button>
                  <b-button @click="Approve" variant="success"> <b-spinner small v-if="ApproveLoading"></b-spinner> {{ $t('yes') }} </b-button>
              </b-col>
          </b-row>
      </b-modal>
      <b-modal v-model="RefreshApproveModal" :title="$t('RefreshApprove')" no-close-on-backdrop hide-footer>
          <b-row class="mb-3">
              <b-col>
                  <label for=""> {{ $t('inn') }} </label>
                  <b-form-input v-model="ObjectforApprove.inn"></b-form-input>
              </b-col>
          </b-row>
          <!-- <h5> {{ $t('WantRefreshApprove') }} </h5> -->
          <b-row>
              <b-col class="text-right">
                  <b-button class="mr-2" @click="RefreshApproveModal = false" variant="danger"> {{ $t('no') }} </b-button>
                  <b-button @click="RefreshApprove" variant="success"> <b-spinner small v-if="ApproveLoading"></b-spinner> {{ $t('yes') }} </b-button>
              </b-col>
          </b-row>
      </b-modal>
      <b-modal v-model="CancelApproveModal" :title="$t('CancelApproval')" no-close-on-backdrop hide-footer>
          <b-row class="mb-3">
              <b-col>
                  <label for=""> {{ $t('inn') }} </label>
                  <b-form-input type="text"  v-model="ObjectforCancelApprove.inn"></b-form-input>
              </b-col>
          </b-row>
          <h5> {{ $t('WantCancelApproval') }} </h5>
          <b-row>
              <b-col class="text-right">
                  <b-button class="mr-2" @click="CancelApproveModal = false" variant="danger"> {{ $t('no') }} </b-button>
                  <b-button @click="CancelApproval" variant="success"> <b-spinner small v-if="CancelApproveLoading"></b-spinner> {{ $t('yes') }} </b-button>
              </b-col>
          </b-row>
      </b-modal>
  </b-overlay>
</template>

<script>
import { BRow,BCol,BCard,BOverlay,BTable,BSpinner,BLink,BIcon } from 'bootstrap-vue'
import TransitionSchoolYearService from '@/services/transitionSchoolYear.service'
export default {
    components : {BRow,BCol,BCard,BOverlay,BTable,BSpinner,BLink,BIcon},
    data(){
        return{
            show : false,
            isLoading : false,
            TransitionSchoolYear : {},
            items1: [],
            GetTransitionSchoolYear : {},
            ApproveLoading : false,
            CancelApproveLoading : false,
            fields : [
                // { key : 'schoolgradecode',label : this.$t('schoolgradecode'),class:'text-center' },
                { key : 'schoolgradename',label : this.$t('schoolgradename'),class:'text-center' },
                // { key : 'schoolgradelettercode',label : this.$t('schoolgradelettercode'),class:'text-center' },
                { key : 'schoolgradelettername',label : this.$t('schoolgradeletter'),class:'text-center' },
                { key : 'studentcount',label : this.$t('studentcount'),class:'text-center' },
                { key : 'actions',label : this.$t('actions'),class:'text-center' },
            ],
            fields1: [
        {
          key: "personname",
          label: this.$t("Student"),
          sort: true,
          tdClass: "text-center",
          thClass: "text-center",
          thStyle: { width: "10% !important" },
        },
      ],
            ApproveModal : false,
            CancelApproveModal : false,
            ObjectforApprove : {
                inn : ''
            },
            ObjectforCancelApprove : {
                inn : ''
            },
            RefreshApproveModal : false,
            GetRemainStudentsList : []
        }
    },
    created(){
        this.show = true
        TransitionSchoolYearService.Get(this.$route.params.id).then(res => {
            this.GetTransitionSchoolYear = res.data
            this.show = false
        }).catch(error => {
            this.$makeToast(error.response.data.error,this.$t('error'),'danger')
        })
        if(this.$route.query.isremain == true){
            TransitionSchoolYearService.GetRemainStudents(this.$route.params.id).then(res => {
                this.TransitionSchoolYear = res.data
                this.show = false
            })
        }
        else{
            TransitionSchoolYearService.GetDetail(this.$route.params.id).then(res => {
                this.TransitionSchoolYear = res.data
                this.show = false
            }).catch(error => {
                this.$makeToast(error.response.data.error,this.$t('error'),'danger')
            })
        }
        
        
    },
    methods:{
        calcTotal(){
            var s = 0
            this.TransitionSchoolYear.forEach(function(item){
                s+=item.studentcount
            })
            return s
        },
        showModal(item, index) {
      this.$bvModal.show('my-modal' + index)
      TransitionSchoolYearService.GetStudents(this.$route.params.id, item.schoolgradeid, item.schoolgradeletterid)
        .then((res) => {
            this.isLoading = true;
          this.items1 = res.data;
          this.isLoading = false;
        })
        .catch(error => {
                this.$makeToast(error.response.data.error,this.$t('error'),'danger')
            })
    },
        OpenApproveModal(){
            this.ApproveModal = true
            this.ObjectforApprove.inn = ""
        },
        OpenRefreshApproveModal(){
            this.RefreshApproveModal = true
            this.ObjectforApprove.inn = ""
        },
        OpenCancelApproveModal(){
            this.CancelApproveModal = true
            this.ObjectforCancelApprove.inn = ""
        },
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
        RefreshApprove() {
            var self = this;
            this.ApproveLoading = true
            TransitionSchoolYearService.RefreshApprove(this.$route.params.id,this.ObjectforApprove.inn)
                .then((res) => {
                this.RefreshApproveModal = false
                this.ApproveLoading = false
                this.$router.go(-1)
                self.$makeToast(
                    self.$t("AcceptMessage"),
                    self.$t("message"),
                    "success"
                );
                })
                .catch((error) => {
                    this.ApproveLoading = false
                self.$makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
                });
        },
        Approve() {
            var self = this;
            this.ApproveLoading = true
            TransitionSchoolYearService.Approve(this.$route.params.id,this.ObjectforApprove.inn)
                .then((res) => {
                this.ApproveModal = false
                this.ApproveLoading = false
                this.$router.go(-1)
                self.$makeToast(
                    self.$t("AcceptMessage"),
                    self.$t("message"),
                    "success"
                );
                })
                .catch((error) => {
                    this.ApproveLoading = false
                self.$makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
                });
        },
        CancelApproval() {
            var self = this;
            this.CancelApproveLoading = true
            TransitionSchoolYearService.CancelApproval(this.$route.params.id,this.ObjectforCancelApprove.inn)
                .then((res) => {
                this.CancelApproveLoading = false
                this.CancelApproveModal = false
                this.$router.go(-1)
                self.$makeToast(
                    self.$t("AcceptMessage"),
                    self.$t("message"),
                    "success"
                );
                })
                .catch((error) => {
                    this.CancelApproveLoading = false
                self.$makeToast(
                    error.response.data.error,
                    self.$t("message"),
                    "danger"
                );
                });
        },
    }
}
</script>

<style>

</style>
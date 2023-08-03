<template>
  <b-container fluid>
      <b-row>
          <b-col sm="7">
              <div class="d-flex">
                <b-form-select value-field="id" style="width : 60%" text-field="name" class="mr-2" v-model="filter.DocumentType" @change="ChangeDocumentType" :options="DocumentTypeList" >
                    <template #first>
                        <b-form-select-option :value="null" disabled>-- {{ $t('ChooseBelow') }} --</b-form-select-option>
                    </template>
                </b-form-select>
                <b-form-select class="mr-2" style="width : 40%" text-field="name" value-field="name" v-if="filter.DocumentType === 1" v-model="filter.DocumentSeries" :options="DocSeriesList">
                    <template #first>
                        <b-form-select-option :value="0" disabled>-- {{ $t('docseries') }} --</b-form-select-option>
                    </template>
                </b-form-select>
                <b-input v-if="filter.DocumentType !== 1" class="mr-2" style="width : 40%" :placeholder="$t('docseries')" v-model="filter.DocumentSeries"></b-input>
                <b-input class="mr-2" style="width : 40%" :placeholder="$t('docnumber')" v-model="filter.DocumentNumber"></b-input>
                <b-input-group >
                    <b-form-input :placeholder="$t('search')" v-model="filter.Search"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="primary" @click="Refresh"> <b-icon icon="search"></b-icon> {{ $t("Search") }} </b-button>
                    </b-input-group-append>
                </b-input-group>
              </div>
          </b-col>
          <b-col sm="5" class="text-right">
              <b-button variant="primary" @click="AddModal"> <b-icon icon="plus"></b-icon> {{ $t('Add') }}  </b-button>
          </b-col>
      </b-row>
      <b-row class="mt-2">  
          <b-col>
               <vs-table
                    :data="StudentList"
                    @sort="handleSort"
                    @selected="SelectedItem"
                    v-model="selected"
                    style="border:1px solid #eee"
                    :max-items="filter.PageLimit"
                >
                <template slot="thead">
                    <!-- <vs-th sort-key="identitydocument">
                        {{$t('identitydocument')}}
                    </vs-th>
                    <vs-th sort-key="inn">
                        {{$t('inn')}}
                    </vs-th> -->
                    <vs-th sort-key="fullname">
                        {{$t('fio')}}
                    </vs-th>
                    <vs-th sort-key="documentseries">
                        {{$t('documentseries')}}
                    </vs-th>
                    <vs-th sort-key="documentnumber">
                        {{$t('documentnumber')}}
                    </vs-th>
                    <vs-th sort-key="dateofbirth">
                        {{$t('dateofbirth')}}
                    </vs-th>
                    <vs-th sort-key="nationality">
                        {{$t('nationality')}}
                    </vs-th>
                    <vs-th sort-key="contactinfo">
                        {{$t('contactinfo')}}
                    </vs-th>
                    <vs-th sort-key="pinfl">
                        {{$t('pinfl')}}
                    </vs-th>
                </template>
                 <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <!-- <vs-td :data="data[indextr].identitydocument">
                                {{data[indextr].identitydocument}}
                            </vs-td>

                            <vs-td :data="data[indextr].inn">
                                {{data[indextr].inn}}
                            </vs-td> -->

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fullname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].documentseries}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].documentnumber}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].dateofbirth}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].nationality}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].contactinfo}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].pinfl}}
                            </vs-td>
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
      </b-row>
      <b-modal ref="my-modal" size="xl" v-model="createModal" hide-footer hide-header no-close-on-backdrop>
          <header class="modal-header">
            <h5 class="modal-title">{{$t('Student')}}</h5>
            <button
              type="button"
              aria-label="Close"
              class="close"
              @click="showModal('createModal',false)"
            >×</button>
          </header>
          <div class="modal-body">
            <edit-person-component
              :show-back-button="false"
              :person-type-id="1"
              @success="studentCreated($event)"
            ></edit-person-component>
          </div>
        </b-modal>
  </b-container>
</template>

<script>
import PersonService from '@/services/person.service'
import editPersonComponent from "@/views/PersonalInfo/Person/edit";
import IdentityDocumentService from "@/services/IdentityDocument.service";
export default {
    components : {editPersonComponent},
    props : {
        isAllStudent : {
            default : false,
            type : Boolean
        }
    },
    data(){
        return{
            DocSeriesList : [],
            createModal : false,
            StudentList : [],
            filter : {
                PageLimit : 20,
                DocumentSeries : 0,
                DocumentNumber : '',
                Search : '',
                SortColumn : '',
                OrderType : 'asc',
                PageNumber : 1,
                DocumentType : 1
            },
            selected : [],
            totalItems : 0,
            Loading : false,
            DocumentTypeList : []
        }
    },
    created(){
        IdentityDocumentService.GetAllIdentityDocSeries(
           1
        ).then((res) => {
            this.DocSeriesList = res.data.result;
        });
        IdentityDocumentService.GetAll().then(res => {
            this.DocumentTypeList = res.data.result
        })
        this.Refresh()
    },
    methods : {
        handleSort(key, active) {

        },
        AddModal(){
            this.showModal("createModal",true)
        },
        SelectedItem(){
            this.$emit("SelectedItem",this.selected)
        },
        Refresh(){
            this.Loading = true
            PersonService.GetStudentList(
                this.filter.DocumentSeries,
                this.filter.DocumentNumber,
                this.filter.Search,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit,
                this.isAllStudent
            ).then(res => {
                this.StudentList = res.data.rows
                this.totalItems = res.data.total
                this.Loading = false
            })
        },
        ChangeDocumentType(){
            this.filter.DocumentSeries = ''
            this.filter.DocumentNumber = ''
            this.filter.DateOfBirth = ''
        },
        showModal(modal, value) {
            this.$data[modal] = value;
        },
        studentCreated(data) {
            (data);
            this.showModal("createModal", false);
                this.Refresh()
        },
    },
    watch:{
        'filter.PageNumber':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        },
        'filter.HREmpAppointOrderTypeID':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        },
        'filter.DepartmentID':{
            handler(oldValue,newValue){
                this.Refresh()
            }
        }
    }
}
</script>

<style>

</style>
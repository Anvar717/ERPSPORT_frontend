<template>
  <b-container fluid>
    <b-row>
        <b-col sm="12" lg="5">
                <CInput
                    :placeholder="$t('search')"
                    v-model="filter.Search"
                    v-on:keyup.enter="Refresh"
                    >
                    <template #append>
                        <CButton
                        @click="Refresh"
                        size="sm"
                        type="button"
                        color="primary"
                        >
                        <b-icon icon="search"></b-icon>
                        {{ $t("search") }}
                        </CButton>
                    </template>
                </CInput>
        </b-col>
        <b-col>
        </b-col>
        <b-col class="text-right">
        </b-col>
    </b-row>
    <b-row>
      <b-col>
        <vs-table
                :data="OrgList"
                @sort="handleSort"
                @selected="SelectedItem"
                v-model="selected"
                style="border:1px solid #eee"
                :max-items="filter.PageLimit">
                <template slot="thead">
                    <vs-th sort-key="id">
                        {{$t('id')}}
                    </vs-th>
                    <vs-th sort-key="shortname">
                        {{$t('shortname')}}
                    </vs-th>
                    <vs-th sort-key="fullname">
                        {{$t('fullname')}}
                    </vs-th>
                    <vs-th sort-key="inn">
                        {{$t('inn')}}
                    </vs-th>
                    <!-- <vs-th sort-key="gender">
                        {{$t('gender')}}
                    </vs-th> -->
                    <vs-th sort-key="oblast">
                        {{$t('oblast')}}
                    </vs-th>
                    <vs-th sort-key="region">
                        {{$t('region')}}
                    </vs-th>
                    <vs-th sort-key="parentname">
                        {{$t('parentname')}}
                    </vs-th>
                    <vs-th sort-key="zipcode">
                        {{$t('zipcode')}}
                    </vs-th>
                    <vs-th sort-key="adress">
                        {{$t('adress')}}
                    </vs-th>

                    <vs-th sort-key="contactinfo">
                        {{$t('contactinfo')}}
                    </vs-th>
                    <!-- <vs-th sort-key="workschedule">
                        {{$t('workschedule')}}
                    </vs-th> -->
                </template>
                <template slot-scope="{data}" style="overflow-y:scroll;height:400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading" @dblclick.native="$emit('DblClick',tr)">
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].id}}
                            </vs-td>

                            <vs-td :data="data[indextr].shortname">
                                {{data[indextr].shortname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].fullname}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].inn}}
                            </vs-td>
                            <!-- <vs-td :data="data[indextr].id">
                                {{data[indextr].gender}}
                            </vs-td> -->
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].oblast}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].region}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].parentname}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].zipcode}}
                            </vs-td>
                            <vs-td :data="data[indextr].id">
                                {{data[indextr].adress}}
                            </vs-td>

                            <vs-td :data="data[indextr].id">
                                {{data[indextr].contactinfo}}
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
    </b-row>
  </b-container>
</template>

<script>
import OrganizationService from '@/services/organization.service'
export default {
  props : {
      regionid : {
          type : Number,
          default : 0
      },
      isfarmfy : {
          type : Boolean,
          default : false
      }
  },  
  data:()=>({
    filter : {
      Search  :'',
      SortColumn : '',
      OrderType : 'asc',
      PageNumber  : 1,
      PageLimit : 10
    },
    totalItems  :0,
    OrgList : [],
    selected : [],
    Loading : false
  }),
  created(){
      this.Refresh()
  },
  methods :{
    Refresh(){
      this.Loading  = true
      OrganizationService.GetList(
            this.filter.Search,
            this.filter.SortColumn,
            this.filter.OrderType,
            this.filter.PageNumber,
            this.filter.PageLimit,
            this.regionid,
            this.isfarmfy
        ).then(res => {
        this.OrgList = res.data.rows
        this.totalItems = res.data.total
        this.Loading = false
      })
    },
    handleSort(key, active) {

    },
    SelectedItem(){
      this.$emit("SelectedItem",this.selected)
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
<template>
  <CRow>
    <CCol sm="12" md="12">
      <CCard accent-color="primary">
        <h3 class="text-center mt-3">{{$t('OnlineRating')}}</h3>
        <CCardHeader>
          <b-row>
            <b-col>
              <CInput
                :placeholder="$t('Search')"
                autocomplete="text"
                v-model="filter.Search"
                v-on:keyup.enter="Search"
              >
                <template #append>
                  <CButton
                    @click="Search"
                    size="sm"
                    type="button"
                    color="primary"
                  >
                    <b-icon icon="search"></b-icon>
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
            </b-col>
            <b-col>
              <div class="d-flex">
                <CButton
                  @click="Refresh"
                  size="sm"
                  color="primary"
                  style="height:35px"
                  class="mr-2"
                >
                  <b-icon icon="arrow-repeat"> </b-icon>
                  {{ $t('Refresh') }}
                </CButton>
                <CButton
                  @click="Print"
                  color="primary"
                  class="mr-2"
                  size="sm"
                >
                  <b-icon icon="printer"></b-icon>
                  &nbsp; {{ $t("Export") }}
                </CButton>
              </div>
            </b-col>
            <b-col>
              <CButton
                color="danger"
                class="float-right mr-2"
                @click="$router.push('/')"
                size="sm"
                style="height:35px"
              >
                <b-icon icon="arrow-left-short" ></b-icon>
                {{$t('back')}}
              </CButton>
            </b-col>
          </b-row>
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
            @row-clicked="rowclicked"
            striped
            sticky-header="60vh"
            no-border-collapse
            bordered
          >
            <template v-slot:head(code)>
              <div style="cursor : pointer" @click="ChangeSort('code')">
                {{$t('id')}}
                <b-icon v-if="filter.SortColumn === 'code'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuedate)>
              <div style="cursor : pointer" @click="ChangeSort('queuedate')">
                {{$t('queuedate')}}
                <b-icon v-if="filter.SortColumn === 'queuedate'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(queuetime)>
              <div style="cursor : pointer" @click="ChangeSort('queuetime')">
                {{$t('queuetime')}}
                <b-icon v-if="filter.SortColumn === 'queuetime'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(oblastname)>
              <div style="cursor : pointer" @click="ChangeSort('oblastname')">
                {{$t('oblastname')}}
                <b-icon v-if="filter.SortColumn === 'oblastname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(regionname)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('regionname')">
                {{$t('regionname')}}
                <b-icon v-if="filter.SortColumn === 'regionname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(organizationname)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('organizationname')">
                {{$t('organizationname')}}
                <b-icon v-if="filter.SortColumn === 'organizationname'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(rating)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('rating')">
                {{$t('rating')}}
                <b-icon v-if="filter.SortColumn === 'rating'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(mobilenumber)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('mobilenumber')">
                {{$t('mobilenumber')}}
                <b-icon v-if="filter.SortColumn === 'mobilenumber'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            <template v-slot:head(comment)>
              <div class="text-center" style="cursor : pointer" @click="ChangeSort('comment')">
                {{$t('comment')}}
                <b-icon v-if="filter.SortColumn === 'comment'" :icon="filter.SortIcon"></b-icon>
              </div>
            </template>
            
           
            <template v-slot:empty>
              <h5 class="text-center">{{$t('NoItems')}}</h5>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-primary my-2 mt-5" style="vertical-align:middle">
                <b-spinner class="align-middle mr-2"></b-spinner>
                <strong>{{$t('Loading')}}</strong>
              </div>
            </template>
          </b-table>
          <div class="pb-4">
            <div style="float:left;font-size:12px">
              {{$t('RecordsFrom')}} {{firstNumber}} {{$t('by')}} {{lastNumber}} {{$t('of')}}
              {{totalRows}}
            </div>
            <div style="float:left" class="ml-2 mr-2 mt-n1">
              <b-form-select
                v-model="filter.PageLimit"
                id="PageLimitSelect"
                size="sm"
                :options="filter.pageOptions"
              ></b-form-select>
            </div>
            <div style="float:left;font-size:12px">{{$t('RecordsPerPage')}}</div>
            <div style="float:right">
              <b-pagination
                v-model="filter.PageNumber"
                :total-rows="totalRows"
                :per-page="filter.PageLimit"
                align="right"
                size="sm"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import OnlineQueueInfoService from "@/services/OnlineQueueInfo.service";
export default {
  data() {
    return {
      templaterow: {
        Description: "",
        code: ""
      },
      isschool: false,
      fields: [
        
        {
          key: "code",
          label: this.$t("id"),
          sortable: false
        },
        {
          key: "queuedate",
          label: this.$t("queuedate"),
          sortable: false
        },
        {
          key: "queuetime",
          label: this.$t("queuetime"),
          sortable: false
        },
        {
          key: "oblastname",
          label: this.$t("oblastname"),
          sortable: false
        },
        {
          key: "regionname",
          label: this.$t("regionname"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "organizationname",
          label: this.$t("organizationname"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "rating",
          label: this.$t("rating"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "mobilenumber",
          label: this.$t("mobilenumber"),
          sortable: false,
          class: "text-left"
        },
        {
          key: "comment",
          label: this.$t("comment"),
          sortable: false,
          class: "text-left"
        }
      ],
 
      items: [],
      totalRows: "",
      isBusy: true,
      filter: {
        StartDate: "",
        EndDate: "",
        Search: "",
        SortColumn: "",
        OrderType: "asc",
        PageNumber: 1,
        PageLimit: 20,
        pageOptions: [5, 10, 15, 20, 25, 50, 100],
        SortIcon : "arrow-up",
        
      },
      SendBatchSMS:{
        ondate : '',
        message : ''
      },
      messagelength : 0,
    };
  },
  created() {
    this.createDate();
    this.Refresh();
  },
  computed: {
    firstNumber() {
      return this.totalRows > 0
        ? (this.filter.PageNumber - 1) * this.filter.PageLimit + 1
        : 0;
    },
    lastNumber() {
      if (this.totalRows < this.filter.PageLimit) {
        return this.totalRows;
      } else {
        if (this.filter.PageNumber * this.filter.PageLimit > this.totalRows) {
          return this.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    }
  },
  methods: {
   
    
    createDate() {
      var todaydate = new Date();
      var dd = String(todaydate.getDate()).padStart(2, "0");
      var mm = String(todaydate.getMonth() + 1).padStart(2, "0");
      var yyyy = todaydate.getFullYear();
      this.filter.StartDate = dd + "." + mm + "." + yyyy;
      this.filter.EndDate = dd + "." + mm + "." + yyyy;
    },
    getItemColor(text) {
      return text === "Принято"
        ? "success"
        : text === "Не принято"
        ? "danger"
        : "primary";
    },
    rowclicked() {},
    Print() {
      OnlineQueueInfoService.PrintRating(
        
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
      )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
            new Blob([response.data], response.headers)
          );
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "onlinerating.xlsx");

          fileLink.click();
        })
        .catch((e) => {
          let response = JSON.parse(e.request.response);

          self.makeToast(response.error, self.$t("actions.error"), "danger");
        });
      
    },
   

    Search() {
      if (this.filter.PageNumber !== 1) {
        this.filter.PageNumber = 1;
      } else {
        this.Refresh();
      }
    },
    Refresh() {
      this.isBusy = true;
      OnlineQueueInfoService.GetOnlineRatingList(
       
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit
       
      ).then(res => {
        this.isBusy = false;
        this.items = res.data.data.rows;
        this.totalRows = res.data.data.total;
       
      });
    },
    makeToast(message, title, type) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    },
    ChangeSort(columnName) {
      this.filter.SortColumn = columnName;
      if (this.filter.OrderType == "asc") {
        this.filter.SortIcon = "arrow-down";
        this.filter.OrderType = "desc";
      } else {
        this.filter.SortIcon = "arrow-up";
        this.filter.OrderType = "asc";
      }
      this.Refresh();
    }
  },
  watch: {
    "filter.PageNumber": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
    "filter.PageLimit": {
      handler(newValue, oldValue) {
        if (newValue) {
          this.Refresh();
        }
      }
    },
    "filter.statusid":{
      handler(newValue,oldValue){
        if(newValue){
          this.Refresh()
        }
      }
    },
  }
};
</script>

<style>
</style>
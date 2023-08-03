<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("TourniquetDeviceLog") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <b-col lg="2" style="margin-left:55px">
              <v-select
                class="fname-select"
                :options="SearchTypeList"
                :reduce="(item) => item.id"
                :placeholder="$t('Aboniment raqami yoki QR code')"
                label="name"
                v-model="filter.searchtype"
                @input="ChangeSearchType"
              ></v-select>
            </b-col>
            <!-- <b-col lg="3" md="3" sm="11" class="text-left">
              <custom-search
                v-model="filter.fakeSearch"
                @search="Search"
              ></custom-search>
            </b-col> -->
            <b-col lg="3">
              <CInput id='searchinputid' v-model="filter.fakeSearch" @keyup.native.enter="Search" :placeholder="$t('search')">
                <template #append>
                  <CButton @click="Search" type="button" color="primary">
                    <b-icon icon="search"></b-icon>
                    {{$t('search')}}
                  </CButton>
                </template>
              </CInput>
            </b-col>
            <b-col>
                <CButton
                  @click="Clear"
                  color="danger"
                  style="width:100px"
                >{{ $t("Clear") }}
                </CButton>
            </b-col>
          </CRow>
          <CRow class="mt-2">
            <CCol sm="4">
              <b-row>
                <b-col sm="12" lg="7" md="7" class="text-center mt-2">
                  <div
                    class="person-member-img"
                    style="justify-content: inherit !important; margin-left: 36px;"
                  >
                    <img
                      :src="
                        personphoto
                          ? axios.defaults.baseURL +
                            'FileManage/Get?id=' +
                           personphoto
                          : 'data:image/jpg;base64,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'
                      "
                      class="img-thumbnail float-end"
                      fluid
                      style="width: 150px; height: 180px; object-fit: cover; margin-left: 20px;"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row style="width:290px" align-h="center">
                <h4 class="mt-2">{{ currentDate }} {{ $t("Year") }}</h4>
              </b-row>
              <b-row style="width:290px" align-h="center">
                <h5>{{ currentTime }}</h5>
              </b-row>
              <b-row lg="7" md="6" sm="12" class="text-lg-right mt-2" style="margin-left: 55px;">
                <CButton
                  @click="Came"
                  color="primary"
                  class="mr-2"
                  size="sm"
                  style="width:70px"
                >{{ $t("Keldi") }}</CButton>
                <CButton
                  @click="Gone"
                  color="danger"
                  class="float-sm-right mr-2"
                  size="sm"
                  style="width:70px"
                >{{ $t("Ketdi") }}</CButton>
              </b-row>
            </CCol>
            <CCol sm="8">
              <CRow>
                <CCol sm="6">
                  <table class="my-table-padding">
                    <tr>
                      <td style="width: 40%">{{ $t("fio") }}:</td>
                      <th style="width: 40%;">{{ PersonInfo.personmembername }}</th>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ $t("membershiptable") }}:</td>
                      <th style="width: 40%">{{ PersonInfo.docnumber }}</th>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ $t("Sport turi") }}:</td>
                      <th style="width: 40%">{{ }}</th>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ $t("aboniment summasi") }}:</td>
                      <th style="width: 40%">{{ PersonInfo.amount}}</th>
                    </tr>
                  </table>
                </CCol>
                <CCol sm="6">
                  <table class="my-table-padding">
                    <tr>
                      <td style="width: 40%">{{ $t("restamount") }}:</td>
                      <th style="width: 40%;">{{ }}</th>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ $t("visitcount") }}:</td>
                      <th style="width: 40%">{{ PersonInfo.visitcount }}</th>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ $t("Foydalanilmagan qatnovlar soni") }}:</td>
                      <th style="width: 40%">{{ }}</th>
                    </tr>
                  </table>
                </CCol>
              </CRow>
              <CRow class="mt-5">
                <!-- <CCol sm="12" lg="4" md="4"></CCol> -->
                <CCol sm="9">
                  <b-table
                    :fields="fields"
                    :items="historytourniquetdeviceLog"
                    style="white-space: nowrap; width: 900px;height:213px"
                    small="small"
                    responsive="sm"
                    class="generalTableClass"
                    show-empty
                    striped
                    sticky-header="60vh"
                    no-border-collapse
                    bordered
                  >
                    <template v-slot:empty>
                      <h6 class="text-center">{{ $t("NoItems") }}</h6>
                    </template>
                    <template v-slot:cell(index)="{ index }">
                      <p class="m-0">{{ index + 1 }}</p>
                    </template>
                  </b-table>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton
                class="ml-4"
                size="sm"
                color="danger"
                @click="$router.push('/' )"
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
      </CCard>
    </CCol>
  </CRow>
</template>
  
  <script>
import GuestRegistrationService from "@/services/GuestRegistration.service";
import MemberShipService from "@/services/MemberShip.service";
import TourniquetDeviceLogService from "@/services/TourniquetDeviceLog.service";
import EmployeeListComponent from "@/components/EmployeeList";
import CustomDatePicker from "@/components/customDatePicker.vue";
import FileManageService from "@/services/filemanage.service";
import axios from "axios";
export default {
  components: { CustomDatePicker, EmployeeListComponent, axios },
  data() {
    return {
      SaveLoading: false,
      open: false,
      value: null,
      personphoto: "",
      currentDate: "",
      currentTime: "",
      fakeSearch: "",
      isinputdevice: false,
      openendtime: false,
      receiverpersonlist: [],
      historytourniquetdeviceLog: [],
      personvalue: {},
      PersonInfo: {},
      personmemberphoto: {},
      SportsmenList: [],
      SearchTypeList: [
        { id: 1, name: this.$t("membershiptable") },
        { id: 2, name: this.$t("QrCode") }
      ],
      axios,
      fields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          style: "width:10%",
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "eventdate",
          label: this.$t("ondate"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "entertime",
          label: this.$t("Kelgan vaqti"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          key: "exittime",
          label: this.$t("Ketgan vaqti"),
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center"
        },
      ],
      filter: {
        personmembernumber: "",
        QrCodeExtends: "",
        searchtype: 2,
      },
      Data: {
        documentid: 0,
        personid: 0,
        eventdate: "",
        isinputdevice: true
      }
    };
  },
  created() {
      if(this.filter.searchtype == 2){
        setTimeout(() => {document.getElementById("searchinputid").focus()}, 100)
      }
    this.Refresh();
  },
  mounted() {
    this.getCurrentDateTime();
    setInterval(() => {
      this.getCurrentDateTime();
    }, 1000);
  },
  methods: {
    Search() {
      if (this.filter.searchtype === 1) {
        this.filter.personmembernumber = this.filter.fakeSearch;
      }
      if (this.filter.searchtype === 2) {
        this.filter.QrCodeExtends = this.filter.fakeSearch;
      }
      this.Refresh();
    },
    Refresh() {
      MemberShipService.GetMemberShipPersonmemberInfo(
        0,
        this.filter.personmembernumber,
        this.filter.QrCodeExtends
      ).then(res => {
        this.PersonInfo = res.data;
        this.historytourniquetdeviceLog = res.data.HistoryTourniquetDeviceLog;
        this.personphoto = res.data.personmemberphoto.attachmentfileid;
      })
      .catch(error => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    Came() {
      let currentTimeDate = new Date();
      this.Data.documentid = this.PersonInfo.id;
      this.Data.personid = this.PersonInfo.personmemberid;
      this.Data.isinputdevice = true;
      this.Data.eventdate = currentTimeDate
      TourniquetDeviceLogService.InsertMembershipInputOutputLog(this.Data).then(res => {
        this.Refresh()
      });
    },
    Gone() {
      let currentTimeDate = new Date();
      this.Data.documentid = this.PersonInfo.id;
      this.Data.personid = this.PersonInfo.personmemberid;
      this.Data.isinputdevice = false;
      this.Data.eventdate = currentTimeDate
      TourniquetDeviceLogService.InsertMembershipInputOutputLog(this.Data).then(res => {
        this.Refresh()
      });
    },
    Clear(){
        this.filter.fakeSearch = "";
        this.filter.searchtype = "";
        // this.filter.PersonInfo = "";
        // this.filter.personphoto = "";
        // this.filter.historytourniquetdeviceLog = "";
    },
    ChangeSearchType() {
      this.filter.personmembernumber = "";
      this.filter.QrCodeExtends = "";
      this.filter.fakeSearch = "";
      if(this.filter.searchtype == 2){
        setTimeout(() => {document.getElementById("searchinputid").focus()}, 100)
      }
    },
    getCurrentDateTime() {
      const currentDateTime = new Date();
      this.currentDate = currentDateTime.toLocaleDateString();
      this.currentTime = currentDateTime.toLocaleTimeString();
    },
    handleChange(value, type) {
      if (type === "second") {
        this.open = false;
      }
    },
    SaveData() {
      // var self = this;
      // if (!self.check()) {
      //   return false;
      // }
      // GuestRegistrationService.Update(self.Data)
      //   .then(res => {
      //     self.makeToast(
      //       self.$t("SuccessMessage"),
      //       self.$t("message"),
      //       "success"
      //     );
      //     self.$router.push({ name: "GuestRegistration" });
      //   })
      //   .catch(error => {
      //     self.makeToast(
      //       error.response.data.error,
      //       self.$t("message"),
      //       "danger"
      //     );
      //   });
    },
    makeToast(message, title, type) {
      var self = this;
      self.toastCount++;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true
      });
    }
  }
};
</script>
  
  <style lang="scss">
.my-table-padding {
  tr {
    td,
    th {
      font-size: 16px;
      padding-top: 10px;
      padding-bottom: 10px;
      margin-right: 50px;
    }
  }
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
}
.divider::after,
.divider::before {
  content: "";
  border: 1px solid #838996;
  flex: 1;
}
.divider:not(:empty)::before {
  margin-right: 0.25em;
}
.divider:not(:empty)::after {
  margin-left: 0.25em;
}
</style>
  
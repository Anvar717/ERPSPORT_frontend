<template>
  <CRow>
    <CCol>
      <CCard accent-color="primary" class="pb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <h4 class="text-center">{{ $t("CloseMembership") }}</h4>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12" lg="4">
              <CInput type="number" :placeholder="$t('docnumber')" autocomplete="docnumber" horizontal
                :label="$t('docnumber')" v-model="CloseMembership.docnumber" disabled>
              </CInput>
            </CCol>
            <CCol sm="12" lg="4">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-3">{{
                  $t("docdate")
                }}</label>
                <div class="col-sm-9">
                  <date-picker v-model="CloseMembership.docdate" style="width: 100%" size="sm" lang="ru"
                    :placeholder="$t('docdate')" value-type="format" format="DD.MM.YYYY">
                  </date-picker>
                </div>
              </div>
            </CCol>
            <CCol sm="12" lg="4">
              <CInput :placeholder="$t('detail')" autocomplete="detail" horizontal :label="$t('detail')"
                v-model="CloseMembership.detail">
              </CInput>
            </CCol>
          </CRow>
        </CCardBody>
        <c-row>
          <c-col class="text-right mr-3 mb-3">
            <c-button size="sm" color="primary" @click="ClearCloseMembership">
              {{ $t("Clear") }}
            </c-button>
            <c-button class="ml-2" size="sm" color="primary" @click="Filltable">
              {{ $t("Fill") }}
            </c-button>
            <c-button class="ml-2" size="sm" color="primary" @click="OpenPersonMemberModal">
              <b-icon icon="plus"></b-icon> {{ $t("Add") }}
            </c-button>
          </c-col>
        </c-row>
        <CRow>
          <CCol>
            <div class="mobileStyle mx-3">
              <b-table :fields="fields" :items="CloseMembership.Tables" class="bg-color-table text-center"
                style="vertical-align: middle" bordered :tbody-tr-class="rowClass">
                <template #cell(actions)="{ item }">
                  <div class="text-center">
                    <b-link @click="EditItem(item)" class="mr-2" v-c-tooltip="{ content: $t('Edit') }">
                      <b-icon icon="pencil"></b-icon>
                    </b-link>
                    <b-link class="mr-2" v-c-tooltip="{ content: $t('Delete') }" @click="DeleteItem(item)">
                      <b-icon icon="trash"></b-icon>
                    </b-link>
                  </div>
                </template>
              </b-table>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div class="text-left">
              <CButton class="ml-4" size="sm" color="danger" @click="Back()">
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
      <b-modal id="modalmember" no-close-on-backdrop size="xl" :title="$t('PersonMember')" hide-footer
        modal-class="custom-size-modal">
        <active-membership-list :isview="false" @SelectedItem="SelectedPersonMemberItem"
          @DblClick="AddPersonMemberData"></active-membership-list>

        <c-row class="mt-2">
          <c-col class="text-center">
            <b-button class="mr-2" variant="danger" @click="ClosePersonMemberModal">
              {{ $t("back") }}
            </b-button>
            <b-button variant="primary" @click="AddPersonMemberData(personvalue1)">
              {{ $t("Add") }}
            </b-button>
          </c-col>
        </c-row>
      </b-modal>
    </CCol>
  </CRow>
</template>
  
<script>
import CloseMembershipService from "@/services/CloseMembership.service";
import PersonMemberService from "@/services/PersonMember.service";
import ServicePocketService from "@/services/ServicePocket.service";
import CircleSportTypeService from "@/services/CircleSportType.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import ActiveMembershipList from "@/components/ActiveMembershipList"
export default {
  components: { ActiveMembershipList },
  data() {
    return {
      SaveLoading: false,
      personmemberlist: [],
      servicepocketlist: [],
      circlesporttypelist: [],
      membershiptypelist: [],
      membershiplist: [],
      CloseMembership: {},
      personvalue1: {},
      FillData: {},
      items: [],
      selectedrowid: 0,
      lang: "",
      fields: [
        {
          key: "personmembername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("personmembername"),
        },
        {
          key: "servicepocketname",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("servicepocket"),
        },
        {
          key: "sporttypeclassifiername",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("sporttypeclassifiername"),
        },
        {
          key: "membershiptypename",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("membershiptype"),
        },
        {
          key: "membershipdate",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("membershipdate"),
        },
        // {
        //   key: "lastenterdate",
        //   tdClass: "text-left",
        //   thClass: "text-center",
        //   label: this.$t("lastenterdate"),
        // },
        {
          key: "lastenterdate",
          tdClass: "text-left",
          thClass: "text-center",
          label: this.$t("eventdate"),
        },
        // {
        //   key: "actions",
        //   tdClass: "text-center",
        //   thClass: "text-center",
        //   label: this.$t("actions"),
        // },
      ],
      tabrow: {
        id: 0,
        ownerid: 0,
        personmemberid: 0,
        personmembername: "",
        servicepocketid: 0,
        servicepocketname: "",
        circlesporttypeid: 0,
        circlesporttypename: "",
        membershiptypeid: 0,
        membershiptypename: "",
        membershipid: 0,
        membershiptableid: 0,
        membershipdate: "",
        lastenterdate: "",
        eventdate: "",
        Status: 1,
      },
      editedIndex: -1,
    };
  },
  created() {
    var self = this;
    this.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    CloseMembershipService.Get(self.selectedrowid).then((res) => {
      self.CloseMembership = res.data;
    });
    PersonMemberService.GetAll().then((res) => {
      self.personmemberlist = res.data;
    });
    ServicePocketService.GetAll().then((res) => {
      self.servicepocketlist = res.data;
    });
    CircleSportTypeService.GetAll().then((res) => {
      self.circlesporttypelist = res.data;
    });
    MemberShipTypeService.GetAll().then((res) => {
      self.membershiptypelist = res.data;
    });
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    OpenPersonMemberModal() {
      this.$bvModal.show("modalmember");
    },
    Filltable() {
      CloseMembershipService.FillCloseMembership(this.CloseMembership, this.CloseMembership.Tables = []).then((res) => {
        this.CloseMembership.Tables = res.data.Tables
      });
    },
    ClearCloseMembership() {
      CloseMembershipService.ClearCloseMembership(this.$route.params.id).then((res) => {
        this.CloseMembership.Tables = res.data.Tables
      });
    },
    ClosePersonMemberModal() {
      this.$bvModal.hide("modalmember");
    },
    SelectedPersonMemberItem(data) {
      this.personvalue1 = data;
    },
    AddPersonMemberData(data) {
      console.log(data)
      var self = this;
      self.tabrow.id = 0;
      self.tabrow.ownerid = 0;
      self.tabrow.personmemberid = data.personmemberid;
      self.tabrow.personmembername = data.personmembername;
      self.tabrow.servicepocketid = data.servicepocketid;
      self.tabrow.servicepocketname = data.servicepocketname;
      self.tabrow.sporttypeclassifierid = data.sporttypeclassifierid
      self.tabrow.sporttypeclassifiername = data.sporttypeclassifiername
      self.tabrow.membershiptypeid = data.membershiptypeid
      self.tabrow.membershiptypename = data.membershiptypename
      self.tabrow.membershipid = data.membershipid
      self.tabrow.membershiptableid = data.membershiptableid
      self.tabrow.membershipdate = data.docdate
      // self.tabrow.lastenterdate = data.docdate
      self.tabrow.lastenterdate = data.eventdate
      self.CloseMembership.Tables.push(self.tabrow);
      self.ClosePersonMemberModal();
    },
    Back() {
      this.$router.push({
        name: "CloseMembership",
      });
    },
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
    // Add() {
    //   var self = this;
    //   self.CloseMembership.Tables.push(self.tabrow);
    //   self.tabrow = {
    //     id: 0,
    //     ownerid: 0,
    //     personmemberid: 0,
    //     personmembername: "",
    //     servicepocketid: 0,
    //     servicepocketname: "",
    //     circlesporttypeid: 0,
    //     circlesporttypename: "",
    //     membershiptypeid: 0,
    //     membershiptypename: "",
    //     membershipid: 0,
    //     membershiptableid: 0,
    //     membershipdate: "",
    //     lastenterdate: "",
    //     Status: 1,
    //   };
    //   self.$bvModal.hide("AddModal");
    // },
    // OpenModal() {
    //   var self = this;
    //   self.$bvModal.show("AddModal");
    // },
    // AddRow() {
    //   var self = this;
    //   if (!!self.tabrow.personmemberid) {
    //     self.tabrow.personmembername = self.personmemberlist.filter(
    //       (item) => item.id === self.tabrow.personmemberid
    //     )[0].name;
    //   }
    //   if (!!self.tabrow.servicepocketid) {
    //     self.tabrow.servicepocketname = self.servicepocketlist.filter(
    //       (item) => item.id === self.tabrow.servicepocketid
    //     )[0].name;
    //   }
    //   if (!!self.tabrow.circlesporttypeid) {
    //     self.tabrow.circlesporttypename = self.circlesporttypelist.filter(
    //       (item) => item.id === self.tabrow.circlesporttypeid
    //     )[0].name;
    //   }
    //   if (!!self.tabrow.membershiptypeid) {
    //     self.tabrow.membershiptypename = self.membershiptypelist.filter(
    //       (item) => item.id === self.tabrow.membershiptypeid
    //     )[0].name;
    //   }
    //   if (self.editedIndex > -1) {
    //     Object.assign(
    //       self.CloseMembership.Tables[self.editedIndex],
    //       self.tabrow
    //     );
    //   } else {
    //     self.CloseMembership.Tables.push(self.tabrow);
    //   }
    //   self.tabrow = {
    //     id: 0,
    //     ownerid: 0,
    //     personmemberid: 0,
    //     personmembername: "",
    //     servicepocketid: 0,
    //     servicepocketname: "",
    //     circlesporttypeid: 0,
    //     circlesporttypename: "",
    //     membershiptypeid: 0,
    //     membershiptypename: "",
    //     membershipid: 0,
    //     membershiptableid: 0,
    //     membershipdate: "",
    //     lastenterdate: "",
    //     Status: 1,
    //   };
    //   self.$bvModal.hide("AddModal");
    // },
    // EditItem(item) {
    //   item.Status = 2;
    //   this.editedIndex = this.CloseMembership.Tables.indexOf(item);
    //   this.tabrow = Object.assign({}, item);
    //   this.$bvModal.show("AddModal");
    // },
    DeleteItem(item) {
      item;
      item.Status = 3;
    },
    // Close() {
    //   this.$bvModal.hide("AddModal");
    //   this.$nextTick(() => {
    //     this.tabrow = {
    //       id: 0,
    //       ownerid: 0,
    //       personmemberid: 0,
    //       personmembername: "",
    //       servicepocketid: 0,
    //       servicepocketname: "",
    //       circlesporttypeid: 0,
    //       circlesporttypename: "",
    //       membershiptypeid: 0,
    //       membershiptypename: "",
    //       membershipid: 0,
    //       membershiptableid: 0,
    //       membershipdate: "",
    //       lastenterdate: "",
    //       Status: 1,
    //     };
    //     this.editedIndex = -1;
    //   });
    // },
    SaveData() {
      var self = this;
      CloseMembershipService.Update(self.CloseMembership)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "CloseMembership",
          });
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
  
  
  
  
  
  
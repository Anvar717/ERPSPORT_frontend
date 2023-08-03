<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" lg="3" class="achievement-input">
                <v-select :options="DocumentTypeList" class=" fname-select" @change="ChangeDocumentType"
                    :reduce="(item) => item.id" :placeholder="$t('identitydocument')" v-model="filter.identitydocumentid"
                    label="name"></v-select>
            </b-col>
            <b-col sm="12" lg="3" class="achievement-input" v-if="filter.identitydocumentid === 1">
                <v-select :options="DocSeriesList" class=" fname-select" :reduce="(item) => item.name"
                    :placeholder="$t('docseries')" v-model="filter.documentseries" label="name"></v-select>
            </b-col>
            <b-col sm="12" lg="3" class="achievement-input" v-if="filter.identitydocumentid !== 1">
                <b-form-input class="" :placeholder="$t('docseries')" v-model="filter.documentseries"></b-form-input>
            </b-col>
            <b-col sm="12" lg="3" class="achievement-input">
                <b-form-input class="" :placeholder="$t('docnumber')" v-model="filter.documentnumber"></b-form-input>
            </b-col>
            <b-col sm="12" lg="3" class="achievement-input">
                <v-select :options="ServicePocketList" :reduce="(item) => item.id" :placeholder="$t('servicepocket')"
                    label="name" class="fname-select" v-model="filter.servicepocketid"></v-select>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col sm="12" lg="3">
                <v-select :options="MemberShipTypeList" v-model="filter.membershiptypeid" :reduce="(item) => item.id"
                    :placeholder="$t('membershiptype')" label="name" class="fname-select">
                </v-select>
            </b-col>
            <b-col sm="12" lg="3">
                <v-select class=" fname-select" style="width:98%" :options="SportGroupCategoryTypeList"
                    v-model="filter.sportgroupcategorytypeid" :reduce="(item) => item.id"
                    :placeholder="$t('sportgroupcategorytype')" label="name">
                </v-select>
            </b-col>
            <b-col sm="12" lg="3">

            </b-col>
            <b-col sm="12" lg="3" class="text-left">
                <custom-search v-model="filter.Search" @search="Refresh"></custom-search>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <vs-table :data="ActiveMembershipList" @sort="handleSort" @selected="SelectedItem" v-model="selected"
                    style="border: 1px solid #eee" :max-items="filter.PageLimit">
                    <template slot="thead">
                        <vs-th sort-key="docdate">
                            {{ $t("docdate") }}
                        </vs-th>
                        <vs-th sort-key="documentnumber">
                            {{ $t("documentnumber") }}
                        </vs-th>
                        <vs-th sort-key="documentseries">
                            {{ $t("documentseries") }}
                        </vs-th>
                        <vs-th sort-key="membershiptypename">
                            {{ $t("membershiptype") }}
                        </vs-th>
                        <vs-th sort-key="servicepocketname">
                            {{ $t("servicepocket") }}
                        </vs-th>
                        <vs-th sort-key="personmembername">
                            {{ $t("personmembername") }}
                        </vs-th>
                        <vs-th sort-key="personmembershipnumber">
                            {{ $t("personmembershipnumber") }}
                        </vs-th>
                        <vs-th sort-key="eventdate">
                            {{ $t("eventdate") }}
                        </vs-th>
                        <vs-th sort-key="sporttypeclassifiername">
                            {{ $t("sporttypeclassifiername") }}
                        </vs-th>
                    </template>
                    <template slot-scope="{ data }" style="overflow-y: scroll; height: 400px">
                        <vs-tr v-if="Loading" class="text-center">
                            <vs-td colspan="10"><b-spinner variant="primary"></b-spinner></vs-td>
                        </vs-tr>
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" v-show="!Loading"
                            @dblclick.native="$emit('DblClick', tr)">
                            <vs-td :data="data[indextr].docdate">
                                {{ data[indextr].docdate }}
                            </vs-td>
                            <vs-td :data="data[indextr].documentnumber">
                                {{ data[indextr].documentnumber }}
                            </vs-td>
                            <vs-td :data="data[indextr].documentseries">
                                {{ data[indextr].documentseries }}
                            </vs-td>
                            <vs-td :data="data[indextr].membershiptypename">
                                {{ data[indextr].membershiptypename }}
                            </vs-td>
                            <vs-td :data="data[indextr].servicepocketname">
                                {{ data[indextr].servicepocketname }}
                            </vs-td>
                            <vs-td :data="data[indextr].personmembername">
                                {{ data[indextr].personmembername }}
                            </vs-td>
                            <vs-td :data="data[indextr].personmembershipnumber">
                                {{ data[indextr].personmembershipnumber }}
                            </vs-td>
                            <vs-td :data="data[indextr].eventdate">
                                {{ data[indextr].eventdate }}
                            </vs-td>
                            <vs-td :data="data[indextr].sporttypeclassifiername">
                                {{ data[indextr].sporttypeclassifiername }}
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
                <div class="my-3 personList-pagination justify-content-between d-flex align-items-center">
                    <div style="white-space: nowrap" class="col-sm-6">
                        <div class="pagination-number" style="float: left; font-size: 12px">
                            {{ $t("RecordsFrom") }} {{ this.firstNumber }} {{ $t("by") }}
                            {{ this.lastNumber }} {{ $t("of") }}
                            {{ this.totalRows }}
                        </div>
                        <div class="page-limit">
                            <div style="float: left" class="per-page ml-2 mr-2 mt-n1">
                                <b-form-select v-model="filter.PageLimit" id="PageLimitSelect" size="sm"
                                    :options="filter.pageOptions"></b-form-select>
                            </div>
                            <div class="per-page" style="float: left; font-size: 12px">
                                {{ $t("RecordsPerPage") }}
                            </div>
                        </div>
                    </div>
                    <b-pagination class="text-right mobile-pagination" v-model="filter.PageNumber" :total-rows="totalRows"
                        :per-page="filter.PageLimit"></b-pagination>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
  
<script>
import MemberShipService from "@/services/MemberShip.service";
import IdentityDocumentService from "@/services/IdentityDocument.service";
import ServicePocketService from "@/services/ServicePocket.service";
import MemberShipTypeService from "@/services/MemberShipType.service";
import SportGroupCategoryTypeService from "@/services/SportGroupCategoryType.service";
export default {
    data() {
        return {
            filter: {
                Search: "",
                SortColumn: "",
                OrderType: "asc",
                PageNumber: 1,
                PageLimit: 20,
                personmembershipnumber: "",
                identitydocumentid: 0,
                documentseries: "",
                documentnumber: "",
                servicepocketid: 0,
                membershiptypeid: 0,
                sportgroupcategorytypeid: 0,
                pageOptions: [20, 50, 100, 200],
            },
            ActiveMembershipList: [],
            selected: [],
            DocumentTypeList: [],
            DocSeriesList: [],
            ServicePocketList: [],
            MemberShipTypeList: [],
            SportGroupCategoryTypeList: [],
            totalRows: 0,
            Loading: false,
            createModal: false,
        };
    },
    created() {
        IdentityDocumentService.GetAllIdentityDocSeries(1).then((res) => {
            this.DocSeriesList = res.data.result;
        });
        IdentityDocumentService.GetAll().then((res) => {
            this.DocumentTypeList = res.data.result;
        });
        ServicePocketService.GetAll().then((res) => {
            this.ServicePocketList = res.data;
        });
        MemberShipTypeService.GetAll().then((res) => {
            this.MemberShipTypeList = res.data;
        });
        SportGroupCategoryTypeService.GetAll().then((res) => {
            this.SportGroupCategoryTypeList = res.data;
        });
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
        },
    },
    methods: {
        ChangeDocumentType() {
            this.filter.documentseries = "";
            this.filter.documentnumber = "";
        },
        Refresh() {
            this.Loading = true;
            MemberShipService.GetActiveMembershipList(
                this.filter.Search,
                this.filter.SortColumn,
                this.filter.OrderType,
                this.filter.PageNumber,
                this.filter.PageLimit,
                this.filter.personmembershipnumber,
                this.filter.identitydocumentid,
                this.filter.documentseries,
                this.filter.documentnumber,
                this.filter.servicepocketid,
                this.filter.membershiptypeid,
                this.filter.sportgroupcategorytypeid,

            ).then((res) => {
                this.ActiveMembershipList = res.data.rows;
                this.totalRows = res.data.total;
                this.Loading = false;
            });
        },
        handleSort(key, active) { },
        SelectedItem() {
            this.$emit("SelectedItem", this.selected);
            // console.log(this.selected)
        },
        showModal(modal, value) {
            this.$data[modal] = value;
        },
    },
    watch: {
        "filter.PageNumber": {
            handler(newValue, oldValue) {
                this.Refresh();
            },
        },
    },
};
</script>
  
<style>
.vs-pagination--ul {
    margin-bottom: 0;
}
</style>
  
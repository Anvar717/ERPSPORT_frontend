<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("GroupSheet") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row>
                <b-col sm="6" md="3">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("statusname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.statusname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="6" md="3">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("educationlanguagename") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.educationlanguagename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("schoolyearname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.schoolyearname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("gendername") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.gendername }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="12" md="6">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("examgroupname") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.examgroupname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("educationformtypename") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.educationformtypename }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("higHerEduClassifier") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ GroupSheet.highereduclassifiername }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
              </b-row>
              <b-modal
                id="AddModal"
                size="xl"
                :title="$t('GroupSheet')"
                no-close-on-backdrop
                hide-footer
                modal-class="custom-size-modal-planshet"
              >
                <b-row>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span
                          >{{ $t("groupformbyedudirectiontablename") }} :</span
                        >
                        <span>
                          <b> {{ tabrow.groupformbyedudirectiontablename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("dtmid") }} :</span>
                        <span>
                          <b> {{ tabrow.dtmid }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("totalscore") }} :</span>
                        <span>
                          <b> {{ totalscore }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("highereduclassifiername") }} :</span>
                        <span>
                          <b> {{ GroupSheet.highereduclassifiername }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("examgroupname") }} :</span>
                        <span>
                          <b> {{ GroupSheet.examgroupname }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col>
                    <b-tabs pills v-model="tabIndex">
                      <b-tab
                        :title="$t('IJTStandardTable')"
                        @click="ChangeStandartTable"
                      >
                        <CRow class="mt-2">
                          <CCol>
                            <!-- <b-table
                              :fields="StandardTable"
                              :items="tabrow.IJTStandardTable"
                              class="bg-color-table text-center mx-3"
                              style="vertical-align: middle"
                              bordered
                              small
                              responsive="sm"
                              :tbody-tr-class="rowClass"
                            >
                              <template v-slot:cell(actions)="{ item }">
                                <div class="text-center">
                                  <b-link
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                  >
                                    {{ $t("view") }}
                                  </b-link>
                                </div>
                              </template>
                              <template v-slot:cell(totalscore)="{ item }">
                                <span v-if="!item.notrated">
                                  {{ item.totalscore }}
                                </span>
                                <span v-if="item.notrated">
                                  <b-badge variant="danger">
                                    {{ $t("notrated") }}
                                  </b-badge>
                                </span>
                              </template>
                            </b-table> -->
                            <b-table-simple small responsive v-if="!isEdit">
                              <b-thead>
                                <b-tr style="background-color: lightgray">
                                  <b-th v-for="item,index in StandardTable" :key="index">
                                    {{ item.label }}
                                  </b-th>
                                </b-tr>
                              </b-thead>
                              <b-tbody v-for="item,index in tabrow.IJTStandardTable" :key="index">
                                <b-tr class="text-black">
                                  <td class="text-center" style="background-color: #CDF6FF" colspan="4">
                                    <span class="font-weight-bold">
                                      {{ item.comissionmemberassignmenttablename }}
                                    </span>
                                  </td>
                                </b-tr>
                                <b-tr v-for="el,index in item.GroupSheetStandards" :key="index">
                                  <b-td>
                                    {{ el.assessmentcriteriatablename }}
                                  </b-td>
                                  <b-td>
                                    {{ el.scorecalculationtypename }}
                                  </b-td>
                                  <b-td class="text-center">
                                    <span v-if="!el.notrated">
                                      {{ el.totalscore }}
                                    </span>
                                    <span v-if="el.notrated">
                                      <b-badge variant="danger">
                                        {{ $t("notrated") }}
                                      </b-badge>
                                    </span>
                                  </b-td>
                                  <b-td>
                                    <b-link
                                      v-if="!isEdit"
                                      @click="EditItemStandardTable(el)"
                                      class="mr-2"
                                    >
                                      {{ $t("View") }}
                                    </b-link>
                                  </b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </CCol>
                        </CRow>
                      </b-tab>
                      <b-tab :title="$t('MJTStandardTable')">
                        <CRow class="mt-2">
                          <CCol>
                            <!-- <b-table
                              :fields="StandardTable"
                              :items="tabrow.MJTStandardTable"
                              class="bg-color-table text-center mx-3"
                              style="vertical-align: middle"
                              bordered
                              small
                              responsive="sm"
                              :tbody-tr-class="rowClass"
                            >
                              <template v-slot:cell(actions)="{ item }">
                                <div class="text-center">
                                  <b-link
                                    @click="EditItemStandardTable(item)"
                                    class="mr-2"
                                  >
                                    {{ $t("view") }}
                                  </b-link>
                                </div>
                              </template>
                              <template v-slot:cell(totalscore)="{ item }">
                                <span v-if="!item.notrated">
                                  {{ item.totalscore }}
                                </span>
                                <span v-if="item.notrated">
                                  <b-badge variant="danger">
                                    {{ $t("notrated") }}
                                  </b-badge>
                                </span>
                              </template>
                            </b-table> -->
                            <b-table-simple small responsive v-if="!isEdit">
                              <b-thead>
                                <b-tr style="background-color: lightgray">
                                  <b-th v-for="item,index in StandardTable" :key="index">
                                    {{ item.label }}
                                  </b-th>
                                </b-tr>
                              </b-thead>
                              <b-tbody v-for="item,index in tabrow.MJTStandardTable" :key="index">
                                <b-tr class="text-black">
                                  <td class="text-center" style="background-color: #CDF6FF" colspan="4">
                                    <span class="font-weight-bold">
                                      {{ item.comissionmemberassignmenttablename }}
                                    </span>
                                  </td>
                                </b-tr>
                                <b-tr v-for="el,index in item.GroupSheetStandards" :key="index">
                                  <b-td>
                                    {{ el.assessmentcriteriatablename }}
                                  </b-td>
                                  <b-td>
                                    {{ el.scorecalculationtypename }}
                                  </b-td>
                                  <b-td class="text-center">
                                    <span v-if="!el.notrated">
                                      {{ el.totalscore }}
                                    </span>
                                    <span v-if="el.notrated">
                                      <b-badge variant="danger">
                                        {{ $t("notrated") }}
                                      </b-badge>
                                    </span>
                                  </b-td>
                                  <b-td>
                                    <b-link
                                      v-if="!isEdit"
                                      @click="EditItemStandardTable(el)"
                                      class="mr-2"
                                    >
                                      {{ $t("View") }}
                                    </b-link>
                                  </b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </CCol>
                        </CRow>
                      </b-tab>
                    </b-tabs>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col class="text-center">
                    <b-button
                      variant="danger"
                      @click="CloseAddModal"
                      class="mr-2"
                    >
                      <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-modal>
              <b-modal
                id="AddModalTabrow2"
                size="xl"
                :title="$t('StandardTable')"
                no-close-on-backdrop
                hide-footer
                modal-class="custom-size-modal-planshet"
              >
                <b-row>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("physicaltrainingtypename") }} :</span>
                        <span>
                          <b> {{ tabrow2.physicaltrainingtypename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("assessmentcriteriatablename") }} :</span>
                        <span>
                          <b> {{ tabrow2.assessmentcriteriatablename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("scorecalculationtypename") }} :</span>
                        <span>
                          <b> {{ tabrow2.scorecalculationtypename }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span
                          >{{
                            $t("comissionmemberassignmenttablename")
                          }}
                          :</span
                        >
                        <span>
                          <b>
                            {{ tabrow2.comissionmemberassignmenttablename }}
                          </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col sm="12" md="6">
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("totalscore") }} :</span>
                        <span>
                          <b> {{ tabrow2.totalscore }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span style="white-space: nowrap" class="mr-2"
                          >{{ $t("detail") }} :</span
                        >
                        <span>
                          <b>
                            {{ tabrow2.assessmentcriteriatabledetailinfo }}
                          </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>

                <CRow class="mt-3">
                  <CCol>
                    <b-table
                      :fields="resultTable"
                      :items="tabrow2.ResultTable"
                      class="bg-color-table text-center mx-3"
                      style="vertical-align: middle"
                      bordered
                      small
                      responsive="sm"
                      :tbody-tr-class="rowClass"
                    >
                      <template v-slot:cell(score)="{ item }">
                        <b-form-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.score"
                          :placeholder="$t('score')"
                          size="sm"
                          @keyup="calcScore(item)"
                        ></b-form-input>
                        <span v-if="item.Status == 0"> {{ item.score }} </span>
                      </template>
                      <template v-slot:cell(techscore)="{ item }">
                        <b-form-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.techscore"
                          :placeholder="$t('techscore')"
                          @keyup="calcScore(item)"
                          size="sm"
                        ></b-form-input>
                        <span v-if="item.Status == 0">
                          {{ item.techscore }}
                        </span>
                      </template>
                      <template v-slot:cell(detail)="{ item }">
                        <b-form-input
                          v-if="item.Status == 2 || item.Status == 1"
                          v-model="item.detail"
                          :placeholder="$t('detail')"
                          size="sm"
                        ></b-form-input>
                        <span v-if="item.Status == 0"> {{ item.detail }} </span>
                      </template>
                    </b-table>
                  </CCol>
                </CRow>

                <b-row>
                  <b-col class="text-center">
                    <b-button
                      variant="danger"
                      @click="CloseStandardTable"
                      class="mr-2"
                    >
                      <b-icon icon="arrow-left-short"></b-icon> {{ $t("back") }}
                    </b-button>
                    <!-- <b-button variant="success" @click="AddTabrow2">
                      <b-icon icon="check2" v-if="!SaveLoading3"></b-icon>
                      <b-spinner v-if="SaveLoading3" small></b-spinner>
                      {{ $t("Save") }}
                    </b-button> -->
                  </b-col>
                </b-row>
              </b-modal>
              <CRow class="mt-3">
                <CCol>
                  <b-table
                    :fields="GroupSheetTables"
                    :items="GroupSheet.GroupSheetTables"
                    class="bg-color-table text-center"
                    style="vertical-align: middle"
                    bordered
                    small
                    responsive="sm"
                    :tbody-tr-class="rowClass"
                  >
                    <template v-slot:cell(actions)="{ item }">
                      <div class="text-center">
                        <b-link @click="EditItemGroupSheet(item)" class="mr-2">
                          {{ $t("view") }}
                        </b-link>
                        <!-- <b-link
                        class="mr-2"
                        v-c-tooltip="{ content: $t('Delete') }"
                        @click="DeleteItem(item)"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-link> -->
                      </div>
                    </template>
                    <template v-slot:cell(MJT)="{ item }">
                      <span style="white-space: nowrap">
                        {{ item.MJTResultCount }} / <b> {{ item.MJTCount }} </b>
                      </span>
                    </template>
                    <template v-slot:cell(IJT)="{ item }">
                      <span style="white-space: nowrap">
                        {{ item.IJTResultCount }} / <b> {{ item.IJTCount }} </b>
                      </span>
                    </template>
                    <template v-slot:cell(TotalBal)="{ item }">
                      <span v-if="!item.notrated"> {{ item.TotalBal }} </span>
                      <span v-if="item.notrated">
                        <b-badge variant="danger">
                          {{ $t("notrated") }}
                        </b-badge>
                      </span>
                    </template>
                  </b-table>
                </CCol>
              </CRow>
            </ValidationObserver>
          </CCardBody>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="Close()"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol>
              <div class="text-right">
                <!-- <CButton
                  size="sm"
                  color="success"
                  class="mr-4"
                  @click="Approve"
                >
                  <b-spinner v-if="SaveLoading" small></b-spinner>
                  <b-icon v-if="!SaveLoading" icon="check2"></b-icon>
                  {{ $t("Save") }}
                </CButton> -->
                <CButton
                  class="mr-4"
                  size="sm"
                  @click="$refs['ApproveModal'].show()"
                  color="success"
                >
                  <b-icon icon="check2"></b-icon>
                  {{ $t("Approve") }}
                </CButton>
              </div>
              <b-modal
                :ref="'ApproveModal'"
                :title="$t('Approve')"
                :cancel-title="$t('Cancel')"
                :ok-title="$t('Accept')"
                cancel-variant="danger"
                ok-variant="success"
                @ok="Approve"
              >
                <b-card-text>
                  <h5>
                    ID : {{ GroupSheet.id }}
                    <b-spinner v-if="ApproveLoading" small></b-spinner>
                  </h5>
                  <h5>{{ $t("WantApprove") }}</h5>
                </b-card-text>
              </b-modal>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>

<script>
import GroupSheetService from "@/services/GroupSheet.service";
import {
  BListGroup,
  BListGroupItem,
  BTableSimple,
  BTbody,
  BTr,
  BTd,
} from "bootstrap-vue";
import AssessmentCriteriaService from "@/services/AssessmentCriteria.service";
export default {
  components: {
    BListGroupItem,
    BListGroup,
    BTableSimple,
    BTbody,
    BTr,
    BTd,
  },
  data() {
    return {
      SaveLoading: false,
      isEdit : false,
      GroupSheet: {},
      tabrow2: {
        id: 0,
        ownerid: 0,
        physicaltrainingtypeid: 0,
        physicaltrainingtypename: "",
        assessmentcriteriatableid: 0,
        assessmentcriteriatablename: "",
        scorecalculationtypeid: 0,
        scorecalculationtypename: "",
        comissionmemberassignmenttableid: 0,
        comissionmemberassignmenttablename: "",
        totalscore: 0,
        Status: 1,
        assessmentcriteriatabledetailinfo: "",
        ResultTable: [],
      },
      ApproveLoading: false,
      tabrow3: {
        id: 0,
        ownerid: 0,
        assessmentcriteriatablestandarid: 0,
        assessmentcriteriatablestandarname: "",
        score: 0,
        techscore: 0,
        totalscore: 0,
        detail: "",
        scoretypeid: 0,
        techscoretypeid: 0,
        istechscore: false,
        Status: 1,
      },
      GroupSheetTables: [
        {
          key: "dtmid",
          label: this.$t("dtmid"),
          class: "text-center",
        },

        {
          key: "groupformbyedudirectiontablename",
          label: this.$t("groupformbyedudirectiontablename"),
          class: "text-left",
        },
        {
          key: "MJT",
          label: this.$t("MJT"),
          class: "text-center",
        },
        {
          key: "MJTResultBal",
          label: this.$t("MJTResultBal"),
          class: "text-center",
        },
        {
          key: "IJT",
          label: this.$t("IJT"),
          class: "text-center",
        },
        {
          key: "IJTResultBal",
          label: this.$t("IJTResultBal"),
          class: "text-center",
        },
        { key: "TotalBal", label: this.$t("totalscore"), class: "text-center" },
        { key: "actions", label: this.$t("actions"), class: "text-center" },
      ],
      StandardTable: [
        {
          key: "assessmentcriteriatablename",
          label: this.$t("assessmentcriteriatablename"),
        },
        {
          key: "scorecalculationtypename",
          label: this.$t("scorecalculationtypename"),
        },
        {
          key: "totalscore",
          label: this.$t("totalscore"),
        },
        { key: "actions", label: this.$t("actions") },
      ],
      resultTable: [
        {
          key: "assessmentcriteriatablestandarname",
          label: this.$t("assessmentcriteriatablestandarname"),
        },
        {
          key: "score",
          label: this.$t("score"),
        },
        {
          key: "techscore",
          label: this.$t("techscore"),
        },
        {
          key: "totalscore",
          label: this.$t("totalscore"),
        },
        {
          key: "detail",
          label: this.$t("detail"),
        },
        // { key: "status", label: this.$t("") },
        { key: "actions", label: this.$t("actions") },
         {
          key: "dateofcreated",
          label: this.$t("dateofcreated"),
        },
      ],
      HighereduclassifierList: [],
      EducationfortypemList: [],
      assessmentcriteriatablestandarlist: [],
      EducationformList: [],
      EducationlanguageList: [],
      SchoolyearList: [],
      GenderList: [],
      statelist: [],
      OrganizationList: [],
      physicaltrainingtypelist: [],
      assessmentcriteriatablelist: [],
      IJTStandardTable: [],
      MJTStandardTable: [],
      tabrow: {
        id: 0,
        ownerid: 0,
        dtmid: "",
        groupformbyedudirectiontableid: 0,
        groupformbyedudirectiontablename: "",
        Status: 1,
        standardTable: [],
      },
      editedIndex: -1,
      tabIndex: 0,
      SaveLoading3: false,
      show: false,
      totalscore: 0,
    };
  },

  created() {
    this.Refresh();
  },
  methods: {
    ChangeAssessmentCriteria() {
      AssessmentCriteriaService.GetAllAssessmentCriteriaTableStandardById(
        this.tabrow3.assessmentcriteriatablestandarid
      ).then((res) => {
        this.tabrow3.scoretypeid = res.data.scoretypeid;
        this.tabrow3.techscoretypeid = res.data.techscoretypeid;
        this.tabrow3.istechscore = res.data.istechscore;
        if (this.tabrow3.scoretypeid == 1) {
          this.tabrow3.score = res.data.fromscore;
        }
        if (!!this.tabrow3.istechscore) {
          if (this.tabrow3.techscoretypeid == 1) {
            this.tabrow3.techscore = res.data.fromtechscore;
          }
        }
      });
    },
    async Refresh() {
      this.show = true;
      await GroupSheetService.Get(this.$route.params.id).then((res) => {
        this.GroupSheet = res.data;
        this.show = false;
      });
    },
    calcScore(item) {
      if (item.scoretypeid == 3) {
        if (item.fromscore > item.score && item.toscore < item.score) {
          this.makeToast(this.$t("scoreError"), this.$t("Error"), "danger");
          item.score = 0;
        }
      }
      if (item.techscoretypeid == 3) {
        if (
          item.fromtechscore > item.techscore &&
          item.totechscore < item.techscore
        ) {
          this.makeToast(this.$t("scoreError"), this.$t("Error"), "danger");
          item.techscore = 0;
        }
      }
      item.totalscore = item.techscore * 1 + item.score * 1;
    },
    EditItem(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
    },
    DeleteItem(item, index) {
      if (item.Status == 1) {
        this.tabrow2.ResultTable.splice(index, 1);
      } else {
        item.Status = 3;
      }
    },
    Close() {
      this.$router.push({
        name: "GroupSheet",
        query: {
          schoolYearId: this.$route.query.schoolYearId,
          higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
          educationFormTypemId: this.$route.query.educationFormTypemId,
          educationLanguageId: this.$route.query.educationLanguageId,
          genderId: this.$route.query.genderId,
          Search: this.$route.query.Search,
          SortColumn: this.$route.query.SortColumn,
          OrderType: this.$route.query.OrderType,
          PageNumber: this.$route.query.PageNumber,
          PageLimit: this.$route.query.PageLimit,
          dtmId: this.$route.query.dtmId,
        },
      });
    },
    ChangeStandartTable() {},
    // AddTabrow3() {
    //   var self = this;
    //   if (
    //     self.tabrow3.assessmentcriteriatablestandarid === "" ||
    //     self.tabrow3.assessmentcriteriatablestandarid === undefined ||
    //     self.tabrow3.assessmentcriteriatablestandarid === null ||
    //     self.tabrow3.assessmentcriteriatablestandarid === 0
    //   ) {
    //     this.makeToast(
    //       this.$t("assessmentcriteriatablestandarNotSelected"),
    //       this.$t("Error"),
    //       "danger"
    //     );
    //     return false;
    //   }
    //   if (self.tabrow3.assessmentcriteriatablestandarid) {
    //       self.tabrow3.assessmentcriteriatablestandarname = this.assessmentcriteriatablestandarlist.filter(item => item.id == self.tabrow3.assessmentcriteriatablestandarid)[0].name
    //   }
    //   self.tabrow3.ownerid = self.tabrow2.id
    //   self.tabrow2.ResultTable.push(self.tabrow3);
    //   self.tabrow3 = {
    //     id: 0,
    //     ownerid: 0,
    //     assessmentcriteriatablestandarid: 0,
    //     assessmentcriteriatablestandarname : "",
    //     score: 0,
    //     techscore: 0,
    //     totalscore: 0,
    //     detail: "",
    //     Status: 1,
    //     scoretypeid : 0,
    //     techscoretypeid: 0,
    //     istechscore : false,
    //   };
    // },
    getTabrow(id) {
      GroupSheetService.GroupSheetTableForView(id)
        .then((res) => {
          this.tabrow = res.data;
          var self = this;
          self.totalscore = 0;
          res.data.IJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
          });
          res.data.MJTStandardTable.forEach(function (item) {
            self.totalscore += item.totalscore;
          });
        })
        .catch((error) => {
          this.makeToast(
            error.response.data.error,
            this.$t("message"),
            "danger"
          );
        });
    },
    // AddTabrow2() {
    //   this.SaveLoading3 = true;
    //   GroupSheetService.UpdateGroupSheetResult(this.tabrow2.ResultTable).then(
    //     (res) => {
    //       this.SaveLoading3 = false;
    //       this.$bvModal.hide("AddModalTabrow2");
    //       this.getTabrow();
    //     }
    //   );
    // },
    Approve() {
      var self = this;
      self.ApproveLoading = true;
      GroupSheetService.Approve(self.GroupSheet.id)
        .then((res) => {
          self.ApproveLoading = false;
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({
            name: "GroupSheet",
            query: {
              schoolYearId: this.$route.query.schoolYearId,
              higHerEduClassifierId: this.$route.query.higHerEduClassifierId,
              educationFormTypemId: this.$route.query.educationFormTypemId,
              educationLanguageId: this.$route.query.educationLanguageId,
              genderId: this.$route.query.genderId,
              Search: this.$route.query.Search,
              SortColumn: this.$route.query.SortColumn,
              OrderType: this.$route.query.OrderType,
              PageNumber: this.$route.query.PageNumber,
              PageLimit: this.$route.query.PageLimit,
              dtmId: this.$route.query.dtmId,
            },
          });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
          this.ApproveLoading = false;
        });
    },
    OpenAddModal() {
      this.$bvModal.show("AddModal");
    },
    CloseAddModal() {
      this.$bvModal.hide("AddModal");
      this.Refresh();
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    OpenAddModalTabrow2() {
      this.$bvModal.show("AddModalTabrow2");
    },
    CloseStandardTable() {
      this.$bvModal.hide("AddModalTabrow2");
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    EditItemGroupSheet(item) {
      this.tabrow = {};
      if (this.tabrow.id != 0) {
        this.$bvModal.show("AddModal");
      }
      this.editedIndex = this.GroupSheet.GroupSheetTables.indexOf(item);
      //   this.tabrow = Object.assign({}, item);
      this.getTabrow(item.id);
    },
    EditItemStandardTable(item) {
      if (item.Status === 0) {
        item.Status = 2;
      }
      if (this.tabIndex == 0) {
        this.editedIndex = this.tabrow.IJTStandardTable.indexOf(item);
      } else {
        this.editedIndex = this.tabrow.MJTStandardTable.indexOf(item);
      }
      AssessmentCriteriaService.GetAllAssessmentCriteriaTableStandard(
        item.assessmentcriteriatableid
      ).then((res) => {
        this.assessmentcriteriatablestandarlist = res.data;
      });
      this.tabrow2 = Object.assign({}, item);
      this.$bvModal.show("AddModalTabrow2");
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
};
</script>

<style></style>

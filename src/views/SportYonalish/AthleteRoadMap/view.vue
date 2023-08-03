<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("AthleteRoadMap") }}</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ValidationObserver ref="form" v-slot="errors">
              {{ setAllErrors(errors.errors) }}
              <b-row>
                <b-col sm="6" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docnumber") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthleteRoadMap.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthleteRoadMap.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("sportevent") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthleteRoadMap.sporteventname }} </b>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col sm="6" md="5">
                  <b-table-simple small class="border">
                    <b-tbody>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("Sport turi") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthleteRoadMap.sporttypeclassifiername }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("personname1") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ AthleteRoadMap.personname }} </b>
                        </b-td>
                      </b-tr>
                        <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b-badge :variant="AthleteRoadMap.statusname == 'Утвержден' ? 'success' : AthleteRoadMap.statusname == 'Отправлен' ? 'info' : AthleteRoadMap.statusname == 'Создан' ||  AthleteRoadMap.statusname == 'Изминен' || AthleteRoadMap.statusname == 'Изменен' ? 'primary' : 'danger'"> {{ AthleteRoadMap.statusname }} </b-badge>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-col>
                <b-col cols="12" md="2">
                  <b-button
                    @click="Back"
                    size="sm"
                    variant="danger"
                    class="w-100 mb-1"
                  >
                    <b-icon-arrow-left-short scale="1.7" />
                    {{ $t("back") }}
                  </b-button>
                  <b-button
                  v-if="AthleteRoadMap.statusid !== 2"
                    @click="OpenApproveModal"
                    size="sm"
                    variant="primary"
                    class="w-100 mb-1"
                  >
                    <b-icon scale="1.4" icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </b-button>
                  <b-button
                    @click="OpenCancelApproveModal"
                    size="sm"
                    style="background-color:firebrick; color: #fff;"
                    class="w-100 mb-1"
                  >
                    <b-icon icon="x" scale="1.5"></b-icon>
                    {{ $t("CancelApproval") }}
                  </b-button>
                </b-col>
                  <!-- <b-button
                    v-if="$can('AthleteRoadMapCancelApproval', 'permissions') && AthleteRoadMap.statusid != 3 && AthleteRoadMap.statusid != 1"
                    @click="OpenCancelApproveModal"
                    size="sm"
                    variant="danger"
                    class="w-100 mb-1"
                  >
                    <b-icon icon="x" scale="1.5"></b-icon>
                    {{ $t("CancelApproval") }}
                  </b-button> -->
                <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
                    <template #modal-title>
                      {{ $t("Approve") }}
                      <b-spinner v-if="ApproveLoading" small></b-spinner>
                    </template>
                    <b-card-text class="mt-3">
                      <h5>{{ $t("id") }} : {{ AthleteRoadMap.id }}</h5>
                      <span>
                        <h5>
                          {{ $t("name") }} : {{ AthleteRoadMap.personname }}
                        </h5></span
                      >
                      <h5>{{ $t("WantApprove") }}</h5>
                    </b-card-text>
                    <b-row>
                      <b-col class="text-right">
                        <b-button
                          class="mr-2"
                          variant="danger"
                          @click="$refs['ApproveModal'].hide()"
                        >
                          {{ $t("Cancel") }}
                        </b-button>
                        <b-button variant="success" @click="Approve">
                          {{ $t("Accept") }}
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-modal>
                <b-modal
                    :ref="'CancelApprovalModal'"
                    hide-footer
                    no-close-on-backdrop
                  >
                    <template #modal-title>
                      {{ $t("CancelApproval") }}
                      <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
                    </template>
                    <b-card-text class="mt-3">
                      <h5>{{ $t("id") }} : {{ AthleteRoadMap.id }}</h5>
                      <span>
                        <h5>
                          {{ $t("name") }} : {{ AthleteRoadMap.personname }}
                        </h5></span
                      >
                      <h5>{{ $t("WantCancelApproval") }}</h5>
                    </b-card-text>
                    <b-row>
                      <b-col class="text-right">
                        <b-button
                          class="mr-2"
                          variant="danger"
                          @click="$refs['CancelApprovalModal'].hide()"
                        >
                          {{ $t("Cancel") }}
                        </b-button>
                        <b-button variant="success" @click="CancelApproval">
                          {{ $t("Accept") }}
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-modal>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-tabs pills card class="team-squad">
                    <b-tab active class="ml-0">
                      <template slot="title">
                        <b-icon icon="trophy"></b-icon>
                        {{ $t("Competitions") }}
                      </template>
                      <!-- <b-row class="mt-3">
                        <b-col class="text-right">
                          <b-button
                            variant="primary"
                            @click="OpenCompetitionModal"
                          >
                            {{ $t("Add") }}
                          </b-button>
                        </b-col>
                      </b-row> -->
                      <b-row class="mt-3">
                        <b-col sm="12" lg="12" class="p-0">
                          <b-table
                            :fields="CompetitionFields"
                            :items="AthleteRoadMap.athleteroadmaptable"
                            class="bg-color-table text-center p-0"
                            style="vertical-align: middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:empty>
                              <h5 class="text-center m-1">
                                {{ $t("NoItems") }}
                              </h5>
                            </template>
                            <template v-slot:cell(index)="{ index }">
                              <p class="m-0">
                                {{ index + 1 }}
                              </p>
                            </template>
                            <template #cell(actions)="{ item }">
                              <div class="text-center">
                                <b-link
                                  @click="EditItem(item)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Delete') }"
                                  @click="DeleteItem(item)"
                                >
                                  <b-icon icon="trash"></b-icon>
                                </b-link>
                              </div>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-tab>
                    <b-tab class="ml-0">
                      <template slot="title">
                        <b-icon icon="person"></b-icon>
                        {{ $t("Murabbiy") }}
                      </template>
                      <!-- <b-row class="mt-3">
                        <b-col class="text-right">
                          <b-button
                            variant="primary"
                            @click="OpenCoachAddModal"
                          >
                            {{ $t("Add") }}
                          </b-button>
                        </b-col>
                      </b-row> -->
                      <b-row class="mt-3">
                        <b-col sm="12" lg="12" class="p-0">
                          <b-table
                            :fields="Coachfields"
                            :items="AthleteRoadMap.athleteroadmapcoachtable"
                            class="bg-color-table text-center p-0"
                            style="vertical-align: middle"
                            bordered
                            responsive="sm"
                            :tbody-tr-class="rowClass"
                          >
                            <template v-slot:empty>
                              <h5 class="text-center m-1">
                                {{ $t("NoItems") }}
                              </h5>
                            </template>
                            <template #cell(actions)="{ item }">
                              <div class="text-center">
                                <b-link
                                  @click="EditItemCoach(item)"
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Edit') }"
                                >
                                  <b-icon icon="pencil"></b-icon>
                                </b-link>
                                <b-link
                                  class="mr-2"
                                  v-c-tooltip="{ content: $t('Delete') }"
                                  @click="DeleteCoachItem(item)"
                                >
                                  <b-icon icon="trash"></b-icon>
                                </b-link>
                              </div>
                            </template>
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>
  
  <script>
import AthleteRoadMapService from "@/services/AthleteRoadMap.service";
import {
  BListGroup,
  BListGroupItem,
  BTableSimple,
  BTbody,
  BTr,
  BTd,
} from "bootstrap-vue";
import CustomNumberInput from "../../../components/CustomNumberInput.vue";
export default {
  components: {
    BListGroupItem,
    BListGroup,
    BTableSimple,
    BTbody,
    BTr,
    CustomNumberInput,
    BTd,
  },

  data() {
    return {
      SaveLoading: false,
      isDisabledScore: false,
      ApproveLoading: false,
      DeleteLoading: false,
      CancelApprovalLoading: false,
      AthleteRoadMap: {},
      CompetitionFields: [
        {
          key: "index",
          label: this.$t("OrderNumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "sporteventname",
          label: this.$t("competitionname"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          key: "countryname",
          label: this.$t("country"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "address",
          label: this.$t("address"),
          thClass: "text-center",
          tdClass: "text-left",
        },
      ],
      Coachfields: [
        {
          key: "personname",
          label: this.$t("Coach"),
          thClass: "text-center",
          tdClass: "text-left",
        },
        {
          key: "positionname",
          label: this.$t("position"),
          thClass: "text-center",
          tdClass: "text-left",
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
      editedIndex: -1,
      tabIndex: 0,
      SaveLoading3: false,
      show: false,
      totalscore: 0,
      isEdit: true,
      intermediateScore: null,
      dtmid: "",
      isDisabledScore: false,
    };
  },

  async created() {
    await this.Refresh();
  },
  methods: {
    async Refresh() {
      this.show = true;
      await AthleteRoadMapService.Get(this.$route.params.id).then((res) => {
        this.AthleteRoadMap = res.data;
        this.show = false;
      });
    },
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      this.$router.push({ name: "AthleteRoadMap" });
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      AthleteRoadMapService.Approve(this.AthleteRoadMap.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$refs["ApproveModal"].hide();
          this.makeToast(
            this.$t("ApproveSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
        });
    },
    getItemColor(text) {
      return text === "Актив"
        ? "success"
        : text === "Пассив"
        ? "danger"
        : text === "Утвержден"
        ? "success"
        : text === true
        ? "success"
        : text === false
        ? "danger"
        : text === "Отменено"
        ? "danger"
        : "primary";
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      AthleteRoadMapService.CancelApproval(this.AthleteRoadMap.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$refs["CancelApprovalModal"].hide();
          this.makeToast(
            this.$t("CancelApprovalSuccess"),
            this.$t("message"),
            "success"
          );
          this.Back();
        })
        .catch((error) => {
          this.CancelApprovalLoading = false;
          this.makeToast(error.response.data.error, this.$t("error"), "danger");
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
    setAllErrors(errors) {
      this.allSignupErrors = errors;
    },
  },
  watch: {},
};
</script>
  
  <style></style>
  
<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <CRow>
              <CCol>
                <h4 class="text-center">{{ $t("ViewAnthropometric") }}</h4>
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
                          <b> {{ Anthropometric.docnumber }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("docdate") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Anthropometric.docdate }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("sporttypeclassifier") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Anthropometric.sporttypeclassifiername }} </b>
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
                          <span>{{ $t("sportgroup") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Anthropometric.sportgroupname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("Sportchi") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Anthropometric.personname }} </b>
                        </b-td>
                      </b-tr>
                      <b-tr>
                        <b-td>
                          <span>{{ $t("status") }} :</span>
                        </b-td>
                        <b-td class="text-right">
                          <b> {{ Anthropometric.statusname }} </b>
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
                    v-if="
                      $can('AnthropometricApprove', 'permissions') &&
                      $route.query.type == 1 &&
                      Anthropometric.statusid !== 2 &&
                      isDisabled == 1
                    "
                    @click="OpenApproveModal"
                    size="sm"
                    variant="primary"
                    class="w-100 mb-1"
                  >
                    <b-icon scale="1.4" icon="check2"></b-icon>
                    {{ $t("Approve") }}
                  </b-button>
                  <b-button
                    v-if="
                      $can('AnthropometricCancelApproval', 'permissions') &&
                      $route.query.type == 1 &&
                      isDisabled == 1
                    "
                    @click="OpenCancelApproveModal"
                    size="sm"
                    style="background-color: firebrick; color: #fff"
                    class="w-100 mb-1"
                  >
                    <b-icon icon="x" scale="1.5"></b-icon>
                    {{ $t("CancelApproval") }}
                  </b-button>
                </b-col>
                <b-modal :ref="'ApproveModal'" no-close-on-backdrop hide-footer>
                  <template #modal-title>
                    {{ $t("Approve") }}
                    <b-spinner v-if="ApproveLoading" small></b-spinner>
                  </template>
                  <!-- <b-row>
            <b-col>
              <label for=""> {{ $t('documentseries') }} </label>
              <b-form-input v-model="ApproveData.documentseries"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for=""> {{ $t('docnumber') }} </label>
              <b-form-input v-model="ApproveData.documentnumber"></b-form-input>
            </b-col>
          </b-row> -->
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ Anthropometric.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ Anthropometric.personname }}
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
                  <!-- <b-row>
            <b-col>
              <label for=""> {{ $t('documentseries') }} </label>
              <b-form-input v-model="CancelApproveData.documentseries"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for=""> {{ $t('docnumber') }} </label>
              <b-form-input v-model="CancelApproveData.documentnumber"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <label for=""> {{ $t('Reason') }} </label>
              <b-form-textarea v-model="CancelApproveData.returnReason"></b-form-textarea>
            </b-col>
          </b-row> -->
                  <b-card-text class="mt-3">
                    <h5>{{ $t("id") }} : {{ Anthropometric.id }}</h5>
                    <span>
                      <h5>
                        {{ $t("name") }} : {{ Anthropometric.personname }}
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
                <b-col sm="12" md="12" lg="12">
                  <b-table-simple responsive bordered striped>
                    <b-thead>
                      <b-tr class="headStyle">
                        <b-th
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ $t("№") }}
                        </b-th>
                        <b-th
                          colspan="2"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ $t("anthropometricindicator") }}
                        </b-th>
                        <b-th
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ $t("unitofmeasure") }}
                        </b-th>
                        <b-th
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ $t("oldtindicator") }}
                        </b-th>
                        <b-th
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ $t("nextindicator") }}
                        </b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody v-for="(item, index) in Tables" :key="index">
                      <b-tr>
                        <td
                          :rowspan="item.ChildTable.length + 1"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ index + 1 }}
                        </td>
                        <td
                          :rowspan="item.ChildTable.length + 1"
                          :colspan="item.ChildTable.length == 0 ? 2 : 1"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ item.anthropometricindicatorname }}
                          <span v-if="!!item.minstandard && lang != 'ru'">
                            ({{ item.minstandard }}{{ $t("by") }}
                            {{ item.maxstandard }}{{ $t("of") }})</span
                          >
                          <span v-if="!!item.minstandard && lang == 'ru'">
                            ( от {{ item.minstandard }} до
                            {{ item.maxstandard }})</span
                          >
                        </td>
                        <td
                          v-if="item.unitofmeasurename"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{ item.unitofmeasurename }}
                        </td>
                        <td
                          v-if="item.unitofmeasurename"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          {{
                            item.oldtindicator == null
                              ? "-"
                              : item.oldtindicator
                          }}
                        </td>
                        <td
                          v-if="item.unitofmeasurename"
                          class="text-center"
                          style="vertical-align: middle"
                        >
                          <!-- <b-input
                            :class="
                              (item.nextindicator < item.minstandard ||
                                item.nextindicator > item.maxstandard) &&
                              item.nextindicator != null &&
                              item.nextindicator != 0
                                ? 'errorClass'
                                : 'successClass'
                            "
                            style="width: 90%"
                            type="number"
                            @input="changeItem(item)"
                            v-model="item.nextindicator"
                            :placeholder="$t('nextindicator')"
                          ></b-input> -->
                          {{
                            item.nextindicator == null
                              ? "-"
                              : item.nextindicator
                          }}
                        </td>
                      </b-tr>
                      <b-tr v-for="(item1, i) in item.ChildTable" :key="i">
                        <td class="text-center" style="vertical-align: middle">
                          {{ item1.anthropometricindicatorname }}
                          <span v-if="!!item1.minstandard && lang != 'ru'">
                            ({{ item1.minstandard }}{{ $t("by") }}
                            {{ item1.maxstandard }}{{ $t("of") }})</span
                          >
                          <span v-if="!!item1.minstandard && lang == 'ru'">
                            ( от {{ item1.minstandard }} до
                            {{ item1.maxstandard }})</span
                          >
                        </td>
                        <td class="text-center" style="vertical-align: middle">
                          {{ item1.unitofmeasurename }}
                        </td>
                        <td class="text-center" style="vertical-align: middle">
                          {{
                            item1.oldtindicator == null
                              ? "-"
                              : item1.oldtindicator
                          }}
                        </td>
                        <td class="text-center" style="vertical-align: middle">
                          <!-- <b-input
                            :class="
                              (item1.nextindicator < item1.minstandard ||
                                item1.nextindicator > item1.maxstandard) &&
                              item1.nextindicator != null &&
                              item1.nextindicator != 0
                                ? 'errorClass'
                                : 'successClass'
                            "
                            style="width: 90%"
                            @input="changeItem1(item1)"
                            v-model="item1.nextindicator"
                            type="number"
                            :placeholder="$t('nextindicator')"
                          ></b-input> -->
                          {{
                            item1.nextindicator == null
                              ? "-"
                              : item1.nextindicator
                          }}
                        </td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
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
import AnthropometricService from "@/services/Anthropometric.service";
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
      Anthropometric: {},
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
      lang: "ru",
      totalscore: 0,
      isEdit: true,
      isDisabled: 1,
      intermediateScore: null,
      dtmid: "",
      isDisabledScore: false,
    };
  },

  created() {
    var self = this;
    if (!!self.$route.query.isView) {
      self.isDisabled = parseInt(self.$route.query.isView);
    }
    self.lang = localStorage.getItem("locale") || "ru";
    self.selectedrowid = self.$route.params.id;
    AnthropometricService.Get(self.selectedrowid).then((res) => {
      self.Anthropometric = res.data;
      self.Tables = res.data.anthropometricTable;
    });
  },
  methods: {
    rowClass(item, type) {
      if (item.Status === 3) {
        return "d-none";
      }
    },
    Back() {
      if (this.$route.query.type == 1) {
        this.$router.push({ name: "Anthropometric" });
      } else if (this.$route.query.isView == 0) {
        this.$router.push({
          name: "SportStudentManageList",
        });
      } else {
        this.$router.push({ name: "AnthropomentricReportBySportsmen" });
      }
    },
    OpenApproveModal() {
      this.$refs["ApproveModal"].show();
    },
    OpenCancelApproveModal() {
      this.$refs["CancelApprovalModal"].show();
    },
    Approve() {
      this.ApproveLoading = true;
      AnthropometricService.Approve(this.Anthropometric.id)
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
      AnthropometricService.CancelApproval(this.Anthropometric.id)
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
  
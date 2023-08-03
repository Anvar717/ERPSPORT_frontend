<template>
  <b-overlay :show="show">
    <CRow>
      <CCol>
        <CCard accent-color="primary" class="pb-4">
          <CCardHeader>
            <b-icon icon="pencil"></b-icon>
            {{ $t("Curriculum") }}
            <div class="card-header-actions">
              <CLink
                href="#"
                class="card-header-action btn-close"
                v-on:click="$router.push({ name: 'Curriculum' })"
              >
                <b-icon icon="x-circle"></b-icon>
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("docnumber") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.docnumber }}
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("docdate") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.docdate }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#fff' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("schoolyear") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.schoolyearname }}
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#fff' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("CurriculumType") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.curriculumtypename }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("ishomeschooling") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.ishomeschooling ? $t("yes") : $t("no") }}
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("isvariable") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.isvariable ? $t("yes") : $t("no") }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#fff' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("isspecialized") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.isspecialized ? $t("yes") : $t("no") }}
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#fff' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("normativedoc") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.normativedoc }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("DetailInfo") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{ Curriculum.detailinfo }}
                    </a>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div
                  class="form-group form-row mb-0 py-1"
                  :style="{ backgroundColor: '#eee' }"
                >
                  <label class="col-form-label col-sm-4">
                    {{ $t("totalhours") }}
                  </label>
                  <div class="col-sm-8">
                    <a
                      style="color : blue;font-size : 16px;"
                      class="h-100 d-flex align-items-center"
                    >
                      {{
                        $options.filters.currency(totalhours, {
                          symbol: "",
                          fractionCount: 2,
                        })
                      }}
                    </a>
                  </div>
                </div>
              </b-col>
            </b-row>
          </CCardBody>
          <CRow>
            <CCol class="mx-3">
              <b-table-simple small bordered striped>
                <b-thead>
                  <b-tr>
                    <b-th
                      class="text-center"
                      rowspan="2"
                      style="vertical-align:middle"
                    >
                      T/r
                    </b-th>
                    <b-th
                      class="text-center"
                      rowspan="2"
                      style="vertical-align:middle"
                    >
                      {{ $t("subject") }}
                    </b-th>
                    <b-th class="text-center" :colspan="Hours.Columns.length">
                      {{ $t("weekhourswithclass") }}
                    </b-th>
                    <b-th
                      class="text-center"
                      rowspan="2"
                      style="vertical-align:middle"
                    >
                      {{ $t("allweekhours") }}
                    </b-th>
                  </b-tr>
                  <b-tr>
                    <b-th
                      class="text-center"
                      v-for="(col, colindex) in Hours.Columns"
                      :key="colindex + 'cols'"
                    >
                      {{ col.name }}
                    </b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    v-for="(row, rowindex) in Hours.Rows"
                    :key="rowindex + 'rows'"
                  >
                    <b-th>
                      {{ rowindex + 1 }}
                    </b-th>
                    <b-th>
                      {{ row.name }}
                    </b-th>
                    <b-td
                      v-for="(col, colindex) in Hours.Columns"
                      :key="colindex + 'cols1'"
                      class="text-center"
                    >
                      {{ Hours.Cells[row.id][col.id] || "-" }}
                    </b-td>
                    <b-th class="text-center">
                      {{ Hours.RowTotal[row.id] }}
                    </b-th>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-th colspan="2" class="text-center">
                      {{ $t("Total") }}
                    </b-th>
                    <b-th
                      v-for="(col, colindex) in Hours.Columns"
                      :key="colindex + 'cols12'"
                      class="text-center"
                    >
                      {{ Hours.ColTotal[col.id] }}
                    </b-th>
                    <b-th class="text-center">
                      {{
                        $options.filters.currency(totalhours, {
                          symbol: "",
                          fractionCount: 0,
                        })
                      }}
                    </b-th>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div class="text-left">
                <CButton
                  class="ml-4"
                  size="sm"
                  color="danger"
                  @click="$router.push({ name: 'Curriculum' })"
                >
                  <b-icon icon="arrow-left-short"></b-icon>
                  {{ $t("back") }}
                </CButton>
              </div>
            </CCol>
            <CCol> </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
  </b-overlay>
</template>

<script>
import CurriculumService from "@/services/Curriculum.service";
import CurriculumTypeService from "@/services/CurriculumType.service";

export default {
  data() {
    return {
      Curriculum: {},
      isclone: false,
      curriculumtypelist: [],
      CurriculumTables: [
        {
          key: "schoolsubjectname",
          label: this.$t("SchoolSubjectName"),
          sortable: true,
        },
        { key: "isoptionalsubject", label: this.$t("isoptionalsubject") },
        {
          key: "schoolgradename",
          label: this.$t("SchoolGradeName"),
          sortable: true,
        },
        { key: "hours", label: this.$t("hours") },
        { key: "actions", label: this.$t("actions") },
      ],
      totalhours: 0,
      Hours: [],
      show: false,
    };
  },
  created() {
    var self = this;
    this.show = true;
    CurriculumTypeService.GetAll().then((res) => {
      self.curriculumtypelist = res.data;
    });
    CurriculumService.GetDetail(self.$route.params.id)
      .then((res) => {
        self.Curriculum = res.data.curriculum;
        self.Hours = res.data.Hours;
        self.calculate();
        self.curriculumtypechange();
        this.show = false;
      })
      .catch((error) => {
        this.show = false;
        this.makeToast(error.response.data.error, this.$t("error"), "danger");
      });
  },

  methods: {
    SaveData() {
      var self = this;
      CurriculumService.Update(self.Curriculum)
        .then((res) => {
          self.makeToast(
            self.$t("SuccessMessage"),
            self.$t("message"),
            "success"
          );
          self.$router.push({ name: "Curriculum" });
        })
        .catch((error) => {
          self.makeToast(
            error.response.data.error,
            self.$t("message"),
            "danger"
          );
        });
    },
    calculate() {
      var self = this;
      self.totalhours = 0;
      self.Curriculum.Tables.forEach(function(item) {
        if (item.Status !== 3) {
          self.totalhours = self.totalhours + item.hours;
        }
      });
    },
    curriculumtypechange() {
      var self = this;
      self.Curriculum.curriculumtypename = self.curriculumtypelist.filter(
        function(item) {
          if (item.id === self.Curriculum.curriculumtypeid) return item;
        }
      )[0].name;
      self.Curriculum.curriculumtypename;
      self.Curriculum.ishomeschooling = self.curriculumtypelist.filter(function(
        item
      ) {
        if (item.id === self.Curriculum.curriculumtypeid) return item;
      })[0].ishomeschooling;
      self.Curriculum.isvariable = self.curriculumtypelist.filter(function(
        item
      ) {
        if (item.id === self.Curriculum.curriculumtypeid) return item;
      })[0].isvariable;
      self.Curriculum.isspecialized = self.curriculumtypelist.filter(function(
        item
      ) {
        if (item.id === self.Curriculum.curriculumtypeid) return item;
      })[0].isspecialized;
    },

    makeToast(message, title, type) {
      var self = this;
      self.$bvToast.toast(message, {
        title: title,
        autoHideDelay: 2000,
        variant: type,
        solid: true,
      });
    },
  },
};
</script>

<style></style>

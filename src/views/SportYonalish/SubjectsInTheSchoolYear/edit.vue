<script>
// http://sporterptest-api.apptest.uz/SchoolSubject/GetAll?forCurriculum=false&schoolyearid=0&orgschoolgradeid=0&IsAllSubjects=false /SchoolSubject/GetAll

// http://sporterptest-api.apptest.uz/SchoolYear/GetAll  /SchoolYear/GetAll

// http://sporterptest-api.apptest.uz/SchoolGrade/GetAll?schoolGradeGroupId=0  /SchoolGrade/GetAll
import SchoolGrade from "@/services/SchoolGrade.service";
import SchoolYear from "@/services/SchoolYear.service";
import SchoolSubject from "@/services/SchoolSubject.service";
import SubjectsInTheSchoolYearService from '@/services/SubjectsInTheSchoolYear.service'

export default {
  data() {
    return {
      local_id: 1000000,
      is_new: false,
      saving_form: false,
      getting_subjects: false,
      getting_years: false,
      getting_grades: false,
      subjects_list: [],
      school_years_list: [],
      school_grades_list: [],
      gradeSubjectHoursForm: {
        docnumber: "",
        docdate: "",
        schoolyearid: '',
        schoolyearname: "",
        schoolgradeid: '',
        schoolgradename: "",
        fromyear: '',
        toyear: '',
        detailinfo: "",
        statusid: 0,
        statusname: "",
        organizationid: 0,
        organizationname: "",
        cansave: true,
        canapprove: true,
        cancancelapprove: true,
        tables: []
        /**
         * tables: [{
            id: 0,
            ownerid: 0,
            schoolsubjectid: 0,
            schoolsubjectname: "string",
            hours: 0,
            status: 0
          }]
         */
      },
      rules: {
        docnumber: [
          { required: true, message: 'Docnum is required', trigger: 'blur' },
        ],
        docdate: [
          { required: true, message: 'docdate is required', trigger: 'change' }
        ],
        schoolyearid: [
          { type: 'number', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        schoolgradeid: [
          { type: 'number', required: true, message: 'Please pick a time', trigger: 'change' }
        ],
        fromyear: [
          { type: 'number', required: true, message: 'Please select at least one activity type', trigger: 'blur', max: 3000, min: 2000 }
        ],
        toyear: [
          { type: 'number', required: true, message: 'Please select activity resource', trigger: 'blur', max: 3000, min: 2000 }
        ],
        tables: [
          { required: true, type: 'array', message: 'Subjects are required', trigger: 'blur' },
          {
            validator: (_, value, callback) => {
              if (!value || value.length === 0) {
                return callback(new Error('Subjects are required'));
              } else {
                return callback()
              }
            }
          }
        ],
        "tables.schoolsubjectid": [
          { required: true, message: 'School subject is required', trigger: 'blur', min: 1, type: 'number' }
        ],
        "tables.hours": [
          { required: true, message: 'School hour is required', trigger: 'blur', min: 1, type: 'number' }
        ]
      }
    }
  },
  computed: {
    tables_com() {
      return this.gradeSubjectHoursForm.tables.filter(tbl => tbl.status !== 3)
    }
  },
  methods: {
    AddSubject() {
      if (this.gradeSubjectHoursForm.tables.filter(subj => subj.status !== 3).length === this.subjects_list.length) {
        this.$notify({
          message: 'Hamma dasrliklar tanlanga',
          type: 'warning',
          duration: 2500
        })
      } else {
        this.gradeSubjectHoursForm.tables.push({
          id: this.local_id++,
          ownerid: 0,
          schoolsubjectid: '',
          schoolsubjectname: '',
          hours: 0,
          status: 1
        })
      }

    },
    removeRow(index, id) {
      if (this.is_new)
        this.gradeSubjectHoursForm.tables.splice(index, 1)
      else if (id >= 1000000) {
        const indx = this.gradeSubjectHoursForm.tables.findIndex(tbl => tbl.id === id)
        this.gradeSubjectHoursForm.tables.splice(indx, 1)
      } else {
        this.gradeSubjectHoursForm.tables.find(tbl => tbl.id === id).status = 3
      }
    },

    saveForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.saving_form = true
            // reset local id
            this.gradeSubjectHoursForm.tables = this.gradeSubjectHoursForm.tables.map(tbl => {
              return {
                ...tbl,
                id: tbl.id >= 1000000 ? 0 : tbl.id
              }
            })
            await SubjectsInTheSchoolYearService.Update(this.gradeSubjectHoursForm)
            this.saving_form = false
            this.$notify({
              title: this.$t('actionss.success'),
              message: this.$t('actionss.success'),
              type: 'success'
            })
            // this.resetForm(formName)
            this.$router.push({
              name: 'SubjectsInTheSchoolYear'
            })
          } catch (error) {
            console.error(error)
            this.$notify({
              title: this.$t('Error'),
              message: error.response.data.error,
              type: 'error'
            })
            this.saving_form = false
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getSubject() {
      const { data: SubjectYear } = await SubjectsInTheSchoolYearService.Get(0)
      this.gradeSubjectHoursForm.docnumber = SubjectYear.docnumber
      this.gradeSubjectHoursForm.docdate = SubjectYear.docdate
      console.log("SubjectYear", SubjectYear)
      this.getting_subjects = true
      const { data } = await SchoolSubject.GetAll(this.$i18n.locale, true, this.gradeSubjectHoursForm.schoolyearid, this.gradeSubjectHoursForm.schoolgradeid, true)
      this.subjects_list = data
      this.gradeSubjectHoursForm.tables = this.subjects_list.map(sb => {
        return {
          id: this.local_id++,
          ownerid: 0,
          schoolsubjectid: sb.id,
          schoolsubjectname: sb.name,
          hours: 0,
          status: 1
        }
      })
      this.getting_subjects = false
    },
    schoolYearChanged(yearid) {
      this.gradeSubjectHoursForm.schoolyearname = this.school_years_list.find(year => year.id === yearid).name
      // this.getSubject()
      this.calculateFromToYears()
    },
    schoolGradeChanged(gradeid) {
      this.gradeSubjectHoursForm.schoolgradename = this.school_grades_list.find(grade => grade.id === gradeid).name
      // this.getSubject()
      this.calculateFromToYears()
    },
    calculateFromToYears() {
      if (this.gradeSubjectHoursForm.schoolyearid && this.gradeSubjectHoursForm.schoolgradeid) {
        const years = this.gradeSubjectHoursForm.schoolyearname.split('/').map(year => +year)
        this.gradeSubjectHoursForm.fromyear = years[0] - (11 - this.gradeSubjectHoursForm.schoolgradeid)
        this.gradeSubjectHoursForm.toyear = years[1] - (11 - this.gradeSubjectHoursForm.schoolgradeid)
      }
    },
    getHeaderCellClass() {
      return 'wrap-header-text'
    },
    goBack() {
      this.$router.push({
        name: 'SubjectsInTheSchoolYear'
      })

    },
    tableEdited(id) {
      if (!this.is_new ) {
        let tblindex = this.gradeSubjectHoursForm.tables.findIndex(tbl => tbl.id === id) 
        if(this.gradeSubjectHoursForm.tables[tblindex].id < 1000000 )
        this.gradeSubjectHoursForm.tables[tblindex].status = 2
      }
    },

    async initToEdit() {
      const { data } = await SubjectsInTheSchoolYearService.Get(this.$route.params.id)
      this.schoolYearChanged(data.schoolyearid)
      this.schoolGradeChanged(data.schoolgradeid)
      await this.getSubject()
      this.gradeSubjectHoursForm = {
        ...data,
        tables: data.Tables.map(tb => {
          return {
            ...tb,
            // fromyear: tb.fromyear + '',
            // toyear: tb.toyear + '',
            status: tb.Status
          }
        })
      }
    }
  },
  async mounted() {
    this.getting_years = true
    this.getting_grades = true
    const { data: aa } = await SchoolGrade.GetAll(this.$i18n.locale, 0)
    this.school_grades_list = aa
    const { data: years } = await SchoolYear.GetAll(this.$i18n.locale, 0)
    this.getting_grades = false
    this.getting_years = false
    this.school_years_list = years
    if (this.$route.params.id != 0) {
      await this.initToEdit()
    } else {
      await this.getSubject()
      this.getting_subjects = false
      this.gradeSubjectHoursForm.schoolyearid = this.school_years_list.find(yrs => yrs.isactive).id
      this.schoolYearChanged(this.gradeSubjectHoursForm.schoolyearid)
      this.is_new = true
    }
  }
}

</script>

<template>
  <el-card :body-style="{ padding: '1em' }" shadow="never">
    <el-row :gutter="10">

      <el-col :span="24" style="display: flex; justify-content: center;">
        <el-form style="max-width: 1024;" size="small" ref="gradeSubjectHoursFormRef" :model="gradeSubjectHoursForm"
          :rules="rules">
          <el-form-item>
            <el-col :span="8">
              <el-form-item :label="$t('docnumber')" prop="docnumber">
                <el-input :disabled="true" style="width: 100%" :value="gradeSubjectHoursForm.docnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('docdate')" prop="docdate">
                <!-- <el-date-picker style="width: 100%" v-model="gradeSubjectHoursForm.docdate"></el-date-picker> -->
                <el-input :disabled="true" style="width: 100%" :value="gradeSubjectHoursForm.docdate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('schoolyearname')" prop="schoolyearid">
                <el-select :disabled="is_new || !gradeSubjectHoursForm.cansave" @change="schoolYearChanged"
                  :placeholder="$t('schoolyearname')" :loading="getting_years" style="width: 100%"
                  v-model="gradeSubjectHoursForm.schoolyearid">
                  <el-option v-for="year in school_years_list" :key="year.id" :label="year.name"
                    :value="year.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="8">
              <el-form-item :label="$t('schoolgradename')" prop="schoolgradeid">
                <el-select :loading="getting_grades" :placeholder="$t('schoolgradename')" @change="schoolGradeChanged"
                  style="width: 100%" v-model="gradeSubjectHoursForm.schoolgradeid">
                  <el-option v-for="grade in school_grades_list" :key="grade.id" :label="grade.name"
                    :value="grade.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('fromyear')" prop="fromyear">
                <el-input-number :disabled="true" controls-position="right" style="width: 100%"
                  :value="gradeSubjectHoursForm.fromyear"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('toyear')" prop="toyear">
                <el-input-number :disabled="true" controls-position="right" style="width: 100%"
                  :value="gradeSubjectHoursForm.toyear"></el-input-number>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('comment')" prop="detailinfo">
            <el-input type="textarea" :rows="2" :placeholder="$t('comment')" v-model="gradeSubjectHoursForm.detailinfo">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('table_info')" prop="tables">
            <el-table show-summary border :header-cell-class-name="getHeaderCellClass" :data="tables_com" size="mini"
              style="width: 100%">
              <el-table-column align="center" type="index" label="No" :width="120"></el-table-column>
              <el-table-column align="center" :label="$t('subjectname')">
                <template slot-scope="scope">
                  <el-form-item style="margin: 0" :prop="`tables.${scope.$index}.schoolsubjectid`"
                    :rules="{ required: true, message: $t('subject_is_required'), trigger: 'blur', }">
                    <el-select :filterable="true" :loading="getting_subjects" style="width: 100%;"
                      v-model="gradeSubjectHoursForm.tables.filter(tbl => tbl.status !== 3)[scope.$index].schoolsubjectid"
                      @change="tableEdited(scope.row.id)">
                      <el-option v-for="subject in subjects_list" :key="subject.id" :label="subject.name"
                        :value="subject.id"
                        :disabled="gradeSubjectHoursForm.tables.findIndex(tab => tab.schoolsubjectid === subject.id && tab.status !== 3) > -1"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <!-- O'quv rejasida beligilangan soatlar miqdori -->
              <el-table-column align="center" :label="$t('study_plan_hours')" prop="hours">
                <template slot-scope="scope">
                  <el-form-item style="margin: 0" :prop="`tables.${scope.$index}.hours`"
                    :rules="{ required: true, message: $t('subject_hours_are_required'), trigger: 'blur', type: 'number', min: 1, max: 999 }">
                    <el-input-number style="width: 10rem;"
                      v-model="gradeSubjectHoursForm.tables.filter(tbl => tbl.status !== 3)[scope.$index].hours"
                      :min="1"
                      :max="999"
                      @change="tableEdited(scope.row.id)"></el-input-number>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :width="50" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" :circle="true" icon="el-icon-minus"
                    @click="removeRow(scope.$index, scope.row.id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button v-if="gradeSubjectHoursForm.cansave" type="text" icon="el-icon-plus" @click="AddSubject()">{{
              $t('add_subject') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" style="display: flex; justify-content: space-between;">
        <el-button @click="goBack" icon="el-icon-back" size="small" type="danger">{{ $t('back') }}</el-button>

        <el-button icon="el-icon-check" size="small" type="success" :disabled="saving_form" :loading="saving_form"
          v-if="gradeSubjectHoursForm.cansave" @click="saveForm('gradeSubjectHoursFormRef')">{{ $t('save') }}</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>
<style lang="scss">
.wrap-header-text>.cell {
  word-break: normal !important;
}
</style>
import ApiService from "./api.service";

const ReportLearningProcessService = {
  GetTotalCurriculum(schoolyearid, oblastid, regionid, organizationid) {
    return ApiService.get(
      `/ReportLearningProcess/GetTotalCurriculum?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`
    );
  },
  GetGraduatedFromGrade11(
    schoolyearid,
    isminvuz,
    isdtm,
    personname,
    pinfl,
    Search,
    organizationid,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(`/ReportLearningProcess/GetGraduatedFromGrade11?schoolyearid=${schoolyearid}&isminvuz=${isminvuz}&isdtm=${isdtm}&personname=${personname}
        &pinfl${pinfl}&Search=${Search}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`);
  },
  GetStudentMovement(StartDate, EndDate, schoolyearid, oblastid, regionid) {
    return ApiService.get(
      `/ReportLearningProcess/GetStudentMovement?StartDate=${StartDate}&EndDate=${EndDate}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}`
    );
  },
  ExamGroupCountCompareDTMGroup(SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/ReportLearningProcess/ExamGroupCountCompareDTMGroup?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  ExamGroupCountCompareDTMGroupByEduClassifier(SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/ReportLearningProcess/ExamGroupCountCompareDTMGroupByEduClassifier?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetPersonAndStudentPlan(oblastid, regionid) {
    return ApiService.get(
      `/ReportLearningProcess/GetPersonAndStudentPlan?oblastid=${oblastid}&regionid=${regionid}`
    );
  },
  PrintStudentMovement(StartDate, EndDate, schoolyearid, oblastid, regionid) {
    return ApiService.print(
      `/ReportLearningProcess/PrintStudentMovement?StartDate=${StartDate}&EndDate=${EndDate}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}`
    );
  },
  // GetReportTeacherCount(params) {
  //   return ApiService.getParam(`/EmployeeReport/GetReportTeacherCount`, params)
  // },
  GetReportTeacherCount(oblastId, regionId,organizationTypeId, schoolTypeId, isByDiplomDoc, showAllRegion, showAllOrganization) {
    return ApiService.get(
      `/ReportLearningProcess/GetReportTeacherCount?oblastId=${oblastId}&regionId=${regionId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isByDiplomDoc=${isByDiplomDoc}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`
    );
  },
  PrintPersonAndStudentPlan(oblastid, regionid) {
    return ApiService.print(
      `/ReportLearningProcess/PrintPersonAndStudentPlan?oblastid=${oblastid}&regionid=${regionid}`
    );
  },
  GetStudentsCountInSchool(
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    schoolyearid,
    oblastid,
    regionid,
    organizationid,
    schoolGradeId,
    schoollegalformid,
    organizationTypeId
  ) {
    return ApiService.get(
      `/ReportLearningProcess/StudentsCountInSchool?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolGradeId=${schoolGradeId}&schoollegalformid=${schoollegalformid}&organizationTypeId=${organizationTypeId}`
    );
  },
  StudentsTotalCountInSchool(
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    schoolyearid,
    oblastid,
    regionid,
    organizationid,
    schoollegalformid,
    organizationTypeId
  ) {
    return ApiService.get(
      `/ReportLearningProcess/StudentsTotalCountInSchool?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoollegalformid=${schoollegalformid}&organizationTypeId=${organizationTypeId}`
    );
  },
  PrintStudentsCountInSchool(
    schoolyearid,
    oblastid,
    regionid,
    organizationid,
    schoolGradeId,
    schoolLegalFormId,
    organizationTypeId
  ) {
    return ApiService.print(
      `/ReportLearningProcess/PrintStudentsCountInSchool?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolGradeId=${schoolGradeId}&schoolLegalFormId=${schoolLegalFormId}&organizationTypeId=${organizationTypeId}`
    );
  },
  PrintStudentsTotalCountInSchool(
    schoolyearid,
    oblastid,
    regionid,
    organizationid,
    schoolLegalFormId,
    organizationTypeId
  ) {
    return ApiService.print(
      `/ReportLearningProcess/PrintStudentsTotalCountInSchool?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolLegalFormId=${schoolLegalFormId}&organizationTypeId=${organizationTypeId}`
    );
  },
  GetHeadOrgSchoolGradeCount(
    schoolyearid,
    oblastid,
    regionid,
    organizationtypeid,
    schooltypeid,
    schoollegalformid,
    educationlanguageid
  ) {
    return ApiService.get(
      `/ReportLearningProcess/GetHeadOrgSchoolGradeCount?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&schoollegalformid=${schoollegalformid}&educationlanguageid=${educationlanguageid}`
    );
  },
  GetFormingGroupDate(
    oblastid,
    regionid,
    schoolyearid,
    lang,
  ) {
    return ApiService.get(
      `/ReportLearningProcess/GetFormingGroupDate?oblastid=${oblastid}&regionid=${regionid}&schoolyearid=${schoolyearid}&lang=${lang}`
    );
  },
  GetFormingGroupSportTypeDate(
    oblastid,
    regionid,
    organizationid,
    schoolyearid,
    lang,
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationid == null || organizationid === undefined) {
      organizationid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetFormingGroupSportTypeDate?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolyearid=${schoolyearid}&lang=${lang}`
    );
  },
  GetSchoolCountByOrgType(
    oblastid,
    regionid,
    organizationtypeid,
    schooltypeid,
    schoollegalformid,
  ) {
    return ApiService.get(
      `/ReportLearningProcess/GetSchoolCountByOrgType?oblastid=${oblastid}&regionid=${regionid}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&schoollegalformid=${schoollegalformid}`
    );
  },
  EstatementStudentsCountInSchool(
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    schoolyearid,
    oblastid,
    regionid,
    organizationid
  ) {
    return ApiService.get(
      `/ReportLearningProcess/EstatementStudentsCountInSchool?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`
    );
  },
  PrintEstatementStudentsCountInSchool(
    schoolyearid,
    oblastid,
    regionid,
    organizationid
  ) {
    return ApiService.print(
      `/ReportLearningProcess/PrintEstatementStudentsCountInSchool?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`
    );
  },
  GetSchoolCount(
    schoolyearid,
    oblastid,
    regionid,
    organizationtypeid,
    schooltypeid,
    schoollegalformid
  ) {
    return ApiService.get(
      `/ReportLearningProcess/GetSchoolCount?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&schoollegalformid=${schoollegalformid}`
    );
  },
  ComparedAdmChildCount(
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    schoolyearid,
    oblastid,
    regionid,
    organizationid
  ) {
    return ApiService.get(
      `/ReportLearningProcess/ComparedAdmChildCount?SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`
    );
  },
  PrintComparedAdmChildCount(
    schoolyearid,
    oblastid,
    regionid,
    organizationid,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.print(
      `/ReportLearningProcess/PrintComparedAdmChildCount?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  PrintEmployeesCount(onDate, oblastId, regionId, schoolSubjectId) {
    return ApiService.print(
      `/ReportLearningProcess/PrintEmployeesCount?onDate=${onDate}&oblastId=${oblastId}&regionId=${regionId}&schoolSubjectId=${schoolSubjectId}`
    );
  },
  GetCovidVacEmployeesCount(oblastid, regionid) {
    return ApiService.get(
      `/ReportLearningProcess/GetCovidVacEmployeesCount?oblastId=${oblastid}&regionId=${regionid}`
    );
  },
  GetSchoolCapacity(schoolyearid, oblastid, regionid, schoolLegalFormId) {
    return ApiService.get(
      `/ReportLearningProcess/GetSchoolCapacity?schoolyearid=${schoolyearid}&oblastId=${oblastid}&regionId=${regionid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  PrintSchoolCapacity(schoolyearid, oblastid, regionid, schoolLegalFormId) {
    return ApiService.print(
      `/ReportLearningProcess/PrintSchoolCapacity?schoolyearid=${schoolyearid}&oblastId=${oblastid}&regionId=${regionid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  GetSchoolGroupCount(schoolyearid, oblastid, regionid, schoolLegalFormId) {
    if (schoolLegalFormId == null || schoolLegalFormId === undefined) {
      schoolLegalFormId = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetSchoolGroupCount?schoolyearid=${schoolyearid}&oblastId=${oblastid}&regionId=${regionid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  PrintSchoolGroupCount(schoolyearid, oblastid, regionid, schoolLegalFormId) {
    if (schoolLegalFormId == null || schoolLegalFormId === undefined) {
      schoolLegalFormId = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintSchoolGroupCount?schoolyearid=${schoolyearid}&oblastId=${oblastid}&regionId=${regionid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  GetGraduatedFromGrade11Count(schoolyearid, oblastid, regionid) {
    return ApiService.get(
      `/ReportLearningProcess/GetGraduatedFromGrade11Count?schoolyearid=${schoolyearid}&oblastId=${oblastid}&regionId=${regionid}`
    );
  },
  GetSchoolsColorByCoefficient(
    oblastid,
    regionid,
    schoolyearid,
    schoolLegalFormId
  ) {
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    if (schoolLegalFormId == null || schoolLegalFormId === undefined) {
      schoolLegalFormId = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetSchoolsColorByCoefficient?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  PrintSchoolsColorByCoefficient(
    oblastid,
    regionid,
    schoolyearid,
    schoolLegalFormId
  ) {
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    if (schoolLegalFormId == null || schoolLegalFormId === undefined) {
      schoolLegalFormId = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintSchoolsColorByCoefficient?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoolLegalFormId=${schoolLegalFormId}`
    );
  },
  GetStudentCapacity(oblastid, regionid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetStudentCapacity?oblastId=${oblastid}&regionId=${regionid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintStudentCapacity(oblastid, regionid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintStudentCapacity?oblastId=${oblastid}&regionId=${regionid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetOrgSchoolGradeCountByLanguage(
    oblastid,
    regionid,
    schoolyearid,
    schoollegalformid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetOrgSchoolGradeCountByLanguage?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintOrgSchoolGradeCountByLanguage(
    oblastid,
    regionid,
    schoolyearid,
    schoollegalformid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintOrgSchoolGradeCountByLanguage?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetGroupsOfNumberClass(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetGroupsOfNumberClass?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintGroupsOfNumberClass(
    oblastid,
    regionid,
    schoolyearid,
    schoollegalformid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintGroupsOfNumberClass?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetBranchesOfSchools(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetBranchesOfSchools?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintBranchesOfSchools(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintBranchesOfSchools?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetSpecializedSchools(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetSpecializedSchools?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintSpecializedSchools(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintSpecializedSchools?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetLocationOfSchools(
    oblastid,
    regionid,
    schoollegalformid,
    organizationtypeid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetLocationOfSchools?oblastId=${oblastid}&regionId=${regionid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`
    );
  },
  PrintLocationOfSchools(
    oblastid,
    regionid,
    schoollegalformid,
    organizationtypeid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintLocationOfSchools?oblastId=${oblastid}&regionId=${regionid}&schoollegalformid=${schoollegalformid}&organizationtypeid=${organizationtypeid}`
    );
  },
  GetSequenceOfEducation(oblastid, regionid, schoolyearid, schoollegalformid) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetSequenceOfEducation?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintSequenceOfEducation(
    oblastid,
    regionid,
    schoolyearid,
    schoollegalformid
  ) {
    if (schoollegalformid == null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintSequenceOfEducation?oblastId=${oblastid}&regionId=${regionid}&schoolyearid=${schoolyearid}&schoollegalformid=${schoollegalformid}`
    );
  },
  GetTeachersCountInSchool(
    oblastid,
    regionid,
    organizationid,
    schoollegalformid,
    organizationTypeId,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetTeachersCountInSchool?oblastId=${oblastid}&regionId=${regionid}&organizationid=${organizationid}&schoollegalformid=${schoollegalformid}&organizationTypeId=${organizationTypeId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetMovedSchoolCount(
    oblastid,
    regionid,
    organizationTypeId,
    schoolTypeId,
    schoolLegalFormId,
    schoolyearid,
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    return ApiService.get(
      `/ReportLearningProcess/GetMovedSchoolCount?oblastId=${oblastid}&regionId=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}&schoolyearid=${schoolyearid}`
    );
  },
  PrintTeachersCountInSchool(
    oblastid,
    regionid,
    organizationid,
    schoollegalformid,
    organizationTypeId,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    return ApiService.print(
      `/ReportLearningProcess/PrintTeachersCountInSchool?oblastId=${oblastid}&regionId=${regionid}&organizationid=${organizationid}&schoollegalformid=${schoollegalformid}&organizationTypeId=${organizationTypeId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
};
export default ReportLearningProcessService;

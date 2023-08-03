import ApiService from "./api.service";

const StudentManageService = {
  GetList(
    personName,
    DateOfBirth,
    organizationid,
    OnDate,
    SchoolYearID,
    OrgSchoolGradeID,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/StudentManage/GetList?personName=${personName}&dateOfBirth=${DateOfBirth}&onDate=${OnDate}&schoolYearID=${SchoolYearID}&orgSchoolGradeID=${OrgSchoolGradeID}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationid=${organizationid}`
    );
  },
  PrintStudentList(
    personName,
    DateOfBirth,
    organizationid,
    OnDate,
    SchoolYearID,
    OrgSchoolGradeID,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.print(
      `/StudentManage/PrintStudentList?personName=${personName}&dateOfBirth=${DateOfBirth}&onDate=${OnDate}&schoolYearID=${SchoolYearID}&orgSchoolGradeID=${OrgSchoolGradeID}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationid=${organizationid}`
    );
  },
  GetAllFree(FullName, DateOfBirth, PersonID) {
    return ApiService.get(
      `/StudentManage/GetAllFree?FullName=${FullName}&DateOfBirth=${DateOfBirth}&PersonID=${PersonID}`
    );
  },
  GetAllInOrgSchoolGrade(
    FullName,
    DateOfBirth,
    OnDate,
    SchoolYearID,
    OrgSchoolGradeID
  ) {
    return ApiService.get(
      `/StudentManage/GetAllInOrgSchoolGrade?FullName=${FullName}&DateOfBirth=${DateOfBirth}&OnDate=${OnDate}&SchoolYearID=${SchoolYearID}&OrgSchoolGradeID=${OrgSchoolGradeID}`
    );
  },
  GetStudentCard(PersonId, DocumentSeries, DocumentNumber, Pinfl, DateOfBirth) {
    return ApiService.get(
      `/StudentManage/GetStudentCard?PersonId=${PersonId}&DocumentSeries=${DocumentSeries}&DocumentNumber=${DocumentNumber}&Pinfl=${Pinfl}&DateOfBirth=${DateOfBirth}`
    );
  },
  GetSchoolStudentCountBySchoolGrade(
    schoolYearId,
    organizationId,
    onDate,
    byGradeLetter
  ) {
    return ApiService.get(
      `/StudentManage/GetSchoolStudentCountBySchoolGrade?schoolYearId=${schoolYearId}&organizationId=${organizationId}&onDate=${onDate}&byGradeLetter=${byGradeLetter}`
    );
  },
};
export default StudentManageService;

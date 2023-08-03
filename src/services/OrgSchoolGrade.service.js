import ApiService from "./api.service";

const OrgSchoolGradeService = {
  GetAll(schoolgradecode, schoolgradeid, organizationid, schoolyearid) {
    if (schoolgradecode == undefined) schoolgradecode = "";
    if (organizationid === null || organizationid === undefined) {
      organizationid = 0;
    }
    if (schoolyearid === null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.get(
      `/OrgSchoolGrade/GetAll?schoolgradecode=${schoolgradecode}&schoolgradeid=${schoolgradeid}&organizationid=${organizationid}&schoolyearid=${schoolyearid}`
    );
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, schoolgradeid) {
    return ApiService.get(
      `/OrgSchoolGrade/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolgradeid=${schoolgradeid}`
    );
  },
  Get(id) {
    return ApiService.get(`/OrgSchoolGrade/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/OrgSchoolGrade/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/OrgSchoolGrade/Delete?id=${id}`);
  },
};
export default OrgSchoolGradeService;

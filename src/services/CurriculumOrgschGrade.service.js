import ApiService from './api.service'

const CurriculumOrgschGradeService = {
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    schoolyearid,
    orgschoolgradeid
  ) {
    return ApiService.get(
      `/CurriculumOrgschGrade/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&orgschoolgradeid=${orgschoolgradeid}`
    );
  },
  Get(id) {
    return ApiService.get(`/CurriculumOrgschGrade/Get?id=${id}`);
  },
  GetFreeClassTime(
    schoolyearid,
    schoolsubjectid,
    orgschoolgradeid,
    excludedocumentid
  ) {
    return ApiService.get(
      `/CurriculumOrgschGrade/GetFreeClassTime?schoolyearid=${schoolyearid}&schoolsubjectid=${schoolsubjectid}&orgschoolgradeid=${orgschoolgradeid}&excludedocumentid=${excludedocumentid}`
    );
  },
  GetCurriculumOrgschGradeTable(
    schoolyearid,
    schoolgradeid,
    orgschoolgradeid,
    docdate
  ) {
    return ApiService.get(
      `/CurriculumOrgschGrade/GetCurriculumOrgschGradeTable?schoolyearid=${schoolyearid}&schoolgradeid=${schoolgradeid}&orgschoolgradeid=${orgschoolgradeid}&docdate=${docdate}`
    );
  },
  Update(data) {
    return ApiService.post("/CurriculumOrgschGrade/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CurriculumOrgschGrade/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/CurriculumOrgschGrade/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/CurriculumOrgschGrade/CancelApproval?id=${id}`);
  },
};
export default CurriculumOrgschGradeService
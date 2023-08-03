import ApiService from "./api.service";

const AssessmentCriteriaService = {
  GetList(
    schoolYearId,
    higHerEduClassifierId,
    educationFormTypemId,
    educationLanguageId,
    genderId,
    statusId,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/AssessmentCriteria/GetList?schoolYearId=${schoolYearId}&higHerEduClassifierId=${higHerEduClassifierId}&educationFormTypemId=${educationFormTypemId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}&statusId=${statusId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetAllAssessmentCriteriaTable(
    schoolyearid,
    highereduclassifierid,
    educationformtypeid,
    educationlanguageid,
    physicaltrainingtypeid,
    genderId
  ) {
    return ApiService.get(
      `/AssessmentCriteria/GetAllAssessmentCriteriaTable?schoolyearid=${schoolyearid}&highereduclassifierid=${highereduclassifierid}&educationformtypeid=${educationformtypeid}&educationlanguageid=${educationlanguageid}&physicaltrainingtypeid=${physicaltrainingtypeid}&genderId=${genderId}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/AssessmentCriteria/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/AssessmentCriteria/Get?id=${id}`);
  },
  GetClone(id) {
    return ApiService.get(`/AssessmentCriteria/GetClone?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AssessmentCriteria/Update", data);
  },
  Approve(id, data) {
    return ApiService.post(`/AssessmentCriteria/Approve?id=${id}`, data);
  },
  CancelApproval(id, data) {
    return ApiService.post(`/AssessmentCriteria/CancelApproval?id=${id}`, data);
  },
  GetAllAssessmentCriteriaTableStandard(assessmentcriteriatableid) {
    return ApiService.get(
      `/AssessmentCriteria/GetAllAssessmentCriteriaTableStandard?assessmentcriteriatableid=${assessmentcriteriatableid}`
    );
  },
  GetAllAssessmentCriteriaTableStandardById(id) {
    return ApiService.get(`/AssessmentCriteria/GetAllAssessmentCriteriaTableStandardById?id=${id}`)
  },
  GetAllAssessmentCriteriastandard(schoolyearid, highereduclassifierid, genderid) {
    return ApiService.get(`/AssessmentCriteria/GetAllAssessmentCriteriastandard?schoolyearid=${schoolyearid}&highereduclassifierid=${highereduclassifierid}&genderid=${genderid}`)
  }
};
export default AssessmentCriteriaService;

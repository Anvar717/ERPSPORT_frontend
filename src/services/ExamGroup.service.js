import ApiService from "./api.service";

const ExamGroupService = {
  GetList(
    schoolYearId,
    higHerEduClassifierId,
    educationFormTypemId,
    educationLanguageId,
    genderId,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    withoutTable
  ) {
    return ApiService.get(
      `/ExamGroup/GetList?schoolYearId=${schoolYearId}&higHerEduClassifierId=${higHerEduClassifierId}&educationFormTypemId=${educationFormTypemId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&withoutTable=${withoutTable}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/ExamGroup/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/ExamGroup/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/ExamGroup/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/ExamGroup/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/ExamGroup/CancelApproval?id=${id}`);
  },
  GetGetAllExamGroup(
    schoolyearid,
    highereduclassifierid,
    educationformtypeid,
    educationlanguageid
  ) {
    return ApiService.get(
      `/ExamGroup/GetGetAllExamGroup?schoolyearid=${schoolyearid}&highereduclassifierid=${highereduclassifierid}&educationformtypeid=${educationformtypeid}&educationlanguageid=${educationlanguageid}`
    );
  },
};
export default ExamGroupService;

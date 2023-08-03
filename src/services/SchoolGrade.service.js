import ApiService from "./api.service";

const SchoolGradeService = {
  GetAll(lang, schoolGradeGroupId) {
    return ApiService.get(
      `/SchoolGrade/GetAll?lang=${lang}&schoolGradeGroupId=${schoolGradeGroupId}`
    );
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SchoolGrade/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SchoolGrade/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SchoolGrade/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SchoolGrade/Delete?id=${id}`);
  },
};
export default SchoolGradeService;

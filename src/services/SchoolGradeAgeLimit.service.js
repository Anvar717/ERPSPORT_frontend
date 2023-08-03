import ApiService from "./api.service";

const SchoolGradeAgeLimitService = {
  GetAll(lang) {
    return ApiService.get(
      `/SchoolGradeAgeLimit/GetAll?lang=${lang}}`
    );
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SchoolGradeAgeLimit/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SchoolGradeAgeLimit/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SchoolGradeAgeLimit/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SchoolGradeAgeLimit/Delete?id=${id}`);
  },
};
export default SchoolGradeAgeLimitService;

import ApiService from "./api.service";

const SportTypeClassifierService = {
  GetAll(isAllInfo, lang) {
    return ApiService.get(`/SportTypeClassifier/GetAll?isAllInfo=${isAllInfo}&lang=${lang}`);
  },
  GetAllSportTypeClassifierDiscipLine(id) {
    return ApiService.get(`/SportTypeClassifier/GetAllSportTypeClassifierDiscipLine?id=${id}`);
  },
  GetAllByTrainingSchedule(rrainingScheduleId) {
    return ApiService.get(`/SportTypeClassifier/GetAllByTrainingSchedule?rrainingScheduleId=${rrainingScheduleId}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTypeClassifier/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeClassifier/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTypeClassifier/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeClassifier/Delete?id=${id}`);
  },
};
export default SportTypeClassifierService;

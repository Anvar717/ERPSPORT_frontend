import ApiService from "./api.service";

const SportGrowthRateService = {
  GetAll() {
    return ApiService.get(`/SportGrowthRate/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportGrowthRate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportGrowthRate/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportGrowthRate/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportGrowthRate/Delete?id=${id}`);
  },
};
export default SportGrowthRateService;

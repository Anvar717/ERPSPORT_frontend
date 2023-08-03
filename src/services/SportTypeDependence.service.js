import ApiService from "./api.service";

const SportTypeDependenceService = {
  GetAll() {
    return ApiService.get(`/SportTypeDependence/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTypeDependence/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeDependence/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTypeDependence/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeDependence/Delete?id=${id}`);
  },
};
export default SportTypeDependenceService;

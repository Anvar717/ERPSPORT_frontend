import ApiService from "./api.service";

const SportEventCategoryService = {
  GetAll() {
    return ApiService.get(`/SportEventCategory/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEventCategory/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportEventCategory/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportEventCategory/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportEventCategory/Delete?id=${id}`);
  },
};
export default SportEventCategoryService;

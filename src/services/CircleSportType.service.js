import ApiService from "./api.service";

const CircleSportTypeService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/CircleSportType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/CircleSportType/Get?id=${id}`);
  },
  GetAll() {
    return ApiService.get(`/CircleSportType/GetAll`);
  },
  Update(data) {
    return ApiService.post("/CircleSportType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CircleSportType/Delete?id=${id}`);
  },
};
export default CircleSportTypeService;

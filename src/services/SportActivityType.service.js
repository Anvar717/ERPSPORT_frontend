import ApiService from "./api.service";

const SportActivityTypeService = {
  GetAll() {
    return ApiService.get(`/SportActivityType/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportActivityType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportActivityType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportActivityType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportActivityType/Delete?id=${id}`);
  },
};
export default SportActivityTypeService;

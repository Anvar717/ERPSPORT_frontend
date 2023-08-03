import ApiService from "./api.service";

const SportEventTypeService = {
  GetAll(sporteventcategoryid) {
    return ApiService.get(`/SportEventType/GetAll?sporteventcategoryid=${sporteventcategoryid}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEventType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportEventType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportEventType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportEventType/Delete?id=${id}`);
  },
};
export default SportEventTypeService;

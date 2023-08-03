import ApiService from "./api.service";

const SportTitleService = {
  GetAll(isAllSporttitle=true) {
    return ApiService.get(`/SportTitle/GetAll?isAllSporttitle=${isAllSporttitle}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTitle/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTitle/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTitle/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTitle/Delete?id=${id}`);
  },
};
export default SportTitleService;

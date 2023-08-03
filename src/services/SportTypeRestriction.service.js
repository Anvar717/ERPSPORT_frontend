import ApiService from "./api.service";

const SportTypeRestrictionService = {
  GetAll() {
    return ApiService.get(`/SportTypeRestriction/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTypeRestriction/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeRestriction/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTypeRestriction/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeRestriction/Delete?id=${id}`);
  },
};
export default SportTypeRestrictionService;

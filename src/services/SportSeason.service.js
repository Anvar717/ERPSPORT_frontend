import ApiService from "./api.service";

const SportSeasonService = {
  GetAll() {
    return ApiService.get(`/SportSeason/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportSeason/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportSeason/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportSeason/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportSeason/Delete?id=${id}`);
  },
};
export default SportSeasonService;

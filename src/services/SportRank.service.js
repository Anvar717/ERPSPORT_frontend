import ApiService from "./api.service";

const SportRankService = {
  GetAll() {
    return ApiService.get(`/SportRank/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportRank/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportRank/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportRank/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportRank/Delete?id=${id}`);
  },
};
export default SportRankService;    
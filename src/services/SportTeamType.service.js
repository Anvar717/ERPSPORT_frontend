import ApiService from "./api.service";

const SportTeamTypeService = {
  GetAll() {
    return ApiService.get(`/SportTeamType/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTeamType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTeamType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTeamType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTeamType/Delete?id=${id}`);
  },
};
export default SportTeamTypeService;
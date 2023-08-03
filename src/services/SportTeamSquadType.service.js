import ApiService from "./api.service";

const SportTeamSquadTypeService = {
  GetAll() {
    return ApiService.get(`/SportTeamSquadType/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTeamSquadType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTeamSquadType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTeamSquadType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTeamSquadType/Delete?id=${id}`);
  },
};
export default SportTeamSquadTypeService;
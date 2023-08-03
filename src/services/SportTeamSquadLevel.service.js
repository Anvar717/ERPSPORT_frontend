import ApiService from "./api.service";

const SportTeamSquadLevelService = {
  GetAll() {
    return ApiService.get(`/SportTeamSquadLevel/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTeamSquadLevel/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTeamSquadLevel/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTeamSquadLevel/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTeamSquadLevel/Delete?id=${id}`);
  },
};
export default SportTeamSquadLevelService;    
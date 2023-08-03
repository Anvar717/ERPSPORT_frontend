import ApiService from './api.service'

const SportOrgRatingCriteriaService = {
  GetAll() {
    return ApiService.get(`/SportOrgRatingCriteria/GetAll`);
  },
  GetList(
      Search,
      organizationtypeid,
      statusid,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportOrgRatingCriteria/GetList?Search=${Search}&organizationtypeid=${organizationtypeid}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportOrgRatingCriteria/Get?id=${id}`);
  },
  GetScoreTables(sportOrgRatingCriteriaTableId) {
    return ApiService.get(`/SportOrgRatingCriteria/GetScoreTables?sportOrgRatingCriteriaTableId=${sportOrgRatingCriteriaTableId}`);
  },
  Fill(data) {
    return ApiService.post("/SportOrgRatingCriteria/Fill", data);
    },
    Update(data) {
        return ApiService.post("/SportOrgRatingCriteria/Update", data);
  },
  UpdateSportOrgRatingCriteriaScoreTable(data) {
    return ApiService.post("/SportOrgRatingCriteria/UpdateSportOrgRatingCriteriaScoreTable", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportOrgRatingCriteria/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportOrgRatingCriteria/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportOrgRatingCriteria/CancelApproval?id=${id}`);
  },
};
export default SportOrgRatingCriteriaService
import ApiService from './api.service'

const SportOrgRatingService = {
  GetAll() {
    return ApiService.get(`/SportOrgRating/GetAll`);
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
      `/SportOrgRating/GetList?Search=${Search}&organizationtypeid=${organizationtypeid}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetSendList(
    Search,
    oblastid,
    regionid,
    organizationid,
    organizationtypeid,
    statusid,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportOrgRating/GetSendList?Search=${Search}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&organizationtypeid=${organizationtypeid}&statusid=${statusid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportOrgRating/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportOrgRating/Update", data);
  },
  Fill(data) {
    return ApiService.post("/SportOrgRating/Fill", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportOrgRating/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportOrgRating/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportOrgRating/CancelApproval?id=${id}`);
  },
  Send(id) {
    return ApiService.post(`/SportOrgRating/Send?id=${id}`);
  },
  Accept(id) {
    return ApiService.post(`/SportOrgRating/Accept?id=${id}`);
  },
  Reject(sportOrgRatingId, description) {
    return ApiService.post(`/SportOrgRating/Reject?sportOrgRatingId=${sportOrgRatingId}&description=${description}`);
  },
};
export default SportOrgRatingService
import ApiService from './api.service'

const SportLevelService = {
  GetAll() {
    return ApiService.get(`/SportLevel/GetAll`);
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportLevel/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportLevel/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportLevel/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportLevel/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportLevel/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportLevel/CancelApproval?id=${id}`);
  },
};
export default SportLevelService
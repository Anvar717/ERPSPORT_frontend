import ApiService from './api.service'

const SportLevelGroupService = {
  GetAll() {
    return ApiService.get(`/SportLevelGroup/GetAll`);
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportLevelGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportLevelGroup/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportLevelGroup/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportLevelGroup/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportLevelGroup/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportLevelGroup/CancelApproval?id=${id}`);
  },
};
export default SportLevelGroupService
import ApiService from './api.service'

const SportGroupMovementService = {
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportGroupMovement/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportGroupMovement/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportGroupMovement/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportGroupMovement/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportGroupMovement/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportGroupMovement/CancelApproval?id=${id}`);
  },
};
export default SportGroupMovementService
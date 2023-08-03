import ApiService from "./api.service";

const CloseMembershipService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/CloseMembership/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/CloseMembership/Get?id=${id}`);
  },
  FillCloseMembership(data) {
    return ApiService.post(`/CloseMembership/FillCloseMembership`,data);
  },
  ClearCloseMembership(closemembershipid) {
    return ApiService.post(`/CloseMembership/ClearCloseMembership?closemembershipid=${closemembershipid}`);
  },
  GetAll() {
    return ApiService.get(`/CloseMembership/GetAll`);
  },
  Update(data) {
    return ApiService.post("/CloseMembership/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CloseMembership/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/CloseMembership/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/CloseMembership/CancelApproval?id=${id}`);
  },
};
export default CloseMembershipService;

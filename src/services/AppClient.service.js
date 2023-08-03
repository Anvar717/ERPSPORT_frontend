import ApiService from "./api.service";

const AppClientService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/AppClient/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/AppClient/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/AppClient/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AppClient/Update", data);
  },
  Approve(id, data) {
    return ApiService.post(`/AppClient/Approve?id=${id}`, data);
  },
  CancelApproval(id, data) {
    return ApiService.post(`/AppClient/CancelApproval?id=${id}`, data);
  },
};
export default AppClientService;

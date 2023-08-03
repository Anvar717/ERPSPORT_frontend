import ApiService from "./api.service";

const AppealService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/Appeal/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetListForMOQ(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/Appeal/GetListForMOQ?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/Appeal/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/Appeal/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/Appeal/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/Appeal/CancelApproval?id=${id}`);
  },
  Sent(id) {
    return ApiService.post(`/Appeal/Sent?id=${id}`);
  },
  DeliveredSent(id) {
    return ApiService.post(`/Appeal/DeliveredSent?id=${id}`);
  },
  Delete(id) {
    return ApiService.delete(`/Appeal/Delete?id=${id}`);
  },
};
export default AppealService;

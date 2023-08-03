import ApiService from './api.service'

const PaymentFreeMemberShipService = {
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/PaymentFreeMemberShip/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/PaymentFreeMemberShip/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/PaymentFreeMemberShip/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PaymentFreeMemberShip/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/PaymentFreeMemberShip/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/PaymentFreeMemberShip/CancelApproval?id=${id}`);
  },
};
export default PaymentFreeMemberShipService
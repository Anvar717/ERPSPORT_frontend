import ApiService from "./api.service";

const PaymentScheduleTypeService = {
  GetAll() {
    return ApiService.get(`/PaymentScheduleType/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/PaymentScheduleType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/PaymentScheduleType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/PaymentScheduleType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PaymentScheduleType/Delete?id=${id}`);
  },
};
export default PaymentScheduleTypeService;

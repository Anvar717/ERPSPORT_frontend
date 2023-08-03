import ApiService from './api.service'

const PaymentAccrualService = {
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/PaymentAccrual/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetNotPaidPaymentAccrualList(
    docdate,
    personmembername,
    personmembershipnumber,
    servicepocketid,
    circlesporttypeid,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/PaymentAccrual/GetNotPaidPaymentAccrualList?docdate=${docdate}&personmembername=${personmembername}&personmembershipnumber=${personmembershipnumber}&servicepocketid=${servicepocketid}&circlesporttypeid=${circlesporttypeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/PaymentAccrual/Get?id=${id}`);
  },
  FillPaymentAccrual(data) {
    return ApiService.post("/PaymentAccrual/FillPaymentAccrual", data);
  },
  Update(data) {
    return ApiService.post("/PaymentAccrual/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PaymentAccrual/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/PaymentAccrual/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/PaymentAccrual/CancelApproval?id=${id}`);
  },
};
export default PaymentAccrualService
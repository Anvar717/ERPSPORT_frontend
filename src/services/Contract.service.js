import ApiService from "./api.service";

const ContractService = {
  GetAll() {
    return ApiService.get(`/Contract/GetAll`);
  },
  GetAllForIHIncome(sellerinn) {
    return ApiService.get(`/Contract/GetAll?sellerinn=${sellerinn}`);
  },
  GetList(
    StartDate,
    EndDate,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/Contract/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/Contract/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/Contract/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/Contract/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/Contract/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/Contract/CancelApproval?id=${id}`);
  },
};
export default ContractService;

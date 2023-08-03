import ApiService from './api.service'

const SportItemOfExpenseService = {
  GetAll(isGroup) {
    return ApiService.get(`/SportItemOfExpense/GetAll?isGroup=${isGroup}`);
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportItemOfExpense/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportItemOfExpense/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportItemOfExpense/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportItemOfExpense/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportItemOfExpense/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportItemOfExpense/CancelApproval?id=${id}`);
  },
};
export default SportItemOfExpenseService
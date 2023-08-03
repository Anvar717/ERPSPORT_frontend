import ApiService from "./api.service";

const PrivilegeReasonService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/PrivilegeReason/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/PrivilegeReason/Get?id=${id}`);
  },
  GetAll() {
    return ApiService.get(`/PrivilegeReason/GetAll`);
  },
  Update(data) {
    return ApiService.post("/PrivilegeReason/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PrivilegeReason/Delete?id=${id}`);
  },
};
export default PrivilegeReasonService;

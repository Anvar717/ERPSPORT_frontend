import ApiService from "./api.service";

const PlanPersonCountService = {
  GetList(oblastid, regionid, organizationid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/PlanPersonCount/GetList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/PlanPersonCount/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/PlanPersonCount/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/PlanPersonCount/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/PlanPersonCount/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/PlanPersonCount/CancelApproval?id=${id}`);
  },
};
export default PlanPersonCountService;

import ApiService from "./api.service";

const StudentExpulsionService = {
  GetList(
    schoolYearId,
    isGraduation,
    StartDate,
    EndDate,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/StudentExpulsion/GetList?schoolYearId=${schoolYearId}&isGraduation=${isGraduation}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id, isGraduation) {
    return ApiService.get(
      `/StudentExpulsion/Get?id=${id}&isGraduation=${isGraduation}`
    );
  },
  GetDetail(id) {
    return ApiService.get(`/StudentExpulsion/GetDetail?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/StudentExpulsion/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/StudentExpulsion/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/StudentExpulsion/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/StudentExpulsion/CancelApproval?id=${id}`);
  },
};
export default StudentExpulsionService;

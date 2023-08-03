import ApiService from "./api.service";

const AdmissionPrivilegeService = {
  GetList(schoolyearid, organizationtypeid, schooltypeid, organizationid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/AdmissionPrivilege/GetList?schoolyearid=${schoolyearid}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&organizationid=${organizationid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/AdmissionPrivilege/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/AdmissionPrivilege/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AdmissionPrivilege/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/AdmissionPrivilege/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/AdmissionPrivilege/CancelApproval?id=${id}`);
  },
};
export default AdmissionPrivilegeService;

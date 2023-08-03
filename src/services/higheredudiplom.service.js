import ApiService from "./api.service";

const HigherEduDiplomService = {
  GetList(
    oblastId,
    regionId,
    organizationId,
    personName,
    personPinfl,
    statusId,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/HigherEduDiplom/GetList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&personPinfl=${personPinfl}&statusId=${statusId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/HigherEduDiplom/Get?id=${id}`);
  },
  PrintList(
    oblastId,
    regionId,
    organizationId,
    personName,
    personPinfl,
    statusId,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.print(
      `/HigherEduDiplom/PrintList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&personPinfl=${personPinfl}&statusId=${statusId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetTotalByUniversity() {
    return ApiService.get(`/HigherEduDiplom/GetTotalByUniversity`);
  },
  GetTotalByUniversityFaculty() {
    return ApiService.get(`/HigherEduDiplom/GetTotalByUniversityFaculty`);
  },
  GetInstituts() {
    return ApiService.get(`/HigherEduDiplom/GetInstituts`);
  },
  GetAllFaculties() {
    return ApiService.get(`/HigherEduDiplom/GetAllFaculties`);
  },
  GetInstitutsFaculties(id) {
    return ApiService.get(`/HigherEduDiplom/GetInstitutsFaculties?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/HigherEduDiplom/Update", data);
  },
  Approve(data) {
    return ApiService.post(`/HigherEduDiplom/Approve`, data);
  },
  CancelApproval(data) {
    return ApiService.post(`/HigherEduDiplom/CancelApproval`, data);
  },
  Send(id, data) {
    return ApiService.post(`/HigherEduDiplom/Send?id=${id}`, data);
  },
  Delete(id) {
    return ApiService.delete(`/HigherEduDiplom/Delete?id=${id}`)
}
};
export default HigherEduDiplomService;

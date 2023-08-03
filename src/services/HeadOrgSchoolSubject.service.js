import ApiService from "./api.service";

const HeadOrgSchoolSubjectService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/HeadOrgSchoolSubject/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/HeadOrgSchoolSubject/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/HeadOrgSchoolSubject/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/HeadOrgSchoolSubject/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/HeadOrgSchoolSubject/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/HeadOrgSchoolSubject/CancelApproval?id=${id}`);
  },
};
export default HeadOrgSchoolSubjectService;

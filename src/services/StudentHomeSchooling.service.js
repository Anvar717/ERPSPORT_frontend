import ApiService from './api.service'

const StudentHomeSchoolingService = {
  GetList(
    studentschoolyearid,
    studentorgschoolgradeid,
    curriculumtypeid,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/StudentHomeSchooling/GetList?studentschoolyearid=${studentschoolyearid}&studentorgschoolgradeid=${studentorgschoolgradeid}&curriculumtypeid=${curriculumtypeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/StudentHomeSchooling/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/StudentHomeSchooling/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/StudentHomeSchooling/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/StudentHomeSchooling/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/StudentHomeSchooling/CancelApproval?id=${id}`);
  },
};
export default StudentHomeSchoolingService
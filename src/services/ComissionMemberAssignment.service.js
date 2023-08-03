import ApiService from "./api.service";

const ComissionMemberAssignmentService = {
  GetList(schoolYearId, higHerEduClassifierId,Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/ComissionMemberAssignment/GetList?schoolYearId=${schoolYearId}&higHerEduClassifierId=${higHerEduClassifierId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/ComissionMemberAssignment/Delete?id=${id}`);
  },
  Get(id) {
    return ApiService.get(`/ComissionMemberAssignment/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/ComissionMemberAssignment/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/ComissionMemberAssignment/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/ComissionMemberAssignment/CancelApproval?id=${id}`);
  },
  // Approve(data) {
  //   return ApiService.post("/ComissionMemberAssignment/Approve");
  // },
  // CancelApproval(data) {
  //   return ApiService.post("/ComissionMemberAssignment/CancelApproval", data);
  // },
};
export default ComissionMemberAssignmentService;

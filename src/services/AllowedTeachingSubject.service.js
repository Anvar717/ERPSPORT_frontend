import ApiService from "./api.service";

const AllowedTeachingSubjectService = {
  GetAll() {
    return ApiService.get(`/AllowedTeachingSubject/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/AllowedTeachingSubject/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/AllowedTeachingSubject/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AllowedTeachingSubject/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/AllowedTeachingSubject/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/AllowedTeachingSubject/CancelApproval?id=${id}`);
  },
  Delete(id) {
    return ApiService.delete(`/AllowedTeachingSubject/Delete?id=${id}`);
  },
};
export default AllowedTeachingSubjectService;

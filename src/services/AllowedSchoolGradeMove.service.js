import ApiService from "./api.service";

const AllowedSchoolGradeMoveService = {
  GetAll() {
    return ApiService.get(`/AllowedSchoolGradeMove/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/AllowedSchoolGradeMove/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/AllowedSchoolGradeMove/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AllowedSchoolGradeMove/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/AllowedSchoolGradeMove/Delete?id=${id}`);
  },
  Accept(id) {
    return ApiService.post(`/AllowedSchoolGradeMove/Accept?id=${id}`);
  },
  Cancel(id) {
    return ApiService.post(`/AllowedSchoolGradeMove/Cancel?id=${id}`);
  },
};
export default AllowedSchoolGradeMoveService;

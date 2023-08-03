import ApiService from './api.service'

const QualCategoryTrainingTypeService = {
  GetAll() {
    return ApiService.get(`/QualCategoryTrainingType/GetAll`);
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/QualCategoryTrainingType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/QualCategoryTrainingType/Get?id=${id}`);
  },
  GetAllQualCategoryTrainingTypeTable(id) {
    return ApiService.get(`/QualCategoryTrainingType/GetAllQualCategoryTrainingTypeTable?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/QualCategoryTrainingType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/QualCategoryTrainingType/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/QualCategoryTrainingType/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/QualCategoryTrainingType/CancelApproval?id=${id}`);
  },
};
export default QualCategoryTrainingTypeService
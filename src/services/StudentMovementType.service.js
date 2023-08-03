import ApiService from "./api.service";

const StudentMovementTypeService = {
  GetAll() {
    return ApiService.get(`/StudentMovementType/GetAll`);
  },
};
export default StudentMovementTypeService; 
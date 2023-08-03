import ApiService from "./api.service";

const AppealSatisfactionTypeService = {
  GetAll() {
    return ApiService.get(`/AppealSatisfactionType/GetAll`);
  },
};
export default AppealSatisfactionTypeService;

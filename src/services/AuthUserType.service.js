import ApiService from "./api.service";
const AuthUserTypeService = {
  GetAll() {
    return ApiService.get(`/AuthUserType/GetAll`);
  },
};
export default AuthUserTypeService;

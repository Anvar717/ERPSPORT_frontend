import ApiService from "./api.service";

const AccountService = {
  OneIdSignIn(data) {
    return ApiService.post(`/Account/OneIdSignIn`, data);
  },
  getUserInfo() {
    return ApiService.get("/Account/GetUserInfo");
  },
  GetAllUserRole() {
    return ApiService.get("/Account/GetAllUserRole");
  },
  getOrgUsers() {
    return ApiService.get("/Account/OrgUsers");
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/User/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  changePassword(data) {
    return ApiService.post(`/Account/ChangePassword`, data);
  },
  Get(id) {
    return ApiService.get(`/User/Get?id=${id}`);
  },
  GetUserInfo(roleId) {
    return ApiService.get(`/Account/GetUserInfo?roleId=${roleId}`);
  },
  GetUserListByOrg(organizationid) {
    return ApiService.get(`/Account/GetUserListByOrg?organizationid=${organizationid}`);
  },
  Update(data) {
    return ApiService.post("/User/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/Account/Delete?id=${id}`);
  },
  GetOrgUser(id) {
    return ApiService.get(`/Account/GetOrgUser?id=${id}`);
  },
  ChangeUserMobileNumberByAdmin(username, mobilenumber) {
    return ApiService.post(
      `/Account/ChangeUserMobileNumberByAdmin?username=${username}&mobilenumber=${mobilenumber}`
    );
  },
  setLanguage(data) {
    return ApiService.post(`/Account/SetUserLanguage`, data);
  },
  SignIn(data) {
    return ApiService.post(`/Account/SignIn`, data);
  },
  SignInTwoFactor(data) {
    return ApiService.post(`/Account/SignInTwoFactor`, data);
  },
  SendSmsCodeForSignIn(data) {
    return ApiService.post(`/Account/SendSmsCodeForSignIn`, data);
  },
  Logout() {
    return ApiService.get("/Account/Logout");
  },
  GetUserTrustedDevices() {
    return ApiService.get("/Account/GetUserTrustedDevices");
  },
  DeleteTrustedDevice(id) {
    return ApiService.delete(`/Account/DeleteTrustedDevice?id=${id}`);
  },
  RestorePassword(data) {
    return ApiService.post("/Account/RestorePassword", data);
  },
  RestorePasswordConfirm(data) {
    return ApiService.post("/Account/RestorePasswordConfirm", data);
  },
  ReSendSmsCode() {
    return ApiService.post("/Account/ReSendSmsCode");
  },
};
export default AccountService;

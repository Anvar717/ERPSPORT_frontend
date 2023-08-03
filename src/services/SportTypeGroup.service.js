import ApiService from './api.service'

const SportTypeGroupService = {
  GetAll(sporteventcategoryid) {
    return ApiService.get(`/SportTypeGroup/GetAll?sporteventcategoryid=${sporteventcategoryid}`);
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/SportTypeGroup/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeGroup/Get?id=${id}`);
  },
  ClearSportTypeGroup(id) {
    return ApiService.get(`/SportTypeGroup/ClearSportTypeGroup?id=${id}`)
  },
  FillSportTypeGroup(data) {
    return ApiService.post("/SportTypeGroup/FillSportTypeGroup", data);
  },
  Update(data) {
    return ApiService.post("/SportTypeGroup/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeGroup/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/SportTypeGroup/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportTypeGroup/CancelApproval?id=${id}`);
  },
};
export default SportTypeGroupService
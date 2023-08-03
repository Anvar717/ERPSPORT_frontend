import ApiService from "./api.service";

const ServicePocketService = {
  GetAll() {
    return ApiService.get(`/ServicePocket/GetAll`);
  },
  GetList(
    identitydocumentid,
    genderid,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/ServicePocket/GetList?identitydocumentid=${identitydocumentid}&genderid=${genderid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/ServicePocket/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/ServicePocket/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/ServicePocket/Delete?id=${id}`);
  },
};
export default ServicePocketService;

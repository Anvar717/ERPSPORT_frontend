import ApiService from "./api.service";

const CertForeignLangTypeService = {
  GetAll() {
    return ApiService.get(`/CertForeignLangType/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/CertForeignLangType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/CertForeignLangType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/CertForeignLangType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CertForeignLangType/Delete?id=${id}`);
  },
};
export default CertForeignLangTypeService;

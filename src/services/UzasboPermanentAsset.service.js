import ApiService from "./api.service";

const UzasboPermanentAssetService = {
  //   GetAll() {
  //     return ApiService.get(`/UzasboPermanentAsset/GetAll`);
  //   },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/UzasboPermanentAsset/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Import() {
    return ApiService.post(`/UzasboPermanentAsset/Import`);
  },

  //   Get(id) {
  //     return ApiService.get(`/UzasboPermanentAsset/Get?id=${id}`);
  //   },
  //   Update(data) {
  //     return ApiService.post("/UzasboPermanentAsset/Update", data);
  //   },
  //   Delete(id) {
  //     return ApiService.delete(`/UzasboPermanentAsset/Delete?id=${id}`);
  //   },
};
export default UzasboPermanentAssetService;

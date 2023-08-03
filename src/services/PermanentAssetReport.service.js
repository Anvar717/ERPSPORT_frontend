import ApiService from "./api.service";

const PermanentAssetReportService = {
  //   GetAll() {
  //     return ApiService.get(`/UzasboPermanentAsset/GetAll`);
  //   },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/PermanentAssetReport/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },

  PrintPermanentAssetReport(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/PermanentAssetReport/PrintPermanentAssetReport?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
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
export default PermanentAssetReportService;

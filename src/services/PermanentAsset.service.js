import ApiService from "./api.service";

const PermanentAssetService = {
  GetAll() {
    return ApiService.get(`/PermanentAsset/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/PermanentAsset/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/PermanentAsset/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/PermanentAsset/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PermanentAsset/Delete?id=${id}`);
  },
  GetPermanentAssetCard(inventoryNumber) {
    return ApiService.get(
      `/PermanentAsset/GetPermanentAssetCard?inventoryNumber=${inventoryNumber}`
    );
  },
};
export default PermanentAssetService;

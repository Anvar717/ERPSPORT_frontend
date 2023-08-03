import ApiService from "./api.service";

const AnthropometricIndicatorService = {
  GetAll() {
    return ApiService.get(`/AnthropometricIndicator/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/AnthropometricIndicator/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/AnthropometricIndicator/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/AnthropometricIndicator/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/AnthropometricIndicator/Delete?id=${id}`);
  },
};
export default AnthropometricIndicatorService;

import ApiService from "./api.service";

const SportTypeDivisionService = {
  GetAll() {
    return ApiService.get(`/SportTypeDivision/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTypeDivision/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeDivision/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTypeDivision/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeDivision/Delete?id=${id}`);
  },
};
export default SportTypeDivisionService;

import ApiService from "./api.service";

const SportTypeGenderService = {
  GetAll() {
    return ApiService.get(`/SportTypeGender/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportTypeGender/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportTypeGender/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTypeGender/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTypeGender/Delete?id=${id}`);
  },
};
export default SportTypeGenderService;

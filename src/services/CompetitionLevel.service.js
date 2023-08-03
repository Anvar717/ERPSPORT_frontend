import ApiService from "./api.service";

const CompetitionLevelService = {
  GetAll() {
    return ApiService.get(`/CompetitionLevel/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/CompetitionLevel/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/CompetitionLevel/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/CompetitionLevel/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CompetitionLevel/Delete?id=${id}`);
  },
};
export default CompetitionLevelService;
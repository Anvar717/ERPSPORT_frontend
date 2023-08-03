import ApiService from "./api.service";

const CompetitionTypeService = {
  GetAll(sporteventtypeid,lang) {
    return ApiService.get(`/CompetitionType/GetAll?sporteventtypeid=${sporteventtypeid}&lang=${lang}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/CompetitionType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/CompetitionType/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/CompetitionType/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/CompetitionType/Delete?id=${id}`);
  },
};
export default CompetitionTypeService;
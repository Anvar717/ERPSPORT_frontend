import ApiService from "./api.service";

const SportEventService = {
  GetAll(sporteventcategoryid,sporteventtypeid,competitiontypeid,lang) {
    return ApiService.get(`/SportEvent/GetAll?sporteventcategoryid=${sporteventcategoryid}&sporteventtypeid=${sporteventtypeid}&competitiontypeid=${competitiontypeid}&lang=${lang}`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEvent/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportEvent/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportEvent/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportEvent/Delete?id=${id}`);
  },
};
export default SportEventService;
import ApiService from "./api.service";

const PositionService = {
  GetAll(
    DepartmentID,
    tariffscaletypeid,
    isByOrganization,
    staffTypeBasicTariffId
  ) {
    return ApiService.get(
      `/Position/GetAll?DepartmentID=${DepartmentID}&tariffscaletypeid=${tariffscaletypeid}&isByOrganization=${isByOrganization}&staffTypeBasicTariffId=${staffTypeBasicTariffId}`
    );
  },
  GetAll1() {
    return ApiService.get(`/Position/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, persontypeid) {
    return ApiService.get(
      `/Position/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&persontypeid=${persontypeid}`
    );
  },
  Get(id) {
    return ApiService.get(`/Position/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/Position/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/Position/Delete?id=${id}`);
  },
};
export default PositionService;

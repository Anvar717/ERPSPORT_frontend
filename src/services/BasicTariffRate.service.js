import ApiService from "./api.service";

const BasicTariffRateService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/BasicTariffRate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id, isClone) {
    return ApiService.get(`/BasicTariffRate/Get?id=${id}&isClone=${isClone}`);
  },
  GetBasicTariffRateIsPosition(
    qualificationcategoryid,
    ondate,
    positionid,
    schoolgroupcontingentid
  ) {
    return ApiService.get(
      `/BasicTariffRate/GetBasicTariffRateIsPosition?qualificationcategoryid=${qualificationcategoryid}&ondate=${ondate}&positionid=${positionid}&schoolgroupcontingentid=${schoolgroupcontingentid}`
    );
  },
  Update(data) {
    return ApiService.post("/BasicTariffRate/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/BasicTariffRate/Delete?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/BasicTariffRate/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/BasicTariffRate/CancelApproval?id=${id}`);
  },
};
export default BasicTariffRateService;

import ApiService from "./api.service";

const AnthropometricService = {
  GetList(statusid, sportgroupid, sportsmename, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/Anthropometric/GetList?statusid=${statusid}&sportgroupid=${sportgroupid}&sportsmename=${sportsmename}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetAnthropomentricReportBySportsmen(oblastid, regionid, organizationid, sporttypeclassifierid, sportgroupid, existsanthropometric,  Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/Anthropometric/GetAnthropomentricReportBySportsmen?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sporttypeclassifierid=${sporttypeclassifierid}&sportgroupid=${sportgroupid}&existsanthropometric=${existsanthropometric}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  PrintEnteredIndicatorsStudentCount(oblastid, regionid, schoolYearId) {
    return ApiService.print(
      `/Anthropometric/PrintEnteredIndicatorsStudentCount?oblastid=${oblastid}&regionid=${regionid}&schoolYearId=${schoolYearId}`
    );
  },
  PrintAnthropometricList(statusid, sportgroupid) {
    return ApiService.print(`/Anthropometric/PrintAnthropometricList?statusid=${statusid}&sportgroupid=${sportgroupid}`)
  },
  PrintAnthropomentricReportBySportsmen(oblastid, regionid, organizationid, sportgroupid, sporttypeclassifierid, existsanthropometric) {
    return ApiService.print(
      `/Anthropometric/PrintAnthropomentricReportBySportsmen?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sportgroupid=${sportgroupid}&sporttypeclassifierid=${sporttypeclassifierid}&existsanthropometric=${existsanthropometric}`
    );
  },
  Get(id) {
    return ApiService.get(`/Anthropometric/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/Anthropometric/Update", data);
  },
  Approve(id) {
    return ApiService.post(`/Anthropometric/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/Anthropometric/CancelApproval?id=${id}`);
  },
  Delete(id) {
    return ApiService.delete(`/Anthropometric/Delete?id=${id}`);
  },
};
export default AnthropometricService;

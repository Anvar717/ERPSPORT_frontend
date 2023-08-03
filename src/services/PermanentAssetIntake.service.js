import ApiService from "./api.service";

const PermanentAssetIntakeService = {
  GetList(data) {
    return ApiService.get(
      `/PermanentAssetIntake/GetList?startDate=${data.startDate}&endDate=${data.endDate}&departmentid=${data.departmentid}&roomid=${data.roomid}&responsiblepersonid=${data.responsiblepersonid}&sourceoffinanceid=${data.sourceoffinanceid || 0}&supplierid=${data.supplierid}&organizationId=${data.organizationId}&Search=${data.Search}&Lang=${data.Lang}&SortColumn=${data.SortColumn}&OrderType=${data.OrderType}&Offset=${data.Offset}&PageNumber=${data.PageNumber}&PageLimit=${data.PageLimit}&IsStartPageFromZero=${data.IsStartPageFromZero}`
    );
  },
  // GetList(startDate,endDate,departmentid,roomid,responsiblepersonid,sourceoffinanceid,supplierid,organizationId,Search,Lang,SortColumn,OrderType,Offset,PageNumber,PageLimit,IsStartPageFromZero) {
  //   return ApiService.get(
  //     `/PermanentAssetIntake/GetList?startDate=${startDate}&endDate=${endDate}
  //     &departmentid=${departmentid}&roomid=${roomid}&responsiblepersonid=${responsiblepersonid}&sourceoffinanceid=${sourceoffinanceid}
  //     &supplierid=${supplierid}&organizationId=${organizationId}&Search=${Search}&Lang=${Lang}&SortColumn=${SortColumn}&OrderType=${OrderType}
  //     &Offset=${Offset}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&IsStartPageFromZero=${IsStartPageFromZero}
  //     `
  //   );
  // },
  Get(id) {
    return ApiService.get(`/PermanentAssetIntake/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/PermanentAssetIntake/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/PermanentAssetIntake/Delete?id=${id}`);
  },
  Approve(id, data) {
    return ApiService.post(`/PermanentAssetIntake/Approve?id=${id}`, data);
  },
  CancelApproval(id, data) {
    return ApiService.post(
      `/PermanentAssetIntake/CancelApproval?id=${id}`,
      data
    );
  },
};
export default PermanentAssetIntakeService;

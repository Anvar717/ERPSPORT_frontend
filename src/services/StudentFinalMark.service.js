import ApiService from "./api.service";

const StudentFinalMarkService = {
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, StatusIds, oblastid, regionid, organizationid, hasstudentfinalmark) {
    var statusIds = ''
      for(let i=0; i < StatusIds.length; i++){
        statusIds += `StatusIds=${StatusIds[i]}&`
      }
    return ApiService.get(
      `/eduprocess/StudentFinalMark/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&${statusIds}oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&hasstudentfinalmark=${hasstudentfinalmark}`
    );
  },
  Get(id) {
    return ApiService.get(`/eduprocess/StudentFinalMark/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/eduprocess/StudentFinalMark/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/eduprocess/StudentFinalMark/Delete?id=${id}`);
  },
  Approve(id, data) {
    return ApiService.post(`/eduprocess/StudentFinalMark/Approve?id=${id}`, data);
  },
  CancelApproval(id, data) {
    return ApiService.post(`/eduprocess/StudentFinalMark/CancelApproval?id=${id}`, data);
  },
};
export default StudentFinalMarkService;

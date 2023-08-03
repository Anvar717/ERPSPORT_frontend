import ApiService from "./api.service";

const TeacherReTrainingService = {
  GetList(
    startdate,
    enddate,
    oblastid,
    regionid,
    organizationid,
    statusid,
    schoolsubjectid,
    documentseries,
    documentnumber,
    personname,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/TeacherReTraining/GetList?startdate=${startdate}&enddate=${enddate}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&statusid=${statusid}&schoolsubjectid=${schoolsubjectid}&documentseries=${documentseries}&documentnumber=${documentnumber}&personname=${personname}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetSentList(
    startdate,
    enddate,
    oblastid,
    regionid,
    organizationid,
    statusid,
    schoolsubjectid,
    documentseries,
    documentnumber,
    personname,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/TeacherReTraining/GetSentList?startdate=${startdate}&enddate=${enddate}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&statusid=${statusid}&schoolsubjectid=${schoolsubjectid}&documentseries=${documentseries}&documentnumber=${documentnumber}&personname=${personname}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/TeacherReTraining/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/TeacherReTraining/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/TeacherReTraining/Delete?id=${id}`);
  },
  Send(id) {
    return ApiService.post(`/TeacherReTraining/Send?id=${id}`);
  },
  Accept(id) {
    return ApiService.post(`/TeacherReTraining/Accept?id=${id}`);
  },
  Reject(id, reason) {
    return ApiService.post(
      `/TeacherReTraining/Reject?id=${id}&reason=${reason}`
    );
  },
  Approve(id) {
    return ApiService.post(`/TeacherReTraining/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/TeacherReTraining/CancelApproval?id=${id}`);
  },
  GetTeacherReTrainingprotocol(id) {
    return ApiService.post(
      `/TeacherReTraining/GetTeacherReTrainingprotocol?id=${id}`
    );
  },
  PrintList(
    startdate,
    enddate,
    oblastid,
    regionid,
    organizationid,
    statusid,
    schoolsubjectid,
    documentseries,
    documentnumber,
    personname,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.print(
      `/TeacherReTraining/PrintList?startdate=${startdate}&enddate=${enddate}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&statusid=${statusid}&schoolsubjectid=${schoolsubjectid}&documentseries=${documentseries}&documentnumber=${documentnumber}&personname=${personname}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
};
export default TeacherReTrainingService;

import ApiService from "./api.service";

const CurriculumService = {
  GetList(
    schoolYearId,
    curriculumTypeId,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit
  ) {
    return ApiService.get(
      `/Curriculum/GetList?schoolYearId=${schoolYearId}&curriculumTypeId=${curriculumTypeId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id, isclone) {
    return ApiService.get(`/Curriculum/Get?id=${id}&isclone=${isclone}`);
  },
  Update(data) {
    return ApiService.post("/Curriculum/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/Curriculum/Delete?id=${id}`);
  },
  GetDetail(id) {
    return ApiService.get(`/Curriculum/GetDetail?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/Curriculum/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/Curriculum/CancelApproval?id=${id}`);
  },
  Print(id) {
    return ApiService.print(`/Curriculum/Print?id=${id}`);
  },
};
export default CurriculumService;

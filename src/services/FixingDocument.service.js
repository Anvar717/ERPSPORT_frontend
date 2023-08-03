import ApiService from "./api.service";

const FixingDocumentService = {
  GetAll(lang) {
    return ApiService.get(
      `/FixingDocument/GetAll?lang=${lang}}`
    );
  },
  GetList(oblastid, regionid, organizationid, fixingdocumenttypeid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/FixingDocument/GetList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&fixingdocumenttypeid=${fixingdocumenttypeid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/FixingDocument/Get?id=${id}`);
  },
  Approve(id) {
    return ApiService.post(`/FixingDocument/Approve?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/FixingDocument/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/FixingDocument/Delete?id=${id}`);
  },
};
export default FixingDocumentService;

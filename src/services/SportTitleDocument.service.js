import ApiService from "./api.service";

const SportTitleDocumentService = {
  GetAll(lang) {
    return ApiService.get(
      `/SportTitleDocument/GetAll?lang=${lang}}`
    );
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, sporttitleid, organizationId, oblastId, regionId, sporttypeclassifierid, statusid, isduplicate, hassportgroup) {
    return ApiService.get(
      `/SportTitleDocument/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&sporttitleid=${sporttitleid}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&sporttypeclassifierid=${sporttypeclassifierid}&statusid=${statusid}&isduplicate=${isduplicate}&hassportgroup=${hassportgroup}`
    );
  },
  GetSportTitleByPerson(personid, sporttypeclassifierid) {
    return ApiService.get(`/SportTitleDocument/GetSportTitleByPerson?personid=${personid}&sporttypeclassifierid=${sporttypeclassifierid}`);
  },
  Get(id) {
    return ApiService.get(`/SportTitleDocument/Get?id=${id}`);
  },
  SportTitleDocumentPrintList(Search, SortColumn, OrderType, PageNumber, PageLimit, sporttitleid, organizationId, oblastId, regionId, sporttypeclassifierid, statusid,isduplicate, hassportgroup) {
    return ApiService.print(`/SportTitleDocument/SportTitleDocumentPrintList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&sporttitleid=${sporttitleid}&organizationId=${organizationId}&oblastId=${oblastId}&regionId=${regionId}&sporttypeclassifierid=${sporttypeclassifierid}&statusid=${statusid}&isduplicate=${isduplicate}&hassportgroup=${hassportgroup}`)
  },
  Approve(id) {
    return ApiService.post(`/SportTitleDocument/Approve?id=${id}`);
  },
  CancelApproval(id) {
    return ApiService.post(`/SportTitleDocument/CancelApproval?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportTitleDocument/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportTitleDocument/Delete?id=${id}`);
  },
};
export default SportTitleDocumentService;

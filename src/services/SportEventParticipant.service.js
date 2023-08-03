import ApiService from "./api.service";

const SportEventParticipantService = {
  GetAll() {
    return ApiService.get(`/SportEventParticipant/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportEventParticipant/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportEventParticipant/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportEventParticipant/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportEventParticipant/Delete?id=${id}`);
  },
};
export default SportEventParticipantService;

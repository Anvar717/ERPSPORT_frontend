import ApiService from "./api.service";

const SportBranchService = {
  GetAll() {
    return ApiService.get(`/SportBranch/GetAll`);
  },
  GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportBranch/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  Get(id) {
    return ApiService.get(`/SportBranch/Get?id=${id}`);
  },
  Update(data) {
    return ApiService.post("/SportBranch/Update", data);
  },
  Delete(id) {
    return ApiService.delete(`/SportBranch/Delete?id=${id}`);
  },
};
export default SportBranchService;

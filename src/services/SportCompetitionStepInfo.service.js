import ApiService from "./api.service";

const SportCompetitionStepInfoService = {
    GetAll() {
        return ApiService.get(
            `/SportCompetitionStepInfo/GetAll`
        );
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(
            `/SportCompetitionStepInfo/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
        );
    },
    Get(id) {
        return ApiService.get(`/SportCompetitionStepInfo/Get?id=${id}`);
    },
    Update(data) {
        return ApiService.post("/SportCompetitionStepInfo/Update", data);
    },
    Delete(id) {
        return ApiService.delete(`/SportCompetitionStepInfo/Delete?id=${id}`);
    },
};
export default SportCompetitionStepInfoService;
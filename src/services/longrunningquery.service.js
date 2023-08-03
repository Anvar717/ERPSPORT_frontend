import ApiService from './api.service'

const LongRunningQueryService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/LongRunningQuery/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)  
    },
    Get(id){
        return ApiService.get(`/LongRunningQuery/Get?id=${id}`)
    },
};
export default LongRunningQueryService;
    
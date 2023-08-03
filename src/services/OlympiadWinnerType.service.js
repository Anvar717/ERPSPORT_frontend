
import ApiService from './api.service'

const OlympiadWinnerTypeService = {
    GetAll(lang,RegionId){
        return ApiService.get(`/OlympiadWinnerType/GetAll?RegionId=${RegionId}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/OlympiadWinnerType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/OlympiadWinnerType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/OlympiadWinnerType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/OlympiadWinnerType/Delete?id=${id}`)
    }
}
export default OlympiadWinnerTypeService
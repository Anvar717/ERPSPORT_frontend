import ApiService from './api.service'

const OblastService = {
    GetAll(lang, CountryId, ClearCache) {
        if (CountryId === 0 || CountryId == null || CountryId === undefined) {
            CountryId = 211;
        }
        return ApiService.get(`/Oblast/GetAll?lang=${lang}&CountryId=${CountryId}&ClearCache=${ClearCache}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Oblast/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Oblast/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Oblast/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Oblast/Delete?id=${id}`)
    }
}
export default OblastService
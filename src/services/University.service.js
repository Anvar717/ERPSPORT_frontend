import ApiService from './api.service'

const UniversityService = {
    GetAll(countryId,oblastId,lang){
        return ApiService.get(`/University/GetAll?countryId=${countryId}&oblastId=${oblastId}&lang=${lang}`)
    }, 
    GetList(countryId,oblastId,Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/University/GetList?countryId=${countryId}&oblastId=${oblastId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/University/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/University/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/University/Delete?id=${id}`)
    }
}
export default UniversityService
import ApiService from './api.service'

const HolidayService = {
    GetAll(lang){
        return ApiService.get(`/Holiday/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Holiday/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Holiday/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Holiday/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Holiday/Delete?id=${id}`)
    }
}
export default HolidayService
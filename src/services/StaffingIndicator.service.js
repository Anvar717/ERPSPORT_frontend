import ApiService from './api.service'

const StaffingIndicatorService = {
    GetAll(){
        return ApiService.get(`/StaffingIndicator/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StaffingIndicator/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/StaffingIndicator/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/StaffingIndicator/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StaffingIndicator/Delete?id=${id}`)
    }
}
export default StaffingIndicatorService
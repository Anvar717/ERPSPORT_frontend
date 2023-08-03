import ApiService from './api.service'

const SchoolingShiftService = {
    GetAll(){
        return ApiService.get(`/SchoolingShift/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolingShift/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolingShift/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolingShift/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolingShift/Delete?id=${id}`)
    }
}
export default SchoolingShiftService
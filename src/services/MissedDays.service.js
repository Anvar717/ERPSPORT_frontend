import ApiService from './api.service'

const MissedDaysService = {
    GetAll(){
        return ApiService.get(`/MissedDays/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/MissedDays/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/MissedDays/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/MissedDays/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/MissedDays/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/MissedDays/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/MissedDays/CancelApproval?id=${id}`)
    },
}
export default MissedDaysService
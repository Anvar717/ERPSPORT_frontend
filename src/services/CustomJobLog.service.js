import ApiService from './api.service'

const CustomJobLogService = {
    GetAll(lang){
        return ApiService.get(`/CustomJobLog/GetAll`)
    },
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/CustomJobLog/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/CustomJobLog/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/CustomJobLog/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/CustomJobLog/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/CustomJobLog/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/CustomJobLog/CancelApproval?id=${id}`)
    },
    GetErrorLogList(id, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/CustomJobLog/GetErrorLogList?id=${id}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    }
}
export default CustomJobLogService
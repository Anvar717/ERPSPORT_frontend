import ApiService from './api.service'

const StaffingTemplateService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/StaffingTemplate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/StaffingTemplate/Get?id=${id}`)
    },
    
    Update(data) {
        return ApiService.post('/StaffingTemplate/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/StaffingTemplate/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/StaffingTemplate/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/StaffingTemplate/CancelApproval?id=${id}`)
    }
}
export default StaffingTemplateService
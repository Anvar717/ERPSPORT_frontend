import ApiService from './api.service'

const CalcLeavePayService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit,calculationkindid) {
        return ApiService.get(`/CalcLeavePay/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&calculationkindid=${calculationkindid}`)
    },
    Get(id) {
        return ApiService.get(`/CalcLeavePay/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/CalcLeavePay/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/CalcLeavePay/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/CalcLeavePay/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/CalcLeavePay/CancelApproval?id=${id}`)
    },
    
    RecalcCalcLeavePay(data) {
        return ApiService.post('/CalcLeavePay/RecalcCalcLeavePay', data)
    },
}
export default CalcLeavePayService
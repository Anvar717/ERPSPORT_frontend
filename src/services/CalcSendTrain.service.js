import ApiService from './api.service'

const CalcSendTrainService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/CalcSendTrain/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/CalcSendTrain/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/CalcSendTrain/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/CalcSendTrain/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/CalcSendTrain/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/CalcSendTrain/CancelApproval?id=${id}`, data)
    },
}
export default CalcSendTrainService
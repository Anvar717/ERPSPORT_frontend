import ApiService from './api.service'

const OlympiadWinnerService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/OlympiadWinner/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/OlympiadWinner/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/OlympiadWinner/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OlympiadWinner/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/OlympiadWinner/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/OlympiadWinner/CancelApproval?id=${id}`)
    },
}
export default OlympiadWinnerService
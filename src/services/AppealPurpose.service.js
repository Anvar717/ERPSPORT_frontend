import ApiService from './api.service'

const AppealPurposeService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AppealPurpose/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/AppealPurpose/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AppealPurpose/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/AppealPurpose/Delete?id=${id}`)
    },
    GetAll() {
        return ApiService.get('/AppealPurpose/GetAll')
    }
}
export default AppealPurposeService
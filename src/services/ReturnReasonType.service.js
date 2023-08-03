import ApiService from './api.service'

const ReturnReasonTypeService = {
    GetAll(lang) {
        return ApiService.get(`/ReturnReasonType/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/ReturnReasonType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/ReturnReasonType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/ReturnReasonType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ReturnReasonType/Delete?id=${id}`)
    }
}
export default ReturnReasonTypeService
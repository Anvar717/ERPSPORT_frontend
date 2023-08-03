import ApiService from './api.service'

const BlockDocumentActionService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/BlockDocumentAction/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/BlockDocumentAction/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/BlockDocumentAction/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/BlockDocumentAction/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/BlockDocumentAction/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/BlockDocumentAction/CancelApproval?id=${id}`)
    },
}
export default BlockDocumentActionService
import ApiService from './api.service'

const IHMovementService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/IHMovement/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/IHMovement/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/IHMovement/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/IHMovement/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/IHMovement/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/IHMovement/CancelApproval?id=${id}`)
    }
}
export default IHMovementService
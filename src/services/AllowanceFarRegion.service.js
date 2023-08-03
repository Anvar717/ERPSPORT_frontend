import ApiService from './api.service'

const AllowanceFarRegionService = {
    GetList(Search, order, offset, limit) {
        return ApiService.get(`/AllowanceFarRegion/GetList?Search=${Search}&order=${order}&offset=${offset}&limit=${limit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AllowanceFarRegion/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AllowanceFarRegion/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AllowanceFarRegion/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AllowanceFarRegion/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AllowanceFarRegion/CancelApproval?id=${id}`, data)
    },
}
export default AllowanceFarRegionService
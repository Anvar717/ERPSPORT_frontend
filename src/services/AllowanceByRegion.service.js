import ApiService from './api.service'

const AllowanceByRegionService = {
    GetList(Search, order, offset, limit) {
        return ApiService.get(`/AllowanceByRegion/GetList?Search=${Search}&order=${order}&offset=${offset}&limit=${limit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AllowanceByRegion/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AllowanceByRegion/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AllowanceByRegion/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AllowanceByRegion/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AllowanceByRegion/CancelApproval?id=${id}`, data)
    },
}
export default AllowanceByRegionService
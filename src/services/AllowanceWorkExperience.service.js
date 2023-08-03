import ApiService from './api.service'

const AllowanceWorkExperienceService = {
    GetList(Search, order, offset, limit) {
        return ApiService.get(`/AllowanceWorkExperience/GetList?Search=${Search}&order=${order}&offset=${offset}&limit=${limit}`)
    },
    Delete(id) {
        return ApiService.delete(`/AllowanceWorkExperience/Delete?id=${id}`)
    },
    Get(id) {
        return ApiService.get(`/AllowanceWorkExperience/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/AllowanceWorkExperience/Update', data)
    },
    Approve(id, data) {
        return ApiService.post(`/AllowanceWorkExperience/Approve?id=${id}`, data)
    },
    CancelApproval(id, data) {
        return ApiService.post(`/AllowanceWorkExperience/CancelApproval?id=${id}`, data)
    },
}
export default AllowanceWorkExperienceService
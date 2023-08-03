import ApiService from './api.service'

const ComissionMemberTypeService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/ComissionMemberType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/ComissionMemberType/Get?id=${id}`)
    },
    GetAll() {
        return ApiService.get(`/ComissionMemberType/GetAll`)
    },
    Update(data) {
        return ApiService.post('/ComissionMemberType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ComissionMemberType/Delete?id=${id}`)
    }
}
export default ComissionMemberTypeService
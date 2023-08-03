import ApiService from './api.service'

const RoleService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Role/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetAll(isadmin){
        return ApiService.get(`/Role/GetAll?isadmin=${isadmin}`)
    },
    Get(id){
        return ApiService.get(`/Role/Get?id=${id}`)
    },
    Delete(id){
        return ApiService.delete(`/Role/Delete?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Role/Update',data)
    }
}
export default RoleService
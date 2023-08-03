import ApiService from './api.service'

const SchoolTypeService = {
    GetAll(){
        return ApiService.get(`/SchoolType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolType/Delete?id=${id}`)
    }
}
export default SchoolTypeService
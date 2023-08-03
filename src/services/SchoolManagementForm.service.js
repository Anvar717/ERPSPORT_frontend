import ApiService from './api.service'

const SchoolManagementFormService = {
    GetAll(){
        return ApiService.get(`/SchoolManagementForm/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolManagementForm/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolManagementForm/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolManagementForm/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolManagementForm/Delete?id=${id}`)
    }
}
export default SchoolManagementFormService
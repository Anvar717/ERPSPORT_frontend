import ApiService from './api.service'

const SchoolLegalFormService = {
    GetAll(){
        return ApiService.get(`/SchoolLegalForm/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolLegalForm/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolLegalForm/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolLegalForm/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolLegalForm/Delete?id=${id}`)
    }
}
export default SchoolLegalFormService
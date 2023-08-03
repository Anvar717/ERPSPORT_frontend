import ApiService from './api.service'

const SchoolYearService = {
    GetAll(){
        return ApiService.get(`/SchoolYear/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolYear/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolYear/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolYear/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolYear/Delete?id=${id}`)
    },
    IsSchoolReadyForActiveSchoolYear() {
        return ApiService.get(`/SchoolYear/IsSchoolReadyForActiveSchoolYear`)
    },
    GetDefault() {
        return ApiService.get(`/SchoolYear/GetDefault`)
    }
}
export default SchoolYearService
import ApiService from './api.service'

const SchoolGroupContingentService = {
    GetAll(){
        return ApiService.get(`/SchoolGroupContingent/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolGroupContingent/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolGroupContingent/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolGroupContingent/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolGroupContingent/Delete?id=${id}`)
    }
}
export default SchoolGroupContingentService
import ApiService from './api.service'

const SportFacilityTypeService = {
    GetAll(organizationid){
        return ApiService.get(`/SportFacilityType/GetAll?organizationid=${organizationid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SportFacilityType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SportFacilityType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SportFacilityType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SportFacilityType/Delete?id=${id}`)
    }
}
export default SportFacilityTypeService
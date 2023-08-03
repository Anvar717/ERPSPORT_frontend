
import ApiService from './api.service'

const SchoolHolidayTypeService = {
    GetAll(RegionId){
        return ApiService.get(`/SchoolHolidayType/GetAll?RegionId=${RegionId}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/SchoolHolidayType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/SchoolHolidayType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/SchoolHolidayType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/SchoolHolidayType/Delete?id=${id}`)
    }
}
export default SchoolHolidayTypeService
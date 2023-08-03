import ApiService from './api.service'

const WorkScheduleService = {
    GetAll(){
        return ApiService.get(`/WorkSchedule/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/WorkSchedule/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/WorkSchedule/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/WorkSchedule/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/WorkSchedule/Delete?id=${id}`)
    }
}
export default WorkScheduleService
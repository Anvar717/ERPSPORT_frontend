import ApiService from './api.service'

const RoomService = {
    GetAll(lang){
        return ApiService.get(`/Room/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Room/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Room/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Room/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Room/Delete?id=${id}`)
    }
}
export default RoomService
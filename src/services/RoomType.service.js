import ApiService from './api.service'

const RoomTypeService = {
    GetAll(lang){
        return ApiService.get(`/RoomType/GetAll`)
    }, 
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/RoomType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/RoomType/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/RoomType/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/RoomType/Delete?id=${id}`)
    }
}
export default RoomTypeService
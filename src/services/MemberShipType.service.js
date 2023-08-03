import ApiService from './api.service'

const MemberShipTypeService = {
    GetAll(){
        return ApiService.get(`/MemberShipType/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/MemberShipType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/MemberShipType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/MemberShipType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/MemberShipType/Delete?id=${id}`)
    }
}
export default MemberShipTypeService
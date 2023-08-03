import ApiService from './api.service'

const PriceListService = {
    GetAll(){
        return ApiService.get(`/PriceList/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/PriceList/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetPriceListForMemberShip(servicepocketid, sporttypeclassifierid, membershiptypeid){
        return ApiService.get(`/PriceList/GetPriceListForMemberShip?servicepocketid=${servicepocketid}&sporttypeclassifierid=${sporttypeclassifierid}&membershiptypeid=${membershiptypeid}`)
    },
    Get(id){
        return ApiService.get(`/PriceList/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/PriceList/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/PriceList/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/PriceList/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/PriceList/CancelApproval?id=${id}`)
    },
}
export default PriceListService
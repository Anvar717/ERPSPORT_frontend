import ApiService from './api.service'

const PaymentService = {
    GetAll(){
        return ApiService.get(`/Payment/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Payment/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Payment/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/Payment/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/Payment/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/Payment/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/Payment/CancelApproval?id=${id}`)
    },
}
export default PaymentService
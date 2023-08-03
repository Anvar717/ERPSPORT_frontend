import ApiService from './api.service'

const HREmpLeaveOrderService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/HREmpLeaveOrder/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/HREmpLeaveOrder/Delete?id=${id}`)
    },
    GetAll(personid) {
        return ApiService.get(`/HREmpLeaveOrder/GetAll?personid=${personid}`)  
    },
    Get(id) {
        return ApiService.get(`/HREmpLeaveOrder/Get?id=${id}`)
    },
    GetCountWorkDays(StartData,EndData) {
        return ApiService.get(`/HREmpLeaveOrder/GetCountWorkDays?StartData=${StartData}&EndData=${EndData}`)
    },
    Update(data) {
        return ApiService.post('/HREmpLeaveOrder/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/HREmpLeaveOrder/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/HREmpLeaveOrder/CancelApproval?id=${id}`)
    },
    GetUnpaidHREmpleaveOrderList(Search, SortColumn, OrderType, PageNumber, PageLimit, StartDate, EndDate) {
        return ApiService.get(`/HREmpLeaveOrder/GetUnpaidHREmpleaveOrderList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&StartDate=${StartDate}&EndDate=${EndDate}`)
    },
}
export default HREmpLeaveOrderService
import ApiService from './api.service'

const StaffingService = {
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/Staffing/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/Staffing/Get?id=${id}`)
    },
    GetStaffingPosition(staffingpositionid,employmentrate) {
        return ApiService.get(`/Staffing/GetStaffingPosition?staffingpositionid=${staffingpositionid}&employmentrate=${employmentrate}`)
    },
    GetAllStaffingPosition(date, positionid) {
        return ApiService.get(`/Staffing/GetAllStaffingPosition?date=${date}&positionid=${positionid}`)
    },
    RecalcStaffingCalcKindTables(data){
        return ApiService.post('/Staffing/RecalcStaffingCalcKindTables',data)
    },
    Update(data) {
        return ApiService.post('/Staffing/Update',data)
    },
    FillStaffingTableWithTemplote(data) {
        return ApiService.post('/Staffing/FillStaffingTableWithTemplote',data)
    },
    Delete(id){
        return ApiService.delete(`/Staffing/Delete?id=${id}`)
    },
    Approve(id){
        return ApiService.post(`/Staffing/Approve?id=${id}`)
    },
    CancelApproval(id){
        return ApiService.post(`/Staffing/CancelApproval?id=${id}`)
    }
}
export default StaffingService
import ApiService from './api.service'

const TarifficationService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/Tariffication/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/Tariffication/Get?id=${id}`)
    },
    FillTarifficationTable(schoolyearid,docdate) {
        return ApiService.get(`/Tariffication/FillTarifficationTable?schoolyearid=${schoolyearid}&docdate=${docdate}`)
    },
    Update(data) {
        return ApiService.post('/Tariffication/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/Tariffication/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/Tariffication/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/Tariffication/CancelApproval?id=${id}`)
    },
    Print(id) {
        return ApiService.print(`/Tariffication/Print?id=${id}`)
    }
}
export default TarifficationService
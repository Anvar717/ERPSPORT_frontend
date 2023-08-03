import ApiService from './api.service'

const TarifficationTitleService = {
    GetList(schoolyearid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TarifficationTitle/GetList?schoolyearid=${schoolyearid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetTarifficationTitleForControlList(schoolYearId,statusid,Search,SortColumn,OrderType,PageNumber,PageLimit) {
        return ApiService.get(`/TarifficationTitle/GetTarifficationTitleForControlList?schoolYearId=${schoolYearId}&statusid=${statusid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/TarifficationTitle/Get?id=${id}`)
    },
    GetDetail(id) {
        return ApiService.get(`/TarifficationTitle/GetDetail?id=${id}`)
    },
    GenerateTarifficationTitleTable(schoolyearid) {
        return ApiService.get(`/TarifficationTitle/GenerateTarifficationTitleTable?schoolyearid=${schoolyearid}`)
    },
    Update(data) {
        return ApiService.post('/TarifficationTitle/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/TarifficationTitle/Delete?id=${id}`)
    },
    Approve(id) {
        return ApiService.post(`/TarifficationTitle/Approve?id=${id}`)
    },
    Accept(id) {
        return ApiService.post(`/TarifficationTitle/Accept?id=${id}`)
    },
    Receive(id) {
        return ApiService.post(`/TarifficationTitle/Recieve?id=${id}`)
    },
    Reject(id, description) {
        return ApiService.post(`/TarifficationTitle/Reject?id=${id}&description=${description}`)
    },
    Send(id) {
        return ApiService.post(`/TarifficationTitle/Send?id=${id}`)
    },
    Delivere(id) {
        return ApiService.post(`/TarifficationTitle/Delivere?id=${id}`)
    },
    Print(id) {
        return ApiService.print(`/TarifficationTitle/Print?id=${id}`)
    }
}
export default TarifficationTitleService
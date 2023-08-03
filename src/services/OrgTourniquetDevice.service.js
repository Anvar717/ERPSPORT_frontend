import ApiService from './api.service'

const OrgTourniquetDeviceService = {
    GetAll(lang) {
        return ApiService.get(`/OrgTourniquetDevice/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/OrgTourniquetDevice/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/OrgTourniquetDevice/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/OrgTourniquetDevice/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/OrgTourniquetDevice/Delete?id=${id}`)
    }
}
export default OrgTourniquetDeviceService
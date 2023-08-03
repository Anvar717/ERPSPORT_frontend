import ApiService from './api.service'

const TimesheetIndicatorService = {
    GetAll() {
        return ApiService.get(`/TimesheetIndicator/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TimesheetIndicator/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/TimesheetIndicator/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/TimesheetIndicator/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/TimesheetIndicator/Delete?id=${id}`)
    }
}
export default TimesheetIndicatorService
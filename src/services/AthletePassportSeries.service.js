import ApiService from './api.service'

const AthletePassportSeriesService = {
    GetAll(oblastid) {
        return ApiService.get(`/AthletePassportSeries/GetAll?oblastid=${oblastid}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/AthletePassportSeries/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id,oblastid) {
        return ApiService.get(`/AthletePassportSeries/Get?id=${id}&oblastid=${oblastid}`)
    },
    Update(data) {
        return ApiService.post('/AthletePassportSeries/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/AthletePassportSeries/Delete?id=${id}`)
    }
}
export default AthletePassportSeriesService
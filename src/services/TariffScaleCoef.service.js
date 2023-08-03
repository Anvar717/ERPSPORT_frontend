import ApiService from './api.service'

const TariffScaleCoefService = {
    GetAll() {
        return ApiService.get(`/TariffScaleCoef/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TariffScaleCoef/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/TariffScaleCoef/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/TariffScaleCoef/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/TariffScaleCoef/Delete?id=${id}`)
    },

}
export default TariffScaleCoefService
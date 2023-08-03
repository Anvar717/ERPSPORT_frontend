import ApiService from './api.service'

const StaffTypeBasicTariffService = {
    GetAll() {
        return ApiService.get(`/StaffTypeBasicTariff/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/StaffTypeBasicTariff/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/StaffTypeBasicTariff/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/StaffTypeBasicTariff/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/StaffTypeBasicTariff/Delete?id=${id}`)
    }
}
export default StaffTypeBasicTariffService
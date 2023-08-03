import ApiService from './api.service'

const InventoryHoldingService = {
    GetAll(lang) {
        return ApiService.get(`/InventoryHolding/GetAll`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/InventoryHolding/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/InventoryHolding/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/InventoryHolding/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/InventoryHolding/Delete?id=${id}`)
    }
}
export default InventoryHoldingService
import ApiService from './api.service'

const TableColumnTemplateService = {
    GetAll(tableid,columnname) {
        return ApiService.get(`/TableColumnTemplate/GetAll?tableid=${tableid}&columnname=${columnname}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TableColumnTemplate/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/TableColumnTemplate/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/TableColumnTemplate/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/TableColumnTemplate/Delete?id=${id}`)
    }
}
export default TableColumnTemplateService
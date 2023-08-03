import ApiService from './api.service'

const BatchDeleteLogService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/BatchDeleteLog/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/BatchDeleteLog/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/BatchDeleteLog/Update', data)
    },
    Execute(id) {
        return ApiService.get(`/BatchDeleteLog/Execute?batchdeleteid=${id}`)
    },
    Delete(id) {
        return ApiService.delete(`/BatchDeleteLog/Delete?id=${id}`)
    },
    /* ,
        ImportFromExcel(data) {
            return ApiService.formData('/ProblemEdu/ImportFromExcel', data)
        } */
}
export default BatchDeleteLogService
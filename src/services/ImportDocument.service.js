import ApiService from './api.service'

const ImportDocumentService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/ImportDocument/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    GetImportedFile(id) {
        return ApiService.print(`/ImportDocument/GetImportedFile?id=${id}`)
    }
    /*     Delete(id) {
            return ApiService.delete(`/ImportDocument/Delete?id=${id}`)
        },
        Get(id) {
            return ApiService.get(`/ImportDocument/Get?id=${id}`)
        },
        Update(data) {
            return ApiService.post('/ImportDocument/Update', data)
        },
        Approve(id) {
            return ApiService.post(`/ImportDocument/Approve?id=${id}`)
        },
        CancelApproval(id) {
            return ApiService.post(`/ImportDocument/CancelApproval?id=${id}`)
        },
        ImportFromExcel(data) {
            return ApiService.formData('/ImportDocument/ImportFromExcel', data)
        },
        PrintImportDocumentTemplate() {
            return ApiService.print('/ImportDocument/PrintImportDocumentTemplate')
        } */
}
export default ImportDocumentService
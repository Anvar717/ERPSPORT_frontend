import ApiService from './api.service'
const FileManageService = {
    Attach(data) {
        return ApiService.post('/FileManage/Attach',data)
    },
    Get(id, DownloadFile) {
        return ApiService.print(`/FileManage/Get?id=${id}&DownloadFile=${DownloadFile}`)
    },
    Delete(id) {
        return ApiService.delete(`/FileManage/Delete?id=${id}`)
    }
}
export default FileManageService
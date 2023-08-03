import ApiService from './api.service'

const ProblemEduService = {
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit, Typeid,NotAnswer) {
        return ApiService.get(`/ProblemEdu/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&typeid=${Typeid}&NotAnswer=${NotAnswer}`)
    },
    Get(id, typeid) {
        return ApiService.get(`/ProblemEdu/Get?id=${id}&typeid=${typeid}`)
    },
    Update(data) {
        return ApiService.formData('/ProblemEdu/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/ProblemEdu/Delete?id=${id}`)
    },
    Download(id,fileid){
        return ApiService.print(`/ProblemEdu/GetAttachedFile?id=${id}&fileid=${fileid}`)
    },
    /* ,
        ImportFromExcel(data) {
            return ApiService.formData('/ProblemEdu/ImportFromExcel', data)
        } */
}
export default ProblemEduService
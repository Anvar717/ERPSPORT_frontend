import ApiService from './api.service'

const CurriculumTypeService = {
    GetAll(lang){
        return ApiService.get(`/CurriculumType/GetAll`)
    },
    GetAllWithParams(educationlanguageid,isspecialized,isvariable,schoolyearid) {
        return ApiService.get(`/CurriculumType/GetAllWithParams?educationlanguageid=${educationlanguageid}&isspecialized=${isspecialized}&isvariable=${isvariable}&schoolyearid=${schoolyearid}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/CurriculumType/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/CurriculumType/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/CurriculumType/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/CurriculumType/Delete?id=${id}`)
    }
}
export default CurriculumTypeService
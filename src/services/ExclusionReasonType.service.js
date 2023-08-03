import ApiService from './api.service'

const ExclusionReasonTypeService = {
    GetAll(lang){
        return ApiService.get(`/ExclusionReasonType/GetAll`)
    }, 
}
export default ExclusionReasonTypeService
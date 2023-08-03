
import ApiService from './api.service'

const MfyStateService = {
    GetAll(lang){
        return ApiService.get(`/MfyState/GetAll`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit,oblastid,regionid, mfyid){
        return ApiService.get(`/MfyState/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&mfyid=${mfyid}`)
    },
    Get(id){
        return ApiService.get(`/MfyState/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/MfyState/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/MfyState/Delete?id=${id}`)
    }
}
export default MfyStateService
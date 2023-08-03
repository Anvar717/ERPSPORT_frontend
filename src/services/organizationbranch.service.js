import ApiService from './api.service'

const OrganizationBranchService = {
    GetAll(lang) {
        if (lang === undefined || lang === null) {
            lang = 'ru'
        }
        return ApiService.get(`/OrganizationBranch/GetAll?lang=${lang}`)
    }, 
    GetList(Search,SortColumn, OrderType, PageNumber, PageLimit){
        return ApiService.get(`/OrganizationBranch/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id){
        return ApiService.get(`/OrganizationBranch/Get?id=${id}`)
    },
    Update(data){
        return ApiService.post('/OrganizationBranch/Update',data)
    },
    Delete(id){
        return ApiService.delete(`/OrganizationBranch/Delete?id=${id}`)
    }
}
export default OrganizationBranchService
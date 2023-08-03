import ApiService from './api.service'

const SportOrgRatingIndicatorService = {
    GetAll(organizationTypeId,schoolTypeId,isGroup) {
        return ApiService.get(`/SportOrgRatingIndicator/GetAll?organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isGroup=${isGroup}`)
    },
    GetList(Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportOrgRatingIndicator/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Get(id) {
        return ApiService.get(`/SportOrgRatingIndicator/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/SportOrgRatingIndicator/Update', data)
    },
    Delete(id) {
        return ApiService.delete(`/SportOrgRatingIndicator/Delete?id=${id}`)
    }
}
export default SportOrgRatingIndicatorService
import ApiService from './api.service'

const GroupFormByEduDirectionService = {
  GetList(schoolYearId, higHerEduClassifierId, educationFormTypemId, educationLanguageId, genderId, Search, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(`/GroupFormByEduDirection/GetList?schoolYearId=${schoolYearId}&higHerEduClassifierId=${higHerEduClassifierId}&educationFormTypemId=${educationFormTypemId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
  },
  Get(id) {
    return ApiService.get(`/GroupFormByEduDirection/Get?id=${id}`)
  },
  Update(data) {
    return ApiService.post('/GroupFormByEduDirection/Update', data)
  },
  Delete(id) {
    return ApiService.delete(`/GroupFormByEduDirection/Delete?id=${id}`)
  },
  Approve(id) {
    return ApiService.post(`/GroupFormByEduDirection/Approve?id=${id}`)
  },
  CancelApproval(id) {
    return ApiService.post(`/GroupFormByEduDirection/CancelApproval?id=${id}`)
  },
}
export default GroupFormByEduDirectionService
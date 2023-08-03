import ApiService from './api.service'

const TaxBenefitService = {
    GetList(StartDate,EndDate,Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TaxBenefit/GetList?StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    Delete(id) {
        return ApiService.delete(`/TaxBenefit/Delete?id=${id}`)
    },
    GetAll(personid) {
        return ApiService.get(`/TaxBenefit/GetAll?personid=${personid}`)  
    },
    Get(id) {
        return ApiService.get(`/TaxBenefit/Get?id=${id}`)
    },
    Update(data) {
        return ApiService.post('/TaxBenefit/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/TaxBenefit/Approve?id=${id}`)
    },
    CancelApproval(id) {
        return ApiService.post(`/TaxBenefit/CancelApproval?id=${id}`)
    },
}
export default TaxBenefitService
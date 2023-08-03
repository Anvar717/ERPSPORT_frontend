import ApiService from './api.service'

const GetReportCoachSportLevelCountService = {
    /**
     * @param { Object } params
     * @param { number } params.oblastId
     * @param { number } params.regionId
     * @param { number } params.organizationId
     * @param { number } params.sportTypeClassifierId
     * @param { boolean | null } params.isBySportTypeClassifier - Sport turi bo'yichami ?
     * @param { number } params.sportTitleId
     * @param { number } params.schoolYearId
     * @param { string } params.Search
     * @param { string } params.SortColumn
     * @param { string } params.OrderType
     * @param { number } params.PageNumber
     * @param { number } params.PageLimit
     * @param { number } params.organizationTypeId
     * @param { number } params.schoolTypeId
     * @param { number } params.genderId
     * @param { number } params.oblastId
     * @param { number } params.oblastId
     * @param { number } params.oblastId
     * @param { boolean | null } params.showAllRegion - Barcha tumanlar bo'yichami ?
     * @param { boolean | null } params.showAllOrganization - Barcha tashkilotlar bo'yichami ?
     * @returns 
     */
    GetCountList(params) {
        return ApiService.getParam(`/SportReport/GetReportCoachSportLevelCount`, params)
	}
}
export default GetReportCoachSportLevelCountService
import ApiService from './api.service'

const TreasBankDocumentService = {
    ReportTreasBankDocument(oblastId, regionId, organizationId, orgSettlementId, StartDate, EndDate, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/TreasBankDocument/ReportTreasBankDocument?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&orgSettlementId=${orgSettlementId}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    PrintReportTreasBankDocument(oblastId, regionId, organizationId, orgSettlementId, StartDate, EndDate, Search, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/TreasBankDocument/PrintReportTreasBankDocument?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&orgSettlementId=${orgSettlementId}&StartDate=${StartDate}&EndDate=${EndDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    SynchTreasBankDocument(OnDate) {
        return ApiService.get(`TreasBankDocument/SynchTreasBankDocument?OnDate=${OnDate}`)
    },
    ReportTreasBankDocumentByDebitCredit(oblastId, regionId, organizationId, StartDate, EndDate) {
        return ApiService.get(`/TreasBankDocument/ReportTreasBankDocumentByDebitCredit?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&StartDate=${StartDate}&EndDate=${EndDate}`)
    },
}
export default TreasBankDocumentService
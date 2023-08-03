import ApiService from './api.service'

const SportCoachCertificateService = {
    GetList(oblastId, regionId, organizationId, personName, documentSeries, documentNumber, statusId,sporttypeclassifierid, StartDate, EndDate, SortColumn, OrderType, PageNumber, PageLimit, isoldsportcoachcertificate) {
        return ApiService.get(`/SportCoachCertificate/GetList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&statusId=${statusId}&sporttypeclassifierid=${sporttypeclassifierid}&StartDate=${StartDate}&EndDate=${EndDate}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&isoldsportcoachcertificate=${isoldsportcoachcertificate}`)
    },
    Delete(id) {
        return ApiService.delete(`/SportCoachCertificate/Delete?id=${id}`)
    },
    Get(id,pinfl,documentseries,documentnumber, lang) {
        return ApiService.get(`/SportCoachCertificate/Get?id=${id}&pinfl=${pinfl}&documentseries=${documentseries}&documentnumber=${documentnumber}&lang=${!!lang ? lang : 'uz-latn'}`)
    },
    GetFromDbTs(documentseries,documentnumber, onDate , personId) {
        return ApiService.get(`/SportCoachCertificate/GetFromDbTs?documentseries=${documentseries}&documentnumber=${documentnumber}&onDate=${onDate}&personId=${personId}`)
    },
    GetDocumentSeries() {
        return ApiService.get('/SportCoachCertificate/GetDocumentSeries')
    },
    Update(data) {
        return ApiService.post('/SportCoachCertificate/Update', data)
    },
    Approve(id) {
        return ApiService.post(`/SportCoachCertificate/Approve?id=${id}`);
      },
      CancelApproval(id) {
        return ApiService.post(`/SportCoachCertificate/CancelApproval?id=${id}`);
      },
    Send(id, data) {
        return ApiService.post(`/SportCoachCertificate/Send?id=${id}`, data)
    },
    Import(orgid) {
        return ApiService.get(`/SportCoachCertificate/Import?organizationid=${orgid}`)
    },
    SportCoachCertificatePrint(oblastId, regionId, organizationId, personName, documentSeries, documentNumber, statusId,sporttypeclassifierid, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.print(`/SportCoachCertificate/SportCoachCertificatePrint?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&personName=${personName}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&statusId=${statusId}&sporttypeclassifierid=${sporttypeclassifierid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
    },
    PrintSportCoachCertificatePdf(filetype,id) {
        return ApiService.print(`/SportCoachCertificate/PrintSportCoachCertificatePdf?filetype=${filetype}&id=${id}`)
    }
}
export default SportCoachCertificateService
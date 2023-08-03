import ApiService from "./api.service";

const SportCircleReportService = {
    GetTourniquetDevicelogByTerritory(oblastid, regionid, onDate) {
        return ApiService.get(
            `/SportCircleReport/GetTourniquetDevicelogByTerritory?oblastid=${oblastid}&regionid=${regionid}&onDate=${onDate}`
        );
    },
    GetStudentTourniquetDevicelogByTerritory(oblastid, regionid, onDate) {
        return ApiService.get(
            `/SportCircleReport/GetStudentTourniquetDevicelogByTerritory?oblastid=${oblastid}&regionid=${regionid}&onDate=${onDate}`
        );
    },
    GetPersonTourniquetDevicelogByTerritory(oblastid, regionid, onDate) {
        return ApiService.get(
            `/SportCircleReport/GetPersonTourniquetDevicelogByTerritory?oblastid=${oblastid}&regionid=${regionid}&onDate=${onDate}`
        );
    },
    GetTourniquetEnteranceListByMembership(onDate,endDate, oblastId, regionId, organizationId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportCircleReport/GetTourniquetEnteranceListByMembership?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`);
    },
    GetTourniquetEnteranceListByEmployee(onDate,endDate, oblastId, regionId, organizationId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportCircleReport/GetTourniquetEnteranceListByEmployee?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`);
    },
    GetTourniquetEnteranceListByStudent(onDate, endDate, oblastId, regionId, organizationId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportCircleReport/GetTourniquetEnteranceListByStudent?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`);
    },
    GetMemberShipPaymentCount(params) {
        return ApiService.getParam(`/SportCircleReport/GetMemberShipPaymentCount`,params);
    },
    GetMembershipPaymentList(params) {
        return ApiService.getParam(`/SportCircleReport/GetMembershipPaymentList`,params);
    },
    GetTourniquetEnterenceCount(params) {
        return ApiService.get(
          `/SportCircleReport/GetTourniquetEnterenceCount?oblastid=${params.oblastid}&regionid=${params.regionid}&startDate=${params.startDate}&endDate=${params.endDate}&showAllRegion=${params.showAllRegion}&showAllOrganization=${params.showAllOrganization}&lang=${params.lang}`
        );
      },
    GetTourniquetEnteranceListByGuest(onDate, endDate, oblastId, regionId, organizationId, SortColumn, OrderType, PageNumber, PageLimit) {
        return ApiService.get(`/SportCircleReport/GetTourniquetEnteranceListByGuest?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`);
    },
    PrintTourniquetEnteranceListByGuest(onDate, endDate, oblastId, regionId, organizationId, SortColumn, OrderType) {
        return ApiService.print(`/SportCircleReport/PrintTourniquetEnteranceListByGuest?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}`);
    },
    PrintMembershipPaymentList(onDate, endDate, oblastId, regionId, organizationId, SortColumn, OrderType) {
        return ApiService.print(`/SportCircleReport/PrintMembershipPaymentList?onDate=${onDate}&endDate=${endDate}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}`);
    },
    PrintTourniquetEnteranceListByEmployee(startDate, endDate, oblastid, regionid, organizationId, SortColumn, OrderType) {
        return ApiService.print(`/SportCircleReport/PrintTourniquetEnteranceListByEmployee?startDate=${startDate}&endDate=${endDate}&oblastid=${oblastid}&regionid=${regionid}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
      },
    PrintTourniquetEnterenceCount(oblastid, regionid, startDate, endDate, showAllRegion, showAllOrganization) {
        return ApiService.print(`/SportCircleReport/PrintTourniquetEnterenceCount?oblastid=${oblastid}&regionid=${regionid}&startDate=${startDate}&endDate=${endDate}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`)
      },
    PrintMemberShipPaymentCount(oblastid, regionid, startDate, endDate, showAllRegion, showAllOrganization) {
        return ApiService.print(`/SportCircleReport/PrintMemberShipPaymentCount?oblastid=${oblastid}&regionid=${regionid}&startDate=${startDate}&endDate=${endDate}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`)
      },
    PrintTourniquetEnteranceListByStudent(oblastid, regionid, startDate, endDate, organizationId, SortColumn, OrderType) {
        return ApiService.print(`/SportCircleReport/PrintTourniquetEnteranceListByStudent?oblastid=${oblastid}&regionid=${regionid}&startDate=${startDate}&endDate=${endDate}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
      },
    PrintTourniquetEnteranceListByMembership(oblastid, regionid, startDate, endDate, organizationId, SortColumn, OrderType) {
        return ApiService.print(`/SportCircleReport/PrintTourniquetEnteranceListByMembership?oblastid=${oblastid}&regionid=${regionid}&startDate=${startDate}&endDate=${endDate}&organizationId=${organizationId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
      },
}
export default SportCircleReportService;

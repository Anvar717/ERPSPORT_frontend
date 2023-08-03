import ApiService from "./api.service";

const SportStudentManageService = {
  GetSportStudentManageList(params) {
    return ApiService.getParam(`/SportStudentManage/GetSportStudentManageList`,params );
  },
  GetSportsmenOtherInfo(personId, sporttypeclassifierid) {
    return ApiService.get(
      `/SportStudentManage/GetSportsmenOtherInfo?personId=${personId}&sporttypeclassifierid=${sporttypeclassifierid}`
    );
  },
  PrintSportStudentManageList(onDate, schoolYearID, sportGroupId, sportTitleId, sportTypeClassifierId, personName, coachPersonName, genderid, startage, endage, oblastId, regionId, organizationId,organizationtypeid,schooltypeid,sportlevelid,hasSportTitle,hasAnthropometricData,SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.print(
      `/SportStudentManage/PrintSportStudentManageList?onDate=${onDate}&schoolYearID=${schoolYearID}&sportGroupId=${sportGroupId}&sportTitleId=${sportTitleId}&sportTypeClassifierId=${sportTypeClassifierId}&personName=${personName}&coachPersonName=${coachPersonName}&genderid=${genderid}&startage=${startage}&endage=${endage}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&sportlevelid=${sportlevelid}&hasSportTitle=${hasSportTitle}&hasAnthropometricData=${hasAnthropometricData}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetSportsmenList(onDate, schoolYearID, sportGroupId, sportTypeClassifierId, pinfl, identityDocumentId, documentSeries, documentNumber, personName, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(
      `/SportStudentManage/GetSportsmenList?onDate=${onDate}&schoolYearID=${schoolYearID}&sportGroupId=${sportGroupId}&sportTypeClassifierId=${sportTypeClassifierId}&pinfl=${pinfl}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&personName=${personName}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
};
export default SportStudentManageService;
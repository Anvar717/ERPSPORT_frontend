import ApiService from "./api.service";

const SportReportService = {
  GetReportFormingGroupBySportType(
    oblastid,
    regionid,
    organizationid,
    schoolyearid,
    lang,
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationid == null || organizationid === undefined) {
      organizationid = 0;
    }
    return ApiService.get(
      `/SportReport/GetReportFormingGroupBySportType?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolyearid=${schoolyearid}&lang=${lang}`
    );
  },
  // PrintReportEmployeeCount(
  //   oblastid,
  //   regionid,
  //   organizationTypeId,
  //   schoolTypeId,
  //   isByPosition,
  //   positionId,
  // ) {
  //   return ApiService.printtemp(
  //     `/EmployeeReport/PrintReportEmployeeCount?oblastid=${oblastid}&regionid=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isByPosition=${isByPosition}&positionId=${positionId}`
  //   );
  // },
  PrintReportEmployeeCount(
    oblastid,
    regionid,
    organizationTypeId,
    schoolTypeId,
    isByPosition,
    positionId,
    showAllRegion,
    showAllOrganization,
  ) {
    return ApiService.print(
      `/EmployeeReport/PrintReportEmployeeCount?oblastid=${oblastid}&regionid=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isByPosition=${isByPosition}&positionId=${positionId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`
    );
  },
  GetSportTitleDocumentReport(
    oblastid,
    regionid,
    organizationid,
    statusid,
    personName,
    certificatenumber,
    sporttitleid,
    sporttypeclassifierid,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationid == null || organizationid === undefined) {
      organizationid = 0;
    }
    return ApiService.get(
      `/SportReport/GetSportTitleDocumentReport?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&statusid=${statusid}&personName=${personName}&certificatenumber=${certificatenumber}&sporttitleid=${sporttitleid}&sporttypeclassifierid=${sporttypeclassifierid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`
    );
  },
  GetReportSportTitleDocumentBySportType(
    oblastid,
    regionid,
    organizationid,
    sporttitleid,
    schoolyearid,
    lang
  ) {
    if (oblastid == null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid == null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationid == null || organizationid === undefined) {
      organizationid = 0;
    }
    if (sporttitleid == null || sporttitleid === undefined) {
      sporttitleid = 0;
    }
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    if (lang == null || lang === undefined) {
      lang = 'ru';
    }
    return ApiService.get(
      `/SportReport/GetReportSportTitleDocumentBySportType?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sporttitleid=${sporttitleid}&schoolyearid=${schoolyearid}&lang=${lang}`
    );
  },
  GetReportSportTitleDocument(params){
    return ApiService.getParam(
      `/SportReport/GetReportSportTitleDocumentCount`,params
      // `/SportReport/GetReportSportTitleDocumentCount?oblastid=${params.oblastid}&regionid=${params.regionid}&schoolyearid=${params.schoolyearid}&sporttitleid=${params.sporttitleid}&isBySportTypeClassifier=${params.isBySportTypeClassifier}&sportTypeClassifierId=${params.sportTypeClassifierId}`
    )
  },
  GetReportSportTitleDocumentList(params){
    return ApiService.getParam(
      `/SportReport/GetReportSportTitleDocumentList`, params
    )
  },
  GetCoachPortfolioCount(params){
    return ApiService.getParam(
      `/SportReport/GetCoachPortfolioCount`, params
    )
  },
  GetReportAthleticAchievement(oblastid, regionid, organizationid, schoolyearid) {
    return ApiService.get(
      `/SportReport/GetReportAthleticAchievement?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolyearid=${schoolyearid}`
    );
  },
  GetReportSportTitleDocumentByOrganizationPrintList(
    schoolyearid,
    sporttitleid,
  ) {
    if (schoolyearid == null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    if (sporttitleid == null || sporttitleid === undefined) {
      sporttitleid = 0;
    }
    return ApiService.print(
      `/SportReport/GetReportSportTitleDocumentByOrganizationPrintList?schoolyearid=${schoolyearid}&sporttitleid=${sporttitleid}`
    );
  },
  GetReportFormingGroupCount(params) {
    return ApiService.getParam(
      `/SportReport/GetReportFormingGroupCount`, params
    );
  },
  GetSportTypeSportsmenCountByOblastPrintList(schoolyearid, oblastid, regionid, organizationid) {
    return ApiService.print(`/SportReport/GetSportTypeSportsmenCountByOblastPrintList?schoolyearid=${schoolyearid}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`)
  },
  PrintReportFormingGroupCount(params) {
    return ApiService.printParam(`/SportReport/PrintReportFormingGroupCount`, params)
  },
  // PrintStaffReportCountByPosition(oblastid, regionid, organizationid, organizationTypeId, schoolTypeId, staffCategoryId, positionId,SortColumn, OrderType) {
  //   return ApiService.printtemp(`/EmployeeReport/PrintStaffReportCountByPosition?&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&staffCategoryId=${staffCategoryId}&positionId=${positionId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
  // },
  // PrintStaffReportCountByRegion(oblastid, regionid, organizationid, organizationTypeId, schoolTypeId, staffCategoryId, positionId,SortColumn, OrderType) {
  //   return ApiService.printtemp(`/EmployeeReport/PrintStaffReportCountByRegion?&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&staffCategoryId=${staffCategoryId}&positionId=${positionId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
  // },
  PrintStaffReportList(oblastid, regionid, organizationid, organizationTypeId, schoolTypeId, staffCategoryId, positionId,SortColumn, OrderType) {
    return ApiService.printtemp(`/EmployeeReport/PrintStaffReportList?&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&staffCategoryId=${staffCategoryId}&positionId=${positionId}&SortColumn=${SortColumn}&OrderType=${OrderType}`)
  },
  PrintStaffReportCount(oblastid, regionid, organizationTypeId, schoolTypeId, isByPosition, positionId) {
    return ApiService.printtemp(`/EmployeeReport/PrintStaffReportCount?&oblastid=${oblastid}&regionid=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isByPosition=${isByPosition}&positionId=${positionId}`)
  },
  PrintReportSportCoachCertificateList(oblastid, regionid, organizationid,sporttypeclassifierId, schoolYearId,date) {
    return ApiService.print(`/SportReport/PrintReportSportCoachCertificateList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sporttypeclassifierId=${sporttypeclassifierId}&schoolYearId=${schoolYearId}&date=${date}`)
  },
  PrintReportSportTitleDocumentList(oblastid, regionid, organizationid,sportTypeClassifierId, sportTitleId, schoolYearId, Search, SortColumn, OrderType, organizationTypeId, schoolTypeId, genderId,date) {
    return ApiService.printtemp(`/SportReport/PrintReportSportTitleDocumentList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sportTypeClassifierId=${sportTypeClassifierId}&sportTitleId=${sportTitleId}&schoolYearId=${schoolYearId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&genderId=${genderId}&date=${date}`)
  },
  PrintReportAppointQualCategoryJuryList(oblastid, regionid, organizationid,qualificationCategoryId, sportTypeClassifierId, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryJuryList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&qualificationCategoryId=${qualificationCategoryId}&sportTypeClassifierId=${sportTypeClassifierId}&date=${date}`)
  },
  PrintReportAppointQualCategoryJuryCount(oblastId, regionId, schoolYearId, organizationTypeId, schoolTypeId, isBySportTypeClassifier, sportTypeClassifierId,showAllRegion, showAllOrganization, genderid, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryJuryCount?oblastId=${oblastId}&regionId=${regionId}&schoolYearId=${schoolYearId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isBySportTypeClassifier=${isBySportTypeClassifier}&sportTypeClassifierId=${sportTypeClassifierId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}&genderid=${genderid}&date=${date}`)
  },
  PrintReportCoachSportLevelCount(oblastId, regionid, schoolYearId, organizationTypeId, schoolTypeId, isBySportTypeClassifier, sportTypeClassifierId,showAllRegion, showAllOrganization) {
    return ApiService.print(`/SportReport/PrintReportCoachSportLevelCount?oblastId=${oblastId}&regionid=${regionid}&schoolYearId=${schoolYearId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isBySportTypeClassifier=${isBySportTypeClassifier}&sportTypeClassifierId=${sportTypeClassifierId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`)
  },
  PrintReportCoachSportLevelList(oblastId, regionid, organizationId, sportTypeClassifierId, sportTitleId, schoolYearId,Search, SortColumn,OrderType, PageNumber,PageLimit, organizationTypeId, schoolTypeId, genderId) {
    return ApiService.print(`/SportReport/PrintReportCoachSportLevelList?oblastId=${oblastId}&regionid=${regionid}&organizationId=${organizationId}&sportTitleId=${sportTitleId}&schoolYearId=${schoolYearId}&sportTypeClassifierId=${sportTypeClassifierId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&genderId=${genderId}`)
  },
  PrintReportAthleticAchievementCount(oblastid, regionId, schoolYearId, isBySportTypeClassifier, sportTypeClassifierId,showAllRegion, showAllOrganization, genderid,date) {
    return ApiService.print(`/SportReport/PrintReportAthleticAchievementCount?oblastid=${oblastid}&regionId=${regionId}&schoolYearId=${schoolYearId}&isBySportTypeClassifier=${isBySportTypeClassifier}&sportTypeClassifierId=${sportTypeClassifierId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}&genderid=${genderid}&date=${date}`)
  },
  PrintReportAthleticAchievementList(oblastId, regionId, organizationId, schoolYearId, sportTypeClassifierId,sportEventTypeId, date) {
    return ApiService.print(`/SportReport/PrintReportAthleticAchievementList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&schoolYearId=${schoolYearId}&sportTypeClassifierId=${sportTypeClassifierId}&sportEventTypeId=${sportEventTypeId}&date=${date}`)
  },
  PrintReportAppointQualCategoryInstrcutorList(oblastId, regionId, organizationId, schoolYearId, qualificationcategoryid, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryInstrcutorList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&schoolYearId=${schoolYearId}&qualificationcategoryid=${qualificationcategoryid}&date=${date}`)
  },
  PrintReportAppointQualCategoryCoachList(oblastId, regionId, organizationId, schoolYearId, sportTypeClassifierId, qualificationcategoryid, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryCoachList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&schoolYearId=${schoolYearId}&sportTypeClassifierId=${sportTypeClassifierId}&qualificationcategoryid=${qualificationcategoryid}&date=${date}`)
  },
  PrintCoachPortfolioCount(oblastId, regionId, organizationId, schoolYearId, organizationTypeId, schoolTypeId, isBySportTypeClassifier, sportTypeClassifierId,showAllRegion, showAllOrganization) {
    return ApiService.print(`/SportReport/PrintCoachPortfolioCount?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&schoolYearId=${schoolYearId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isBySportTypeClassifier=${isBySportTypeClassifier}&sportTypeClassifierId=${sportTypeClassifierId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`)
  },
  PrintReportAppointQualCategoryCoachCount(oblastId, regionId, organizationTypeId,schoolTypeId, schoolYearId, isBySportTypeClassifier, sportTypeClassifierId, showAllRegion, showAllOrganization, genderid, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryCoachCount?oblastId=${oblastId}&regionId=${regionId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolYearId=${schoolYearId}&isBySportTypeClassifier=${isBySportTypeClassifier}&sportTypeClassifierId=${sportTypeClassifierId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}&genderid=${genderid}&date=${date}`)
  },
  PrintReportAppointQualCategoryInstructorCount(oblastId, regionId, organizationTypeId,schoolTypeId, schoolYearId,showAllRegion, showAllOrganization,genderid, date) {
    return ApiService.print(`/SportReport/PrintReportAppointQualCategoryInstructorCount?oblastId=${oblastId}&regionId=${regionId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolYearId=${schoolYearId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}&genderid=${genderid}&date=${date}`)
  },
  PrintReportAthletePassportCount(params) {
    return ApiService.printParam(`/SportReport/PrintReportAthletePassportCount`, params)
  },
  PrintReportSportTitleDocumentCount(params) {
    return ApiService.printParam(`/SportReport/PrintReportSportTitleDocumentCount`, params)
  },
  PrintAnthropometricCount(params) {
    return ApiService.printParam(`/SportReport/PrintAnthropometricCount`, params)
  },
  GetReportFormingTeamSquadCount(squadlevelid,oblastId,regionId, date) {
    return ApiService.get(`/SportReport/GetReportFormingTeamSquadCount?squadlevelid=${squadlevelid}&oblastId=${oblastId}&regionId=${regionId}&date=${date}`)
  },
  PrintReportFormingTeamSquadCount(squadlevelid,oblastId,regionId, date) {
    return ApiService.print(`/SportReport/PrintReportFormingTeamSquadCount?squadlevelid=${squadlevelid}&oblastId=${oblastId}&regionId=${regionId}&date=${date}`)
  },
  GetReportFormingTeamSquadBySportTypeClassifier(oblastid, regionid, squadlevelid) {
    return ApiService.get(`/SportReport/GetReportFormingTeamSquadBySportTypeClassifier?oblastid=${oblastid}&regionid=${regionid}&squadlevelid=${squadlevelid}`)
  },
  GetReportAppointQualCategoryCoachCount(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryCoachCount`, params)
  },
  GetReportAppointQualCategoryCoachList(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryCoachList`, params)
  },
  GetReportAppointQualCategoryCoachCountBySportType(oblastid, regionid, organizationid) {
    return ApiService.get(`/SportReport/GetReportAppointQualCategoryCoachCountBySportType?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}`)
  },
  PrintReportAthletePassportList(oblastId, regionId, organizationId, sporttypeclassifierId, personName, userName, startDate, endDate, Search ,SortColumn, OrderType, schoolYearId, date) {
    return ApiService.printtemp(`/SportReport/PrintReportAthletePassportList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&sporttypeclassifierId=${sporttypeclassifierId}&personName=${personName}&userName=${userName}&startDate=${startDate}&endDate=${endDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&schoolYearId=${schoolYearId}&date=${date}`)
  },
  GetReportFormingTeamSquadList(oblastId, regionId, sportTypeClassifierId, squadLevelId, squadTypeId, genderId, sportTeamTypeId, Search, SortColumn, OrderType, PageNumber, PageLimit,date) {
    return ApiService.get(`/SportReport/GetReportFormingTeamSquadList?oblastId=${oblastId}&regionId=${regionId}&sportTypeClassifierId=${sportTypeClassifierId}&squadLevelId=${squadLevelId}&squadTypeId=${squadTypeId}&genderId=${genderId}&sportTeamTypeId=${sportTeamTypeId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&date=${date}`)
  },
  GetReportSportCoachCertificateCount(params) {
    return ApiService.getParam(`/SportReport/GetReportSportCoachCertificateCount`, params)
  },
  PrintReportSportCoachCertificateCount(params) {
    return ApiService.print(`/SportReport/PrintReportSportCoachCertificateCount?oblastid=${params.oblastid}&regionid=${params.regionid}&organizationid=${params.organizationid}&schoolyearid=${params.schoolyearid}&isBySportTypeClassifier=${params.isBySportTypeClassifier}&sportTypeClassifierId=${params.sportTypeClassifierId}&lang=${params.lang}&date=${params.date}`)
  },
  GetReportSportCoachCertificateList(oblastid, regionid, organizationId, sporttypeclassifierid, personName, Search, SortColumn, OrderType, PageNumber, PageLimit, schoolyearid,date) {
    return ApiService.get(`/SportReport/GetReportSportCoachCertificateList?oblastid=${oblastid}&regionid=${regionid}&organizationId=${organizationId}&sporttypeclassifierid=${sporttypeclassifierid}&personName=${personName}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&date=${date}`)
  },
  GetReportAthletePassportCount(params) {
    return ApiService.getParam(`/SportReport/GetReportAthletePassportCount`, params)
  },
  PrintReportSportCoachCertificateReestr(oblastid, regionid, organizationId, sporttypeclassifierid, personName, Serach, SortColumn, OrderType, PageNumber, PageLimit, schoolyearid, lang) {
    return ApiService.print(`/SportReport/PrintReportSportCoachCertificateReestr?oblastid=${oblastid}&regionid=${regionid}&organizationId=${organizationId}&sporttypeclassifierid=${sporttypeclassifierid}&personName=${personName}&Serach=${Serach}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&lang=${lang}`)
  },
  PrintReportFormingTeamSquadList(oblastId, regionId, organizationId, sportTypeClassifierId, squadLevelId, squadTypeId, genderId, sportTeamTypeId,date) {
    return ApiService.printtemp(`/SportReport/PrintReportFormingTeamSquadList?oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&sportTypeClassifierId=${sportTypeClassifierId}&squadLevelId=${squadLevelId}&squadTypeId=${squadTypeId}&genderId=${genderId}&sportTeamTypeId=${sportTeamTypeId}&date$=${date}`)
  },
  GetAnthropometricCount(params) {
    return ApiService.getParam(`/SportReport/GetAnthropometricCount`,params);
  },
  GetReportAthleticAchievementCount(params) {
    return ApiService.getParam(`/SportReport/GetReportAthleticAchievementCount`, params);
  },
  GetReportAthleticAchievementList(oblastid, regionid, organizationId, sporttypeclassifierid, Search, SortColumn, OrderType, PageNumber, PageLimit, schoolyearid,personName, personPinfl, coachName, coachPinfl, date,sportRankId,sportEventTypeId) {
    return ApiService.get(`/SportReport/GetReportAthleticAchievementList?oblastid=${oblastid}&regionid=${regionid}&organizationId=${organizationId}&sporttypeclassifierid=${sporttypeclassifierid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&personName=${personName}&personPinfl=${personPinfl}&coachName=${coachName}&coachPinfl=${coachPinfl}&date=${date}&sportRankId=${sportRankId}&sportEventTypeId=${sportEventTypeId}`)
  },
  GetReportAthletePassportList(oblastid, regionid, organizationId, sporttypeclassifierid,  startDate, endDate, Search, SortColumn, OrderType, PageNumber, PageLimit, schoolyearid, approvedUserId, approvedDateFrom, approvedDateTo, date) {
    return ApiService.get(`/SportReport/GetReportAthletePassportList?oblastid=${oblastid}&regionid=${regionid}&organizationId=${organizationId}&sporttypeclassifierid=${sporttypeclassifierid}&startDate=${startDate}&endDate=${endDate}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&schoolyearid=${schoolyearid}&approvedUserId=${approvedUserId}&approvedDateFrom=${approvedDateFrom}&approvedDateTo=${approvedDateTo}&date=${date}`)
  },
  GetReportAppointQualCategoryInstructorCount(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryInstructorCount`, params)
  },
  GetReportAppointQualCategoryInstrcutorList(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryInstrcutorList`,params );
  },
  GetReportAppointQualCategoryJuryCount(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryJuryCount`,params);
    // return ApiService.get(`/SportReport/GetReportAppointQualCategoryJuryCount?oblastid=${params.oblastid}&regionid=${params.regionid}&qualificationCategoryId=${params.qualificationCategoryId}&isBySportTypeClassifier=${params.isBySportTypeClassifier}&sportTypeClassifierId=${params.sportTypeClassifierId}`)
  },
  GetReportAppointQualCategoryJuryList(params) {
    return ApiService.getParam(`/SportReport/GetReportAppointQualCategoryJuryList`, params)
        // return ApiService.get(`/SportReport/GetReportAppointQualCategoryJuryList?oblastid=${params.oblastid}&regionid=${params.regionid}&organizationId=${params.organizationId}&qualificationCategoryId=${params.qualificationCategoryId}&sportTypeClassifierId=${params.sportTypeClassifierId}&Search=${params.Search}&SortColumn=${params.SortColumn}&OrderType=${params.OrderType}&PageNumber=${params.PageNumber}&PageLimit=${params.PageLimit}`)

  },
  PrintSportStudentManageList(onDate, schoolYearID, sportGroupId, sportTitleId, sportTypeClassifierId, personName, coachPersonName, genderid, startage, endage, oblastId, regionId, organizationId,organizationtypeid,schooltypeid,sportlevelid,SortColumn, OrderType, hassporttitle,hasAnthropometricData) {
    return ApiService.print(
      `/SportStudentManage/PrintSportStudentManageList?onDate=${onDate}&schoolYearID=${schoolYearID}&sportGroupId=${sportGroupId}&sportTitleId=${sportTitleId}&sportTypeClassifierId=${sportTypeClassifierId}&personName=${personName}&coachPersonName=${coachPersonName}&genderid=${genderid}&startage=${startage}&endage=${endage}&oblastId=${oblastId}&regionId=${regionId}&organizationId=${organizationId}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&sportlevelid=${sportlevelid}&SortColumn=${SortColumn}&OrderType=${OrderType}&hassporttitle=${hassporttitle}&hasAnthropometricData=${hasAnthropometricData}`
    );
  },
  GetReportEmployeeCount(params) {
    return ApiService.getParam(`/EmployeeReport/GetReportEmployeeCount`, params)
  },
  GetStaffReportCount(params) {
    return ApiService.getParam(`/EmployeeReport/GetStaffReportCount`, params)
  },
  GetStaffReportList(params) {
    return ApiService.getParam(`/EmployeeReport/GetStaffReportList`, params)
  },
  GetReportHonorarytitledEmployeeCount(params) {
    return ApiService.getParam(`/EmployeeReport/GetReportHonorarytitledEmployeeCount`, params)
  },
  GetReportCoachSportLevelList(oblastid, regionid, organizationid,sportTypeClassifierId, sportTitleId, schoolYearId, Search, SortColumn, OrderType,PageNumber, PageLimit, organizationTypeId, schoolTypeId, genderId) {
    return ApiService.get(`/SportReport/GetReportCoachSportLevelList?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sportTypeClassifierId=${sportTypeClassifierId}&sportTitleId=${sportTitleId}&schoolYearId=${schoolYearId}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&genderId=${genderId}`)
  },
  PrintReportHonorarytitledEmployeeCount(oblastId, regionId, organizationTypeId,schoolTypeId, isByHonoraryTitleType, honoraryTitleTypeId, showAllRegion, showAllOrganization) {
    return ApiService.get(`/SportReport/PrintReportHonorarytitledEmployeeCount?oblastId=${oblastId}&regionId=${regionId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&isByHonoraryTitleType=${isByHonoraryTitleType}&honoraryTitleTypeId=${honoraryTitleTypeId}&showAllRegion=${showAllRegion}&showAllOrganization=${showAllOrganization}`)
  },
  GetReportCompetitionWinnerList(genderid, sportrankId, sporttypeclassifierId,sporteventtypeId, competitiontypeId, sporteventId, sportcompetitiontypeId, oblastid, regionid, organizationid, personName, pinfl, startDate, endDate, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.get(`/CompetitionWinner/GetReportCompetitionWinnerList?genderid=${genderid}&sportrankId=${sportrankId}&sporttypeclassifierId=${sporttypeclassifierId}&sporteventtypeId=${sporteventtypeId}&competitiontypeId=${competitiontypeId}&sporteventId=${sporteventId}&sportcompetitiontypeId=${sportcompetitiontypeId}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&personName=${personName}&pinfl=${pinfl}&startDate=${startDate}&endDate=${endDate}`)
  },
  PrintReportCompetitionWinnerList(genderid, sportrankId, sporttypeclassifierId,sporteventtypeId, competitiontypeId, sporteventId, sportcompetitiontypeId, oblastid, regionid, organizationid, personName, pinfl, startDate, endDate, SortColumn, OrderType, PageNumber, PageLimit) {
    return ApiService.print(`/CompetitionWinner/PrintReportCompetitionWinnerList?genderid=${genderid}&sportrankId=${sportrankId}&sporttypeclassifierId=${sporttypeclassifierId}&sporteventtypeId=${sporteventtypeId}&competitiontypeId=${competitiontypeId}&sporteventId=${sporteventId}&sportcompetitiontypeId=${sportcompetitiontypeId}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&personName=${personName}&pinfl=${pinfl}&startDate=${startDate}&endDate=${endDate}`)
  },
};
export default SportReportService;

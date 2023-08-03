import ApiService from "./api.service";
const OrganizationService = {
  GetAll(oblastid, regionid, isfarmfy, organizationtypeid, isonlineadm, SchoolLegalFormID) {
    if (organizationtypeid === null || organizationtypeid === undefined) {
      organizationtypeid = 0;
    }
    if (JSON.parse(localStorage.getItem("user_info")).isonlineadm) {
      isonlineadm = null;
    } 
    if (SchoolLegalFormID === null || SchoolLegalFormID === undefined) {
      SchoolLegalFormID = 0;
    }
    return ApiService.get(
      `/Organization/GetAll?oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}&organizationtypeid=${organizationtypeid}&isonlineadm=${isonlineadm}&SchoolLegalFormID=${SchoolLegalFormID}`
    );
  },
  /*  GetAll() {
         return ApiService.get(`/Organization/GetAll`)
     }, */
  GetOrganizationAccountList(OrganizationID) {
    return ApiService.get(
      `/Organization/GetOrganizationAccountList?OrganizationID=${OrganizationID}`
    );
  },
  GetList(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    oblastid,
    regionid,
    isfarmfy,
    organizationtypeid,
    schooltypeid,
    schoollegalformid,
    schoolmanagementformid
  ) {
    if (oblastid === null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid === null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationtypeid === null || organizationtypeid === undefined) {
      organizationtypeid = 0;
    }
    if (schooltypeid === null || schooltypeid === undefined) {
      schooltypeid = 0;
    }
    if (schoollegalformid === null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    if (
      schoolmanagementformid === null ||
      schoolmanagementformid === undefined
    ) {
      schoolmanagementformid = 0;
    }
    return ApiService.get(
      `/Organization/GetList?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&isfarmfy=${isfarmfy}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&schoollegalformid=${schoollegalformid}&schoolmanagementformid=${schoolmanagementformid}`
    );
  },
  UpdateOrganizationByUser(data) {
    return ApiService.post("/Organization/UpdateOrganizationByUser", data);
  },
  Update(data) {
    return ApiService.post("/Organization/Update", data);
  },
  Get(id, inn) {
    return ApiService.get(`/Organization/Get?id=${id}&inn=${inn}`);
  },
  GetOrganizationByUser() {
    return ApiService.get(`/Organization/GetOrganizationByUser`);
  },
  Delete(id) {
    return ApiService.delete(`/Organization/Delete?id=${id}`);
  },
  GetOrganizationCard(organizationid, schoolyearid) {
    return ApiService.get(
      `/Organization/GetOrganizationCard?organizationid=${organizationid}&schoolyearid=${schoolyearid}`
    );
  },
  OrganizationListPrint(
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    oblastid,
    regionid,
    lang,
    isfarmfy,
    organizationtypeid,
    schooltypeid,
    schoollegalformid
  ) {
    if (oblastid === null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid === null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationtypeid === null || organizationtypeid === undefined) {
      organizationtypeid = 0;
    }
    if (schooltypeid === null || schooltypeid === undefined) {
      schooltypeid = 0;
    }
    if (schoollegalformid === null || schoollegalformid === undefined) {
      schoollegalformid = 0;
    }
    return ApiService.print(
      `/Organization/OrganizationListPrint?Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&lang=${lang}&isfarmfy=${isfarmfy}&organizationtypeid=${organizationtypeid}&schooltypeid=${schooltypeid}&schoollegalformid=${schoollegalformid}`
    );
  },
  PrintOrganizationCard(oblastid, regionid, organizationid, schoolyearid) {
    if (oblastid === null || oblastid === undefined) {
      oblastid = 0;
    }
    if (regionid === null || regionid === undefined) {
      regionid = 0;
    }
    if (organizationid === null || organizationid === undefined) {
      organizationid = 0;
    }
    if (schoolyearid === null || schoolyearid === undefined) {
      schoolyearid = 0;
    }
    return ApiService.print(
      `/Organization/PrintOrganizationCard?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&schoolyearid=${schoolyearid}`
    );
  },
  GetOrganizationCoefficient(OrganizationID) {
    return ApiService.get(
      `/Organization/GetOrganizationCoefficient?OrganizationID=${OrganizationID}`
    );
  },
  GetOrganizationCount(params) {
    return ApiService.getParam(`/Organization/GetOrganizationCount`, params);
  },
};
export default OrganizationService;

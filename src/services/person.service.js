import ApiService from './api.service'

const PersonService = {
  GetAll(persontypeid) {
    return ApiService.get(`/Person/GetAll?persontypeid=${persontypeid}`);
  },
  GetAllOrgPerson() {
    return ApiService.get(`/Person/GetAllOrgPerson`);
  },
  GetList(
    personId,
    personName,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    documentseries,
    documentnumber,
    persontypeid,
    isallperson,
    organizationid,
    oblastid,
    regionid,
    isnotcheckresult,
    ischeckresult,
    inn,
    pinfl,
    identitydocumentid,
    isphotoexists,
    sporttypeclassifierid,
    genderid
  ) {
    if (inn === null || inn === undefined) {
      inn = "";
    }
    if (pinfl === undefined || pinfl === null) {
      pinfl = "";
    }
    if (identitydocumentid === undefined || identitydocumentid === null) {
      identitydocumentid = 0;
    }
    if (sporttypeclassifierid === undefined || sporttypeclassifierid === null) {
      sporttypeclassifierid = 0;
    }
    if (genderid === undefined || genderid === null) {
      genderid = 0;
    }
    return ApiService.get(
      `/Person/GetList?personId=${personId}&personName=${personName}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&documentseries=${documentseries}&documentnumber=${documentnumber}&persontypeid=${persontypeid}&isallperson=${isallperson}&organizationid=${organizationid}&oblastid=${oblastid}&regionid=${regionid}&isnotcheckresult=${isnotcheckresult}&ischeckresult=${ischeckresult}&inn=${inn}&pinfl=${pinfl}&identitydocumentid=${identitydocumentid}&isphotoexists=${isphotoexists}&sporttypeclassifierid=${sporttypeclassifierid}&genderid=${genderid}`
    );
  },
  Get(
    id,
    identitydocumentid,
    docseries,
    docnumber,
    inn,
    returndata,
    persontypeid
  ) {
    return ApiService.get(
      `/Person/Get?id=${id}&identitydocumentid=${identitydocumentid}&docseries=${docseries}&docnumber=${docnumber}&inn=${inn}&returndata=${returndata}&persontypeid=${persontypeid}`
    );
  },
  GetByInnORPinfl(
    id,
    identitydocumentid,
    docseries,
    docnumber,
    inn,
    pinfl,
    returndata,
    persontypeid
  ) {
    return ApiService.get(
      `/Person/Get?id=${id}&identitydocumentid=${identitydocumentid}&docseries=${docseries}&docnumber=${docnumber}&inn=${inn}&pinfl=${pinfl}&returndata=${returndata}&persontypeid=${persontypeid}`
    );
  },
  Update(data) {
    return ApiService.post("/Person/Update", data);
  },
  ImportFromExcel(data) {
    return ApiService.formData("/Person/ImportFromExcel", data);
  },
  PrintTemplate() {
    return ApiService.print("/Person/PrintTemplate");
  },
  GetGraduatedStudentDataByPinfl(Pinfl, psdata) {
    return ApiService.get(
      `/Person/GetGraduatedStudentDataByPinfl?Pinfl=${Pinfl}&psdata=${psdata}`
    );
  },
  GetByPnfl(Pinfl, Document) {
    return ApiService.get(
      `/Person/GetByPnfl?Pinfl=${Pinfl}&Document=${Document}`
    );
  },
  GetStudentList(
    DocumentSeries,
    DocumentNumber,
    Search,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    isAllStudent
  ) {
    return ApiService.get(
      `/Person/GetStudentList?DocumentSeries=${DocumentSeries}&DocumentNumber=${DocumentNumber}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&isAllStudent=${isAllStudent}`
    );
  },
  GetEmployeeList(
    inn,
    pinfl,
    Search,
    organizationid,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    isAllEmployee
  ) {
    return ApiService.get(
      `/Person/GetEmployeeList?inn=${inn}&pinfl=${pinfl}&Search=${Search}&organizationid=${organizationid}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&isAllEmployee=${isAllEmployee}`
    );
  },
  GetFromGovData(
    DocumentSeries,
    DocumentNumber,
    Pinfl,
    DateOfBirth,
    persontypeid,
    INN,
    identityDocumentId
  ) {
    return ApiService.get(
      `/Person/GetFromGovData?DocumentSeries=${DocumentSeries}&DocumentNumber=${DocumentNumber}&Pinfl=${Pinfl}&DateOfBirth=${DateOfBirth}&persontypeid=${persontypeid}&INN=${INN}&identityDocumentId=${identityDocumentId}`
    );
  },
  Delete(id) {
    return ApiService.delete(`/Person/Delete?id=${id}`);
  },
  DeletePersonIsAdmin(id) {
    return ApiService.delete(`/Person/DeletePersonIsAdmin?id=${id}`);
  },
  GetDocumentStatusLog(id) {
    return ApiService.get(`/Person/GetDocumentStatusLog?id=${id}`);
  },
  CheckFromGovData(organizationid, persontypeid) {
    return ApiService.get(
      `/Person/CheckFromGovData?organizationid=${organizationid}&persontypeid=${persontypeid}`
    );
  },
  PrintPerson(
    personId,
    personName,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    documentseries,
    documentnumber,
    persontypeid,
    isallperson,
    organizationid,
    oblastid,
    regionid,
    isnotcheckresult,
    isCheckResult,
    isphotoexists
  ) {
    return ApiService.print(
      `/Person/PrintPerson?personId=${personId}&personName=${personName}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&documentseries=${documentseries}&documentnumber=${documentnumber}&persontypeid=${persontypeid}&isallperson=${isallperson}&organizationid=${organizationid}&oblastid=${oblastid}&regionid=${regionid}&isnotcheckresult=${isnotcheckresult}&isCheckResult=${isCheckResult}&isphotoexists=${isphotoexists}`
    );
  },
  PrintStudent(
    personId,
    personName,
    SortColumn,
    OrderType,
    PageNumber,
    PageLimit,
    documentseries,
    documentnumber,
    persontypeid,
    isallperson,
    organizationid,
    oblastid,
    regionid,
    isnotcheckresult,
    isCheckResult,
    isphotoexists
  ) {
    return ApiService.print(
      `/Person/PrintStudent?personId=${personId}&personName=${personName}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&documentseries=${documentseries}&documentnumber=${documentnumber}&persontypeid=${persontypeid}&isallperson=${isallperson}&organizationid=${organizationid}&oblastid=${oblastid}&regionid=${regionid}&isnotcheckresult=${isnotcheckresult}&isCheckResult=${isCheckResult}&isphotoexists=${isphotoexists}`
    );
  },
  UpdateDataFromEGov(id) {
    return ApiService.get(`/Person/UpdateDataFromEGov?id=${id}`);
  },
  ChangeIdentityDocument(
    personId,
    identityDocumentId,
    documentSeries,
    documentNumber,
    pinfl
  ) {
    return ApiService.get(
      `/Person/ChangeIdentityDocument?personId=${personId}&identityDocumentId=${identityDocumentId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&pinfl=${pinfl}`
    );
  },
  UpdateExperienceFromMinTrud(personId, pinfl) {
    return ApiService.get(`/Person/UpdateExperienceFromMinTrud?personId=${personId}&pinfl=${pinfl}`);
  },
  UpdateDiplomFromMinVuz(personId, pinfl) {
    return ApiService.get(`/Person/UpdateDiplomFromMinVuz?personId=${personId}&pinfl=${pinfl}`);
  }
};
export default PersonService
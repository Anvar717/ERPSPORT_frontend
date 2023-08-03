import ApiService from './api.service'

const EmployeeManageService = {
	GetList(FullName, StartDateOfBirth, EndDateOfBirth, StartDate, EndDate, DepartmentID, HREmpAppointOrderTypeID, PositionID, SortColumn, OrderType, PageNumber, PageLimit, oblastid, regionid, organizationid, employmenttypeid, genderid, schooltypeid, organizationtypeid, fromemploymentrate, toemploymentrate, staffcategoryid) {
		return ApiService.get(`/EmployeeManage/GetList?FullName=${FullName}&StartDateOfBirth=${StartDateOfBirth}&EndDateOfBirth=${EndDateOfBirth}&StartDate=${StartDate}&EndDate=${EndDate}&DepartmentID=${DepartmentID}&HREmpAppointOrderTypeID=${HREmpAppointOrderTypeID}&PositionID=${PositionID}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&employmenttypeid=${employmenttypeid}&genderid=${genderid}&schooltypeid=${schooltypeid}&organizationtypeid=${organizationtypeid}&fromemploymentrate=${fromemploymentrate}&toemploymentrate=${toemploymentrate}&staffcategoryid=${staffcategoryid}`)
	},
	Print(FullName, StartDateOfBirth, EndDateOfBirth, StartDate, EndDate, DepartmentID, HREmpAppointOrderTypeID, PositionID, SortColumn, OrderType, PageNumber, PageLimit, oblastid, regionid, organizationid, employmenttypeid) {
		return ApiService.print(`/EmployeeManage/Print?FullName=${FullName}&StartDateOfBirth=${StartDateOfBirth}&EndDateOfBirth=${EndDateOfBirth}&StartDate=${StartDate}&EndDate=${EndDate}&DepartmentID=${DepartmentID}&HREmpAppointOrderTypeID=${HREmpAppointOrderTypeID}&PositionID=${PositionID}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&employmenttypeid=${employmenttypeid}`)
	},
	GetAllFree(FullName, DateOfBirth, inn, PersonID) {
		return ApiService.get(`/EmployeeManage/GetAllFree?FullName=${FullName}&DateOfBirth=${DateOfBirth}&inn=${inn}&PersonID=${PersonID}`)
	},
	GetEmployeeCard(personId, documentSeries, documentNumber, pinfl, Lang) {
		return ApiService.get(`/EmployeeManage/GetEmployeeCard?personId=${personId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&pinfl=${pinfl}&Lang=${Lang}`)
	},
	GetAllInHRAcceptanceWork(FullName, DateOfBirth, OnDate, DepartmentID, hrempappointordertypeid) {
		return ApiService.get(`/EmployeeManage/GetAllInHRAcceptanceWork?FullName=${FullName}&DateOfBirth=${DateOfBirth}&OnDate=${OnDate}&DepartmentID=${DepartmentID}&hrempappointordertypeid=${hrempappointordertypeid}`)
	},
	GetHRAcceptedRateCount(OnDate, DepartmentID, PositionID) {
		return ApiService.get(`/EmployeeManage/GetHRAcceptedRateCount?OnDate=${OnDate}&DepartmentID=${DepartmentID}&PositionID=${PositionID}`)
	},
	GetEmployeeListForComponent(OnDate, DepartmentID, HREmpAppointOrderTypeID, Search, SortColumn, OrderType, PageNumber, PageLimit, organizationid, isTeacher) {
		return ApiService.get(`/EmployeeManage/GetEmployeeListForComponent?OnDate=${OnDate}&DepartmentID=${DepartmentID}&HREmpAppointOrderTypeID=${HREmpAppointOrderTypeID}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}&organizationid=${organizationid}&isTeacher=${isTeacher}`)
	},
	GetEmployeeListForComponent1(OnDate, DepartmentID, positionid, HREmpAppointOrderTypeID, Search, SortColumn, OrderType, PageNumber, PageLimit) {
		return ApiService.get(`/EmployeeManage/GetEmployeeListForComponent?OnDate=${OnDate}&DepartmentID=${DepartmentID}&positionid=${positionid}&HREmpAppointOrderTypeID=${HREmpAppointOrderTypeID}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
	},
	GetTrenerReport(oblastid, regionid, organizationid, sporttypeclassifierid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
		return ApiService.get(`/EmployeeManage/GetTrenerReport?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&sporttypeclassifierid=${sporttypeclassifierid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
	},
	PrintTrenerReport(oblastid, regionid, organizationid, Search, SortColumn, OrderType, PageNumber, PageLimit) {
		return ApiService.print(`/EmployeeManage/PrintTrenerReport?oblastid=${oblastid}&regionid=${regionid}&organizationid=${organizationid}&Search=${Search}&SortColumn=${SortColumn}&OrderType=${OrderType}&PageNumber=${PageNumber}&PageLimit=${PageLimit}`)
	},
	PrintEmployeeCardWord(personId,documentSeries,documentNumber,pinfl) {
		return ApiService.print(`/EmployeeManage/PrintEmployeeCardWord?personId=${personId}&documentSeries=${documentSeries}&documentNumber=${documentNumber}&pinfl=${pinfl}`)
	}
	/* test */
}
export default EmployeeManageService
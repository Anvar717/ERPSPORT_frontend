import ApiService from './api.service'

const ReportEmployeesCountService = {
	GetEmployeesCount(ondate, oblastid, regionid, schoolSubjectId, organizationTypeId,schoolTypeId,schoolLegalFormId)
	{
		return ApiService.
			get(`/ReportLearningProcess/GetEmployeesCount?ondate=${ondate}&oblastid=${oblastid}&regionid=${regionid}&schoolSubjectId=${schoolSubjectId}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}`)
	},
	PrintStudentsCount(schoolyearid, oblastid,regionid) {
		return ApiService.print(`/ReportLearningProcess/PrintStudentsCount?
		schoolyearid=${schoolyearid}&
		oblastid=${oblastid}&
		regionid=${regionid}`)
	}
}

export default ReportEmployeesCountService
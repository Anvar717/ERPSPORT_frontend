import ApiService from './api.service'

const ReportStudentsCountService = {
	GetStudentsCount(schoolyearid, oblastid, regionid, organizationTypeId, schoolTypeId, schoolLegalFormId, educationLanguageId, genderId, schoolmanagementformid) {
		return ApiService.get(`/ReportLearningProcess/GetStudentsCount?
			schoolyearid=${schoolyearid}&
			oblastid=${oblastid}&
			regionid=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}&schoolmanagementformid=${schoolmanagementformid}`

		)
	},
	PrintStudentsCount(schoolyearid, oblastid, regionid, organizationTypeId, schoolTypeId, schoolLegalFormId, educationLanguageId, genderId) {
		return ApiService.print(`/ReportLearningProcess/PrintStudentsCount?
			schoolyearid=${schoolyearid}&
			oblastid=${oblastid}&
			regionid=${regionid}&organizationTypeId=${organizationTypeId}&schoolTypeId=${schoolTypeId}&schoolLegalFormId=${schoolLegalFormId}&educationLanguageId=${educationLanguageId}&genderId=${genderId}`

		)
	},
	RefreshStudentsCount() {
		return ApiService.get(`/ReportLearningProcess/RefreshStudentsCount`)
	},
	GetStudentsCountLastRefreshTime() {
		return ApiService.get('/ReportLearningProcess/GetStudentsCountLastRefreshTime')
	}
}

export default ReportStudentsCountService
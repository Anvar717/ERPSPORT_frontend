import ApiService from './api.service'

const AdmQuotaAndEstatementService = {
	GetSchoolAdmQuotaByOblastList(schoolyearid, ondate) {
		return ApiService.get(`/GetSchoolAdmQuotaByOblast/GetSchoolAdmQuotaByOblastList?schoolyearid=${schoolyearid}&ondate=${ondate}`)
	},
	GetSchoolAdmQuotaByRegionList(schoolyearid, ondate,oblastid) {
		return ApiService.get(`/GetSchoolAdmQuotaByOblast/GetSchoolAdmQuotaByRegionList?schoolyearid=${schoolyearid}&ondate=${ondate}&oblastid=${oblastid}`)
	},
	GetSchoolAdmQuotaBySchool(schoolyearid, ondate, oblastid,regionid) {
		return ApiService.get(`/GetSchoolAdmQuotaByOblast/GetSchoolAdmQuotaBySchool?schoolyearid=${schoolyearid}&ondate=${ondate}&oblastid=${oblastid}&regionid=${regionid}`)
	},
	GetSchoolAdmQuotaCount(schoolyearid, educationlanguageid, ondate, oblastid,regionid) {
		return ApiService.get(`/GetSchoolAdmQuotaByOblast/GetSchoolAdmQuotaCount?schoolyearid=${schoolyearid}&educationlanguageid=${educationlanguageid}&ondate=${ondate}&oblastid=${oblastid}&regionid=${regionid}`)
	},
	GetSchoolAdmQuotaAndEstatement(schoolyearid, ondate, educationlanguageid,oblastid,regionid,byschool,onlyreconstructed) {
		return ApiService.get(`/GetSchoolAdmQuotaByOblast/GetSchoolAdmQuotaAndEstatement?
			schoolyearid=${schoolyearid}&
			ondate=${ondate}&
			educationlanguageid=${educationlanguageid}&
			oblastid=${oblastid}&
			regionid=${regionid}&
			byschool=${byschool}&
			onlyreconstructed=${onlyreconstructed}`
		)
	},
    Print(schoolyearid, ondate, educationlanguageid,oblastid,regionid,byschool,onlyreconstructed) {
        return ApiService.print(`/GetSchoolAdmQuotaByOblast/PrintList?
		schoolyearid=${schoolyearid}&
		ondate=${ondate}&
		educationlanguageid=${educationlanguageid}&
		oblastid=${oblastid}&
		regionid=${regionid}&
		byschool=${byschool}&
		onlyreconstructed=${onlyreconstructed}`)
    },
}
export default AdmQuotaAndEstatementService
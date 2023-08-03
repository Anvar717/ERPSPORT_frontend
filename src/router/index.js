import Vue from "vue";
import Router from "vue-router";
import {
  TokenService
} from "../services/storage.service";
import i18n from "@/lang/lang";
import ApiService from "../services/api.service";
// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");
// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page403 = () => import("@/views/pages/Page403");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");
const Oferta = () => import("@/views/oferta.vue");
//Info

const SportItemOfExpense = () => import("@/views/Training/SportItemOfExpense/index");
const EditSportItemOfExpense = () =>
  import("@/views/Training/SportItemOfExpense/edit");

const EducationLanguage = () => import("@/views/Info/EducationLanguage/index");
const EditEducationLanguage = () =>
  import("@/views/Info/EducationLanguage/edit");

const OrgIntegrationInfo = () =>
  import("@/views/Info/OrgIntegrationInfo/index");
const EditOrgIntegrationInfo = () =>
  import("@/views/Info/OrgIntegrationInfo/edit");

const SchoolGrade = () => import("@/views/Info/SchoolGrade/index");
const EditSchoolGrade = () => import("@/views/Info/SchoolGrade/edit");

const SchoolGradeGroup = () => import("@/views/Info/SchoolGradeGroup/index");
const EditSchoolGradeGroup = () => import("@/views/Info/SchoolGradeGroup/edit");

const OrganizationType = () => import("@/views/Info/OrganizationType/index");
const EditOrganizationType = () => import("@/views/Info/OrganizationType/edit");

const SchoolSubject = () => import("@/views/Info/SchoolSubject/index");
const EditSchoolSubject = () => import("@/views/Info/SchoolSubject/edit");

const SchoolSubjectGroup = () =>
  import("@/views/Info/SchoolSubjectGroup/index");
const EditSchoolSubjectGroup = () =>
  import("@/views/Info/SchoolSubjectGroup/edit");

const SchoolType = () => import("@/views/Info/SchoolType/index");
const EditSchoolType = () => import("@/views/Info/SchoolType/edit");

const SchoolLegalForm = () => import("@/views/Info/SchoolLegalForm/index");
const EditSchoolLegalForm = () => import("@/views/Info/SchoolLegalForm/edit");

const SchoolManagementForm = () =>
  import("@/views/Info/SchoolManagementForm/index");
const EditSchoolManagementForm = () =>
  import("@/views/Info/SchoolManagementForm/edit");

const Currency = () => import("@/views/Info/Currency/index");
const EditCurrency = () => import("@/views/Info/Currency/edit");
const AthletePassportSeries = () => import("@/views/Info/AthletePassportSeries/index");
const EditAthletePassportSeries = () => import("@/views/Info/AthletePassportSeries/edit");

const Bank = () => import("@/views/Info/Bank/index");
const EditBank = () => import("@/views/Info/Bank/edit");

const CalculationKind = () => import("@/views/Info/CalculationKind/index");
const EditCalculationKind = () => import("@/views/Info/CalculationKind/edit");

const Country = () => import("@/views/Info/Country/index");
const EditCountry = () => import("@/views/Info/Country/edit");
const qurilish = () => import("@/views/Qurilish/qurilish/index");
const Street = () => import("@/views/Info/Street/index");
const EditStreet = () => import("@/views/Info/Street/edit");

const StreetHouse = () => import("@/views/Info/StreetHouse/index");
const EditStreetHouse = () => import("@/views/Info/StreetHouse/edit");

const StreetState = () => import("@/views/Info/StreetState/index");
const EditStreetState = () => import("@/views/Info/StreetState/edit");

const StreetHouseState = () => import("@/views/Info/StreetHouseState/index");
const EditStreetHouseState = () => import("@/views/Info/StreetHouseState/edit");

const CurrencyCourse = () => import("@/views/Info/CurrencyCourse/index");
const EditCurrencyCourse = () => import("@/views/Info/CurrencyCourse/edit");

const CurriculumType = () => import("@/views/Info/CurriculumType/index");
const EditCurriculumType = () => import("@/views/Info/CurriculumType/edit");

const StudentAdmissionType = () =>
  import("@/views/Info/StudentAdmissionType/index");
const EditStudentAdmissionType = () =>
  import("@/views/Info/StudentAdmissionType/edit");

const FixedMinimumValue = () => import("@/views/Info/FixedMinimumValue/index");
const EditFixedMinimumValue = () =>
  import("@/views/Info/FixedMinimumValue/edit");

const TaxBenefitType = () => import("@/views/Info/TaxBenefitType/index");
const EditTaxBenefitType = () => import("@/views/Info/TaxBenefitType/edit");

const Holiday = () => import("@/views/Info/Holiday/index");
const EditHoliday = () => import("@/views/Info/Holiday/edit");

const HomeSchoolingDisease = () =>
  import("@/views/Info/HomeSchoolingDisease/index");
const EditHomeSchoolingDisease = () =>
  import("@/views/Info/HomeSchoolingDisease/edit");

const HonoraryTitleType = () => import("@/views/Info/HonoraryTitleType/index");
const EditHonoraryTitleType = () =>
  import("@/views/Info/HonoraryTitleType/edit");

const IdentityDocument = () => import("@/views/Info/IdentityDocument/index");
const EditIdentityDocument = () => import("@/views/Info/IdentityDocument/edit");

const IdentityDocSeries = () => import("@/views/Info/IdentityDocSeries/index");
const EditIdentityDocSeries = () =>
  import("@/views/Info/IdentityDocSeries/edit");

const ItemOfExpense = () => import("@/views/Info/ItemOfExpense/index");
const EditItemOfExpense = () => import("@/views/Info/ItemOfExpense/edit");

const KinshipDegree = () => import("@/views/Info/KinshipDegree/index");
const EditKinshipDegree = () => import("@/views/Info/KinshipDegree/edit");

const Mfy = () => import("@/views/Info/Mfy/index");
const EditMfy = () => import("@/views/Info/Mfy/edit");

const MfyState = () => import("@/views/Info/MfyState/index");
const EditMfyState = () => import("@/views/Info/MfyState/edit");

const Nationality = () => import("@/views/Info/Nationality/index");
const EditNationality = () => import("@/views/Info/Nationality/edit");

const Oblast = () => import("@/views/Info/Oblast/index");
const EditOblast = () => import("@/views/Info/Oblast/edit");

const Oked = () => import("@/views/Info/Oked/index");
const EditOked = () => import("@/views/Info/Oked/edit");

const OlympiadWinnerType = () =>
  import("@/views/Info/OlympiadWinnerType/index");
const EditOlympiadWinnerType = () =>
  import("@/views/Info/OlympiadWinnerType/edit");

const Position = () => import("@/views/Info/Position/index");
const EditPosition = () => import("@/views/Info/Position/edit");

const PositionClassification = () =>
  import("@/views/Info/PositionClassification/index");
const EditPositionClassification = () =>
  import("@/views/Info/PositionClassification/edit");

const QualificationCategory = () =>
  import("@/views/Info/QualificationCategory/index");
const EditQualificationCategory = () =>
  import("@/views/Info/QualificationCategory/edit");

const Region = () => import("@/views/Info/Region/index");
const EditRegion = () => import("@/views/Info/Region/edit");

const RegionGroup = () => import("@/views/Info/RegionGroup/index");
const EditRegionGroup = () => import("@/views/Info/RegionGroup/edit");

const RegionState = () => import("@/views/Info/RegionState/index");
const EditRegionState = () => import("@/views/Info/RegionState/edit");

const RegionType = () => import("@/views/Info/RegionType/index");
const EditRegionType = () => import("@/views/Info/RegionType/edit");

const RoomType = () => import("@/views/Info/RoomType/index");
const EditRoomType = () => import("@/views/Info/RoomType/edit");

const SchoolGradeLetter = () => import("@/views/Info/SchoolGradeLetter/index");
const EditSchoolGradeLetter = () =>
  import("@/views/Info/SchoolGradeLetter/edit");

const SchoolGroupContingent = () =>
  import("@/views/Info/SchoolGroupContingent/index");
const EditSchoolGroupContingent = () =>
  import("@/views/Info/SchoolGroupContingent/edit");

const TimesheetIndicator = () =>
  import("@/views/Info/TimesheetIndicator/index");
const EditTimesheetIndicator = () =>
  import("@/views/Info/TimesheetIndicator/edit");

const IHGroup = () => import("@/views/Info/IHGroup/index");
const EditIHGroup = () => import("@/views/Info/IHGroup/edit");

const ExpenditureType = () => import("@/views/Info/ExpenditureType/index");
const EditExpenditureType = () => import("@/views/Info/ExpenditureType/edit");

const SchoolHolidayType = () => import("@/views/Info/SchoolHolidayType/index");
const EditSchoolHolidayType = () =>
  import("@/views/Info/SchoolHolidayType/edit");

const SchoolingShift = () => import("@/views/Info/SchoolingShift/index");
const EditSchoolingShift = () => import("@/views/Info/SchoolingShift/edit");

const SchoolYear = () => import("@/views/Info/SchoolYear/index");
const EditSchoolYear = () => import("@/views/Info/SchoolYear/edit");

const StaffCategory = () => import("@/views/Info/StaffCategory/index");
const EditStaffCategory = () => import("@/views/Info/StaffCategory/edit");

const StaffingIndicator = () => import("@/views/Info/StaffingIndicator/index");
const EditStaffingIndicator = () =>
  import("@/views/Info/StaffingIndicator/edit");

const StaffTypeBasicTariff = () =>
  import("@/views/Info/StaffTypeBasicTariff/index");
const EditStaffTypeBasicTariff = () =>
  import("@/views/Info/StaffTypeBasicTariff/edit");

const StudentExpulsionType = () =>
  import("@/views/Info/StudentExpulsionType/index");
const EditStudentExpulsionType = () =>
  import("@/views/Info/StudentExpulsionType/edit");

const SubjectOlympiad = () => import("@/views/Info/SubjectOlympiad/index");
const EditSubjectOlympiad = () => import("@/views/Info/SubjectOlympiad/edit");

const TariffScale = () => import("@/views/Info/TariffScale/index");
const EditTariffScale = () => import("@/views/Info/TariffScale/edit");

const TariffScaleCoef = () => import("@/views/Info/TariffScaleCoef/index");
const EditTariffScaleCoef = () => import("@/views/Info/TariffScaleCoef/edit");

const UnitOfMeasure = () => import("@/views/Info/UnitOfMeasure/index");
const EditUnitOfMeasure = () => import("@/views/Info/UnitOfMeasure/edit");

const TableColumnTemplate = () =>
  import("@/views/Info/TableColumnTemplate/index");
const EditTableColumnTemplate = () =>
  import("@/views/Info/TableColumnTemplate/edit");

const Kitchen = () => import("@/views/Info/Kitchen/index");
const EditKitchen = () => import("@/views/Info/Kitchen/edit");

const University = () => import("@/views/Info/University/index");
const EditUniversity = () => import("@/views/Info/University/edit");

const WorkSchedule = () => import("@/views/Info/WorkSchedule/index");
const EditWorkSchedule = () => import("@/views/Info/WorkSchedule/edit");

const EducationType = () => import("@/views/Info/EducationType");
const EditEducationType = () => import("@/views/Info/EducationType/edit");

const EducationFormType = () => import("@/views/Info/EducationFormType");
const EditEducationFormType = () =>
  import("@/views/Info/EducationFormType/edit");

const HigherEduClassifier = () => import("@/views/Info/HigherEduClassifier");
const EditHigherEduClassifier = () =>
  import("@/views/Info/HigherEduClassifier/edit");

const OrganizationBranch = () => import("@/views/Info/OrganizationBranch");
const EditOrganizationBranch = () =>
  import("@/views/Info/OrganizationBranch/edit");

//Inv

const Manufacturer = () => import("@/views/Inv/Manufacturer");
const EditManufacturer = () => import("@/views/Inv/Manufacturer/edit");
const PaGroup = () => import("@/views/Inv/PaGroup");
const EditPaGroup = () => import("@/views/Inv/PaGroup/edit");
const EquipmentConditionType = () =>
  import("@/views/Inv/EquipmentConditionType");
const EditEquipmentConditionType = () =>
  import("@/views/Inv/EquipmentConditionType/edit");
const RepairType = () => import("@/views/Inv/RepairType");
const EditRepairType = () => import("@/views/Inv/RepairType/edit");
const PaSubGroup = () => import("@/views/Inv/PaSubGroup");
const EditPaSubGroup = () => import("@/views/Inv/PaSubGroup/edit");
const ProductClassification = () => import("@/views/Inv/ProductClassification");
const EditProductClassification = () =>
  import("@/views/Inv/ProductClassification/edit");
const ResponsiblePerson = () => import("@/views/Inv/ResponsiblePerson");
const EditResponsiblePerson = () =>
  import("@/views/Inv/ResponsiblePerson/edit");
const SourceOfFinance = () => import("@/views/Inv/SourceOfFinance");
const EditSourceOfFinance = () => import("@/views/Inv/SourceOfFinance/edit");
const Brand = () => import("@/views/Inv/Brand");
const EditBrand = () => import("@/views/Inv/Brand/edit");
const PermanentAsset = () => import("@/views/Inv/PermanentAsset");
const EditPermanentAsset = () => import("@/views/Inv/PermanentAsset/edit");

const UzasboPermanentAsset = () => import("@/views/Inv/UzasboPermanentAsset");
const EditUzasboPermanentAsset = () =>
  import("@/views/Inv/UzasboPermanentAsset/edit");
//Aboniment
const SportFacilityType = () =>
  import("@/views/Aboniment/SportFacilityType/index");
const EditSportFacilityType = () =>
  import("@/views/Aboniment/SportFacilityType/edit");
const MemberShipType = () => import("@/views/Aboniment/MemberShipType/index");
const EditMemberShipType = () =>
  import("@/views/Aboniment/MemberShipType/edit");
const CircleSportType = () => import("@/views/Aboniment/CircleSportType");
const EditCircleSportType = () =>
  import("@/views/Aboniment/CircleSportType/edit");
const PrivilegeReason = () => import("@/views/Aboniment/PrivilegeReason");
const EditPrivilegeReason = () =>
  import("@/views/Aboniment/PrivilegeReason/edit");
const SportGroupCategoryType = () =>
  import("@/views/Aboniment/SportGroupCategoryType");
const EditSportGroupCategoryType = () =>
  import("@/views/Aboniment/SportGroupCategoryType/edit");
const PaymentScheduleType = () =>
  import("@/views/Aboniment/PaymentScheduleType");
const EditPaymentScheduleType = () =>
  import("@/views/Aboniment/PaymentScheduleType/edit");
const ServicePocket = () =>
  import("@/views/Aboniment/ServicePocket");
const EditServicePocket = () =>
  import("@/views/Aboniment/ServicePocket/edit");
const PersonMember = () =>
  import("@/views/Aboniment/PersonMember");
const EditPersonMember = () =>
  import("@/views/Aboniment/PersonMember/edit");
const PaymentFreeMemberShip = () =>
  import("@/views/Aboniment/PaymentFreeMemberShip/index");
const EditPaymentFreeMemberShip = () => import("@/views/Aboniment/PaymentFreeMemberShip/edit");
const PriceList = () =>
  import("@/views/Aboniment/PriceList/index");
const EditPriceList = () => import("@/views/Aboniment/PriceList/edit");

// Aboniment hujjatlari
const MemberShip = () =>
  import("@/views/AbonimentDocuments/MemberShip/index");
const EditMemberShip = () => import("@/views/AbonimentDocuments/MemberShip/edit");
const CloseMembership = () =>
  import("@/views/AbonimentDocuments/CloseMembership/index");
const EditCloseMembership = () => import("@/views/AbonimentDocuments/CloseMembership/edit");
const PaymentAccrual = () =>
  import("@/views/AbonimentDocuments/PaymentAccrual/index");
const EditPaymentAccrual = () => import("@/views/AbonimentDocuments/PaymentAccrual/edit");
const Payment = () =>
  import("@/views/AbonimentDocuments/Payment/index");
const EditPayment = () => import("@/views/AbonimentDocuments/Payment/edit");
const SportGroupMovement = () =>
  import("@/views/AbonimentDocuments/SportGroupMovement/index");
const EditSportGroupMovement = () => import("@/views/AbonimentDocuments/SportGroupMovement/edit");
const MissedDays = () => import("@/views/AbonimentDocuments/MissedDays/index");
const EditMissedDays = () =>
  import("@/views/AbonimentDocuments/MissedDays/edit");
const GuestRegistration = () =>
  import("@/views/AbonimentDocuments/GuestRegistration/index");
const EditGuestRegistration = () => import("@/views/AbonimentDocuments/GuestRegistration/edit");
const TourniquetDeviceLog = () =>
  import("@/views/AbonimentDocuments/TourniquetDeviceLog/index");

//Training
const SportTypeDivision = () =>
  import("@/views/Training/SportTypeDivision/index");
const EditSportTypeDivision = () =>
  import("@/views/Training/SportTypeDivision/edit");
const SportTypeGender = () => import("@/views/Training/SportTypeGender/index");
const EditSportTypeGender = () =>
  import("@/views/Training/SportTypeGender/edit");
const SportTypeRestriction = () => import("@/views/Training/SportTypeRestriction/index");
const EditSportTypeRestriction = () =>
  import("@/views/Training/SportTypeRestriction/edit");
const SportTypeDependence = () => import("@/views/Training/SportTypeDependence");
const EditSportTypeDependence = () =>
  import("@/views/Training/SportTypeDependence/edit");
const SportGrowthRate = () => import("@/views/Training/SportGrowthRate");
const EditSportGrowthRate = () =>
  import("@/views/Training/SportGrowthRate/edit");
const SportActivityType = () =>
  import("@/views/Training/SportActivityType");
const EditSportActivityType = () =>
  import("@/views/Training/SportActivityType/edit");
const SportSeason = () =>
  import("@/views/Training/SportSeason");
const EditSportSeason = () =>
  import("@/views/Training/SportSeason/edit");
const SportBranch = () =>
  import("@/views/Training/SportBranch");
const EditSportBranch = () =>
  import("@/views/Training/SportBranch/edit");
const SportCompetitionStepInfo = () =>
  import("@/views/Training/SportCompetitionStepInfo");
const EditSportCompetitionStepInfo = () =>
  import("@/views/Training/SportCompetitionStepInfo/edit");
const SportGroup = () =>
  import("@/views/Training/SportGroup");
const EditSportGroup = () =>
  import("@/views/Training/SportGroup/edit");
const SportTypeClassifier = () =>
  import("@/views/Training/SportTypeClassifier");
const EditSportTypeClassifier = () =>
  import("@/views/Training/SportTypeClassifier/edit");
const SportTitle = () =>
  import("@/views/Training/SportTitle");
const EditSportTitle = () =>
  import("@/views/Training/SportTitle/edit");
const SportLevel = () =>
  import("@/views/Training/SportLevel");
const EditSportLevel = () =>
  import("@/views/Training/SportLevel/edit");
import("@/views/Training/QualCategoryTrainingType/edit");
const QualCategoryTrainingType = () =>
  import("@/views/Training/QualCategoryTrainingType");
const EditQualCategoryTrainingType = () =>
  import("@/views/Training/QualCategoryTrainingType/edit");
import("@/views/Training/SportTypeGroup/edit");
const SportTypeGroup = () =>
  import("@/views/Training/SportTypeGroup");
const EditSportTypeGroup = () =>
  import("@/views/Training/SportTypeGroup/edit");

import("@/views/Training/SportLevelGroup/edit");
const SportLevelGroup = () =>
  import("@/views/Training/SportLevelGroup");
const EditSportLevelGroup = () =>
  import("@/views/Training/SportLevelGroup/edit");
const AnthropometricIndicator = () =>
  import("@/views/Training/AnthropometricIndicator");
const EditAnthropometricIndicator = () =>
  import("@/views/Training/AnthropometricIndicator/edit");
const PhysicalTrainingType = () => import("@/views/Training/PhysicalTrainingType");
const EditPhysicalTrainingType = () =>
  import("@/views/Training/PhysicalTrainingType/edit");
const AppealPurpose = () => import("@/views/Training/AppealPurpose");
const EditAppealPurpose = () =>
  import("@/views/Training/AppealPurpose/edit");

const OrganizationBuildingInfo = () => import("@/views/Training/OrganizationBuildingInfo");
const EditOrganizationBuildingInfo = () =>
  import("@/views/Training/OrganizationBuildingInfo/edit");



const SportEventCategory = () =>
  import("@/views/Training/SportEventCategory");
const EditSportEventCategory = () =>
  import("@/views/Training/SportEventCategory/edit");
const SportEventParticipant = () =>
  import("@/views/Training/SportEventParticipant");
const EditSportEventParticipant = () =>
  import("@/views/Training/SportEventParticipant/edit");
const SportEventType = () =>
  import("@/views/Training/SportEventType");
const EditSportEventType = () =>
  import("@/views/Training/SportEventType/edit");
const CompetitionType = () =>
  import("@/views/Training/CompetitionType");
const EditCompetitionType = () =>
  import("@/views/Training/CompetitionType/edit");
const CompetitionLevel = () =>
  import("@/views/Training/CompetitionLevel");
const EditCompetitionLevel = () =>
  import("@/views/Training/CompetitionLevel/edit");
const SportTeamSquadType = () =>
  import("@/views/Training/SportTeamSquadType");
const EditSportTeamSquadType = () =>
  import("@/views/Training/SportTeamSquadType/edit");
const SportEvent = () =>
  import("@/views/Training/SportEvent");
const EditSportEvent = () =>
  import("@/views/Training/SportEvent/edit");
const SportTeamType = () =>
  import("@/views/Training/SportTeamType");
const EditSportTeamType = () =>
  import("@/views/Training/SportTeamType/edit");
const SportRank = () =>
  import("@/views/Training/SportRank");
const EditSportRank = () =>
  import("@/views/Training/SportRank/edit");

const SportTeamSquadLevel = () =>
  import("@/views/Training/SportTeamSquadLevel");
const EditSportTeamSquadLevel = () =>
  import("@/views/Training/SportTeamSquadLevel/edit");


// Diplomqaa
const DiplomaSerial = () =>
  import("@/views/Diploma/DiplomaSerial/index.vue");
/////// Inv Document

const PermanentAssetIntake = () =>
  import("@/views/InvDocument/permanentassetintake");
const EditPermanentAssetIntake = () =>
  import("@/views/InvDocument/permanentassetintake/edit");

//Spo'rt Yo'nalishi

const FormingSportGroup = () =>
  import("@/views/SportYonalish/FormingSportGroup/index.vue");
const EditFormingSportGroup = () =>
  import("@/views/SportYonalish/FormingSportGroup/edit.vue");
const ViewFormingSportGroup = () =>
  import("@/views/SportYonalish/FormingSportGroup/view.vue");
const FormingTeamSquad = () =>
  import("@/views/SportYonalish/FormingTeamSquad/index.vue");
const EditFormingTeamSquad = () =>
  import("@/views/SportYonalish/FormingTeamSquad/edit.vue");
const ViewFormingTeamSquad = () =>
  import("@/views/SportYonalish/FormingTeamSquad/view.vue");

const SportTitleDocument = () =>
  import("@/views/SportYonalish/SportTitleDocument/index.vue");
  const StudentFinalMark = () =>
  import("@/views/SportYonalish/StudentFinalMark/index.vue");
  const StudentFinalMarkEdit = () =>
  import("@/views/SportYonalish/StudentFinalMark/edit.vue");
  const SubjectsInTheSchoolYear = () =>
  import("@/views/SportYonalish/SubjectsInTheSchoolYear/index.vue");
  const SubjectsInTheSchoolYearEdit = () =>
  import("@/views/SportYonalish/SubjectsInTheSchoolYear/edit.vue");
const EditSportTitleDocument = () =>
  import("@/views/SportYonalish/SportTitleDocument/edit.vue");
const AthleticAchievement = () =>
  import("@/views/SportYonalish/AthleticAchievement/index.vue");
const EditAthleticAchievement = () =>
  import("@/views/SportYonalish/AthleticAchievement/edit.vue");
const ViewAthleticAchievement = () =>
  import("@/views/SportYonalish/AthleticAchievement/view.vue");
const Anthropometric = () =>
  import("@/views/SportYonalish/Anthropometric/index.vue");
const EditAnthropometric = () =>
  import("@/views/SportYonalish/Anthropometric/edit.vue");
const ViewAnthropometric = () =>
  import("@/views/SportYonalish/Anthropometric/view.vue");
const Appeal = () =>
  import("@/views/SportYonalish/Appeal/index.vue");
const EditAppeal = () =>
  import("@/views/SportYonalish/Appeal/edit.vue");
const GetListForMOQ = () =>
  import("@/views/SportYonalish/GetListForMOQ/index");
const ViewGetListForMOQ = () =>
  import("@/views/SportYonalish/GetListForMOQ/view.vue");
const AppealResponse = () =>
  import("@/views/SportYonalish/AppealResponse/index.vue");
const SportStudentMovement = () =>
  import("@/views/SportYonalish/SportStudentMovement/index.vue");
const EditSportStudentMovement = () =>
  import("@/views/SportYonalish/SportStudentMovement/edit.vue");
const ViewSportStudentMovement = () =>
  import("@/views/SportYonalish/SportStudentMovement/view.vue");
const TrainingSchedule = () => import("@/views/SportYonalish/TrainingSchedule/index.vue")
const EditTrainingSchedule = () => import("@/views/SportYonalish/TrainingSchedule/edit.vue")
const ViewTrainingSchedule = () => import("@/views/SportYonalish/TrainingSchedule/view.vue")

//Kalendar reja
const CalendarPlan = () =>
  import("@/views/PlanCalendar/CalendarPlan/index.vue");
const EditCalendarPlan = () =>
  import("@/views/PlanCalendar/CalendarPlan/edit.vue");
const ViewCalendarPlan = () =>
  import("@/views/PlanCalendar/CalendarPlan/view.vue");
const AthletePreparingCompet = () =>
  import("@/views/SportYonalish/AthletePreparingCompet/index.vue");
const EditAthletePreparingCompet = () =>
  import("@/views/SportYonalish/AthletePreparingCompet/edit.vue");
const ViewAthletePreparingCompet = () =>
  import("@/views/SportYonalish/AthletePreparingCompet/view.vue");
const AthleteRoadMap = () =>
  import("@/views/SportYonalish/AthleteRoadMap/index.vue");
const EditAthleteRoadMap = () =>
  import("@/views/SportYonalish/AthleteRoadMap/edit.vue");
const ViewAthleteRoadMap = () =>
  import("@/views/SportYonalish/AthleteRoadMap/view.vue");
const SportCompetition = () =>
  import("@/views/SportYonalish/SportCompetition/index.vue");
const EditSportCompetition = () =>
  import("@/views/SportYonalish/SportCompetition/edit.vue");
const ViewSportCompetition = () =>
  import("@/views/SportYonalish/SportCompetition/view.vue");

//////////// AthletePassport

const AthletePassport = () =>
  import("@/views/SportsmanPassport/AthletePassport/index.vue");
const EditAthletePassport = () =>
  import("@/views/SportsmanPassport/AthletePassport/edit.vue");
const ViewAthletePassport = () =>
  import("@/views/SportsmanPassport/AthletePassport/view.vue");
const AthletePassportSendList = () =>
  import("@/views/SportsmanPassport/AthletePassportSendList/index.vue");
const ViewAthletePassportSendList = () =>
  import("@/views/SportsmanPassport/AthletePassportSendList/view.vue");

//StudentManagement

const ComissionMemberAssignment = () =>
  import("@/views/Document/ComissionMemberAssignment/index");
const EditComissionMemberAssignment = () =>
  import("@/views/Document/ComissionMemberAssignment/edit");
const AssessmentCriteria = () =>
  import("@/views/Document/AssessmentCriteria/index");
const EditAssessmentCriteria = () =>
  import("@/views/Document/AssessmentCriteria/edit");
const ViewAssessmentCriteria = () =>
  import("@/views/Document/AssessmentCriteria/view");
const SchoolAdmEStatement = () =>
  import("@/views/StudentManagement/SchoolAdmEStatement/index");
const EditSchoolAdmEStatement = () =>
  import("@/views/StudentManagement/SchoolAdmEStatement/edit");

const UploadFileSchoolAdmEStatement = () =>
  import("@/views/StudentManagement/SchoolAdmEStatement/uploadfile");
const SchoolAdmEStatementSend = () =>
  import("@/views/StudentManagement/SchoolAdmEStatement/indexsend");

const Contractor = () => import("@/views/Info/Contractor");
const EditContractor = () => import("@/views/Info/Contractor/edit");
const ReturnReasonType = () => import("@/views/Info/ReturnReasonType");
const EditReturnReasonType = () => import("@/views/Info/ReturnReasonType/edit");
const SportOrgRatingIndicator = () => import("@/views/SportRating/SportOrgRatingIndicator");
const EditSportOrgRatingIndicator = () => import("@/views/SportRating/SportOrgRatingIndicator/edit");
// const PhysicalTrainingType = () => import("@/views/Training/PhysicalTrainingType");
// const EditPhysicalTrainingType = () =>
//   import("@/views/Training/PhysicalTrainingType/edit");
const ComissionMemberType = () => import("@/views/Training/ComissionMemberType");
const EditComissionMemberType = () =>
  import("@/views/Training/ComissionMemberType/edit");


const SchoolGradeAgeLimit = () =>
  import("@/views/StudentManagement/SchoolGradeAgeLimit/index");
const EditSchoolGradeAgeLimit = () =>
  import("@/views/StudentManagement/SchoolGradeAgeLimit/edit");
const SchoolAdmissionQuota = () =>
  import("@/views/StudentManagement/SchoolAdmissionQuota/index");
const SchoolAdmissionQuotaSend = () =>
  import("@/views/StudentManagement/SchoolAdmissionQuota/indexsend");
const EditSchoolAdmissionQuota = () =>
  import("@/views/StudentManagement/SchoolAdmissionQuota/edit");
const SchoolAdmission = () =>
  import("@/views/StudentManagement/SchoolAdmission/index");
const EditSchoolAdmission = () =>
  import("@/views/StudentManagement/SchoolAdmission/edit");
const ViewSchoolAdmission = () =>
  import("@/views/StudentManagement/SchoolAdmission/view");
const ImportDocument = () =>
  import("@/views/StudentManagement/ImportDocument/index");

const StudentExpulsion = () =>
  import("@/views/StudentManagement/StudentExpulsion/index");
const EditStudentExpulsion = () =>
  import("@/views/StudentManagement/StudentExpulsion/edit");
const ViewStudentExpulsion = () =>
  import("@/views/StudentManagement/StudentExpulsion/view.vue");
const StudentGradeMovement = () =>
  import("@/views/StudentManagement/StudentGradeMovement/index");
const EditStudentGradeMovement = () =>
  import("@/views/StudentManagement/StudentGradeMovement/edit");

const StudentHomeSchooling = () =>
  import("@/views/StudentManagement/StudentHomeSchooling/index");
const EditStudentHomeSchooling = () =>
  import("@/views/StudentManagement/StudentHomeSchooling/edit");

//HRManagement
const HrAcceptanceWork = () =>
  import("@/views/HRManagement/HrAcceptanceWork/index");
const EditHrAcceptanceWork = () =>
  import("@/views/HRManagement/HrAcceptanceWork/edit");

const HREmpLeaveOrder = () =>
  import("@/views/HRManagement/HREmpLeaveOrder/index");
const EditHREmpLeaveOrder = () =>
  import("@/views/HRManagement/HREmpLeaveOrder/edit");

const HrEmpSendTrain = () =>
  import("@/views/HRManagement/HrEmpSendTrain/index");
const EditHrEmpSendTrain = () =>
  import("@/views/HRManagement/HrEmpSendTrain/edit");

const HREmpSickLeave = () =>
  import("@/views/HRManagement/HREmpSickLeave/index");
const EditHREmpSickLeave = () =>
  import("@/views/HRManagement/HREmpSickLeave/edit");

const HrRecallLeave = () => import("@/views/HRManagement/HrRecallLeave/index");
const EditHrRecallLeave = () =>
  import("@/views/HRManagement/HrRecallLeave/edit");

const HrWorkDayOff = () => import("@/views/HRManagement/HrWorkDayOff/index");
const EditHrWorkDayOff = () => import("@/views/HRManagement/HrWorkDayOff/edit");

const HROrgStructure = () =>
  import("@/views/HRManagement/HROrgStructure/index");
const EditHROrgStructure = () =>
  import("@/views/HRManagement/HROrgStructure/edit");

const HRTempCalcKind = () =>
  import("@/views/HRManagement/HRTempCalcKind/index");
const EditHRTempCalcKind = () =>
  import("@/views/HRManagement/HRTempCalcKind/edit");

const PlannedCalculation = () =>
  import("@/views/HRManagement/PlannedCalculation/index");
const EditPlannedCalculation = () =>
  import("@/views/HRManagement/PlannedCalculation/edit");

const MassPlannedCalculation = () =>
  import("@/views/HRManagement/MassPlannedCalculation/index");
const EditMassPlannedCalculation = () =>
  import("@/views/HRManagement/MassPlannedCalculation/edit");

const TaxBenefit = () => import("@/views/HRManagement/TaxBenefit/index");
const EditTaxBenefit = () => import("@/views/HRManagement/TaxBenefit/edit");

// doc
const CustomJobLog = () => import("@/views/Document/CustomJobLog/index");
const EditCustomJobLog = () => import("@/views/Document/CustomJobLog/edit");

const PlanPersonCount = () => import("@/views/Document/PlanPersonCount/index");
const EditPlanPersonCount = () =>
  import("@/views/Document/PlanPersonCount/edit");

const AdmissionPrivilege = () => import("@/views/Document/AdmissionPrivilege/index");
const EditAdmissionPrivilege = () =>
  import("@/views/Document/AdmissionPrivilege/edit");

const Curriculum = () => import("@/views/Document/Curriculum/index");
const EditCurriculum = () => import("@/views/Document/Curriculum/edit");
const ViewCurriculum = () => import("@/views/Document/Curriculum/view");

const StudentSchoolMovement = () =>
  import("@/views/Document/StudentSchoolMovement/index");
const EditStudentSchoolMovement = () =>
  import("@/views/Document/StudentSchoolMovement/edit");
const ViewStudentSchoolMovement = () =>
  import("@/views/Document/StudentSchoolMovement/view");

const AppointDirFondAllwnc = () =>
  import("@/views/Document/AppointDirFondAllwnc/index");
const EditAppointDirFondAllwnc = () =>
  import("@/views/Document/AppointDirFondAllwnc/edit");

const AppointEmpAllWnc = () =>
  import("@/views/Document/AppointEmpAllWnc/index");
const EditAppointEmpAllWnc = () =>
  import("@/views/Document/AppointEmpAllWnc/edit");

const AppointEmpSalary = () =>
  import("@/views/Document/AppointEmpSalary/index");
const EditAppointEmpSalary = () =>
  import("@/views/Document/AppointEmpSalary/edit");

const TeacherReTraining = () =>
  import("@/views/Document/TeacherReTraining/index");
const EditTeacherReTraining = () =>
  import("@/views/Document/TeacherReTraining/edit");
const ViewTeacherReTraining = () =>
  import("@/views/Document/TeacherReTraining/view");
const SendTeacherReTraining = () =>
  import("@/views/Document/TeacherReTraining/send");

const Tariffication = () => import("@/views/Document/Tariffication/index");
const EditTariffication = () => import("@/views/Document/Tariffication/edit");

const AppointQualCategory = () =>
  import("@/views/Document/AppointQualCategory/index");
const EditAppointQualCategory = () =>
  import("@/views/Document/AppointQualCategory/edit");
const ViewAppointQualCategory = () =>
  import("@/views/Document/AppointQualCategory/view");
const AppointQualCategory1 = () =>
  import("@/views/Document/AppointQualCategory1/index");
const EditAppointQualCategory1 = () =>
  import("@/views/Document/AppointQualCategory1/edit");
const ViewAppointQualCategory1 = () =>
  import("@/views/Document/AppointQualCategory1/view");
const AppointQualCategory2 = () =>
  import("@/views/Document/AppointQualCategory2/index");
const EditAppointQualCategory2 = () =>
  import("@/views/Document/AppointQualCategory2/edit");
const ViewAppointQualCategory2 = () =>
  import("@/views/Document/AppointQualCategory2/view");
const SportCoachCertificate = () =>
  import("@/views/Document/SportCoachCertificate/index");
const EditSportCoachCertificate = () =>
  import("@/views/Document/SportCoachCertificate/edit");
const ViewSportCoachCertificate = () =>
  import("@/views/Document/SportCoachCertificate/view");

const BasicTariffRate = () => import("@/views/Document/BasicTariffRate/index");
const EditBasicTariffRate = () =>
  import("@/views/Document/BasicTariffRate/edit");
const ViewBasicTariffRate = () =>
  import("@/views/Document/BasicTariffRate/view");

const Budget = () => import("@/views/Document/Budget/index");
const EditBudget = () => import("@/views/Document/Budget/edit");

const CalcLeavePay = () => import("@/views/Document/CalcLeavePay/index");
const EditCalcLeavePay = () => import("@/views/Document/CalcLeavePay/edit");

const CalcSendTrain = () => import("@/views/Document/CalcSendTrain/index");
const EditCalcSendTrain = () => import("@/views/Document/CalcSendTrain/edit");

const CertForeignLang = () => import("@/views/Document/CertForeignLang/index");
const EditCertForeignLang = () =>
  import("@/views/Document/CertForeignLang/edit");
const ViewCertForeignLang = () =>
  import("@/views/Document/CertForeignLang/view");
const AllowedSchoolGradeMove = () =>
  import("@/views/Info/AllowedSchoolGradeMove/index");
const EditAllowedSchoolGradeMove = () =>
  import("@/views/Info/AllowedSchoolGradeMove/edit");

const AllowedTeachingSubject = () =>
  import("@/views/Document/AllowedTeachingSubject/index");
const EditAllowedTeachingSubject = () =>
  import("@/views/Document/AllowedTeachingSubject/edit");
const ViewAllowedTeachingSubject = () =>
  import("@/views/Document/AllowedTeachingSubject/view");


const CertForeignLangType = () =>
  import("@/views/Document/CertForeignLangType/index");
const EditCertForeignLangType = () =>
  import("@/views/Document/CertForeignLangType/edit");

const AllowanceByRegion = () =>
  import("@/views/Document/AllowanceByRegion/index");
const EditAllowanceByRegion = () =>
  import("@/views/Document/AllowanceByRegion/edit");

const AllowanceFarRegion = () =>
  import("@/views/Document/AllowanceFarRegion/index");
const EditAllowanceFarRegion = () =>
  import("@/views/Document/AllowanceFarRegion/edit");

const AllowanceWorkExperience = () =>
  import("@/views/Document/AllowanceWorkExperience/index");
const EditAllowanceWorkExperience = () =>
  import("@/views/Document/AllowanceWorkExperience/edit");

const CurriculumOrgschGrade = () =>
  import("@/views/Document/CurriculumOrgschGrade/index");
const EditCurriculumOrgschGrade = () =>
  import("@/views/Document/CurriculumOrgschGrade/edit");

const HeadOrgSchoolGrade = () =>
  import("@/views/Document/HeadOrgSchoolGrade/index");
const EditHeadOrgSchoolGrade = () =>
  import("@/views/Document/HeadOrgSchoolGrade/edit");
const OrgSchoolGradeControl = () =>
  import("@/views/Document/OrgSchoolGradeControl/index");
const EditOrgSchoolGradeControl = () =>
  import("@/views/Document/OrgSchoolGradeControl/edit");
const ViewOrgSchoolGradeControl = () =>
  import("@/views/Document/OrgSchoolGradeControl/view");
const ViewHeadOrgSchoolGrade = () =>
  import("@/views/Document/HeadOrgSchoolGrade/view");
const HeadOrgSchoolSubject = () =>
  import("@/views/Document/HeadOrgSchoolSubject/index");
const EditHeadOrgSchoolSubject = () =>
  import("@/views/Document/HeadOrgSchoolSubject/edit");
const Headroom = () => import("@/views/Document/Headroom/index");
const EditHeadroom = () => import("@/views/Document/Headroom/edit");

const HonoraryTitle = () => import("@/views/Document/HonoraryTitle/index");
const EditHonoraryTitle = () => import("@/views/Document/HonoraryTitle/edit");

const OlympiadWinner = () => import("@/views/Document/OlympiadWinner/index");
const EditOlympiadWinner = () => import("@/views/Document/OlympiadWinner/edit");

const OrgSchoolParameter = () =>
  import("@/views/Document/OrgSchoolParameter/index");
const EditOrgSchoolParameter = () =>
  import("@/views/Document/OrgSchoolParameter/edit");

const SchHourlyPayRate = () =>
  import("@/views/Document/SchHourlyPayRate/index");
const EditSchHourlyPayRate = () =>
  import("@/views/Document/SchHourlyPayRate/edit");

const HrReplacementHour = () =>
  import("@/views/Document/HrReplacementHour/index");
const EditHrReplacementHour = () =>
  import("@/views/Document/HrReplacementHour/edit");

const HRTimeSheet = () => import("@/views/Document/HRTimeSheet/index");
const EditHRTimeSheet = () => import("@/views/Document/HRTimeSheet/edit");
const TabRowHRTimeSheet = () => import("@/views/Document/HRTimeSheet/tabrow");
const HRTimeSheetSentList = () =>
  import("@/views/Document/HRTimeSheetSentList");

const HRTimeSheetEdu = () => import("@/views/Document/HRTimeSheetEdu/index");
const EditHRTimeSheetEdu = () => import("@/views/Document/HRTimeSheetEdu/edit");
const HRTimeSheetEduSentList = () =>
  import("@/views/Document/HRTimeSheetEduSentList");

const SchoolHoliday = () => import("@/views/Document/SchoolHoliday/index");
const EditSchoolHoliday = () => import("@/views/Document/SchoolHoliday/edit");

const SentBudget = () => import("@/views/Document/SentBudget/index");
const EditSentBudget = () => import("@/views/Document/SentBudget/edit");

const Staffing = () => import("@/views/Document/Staffing/index");
const EditStaffing = () => import("@/views/Document/Staffing/edit");
const StaffingTemplate = () =>
  import("@/views/Document/StaffingTemplate/index");
const EditStaffingTemplate = () =>
  import("@/views/Document/StaffingTemplate/edit");

const TarifficationTitle = () =>
  import("@/views/Document/TarifficationTitle/index");
const EditTarifficationTitle = () =>
  import("@/views/Document/TarifficationTitle/edit");
const ViewTarifficationTitle = () =>
  import("@/views/Document/TarifficationTitle/view");

const TarifficationTitleForControl = () =>
  import("@/views/Document/TarifficationTitleForControl/index");
const ViewTarifficationTitleForControl = () =>
  import("@/views/Document/TarifficationTitleForControl/view");

const TeacherHour = () => import("@/views/Document/TeacherHour/index");
const EditTeacherHour = () => import("@/views/Document/TeacherHour/edit");

const GroupFormByEduDirection = () =>
  import("@/views/Document/GroupFormByEduDirection/index");
const EditGroupFormByEduDirection = () =>
  import("@/views/Document/GroupFormByEduDirection/edit");

const Room = () => import("@/views/PersonalInfo/Room/index");
const EditRoom = () => import("@/views/PersonalInfo/Room/edit");

const OrgSchoolGrade = () =>
  import("@/views/PersonalInfo/OrgSchoolGrade/index");
const EditOrgSchoolGrade = () =>
  import("@/views/PersonalInfo/OrgSchoolGrade/edit");

const InventoryHolding = () =>
  import("@/views/PersonalInfo/InventoryHolding/index");
const EditInventoryHolding = () =>
  import("@/views/PersonalInfo/InventoryHolding/edit");

const MenuType = () => import("@/views/PersonalInfo/MenuType/index");
const EditMenuType = () => import("@/views/PersonalInfo/MenuType/edit");

const DishGroup = () => import("@/views/PersonalInfo/DishGroup/index");
const EditDishGroup = () => import("@/views/PersonalInfo/DishGroup/edit");

const DietTable = () => import("@/views/PersonalInfo/DietTable/index");
const EditDietTable = () => import("@/views/PersonalInfo/DietTable/edit");

const Dish = () => import("@/views/PersonalInfo/Dish/index");
const EditDish = () => import("@/views/PersonalInfo/Dish/edit");

const Department = () => import("@/views/PersonalInfo/Department/index");
const EditDepartment = () => import("@/views/PersonalInfo/Department/edit");

const ProblemEdu = () => import("@/views/PersonalInfo/ProblemEdu/index");
const EditProblemEdu = () => import("@/views/PersonalInfo/ProblemEdu/edit");

const Person = () => import("@/views/PersonalInfo/Person/index");
const EditPerson = () => import("@/views/PersonalInfo/Person/edit");

const OrgStateInfo = () => import("@/views/PersonalInfo/OrgStateInfo/index");
const EditOrgStateInfo = () => import("@/views/PersonalInfo/OrgStateInfo/edit");
const GroupSheet = () => import("@/views/PersonalInfo/GroupSheet/index");
const ExamGroupCountCompare = () =>
  import("@/views/PersonalInfo/ExamGroupCountCompare/index");
const HigHerEduClassiFierCountByGroup = () =>
  import("@/views/PersonalInfo/HigHerEduClassiFierCountByGroup/index");
const EditGroupSheet = () => import("@/views/PersonalInfo/GroupSheet/edit");
const ViewGroupSheet = () => import("@/views/PersonalInfo/GroupSheet/view");
const ExamGroup = () => import("@/views/PersonalInfo/ExamGroup/index");
const EditExamGroup = () => import("@/views/PersonalInfo/ExamGroup/edit");

const Contract = () => import("@/views/PersonalInfo/Contract/index");
const EditContract = () => import("@/views/PersonalInfo/Contract/edit");

const IHIncome = () => import("@/views/PersonalInfo/IHIncome/index");
const EditIHIncome = () => import("@/views/PersonalInfo/IHIncome/edit");

const IHExpenditure = () => import("@/views/PersonalInfo/IHExpenditure/index");
const EditIHExpenditure = () =>
  import("@/views/PersonalInfo/IHExpenditure/edit");

const IHMovement = () => import("@/views/PersonalInfo/IHMovement/index");
const EditIHMovement = () => import("@/views/PersonalInfo/IHMovement/edit");

const HigherEduDiplom = () => import("@/views/Document/HigherEduDiplom/index");
const EditHigherEduDiplom = () =>
  import("@/views/Document/HigherEduDiplom/edit");
const ViewHigherEduDiplom = () =>
  import("@/views/Document/HigherEduDiplom/view");

const IHMenu = () => import("@/views/PersonalInfo/IHMenu/index");
const EditIHMenu = () => import("@/views/PersonalInfo/IHMenu/edit");

const SalaryCalc = () => import("@/views/Document/SalaryCalc");
const EditSalaryCalc = () => import("@/views/Document/SalaryCalc/edit");

const PayrollSheet = () => import("@/views/Document/PayrollSheet");
const EditPayrollSheet = () => import("@/views/Document/PayrollSheet/edit");

const TransitionSchoolYear = () =>
  import("@/views/StudentManagement/TransitionSchoolYear/index.vue");
const EditTransitionSchoolYear = () =>
  import("@/views/StudentManagement/TransitionSchoolYear/edit.vue");
const ViewTransitionSchoolYear = () =>
  import("@/views/StudentManagement/TransitionSchoolYear/view.vue");
//Reports
const GetPermanentAssetCard = () =>
  import("@/views/Reports/GetPermanentAssetCard/index");
const SportTitleDocumentReport = () =>
  import("@/views/Reports/SportTitleDocumentReport/index");
  const NumberOfSportTypeStudents = () =>
  import("@/views/Reports/NumberOfSportTypeStudents/index");
const StudentList = () => import("@/views/Reports/StudentList/index");
const EmployeeList = () => import("@/views/Reports/EmployeeList/index");

const GetEmployeeForAdmin = () => import("@/views/Reports/GetEmployeeForAdmin/index");
const UnpaidHREmpleaveOrder = () =>
  import("@/views/Reports/UnpaidHREmpleaveOrder/index");
const UnpaidHREmpSickLeave = () =>
  import("@/views/Reports/UnpaidHREmpSickLeave/index");
const AdmQuotaByOblastList = () =>
  import("@/views/Reports/AdmQuotaByOblastList/index");
const SchoolAdmQuotaCount = () =>
  import("@/views/Reports/SchoolAdmQuotaCount/index");
const AdmQuotaByRegionList = () =>
  import("@/views/Reports/AdmQuotaByRegionList/index");
const AdmQuotaBySchoolList = () =>
  import("@/views/Reports/AdmQuotaBySchoolList/index");
const AdmQuotaAndEstatement = () =>
  import("@/views/Reports/AdmQuotaAndEstatement/index");
const ReportEmployeesCount = () =>
  import("@/views/Reports/ReportEmployeesCount/index");
const ReportEmployeesCou = () =>
  import("@/views/Reports/ReportEmployeesCou/index");
const ReportTarifficationData = () =>
  import("@/views/Reports/ReportTarifficationData/index");
const ReportTheAmountPerStudent = () =>
  import("@/views/Reports/ReportTheAmountPerStudent/index");
const ReportVacancy = () => import("@/views/Reports/ReportVacancy/index");
const OnlineQueueInfo = () => import("@/views/Reports/OnlineQueueInfo/index");
const OnlineRating = () => import("@/views/Reports/OnlineRating/index");
const ReportOnlinequeueInfo = () =>
  import("@/views/Reports/ReportOnlinequeueInfo/index");
const TotalCurriculum = () => import("@/views/Reports/TotalCurriculum/index");
const ReportGraduatedFromGrade11 = () =>
  import("@/views/Reports/ReportGraduatedFromGrade11/index");
const StudentCard = () => import("@/views/Reports/StudentCard/index");
const OtherStudentsCount = () =>
  import("@/views/Reports/OtherStudentsCount/index");
const EmployeeCard = () => import("@/views/Reports/EmployeeCard/index");
const OrganizationCard = () => import("@/views/Reports/OrganizationCard/index");
const GetUnpaidHrAcceptanceWorkList = () =>
  import("@/views/Reports/GetUnpaidHr/index");
const ReportColorRatingOfSchools = () =>
  import("@/views/Reports/ReportColorRatingOfSchools/index");
const ReportStudentMovement = () =>
  import("@/views/Reports/ReportStudentMovement/index");
const GetGraduatedFromGrade11Count = () =>
  import("@/views/Reports/GetGraduatedFromGrade11Count/index");
const ReportHigherEduDiplom = () =>
  import("@/views/Reports/ReportHigherEduDiplom/index");
const ReportSchoolInfo = () =>
  import("@/views/Reports/ReportSchoolInfo/index.vue");
const HeadOrgSchoolGradeCount = () =>
  import("@/views/Reports/HeadOrgSchoolGradeCount/index.vue");
const GetOrgSchoolGradeCountByLanguage = () =>
  import("@/views/Reports/GetOrgSchoolGradeCountByLanguage/index.vue");
const GetSchoolStudentCountBySchoolGrade = () =>
  import("@/views/Reports/GetSchoolStudentCountBySchoolGrade/index.vue");
const GetSchoolCountBySchoolYearReady = () =>
  import("@/views/Reports/GetSchoolCountBySchoolYearReady/index.vue");
const GetStudentsCountInSchool = () =>
  import("@/views/Reports/GetStudentsCountInSchool/index.vue");
const GetSchoolCountByOrgType = () =>
  import("@/views/Reports/GetSchoolCountByOrgType/index.vue");
const EstatementStudentsCountInSchool = () =>
  import("@/views/Reports/EstatementStudentsCountInSchool/index.vue");
const ComparedAdmChildCount = () =>
  import("@/views/Reports/ComparedAdmChildCount/index.vue");
const CovidVacEmployeesCount = () =>
  import("@/views/Reports/CovidVacEmployeesCount/index.vue");
//ReportIH
const IHRest = () => import("@/views/ReportIH/IHRest/index");
const IHTurnOver = () => import("@/views/ReportIH/IHTurnOver/index");
//KeyIndicators
const ReportOperatingSchools = () =>
  import("@/views/KeyIndicators/ReportOperatingSchools/index");
const MovedSchoolCount = () =>
  import("@/views/KeyIndicators/MovedSchoolCount/index");
const SchoolsOfEducation = () =>
  import("@/views/KeyIndicators/SchoolsOfEducation/index");
const LocationOfSchools = () =>
  import("@/views/KeyIndicators/LocationOfSchools/index");
const ReportStudentsCount = () =>
  import("@/views/KeyIndicators/ReportStudentsCount/index");
const SequenceOfEducation = () =>
  import("@/views/KeyIndicators/SequenceOfEducation/index");
const StudentCapacity = () =>
  import("@/views/KeyIndicators/StudentCapacity/index");
const SchoolCoefficient = () =>
  import("@/views/KeyIndicators/SchoolCoefficient/index");
const HighSchoolGroups = () =>
  import("@/views/KeyIndicators/HighSchoolGroups/index");
const GroupsOfNumberClass = () =>
  import("@/views/KeyIndicators/GroupsOfNumberClass/index");
const AcrossCities = () => import("@/views/KeyIndicators/AcrossCities/index");
const SpecializedSchool = () =>
  import("@/views/KeyIndicators/SpecializedSchool/index");
const GetPersonAndStudentPlan = () =>
  import("@/views/KeyIndicators/GetPersonAndStudentPlan/index");
const GetTeachersCountInSchool = () =>
  import("@/views/KeyIndicators/GetTeachersCountInSchool/index");

const NumberOfEducational = () =>
  import("@/views/KeyIndicators/NumberOfEducational/index");
const BranchesOfSchools = () =>
  import("@/views/KeyIndicators/BranchesOfSchools/index");
const ForienLanguage = () =>
  import("@/views/KeyIndicators/ForienLanguage/index");
const PermanentAssetReport = () =>
  import("@/views/Inv/PermanentAssetReport/index");

// Sportrating
const SportOrgRatingCriteria = () =>
  import("@/views/SportRating/SportOrgRatingCriteria/index");
const EditSportOrgRatingCriteria = () =>
  import("@/views/SportRating/SportOrgRatingCriteria/edit");
  const ViewSportOrgRatingCriteria = () =>
  import("@/views/SportRating/SportOrgRatingCriteria/view");
  const SportOrgRating = () =>
  import("@/views/SportRating/SportOrgRating/index");
const EditSportOrgRating = () =>
  import("@/views/SportRating/SportOrgRating/edit");
const ViewSportOrgRating = () =>
  import("@/views/SportRating/SportOrgRating/view");
  const SentSportOrgRating = () =>
  import("@/views/SportRating/SentSportOrgRating/index");
const ViewSentSportOrgRating = () =>
  import("@/views/SportRating/SentSportOrgRating/view");


///Bank Reports
const ReportTreasBankDocumentByDebitCredit = () =>
  import("@/views/BankReports/ReportTreasBankDocumentByDebitCredit/index");

const TreasBankDocument = () =>
  import("@/views/BankReports/TreasBankDocument/index");

//////AbonimentReport

const sportcirclereport = () => import("@/views/ReportAboniment/sportcirclereport/index.vue");
const GetTourniquetDevicelogByGuest = () => import("@/views/ReportAboniment/GetTourniquetDevicelogByGuest/index.vue");
const personsportcirclereport = () => import("@/views/ReportAboniment/personsportcirclereport/index.vue");
const studentsportcirclereport = () => import("@/views/ReportAboniment/studentsportcirclereport/index.vue");
const TourniquetDevicelogByTerritory = () => import("@/views/ReportAboniment/TourniquetDevicelogByTerritory/index.vue");
const StudentTourniquetDevicelogByTerritory = () => import("@/views/ReportAboniment/StudentTourniquetDevicelogByTerritory/index.vue");
const PersonTourniquetDevicelogByTerritory = () => import("@/views/ReportAboniment/PersonTourniquetDevicelogByTerritory/index.vue");
const membershippaymentreportlist = () => import("@/views/ReportAboniment/membershippaymentreportlist/index.vue");
const membershippaymentreportcount = () => import("@/views/ReportAboniment/membershippaymentreportcount/index.vue");
const gettourniquetenterencecount = () => import("@/views/ReportAboniment/gettourniquetenterencecount/index.vue");

//SportReport
const FormingGroupDate = () =>
  import("@/views/SportReport/FormingGroupDate/index");
const AnthropomentricReportBySportsmen = () =>
  import("@/views/SportReport/AnthropomentricReportBySportsmen/index");
const SportStudentManageList = () =>
  import("@/views/SportReport/SportStudentManageList/index");
const ReportStudentTitleList = () =>
  import("@/views/SportReport/ReportStudentTitleList/index");


const GetReportAthleticAchievement = () =>
  import("@/views/SportReport/GetReportAthleticAchievement/index");
const ReportSportTitleDocument = () =>
  import("@/views/SportReport/ReportSportTitleDocument/index");
const GetAnthropometricCount = () =>
  import("@/views/SportReport/GetAnthropometricCount/index");
const GetReportSportCoachCertificateCount = () =>
  import("@/views/SportReport/GetReportSportCoachCertificateCount/index");
const GetReportSportCoachCertificateList = () =>
  import("@/views/SportReport/GetReportSportCoachCertificateList/index");
const GetReportAppointQualCategoryCoachCount = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryCoachCount/index");
const GetReportAppointQualCategoryInstructorCount = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryInstructorCount/index");
const GetReportAppointQualCategoryCoachList = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryCoachList/index");
const GetReportAppointQualCategoryInstrcutorList = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryInstrcutorList/index");
const GetReportAppointQualCategoryJuryCount = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryJuryCount/index");
const GetReportAppointQualCategoryJuryList = () =>
  import("@/views/SportReport/GetReportAppointQualCategoryJuryList/index");
const ReportCoachPortfolioCount = () =>
  import("@/views/SportReport/ReportCoachPortfolioCount/index");
const GetReportAthleticAchievementCount = () =>
  import("@/views/SportReport/GetReportAthleticAchievementCount/index");
const GetReportAthleticAchievementList = () =>
  import("@/views/SportReport/GetReportAthleticAchievementList/index");
const ReportFormingTeamSquad = () =>
  import("@/views/SportReport/ReportFormingTeamSquad/index");
const ReportFormingTeamSquadSportsman = () =>
  import("@/views/SportReport/ReportFormingTeamSquadSportsman/index");
const ReportAppointQualCategoryCoachCount = () =>
  import("@/views/SportReport/ReportAppointQualCategoryCoachCount/index");
const ReportAthletePassportCount = () =>
  import("@/views/SportReport/ReportAthletePassportCount/index");
const ReportAthletePassportList = () =>
  import("@/views/SportReport/ReportAthletePassportList/index");
const GetReportCoachSportLevelCount = () => import("@/views/SportReport/GetReportCoachSportLevelCount/index");
const GetReportCoachSportLevelList = () => import("@/views/SportReport/GetReportCoachSportLevelList/index");
const GetReportCompetitionWinnerList = () => import("@/views/SportReport/GetReportCompetitionWinnerList/index");

const ReportEmployeeCount = () =>
  import("@/views/Reports/ReportEmployeeCount/index");
const StaffReportCount = () =>
  import("@/views/Reports/StaffReportCount/index");
const GetReportHonorarytitledEmployeeCount = () =>
  import("@/views/Reports/GetReportHonorarytitledEmployeeCount/index");
const StaffReportList = () =>
  import("@/views/Reports/StaffReportList/index");


//ManagemNumberOfEducationalent
const Roles = () => import("@/views/Management/Roles/index");
const EditRoles = () => import("@/views/Management/Roles/edit");
const Table = () => import("@/views/Management/Table/index");
const EditTable = () => import("@/views/Management/Table/edit");
const FixingDocument = () =>
  import("@/views/Management/FixingDocument/index");
const EditFixingDocument = () =>
  import("@/views/Management/FixingDocument/edit");
const BlockDocumentAction = () =>
  import("@/views/Management/BlockDocumentAction/index");
const EditBlockDocumentAction = () =>
  import("@/views/Management/BlockDocumentAction/edit");

const Organization = () => import("@/views/Management/Organization/index");
const EditOrganization = () => import("@/views/Management/Organization/edit");

const OrgInfo = () => import("@/views/Management/OrgInfo/index");
const EditOrgInfo = () => import("@/views/Management/OrgInfo/edit");
const AppClient = () => import("@/views/Management/AppClient/index");
const EditAppClient = () => import("@/views/Management/AppClient/edit");
const User = () => import("@/views/Management/User/index");
const EditUser = () => import("@/views/Management/User/edit");
const OrgTourniquetDevice = () => import("@/views/Management/OrgTourniquetDevice/index");
const EditOrgTourniquetDevice = () => import("@/views/Management/OrgTourniquetDevice/edit");

const LongRunningQuery = () =>
  import("@/views/Management/LongRunningQuery/index");
const ViewLongRunningQuery = () =>
  import("@/views/Management/LongRunningQuery/view");

const BatchDeleteLog = () => import("@/views/Management/BatchDeleteLog/index");
const EditBatchDeleteLog = () =>
  import("@/views/Management/BatchDeleteLog/edit");

//Sport
const Dashboard0 = () => import("@/views/Dashboard/dashboard_v0");
const Dashboard1 = () => import("@/views/Dashboard/dashboard_v1");
const Dashboard2 = () => import("@/views/Dashboard/dashboard_v2");
const Dashboard3 = () => import("@/views/Dashboard/dashboard_v3");
const LoginSport = () => import("@/views/pages/LoginSport");
const SportCard = () => import("@/views/Dashboard/SportCard");
const TrenerCard = () => import("@/views/Dashboard/TrenerCard");
const StudentCard1 = () => import("@/views/Dashboard/StudentCard1");
// const Dashboard1 = () => import("@/views/Dashboard/dashboard_v1")
// const Dashboard2 = () => import("@/views/Dashboard/dashboard_v2")
// const Dashboard3 = () => import("@/views/Dashboard/dashboard_v3")
// const LoginSport = () => import("@/views/pages/LoginSport")
//User

const Settings = () => import("@/views/User/Settings");
Vue.use(Router);

function configRoutes() {
  return [{
    path: "/",
    redirect: "/dashboard1",
    name: "Dashboard",
    component: TheContainer,
    children: [{
      path: "dashboard1",
      // name: i18n.t("Home", TokenService.getLocale()),
      name: "Dashboard",
      component: Dashboard1,
    },
    {
      path: "dashboard0",
      // name: i18n.t("Home", TokenService.getLocale()),
      name: "Dashboard0",
      component: Dashboard0,
    },
    {
      path: "dashboard2",
      // name: i18n.t("Home", TokenService.getLocale()),
      name: "Dashboard2",
      component: Dashboard2,
    },
    {
      path: "dashboard3",
      // name: i18n.t("Home", TokenService.getLocale()),
      name: "Dashboard3",
      component: Dashboard3,
    },
    {
      path: "sportcard/id=:id",
      name: i18n.t("SportCard", TokenService.getLocale()),
      // name : "Dashboard",
      component: SportCard,
    },
    {
      path: "trenercard/id=:id",
      name: i18n.t("TrenerCard", TokenService.getLocale()),
      // name : "Dashboard",
      component: TrenerCard,
    },
    {
      path: "StudentCard1/id=:id",
      name: i18n.t("StudentCard1", TokenService.getLocale()),
      // name : "Dashboard",
      component: StudentCard1,
    },
    {
      path: "Settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/ProblemEdu",
      redirect: "/ProblemEdu/ProblemEdu",
      name: "ProblemEdu",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "ProblemEdu",
        // name: i18n.t('ProblemEdu', TokenService.getLocale()),
        component: ProblemEdu,
        name: "ProblemEdu",
        props: {
          typeid: 1,
        },
      },
      {
        path: "ProblemEdu/edit/id=:id",
        name: "EditProblemEdu",
        component: EditProblemEdu,
        props: {
          typeid: 1,
        },
      },
      {
        path: "SuggestionsEdu",
        // name: i18n.t('SuggestionsEdu', TokenService.getLocale()),
        component: ProblemEdu,
        name: "SuggestionsEdu",
        props: {
          typeid: 2,
        },
      },
      {
        path: "SuggestionsEdu/edit/id=:id",
        name: "EditSuggestionsEdu",
        component: EditProblemEdu,
        props: {
          typeid: 2,
        },
      },
      ],
    },
    {
      path: "/Info",
      redirect: "/Info/Currency",
      name: "Info",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Currency",
        name: "Currency",
        component: Currency,
      },

      {
        path: "Currency/edit/id=:id",
        name: "EditCurrency",
        component: EditCurrency,
      },
      {
        path: "AthletePassportSeries",
        name: "AthletePassportSeries",
        component: AthletePassportSeries,
      },
      {
        path: "AthletePassportSeries/edit/id=:id",
        name: "EditAthletePassportSeries",
        component: EditAthletePassportSeries,
      },
      {
        path: "Bank",
        name: "Bank",
        component: Bank,
      },
      {
        path: "Bank/edit/id=:id",
        name: "EditBank",
        component: EditBank,
      },
      {
        path: "CurrencyCourse",
        name: "CurrencyCourse",
        component: CurrencyCourse,
      },
      {
        path: "CurrencyCourse/edit/id=:id",
        name: "EditCurrencyCourse",
        component: EditCurrencyCourse,
      },
      {
        path: "ItemOfExpense",
        name: "ItemOfExpense",
        component: ItemOfExpense,
      },
      {
        path: "ItemOfExpense/edit/id=:id",
        name: "EditItemOfExpense",
        component: EditItemOfExpense,
      },
      {
        path: "UnitOfMeasure",
        name: "UnitOfMeasure",
        component: UnitOfMeasure,
      },
      {
        path: "UnitOfMeasure/edit/id=:id",
        name: "EditUnitOfMeasure",
        component: EditUnitOfMeasure,
      },
      {
        path: "TableColumnTemplate",
        name: "TableColumnTemplate",
        component: TableColumnTemplate,
      },
      {
        path: "TableColumnTemplate/edit/id=:id",
        name: "EditTableColumnTemplate",
        component: EditTableColumnTemplate,
      },

      {
        path: "Contractor",
        name: "Contractor",
        component: Contractor,
      },
      {
        path: "Contractor/edit/id=:id",
        name: "EditContractor",
        component: EditContractor,
      },
      {
        path: "ReturnReasonType",
        name: "ReturnReasonType",
        component: ReturnReasonType,
      },
      {
        path: "ReturnReasonType/edit/id=:id",
        name: "EditReturnReasonType",
        component: EditReturnReasonType,
      },
        // {
        //   path: "PhysicalTrainingType",
        //   name: "PhysicalTrainingType",
        //   component: PhysicalTrainingType,
        // },
        // {
        //   path: "PhysicalTrainingType/edit/id=:id",
        //   name: "EditPhysicalTrainingType",
        //   component: EditPhysicalTrainingType,
        // },
        // {
        //   path: "ComissionMemberType",
        //   name: "ComissionMemberType",
        //   component: ComissionMemberType,
        // },
        // {
        //   path: "ComissionMemberType/edit/id=:id",
        //   name: "EditComissionMemberType",
        //   component: EditComissionMemberType,
        // },
      ],
    },
    {
      path: "/infoAreaSetting",
      redirect: "/infoAreaSetting/Country",
      name: "infoAreaSetting",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Country",
        name: "Country",
        component: Country,
      },
      {
        path: "Country/edit/id=:id",
        name: "EditCountry",
        component: EditCountry,
      },
      {
        path: "Oblast",
        name: "Oblast",
        component: Oblast,
      },
      {
        path: "Oblast/edit/id=:id",
        name: "EditOblast",
        component: EditOblast,
      },
      {
        path: "RegionType",
        name: "RegionType",
        component: RegionType,
      },
      {
        path: "RegionType/edit/id=:id",
        name: "EditRegionType",
        component: EditRegionType,
      },
      {
        path: "RegionGroup",
        name: "RegionGroup",
        component: RegionGroup,
      },
      {
        path: "RegionGroup/edit/id=:id",
        name: "EditRegionGroup",
        component: EditRegionGroup,
      },
      {
        path: "Region",
        name: "Region",
        component: Region,
      },
      {
        path: "Region/edit/id=:id",
        name: "EditRegion",
        component: EditRegion,
      },
      {
        path: "RegionState",
        name: "RegionState",
        component: RegionState,
      },
      {
        path: "RegionState/edit/id=:id",
        name: "EditRegionState",
        component: EditRegionState,
      },
      {
        path: "Mfy",
        name: "Mfy",
        component: Mfy,
      },
      {
        path: "Mfy/edit/id=:id",
        name: "EditMfy",
        component: EditMfy,
      },
      {
        path: "MfyState",
        name: "MfyState",
        component: MfyState,
      },
      {
        path: "MfyState/edit/id=:id",
        name: "EditMfyState",
        component: EditMfyState,
      },
      {
        path: "Street",
        name: "Street",
        component: Street,
      },
      {
        path: "Street/edit/id=:id",
        name: "EditStreet",
        component: EditStreet,
      },
      {
        path: "StreetHouse",
        name: "StreetHouse",
        component: StreetHouse,
      },
      {
        path: "StreetHouse/edit/id=:id",
        name: "EditStreetHouse",
        component: EditStreetHouse,
      },
      {
        path: "StreetState",
        name: "StreetState",
        component: StreetState,
      },
      {
        path: "StreetState/edit/id=:id",
        name: "EditStreetState",
        component: EditStreetState,
      },
      {
        path: "StreetHouseState",
        name: "StreetHouseState",
        component: StreetHouseState,
      },
      {
        path: "StreetHouseState/edit/id=:id",
        name: "EditStreetHouseState",
        component: EditStreetHouseState,
      },
      ],
    },
    {
      path: "/infoOrganizationSetting",
      redirect: "/infoOrganizationSetting/OrganizationType",
      name: "infoOrganizationSetting",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "OrganizationType",
        name: "OrganizationType",
        component: OrganizationType,
      },
      {
        path: "OrganizationType/edit/id=:id",
        name: "EditOrganizationType",
        component: EditOrganizationType,
      },
      {
        path: "SchoolGroupContingent",
        name: "SchoolGroupContingent",
        component: SchoolGroupContingent,
      },
      {
        path: "SchoolGroupContingent/edit/id=:id",
        name: "EditSchoolGroupContingent",
        component: EditSchoolGroupContingent,
      },
      {
        path: "SchoolType",
        name: "SchoolType",
        component: SchoolType,
      },
      {
        path: "EditSchoolType/edit/id=:id",
        name: "EditSchoolType",
        component: EditSchoolType,
      },
      {
        path: "SchoolLegalForm",
        name: "SchoolLegalForm",
        component: SchoolLegalForm,
      },
      {
        path: "SchoolLegalForm/edit/id=:id",
        name: "EditSchoolLegalForm",
        component: EditSchoolLegalForm,
      },
      {
        path: "SchoolManagementForm",
        name: "SchoolManagementForm",
        component: SchoolManagementForm,
      },
      {
        path: "SchoolManagementForm/edit/id=:id",
        name: "EditSchoolManagementForm",
        component: EditSchoolManagementForm,
      },
      {
        path: "Oked",
        name: "Oked",
        component: Oked,
      },
      {
        path: "Oked/edit/id=:id",
        name: "EditOked",
        component: EditOked,
      },
      ],
    },
    {
      path: "/infoCurriculaSetting",
      redirect: "/infoCurriculaSetting/SchoolGradeGroup",
      name: "infoCurriculaSetting",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "SchoolGradeGroup",
        name: "SchoolGradeGroup",
        component: SchoolGradeGroup,
      },
      {
        path: "EditSchoolGradeGroup/edit/id=:id",
        name: "EditSchoolGradeGroup",
        component: EditSchoolGradeGroup,
      },
      {
        path: "SchoolGrade",
        name: "SchoolGrade",
        component: SchoolGrade,
      },
      {
        path: "SchoolGrade/edit/id=:id",
        name: "EditSchoolGrade",
        component: EditSchoolGrade,
      },
      {
        path: "SchoolYear",
        name: "SchoolYear",
        component: SchoolYear,
      },
      {
        path: "SchoolYear/edit/id=:id",
        name: "EditSchoolYear",
        component: EditSchoolYear,
      },
      {
        path: "EducationLanguage",
        name: "EducationLanguage",
        component: EducationLanguage,
      },
      {
        path: "EducationLanguage/edit/id=:id",
        name: "EditEducationLanguage",
        component: EditEducationLanguage,
      },
      {
        path: "SchoolGradeLetter",
        name: "SchoolGradeLetter",
        component: SchoolGradeLetter,
      },
      {
        path: "SchoolGradeLetter/edit/id=:id",
        name: "EditSchoolGradeLetter",
        component: EditSchoolGradeLetter,
      },
      {
        path: "SchoolSubjectGroup",
        name: "SchoolSubjectGroup",
        component: SchoolSubjectGroup,
      },
      {
        path: "SchoolSubjectGroup/edit/id=:id",
        name: "EditSchoolSubjectGroup",
        component: EditSchoolSubjectGroup,
      },
      {
        path: "SchoolSubject",
        name: "SchoolSubject",
        component: SchoolSubject,
      },
      {
        path: "SchoolSubject/edit/id=:id",
        name: "EditSchoolSubject",
        component: EditSchoolSubject,
      },
      {
        path: "CurriculumType",
        name: "CurriculumType",
        component: CurriculumType,
      },
      {
        path: "CurriculumType/edit/id=:id",
        name: "EditCurriculumType",
        component: EditCurriculumType,
      },
      {
        path: "StudentAdmissionType",
        name: "StudentAdmissionType",
        component: StudentAdmissionType,
      },
      {
        path: "StudentAdmissionType/edit/id=:id",
        name: "EditStudentAdmissionType",
        component: EditStudentAdmissionType,
      },
      {
        path: "SchoolingShift",
        name: "SchoolingShift",
        component: SchoolingShift,
      },
      {
        path: "SchoolingShift/edit/id=:id",
        name: "EditSchoolingShift",
        component: EditSchoolingShift,
      },
      {
        path: "SubjectOlympiad",
        name: "SubjectOlympiad",
        component: SubjectOlympiad,
      },
      {
        path: "SubjectOlympiad/edit/id=:id",
        name: "EditSubjectOlympiad",
        component: EditSubjectOlympiad,
      },
      {
        path: "OlympiadWinnerType",
        name: "OlympiadWinnerType",
        component: OlympiadWinnerType,
      },
      {
        path: "OlympiadWinnerType/edit/id=:id",
        name: "EditOlympiadWinnerType",
        component: EditOlympiadWinnerType,
      },
      {
        path: "RoomType",
        name: "RoomType",
        component: RoomType,
      },
      {
        path: "RoomType/edit/id=:id",
        name: "EditRoomType",
        component: EditRoomType,
      },
      {
        path: "StudentExpulsionType",
        name: "StudentExpulsionType",
        component: StudentExpulsionType,
      },
      {
        path: "StudentExpulsionType/edit/id=:id",
        name: "EditStudentExpulsionType",
        component: EditStudentExpulsionType,
      },
      {
        path: "HomeSchoolingDisease",
        name: "HomeSchoolingDisease",
        component: HomeSchoolingDisease,
      },
      {
        path: "HomeSchoolingDisease/edit/id=:id",
        name: "EditHomeSchoolingDisease",
        component: EditHomeSchoolingDisease,
      },
      {
        path: "SchoolHolidayType",
        name: "SchoolHolidayType",
        component: SchoolHolidayType,
      },
      {
        path: "SchoolHolidayType/edit/id=:id",
        name: "EditSchoolHolidayType",
        component: EditSchoolHolidayType,
      },
      {
        path: "AllowedSchoolGradeMove",
        name: "AllowedSchoolGradeMove",
        component: AllowedSchoolGradeMove,
      },
      {
        path: "AllowedSchoolGradeMove/edit/id=:id",
        name: "EditAllowedSchoolGradeMove",
        component: EditAllowedSchoolGradeMove,
      },
      ],
    },
    {
      path: "/infoEmployeesSetting",
      redirect: "/infoEmployeesSetting/QualificationCategory",
      name: "infoEmployeesSetting",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "QualificationCategory",
        name: "QualificationCategory",
        component: QualificationCategory,
      },
      {
        path: "QualificationCategory/edit/id=:id",
        name: "EditQualificationCategory",
        component: EditQualificationCategory,
      },
      {
        path: "HigherEduClassifier",
        name: "HigherEduClassifier",
        component: HigherEduClassifier,
      },
      {
        path: "HigherEduClassifier/edit/id=:id",
        name: "EditHigherEduClassifier",
        component: EditHigherEduClassifier,
      },
      {
        path: "EducationType",
        name: "EducationType",
        component: EducationType,
      },
      {
        path: "EducationType/edit/id=:id",
        name: "EditEducationType",
        component: EditEducationType,
      },
      {
        path: "EducationFormType",
        name: "EducationFormType",
        component: EducationFormType,
      },
      {
        path: "EducationFormType/edit/id=:id",
        name: "EditEducationFormType",
        component: EditEducationFormType,
      },
      {
        path: "StaffCategory",
        name: "StaffCategory",
        component: StaffCategory,
      },
      {
        path: "StaffCategory/edit/id=:id",
        name: "EditStaffCategory",
        component: EditStaffCategory,
      },
      {
        path: "PositionClassification",
        name: "PositionClassification",
        component: PositionClassification,
      },
      {
        path: "PositionClassification/edit/id=:id",
        name: "EditPositionClassification",
        component: EditPositionClassification,
      },
      {
        path: "TariffScale",
        name: "TariffScale",
        component: TariffScale,
      },
      {
        path: "TariffScale/edit/id=:id",
        name: "EditTariffScale",
        component: EditTariffScale,
      },
      {
        path: "TariffScaleCoef",
        name: "TariffScaleCoef",
        component: TariffScaleCoef,
      },
      {
        path: "TariffScaleCoef/edit/id=:id",
        name: "EditTariffScaleCoef",
        component: EditTariffScaleCoef,
      },
      {
        path: "Position",
        name: "Position",
        component: Position,
      },
      {
        path: "Position/edit/id=:id",
        name: "EditPosition",
        component: EditPosition,
      },
      {
        path: "StaffTypeBasicTariff",
        name: "StaffTypeBasicTariff",
        component: StaffTypeBasicTariff,
      },
      {
        path: "StaffTypeBasicTariff/edit/id=:id",
        name: "EditStaffTypeBasicTariff",
        component: EditStaffTypeBasicTariff,
      },
      {
        path: "Nationality",
        name: "Nationality",
        component: Nationality,
      },
      {
        path: "Nationality/edit/id=:id",
        name: "EditNationality",
        component: EditNationality,
      },
      {
        path: "IdentityDocument",
        name: "IdentityDocument",
        component: IdentityDocument,
      },
      {
        path: "IdentityDocument/edit/id=:id",
        name: "EditIdentityDocument",
        component: EditIdentityDocument,
      },

      {
        path: "IdentityDocSeries",
        name: "IdentityDocSeries",
        component: IdentityDocSeries,
      },
      {
        path: "IdentityDocSeries/edit/id=:id",
        name: "EditIdentityDocSeries",
        component: EditIdentityDocSeries,
      },
      {
        path: "KinshipDegree",
        name: "KinshipDegree",
        component: KinshipDegree,
      },
      {
        path: "KinshipDegree/edit/id=:id",
        name: "EditKinshipDegree",
        component: EditKinshipDegree,
      },
      {
        path: "University",
        name: "University",
        component: University,
      },
      {
        path: "University/edit/id=:id",
        name: "EditUniversity",
        component: EditUniversity,
      },
      ],
    },
    {
      path: "/infoSalarySetting",
      redirect: "/infoSalarySetting/CalculationKind",
      name: "infoSalarySetting",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "CalculationKind",
        name: "CalculationKind",
        component: CalculationKind,
      },
      {
        path: "CalculationKind/edit/id=:id",
        name: "EditCalculationKind",
        component: EditCalculationKind,
      },
      {
        path: "StaffingIndicator",
        name: "StaffingIndicator",
        component: StaffingIndicator,
      },
      {
        path: "StaffingIndicator/edit/id=:id",
        name: "EditStaffingIndicator",
        component: EditStaffingIndicator,
      },
      {
        path: "Holiday",
        name: "Holiday",
        component: Holiday,
      },
      {
        path: "Holiday/edit/id=:id",
        name: "EditHoliday",
        component: EditHoliday,
      },
      {
        path: "WorkSchedule",
        name: "WorkSchedule",
        component: WorkSchedule,
      },
      {
        path: "WorkSchedule/edit/id=:id",
        name: "EditWorkSchedule",
        component: EditWorkSchedule,
      },
      {
        path: "HonoraryTitleType",
        name: "HonoraryTitleType",
        component: HonoraryTitleType,
      },
      {
        path: "HonoraryTitleType/edit/id=:id",
        name: "EditHonoraryTitleType",
        component: EditHonoraryTitleType,
      },
      {
        path: "FixedMinimumValue",
        name: "FixedMinimumValue",
        component: FixedMinimumValue,
      },
      {
        path: "FixedMinimumValue/edit/id=:id",
        name: "EditFixedMinimumValue",
        component: EditFixedMinimumValue,
      },
      {
        path: "TaxBenefitType",
        name: "TaxBenefitType",
        component: TaxBenefitType,
      },
      {
        path: "TaxBenefitType/edit/id=:id",
        name: "EditTaxBenefitType",
        component: EditTaxBenefitType,
      },
      {
        path: "TimesheetIndicator",
        name: "TimesheetIndicator",
        component: TimesheetIndicator,
      },
      {
        path: "TimesheetIndicator/edit/id=:id",
        name: "EditTimesheetIndicator",
        component: EditTimesheetIndicator,
      },
      ],
    },
    {
      path: "/PersonalInfo",
      redirect: "/PersonalInfo/Room",
      name: "PersonalInfo",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Employee",
        name: "Employee",
        component: Person,
        props: {
          persontypeid: 2,
        },
      },

      {
        path: "Employee/edit/id=:id",
        name: "EditEmployee",
        component: EditPerson,
        props: {
          persontypeid: 2,
        },
      },
      {
        path: "Student",
        name: "Student",
        component: Person,
        props: {
          persontypeid: 1,
        },
      },
      {
        path: "Student/edit/id=:id",
        name: "EditStudent",
        component: EditPerson,
        props: {
          persontypeid: 1,
        },
      },
      {
        path: "Department",
        name: "Department",
        component: Department,
      },
      {
        path: "Department/edit/id=:id",
        name: "EditDepartment",
        component: EditDepartment,
      },
      {
        path: "Room",
        name: "Room",
        component: Room,
      },
      {
        path: "Room/edit/id=:id",
        name: "EditRoom",
        component: EditRoom,
      },
      {
        path: "OrgSchoolGrade",
        name: "OrgSchoolGrade",
        component: OrgSchoolGrade,
      },
      {
        path: "OrgSchoolGrade/edit/id=:id",
        name: "EditOrgSchoolGrade",
        component: EditOrgSchoolGrade,
      },
      {
        path: "OrganizationBranch",
        name: "OrganizationBranch",
        component: OrganizationBranch,
      },
      {
        path: "OrganizationBranch/edit/id=:id",
        name: "EditOrganizationBranch",
        component: EditOrganizationBranch,
      },
      ],
    },

    {
      path: "/Inv",
      redirect: "/Inv/Manufacturer",
      name: "Inv",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Manufacturer",
        name: "Manufacturer",
        component: Manufacturer,
      },
      {
        path: "Manufacturer/edit/id=:id",
        name: "EditManufacturer",
        component: EditManufacturer,
      },
      {
        path: "PaGroup",
        name: "PaGroup",
        component: PaGroup,
      },
      {
        path: "PaGroup/edit/id=:id",
        name: "EditPaGroup",
        component: EditPaGroup,
      },
      {
        path: "EquipmentConditionType",
        name: "EquipmentConditionType",
        component: EquipmentConditionType,
      },
      {
        path: "EquipmentConditionType/edit/id=:id",
        name: "EditEquipmentConditionType",
        component: EditEquipmentConditionType,
      },
      {
        path: "RepairType",
        name: "RepairType",
        component: RepairType,
      },
      {
        path: "RepairType/edit/id=:id",
        name: "EditRepairType",
        component: EditRepairType,
      },
      {
        path: "PaSubGroup",
        name: "PaSubGroup",
        component: PaSubGroup,
      },
      {
        path: "PaSubGroup/edit/id=:id",
        name: "EditPaSubGroup",
        component: EditPaSubGroup,
      },
      {
        path: "ProductClassification",
        name: "ProductClassification",
        component: ProductClassification,
      },
      {
        path: "ProductClassification/edit/id=:id",
        name: "EditProductClassification",
        component: EditProductClassification,
      },
      {
        path: "ResponsiblePerson",
        name: "ResponsiblePerson",
        component: ResponsiblePerson,
      },
      {
        path: "ResponsiblePerson/edit/id=:id",
        name: "EditResponsiblePerson",
        component: EditResponsiblePerson,
      },
      {
        path: "SourceOfFinance",
        name: "SourceOfFinance",
        component: SourceOfFinance,
      },
      {
        path: "SourceOfFinance/edit/id=:id",
        name: "EditSourceOfFinance",
        component: EditSourceOfFinance,
      },
      {
        path: "Brand",
        name: "Brand",
        component: Brand,
      },
      {
        path: "Brand/edit/id=:id",
        name: "EditBrand",
        component: EditBrand,
      },
      {
        path: "PermanentAsset",
        name: "PermanentAsset",
        component: PermanentAsset,
      },
      {
        path: "PermanentAsset/edit/id=:id",
        name: "EditPermanentAsset",
        component: EditPermanentAsset,
      },
      {
        path: "UzasboPermanentAsset",
        name: "UzasboPermanentAsset",
        component: UzasboPermanentAsset,
      },
      // {
      //   path: "PermanentAssetIntake",
      //   name: "PermanentAssetIntake",
      //   component: PermanentAssetIntake,
      // },
      {
        path: "UzasboPermanentAsset/edit/id=:id",
        name: "EditUzasboPermanentAsset",
        component: EditUzasboPermanentAsset,
      },
      ],
    },
    //Aboniment
    {
      path: "/Aboniment",
      redirect: "/Aboniment/MemberShipType",
      name: "Aboniment",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "MemberShipType",
        name: "MemberShipType",
        component: MemberShipType,
      },
      {
        path: "MemberShipType/edit/id=:id",
        name: "EditMemberShipType",
        component: EditMemberShipType,
      },
      {
        path: "SportFacilityType",
        name: "SportFacilityType",
        component: SportFacilityType,
      },
      {
        path: "SportFacilityType/edit/id=:id",
        name: "EditSportFacilityType",
        component: EditSportFacilityType,
      },
      {
        path: "CircleSportType",
        name: "CircleSportType",
        component: CircleSportType,
      },
      {
        path: "CircleSportType/edit/id=:id",
        name: "EditCircleSportType",
        component: EditCircleSportType,
      },
      {
        path: "PrivilegeReason",
        name: "PrivilegeReason",
        component: PrivilegeReason,
      },
      {
        path: "PrivilegeReason/edit/id=:id",
        name: "EditPrivilegeReason",
        component: EditPrivilegeReason,
      },
      {
        path: "SportGroupCategoryType",
        name: "SportGroupCategoryType",
        component: SportGroupCategoryType,
      },
      {
        path: "SportGroupCategoryType/edit/id=:id",
        name: "EditSportGroupCategoryType",
        component: EditSportGroupCategoryType,
      },
      {
        path: "PaymentScheduleType",
        name: "PaymentScheduleType",
        component: PaymentScheduleType,
        props: {
          isview: true,
        },
      },
      {
        path: "PaymentScheduleType/edit/id=:id",
        name: "EditPaymentScheduleType",
        component: EditPaymentScheduleType,
      },
      {
        path: "ServicePocket",
        name: "ServicePocket",
        component: ServicePocket,
        props: {
          isview: true,
        },
      },
      {
        path: "ServicePocket/edit/id=:id",
        name: "EditServicePocket",
        component: EditServicePocket,
      },
      {
        path: "PersonMember",
        name: "PersonMember",
        component: PersonMember,
        props: {
          isview: true,
        },
      },
      {
        path: "PersonMember/edit/id=:id",
        name: "EditPersonMember",
        component: EditPersonMember,
      },
      {
        path: "PaymentFreeMemberShip",
        name: "PaymentFreeMemberShip",
        component: PaymentFreeMemberShip,
        props: {
          isview: true,
        },
      },
      {
        path: "PaymentFreeMemberShip/edit/id=:id",
        name: "EditPaymentFreeMemberShip",
        component: EditPaymentFreeMemberShip,
      },
      {
        path: "PriceList",
        name: "PriceList",
        component: PriceList,
        props: {
          isview: true,
        },
      },
      {
        path: "PriceList/edit/id=:id",
        name: "EditPriceList",
        component: EditPriceList,
      },
      ],
    },

    {
      path: "/AbonimentDocuments",
      redirect: "/AbonimentDocuments/MemberShip",
      name: "AbonimentDocuments",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "MemberShip",
          name: "MemberShip",
          component: MemberShip,
          props: {
            isview: true,
          },
        },
        {
          path: "MemberShip/edit/id=:id",
          name: "EditMemberShip",
          component: EditMemberShip,
        },
        {
          path: "CloseMembership",
          name: "CloseMembership",
          component: CloseMembership,
          props: {
            isview: true,
          },
        },
        {
          path: "CloseMembership/edit/id=:id",
          name: "EditCloseMembership",
          component: EditCloseMembership,
        },
        {
          path: "PaymentAccrual",
          name: "PaymentAccrual",
          component: PaymentAccrual,
          props: {
            isview: true,
          },
        },
        {
          path: "PaymentAccrual/edit/id=:id",
          name: "EditPaymentAccrual",
          component: EditPaymentAccrual,
        },
        {
          path: "Payment",
          name: "Payment",
          component: Payment,
          props: {
            isview: true,
          },
        },
        {
          path: "Payment/edit/id=:id",
          name: "EditPayment",
          component: EditPayment,
        },
        {
          path: "SportGroupMovement",
          name: "SportGroupMovement",
          component: SportGroupMovement,
          props: {
            isview: true,
          },
        },
        {
          path: "SportGroupMovement/edit/id=:id",
          name: "EditSportGroupMovement",
          component: EditSportGroupMovement,
        },
        {
          path: "MissedDays",
          name: "MissedDays",
          component: MissedDays,
        },
        {
          path: "MissedDays/edit/id=:id",
          name: "EditMissedDays",
          component: EditMissedDays,
        },
        {
          path: "GuestRegistration",
          name: "GuestRegistration",
          component: GuestRegistration,
        },
        {
          path: "GuestRegistration/edit/id=:id",
          name: "EditGuestRegistration",
          component: EditGuestRegistration,
        },
        {
          path: "TourniquetDeviceLog",
          name: "TourniquetDeviceLog",
          component: TourniquetDeviceLog,
          props: {
            isview: true,
          },
        },
      ]
    },
    //Training
    {
      path: "/Training",
      redirect: "/Training/Manufacturer",
      name: "Training",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "SportTypeDivision",
        name: "SportTypeDivision",
        component: SportTypeDivision,
      },
      {
        path: "SportTypeDivision/edit/id=:id",
        name: "EditSportTypeDivision",
        component: EditSportTypeDivision,
      },
      {
        path: "SportTypeGender",
        name: "SportTypeGender",
        component: SportTypeGender,
      },
      {
        path: "SportTypeGender/edit/id=:id",
        name: "EditSportTypeGender",
        component: EditSportTypeGender,
      },
      {
        path: "SportTypeRestriction",
        name: "SportTypeRestriction",
        component: SportTypeRestriction,
      },
      {
        path: "SportTypeRestriction/edit/id=:id",
        name: "EditSportTypeRestriction",
        component: EditSportTypeRestriction,
      },
      {
        path: "SportTypeDependence",
        name: "SportTypeDependence",
        component: SportTypeDependence,
      },
      {
        path: "SportTypeDependence/edit/id=:id",
        name: "EditSportTypeDependence",
        component: EditSportTypeDependence,
      },
      {
        path: "SportGrowthRate",
        name: "SportGrowthRate",
        component: SportGrowthRate,
      },
      {
        path: "SportGrowthRate/edit/id=:id",
        name: "EditSportGrowthRate",
        component: EditSportGrowthRate,
      },
      {
        path: "SportActivityType",
        name: "SportActivityType",
        component: SportActivityType,
      },
      {
        path: "SportActivityType/edit/id=:id",
        name: "EditSportActivityType",
        component: EditSportActivityType,
      },
      {
        path: "SportSeason",
        name: "SportSeason",
        component: SportSeason,
        props: {
          isview: true,
        },
      },
      {
        path: "SportSeason/edit/id=:id",
        name: "EditSportSeason",
        component: EditSportSeason,
      },
      {
        path: "SportBranch",
        name: "SportBranch",
        component: SportBranch,
        props: {
          isview: true,
        },
      },
      {
        path: "SportBranch/edit/id=:id",
        name: "EditSportBranch",
        component: EditSportBranch,
      },
      {
        path: "SportTypeClassifier",
        name: "SportTypeClassifier",
        component: SportTypeClassifier,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTypeClassifier/edit/id=:id",
        name: "EditSportTypeClassifier",
        component: EditSportTypeClassifier,
      },
      {
        path: "SportTitle",
        name: "SportTitle",
        component: SportTitle,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTitle/edit/id=:id",
        name: "EditSportTitle",
        component: EditSportTitle,
      },
      {
        path: "SportLevel",
        name: "SportLevel",
        component: SportLevel,
        props: {
          isview: true,
        },
      },
      {
        path: "SportLevel/edit/id=:id",
        name: "EditSportLevel",
        component: EditSportLevel,
      },
      {
        path: "QualCategoryTrainingType",
        name: "QualCategoryTrainingType",
        component: QualCategoryTrainingType,
        props: {
          isview: true,
        },
      },
      {
        path: "QualCategoryTrainingType/edit/id=:id",
        name: "EditQualCategoryTrainingType",
        component: EditQualCategoryTrainingType,
      },
      {
        path: "SportEventCategory",
        name: "SportEventCategory",
        component: SportEventCategory,
        props: {
          isview: true,
        },
      },
      {
        path: "SportEventCategory/edit/id=:id",
        name: "EditSportEventCategory",
        component: EditSportEventCategory,
      },
      {
        path: "SportEventParticipant",
        name: "SportEventParticipant",
        component: SportEventParticipant,
        props: {
          isview: true,
        },
      },
      {
        path: "SportEventParticipant/edit/id=:id",
        name: "EditSportEventParticipant",
        component: EditSportEventParticipant,
      },
      {
        path: "SportEventType",
        name: "SportEventType",
        component: SportEventType,
        props: {
          isview: true,
        },
      },
      {
        path: "SportEventType/edit/id=:id",
        name: "EditSportEventType",
        component: EditSportEventType,
      },
      {
        path: "CompetitionType",
        name: "CompetitionType",
        component: CompetitionType,
        props: {
          isview: true,
        },
      },
      {
        path: "CompetitionType/edit/id=:id",
        name: "EditCompetitionType",
        component: EditCompetitionType,
      },
      {
        path: "SportEvent",
        name: "SportEvent",
        component: SportEvent,
        props: {
          isview: true,
        },
      },
      {
        path: "SportEvent/edit/id=:id",
        name: "EditSportEvent",
        component: EditSportEvent,
      },
      {
        path: "SportGroup",
        name: "SportGroup",
        component: SportGroup,
        props: {
          isview: true,
        },
      },
      {
        path: "SportGroup/edit/id=:id",
        name: "EditSportGroup",
        component: EditSportGroup,
      },
      {
        path: "SportTypeGroup",
        name: "SportTypeGroup",
        component: SportTypeGroup,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTypeGroup/edit/id=:id",
        name: "EditSportTypeGroup",
        component: EditSportTypeGroup,
      },
      {
        path: "CompetitionLevel",
        name: "CompetitionLevel",
        component: CompetitionLevel,
        props: {
          isview: true,
        },
      },
      {
        path: "CompetitionLevel/edit/id=:id",
        name: "EditCompetitionLevel",
        component: EditCompetitionLevel,
      },
      {
        path: "SportTeamSquadType",
        name: "SportTeamSquadType",
        component: SportTeamSquadType,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTeamSquadType/edit/id=:id",
        name: "EditSportTeamSquadType",
        component: EditSportTeamSquadType,
      },
      {
        path: "SportTeamType",
        name: "SportTeamType",
        component: SportTeamType,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTeamType/edit/id=:id",
        name: "EditSportTeamType",
        component: EditSportTeamType,
      },
      {
        path: "SportRank",
        name: "SportRank",
        component: SportRank,
        props: {
          isview: true,
        },
      },
      {
        path: "SportRank/edit/id=:id",
        name: "EditSportRank",
        component: EditSportRank,
      },
      {
        path: "SportTeamSquadLevel",
        name: "SportTeamSquadLevel",
        component: SportTeamSquadLevel,
        props: {
          isview: true,
        },
      },
      {
        path: "SportTeamSquadLevel/edit/id=:id",
        name: "EditSportTeamSquadLevel",
        component: EditSportTeamSquadLevel,
      },
      {
        path: "SportLevelGroup",
        name: "SportLevelGroup",
        component: SportLevelGroup,
        props: {
          isview: true,
        },
      },
      {
        path: "SportLevelGroup/edit/id=:id",
        name: "EditSportLevelGroup",
        component: EditSportLevelGroup,
      },
      {
        path: "AnthropometricIndicator",
        name: "AnthropometricIndicator",
        component: AnthropometricIndicator,
        props: {
          isview: true,
        },
      },
      {
        path: "AnthropometricIndicator/edit/id=:id",
        name: "EditAnthropometricIndicator",
        component: EditAnthropometricIndicator,
      },
      {
        path: "PhysicalTrainingType",
        name: "PhysicalTrainingType",
        component: PhysicalTrainingType,
      },
      {
        path: "PhysicalTrainingType/edit/id=:id",
        name: "EditPhysicalTrainingType",
        component: EditPhysicalTrainingType,
      },
      {
        path: "ComissionMemberType",
        name: "ComissionMemberType",
        component: ComissionMemberType,
      },
      {
        path: "ComissionMemberType/edit/id=:id",
        name: "EditComissionMemberType",
        component: EditComissionMemberType,
      },
      {
        path: "AppealPurpose",
        name: "AppealPurpose",
        component: AppealPurpose,
      },
      {
        path: "AppealPurpose/edit/id=:id",
        name: "EditAppealPurpose",
        component: EditAppealPurpose,
      },
      {
        path: "OrganizationBuildingInfo",
        name: "OrganizationBuildingInfo",
        component: OrganizationBuildingInfo,
      },
      {
        path: "OrganizationBuildingInfo/edit/id=:id",
        name: "EditOrganizationBuildingInfo",
        component: EditOrganizationBuildingInfo,
      },
      ],
      },
    

      // Diploma
      {
        path: "/Diploma",
        redirect: "/Diploma/DiplomaSerial",
        name: "Diploma",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [{
          path: "DiplomaSerial",
          name: "DiplomaSerial",
          component: DiplomaSerial,
        }]
      },

    /////////Inv Document

    {
      path: "/InvDocument",
      redirect: "/InvDocument/PermanentAssetIntake",
      name: "InvDocument",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "PermanentAssetIntake",
        name: "PermanentAssetIntake",
        component: PermanentAssetIntake,
      },
      {
        path: "PermanentAssetIntake/edit/id=:id",
        name: "EditPermanentAssetIntake",
        component: EditPermanentAssetIntake,
      },
      ],
    },

    {
      path: "/Document",
      redirect: "/Document/OrgStateInfo",
      name: "Document",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "OrgStateInfo",
        name: "OrgStateInfo",
        component: OrgStateInfo,
      },
      {
        path: "OrgStateInfo/edit/id=:id",
        name: "EditOrgStateInfo",
        component: EditOrgStateInfo,
      },
      {
        path: "CustomJobLog",
        name: "CustomJobLog",
        component: CustomJobLog,
      },
      {
        path: "CustomJobLog/edit/id=:id",
        name: "EditCustomJobLog",
        component: EditCustomJobLog,
      },
      {
        path: "Budget",
        name: "Budget",
        component: Budget,
      },
      {
        path: "Budget/edit/id=:id",
        name: "EditBudget",
        component: EditBudget,
      },
      {
        path: "SentBudget",
        name: "SentBudget",
        component: SentBudget,
      },
      {
        path: "SentBudget/edit/id=:id",
        name: "EditSentBudget",
        component: EditSentBudget,
      },
      {
        path: "PlanPersonCount",
        name: "PlanPersonCount",
        component: PlanPersonCount,
      },
      {
        path: "PlanPersonCount/edit/id=:id",
        name: "EditPlanPersonCount",
        component: EditPlanPersonCount,
      },
      {
        path: "AdmissionPrivilege",
        name: "AdmissionPrivilege",
        component: AdmissionPrivilege,
      },
      {
        path: "AdmissionPrivilege/edit/id=:id",
        name: "EditAdmissionPrivilege",
        component: EditAdmissionPrivilege,
      },
      {
        path: "PermanentAssetIntake",
        name: "PermanentAssetIntake",
        component: PermanentAssetIntake,
      },
      {
        path: "PermanentAssetIntake/edit/id=:id",
        name: "EditPermanentAssetIntake",
        component: EditPermanentAssetIntake,
      },
      ],
    },
    {
      path: "/Qurilish",
      redirect: "/Qurilish/qurilish",
      name: "Qurilish",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "qurilish",
        name: "qurilish",
        component: {
          render(c) {
            router.push({
              name: 'Dashboard2'
            })
            window.open('http://qurilish.sport.uz/', '_blank');
          },
        },
      },],
    },
    {
      path: "/BasicMeans",
      redirect: "/BasicMeans/OrgStateInfo",
      name: "BasicMeans",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "PermanentAssetIntake",
        name: "PermanentAssetIntake",
        component: PermanentAssetIntake,
      },
      {
        path: "PermanentAssetIntake/edit/id=:id",
        name: "EditPermanentAssetIntake",
        component: EditPermanentAssetIntake,
      },
      ],
    },
    {
      path: "/SportYonalish",
      redirect: "/SportYonalish/FormingSportGroup",
      name: "SportYonalish",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "TrainingSchedule",
          name: "TrainingSchedule",
          component: TrainingSchedule,
        },
        
        {
          path: "TrainingSchedule/edit/id=:id",
          name: "EditTrainingSchedule",
          component: EditTrainingSchedule,
        },
        {
          path: "TrainingSchedule/view/id=:id",
          name: "ViewTrainingSchedule",
          component: ViewTrainingSchedule,
        },
        {
          path: "SubjectsInTheSchoolYear",
          name: "SubjectsInTheSchoolYear",
          component: SubjectsInTheSchoolYear,
        },
        
        {
          path: "SubjectsInTheSchoolYear/edit/id=:id",
          name: "SubjectsInTheSchoolYearEdit",
          component: SubjectsInTheSchoolYearEdit,
        },
        {
          path: "StudentFinalMark",
          name: "StudentFinalMark",
          component: StudentFinalMark,
        },
        {
          path: "StudentFinalMark/edit/id=:id",
          name: "StudentFinalMarkEdit",
          component: StudentFinalMarkEdit,
        },
        {
          path: "FormingSportGroup",
          name: "FormingSportGroup",
          component: FormingSportGroup,
        },
        {
          path: "AthletePreparingCompet",
          name: "AthletePreparingCompet",
          component: AthletePreparingCompet,
        },
        {
          path: "AthletePreparingCompet/edit/id=:id",
          name: "EditAthletePreparingCompet",
          component: EditAthletePreparingCompet,
        },
        {
          path: "AthletePreparingCompet/view/id=:id",
          name: "ViewAthletePreparingCompet",
          component: ViewAthletePreparingCompet,
        },
        {
          path: "FormingSportGroup/edit/id=:id",
          name: "EditFormingSportGroup",
          component: EditFormingSportGroup,
        },
        {
          path: "FormingSportGroup/view/id=:id",
          name: "ViewFormingSportGroup",
          component: ViewFormingSportGroup,
        },
        {
          path: "FormingTeamSquad",
          name: "FormingTeamSquad",
          component: FormingTeamSquad,
        },
        {
          path: "FormingTeamSquad/edit/id=:id",
          name: "EditFormingTeamSquad",
          component: EditFormingTeamSquad,
        },
        {
          path: "FormingTeamSquad/view/id=:id",
          name: "ViewFormingTeamSquad",
          component: ViewFormingTeamSquad,
        },
        {
          path: "SportTitleDocument",
          name: "SportTitleDocument",
          component: SportTitleDocument,
        },
        {
          path: "SportTitleDocument/edit/id=:id",
          name: "EditSportTitleDocument",
          component: EditSportTitleDocument,
        },
        {
          path: "AthleticAchievement",
          name: "AthleticAchievement",
          component: AthleticAchievement,
        },
        {
          path: "AthleticAchievement/edit/id=:id",
          name: "EditAthleticAchievement",
          component: EditAthleticAchievement,
        },
        {
          path: "AthleticAchievement/view/id=:id",
          name: "ViewAthleticAchievement",
          component: ViewAthleticAchievement,
        },
        {
          path: "Anthropometric",
          name: "Anthropometric",
          component: Anthropometric,
        },
        {
          path: "Anthropometric/edit/id=:id",
          name: "EditAnthropometric",
          component: EditAnthropometric,
        },
        {
          path: "Anthropometric/view/id=:id",
          name: "ViewAnthropometric",
          component: ViewAnthropometric,
        },
        {
          path: "Appeal",
          name: "Appeal",
          component: Appeal,
        },
        {
          path: "Appeal/edit/id=:id",
          name: "EditAppeal",
          component: EditAppeal,
        },
        {
          path: "GetListForMOQ",
          name: "GetListForMOQ",
          component: GetListForMOQ,
        },
        {
          path: "GetListForMOQ/view/id=:id",
          name: "ViewGetListForMOQ",
          component: ViewGetListForMOQ,
        },
        {
          path: "AppealResponse",
          name: "AppealResponse",
          component: AppealResponse,
        },
        {
          path: "SportStudentMovement",
          name: "SportStudentMovement",
          component: SportStudentMovement,
        },
        {
          path: "SportStudentMovement/edit/id=:id",
          name: "EditSportStudentMovement",
          component: EditSportStudentMovement,
        },
        {
          path: "SportStudentMovement/view/id=:id",
          name: "ViewSportStudentMovement",
          component: ViewSportStudentMovement,
        },
        {
          path: "AthleteRoadMap",
          name: "AthleteRoadMap",
          component: AthleteRoadMap,
        },
        {
          path: "AthleteRoadMap/edit/id=:id",
          name: "EditAthleteRoadMap",
          component: EditAthleteRoadMap,
        },
        {
          path: "AthleteRoadMap/view/id=:id",
          name: "ViewAthleteRoadMap",
          component: ViewAthleteRoadMap,
        },
      ],
    },
    {
      path: "/SportEvents",
      redirect: "/SportEvents/CalendarPlan",
      name: "SportEvents",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "SportCompetition",
          name: "SportCompetition",
          component: SportCompetition,
        },
        {
          path: "SportCompetition/edit/id=:id",
          name: "EditSportCompetition",
          component: EditSportCompetition,
        },
        {
          path: "SportCompetition/view/id=:id",
          name: "ViewSportCompetition",
          component: ViewSportCompetition,
        },
        {
          path: "CalendarPlan",
          name: "CalendarPlan",
          component: CalendarPlan,
        },
        {
          path: "CalendarPlan/edit/id=:id",
          name: "EditCalendarPlan",
          component: EditCalendarPlan,
        },
        {
          path: "CalendarPlan/view/id=:id",
          name: "ViewCalendarPlan",
          component: ViewCalendarPlan,
        },
        {
          path: "SportItemOfExpense",
          name: "SportItemOfExpense",
          component: SportItemOfExpense,
        },
        {
          path: "SportItemOfExpense/edit/id=:id",
          name: "EditSportItemOfExpense",
          component: EditSportItemOfExpense,
        },
        {
          path: "SportCompetitionStepInfo",
          name: "SportCompetitionStepInfo",
          component: SportCompetitionStepInfo,
          props: {
            isview: true,
          },
        },
        {
          path: "SportCompetitionStepInfo/edit/id=:id",
          name: "EditSportCompetitionStepInfo",
          component: EditSportCompetitionStepInfo,
        },
      ],
    },
    {
      path: "/SportsmanPassport",
      redirect: "/SportsmanPassport/AthletePassport",
      name: "SportsmanPassport",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "AthletePassport",
          name: "AthletePassport",
          component: AthletePassport,
        },
        {
          path: "AthletePassport/edit/id=:id",
          name: "EditAthletePassport",
          component: EditAthletePassport,
        },
        {
          path: "AthletePassport/view/id=:id",
          name: "ViewAthletePassport",
          component: ViewAthletePassport,
        },
        {
          path: "AthletePassportSendList",
          name: "AthletePassportSendList",
          component: AthletePassportSendList,
        },
        {
          path: "AthletePassportSendList/view/id=:id",
          name: "ViewAthletePassportSendList",
          component: ViewAthletePassportSendList,
        },
      ],
    },
    {
      path: "SportExam",
      redirect: "/SportExam/GroupSheet",
      name: "SportExam",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "GroupSheet",
        name: "GroupSheet",
        component: GroupSheet,
      },
      {
        path: "GroupSheet/edit/id=:id",
        name: "EditGroupSheet",
        component: EditGroupSheet,
      },
      {
        path: "GroupSheet/view/id=:id",
        name: "ViewGroupSheet",
        component: ViewGroupSheet,
      },
      {
        path: "ExamGroup",
        name: "ExamGroup",
        component: ExamGroup,
      },
      {
        path: "ExamGroup/edit/id=:id",
        name: "EditExamGroup",
        component: EditExamGroup,
      },

      {
        path: "ComissionMemberAssignment",
        name: "ComissionMemberAssignment",
        component: ComissionMemberAssignment,
      },
      {
        path: "ComissionMemberAssignment/edit/id=:id",
        name: "EditComissionMemberAssignment",
        component: EditComissionMemberAssignment,
      },
      {
        path: "AssessmentCriteria",
        name: "AssessmentCriteria",
        component: AssessmentCriteria,
      },
      {
        path: "AssessmentCriteria/edit/id=:id",
        name: "EditAssessmentCriteria",
        component: EditAssessmentCriteria,
      },
      {
        path: "AssessmentCriteria/view/id=:id",
        name: "ViewAssessmentCriteria",
        component: ViewAssessmentCriteria,
      },
      {
        path: "GroupFormByEduDirection",
        name: "GroupFormByEduDirection",
        component: GroupFormByEduDirection,
      },
      {
        path: "GroupFormByEduDirection/edit/id=:id",
        name: "EditGroupFormByEduDirection",
        component: EditGroupFormByEduDirection,
      },
      {
        path: "ExamGroupCountCompare",
        name: "ExamGroupCountCompare",
        component: ExamGroupCountCompare,
      },
      {
        path: "HigHerEduClassiFierCountByGroup",
        name: "HigHerEduClassiFierCountByGroup",
        component: HigHerEduClassiFierCountByGroup,
      },
      ],
      },
      {
        path: "/SportRating",
        redirect: "/SportRating/SportOrgRatingCriteria",
        name: "SportRating",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "SportOrgRatingCriteria",
            name: "SportOrgRatingCriteria",
            component: SportOrgRatingCriteria,
          },
          {
            path: "SportOrgRatingCriteria/edit/id=:id",
            name: "EditSportOrgRatingCriteria",
            component: EditSportOrgRatingCriteria,
          },
          {
            path: "SportOrgRatingCriteria/view/id=:id",
            name: "ViewSportOrgRatingCriteria",
            component: ViewSportOrgRatingCriteria,
          },
          {
            path: "SportOrgRating",
            name: "SportOrgRating",
            component: SportOrgRating,
          },
          {
            path: "SportOrgRating/edit/id=:id",
            name: "EditSportOrgRating",
            component: EditSportOrgRating,
          },
          {
            path: "SportOrgRating/view/id=:id",
            name: "ViewSportOrgRating",
            component: ViewSportOrgRating,
          },
          {
            path: "SentSportOrgRating",
            name: "SentSportOrgRating",
            component: SentSportOrgRating,
          },
          {
            path: "SentSportOrgRating/view/id=:id",
            name: "ViewSentSportOrgRating",
            component: ViewSentSportOrgRating,
          },
          {
            path: "SportOrgRatingIndicator",
            name: "SportOrgRatingIndicator",
            component: SportOrgRatingIndicator,
          },
          {
            path: "SportOrgRatingIndicator/edit/id=:id",
            name: "EditSportOrgRatingIndicator",
            component: EditSportOrgRatingIndicator,
          },
        ],
      },
    {
      path: "IHManagement",
      redirect: "/IHManagement/Contract",
      name: "IHManagement",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Contract",
        name: "Contract",
        component: Contract,
      },
      {
        path: "Contract/edit/id=:id",
        name: "EditContract",
        component: EditContract,
      },
      {
        path: "IHIncome",
        name: "IHIncome",
        component: IHIncome,
      },
      {
        path: "IHIncome/edit/id=:id",
        name: "EditIHIncome",
        component: EditIHIncome,
      },
      {
        path: "IHMovement",
        name: "IHMovement",
        component: IHMovement,
      },
      {
        path: "IHMovement/edit/id=:id",
        name: "EditIHMovement",
        component: EditIHMovement,
      },
      {
        path: "IHExpenditure",
        name: "IHExpenditure",
        component: IHExpenditure,
      },
      {
        path: "IHExpenditure/edit/id=:id",
        name: "EditIHExpenditure",
        component: EditIHExpenditure,
      },
      {
        path: "IHMenu",
        name: "IHMenu",
        component: IHMenu,
      },
      {
        path: "IHMenu/edit/id=:id",
        name: "EditIHMenu",
        component: EditIHMenu,
      },
      {
        path: "IHGroup",
        name: "IHGroup",
        component: IHGroup,
      },
      {
        path: "IHGroup/edit/id=:id",
        name: "EditIHGroup",
        component: EditIHGroup,
      },
      {
        path: "ExpenditureType",
        name: "ExpenditureType",
        component: ExpenditureType,
      },
      {
        path: "ExpenditureType/edit/id=:id",
        name: "EditExpenditureType",
        component: EditExpenditureType,
      },
      {
        path: "InventoryHolding",
        name: "InventoryHolding",
        component: InventoryHolding,
      },
      {
        path: "InventoryHolding/edit/id=:id",
        name: "EditInventoryHolding",
        component: EditInventoryHolding,
      },
      {
        path: "MenuType",
        name: "MenuType",
        component: MenuType,
      },
      {
        path: "MenuType/edit/id=:id",
        name: "EditMenuType",
        component: EditMenuType,
      },
      {
        path: "DishGroup",
        name: "DishGroup",
        component: DishGroup,
      },
      {
        path: "DishGroup/edit/id=:id",
        name: "EditDishGroup",
        component: EditDishGroup,
      },
      {
        path: "DietTable",
        name: "DietTable",
        component: DietTable,
      },
      {
        path: "DietTable/edit/id=:id",
        name: "EditDietTable",
        component: EditDietTable,
      },
      {
        path: "Dish",
        name: "Dish",
        component: Dish,
      },
      {
        path: "Dish/edit/id=:id",
        name: "EditDish",
        component: EditDish,
      },
      {
        path: "Kitchen",
        name: "Kitchen",
        component: Kitchen,
      },

      {
        path: "Kitchen/edit/id=:id",
        name: "EditKitchen",
        component: EditKitchen,
      },
      ],
    },
    {
      path: "/StudentManagement",
      redirect: "/StudentManagement/OnlineQueueInfo",
      name: "StudentManagement",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "TransitionSchoolYear",
        name: "TransitionSchoolYear",
        component: TransitionSchoolYear,
      },

      {
        path: "TransitionSchoolYear/edit/id=:id",
        name: "EditTransitionSchoolYear",
        component: EditTransitionSchoolYear,
      },
      {
        path: "TransitionSchoolYear/view/id=:id",
        name: "ViewTransitionSchoolYear",
        component: ViewTransitionSchoolYear,
      },
      {
        path: "OnlineQueueInfo",
        name: "OnlineQueueInfo",
        component: OnlineQueueInfo,
      },
      {
        path: "SchoolAdmissionQuota",
        name: "SchoolAdmissionQuota",
        component: SchoolAdmissionQuota,
      },
      {
        path: "SchoolAdmissionQuota/edit/id=:id",
        name: "EditSchoolAdmissionQuota",
        component: EditSchoolAdmissionQuota,
        props: {
          isview: false,
        },
      },
      {
        path: "SchoolGradeAgeLimit",
        name: "SchoolGradeAgeLimit",
        component: SchoolGradeAgeLimit,
      },
      {
        path: "SchoolGradeAgeLimit/edit/id=:id",
        name: "EditSchoolGradeAgeLimit",
        component: EditSchoolGradeAgeLimit,
        props: {
          isview: false,
        },
      },
      {
        path: "SchoolAdmissionQuotaSend",
        name: "SchoolAdmissionQuotaSend",
        component: SchoolAdmissionQuotaSend,
      },
      {
        path: "SchoolAdmissionQuotaSend/edit/id=:id",
        name: "EditSchoolAdmissionQuotaSend",
        component: EditSchoolAdmissionQuota,
        props: {
          isview: true,
        },
      },
      {
        path: "SchoolAdmEStatement",
        name: "SchoolAdmEStatement",
        component: SchoolAdmEStatement,
      },
      {
        path: "SchoolAdmEStatement/edit/id=:id",
        name: "EditSchoolAdmEStatement",
        component: EditSchoolAdmEStatement,
      },
      {
        path: "SchoolAdmEStatement/uploadfile/id=:id",
        name: "UploadFileSchoolAdmEStatement",
        component: UploadFileSchoolAdmEStatement,
        props: {
          isview: false,
        },
      },
      {
        path: "SchoolAdmEStatementSend",
        name: "SchoolAdmEStatementSend",
        component: SchoolAdmEStatementSend,
      },
      {
        path: "SchoolAdmEStatementSend/uploadfile/id=:id",
        name: "UploadFileSchoolAdmEStatementSend",
        component: UploadFileSchoolAdmEStatement,
        props: {
          isview: true,
        },
      },
      {
        path: "SchoolAdmission",
        name: "SchoolAdmission",
        component: SchoolAdmission,
      },
      {
        path: "SchoolAdmission/edit/id=:id",
        name: "EditSchoolAdmission",
        component: EditSchoolAdmission,
      },
      {
        path: "SchoolAdmission/view/id=:id",
        name: "ViewSchoolAdmission",
        component: ViewSchoolAdmission,
      },
      {
        path: "ImportDocument",
        name: "ImportDocument",
        component: ImportDocument,
      },
      {
        path: "StudentGradeMovement",
        name: "StudentGradeMovement",
        component: StudentGradeMovement,
        props: {
          isLeaveForSecondYear: false,
        },
      },
      {
        path: "LeavingStudentReStudyClass",
        name: "LeavingStudentReStudyClass",
        component: StudentGradeMovement,
        props: {
          isLeaveForSecondYear: true,
        },
      },
      {
        path: "StudentGradeMovement/edit/id=:id",
        name: "EditStudentGradeMovement",
        component: EditStudentGradeMovement,
      },
      {
        path: "StudentExpulsion",
        name: "StudentExpulsion",
        component: StudentExpulsion,
      },
      {
        path: "StudentExpulsion/edit/id=:id",
        name: "EditStudentExpulsion",
        component: EditStudentExpulsion,
      },
      {
        path: "StudentExpulsion/view/id=:id",
        name: "ViewStudentExpulsion",
        component: ViewStudentExpulsion,
      },
      {
        path: "StudentHomeSchooling",
        name: "StudentHomeSchooling",
        component: StudentHomeSchooling,
      },
      {
        path: "StudentHomeSchooling/edit/id=:id",
        name: "EditStudentHomeSchooling",
        component: EditStudentHomeSchooling,
      },
      ],
    },
    {
      path: "/HRManagement",
      redirect: "/HRManagement/HRAcceptanceWork",
      name: "HRManagement",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "HrAcceptanceWork",
        name: "HrAcceptanceWork",
        component: HrAcceptanceWork,
      },
      {
        path: "HrAcceptanceWork/edit/id=:id",
        name: "EditHrAcceptanceWork",
        component: EditHrAcceptanceWork,
      },
      {
        path: "HREmpLeaveOrder",
        name: "HREmpLeaveOrder",
        component: HREmpLeaveOrder,
      },
      {
        path: "HREmpLeaveOrder/edit/id=:id",
        name: "EditHREmpLeaveOrder",
        component: EditHREmpLeaveOrder,
      },

      {
        path: "HrEmpSendTrain",
        name: "HrEmpSendTrain",
        component: HrEmpSendTrain,
      },
      {
        path: "HrEmpSendTrain/edit/id=:id",
        name: "EditHrEmpSendTrain",
        component: EditHrEmpSendTrain,
      },

      {
        path: "HREmpSickLeave",
        name: "HREmpSickLeave",
        component: HREmpSickLeave,
      },
      {
        path: "HREmpSickLeave/edit/id=:id",
        name: "EditHREmpSickLeave",
        component: EditHREmpSickLeave,
      },

      {
        path: "HrRecallLeave",
        name: "HrRecallLeave",
        component: HrRecallLeave,
      },
      {
        path: "HrRecallLeave/edit/id=:id",
        name: "EditHrRecallLeave",
        component: EditHrRecallLeave,
      },
      {
        path: "HRTempCalcKind",
        name: "HRTempCalcKind",
        component: HRTempCalcKind,
      },
      {
        path: "HRTempCalcKind/edit/id=:id",
        name: "EditHRTempCalcKind",
        component: EditHRTempCalcKind,
      },
      {
        path: "PlannedCalculation",
        name: "PlannedCalculation",
        component: PlannedCalculation,
      },
      {
        path: "PlannedCalculation/edit/id=:id",
        name: "EditPlannedCalculation",
        component: EditPlannedCalculation,
      },
      {
        path: "MassPlannedCalculation",
        name: "MassPlannedCalculation",
        component: MassPlannedCalculation,
      },
      {
        path: "MassPlannedCalculation/edit/id=:id",
        name: "EditMassPlannedCalculation",
        component: EditMassPlannedCalculation,
      },
      {
        path: "TaxBenefit",
        name: "TaxBenefit",
        component: TaxBenefit,
      },
      {
        path: "TaxBenefit/edit/id=:id",
        name: "EditTaxBenefit",
        component: EditTaxBenefit,
      },
      {
        path: "HrWorkDayOff",
        name: "HrWorkDayOff",
        component: HrWorkDayOff,
      },
      {
        path: "HrWorkDayOff/edit/id=:id",
        name: "EditHrWorkDayOff",
        component: EditHrWorkDayOff,
      },
      {
        path: "HROrgStructure",
        name: "HROrgStructure",
        component: HROrgStructure,
      },
      {
        path: "HROrgStructure/edit/id=:id",
        name: "EditHROrgStructure",
        component: EditHROrgStructure,
        },
        {
          path: "HRTimeSheet",
          name: "HRTimeSheet",
          component: HRTimeSheet,
        },
        {
          path: "HRTimeSheet/edit/id=:id",
          name: "EditHRTimeSheet",
          component: EditHRTimeSheet,
        },
        {
          path: "HRTimeSheet/edit/tabrow/id=:id",
          name: "EditTabRowHRTimeSheet",
          component: TabRowHRTimeSheet,
        },
        {
          path: "HRTimeSheetEdu",
          name: "HRTimeSheetEdu",
          component: HRTimeSheetEdu,
        },
        {
          path: "HRTimeSheetEdu/edit/id=:id",
          name: "EditHRTimeSheetEdu",
          component: EditHRTimeSheetEdu,
        },
      ],
    },
    {
      path: "/LearningProcessManagement",
      redirect: "/LearningProcessManagement/OrgSchoolParameter",
      name: "LearningProcessManagement",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "TeacherReTraining",
        name: "TeacherReTraining",
        component: TeacherReTraining,
      },
      {
        path: "TeacherReTraining/edit/id=:id",
        name: "EditTeacherReTraining",
        component: EditTeacherReTraining,
      },
      {
        path: "TeacherReTraining/view/id=:id",
        name: "ViewTeacherReTraining",
        component: ViewTeacherReTraining,
      },
      {
        path: "TeacherReTraining/send",
        name: "SendTeacherReTraining",
        component: SendTeacherReTraining,
      },
      {
        path: "AllowedTeachingSubject",
        name: "AllowedTeachingSubject",
        component: AllowedTeachingSubject,
      },
      {
        path: "AllowedTeachingSubject/edit/id=:id",
        name: "EditAllowedTeachingSubject",
        component: EditAllowedTeachingSubject,
      },
      {
        path: "AllowedTeachingSubject/view/id=:id",
        name: "ViewAllowedTeachingSubject",
        component: ViewAllowedTeachingSubject,
        },
      {
        path: "OrgSchoolParameter",
        name: "OrgSchoolParameter",
        component: OrgSchoolParameter,
      },
      {
        path: "StudentSchoolMovement",
        name: "StudentSchoolMovement",
        component: StudentSchoolMovement,
      },
      {
        path: "StudentSchoolMovement/edit/id=:id",
        name: "EditStudentSchoolMovement",
        component: EditStudentSchoolMovement,
      },
      {
        path: "StudentSchoolMovement/view/id=:id",
        name: "ViewStudentSchoolMovement",
        component: ViewStudentSchoolMovement,
      },
      {
        path: "OrgSchoolParameter/edit/id=:id",
        name: "EditOrgSchoolParameter",
        component: EditOrgSchoolParameter,
      },
      {
        path: "HigherEduDiplom",
        name: "HigherEduDiplom",
        component: HigherEduDiplom,
      },
      {
        path: "HigherEduDiplom/edit/id=:id",
        name: "EditHigherEduDiplom",
        component: EditHigherEduDiplom,
      },
      {
        path: "Curriculum",
        name: "Curriculum",
        component: Curriculum,
      },
      {
        path: "Curriculum/edit/id=:id&isclone:isclone",
        name: "EditCurriculum",
        component: EditCurriculum,
      },
      {
        path: "Curriculum/view/id=:id",
        name: "ViewCurriculum",
        component: ViewCurriculum,
      },
      {
        path: "BasicTariffRate",
        name: "BasicTariffRate",
        component: BasicTariffRate,
      },
      {
        path: "BasicTariffRate/edit/id=:id",
        name: "EditBasicTariffRate",
        component: EditBasicTariffRate,
      },
      {
        path: "BasicTariffRate/view/id=:id",
        name: "ViewBasicTariffRate",
        component: ViewBasicTariffRate,
      },
      {
        path: "CertForeignLang/view/id=:id",
        name: "ViewCertForeignLang",
        component: ViewCertForeignLang,
      },
      {
        path: "HigherEduDiplom/view/id=:id",
        name: "ViewHigherEduDiplom",
        component: ViewHigherEduDiplom,
      },
      {
        path: "TarifficationTitle",
        name: "TarifficationTitle",
        component: TarifficationTitle,
      },
      {
        path: "TarifficationTitle/edit/id=:id",
        name: "EditTarifficationTitle",
        component: EditTarifficationTitle,
      },
      {
        path: "TarifficationTitle/view/id=:id",
        name: "ViewTarifficationTitle",
        component: ViewTarifficationTitle,
      },
      {
        path: "TarifficationTitleForControl",
        name: "TarifficationTitleForControl",
        component: TarifficationTitleForControl,
      },
      {
        path: "TarifficationTitleForControl/view/id=:id",
        name: "ViewTarifficationTitleForControl",
        component: ViewTarifficationTitleForControl,
      },
      {
        path: "CurriculumOrgschGrade",
        name: "CurriculumOrgschGrade",
        component: CurriculumOrgschGrade,
      },
      {
        path: "CurriculumOrgschGrade/edit/id=:id",
        name: "EditCurriculumOrgschGrade",
        component: EditCurriculumOrgschGrade,
      },
      {
        path: "HeadOrgSchoolGrade",
        name: "HeadOrgSchoolGrade",
        component: HeadOrgSchoolGrade,
      },
      {
        path: "HeadOrgSchoolGrade/edit/id=:id",
        name: "EditHeadOrgSchoolGrade",
        component: EditHeadOrgSchoolGrade,
      },
      {
        path: "HeadOrgSchoolGrade/view/id=:id",
        name: "ViewHeadOrgSchoolGrade",
        component: ViewHeadOrgSchoolGrade,
      },
      {
        path: "OrgSchoolGradeControl",
        name: "OrgSchoolGradeControl",
        component: OrgSchoolGradeControl,
      },
      {
        path: "OrgSchoolGradeControl/edit/id=:id",
        name: "EditOrgSchoolGradeControl",
        component: EditOrgSchoolGradeControl,
      },
      {
        path: "OrgSchoolGradeControl/edit/id=:id",
        name: "ViewOrgSchoolGradeControl",
        component: ViewOrgSchoolGradeControl,
      },
      {
        path: "HeadOrgSchoolSubject",
        name: "HeadOrgSchoolSubject",
        component: HeadOrgSchoolSubject,
      },
      {
        path: "HeadOrgSchoolSubject/edit/id=:id",
        name: "EditHeadOrgSchoolSubject",
        component: EditHeadOrgSchoolSubject,
      },
      {
        path: "AppointQualCategory",
        name: "AppointQualCategory",
        component: AppointQualCategory,
      },
      {
        path: "AppointQualCategory/edit/id=:id",
        name: "EditAppointQualCategory",
        component: EditAppointQualCategory,
      },
      {
        path: "AppointQualCategory/view/id=:id",
        name: "ViewAppointQualCategory",
        component: ViewAppointQualCategory,
      },
      {
        path: "AppointQualCategory1",
        name: "AppointQualCategory1",
        component: AppointQualCategory1,
      },
      {
        path: "AppointQualCategory1/edit/id=:id",
        name: "EditAppointQualCategory1",
        component: EditAppointQualCategory1,
      },
      {
        path: "AppointQualCategory1/view/id=:id",
        name: "ViewAppointQualCategory1",
        component: ViewAppointQualCategory1,
      },
      {
        path: "AppointQualCategory2",
        name: "AppointQualCategory2",
        component: AppointQualCategory2,
      },
      {
        path: "AppointQualCategory2/edit/id=:id",
        name: "EditAppointQualCategory2",
        component: EditAppointQualCategory2,
      },
      {
        path: "AppointQualCategory2/view/id=:id",
        name: "ViewAppointQualCategory2",
        component: ViewAppointQualCategory2,
      },
      {
        path: "SportCoachCertificate",
        name: "SportCoachCertificate",
        component: SportCoachCertificate,
      },
      {
        path: "SportCoachCertificate/edit/id=:id",
        name: "EditSportCoachCertificate",
        component: EditSportCoachCertificate,
      },
      {
        path: "SportCoachCertificate/view/id=:id",
        name: "ViewSportCoachCertificate",
        component: ViewSportCoachCertificate,
      },
      {
        path: "CertForeignLang",
        name: "CertForeignLang",
        component: CertForeignLang,
      },
      {
        path: "CertForeignLang/edit/id=:id",
        name: "EditCertForeignLang",
        component: EditCertForeignLang,
      },
      {
        path: "CertForeignLangType",
        name: "CertForeignLangType",
        component: CertForeignLangType,
      },
      {
        path: "CertForeignLangType/edit/id=:id",
        name: "EditCertForeignLangType",
        component: EditCertForeignLangType,
      },

      {
        path: "AllowanceByRegion",
        name: "AllowanceByRegion",
        component: AllowanceByRegion,
      },
      {
        path: "AllowanceByRegion/edit/id=:id",
        name: "EditAllowanceByRegion",
        component: EditAllowanceByRegion,
      },
      {
        path: "AllowanceFarRegion",
        name: "AllowanceFarRegion",
        component: AllowanceFarRegion,
      },
      {
        path: "AllowanceFarRegion/edit/id=:id",
        name: "EditAllowanceFarRegion",
        component: EditAllowanceFarRegion,
      },
      {
        path: "AllowanceWorkExperience",
        name: "AllowanceWorkExperience",
        component: AllowanceWorkExperience,
      },
      {
        path: "AllowanceWorkExperience/edit/id=:id",
        name: "EditAllowanceWorkExperience",
        component: EditAllowanceWorkExperience,
      },
      {
        path: "OlympiadWinner",
        name: "OlympiadWinner",
        component: OlympiadWinner,
      },
      {
        path: "OlympiadWinner/edit/id=:id",
        name: "EditOlympiadWinner",
        component: EditOlympiadWinner,
      },
      {
        path: "AppointDirFondAllwnc",
        name: "AppointDirFondAllwnc",
        component: AppointDirFondAllwnc,
      },
      {
        path: "AppointDirFondAllwnc/edit/id=:id",
        name: "EditAppointDirFondAllwnc",
        component: EditAppointDirFondAllwnc,
      },
      {
        path: "AppointEmpAllWnc",
        name: "AppointEmpAllWnc",
        component: AppointEmpAllWnc,
      },
      {
        path: "AppointEmpAllWnc/edit/id=:id",
        name: "EditAppointEmpAllWnc",
        component: EditAppointEmpAllWnc,
      },
      {
        path: "Headroom",
        name: "Headroom",
        component: Headroom,
      },
      {
        path: "Headroom/edit/id=:id",
        name: "EditHeadroom",
        component: EditHeadroom,
      },
      {
        path: "HonoraryTitle",
        name: "HonoraryTitle",
        component: HonoraryTitle,
      },
      {
        path: "HonoraryTitle/edit/id=:id",
        name: "EditHonoraryTitle",
        component: EditHonoraryTitle,
      },
      {
        path: "TeacherHour",
        name: "TeacherHour",
        component: TeacherHour,
      },
      {
        path: "TeacherHour/edit/id=:id",
        name: "EditTeacherHour",
        component: EditTeacherHour,
      },
      {
        path: "Tariffication",
        name: "Tariffication",
        component: Tariffication,
      },
      {
        path: "Tariffication/edit/id=:id",
        name: "EditTariffication",
        component: EditTariffication,
      },
      {
        path: "HrReplacementHour",
        name: "HrReplacementHour",
        component: HrReplacementHour,
      },
      {
        path: "HrReplacementHour/edit/id=:id",
        name: "EditHrReplacementHour",
        component: EditHrReplacementHour,
      },
      ],
    },
    {
      path: "/SalaryCalculationManagement",
      redirect: "/SalaryCalculationManagement",
      name: "SalaryCalculationManagement",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "StaffingTemplate",
        name: "StaffingTemplate",
        component: StaffingTemplate,
      },
      {
        path: "StaffingTemplate/edit/id=:id",
        name: "EditStaffingTemplate",
        component: EditStaffingTemplate,
      },
      {
        path: "Staffing",
        name: "Staffing",
        component: Staffing,
      },
      {
        path: "Staffing/edit/id=:id",
        name: "EditStaffing",
        component: EditStaffing,
      },
      {
        path: "AppointEmpSalary",
        name: "AppointEmpSalary",
        component: AppointEmpSalary,
      },
      {
        path: "AppointEmpSalary/edit/id=:id",
        name: "EditAppointEmpSalary",
        component: EditAppointEmpSalary,
      },
      {
        path: "UnpaidHREmpleaveOrder",
        name: "UnpaidHREmpleaveOrder",
        component: UnpaidHREmpleaveOrder,
      },
      {
        path: "GetUnpaidHrAcceptanceWorkList",
        name: "GetUnpaidHrAcceptanceWorkList",
        component: GetUnpaidHrAcceptanceWorkList,
      },
      {
        path: "UnpaidHREmpSickLeave",
        name: "UnpaidHREmpSickLeave",
        component: UnpaidHREmpSickLeave,
      },
      {
        path: "CalcLeavePay",
        name: "CalcLeavePay",
        component: CalcLeavePay,
      },
      {
        path: "CalcLeavePay/edit/id=:id",
        name: "EditCalcLeavePay",
        component: EditCalcLeavePay,
      },
      {
        path: "CalcSendTrain",
        name: "CalcSendTrain",
        component: CalcSendTrain,
      },
      {
        path: "CalcSendTrain/edit/id=:id",
        name: "EditCalcSendTrain",
        component: EditCalcSendTrain,
      },
      {
        path: "SchoolHoliday",
        name: "SchoolHoliday",
        component: SchoolHoliday,
      },
      {
        path: "SchoolHoliday/edit/id=:id",
        name: "EditSchoolHoliday",
        component: EditSchoolHoliday,
      },
      {
        path: "SchHourlyPayRate",
        name: "SchHourlyPayRate",
        component: SchHourlyPayRate,
      },
      {
        path: "SchHourlyPayRate/edit/id=:id",
        name: "EditSchHourlyPayRate",
        component: EditSchHourlyPayRate,
      },

      
      {
        path: "HRTimeSheetSentList",
        name: "HRTimeSheetSentList",
        component: HRTimeSheetSentList,
      },
      {
        path: "HRTimeSheetEduSentList",
        name: "HRTimeSheetEduSentList",
        component: HRTimeSheetEduSentList,
      },
      {
        path: "SalaryCalc",
        name: "SalaryCalc",
        component: SalaryCalc,
      },
      {
        path: "SalaryCalc/edit/id=:id",
        name: "EditSalaryCalc",
        component: EditSalaryCalc,
      },
      {
        path: "PayrollSheet",
        name: "PayrollSheet",
        component: PayrollSheet,
      },
      {
        path: "PayrollSheet/edit/id=:id",
        name: "EditPayrollSheet",
        component: EditPayrollSheet,
      },
      ],
    },
    {
      path: "/SchoolEducationReports",
      redirect: "/SchoolEducationReports/ReportEmployeesCount",
      name: "SchoolEducationReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
      {
        path: "ReportEmployeesCount",
        name: "ReportEmployeesCount",
        component: ReportEmployeesCount,
      },
      {
        path: "ReportEmployeesCou",
        name: "ReportEmployeesCou",
        component: ReportEmployeesCou,
      },
      {
        path: "ReportTarifficationData",
        name: "ReportTarifficationData",
        component: ReportTarifficationData,
      },
      {
        path: "TotalCurriculum",
        name: "TotalCurriculum",
        component: TotalCurriculum,
      },
      ],
    },
    {
      path: "/OnlineQueueReports",
      redirect: "/OnlineQueueReports/AdmQuotaByOblastList",
      name: "OnlineQueueReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "SchoolAdmQuotaCount",
        name: "SchoolAdmQuotaCount",
        component: SchoolAdmQuotaCount,
      },
      {
        path: "AdmQuotaByOblastList",
        name: "AdmQuotaByOblastList",
        component: AdmQuotaByOblastList,
      },
      {
        path: "AdmQuotaByRegionList",
        name: "AdmQuotaByRegionList",
        component: AdmQuotaByRegionList,
      },
      {
        path: "AdmQuotaBySchoolList",
        name: "AdmQuotaBySchoolList",
        component: AdmQuotaBySchoolList,
      },
      {
        path: "AdmQuotaAndEstatement",
        name: "AdmQuotaAndEstatement",
        component: AdmQuotaAndEstatement,
      },
      {
        path: "OnlineRating",
        name: "OnlineRating",
        component: OnlineRating,
      },
      {
        path: "ReportOnlinequeueInfo",
        name: "ReportOnlinequeueInfo",
        component: ReportOnlinequeueInfo,
      },
      ],
    },
    {
      path: "/OrganizationReports",
      redirect: "/OrganizationReports/OrganizationCard",
      name: "OrganizationReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "OrganizationCard",
        name: "OrganizationCard",
        component: OrganizationCard,
      },
      {
        path: "ReportSchoolInfo",
        name: "ReportSchoolInfo",
        component: ReportSchoolInfo,
      },
      {
        path: "HeadOrgSchoolGradeCount",
        name: "HeadOrgSchoolGradeCount",
        component: HeadOrgSchoolGradeCount,
      },
      {
        path: "GetOrgSchoolGradeCountByLanguage",
        name: "GetOrgSchoolGradeCountByLanguage",
        component: GetOrgSchoolGradeCountByLanguage,
      },
      {
        path: "GetSchoolCountBySchoolYearReady",
        name: "GetSchoolCountBySchoolYearReady",
        component: GetSchoolCountBySchoolYearReady,
      },
      {
        path: "GetSchoolCountByOrgType",
        name: "GetSchoolCountByOrgType",
        component: GetSchoolCountByOrgType,
      },
      ],
    },
    {
      path: "/EmployeeReports",
      redirect: "/EmployeeReports/EmployeeCard",
      name: "EmployeeReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "EmployeeCard",
        name: "EmployeeCard",
        component: EmployeeCard,
      },
      // 
      {
        path: "ReportEmployeeCount",
        name: "ReportEmployeeCount",
        component: ReportEmployeeCount,
      },
      {
        path: "EmployeeList",
        name: "EmployeeList",
        component: EmployeeList,
      },
      {
        path: "StaffReportCount",
        name: "StaffReportCount",
        component: StaffReportCount,
      },
      {
        path: "GetReportHonorarytitledEmployeeCount",
        name: "GetReportHonorarytitledEmployeeCount",
        component: GetReportHonorarytitledEmployeeCount,
      },
      {
        path: "StaffReportList",
        name: "StaffReportList",
        component: StaffReportList,
      },
      // {
      //   path: "GetTrenerReport",
      //   name: "GetTrenerReport",
      //   component: GetTrenerReport,
      // },
      {
        path: "GetEmployeeForAdmin",
        name: "GetEmployeeForAdmin",
        component: GetEmployeeForAdmin,
      },
      {
        path: "ReportVacancy",
        name: "ReportVacancy",
        component: ReportVacancy,
      },
      {
        path: "ReportHigherEduDiplom",
        name: "ReportHigherEduDiplom",
        component: ReportHigherEduDiplom,
      },
      ],
    },
    {
      path: "/StudentReports",
      redirect: "/StudentReports/StudentCard",
      name: "StudentReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "StudentCard",
        name: "StudentCard",
        component: StudentCard,
      },
      {
        path: "OtherStudentsCount",
        name: "OtherStudentsCount",
        component: OtherStudentsCount,
      },
      {
        path: "StudentList",
        name: "StudentList",
        component: StudentList,
      },
      {
        path: "ReportTheAmountPerStudent",
        name: "ReportTheAmountPerStudent",
        component: ReportTheAmountPerStudent,
      },
      {
        path: "ReportStudentMovement",
        name: "ReportStudentMovement",
        component: ReportStudentMovement,
      },
      {
        path: "GetGraduatedFromGrade11Count",
        name: "GetGraduatedFromGrade11Count",
        component: GetGraduatedFromGrade11Count,
      },
      {
        path: "ReportGraduatedFromGrade11",
        name: "ReportGraduatedFromGrade11",
        component: ReportGraduatedFromGrade11,
      },
      {
        path: "ReportColorRatingOfSchools",
        name: "ReportColorRatingOfSchools",
        component: ReportColorRatingOfSchools,
      },

      {
        path: "GetSchoolStudentCountBySchoolGrade",
        name: "GetSchoolStudentCountBySchoolGrade",
        component: GetSchoolStudentCountBySchoolGrade,
      },
      {
        path: "GetStudentsCountInSchool",
        name: "GetStudentsCountInSchool",
        component: GetStudentsCountInSchool,
      },
      {
        path: "EstatementStudentsCountInSchool",
        name: "EstatementStudentsCountInSchool",
        component: EstatementStudentsCountInSchool,
      },
      {
        path: "CovidVacEmployeesCount",
        name: "CovidVacEmployeesCount",
        component: CovidVacEmployeesCount,
      },
      {
        path: "ComparedAdmChildCount",
        name: "ComparedAdmChildCount",
        component: ComparedAdmChildCount,
      },
      {
        path: "SportTitleDocumentReport",
        name: "SportTitleDocumentReport",
        component: SportTitleDocumentReport,
      },
      {
        path: "NumberOfSportTypeStudents",
        name: "NumberOfSportTypeStudents",
        component: NumberOfSportTypeStudents,
      },
      ],
    },
    {
      path: "/ReportAboniment",
      redirect: "/ReportAboniment/sportcirclereport",
      name: "ReportAboniment",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "sportcirclereport",
          name: "sportcirclereport",
          component: sportcirclereport,
        },
        {
          path: "GetTourniquetDevicelogByGuest",
          name: "GetTourniquetDevicelogByGuest",
          component: GetTourniquetDevicelogByGuest,
        },
        {
          path: "TourniquetDevicelogByTerritory",
          name: "TourniquetDevicelogByTerritory",
          component: TourniquetDevicelogByTerritory,
        },
        {
          path: "StudentTourniquetDevicelogByTerritory",
          name: "StudentTourniquetDevicelogByTerritory",
          component: StudentTourniquetDevicelogByTerritory,
        },
        {
          path: "studentsportcirclereport",
          name: "studentsportcirclereport",
          component: studentsportcirclereport,
        },
        {
          path: "PersonTourniquetDevicelogByTerritory",
          name: "PersonTourniquetDevicelogByTerritory",
          component: PersonTourniquetDevicelogByTerritory,
        },
        {
          path: "personsportcirclereport",
          name: "personsportcirclereport",
          component: personsportcirclereport,
        },
        {
          path: "membershippaymentreportlist",
          name: "membershippaymentreportlist",
          component: membershippaymentreportlist,
        },
        {
          path: "membershippaymentreportcount",
          name: "membershippaymentreportcount",
          component: membershippaymentreportcount,
        },
        {
          path: "gettourniquetenterencecount",
          name: "gettourniquetenterencecount",
          component: gettourniquetenterencecount,
        }
      ],
    },
    {
      path: "/ReportIH",
      redirect: "/ReportIH/IHRest",
      name: "ReportIH",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "IHRest",
        name: "IHRest",
        component: IHRest,
      },
      {
        path: "IHTurnOver",
        name: "IHTurnOver",
        component: IHTurnOver,
      },
      ],
    },
    {
      path: "/KeyIndicators",
      redirect: "/KeyIndicators/ReportOperatingSchools",
      name: "KeyIndicators",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "ReportOperatingSchools",
        name: "ReportOperatingSchools",
        component: ReportOperatingSchools,
      },
      {
        path: "PermanentAssetReport",
        name: "PermanentAssetReport",
        component: PermanentAssetReport,
      },
      {
        path: "GetPermanentAssetCard",
        name: "GetPermanentAssetCard",
        component: GetPermanentAssetCard,
      },
      {
        path: "MovedSchoolCount",
        name: "MovedSchoolCount",
        component: MovedSchoolCount,
      },
      {
        path: "ReportStudentsCount",
        name: "ReportStudentsCount",
        component: ReportStudentsCount,
      },
      {
        path: "SchoolsOfEducation",
        name: "SchoolsOfEducation",
        component: SchoolsOfEducation,
      },
      {
        path: "GetTeachersCountInSchool",
        name: "GetTeachersCountInSchool",
        component: GetTeachersCountInSchool,
      },

      {
        path: "LocationOfSchools",
        name: "LocationOfSchools",
        component: LocationOfSchools,
      },
      {
        path: "SequenceOfEducation",
        name: "SequenceOfEducation",
        component: SequenceOfEducation,
      },
      {
        path: "StudentCapacity",
        name: "StudentCapacity",
        component: StudentCapacity,
      },
      {
        path: "HighSchoolGroups",
        name: "HighSchoolGroups",
        component: HighSchoolGroups,
      },
      {
        path: "GroupsOfNumberClass",
        name: "GroupsOfNumberClass",
        component: GroupsOfNumberClass,
      },
      {
        path: "ForienLanguage",
        name: "ForienLanguage",
        component: ForienLanguage,
      },
      {
        path: "AcrossCities",
        name: "AcrossCities",
        component: AcrossCities,
      },
      {
        path: "BranchesOfSchools",
        name: "BranchesOfSchools",
        component: BranchesOfSchools,
      },
      {
        path: "NumberOfEducational",
        name: "NumberOfEducational",
        component: NumberOfEducational,
      },
      {
        path: "SpecializedSchool",
        name: "SpecializedSchool",
        component: SpecializedSchool,
      },
      {
        path: "GetPersonAndStudentPlan",
        name: "GetPersonAndStudentPlan",
        component: GetPersonAndStudentPlan,
      },
      {
        path: "SchoolCoefficient",
        name: "SchoolCoefficient",
        component: SchoolCoefficient,
      },
      ],
    },
    {
      path: "/BankReports",
      redirect: "/BankReports/ReportTreasBankDocumentByDebitCredit",
      name: "BankReports",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "ReportTreasBankDocumentByDebitCredit",
        name: "ReportTreasBankDocumentByDebitCredit",
        component: ReportTreasBankDocumentByDebitCredit,
      },
      {
        path: "TreasBankDocument",
        name: "TreasBankDocument",
        component: TreasBankDocument,
      },
      ],
    },
    {
      path: "/SportReport",
      redirect: "/SportReport/FormingGroupCount",
      name: "SportReport",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "FormingGroupCount",
        name: "FormingGroupDate",
        component: FormingGroupDate,
      },
      {
        path: "SportStudentManageList",
        name: "SportStudentManageList",
        component: SportStudentManageList,
      },
      {
        path: "ReportSportTitleDocument",
        name: "ReportSportTitleDocument",
        component: ReportSportTitleDocument,
      },
      {
        path: "ReportStudentTitleList",
        name: "ReportStudentTitleList",
        component: ReportStudentTitleList,
      },
      {
        path: "GetReportAthleticAchievement",
        name: "GetReportAthleticAchievement",
        component: GetReportAthleticAchievement,
      },
      {
        path: "GetAnthropometricCount",
        name: "GetAnthropometricCount",
        component: GetAnthropometricCount,
      },
      {
        path: "AnthropomentricReportBySportsmen",
        name: "AnthropomentricReportBySportsmen",
        component: AnthropomentricReportBySportsmen,
      },
      {
        path: "GetReportSportCoachCertificateCount",
        name: "GetReportSportCoachCertificateCount",
        component: GetReportSportCoachCertificateCount,
      },
      {
        path: "GetReportSportCoachCertificateList",
        name: "GetReportSportCoachCertificateList",
        component: GetReportSportCoachCertificateList,
      },
      {
        path: "GetReportAppointQualCategoryCoachCount",
        name: "GetReportAppointQualCategoryCoachCount",
        component: GetReportAppointQualCategoryCoachCount,
      },
      {
        path: "GetReportAthleticAchievementCount",
        name: "GetReportAthleticAchievementCount",
        component: GetReportAthleticAchievementCount,
      },
      {
        path: "GetReportAthleticAchievementList",
        name: "GetReportAthleticAchievementList",
        component: GetReportAthleticAchievementList,
      },

      {
        path: "GetReportAppointQualCategoryCoachCount",
        name: "GetReportAppointQualCategoryCoachCount",
        component: GetReportAppointQualCategoryCoachCount,
      },
      {
        path: "GetReportAppointQualCategoryInstructorCount",
        name: "GetReportAppointQualCategoryInstructorCount",
        component: GetReportAppointQualCategoryInstructorCount,
      },
      {
        path: "GetReportAppointQualCategoryCoachList",
        name: "GetReportAppointQualCategoryCoachList",
        component: GetReportAppointQualCategoryCoachList,
      },
      {
        path: "GetReportAppointQualCategoryInstrcutorList",
        name: "GetReportAppointQualCategoryInstrcutorList",
        component: GetReportAppointQualCategoryInstrcutorList,
      },
      {
        path: "GetReportAppointQualCategoryJuryCount",
        name: "GetReportAppointQualCategoryJuryCount",
        component: GetReportAppointQualCategoryJuryCount,
      },
      {
        path: "GetReportAppointQualCategoryJuryList",
        name: "GetReportAppointQualCategoryJuryList",
        component: GetReportAppointQualCategoryJuryList,
      },
      {
        path: "GetReportAthleticAchievementCount",
        name: "GetReportAthleticAchievementCount",
        component: GetReportAthleticAchievementCount,
      },
      {
        path: "ReportFormingTeamSquad",
        name: "ReportFormingTeamSquad",
        component: ReportFormingTeamSquad,
      },
      {
        path: "ReportFormingTeamSquadSportsman",
        name: "ReportFormingTeamSquadSportsman",
        component: ReportFormingTeamSquadSportsman,
      },
      {
        path: "ReportAppointQualCategoryCoachCount",
        name: "ReportAppointQualCategoryCoachCount",
        component: ReportAppointQualCategoryCoachCount,
      },
      {
        path: "ReportAthletePassportCount",
        name: "ReportAthletePassportCount",
        component: ReportAthletePassportCount,
      },
      {
        path: "ReportAthletePassportList",
        name: "ReportAthletePassportList",
        component: ReportAthletePassportList,
      },
      {
        path: "ReportCoachPortfolioCount",
        name: "ReportCoachPortfolioCount",
        component: ReportCoachPortfolioCount,
        },
        {
          path: "GetReportCoachSportLevelCount",
          name: "GetReportCoachSportLevelCount",
          component: GetReportCoachSportLevelCount,
        },
        {
          path: "GetReportCoachSportLevelList",
          name: "GetReportCoachSportLevelList",
          component: GetReportCoachSportLevelList,
        },
      ],
      },
    //  Musobaqa hisoboti
      {
        path: "/SportReport",
        redirect: "/SportReport/GetReportCompetitionWinnerList",
        name: "Musobaqa hisoboti",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
          path: "GetReportCompetitionWinnerList",
          name: "GetReportCompetitionWinnerList",
          component: GetReportCompetitionWinnerList,
          }
        ]
      },
    {
      path: "/Management",
      redirect: "/Management/Roles",
      name: "Management",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [{
        path: "Roles",
        name: "Roles",
        component: Roles,
      },
      {
        path: "Roles/edit/id=:id",
        name: "EditRoles",
        component: EditRoles,
      },
      {
        path: "Table",
        name: "Table",
        component: Table,
      },
      {
        path: "Table/edit/id=:id",
        name: "EditTable",
        component: EditTable,
      },
      {
        path: "Organization",
        name: "Organization",
        component: Organization,
      },
      {
        path: "Organization/edit/id=:id",
        name: "EditOrganization",
        component: EditOrganization,
      },
      {
        path: "OrgInfo",
        name: "OrgInfo",
        component: OrgInfo,
      },
      {
        path: "BlockDocumentAction",
        name: "BlockDocumentAction",
        component: BlockDocumentAction,
      },
      {
        path: "BlockDocumentAction/edit/id=:id",
        name: "EditBlockDocumentAction",
        component: EditBlockDocumentAction,
      },
      {
        path: "FixingDocument",
        name: "FixingDocument",
        component: FixingDocument,
      },
      {
        path: "FixingDocument/edit/id=:id",
        name: "EditFixingDocument",
        component: EditFixingDocument,
        props: {
          isview: false,
        },
      },
      {
        path: "OrgInfo/edit/id=:id",
        name: "EditOrgInfo",
        component: EditOrgInfo,
      },
      {
        path: "AppClient",
        name: "AppClient",
        component: AppClient,
      },
      {
        path: "AppClient/edit/id=:id",
        name: "EditAppClient",
        component: EditAppClient,
      },
      {
        path: "OrgIntegrationInfo",
        name: "OrgIntegrationInfo",
        component: OrgIntegrationInfo,
      },
      {
        path: "OrgIntegrationInfo/edit/id=:id",
        name: "EditOrgIntegrationInfo",
        component: EditOrgIntegrationInfo,
      },
      {
        path: "User",
        name: "User",
        component: User,
      },
      {
        path: "User/edit/id=:id",
        name: "EditUser",
        component: EditUser,
      },
      {
        path: "OrgTourniquetDevice",
        name: "OrgTourniquetDevice",
        component: OrgTourniquetDevice,
      },
      {
        path: "OrgTourniquetDevice/edit/id=:id",
        name: "EditOrgTourniquetDevice",
        component: EditOrgTourniquetDevice,
      },
      {
        path: "BatchDeleteLog",
        name: "BatchDeleteLog",
        component: BatchDeleteLog,
      },
      {
        path: "BatchDeleteLog/edit/id=:id",
        name: "EditBatchDeleteLog",
        component: EditBatchDeleteLog,
      },
      {
        path: "LongRunningQuery",
        name: "LongRunningQuery",
        component: LongRunningQuery,
      },
      {
        path: "LongRunningQuery/view/id=:id",
        name: "ViewLongRunningQuery",
        component: ViewLongRunningQuery,
      },
      ],
    },
    ],
  },
  {
    path: "/error/403",
    name: "Page403",
    component: Page403,
  },
  {
    path: "/error/500",
    name: "Page500",
    component: Page500,
  },
  {
    path: "/public_offer",
    name: "Oferta",
    component: Oferta,
    meta: {
      public: true, // allow even if not logged in
      onlyWhenLoggedOut: true,
    },
  },
  {
    path: "*",
    name: "Page404",
    component: Page404,
  },
  {
    path: "/user",
    redirect: "/dashboard",
    name: "User",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    children: [{
      path: "login",
      name: "Login",
      component: LoginSport,
      meta: {
        public: true, // allow even if not logged in
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: "signup",
      name: "signup",
      component: Register,
      meta: {
        public: true, // allow even if not logged in
        onlyWhenLoggedOut: true,
      },
    },
    ],
  },
  ];
}

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: configRoutes(),
});
// GLOBAL ROUTER BEFOREEACH GUARD
router.beforeEach((to, from, next) => {
  ApiService.mount401Interceptor();
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getUserInfo();
  // var loggedIn =
  // const loggedIn = axios.interceptors.request.use(function (response) {
  //   return response
  // }, function (error) {
  //   console.log(error.response.data)
  //   if (error.response.status === 401) {
  //     store.dispatch('logout')
  //     router.push('/login')
  //   }
  //   return Promise.reject(error)
  // })
  to;
  from;
  if (!isPublic && !loggedIn && to.name != "signup") {
    next({
      path: "/user/login",
      query: {
        redirect: to.fullPath == "/pages/login" ? "/dashboard" : to.fullPath,
      }, // Store the full path to redirect the user to after login
    });
  }
  // if(to.path.split("/")[1] !== 'dashboard' && to.path.split("/")[1] !== 'error'){
  // 	let path = to.path.split("/")[1];
  // 	let perm = path.charAt(0).toUpperCase() + path.slice(1) + 'View';
  // 	if(!ability.can(perm,'permissions')){
  // 		return next('/error/403')
  // 	}
  // }
  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    next("/dashboard");
  }

  next();
});

export default router;
import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'
import ihmovement from '@/store/modules/ihmovement.module'
import app from './app'
import storage from './storage'
import {abilityPlugin, ability as appAbility} from './ability'
import SubjectsTheYearOfSchoolModule from './modules/SubjectsTheYearOfShcool.module'
import StudentFinalMarkModule from './modules/StudentFinalMark.module'
Vue.use(Vuex);
export const ability = appAbility;

export default new Vuex.Store({
	state:{
		connected: false,
		sport: {
			typeid: 0,
			index: 0,
			sportmantypeid: 0,
			sporttypeid : 0
		},
		FormingSportGroupFilter: {},
		OrganizationFilter: {},
		SportTitleDocumentFilter: {},
		AthleticAchievementFilter: {},
		AnthropometricFilter: {},
		FormingTeamSquadFilter: {},
		AthletePreparingCompetFilter: {},
		AthleteRoadMapFilter: {},
		CompetitionFilter: {},
		error: '',
		message: '',
		packageVersion: process.env.PACKAGE_VERSION || '0',
		activeMenu : ""
	},
	plugins: [
		storage({
			storedKeys: ['rules'],
			destroyOn: ['auth/logoutSuccess']
		}),
		abilityPlugin
	],
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		app,
		ihmovement: ihmovement,
		'StudentFinalMark': StudentFinalMarkModule,
		'subjectsTheYearOfSchool': SubjectsTheYearOfSchoolModule
	},
	getters: {
		appVersion: (state) => {
			return state.packageVersion
		}
	}
})

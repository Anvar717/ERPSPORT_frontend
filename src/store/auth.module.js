import {UserService, AuthenticationError} from '../services/user.service'
import {TokenService} from '../services/storage.service'
import router from '../router'


const state = {
	authenticating: false,
	accessToken: '',
	rules: [],
	authenticationErrorCode: 0,
	authenticationError: '',
	refreshTokenPromise: null, // Holds the promise of the refresh token
	UserInfo: {}
};

const getters = {
	loggedIn: (state) => {
		return state.accessToken ? true : false
	},

	authenticationErrorCode: (state) => {
		return state.authenticationErrorCode
	},

	authenticationError: (state) => {
		return state.authenticationError
	},

	authenticating: (state) => {
		return state.authenticating
	}
};

const actions = {
	async signIn({commit},data) {
		try {
			commit('loginSuccess', data)
			router.push('/');
			return true
		}
		catch (e) {
			(e.message);
			if (e instanceof AuthenticationError) {
				commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
			}

			return false
		}
	},
	async login({commit}, {Username, Password}) {
		commit('loginRequest');

		try {
			const data = await UserService.login(Username, Password);
			commit('loginSuccess', data);

			// Redirect the user to the page he first tried to visit or to the home view
			router.push('/');

			return true
		} catch (e) {
			(e);
			(e.message);
			if (e instanceof AuthenticationError) {
				commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
			}

			return false
		}
	},
	async loginByToken({commit}, {signedData}) {
		try {
			const data = await UserService.loginEsp(signedData);
			commit('loginSuccess', data);

			// Redirect the user to the page he first tried to visit or to the home view
			router.push('/');

			return true
		} catch (e) {
			if (e instanceof AuthenticationError) {
				commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
			}

			return false
		}
	},

	refreshToken({commit, state}) {
		// If this is the first time the refreshToken has been called, make a request
		// otherwise return the same promise to the caller
		if (!state.refreshTokenPromise) {
			const p = UserService.refreshToken()
			commit('refreshTokenPromise', p)

			// Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
			// Clear the promise on error as well.
			p.then(
				response => {
					commit('refreshTokenPromise', null)
					commit('loginSuccess', response)
				},
				error => {
					commit('refreshTokenPromise', null)
				}
			)
		}

		return state.refreshTokenPromise
	},

	logout({commit}) {
		UserService.logout()
		commit('logoutSuccess')
		router.push('/user/login')
	},
	redirectLogout() {
		router.push('/user/login')
	}
}

const mutations = {
	loginRequest(state) {
		state.authenticating = true;
		state.authenticationError = ''
		state.authenticationErrorCode = 0
	},
	setUserInfo(state, data) {
		state.UserInfo = data;
	},

	loginSuccess(state, data) {
		state.accessToken = data.token;
		state.permissions = data.userinfo.Roles;
		let formattedRules = [];
		if (data.userinfo.Roles.length > 0) {
			formattedRules = data.userinfo.Roles.map(perm => {
				let formattedObj = {};
				formattedObj.actions = perm;
				formattedObj.subject = 'permissions'
				return formattedObj;
			})
		}
		state.rules = formattedRules;
		state.authenticating = false;
	},

	loginError(state, {errorCode, errorMessage}) {
		state.authenticating = false
		state.authenticationErrorCode = errorCode
		state.authenticationError = errorMessage
	},

	logoutSuccess(state) {
		state.accessToken = '';
		state.UserInfo = {}
	},

	refreshTokenPromise(state, promise) {
		state.refreshTokenPromise = promise
	}
}

export const auth = {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

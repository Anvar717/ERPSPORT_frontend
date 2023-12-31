import { Ability } from '@casl/ability'

export const ability = new Ability()

export const abilityPlugin = (store) => {
	ability.update(store.state.auth.rules);

	return store.subscribe((mutation) => {
		switch (mutation.type) {
			case 'auth/loginSuccess':
				let formattedRules = [];
				if(mutation.payload.userinfo.Roles.length > 0) {
					formattedRules = mutation.payload.userinfo.Roles.map(perm => {
						let formattedObj = {};
						formattedObj.actions = perm;
						formattedObj.subject = 'permissions';
						return formattedObj;
					})
				}
				ability.update(formattedRules);
				break;
			case 'auth/logoutSuccess':
				ability.update([{ actions: 'read', subject: 'all' }])
				break
		}
	})
};
